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

  const statTotalXP =
    document.getElementById("statTotalXP");

  const xpTotal =
    document.getElementById("xpTotal");

  const xpLevel =
    document.getElementById("xpLevel");

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


  /* =====================================================
     XP COINS
  ===================================================== */

  if (window.SrineetXP) {

    const totalXP =
      window.SrineetXP.getXP();

    const level =
      window.SrineetXP.getLevel();

    if (xpTotal) {
      xpTotal.textContent = String(totalXP);
    }

    if (xpLevel) {
      xpLevel.textContent = String(level);
    }

    if (statTotalXP) {
      statTotalXP.textContent = String(totalXP);
    }

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


  /* =====================================================
     SCORE TREND CHART (pure SVG, no library)
  ===================================================== */

  function renderTrendChart() {

    const box =
      document.getElementById("trendChartBox");

    if (!box || !window.SrineetProgress) {
      return;
    }

    const history =
      window.SrineetProgress
        .getHistory()
        .slice()
        .sort(
          (a, b) =>
            new Date(a.date) - new Date(b.date)
        );

    if (history.length < 2) {
      return;
    }

    const points =
      history.map(record =>
        record.totalMarks > 0
          ? Math.round((record.score / record.totalMarks) * 100)
          : 0
      );

    const width = 600;
    const height = 200;
    const padding = 20;

    const stepX =
      (width - padding * 2) / (points.length - 1);

    const coords =
      points.map((value, index) => {

        const x =
          padding + index * stepX;

        const y =
          height - padding - (value / 100) * (height - padding * 2);

        return { x, y, value };

      });

    const pathD =
      coords
        .map((c, i) => (i === 0 ? "M" : "L") + c.x + " " + c.y)
        .join(" ");

    const dots =
      coords
        .map(c =>
          `<circle cx="${c.x}" cy="${c.y}" r="4" fill="#B9853F"><title>${c.value}%</title></circle>`
        )
        .join("");

    box.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;overflow:visible;">
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#E9DFC9" stroke-width="1"/>
        <path d="${pathD}" fill="none" stroke="#B9853F" stroke-width="2.5"/>
        ${dots}
      </svg>
      <div style="text-align:center;margin-top:8px;color:#6B5F5C;font-size:11px;">
        Score % — last ${points.length} attempts (oldest → newest)
      </div>
    `;

  }


  /* =====================================================
     WEAK TOPIC REPORT
  ===================================================== */

  function renderWeakTopics() {

    const list =
      document.getElementById("weakList");

    if (!list || !window.SrineetProgress) {
      return;
    }

    const subjects =
      window.SrineetProgress.getSubjectBreakdown();

    if (subjects.length === 0) {
      return;
    }

    list.innerHTML =
      subjects
        .map(subject => `
          <div class="weak-item">
            <div class="weak-item-top">
              <span class="weak-item-subject">${subject.subject}</span>
              <span class="weak-item-accuracy">${subject.accuracy}%</span>
            </div>
            <div class="weak-item-bar-track">
              <div class="weak-item-bar-fill ${subject.accuracy < 50 ? "is-weak" : ""}" style="width: ${subject.accuracy}%;"></div>
            </div>
          </div>
        `)
        .join("");

  }


  /* =====================================================
     ACHIEVEMENT BADGES
     Existing data (history, streak, XP) se hi compute
     hote hain — koi alag storage nahi chahiye.
  ===================================================== */

  function renderBadges() {

    const grid =
      document.getElementById("badgesGrid");

    if (!grid || !window.SrineetProgress) {
      return;
    }

    const history =
      window.SrineetProgress.getHistory();

    const totalQuestions =
      history.reduce(
        (sum, r) => sum + r.correct + r.incorrect + r.unattempted,
        0
      );

    const hasPerfect =
      history.some(r => r.accuracy === 100);

    const streak =
      window.SrineetStreak
        ? window.SrineetStreak.getStreak()
        : 0;

    const level =
      window.SrineetXP
        ? window.SrineetXP.getLevel()
        : 1;

    const badges = [
      {
        icon: "🎯",
        name: "First Steps",
        desc: "1st test complete",
        unlocked: history.length >= 1
      },
      {
        icon: "🔥",
        name: "7-Day Streak",
        desc: "7 din lagatar",
        unlocked: streak >= 7
      },
      {
        icon: "💯",
        name: "Perfect Score",
        desc: "100% accuracy",
        unlocked: hasPerfect
      },
      {
        icon: "📚",
        name: "Century",
        desc: "100+ questions",
        unlocked: totalQuestions >= 100
      },
      {
        icon: "⭐",
        name: "Level 3",
        desc: "1000+ XP earned",
        unlocked: level >= 3
      },
      {
        icon: "🏅",
        name: "Consistent",
        desc: "10 tests diye",
        unlocked: history.length >= 10
      }
    ];

    grid.innerHTML =
      badges
        .map(badge => `
          <div class="badge-card ${badge.unlocked ? "" : "is-locked"}">
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-desc">${badge.desc}</div>
          </div>
        `)
        .join("");

  }


  renderSummary();
  renderHistory();
  renderTrendChart();
  renderWeakTopics();
  renderBadges();

});
