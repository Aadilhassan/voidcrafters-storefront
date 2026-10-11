import Image from "next/image"

import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import QuickAddButton from "@modules/checkout/components/quick-add-button"

/**
 * GoKwik-style in-checkout upsell: relics not already in the cart,
 * with one-tap add.
 */
export default async function CheckoutUpsells({
  cart,
}: {
  cart: HttpTypes.StoreCart
}) {
  const regionId = cart.region?.id
  if (!regionId) {
    return null
  }

  const inCart = new Set(
    (cart.items || []).map((i) => i.product_id).filter(Boolean)
  )

  const {
    response: { products },
  } = await listProducts({
    regionId,
    queryParams: { limit: 20, fields: "*variants.calculated_price" },
  })

  const upsells = products.filter((p) => !inCart.has(p.id)).slice(0, 4)
  if (!upsells.length) {
    return null
  }

  const countryCode =
    cart.region?.countries?.[0]?.iso_2 || process.env.NEXT_PUBLIC_DEFAULT_REGION || "in"

  return (
    <div className="rounded-soft ring-1 ring-white/10 bg-void-card p-4">
      <p className="font-display text-xs tracking-[0.25em] uppercase text-bone">
        Complete the ritual
      </p>
      <p className="text-xs text-bone-faint mt-1">
        Pairs well with your relics — one tap to add.
      </p>
      <ul className="mt-3 flex flex-col gap-3">
        {upsells.map((p) => (
          <li key={p.id} className="flex items-center gap-3">
            {p.thumbnail ? (
              <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-soft">
                <Image
                  src={p.thumbnail}
                  alt={p.title}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
            ) : (
              <span className="block h-12 w-12 shrink-0 rounded-soft bg-void-soft" />
            )}
            <span className="min-w-0 flex-1">
              <span className="block truncate font-display text-xs tracking-wide text-bone">
                {p.title}
              </span>
              <span className="block text-[11px] text-bone-faint mt-0.5">
                {p.material || "Voidcrafters"}
              </span>
            </span>
            <QuickAddButton
              variantId={p.variants?.[0]?.id}
              countryCode={countryCode}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
