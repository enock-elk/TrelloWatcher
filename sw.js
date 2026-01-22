const CACHE_NAME = 'trello-watcher-v16'; // Bumped version to force update
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './js/worker.js', // CRITICAL ADDITION: The new "Brain" file
  './icons/icon-192.png',
  './icons/icon-512.png',
  // OLD SOUNDS
  './sounds/bottle_opener.mp3',
  './sounds/carlock.mp3',
  './sounds/doorbell.mp3',
  './sounds/email_notification.mp3',
  './sounds/message_messaaaaaage.mp3',
  './sounds/message_my_lord.mp3',
  './sounds/message_tone.mp3',
  // NEW SOUNDS
  './sounds/zap.mp3',
  './sounds/just_calledf__k_u.mp3',
  './sounds/ping.mp3',
  './sounds/notification.mp3',
  './sounds/sneeze.mp3',
  './sounds/wahwahwahwahhh.mp3'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Force active immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
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
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        // CRITICAL: Take control of all pages immediately
        return self.clients.claim();
    })
  );
});

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