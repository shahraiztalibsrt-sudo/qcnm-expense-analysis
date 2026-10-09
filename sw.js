const CACHE_NAME = 'qcnm-expense-pwa-v1';
const APP_FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const url = new URL(req.url);
  if (url.pathname.endsWith('/data.xlsx') || url.pathname === '/data.xlsx') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, {cache:'no-store'});
        if (fresh.ok) { const copy=fresh.clone(); caches.open(CACHE_NAME).then(c=>c.put(req,copy)); }
        return fresh;
      } catch(e) {
        const cached=await caches.match(req);
        if(cached) return cached;
        return new Response('Workbook is not cached yet. Connect to the internet once and open the app, or upload an Excel file manually.', {status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
      }
    })());
    return;
  }
  event.respondWith((async()=>{
    const cached=await caches.match(req);
    if(cached) return cached;
    try { const fresh=await fetch(req); if(fresh.ok) caches.open(CACHE_NAME).then(c=>c.put(req,fresh.clone())); return fresh; }
    catch(e) { return cached || Response.error(); }
  })());
});
