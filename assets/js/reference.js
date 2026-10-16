/* SAT Math reference sheet shown in the exam's Reference panel. */
(function (global) {
  'use strict';

  var S = 'stroke="#1a1a1a" stroke-width="1.4" fill="none"';
  var T = 'font-family="Georgia, \'Times New Roman\', serif" font-size="14" fill="#1a1a1a" font-style="italic"';

  var FIGS = [
    {
      svg: '<svg viewBox="0 0 120 100" width="120" height="100"><circle cx="58" cy="50" r="38" ' + S + '/><circle cx="58" cy="50" r="2" fill="#1a1a1a"/><line x1="58" y1="50" x2="96" y2="50" ' + S + '/><text x="77" y="44" ' + T + ' text-anchor="middle">r</text></svg>',
      tex: ['A = \\pi r^2', 'C = 2\\pi r']
    },
    {
      svg: '<svg viewBox="0 0 130 100" width="130" height="100"><rect x="12" y="22" width="100" height="56" ' + S + '/><text x="62" y="94" ' + T + ' text-anchor="middle">ℓ</text><text x="122" y="55" ' + T + ' text-anchor="middle">w</text></svg>',
      tex: ['A = \\ell w']
    },
    {
      svg: '<svg viewBox="0 0 130 100" width="130" height="100"><polygon points="10,80 118,80 78,16" ' + S + '/><line x1="78" y1="16" x2="78" y2="80" stroke="#1a1a1a" stroke-width="1.2" stroke-dasharray="4 3"/><polyline points="78,72 86,72 86,80" ' + S + '/><text x="70" y="56" ' + T + ' text-anchor="middle">h</text><text x="64" y="96" ' + T + ' text-anchor="middle">b</text></svg>',
      tex: ['A = \\tfrac{1}{2}bh']
    },
    {
      svg: '<svg viewBox="0 0 130 100" width="130" height="100"><polygon points="16,82 112,82 112,18" ' + S + '/><polyline points="102,82 102,72 112,72" ' + S + '/><text x="58" y="44" ' + T + ' text-anchor="middle">c</text><text x="122" y="54" ' + T + ' text-anchor="middle">a</text><text x="64" y="97" ' + T + ' text-anchor="middle">b</text></svg>',
      tex: ['c^2 = a^2 + b^2']
    },
    {
      svg: '<svg viewBox="0 0 140 100" width="140" height="100"><polygon points="20,82 116,82 20,26" ' + S + '/><polyline points="20,72 30,72 30,82" ' + S + '/><text x="74" y="47" ' + T + ' text-anchor="middle">2x</text><text x="10" y="58" ' + T + ' text-anchor="middle">x</text><text x="68" y="97" font-family="Georgia, serif" font-size="13" fill="#1a1a1a" text-anchor="middle"><tspan font-style="italic">x</tspan>√3</text><text x="88" y="78" font-family="Georgia, serif" font-size="11" fill="#1a1a1a" text-anchor="middle">30°</text><text x="29" y="45" font-family="Georgia, serif" font-size="11" fill="#1a1a1a" text-anchor="middle">60°</text></svg>',
      tex: [],
      caption: '30°–60°–90°'
    },
    {
      svg: '<svg viewBox="0 0 120 100" width="120" height="100"><polygon points="24,82 84,82 24,22" ' + S + '/><polyline points="24,72 34,72 34,82" ' + S + '/><text x="62" y="47" font-family="Georgia, serif" font-size="13" fill="#1a1a1a" text-anchor="start"><tspan font-style="italic">s</tspan>√2</text><text x="14" y="56" ' + T + ' text-anchor="middle">s</text><text x="54" y="97" ' + T + ' text-anchor="middle">s</text><text x="68" y="78" font-family="Georgia, serif" font-size="11" fill="#1a1a1a" text-anchor="middle">45°</text><text x="35" y="42" font-family="Georgia, serif" font-size="11" fill="#1a1a1a" text-anchor="middle">45°</text></svg>',
      tex: [],
      caption: '45°–45°–90°'
    },
    {
      svg: '<svg viewBox="0 0 130 100" width="130" height="100"><polygon points="14,40 84,40 84,86 14,86" ' + S + '/><polyline points="14,40 40,18 110,18 84,40" ' + S + '/><polyline points="110,18 110,64 84,86" ' + S + '/><polyline points="14,86 40,64 110,64" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="3 3" fill="none"/><line x1="40" y1="18" x2="40" y2="64" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="3 3"/><text x="50" y="98" ' + T + ' text-anchor="middle">ℓ</text><text x="104" y="84" ' + T + ' text-anchor="middle">w</text><text x="120" y="45" ' + T + ' text-anchor="middle">h</text></svg>',
      tex: ['V = \\ell wh']
    },
    {
      svg: '<svg viewBox="0 0 120 100" width="120" height="100"><ellipse cx="58" cy="22" rx="38" ry="10" ' + S + '/><path d="M20 22v56M96 22v56" ' + S + '/><path d="M20 78a38 10 0 0 0 76 0" ' + S + '/><path d="M20 78a38 10 0 0 1 76 0" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="3 3" fill="none"/><line x1="58" y1="22" x2="96" y2="22" ' + S + '/><text x="77" y="17" ' + T + ' text-anchor="middle">r</text><text x="106" y="54" ' + T + ' text-anchor="middle">h</text></svg>',
      tex: ['V = \\pi r^2 h']
    },
    {
      svg: '<svg viewBox="0 0 120 100" width="120" height="100"><circle cx="58" cy="50" r="38" ' + S + '/><path d="M20 50a38 11 0 0 0 76 0" ' + S + '/><path d="M20 50a38 11 0 0 1 76 0" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="3 3" fill="none"/><circle cx="58" cy="50" r="2" fill="#1a1a1a"/><line x1="58" y1="50" x2="92" y2="34" ' + S + '/><text x="78" y="36" ' + T + ' text-anchor="middle">r</text></svg>',
      tex: ['V = \\tfrac{4}{3}\\pi r^3']
    },
    {
      svg: '<svg viewBox="0 0 120 100" width="120" height="100"><path d="M58 10L20 80M58 10L96 80" ' + S + '/><path d="M20 80a38 10 0 0 0 76 0" ' + S + '/><path d="M20 80a38 10 0 0 1 76 0" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="3 3" fill="none"/><line x1="58" y1="10" x2="58" y2="80" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="3 3"/><line x1="58" y1="80" x2="96" y2="80" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="3 3"/><text x="51" y="52" ' + T + ' text-anchor="middle">h</text><text x="77" y="76" ' + T + ' text-anchor="middle">r</text></svg>',
      tex: ['V = \\tfrac{1}{3}\\pi r^2 h']
    },
    {
      svg: '<svg viewBox="0 0 130 100" width="130" height="100"><polygon points="14,80 84,80 108,62" ' + S + '/><path d="M64 12L14 80M64 12L84 80M64 12L108 62" ' + S + '/><polyline points="14,80 38,62 108,62" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="3 3" fill="none"/><line x1="64" y1="12" x2="61" y2="71" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="3 3"/><text x="55" y="50" ' + T + ' text-anchor="middle">h</text><text x="48" y="95" ' + T + ' text-anchor="middle">ℓ</text><text x="104" y="80" ' + T + ' text-anchor="middle">w</text></svg>',
      tex: ['V = \\tfrac{1}{3}\\ell wh']
    }
  ];

  function build() {
    var R = global.R;
    var html = '<div class="ref-grid">';
    FIGS.forEach(function (f) {
      html += '<div class="ref-item"><div class="ref-fig">' + f.svg + '</div>' +
        (f.tex.length ? '<div class="ref-tex">' + f.tex.map(function (t) { return R.tex(t, false); }).join('<br>') + '</div>' : '<div class="ref-tex ref-tex--caption">' + (f.caption || '') + '</div>') +
        '</div>';
    });
    html += '</div>';
    html += '<div class="ref-notes">' +
      '<p>The number of degrees of arc in a circle is ' + R.tex('360', false) + '.</p>' +
      '<p>The number of radians of arc in a circle is ' + R.tex('2\\pi', false) + '.</p>' +
      '<p>The sum of the measures in degrees of the angles of a triangle is ' + R.tex('180', false) + '.</p>' +
      '</div>';
    return html;
  }

  var cached = null;
  global.ReferenceSheet = {
    html: function () { return cached || (cached = build()); }
  };
})(window);
