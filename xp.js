"use strict";

/*
=========================================================
SRINEET — XP COINS
Koi backend nahi — har sahi (correct) answer par
4 XP coin milta hai, total is device ke localStorage
mein save hota hai. Kisi bhi CBT test file ke
finalizeSubmission() ke andar
SrineetXP.awardForCorrectAnswers(correctCount) call karo.
=========================================================
*/

window.SrineetXP = (function () {

  const XP_KEY =
    "srineet_xp_total";

  const XP_PER_CORRECT =
    4;


  /* =====================================================
     READ TOTAL XP
  ===================================================== */

  function getXP() {

    return (
      parseInt(
        localStorage.getItem(XP_KEY),
        10
      ) || 0
    );

  }


  /* =====================================================
     ADD RAW XP
  ===================================================== */

  function addXP(amount) {

    const safeAmount =
      Number(amount) || 0;

    const updated =
      getXP() + safeAmount;

    localStorage.setItem(
      XP_KEY,
      String(updated)
    );

    return updated;

  }


  /* =====================================================
     CALL THIS ON TEST SUBMIT
     (correctCount = kitne sawaal sahi hue)
  ===================================================== */

  function awardForCorrectAnswers(correctCount) {

    const earned =
      (Number(correctCount) || 0) * XP_PER_CORRECT;

    addXP(earned);

    return earned;

  }


  /* =====================================================
     LEVEL SYSTEM
     Har 500 XP par 1 level upar. Level 1 se shuru.
  ===================================================== */

  const XP_PER_LEVEL =
    500;

  function getLevel() {

    return (
      Math.floor(getXP() / XP_PER_LEVEL) + 1
    );

  }

  function getProgressToNextLevel() {

    const xp =
      getXP();

    const intoLevel =
      xp % XP_PER_LEVEL;

    return {
      current: intoLevel,
      needed: XP_PER_LEVEL,
      percent: Math.round(
        (intoLevel / XP_PER_LEVEL) * 100
      )
    };

  }


  return {
    getXP,
    addXP,
    awardForCorrectAnswers,
    getLevel,
    getProgressToNextLevel,
    XP_PER_CORRECT
  };

})();
