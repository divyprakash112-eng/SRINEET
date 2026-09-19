"use strict";

/*
=========================================================
SRINEET — PREMIUM FEATURES (shared)
Ek hi file, har page include kar sakta hai. 3 cheezein:

1) SrineetReveal.observe()
   Kisi bhi ".reveal" class wale element ko scroll mein
   aane par fade-up animate karta hai. Dynamically
   create hue elements ke liye dobara call karo.

2) SrineetSearch.attach(inputEl, cardsContainer, cardSelector, emptyEl)
   Ek search box ko card-list se jod deta hai — type
   karte hi matching cards dikhte hain, baaki chhup
   jaate hain.

3) SrineetContinue.getLastAttempt()
   progress-tracker.js ki history se sabse recent test
   attempt nikal ke deta hai (homepage banner ke liye).
=========================================================
*/


/* =====================================================
   1) SCROLL REVEAL
===================================================== */

window.SrineetReveal = (function () {

  let observer = null;


  function ensureObserver() {

    if (observer) {
      return observer;
    }

    if (!("IntersectionObserver" in window)) {
      return null;
    }

    observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

          }

        });

      },
      { threshold: 0.15 }
    );

    return observer;

  }


  function observe(root) {

    const scope =
      root || document;

    const obs =
      ensureObserver();

    const elements =
      scope.querySelectorAll(".reveal:not(.is-visible)");

    if (!obs) {

      /* Purana browser — bas seedha dikha do */

      elements.forEach(el =>
        el.classList.add("is-visible")
      );

      return;

    }

    elements.forEach(el => obs.observe(el));

  }


  return { observe };

})();

document.addEventListener(
  "DOMContentLoaded",
  () => window.SrineetReveal.observe()
);


/* =====================================================
   2) SEARCH FILTER
===================================================== */

window.SrineetSearch = (function () {

  function attach(inputEl, containerEl, cardSelector, emptyEl) {

    if (!inputEl || !containerEl) {
      return;
    }

    inputEl.addEventListener(
      "input",
      () => {

        const query =
          inputEl.value.trim().toLowerCase();

        const cards =
          containerEl.querySelectorAll(cardSelector);

        let visibleCount = 0;

        cards.forEach(card => {

          const text =
            (card.textContent || "").toLowerCase();

          const matches =
            query === "" || text.includes(query);

          card.style.display =
            matches ? "" : "none";

          if (matches) {
            visibleCount += 1;
          }

        });

        if (emptyEl) {

          emptyEl.style.display =
            (query !== "" && visibleCount === 0)
              ? "block"
              : "none";

        }

      }
    );

  }


  return { attach };

})();


/* =====================================================
   4) COMING SOON POPUP
   Kisi bhi <a data-coming-soon="Feature Name"> par
   click karte hi cute popup khulega, page navigate
   nahi hogi (kyunki wo page abhi bana hi nahi).
===================================================== */

(function () {

  let modalEl =
    null;

  function buildModal() {

    if (modalEl) {
      return modalEl;
    }

    modalEl =
      document.createElement("div");

    modalEl.className =
      "coming-soon-modal";

    modalEl.innerHTML = `
      <div class="coming-soon-backdrop"></div>
      <div class="coming-soon-box">
        <div class="coming-soon-emoji">🚧</div>
        <span class="coming-soon-kicker">COMING SOON</span>
        <h2 class="coming-soon-title" id="comingSoonTitle">This feature</h2>
        <p>Hum isko abhi bana rahe hain, pyaar se! Jaise hi ready hoga, bell 🔔 se pata chal jayega.</p>
        <div class="coming-soon-actions">
          <a href="https://t.me/srineetofficial" target="_blank" rel="noopener noreferrer" class="coming-soon-button primary">
            🔔 Telegram pe update pao
          </a>
          <button type="button" class="coming-soon-button" id="comingSoonClose">
            Theek hai
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    const close =
      () => modalEl.classList.remove("is-open");

    modalEl
      .querySelector(".coming-soon-backdrop")
      .addEventListener("click", close);

    modalEl
      .querySelector("#comingSoonClose")
      .addEventListener("click", close);

    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape" &&
          modalEl.classList.contains("is-open")
        ) {
          close();
        }

      }
    );

    return modalEl;

  }

  document.addEventListener(
    "click",
    event => {

      const trigger =
        event.target.closest("[data-coming-soon]");

      if (!trigger) {
        return;
      }

      event.preventDefault();

      const modal =
        buildModal();

      modal.querySelector("#comingSoonTitle").textContent =
        trigger.dataset.comingSoon || "This feature";

      requestAnimationFrame(() => {
        modal.classList.add("is-open");
      });

    }
  );

})();

window.SrineetContinue = (function () {

  function getLastAttempt() {

    if (!window.SrineetProgress) {
      return null;
    }

    const history =
      window.SrineetProgress.getHistory();

    if (!history || history.length === 0) {
      return null;
    }

    return (
      history
        .slice()
        .sort(
          (a, b) =>
            new Date(b.date) - new Date(a.date)
        )[0]
    );

  }


  return { getLastAttempt };

})();
