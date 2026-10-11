import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-void relative small:min-h-screen">
      <div className="h-16 bg-void border-b border-blood/40">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi flex items-center gap-x-2 uppercase flex-1 basis-0 text-bone-dim hover:text-bone transition-colors"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus">
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden txt-compact-plus">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="flex items-center gap-2 leading-none"
            data-testid="store-link"
          >
            <Image
              src="/brand/sigil-bone-blood.svg"
              alt=""
              aria-hidden
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="font-display font-black text-lg small:text-xl tracking-[0.12em] uppercase text-bone">
              Voidcrafters
            </span>
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="py-8 w-full flex items-center justify-center">
        <p className="font-display text-[11px] tracking-[0.3em] uppercase text-bone-faint">
          Stay dark
        </p>
      </div>
    </div>
  )
}
