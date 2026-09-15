"use strict";

/*
=========================================================
SRINEET — STUDY STREAK + LOCAL REMINDER
Koi backend/push server nahi. Streak device ke
localStorage mein track hoti hai. Reminder sirf tab
dikhta hai jab student browser/tab khole (asli
"app band ho tab bhi notification" backend ke bina
possible nahi hota — ye us limitation ke saath
honest, local-only version hai).
=========================================================
*/

window.SrineetStreak = (function () {

  const COUNT_KEY =
    "srineet_streak_count";

  const LAST_DATE_KEY =
    "srineet_streak_last_date";


  function todayString() {

    return new Date()
      .toISOString()
      .slice(0, 10);

  }


  function yesterdayString() {

    const d = new Date();

    d.setDate(d.getDate() - 1);

    return d
      .toISOString()
      .slice(0, 10);

  }


  /* =====================================================
     CALL THIS WHEN STUDENT COMPLETES A TEST
  ===================================================== */

  function recordActivity() {

    const today =
      todayString();

    const lastDate =
      localStorage.getItem(LAST_DATE_KEY);

    let count =
      parseInt(
        localStorage.getItem(COUNT_KEY),
        10
      ) || 0;

    if (lastDate === today) {

      /* Aaj already record ho chuka hai */

    } else if (lastDate === yesterdayString()) {

      count += 1;

    } else {

      count = 1;

    }

    localStorage.setItem(COUNT_KEY, String(count));
    localStorage.setItem(LAST_DATE_KEY, today);

    return count;

  }


  /* =====================================================
     CURRENT STREAK (display ke liye)
  ===================================================== */

  function getStreak() {

    const lastDate =
      localStorage.getItem(LAST_DATE_KEY);

    const count =
      parseInt(
        localStorage.getItem(COUNT_KEY),
        10
      ) || 0;

    /*
     * Agar aaj ya kal activity nahi hui,
     * to streak (display ke liye) toot chuki hai.
     */

    if (
      lastDate !== todayString() &&
      lastDate !== yesterdayString()
    ) {

      return 0;

    }

    return count;

  }


  function hasActivityToday() {

    return (
      localStorage.getItem(LAST_DATE_KEY) ===
      todayString()
    );

  }


  /* =====================================================
     NOTIFICATION PERMISSION
     (button click jaisi user-gesture se hi call karo,
     browsers automatic permission popup allow nahi karte)
  ===================================================== */

  function requestPermission() {

    if (
      "Notification" in window &&
      Notification.permission === "default"
    ) {

      Notification.requestPermission();

    }

  }


  /* =====================================================
     LOCAL REMINDER
     Sirf tab dikhta hai jab is tab/page ko khola jaye
     aur aaj abhi tak koi activity na hui ho.
  ===================================================== */

  function maybeShowReminder() {

    if (hasActivityToday()) {
      return;
    }

    if (!("Notification" in window)) {
      return;
    }

    if (Notification.permission !== "granted") {
      return;
    }

    new Notification(
      "SRINEET",
      {
        body:
          "Aaj ka test abhi baaki hai. Streak mat todo! 🔥",
        icon: "icons/icon-192.png"
      }
    );

  }


  return {
    recordActivity,
    getStreak,
    hasActivityToday,
    requestPermission,
    maybeShowReminder
  };

})();
