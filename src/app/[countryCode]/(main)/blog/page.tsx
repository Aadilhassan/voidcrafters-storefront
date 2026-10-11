import { Metadata } from "next"

import { BLOG_POSTS } from "@lib/data/blog"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Journal | Voidcrafters",
  description:
    "Care guides, styling rituals and the Voidcrafters manifesto. Notes from the crypt.",
}

export default function BlogPage() {
  return (
    <div className="content-container py-12 small:py-20">
      <p className="font-display text-xs tracking-[0.4em] text-blood-ember uppercase mb-2">
        Notes from the crypt
      </p>
      <h1 className="font-display text-4xl small:text-5xl text-bone">
        Journal
      </h1>
      <p className="text-bone-faint text-sm mt-3 max-w-xl">
        Care rituals, layering guides and why we forge the way we do.
      </p>
      <ul className="mt-10 grid grid-cols-1 small:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <li key={post.handle}>
            <LocalizedClientLink
              href={`/blog/${post.handle}`}
              className="group flex h-full flex-col rounded-soft bg-void-card ring-1 ring-white/10 hover:ring-blood/60 transition-all duration-300 overflow-hidden p-6"
            >
              <p className="font-display text-[11px] tracking-[0.25em] uppercase text-blood-ember">
                {post.tag}
              </p>
              <h2 className="mt-3 font-display text-xl leading-snug text-bone group-hover:text-white transition-colors">
                {post.title}
              </h2>
              <p className="mt-3 text-sm text-bone-dim leading-relaxed flex-1">
                {post.excerpt}
              </p>
              <p className="mt-5 text-[11px] tracking-[0.2em] uppercase text-bone-faint">
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                · {post.readMinutes} min read →
              </p>
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
