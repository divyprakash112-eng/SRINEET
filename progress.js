"use strict";

document.addEventListener("DOMContentLoaded", () => {


  /* =====================================================
     ELEMENTS
  ===================================================== */

  const streakCount =
    document.getElementById("streakCount");

  const enableReminders =
    document.getElementById("enableReminders");

  const statTestsTaken =
    document.getElementById("statTestsTaken");

  const statAvgAccuracy =
    document.getElementById("statAvgAccuracy");

  const statAvgScore =
    document.getElementById("statAvgScore");

  const historyList =
    document.getElementById("historyList");

  const historyEmpty =
    document.getElementById("historyEmpty");

  const clearHistory =
    document.getElementById("clearHistory");


  /* =====================================================
     STREAK
  ===================================================== */

  if (streakCount && window.SrineetStreak) {

    streakCount.textContent =
      String(window.SrineetStreak.getStreak());

  }


  if (enableReminders && window.SrineetStreak) {

    enableReminders.addEventListener(
      "click",
      () => {

        window.SrineetStreak.requestPermission();

        enableReminders.textContent =
          "🔔 Reminders Requested";

      }
    );

  }


  /* =====================================================
     SUMMARY STATS
  ===================================================== */

  function renderSummary() {

    if (!window.SrineetProgress) {
      return;
    }

    const summary =
      window.SrineetProgress.getSummary();

    if (statTestsTaken) {

      statTestsTaken.textContent =
        String(summary.testsTaken);

    }

    if (statAvgAccuracy) {

      statAvgAccuracy.textContent =
        `${summary.averageAccuracy}%`;

    }

    if (statAvgScore) {

      statAvgScore.textContent =
        `${summary.averageScorePercent}%`;

    }

  }


  /* =====================================================
     HISTORY LIST
  ===================================================== */

  function formatDate(isoString) {

    try {

      return new Date(isoString).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric"
        }
      );

    } catch (error) {

      return "";

    }

  }


  function createHistoryCard(record) {

    const card =
      document.createElement("article");

    card.className =
      "history-card";


    const scorePercent =
      record.totalMarks > 0
        ? Math.round(
            (record.score / record.totalMarks) * 100
          )
        : 0;


    const left =
      document.createElement("div");

    left.innerHTML = `
      <div class="history-card-title">${record.title}</div>
      <div class="history-card-meta">
        ${formatDate(record.date)} •
        ${record.correct} Correct •
        ${record.incorrect} Incorrect •
        ${record.unattempted} Unattempted
      </div>
      <div class="accuracy-bar-track">
        <div class="accuracy-bar-fill" style="width: ${record.accuracy}%;"></div>
      </div>
    `;


    const right =
      document.createElement("div");

    right.className =
      "history-card-score";

    right.innerHTML = `
      <strong>${record.score} / ${record.totalMarks}</strong>
      <span>${scorePercent}% score • ${record.accuracy}% accuracy</span>
    `;


    card.appendChild(left);
    card.appendChild(right);


    return card;

  }


  function renderHistory() {

    if (!historyList || !window.SrineetProgress) {
      return;
    }

    const history =
      window.SrineetProgress
        .getHistory()
        .slice()
        .sort(
          (a, b) =>
            new Date(b.date) - new Date(a.date)
        );


    historyList.innerHTML =
      "";


    if (history.length === 0) {

      if (historyEmpty) {
        historyEmpty.style.display = "block";
      }

      return;

    }


    if (historyEmpty) {
      historyEmpty.style.display = "none";
    }


    history.forEach(
      record => {

        historyList.appendChild(
          createHistoryCard(record)
        );

      }
    );

  }


  if (clearHistory) {

    clearHistory.addEventListener(
      "click",
      () => {

        const confirmed =
          window.confirm(
            "Pura test history delete karna hai? Ye undo nahi ho sakta."
          );

        if (!confirmed) {
          return;
        }

        if (window.SrineetProgress) {
          window.SrineetProgress.clearHistory();
        }

        renderSummary();
        renderHistory();

      }
    );

  }


  renderSummary();
  renderHistory();

});
