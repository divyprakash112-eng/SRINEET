/* =========================================================
   SRINEET INSTITUTE PAGE
========================================================= */

"use strict";


/* =========================================================
   DATA
========================================================= */

const instituteData = {

  pw: {

    name: "Physics Wallah",

    short: "PW",

    logo: "assets/logos/pw.webp",

    description:
      "Explore available Physics Wallah NEET test batches and practice in a focused CBT environment.",

    batches: [

      {
        id: "yakeen-1-0",
        name: "Yakeen 1.0",
        year: "NEET 2027",
        tests: 12
      },

      {
        id: "yakeen-2-0",
        name: "Yakeen 2.0",
        year: "NEET 2027",
        tests: 15
      },

      {
        id: "yakeen-3-0",
        name: "Yakeen 3.0",
        year: "NEET 2027",
        tests: 10
      }

    ]

  },


  aakash: {

    name: "Aakash Institute",

    short: "AAKASH",

    logo: "assets/logos/aakash.webp",

    description:
      "Explore available Aakash NEET test batches.",

    batches: [

      {
        id: "neet-2027",
        name: "NEET 2027 Test Series",
        year: "NEET 2027",
        tests: 10
      },

      {
        id: "full-syllabus",
        name: "Full Syllabus Tests",
        year: "NEET",
        tests: 12
      }

    ]

  },


  allen: {

    name: "ALLEN",

    short: "ALLEN",

    logo: "assets/logos/allen.webp",

    description:
      "Explore available ALLEN NEET test batches.",

    batches: [

      {
        id: "neet-leader",
        name: "NEET Leader",
        year: "NEET 2027",
        tests: 12
      },

      {
        id: "major-test-series",
        name: "Major Test Series",
        year: "NEET 2027",
        tests: 10
      }

    ]

  },


  narayana: {

    name: "Narayana",

    short: "NARAYANA",

    logo: "assets/logos/narayana.webp",

    description:
      "Explore available Narayana NEET test batches.",

    batches: [

      {
        id: "neet-2027",
        name: "NEET 2027 Series",
        year: "NEET 2027",
        tests: 10
      }

    ]

  },


  unacademy: {

    name: "Unacademy",

    short: "UNACADEMY",

    logo: "assets/logos/unacademy.webp",

    description:
      "Explore available Unacademy NEET test batches.",

    batches: [

      {
        id: "neet-2027",
        name: "NEET 2027 Tests",
        year: "NEET 2027",
        tests: 10
      }

    ]

  },


  motion: {

    name: "Motion Education",

    short: "MOTION",

    logo: "assets/logos/motion.webp",

    description:
      "Explore available Motion NEET test batches.",

    batches: [

      {
        id: "neet-2027",
        name: "NEET 2027 Test Series",
        year: "NEET 2027",
        tests: 10
      }

    ]

  },


  resonance: {

    name: "Resonance",

    short: "RESONANCE",

    logo: "assets/logos/resonance.webp",

    description:
      "Explore available Resonance NEET test batches.",

    batches: [

      {
        id: "neet-2027",
        name: "NEET 2027 Series",
        year: "NEET 2027",
        tests: 10
      }

    ]

  },


  vedantu: {

    name: "Vedantu",

    short: "VEDANTU",

    logo: "assets/logos/vedantu.webp",

    description:
      "Explore available Vedantu NEET test batches.",

    batches: [

      {
        id: "neet-2027",
        name: "NEET 2027 Tests",
        year: "NEET 2027",
        tests: 10
      }

    ]

  },


  "sri-chaitanya": {

    name: "Sri Chaitanya",

    short: "SRI CHAITANYA",

    logo: "assets/logos/sri-chaitanya.webp",

    description:
      "Explore available Sri Chaitanya NEET test batches.",

    batches: [

      {
        id: "neet-2027",
        name: "NEET 2027 Test Series",
        year: "NEET 2027",
        tests: 10
      }

    ]

  },


  "career-point": {

    name: "Career Point",

    short: "CAREER POINT",

    logo: "assets/logos/career-point.webp",

    description:
      "Explore available Career Point NEET test batches.",

    batches: [

      {
        id: "neet-2027",
        name: "NEET 2027 Series",
        year: "NEET 2027",
        tests: 10
      }

    ]

  }

};


/* =========================================================
   GET INSTITUTE
========================================================= */

const params =
  new URLSearchParams(window.location.search);

const instituteId =
  params.get("id") || "pw";


const institute =
  instituteData[instituteId];


/* =========================================================
   DOM
========================================================= */

const instituteName =
  document.getElementById("instituteName");

const instituteDescription =
  document.getElementById("instituteDescription");

const instituteLogo =
  document.getElementById("instituteLogo");

const instituteLogoText =
  document.getElementById("instituteLogoText");

const batchGrid =
  document.getElementById("batchGrid");


/* =========================================================
   FALLBACK
========================================================= */

function showLogoFallback() {

  instituteLogo.style.display = "none";

  instituteLogoText.style.display = "block";

  instituteLogoText.textContent =
    institute?.short || "NEET";

}


/* =========================================================
   INVALID INSTITUTE
========================================================= */

if (!institute) {

  instituteName.textContent =
    "Institute not found";

  instituteDescription.textContent =
    "The requested test series could not be found.";

  batchGrid.innerHTML = `

    <div class="batch-card">

      <div>

        <h3>
          No institute found
        </h3>

        <p>
          Please return to the Test Series page.
        </p>

      </div>

      <a
        href="test-series.html"
        style="
          display:inline-block;
          margin-top:20px;
          color:#0B4FD8;
          font-weight:800;
          font-size:11px;
        ">
        ← Back to Test Series
      </a>

    </div>

  `;

} else {


  /* =======================================================
     BASIC INFO
  ======================================================= */

  instituteName.textContent =
    institute.name;

  instituteDescription.textContent =
    institute.description;

  document.title =
    `${institute.name} | SRINEET`;


  /* =======================================================
     LOGO
  ======================================================= */

  instituteLogo.alt =
    `${institute.name} logo`;

  instituteLogo.src =
    institute.logo;

  instituteLogoText.style.display =
    "none";


  instituteLogo.addEventListener(
    "error",
    showLogoFallback
  );


  /* =======================================================
     BATCHES
  ======================================================= */

  function renderBatches() {

    batchGrid.innerHTML = "";

    institute.batches.forEach(
      (batch, index) => {

        const card =
          document.createElement("a");

        card.className =
          "batch-card";

        /*
          Next page:
          batch.html?id=pw&batch=yakeen-1-0

          You can later create batch.html
          using the exact same architecture.
        */

        card.href =
          `batch.html?institute=${encodeURIComponent(instituteId)}&batch=${encodeURIComponent(batch.id)}`;


        card.innerHTML = `

          <div>

            <div class="batch-top">

              <span class="batch-number">
                ${String(index + 1).padStart(2, "0")}
              </span>

              <span class="batch-arrow">
                →
              </span>

            </div>


            <h3>
              ${escapeHTML(batch.name)}
            </h3>

            <p>
              ${escapeHTML(batch.year)}
            </p>


            <div class="batch-meta">

              <span>
                ${batch.tests} Tests
              </span>

              <span>
                NEET Pattern
              </span>

            </div>

          </div>

        `;


        batchGrid.appendChild(card);

      }
    );

  }


  renderBatches();


  /* =======================================================
     TELEGRAM POPUP — PW / OTHER INSTITUTE
  ======================================================= */

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      if (
        window.SRINEETTelegramPopup
      ) {

        window.SRINEETTelegramPopup.show({

          /*
            Separate key for each institute.

            Therefore:

            Test Series → popup
            PW → popup

            are independent.
          */

          key:
            `institute-${instituteId}`,

          title:
            `Join SRINEET before exploring ${institute.name}`,

          message:
            "Get test-series updates, important announcements and NEET preparation resources on Telegram."

        });

      }

    }
  );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}
