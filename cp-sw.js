// Customer Pouch — Service Worker
const CACHE='customer-pouch-v1';
const ASSETS=['/customer-pouch/index.html','/customer-pouch/cp-manifest.json','/customer-pouch/cp-icon-192.png','/customer-pouch/cp-icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.url.includes('script.google.com'))return;e.respondWith(fetch(e.request).then(res=>{const c=res.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));return res;}).catch(()=>caches.match(e.request)));});
