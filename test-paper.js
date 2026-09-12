document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const instituteId = params.get("institute") || "pw";
  const batchId = params.get("batch") || "yakeen-1-0";

  const batchMark = document.getElementById("batchMark");
  const instituteLabel = document.getElementById("instituteLabel");
  const batchName = document.getElementById("batchName");
  const batchDescription = document.getElementById("batchDescription");
  const totalTests = document.getElementById("totalTests");
  const batchMeta = document.getElementById("batchMeta");
  const testList = document.getElementById("testList");
  const testEmpty = document.getElementById("testEmpty");
  const paperError = document.getElementById("paperError");

  const filterButtons = document.querySelectorAll(".filter-button");

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

  const batches = {
    "pw-yakeen-1-0": {
      instituteId: "pw",
      name: "Yakeen 1.0",
      subtitle: "NEET 2027 Complete Test Series",
      year: "2027",
      description:
        "Complete NEET preparation with exam-style full syllabus and chapter-wise tests.",
      tests: [
        {
          id: "pw-yakeen-1-0-test-01",
          number: 1,
          title: "Full Syllabus Test 01",
          questions: 180,
          duration: 180,
          type: "full"
        },
        {
          id: "pw-yakeen-1-0-test-02",
          number: 2,
          title: "Full Syllabus Test 02",
          questions: 180,
          duration: 180,
          type: "full"
        },
        {
          id: "pw-yakeen-1-0-test-03",
          number: 3,
          title: "Full Syllabus Test 03",
          questions: 180,
          duration: 180,
          type: "full"
        },
        {
          id: "pw-yakeen-1-0-test-04",
          number: 4,
          title: "Full Syllabus Test 04",
          questions: 180,
          duration: 180,
          type: "full"
        },
        {
          id: "pw-yakeen-1-0-test-05",
          number: 5,
          title: "Full Syllabus Test 05",
          questions: 180,
          duration: 180,
          type: "full"
        },
        {
          id: "pw-yakeen-1-0-test-06",
          number: 6,
          title: "Full Syllabus Test 06",
          questions: 180,
          duration: 180,
          type: "full"
        },
        {
          id: "pw-yakeen-1-0-test-07",
          number: 7,
          title: "Full Syllabus Test 07",
          questions: 180,
          duration: 180,
          type: "full"
        },
        {
          id: "pw-yakeen-1-0-test-08",
          number: 8,
          title: "Full Syllabus Test 08",
          questions: 180,
          duration: 180,
          type: "full"
        },
        {
          id: "pw-yakeen-1-0-test-09",
          number: 9,
          title: "Full Syllabus Test 09",
          questions: 180,
          duration: 180,
          type: "full"
        },
        {
          id: "pw-yakeen-1-0-test-10",
          number: 10,
          title: "Full Syllabus Test 10",
          questions: 180,
          duration: 180,
          type: "full"
        },
        {
          id: "pw-yakeen-1-0-test-11",
          number: 11,
          title: "Chapter Test 01",
          questions: 45,
          duration: 45,
          type: "chapter"
        },
        {
          id: "pw-yakeen-1-0-test-12",
          number: 12,
          title: "Chapter Test 02",
          questions: 45,
          duration: 45,
          type: "chapter"
        }
      ]
    },

    "pw-yakeen-2-0": {
      instituteId: "pw",
      name: "Yakeen 2.0",
      subtitle: "NEET 2027 Test Series",
      year: "2027",
      description: "NEET 2027 exam-style practice tests.",
      tests: []
    },

    "pw-neet-dropper": {
      instituteId: "pw",
      name: "NEET Dropper",
      subtitle: "NEET 2027 Dropper Test Series",
      year: "2027",
      description: "Focused test practice for NEET droppers.",
      tests: []
    },

    "pw-real-test": {
      instituteId: "pw",
      name: "Real Test",
      subtitle: "NEET Real Exam Practice",
      year: "2027",
      description: "Practice under real NEET examination conditions.",
      tests: []
    }
  };

  function showError(message) {
    if (!paperError) return;

    paperError.textContent = message;
    paperError.style.display = "block";
  }

  function hideError() {
    if (!paperError) return;

    paperError.style.display = "none";
  }

  function getStorageKey(testId) {
    return `srineet_test_${testId}_completed`;
  }

  function isCompleted(testId) {
    return localStorage.getItem(getStorageKey(testId)) === "true";
  }

  function renderTest(test) {
    const completed = isCompleted(test.id);

    const card = document.createElement("article");
    card.className = "test-card";

    const number = document.createElement("div");
    number.className = "test-number";
    number.textContent = String(test.number).padStart(2, "0");

    const content = document.createElement("div");
    content.className = "test-content";

    const title = document.createElement("h3");
    title.className = "test-title";
    title.textContent = test.title;

    const info = document.createElement("div");
    info.className = "test-info";

    info.innerHTML = `
      <span>${test.questions} Questions</span>
      <span>${test.duration} Minutes</span>
      <span>${test.type === "full" ? "Full Test" : "Chapter Test"}</span>
    `;

    content.appendChild(title);
    content.appendChild(info);

    const action = document.createElement("div");
    action.className = "test-action";

    if (completed) {
      const badge = document.createElement("span");
      badge.className = "completed-badge";
      badge.textContent = "Completed";
      action.appendChild(badge);
    }

    const button = document.createElement("a");
    button.className = "start-button";

    button.href =
      `tests/pw/yakeen-1-0/test-${String(test.number).padStart(2, "0")}.html`;

    button.textContent = completed ? "Review Test" : "Start Test";

    action.appendChild(button);

    card.appendChild(number);
    card.appendChild(content);
    card.appendChild(action);

    return card;
  }

  function renderTests(tests, filter = "all") {
    if (!testList) return;

    testList.innerHTML = "";

    let filteredTests = tests;

    if (filter === "full") {
      filteredTests = tests.filter(test => test.type === "full");
    }

    if (filter === "chapter") {
      filteredTests = tests.filter(test => test.type === "chapter");
    }

    if (filteredTests.length === 0) {
      if (testEmpty) {
        testEmpty.style.display = "block";
        testEmpty.textContent = "No tests available in this category yet.";
      }

      return;
    }

    if (testEmpty) {
      testEmpty.style.display = "none";
    }

    filteredTests.forEach(test => {
      testList.appendChild(renderTest(test));
    });
  }

  function initialize() {
    hideError();

    const instituteName =
      institutes[instituteId] || "Physics Wallah";

    const batch =
      batches[batchId];

    if (!batch) {
      if (batchName) {
        batchName.textContent = "Test Series";
      }

      if (instituteLabel) {
        instituteLabel.textContent = instituteName;
      }

      if (batchMark) {
        batchMark.textContent = "TS";
      }

      if (totalTests) {
        totalTests.textContent = "00";
      }

      if (batchMeta) {
        batchMeta.textContent = "NEET 2027 • CBT Practice";
      }

      if (batchDescription) {
        batchDescription.textContent =
          "This test series is being prepared.";
      }

      if (testList) {
        testList.innerHTML = "";
      }

      if (testEmpty) {
        testEmpty.style.display = "block";
        testEmpty.textContent =
          "Tests for this series will be available soon.";
      }

      return;
    }

    const tests = batch.tests || [];

    if (batchMark) {
      batchMark.textContent =
        instituteId === "pw" ? "PW" : "TS";
    }

    if (instituteLabel) {
      instituteLabel.textContent =
        institutes[batch.instituteId] || instituteName;
    }

    if (batchName) {
      batchName.textContent = batch.name;
    }

    if (batchDescription) {
      batchDescription.textContent = batch.description;
    }

    if (totalTests) {
      totalTests.textContent =
        String(tests.length).padStart(2, "0");
    }

    if (batchMeta) {
      batchMeta.textContent =
        `NEET ${batch.year} • CBT Practice`;
    }

    renderTests(tests);

    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
          btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
          button.dataset.filter || "all";

        renderTests(tests, filter);
      });
    });
  }

  initialize();
});
