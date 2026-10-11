"use client"

import { useEffect } from "react"

/**
 * Registers /sw.js in production only — a service worker cache in
 * development would reintroduce the stale-data confusion we removed
 * from the fetch layer.
 */
export default function SwRegister() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    ) {
      return
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Offline support is best-effort; never break the shop.
    })
  }, [])

  return null
}
