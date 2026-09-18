"use strict";

/*
=========================================================
SRINEET — PROGRESS TRACKER
Koi backend nahi — har test ka result is device ke
localStorage mein history ki tarah save hota hai.
Kisi bhi CBT test file (jaise tests/pw/yakeen-1-0/
test-01.html) ke finalizeSubmission() ke andar
SrineetProgress.saveAttempt({...}) call karo.
=========================================================
*/

window.SrineetProgress = (function () {

  const STORAGE_KEY =
    "srineet_test_history";


  /* =====================================================
     READ HISTORY
  ===================================================== */

  function getHistory() {

    try {

      const raw =
        localStorage.getItem(STORAGE_KEY);

      const data =
        raw ? JSON.parse(raw) : [];

      return Array.isArray(data)
        ? data
        : [];

    } catch (error) {

      console.error(
        "SRINEET Progress Read Error:",
        error
      );

      return [];

    }

  }


  /* =====================================================
     SAVE ONE TEST ATTEMPT
  ===================================================== */

  function saveAttempt(attempt) {

    const history =
      getHistory();

    const record = {
      testId: attempt.testId || "unknown",
      title: attempt.title || "Untitled Test",
      score: Number(attempt.score) || 0,
      totalMarks: Number(attempt.totalMarks) || 0,
      correct: Number(attempt.correct) || 0,
      incorrect: Number(attempt.incorrect) || 0,
      unattempted: Number(attempt.unattempted) || 0,
      accuracy: Number(attempt.accuracy) || 0,
      subjects: attempt.subjects || null,
      date: new Date().toISOString()
    };


    /*
     * Agar same test dobara diya, to purana record
     * hata kar naya (latest attempt) rakho.
     */

    const existingIndex =
      history.findIndex(
        item => item.testId === record.testId
      );

    if (existingIndex !== -1) {

      history.splice(existingIndex, 1);

    }

    history.push(record);


    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history)
      );

    } catch (error) {

      console.error(
        "SRINEET Progress Save Error:",
        error
      );

    }


    return record;

  }


  /* =====================================================
     SUMMARY STATS
  ===================================================== */

  function getSummary() {

    const history =
      getHistory();

    if (history.length === 0) {

      return {
        testsTaken: 0,
        averageAccuracy: 0,
        averageScorePercent: 0,
        bestTest: null,
        weakestTest: null
      };

    }

    let totalAccuracy = 0;
    let totalScorePercent = 0;

    let bestTest = history[0];
    let weakestTest = history[0];

    history.forEach(record => {

      totalAccuracy += record.accuracy;

      const scorePercent =
        record.totalMarks > 0
          ? (record.score / record.totalMarks) * 100
          : 0;

      totalScorePercent += scorePercent;

      if (record.accuracy > bestTest.accuracy) {
        bestTest = record;
      }

      if (record.accuracy < weakestTest.accuracy) {
        weakestTest = record;
      }

    });

    return {
      testsTaken: history.length,
      averageAccuracy: Math.round(totalAccuracy / history.length),
      averageScorePercent: Math.round(totalScorePercent / history.length),
      bestTest,
      weakestTest
    };

  }


  /* =====================================================
     SUBJECT-WISE BREAKDOWN (weak topic report)
     Har attempt ke "subjects" field ko combine karke
     har subject ki overall accuracy nikalta hai.
  ===================================================== */

  function getSubjectBreakdown() {

    const history =
      getHistory();

    const totals = {};

    history.forEach(record => {

      if (!record.subjects) {
        return;
      }

      Object.keys(record.subjects).forEach(subject => {

        const s =
          record.subjects[subject];

        if (!totals[subject]) {

          totals[subject] = {
            correct: 0,
            incorrect: 0,
            total: 0
          };

        }

        totals[subject].correct += Number(s.correct) || 0;
        totals[subject].incorrect += Number(s.incorrect) || 0;
        totals[subject].total += Number(s.total) || 0;

      });

    });

    return Object.keys(totals)
      .map(subject => {

        const t =
          totals[subject];

        const attempted =
          t.correct + t.incorrect;

        return {
          subject,
          accuracy:
            attempted > 0
              ? Math.round((t.correct / attempted) * 100)
              : 0,
          correct: t.correct,
          incorrect: t.incorrect,
          total: t.total
        };

      })
      .sort((a, b) => a.accuracy - b.accuracy);

  }


  /* =====================================================
     CLEAR HISTORY
  ===================================================== */

  function clearHistory() {

    localStorage.removeItem(STORAGE_KEY);

  }


  return {
    getHistory,
    saveAttempt,
    getSummary,
    getSubjectBreakdown,
    clearHistory
  };

})();
