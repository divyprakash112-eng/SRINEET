"use strict";


/* =========================
   ELEMENTS
========================= */

const batchMark =
  document.getElementById("batchMark");

const instituteLabel =
  document.getElementById("instituteLabel");

const batchName =
  document.getElementById("batchName");

const batchDescription =
  document.getElementById("batchDescription");

const totalTests =
  document.getElementById("totalTests");

const batchMeta =
  document.getElementById("batchMeta");

const testList =
  document.getElementById("testList");

const testEmpty =
  document.getElementById("testEmpty");

const paperError =
  document.getElementById("paperError");

const filterButtons =
  document.querySelectorAll(".filter-button");


/* =========================
   URL
========================= */

const params =
  new URLSearchParams(
    window.location.search
  );

const instituteId =
  params.get("institute");

const batchId =
  params.get("batch");


/* =========================
   DATA
========================= */

let allTests = [];

let currentFilter = "all";


/* =========================
   FALLBACK TEST DATA
========================= */

const fallbackTests = [
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
    status: "START",
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
    status: "START",
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
    status: "START",
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
    status: "START",
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
    status: "START",
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
    status: "START",
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
    status: "START",
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
    status: "START",
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
    status: "START",
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
    status: "START",
    file: "tests/pw/yakeen-1-0/test-10.html"
  }
];


/* =========================
   HTML ESCAPE
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
   LOAD
========================= */

async function loadTestPaper() {

  if (!instituteId || !batchId) {

    showError();

    return;
  }


  try {

    const [
      institutesResponse,
      batchesResponse,
      testsResponse
    ] = await Promise.all([

      fetch(
        "./data/institutes.json",
        { cache: "no-store" }
      ),

      fetch(
        "./data/batches.json",
        { cache: "no-store" }
      ),

      fetch(
        "./data/tests.json",
        { cache: "no-store" }
      )

    ]);


    if (
      !institutesResponse.ok ||
      !batchesResponse.ok ||
      !testsResponse.ok
    ) {

      throw new Error(
        "Unable to load test data."
      );

    }


    const institutes =
      await institutesResponse.json();

    const batches =
      await batchesResponse.json();

    const tests =
      await testsResponse.json();


    const institute =
      institutes.find(
        item => item.id === instituteId
      );


    const batch =
      batches.find(
        item => item.id === batchId &&
        item.instituteId === instituteId
      );


    if (!institute || !batch) {

      showError();

      return;
    }


    allTests =
      tests.filter(
        test => test.batchId === batchId
      );


    renderPage(
      institute,
      batch
    );


  } catch (error) {

    console.warn(
      "SRINEET: Using fallback test data.",
      error
    );


    if (batchId === "pw-yakeen-1-0") {

      allTests =
        fallbackTests.filter(
          test => test.batchId === batchId
        );


      renderPage(
        {
          id: "pw",
          name: "Physics Wallah",
          shortName: "PW"
        },
        {
          id: "pw-yakeen-1-0",
          name: "Yakeen 1.0",
          subtitle: "Focused exam-style practice",
          year: "NEET 2027",
          testCount: allTests.length
        }
      );

    } else {

      showError();

    }

  }

}


/* =========================
   RENDER PAGE
========================= */

function renderPage(
  institute,
  batch
) {

  document.title =
    `${batch.name} | ${institute.name} | SRINEET`;


  batchMark.textContent =
    institute.shortName;


  instituteLabel.textContent =
    institute.name;


  batchName.textContent =
    batch.name;


  batchDescription.textContent =
    batch.subtitle;


  totalTests.textContent =
    String(allTests.length).padStart(2, "0");


  batchMeta.textContent =
    `${batch.year} • ${batch.type || "Exam-style practice"}`;


  renderTests();

}


/* =========================
   RENDER TESTS
========================= */

function renderTests() {

  let filteredTests =
    [...allTests];


  if (currentFilter !== "all") {

    filteredTests =
      filteredTests.filter(
        test =>
          test.category === currentFilter
      );

  }


  filteredTests.sort(
    (a, b) => a.number - b.number
  );


  testList.innerHTML = "";


  if (!filteredTests.length) {

    testEmpty.hidden = false;

    return;
  }


  testEmpty.hidden = true;


  filteredTests.forEach(
    test => {

      testList.appendChild(
        createTestCard(test)
      );

    }
  );

}


/* =========================
   CREATE TEST CARD
========================= */

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
        ${test.questions} QUESTIONS
      </span>

      <span>
        ${test.duration} MIN
      </span>

      <span>
        ${escapeHTML(test.subjects)}
      </span>

    </div>


    <div class="test-action">

      <a
        href="${escapeHTML(test.file)}"
        class="${buttonClass}"
        data-test-id="${escapeHTML(test.id)}"
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


/* =========================
   FILTERS
========================= */

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


/* =========================
   ERROR
========================= */

function showError() {

  paperError.hidden = false;

  testList.innerHTML = "";

  testEmpty.hidden = true;

}


/* =========================
   START
========================= */

loadTestPaper();
