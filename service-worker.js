const CACHE_NAME = 'pwa-cache-v1';
const urlsToCahe = [
    '/',
    '/index',
    '/manifest.json',
    '/images/logo.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Se han Cacheado los archivos LOLLLLLLLLL');
            return cache.addAll(urlsToCahe);

        })
    )
});

self.addEventListener('activate', (event)=>{
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNAmes) =>{
            return Promise.all(
                cacheNAmes.map((cacheNAme) => {
                    if (!cacheWhitelist.includes(cacheNAme)) {
                        return caches.delete(cacheNAme);
                    }
                })
            )
        })
    )
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});