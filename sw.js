const CACHE_NAME = 'entrenamiento-main-v1';
const ASSETS = [
    './',
    './index.html',
    './assets/css/main.css',
    './assets/css/components.css',
    './assets/css/print.css',
    './assets/js/app.js',
    './assets/img/favicon.svg',
    './assets/img/og-cover.png',
    './data/plan.json',
    './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
});
