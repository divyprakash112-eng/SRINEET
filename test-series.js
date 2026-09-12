/* =========================================================
   SRINEET TEST SERIES
========================================================= */

"use strict";


/* =========================================================
   INSTITUTE DATA
========================================================= */

const institutes = [

  {
    id: "pw",
    name: "Physics Wallah",
    short: "PW",
    logo: "assets/logos/pw.webp",
    description: "NEET test series"
  },

  {
    id: "aakash",
    name: "Aakash Institute",
    short: "AAKASH",
    logo: "assets/logos/aakash.webp",
    description: "NEET test series"
  },

  {
    id: "allen",
    name: "ALLEN",
    short: "ALLEN",
    logo: "assets/logos/allen.webp",
    description: "NEET test series"
  },

  {
    id: "narayana",
    name: "Narayana",
    short: "NARAYANA",
    logo: "assets/logos/narayana.webp",
    description: "NEET test series"
  },

  {
    id: "unacademy",
    name: "Unacademy",
    short: "UNACADEMY",
    logo: "assets/logos/unacademy.webp",
    description: "NEET test series"
  },

  {
    id: "motion",
    name: "Motion Education",
    short: "MOTION",
    logo: "assets/logos/motion.webp",
    description: "NEET test series"
  },

  {
    id: "resonance",
    name: "Resonance",
    short: "RESONANCE",
    logo: "assets/logos/resonance.webp",
    description: "NEET test series"
  },

  {
    id: "vedantu",
    name: "Vedantu",
    short: "VEDANTU",
    logo: "assets/logos/vedantu.webp",
    description: "NEET test series"
  },

  {
    id: "sri-chaitanya",
    name: "Sri Chaitanya",
    short: "SRI CHAITANYA",
    logo: "assets/logos/sri-chaitanya.webp",
    description: "NEET test series"
  },

  {
    id: "career-point",
    name: "Career Point",
    short: "CAREER POINT",
    logo: "assets/logos/career-point.webp",
    description: "NEET test series"
  }

];


/* =========================================================
   DOM
========================================================= */

const instituteGrid =
  document.getElementById("instituteGrid");

const instituteCount =
  document.getElementById("instituteCount");


/* =========================================================
   CREATE CARD
========================================================= */

function createInstituteCard(institute, index) {

  const card = document.createElement("a");

  card.className = "institute-card";

  card.href =
    `institute.html?id=${encodeURIComponent(institute.id)}`;

  card.setAttribute(
    "aria-label",
    `Open ${institute.name} test series`
  );


  card.innerHTML = `

    <div class="card-top">

      <span class="institute-number">
        ${String(index + 1).padStart(2, "0")}
      </span>

      <span class="card-arrow">
        →
      </span>

    </div>


    <div class="logo-box">

      <img
        src="${institute.logo}"
        alt="${institute.name} logo"
        loading="lazy"
      >

      <div class="logo-fallback">
        ${escapeHTML(institute.short)}
        <small>NEET</small>
      </div>

    </div>


    <div class="card-bottom">

      <h3>
        ${escapeHTML(institute.name)}
      </h3>

      <p>
        ${escapeHTML(institute.description)}
      </p>

    </div>

  `;


  const image =
    card.querySelector("img");

  const fallback =
    card.querySelector(".logo-fallback");


  /*
    Logo exists:
    show image

    Logo missing:
    show fallback
  */

  fallback.style.display = "none";

  image.addEventListener("error", () => {

    image.style.display = "none";
    fallback.style.display = "block";

  });


  return card;
}


/* =========================================================
   RENDER
========================================================= */

function renderInstitutes() {

  if (!instituteGrid) return;

  instituteGrid.innerHTML = "";

  institutes.forEach((institute, index) => {

    instituteGrid.appendChild(
      createInstituteCard(institute, index)
    );

  });

  if (instituteCount) {
    instituteCount.textContent = institutes.length;
  }

}


/* =========================================================
   DRAWER
========================================================= */

const menuBtn =
  document.getElementById("menuBtn");

const drawer =
  document.getElementById("sideDrawer");

const drawerOverlay =
  document.getElementById("drawerOverlay");

const drawerClose =
  document.getElementById("drawerClose");


function openDrawer() {

  drawer?.classList.add("open");
  drawerOverlay?.classList.add("show");

  document.body.style.overflow = "hidden";

}


function closeDrawer() {

  drawer?.classList.remove("open");
  drawerOverlay?.classList.remove("show");

  document.body.style.overflow = "";

}


menuBtn?.addEventListener(
  "click",
  openDrawer
);

drawerClose?.addEventListener(
  "click",
  closeDrawer
);

drawerOverlay?.addEventListener(
  "click",
  closeDrawer
);


/* ESC */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    closeDrawer();
  }

});


/* =========================================================
   SAFE HTML
========================================================= */

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* =========================================================
   TELEGRAM POPUP
   Trigger when Test Series itself opens.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  renderInstitutes();

  /*
    Popup component controls frequency.
    Test Series = first-level section.
  */

  if (window.SRINEETTelegramPopup) {

    window.SRINEETTelegramPopup.show({
      key: "test-series",
      title: "Join the SRINEET Community",
      message:
        "Get test updates, important announcements and NEET preparation resources directly on Telegram."
    });

  }

});
