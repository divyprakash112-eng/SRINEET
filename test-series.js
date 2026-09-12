/* =========================================================
   SRINEET TEST SERIES
   Institute Data + Rendering
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const instituteGrid =
    document.getElementById("instituteGrid");


  /*
   * =======================================================
   * INSTITUTE DATA
   *
   * Logo files:
   * assets/institutes/...
   *
   * Agar tum apne logo images ke filenames change karo,
   * sirf yahin image path change karna hai.
   * =======================================================
   */

  const institutes = [

    {
      rank: 1,
      name: "Physics Wallah",
      short: "PW",
      description: "NEET Test Series",
      logo: "assets/institutes/pw.png",
      fallback: "PW"
    },

    {
      rank: 2,
      name: "ALLEN",
      short: "ALLEN",
      description: "NEET Test Series",
      logo: "assets/institutes/allen.png",
      fallback: "A"
    },

    {
      rank: 3,
      name: "Aakash",
      short: "Aakash",
      description: "NEET Test Series",
      logo: "assets/institutes/aakash.png",
      fallback: "A"
    },

    {
      rank: 4,
      name: "Narayana",
      short: "Narayana",
      description: "NEET Test Series",
      logo: "assets/institutes/narayana.png",
      fallback: "N"
    },

    {
      rank: 5,
      name: "Unacademy",
      short: "Unacademy",
      description: "NEET Test Series",
      logo: "assets/institutes/unacademy.png",
      fallback: "U"
    },

    {
      rank: 6,
      name: "Motion Education",
      short: "Motion",
      description: "NEET Test Series",
      logo: "assets/institutes/motion.png",
      fallback: "M"
    },

    {
      rank: 7,
      name: "Resonance",
      short: "Resonance",
      description: "NEET Test Series",
      logo: "assets/institutes/resonance.png",
      fallback: "R"
    },

    {
      rank: 8,
      name: "Vedantu",
      short: "Vedantu",
      description: "NEET Test Series",
      logo: "assets/institutes/vedantu.png",
      fallback: "V"
    },

    {
      rank: 9,
      name: "Sri Chaitanya",
      short: "Sri Chaitanya",
      description: "NEET Test Series",
      logo: "assets/institutes/sri-chaitanya.png",
      fallback: "SC"
    },

    {
      rank: 10,
      name: "Career Point",
      short: "Career Point",
      description: "NEET Test Series",
      logo: "assets/institutes/career-point.png",
      fallback: "CP"
    }

  ];


  /* =======================================================
     CREATE CARD
     ======================================================= */

  function createInstituteCard(institute) {

    const card =
      document.createElement("article");

    card.className = "institute-card";

    card.setAttribute(
      "tabindex",
      "0"
    );

    card.setAttribute(
      "role",
      "button"
    );


    card.innerHTML = `

      <div class="institute-rank">
        ${institute.rank}
      </div>


      <div class="institute-logo">

        <img
          src="${institute.logo}"
          alt="${institute.name} logo"
          loading="lazy"
        >

        <div
          class="logo-fallback"
          hidden
        >
          ${institute.fallback}
        </div>

      </div>


      <div class="institute-content">

        <h3>
          ${institute.name}
        </h3>

        <div class="institute-short">
          ${institute.short}
        </div>

        <div class="institute-meta">

          <span>
            NEET
          </span>

          <span>
            Test Series
          </span>

        </div>

      </div>


      <div
        class="institute-arrow"
        aria-hidden="true"
      >
        →
      </div>

    `;


    /* =====================================================
       IMAGE FALLBACK
       ===================================================== */

    const image =
      card.querySelector("img");

    const fallback =
      card.querySelector(".logo-fallback");


    image.addEventListener(
      "error",
      () => {

        image.style.display = "none";

        fallback.hidden = false;

      }
    );


    /* =====================================================
       OPEN INSTITUTE
       ===================================================== */

    function openInstitute() {

      /*
       * Next step:
       * PW → batch selection
       * ALLEN → batch selection
       * Aakash → batch selection
       *
       * Abhi temporarily placeholder alert.
       *
       * Jab batch page banayenge, yahan:
       * window.location.href =
       * "institute.html?id=" + institute.short;
       */

      if (institute.short === "PW") {

        window.location.href =
          "institute.html?institute=pw";

        return;

      }


      /*
       * Baaki institutes ke liye bhi
       * same dynamic route ready hai.
       */

      window.location.href =
        "institute.html?institute=" +
        encodeURIComponent(
          institute.short.toLowerCase()
        );

    }


    card.addEventListener(
      "click",
      openInstitute
    );


    card.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openInstitute();

        }

      }
    );


    return card;

  }


  /* =======================================================
     RENDER
     ======================================================= */

  if (instituteGrid) {

    const fragment =
      document.createDocumentFragment();


    institutes.forEach(
      institute => {

        fragment.appendChild(
          createInstituteCard(institute)
        );

      }
    );


    instituteGrid.appendChild(
      fragment
    );

  }

});
