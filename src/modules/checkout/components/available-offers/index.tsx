"use client"

import { useState } from "react"

import { applyPromotions } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"

const OFFERS = [
  {
    code: "CRYPT10",
    title: "10% off your order",
    sub: "Sitewide · auto-validated",
  },
  {
    code: "FLAT100",
    title: "Flat ₹100 off",
    sub: "Sitewide · auto-validated",
  },
]

export default function AvailableOffers({
  promotions = [],
}: {
  promotions?: HttpTypes.StorePromotion[]
}) {
  const [applying, setApplying] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const appliedCodes = new Set(
    promotions.filter((p) => p.code).map((p) => p.code!)
  )

  // Hide offers that are already applied AND auto-applied ones cover the rest.
  const remaining = OFFERS.filter((o) => !appliedCodes.has(o.code))
  if (!remaining.length && !error) {
    return null
  }

  const apply = async (code: string) => {
    setError(null)
    setApplying(code)
    try {
      await applyPromotions([...Array.from(appliedCodes), code])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setApplying(null)
    }
  }

  return (
    <div className="rounded-soft ring-1 ring-blood/40 bg-void-card p-4">
      <p className="font-display text-xs tracking-[0.25em] uppercase text-blood-ember">
        Available offers
      </p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {remaining.map((offer) => (
          <li
            key={offer.code}
            className="flex items-center justify-between gap-3 rounded-soft border border-dashed border-white/20 px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="font-display text-sm tracking-wider text-bone">
                {offer.code}
              </p>
              <p className="text-xs text-bone-faint mt-0.5">
                {offer.title} · {offer.sub}
              </p>
            </div>
            <button
              onClick={() => apply(offer.code)}
              disabled={applying !== null}
              className="shrink-0 px-4 py-1.5 font-display text-[11px] tracking-[0.2em] uppercase text-bone bg-blood hover:bg-blood-bright transition-colors disabled:opacity-50"
            >
              {applying === offer.code ? "…" : "Apply"}
            </button>
          </li>
        ))}
      </ul>
      <ErrorMessage error={error} data-testid="offer-error-message" />
    </div>
  )
}
