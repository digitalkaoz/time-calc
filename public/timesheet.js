/* eslint-env worker, serviceworker */

//import workbox from "@types/workbox-sw";

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

const cacheName = workbox.core.cacheNames.runtime;

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
    ],
  }),
);

const cacheFirst = (path) => {
  workbox.routing.registerRoute(
    path,
    new workbox.strategies.CacheFirst({
      cacheName,
      plugins: [
        new workbox.cacheableResponse.Plugin({ statuses: [200] })
      ]
    })
  );  
}

const networkFirst = (path) => {
  workbox.routing.registerRoute(
    path,
    new workbox.strategies.NetworkFirst({
      cacheName,
      plugins: [
        new workbox.cacheableResponse.Plugin({ statuses: [200] })
      ]
    })
  );  
}

cacheFirst('/manifest.json');
cacheFirst('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-window.prod.mjs');
networkFirst(/\/$/);
