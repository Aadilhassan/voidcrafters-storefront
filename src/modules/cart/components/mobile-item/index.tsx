"use client"

import { useState } from "react"
import Image from "next/image"

import { updateLineItem } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"

const maxQtyFromInventory = 10

export default function MobileItem({
  item,
  currencyCode,
}: {
  item: HttpTypes.StoreCartLineItem
  currencyCode: string
}) {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)
    await updateLineItem({ lineId: item.id, quantity })
      .catch((err) => setError(err.message))
      .finally(() => setUpdating(false))
  }

  const hasImage = !!(item.thumbnail || item.variant?.product?.images?.length)
  const total = convertToLocale({
    amount: item.subtotal ?? 0,
    currency_code: currencyCode,
  })
  const unit = convertToLocale({
    amount: item.unit_price ?? 0,
    currency_code: currencyCode,
  })
  const variantTitle = item.variant?.title && item.variant.title !== "One Size"
    ? item.variant.title
    : item.variant?.options
      ?.map((o: any) => o.value)
      .filter(Boolean)
      .join(" / ")

  return (
    <div
      className="rounded-soft ring-1 ring-white/10 bg-void-card p-4"
      data-testid="product-row"
    >
      <div className="flex gap-4">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="w-20 shrink-0"
        >
          {hasImage ? (
            <Thumbnail
              thumbnail={item.thumbnail}
              images={item.variant?.product?.images}
              size="square"
            />
          ) : (
            <span className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-soft ring-1 ring-white/10 bg-void-soft">
              <Image
                src="/brand/sigil-bone-blood.svg"
                alt=""
                aria-hidden
                width={40}
                height={40}
                className="h-10 w-10 opacity-40"
              />
            </span>
          )}
        </LocalizedClientLink>
        <div className="min-w-0 flex-1 py-1">
          <p
            className="font-display text-sm tracking-wide leading-relaxed text-bone line-clamp-2"
            data-testid="product-title"
          >
            {item.product_title}
          </p>
          {!!variantTitle && variantTitle !== "OS" && (
            <p className="mt-2 text-xs text-bone-faint">
              Variant: {variantTitle}
            </p>
          )}
          <p className="mt-1.5 text-xs text-bone-faint">{unit} each</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex items-center gap-3">
          <DeleteButton id={item.id} data-testid="product-delete-button" />
          <CartItemSelect
            value={item.quantity}
            onChange={(value) => changeQuantity(parseInt(value.target.value))}
            className="w-16 h-10"
            data-testid="product-select-button"
          >
            {Array.from({ length: maxQtyFromInventory }, (_, i) => (
              <option value={i + 1} key={i}>
                {i + 1}
              </option>
            ))}
          </CartItemSelect>
          {updating && <Spinner />}
        </div>
        <p className="font-display text-base text-bone">{total}</p>
      </div>
      <ErrorMessage error={error} data-testid="product-error-message" />
    </div>
  )
}
