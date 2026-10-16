# SAT Math Practice

Free Digital SAT Math practice tests in a **Bluebook-style** interface: countdown timer, Desmos
calculator, reference sheet, *Mark for Review*, answer eliminator, question navigator, *Check Your
Work* page, instant scoring and question-by-question review with explanations.

Live site: **https://tunnsat.site/**

## How it works

- Plain HTML/CSS/JavaScript — **no build step**. GitHub Pages serves the `main` branch as is.
- Published tests live in `tests/` and are listed in `tests/manifest.js`. The home page shows them in two
  groups: **Practice Tests** (full tests, filterable by year) and **Advanced Tests** (tests whose
  front matter has `section: advanced`; the builder's *Section* field sets it). The header buttons of the same
  names scroll to each group; `#/practice` and `#/advanced` link straight to them.
- Every question (exam, review and redo screens) carries a faint diagonal "tunn.sat" watermark (`--wm-tile` and
  `--wm-opacity` in `assets/css/app.css`).
- Students' progress and results are stored in their own browser (`localStorage`).
- Math is rendered with KaTeX (bundled in `vendor/katex`, works offline).

## Adding and editing tests (owner only)

The test builder is hidden from visitors. To use it:

1. Open **`#/admin`** on the site, e.g. `https://tunnsat.site/#/admin`.
2. Sign in with a GitHub **fine-grained personal access token**:
   [create one here](https://github.com/settings/personal-access-tokens/new) →
   *Repository access*: only this repository → *Repository permissions*: **Contents: Read and write**.
3. Click **New test**, write or paste the test (or **Import** a `.json`, `.txt` or `.tex` file), check the
   live preview, then click **Publish**.

Publishing commits `tests/<name>.js`, any images (`tests/images/`) and the updated `tests/manifest.js` to
this repository through the GitHub API. GitHub Pages redeploys automatically and the test appears for
everyone after about 1–2 minutes. The token is stored only in the owner's browser; visitors cannot publish
because they cannot get a token with write access to the repository.

### Test format (text)

```text
---
title: SAT Math Practice Test 1
author: Your name
date: 2026-09-12
time: 40
---

1. If $3x + 5 = 20$, what is the value of $x$?
A. $3$
B. $5$
C. $15$
D. $25$
Answer: B
Domain: Algebra
Explanation: $3x = 15$, so $x = 5$.

2. A student-produced response question (no choices). Separate accepted answers with |
Answer: 441/677 | .6514
```

- Add `section: advanced` to the front matter to list a test under **Advanced Tests** on the home page, and
  `category: Algebra` (or `Advanced Math`, `Problem-Solving and Data Analysis`, `Geometry and Trigonometry`) to
  choose its filter; without it the test goes under the domain most of its questions belong to. Advanced Tests
  are ordered by round: titles without a number (Algebra A, B, C …) first, then A1, B1 …, then A2, B2 ….
- Math: `$...$` inline, `$$...$$` or `\[...\]` display. A literal dollar sign: `\$165`.
- Tables: Markdown `| a | b |`. Images: the **Image** button or paste (Ctrl+V) in the builder.
- Modules: `## Module 1 | 35` (35 = minutes). Answer key at the end: an `Answer Key` line, then `1. B`, `2. 14`, …
- LaTeX: **Import → Paste LaTeX** converts `\begin{enumerate}\item …`, nested choice lists, math,
  `tabular` and an *Answer Key* table. TikZ figures must be re-added as images.

Student-produced responses are graded with Digital SAT rules (equivalent fractions/decimals; long
decimals accepted when they fill the box and are correctly rounded or truncated).

## Premium

Premium tests are paid content: every Advanced Test (`section: advanced`) and every Practice Test marked
`premium: yes` in its front matter (the builder's *Practice · Premium* section); the other Practice Tests stay free.
A Premium Practice Test is still listed with the Practice Tests (by year) with a lock. A student unlocks them with a
code such as `TUNN-7KQ4-M2XD-9HPK`, and **each code works on one device at a time**.

- **Encrypted files.** This repository is public, so Premium tests are committed **only encrypted**, as
  `tests/premium/<name>.js`. Each file has its own random AES-256-GCM key, wrapped with the RSA public key in
  `assets/premium-key.json` (RSA-OAEP, SHA-256). The file also carries the public card data (title, category,
  description, question counts, time), so the home page lists the test while it is locked. Figures in
  `tests/images/` stay public.
- **Server.** A small Google Apps Script web app (`tools/premium/server/Code.gs`), bound to the owner's Google
  Sheet, holds the private key. It checks the code, binds it to the student's device and returns the keys that
  decrypt the tests, wrapped for that device. The owner creates, revokes and resets codes from the sheet's
  *tunn.sat Premium* menu.
- **Device.** Each browser makes a non-extractable WebCrypto key pair (kept in IndexedDB); the device is that key.
  The server wraps the test keys for its public key, so copying a browser's saved data to another browser opens
  nothing there.
- **Client.** `assets/js/premium.js` asks for the code, keeps the keys in that browser (tests open offline) and
  re-checks the code about once a day; `APP_CONFIG.premium` in `assets/js/config.js` holds the server URL.
- **Publishing.** The admin page encrypts Premium tests in the browser before committing them. From a terminal,
  write the test as usual as `tests/<name>.js` (listed in `tests/manifest.js`), then run
  `node tools/premium/encrypt.mjs` **before committing**: it writes `tests/premium/<name>.js`, deletes the
  plaintext file and updates the manifest. `--check` fails if anything is left in plaintext (including a copy of an
  encrypted test saved without `premium: yes`, i.e. with the same id or file name) or if a file looks like a private
  key; `--dry-run` shows what would change. The tool only has the public key, so encryption is one-way:
  keep the test's text (outside this repository) if you plan to edit it.
- **Editing an encrypted test.** Only the private key can decrypt, and it is not in this repository. With the
  owner's backup of it, `PREMIUM_PRIVATE_KEY_FILE=/path/to/private-key.json node tools/premium/decrypt.mjs <name>`
  writes the plaintext test to a temporary folder (or `--out <dir>`) outside the repository; it refuses to write
  inside it. Edit it there, copy it to `tests/<name>.js` and run the encryption tool right away.
- **Safety net.** `.github/workflows/premium-guard.yml` runs the tool on every push to `main`, commits what it had
  to encrypt (`[premium-guard]`) and asks GitHub Pages to rebuild; on pull requests it only runs `--check`. A
  plaintext file that was pushed stays in the git history, so always encrypt before committing.
- **Never commit the private key.** It is pasted once into the Apps Script project (Script Properties).

Setup and day-to-day use for the owner (in Vietnamese): [`tools/premium/HUONG-DAN.md`](tools/premium/HUONG-DAN.md).
Tool tests (encryption and decryption):
`PREMIUM_PRIVATE_KEY_FILE=/path/to/private-key.json node tools/premium/test-encrypt.mjs` (works on temporary copies;
the private key file must stay outside the repository).

## Configuration

`assets/js/config.js`: site name, home-page notice, GitHub repository, official SAT test dates for the
countdown (update each school year), and the Desmos API key (the default is Desmos' public demo key —
request a free key at <https://www.desmos.com/my-api> for production use).

## Project structure

```text
index.html               Single-page app (hash routes: #/, #/test/<id>, #/exam/<id>, #/results, #/help, #/admin)
assets/css/app.css       Site styles
assets/css/exam.css      Bluebook-style exam screen
assets/js/config.js      Configuration
assets/js/render.js      Question rendering: KaTeX + Markdown + HTML sanitizer
assets/js/parser.js      Test format parser (text / JSON)
assets/js/latex.js       LaTeX → test format converter
assets/js/grading.js     Scoring
assets/js/store.js       Test library, drafts (IndexedDB), attempts (localStorage)
assets/js/admin.js       Owner sign-in and publishing through the GitHub API
assets/js/views/         Pages: home, intro, exam, results, help, admin, builder
tests/manifest.js        List of published tests
tests/*.js               Published tests
tests/premium/           Premium tests (Advanced, and "premium: yes" Practice Tests), encrypted
tests/images/            Figures used by the tests (vector SVG)
tools/premium/           Premium: encryption / decryption tools, Apps Script server, owner's guide (HUONG-DAN.md)
vendor/katex/            KaTeX 0.16.22
```

Estimated 200–800 scores are a rough conversion from the percentage correct, not official scores.
Not affiliated with College Board. SAT® is a registered trademark of College Board.
