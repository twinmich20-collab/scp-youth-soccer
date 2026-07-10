// ═══ PROMO BANNER — single source of truth ═══════════════
// Edit the markup/content here once; every page that mounts
// <div id="promo-banner-mount"></div> + this script stays in sync.

(function () {
  var HTML = ''
    + '<section class="promo-banner" id="promo" data-screen-label="Promo banner">'
    + '  <div class="wrap">'
    + '    <div class="promo-card" id="promoCard">'
    + ''
    + '      <div class="promo-slide on" data-slide="0">'
    + '        <div class="promo-img"><image-slot id="promo-fallrec" shape="rect" fit="cover" placeholder="Drop the Fall Rec Soccer banner graphic"></image-slot></div>'
    + '        <div class="promo-text">'
    + '          <span class="promo-badge promo-badge-gold">Fall registration now open</span>'
    + '          <h2>Fall Rec Soccer — sign up for the new <span class="masque" style="color:var(--red);">season.</span></h2>'
    + '          <p>Fun. Friends. Fitness. Let\'s play — recreation registration is open for the Fall 2026 season.</p>'
    + ''
    + '          <div class="promo-dates">'
    + '            <div class="pd-item"><span class="pd-l">Reg. opens</span><span class="pd-v">6/15</span></div>'
    + '            <div class="pd-item"><span class="pd-l">Discount ends</span><span class="pd-v">7/6</span></div>'
    + '            <div class="pd-item"><span class="pd-l">Reg. closes</span><span class="pd-v">8/24</span></div>'
    + '            <div class="pd-item"><span class="pd-l">Starts</span><span class="pd-v">9/19</span></div>'
    + '          </div>'
    + ''
    + '          <div class="promo-cta-row">'
    + '            <a class="btn btn-primary btn-sm" href="https://clubs.bluesombrero.com/Default.aspx?tabid=1453370" target="_blank" rel="noopener">Register for Fall Rec →</a>'
    + '            <a class="promo-link" href="recreation.html">Learn more →</a>'
    + '            <div class="promo-dots" id="promoDots">'
    + '              <button class="promo-dot on" data-i="0" aria-label="Promo 1"></button>'
    + '            </div>'
    + '          </div>'
    + '        </div>'
    + '      </div>'
    + ''
    + '    </div>'
    + '  </div>'
    + '</section>';

  function mount() {
    var slot = document.getElementById('promo-banner-mount');
    if (!slot) return;
    slot.outerHTML = HTML;
    wireDots();
  }

  function wireDots() {
    var card = document.getElementById('promoCard');
    if (!card) return;
    var slides = card.querySelectorAll('.promo-slide');
    var dotsWrap = document.getElementById('promoDots');
    if (slides.length <= 1) { if (dotsWrap) dotsWrap.style.display = 'none'; return; }
    var dots = dotsWrap.querySelectorAll('.promo-dot');
    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        var i = parseInt(d.getAttribute('data-i'), 10);
        slides.forEach(function (s, idx) { s.classList.toggle('on', idx === i); });
        dots.forEach(function (dd, idx) { dd.classList.toggle('on', idx === i); });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
