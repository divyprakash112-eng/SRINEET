/* =========================================================
   SRINEET — SHARED DARK MODE
   Ek hi file, har page par kaam karti hai.
   Technique: poore <html> par color invert + hue-rotate,
   isliye kisi bhi page ki existing CSS (colors/buttons)
   todni nahi padti — automatically dark ho jata hai.
========================================================= */

html[data-theme="dark"] {
  filter: invert(1) hue-rotate(180deg);
}

/*
 * Agar future mein koi real photo/logo image add ho
 * (jo invert nahi hona chahiye), us par ye class laga dena:
 * <img class="no-invert" ...>
 */
html[data-theme="dark"] .no-invert {
  filter: invert(1) hue-rotate(180deg);
}


/* =========================
   LAYOUT HELPER
   (header-right ko flex banate hain taaki naya
   theme-toggle button sahi se align ho)
========================= */

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}


/* =========================
   THEME TOGGLE BUTTON
========================= */

.theme-toggle {
  width: 46px;
  height: 46px;
  flex-shrink: 0;

  display: grid;
  place-items: center;

  margin-left: 10px;

  border: 1px solid var(--card-edge, #E9DFC9);
  border-radius: 14px;

  color: var(--wine, #0B3B34);
  background: var(--white, #ffffff);

  font-size: 18px;
  line-height: 1;
  cursor: pointer;

  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
}

.theme-toggle:hover {
  transform: translateY(-2px);
  border-color: var(--gold-soft, #D4AF6A);
  box-shadow: 0 10px 20px -8px rgba(185, 133, 63, 0.35);
}


/* =========================
   STREAK PILL (homepage header)
========================= */

.streak-pill {
  height: 46px;
  padding: 0 14px;

  display: inline-flex;
  align-items: center;
  gap: 6px;

  border: 1px solid var(--gold-soft, #D4AF6A);
  border-radius: 40px;

  background: linear-gradient(150deg, var(--gold-hi, #F3E3B8), #FBF3DE);
  color: var(--wine, #0B3B34);

  font-size: 13px;
  font-weight: 800;

  transition: transform .2s ease;
}

.streak-pill:hover {
  transform: translateY(-2px);
}


/* =========================
   SIDEBAR DARK MODE TOGGLE
   (index.html study menu ke andar)
========================= */

.theme-menu-toggle {
  width: 100%;
  border: none;
  background: none;
  text-align: left;
  font-family: inherit;
  cursor: pointer;
  justify-content: space-between;
}

.menu-toggle-switch {
  width: 40px;
  height: 24px;
  flex-shrink: 0;

  position: relative;

  border-radius: 20px;
  background: var(--card-edge, #E9DFC9);

  transition: background .2s ease;
}

.menu-toggle-switch::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;

  width: 18px;
  height: 18px;
  border-radius: 50%;

  background: var(--white, #ffffff);
  box-shadow: 0 2px 6px rgba(0, 0, 0, .25);

  transition: transform .2s ease;
}

.menu-toggle-switch.is-on {
  background: var(--gold, #B9853F);
}

.menu-toggle-switch.is-on::after {
  transform: translateX(16px);
}


/* =========================
   MOBILE — header ko crowd hone se bachao
========================= */

@media (max-width: 650px) {

  .streak-pill {
    height: 42px;
    padding: 0 10px;
    font-size: 12px;
  }

  .header-actions {
    gap: 7px;
  }

}

@media (max-width: 400px) {

  .streak-pill span {
    display: inline;
  }

  .header-actions {
    gap: 6px;
  }

  .streak-pill {
    height: 40px;
    padding: 0 9px;
    font-size: 11px;
  }

}


/* =========================================================
   PREMIUM UPGRADE — SHARED STYLES
   (skeleton loading, scroll reveal, search bar,
   about section, privacy note, continue-banner,
   better empty state)
========================================================= */

/* ---- SCROLL REVEAL ---- */

.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity .6s ease, transform .6s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}


/* ---- SKELETON LOADING ---- */

.skeleton-card {
  min-height: 190px;
  border-radius: 22px;
  border: 1px solid var(--card-edge, #E9DFC9);
  background: linear-gradient(
    100deg,
    var(--ivory-deep, #F1E8D8) 8%,
    #FBF6EA 18%,
    var(--ivory-deep, #F1E8D8) 33%
  );
  background-size: 200% 100%;
  animation: skeletonShimmer 1.4s ease-in-out infinite;
}

@keyframes skeletonShimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}


/* ---- SEARCH BAR ---- */

.search-bar {
  margin-top: 22px;
  position: relative;
}

.search-input {
  width: 100%;
  height: 52px;
  padding: 0 20px 0 46px;

  border: 1px solid var(--card-edge, #E9DFC9);
  border-radius: 16px;

  background: var(--white, #ffffff);
  color: var(--ink, #231C1E);

  font-size: 13px;
  font-family: inherit;

  transition: border-color .2s ease, box-shadow .2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--gold-soft, #D4AF6A);
  box-shadow: 0 0 0 3px rgba(212, 175, 106, 0.2);
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gold, #B9853F);
  font-size: 16px;
  pointer-events: none;
}

.search-empty {
  margin-top: 18px;
  padding: 40px 20px;

  border: 1px dashed var(--card-edge, #E9DFC9);
  border-radius: 18px;

  background: var(--white, #ffffff);
  text-align: center;

  color: var(--ink-dim, #6B5F5C);
  font-size: 12px;
}


/* ---- BETTER EMPTY / ERROR STATE ICON ---- */

.empty-icon-badge {
  width: 56px;
  height: 56px;
  margin: 0 auto 14px;

  display: grid;
  place-items: center;

  border-radius: 16px;

  background: linear-gradient(145deg, var(--gold-soft, #D4AF6A), var(--gold, #B9853F));
  color: var(--wine, #0B3B34);

  font-size: 24px;
}


/* ---- CONTINUE WHERE YOU LEFT OFF ---- */

.continue-banner {
  margin-top: 26px;
  padding: 20px 24px;

  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  border: 1px solid var(--gold-soft, #D4AF6A);
  border-radius: 20px;

  background: linear-gradient(150deg, var(--wine, #0B3B34), var(--wine-2, #12564C));
  color: #F8EFE9;

  box-shadow: 0 14px 30px -12px rgba(11, 59, 52, 0.5);
}

.continue-banner.is-visible {
  display: flex;
}

.continue-banner-kicker {
  color: var(--gold-hi, #F3E3B8);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .16em;
}

.continue-banner-title {
  margin-top: 6px;
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 18px;
}

.continue-banner-sub {
  margin-top: 4px;
  color: rgba(248, 239, 233, 0.75);
  font-size: 11px;
}

.continue-banner-button {
  flex-shrink: 0;
  padding: 13px 20px;

  border-radius: 12px;

  background: linear-gradient(150deg, var(--gold-hi, #F3E3B8), var(--gold-soft, #D4AF6A));
  color: var(--wine, #0B3B34);

  font-size: 11px;
  font-weight: 800;

  transition: transform .2s ease;
}

.continue-banner-button:hover {
  transform: translateY(-2px);
}


/* ---- ABOUT SECTION ---- */

.about-section {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 60px 0;
}

.about-card {
  padding: 40px;

  border: 1px solid var(--card-edge, #E9DFC9);
  border-radius: 28px;

  background: var(--white, #ffffff);
  box-shadow: 0 12px 35px rgba(11, 59, 52, .06);
}

.about-card > span {
  color: var(--gold, #B9853F);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .18em;
}

.about-card h2 {
  margin-top: 10px;
  color: var(--wine, #0B3B34);
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: clamp(24px, 4vw, 32px);
}

.about-card p {
  margin-top: 16px;
  max-width: 720px;
  color: var(--ink-dim, #6B5F5C);
  font-size: 13px;
  line-height: 1.75;
}

.about-support {
  margin-top: 24px;
  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 12px 18px;

  border: 1px solid var(--card-edge, #E9DFC9);
  border-radius: 12px;

  color: var(--wine, #0B3B34);
  font-size: 11px;
  font-weight: 800;

  transition: transform .2s ease, border-color .2s ease;
}

.about-support:hover {
  transform: translateY(-2px);
  border-color: var(--gold-soft, #D4AF6A);
}


/* ---- PRIVACY NOTE ---- */

.privacy-note {
  margin-top: 22px;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 10px 16px;

  border: 1px solid var(--card-edge, #E9DFC9);
  border-radius: 40px;

  background: var(--ivory-deep, #F1E8D8);
  color: var(--ink-dim, #6B5F5C);

  font-size: 10px;
  font-weight: 700;
}
