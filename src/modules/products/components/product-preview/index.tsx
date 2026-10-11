import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  const isNew =
    product.created_at &&
    Date.now() - new Date(product.created_at).getTime() <
      1000 * 60 * 60 * 24 * 90

  const categoryName = (product as { categories?: { name: string }[] })
    .categories?.[0]?.name

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block rounded-soft bg-void-card ring-1 ring-white/10 hover:ring-blood/60 transition-all duration-300 overflow-hidden"
    >
      <div data-testid="product-wrapper">
        <div className="relative">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
          <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
            {isNew && (
              <span className="bg-blood px-2.5 py-1 font-display text-[10px] tracking-[0.2em] uppercase text-bone">
                New in
              </span>
            )}
            {categoryName && (
              <span className="border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase text-bone-dim backdrop-blur-sm">
                {categoryName}
              </span>
            )}
          </div>
          <Image
            src="/brand/stamp-seal-bone.svg"
            alt=""
            aria-hidden
            width={44}
            height={44}
            className="absolute bottom-3 right-3 h-11 w-11 opacity-30 mix-blend-screen pointer-events-none transition-opacity duration-300 group-hover:opacity-50"
          />
        </div>
        <div className="flex items-start justify-between gap-3 p-4">
          <div className="min-w-0">
            <Text
              className="truncate font-display text-sm tracking-wide text-bone group-hover:text-white transition-colors"
              data-testid="product-title"
            >
              {product.title}
            </Text>
            <Text className="mt-1 text-xs uppercase tracking-[0.2em] text-bone-faint">
              {product.material || "Voidcrafters"}
            </Text>
          </div>
          <div className="flex shrink-0 items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
