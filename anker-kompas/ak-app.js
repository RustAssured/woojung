/*
 * ak-app.js — Gedeelde logica voor Anker & Kompas
 *
 * localStorage-sleutels:
 *   ankerKompas.checkin   — check-in reflecties
 *   ankerKompas.card      — de persoonlijke kaart
 *   ankerKompas.zelfrefl  — zelfcompassie velden
 *
 * Er wordt NIETS naar een server verzonden.
 * Alle data blijft lokaal op dit apparaat.
 */

(function () {
  'use strict';

  var KEYS = {
    CHECKIN:  'ankerKompas.checkin',
    CARD:     'ankerKompas.card',
    ZELFREFL: 'ankerKompas.zelfrefl'
  };

  function save(key, obj) {
    try { localStorage.setItem(key, JSON.stringify(obj)); return true; }
    catch (e) { return false; }
  }

  function load(key) {
    try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }

  function clearAll() {
    Object.keys(KEYS).forEach(function (k) { localStorage.removeItem(KEYS[k]); });
  }

  function showNotice(el, tekst) {
    if (!el) return;
    el.textContent = tekst || 'Opgeslagen op dit apparaat.';
    el.classList.add('ak-visible');
    setTimeout(function () { el.classList.remove('ak-visible'); }, 2600);
  }

  function collectForm(container) {
    var result = {};
    container.querySelectorAll('[name]').forEach(function (el) { result[el.name] = el.value; });
    return result;
  }

  function populateForm(container, data) {
    if (!data) return;
    container.querySelectorAll('[name]').forEach(function (el) {
      if (Object.prototype.hasOwnProperty.call(data, el.name)) el.value = data[el.name];
    });
  }

  function downloadFile(bestandsnaam, inhoud, mime) {
    var blob = new Blob([inhoud], { type: mime });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement('a');
    a.href = url; a.download = bestandsnaam;
    document.body.appendChild(a); a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 150);
  }

  function cardNaarTekst(card) {
    if (!card) return 'Nog geen kaart ingevuld.';
    var r = card;
    return [
      '╔══════════════════════════════════╗',
      '   MIJN ANKER & KOMPAS-KAART',
      '╚══════════════════════════════════╝', '',
      '── MIJN ANKER ──', 'Als het onrustig wordt, mag ik mezelf herinneren aan...', (r.anker || '(niet ingevuld)'), '',
      '── MIJN KOMPAS ──', 'Ik wil bijdragen aan...', (r.bijdragen || '(niet ingevuld)'), '',
      'door...', (r.door || '(niet ingevuld)'), '',
      'ook wanneer...', (r.wanneer || '(niet ingevuld)'), '',
      '── MIJN COMPASSIEZIN ──', 'Wanneer het niet perfect gaat, mag ik tegen mezelf zeggen...', (r.compassiezin || '(niet ingevuld)'), '',
      '── MIJN KLEINE STAP ──', 'Deze week of maand kies ik voor...', (r.kleineStap || '(niet ingevuld)'), '',
      '────────────────────────────────────',
      'Aangemaakt via woojung.nl/anker-kompas',
      'Deze kaart is van jou en blijft lokaal op je apparaat.'
    ].join('\n');
  }

  function koppelVerwijderKnop(knop, naBeheer) {
    if (!knop) return;
    knop.addEventListener('click', function () {
      if (window.confirm(
        'Weet je zeker dat je alles van dit apparaat wilt verwijderen?\n\n' +
        'Je ingevulde anker, kompas, check-in en zelfcompassie worden gewist. ' +
        'Dit kan niet ongedaan worden gemaakt.'
      )) { clearAll(); if (typeof naBeheer === 'function') naBeheer(); }
    });
  }

  function importeerKaartJson(bestand, callback) {
    var bekendSleutels = ['anker', 'bijdragen', 'door', 'wanneer', 'compassiezin', 'kleineStap'];
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        var parsed = JSON.parse(e.target.result);
        var schoon = {};
        bekendSleutels.forEach(function (k) { if (typeof parsed[k] === 'string') schoon[k] = parsed[k]; });
        callback(null, schoon);
      } catch (err) { callback('Kon het bestand niet lezen. Zorg dat het een geldig .json-bestand is.', null); }
    };
    reader.onerror = function () { callback('Bestand kon niet worden geopend.', null); };
    reader.readAsText(bestand);
  }

  function debounce(fn, vertraging) {
    var timer;
    return function () { clearTimeout(timer); timer = setTimeout(fn, vertraging); };
  }

  window.AK = {
    KEYS, save, load, clearAll, showNotice, collectForm, populateForm,
    downloadFile, cardNaarTekst, koppelVerwijderKnop, importeerKaartJson, debounce
  };
})();
