"use client"

import { Fragment, useRef } from "react"
import { Transition } from "@headlessui/react"
import { Button, Heading, clx } from "@medusajs/ui"

import { useIntersection } from "@lib/hooks/use-in-view"
import { convertToLocale } from "@lib/util/money"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)
  const checkoutRef = useRef<HTMLDivElement>(null)
  const checkoutInView = useIntersection(checkoutRef, "0px")
  const total = convertToLocale({
    amount: cart.total ?? 0,
    currency_code: cart.currency_code,
  })

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
          Summary
        </Heading>
        <DiscountCode cart={cart} />
        <Divider />
        <CartTotals totals={cart} />
        <div ref={checkoutRef}>
          <LocalizedClientLink
            href={"/checkout?step=" + step}
            data-testid="checkout-button"
          >
            <Button className="w-full h-10">Go to checkout</Button>
          </LocalizedClientLink>
        </div>
      </div>
      {/* Mobile sticky checkout: appears once the summary button scrolls out */}
      <div
        className={clx("small:hidden inset-x-0 bottom-0 fixed z-50", {
          "pointer-events-none": checkoutInView,
        })}
      >
        <Transition
          as={Fragment}
          show={!checkoutInView}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="opacity-0 translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-200 transform"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-full"
        >
          <div
            className="flex items-center justify-between gap-4 border-t border-blood/40 bg-void-card/95 backdrop-blur px-5 pt-3 text-bone"
            style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
            data-testid="sticky-checkout-bar"
          >
            <div className="min-w-0">
              <p className="text-[11px] tracking-[0.2em] uppercase text-bone-faint">
                Total
              </p>
              <p className="font-display text-lg leading-tight">{total}</p>
            </div>
            <LocalizedClientLink
              href={"/checkout?step=" + step}
              className="shrink-0"
            >
              <span className="inline-block px-8 py-3 bg-blood hover:bg-blood-bright text-bone font-display text-sm tracking-[0.2em] uppercase transition-colors">
                Checkout
              </span>
            </LocalizedClientLink>
          </div>
        </Transition>
      </div>
    </>
  )
}

export default Summary
