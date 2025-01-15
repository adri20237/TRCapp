const CACHE_NAME = 'trcapp-cache-v1';
const urlsToCache = [
  '/',
  '/favicon.png', // Use your own assets here
  '/assets/icon.png', // Customize the list based on your assets
  '/assets/splash-icon.png',
  '/App.js', // Your React app's main JS file (may need to update)
  '/manifest.json', // Add the manifest if available
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

  