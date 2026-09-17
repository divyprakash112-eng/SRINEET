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
- kisi bhi item pe click karo to pura message ek
  premium popup mein khulega
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
        .map((update, index) => {

          const isNew =
            (Number(update.id) || 0) > seenIdAtLoad;

          return `
            <div class="updates-item" data-index="${index}">
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

    list
      .querySelectorAll(".updates-item")
      .forEach(item => {

        item.addEventListener(
          "click",
          () => {

            const index =
              parseInt(item.dataset.index, 10);

            const update =
              updatesCache[index];

            if (update) {
              openDetailModal(update);
            }

          }
        );

      });

  }


  /* =====================================================
     DETAIL MODAL (premium popup — full message)
  ===================================================== */

  let detailModalEl =
    null;

  function buildDetailModal() {

    if (detailModalEl) {
      return detailModalEl;
    }

    detailModalEl =
      document.createElement("div");

    detailModalEl.className =
      "update-detail-modal";

    detailModalEl.innerHTML = `
      <div class="update-detail-backdrop"></div>
      <div class="update-detail-box">
        <button type="button" class="update-detail-close" aria-label="Close">✕</button>
        <div class="update-detail-glow"></div>
        <div class="update-detail-icon" id="updateDetailIcon">🎉</div>
        <span class="update-detail-date" id="updateDetailDate"></span>
        <h2 class="update-detail-title" id="updateDetailTitle"></h2>
        <p class="update-detail-message" id="updateDetailMessage"></p>
        <button type="button" class="update-detail-button">Got it</button>
      </div>
    `;

    document.body.appendChild(detailModalEl);

    const closeDetail =
      () => detailModalEl.classList.remove("is-open");

    detailModalEl
      .querySelector(".update-detail-backdrop")
      .addEventListener("click", closeDetail);

    detailModalEl
      .querySelector(".update-detail-close")
      .addEventListener("click", closeDetail);

    detailModalEl
      .querySelector(".update-detail-button")
      .addEventListener("click", closeDetail);

    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape" &&
          detailModalEl.classList.contains("is-open")
        ) {
          closeDetail();
        }

      }
    );

    return detailModalEl;

  }


  function openDetailModal(update) {

    const modal =
      buildDetailModal();

    modal.querySelector("#updateDetailIcon").textContent =
      update.icon || "🎉";

    modal.querySelector("#updateDetailDate").textContent =
      update.date || "";

    modal.querySelector("#updateDetailTitle").textContent =
      update.title || "";

    modal.querySelector("#updateDetailMessage").textContent =
      update.message || "";

    closePanel();

    requestAnimationFrame(() => {
      modal.classList.add("is-open");
    });

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
