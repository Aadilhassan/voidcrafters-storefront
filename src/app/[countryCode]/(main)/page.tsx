import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import BannerCarousel from "@modules/home/components/banner-carousel"
import CategoryTiles from "@modules/home/components/category-tiles"
import LatestDrops from "@modules/home/components/latest-drops"
import Manifesto from "@modules/home/components/manifesto"
import TrustStrip from "@modules/home/components/trust-strip"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Voidcrafters — Goth & Alt-Fashion Jewellery",
  description:
    "Occult-inspired goth jewellery: chokers, rings, piercings and body chains. Forged for the dark-hearted.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!region) {
    return null
  }

  return (
    <>
      <BannerCarousel />
      <TrustStrip />
      <CategoryTiles />
      <LatestDrops region={region} />
      <Manifesto />
      {collections?.length > 0 && (
        <div className="py-12">
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      )}
    </>
  )
}
