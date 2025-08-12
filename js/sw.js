// sw.js
const CACHE_NAME = 'illit-player-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/music-list.js',
  // Thêm tất cả file nhạc và hình ảnh (liệt kê thủ công)
  '/songs/music-1.mp3',
  '/songs/music-2.mp3',
  // ... thêm hết các file .mp3 và .jpg từ music-list.js
  '/images/music-1.jpg',
  '/images/music-2.jpg',
  // ... thêm hết
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});