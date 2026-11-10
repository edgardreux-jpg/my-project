/* Shukudai : service worker minimal pour l'installation et un démarrage rapide. */
const CACHE = 'edufun-v1'
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './index.html', './logo.png', './icon-192.png']).catch(() => {}))) })
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())) })
self.addEventListener('fetch', e => {
  const req = e.request
  const url = new URL(req.url)
  if (req.method !== 'GET' || url.origin !== self.location.origin) return
  // Pages : réseau d'abord (toujours la dernière version), cache en secours hors ligne
  if (req.mode === 'navigate') {
    // Seule l'application (racine) est mise en cache ; les pages statiques (/ce1/…) passent directement
    if (url.pathname !== '/' && url.pathname !== '/index.html') return
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return r }).catch(() => caches.match('./index.html')))
    return
  }
  // Fichiers statiques (versionnés par Vite) : cache d'abord
  if (/\/(assets|avatars|screens)\/|\.(png|webp|woff2?)$/.test(url.pathname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)) } return r })))
  }
})
