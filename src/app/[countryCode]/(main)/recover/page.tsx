import { redirect } from "next/navigation"

import { setCartId } from "@lib/data/cookies"

// Abandoned-checkout recovery: /in/recover?cart_id=xxx restores the cart
// cookie and drops the shopper straight into checkout.
export default async function RecoverPage(props: {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ cart_id?: string }>
}) {
  const params = await props.params
  const searchParams = await props.searchParams

  if (searchParams.cart_id) {
    await setCartId(searchParams.cart_id)
  }

  redirect(`/${params.countryCode}/checkout?step=address`)
}
