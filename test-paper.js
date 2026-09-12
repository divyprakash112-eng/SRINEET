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


  /* =====================================================
     INSTITUTE DATA
  ===================================================== */

  const institutes = {

    pw: "Physics Wallah",

    allen: "ALLEN",

    aakash: "Aakash Institute",

    narayana: "Narayana",

    unacademy: "Unacademy",

    motion: "Motion Education",

    resonance: "Resonance",

    vedantu: "Vedantu",

    "sri-chaitanya": "Sri Chaitanya",

    "career-point": "Career Point"

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
        "NEET 2027 test practice. New tests will be added as they are uploaded."
    },

    "pw-yakeen-2-0": {
      instituteId: "pw",
      name: "Yakeen 2.0",
      year: "2027",
      description:
        "NEET 2027 test practice."
    },

    "pw-neet-dropper": {
      instituteId: "pw",
      name: "NEET Dropper",
      year: "2027",
      description:
        "Focused NEET preparation and test practice."
    },

    "pw-real-test": {
      instituteId: "pw",
      name: "Real Test",
      year: "2027",
      description:
        "Real exam-style NEET practice."
    }

  };


  const batch = batches[batchId];


  /*
   * Unknown batch
   */

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
      `NEET ${batch.year} • CBT Practice`;

  }


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
      testList.innerHTML = "";
    }

    if (testEmpty) {

      testEmpty.textContent =
        message;

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
      "test-card";


    /* Number */

    const number =
      document.createElement("div");

    number.className =
      "test-number";

    number.textContent =
      String(test.number).padStart(2, "0");


    /* Content */

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


    /* Action */

    const action =
      document.createElement("div");

    action.className =
      "test-action";


    if (isCompleted(test.id)) {

      const badge =
        document.createElement("span");

      badge.className =
        "completed-badge";

      badge.textContent =
        "Completed";

      action.appendChild(badge);

    }


    /*
     * CBT HTML LINK
     *
     * This is the important part.
     *
     * Tum jis HTML file ka path JSON mein doge,
     * wahi open hoga.
     */

    if (test.file) {

      const button =
        document.createElement("a");

      button.className =
        "start-button";

      button.href =
        test.file;

      button.textContent =
        isCompleted(test.id)
          ? "Review Test"
          : "Start Test";


      action.appendChild(button);

    }


    card.appendChild(number);

    card.appendChild(content);

    card.appendChild(action);


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


    testList.innerHTML = "";


    let tests =
      allTests.filter(
        test =>
          test.status !== "hidden"
      );


    if (filter === "full") {

      tests =
        tests.filter(
          test =>
            test.category === "full"
        );

    }


    if (filter === "chapter") {

      tests =
        tests.filter(
          test =>
            test.category === "chapter"
        );

    }


    /*
     * No real uploaded tests
     */

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


    tests.forEach(
      test => {

        testList.appendChild(
          createTestCard(test)
        );

      }
    );

  }


  /* =====================================================
     LOAD REAL TEST DATA
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


      /*
       * ONLY tests belonging to current batch
       */

      const batchTests =
        data.filter(
          test =>
            test.batchId === batchId
        );


      /*
       * Actual available count
       */

      if (totalTests) {

        totalTests.textContent =
          String(batchTests.length)
            .padStart(2, "0");

      }


      renderTests(
        batchTests,
        "all"
      );


      /*
       * Filters
       */

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
        "No tests available yet. Upload a CBT test to make it available here."
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
