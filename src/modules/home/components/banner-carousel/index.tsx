"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const PX = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`

type Slide = {
  kicker: string
  title: string
  sub: string
  cta: string
  href: string
  image: string
  alt: string
}

const SLIDES: Slide[] = [
  {
    kicker: "The first crypt drop is live",
    title: "15 relics from ₹599",
    sub: "Rings, chokers, piercings & chains — skin-safe steel, priced in rupees.",
    cta: "Shop the drop",
    href: "/store",
    image: PX(2735981),
    alt: "Statement ring on black stone",
  },
  {
    kicker: "Forged for the throat",
    title: "Chokers & chains",
    sub: "Velvet, lace and steel collars — pick your ritual.",
    cta: "Shop chokers",
    href: "/categories/chokers",
    image: PX(33497581),
    alt: "Model wearing a black choker",
  },
  {
    kicker: "First-order rite",
    title: "10% off with CRYPT10",
    sub: "Apply it at checkout. Prepaid secure, ships in 48 hours.",
    cta: "Claim the offer",
    href: "/store",
    image: PX(15785494),
    alt: "Serpent hoop earrings on black",
  },
]

const AUTOPLAY_MS = 5500

export default function BannerCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length),
    []
  )

  useEffect(() => {
    if (paused) {
      return
    }
    const id = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, go])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured drops"
      className="relative w-full overflow-hidden bg-void border-b border-blood/40 h-[72svh] small:h-[82vh] small:max-h-[680px] small:min-h-[520px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
        setPaused(true)
      }}
      onTouchEnd={(e) => {
        if (touchX.current !== null) {
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 40) {
            go(dx < 0 ? 1 : -1)
          }
        }
        touchX.current = null
        setPaused(false)
      }}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.title}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 content-container pb-16 small:pb-20">
            <div
              key={`copy-${index}`}
              className="max-w-2xl animate-fade-up"
            >
              <p className="font-display text-[11px] small:text-xs tracking-[0.35em] small:tracking-[0.45em] text-blood-ember uppercase">
                {slide.kicker}
              </p>
              <h2 className="mt-3 font-display font-black text-4xl small:text-6xl uppercase tracking-[0.06em] small:tracking-[0.08em] text-bone leading-[1.02]">
                {slide.title}
              </h2>
              <p className="mt-3 text-sm small:text-base text-bone-dim max-w-md leading-relaxed">
                {slide.sub}
              </p>
              <LocalizedClientLink
                href={slide.href}
                className="inline-block mt-6"
              >
                <span className="inline-block px-8 py-3.5 small:py-3 bg-blood hover:bg-blood-bright text-bone font-display text-sm tracking-[0.2em] uppercase transition-colors">
                  {slide.cta}
                </span>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows (desktop) */}
      <button
        aria-label="Previous banner"
        onClick={() => go(-1)}
        className="hidden small:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-bone backdrop-blur-sm hover:border-blood-ember hover:text-white transition-colors"
      >
        ←
      </button>
      <button
        aria-label="Next banner"
        onClick={() => go(1)}
        className="hidden small:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-bone backdrop-blur-sm hover:border-blood-ember hover:text-white transition-colors"
      >
        →
      </button>

      {/* Dots + counter */}
      <div className="absolute bottom-5 inset-x-0 z-20 flex items-center justify-center gap-2.5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.title}
            aria-label={`Go to banner ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? "w-8 bg-blood-ember"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
