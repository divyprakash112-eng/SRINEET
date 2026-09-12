/* =========================================
   SRINEET — TELEGRAM POPUP
   PAGE-WISE VERSION
   ========================================= */

(function () {

  "use strict";


  /* =========================================
     TELEGRAM URL
     ========================================= */

  const TELEGRAM_URL =
    "https://t.me/srineetofficial";


  /* =========================================
     ALLOWED PAGES
     
     Popup sirf in 3 pages par chalega:
     1. test-series.html
     2. institute.html
     3. test-paper.html

     CBT test pages par nahi chalega.
     ========================================= */

  const allowedPages = [
    "test-series.html",
    "institute.html",
    "test-paper.html"
  ];


  const currentPage =
    window.location.pathname
      .split("/")
      .pop()
      .toLowerCase();


  if (!allowedPages.includes(currentPage)) {
    return;
  }


  /* =========================================
     PAGE-SPECIFIC STORAGE KEY

     Har page ka popup alag remember hoga.

     Example:

     test-series.html
     institute.html?institute=pw
     test-paper.html?institute=pw&batch=yakeen-1-0

     Sabka alag popup state hoga.
     ========================================= */

  const pageIdentifier =
    currentPage +
    window.location.search;


  const storageKey =
    "srineetTelegramPopupClosed:" +
    pageIdentifier;


  /* =========================================
     POPUP HTML
     ========================================= */

  const popupHTML = `

    <div
      class="telegram-popup"
      id="telegramPopup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="telegramPopupTitle"
    >

      <div class="telegram-popup-card">


        <!-- CLOSE BUTTON -->

        <button
          type="button"
          class="telegram-popup-close"
          id="telegramPopupClose"
          aria-label="Close Telegram popup"
        >
          ×
        </button>


        <!-- TELEGRAM ICON -->

        <div
          class="telegram-popup-icon"
          aria-hidden="true"
        >
          ✈
        </div>


        <!-- EYEBROW -->

        <div class="telegram-popup-eyebrow">
          SRINEET OFFICIAL
        </div>


        <!-- TITLE -->

        <h2
          class="telegram-popup-title"
          id="telegramPopupTitle"
        >
          Telegram se jud jao! 🚀
        </h2>


        <!-- MESSAGE -->

        <p class="telegram-popup-message">

          <strong>
            New Tests, Notes, PYQs & important updates
          </strong>

          — sabse pehle yahin.

          Website par naya link aane se pehle
          Telegram check kar lena! 🔥

        </p>


        <!-- JOIN BUTTON -->

        <a
          class="telegram-popup-join"
          href="${TELEGRAM_URL}"
          target="_blank"
          rel="noopener noreferrer"
          id="telegramJoinButton"
        >
          JOIN TELEGRAM →
        </a>


        <!-- FOOTER NOTE -->

        <p class="telegram-popup-note">
          Stay updated • Stay ahead • Prepare smarter
        </p>

      </div>

    </div>

  `;


  /* =========================================
     CREATE POPUP
     ========================================= */

  document.body.insertAdjacentHTML(
    "beforeend",
    popupHTML
  );


  /* =========================================
     GET ELEMENTS
     ========================================= */

  const popup =
    document.getElementById(
      "telegramPopup"
    );


  const closeButton =
    document.getElementById(
      "telegramPopupClose"
    );


  const joinButton =
    document.getElementById(
      "telegramJoinButton"
    );


  /* =========================================
     SAFETY CHECK
     ========================================= */

  if (
    !popup ||
    !closeButton ||
    !joinButton
  ) {
    return;
  }


  /* =========================================
     SHOW POPUP
     ========================================= */

  function showPopup() {

    popup.classList.add("active");

    document.body.style.overflow =
      "hidden";


    /* Focus close button for keyboard
       accessibility */

    setTimeout(function () {

      closeButton.focus();

    }, 100);

  }


  /* =========================================
     CLOSE POPUP
     ========================================= */

  function closePopup() {

    popup.classList.remove("active");

    document.body.style.overflow = "";


    /*
      Save close time ONLY for the
      CURRENT PAGE.
    */

    try {

      localStorage.setItem(
        storageKey,
        Date.now().toString()
      );

    } catch (error) {

      console.warn(
        "SRINEET popup storage unavailable.",
        error
      );

    }

  }


  /* =========================================
     CLOSE BUTTON
     ========================================= */

  closeButton.addEventListener(
    "click",
    closePopup
  );


  /* =========================================
     BACKDROP CLICK
     ========================================= */

  popup.addEventListener(
    "click",
    function (event) {

      if (
        event.target === popup
      ) {

        closePopup();

      }

    }
  );


  /* =========================================
     JOIN TELEGRAM
     ========================================= */

  joinButton.addEventListener(
    "click",
    function () {

      /*
        Remember that user clicked
        Telegram button.
      */

      try {

        localStorage.setItem(
          "srineetTelegramJoined",
          "true"
        );

      } catch (error) {

        console.warn(
          "SRINEET Telegram state could not be saved.",
          error
        );

      }

    }
  );


  /* =========================================
     ESC KEY
     ========================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        popup.classList.contains("active")
      ) {

        closePopup();

      }

    }
  );


  /* =========================================
     CHECK LAST CLOSED TIME
     
     Popup 24 hours ke baad
     same page par dobara show hoga.
     ========================================= */

  let lastClosed = null;


  try {

    lastClosed =
      localStorage.getItem(
        storageKey
      );

  } catch (error) {

    console.warn(
      "SRINEET popup storage unavailable.",
      error
    );

  }


  const twentyFourHours =
    24 * 60 * 60 * 1000;


  const now =
    Date.now();


  const lastClosedTime =
    Number(lastClosed);


  const shouldShow =
    !lastClosed ||
    !Number.isFinite(lastClosedTime) ||
    now - lastClosedTime >
    twentyFourHours;


  /* =========================================
     SHOW AFTER 1.2 SECONDS
     ========================================= */

  if (shouldShow) {

    window.setTimeout(
      showPopup,
      1200
    );

  }


})();
