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
  `/manifest.json?v=${version}`,
  '/robots.txt',
  '/google898111cce6c361f7.html',

  /* images */
  `/favicon.png?v=${version}`,
  '/images/avatar.jpg',
  '/images/error.jpg',
  '/images/genesis.jpg',
  '/images/app/48x48.png',
  '/images/app/96x96.png',
  '/images/app/144x144.png',
  '/images/app/192x192.png',
  '/images/app/512x512.png',
  `/images/app/windows-70x70.png?v=${version}`,
  `/images/app/windows-150x150.png?v=${version}`,
  `/images/app/windows-310x150.png?v=${version}`,
  `/images/app/windows-310x310.png?v=${version}`,

  `/images/icons/icon-blog.svg?v=${version}`,
  `/images/icons/icon-dribbble.svg?v=${version}`,
  `/images/icons/icon-facebook.svg?v=${version}`,
  `/images/icons/icon-flickr.svg?v=${version}`,
  `/images/icons/icon-genesis.svg?v=${version}`,
  `/images/icons/icon-github.svg?v=${version}`,
  `/images/icons/icon-instagram.svg?v=${version}`,
  `/images/icons/icon-linkedin.svg?v=${version}`,
  `/images/icons/icon-stackoverflow.svg?v=${version}`,
  `/images/icons/icon-twitter.svg?v=${version}`,
  `/images/icons/icon-youtube.svg?v=${version}`

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
                (response) => (
                  caches.open(cacheName)
                    .then(
                      (cache) => {
                        cache.put(event.request.url, response.clone());
                        return response;
                      }
                    )
                )
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
