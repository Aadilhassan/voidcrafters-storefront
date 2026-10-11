import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getPost } from "@lib/data/blog"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

// Blog posts depend on request-time region data and must never be
// statically prerendered — prerendering without a countryCode throws
// and serves a 500 in production (same as product pages).
export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  return []
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { handle } = await props.params
  const post = getPost(handle)
  if (!post) {
    return {}
  }
  return {
    title: `${post.title} | Voidcrafters`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage(props: Props) {
  const { handle } = await props.params
  const post = getPost(handle)

  if (!post) {
    notFound()
  }

  return (
    <article className="content-container py-12 small:py-20 max-w-3xl">
      <LocalizedClientLink
        href="/blog"
        className="font-display text-[11px] tracking-[0.25em] uppercase text-bone-faint hover:text-bone transition-colors"
      >
        ← All entries
      </LocalizedClientLink>
      <p className="mt-8 font-display text-xs tracking-[0.4em] text-blood-ember uppercase">
        {post.tag}
      </p>
      <h1 className="mt-3 font-display text-3xl small:text-5xl leading-tight text-bone">
        {post.title}
      </h1>
      <p className="mt-4 text-[11px] tracking-[0.2em] uppercase text-bone-faint">
        {new Date(post.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}{" "}
        · {post.readMinutes} min read
      </p>
      <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-8">
        {post.body.map((para, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "text-lg text-bone leading-relaxed"
                : "text-base text-bone-dim leading-relaxed"
            }
          >
            {para}
          </p>
        ))}
      </div>
      <div className="mt-12 rounded-soft ring-1 ring-blood/40 bg-void-card p-6 text-center">
        <p className="font-display text-sm tracking-[0.2em] uppercase text-bone">
          Wear the ritual
        </p>
        <LocalizedClientLink href="/store">
          <span className="inline-block mt-4 px-8 py-3 bg-blood hover:bg-blood-bright text-bone font-display text-sm tracking-[0.2em] uppercase transition-colors">
            Shop the drop
          </span>
        </LocalizedClientLink>
      </div>
    </article>
  )
}
