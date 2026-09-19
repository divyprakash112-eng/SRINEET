"use strict";

/*
=========================================================
SRINEET — RECENTLY ADDED + UPCOMING TESTS (homepage card)
data/tests.json se data uthata hai. Naya test add
karte waqt "addedDate" field do — "Recently Added"
mein apne aap dikhega (14 din tak). Agar test abhi
tak nahi aaya, "status": "upcoming" aur "scheduledDate"
do — "Upcoming" section mein dikhega.
=========================================================
*/

(function () {

  const recentList =
    document.getElementById("recentCardList");

  const upcomingList =
    document.getElementById("upcomingCardList");

  if (!recentList && !upcomingList) {
    return;
  }


  /* =====================================================
     DATE HELPERS
  ===================================================== */

  function daysAgo(dateString) {

    const then =
      new Date(dateString);

    const now =
      new Date();

    return Math.floor(
      (now - then) / (1000 * 60 * 60 * 24)
    );

  }

  function formatDate(dateString) {

    try {

      return new Date(dateString).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric"
        }
      );

    } catch (error) {

      return dateString;

    }

  }


  /* =====================================================
     RENDER
  ===================================================== */

  function renderCards(tests) {

    const recent =
      tests
        .filter(
          test =>
            test.addedDate &&
            daysAgo(test.addedDate) >= 0 &&
            daysAgo(test.addedDate) <= 14 &&
            test.status !== "upcoming"
        )
        .sort(
          (a, b) =>
            new Date(b.addedDate) - new Date(a.addedDate)
        );

    const upcoming =
      tests
        .filter(test => test.status === "upcoming")
        .sort(
          (a, b) =>
            new Date(a.scheduledDate || 0) -
            new Date(b.scheduledDate || 0)
        );


    if (recentList) {

      recentList.innerHTML =
        recent.length === 0
          ? '<div class="coming-card-empty">Koi naya test nahi hai abhi.</div>'
          : recent
              .slice(0, 4)
              .map(test => {

                const ago =
                  daysAgo(test.addedDate);

                const agoText =
                  ago === 0
                    ? "Today"
                    : ago === 1
                      ? "1 day ago"
                      : `${ago} days ago`;

                return `
                  <a class="coming-row" href="test-paper.html?institute=${encodeURIComponent(test.instituteId)}&batch=${encodeURIComponent(test.batchId)}">
                    <span class="coming-row-icon">📝</span>
                    <span class="coming-row-body">
                      <strong>${test.title || ""}</strong>
                      <small>${test.questions || 0} Questions • ${agoText}</small>
                    </span>
                  </a>
                `;

              })
              .join("");

    }


    if (upcomingList) {

      upcomingList.innerHTML =
        upcoming.length === 0
          ? '<div class="coming-card-empty">Koi upcoming test schedule nahi hai.</div>'
          : upcoming
              .slice(0, 4)
              .map(test => `
                <div class="coming-row is-static">
                  <span class="coming-row-icon">⏳</span>
                  <span class="coming-row-body">
                    <strong>${test.title || ""}</strong>
                    <small>📅 ${formatDate(test.scheduledDate)}</small>
                  </span>
                </div>
              `)
              .join("");

    }

  }


  async function loadTests() {

    try {

      const response =
        await fetch(
          "data/tests.json",
          { cache: "no-store" }
        );

      if (!response.ok) {
        return;
      }

      const data =
        await response.json();

      if (!Array.isArray(data)) {
        return;
      }

      renderCards(data);

    } catch (error) {

      console.error(
        "SRINEET Recent/Upcoming Error:",
        error
      );

    }

  }


  loadTests();

})();
