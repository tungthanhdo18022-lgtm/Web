/*
 * AI capabilities powered by Gemini (via secure server-side proxy).
 * Provides:
 *  - AI Tutor & Progressive Hints (Exam mode & Redo mode)
 *  - Deep Explanations, Desmos Calculator Tactics, and Trap Analysis (Review mode)
 *  - Diagnostic Performance Analysis & Study Plan (Results mode)
 *  - Digital SAT Math Question Generator (Builder mode)
 */
(function (global) {
  'use strict';

  var U = global.U;
  var R = global.R;

  var AI = {
    chatHistories: new Map(), // qId -> array of messages
  };

  /**
   * Safe fetch to server-side AI endpoints.
   */
  async function apiCall(endpoint, payload) {
    var res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    var data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'AI request failed');
    }
    return data;
  }

  // -------------------------------------------------------------
  // Core AI Service Methods
  // -------------------------------------------------------------

  AI.getHint = function (question, level, userAnswer) {
    return apiCall('/api/ai/hint', {
      question: question,
      level: level || 1,
      userAnswer: userAnswer || null,
    });
  };

  AI.getExplanation = function (question, mode, userAnswer) {
    return apiCall('/api/ai/explain', {
      question: question,
      mode: mode || 'full',
      userAnswer: userAnswer || null,
    });
  };

  AI.chat = function (question, message, history) {
    return apiCall('/api/ai/chat', {
      question: question,
      message: message,
      history: history || [],
    });
  };

  AI.getDiagnostic = function (payload) {
    return apiCall('/api/ai/diagnostic', payload);
  };

  AI.generateQuestion = function (options) {
    return apiCall('/api/ai/generate-question', options);
  };

  // -------------------------------------------------------------
  // UI Helper: Render Markdown with KaTeX math & styling
  // -------------------------------------------------------------
  AI.renderText = function (text) {
    if (!text) return '';
    // Use app's native R.render which renders KaTeX and Markdown
    return R.render(text);
  };

  // -------------------------------------------------------------
  // UI Component: AI Question Generator Dialog for Builder
  // -------------------------------------------------------------
  AI.openQuestionGeneratorModal = function (onInsert) {
    var domains = [
      'Algebra',
      'Advanced Math',
      'Problem-Solving and Data Analysis',
      'Geometry and Trigonometry',
    ];

    var bodyHtml =
      '<div class="ai-modal-form">' +
      '<div class="ai-form-group">' +
      '<label class="ai-label">Domain</label>' +
      '<select class="input ai-select" id="ai-gen-domain">' +
      domains.map(function (d) { return '<option value="' + U.esc(d) + '">' + U.esc(d) + '</option>'; }).join('') +
      '</select>' +
      '</div>' +
      '<div class="ai-form-row">' +
      '<div class="ai-form-group">' +
      '<label class="ai-label">Difficulty</label>' +
      '<select class="input ai-select" id="ai-gen-diff">' +
      '<option value="Medium" selected>Medium</option>' +
      '<option value="Easy">Easy</option>' +
      '<option value="Hard">Hard</option>' +
      '</select>' +
      '</div>' +
      '<div class="ai-form-group">' +
      '<label class="ai-label">Question Type</label>' +
      '<select class="input ai-select" id="ai-gen-type">' +
      '<option value="mcq" selected>Multiple Choice (MCQ)</option>' +
      '<option value="spr">Student-Produced Response (Grid-in)</option>' +
      '</select>' +
      '</div>' +
      '</div>' +
      '<div class="ai-form-group">' +
      '<label class="ai-label">Topic / Specific Focus <span class="muted">(Optional)</span></label>' +
      '<input class="input" id="ai-gen-topic" placeholder="e.g. system of equations with no solution, vertex of parabola, circle radius" />' +
      '</div>' +
      '<div id="ai-gen-preview" class="ai-preview-box" hidden></div>' +
      '<div id="ai-gen-error" class="ai-error-box" hidden></div>' +
      '</div>';

    var currentGeneratedQuestion = null;

    U.modal({
      title: '✨ AI Digital SAT Question Generator',
      body: bodyHtml,
      actions: [
        { label: 'Cancel', kind: 'ghost' },
        {
          label: 'Generate Question',
          kind: 'primary',
          onClick: function (box) {
            var domain = box.querySelector('#ai-gen-domain').value;
            var difficulty = box.querySelector('#ai-gen-diff').value;
            var type = box.querySelector('#ai-gen-type').value;
            var topic = box.querySelector('#ai-gen-topic').value;

            var previewEl = box.querySelector('#ai-gen-preview');
            var errorEl = box.querySelector('#ai-gen-error');
            var genBtn = box.querySelector('[data-modal-action="1"]');

            previewEl.hidden = false;
            errorEl.hidden = true;
            previewEl.innerHTML = '<div class="ai-loading"><div class="spinner"></div><p>Gemini is crafting a rigorous SAT Math question...</p></div>';
            if (genBtn) genBtn.disabled = true;

            AI.generateQuestion({ domain: domain, difficulty: difficulty, type: type, topic: topic })
              .then(function (res) {
                currentGeneratedQuestion = res.question;
                var q = res.question;
                var choicesHtml = '';
                if (q.type === 'mcq' && q.choices && q.choices.length) {
                  choicesHtml = '<ul class="ai-choices-preview">' +
                    q.choices.map(function (c, i) {
                      var L = 'ABCD'[i];
                      var isAns = q.answer === L;
                      return '<li class="' + (isAns ? 'is-correct' : '') + '"><b>' + L + '.</b> ' + R.render(c, { inline: true }) + (isAns ? ' <span class="ai-badge-ok">Answer</span>' : '') + '</li>';
                    }).join('') + '</ul>';
                } else {
                  choicesHtml = '<p><b>Correct Answer:</b> <code>' + U.esc(q.answer) + '</code></p>';
                }

                previewEl.innerHTML =
                  '<div class="ai-preview-card">' +
                  '<div class="ai-preview-badge">' + U.esc(q.domain) + ' · ' + U.esc(difficulty) + '</div>' +
                  '<div class="ai-preview-prompt">' + R.render(q.prompt) + '</div>' +
                  choicesHtml +
                  '<div class="ai-preview-expl"><b>Explanation:</b><div class="content">' + R.render(q.explanation) + '</div></div>' +
                  '</div>';

                // Change generate button label or allow inserting
                if (genBtn) {
                  genBtn.disabled = false;
                  genBtn.textContent = 'Re-generate';
                }

                var insertBtn = box.querySelector('#ai-gen-insert-btn');
                if (!insertBtn) {
                  var foot = box.querySelector('.modal-foot');
                  var newBtn = document.createElement('button');
                  newBtn.id = 'ai-gen-insert-btn';
                  newBtn.className = 'btn btn--primary ai-btn-insert';
                  newBtn.innerHTML = U.icon('plus') + ' Insert into Test';
                  newBtn.addEventListener('click', function () {
                    if (currentGeneratedQuestion && onInsert) {
                      onInsert(currentGeneratedQuestion);
                      var closeBtn = box.querySelector('[data-modal-close]');
                      if (closeBtn) closeBtn.click();
                      U.toast('Question inserted successfully!', 'ok');
                    }
                  });
                  foot.appendChild(newBtn);
                }
              })
              .catch(function (err) {
                previewEl.hidden = true;
                errorEl.hidden = false;
                errorEl.textContent = 'Error: ' + (err.message || 'Could not generate question');
                if (genBtn) {
                  genBtn.disabled = false;
                  genBtn.textContent = 'Try Again';
                }
              });

            return false; // Keep modal open
          },
        },
      ],
    });
  };

  /**
   * Converts an AI generated question object into standard text format used by builder.js.
   */
  AI.questionToText = function (q, questionNumber) {
    var num = questionNumber || 1;
    var lines = [];
    lines.push(num + '. ' + (q.prompt || '').trim());
    if (q.type === 'mcq' && q.choices && q.choices.length) {
      q.choices.forEach(function (c, i) {
        var letter = 'ABCD'[i] || 'A';
        lines.push(letter + '. ' + String(c).trim());
      });
      lines.push('Answer: ' + (q.answer || 'A'));
    } else {
      lines.push('Answer: ' + (q.answer || ''));
    }
    if (q.explanation) {
      lines.push('Explanation: ' + q.explanation.trim());
    }
    if (q.domain) {
      lines.push('Domain: ' + q.domain.trim());
    }
    lines.push('');
    return lines.join('\n');
  };

  // -------------------------------------------------------------
  // UI Component: Review Screen AI Explanations & Coach
  // -------------------------------------------------------------
  AI.buildReviewCoach = function (container, question, userAnswer) {
    if (!container || !question) return;

    var el = document.createElement('div');
    el.className = 'ai-coach-card';
    el.innerHTML =
      '<div class="ai-coach-header">' +
      '<div class="ai-coach-title">' +
      U.icon('sparkles', 'ai-sparkle-ico') +
      '<div><b>Gemini Math Coach</b><span>Instant step-by-step tutoring, Desmos calculator shortcuts &amp; trap breakdown</span></div>' +
      '</div>' +
      '</div>' +
      '<div class="ai-coach-tabs">' +
      '<button class="ai-tab-btn is-active" data-ai-tab="full">' + U.icon('book') + 'Deep Explanation</button>' +
      '<button class="ai-tab-btn" data-ai-tab="desmos">' + U.icon('calculator') + 'Desmos Strategy</button>' +
      (userAnswer != null && userAnswer !== '' ? '<button class="ai-tab-btn" data-ai-tab="why_wrong">' + U.icon('cross') + 'Why Is My Answer Wrong?</button>' : '') +
      '<button class="ai-tab-btn" data-ai-tab="chat">' + U.icon('help') + 'Ask a Question</button>' +
      '</div>' +
      '<div class="ai-coach-body" id="ai-coach-body">' +
      '<div class="ai-coach-placeholder">Click any tab above to get instant AI guidance with LaTeX math.</div>' +
      '</div>';

    container.appendChild(el);

    var bodyEl = el.querySelector('#ai-coach-body');
    var tabBtns = el.querySelectorAll('.ai-tab-btn');
    var cache = {};
    var chatHistory = [];

    function loadExplanation(mode) {
      if (cache[mode]) {
        bodyEl.innerHTML = '<div class="ai-content content">' + R.render(cache[mode]) + '</div>';
        return;
      }
      bodyEl.innerHTML = '<div class="ai-loading"><div class="spinner"></div><p>Gemini is preparing your breakdown...</p></div>';
      AI.getExplanation(question, mode, userAnswer)
        .then(function (res) {
          cache[mode] = res.text;
          bodyEl.innerHTML = '<div class="ai-content content">' + R.render(res.text) + '</div>';
        })
        .catch(function (err) {
          bodyEl.innerHTML = '<div class="ai-error-box">Could not load explanation: ' + U.esc(err.message) + '</div>';
        });
    }

    function renderChat() {
      bodyEl.innerHTML =
        '<div class="ai-chat-wrap">' +
        '<div class="ai-chat-messages" id="ai-chat-messages">' +
        (chatHistory.length === 0
          ? '<div class="ai-chat-hint">Ask any question about this problem (e.g. <i>"Why does factoring work here?"</i> or <i>"How do I set up the slider on Desmos?"</i>).</div>'
          : chatHistory.map(function (m) {
              return '<div class="ai-chat-msg ai-chat-msg--' + m.role + '">' +
                '<div class="ai-chat-bubble content">' + R.render(m.text) + '</div>' +
                '</div>';
            }).join('')) +
        '</div>' +
        '<form class="ai-chat-form" id="ai-chat-form">' +
        '<input type="text" class="input ai-chat-input" id="ai-chat-input" placeholder="Ask Gemini Tutor a question..." autocomplete="off" />' +
        '<button type="submit" class="btn btn--primary ai-chat-send" aria-label="Send">' + U.icon('send') + '</button>' +
        '</form>' +
        '</div>';

      var form = bodyEl.querySelector('#ai-chat-form');
      var input = bodyEl.querySelector('#ai-chat-input');
      var msgBox = bodyEl.querySelector('#ai-chat-messages');

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var txt = (input.value || '').trim();
        if (!txt) return;
        input.value = '';

        chatHistory.push({ role: 'user', text: txt });
        renderChat();

        var loadingMsg = document.createElement('div');
        loadingMsg.className = 'ai-chat-msg ai-chat-msg--model';
        loadingMsg.innerHTML = '<div class="ai-chat-bubble ai-loading"><div class="spinner"></div></div>';
        var freshBox = bodyEl.querySelector('#ai-chat-messages');
        if (freshBox) {
          freshBox.appendChild(loadingMsg);
          freshBox.scrollTop = freshBox.scrollHeight;
        }

        AI.chat(question, txt, chatHistory)
          .then(function (res) {
            chatHistory.push({ role: 'model', text: res.text });
            renderChat();
          })
          .catch(function (err) {
            chatHistory.push({ role: 'model', text: 'Error: ' + err.message });
            renderChat();
          });
      });
    }

    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var mode = btn.getAttribute('data-ai-tab');
        if (mode === 'chat') {
          renderChat();
        } else {
          loadExplanation(mode);
        }
      });
    });

    // Automatically load full explanation on start
    loadExplanation('full');
  };

  // -------------------------------------------------------------
  // UI Component: Floating AI Tutor for Exam Mode
  // -------------------------------------------------------------
  AI.createExamTutorPanel = function (examRoot, getCurrentQuestion, getCurrentAnswer) {
    var el = document.createElement('div');
    el.className = 'bb-float bb-float--ai';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'AI Math Tutor');
    el.hidden = true;

    el.innerHTML =
      '<div class="bb-float-head">' +
      '<span class="bb-float-grip">' + U.icon('drag') + '</span>' +
      '<span class="bb-float-title">' + U.icon('sparkles', 'ai-sparkle-ico') + ' AI Math Tutor</span>' +
      '<button class="bb-icon-btn" data-float="expand" aria-label="Expand">' + U.icon('expand') + '</button>' +
      '<button class="bb-icon-btn" data-float="close" aria-label="Close">' + U.icon('close') + '</button>' +
      '</div>' +
      '<div class="bb-float-body ai-exam-body">' +
      '<div class="ai-tutor-toolbar">' +
      '<button class="ai-btn-hint" data-hint="1">💡 Hint 1 (Concept)</button>' +
      '<button class="ai-btn-hint" data-hint="2">📐 Hint 2 (Setup)</button>' +
      '<button class="ai-btn-hint" data-hint="3">✅ Hint 3 (Solve)</button>' +
      '<button class="ai-btn-hint" data-desmos="true">📉 Desmos Tip</button>' +
      '</div>' +
      '<div class="ai-exam-content" id="ai-exam-content">' +
      '<div class="ai-tutor-welcome">' +
      '<h4>Need a hint on this question?</h4>' +
      '<p>Choose a hint level above to get guided assistance without giving the answer away, or ask a question below!</p>' +
      '</div>' +
      '</div>' +
      '<form class="ai-tutor-chat-form" id="ai-tutor-chat-form">' +
      '<input type="text" class="input ai-tutor-input" id="ai-tutor-input" placeholder="Ask a question about this problem..." autocomplete="off" />' +
      '<button type="submit" class="btn btn--primary ai-tutor-send" aria-label="Send">' + U.icon('send') + '</button>' +
      '</form>' +
      '</div>' +
      '<span class="bb-float-resize" aria-hidden="true"></span>';

    examRoot.appendChild(el);
    U.makeDraggable(el, el.querySelector('.bb-float-head'));
    U.makeResizable(el, el.querySelector('.bb-float-resize'), { minW: 320, minH: 300 });

    var vw = window.innerWidth, vh = window.innerHeight;
    var w = Math.min(480, vw - 32);
    el.style.width = w + 'px';
    el.style.height = Math.max(340, Math.min(580, vh - 160)) + 'px';
    el.style.right = '24px';
    el.style.top = '84px';

    var contentBox = el.querySelector('#ai-exam-content');
    var form = el.querySelector('#ai-tutor-chat-form');
    var input = el.querySelector('#ai-tutor-input');

    function showLoading(msg) {
      contentBox.innerHTML = '<div class="ai-loading"><div class="spinner"></div><p>' + U.esc(msg) + '</p></div>';
    }

    el.addEventListener('click', function (e) {
      var h = e.target.closest('[data-hint]');
      if (h) {
        var level = +h.getAttribute('data-hint');
        var q = getCurrentQuestion();
        var ans = getCurrentAnswer();
        showLoading('Generating Hint ' + level + '...');
        AI.getHint(q, level, ans)
          .then(function (res) {
            contentBox.innerHTML =
              '<div class="ai-hint-result">' +
              '<div class="ai-hint-tag">Hint Level ' + level + '</div>' +
              '<div class="content">' + R.render(res.text) + '</div>' +
              '</div>';
          })
          .catch(function (err) {
            contentBox.innerHTML = '<div class="ai-error-box">' + U.esc(err.message) + '</div>';
          });
      }

      var d = e.target.closest('[data-desmos]');
      if (d) {
        var q2 = getCurrentQuestion();
        showLoading('Finding Desmos calculator strategy...');
        AI.getExplanation(q2, 'desmos')
          .then(function (res) {
            contentBox.innerHTML =
              '<div class="ai-hint-result">' +
              '<div class="ai-hint-tag">Desmos Calculator Method</div>' +
              '<div class="content">' + R.render(res.text) + '</div>' +
              '</div>';
          })
          .catch(function (err) {
            contentBox.innerHTML = '<div class="ai-error-box">' + U.esc(err.message) + '</div>';
          });
      }

      var f = e.target.closest('[data-float]');
      if (f && f.getAttribute('data-float') === 'close') {
        el.hidden = true;
        var btn = document.getElementById('bb-ai-btn');
        if (btn) btn.classList.remove('is-active');
      }
      if (f && f.getAttribute('data-float') === 'expand') {
        var big = el.classList.toggle('is-expanded');
        f.innerHTML = U.icon(big ? 'collapse' : 'expand');
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var txt = (input.value || '').trim();
      if (!txt) return;
      input.value = '';
      var q = getCurrentQuestion();
      showLoading('Gemini is answering your question...');
      AI.chat(q, txt, [])
        .then(function (res) {
          contentBox.innerHTML =
            '<div class="ai-chat-reply">' +
            '<div class="ai-chat-q"><b>You asked:</b> ' + U.esc(txt) + '</div>' +
            '<div class="ai-chat-a content">' + R.render(res.text) + '</div>' +
            '</div>';
        })
        .catch(function (err) {
          contentBox.innerHTML = '<div class="ai-error-box">' + U.esc(err.message) + '</div>';
        });
    });

    return el;
  };

  global.AI = AI;
})(window);
