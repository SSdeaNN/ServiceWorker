const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './styles.css',
    './app.js',
    './images/logo.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Caching files for offline use');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        }).catch(() => {
            // En caso de fallo (offline y recurso no cacheado), si es navegación devolvemos index.html
            if (event.request.mode === 'navigate') {
                return caches.match('./index.html');
            }
        })
    );
});