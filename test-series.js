"use strict";


/* =========================
   ELEMENTS
========================= */

const instituteGrid =
  document.getElementById("instituteGrid");

const seriesError =
  document.getElementById("seriesError");


/* =========================
   INSTITUTE DATA
   FALLBACK INCLUDED
========================= */

const fallbackInstitutes = [
  {
    id: "pw",
    order: 1,
    name: "Physics Wallah",
    shortName: "PW",
    label: "TEST SERIES",
    description:
      "Explore NEET test series and practice sets from Physics Wallah."
  },
  {
    id: "allen",
    order: 2,
    name: "ALLEN",
    shortName: "ALLEN",
    label: "TEST SERIES",
    description:
      "Practice NEET-style tests with structured preparation."
  },
  {
    id: "aakash",
    order: 3,
    name: "Aakash Institute",
    shortName: "AI",
    label: "TEST SERIES",
    description:
      "Explore NEET practice tests and examination resources."
  },
  {
    id: "narayana",
    order: 4,
    name: "Narayana",
    shortName: "N",
    label: "TEST SERIES",
    description:
      "Build exam confidence with focused NEET practice."
  },
  {
    id: "unacademy",
    order: 5,
    name: "Unacademy",
    shortName: "UA",
    label: "TEST SERIES",
    description:
      "Practice concepts, accuracy and exam-style questions."
  },
  {
    id: "motion",
    order: 6,
    name: "Motion Education",
    shortName: "ME",
    label: "TEST SERIES",
    description:
      "Focused NEET test practice for consistent preparation."
  },
  {
    id: "resonance",
    order: 7,
    name: "Resonance",
    shortName: "R",
    label: "TEST SERIES",
    description:
      "Practice structured tests designed around NEET preparation."
  },
  {
    id: "vedantu",
    order: 8,
    name: "Vedantu",
    shortName: "V",
    label: "TEST SERIES",
    description:
      "Improve speed and accuracy with NEET practice tests."
  },
  {
    id: "sri-chaitanya",
    order: 9,
    name: "Sri Chaitanya",
    shortName: "SC",
    label: "TEST SERIES",
    description:
      "Explore chapter and full-syllabus NEET practice."
  },
  {
    id: "career-point",
    order: 10,
    name: "Career Point",
    shortName: "CP",
    label: "TEST SERIES",
    description:
      "Prepare with focused NEET examination practice."
  }
];


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* =========================
   CREATE CARD
========================= */

function createInstituteCard(institute) {

  const card =
    document.createElement("a");

  card.className =
    "institute-card";

  card.href =
    `institute.html?institute=${encodeURIComponent(
      institute.id
    )}`;

  card.setAttribute(
    "aria-label",
    `Open ${institute.name} test series`
  );


  card.innerHTML = `

    <span class="institute-number">
      ${String(institute.order).padStart(2, "0")}
    </span>

    <div
      class="institute-visual"
      aria-hidden="true"
    >
      ${escapeHTML(institute.shortName)}
    </div>

    <div class="institute-info">

      <span class="institute-label">
        ${escapeHTML(institute.label)}
      </span>

      <h3>
        ${escapeHTML(institute.name)}
      </h3>

    </div>

    <span
      class="institute-action"
      aria-hidden="true"
    >
      ↗
    </span>

  `;


  return card;
}


/* =========================
   RENDER
========================= */

function renderInstitutes(institutes) {

  instituteGrid.innerHTML = "";

  institutes
    .sort((a, b) => a.order - b.order)
    .forEach(institute => {

      instituteGrid.appendChild(
        createInstituteCard(institute)
      );

    });


  /*
    IMPORTANT:
    Error message hidden after
    successful rendering.
  */

  if (seriesError) {
    seriesError.hidden = true;
  }
}


/* =========================
   LOAD INSTITUTES
========================= */

async function loadInstitutes() {

  /*
    First render fallback data immediately.
    This prevents a blank page even if
    GitHub Pages has a JSON loading issue.
  */

  renderInstitutes(
    [...fallbackInstitutes]
  );


  /*
    Then try to load the real JSON file.
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
        `HTTP ${response.status}`
      );
    }


    const institutes =
      await response.json();


    if (
      !Array.isArray(institutes) ||
      institutes.length === 0
    ) {
      throw new Error(
        "Invalid institute data"
      );
    }


    renderInstitutes(institutes);


  } catch (error) {

    /*
      Fallback cards are already visible,
      so DO NOT show an error box.
    */

    console.warn(
      "SRINEET: institutes.json could not be loaded. Using built-in institute data.",
      error
    );

  }

}


/* =========================
   START
========================= */

loadInstitutes();
