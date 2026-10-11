import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="w-full relative bg-void overflow-hidden border-b border-blood/40">
      {/* blood-moon glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(138,3,3,0.35) 0%, rgba(138,3,3,0.08) 45%, transparent 70%)",
        }}
      />
      {/* faint pentagram ring */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.07]"
      >
        <svg width="640" height="640" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="96" stroke="#e8e6e1" strokeWidth="1" />
          <circle cx="100" cy="100" r="78" stroke="#e8e6e1" strokeWidth="0.75" />
          <polygon
            points="100,22 172.5,152.5 27.5,152.5 100,22"
            stroke="#e8e6e1"
            strokeWidth="0.75"
          />
          <polygon
            points="100,178 27.5,47.5 172.5,47.5 100,178"
            stroke="#e8e6e1"
            strokeWidth="0.75"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 py-24 small:py-32 gap-6">
        <p className="font-display text-xs tracking-[0.5em] text-blood-ember uppercase">
          Est. MMXXVI — India / Worldwide
        </p>
        <h1 className="font-display font-black text-6xl small:text-8xl tracking-[0.12em] uppercase text-bone leading-[1.05]">
          Voidcrafters
        </h1>
        <p className="font-display text-sm small:text-base tracking-[0.25em] text-bone-dim uppercase">
          Goth &amp; alt-fashion jewellery
        </p>
        <p className="text-bone-dim text-sm small:text-base max-w-xl">
          Chokers, rings, piercings and body chains — forged for the
          dark-hearted. Stainless steel, priced in rupees, shipped across
          India and beyond.
        </p>
        <div className="flex flex-col small:flex-row gap-4 mt-2">
          <LocalizedClientLink href="/store">
            <span className="inline-block px-8 py-3 bg-blood hover:bg-blood-bright text-bone font-display text-sm tracking-[0.2em] uppercase transition-colors">
              Enter the crypt
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink href="/collections">
            <span className="inline-block px-8 py-3 border border-bone-faint hover:border-blood-ember text-bone-dim hover:text-bone font-display text-sm tracking-[0.2em] uppercase transition-colors">
              Browse relics
            </span>
          </LocalizedClientLink>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 text-[11px] tracking-[0.25em] uppercase text-bone-faint">
          <span>10 relics live</span>
          <span className="text-blood-ember">✦</span>
          <span>Skin-safe steel</span>
          <span className="text-blood-ember">✦</span>
          <span>Ships across India</span>
        </div>
      </div>
    </div>
  )
}

export default Hero
