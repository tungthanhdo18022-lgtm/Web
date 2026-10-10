# SAT Math Practice

Free Digital SAT Math practice tests in a **Bluebook-style** interface: countdown timer, Desmos
calculator, reference sheet, *Mark for Review*, answer eliminator, question navigator, *Check Your
Work* page, instant scoring and question-by-question review with explanations.

Live site: **https://tungthanhdo18022-lgtm.github.io/Web/**

## How it works

- Plain HTML/CSS/JavaScript — **no build step**. GitHub Pages serves the `main` branch as is.
- Published tests live in `tests/` and are listed in `tests/manifest.js`. The home page shows them in two
  groups: **Practice Tests** (full tests, filterable by year and season) and **Advanced Tests** (tests whose
  front matter has `section: advanced`; the builder's *Section* field sets it).
- Students' progress and results are stored in their own browser (`localStorage`).
- Math is rendered with KaTeX (bundled in `vendor/katex`, works offline).

## Adding and editing tests (owner only)

The test builder is hidden from visitors. To use it:

1. Open **`#/admin`** on the site, e.g. `https://tungthanhdo18022-lgtm.github.io/Web/#/admin`.
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
tests/images/            Figures used by the tests (vector SVG)
vendor/katex/            KaTeX 0.16.22
```

Estimated 200–800 scores are a rough conversion from the percentage correct, not official scores.
Not affiliated with College Board. SAT® is a registered trademark of College Board.
