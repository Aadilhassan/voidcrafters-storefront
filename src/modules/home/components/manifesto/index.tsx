import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Manifesto() {
  return (
    <div className="relative overflow-hidden border-y border-blood/40 bg-void">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(138,3,3,0.25) 0%, transparent 70%)",
        }}
      />
      <Image
        src="/brand/stamp-seal-bone.svg"
        alt=""
        aria-hidden
        width={560}
        height={560}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] opacity-[0.05] pointer-events-none"
      />
      <div className="relative z-10 content-container py-16 small:py-24 text-center">
        <p className="font-display text-xs tracking-[0.5em] text-blood-ember uppercase mb-6">
          The creed
        </p>
        <p className="font-display text-2xl small:text-4xl leading-snug text-bone max-w-3xl mx-auto">
          “Alt jewellery in India is either cheap trash or imported luxury.
          We forge a third path —{" "}
          <span className="text-blood-ember">dark, honest, priced in rupees</span>.”
        </p>
        <LocalizedClientLink href="/store">
          <span className="inline-block mt-8 px-8 py-3 bg-blood hover:bg-blood-bright text-bone font-display text-sm tracking-[0.2em] uppercase transition-colors">
            Shop the drop
          </span>
        </LocalizedClientLink>
      </div>
    </div>
  )
}
