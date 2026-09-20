/* Basit PWA Service Worker */
const CACHE_NAME = 'sohbet-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Şimdilik sadece geçiş yap
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
