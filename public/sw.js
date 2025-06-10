
const CACHE_NAME = 'edutalks-cache-v1';
const urlsToCache = [
  '/',
  '/dashboard',
  '/auth/login',
  '/auth/signup',
  '/manifest.json',
  // Note: For a robust PWA, you'd need to include critical JS/CSS assets.
  // Next.js often uses hashed filenames, making manual caching of these complex.
  // Libraries like next-pwa handle this more effectively.
];

// Install event: open cache and add core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and caching core files');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache core files during install:', error);
      })
  );
  self.skipWaiting(); // Force the waiting service worker to become the active service worker
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Take control of all open clients
});

// Fetch event: serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', (event) => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          // Serve from cache
          return response;
        }
        // Not in cache, fetch from network
        return fetch(event.request).then((networkResponse) => {
          // Optionally, cache new requests dynamically if needed
          // For this basic setup, we rely on the initial install caching.
          return networkResponse;
        });
      })
      .catch(error => {
        console.error('Error in fetch handler:', error);
        // You could return a custom offline page here if desired
        // return caches.match('/offline.html'); 
      })
  );
});
