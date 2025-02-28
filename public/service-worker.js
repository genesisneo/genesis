const brandLocation = new URL(location) || {};
const version = brandLocation.searchParams.get('version') || 1;
const cacheName = `genesis-${version}`;
const offlineFallbackPage = 'offline.html';
const precacheFiles = [

  /*
  we need to do this manually because the service worker
  doesn't know all the files on the servver, the sad part is
  if one file is missing, this will break 😔
  */

  /* documents */
  '/',
  '/robots.txt',
  '/google898111cce6c361f7.html',
  '/manifest.json',

  /* images */
  `/favicon.png?v=${version}`,
  `/genesis.jpg?v=${version}`,
  `/genesis.mp4?v=${version}`,
  `/genesis.ogg?v=${version}`,
  `/genesis.webm?v=${version}`,
  `/loading.gif?v=${version}`,
  `/images/error.png?v=${version}`,
  `/images/icon-behance.svg?v=${version}`,
  `/images/icon-clients.svg?v=${version}`,
  `/images/icon-coffee.svg?v=${version}`,
  `/images/icon-countries.svg?v=${version}`,
  `/images/icon-dribbble.svg?v=${version}`,
  `/images/icon-facebook.svg?v=${version}`,
  `/images/icon-github.svg?v=${version}`,
  `/images/icon-instagram.svg?v=${version}`,
  `/images/icon-linkedin.svg?v=${version}`,
  `/images/icon-projects.svg?v=${version}`,
  `/images/icon-stackoverflow.svg?v=${version}`,
  `/images/icon-twitter.svg?v=${version}`,
  `/images/icon-youtube.svg?v=${version}`,
  `/images/app/48x48.png?v=${version}`,
  `/images/app/96x96.png?v=${version}`,
  `/images/app/144x144.png?v=${version}`,
  `/images/app/192x192.png?v=${version}`,
  `/images/app/512x512.png?v=${version}`,
  `/images/app/screenshots-320x640.png?v=${version}`,
  `/images/app/screenshots-640x480.png?v=${version}`,
  `/images/app/windows-70x70.png?v=${version}`,
  `/images/app/windows-150x150.png?v=${version}`,
  `/images/app/windows-310x150.png?v=${version}`,
  `/images/app/windows-310x310.png?v=${version}`

];
const skipCacheFrom = [
  '_next',
  'apple',
  'bing',
  'doubleclick',
  'extension',
  'facebook',
  'fb',
  'google',
  'gstatic',
  'microsoft',
  'onesignal',
  'twitter',
  'yahoo'
];

/* functions */

const isOnList = (property, list) =>
  list.some((item) => property.indexOf(item) !== -1);

/* event listeners */

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName)
      .then(
        (cache) => {
          return cache.addAll(precacheFiles)
            .then(
              () => {
                return cache.add(offlineFallbackPage);
              }
            );
        }
      )
  );
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
  event.waitUntil(
    caches.keys()
      .then(
        (keys) =>
          Promise.all(
            keys
              .filter(key => key !== cacheName)
              .map(key => caches.delete(key))
          )
      )
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET' && !isOnList(event.request.url, skipCacheFrom)) {
    event.respondWith(
      caches.match(event.request)
        .then(
          (cache) => (
            cache || fetch(event.request)
              .then(
                (response) => {
                  if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(cacheName).then((cache) => {
                      cache.put(event.request.url, responseClone);
                    });
                  }
                  return response;
                }
              )
          )
        )
        .catch(
          (error) => {
            if (event.request.destination !== 'document' || event.request.mode !== 'navigate') {
              console.log(`This device is offline!\n${error}`);
              return Promise.resolve();
            }
            return caches.match(offlineFallbackPage);
          }
        )
    );
  }
  return;
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
