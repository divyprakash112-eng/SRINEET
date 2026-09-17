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
   3) CONTINUE WHERE YOU LEFT OFF
===================================================== */

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
