/* ═══════════════════════════════════════════════════════════════
   script.js — Jachin Saikia Sonowal Portfolio
   ───────────────────────────────────────────────────────────────
   SECTIONS (use Ctrl+F to jump):
   1. JS READY CLASS
   2. REVEAL ANIMATIONS
   3. LOADER
   4. CUSTOM CURSOR
   5. NAV SCROLL STATE
   6. TEXT SCRAMBLE
   7. COUNTER ANIMATION
   8. EXPERIENCE ACCORDION
   9. PARALLAX ORBS
   10. PORTFOLIO CARD TILT
═══════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────────
   1. JS READY CLASS — add immediately so CSS transitions kick in
───────────────────────────────────────────────────────────────*/
document.documentElement.classList.add('js-ready');


/* ─────────────────────────────────────────────────────────────
   2. REVEAL ANIMATIONS
   - Uses opacity + translateY only (safe, no clip-path bugs)
   - Fires the moment 1% of element is visible
   - Nuclear fallback: reveals everything after 4s
───────────────────────────────────────────────────────────────*/
var revealObserver = null;

function revealEl(el) {
  el.classList.add('in');
}

function initReveal() {
  var els = document.querySelectorAll('.reveal, .reveal-side');

  revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        revealEl(entry.target);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px 60px 0px' });

  els.forEach(function(el) {
    var rect = el.getBoundingClientRect();
    // Already in viewport? reveal immediately
    if (rect.top < window.innerHeight + 60) {
      setTimeout(function() { revealEl(el); }, 80);
    } else {
      revealObserver.observe(el);
    }
  });

  // Nuclear fallback — reveal everything after 4s no matter what
  setTimeout(function() {
    document.querySelectorAll('.reveal, .reveal-side').forEach(function(el) {
      revealEl(el);
    });
  }, 4000);
}


/* ─────────────────────────────────────────────────────────────
   3. LOADER — multiple fallbacks so it ALWAYS fires
───────────────────────────────────────────────────────────────*/
var loaderFired = false;

function doLoader() {
  if (loaderFired) return;
  loaderFired = true;
  var loader = document.getElementById('loader');
  if (loader) loader.classList.add('done');
  initReveal();
  startScramble();
  initCounters();
  initTilt();
}

window.addEventListener('load', function() { setTimeout(doLoader, 800); });
document.addEventListener('DOMContentLoaded', function() { setTimeout(doLoader, 500); });
setTimeout(doLoader, 1800); // Hard fallback


/* ─────────────────────────────────────────────────────────────
   4. CUSTOM CURSOR
───────────────────────────────────────────────────────────────*/
var cur  = document.getElementById('cursor');
var ring = document.getElementById('cursor-ring');
var mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', function(e) {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  if (cur)  { cur.style.left = mx + 'px'; cur.style.top = my + 'px'; }
  if (ring) {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();


/* ─────────────────────────────────────────────────────────────
   5. NAV SCROLL STATE
───────────────────────────────────────────────────────────────*/
window.addEventListener('scroll', function() {
  var nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ─────────────────────────────────────────────────────────────
   6. TEXT SCRAMBLE — hero name animation
───────────────────────────────────────────────────────────────*/
var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function scramble(el, target, duration) {
  var start = null;
  var len = target.length;
  function step(ts) {
    if (!start) start = ts;
    var progress = Math.min((ts - start) / duration, 1);
    var revealed = Math.floor(progress * len);
    var result = '';
    for (var i = 0; i < len; i++) {
      if (i < revealed) result += target[i];
      else result += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    el.textContent = result;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

function startScramble() {
  var nameEl = document.getElementById('scramble-name');
  if (nameEl) setTimeout(function() { scramble(nameEl, 'JACHIN', 1200); }, 200);
}


/* ─────────────────────────────────────────────────────────────
   7. COUNTER ROLL ANIMATION — metrics numbers count up
───────────────────────────────────────────────────────────────*/
function animateCounter(el) {
  var target   = parseInt(el.dataset.target);
  var prefix   = el.dataset.prefix  || '';
  var suffix   = el.dataset.suffix  || '';
  var duration = 1600;
  var start    = null;
  function step(ts) {
    if (!start) start = ts;
    var progress = Math.min((ts - start) / duration, 1);
    var eased    = 1 - Math.pow(1 - progress, 3);
    var val      = Math.floor(eased * target);
    var suf      = suffix.replace('+', '');
    var plus     = suffix.indexOf('+') !== -1 ? '+' : '';
    el.innerHTML = prefix + val + '<em>' + suf + '</em>' + plus;
    if (progress < 1) requestAnimationFrame(step);
    else el.innerHTML = prefix + target + '<em>' + suffix + '</em>';
  }
  requestAnimationFrame(step);
}

function initCounters() {
  var cIO = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting && e.target.dataset.target) {
        animateCounter(e.target);
        cIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('[data-target]').forEach(function(el) { cIO.observe(el); });
}


/* ─────────────────────────────────────────────────────────────
   8. EXPERIENCE ACCORDION — click to expand/collapse
───────────────────────────────────────────────────────────────*/
function toggleExp(el) {
  var isOpen = el.classList.contains('open');
  document.querySelectorAll('.exp-item.open').forEach(function(i) {
    i.classList.remove('open');
  });
  if (!isOpen) el.classList.add('open');
}


/* ─────────────────────────────────────────────────────────────
   9. PARALLAX ORBS — subtle depth effect on scroll
───────────────────────────────────────────────────────────────*/
window.addEventListener('scroll', function() {
  var y = window.scrollY;
  document.querySelectorAll('.orb').forEach(function(orb, i) {
    orb.style.transform = 'translateY(' + (y * (i === 0 ? -0.08 : 0.06)) + 'px) scale(1)';
  });
}, { passive: true });


/* ─────────────────────────────────────────────────────────────
   10. PORTFOLIO CARD TILT — 3D mouse-follow effect
───────────────────────────────────────────────────────────────*/
function initTilt() {
  document.querySelectorAll('.pcard').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var r = card.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width  - 0.5) * 10;
      var y = ((e.clientY - r.top)  / r.height - 0.5) * -10;
      card.style.transform = 'perspective(600px) rotateY(' + x + 'deg) rotateX(' + y + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });
}
