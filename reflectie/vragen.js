/* ================================================
   Woo Jung · Reflectievragen
   vragen.js

   Pas hier de vragen aan per klant.
   Voeg maatwerklagen toe onderaan.
   ================================================ */

var vragen = [

  /* LAAG 1 — IK */
  {
    cat: "Ik",
    tekst: "Wat nam je mee uit die dag? Niet wat je dacht te moeten meenemen, maar wat er echt bleef.",
    hint: ""
  },
  {
    cat: "Ik",
    tekst: "Er was een moment die dag waarop je iets voelde maar het niet zei. Wat was dat?",
    hint: ""
  },
  {
    cat: "Ik",
    tekst: "Wat doe jij dat samenwerken soms moeilijker maakt, ook al bedoel je het goed?",
    hint: "Een eerlijke vraag. Neem je tijd."
  },
  {
    cat: "Ik",
    tekst: "Wanneer trek jij je terug in het team, en waarom?",
    hint: ""
  },
  {
    cat: "Ik",
    tekst: "Wat heb je nodig van je collega's dat je nog niet durft te vragen?",
    hint: ""
  },

  /* LAAG 2 — WIJ */
  {
    cat: "Wij",
    tekst: "Wat is er die dag gezegd wat er al lang had moeten zijn?",
    hint: ""
  },
  {
    cat: "Wij",
    tekst: "Wat wordt er in jullie team nog steeds niet uitgesproken, ook na die dag?",
    hint: ""
  },
  {
    cat: "Wij",
    tekst: "Wie in het team zie jij anders dan voor die dag? Wat is er voor jou verschoven?",
    hint: ""
  },
  {
    cat: "Wij",
    tekst: "Wat heeft het team nodig dat het zichzelf nog niet geeft?",
    hint: "Niet wat anderen moeten doen. Wat het team als geheel."
  },

  /* LAAG 3 — RICHTING */
  {
    cat: "Richting",
    tekst: "Welke afspraak die jullie maakten staat er nog steeds, en welke niet meer?",
    hint: ""
  },
  {
    cat: "Richting",
    tekst: "Wat is er veranderd in hoe je naar de samenwerking kijkt?",
    hint: ""
  },
  {
    cat: "Richting",
    tekst: "Wat is de eerste kleine stap die jij kunt zetten, deze week nog?",
    hint: "Klein is goed. Klein is reëel."
  }

  /* ── MAATWERKLAAG ────────────────────────────────────────
     Voeg hier vragen toe na de dag.
     Gebruik de woorden van het team zelf.

     Voorbeeld:
     ,{
       cat: "Maatwerk",
       tekst: "Jullie spraken over voortrekkerij. Hoe heb je dat de afgelopen week ervaren?",
       hint: ""
     }
     ──────────────────────────────────────────────────────── */

];


/* ================================================
   Hieronder hoef je niets aan te passen.
   ================================================ */

var huidig = 0;

function toonScherm(id) {
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active');
  });
  var el = document.getElementById(id);
  el.classList.add('active');
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = '';
}

function renderVraag() {
  var q = vragen[huidig];
  var totaal = vragen.length;

  document.getElementById('q-cat').textContent = q.cat;
  document.getElementById('q-nr').textContent = (huidig + 1) + ' van ' + totaal;
  document.getElementById('q-text').textContent = q.tekst;

  var hintEl = document.getElementById('q-hint');
  if (q.hint && q.hint.length > 0) {
    hintEl.textContent = q.hint;
    hintEl.style.display = 'block';
  } else {
    hintEl.style.display = 'none';
  }

  document.getElementById('progress-fill').style.width =
    ((huidig + 1) / totaal * 100) + '%';

  var prevBtn = document.getElementById('btn-prev');
  var nextBtn = document.getElementById('btn-next');

  prevBtn.style.visibility = huidig === 0 ? 'hidden' : 'visible';

  if (huidig === totaal - 1) {
    nextBtn.textContent = 'Afronden';
    nextBtn.className = 'btn btn-gold';
  } else {
    nextBtn.textContent = 'Volgende';
    nextBtn.className = 'btn btn-primary';
  }
}

function start() {
  huidig = 0;
  renderVraag();
  toonScherm('screen-question');
  window.scrollTo(0, 0);
}

function volgende() {
  if (huidig < vragen.length - 1) {
    huidig++;
    renderVraag();
    window.scrollTo(0, 0);
  } else {
    toonScherm('screen-close');
    window.scrollTo(0, 0);
  }
}

function vorige() {
  if (huidig > 0) {
    huidig--;
    renderVraag();
    window.scrollTo(0, 0);
  }
}
