/* ═══════════════════════════════════════════════════════════════
   script.js — Jachin Saikia Sonowal Portfolio
   SECTIONS: 1-12 core + E1-E10 enhancements
═══════════════════════════════════════════════════════════════ */

/* ─── 1. JS READY ─── */
document.documentElement.classList.add('js-ready');

/* ─── 2. REVEAL ─── */
var revealObserver = null;
function revealEl(el) { el.classList.add('in'); }
function initReveal() {
  var els = document.querySelectorAll('.reveal, .reveal-side');
  revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) { revealEl(entry.target); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px 60px 0px' });
  els.forEach(function(el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 60) setTimeout(function() { revealEl(el); }, 80);
    else revealObserver.observe(el);
  });
  setTimeout(function() { document.querySelectorAll('.reveal, .reveal-side').forEach(revealEl); }, 4000);
}

/* ─── 3. LOADER ─── */
var loaderFired = false;
function doLoader() {
  if (loaderFired) return; loaderFired = true;
  var loader = document.getElementById('loader');
  if (loader) loader.classList.add('done');
  initReveal(); startScramble(); initCounters(); initTilt(); initActiveNav();
  initOpsCounters(); initRevTimeline(); initSectionCut();
}
window.addEventListener('load', function() { setTimeout(doLoader, 900); });
document.addEventListener('DOMContentLoaded', function() { setTimeout(doLoader, 500); });

/* ─── 4. CURSOR ─── */
var curEl = document.getElementById('cursor');
var ringEl = document.getElementById('cursor-ring');
var mx = window.innerWidth / 2, my = window.innerHeight / 2;
var rx = mx, ry = my, cursorVisible = false;
document.addEventListener('mousemove', function(e) {
  mx = e.clientX; my = e.clientY;
  if (!cursorVisible) { cursorVisible = true; if (curEl) curEl.style.opacity='1'; if (ringEl) ringEl.style.opacity='1'; }
});
document.addEventListener('mouseleave', function() {
  if (curEl) curEl.style.opacity='0'; if (ringEl) ringEl.style.opacity='0'; cursorVisible = false;
});
function animateCursor() {
  if (curEl) { curEl.style.left = mx+'px'; curEl.style.top = my+'px'; }
  if (ringEl) { rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12; ringEl.style.left=rx+'px'; ringEl.style.top=ry+'px'; }
  requestAnimationFrame(animateCursor);
}
animateCursor();
var hoverTargets = 'a, button, .exp-item, .pcard, .svc, .vcard, .cs-card, .hchip, .achip, .ccard, .ecard, .tcard, .stag, .m-item, .hstat-decomp';
document.addEventListener('mouseover', function(e) { if (e.target.closest(hoverTargets)) document.body.classList.add('cursor-hover'); });
document.addEventListener('mouseout',  function(e) { if (e.target.closest(hoverTargets)) document.body.classList.remove('cursor-hover'); });
document.addEventListener('mousedown', function() { document.body.classList.add('cursor-click'); });
document.addEventListener('mouseup',   function() { document.body.classList.remove('cursor-click'); });

/* ─── 5. NAV SCROLL + MOBILE NAV (BUG FIXED) ─── */
window.addEventListener('scroll', function() {
  var nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

function toggleMobileNav(btn) {
  var links = document.getElementById('nav-links');
  if (!links) return;
  var isOpen = links.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
document.querySelectorAll('#nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    var links = document.getElementById('nav-links');
    var burger = document.querySelector('.nav-burger');
    if (links) links.classList.remove('open');
    if (burger) burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── 6. SCRAMBLE ─── */
var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function scramble(el, target, duration) {
  var start = null, len = target.length;
  function step(ts) {
    if (!start) start = ts;
    var progress = Math.min((ts - start) / duration, 1);
    var revealed = Math.floor(progress * len);
    var result = '';
    for (var i = 0; i < len; i++) result += (i < revealed) ? target[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
    el.textContent = result;
    if (progress < 1) requestAnimationFrame(step); else el.textContent = target;
  }
  requestAnimationFrame(step);
}
function startScramble() {
  var nameEl = document.getElementById('scramble-name');
  if (nameEl) setTimeout(function() { scramble(nameEl, 'JACHIN', 1200); }, 200);
}

/* ─── 7. COUNTER ─── */
function animateCounter(el) {
  var target = parseInt(el.dataset.target), prefix = el.dataset.prefix||'', suffix = el.dataset.suffix||'';
  var duration = 1600, start = null;
  var hasK = suffix.indexOf('K') !== -1, hasPlus = suffix.indexOf('+') !== -1;
  function step(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / duration, 1), e = 1 - Math.pow(1-p,3), val = Math.floor(e * target);
    if (hasK) el.innerHTML = prefix+val+'<em>K+</em>';
    else if (hasPlus) el.innerHTML = prefix+val+'<em>+</em>';
    else el.innerHTML = prefix+val+'<em>'+suffix+'</em>';
    if (p < 1) requestAnimationFrame(step);
    else {
      if (hasK) el.innerHTML = prefix+target+'<em>K+</em>';
      else if (hasPlus) el.innerHTML = prefix+target+'<em>+</em>';
      else el.innerHTML = prefix+target+'<em>'+suffix+'</em>';
    }
  }
  requestAnimationFrame(step);
}
function initCounters() {
  var cIO = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting && e.target.dataset.target) { animateCounter(e.target); cIO.unobserve(e.target); } });
  }, { threshold: 0.3 });
  document.querySelectorAll('[data-target]').forEach(function(el) { cIO.observe(el); });
}

/* ─── 8. EXP ACCORDION ─── */
function toggleExp(el) {
  var isOpen = el.classList.contains('open');
  document.querySelectorAll('.exp-item.open').forEach(function(i) { i.classList.remove('open'); });
  if (!isOpen) el.classList.add('open');
}

/* ─── 9. CASE STUDY ACCORDION ─── */
function toggleCS(el) {
  var isOpen = el.classList.contains('open');
  document.querySelectorAll('.cs-card.open').forEach(function(i) { i.classList.remove('open'); });
  if (!isOpen) {
    el.classList.add('open');
    setTimeout(function() {
      var rect = el.getBoundingClientRect();
      if (rect.top < 80) window.scrollBy({ top: rect.top - 80, behavior: 'smooth' });
    }, 100);
  }
}

/* ─── 10. PARALLAX ORBS ─── */
window.addEventListener('scroll', function() {
  var y = window.scrollY;
  document.querySelectorAll('.orb').forEach(function(orb, i) {
    orb.style.transform = 'translateY('+(y*(i===0?-0.08:0.06))+'px) scale(1)';
  });
}, { passive: true });

/* ─── 11. PORTFOLIO TILT ─── */
function initTilt() {
  document.querySelectorAll('.pcard').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var r = card.getBoundingClientRect();
      var x = ((e.clientX-r.left)/r.width-0.5)*10;
      var y = ((e.clientY-r.top)/r.height-0.5)*-10;
      card.style.transform = 'perspective(600px) rotateY('+x+'deg) rotateX('+y+'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() { card.style.transform = ''; });
  });
}

/* ─── 12. ACTIVE NAV — uses class, not inline style (BUG FIXED) ─── */
function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');
  var sIO = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        navLinks.forEach(function(link) {
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === '#'+id) link.classList.add('nav-active');
        });
      }
    });
  }, { threshold: 0.1 }); // FIXED: was 0.3
  sections.forEach(function(s) { sIO.observe(s); });
}
(function() {
  var style = document.createElement('style');
  style.textContent = '.nav-links a.nav-active { color: var(--white) !important; } .nav-links a.nav-active::after { transform: scaleX(1); transform-origin: left; }';
  document.head.appendChild(style);
})();

/* ═══════════════════════════════════════════════════════════════
   E1. AMBIENT INTELLIGENCE HUD — Neural Network Canvas
═══════════════════════════════════════════════════════════════ */
(function() {
  var canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, nodes = [];
  var mouseX = -9999, mouseY = -9999;
  var N = 55, CDIST = 130, MDIST = 150;

  function Node() {
    this.x = Math.random()*W; this.y = Math.random()*H;
    this.vx = (Math.random()-0.5)*0.35; this.vy = (Math.random()-0.5)*0.35;
    this.r = Math.random()*1.2+0.4;
  }
  Node.prototype.update = function() {
    var dx=mouseX-this.x, dy=mouseY-this.y, d=Math.sqrt(dx*dx+dy*dy);
    if (d < MDIST) { var f=(MDIST-d)/MDIST*0.006; this.vx+=dx*f; this.vy+=dy*f; }
    this.vx*=0.985; this.vy*=0.985;
    this.x+=this.vx; this.y+=this.vy;
    if(this.x<0){this.x=0;this.vx*=-1;} if(this.x>W){this.x=W;this.vx*=-1;}
    if(this.y<0){this.y=0;this.vy*=-1;} if(this.y>H){this.y=H;this.vy*=-1;}
  };
  function resize() {
    W = canvas.width  = canvas.offsetWidth  || (canvas.parentElement && canvas.parentElement.offsetWidth)  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || (canvas.parentElement && canvas.parentElement.offsetHeight) || window.innerHeight;
    nodes = []; for(var i=0;i<N;i++) nodes.push(new Node());
  }
  function draw() {
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<nodes.length;i++) {
      for(var j=i+1;j<nodes.length;j++) {
        var dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<CDIST) { ctx.strokeStyle='rgba(201,168,76,'+(1-d/CDIST)*0.28+')'; ctx.lineWidth=0.5; ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y); ctx.stroke(); }
      }
    }
    for(var i=0;i<nodes.length;i++) {
      var n=nodes[i]; n.update();
      var dx=mouseX-n.x, dy=mouseY-n.y, md=Math.sqrt(dx*dx+dy*dy), g=md<MDIST?(1-md/MDIST):0;
      ctx.beginPath(); ctx.arc(n.x,n.y,n.r+g*2.5,0,Math.PI*2); ctx.fillStyle='rgba(201,168,76,'+(0.22+g*0.65)+')'; ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  var hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mousemove', function(e) { var r=canvas.getBoundingClientRect(); mouseX=e.clientX-r.left; mouseY=e.clientY-r.top; });
    hero.addEventListener('mouseleave', function() { mouseX=-9999; mouseY=-9999; });
  }
  window.addEventListener('resize', resize, { passive:true });
  resize(); draw();
})();

/* ═══════════════════════════════════════════════════════════════
   E3. REVENUE TIMELINE SVG — draw on scroll + dot tooltips
═══════════════════════════════════════════════════════════════ */
function initRevTimeline() {
  var path = document.getElementById('rev-path');
  var wrap = document.getElementById('rev-timeline-wrap');
  if (!path || !wrap) return;
  var tip = document.getElementById('rev-tooltip');
  var tipLbl = document.getElementById('rev-tip-label');
  var tipYear = document.getElementById('rev-tip-year');

  document.querySelectorAll('.rev-dot').forEach(function(dot) {
    dot.addEventListener('mouseenter', function() {
      if (!tip) return;
      var cx=parseFloat(dot.getAttribute('cx')), cy=parseFloat(dot.getAttribute('cy'));
      var lbl=dot.dataset.label||'', year=dot.dataset.year||'';
      if(tipLbl) tipLbl.textContent = lbl;
      if(tipYear) tipYear.textContent = year;
      var tx=cx+10, ty=cy-28, tw=Math.max(lbl.length*6.5,60), th=30;
      var rect=tip.querySelector('rect');
      if(rect) { rect.setAttribute('x',tx); rect.setAttribute('y',ty-14); rect.setAttribute('width',tw); rect.setAttribute('height',th); }
      if(tipLbl) { tipLbl.setAttribute('x',tx+6); tipLbl.setAttribute('y',ty+1); }
      if(tipYear) { tipYear.setAttribute('x',tx+6); tipYear.setAttribute('y',ty+12); }
      tip.setAttribute('opacity',1); dot.style.fill='#C9A84C';
    });
    dot.addEventListener('mouseleave', function() {
      if(tip) tip.setAttribute('opacity',0); dot.style.fill='';
    });
  });

  var drawn = false;
  var tIO = new IntersectionObserver(function(entries) {
    if(entries[0].isIntersecting && !drawn) {
      drawn = true;
      path.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1)';
      path.style.strokeDashoffset = '0';
      tIO.disconnect();
    }
  }, { threshold: 0.3 });
  tIO.observe(wrap);
}

/* ═══════════════════════════════════════════════════════════════
   E4. TERMINAL EASTER EGG
═══════════════════════════════════════════════════════════════ */
(function() {
  var g='color:#C9A84C;font-family:monospace;', w='color:#F2EFE8;font-family:monospace;', gr='color:#888070;font-family:monospace;';
  console.log('\n%c⚡ JACHIN SAIKIA SONOWAL','font-size:20px;letter-spacing:4px;color:#C9A84C;font-weight:700;font-family:monospace;');
  console.log('%cGrowth Marketer · AI Agent Engineer · Founder of PromptOps',gr+'font-size:10px;letter-spacing:2px;');
  console.log('%c──────────────────────────────────────────',gr);
  console.log('%c$ %cjachin --status',gr,g+' font-weight:700;');
  console.log('%c  ✓ Available for remote & freelance · Responds <24h','color:#28C840;font-family:monospace;font-size:12px;');
  console.log('%c  ✓ $150K+ revenue · 175+ clients · 8+ years',w+'font-size:12px;');
  console.log('%c  ✓ PromptOps — 247+ waitlist · bootstrapped · 0→beta in 60d',w+'font-size:12px;');
  console.log('%c$ %ccontact --reach-out',gr,g+' font-weight:700;');
  console.log('%c  📧 jachinchsaikiasonowal@gmail.com','color:#5CC8FF;font-family:monospace;font-size:12px;');
  console.log('%c  ⚡ promptops.jachinsonowal.com',g+'font-size:12px;');
  console.log('%c──────────────────────────────────────────',gr);
  console.log('%c👋 You found the terminal. Bold move.',g+'font-size:13px;font-weight:700;');
  console.log('%cI build things like this for fun. Imagine what I could build for you.',gr+'font-size:11px;');
})();

/* ═══════════════════════════════════════════════════════════════
   E5. SONOWAL DATA STREAM HOVER
═══════════════════════════════════════════════════════════════ */
(function() {
  var el = document.getElementById('sonowal-el');
  if (!el) return;
  var STREAM = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&';
  var original = 'SONOWAL', streaming = false;
  el.addEventListener('mouseenter', function() {
    if (streaming) return; streaming = true;
    var iters = 0, max = original.length * 5;
    var interval = setInterval(function() {
      var display = original.split('').map(function(c, i) {
        return i < Math.floor(iters/5) ? original[i] : STREAM[Math.floor(Math.random()*STREAM.length)];
      }).join('');
      el.textContent = display; iters++;
      if (iters >= max) { clearInterval(interval); el.textContent = original; streaming = false; }
    }, 38);
  });
})();

/* ═══════════════════════════════════════════════════════════════
   E8. OPS DASHBOARD COUNT + BAR FILL
═══════════════════════════════════════════════════════════════ */
function initOpsCounters() {
  var d = document.getElementById('ops-dashboard');
  if (!d) return;
  setTimeout(function() { d.querySelectorAll('.ops-fill').forEach(function(b) { b.classList.add('go'); }); }, 3200);
  setTimeout(function() {
    d.querySelectorAll('.ops-count').forEach(function(el) {
      var target=parseInt(el.dataset.val), dur=1800, start=null;
      function step(ts) {
        if(!start) start=ts;
        var p=Math.min((ts-start)/dur,1), e=1-Math.pow(1-p,3);
        el.textContent=Math.floor(e*target);
        if(p<1) requestAnimationFrame(step); else el.textContent=target;
      }
      requestAnimationFrame(step);
    });
  }, 3000);
}

/* ═══════════════════════════════════════════════════════════════
   E9. HORIZONTAL CUT TRANSITION
═══════════════════════════════════════════════════════════════ */
function initSectionCut() {
  var cut = document.getElementById('section-cut');
  if (!cut) return;
  var fired = false;
  var cIO = new IntersectionObserver(function(entries) {
    if(entries[0].isIntersecting && !fired) { fired=true; cut.classList.add('cut-fired'); cIO.disconnect(); }
  }, { threshold: 0.8 });
  cIO.observe(cut);
}

/* ═══════════════════════════════════════════════════════════════
   E10. IDLE-REACTIVE GRAIN
═══════════════════════════════════════════════════════════════ */
(function() {
  var grain = document.getElementById('idle-grain');
  if (!grain) return;
  var timer, idle = false;
  function goIdle() { idle=true; grain.classList.add('idle-active'); }
  function goActive() {
    if(idle) { idle=false; grain.classList.remove('idle-active'); }
    clearTimeout(timer); timer=setTimeout(goIdle, 8000);
  }
  ['mousemove','keydown','scroll','touchstart','click'].forEach(function(e) { window.addEventListener(e,goActive,{passive:true}); });
  timer = setTimeout(goIdle, 8000);
})();
