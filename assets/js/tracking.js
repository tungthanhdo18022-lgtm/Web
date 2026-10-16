/* Per-user test tracking via Firestore.
 *
 * When a signed-in (Firebase) user submits a test, a summary of the attempt
 * is saved under users/{uid}/attempts so the owner can see every student's
 * history on the admin page (#/admin, "Students" section).
 *
 * Everything here is best-effort: if Firestore is not enabled in the Firebase
 * console, or the device is offline, the site works exactly as before and no
 * error is shown to the student.
 *
 * Required Firestore rules (Firebase console -> Firestore Database -> Rules):
 *
 *   rules_version = '2';
 *   service cloud.firestore {
 *     match /databases/{database}/documents {
 *       function signedIn() { return request.auth != null; }
 *       function isOwner(uid) { return signedIn() && request.auth.uid == uid; }
 *       function isAdmin() {
 *         return signedIn() && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
 *       }
 *       match /users/{uid} {
 *         allow read: if isOwner(uid) || isAdmin();
 *         allow write: if isOwner(uid);
 *         match /attempts/{attemptId} {
 *           allow read: if isOwner(uid) || isAdmin();
 *           allow write: if isOwner(uid);
 *         }
 *       }
 *       match /admins/{uid} {
 *         allow read: if isOwner(uid);
 *         allow write: if false; // add your UID in the Firebase console
 *       }
 *     }
 *   }
 *
 * Then, in the Firebase console, create the collection "admins" and add one
 * document whose ID is your own Firebase UID (Authentication -> Users -> UID).
 */
(function (global) {
  'use strict';

  var FB_STORE_SRC = 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js';
  var dbPromise = null;

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var el = document.createElement('script');
      el.src = src; el.async = true;
      el.onload = function () { resolve(); };
      el.onerror = function () { reject(new Error('load failed: ' + src)); };
      document.head.appendChild(el);
    });
  }

  function initDb(fb) {
    if (!global.firebase.firestore) {
      return loadScript(FB_STORE_SRC).then(function () { return initDb(fb); });
    }
    try {
      if (!global.firebase.apps || !global.firebase.apps.length) global.firebase.initializeApp(fb);
      return global.firebase.firestore();
    } catch (e) { return null; }
  }

  /** Firestore instance, or null when unavailable. Cached per page load. */
  function db() {
    if (dbPromise) return dbPromise;
    dbPromise = (function () {
      try {
        var fb = ((global.APP_CONFIG || {}).auth || {}).firebase;
        if (!fb || !fb.apiKey) return Promise.resolve(null);
        if (!global.firebase) {
          return loadScript('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js')
            .then(function () { return initDb(fb); })
            .catch(function () { return null; });
        }
        return Promise.resolve(initDb(fb));
      } catch (e) { return Promise.resolve(null); }
    })();
    return dbPromise;
  }

  /** Firebase UID + profile of the current user, or null. */
  function who() {
    var u = (global.Auth && global.Auth.user && global.Auth.user()) || null;
    if (!u || !u.sub || u.sub.indexOf('fb:') !== 0) return null;
    return { uid: u.sub.slice(3), user: u };
  }

  /** Save a completed attempt summary. Best-effort, never throws. */
  function trackAttempt(attempt) {
    try {
      var w = who();
      if (!w || !attempt || attempt.status !== 'completed') return;
      var r = attempt.result || {};
      db().then(function (d) {
        if (!d) return;
        var fs = global.firebase.firestore;
        var uref = d.collection('users').doc(w.uid);
        uref.set({
          name: w.user.name || '', email: w.user.email || '', picture: w.user.picture || '',
          lastActive: fs.FieldValue.serverTimestamp(),
          testsCompleted: fs.FieldValue.increment(1)
        }, { merge: true }).catch(function () {});
        uref.collection('attempts').doc(attempt.id).set({
          testId: attempt.testId || '', testTitle: attempt.testTitle || '',
          correct: r.correct || 0, total: r.total || 0, percent: r.percent || 0,
          estimated: r.estimated || 0, timed: !!attempt.timed,
          durationSec: Math.round(attempt.totalElapsed || 0),
          finishedAt: attempt.finishedAt ? new Date(attempt.finishedAt) : fs.FieldValue.serverTimestamp()
        }, { merge: true }).catch(function () {});
      }).catch(function () {});
    } catch (e) { /* tracking must never break the results page */ }
  }

  /** Tracked users, most recently active first. [] when unavailable. */
  function listUsers(limit) {
    return db().then(function (d) {
      if (!d) return [];
      return d.collection('users').orderBy('lastActive', 'desc').limit(limit || 100).get()
        .then(function (snap) {
          var out = [];
          snap.forEach(function (doc) {
            var a = doc.data() || {};
            out.push({
              uid: doc.id, name: a.name || '', email: a.email || '', picture: a.picture || '',
              testsCompleted: a.testsCompleted || 0,
              lastActive: a.lastActive && a.lastActive.toDate ? a.lastActive.toDate().getTime() : 0
            });
          });
          return out;
        });
    }).catch(function () { return []; });
  }

  /** One user's attempts, newest first. [] when unavailable. */
  function listAttempts(uid, limit) {
    return db().then(function (d) {
      if (!d) return [];
      return d.collection('users').doc(uid).collection('attempts')
        .orderBy('finishedAt', 'desc').limit(limit || 100).get()
        .then(function (snap) {
          var out = [];
          snap.forEach(function (doc) {
            var a = doc.data() || {};
            out.push({
              id: doc.id, testTitle: a.testTitle || a.testId || '',
              correct: a.correct || 0, total: a.total || 0, percent: a.percent || 0,
              estimated: a.estimated || 0, timed: !!a.timed,
              durationSec: a.durationSec || 0,
              finishedAt: a.finishedAt && a.finishedAt.toDate ? a.finishedAt.toDate().getTime() : 0
            });
          });
          return out;
        });
    }).catch(function () { return []; });
  }

  global.Tracking = {
    trackAttempt: trackAttempt,
    listUsers: listUsers,
    listAttempts: listAttempts,
    /** True when the signed-in user can be tracked (Firebase account). */
    available: function () { return !!who(); }
  };
})(window);
