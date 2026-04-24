(function() {
  window.addEventListener('scroll', function() {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
  });

  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function(el) {
    el.classList.add('hidden');
    io.observe(el);
  });

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      var btn = document.getElementById('submit-btn');
      btn.textContent = 'Versturen...';
      btn.disabled = true;
      try {
        var res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) });
        var data = await res.json();
        if (data.success) {
          document.getElementById('form-ok').style.display = 'block';
          form.reset();
          btn.textContent = 'Verstuurd';
        } else {
          document.getElementById('form-err').style.display = 'block';
          btn.textContent = 'Plan een kennismaking';
          btn.disabled = false;
        }
      } catch (err) {
        document.getElementById('form-err').style.display = 'block';
        btn.textContent = 'Plan een kennismaking';
        btn.disabled = false;
      }
    });
  }

  // Hamburger menu toggle
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
  // Mini reflectie demo
  var demoVragen = [
    { nr: 'Vraag 1', tekst: 'Wat heb je de afgelopen week niet gezegd, dat je eigenlijk had willen zeggen?' },
    { nr: 'Vraag 2', tekst: 'Hoe zou het voelen als je collega\'s echt wisten wat je nodig hebt?' },
    { nr: 'Vraag 3', tekst: 'Wat zou er veranderen als iedereen in dit team zei wat ze dachten?' }
  ];
  var demoIdx = 0;
  var demoNr = document.getElementById('demo-nr');
  var demoText = document.getElementById('demo-text');
  var demoDots = document.querySelectorAll('.demo-dot');
  var demoPrev = document.getElementById('demo-prev');
  var demoNext = document.getElementById('demo-next');

  if (demoNr && demoText) {
    function showDemo(idx) {
      demoText.classList.add('fading');
      setTimeout(function() {
        demoIdx = ((idx % demoVragen.length) + demoVragen.length) % demoVragen.length;
        demoNr.textContent = demoVragen[demoIdx].nr;
        demoText.textContent = demoVragen[demoIdx].tekst;
        demoText.classList.remove('fading');
        demoDots.forEach(function(d, i) { d.classList.toggle('active', i === demoIdx); });
      }, 300);
    }
    demoDots.forEach(function(dot) {
      dot.addEventListener('click', function() { showDemo(parseInt(this.dataset.idx, 10)); });
    });
    if (demoPrev) demoPrev.addEventListener('click', function() { showDemo(demoIdx - 1); });
    if (demoNext) demoNext.addEventListener('click', function() { showDemo(demoIdx + 1); });
  }
})();
