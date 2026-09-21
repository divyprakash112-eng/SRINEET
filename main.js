"use strict";

/* SRINEET premium homepage — target interface build */

(function () {
  const menuButton = document.getElementById("menuButton");
  const menuClose = document.getElementById("menuClose");
  const menuOverlay = document.getElementById("menuOverlay");
  const studyMenu = document.getElementById("studyMenu");

  function openMenu() {
    if (!studyMenu || !menuOverlay) return;

    studyMenu.classList.add("open");
    menuOverlay.classList.add("open");

    studyMenu.setAttribute("aria-hidden", "false");
    menuButton?.setAttribute("aria-expanded", "true");

    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    if (!studyMenu || !menuOverlay) return;

    studyMenu.classList.remove("open");
    menuOverlay.classList.remove("open");

    studyMenu.setAttribute("aria-hidden", "true");
    menuButton?.setAttribute("aria-expanded", "false");

    document.body.classList.remove("menu-open");
  }

  menuButton?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);
  menuOverlay?.addEventListener("click", closeMenu);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.querySelectorAll(".menu-link").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });


  /* =====================================================
     NEET 2027 COUNTDOWN
     Fixed: 02 May 2027 — India Standard Time
  ===================================================== */

  const target =
    new Date("2027-05-02T00:00:00+05:30").getTime();

  const els = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("secondsBox")
  };


  function pad(value, size) {
    return String(value).padStart(size, "0");
  }


  function tick(element, value) {

    if (!element) {
      return;
    }

    const changed =
      element.textContent !== value;

    element.textContent = value;

    if (!changed) {
      return;
    }

    const box =
      element.closest(".count-box");

    if (!box) {
      return;
    }

    box.classList.remove("is-ticking");

    /*
     * Force reflow so the animation
     * can replay every second.
     */
    void box.offsetWidth;

    box.classList.add("is-ticking");

    window.setTimeout(function () {
      box.classList.remove("is-ticking");
    }, 450);
  }


  function updateCountdown() {

    let difference =
      target - Date.now();

    if (difference < 0) {
      difference = 0;
    }

    const total =
      Math.floor(difference / 1000);

    const days =
      Math.floor(total / 86400);

    const hours =
      Math.floor(
        (total % 86400) / 3600
      );

    const minutes =
      Math.floor(
        (total % 3600) / 60
      );

    const seconds =
      total % 60;


    tick(
      els.days,
      pad(days, 3)
    );

    tick(
      els.hours,
      pad(hours, 2)
    );

    tick(
      els.minutes,
      pad(minutes, 2)
    );

    tick(
      els.seconds,
      pad(seconds, 2)
    );
  }


  updateCountdown();

  window.setInterval(
    updateCountdown,
    1000
  );


  /* =====================================================
     EXISTING LOCAL PROGRESS SYSTEM
     Read-only integration
  ===================================================== */

  let totalAvailableTests =
    null;


  function loadTotalTestCount() {

    fetch("data/tests.json", { cache: "no-store" })
      .then(response => response.ok ? response.json() : [])
      .then(data => {

        if (!Array.isArray(data)) {
          return;
        }

        totalAvailableTests =
          data.filter(
            test => test.status !== "upcoming" && test.status !== "hidden"
          ).length;

        updateProgress();

      })
      .catch(error => {

        console.error(
          "SRINEET Test Count Error:",
          error
        );

      });

  }


  function updateProgress() {

    const summary =
      window.SrineetProgress?.getSummary?.();

    const streak =
      Number(
        window.SrineetStreak?.getStreak?.() || 0
      );

    if (!summary) {
      return;
    }


    const tests =
      Number(summary.testsTaken) || 0;

    const accuracy =
      Math.max(
        0,
        Math.min(
          100,
          Number(summary.averageAccuracy) || 0
        )
      );


    const totalTests =
      totalAvailableTests || 1;

    const testPercent =
      Math.max(
        0,
        Math.min(
          100,
          (tests / totalTests) * 100
        )
      );


    const streakPercent =
      Math.max(
        0,
        Math.min(
          100,
          (streak / 30) * 100
        )
      );


    const testLabel =
      document.getElementById(
        "prepTestsAttempted"
      );

    const accuracyLabel =
      document.getElementById(
        "prepAccuracy"
      );

    const streakLabel =
      document.getElementById(
        "prepStreakDays"
      );


    const testBar =
      document.getElementById(
        "prepTestsBar"
      );

    const accuracyBar =
      document.getElementById(
        "prepAccuracyBar"
      );

    const streakBar =
      document.getElementById(
        "prepStreakBar"
      );


    if (testLabel) {

      testLabel.textContent =
        totalAvailableTests === null
          ? `${tests} / ...`
          : `${tests} / ${totalAvailableTests}`;

    }


    if (accuracyLabel) {
      accuracyLabel.textContent =
        `${accuracy}%`;
    }


    if (streakLabel) {
      streakLabel.textContent =
        `${streak} ${
          streak === 1
            ? "day"
            : "days"
        }`;
    }


    if (testBar) {
      testBar.style.width =
        `${testPercent}%`;
    }


    if (accuracyBar) {
      accuracyBar.style.width =
        `${accuracy}%`;
    }


    if (streakBar) {
      streakBar.style.width =
        `${streakPercent}%`;
    }
  }


  updateProgress();

  loadTotalTestCount();


  window.addEventListener(
    "load",
    function () {

      updateProgress();

      window.setTimeout(
        updateProgress,
        250
      );

    }
  );


  /* =====================================================
     INVITE A FRIEND
     Original sharing behaviour preserved
  ===================================================== */

  const invite =
    document.getElementById(
      "inviteFriendBtn"
    );


  invite?.addEventListener(
    "click",
    async function () {

      const shareData = {
        title:
          "SRINEET — Complete NEET Preparation",

        text:
          "Maine SRINEET use kiya NEET prep ke liye — test series, PYQs, sab free mein. Tum bhi try karo:",

        url:
          window.location.origin +
          window.location.pathname.replace(
            "index.html",
            ""
          )
      };


      if (navigator.share) {

        try {

          await navigator.share(
            shareData
          );

        } catch (_) {
          /* User cancelled */
        }

      } else {

        const url =
          "https://wa.me/?text=" +
          encodeURIComponent(
            `${shareData.text} ${shareData.url}`
          );

        window.open(
          url,
          "_blank",
          "noopener,noreferrer"
        );
      }
    }
  );


  /* =====================================================
     LIGHTWEIGHT REVEAL
     premium.js remains loaded separately.
  ===================================================== */

  function initRevealFallback() {

    const items =
      document.querySelectorAll(
        ".reveal:not(.is-visible):not(.revealed)"
      );


    if (!items.length) {
      return;
    }


    const reduce =
      window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      )?.matches;


    if (
      reduce ||
      !("IntersectionObserver" in window)
    ) {

      items.forEach(function (item) {

        item.classList.add(
          "is-visible",
          "revealed"
        );

      });

      return;
    }


    const observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              entry.target.classList.add(
                "is-visible",
                "revealed"
              );


              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.08,
          rootMargin:
            "0px 0px -25px 0px"
        }
      );


    items.forEach(
      function (item) {

        observer.observe(item);

      }
    );
  }


  initRevealFallback();


  document.documentElement.classList.add(
    "srineet-ready"
  );

})();
