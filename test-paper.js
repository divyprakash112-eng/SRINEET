document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const instituteId = params.get("institute");
  const batchId = params.get("batch");

  /*
   * IMPORTANT:
   * Test Papers page can only open when a valid batch is selected.
   * If user comes here directly or without a batch,
   * send them back to Test Series.
   */

  if (!instituteId || !batchId) {
    window.location.replace("test-series.html");
    return;
  }

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
    }
  };

  const batch = batches[batchId];

  /*
   * Unknown batch:
   * Never show a fake Test Series page.
   */
  if (!batch) {
    window.location.replace("test-series.html");
    return;
  }

  const instituteName =
    institutes[batch.instituteId] || "Institute";

  if (batchMark) {
    batchMark.textContent =
      batch.instituteId === "pw" ? "PW" : "TS";
  }

  if (instituteLabel) {
    instituteLabel.textContent = instituteName;
  }

  if (batchName) {
    batchName.textContent = batch.name;
  }

  if (batchDescription) {
    batchDescription.textContent = batch.description;
  }

  if (totalTests) {
    totalTests.textContent =
      String(batch.tests.length).padStart(2, "0");
  }

  if (batchMeta) {
    batchMeta.textContent =
      `NEET ${batch.year} • CBT Practice`;
  }

  function isCompleted(testId) {
    return (
      localStorage.getItem(
        `srineet_test_${testId}_completed`
      ) === "true"
    );
  }

  function renderTests(filter = "all") {
    if (!testList) return;

    testList.innerHTML = "";

    let tests = batch.tests;

    if (filter === "full") {
      tests = tests.filter(test => test.type === "full");
    }

    if (filter === "chapter") {
      tests = tests.filter(test => test.type === "chapter");
    }

    if (tests.length === 0) {
      if (testEmpty) {
        testEmpty.style.display = "block";
        testEmpty.textContent =
          "No tests available in this category yet.";
      }

      return;
    }

    if (testEmpty) {
      testEmpty.style.display = "none";
    }

    tests.forEach(test => {
      const card = document.createElement("article");
      card.className = "test-card";

      const number = document.createElement("div");
      number.className = "test-number";
      number.textContent =
        String(test.number).padStart(2, "0");

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

      if (isCompleted(test.id)) {
        const completed = document.createElement("span");
        completed.className = "completed-badge";
        completed.textContent = "Completed";
        action.appendChild(completed);
      }

      const button = document.createElement("a");
      button.className = "start-button";

      button.href =
        `tests/${batch.instituteId}/${batchId}/test-${String(
          test.number
        ).padStart(2, "0")}.html`;

      button.textContent =
        isCompleted(test.id)
          ? "Review Test"
          : "Start Test";

      action.appendChild(button);

      card.appendChild(number);
      card.appendChild(content);
      card.appendChild(action);

      testList.appendChild(card);
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      renderTests(
        button.dataset.filter || "all"
      );
    });
  });

  renderTests("all");

  if (paperError) {
    paperError.style.display = "none";
  }
});
