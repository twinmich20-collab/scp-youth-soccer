// Solid header on scroll
  var header = document.getElementById('header');
  function onScroll(){ header.classList.toggle('solid', window.scrollY > 12); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var burger = document.getElementById('burger');
  burger.addEventListener('click', function(){
    var open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.querySelectorAll('#mobileMenu a').forEach(function(a){
    a.addEventListener('click', function(){
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // Scrollspy: highlight in-page hash nav links (e.g. #programs) while scrolling
  (function(){
    var sections = [];
    document.querySelectorAll('.nav a[href*="#"]').forEach(function(a){
      var hash = a.getAttribute('href').split('#')[1];
      if (!hash) return;
      var el = document.getElementById(hash);
      if (el) sections.push({ hash: hash, el: el });
    });
    if (!sections.length) return;

    function setActive(hash){
      document.querySelectorAll('.nav a, .mobile-menu a').forEach(function(a){ a.classList.remove('active'); });
      var selector = hash
        ? '.nav a[href$="#' + hash + '"], .mobile-menu a[href$="#' + hash + '"]'
        : '.nav a[href="index.html"], .mobile-menu a[href="index.html"]';
      document.querySelectorAll(selector).forEach(function(a){ a.classList.add('active'); });
    }

    function onSpy(){
      var y = window.scrollY + header.offsetHeight + 20;
      var current = null;
      sections.forEach(function(s){
        if (s.el.offsetTop <= y) current = s.hash;
      });
      setActive(current);
    }
    onSpy();
    window.addEventListener('scroll', onSpy, { passive: true });
  })();

  // Rotating hero image on homepage — removed; hero is now a single full-bleed background image.

