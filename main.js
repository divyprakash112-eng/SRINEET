"use strict";

/*
=========================================================
SRINEET HOMEPAGE — MAIN JS
---------------------------------------------------------
Connected:
1. Mobile study menu
2. NEET 2027 countdown
3. Progress tracker
4. Study streak
5. Premium hero animation
6. Hero mouse parallax
7. Hero arrows / dots interaction
8. Card keyboard support
9. Page ready state

Existing IDs/functions are preserved.
=========================================================
*/


/* =======================================================
   MOBILE STUDY MENU
======================================================= */

const menuButton =
  document.getElementById("menuButton");

const menuClose =
  document.getElementById("menuClose");

const menuOverlay =
  document.getElementById("menuOverlay");

const studyMenu =
  document.getElementById("studyMenu");


function openStudyMenu() {

  if (!studyMenu || !menuOverlay) {
    return;
  }

  studyMenu.classList.add("open");
  menuOverlay.classList.add("open");

  studyMenu.setAttribute(
    "aria-hidden",
    "false"
  );

  menuButton?.setAttribute(
    "aria-expanded",
    "true"
  );

  document.body.style.overflow = "hidden";
}


function closeStudyMenu() {

  if (!studyMenu || !menuOverlay) {
    return;
  }

  studyMenu.classList.remove("open");
  menuOverlay.classList.remove("open");

  studyMenu.setAttribute(
    "aria-hidden",
    "true"
  );

  menuButton?.setAttribute(
    "aria-expanded",
    "false"
  );

  document.body.style.overflow = "";
}


menuButton?.addEventListener(
  "click",
  openStudyMenu
);


menuClose?.addEventListener(
  "click",
  closeStudyMenu
);


menuOverlay?.addEventListener(
  "click",
  closeStudyMenu
);


document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Escape") {
      closeStudyMenu();
    }

  }
);


/* =======================================================
   CLOSE MENU AFTER NAVIGATION
======================================================= */

const menuLinks =
  document.querySelectorAll(".menu-link");


menuLinks.forEach(
  function (link) {

    link.addEventListener(
      "click",
      closeStudyMenu
    );

  }
);


/* =======================================================
   NEET 2027 COUNTDOWN
======================================================= */

const examDate =
  new Date(
    "2027-05-02T00:00:00+05:30"
  );


/*
  New homepage IDs
*/

const daysElement =
  document.getElementById("days");

const hoursElement =
  document.getElementById("hours");

const minutesElement =
  document.getElementById("minutes");

const secondsElement =
  document.getElementById("seconds");


/*
  Old / alternate IDs preserved
  so older countdown markup doesn't break.
*/

const secondsTextElement =
  document.getElementById("secondsText");

const secondsBoxElement =
  document.getElementById("secondsBox");


function padNumber(
  number,
  length
) {

  return String(number)
    .padStart(length, "0");

}


function updateCountdown() {

  const now =
    new Date();

  const difference =
    examDate.getTime() -
    now.getTime();


  /*
   * Exam date reached
   */

  if (difference <= 0) {

    if (daysElement) {
      daysElement.textContent = "000";
    }

    if (hoursElement) {
      hoursElement.textContent = "00";
    }

    if (minutesElement) {
      minutesElement.textContent = "00";
    }

    if (secondsElement) {
      secondsElement.textContent = "00";
    }

    if (secondsTextElement) {
      secondsTextElement.textContent =
        "NEET 2027 has arrived";
    }

    if (secondsBoxElement) {
      secondsBoxElement.textContent = "00";
    }

    return;
  }


  const totalSeconds =
    Math.floor(
      difference / 1000
    );


  const days =
    Math.floor(
      totalSeconds / 86400
    );


  const hours =
    Math.floor(
      (totalSeconds % 86400) / 3600
    );


  const minutes =
    Math.floor(
      (totalSeconds % 3600) / 60
    );


  const seconds =
    totalSeconds % 60;


  /*
   * Update homepage countdown
   */

  if (daysElement) {

    daysElement.textContent =
      padNumber(days, 3);

  }


  if (hoursElement) {

    hoursElement.textContent =
      padNumber(hours, 2);

  }


  if (minutesElement) {

    minutesElement.textContent =
      padNumber(minutes, 2);

  }


  if (secondsElement) {

    secondsElement.textContent =
      padNumber(seconds, 2);

  }


  /*
   * Legacy countdown support
   */

  if (secondsTextElement) {

    secondsTextElement.textContent =
      `${padNumber(seconds, 2)} seconds remaining`;

  }


  if (secondsBoxElement) {

    secondsBoxElement.textContent =
      padNumber(seconds, 2);

  }

}


/*
  First update immediately.
*/

updateCountdown();


/*
  Update every second.
*/

const countdownTimer =
  setInterval(
    updateCountdown,
    1000
  );


/* =======================================================
   PROGRESS + STREAK HOMEPAGE SYNC
======================================================= */

/*
  IMPORTANT:
  progress-tracker.js and streak.js are loaded after main.js.

  Isliye initialization DOMContentLoaded ke andar hai.
*/


function updateHomepageProgress() {

  /*
   * -------------------------------
   * Progress tracker
   * -------------------------------
   */

  const testsElement =
    document.getElementById("testsAttempted");

  const testsProgressElement =
    document.getElementById("testsProgress");

  const accuracyElement =
    document.getElementById("accuracy");

  const accuracyProgressElement =
    document.getElementById("accuracyProgress");


  /*
   * Agar progress-tracker.js load ho gaya hai
   */

  if (
    window.SrineetProgress &&
    typeof window.SrineetProgress.getSummary ===
      "function"
  ) {

    const summary =
      window.SrineetProgress.getSummary();


    /*
     * Tests
     *
     * Homepage currently displays:
     * 0 / 150
     */

    const testsTaken =
      Number(summary.testsTaken) || 0;

    const maxTests = 150;


    if (testsElement) {

      testsElement.textContent =
        `${testsTaken} / ${maxTests}`;

    }


    if (testsProgressElement) {

      const testPercent =
        Math.min(
          (testsTaken / maxTests) * 100,
          100
        );

      testsProgressElement.style.width =
        `${testPercent}%`;

    }


    /*
     * Accuracy
     */

    const accuracy =
      Math.max(
        0,
        Math.min(
          Number(summary.averageAccuracy) || 0,
          100
        )
      );


    if (accuracyElement) {

      accuracyElement.textContent =
        `${accuracy}%`;

    }


    if (accuracyProgressElement) {

      accuracyProgressElement.style.width =
        `${accuracy}%`;

    }

  }


  /*
   * -------------------------------
   * Streak
   * -------------------------------
   */

  const streakElement =
    document.getElementById("streakCount");

  const streakProgressElement =
    document.getElementById("streakProgress");


  if (
    window.SrineetStreak &&
    typeof window.SrineetStreak.getStreak ===
      "function"
  ) {

    const streak =
      Number(
        window.SrineetStreak.getStreak()
      ) || 0;


    if (streakElement) {

      streakElement.textContent =
        String(streak);

    }


    /*
     * Visual progress:
     * 30 days = 100%
     *
     * This is only a homepage visual indicator.
     * Actual streak remains controlled by streak.js.
     */

    if (streakProgressElement) {

      const streakPercent =
        Math.min(
          (streak / 30) * 100,
          100
        );

      streakProgressElement.style.width =
        `${streakPercent}%`;

    }

  }

}


/* =======================================================
   REFRESH PROGRESS WHEN TAB BECOMES ACTIVE
======================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    /*
     * progress-tracker.js and streak.js
     * are available by this point.
     */

    updateHomepageProgress();

    /*
     * Premium reveal system is in premium.js.
     * If available, make sure homepage reveal
     * elements are observed.
     */

    if (
      window.SrineetReveal &&
      typeof window.SrineetReveal.observe ===
        "function"
    ) {

      window.SrineetReveal.observe();

    }

  }
);


document.addEventListener(
  "visibilitychange",
  function () {

    if (!document.hidden) {
      updateHomepageProgress();
    }

  }
);


/*
 * If another script saves a test and dispatches
 * this custom event, homepage updates instantly.
 */

window.addEventListener(
  "srineet:progress-updated",
  updateHomepageProgress
);


/* =======================================================
   PREMIUM HERO ANIMATION
======================================================= */

const hero =
  document.querySelector(".srishti-hero");

const heroVisual =
  document.querySelector(".srishti-visual");

const heroRings =
  document.querySelectorAll(".visual-ring");

const heroPluses =
  document.querySelectorAll(".floating-plus");


/*
 * Add premium animation state.
 */

if (hero) {

  hero.classList.add(
    "premium-hero-active"
  );

}


/* =======================================================
   HERO MOUSE PARALLAX
======================================================= */

if (
  hero &&
  heroVisual &&
  window.matchMedia("(pointer: fine)").matches
) {

  let heroFrame = null;


  hero.addEventListener(
    "pointermove",
    function (event) {

      const rect =
        hero.getBoundingClientRect();


      const x =
        (event.clientX - rect.left) /
        rect.width;


      const y =
        (event.clientY - rect.top) /
        rect.height;


      const moveX =
        (x - 0.5) * 18;

      const moveY =
        (y - 0.5) * 12;


      if (heroFrame) {
        cancelAnimationFrame(heroFrame);
      }


      heroFrame =
        requestAnimationFrame(
          function () {

            heroVisual.style.transform =
              `translate3d(${moveX}px, ${moveY}px, 0)`;

          }
        );

    }
  );


  hero.addEventListener(
    "pointerleave",
    function () {

      if (heroFrame) {
        cancelAnimationFrame(heroFrame);
      }

      heroVisual.style.transform =
        "translate3d(0, 0, 0)";

    }
  );

}


/* =======================================================
   HERO RING MOTION
======================================================= */

heroRings.forEach(
  function (ring, index) {

    ring.style.setProperty(
      "--hero-ring-index",
      index
    );

  }
);


/* =======================================================
   FLOATING MEDICAL PLUS ANIMATION
======================================================= */

heroPluses.forEach(
  function (plus, index) {

    plus.style.setProperty(
      "--plus-index",
      index
    );

  }
);


/* =======================================================
   HERO ARROWS + DOTS
======================================================= */

const heroPrev =
  document.getElementById("heroPrev");

const heroNext =
  document.getElementById("heroNext");

const heroDots =
  document.querySelectorAll(".hero-dots span");


let activeHeroDot = 0;


function updateHeroDot(index) {

  if (!heroDots.length) {
    return;
  }


  activeHeroDot =
    Math.max(
      0,
      Math.min(
        index,
        heroDots.length - 1
      )
    );


  heroDots.forEach(
    function (dot, dotIndex) {

      dot.classList.toggle(
        "active",
        dotIndex === activeHeroDot
      );

    }
  );


  /*
   * Small premium visual movement.
   * No content/IDs are changed.
   */

  if (heroVisual) {

    heroVisual.classList.remove(
      "hero-shift-left",
      "hero-shift-right"
    );


    void heroVisual.offsetWidth;


    heroVisual.classList.add(
      activeHeroDot % 2 === 0
        ? "hero-shift-right"
        : "hero-shift-left"
    );

  }

}


heroPrev?.addEventListener(
  "click",
  function () {

    if (!heroDots.length) {
      return;
    }

    const nextIndex =
      activeHeroDot <= 0
        ? heroDots.length - 1
        : activeHeroDot - 1;

    updateHeroDot(nextIndex);

  }
);


heroNext?.addEventListener(
  "click",
  function () {

    if (!heroDots.length) {
      return;
    }

    const nextIndex =
      (activeHeroDot + 1) %
      heroDots.length;

    updateHeroDot(nextIndex);

  }
);


heroDots.forEach(
  function (dot, index) {

    dot.addEventListener(
      "click",
      function () {

        updateHeroDot(index);

      }
    );

  }
);


/*
 * Initial hero state.
 */

updateHeroDot(0);


/* =======================================================
   HERO AUTO ANIMATION
======================================================= */

let heroAutoTimer =
  null;


function startHeroAutoAnimation() {

  if (
    heroAutoTimer ||
    heroDots.length <= 1
  ) {
    return;
  }


  heroAutoTimer =
    setInterval(
      function () {

        if (document.hidden) {
          return;
        }

        const nextIndex =
          (activeHeroDot + 1) %
          heroDots.length;

        updateHeroDot(nextIndex);

      },
      5000
    );

}


function stopHeroAutoAnimation() {

  if (!heroAutoTimer) {
    return;
  }

  clearInterval(heroAutoTimer);

  heroAutoTimer = null;

}


startHeroAutoAnimation();


hero?.addEventListener(
  "mouseenter",
  stopHeroAutoAnimation
);


hero?.addEventListener(
  "mouseleave",
  startHeroAutoAnimation
);


/* =======================================================
   CARD KEYBOARD SUPPORT
======================================================= */

const featureCards =
  document.querySelectorAll(
    ".feature-card, .quick-card"
  );


featureCards.forEach(
  function (card) {

    card.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          card.click();

        }

      }
    );

  }
);


/* =======================================================
   SMOOTH INTERNAL LINKS
======================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(
    function (link) {

      link.addEventListener(
        "click",
        function (event) {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );


/* =======================================================
   PAGE READY
======================================================= */

document.documentElement.classList.add(
  "srineet-ready"
);


/*
 * Small delay so CSS can detect
 * the ready state cleanly.
 */

requestAnimationFrame(
  function () {

    document.documentElement.classList.add(
      "srineet-loaded"
    );

  }
);
