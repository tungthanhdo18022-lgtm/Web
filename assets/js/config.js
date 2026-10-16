/*
 * Site configuration. Edit these values without touching the rest of the code.
 */
window.APP_CONFIG = {
  // Brand shown in the header, footer and browser tab.
  siteName: 'tunn.sat',
  tagline: 'Bluebook-style Digital SAT Math practice',

  // Short notice shown at the top of the home page. Set to '' to hide it.
  announcement: 'Your progress is saved automatically in this browser. Use the same device and browser to resume a test.',

  // GitHub repository that hosts this site. The owner signs in on #/admin with a
  // GitHub token that has write access to this repository, then publishes tests here.
  github: {
    owner: 'tungthanhdo18022-lgtm',
    repo: 'Web',
    branch: 'main'
  },

  // Official SAT weekend test dates (College Board, 2026-27). Update every school year.
  // The countdown on the home page shows the next upcoming date.
  satTestDates: [
    { date: '2026-08-22', deadline: '2026-08-07' },
    { date: '2026-09-12', deadline: '2026-08-28' },
    { date: '2026-10-03', deadline: '2026-09-18' },
    { date: '2026-11-07', deadline: '2026-10-23' },
    { date: '2026-12-05', deadline: '2026-11-20' },
    { date: '2027-03-06', deadline: '2027-02-19' },
    { date: '2027-05-01', deadline: '2027-04-16' },
    { date: '2027-06-05', deadline: '2027-05-21' }
  ],

  // Desmos calculator (same calculator as Bluebook).
  // 'dcb31709b452b1cf9dc26972add0fda6' is Desmos' public demo key. For a public site,
  // request a free key at https://www.desmos.com/my-api and paste it here.
  desmosApiUrl: 'https://www.desmos.com/api/v1.11/calculator.js',
  desmosApiKey: 'dcb31709b452b1cf9dc26972add0fda6',

  // Premium (Advanced Tests and Practice Tests marked "premium: yes"). "api" is the Web app URL of the owner's Google Apps Script
  // (tools/premium/HUONG-DAN.md explains the setup; it ends with /exec). Leave '' until it is deployed.
  // "contact" tells students where to get a code, e.g. { text: 'Zalo 0900 000 000', url: 'https://zalo.me/0900000000' }.
  premium: {
    api: 'https://script.google.com/macros/s/AKfycbwoasZVQzvzfJtIEexPTHUlOeAhbkX5PgJmL4Nd8uk6OrJj227Aurh-Y3qi3hyAFDTp/exec',
    contact: null
  },

  // Google Sign-In. Create an OAuth 2.0 Client ID (Web application) at
  // https://console.cloud.google.com/apis/credentials, add https://tunnsat.site
  // to "Authorized JavaScript origins", and paste the Client ID here.
  // Leave '' until then: the header shows a disabled Sign in button instead of breaking.
  auth: {
    googleClientId: '612267976361-knlq4b55dnet94oe64n5erue596tri2j.apps.googleusercontent.com',
    // Firebase: email/password login + "forgot password" reset emails.
    // Create a free project at https://console.firebase.google.com -> Build ->
    // Authentication -> enable "Email/Password", add a Web app, then paste its
    // firebaseConfig object here. Until then, only Google sign-in is shown.
    firebase: {
      apiKey: "AIzaSyC0KLHn9mVER6lp-ZZtYY9f6lTbZqil4-8",
      authDomain: "tunnsat-5fede.firebaseapp.com",
      projectId: "tunnsat-5fede",
      storageBucket: "tunnsat-5fede.firebasestorage.app",
      messagingSenderId: "39925748001",
      appId: "1:39925748001:web:95422a29958d91bf312e60"
    }
  },

  // Default minutes per question when a test does not set a time (real SAT: 35 min / 22 questions).
  defaultMinutesPerQuestion: 1.6,

  // Show the time warning when this many seconds remain.
  timeWarningSeconds: 300
};
