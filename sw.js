const CACHE_NAME = 'lmarket-cache-v2'; // Incrémentez la version après chaque mise à jour
const urlsToCache = [
  '/',
  '/index.html',
 '/Gratuit.html',
'/Payant.html',
'/avis.html',
'/info.html',
'/politic.html'
  '/styles.css',
'/avis.css',
'/back.css',
  '/script.js',
'/share.js',
  '/icons/icone192.png',
'/icons/icon512.png',
'/20250613_003237.png',
'/20250618_191502.png',
  '/manifest.json',
  '/sw.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

