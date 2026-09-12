"use strict";


/* =========================================================
   SRINEET TEST SERIES
   INSTITUTE DIRECTORY
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const instituteGrid =
  document.getElementById("instituteGrid");

const instituteCount =
  document.getElementById("instituteCount");

const seriesError =
  document.getElementById("seriesError");


/* =========================================================
   BUILT-IN INSTITUTE DATA
   This prevents the page from becoming blank if JSON
   loading fails on GitHub Pages.
========================================================= */

const institutes = [

  {
    id: "pw",
    order: 1,
    name: "Physics Wallah",
    shortName: "PW",
    description:
      "Explore NEET test series and practice sets from Physics Wallah."
  },

  {
    id: "allen",
    order: 2,
    name: "ALLEN",
    shortName: "ALLEN",
    description:
      "Practice NEET-style tests with structured preparation."
  },

  {
    id: "aakash",
    order: 3,
    name: "Aakash Institute",
    shortName: "AI",
    description:
      "Explore NEET practice tests and examination resources."
  },

  {
    id: "narayana",
    order: 4,
    name: "Narayana",
    shortName: "N",
    description:
      "Build exam confidence with focused NEET practice."
  },

  {
    id: "unacademy",
    order: 5,
    name: "Unacademy",
    shortName: "UA",
    description:
      "Practice concepts, accuracy and exam-style questions."
  },

  {
    id: "motion",
    order: 6,
    name: "Motion Education",
    shortName: "ME",
    description:
      "Focused NEET test practice for consistent preparation."
  },

  {
    id: "resonance",
    order: 7,
    name: "Resonance",
    shortName: "R",
    description:
      "Practice structured tests designed around NEET preparation."
  },

  {
    id: "vedantu",
    order: 8,
    name: "Vedantu",
    shortName: "V",
    description:
      "Improve speed and accuracy with NEET practice tests."
  },

  {
    id: "sri-chaitanya",
    order: 9,
    name: "Sri Chaitanya",
    shortName: "SC",
    description:
      "Explore chapter and full-syllabus NEET practice."
  },

  {
    id: "career-point",
    order: 10,
    name: "Career Point",
    shortName: "CP",
    description:
      "Prepare with focused NEET examination practice."
  }

];


/* =========================================================
   HTML ESCAPE
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
   CREATE INSTITUTE CARD
========================================================= */

function createInstituteCard(institute) {

  const card =
    document.createElement("a");

  card.className =
    "institute-card";


  /*
   * Institute page
   */

  card.href =
    `institute.html?institute=${encodeURIComponent(
      institute.id
    )}`;


  card.innerHTML = `

    <div class="institute-logo">
      ${escapeHTML(institute.shortName)}
    </div>


    <div class="institute-content">

      <div class="institute-order">
        INSTITUTE ${String(institute.order).padStart(2, "0")}
      </div>


      <h3 class="institute-name">
        ${escapeHTML(institute.name)}
      </h3>


      <p class="institute-description">
        ${escapeHTML(institute.description)}
      </p>

    </div>


    <div
      class="institute-arrow"
      aria-hidden="true"
    >
      →
    </div>

  `;


  return card;
}


/* =========================================================
   RENDER INSTITUTES
========================================================= */

function renderInstitutes(data) {

  if (!instituteGrid) {
    return;
  }


  instituteGrid.innerHTML = "";


  const sorted =
    [...data].sort(
      (a, b) =>
        Number(a.order) -
        Number(b.order)
    );


  sorted.forEach(
    institute => {

      instituteGrid.appendChild(
        createInstituteCard(institute)
      );

    }
  );


  if (instituteCount) {

    instituteCount.textContent =
      String(sorted.length)
        .padStart(2, "0");

  }

}


/* =========================================================
   LOAD JSON
========================================================= */

async function loadInstituteData() {

  /*
   * FIRST:
   * Render built-in data immediately.
   *
   * So "Loading..." will NEVER appear.
   */

  renderInstitutes(institutes);


  /*
   * SECOND:
   * Try loading the real JSON.
   */

  try {

    const response =
      await fetch(
        "./data/institutes.json",
        {
          cache: "no-store"
        }
      );


    if (!response.ok) {
      throw new Error(
        "institutes.json not available"
      );
    }


    const data =
      await response.json();


    if (!Array.isArray(data)) {
      throw new Error(
        "Invalid institutes.json"
      );
    }


    if (data.length > 0) {

      renderInstitutes(data);

    }


    if (seriesError) {
      seriesError.hidden = true;
    }


  } catch (error) {

    /*
     * Built-in data is already visible.
     * Therefore do NOT show an error to the user.
     */

    console.warn(
      "SRINEET: Using built-in institute data.",
      error
    );

  }

}


/* =========================================================
   START
========================================================= */

loadInstituteData();
