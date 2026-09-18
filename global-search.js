"use strict";

/*
=========================================================
SRINEET — GLOBAL SEARCH
Sidebar (hamburger menu) ke andar. Institutes aur
tests dono ek saath search karta hai — data/institutes.json
aur data/tests.json se.
=========================================================
*/

(function () {

  const searchInput =
    document.getElementById("globalSearchInput");

  const resultsBox =
    document.getElementById("globalSearchResults");

  const menuNav =
    document.getElementById("menuNav");

  if (!searchInput || !resultsBox) {
    return;
  }


  let institutesCache =
    null;

  let testsCache =
    null;


  async function loadData() {

    try {

      const [instRes, testRes] =
        await Promise.all([
          fetch("data/institutes.json", { cache: "no-store" }),
          fetch("data/tests.json", { cache: "no-store" })
        ]);

      institutesCache =
        instRes.ok ? await instRes.json() : [];

      testsCache =
        testRes.ok ? await testRes.json() : [];

    } catch (error) {

      institutesCache = [];
      testsCache = [];

      console.error(
        "SRINEET Global Search Error:",
        error
      );

    }

  }


  function runSearch(query) {

    const q =
      query.trim().toLowerCase();

    if (q === "") {

      resultsBox.classList.remove("is-visible");
      resultsBox.innerHTML = "";

      if (menuNav) {
        menuNav.style.display = "";
      }

      return;

    }

    if (menuNav) {
      menuNav.style.display = "none";
    }

    resultsBox.classList.add("is-visible");


    const matchedInstitutes =
      (institutesCache || [])
        .filter(item =>
          (item.name || "").toLowerCase().includes(q)
        )
        .slice(0, 5)
        .map(item => `
          <a class="global-search-result" href="institute.html?institute=${encodeURIComponent(item.id)}">
            <strong>${item.name}</strong>
            Institute
          </a>
        `);

    const matchedTests =
      (testsCache || [])
        .filter(item =>
          (item.title || "").toLowerCase().includes(q) &&
          item.status !== "upcoming"
        )
        .slice(0, 5)
        .map(item => `
          <a class="global-search-result" href="test-paper.html?institute=${encodeURIComponent(item.instituteId)}&batch=${encodeURIComponent(item.batchId)}">
            <strong>${item.title}</strong>
            Test • ${item.questions || 0} Questions
          </a>
        `);

    const combined =
      [...matchedInstitutes, ...matchedTests];

    resultsBox.innerHTML =
      combined.length > 0
        ? combined.join("")
        : '<div class="global-search-empty">Kuch nahi mila.</div>';

  }


  searchInput.addEventListener(
    "input",
    () => runSearch(searchInput.value)
  );


  loadData();

})();
