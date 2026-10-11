export default function ProductTrust() {
  const items = [
    "Secure prepaid checkout (UPI & cards)",
    "Free shipping over ₹499",
    "7-day easy exchange",
    "Skin-safe, tarnish-free steel",
  ]

  return (
    <ul className="rounded-soft ring-1 ring-white/10 bg-void-card divide-y divide-white/10">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-3 px-4 py-2.5 text-xs tracking-wide text-bone-dim"
        >
          <span className="text-blood-ember font-display">✦</span>
          {item}
        </li>
      ))}
    </ul>
  )
}
