const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
}

const ITEMS = [
  {
    title: "Free shipping",
    sub: "Across India over ₹499",
    icon: (
      <svg {...iconProps}>
        <path d="M3 6.5h11v11H3zM14 10h4l3 3v4.5h-7" />
        <circle cx="7" cy="17.5" r="1.8" />
        <circle cx="17" cy="17.5" r="1.8" />
      </svg>
    ),
  },
  {
    title: "Ships in 48 hrs",
    sub: "Secure prepaid checkout",
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="10.5" width="14" height="9.5" />
        <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
        <path d="M12 14.5v2" />
      </svg>
    ),
  },
  {
    title: "Skin-safe steel",
    sub: "Tarnish-free, waterproof",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3 5 5.8v5.2c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V5.8L12 3Z" />
        <path d="m9 12 2 2 4-4.5" />
      </svg>
    ),
  },
  {
    title: "7-day exchange",
    sub: "No questions asked",
    icon: (
      <svg {...iconProps}>
        <path d="M4.5 12a7.5 7.5 0 0 1 12.9-5.3L20 9.2M20 6v3.2h-3.2" />
        <path d="M19.5 12a7.5 7.5 0 0 1-12.9 5.3L4 14.8M4 18v-3.2h3.2" />
      </svg>
    ),
  },
]

export default function TrustStrip() {
  return (
    <div className="border-y border-white/10 bg-void-soft">
      <ul className="content-container grid grid-cols-2 medium:grid-cols-4 gap-6 py-8">
        {ITEMS.map((item) => (
          <li key={item.title} className="flex items-center gap-3">
            <span className="text-blood-ember shrink-0">{item.icon}</span>
            <div>
              <p className="font-display text-xs tracking-[0.2em] uppercase text-bone">
                {item.title}
              </p>
              <p className="text-xs text-bone-faint mt-0.5">{item.sub}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
