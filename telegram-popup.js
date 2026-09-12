/* =========================================
   SRINEET — TELEGRAM POPUP
   ========================================= */

(function () {

  const TELEGRAM_URL = "https://t.me/srineetofficial";

  const popupHTML = `
    <div class="telegram-popup" id="telegramPopup">

      <div class="telegram-popup-card">

        <button
          class="telegram-popup-close"
          id="telegramPopupClose"
          aria-label="Close">
          ×
        </button>

        <div class="telegram-popup-icon">
          ✈
        </div>

        <div class="telegram-popup-eyebrow">
          SRINEET OFFICIAL
        </div>

        <h2 class="telegram-popup-title">
          Telegram se jud jao! 🚀
        </h2>

        <p class="telegram-popup-message">
          <strong>New Tests, Notes, PYQs & important updates</strong>
          — sabse pehle yahin. Website par naya link aane se pehle
          Telegram check kar lena! 🔥
        </p>

        <a
          class="telegram-popup-join"
          href="${TELEGRAM_URL}"
          target="_blank"
          rel="noopener noreferrer"
          id="telegramJoinButton">
          JOIN TELEGRAM →
        </a>

        <p class="telegram-popup-note">
          Stay updated • Stay ahead • Prepare smarter
        </p>

      </div>

    </div>
  `;


  /* Create popup */

  document.body.insertAdjacentHTML(
    "beforeend",
    popupHTML
  );


  const popup =
    document.getElementById("telegramPopup");

  const closeButton =
    document.getElementById("telegramPopupClose");

  const joinButton =
    document.getElementById("telegramJoinButton");


  /* =========================================
     SHOW POPUP
     ========================================= */

  function showPopup() {

    popup.classList.add("active");

    document.body.style.overflow = "hidden";
  }


  /* =========================================
     CLOSE POPUP
     ========================================= */

  function closePopup() {

    popup.classList.remove("active");

    document.body.style.overflow = "";

    localStorage.setItem(
      "srineetTelegramPopupClosed",
      Date.now().toString()
    );
  }


  /* =========================================
     CLOSE BUTTON
     ========================================= */

  closeButton.addEventListener(
    "click",
    closePopup
  );


  /* =========================================
     CLICK BACKDROP TO CLOSE
     ========================================= */

  popup.addEventListener(
    "click",
    function (event) {

      if (event.target === popup) {
        closePopup();
      }

    }
  );


  /* =========================================
     JOIN BUTTON
     ========================================= */

  joinButton.addEventListener(
    "click",
    function () {

      localStorage.setItem(
        "srineetTelegramJoined",
        "true"
      );

    }
  );


  /* =========================================
     ESC KEY
     ========================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {
        closePopup();
      }

    }
  );


  /* =========================================
     POPUP TIMING
     Show again after 24 hours
     ========================================= */

  const lastClosed =
    localStorage.getItem(
      "srineetTelegramPopupClosed"
    );

  const twentyFourHours =
    24 * 60 * 60 * 1000;


  const shouldShow =
    !lastClosed ||
    Date.now() - Number(lastClosed) >
    twentyFourHours;


  if (shouldShow) {

    setTimeout(
      showPopup,
      1200
    );

  }

})();
