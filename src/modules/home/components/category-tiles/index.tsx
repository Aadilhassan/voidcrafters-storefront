import Image from "next/image"

import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const TILE_IMAGES: Record<string, string> = {
  rings:
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=800&auto=format&fit=crop",
  necklaces:
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
  chokers:
    "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=800&auto=format&fit=crop",
  earrings:
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
  piercings:
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=800&auto=format&fit=crop",
}

const FALLBACK =
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop"

export default async function CategoryTiles() {
  const categories = await listCategories()

  if (!categories?.length) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-16">
      <p className="font-display text-xs tracking-[0.4em] text-blood-ember uppercase mb-2">
        Choose your relic
      </p>
      <h2 className="font-display text-3xl small:text-4xl text-bone mb-8">
        Shop by ritual
      </h2>
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-5 gap-4 small:gap-6">
        {categories.slice(0, 5).map((c) => (
          <li key={c.id}>
            <LocalizedClientLink
              href={`/categories/${c.handle}`}
              className="group relative block overflow-hidden rounded-soft ring-1 ring-white/10 hover:ring-blood/60 transition-all duration-300 aspect-[3/4]"
            >
              <Image
                src={TILE_IMAGES[c.handle] || FALLBACK}
                alt={c.name}
                fill
                sizes="(max-width: 576px) 50vw, (max-width: 992px) 33vw, 20vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-sm small:text-base tracking-[0.15em] uppercase text-bone">
                  {c.name}
                </p>
                <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-blood-ember opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Enter →
                </p>
              </div>
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
