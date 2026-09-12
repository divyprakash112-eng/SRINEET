"use strict";

const instituteGrid = document.getElementById("instituteGrid");
const seriesLoading = document.getElementById("seriesLoading");
const seriesError = document.getElementById("seriesError");

function showLoading() {
  seriesLoading.hidden = false;
  seriesError.hidden = true;
}

function hideLoading() {
  seriesLoading.hidden = true;
}

function showError() {
  seriesLoading.hidden = true;
  seriesError.hidden = false;
}

function createInstituteCard(institute) {
  const card = document.createElement("a");

  card.className = "institute-card";
  card.href = `institute.html?institute=${encodeURIComponent(institute.id)}`;
  card.setAttribute(
    "aria-label",
    `Open ${institute.name} test series`
  );

  card.innerHTML = `
    <span class="institute-number">
      ${String(institute.order).padStart(2, "0")}
    </span>

    <div class="institute-visual" aria-hidden="true">
      ${escapeHTML(institute.shortName)}
    </div>

    <div class="institute-info">
      <span class="institute-label">
        ${escapeHTML(institute.label)}
      </span>

      <h3>${escapeHTML(institute.name)}</h3>
    </div>

    <span class="institute-action" aria-hidden="true">
      ↗
    </span>
  `;

  return card;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function loadInstitutes() {
  showLoading();

  try {
    const response = await fetch("data/institutes.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Unable to load institutes.json");
    }

    const institutes = await response.json();

    if (!Array.isArray(institutes) || institutes.length === 0) {
      throw new Error("Institute data is empty.");
    }

    institutes.sort((a, b) => a.order - b.order);

    instituteGrid.innerHTML = "";

    institutes.forEach((institute) => {
      instituteGrid.appendChild(
        createInstituteCard(institute)
      );
    });

    hideLoading();
  } catch (error) {
    console.error("SRINEET Test Series Error:", error);
    showError();
  }
}

loadInstitutes();
