/* =========================================================
   SRINEET MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const drawer = document.getElementById("drawer");
const drawerOverlay = document.getElementById("drawerOverlay");
const menuBtn = document.getElementById("menuBtn");
const closeDrawer = document.getElementById("closeDrawer");

const telegramModal = document.getElementById("telegramModal");
const telegramClose = document.getElementById("telegramClose");
const telegramLater = document.getElementById("telegramLater");

const announcementModal =
  document.getElementById("announcementModal");

const announcementBtn =
  document.getElementById("announcementBtn");

const homePage =
  document.getElementById("homePage");

const featurePage =
  document.getElementById("featurePage");

const featureTitle =
  document.getElementById("featureTitle");

const featureEyebrow =
  document.getElementById("featureEyebrow");

const featureDescription =
  document.getElementById("featureDescription");

const featureContent =
  document.getElementById("featureContent");


/* =========================================================
   DRAWER
========================================================= */

function openDrawer() {
  drawer.classList.add("open");
  drawerOverlay.classList.add("open");

  document.body.style.overflow = "hidden";
}

function closeDrawerMenu() {
  drawer.classList.remove("open");
  drawerOverlay.classList.remove("open");

  document.body.style.overflow = "";
}

menuBtn.addEventListener("click", openDrawer);
closeDrawer.addEventListener("click", closeDrawerMenu);
drawerOverlay.addEventListener("click", closeDrawerMenu);


/* =========================================================
   FEATURE DATA
========================================================= */

const features = {

  tests: {

    title: "Test Series",

    eyebrow: "PREMIUM CBT PREPARATION",

    description:
      "Attempt focused NEET tests in a clean CBT-style experience.",

    cards: [

      {
        number: "01",
        title: "Physics",
        text: "Practice physics tests chapter by chapter.",
        button: "VIEW TESTS"
      },

      {
        number: "02",
        title: "Chemistry",
        text: "Build speed and accuracy with chemistry tests.",
        button: "VIEW TESTS"
      },

      {
        number: "03",
        title: "Biology",
        text: "Strengthen your biology preparation with focused tests.",
        button: "VIEW TESTS"
      },

      {
        number: "04",
        title: "Full Syllabus",
        text: "Experience complete NEET-style examination practice.",
        button: "VIEW TESTS"
      }

    ]

  },


  pyq: {

    title: "PYQ Chapterwise",

    eyebrow: "PREVIOUS YEAR QUESTIONS",

    description:
      "Study the questions that have actually appeared in NEET and understand the pattern chapter by chapter.",

    cards: [

      {
        number: "01",
        title: "Physics PYQ",
        text: "Explore Physics previous year questions chapterwise.",
        button: "EXPLORE"
      },

      {
        number: "02",
        title: "Chemistry PYQ",
        text: "Revise important Chemistry PYQs chapter by chapter.",
        button: "EXPLORE"
      },

      {
        number: "03",
        title: "Biology PYQ",
        text: "Master Biology through high-value previous year questions.",
        button: "EXPLORE"
      }

    ]

  },


  notes: {

    title: "Smart Notes",

    eyebrow: "REVISION MATERIAL",

    description:
      "Keep your important concepts organised and ready whenever revision time arrives.",

    cards: [

      {
        number: "01",
        title: "Physics Notes",
        text: "Important concepts and revision material.",
        button: "OPEN NOTES"
      },

      {
        number: "02",
        title: "Chemistry Notes",
        text: "Quick revision resources for Chemistry.",
        button: "OPEN NOTES"
      },

      {
        number: "03",
        title: "Biology Notes",
        text: "Focused revision material for Biology.",
        button: "OPEN NOTES"
      }

    ]

  },


  practice: {

    title: "Practice Zone",

    eyebrow: "CHAPTERWISE PRACTICE",

    description:
      "Practice consistently, identify weak areas and improve accuracy chapter by chapter.",

    cards: [

      {
        number: "01",
        title: "Physics Practice",
        text: "Sharpen your Physics accuracy.",
        button: "PRACTICE"
      },

      {
        number: "02",
        title: "Chemistry Practice",
        text: "Build Chemistry confidence through focused practice.",
        button: "PRACTICE"
      },

      {
        number: "03",
        title: "Biology Practice",
        text: "Strengthen Biology with chapterwise questions.",
        button: "PRACTICE"
      }

    ]

  }

};


/* =========================================================
   OPEN FEATURE
========================================================= */

function openFeature(type) {

  const data = features[type];

  if (!data) return;

  closeDrawerMenu();

  homePage.classList.remove("active");
  featurePage.classList.add("active");

  featureTitle.textContent = data.title;
  featureEyebrow.textContent = data.eyebrow;
  featureDescription.textContent = data.description;

  featureContent.innerHTML = "";

  data.cards.forEach((card) => {

    const element = document.createElement("article");

    element.className = "resource-card";

    element.innerHTML = `
      <span class="resource-card-number">
        ${card.number}
      </span>

      <h3>${card.title}</h3>

      <p>${card.text}</p>

      <button class="resource-button">
        ${card.button} →
      </button>
    `;

    featureContent.appendChild(element);

  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  /* Telegram popup for main sections */

  showTelegramForSection(type);
}


/* =========================================================
   HOME
========================================================= */

function goHome() {

  closeDrawerMenu();

  featurePage.classList.remove("active");
  homePage.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   TELEGRAM POPUP SYSTEM
=========================================================

   Each main section has its own state.

   Example:

   srineet_telegram_tests
   srineet_telegram_pyq
   srineet_telegram_notes
   srineet_telegram_practice
========================================================= */

function showTelegramForSection(section) {

  const key =
    `srineet_telegram_${section}`;

  const alreadySeen =
    localStorage.getItem(key);

  if (alreadySeen === "true") {
    return;
  }

  setTimeout(() => {

    telegramModal.classList.add("open");

    telegramModal.dataset.section = section;

  }, 350);
}


function closeTelegram(markSeen = true) {

  const section =
    telegramModal.dataset.section;

  if (markSeen && section) {

    localStorage.setItem(
      `srineet_telegram_${section}`,
      "true"
    );

  }

  telegramModal.classList.remove("open");
}


telegramClose.addEventListener(
  "click",
  () => closeTelegram(true)
);

telegramLater.addEventListener(
  "click",
  () => closeTelegram(true)
);

telegramModal.addEventListener(
  "click",
  (event) => {

    if (event.target === telegramModal) {
      closeTelegram(true);
    }

  }
);


/* =========================================================
   TELEGRAM JOIN
========================================================= */

document
  .getElementById("telegramJoin")
  .addEventListener("click", () => {

    const section =
      telegramModal.dataset.section;

    if (section) {

      localStorage.setItem(
        `srineet_telegram_${section}`,
        "true"
      );

    }

  });


/* =========================================================
   COUNTDOWN
========================================================= */

const targetDate =
  new Date("2027-05-02T00:00:00+05:30").getTime();


function updateCountdown() {

  const now = Date.now();

  let difference =
    targetDate - now;

  if (difference < 0) {
    difference = 0;
  }

  const totalSeconds =
    Math.floor(difference / 1000);

  const days =
    Math.floor(totalSeconds / 86400);

  const hours =
    Math.floor(
      (totalSeconds % 86400) / 3600
    );

  const minutes =
    Math.floor(
      (totalSeconds % 3600) / 60
    );

  document.getElementById("days")
    .textContent =
    String(days).padStart(3, "0");

  document.getElementById("hours")
    .textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes")
    .textContent =
    String(minutes).padStart(2, "0");

}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


/* =========================================================
   HERO SECOND COUNTER
========================================================= */

let heroSeconds = 9;

function updateHeroSeconds() {

  heroSeconds--;

  if (heroSeconds < 0) {
    heroSeconds = 9;
  }

  document.getElementById(
    "heroSeconds"
  ).textContent =
    String(heroSeconds).padStart(2, "0");

}

setInterval(
  updateHeroSeconds,
  1000
);


/* =========================================================
   ANNOUNCEMENT
========================================================= */

announcementBtn.addEventListener(
  "click",
  () => {

    announcementModal.classList.add("open");

  }
);


function closeAnnouncement() {

  announcementModal.classList.remove("open");

}


announcementModal.addEventListener(
  "click",
  (event) => {

    if (event.target === announcementModal) {
      closeAnnouncement();
    }

  }
);


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeDrawerMenu();
      closeTelegram(false);
      closeAnnouncement();

    }

  }
);


/* =========================================================
   PREVENT CARD BUTTON BUBBLING
========================================================= */

document
  .querySelectorAll(".card-arrow")
  .forEach((button) => {

    button.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

      }
    );

  });


/* =========================================================
   INITIAL STATE
========================================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add("loaded");

  }
);
