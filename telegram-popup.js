/* =========================================================
   SRINEET TELEGRAM POPUP
========================================================= */

"use strict";

(function () {

  const TELEGRAM_URL =
    "https://t.me/srineetofficial";


  function injectStyles() {

    if (document.getElementById("srineetTelegramStyles")) {
      return;
    }

    const style = document.createElement("style");

    style.id = "srineetTelegramStyles";

    style.textContent = `

      .sr-telegram-overlay {

        position: fixed;
        inset: 0;

        z-index: 9999;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 20px;

        background: rgba(3, 15, 36, .58);

        backdrop-filter: blur(10px);

        opacity: 0;
        visibility: hidden;

        transition: .25s ease;

      }


      .sr-telegram-overlay.show {

        opacity: 1;
        visibility: visible;

      }


      .sr-telegram-modal {

        width: min(430px, 100%);

        position: relative;

        overflow: hidden;

        border-radius: 30px;

        background: #fff;

        box-shadow:
          0 35px 100px rgba(0,0,0,.25);

        transform:
          translateY(18px)
          scale(.96);

        transition:
          transform .3s cubic-bezier(.2,.8,.2,1);

      }


      .sr-telegram-overlay.show
      .sr-telegram-modal {

        transform:
          translateY(0)
          scale(1);

      }


      .sr-telegram-top {

        position: relative;

        padding: 30px 27px 26px;

        color: #fff;

        background:
          linear-gradient(
            135deg,
            #061A40,
            #0B4FD8
          );

      }


      .sr-telegram-pattern {

        position: absolute;
        inset: 0;

        opacity: .08;

        background-image:
          linear-gradient(
            rgba(255,255,255,.5) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(255,255,255,.5) 1px,
            transparent 1px
          );

        background-size: 25px 25px;

      }


      .sr-telegram-close {

        position: absolute;

        top: 17px;
        right: 17px;

        width: 35px;
        height: 35px;

        display: grid;
        place-items: center;

        border-radius: 12px;

        color: white;
        background: rgba(255,255,255,.13);

        font-size: 21px;

        cursor: pointer;

        z-index: 2;

      }


      .sr-telegram-icon {

        position: relative;
        z-index: 1;

        width: 58px;
        height: 58px;

        display: grid;
        place-items: center;

        border-radius: 18px;

        background: white;

        color: #0B4FD8;

        font-size: 27px;
        font-weight: 900;

        box-shadow:
          0 10px 30px rgba(0,0,0,.13);

      }


      .sr-telegram-top h3 {

        position: relative;
        z-index: 1;

        margin-top: 19px;

        font-family: Inter, sans-serif;

        font-size: 24px;
        line-height: 1.12;

        letter-spacing: -.8px;

      }


      .sr-telegram-top p {

        position: relative;
        z-index: 1;

        margin-top: 9px;

        color: rgba(255,255,255,.72);

        font-family: Inter, sans-serif;

        font-size: 11px;
        line-height: 1.65;

      }


      .sr-telegram-body {

        padding: 23px 27px 27px;

      }


      .sr-telegram-points {

        display: grid;

        gap: 10px;

        margin-bottom: 20px;

      }


      .sr-telegram-point {

        display: flex;
        align-items: center;
        gap: 10px;

        color: #0B1F44;

        font-family: Inter, sans-serif;

        font-size: 11px;
        font-weight: 700;

      }


      .sr-telegram-check {

        width: 25px;
        height: 25px;

        flex: 0 0 25px;

        display: grid;
        place-items: center;

        border-radius: 9px;

        color: #0B4FD8;

        background: #EEF5FF;

        font-size: 12px;

      }


      .sr-telegram-join {

        width: 100%;

        min-height: 50px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 15px;

        color: white;

        background:
          linear-gradient(
            135deg,
            #0B4FD8,
            #1687FF
          );

        font-family: Inter, sans-serif;

        font-size: 12px;
        font-weight: 800;

        cursor: pointer;

        box-shadow:
          0 12px 28px rgba(11,79,216,.22);

        transition: .2s ease;

      }


      .sr-telegram-join:hover {

        transform: translateY(-2px);

      }


      .sr-telegram-later {

        width: 100%;

        margin-top: 11px;

        padding: 8px;

        color: #6F819D;

        background: transparent;

        font-family: Inter, sans-serif;

        font-size: 10px;
        font-weight: 700;

        cursor: pointer;

      }

    `;

    document.head.appendChild(style);

  }


  function createPopup() {

    if (document.getElementById("srineetTelegramPopup")) {
      return;
    }

    const overlay =
      document.createElement("div");

    overlay.id =
      "srineetTelegramPopup";

    overlay.className =
      "sr-telegram-overlay";


    overlay.innerHTML = `

      <div class="sr-telegram-modal"
           role="dialog"
           aria-modal="true"
           aria-labelledby="srTelegramTitle">

        <div class="sr-telegram-top">

          <div class="sr-telegram-pattern"></div>

          <button
            class="sr-telegram-close"
            id="srTelegramClose"
            aria-label="Close">
            ×
          </button>

          <div class="sr-telegram-icon">
            ➤
          </div>

          <h3 id="srTelegramTitle">
            Join the SRINEET Community
          </h3>

          <p id="srTelegramMessage">
            Stay connected with SRINEET.
          </p>

        </div>


        <div class="sr-telegram-body">

          <div class="sr-telegram-points">

            <div class="sr-telegram-point">
              <span class="sr-telegram-check">✓</span>
              Test series updates
            </div>

            <div class="sr-telegram-point">
              <span class="sr-telegram-check">✓</span>
              Important NEET announcements
            </div>

            <div class="sr-telegram-point">
              <span class="sr-telegram-check">✓</span>
              Preparation resources & updates
            </div>

          </div>


          <button
            class="sr-telegram-join"
            id="srTelegramJoin">
            Join SRINEET on Telegram →
          </button>

          <button
            class="sr-telegram-later"
            id="srTelegramLater">
            Maybe later
          </button>

        </div>

      </div>

    `;


    document.body.appendChild(overlay);


    const close =
      overlay.querySelector("#srTelegramClose");

    const later =
      overlay.querySelector("#srTelegramLater");

    const join =
      overlay.querySelector("#srTelegramJoin");


    function hide() {

      overlay.classList.remove("show");

      document.body.style.overflow = "";

    }


    close.addEventListener("click", hide);

    later.addEventListener("click", hide);


    overlay.addEventListener("click", (event) => {

      if (event.target === overlay) {
        hide();
      }

    });


    join.addEventListener("click", () => {

      /*
        Remember that this popup has already
        been shown for the current section.
      */

      const key =
        overlay.dataset.popupKey;

      if (key) {

        localStorage.setItem(
          `srineet_telegram_seen_${key}`,
          "1"
        );

      }

      window.open(
        TELEGRAM_URL,
        "_blank",
        "noopener,noreferrer"
      );

      hide();

    });


    overlay._hide = hide;

  }


  function show(options = {}) {

    injectStyles();

    createPopup();


    const key =
      options.key || "general";


    /*
      Don't repeatedly annoy the student.
    */

    const storageKey =
      `srineet_telegram_seen_${key}`;


    if (
      localStorage.getItem(storageKey) === "1"
    ) {
      return;
    }


    const popup =
      document.getElementById(
        "srineetTelegramPopup"
      );


    popup.dataset.popupKey = key;


    const title =
      popup.querySelector("#srTelegramTitle");

    const message =
      popup.querySelector("#srTelegramMessage");


    if (options.title) {
      title.textContent = options.title;
    }

    if (options.message) {
      message.textContent = options.message;
    }


    requestAnimationFrame(() => {

      popup.classList.add("show");

      document.body.style.overflow = "hidden";

    });

  }


  window.SRINEETTelegramPopup = {
    show
  };

})();
