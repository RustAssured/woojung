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
})();
