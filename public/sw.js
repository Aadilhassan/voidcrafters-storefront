/* Voidcrafters service worker — offline-first static assets,
   network-first pages with an offline fallback. No build step. */

const CACHE = "voidcrafters-v1"
const OFFLINE_URL = "/offline.html"

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.add(OFFLINE_URL))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  )
})

const isStaticAsset = (pathname) =>
  pathname.startsWith("/_next/static/") ||
  pathname.startsWith("/brand/") ||
  pathname.startsWith("/icons/") ||
  /\.(png|svg|ico|jpg|jpeg|webp|woff2?)$/.test(pathname)

self.addEventListener("fetch", (event) => {
  const { request } = event

  if (request.method !== "GET") {
    return
  }

  let url
  try {
    url = new URL(request.url)
  } catch {
    return
  }

  // Only handle same-origin traffic.
  if (url.origin !== self.location.origin) {
    return
  }

  if (url.pathname === "/sw.js" || url.pathname === OFFLINE_URL) {
    return
  }

  // Pages: network first, fall back to cache, then the offline page.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() =>
          caches
            .match(request)
            .then((hit) => hit || caches.match(OFFLINE_URL))
        )
    )
    return
  }

  // Static assets: cache first, populate on miss.
  if (isStaticAsset(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone()
              caches
                .open(CACHE)
                .then((cache) => cache.put(request, copy))
            }
            return response
          })
      )
    )
  }
})
