"use strict";

/*
=========================================================
SRINEET — DARK MODE TOGGLE
Har page par yahi ek file include karo. Agar us page
par #themeToggle button hoga to wo kaam karega, warna
ye script bas saved theme apply kar dega (silent).
=========================================================
*/

(function () {

  const STORAGE_KEY =
    "srineet_theme";

  const root =
    document.documentElement;


  function applyTheme(theme) {

    const toggleButton =
      document.getElementById("themeToggle");

    if (theme === "dark") {

      root.setAttribute(
        "data-theme",
        "dark"
      );

      if (toggleButton) {
        toggleButton.textContent = "☀️";
      }

    } else {

      root.removeAttribute(
        "data-theme"
      );

      if (toggleButton) {
        toggleButton.textContent = "🌙";
      }

    }

  }


  const savedTheme =
    localStorage.getItem(STORAGE_KEY);

  applyTheme(
    savedTheme === "dark"
      ? "dark"
      : "light"
  );


  document.addEventListener(
    "DOMContentLoaded",
    () => {

      const toggleButton =
        document.getElementById("themeToggle");

      /* Icon sync (page load ke baad element milta hai) */

      applyTheme(
        localStorage.getItem(STORAGE_KEY) === "dark"
          ? "dark"
          : "light"
      );

      if (!toggleButton) {
        return;
      }

      toggleButton.addEventListener(
        "click",
        () => {

          const isDark =
            root.getAttribute("data-theme") === "dark";

          const nextTheme =
            isDark ? "light" : "dark";

          applyTheme(nextTheme);

          localStorage.setItem(
            STORAGE_KEY,
            nextTheme
          );

        }
      );

    }
  );

})();
