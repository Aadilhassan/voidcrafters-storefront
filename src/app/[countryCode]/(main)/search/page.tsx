import { Metadata } from "next"

import { searchProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"

export const metadata: Metadata = {
  title: "Search | Voidcrafters",
  description: "Search every relic in the crypt.",
}

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const q = (searchParams.q || "").trim()

  const region = await getRegion(params.countryCode)
  const results = region ? await searchProducts({ query: q, countryCode: params.countryCode }) : []

  return (
    <div className="content-container py-12 small:py-20">
      <p className="font-display text-xs tracking-[0.4em] text-blood-ember uppercase mb-2">
        Search the crypt
      </p>
      <h1 className="font-display text-4xl small:text-5xl text-bone">
        {q ? (
          <>
            Results for <span className="text-blood-ember">“{q}”</span>
          </>
        ) : (
          "Search"
        )}
      </h1>
      <form
        action={`/${params.countryCode}/search`}
        method="GET"
        className="mt-8 flex gap-3 max-w-xl"
      >
        <input
          name="q"
          defaultValue={q}
          placeholder="Try “bat ring”, “choker”, “nose ring”…"
          autoComplete="off"
          className="flex-1 rounded-soft bg-void-card border border-white/15 px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:outline-none focus:border-blood-ember transition-colors"
        />
        <button
          type="submit"
          className="shrink-0 px-6 py-3 bg-blood hover:bg-blood-bright text-bone font-display text-sm tracking-[0.2em] uppercase transition-colors"
        >
          Search
        </button>
      </form>

      {q && (
        <p className="mt-6 text-sm text-bone-faint">
          {results.length > 0
            ? `${results.length} relic${results.length === 1 ? "" : "s"} found`
            : "No relics match — try “ring”, “necklace” or “choker”."}
        </p>
      )}

      {results.length > 0 && region && (
        <ul className="mt-8 grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
          {results.map((p) => (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
