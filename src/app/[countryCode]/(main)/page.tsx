import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import LatestDrops from "@modules/home/components/latest-drops"
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
      <Hero />
      <LatestDrops region={region} />
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
