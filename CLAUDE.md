# CLAUDE.md — tunn.sat

Notes for Claude sessions working in this repository.

## Project

- **tunn.sat**: Bluebook-style Digital SAT Math practice site (timer, Desmos, reference sheet, mark for review,
  scoring, explanations). Live: https://tunnsat.site/ (custom domain: the `CNAME` file at the root; never delete it).
- Static single-page app: plain HTML/CSS/vanilla JS, **no build step, no npm dependencies**. GitHub Pages serves the
  `main` branch of the **PUBLIC** repository `tungthanhdo18022-lgtm/Web` as is. Everything committed is world-readable,
  including the git history.
- The site's address is its browser origin: everything a student's browser keeps (results, in-progress tests, the
  Premium license and the device key in IndexedDB) belongs to that address and does not carry over to another one.
- This repository was recreated on 2026-10-12 **without history** (the old history still had the Advanced tests in
  plaintext; it is kept in the owner's PRIVATE repository `Web-old`). Never push, merge or cherry-pick anything from a
  clone of the old history into this repository.
- **Language: the site is in English** (UI, tests, messages to students, code comments). **The owner talks to you in
  Vietnamese: answer the owner in Vietnamese.** Owner-only texts may be Vietnamese (`tools/premium/HUONG-DAN.md`,
  the Apps Script menu labels).
- Browser code: ES5-style IIFEs `(function (global) { 'use strict'; … })(window)` that each define one global
  (`U`, `P`, `G`, `SATLibrary`, `Premium`, `Admin`, …). Node scripts (`tools/`) use built-ins only (Node ≥ 18).

```text
index.html               SPA shell, loads every script with ?v=<version> (hash routes #/, #/test/<id>, #/exam/<id>, #/admin …)
assets/js/config.js      APP_CONFIG (site name, SAT dates, Desmos key, premium.api = Apps Script URL)
assets/js/parser.js      test text/JSON format → P.parseText / P.normalizeObject (format documented at the top)
assets/js/store.js       SATLibrary: manifest, register(), prepare() (counts, default times), premium stubs; attempts
assets/js/premium.js     Premium client: code entry, device id, server calls, decryption (WebCrypto)
assets/js/payment.js     Premium by bank transfer: Premium card, VietQR dialog, order polling, auto activation
assets/js/admin.js       owner publishing through the GitHub API (encrypts Advanced tests in the browser)
assets/js/views/         pages (home, intro, exam, results, guide, builder, admin)
assets/premium-key.json  Premium PUBLIC key (RSA-OAEP-256, kid k1)
tests/manifest.js        list of published test files: { file: 'x.js', v: 'n', added: 'YYYY-MM-DD' }
tests/<id>.js            free tests (plaintext)
tests/premium/<id>.js    Advanced tests, ENCRYPTED
tests/images/<id>/       figures (SVG), public
tools/premium/           encrypt.mjs + test-encrypt.mjs, decrypt.mjs (needs the private key), server/Code.gs (Apps Script),
                         HUONG-DAN.md (owner guide, VI)
.github/workflows/premium-guard.yml   CI safety net for the Premium rules
```

## PREMIUM RULES

- **Premium tests are paid content and must NEVER be committed in plaintext.** Premium = every Advanced test
  (`section: advanced`) and every test marked `premium: yes` (today: all 2026 Practice Tests, Math and Reading and
  Writing; all Elite Tests (`section: challenge`); and every Topic Test except Words in Context 1–3, Grammar 1,
  Rhetorical Synthesis 1 and Transitions 1–2, which stay free with the 2025 Practice Tests). Not in `tests/`, not in another folder, not in a commit that is "fixed later"
  (history is public). `P.isPremium(test)` in `assets/js/parser.js` is the rule; encrypted practice tests keep
  `section: ""` and their `date` in the stub, so the home page lists them with the Practice Tests by year; encrypted
  Topic and Elite tests keep `section: "topic"` / `"challenge"` so they stay on their own pages.
- **To add or update a Premium test: write it as usual into `tests/<id>.js` (and list it in `tests/manifest.js`),
  then run `node tools/premium/encrypt.mjs` BEFORE committing.** It encrypts it into `tests/premium/<id>.js`, deletes
  the plaintext file and replaces the manifest entry in place with `premium/<id>.js` (bumping `v`). Then
  `node tools/premium/encrypt.mjs --check` must print `Premium check OK`, and `git status` must not show a plaintext
  Premium file staged. `--dry-run` shows what the tool would do. The tool looks at every `.js` file under `tests/`
  (listed or not, subfolders too), refuses Premium files it cannot read (fix them and run it again) and flags
  Premium text saved in other file types; it also fails on a plaintext test with the id or file name of an encrypted
  one (a copy saved without `premium: yes` is still paid content), and `--check` fails if any file in the repository
  looks like a private key.
- **Encryption is one-way here** (the repo only has the public key). Keep the source text of a test you may need to
  edit OUTSIDE the repository (e.g. your scratchpad); re-running the tool on a new plaintext version re-encrypts it.
  Never hand-edit `tests/premium/*.js`. `tools/premium/decrypt.mjs` can turn them back into text, but only with the
  owner's PRIVATE key, which is not in the repo (`PREMIUM_PRIVATE_KEY_FILE=/path/outside/repo/private-key.json
  node tools/premium/decrypt.mjs <name> --out <dir outside the repo>`). Its output must never go into `tests/` or
  anywhere in the repository (the tool refuses), except to copy one edited file to `tests/<id>.js` and encrypt it again
  right away.
- **Never commit any private key** (a JWK with `"d"`, `private-key.json`, PEM, …) and never print one. Only
  `assets/premium-key.json` (public) belongs in the repo. The private key lives only in the owner's Apps Script
  project (Script Properties `PRIVATE_KEY_JWK`) and in the owner's own backup.
- **Payments:** `action: order / orderStatus` (bound to the device key like codes) and a SePay webhook at
  `/exec?hook=<token>` (token in Script Property `PAYMENT_WEBHOOK_TOKEN`, made by the menu) fill the `Orders` sheet and
  create a code per paid order; only the ordering device gets it. Plan prices live in `PREMIUM.PLANS` (Code.gs) AND
  `APP_CONFIG.premium.payment.plans`: keep them equal. Owner guide: HUONG-DAN.md "Phần 2b".
- **The server lives in `tools/premium/server/Code.gs`** and runs in the owner's Google Apps Script project (bound to
  the owner's Google Sheet of codes). The owner deploys it: **changing Code.gs in the repo changes nothing live —
  the owner must paste the new version into Apps Script and deploy a new version** (Deploy → Manage deployments →
  Edit → New version, same /exec URL). Tell the owner (in Vietnamese) whenever that is needed. Keep the API compatible
  with `assets/js/premium.js` (request/response format, error codes, code format, one device per code).
- **A device is a key, not an id.** The page makes a WebCrypto RSA-OAEP key pair with `extractable: false` and keeps it
  in IndexedDB; every request sends `deviceKey` (base64 SPKI) and the server uses `k_` + base64url(SHA-256(SPKI)) as
  the device. The server only returns test keys RSA-OAEP-wrapped for that public key (`wrapped: true`); the page
  unwraps them straight into non-extractable AES keys. Requests without `deviceKey` get `update`. Never add a path that
  returns plain AES keys or binds a code to a client-chosen id: copying a browser's saved data must stay useless.
- Figures in `tests/images/<id>/` stay public: never put answers or solutions in images.
- `.github/workflows/premium-guard.yml` runs on every push to `main`: it encrypts plaintext Premium tests (commit
  `Encrypt premium tests [premium-guard]` by github-actions[bot], then asks GitHub Pages to rebuild) and runs
  `--check`; on pull requests it only runs `--check` (read-only). It is a safety net, not the workflow: by the time it
  runs, the plaintext is already in the public history.

## Testing

- Encryption tools: `PREMIUM_PRIVATE_KEY_FILE=/path/outside/repo/private-key.json node tools/premium/test-encrypt.mjs`
  (or `--key <file>`). It copies `tests/` and `assets/` to temp folders, encrypts there, decrypts every file with the
  private key (Node crypto and WebCrypto), compares the metadata with the site's own `prepare()`, and tests
  `decrypt.mjs`, `--check`, `--dry-run`, broken / hidden files and the private-key scan; it never modifies the
  repository. Without the private key, at least run `node tools/premium/encrypt.mjs --check`.
- Server: `tools/premium/sim.mjs` runs `tools/premium/server/Code.gs` unchanged in Node with fake Apps Script
  services; `tools/premium/test-server.mjs` tests it:
  `PREMIUM_PRIVATE_KEY_FILE=/path/outside/repo/private-key.json node tools/premium/test-server.mjs` (or `--key <file>`;
  without a key the 3 tests that need the site key are skipped). Local server for the site:
  `node tools/premium/sim.mjs --key <file> --port 8787 --codes 3` (prints test codes; serves `/exec`). Use the
  simulator (never the owner's live server or real codes) to test activation, one-device binding, moves, revocation
  and expiry. It reports any API Apps Script lacks, sheet writes outside the script lock, and a lock released before
  `SpreadsheetApp.flush()`.
- Site: serve the repo root with any static server (e.g. `python3 -m http.server 8000`) and open
  http://localhost:8000/ (WebCrypto needs `localhost` or HTTPS). To try unlocking locally, point
  `APP_CONFIG.premium.api` at a simulator/test endpoint, and do not commit that change.
- Parser checks from Node: load `assets/js/grading.js` + `assets/js/parser.js` in a `node:vm` context whose global has
  `window = globalThis` (see `loadSite()` / `analyze()` exported by `tools/premium/encrypt.mjs`).

## Conventions

- **Asset versioning:** `index.html` loads every CSS/JS file with `?v=<version>` and sets `window.APP_VERSION`. When
  you change anything in `assets/`, bump that version everywhere in `index.html` (all `?v=` and `APP_VERSION`
  together) so browsers and the GitHub Pages cache fetch the new files. Test files are cache-busted by their `v` in
  `tests/manifest.js`: bump it whenever a test file changes (the admin page and `encrypt.mjs` do this).
- **Test format:** `tests/<id>.js` = ``SATLibrary.register({ id: '<id>', source: String.raw`…` });`` with the text
  format inside (front matter `title`, `author`, `date`, `description`, `time`, `category`, `section: advanced`;
  questions `1.`, choices `A.`–`D.`, `Answer:`, `Domain:`, `Explanation:`; `## Module 1 | 35`). No backticks inside
  the String.raw. Full syntax: the header of `assets/js/parser.js`, README "Test format (text)", and the builder's
  Syntax guide (`#/admin`). The id must be unique and should equal the file name.
- **Manifest format:** exactly what `manifestText()` in `assets/js/admin.js` writes (the admin page rewrites the
  whole file); entry order does not matter for the site, but tools keep it. An entry may carry
  `added: 'YYYY-MM-DD'`, the day the test was first published: the admin page sets it for a new file, `encrypt.mjs`
  keeps it, and the home page's What's new card lists the newest (then the newest by test date). When you add a
  new test file by hand, give its entry today's `added`; never change it when a test is only edited.
- Do not commit or push unless asked; work on a branch and open a PR to `main`.
