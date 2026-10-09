/* Public Help page + the authoring syntax reference used in the admin builder. */
(function (global) {
  'use strict';

  var U = global.U;

  function code(s) { return '<pre class="code"><code>' + U.esc(s) + '</code></pre>'; }

  /** Authoring syntax (admin only — shown inside the builder). */
  function syntaxHtml() {
    return '<div class="syntax">' +
      '<h3>1. Multiple-choice question</h3>' +
      '<p>Start each question with its <b>number and a period</b>. Choices start with <code>A.</code> <code>B.</code> <code>C.</code> <code>D.</code>, followed by an <code>Answer:</code> line.</p>' +
      code('1. If $3x + 5 = 20$, what is the value of $x$?\nA. $3$\nB. $5$\nC. $15$\nD. $25$\nAnswer: B') +
      '<h3>2. Student-produced response</h3>' +
      '<p>Leave out the choices. Answers can be integers, decimals or fractions. Separate several accepted answers with <code>|</code>.</p>' +
      code('2. What is the value of $\\dfrac{3}{4} + \\dfrac{1}{8}$?\nAnswer: 7/8 | .875') +
      '<p class="muted">Graded with Digital SAT rules: <code>7/8</code>, <code>.875</code> and <code>0.875</code> are all correct; long decimals are accepted when they fill the answer box and are correctly rounded or truncated (2/3 → .6666, .6667, 0.667).</p>' +
      '<h3>3. Math (LaTeX)</h3>' +
      '<ul><li><code>$x^2 + 1$</code> — inline math</li>' +
      '<li><code>$$f(x) = \\dfrac{1}{x}$$</code> — centered display math (<code>\\[ ... \\]</code> also works)</li>' +
      '<li><code>\\$165</code> — a literal dollar sign</li>' +
      '<li>Most LaTeX math works: <code>\\frac</code>, <code>\\sqrt</code>, <code>\\le</code>, <code>\\pi</code>, <code>\\overline{AB}</code>, <code>\\begin{cases}</code>…</li></ul>' +
      '<h3>4. Text formatting</h3>' +
      '<p><code>**bold**</code>, <code>*italic*</code>, <code>__underline__</code>. Leave a blank line to start a new paragraph.</p>' +
      '<h3>5. Tables</h3>' +
      code('| Daily high temperature, $t$ (°F) | Frequency (days) |\n|:---:|:---:|\n| $10 < t \\le 15$ | 1 |\n| $15 < t \\le 20$ | 2 |') +
      '<h3>6. Images</h3>' +
      '<p>Click <b>Image</b> or <b>paste an image (Ctrl+V)</b> into the editor — it inserts <code>![Figure|320](asset:img-…)</code>, where <code>320</code> is the width in pixels. Images are uploaded to <code>tests/images/</code> when you publish. Inline SVG can also be pasted directly.</p>' +
      '<h3>7. Explanation and domain (optional)</h3>' +
      code('Answer: C\nDomain: Advanced Math\nExplanation: Shown to students when they review the test.') +
      '<p class="muted">Domains: <i>Algebra</i>, <i>Advanced Math</i>, <i>Problem-Solving and Data Analysis</i>, <i>Geometry and Trigonometry</i>.</p>' +
      '<h3>8. Answer key at the end (instead of Answer lines)</h3>' +
      code('Answer Key\n1. 14\n2. B\n3. C\n21. 441/677') +
      '<h3>9. Several modules (real SAT: 2 modules × 22 questions × 35 minutes)</h3>' +
      code('## Module 1 | 35\n1. ...\n\n## Module 2 | 35\n1. ...') +
      '<h3>10. Test date (for the Year / Season filters)</h3>' +
      '<p>Set <b>Test date</b> in the form above the editor, e.g. <code>2026-09</code> or <code>2026-09-12</code>.</p>' +
      '</div>';
  }

  function HelpView(root) {
    function t(s) { return global.R ? global.R.tex(s, false) : s; }
    root.innerHTML =
      '<div class="page narrow help">' +
      '<h1>Help</h1>' +
      '<p class="muted">Everything you need to know about taking a practice test.</p>' +
      '<nav class="toc"><a href="#h-start" data-scroll>Getting started</a><a href="#h-tools" data-scroll>Testing tools</a><a href="#h-spr" data-scroll>Entering answers</a><a href="#h-score" data-scroll>Scores</a><a href="#h-save" data-scroll>Saving progress</a></nav>' +

      '<section class="card guide-sec" id="h-start"><h2>' + U.icon('play') + 'Getting started</h2>' +
      '<ol class="steps">' +
      '<li>Choose a test on the <a href="#/">Practice Tests</a> page and click <b>Start Exam</b>.</li>' +
      '<li>Enter your name and pick <b>Timed</b> (like test day — the test submits automatically when time runs out) or <b>Untimed</b>.</li>' +
      '<li>Answer the questions, then use <b>Check Your Work</b> to see what is unanswered or marked before you submit.</li>' +
      '<li>After submitting you get your score, a breakdown by content domain, and a question-by-question review with explanations.</li>' +
      '</ol></section>' +

      '<section class="card guide-sec" id="h-tools"><h2>' + U.icon('calculator') + 'Testing tools</h2>' +
      '<ul class="feature-list">' +
      '<li><b>Timer</b> — top center. Click <b>Hide</b> to hide it; it reappears with a reminder when 5 minutes remain.</li>' +
      '<li><b>Calculator</b> — the Desmos graphing and scientific calculator. Drag it by its title bar and resize it from the corner. Requires an internet connection.</li>' +
      '<li><b>Reference</b> — the SAT Math reference sheet.</li>' +
      '<li><b>Mark for Review</b> — flags a question; flagged questions show a red bookmark in the navigator.</li>' +
      '<li><b>Answer eliminator (ABC)</b> — turn it on, then click the letter to the right of a choice to cross it out.</li>' +
      '<li><b>Question X of Y</b> — opens the navigator so you can jump to any question.</li>' +
      '<li>Keyboard: <b>←</b> / <b>→</b> move between questions (when you are not typing an answer), <b>Esc</b> closes pop-ups.</li>' +
      '</ul></section>' +

      '<section class="card guide-sec" id="h-spr"><h2>' + U.icon('edit') + 'Entering student-produced responses</h2>' +
      '<ul class="feature-list">' +
      '<li>If you find more than one correct answer, enter only one.</li>' +
      '<li>You can enter up to 5 characters for a positive answer and up to 6 characters (including the negative sign) for a negative answer.</li>' +
      '<li>If a fraction does not fit, enter its decimal equivalent. If a decimal does not fit, truncate or round it at the fourth digit.</li>' +
      '<li>Enter mixed numbers (such as 3½) as an improper fraction (7/2) or a decimal (3.5).</li>' +
      '<li>Do not enter symbols such as %, commas or $.</li>' +
      '</ul>' +
      '<table class="rules-table"><thead><tr><th>Answer</th><th>Acceptable</th><th>Not accepted</th></tr></thead><tbody>' +
      '<tr><td>' + t('3.5') + '</td><td>3.5 · 3.50 · 7/2</td><td>31/2 · 3 1/2</td></tr>' +
      '<tr><td>' + t('\\dfrac{2}{3}') + '</td><td>2/3 · .6666 · .6667 · 0.666 · 0.667</td><td>0.66 · .66 · 0.67 · .67</td></tr>' +
      '<tr><td>' + t('-\\dfrac{1}{3}') + '</td><td>-1/3 · -.3333 · -0.333</td><td>-.33 · -0.33</td></tr>' +
      '</tbody></table></section>' +

      '<section class="card guide-sec" id="h-score"><h2>' + U.icon('grid') + 'How scores are calculated</h2>' +
      '<p>Your raw score is the number of correct answers; omitted questions count as incorrect. The <b>estimated SAT Math score</b> (200–800) is a rough conversion from your percentage correct. It is meant for practice only — the real SAT is adaptive and uses its own scoring.</p></section>' +

      '<section class="card guide-sec" id="h-save"><h2>' + U.icon('history') + 'Saving your progress</h2>' +
      '<p>Your answers are saved automatically in your browser as you work, so you can close the page and resume later from <a href="#/results">My Results</a> or the test card. Progress and results stay on the device and browser you used; clearing your browser data removes them.</p></section>' +
      '</div>';

    function onClick(e) {
      var a = e.target.closest('[data-scroll]');
      if (!a) return;
      e.preventDefault();
      var el = document.querySelector(a.getAttribute('href'));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    root.addEventListener('click', onClick);
    return function () { root.removeEventListener('click', onClick); };
  }

  global.Views = global.Views || {};
  global.Views.help = HelpView;
  global.Views.guideSyntaxHtml = syntaxHtml;
})(window);
