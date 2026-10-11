import { Cinzel } from "next/font/google"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import Script from "next/script"
import { Suspense } from "react"
import SwRegister from "@modules/common/components/sw-register"
import SessionTracker from "@modules/common/components/session-tracker"
import "styles/globals.css"

const GA_MEASUREMENT_ID = "G-BE98ZMP07T"
const CLARITY_SITE_ID = "yw5lct81g9"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
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
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Voidcrafters",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "icon", url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Voidcrafters — Goth & Alt-Fashion Jewellery",
    description:
      "Occult-inspired goth jewellery. Forged for the dark-hearted.",
    url: "/",
    siteName: "Voidcrafters",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Voidcrafters" }],
    type: "website",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="dark"
      className={`dark ${cinzel.variable}`}
    >
      <body>
        <main className="relative bg-void text-bone">{props.children}</main>
        <Suspense>
          <SessionTracker />
        </Suspense>
        <SwRegister />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/${CLARITY_SITE_ID}";
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_SITE_ID}");
          `}
        </Script>
      </body>
    </html>
  )
}
