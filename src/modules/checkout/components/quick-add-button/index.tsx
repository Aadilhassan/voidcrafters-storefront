"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { addToCart } from "@lib/data/cart"

export default function QuickAddButton({
  variantId,
  countryCode,
}: {
  variantId?: string
  countryCode: string
}) {
  const [adding, setAdding] = useState(false)
  const router = useRouter()

  if (!variantId) {
    return null
  }

  const quickAdd = async () => {
    setAdding(true)
    try {
      await addToCart({ variantId, quantity: 1, countryCode })
      router.refresh()
    } catch {
      // error surfaces on cart totals refresh; never break checkout
    } finally {
      setAdding(false)
    }
  }

  return (
    <button
      onClick={quickAdd}
      disabled={adding}
      className="shrink-0 px-4 py-1.5 font-display text-[11px] tracking-[0.2em] uppercase text-bone bg-blood hover:bg-blood-bright transition-colors disabled:opacity-50"
    >
      {adding ? "…" : "+ Add"}
    </button>
  )
}
