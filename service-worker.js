const CACHE_NAME = 'illit-music-player-v1';
const urlsToCache = [
  '/ILLIT',
  '/ILLIT/index.html',
  '/ILLIT/js/music-list.js',
  '/ILLIT/js/script.js',
  '/ILLIT/logo.svg',
  '/ILLIT/images/yunah.jpg',
  '/ILLIT/images/minju.jpg',
  '/ILLIT/images/moka.jpg',
  '/ILLIT/images/wonhee.jpg',
  '/ILLIT/images/iroha.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});








// Thêm cache động cho các file media
self.addEventListener('fetch', event => {
  // Cache-first cho tài nguyên tĩnh
  if (event.request.url.includes('/songs/') || 
      event.request.url.includes('/images/')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request.url, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
    return;
  }
  
  // Network-first cho các request khác
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});




/*

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});


*/



self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

});

