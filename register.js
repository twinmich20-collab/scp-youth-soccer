(function () {
  var PROGRAMS = {
    recreation: {
      title: 'Recreation',
      badge: 'Ages 3–11',
      desc: 'Fun-first, in-town soccer for Mini Stars, Little Stars, and Future Stars — 7 weeks each fall, run with the Kenilworth Recreation Department.',
      facts: [
        { label: 'Ages', val: '3–11' },
        { label: 'Season', val: 'Fall · 7 weeks' },
        { label: 'Cost', val: '$125–$170' }
      ],
      notes: [
        'Open to local and out-of-town residents — no tryout required.',
        'Bring shin guards, cleats, and a water bottle to every session.',
        'Register with friends to request the same team.'
      ],
      ctaLabel: 'Continue to registration →',
      ctaHref: 'https://clubs.bluesombrero.com/Default.aspx?tabid=1453370',
      external: true,
      learnMoreLabel: 'More about Recreation →',
      learnMoreHref: 'recreation.html',
      tiers: [
        { key: 'mini', name: 'Mini Stars', ages: 'Ages 3–4', cost: '$140 · Early bird $125', desc: 'A 7-week Saturday program introducing balance, coordination, and confidence.', multiSession: true },
        { key: 'little', name: 'Little Stars', ages: 'Ages 5–7', cost: '$170 · Early bird $155', desc: 'Weekday practice once a week, Saturday games in 4v4/5v5 small-sided format.' },
        { key: 'future', name: 'Future Stars', ages: 'Ages 8–11', cost: '$170 · Early bird $155', desc: 'Weekday practice, Saturday games focused on player development and game awareness.' }
      ]
    },
    travel: {
      title: 'Travel',
      badge: 'Ages 8–15',
      desc: 'Competitive teams representing SCP across Central Jersey. Rosters are set through spring tryouts — registration follows an invite.',
      facts: [
        { label: 'Ages', val: '8–15' },
        { label: 'Season', val: 'Fall–Winter–Spring' },
        { label: 'Commitment', val: 'Full season' }
      ],
      notes: [
        'All players, new and returning, sign up for tryouts first.',
        'Head coaches determine roster spots after evaluation.',
        'The travel registration portal link is shared with selected players.'
      ],
      ctaLabel: 'Tryout sign-up opens Spring 2027',
      ctaHref: 'https://form.jotform.com/Scpyouthsoccer/2026-2027-travel-id-tryouts',
      ctaDisabled: true,
      ctaNote: 'Tryouts for the 2026–2027 season have concluded. The next window — for 2027–2028 — will be held in the April–May 2027 timeframe. Check back here or follow us on social for the sign-up announcement.',
      external: true,
      learnMoreLabel: 'More about Travel tryouts →',
      learnMoreHref: 'tryouts.html'
    },
    futsal: {
      title: 'Futsal Select',
      badge: 'Ages 10-15',
      desc: 'An 8-week winter supplementary program for club and non-club players — sharpen your touch without interfering with your regular season.',
      facts: [
        { label: 'Ages', val: '10-15' },
        { label: 'Season', val: 'Winter · 8 weeks' },
        { label: 'Commitment', val: 'Supplementary' }
      ],
      notes: [
        'Players are selected by automatic invite or tryout.',
        "Haven't been invited? Contact us to arrange a tryout date."
      ],
      ctaLabel: 'Pre-registration not open yet',
      ctaHref: 'https://form.jotform.com/Scpyouthsoccer/FUTSAL_SELECT',
      ctaDisabled: true,
      ctaNote: "Registration, schedule, and program details for this season will be posted here as soon as they're set. Contact us to be notified or to ask about a tryout.",
      external: true,
      learnMoreLabel: 'More about Futsal →',
      learnMoreHref: 'futsal.html'
    }
  };

  var grid = document.getElementById('rgGrid');
  var panel = document.getElementById('rgPanel');
  if (!grid || !panel) return;

  function render(key, tierKey) {
    var p = PROGRAMS[key];
    if (!p) return;

    grid.querySelectorAll('.rg-card').forEach(function (card) {
      card.classList.toggle('sel', card.getAttribute('data-program') === key);
    });

    var factsHtml = p.facts.map(function (f) {
      return '<div class="rg-fact"><b>' + f.label + '</b><span>' + f.val + '</span></div>';
    }).join('');

    var notesHtml = p.notes.map(function (n) {
      return '<li>' + n + '</li>';
    }).join('');

    var extraAttrs = p.external ? ' target="_blank" rel="noopener"' : '';
    var learnMoreHtml = p.learnMoreHref
      ? '<a class="btn btn-ghost-light" href="' + p.learnMoreHref + '">' + p.learnMoreLabel + '</a>'
      : '';

    var tiersHtml = '';
    if (p.tiers) {
      var activeTier = p.tiers.some(function (t) { return t.key === tierKey; }) ? tierKey : null;
      tiersHtml =
        '<div class="rg-tier-box">' +
          '<div class="rg-tier-step">Optional</div>' +
          '<div class="rg-tier-head">Preview your age group</div>' +
          '<p class="rg-tier-sub">See pricing and details below — you\'ll make the actual selection on the registration site.</p>' +
          '<div class="rg-tiers">' +
          p.tiers.map(function (t) {
            var isSel = t.key === activeTier;
            return '<button class="rg-tier-chip' + (isSel ? ' sel' : '') + '" type="button" data-tier="' + t.key + '">' +
              (isSel ? '<span class="rg-tier-check">✓</span>' : '') +
              '<span class="rg-tier-name">' + t.name + '</span> <span class="rg-tier-age">' + t.ages + '</span></button>';
          }).join('') +
          '</div>' +
        '</div>';
      if (activeTier) {
        var t2 = p.tiers.filter(function (t) { return t.key === activeTier; })[0];
        tiersHtml += '<div class="rg-tier-detail"><b>' + t2.name + '</b> · ' + t2.ages + ' · ' + t2.cost + '<p>' + t2.desc + '</p></div>';
        tiersHtml += t2.multiSession
          ? '<p class="rg-carryover">Heads up: the registration portal lists <b>' + t2.name + '</b> as two rows (9am and 10am sessions) — pick whichever time works and click its Register Now button to continue.</p>'
          : '<p class="rg-carryover">Heads up: the registration portal lists each age group as its own row — find the <b>' + t2.name + '</b> listing and click its own Register Now button to continue.</p>';
      }
    }

    panel.classList.remove('empty');
    var actionsHtml;
    if (p.ctaDisabled) {
      actionsHtml =
        (p.ctaNote ? '<p class="rg-carryover">' + p.ctaNote + '</p>' : '') +
        '<div class="rg-panel-actions">' +
          '<span class="btn btn-disabled" aria-disabled="true">' + p.ctaLabel + '</span>' +
          learnMoreHtml +
        '</div>';
    } else {
      actionsHtml =
        '<div class="rg-panel-actions">' +
          '<a class="btn btn-primary" href="' + p.ctaHref + '"' + extraAttrs + '>' + p.ctaLabel + '</a>' +
          learnMoreHtml +
        '</div>';
    }
    panel.innerHTML =
      '<div class="rg-panel-head">' +
        '<h3>' + p.title + '</h3>' +
        '<span class="rg-badge">' + p.badge + '</span>' +
      '</div>' +
      '<p class="rg-desc">' + p.desc + '</p>' +
      '<div class="rg-facts">' + factsHtml + '</div>' +
      tiersHtml +
      '<ul class="rg-notes">' + notesHtml + '</ul>' +
      (p.headsUp ? '<p class="rg-carryover">' + p.headsUp + '</p>' : '') +
      actionsHtml;

    if (p.tiers) {
      panel.querySelectorAll('.rg-tier-chip').forEach(function (chip) {
        chip.addEventListener('click', function () {
          render(key, chip.getAttribute('data-tier'));
        });
      });
    }
  }

  grid.querySelectorAll('.rg-card:not(.disabled)').forEach(function (card) {
    card.addEventListener('click', function () {
      render(card.getAttribute('data-program'), null);
    });
  });

  var params = new URLSearchParams(window.location.search);
  var initial = params.get('program');
  var initialTier = params.get('tier');
  if (initial && PROGRAMS[initial]) {
    render(initial, initialTier);
  }
})();
