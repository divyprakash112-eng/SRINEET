"use strict";

/*
=========================================================
SRINEET — SERVICE WORKER
Core pages ko install ke time cache kar leta hai, aur
uske baad jo bhi page/test student kholta hai wo bhi
apne aap cache ho jata hai — agli baar internet na ho
tab bhi wahi page khul jayega.
=========================================================
*/

const CACHE_NAME =
  "srineet-cache-v1";

const CORE_ASSETS = [
  "index.html",
  "test-series.html",
  "institute.html",
  "test-paper.html",
  "progress.html",
  "style.css",
  "institute.css",
  "test-series.css",
  "test-paper.css",
  "progress.css",
  "theme.css",
  "theme.js",
  "pwa.js",
  "main.js",
  "institute.js",
  "test-series.js",
  "test-paper.js",
  "progress.js",
  "progress-tracker.js",
  "streak.js",
  "xp.js",
  "premium.js",
  "telegram-popup.css",
  "telegram-popup.js",
  "manifest.json",
  "data/institutes.json",
  "data/batches.json",
  "data/tests.json"
];


/* =====================================================
   INSTALL — core shell cache karo
===================================================== */

self.addEventListener("install", event => {

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
  );

  self.skipWaiting();

});


/* =====================================================
   ACTIVATE — purana cache hatao
===================================================== */

self.addEventListener("activate", event => {

  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      )
  );

  self.clients.claim();

});


/* =====================================================
   FETCH — cache-first, background mein update
   (isse koi bhi test HTML jo student ek baar khol
   chuka hai, wo apne aap offline ke liye save ho
   jata hai)
===================================================== */

self.addEventListener("fetch", event => {

  const request =
    event.request;

  if (request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {

      const networkFetch =
        fetch(request)
          .then(response => {

            if (response && response.status === 200) {

              const clone =
                response.clone();

              caches
                .open(CACHE_NAME)
                .then(cache =>
                  cache.put(request, clone)
                );

            }

            return response;

          })
          .catch(() => cached);

      return cached || networkFetch;

    })
  );

});
