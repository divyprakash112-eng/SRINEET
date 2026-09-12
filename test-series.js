"use strict";

/* =========================================================
   SRINEET TEST PAPER PAGE
   Robust version for GitHub Pages
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const batchMark = document.getElementById("batchMark");
const instituteLabel = document.getElementById("instituteLabel");
const batchName = document.getElementById("batchName");
const batchDescription = document.getElementById("batchDescription");
const totalTests = document.getElementById("totalTests");
const batchMeta = document.getElementById("batchMeta");
const testList = document.getElementById("testList");
const testEmpty = document.getElementById("testEmpty");
const paperError = document.getElementById("paperError");

const filterButtons =
  document.querySelectorAll(".filter-button");


/* =========================================================
   URL PARAMETERS
========================================================= */

const params =
  new URLSearchParams(window.location.search);

const instituteId =
  params.get("institute");

const batchId =
  params.get("batch");


/* =========================================================
   FALLBACK INSTITUTES
========================================================= */

const institutes = {

  pw: {
    id: "pw",
    name: "Physics Wallah",
    shortName: "PW"
  },

  allen: {
    id: "allen",
    name: "ALLEN",
    shortName: "ALLEN"
  },

  aakash: {
    id: "aakash",
    name: "Aakash Institute",
    shortName: "AI"
  },

  narayana: {
    id: "narayana",
    name: "Narayana",
    shortName: "N"
  },

  unacademy: {
    id: "unacademy",
    name: "Unacademy",
    shortName: "UA"
  },

  motion: {
    id: "motion",
    name: "Motion Education",
    shortName: "ME"
  },

  resonance: {
    id: "resonance",
    name: "Resonance",
    shortName: "R"
  },

  vedantu: {
    id: "vedantu",
    name: "Vedantu",
    shortName: "V"
  },

  "sri-chaitanya": {
    id: "sri-chaitanya",
    name: "Sri Chaitanya",
    shortName: "SC"
  },

  "career-point": {
    id: "career-point",
    name: "Career Point",
    shortName: "CP"
  }

};


/* =========================================================
   FALLBACK BATCHES
========================================================= */

const batches = {

  "pw-yakeen-1-0": {
    id: "pw-yakeen-1-0",
    instituteId: "pw",
    name: "Yakeen 1.0",
    subtitle:
      "Focused NEET 2027 exam-style practice",
    year: "NEET 2027",
    type: "Full Test Series"
  },

  "pw-yakeen-2-0": {
    id: "pw-yakeen-2-0",
    instituteId: "pw",
    name: "Yakeen 2.0",
    subtitle:
      "Complete NEET practice and revision",
    year: "NEET 2027",
    type: "Full Test Series"
  },

  "pw-neet-dropper": {
    id: "pw-neet-dropper",
    instituteId: "pw",
    name: "NEET Dropper",
    subtitle:
      "Dedicated practice for NEET droppers",
    year: "NEET 2027",
    type: "Test Series"
  },

  "pw-real-test": {
    id: "pw-real-test",
    instituteId: "pw",
    name: "Real Test",
    subtitle:
      "Practice with a real-exam approach",
    year: "NEET 2027",
    type: "Full Test Series"
  }

};


/* =========================================================
   TEST DATA
========================================================= */

const fallbackTests = {

  "pw-yakeen-1-0": [

    {
      id: "pw-yakeen-1-0-test-01",
      batchId: "pw-yakeen-1-0",
      number: 1,
      title: "Yakeen 1.0 — Test 01",
      subtitle: "Complete NEET style practice test",
      questions: 180,
      duration: 180,
      subjects: "Physics • Chemistry • Biology",
      category: "full",
      file: "tests/pw/yakeen-1-0/test-01.html"
    },

    {
      id: "pw-yakeen-1-0-test-02",
      batchId: "pw-yakeen-1-0",
      number: 2,
      title: "Yakeen 1.0 — Test 02",
      subtitle: "Complete NEET style practice test",
      questions: 180,
      duration: 180,
      subjects: "Physics • Chemistry • Biology",
      category: "full",
      file: "tests/pw/yakeen-1-0/test-02.html"
    },

    {
      id: "pw-yakeen-1-0-test-03",
      batchId: "pw-yakeen-1-0",
      number: 3,
      title: "Yakeen 1.0 — Test 03",
      subtitle: "Complete NEET style practice test",
      questions: 180,
      duration: 180,
      subjects: "Physics • Chemistry • Biology",
      category: "full",
      file: "tests/pw/yakeen-1-0/test-03.html"
    },

    {
      id: "pw-yakeen-1-0-test-04",
      batchId: "pw-yakeen-1-0",
      number: 4,
      title: "Yakeen 1.0 — Test 04",
      subtitle: "Complete NEET style practice test",
      questions: 180,
      duration: 180,
      subjects: "Physics • Chemistry • Biology",
      category: "full",
      file: "tests/pw/yakeen-1-0/test-04.html"
    },

    {
      id: "pw-yakeen-1-0-test-05",
      batchId: "pw-yakeen-1-0",
      number: 5,
      title: "Yakeen 1.0 — Test 05",
      subtitle: "Complete NEET style practice test",
      questions: 180,
      duration: 180,
      subjects: "Physics • Chemistry • Biology",
      category: "full",
      file: "tests/pw/yakeen-1-0/test-05.html"
    },

    {
      id: "pw-yakeen-1-0-test-06",
      batchId: "pw-yakeen-1-0",
      number: 6,
      title: "Yakeen 1.0 — Test 06",
      subtitle: "Complete NEET style practice test",
      questions: 180,
      duration: 180,
      subjects: "Physics • Chemistry • Biology",
      category: "full",
      file: "tests/pw/yakeen-1-0/test-06.html"
    },

    {
      id: "pw-yakeen-1-0-test-07",
      batchId: "pw-yakeen-1-0",
      number: 7,
      title: "Yakeen 1.0 — Test 07",
      subtitle: "Complete NEET style practice test",
      questions: 180,
      duration: 180,
      subjects: "Physics • Chemistry • Biology",
      category: "full",
      file: "tests/pw/yakeen-1-0/test-07.html"
    },

    {
      id: "pw-yakeen-1-0-test-08",
      batchId: "pw-yakeen-1-0",
      number: 8,
      title: "Yakeen 1.0 — Test 08",
      subtitle: "Complete NEET style practice test",
      questions: 180,
      duration: 180,
      subjects: "Physics • Chemistry • Biology",
      category: "full",
      file: "tests/pw/yakeen-1-0/test-08.html"
    },

    {
      id: "pw-yakeen-1-0-test-09",
      batchId: "pw-yakeen-1-0",
      number: 9,
      title: "Yakeen 1.0 — Test 09",
      subtitle: "Complete NEET style practice test",
      questions: 180,
      duration: 180,
      subjects: "Physics • Chemistry • Biology",
      category: "full",
      file: "tests/pw/yakeen-1-0/test-09.html"
    },

    {
      id: "pw-yakeen-1-0-test-10",
      batchId: "pw-yakeen-1-0",
      number: 10,
      title: "Yakeen 1.0 — Test 10",
      subtitle: "Complete NEET style practice test",
      questions: 180,
      duration: 180,
      subjects: "Physics • Chemistry • Biology",
      category: "full",
      file: "tests/pw/yakeen-1-0/test-10.html"
    },

    {
      id: "pw-yakeen-1-0-chapter-01",
      batchId: "pw-yakeen-1-0",
      number: 11,
      title: "Physics Chapter Practice",
      subtitle: "Focused chapter-wise practice",
      questions: 45,
      duration: 60,
      subjects: "Physics",
      category: "chapter",
      file: "tests/pw/yakeen-1-0/test-11.html"
    },

    {
      id: "pw-yakeen-1-0-chapter-02",
      batchId: "pw-yakeen-1-0",
      number: 12,
      title: "Chemistry Chapter Practice",
      subtitle: "Focused chapter-wise practice",
      questions: 45,
      duration: 60,
      subjects: "Chemistry",
      category: "chapter",
      file: "tests/pw/yakeen-1-0/test-12.html"
    }

  ]

};


/* =========================================================
   STATE
========================================================= */

let allTests = [];

let currentFilter = "all";


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
   FORMAT INSTITUTE
========================================================= */

function getInstitute() {

  if (institutes[instituteId]) {

    return institutes[instituteId];

  }

  return {

    id: instituteId || "unknown",

    name:
      instituteId
        ? instituteId
            .replaceAll("-", " ")
            .replace(/\b\w/g, c => c.toUpperCase())
        : "Institute",

    shortName: "S"

  };

}


/* =========================================================
   FORMAT BATCH
========================================================= */

function getBatch() {

  if (batches[batchId]) {

    return batches[batchId];

  }

  return {

    id: batchId,

    instituteId: instituteId,

    name:
      batchId
        ? batchId
            .replaceAll("-", " ")
            .replace(/\b\w/g, c => c.toUpperCase())
        : "Test Series",

    subtitle:
      "NEET exam-style practice",

    year: "NEET 2027",

    type: "Test Series"

  };

}


/* =========================================================
   INITIALISE PAGE
========================================================= */

function initialisePage() {

  if (!instituteId || !batchId) {

    showError(
      "Invalid test series link."
    );

    return;

  }


  const institute =
    getInstitute();

  const batch =
    getBatch();


  /*
    ALWAYS SHOW INSTITUTE
  */

  batchMark.textContent =
    institute.shortName;


  instituteLabel.textContent =
    institute.name;


  batchName.textContent =
    batch.name;


  batchDescription.textContent =
    batch.subtitle;


  batchMeta.textContent =
    `${batch.year} • ${batch.type}`;


  document.title =
    `${batch.name} | ${institute.name} | SRINEET`;


  /*
    TEST DATA
  */

  allTests =
    fallbackTests[batchId]
      ? [...fallbackTests[batchId]]
      : [];


  totalTests.textContent =
    String(allTests.length)
      .padStart(2, "0");


  renderTests();

}


/* =========================================================
   LOAD REAL JSON
========================================================= */

async function loadRealTests() {

  try {

    const response =
      await fetch(
        "./data/tests.json",
        {
          cache: "no-store"
        }
      );


    if (!response.ok) {

      throw new Error(
        "tests.json unavailable"
      );

    }


    const data =
      await response.json();


    if (!Array.isArray(data)) {

      throw new Error(
        "Invalid tests.json"
      );

    }


    const matchingTests =
      data.filter(
        test =>
          test.batchId === batchId
      );


    /*
      Only replace fallback if
      matching data exists.
    */

    if (matchingTests.length > 0) {

      allTests =
        matchingTests;


      totalTests.textContent =
        String(allTests.length)
          .padStart(2, "0");


      renderTests();

    }

  } catch (error) {

    console.warn(
      "SRINEET: Using built-in test data.",
      error
    );

  }

}


/* =========================================================
   CREATE TEST CARD
========================================================= */

function createTestCard(test) {

  const card =
    document.createElement("article");

  card.className =
    "test-card";


  const completedKey =
    `srineet_test_${test.id}_completed`;


  const completed =
    localStorage.getItem(
      completedKey
    ) === "true";


  const buttonText =
    completed
      ? "Completed"
      : "Start Test";


  const buttonClass =
    completed
      ? "start-button completed-button"
      : "start-button";


  card.innerHTML = `

    <div class="test-number">
      ${String(test.number).padStart(2, "0")}
    </div>


    <div class="test-title">

      <span>
        TEST ${String(test.number).padStart(2, "0")}
      </span>

      <h3>
        ${escapeHTML(test.title)}
      </h3>

      <p>
        ${escapeHTML(test.subtitle)}
      </p>

    </div>


    <div class="test-info">

      <span>
        ${escapeHTML(test.questions)} QUESTIONS
      </span>

      <span>
        ${escapeHTML(test.duration)} MIN
      </span>

      <span>
        ${escapeHTML(test.subjects)}
      </span>

    </div>


    <div class="test-action">

      <a
        href="${escapeHTML(test.file)}"
        class="${buttonClass}"
      >

        ${buttonText}

        <strong>
          ${completed ? "✓" : "→"}
        </strong>

      </a>

    </div>

  `;


  return card;

}


/* =========================================================
   RENDER TESTS
========================================================= */

function renderTests() {

  let visibleTests =
    [...allTests];


  if (currentFilter !== "all") {

    visibleTests =
      visibleTests.filter(
        test =>
          test.category === currentFilter
      );

  }


  visibleTests.sort(
    (a, b) =>
      Number(a.number) -
      Number(b.number)
  );


  testList.innerHTML = "";


  if (visibleTests.length === 0) {

    testEmpty.hidden = false;

    return;

  }


  testEmpty.hidden = true;


  visibleTests.forEach(
    test => {

      testList.appendChild(
        createTestCard(test)
      );

    }
  );

}


/* =========================================================
   FILTER
========================================================= */

filterButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        filterButtons.forEach(
          item =>
            item.classList.remove("active")
        );


        button.classList.add("active");


        currentFilter =
          button.dataset.filter;


        renderTests();

      }
    );

  }
);


/* =========================================================
   ERROR
========================================================= */

function showError(message) {

  if (!paperError) {
    return;
  }


  paperError.hidden = false;


  const strong =
    paperError.querySelector("strong");

  if (strong) {

    strong.textContent =
      message;

  }


  testList.innerHTML = "";

  testEmpty.hidden = true;

}


/* =========================================================
   START
========================================================= */

initialisePage();

loadRealTests();
