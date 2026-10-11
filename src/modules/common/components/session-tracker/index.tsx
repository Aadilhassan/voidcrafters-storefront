"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import { trackSessionEvent } from "@lib/data/tracking"

const SID_KEY = "vc_sid"

export function getSessionId(): string | null {
  if (typeof window === "undefined") {
    return null
  }
  let sid = window.localStorage.getItem(SID_KEY)
  if (!sid) {
    sid =
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    window.localStorage.setItem(SID_KEY, sid)
  }
  return sid
}

// Anonymous journey capture: one page_view per navigation, UTM only on
// first touch. Best-effort — failures never surface to the shopper.
export default function SessionTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const sid = getSessionId()
    if (!sid) {
      return
    }
    const params = new URLSearchParams(searchParams?.toString() || "")
    const seen = window.sessionStorage.getItem("vc_seen")
    const utm =
      !seen
        ? {
            source: params.get("utm_source") || undefined,
            medium: params.get("utm_medium") || undefined,
            campaign: params.get("utm_campaign") || undefined,
          }
        : undefined
    window.sessionStorage.setItem("vc_seen", "1")

    trackSessionEvent({
      session_id: sid,
      type: "page_view",
      path: `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
      utm,
    }).catch(() => {})
  }, [pathname, searchParams])

  return null
}
