import { Cinzel, UnifrakturMaguntia } from "next/font/google"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
})

const blackletter = UnifrakturMaguntia({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-blackletter",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Voidcrafters — Goth & Alt-Fashion Jewellery",
    template: "%s | Voidcrafters",
  },
  description:
    "Occult-inspired goth jewellery: chokers, rings, piercings and body chains. Forged for the dark-hearted. Ships across India and worldwide.",
  themeColor: "#0a0a0a",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="dark"
      className={`dark ${cinzel.variable} ${blackletter.variable}`}
    >
      <body>
        <main className="relative bg-void text-bone">{props.children}</main>
      </body>
    </html>
  )
}
