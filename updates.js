"use strict";

/*
=========================================================
SRINEET — WHAT'S NEW NOTIFICATIONS (premium panel)
Backend nahi — data/updates.json file se list aati hai.
Naya update push karne ke liye bas us JSON file mein
ek naya object upar add karo (unique "id" ke saath,
purane se bada number, aur ek "icon" emoji).

Jab bhi koi student site khole aur unseen update ho:
- bell icon shake karega
- ek number badge dikhega (kitne naye updates hain)
- click karne par smooth panel khulega, har item par
  "NEW" tag hoga jo abhi tak nahi dekha
=========================================================
*/

(function () {

  const SEEN_KEY =
    "srineet_last_seen_update";

  const bellButton =
    document.querySelector(".bell-button");

  const bellDot =
    bellButton
      ? bellButton.querySelector(".bell-dot")
      : null;

  if (!bellButton) {
    return;
  }


  let updatesCache =
    [];

  let panelEl =
    null;

  let seenIdAtLoad =
    parseInt(
      localStorage.getItem(SEEN_KEY),
      10
    ) || 0;


  /* =====================================================
     BUILD PANEL (ek baar, DOM mein inject karo)
  ===================================================== */

  function buildPanel() {

    if (panelEl) {
      return panelEl;
    }

    panelEl =
      document.createElement("div");

    panelEl.className =
      "updates-panel";

    panelEl.id =
      "updatesPanel";

    panelEl.setAttribute(
      "aria-hidden",
      "true"
    );

    panelEl.innerHTML = `
      <div class="updates-panel-header">
        <span>🔔 WHAT'S NEW</span>
      </div>
      <div class="updates-panel-list" id="updatesPanelList"></div>
    `;

    document.body.appendChild(panelEl);

    document.addEventListener(
      "click",
      event => {

        if (
          !panelEl.classList.contains("is-open") ||
          panelEl.contains(event.target) ||
          bellButton.contains(event.target)
        ) {
          return;
        }

        closePanel();

      }
    );

    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape" &&
          panelEl.classList.contains("is-open")
        ) {

          closePanel();

        }

      }
    );

    return panelEl;

  }


  /* =====================================================
     RENDER LIST
  ===================================================== */

  function renderList() {

    const panel =
      buildPanel();

    const list =
      panel.querySelector("#updatesPanelList");

    if (!list) {
      return;
    }

    if (updatesCache.length === 0) {

      list.innerHTML =
        '<div class="updates-empty">✨<br>Koi update nahi hai abhi.</div>';

      return;

    }

    list.innerHTML =
      updatesCache
        .map(update => {

          const isNew =
            (Number(update.id) || 0) > seenIdAtLoad;

          return `
            <div class="updates-item">
              <div class="updates-item-icon">${update.icon || "🎉"}</div>
              <div class="updates-item-body">
                <div class="updates-item-top">
                  <span class="updates-item-title">${update.title || ""}</span>
                  ${isNew ? '<span class="updates-new-tag">NEW</span>' : ""}
                </div>
                <div class="updates-item-message">${update.message || ""}</div>
                <div class="updates-item-date">${update.date || ""}</div>
              </div>
            </div>
          `;

        })
        .join("");

  }


  /* =====================================================
     OPEN / CLOSE PANEL
  ===================================================== */

  function openPanel() {

    const panel =
      buildPanel();

    renderList();

    panel.classList.add("is-open");

    panel.setAttribute(
      "aria-hidden",
      "false"
    );

    /* Badge clear ho jaye, but "NEW" tags is render mein dikhte rahenge */

    const latestId =
      getLatestId();

    if (latestId !== null) {

      localStorage.setItem(
        SEEN_KEY,
        String(latestId)
      );

    }

    setBadge(0);

    bellButton.classList.remove(
      "has-unread"
    );

  }


  function closePanel() {

    if (!panelEl) {
      return;
    }

    panelEl.classList.remove("is-open");

    panelEl.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  function togglePanel() {

    if (
      panelEl &&
      panelEl.classList.contains("is-open")
    ) {

      closePanel();

    } else {

      openPanel();

    }

  }


  function getLatestId() {

    if (updatesCache.length === 0) {
      return null;
    }

    return Math.max(
      ...updatesCache.map(u => Number(u.id) || 0)
    );

  }


  /* =====================================================
     BADGE (count) ON BELL
  ===================================================== */

  function setBadge(count) {

    if (!bellDot) {
      return;
    }

    if (count > 0) {

      bellDot.textContent =
        count > 9 ? "9+" : String(count);

      bellDot.classList.add("has-count");

    } else {

      bellDot.textContent =
        "";

      bellDot.classList.remove("has-count");

    }

  }


  /* =====================================================
     LOAD DATA
  ===================================================== */

  async function loadUpdates() {

    try {

      const response =
        await fetch(
          "data/updates.json",
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

      updatesCache =
        data.sort(
          (a, b) => (Number(b.id) || 0) - (Number(a.id) || 0)
        );

      const latestId =
        getLatestId();

      const unreadCount =
        updatesCache.filter(
          u => (Number(u.id) || 0) > seenIdAtLoad
        ).length;

      setBadge(unreadCount);

      if (unreadCount > 0) {

        bellButton.classList.add(
          "has-unread"
        );

      }

    } catch (error) {

      console.error(
        "SRINEET Updates Error:",
        error
      );

    }

  }


  bellButton.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      togglePanel();

    }
  );


  loadUpdates();

})();
