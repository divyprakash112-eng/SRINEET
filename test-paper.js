"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);

  const instituteId = params.get("institute");
  const batchId = params.get("batch");

  /*
   * Test Paper page must always belong to
   * an institute + batch.
   */
  if (!instituteId || !batchId) {
    window.location.replace("test-series.html");
    return;
  }


  /* =====================================================
     ELEMENTS
  ===================================================== */

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

  const plannerBanner =
    document.getElementById("testPlannerBanner");

  const plannerBannerTitle =
    document.getElementById("plannerBannerTitle");

  const plannerBannerButton =
    document.getElementById("plannerBannerButton");

  const syllabusModal =
    document.getElementById("syllabusModal");

  const syllabusModalBackdrop =
    document.getElementById("syllabusModalBackdrop");

  const syllabusModalClose =
    document.getElementById("syllabusModalClose");

  const syllabusModalTitle =
    document.getElementById("syllabusModalTitle");

  const syllabusModalList =
    document.getElementById("syllabusModalList");


  /* =====================================================
     INSTITUTE DATA
  ===================================================== */

  const institutes = {

    pw: "Physics Wallah"

  };


  /* =====================================================
     BATCH DATA
  ===================================================== */

  const batches = {

    "pw-yakeen-1-0": {
      instituteId: "pw",
      name: "Yakeen 1.0",
      year: "2027",
      description:
        "NEET 2027 test practice. New tests will be added as they are uploaded.",

      plannerPdf:
        "tests/pw/yakeen-1-0/test-planner.pdf"
    },

    "pw-yakeen-2-0": {
      instituteId: "pw",
      name: "Yakeen 2.0",
      year: "2027",
      description:
        "NEET 2027 test practice.",

      plannerPdf: null
    },

    "pw-neet-dropper": {
      instituteId: "pw",
      name: "NEET Dropper",
      year: "2027",
      description:
        "Focused NEET preparation and test practice.",

      plannerPdf: null
    },

    "pw-real-test": {
      instituteId: "pw",
      name: "Real Test",
      year: "2027",
      description:
        "Real exam-style NEET practice.",

      plannerPdf: null
    }

  };


  const batch = batches[batchId];


  /* =====================================================
     UNKNOWN BATCH
  ===================================================== */

  if (!batch) {

    window.location.replace(
      `institute.html?institute=${encodeURIComponent(
        instituteId
      )}`
    );

    return;
  }


  /* =====================================================
     BASIC PAGE INFORMATION
  ===================================================== */

  if (batchMark) {

    batchMark.textContent =
      instituteId === "pw"
        ? "PW"
        : "TS";

  }


  if (instituteLabel) {

    instituteLabel.textContent =
      institutes[instituteId] ||
      "Institute";

  }


  if (batchName) {

    batchName.textContent =
      batch.name;

  }


  if (batchDescription) {

    batchDescription.textContent =
      batch.description;

  }


  if (batchMeta) {

    batchMeta.textContent =
      `NEET ${batch.year} • Test Series`;

  }


  renderPlannerBanner(batch);


  /* =====================================================
     TEST PLANNER BANNER
  ===================================================== */

  function renderPlannerBanner(currentBatch) {

    if (!plannerBanner || !plannerBannerButton) {
      return;
    }


    if (!currentBatch.plannerPdf) {

      plannerBanner.style.display =
        "none";

      return;
    }


    plannerBannerButton.href =
      currentBatch.plannerPdf;


    if (plannerBannerTitle) {

      plannerBannerTitle.textContent =
        `${currentBatch.name} Test Planner`;

    }


    plannerBanner.style.display =
      "flex";

  }


  /* =====================================================
     SYLLABUS MODAL
  ===================================================== */

  function openSyllabusModal(test) {

    if (!syllabusModal) {
      return;
    }


    if (syllabusModalTitle) {

      syllabusModalTitle.textContent =
        test.title ||
        `Test ${String(test.number).padStart(2, "0")}`;

    }


    if (syllabusModalList) {

      syllabusModalList.innerHTML =
        "";


      const topics =
        Array.isArray(test.syllabus)
          ? test.syllabus
          : [];


      if (topics.length === 0) {

        const empty =
          document.createElement("li");

        empty.textContent =
          "Syllabus will be added soon.";

        syllabusModalList.appendChild(
          empty
        );

      } else {

        topics.forEach(
          topic => {

            const item =
              document.createElement("li");

            item.textContent =
              topic;

            syllabusModalList.appendChild(
              item
            );

          }
        );

      }

    }


    syllabusModal.hidden =
      false;

  }


  function closeSyllabusModal() {

    if (syllabusModal) {

      syllabusModal.hidden =
        true;

    }

  }


  if (syllabusModalBackdrop) {

    syllabusModalBackdrop.addEventListener(
      "click",
      closeSyllabusModal
    );

  }


  if (syllabusModalClose) {

    syllabusModalClose.addEventListener(
      "click",
      closeSyllabusModal
    );

  }


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        syllabusModal &&
        !syllabusModal.hidden
      ) {

        closeSyllabusModal();

      }

    }
  );


  /* =====================================================
     ERROR HELPER
  ===================================================== */

  function showError(message) {

    if (!paperError) {
      return;
    }


    paperError.textContent =
      message;


    paperError.style.display =
      "block";

  }


  /* =====================================================
     EMPTY STATE
  ===================================================== */

  function showEmpty(message) {

    if (testList) {

      testList.innerHTML =
        "";

    }


    if (testEmpty) {

      testEmpty.innerHTML =
        `<div class="empty-icon-badge" aria-hidden="true">📭</div>${message}`;

      testEmpty.style.display =
        "block";

    }

  }


  /* =====================================================
     COMPLETED STATUS
  ===================================================== */

  function isCompleted(testId) {

    return (
      localStorage.getItem(
        `srineet_test_${testId}_completed`
      ) === "true"
    );

  }


  /* =====================================================
     CREATE TEST CARD
  ===================================================== */

  function createTestCard(test) {

    const card =
      document.createElement("article");

    card.className =
      "test-card reveal";


    /* =================================================
       TEST NUMBER
    ================================================= */

    const number =
      document.createElement("div");

    number.className =
      "test-number";

    number.textContent =
      String(test.number).padStart(2, "0");


    /* =================================================
       TEST CONTENT
    ================================================= */

    const content =
      document.createElement("div");

    content.className =
      "test-content";


    const title =
      document.createElement("h3");

    title.className =
      "test-title";

    title.textContent =
      test.title ||
      `Test ${String(test.number).padStart(2, "0")}`;


    const info =
      document.createElement("div");

    info.className =
      "test-info";


    const subjects =
      test.subjects ||
      "Physics • Chemistry • Biology";


    info.innerHTML = `
      <span>${test.questions || 0} Questions</span>
      <span>${test.duration || 0} Minutes</span>
      <span>${subjects}</span>
    `;


    content.appendChild(title);

    content.appendChild(info);


    /* =================================================
       ACTION AREA
    ================================================= */

    const action =
      document.createElement("div");

    action.className =
      "test-action";


    /* =================================================
       COMPLETED BADGE
    ================================================= */

    if (isCompleted(test.id)) {

      const badge =
        document.createElement("span");

      badge.className =
        "completed-badge";

      badge.textContent =
        "Completed";

      action.appendChild(
        badge
      );

    }


    /* =================================================
       VIEW SYLLABUS BUTTON
    ================================================= */

    const syllabusButton =
      document.createElement("button");

    syllabusButton.type =
      "button";

    syllabusButton.className =
      "syllabus-button";

    syllabusButton.textContent =
      "View Syllabus";


    syllabusButton.addEventListener(
      "click",
      () => {

        openSyllabusModal(test);

      }
    );


    action.appendChild(
      syllabusButton
    );


    /* =================================================
       VIEW TEST PDF BUTTON
    ================================================= */

    if (test.pdf) {

      const pdfButton =
        document.createElement("a");

      pdfButton.className =
        "start-button";

      pdfButton.href =
        test.pdf;

      pdfButton.target =
        "_blank";

      pdfButton.rel =
        "noopener noreferrer";

      pdfButton.textContent =
        "View Test PDF";


      action.appendChild(
        pdfButton
      );

    }


    /* =================================================
       FINAL CARD
    ================================================= */

    card.appendChild(
      number
    );

    card.appendChild(
      content
    );

    card.appendChild(
      action
    );


    return card;

  }


  /* =====================================================
     RENDER TESTS
  ===================================================== */

  function renderTests(
    allTests,
    filter = "all"
  ) {

    if (!testList) {
      return;
    }


    testList.innerHTML =
      "";


    let tests =
      allTests.filter(
        test =>
          test.status !== "hidden"
      );


    /* =================================================
       FULL TEST FILTER
    ================================================= */

    if (filter === "full") {

      tests =
        tests.filter(
          test =>
            test.category === "full"
        );

    }


    /* =================================================
       CHAPTER TEST FILTER
    ================================================= */

    if (filter === "chapter") {

      tests =
        tests.filter(
          test =>
            test.category === "chapter"
        );

    }


    /* =================================================
       EMPTY STATE
    ================================================= */

    if (tests.length === 0) {

      showEmpty(
        "No tests available yet. New tests will appear here when they are uploaded."
      );

      return;

    }


    if (testEmpty) {

      testEmpty.style.display =
        "none";

    }


    /* =================================================
       CREATE ALL TEST CARDS
    ================================================= */

    tests.forEach(
      test => {

        testList.appendChild(
          createTestCard(test)
        );

      }
    );


    /* =================================================
       EXISTING SRINEET REVEAL SYSTEM
    ================================================= */

    if (window.SrineetReveal) {

      window.SrineetReveal.observe(
        testList
      );

    }

  }


  /* =====================================================
     LOAD TEST DATA
  ===================================================== */

  async function loadTests() {

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
          "tests.json could not be loaded."
        );

      }


      const data =
        await response.json();


      if (!Array.isArray(data)) {

        throw new Error(
          "tests.json must contain an array."
        );

      }


      /* =================================================
         CURRENT BATCH TESTS
      ================================================= */

      const batchTests =
        data.filter(
          test =>
            test.batchId === batchId
        );


      /* =================================================
         TOTAL TEST COUNT
      ================================================= */

      if (totalTests) {

        totalTests.textContent =
          String(
            batchTests.length
          ).padStart(
            2,
            "0"
          );

      }


      /* =================================================
         INITIAL RENDER
      ================================================= */

      renderTests(
        batchTests,
        "all"
      );


      /* =================================================
         FILTER BUTTONS
      ================================================= */

      filterButtons.forEach(
        button => {

          button.addEventListener(
            "click",
            () => {

              filterButtons.forEach(
                btn =>
                  btn.classList.remove(
                    "active"
                  )
              );


              button.classList.add(
                "active"
              );


              renderTests(
                batchTests,
                button.dataset.filter ||
                  "all"
              );

            }
          );

        }
      );


    } catch (error) {

      console.error(
        "SRINEET Test Data Error:",
        error
      );


      if (totalTests) {

        totalTests.textContent =
          "00";

      }


      showEmpty(
        "No tests available yet. New tests will appear here when they are uploaded."
      );


      showError(
        ""
      );

    }

  }


  /* =====================================================
     START
  ===================================================== */

  loadTests();

});
