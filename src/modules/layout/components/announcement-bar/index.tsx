"use client"

import { useEffect, useState } from "react"

const MESSAGES = [
  "Free shipping across India on orders over ₹499",
  "Secure prepaid checkout — UPI & cards accepted",
  "The first crypt drop is live — 10 relics from ₹599",
]

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % MESSAGES.length),
      4000
    )
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-blood text-bone overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {MESSAGES.map((msg) => (
          <p
            key={msg}
            className="w-full shrink-0 px-3 py-1.5 text-center font-display text-[10px] small:text-[11px] tracking-[0.14em] small:tracking-[0.25em] uppercase leading-relaxed text-balance"
          >
            {msg}
          </p>
        ))}
      </div>
    </div>
  )
}
