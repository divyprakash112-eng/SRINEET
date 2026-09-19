"use strict";

/*
=========================================================
SRINEET HOMEPAGE — FINAL PREMIUM MAIN JS
=========================================================
Keeps existing homepage functionality intact and adds:
- NEET 2027 countdown
- Countdown tick animation
- Progress snapshot
- Header streak sync
- Continue-where-you-left-off sync
- Mobile study menu
- Keyboard accessibility
- Premium reveal animation fallback
- Reduced-motion support
=========================================================
*/


/* =======================================================
   MOBILE STUDY MENU
======================================================= */

const menuButton = document.getElementById("menuButton");
const menuClose = document.getElementById("menuClose");
const menuOverlay = document.getElementById("menuOverlay");
const studyMenu = document.getElementById("studyMenu");


function openStudyMenu() {

  if (!studyMenu || !menuOverlay) {
    return;
  }

  studyMenu.classList.add("open");
  menuOverlay.classList.add("open");

  studyMenu.setAttribute("aria-hidden", "false");

  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "true");
  }

  document.body.classList.add("menu-open");
  document.body.style.overflow = "hidden";
}


function closeStudyMenu() {

  if (!studyMenu || !menuOverlay) {
    return;
  }

  studyMenu.classList.remove("open");
  menuOverlay.classList.remove("open");

  studyMenu.setAttribute("aria-hidden", "true");

  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "false");
  }

  document.body.classList.remove("menu-open");
  document.body.style.overflow = "";
}


if (menuButton) {
  menuButton.addEventListener(
    "click",
    openStudyMenu
  );
}


if (menuClose) {
  menuClose.addEventListener(
    "click",
    closeStudyMenu
  );
}


if (menuOverlay) {
  menuOverlay.addEventListener(
    "click",
    closeStudyMenu
  );
}


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

document
  .querySelectorAll(".menu-link")
  .forEach(function (link) {

    link.addEventListener(
      "click",
      closeStudyMenu
    );

  });


/* =======================================================
   NEET 2027 COUNTDOWN
   Target:
   02 MAY 2027 — India Standard Time
======================================================= */

const examDate =
  new Date("2027-05-02T00:00:00+05:30");


const daysElement =
  document.getElementById("days");

const hoursElement =
  document.getElementById("hours");

const minutesElement =
  document.getElementById("minutes");

const secondsElement =
  document.getElementById("secondsBox");


function padNumber(number, length) {

  return String(number).padStart(
    length,
    "0"
  );

}


/* =======================================================
   COUNTDOWN TICK EFFECT
======================================================= */

function setCountdownValue(
  element,
  value
) {

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

  box.classList.remove(
    "is-ticking"
  );

  /*
   * Force reflow so the animation
   * can replay every second.
   */
  void box.offsetWidth;

  box.classList.add(
    "is-ticking"
  );

  window.setTimeout(
    function () {

      box.classList.remove(
        "is-ticking"
      );

    },
    450
  );

}


/* =======================================================
   UPDATE COUNTDOWN
======================================================= */

function updateCountdown() {

  const difference =
    examDate.getTime() -
    Date.now();


  /* Exam date reached */

  if (difference <= 0) {

    setCountdownValue(
      daysElement,
      "000"
    );

    setCountdownValue(
      hoursElement,
      "00"
    );

    setCountdownValue(
      minutesElement,
      "00"
    );

    setCountdownValue(
      secondsElement,
      "00"
    );

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
      (totalSeconds % 86400) /
      3600
    );


  const minutes =
    Math.floor(
      (totalSeconds % 3600) /
      60
    );


  const seconds =
    totalSeconds % 60;


  setCountdownValue(
    daysElement,
    padNumber(days, 3)
  );


  setCountdownValue(
    hoursElement,
    padNumber(hours, 2)
  );


  setCountdownValue(
    minutesElement,
    padNumber(minutes, 2)
  );


  setCountdownValue(
    secondsElement,
    padNumber(seconds, 2)
  );

}


updateCountdown();


window.setInterval(
  updateCountdown,
  1000
);


/* =======================================================
   LIVE PROGRESS SNAPSHOT
======================================================= */

function updateProgressSnapshot() {

  /*
   * Existing progress system.
   * Nothing is removed or overwritten.
   */

  const summary =
    window.SrineetProgress &&
    typeof window.SrineetProgress.getSummary === "function"
      ? window.SrineetProgress.getSummary()
      : null;


  const streak =
    window.SrineetStreak &&
    typeof window.SrineetStreak.getStreak === "function"
      ? Number(
          window.SrineetStreak.getStreak()
        ) || 0
      : 0;


  if (!summary) {
    return;
  }


  const testsTaken =
    Number(
      summary.testsTaken
    ) || 0;


  const accuracy =
    Math.max(
      0,
      Math.min(
        100,
        Number(
          summary.averageAccuracy
        ) || 0
      )
    );


  /*
   * Visual target only.
   * Actual test count is never changed.
   */

  const testsTarget = 150;


  const testsPercent =
    Math.max(
      0,
      Math.min(
        100,
        (
          testsTaken /
          testsTarget
        ) * 100
      )
    );


  /*
   * Visual streak scale.
   * Actual streak remains untouched.
   */

  const streakPercent =
    Math.max(
      0,
      Math.min(
        100,
        (
          streak /
          30
        ) * 100
      )
    );


  const testsLabel =
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


  const testsBar =
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


  /* Tests */

  if (testsLabel) {

    testsLabel.textContent =
      `${testsTaken} / ${testsTarget}`;

  }


  /* Accuracy */

  if (accuracyLabel) {

    accuracyLabel.textContent =
      `${accuracy}%`;

  }


  /* Streak */

  if (streakLabel) {

    streakLabel.textContent =
      `${streak} ${
        streak === 1
          ? "day"
          : "days"
      }`;

  }


  /* Progress bars */

  if (testsBar) {

    testsBar.style.width =
      `${testsPercent}%`;

  }


  if (accuracyBar) {

    accuracyBar.style.width =
      `${accuracy}%`;

  }


  if (streakBar) {

    streakBar.style.width =
      `${streakPercent}%`;

  }


  /* Header streak */

  const headerStreak =
    document.getElementById(
      "headerStreakCount"
    );


  if (headerStreak) {

    headerStreak.textContent =
      String(streak);

  }

}


/*
 * Run immediately.
 */

updateProgressSnapshot();


/*
 * Small delayed sync in case the
 * existing progress modules finish
 * initializing after main.js.
 */

window.setTimeout(
  updateProgressSnapshot,
  120
);


/*
 * Additional sync after page load.
 */

window.addEventListener(
  "load",
  function () {

    updateProgressSnapshot();

  }
);


/* =======================================================
   CONTINUE WHERE YOU LEFT OFF
======================================================= */

function updateContinueBanner() {

  const banner =
    document.getElementById(
      "continueBanner"
    );


  if (!banner) {
    return;
  }


  /*
   * Existing continue system.
   */

  const lastAttempt =
    window.SrineetContinue &&
    typeof window.SrineetContinue.getLastAttempt === "function"
      ? window.SrineetContinue.getLastAttempt()
      : null;


  /*
   * If there is no attempt,
   * simply hide the banner.
   */

  if (!lastAttempt) {

    banner.classList.remove(
      "is-visible"
    );

    return;
  }


  const title =
    document.getElementById(
      "continueBannerTitle"
    );


  const sub =
    document.getElementById(
      "continueBannerSub"
    );


  if (title) {

    title.textContent =
      lastAttempt.title ||
      "Last Test";

  }


  if (sub) {

    const score =
      Number(
        lastAttempt.score
      ) || 0;


    const total =
      Number(
        lastAttempt.totalMarks
      ) || 0;


    const accuracy =
      Number(
        lastAttempt.accuracy
      ) || 0;


    if (total > 0) {

      sub.textContent =
        `${score}/${total} marks • ${accuracy}% accuracy`;

    } else {

      sub.textContent =
        `${accuracy}% accuracy`;

    }

  }


  banner.classList.add(
    "is-visible"
  );

}


updateContinueBanner();


window.addEventListener(
  "load",
  function () {

    updateContinueBanner();

  }
);


/* =======================================================
   CARD KEYBOARD ACCESSIBILITY
======================================================= */

document
  .querySelectorAll(
    ".feature-card"
  )
  .forEach(function (card) {

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

  });


/* =======================================================
   PREMIUM REVEAL FALLBACK
======================================================= */

function initRevealFallback() {

  const elements =
    document.querySelectorAll(
      ".reveal:not(.is-visible):not(.revealed)"
    );


  if (!elements.length) {
    return;
  }


  const reduceMotion =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /*
   * Accessibility:
   * If reduced motion is enabled,
   * show everything immediately.
   */

  if (
    reduceMotion ||
    !("IntersectionObserver" in window)
  ) {

    elements.forEach(
      function (element) {

        element.classList.add(
          "is-visible"
        );

        element.classList.add(
          "revealed"
        );

      }
    );

    return;
  }


  const observer =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(
          function (entry) {

            if (!entry.isIntersecting) {
              return;
            }


            entry.target.classList.add(
              "is-visible"
            );


            entry.target.classList.add(
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


  elements.forEach(
    function (element) {

      observer.observe(
        element
      );

    }
  );

}


initRevealFallback();


/* =======================================================
   CTA / NAVIGATION INTERACTIONS
======================================================= */

document
  .querySelectorAll(
    ".hero-cta, .hub-view-all"
  )
  .forEach(function (link) {

    link.addEventListener(
      "click",
      function () {

        closeStudyMenu();

      }
    );

  });


/* =======================================================
   CLOSE MENU WHEN CLICKING A PAGE LINK
======================================================= */

document
  .querySelectorAll(
    "a[href]"
  )
  .forEach(function (link) {

    link.addEventListener(
      "click",
      function () {

        /*
         * Only closes the mobile drawer.
         * Does not interfere with navigation.
         */

        if (
          document.body.classList.contains(
            "menu-open"
          )
        ) {

          closeStudyMenu();

        }

      }
    );

  });


/* =======================================================
   PREMIUM READY STATE
======================================================= */

document.documentElement.classList.add(
  "srineet-ready"
);


document.documentElement.classList.add(
  "srineet-fast-motion"
);


document.documentElement.classList.add(
  "srineet-medium-motion"
);


/* =======================================================
   FINAL SAFETY SYNC
======================================================= */

window.setTimeout(
  function () {

    updateProgressSnapshot();
    updateContinueBanner();

  },
  500
);
