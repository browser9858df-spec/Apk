/* Firebase Messaging Service Worker */
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC6fD-n8yg34wGBt-NCAV8ygtgOYTSJQNo",
  authDomain: "sohbet-47d78.firebaseapp.com",
  databaseURL: "https://sohbet-47d78-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sohbet-47d78",
  storageBucket: "sohbet-47d78.firebasestorage.app",
  messagingSenderId: "1042889609071",
  appId: "1:1042889609071:web:49e7cbe3d2e3abd2d7e29a"
});

const messaging = firebase.messaging();

// Arka planda mesaj geldiğinde
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Arka plan mesajı:', payload);

  const title = payload.notification?.title || "Sohbet";
  const body = payload.notification?.body || "Yeni mesaj";

  self.registration.showNotification(title, {
    body: body,
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    tag: 'sohbet-msg',
    requireInteraction: false,
    data: payload.data || {}
  });
});

// Bildirime tıklanınca uygulamayı aç
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
