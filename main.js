"use strict";


/*
=========================================================
SRINEET HOMEPAGE
Main JavaScript
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


/*
=========================================================
CLOSE MENU AFTER NAVIGATION
=========================================================
*/

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

/*
  Target:
  02 May 2027

  India timezone is used because SRINEET is
  designed for NEET students in India.
*/

const examDate =
  new Date(
    "2027-05-02T00:00:00+05:30"
  );


const daysElement =
  document.getElementById("days");

const hoursElement =
  document.getElementById("hours");

const minutesElement =
  document.getElementById("minutes");

const secondsText =
  document.getElementById("secondsText");


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

    if (secondsText) {
      secondsText.textContent =
        "NEET 2027 has arrived";
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


  if (secondsText) {

    secondsText.textContent =
      `${padNumber(seconds, 2)} seconds remaining`;

  }

}


/*
  Run immediately so the page doesn't
  wait one second for the first update.
*/

updateCountdown();


/*
  Update every second.
*/

setInterval(
  updateCountdown,
  1000
);


/* =======================================================
   CARD KEYBOARD SUPPORT
======================================================= */

const featureCards =
  document.querySelectorAll(".feature-card");


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
   PAGE READY
======================================================= */

document.documentElement.classList.add(
  "srineet-ready"
);
