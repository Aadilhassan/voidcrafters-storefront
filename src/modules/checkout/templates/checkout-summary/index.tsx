import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import AvailableOffers from "@modules/checkout/components/available-offers"
import CheckoutUpsells from "@modules/checkout/components/checkout-upsells"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import ProductTrust from "@modules/products/components/product-trust"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0 ">
      <div className="w-full bg-white flex flex-col">
        <Divider className="my-6 small:hidden" />
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular items-baseline"
        >
          In your Cart
        </Heading>
        <Divider className="my-6" />
        <CartTotals totals={cart} />
        <ItemsPreviewTemplate cart={cart} />
        <div className="mt-6 flex flex-col gap-4">
          <AvailableOffers promotions={cart.promotions} />
          <DiscountCode cart={cart} />
          <CheckoutUpsells cart={cart} />
          <ProductTrust />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
