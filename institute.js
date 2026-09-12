"use strict";


/* =========================
   ELEMENTS
========================= */

const instituteName =
  document.getElementById("instituteName");

const instituteDescription =
  document.getElementById("instituteDescription");

const heroInstituteLogo =
  document.getElementById("heroInstituteLogo");

const heroOrder =
  document.getElementById("heroOrder");

const batchCount =
  document.getElementById("batchCount");

const batchGrid =
  document.getElementById("batchGrid");

const batchEmpty =
  document.getElementById("batchEmpty");

const instituteError =
  document.getElementById("instituteError");


/* =========================
   URL PARAMETER
========================= */

const params =
  new URLSearchParams(window.location.search);

const instituteId =
  params.get("institute");


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
   LOAD DATA
========================= */

async function loadInstitutePage() {

  if (!instituteId) {

    showInstituteError();

    return;
  }


  try {

    const [
      institutesResponse,
      batchesResponse
    ] = await Promise.all([

      fetch(
        "data/institutes.json",
        {
          cache: "no-store"
        }
      ),

      fetch(
        "data/batches.json",
        {
          cache: "no-store"
        }
      )

    ]);


    if (
      !institutesResponse.ok ||
      !batchesResponse.ok
    ) {

      throw new Error(
        "Unable to load institute data."
      );

    }


    const institutes =
      await institutesResponse.json();

    const batches =
      await batchesResponse.json();


    const institute =
      institutes.find(
        item => item.id === instituteId
      );


    if (!institute) {

      showInstituteError();

      return;
    }


    const instituteBatches =
      batches.filter(
        batch =>
          batch.instituteId === institute.id
      );


    renderInstitute(
      institute,
      instituteBatches
    );


  } catch (error) {

    console.error(
      "SRINEET Institute Error:",
      error
    );

    showInstituteError();

  }

}


/* =========================
   RENDER INSTITUTE
========================= */

function renderInstitute(
  institute,
  batches
) {

  document.title =
    `${institute.name} Test Series | SRINEET`;


  instituteName.textContent =
    institute.name;


  instituteDescription.textContent =
    institute.description;


  heroInstituteLogo.textContent =
    institute.shortName;


  heroOrder.textContent =
    `INSTITUTE ${String(institute.order).padStart(2, "0")}`;


  batchCount.textContent =
    String(batches.length).padStart(2, "0");


  renderBatches(batches);

}


/* =========================
   RENDER BATCHES
========================= */

function renderBatches(batches) {

  batchGrid.innerHTML = "";


  if (!batches.length) {

    batchEmpty.hidden = false;

    return;
  }


  batchEmpty.hidden = true;


  batches.forEach(
    (batch, index) => {

      batchGrid.appendChild(
        createBatchCard(
          batch,
          index + 1
        )
      );

    }
  );

}


/* =========================
   CREATE BATCH CARD
========================= */

function createBatchCard(
  batch,
  index
) {

  const card =
    document.createElement("a");


  card.className =
    "batch-card";


  /*
    Test paper page will be connected
    in the next step.
  */

  card.href =
    `test-paper.html?institute=${encodeURIComponent(
      batch.instituteId
    )}&batch=${encodeURIComponent(
      batch.id
    )}`;


  const isPractice =
    batch.type === "PRACTICE";


  card.innerHTML = `

    <div class="batch-top">

      <span class="batch-index">
        BATCH ${String(index).padStart(2, "0")}
      </span>

      <span
        class="batch-status ${isPractice ? "practice" : ""}"
      >
        ${escapeHTML(batch.status)}
      </span>

    </div>


    <div class="batch-icon">
      ${getBatchIcon(batch.type)}
    </div>


    <div class="batch-info">

      <h3>
        ${escapeHTML(batch.name)}
      </h3>

      <p>
        ${escapeHTML(batch.subtitle)}
      </p>

    </div>


    <div class="batch-details">

      <span>
        ${escapeHTML(batch.year)}
      </span>

      <span>
        ${batch.testCount} TESTS
      </span>

      <span>
        ${escapeHTML(batch.type)}
      </span>

    </div>


    <span
      class="batch-arrow"
      aria-hidden="true"
    >
      ↗
    </span>

  `;


  return card;
}


/* =========================
   BATCH ICON
========================= */

function getBatchIcon(type) {

  switch (type) {

    case "FULL SYLLABUS":
      return "FS";

    case "CHAPTER TESTS":
      return "CH";

    case "MIXED TESTS":
      return "MX";

    case "PRACTICE":
      return "✓";

    case "TEST SERIES":
      return "TS";

    default:
      return "NEET";

  }

}


/* =========================
   ERROR
========================= */

function showInstituteError() {

  instituteError.hidden = false;

  batchGrid.innerHTML = "";

  batchEmpty.hidden = true;

  instituteName.textContent =
    "Institute not found";

}


/* =========================
   START
========================= */

loadInstitutePage();
