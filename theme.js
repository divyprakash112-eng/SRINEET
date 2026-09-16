"use strict";

/*
=========================================================
SRINEET — DARK MODE TOGGLE
Har page par yahi ek file include karo.

Do tarah se kaam karta hai:
1) Simple button:  <button id="themeToggle">🌙</button>
2) Sidebar row:     <button id="themeToggle">
                       <span id="themeToggleIcon">🌙</span>
                       <span>Dark Mode</span>
                       <span id="themeToggleSwitch"></span>
                     </button>
Dono cases mein sahi se icon/switch update hota hai.
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

    const toggleIcon =
      document.getElementById("themeToggleIcon");

    const toggleSwitch =
      document.getElementById("themeToggleSwitch");

    const isDark =
      theme === "dark";

    if (isDark) {

      root.setAttribute(
        "data-theme",
        "dark"
      );

    } else {

      root.removeAttribute(
        "data-theme"
      );

    }


    const icon =
      isDark ? "☀️" : "🌙";

    if (toggleIcon) {

      /* Sidebar version — sirf icon span badlo */

      toggleIcon.textContent =
        icon;

    } else if (toggleButton) {

      /* Simple button version — pura button text hi icon hai */

      toggleButton.textContent =
        icon;

    }


    if (toggleSwitch) {

      toggleSwitch.classList.toggle(
        "is-on",
        isDark
      );

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

      /* Icon/switch sync (page load ke baad element milta hai) */

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
