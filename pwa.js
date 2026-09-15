"use strict";

/*
=========================================================
SRINEET — PWA REGISTRATION
Har page mein ye script include karo. Isse browser
service-worker.js ko register kar leta hai aur site
installable + offline-ready ban jati hai.
=========================================================
*/

if ("serviceWorker" in navigator) {

  window.addEventListener(
    "load",
    () => {

      navigator.serviceWorker
        .register("service-worker.js")
        .catch(error => {

          console.error(
            "SRINEET Service Worker Error:",
            error
          );

        });

    }
  );

}
