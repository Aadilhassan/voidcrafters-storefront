import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import { listProducts } from "@lib/data/products"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function LatestDrops({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 8,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts?.length) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex flex-col small:flex-row small:items-end justify-between mb-8 gap-4">
        <div>
          <p className="font-display text-xs tracking-[0.4em] text-blood-ember uppercase mb-2">
            Most wanted
          </p>
          <Text className="font-display text-3xl small:text-4xl text-bone">
            Latest Drops
          </Text>
          <p className="text-bone-faint text-sm mt-2">
            The first crypt drop — skin-safe steel, priced in rupees.
          </p>
        </div>
        <InteractiveLink href="/store">View all relics</InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-6 gap-y-12">
        {pricedProducts.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
