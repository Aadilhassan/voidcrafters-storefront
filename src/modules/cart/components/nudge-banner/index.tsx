"use client"

import { useEffect, useState } from "react"

import { applyPromotions } from "@lib/data/cart"
import { getPersonalOffer, scoreSession } from "@lib/data/tracking"
import { getSessionId } from "@modules/common/components/session-tracker"

// Shows a minted personal offer (e.g. NUDGE-XXXXXX) with one-tap apply.
// Scoring runs first so first-time visitors get tagged in the same visit.
export default function NudgeBanner() {
  const [offer, setOffer] = useState<{ code: string } | null>(null)
  const [applying, setApplying] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const sid = getSessionId()
    if (!sid) {
      return
    }
    let live = true
    scoreSession(sid)
      .then(() => getPersonalOffer(sid))
      .then((o) => {
        if (live && o) {
          setOffer(o)
        }
      })
      .catch(() => {})
    return () => {
      live = false
    }
  }, [])

  if (!offer || done) {
    return null
  }

  const apply = async () => {
    setApplying(true)
    try {
      await applyPromotions([offer.code])
      setDone(true)
    } catch {
      setApplying(false)
    }
  }

  return (
    <div className="rounded-soft ring-1 ring-blood/40 bg-void-card p-4 flex items-center justify-between gap-4">
      <div>
        <p className="font-display text-xs tracking-[0.25em] uppercase text-blood-ember">
          Made for you
        </p>
        <p className="mt-1 text-sm text-bone">
          Extra 10% off this order with{" "}
          <span className="font-display tracking-wider">{offer.code}</span>
        </p>
      </div>
      <button
        onClick={apply}
        disabled={applying}
        className="shrink-0 px-5 py-2.5 bg-blood hover:bg-blood-bright text-bone font-display text-xs tracking-[0.2em] uppercase transition-colors disabled:opacity-50"
      >
        {applying ? "…" : "Apply"}
      </button>
    </div>
  )
}
