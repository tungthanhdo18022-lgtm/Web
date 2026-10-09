/*
 * Site configuration. Edit these values without touching the rest of the code.
 */
window.APP_CONFIG = {
  // Brand shown in the header, footer and browser tab.
  siteName: 'SAT Math Practice',
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

  // Default minutes per question when a test does not set a time (real SAT: 35 min / 22 questions).
  defaultMinutesPerQuestion: 1.6,

  // Show the time warning when this many seconds remain.
  timeWarningSeconds: 300
};
