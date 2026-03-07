
// ─── Respect prefers-reduced-motion ─────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ═══════════════════════════════════════════════════════════════
   JACHIN SAIKIA SONOWAL — Portfolio Script
   Full build: Agent Network + all 36 creative direction features
═══════════════════════════════════════════════════════════════ */

document.documentElement.classList.add('js-ready');

/* ─────────────────────────────────────────────
   REVEAL ON SCROLL
───────────────────────────────────────────── */
var revIO;
function initReveal() {
  var els = document.querySelectorAll('.reveal,.reveal-side');
  revIO = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('in'); revIO.unobserve(e.target); }
    });
  }, { threshold: 0.01, rootMargin:'0px 0px 60px 0px' });
  els.forEach(function(el) {
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight + 60) setTimeout(function(){ el.classList.add('in'); }, 80);
    else revIO.observe(el);
  });
  setTimeout(function(){ document.querySelectorAll('.reveal,.reveal-side').forEach(function(el){ el.classList.add('in'); }); }, 5000);
}

/* ─────────────────────────────────────────────
   LOADER — COUNTDOWN + DISMISS
───────────────────────────────────────────── */
var loaderDone = false;
function fireLoader() {
  if (loaderDone) return; loaderDone = true;
  var loader = document.getElementById('loader');
  if (loader) loader.classList.add('done');
  initReveal();
  startScramble();
  initCounters();
  initTilt();
  initActiveNav();
  initOpsCounters();
  initRevTimeline();
  initSectionCut();
  initSaikiaHaze();
  initToolsReveal();
  initAmbientHUD();
  initRevTicker();
  initMagneticBtns();
  initCaseScanAnim();
  initTypewriter();
}

/* ─────────────────────────────────────────────
   TYPEWRITER ROLES — cycles through hero subtitle
───────────────────────────────────────────── */
function initTypewriter() {
  var el = document.getElementById('type-roles');
  if (!el) return;
  var roles = ['Growth Marketer', 'AI Agent Engineer', 'Newsletter Founder', 'Marketing Ops Lead', 'PromptOps Creator'];
  var ri = 0, ci = roles[0].length, deleting = false;
  /* Start by showing first role fully typed, then pause before cycling */
  el.textContent = roles[0];
  function type() {
    var current = roles[ri];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(type, 2200); return; }
      setTimeout(type, 75);
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 350); return; }
      setTimeout(type, 38);
    }
  }
  /* Pause on first word then start cycling */
  setTimeout(function(){ deleting = true; type(); }, 2400);
}

document.addEventListener('DOMContentLoaded', function() {
  var cntEl = document.getElementById('loader-count');
  if (!cntEl) { setTimeout(fireLoader, 600); return; }
  var start = null, dur = 1000;
  function tick(ts) {
    if (document.hidden) { return; }
    if (!start) start = ts;
    var p = Math.min((ts - start) / dur, 1);
    cntEl.textContent = Math.floor(p * 100);
    if (p < 1) requestAnimationFrame(tick);
    else { cntEl.textContent = '100'; setTimeout(fireLoader, 200); }
  }
  requestAnimationFrame(tick);
});
window.addEventListener('load', function(){ setTimeout(fireLoader, 1400); });

/* ─────────────────────────────────────────────
   CROSSHAIR CURSOR
───────────────────────────────────────────── */
(function(){
  var ch = document.getElementById('crosshair');
  if (!ch) return;
  var mx = innerWidth/2, my = innerHeight/2, visible = false;
  document.addEventListener('mousemove', function(e){
    mx = e.clientX; my = e.clientY;
    ch.style.left = mx + 'px'; ch.style.top = my + 'px';
    if (!visible) { visible = true; ch.style.opacity = '1'; }
  });
  document.addEventListener('mouseleave', function(){ ch.style.opacity='0'; visible=false; });
  var HT = 'a,button,.exp-item,.pcard,.svc,.vcard,.cs-card,.hchip,.achip,.ccard,.ecard,.tcard,.stag,.m-item,.hstat-decomp,.chip-promptops';
  document.addEventListener('mouseover', function(e){ if(e.target.closest(HT)) document.body.classList.add('cursor-hover'); });
  document.addEventListener('mouseout',  function(e){ if(e.target.closest(HT)) document.body.classList.remove('cursor-hover'); });
  document.addEventListener('mousedown', function(){ document.body.classList.add('cursor-click'); });
  document.addEventListener('mouseup',   function(){ document.body.classList.remove('cursor-click'); });
})();

/* ─────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────── */
(function(){
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', function(){
    var s = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (s > 0 ? scrollY / s : 0) + ')';
  }, { passive:true });
})();

/* ─────────────────────────────────────────────
   BACK TO TOP
───────────────────────────────────────────── */
(function(){
  var btn = document.getElementById('btt');
  if (!btn) return;
  window.addEventListener('scroll', function(){
    btn.classList.toggle('btt-visible', scrollY > 600);
  }, { passive:true });
})();

/* ─────────────────────────────────────────────
   NAV — SCROLL + MOBILE
───────────────────────────────────────────── */
window.addEventListener('scroll', function(){
  var nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', scrollY > 60);
}, { passive:true });
function toggleMobileNav(btn) {
  var links = document.getElementById('nav-links');
  if (!links) return;
  var open = links.classList.toggle('open');
  btn.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
document.querySelectorAll('#nav-links a').forEach(function(a){
  a.addEventListener('click', function(){
    var l=document.getElementById('nav-links'), b=document.querySelector('.nav-burger');
    if(l) l.classList.remove('open'); if(b) b.classList.remove('open');
    document.body.style.overflow='';
  });
});

/* ─────────────────────────────────────────────
   SCRAMBLE — hero name + section h2 headings
───────────────────────────────────────────── */
var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&';
function scramble(el, target, dur, cb) {
  var t0 = null, len = target.length;
  (function step(ts){
    if(!t0) t0=ts;
    var p = Math.min((ts-t0)/dur, 1), rev = Math.floor(p*len), out='';
    for(var i=0;i<len;i++) out += i<rev ? target[i] : CHARS[Math.floor(Math.random()*CHARS.length)];
    el.textContent = out;
    if(p<1) requestAnimationFrame(step);
    else { el.textContent=target; if(cb) cb(); }
  })(performance.now());
}
function startScramble() {
  var nameEl = document.getElementById('scramble-name');
  if (nameEl) setTimeout(function(){ scramble(nameEl,'JACHIN',1200); }, 300);
  // All section h2 headings
  var hIO = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var el = entry.target;
      if (el.dataset.scrambled) return;
      el.dataset.scrambled = '1';
      var origHTML = el.innerHTML;
      var hasBR = /<br\s*\/?>/i.test(origHTML);
      // Lock height before animation to prevent layout shift
      el.style.minHeight = el.offsetHeight + 'px';
      setTimeout(function(){
        if (hasBR) {
          // Split by <br>, scramble each line independently — structure preserved throughout
          var lines = origHTML.split(/<br\s*\/?>/i).map(function(l){ return l.trim(); });
          var t0 = null, dur = 700;
          (function step(ts){
            if(!t0) t0 = ts;
            var p = Math.min((ts-t0)/dur, 1);
            var parts = lines.map(function(line){
              var rev = Math.floor(p * line.length), out = '';
              for(var i=0;i<line.length;i++){
                out += i < rev ? line[i] : CHARS[Math.floor(Math.random()*CHARS.length)];
              }
              return out;
            });
            el.innerHTML = parts.join('<br>');
            if(p < 1) { requestAnimationFrame(step); }
            else {
              el.innerHTML = origHTML;
              setTimeout(function(){ el.style.minHeight = ''; }, 50);
            }
          })(performance.now());
        } else {
          // No line breaks — original single-line scramble
          var orig = el.textContent.replace(/\s+/g,' ').trim();
          scramble(el, orig, 700, function(){
            el.innerHTML = origHTML;
            setTimeout(function(){ el.style.minHeight = ''; }, 50);
          });
        }
      }, 100);
      hIO.unobserve(el);
    });
  }, { threshold:0.5 });
  document.querySelectorAll('h2.s-title').forEach(function(h){ hIO.observe(h); });
}

/* ─────────────────────────────────────────────
   COUNTERS — with GLOW completion
───────────────────────────────────────────── */
function animCounter(el) {
  var target=parseInt(el.dataset.target), pfx=el.dataset.prefix||'', sfx=el.dataset.suffix||'';
  var hasK=sfx.includes('K'), hasP=sfx.includes('+');
  var t0=null, dur=1700;
  (function step(ts){
    if(!t0) t0=ts;
    var p=Math.min((ts-t0)/dur,1), e=1-Math.pow(1-p,3), v=Math.floor(e*target);
    if(hasK)      el.innerHTML=pfx+v+'<em>K+</em>';
    else if(hasP)  el.innerHTML=pfx+v+'<em>+</em>';
    else           el.innerHTML=pfx+v+'<em>'+sfx+'</em>';
    if(p<1) requestAnimationFrame(step);
    else {
      if(hasK)     el.innerHTML=pfx+target+'<em>K+</em>';
      else if(hasP) el.innerHTML=pfx+target+'<em>+</em>';
      else          el.innerHTML=pfx+target+'<em>'+sfx+'</em>';
      el.classList.add('counter-glow');
      setTimeout(function(){ el.classList.remove('counter-glow'); }, 1800);
    }
  })(performance.now());
}
function initCounters() {
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting && e.target.dataset.target){ animCounter(e.target); io.unobserve(e.target); }
    });
  },{ threshold:0.05, rootMargin:'0px 0px 300px 0px' });
  var fired=new Set();
  document.querySelectorAll('[data-target]').forEach(function(el){
    var r=el.getBoundingClientRect();
    if(r.top < window.innerHeight+400) setTimeout(function(){ if(!fired.has(el)){fired.add(el);animCounter(el);} },300);
    else io.observe(el);
  });
  setTimeout(function(){ document.querySelectorAll('[data-target]').forEach(function(el){ if(!fired.has(el)){fired.add(el);animCounter(el);} }); },3000);
}

/* ─────────────────────────────────────────────
   EXP ACCORDION
───────────────────────────────────────────── */
function toggleExp(el) {
  var open = el.classList.contains('open');
  document.querySelectorAll('.exp-item.open').forEach(function(i){ i.classList.remove('open'); });
  if(!open) el.classList.add('open');
}

/* ─────────────────────────────────────────────
   CASE STUDY ACCORDION — CLASSIFIED SCAN
───────────────────────────────────────────── */
function initCaseScanAnim(){} // setup via toggleCS
function toggleCS(card) {
  var isOpen = card.classList.contains('open');
  document.querySelectorAll('.cs-card.open').forEach(function(c){ c.classList.remove('open'); });
  if (isOpen) return;

  // Build scan overlay if not present
  if (!card.querySelector('.cs-scan-overlay')) {
    var ov = document.createElement('div'); ov.className='cs-scan-overlay';
    var beam = document.createElement('div'); beam.className='cs-scan-beam';
    var txt = document.createElement('div'); txt.className='cs-decrypt-txt';
    txt.textContent = 'DECRYPTING...';
    ov.appendChild(beam); ov.appendChild(txt);
    card.appendChild(ov);
  }
  var beam = card.querySelector('.cs-scan-beam');
  var txt  = card.querySelector('.cs-decrypt-txt');

  // Flash decrypt label
  txt.style.opacity = '1';
  setTimeout(function(){ txt.style.opacity='0'; }, 500);

  // Scan sweep
  beam.style.transition='none'; beam.style.top='-3px';
  setTimeout(function(){
    beam.style.transition='top 0.65s linear';
    beam.style.top='100%';
  }, 30);

  // Open card after scan completes
  setTimeout(function(){
    card.classList.add('open');
    setTimeout(function(){
      var r = card.getBoundingClientRect();
      if(r.top < 80) window.scrollBy({top:r.top-80,behavior:'smooth'});
    }, 80);
  }, 250);
}

/* ─────────────────────────────────────────────
   PORTFOLIO TILT
───────────────────────────────────────────── */
function initTilt(){
  document.querySelectorAll('.pcard').forEach(function(card){
    card.addEventListener('mousemove',function(e){
      var r=card.getBoundingClientRect();
      var x=((e.clientX-r.left)/r.width-0.5)*10;
      var y=((e.clientY-r.top)/r.height-0.5)*-10;
      card.style.transform='perspective(600px) rotateY('+x+'deg) rotateX('+y+'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave',function(){ card.style.transform=''; });
  });
}

/* ─────────────────────────────────────────────
   HERO MOUSE PARALLAX
───────────────────────────────────────────── */
(function(){
  var hero = document.getElementById('hero');
  if(!hero) return;
  var nm = hero.querySelector('.hero-name');
  var tt = hero.querySelector('.hero-title');
  var bi = hero.querySelector('.hero-bio');
  hero.addEventListener('mousemove',function(e){
    var r=hero.getBoundingClientRect();
    var cx=(e.clientX-r.left-r.width/2)/r.width;
    var cy=(e.clientY-r.top-r.height/2)/r.height;
    if(nm) nm.style.transform='translate('+(-cx*14)+'px,'+(-cy*8)+'px)';
    if(tt) tt.style.transform='translate('+(-cx*7)+'px,'+(-cy*4)+'px)';
    if(bi) bi.style.transform='translate('+(-cx*4)+'px,'+(-cy*2)+'px)';
  });
  hero.addEventListener('mouseleave',function(){
    if(nm) nm.style.transform=''; if(tt) tt.style.transform=''; if(bi) bi.style.transform='';
  });
})();

/* ─────────────────────────────────────────────
   MAGNETIC CTA BUTTONS
───────────────────────────────────────────── */
function initMagneticBtns(){
  document.querySelectorAll('.btn-gold,.btn-ghost,.nav-hire,.chip-promptops').forEach(function(btn){
    btn.addEventListener('mousemove',function(e){
      var r=btn.getBoundingClientRect();
      var cx=e.clientX-r.left-r.width/2;
      var cy=e.clientY-r.top-r.height/2;
      btn.style.transform='translate('+cx*0.22+'px,'+cy*0.3+'px)';
    });
    btn.addEventListener('mouseleave',function(){
      btn.style.transition='transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      btn.style.transform='';
      setTimeout(function(){ btn.style.transition=''; },500);
    });
  });
}

/* ─────────────────────────────────────────────
   PARALLAX ORBS ON SCROLL
───────────────────────────────────────────── */
window.addEventListener('scroll',function(){
  document.querySelectorAll('.orb').forEach(function(o,i){
    o.style.transform='translateY('+(scrollY*(i===0?-0.08:0.06))+'px)';
  });
},{passive:true});

/* ─────────────────────────────────────────────
   ACTIVE NAV
───────────────────────────────────────────── */
function initActiveNav(){
  var links=document.querySelectorAll('.nav-links a');
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var id=e.target.id;
        links.forEach(function(l){ l.classList.remove('nav-active'); if(l.getAttribute('href')==='#'+id) l.classList.add('nav-active'); });
      }
    });
  },{threshold:0.1});
  document.querySelectorAll('section[id]').forEach(function(s){ io.observe(s); });
}
(function(){
  var s=document.createElement('style');
  s.textContent='.nav-links a.nav-active{color:var(--white)!important;}.nav-links a.nav-active::after{transform:scaleX(1);transform-origin:left;}';
  document.head.appendChild(s);
})();

/* ═══════════════════════════════════════════════════════════════
   ██████████████████████████████████████████████████████████████
   THE AGENT NETWORK — Hero Canvas Background
   Jachin's 9 actual AI agents: named nodes, gold edges,
   travelling data packets, sonar pulse rings, mouse attraction
   ██████████████████████████████████████████████████████████████
═══════════════════════════════════════════════════════════════ */
(function(){
  var canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, mouseX=-9999, mouseY=-9999, frame=0;

  /* ── THE 9 NAMED AGENTS ── */
  var AGENT_DEFS = [
    { name:'Content Research', role:'RESEARCH',   color:[201,168,76],  size:4.5 },
    { name:'Newsletter Draft', role:'DRAFTING',   color:[201,168,76],  size:4   },
    { name:'SEO Agent',        role:'SEO/PUBLISH', color:[232,201,106], size:4.5 },
    { name:'A/B Test',         role:'TESTING',    color:[201,168,76],  size:3.5 },
    { name:'Social Dist.',     role:'DISTRIBUTE', color:[201,168,76],  size:4   },
    { name:'Subscriber OB',    role:'ONBOARDING', color:[232,201,106], size:3.5 },
    { name:'Support Agent',    role:'SUPPORT',    color:[201,168,76],  size:3.5 },
    { name:'Product Promo',    role:'CONVERSION', color:[201,168,76],  size:4   },
    { name:'PromptOps Core',   role:'ORCHESTRATE',color:[255,218,100], size:7   } // biggest — central hub
  ];

  /* ── NETWORK EDGES — curated communication paths ── */
  var EDGES = [
    [0,1],[1,2],[1,4],[0,3],[3,4],
    [4,5],[2,6],[5,6],[6,7],[7,8],
    [0,8],[1,8],[2,8],[3,8],[4,8],[6,8]
  ];

  var agents=[], packets=[];
  var ATTRACT_DIST=200, ATTRACT_STR=0.005;

  function Agent(def, idx) {
    this.idx   = idx;
    this.name  = def.name;
    this.role  = def.role;
    this.c     = def.color;      // [r,g,b]
    this.r     = def.size;
    this.baseX = 0; this.baseY = 0;
    this.x     = 0; this.y     = 0;
    this.vx    = (Math.random()-.5)*0.35;
    this.vy    = (Math.random()-.5)*0.35;
    // sonar pulse state
    this.pulseR    = def.size;
    this.pulseA    = 0;
    this.pulsing   = false;
    // activity / label
    this.active    = false;
    this.activeT   = 0;
    this.labelA    = idx===8 ? 0.5 : 0; // PromptOps always slightly labelled
  }

  function rgba(c, a) {
    return 'rgba('+c[0]+','+c[1]+','+c[2]+','+a+')';
  }

  function placeAgents() {
    // 3×3 grid with organic jitter
    var padX=W*0.11, padY=H*0.14;
    var cellW=(W-padX*2)/2, cellH=(H-padY*2)/2;
    agents.forEach(function(a,i){
      var col=i%3, row=Math.floor(i/3);
      a.baseX = padX + col*cellW + (Math.random()-.5)*cellW*0.35;
      a.baseY = padY + row*cellH + (Math.random()-.5)*cellH*0.35;
      // PromptOps Core: push toward center-right area
      if (i===8) { a.baseX=W*0.72; a.baseY=H*0.5; }
      a.x=a.baseX; a.y=a.baseY;
    });
  }

  function Packet(from, to) {
    this.from  = from; this.to = to; this.t = 0;
    this.speed = 0.0035 + Math.random()*0.003;
    this.done  = false;
  }

  function spawnPacket() {
    var e = EDGES[Math.floor(Math.random()*EDGES.length)];
    if (Math.random()<.5) e=[e[1],e[0]];
    packets.push(new Packet(e[0],e[1]));
    var dst = agents[e[1]];
    dst.active=true; dst.activeT=80;
    dst.pulsing=true; dst.pulseR=dst.r; dst.pulseA=0.7;
  }

  function resize() {
    W = canvas.width  = canvas.offsetWidth  || innerWidth;
    H = canvas.height = canvas.offsetHeight || innerHeight;
    agents=[]; packets=[];
    AGENT_DEFS.forEach(function(d,i){ agents.push(new Agent(d,i)); });
    placeAgents();
  }

  function draw() {
    if (document.hidden) { return; }
    ctx.clearRect(0,0,W,H);
    frame++;
    if (frame%85===0) spawnPacket();
    if (frame%210===0) spawnPacket();

    /* — UPDATE AGENTS — */
    agents.forEach(function(a){
      // soft spring back to base
      a.vx += (a.baseX-a.x)*0.0012;
      a.vy += (a.baseY-a.y)*0.0012;
      // mouse attraction
      var dx=mouseX-a.x, dy=mouseY-a.y, d=Math.sqrt(dx*dx+dy*dy);
      if (d<ATTRACT_DIST) { var f=(ATTRACT_DIST-d)/ATTRACT_DIST*ATTRACT_STR; a.vx+=dx*f; a.vy+=dy*f; }
      a.vx*=0.965; a.vy*=0.965;
      a.x+=a.vx; a.y+=a.vy;
      a.x=Math.max(a.r+16,Math.min(W-a.r-16,a.x));
      a.y=Math.max(a.r+16,Math.min(H-a.r-16,a.y));
      // activity decay
      if(a.activeT>0){ a.activeT--; } else { a.active=false; }
      // label alpha: on when active or mouse very close
      var targetLA = (a.active||(d<70)) ? 1 : (a.idx===8?0.55:0);
      a.labelA += (targetLA-a.labelA)*0.05;
    });

    /* — DRAW EDGES (dashed gold lines) — */
    EDGES.forEach(function(e){
      var a=agents[e[0]], b=agents[e[1]];
      ctx.save();
      ctx.strokeStyle=rgba([201,168,76],0.1);
      ctx.lineWidth=0.8; ctx.setLineDash([3,9]);
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      ctx.setLineDash([]); ctx.restore();
    });

    /* — UPDATE + DRAW PACKETS — */
    packets=packets.filter(function(p){return!p.done;});
    packets.forEach(function(p){
      p.t+=p.speed; if(p.t>=1){p.done=true;return;}
      var a=agents[p.from], b=agents[p.to];
      var px=a.x+(b.x-a.x)*p.t, py=a.y+(b.y-a.y)*p.t;
      // glow aura
      var g=ctx.createRadialGradient(px,py,0,px,py,8);
      g.addColorStop(0,rgba([232,201,106],0.95));
      g.addColorStop(0.4,rgba([201,168,76],0.45));
      g.addColorStop(1,rgba([201,168,76],0));
      ctx.beginPath(); ctx.arc(px,py,8,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill();
      // hard center
      ctx.beginPath(); ctx.arc(px,py,2,0,Math.PI*2);
      ctx.fillStyle=rgba([255,220,130],1); ctx.fill();
    });

    /* — DRAW AGENTS — */
    agents.forEach(function(a){
      /* Sonar pulse ring */
      if(a.pulsing){
        a.pulseR+=1.6; a.pulseA-=0.013;
        if(a.pulseA<=0){
          a.pulsing=false; a.pulseR=a.r; a.pulseA=0;
          if(a.active){
            setTimeout(function(){ a.pulsing=true; a.pulseR=a.r; a.pulseA=0.55; },350);
          }
        } else {
          ctx.beginPath(); ctx.arc(a.x,a.y,a.pulseR,0,Math.PI*2);
          ctx.strokeStyle=rgba(a.c,a.pulseA); ctx.lineWidth=1.2; ctx.stroke();
        }
      }
      /* Glow halo */
      var gSize = a.active ? a.r*4 : a.r*2.5;
      var baseA = a.active ? 0.85 : 0.5;
      var g = ctx.createRadialGradient(a.x,a.y,0,a.x,a.y,gSize);
      g.addColorStop(0,rgba(a.c,baseA));
      g.addColorStop(0.4,rgba(a.c,baseA*0.45));
      g.addColorStop(1,rgba(a.c,0));
      ctx.beginPath(); ctx.arc(a.x,a.y,gSize,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill();
      /* Solid core */
      ctx.beginPath(); ctx.arc(a.x,a.y,a.active?a.r*1.35:a.r,0,Math.PI*2);
      ctx.fillStyle=rgba(a.c,a.active?1:0.82); ctx.fill();
      /* Inner bright dot */
      ctx.beginPath(); ctx.arc(a.x,a.y,a.r*0.42,0,Math.PI*2);
      ctx.fillStyle=rgba([255,230,150],a.active?1:0.7); ctx.fill();

      /* Agent label — appears on hover/active */
      if(a.labelA>0.02){
        ctx.save();
        ctx.globalAlpha=a.labelA;
        ctx.font='700 8px "Barlow Condensed",sans-serif';
        ctx.fillStyle=rgba([201,168,76],1);
        ctx.textAlign='center';
        ctx.fillText(a.name.toUpperCase(), a.x, a.y-a.r-10);
        /* role sub-label */
        ctx.font='400 7px "Barlow Condensed",sans-serif';
        ctx.fillStyle=rgba([136,128,112],0.9);
        ctx.fillText(a.role, a.x, a.y-a.r-2);
        ctx.restore();
      }
    });

    requestAnimationFrame(draw);
  }

  /* Mouse tracking */
  var hero=document.getElementById('hero');
  if(hero){
    hero.addEventListener('mousemove',function(e){
      var r=canvas.getBoundingClientRect();
      mouseX=e.clientX-r.left; mouseY=e.clientY-r.top;
    });
    hero.addEventListener('mouseleave',function(){ mouseX=-9999; mouseY=-9999; });
  }

  window.addEventListener('resize',resize,{passive:true});
  resize(); draw();

  /* Boot burst — animate 3 packets on load */
  setTimeout(function(){ spawnPacket(); spawnPacket(); spawnPacket(); },1800);
})();

/* ═══════════════════════════════════════════════════════════════
   SONOWAL DATA STREAM — text scramble only
═══════════════════════════════════════════════════════════════ */
(function(){
  var el=document.getElementById('sonowal-el');
  if(!el) return;
  var STREAM='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&';
  var original='SONOWAL', streaming=false;

  el.addEventListener('mouseenter',function(){
    if(streaming) return; streaming=true;
    var iters=0, max=original.length*5;
    var iv=setInterval(function(){
      var d=original.split('').map(function(c,i){
        return i<Math.floor(iters/5)?original[i]:STREAM[Math.floor(Math.random()*STREAM.length)];
      }).join('');
      el.textContent=d; iters++;
      if(iters>=max){clearInterval(iv);el.textContent=original;streaming=false;}
    },38);
  });
})();

/* ═══════════════════════════════════════════════════════════════
   SAIKIA HEAT HAZE — inject animated letter spans
═══════════════════════════════════════════════════════════════ */
function initSaikiaHaze(){
  var el=document.getElementById('saikia-el');
  if(!el) return;
  el.innerHTML='SAIKIA'.split('').map(function(c,i){
    return '<span class="sk-letter" style="animation-delay:'+(i*0.13)+'s">'+c+'</span>';
  }).join('');
}

/* ═══════════════════════════════════════════════════════════════
   STAT SHATTER — gold square particles on hover
═══════════════════════════════════════════════════════════════ */
(function(){
  var pc=document.getElementById('particle-canvas');
  if(!pc) return;
  document.querySelectorAll('.hstat-decomp').forEach(function(stat){
    stat.addEventListener('mouseenter',function(){
      pc.width=pc.offsetWidth; pc.height=pc.offsetHeight;
      var ctx=pc.getContext('2d');
      var sr=stat.getBoundingClientRect(), cr=pc.getBoundingClientRect();
      var cx=sr.left-cr.left+sr.width/2, cy=sr.top-cr.top+sr.height/2;
      var parts=[];
      for(var i=0;i<30;i++){
        var ang=Math.random()*Math.PI*2, spd=Math.random()*6+2;
        parts.push({x:cx+(Math.random()-.5)*22,y:cy+(Math.random()-.5)*12,
          vx:Math.cos(ang)*spd,vy:Math.sin(ang)*spd-2,
          life:1,sz:Math.random()*4+2});
      }
      (function anim(){
        ctx.clearRect(0,0,pc.width,pc.height);
        var alive=false;
        parts.forEach(function(p){
          p.x+=p.vx; p.y+=p.vy; p.vy+=0.22; p.vx*=0.97; p.life-=0.038;
          if(p.life>0){
            alive=true;
            ctx.save(); ctx.globalAlpha=p.life;
            ctx.fillStyle=p.life>0.5?'rgba(232,201,106,1)':'rgba(201,168,76,0.75)';
            ctx.fillRect(p.x-p.sz/2,p.y-p.sz/2,p.sz,p.sz);
            ctx.restore();
          }
        });
        if(alive) requestAnimationFrame(anim);
        else ctx.clearRect(0,0,pc.width,pc.height);
      })();
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   OPS DASHBOARD — bar fill + count-up
═══════════════════════════════════════════════════════════════ */
function initOpsCounters(){
  var d=document.getElementById('ops-dashboard');
  if(!d) return;
  setTimeout(function(){ d.querySelectorAll('.ops-fill').forEach(function(b){ b.classList.add('go'); }); },3200);
  setTimeout(function(){
    d.querySelectorAll('.ops-count').forEach(function(el){
      var target=parseInt(el.dataset.val),dur=1800,t0=null;
      (function step(ts){
        if(!t0)t0=ts;
        var p=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-p,3);
        el.textContent=Math.floor(e*target);
        if(p<1)requestAnimationFrame(step);else el.textContent=target;
      })(performance.now());
    });
  },3000);
}

/* ═══════════════════════════════════════════════════════════════
   REVENUE TIMELINE SVG
═══════════════════════════════════════════════════════════════ */
function initRevTimeline(){
  var path=document.getElementById('rev-path'), wrap=document.getElementById('rev-timeline-wrap');
  if(!path||!wrap) return;
  var tip=document.getElementById('rev-tooltip'), tipLbl=document.getElementById('rev-tip-label'), tipYear=document.getElementById('rev-tip-year');
  document.querySelectorAll('.rev-dot').forEach(function(dot){
    dot.addEventListener('mouseenter',function(){
      if(!tip) return;
      var cx=parseFloat(dot.getAttribute('cx')),cy=parseFloat(dot.getAttribute('cy'));
      var lbl=dot.dataset.label||'',year=dot.dataset.year||'';
      if(tipLbl)tipLbl.textContent=lbl; if(tipYear)tipYear.textContent=year;
      var tx=cx+10,ty=cy-28,tw=Math.max(lbl.length*6.5,60),th=30;
      var rect=tip.querySelector('rect');
      if(rect){rect.setAttribute('x',tx);rect.setAttribute('y',ty-14);rect.setAttribute('width',tw);rect.setAttribute('height',th);}
      if(tipLbl){tipLbl.setAttribute('x',tx+6);tipLbl.setAttribute('y',ty+1);}
      if(tipYear){tipYear.setAttribute('x',tx+6);tipYear.setAttribute('y',ty+12);}
      tip.setAttribute('opacity',1); dot.style.fill='#C9A84C';
    });
    dot.addEventListener('mouseleave',function(){ if(tip)tip.setAttribute('opacity',0); dot.style.fill=''; });
  });
  var drawn=false;
  new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting&&!drawn){
      drawn=true; path.style.transition='stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1)'; path.style.strokeDashoffset='0';
    }
  },{threshold:0.3}).observe(wrap);
}

/* ═══════════════════════════════════════════════════════════════
   SECTION CUT TRANSITION
═══════════════════════════════════════════════════════════════ */
function initSectionCut(){
  var cut=document.getElementById('section-cut');
  if(!cut) return;
  var fired=false;
  new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting&&!fired){fired=true;cut.classList.add('cut-fired');}
  },{threshold:0.8}).observe(cut);
}

/* ═══════════════════════════════════════════════════════════════
   AMBIENT INTELLIGENCE HUD — section-reactive
═══════════════════════════════════════════════════════════════ */
var HUD = {
  'about':         'REVIEWING — FULL-STACK MARKETER · 8 YEARS',
  'experience':    'LOADING — 8 YEARS OF REVENUE-GENERATING WORK',
  'case-studies':  'DECRYPTING — 5 CASE STUDIES · $150K+ REVENUE',
  'portfolio':     'RENDERING — SELECTED WORK · 6 PROJECTS',
  'services':      'SCANNING — 7 SERVICE MODULES AVAILABLE',
  'skills':        'INDEXING — 40+ COMPETENCIES · AI-NATIVE STACK',
  'tools':         'ENUMERATING — FULL TECH STACK · 35+ TOOLS',
  'certifications':'VERIFYING — 6 ACTIVE CERTIFICATIONS',
  'testimonials':  'VALIDATING — CLIENT SOCIAL PROOF',
  'cta':           'STATUS: AVAILABLE · RESPOND WITHIN 24H'
};
function initAmbientHUD(){
  var hud=document.getElementById('ambient-hud'), txt=document.getElementById('ahud-text');
  if(!hud||!txt) return;
  var hideT, current='';
  function showMsg(msg){
    clearTimeout(hideT); txt.textContent=''; hud.classList.add('ahud-on');
    var i=0, iv=setInterval(function(){
      txt.textContent=msg.slice(0,i); i++;
      if(i>msg.length) clearInterval(iv);
    },25);
    hideT=setTimeout(function(){ hud.classList.remove('ahud-on'); },4000);
  }
  // One observer per section — no duplicates
  document.querySelectorAll('section[id]').forEach(function(s){
    new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting&&HUD[e.target.id]&&e.target.id!==current){
          current=e.target.id; showMsg(HUD[e.target.id]);
        }
      });
    },{threshold:0.3}).observe(s);
  });
}

/* ═══════════════════════════════════════════════════════════════
   LIVE CLOCK + REVENUE TICKER
═══════════════════════════════════════════════════════════════ */
function initRevTicker(){
  /* Live clock */
  var clk=document.getElementById('f-clock');
  function tick(){
    if (document.hidden) { return; }
    if(!clk) return;
    var n=new Date(),h=n.getHours(),m=n.getMinutes(),s=n.getSeconds();
    var ap=h>=12?'PM':'AM'; h=h%12||12;
    clk.textContent=(h<10?'0':'')+h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s+' '+ap+' IST';
  }
  tick(); setInterval(tick,1000);

  /* Revenue ticker */
  var tval=document.getElementById('rev-ticker'), tvEl=document.getElementById('rev-ticker-val');
  if(tval&&tvEl){
    tval.classList.add('ticker-on');
    var val=145000;
    setInterval(function(){ val+=Math.floor(Math.random()*3+1); tvEl.textContent='$'+val.toLocaleString(); },900);
  }
}

/* ═══════════════════════════════════════════════════════════════
   TOOLS TABLE — STAGGERED ROW REVEAL
═══════════════════════════════════════════════════════════════ */
function initToolsReveal(){
  var rows=document.querySelectorAll('.tools-tbl tr');
  if(!rows.length) return;
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var idx=Array.from(rows).indexOf(e.target);
        setTimeout(function(){ e.target.classList.add('t-in'); },idx*90);
        io.unobserve(e.target);
      }
    });
  },{threshold:0.1});
  rows.forEach(function(r){ io.observe(r); });
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL-VELOCITY REACTIVE GRAIN
═══════════════════════════════════════════════════════════════ */
(function(){
  var grain=document.getElementById('idle-grain');
  if(!grain) return;
  var lastY=0, vel=0, idleT;
  window.addEventListener('scroll',function(){
    vel=Math.abs(scrollY-lastY); lastY=scrollY;
    grain.style.opacity=Math.min(vel/35,1)*0.075;
    grain.classList.remove('idle-on');
    clearTimeout(idleT);
    idleT=setTimeout(function(){ grain.style.opacity=''; grain.classList.add('idle-on'); },8000);
  },{passive:true});
  idleT=setTimeout(function(){ grain.classList.add('idle-on'); },8000);
})();

/* ═══════════════════════════════════════════════════════════════
   TERMINAL EASTER EGG — type "JACHIN" anywhere
═══════════════════════════════════════════════════════════════ */
var TERM_SCRIPT = [
  { t:'gold',  d:0,    s:'$ ./boot --system jachin_os v2026.1'            },
  { t:'dim',   d:180,  s:'──────────────────────────────────────────'     },
  { t:'green', d:380,  s:'> LOADING JACHIN_OS v2026.1...'                 },
  { t:'green', d:640,  s:'> MEMORY: 8 YEARS EXPERIENCE [LOADED]'          },
  { t:'green', d:900,  s:'> SYSTEMS: PROMPTOPS [ACTIVE · 247+ WAITLIST]'  },
  { t:'green', d:1160, s:'> AGENTS: 10 [ALL RUNNING IN PRODUCTION]'       },
  { t:'green', d:1420, s:'> REVENUE: $150K+ [TRACKED · COMPOUNDING]'      },
  { t:'green', d:1680, s:'> CLIENTS: 175+ [5 INDUSTRIES · 8+ YEARS]'      },
  { t:'green', d:1940, s:'> EMAIL_OPEN_RATE: 38% [2× INDUSTRY AVG]'       },
  { t:'dim',   d:2200, s:'──────────────────────────────────────────'     },
  { t:'gold',  d:2460, s:'> STATUS: AVAILABLE FOR REMOTE · FREELANCE'     },
  { t:'white', d:2720, s:'> STACK: AI · GROWTH · SAAS · AUTOMATION'       },
  { t:'white', d:2980, s:'> CONTACT: jachinchsaikiasonowal@gmail.com'     },
  { t:'gold',  d:3240, s:'> PROMPTOPS: promptops.jachinsonowal.com'        },
  { t:'dim',   d:3500, s:'──────────────────────────────────────────'     },
  { t:'gold',  d:3760, s:"👋 You found the terminal. Bold move."           },
  { t:'',      d:4020, s:"   I build things like this for fun."            },
  { t:'',      d:4280, s:"   Imagine what I could build for you."          },
];
var keyBuf='', termIsOpen=false;
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&termIsOpen){ closeTerminal(); return; }
  if(e.key.length===1){
    keyBuf=(keyBuf+e.key.toUpperCase()).slice(-6);
    if(keyBuf.includes('JACHIN')){ keyBuf=''; openTerminal(); }
  }
});
function openTerminal(){
  var ov=document.getElementById('terminal-overlay'), body=document.getElementById('term-body');
  if(!ov||!body||termIsOpen) return;
  termIsOpen=true; ov.classList.add('term-open'); body.innerHTML='';
  TERM_SCRIPT.forEach(function(line){
    setTimeout(function(){
      var d=document.createElement('div');
      d.className='tl'+(line.t?' tl-'+line.t:'');
      d.textContent=line.s; body.appendChild(d);
      body.scrollTop=body.scrollHeight;
    },line.d);
  });
  setTimeout(function(){
    var c=document.createElement('span'); c.className='term-cursor';
    body.appendChild(c);
  },4600);
}
function closeTerminal(){
  var ov=document.getElementById('terminal-overlay');
  if(ov) ov.classList.remove('term-open');
  termIsOpen=false;
}

/* ═══════════════════════════════════════════════════════════════
   CONSOLE HINT
═══════════════════════════════════════════════════════════════ */
(function(){
  var g='color:#C9A84C;font-family:monospace;',w='color:#F2EFE8;font-family:monospace;',gr='color:#888070;font-family:monospace;';
  console.log('\n%c⚡ JACHIN SAIKIA SONOWAL','font-size:20px;letter-spacing:4px;color:#C9A84C;font-weight:700;font-family:monospace;');
  console.log('%cGrowth Marketer · AI Agent Engineer · Founder of PromptOps',gr+'font-size:10px;');
  console.log('%c──────────────────────────────────────────',gr);
  console.log('%c  ✓ Available · $150K+ revenue · 247+ PromptOps waitlist',w+'font-size:12px;');
  console.log('%c$ jachin --boot\n%c> JACHIN_OS v2026.1 initialized\n%c> awaiting input_',g+'font-size:11px;',g+'font-size:11px;',g+'font-size:12px;font-weight:700;');
})();


/* ══════════════════════════════════════════════════════════
   AI SYSTEMS — AGENT NETWORK CANVAS
══════════════════════════════════════════════════════════ */
(function() {
  var canvas  = document.getElementById('network-canvas');
  var wrap    = document.getElementById('network-wrap');
  var tip     = document.getElementById('agent-tip');
  if (!canvas || !wrap) return;
  var ctx = canvas.getContext('2d');
  var W, H;
  var hovered = -1;
  var t = 0;
  var pulses  = [];

  /* ── AGENT DATA ── */
  var AGENTS = [
    // Content — left arc
    { n:'RADAR',        d:'content',      r:'Monitors 30+ sources · relevance-scored digest delivered daily',     p:96,  x:.10, y:.20 },
    { n:'CAPTURE',      d:'content',      r:'Thought inbox — voice, text, screenshot → structured note',          p:94,  x:.06, y:.38 },
    { n:'SCRIBE',       d:'content',      r:'Research-to-newsletter pipeline · 60% writing time reduction',       p:98,  x:.13, y:.55 },
    { n:'HERALD',       d:'content',      r:'Formats and publishes to Beehiiv on schedule · never late',          p:100, x:.19, y:.70 },
    { n:'REMIX',        d:'content',      r:'One newsletter → 9 platform-native content pieces automatically',    p:94,  x:.10, y:.84 },
    { n:'PULSE',        d:'content',      r:'Schedules cross-platform posts at optimal send times',               p:91,  x:.04, y:.63 },
    { n:'GHOST',        d:'content',      r:'SEO articles auto-published to Ghost + URLs submitted to GSC',       p:89,  x:.04, y:.24 },
    // Revenue — top right
    { n:'LENS',         d:'revenue',      r:'Analytics aggregation — Monday morning brief with trends & flags',   p:92,  x:.87, y:.16 },
    { n:'CLOSER',       d:'revenue',      r:'Writes sponsorship pitches and outreach sequences in my voice',      p:91,  x:.94, y:.32 },
    { n:'SCOUT',        d:'revenue',      r:'Scans affiliates, grants, partnerships — curated list Thursdays',    p:88,  x:.90, y:.48 },
    { n:'INTEL',        d:'revenue',      r:'Competitor content gap analysis — surfaces opportunities early',     p:87,  x:.83, y:.60 },
    // Build — right side pipeline
    { n:'MASTER-BUILD', d:'build',        r:'Reads system memory, identifies next build target, allocates context', p:96, x:.72, y:.14 },
    { n:'FORGE',        d:'build',        r:'Backend: routes, schemas, services — complete production-ready files', p:95, x:.78, y:.32 },
    { n:'PIXEL',        d:'build',        r:'Frontend: React components and CSS to design system spec',            p:94, x:.68, y:.46 },
    { n:'PROBE',        d:'build',        r:'Automated test runner — hard PASS/FAIL gate before anything ships',   p:88, x:.76, y:.62 },
    { n:'CLAW',         d:'build',        r:'Debug-only — fires on PROBE failure, diagnoses before re-queuing',    p:90, x:.84, y:.76 },
    { n:'SCRIBE-BUILD', d:'build',        r:'Documents context, updates system memory, commits to git',            p:99, x:.67, y:.78 },
    // Personal — bottom centre-left
    { n:'HUNT',         d:'personal',     r:'Surfaces filtered opportunities twice weekly — already matched',       p:87, x:.30, y:.90 },
    { n:'APPLY',        d:'personal',     r:'Tailored CV + cover letter per role — one input, ready to send',      p:93, x:.43, y:.94 },
    { n:'REPLY',        d:'personal',     r:'Drafts email responses in my documented voice and preferences',        p:85, x:.56, y:.90 },
    // Intelligence — top centre
    { n:'EVOLVE',       d:'intelligence', r:'Reviews all agent outputs weekly · drafts improvements for approval',  p:91, x:.38, y:.07 },
    { n:'ORACLE',       d:'intelligence', r:'Monthly knowledge compression — archives sessions, defragments memory', p:92, x:.50, y:.11 },
    { n:'GENESIS',      d:'intelligence', r:'Designs new agent roles when system gaps are detected',               p:89, x:.62, y:.06 },
    // Security — centre hub
    { n:'JACHIN',       d:'security',     r:'Master router — all commands pass through here · access enforcement 24/7', p:98, x:.50, y:.47 },
    { n:'GUARDIAN',     d:'security',     r:'Filters injection attempts + validates brand voice before publish',    p:97, x:.41, y:.34 },
    { n:'WATCHDOG',     d:'security',     r:'Health check every 6h — error alerts via Telegram · auto-triage',    p:96, x:.59, y:.34 },
  ];

  var DCOL = {
    content:     '#C9A84C',
    revenue:     '#4ade80',
    build:       '#60a5fa',
    personal:    '#c084fc',
    intelligence:'#fb923c',
    security:    '#f87171'
  };

  /* ── CONNECTIONS (real data flows) ── */
  var CONNS = [
    [0,2,1],[1,2,.7],[2,3,.95],[2,4,.9],[4,5,.8],[6,2,.5],  // content pipeline
    [7,23,.8],[8,23,.6],[9,23,.5],[10,23,.5],               // revenue → JACHIN
    [11,12,.9],[11,13,.9],[12,14,.95],[13,14,.95],           // build pipeline
    [14,15,.7],[14,16,.9],[15,11,.5],                        // probe → claw/scribe
    [20,23,.8],[21,23,.7],[22,23,.5],                        // intelligence → JACHIN
    [23,24,.95],[23,25,.95],                                 // JACHIN → guardian/watchdog
    [24,3,.7],[25,0,.6],                                     // guardian → herald, watchdog → radar
    [23,0,.7],[23,11,.7],[23,17,.6],                         // JACHIN dispatches
    [0,20,.4],[3,20,.4],[12,21,.4],                          // feedback to intelligence
  ];

  function resize() {
    W = canvas.width  = wrap.clientWidth;
    H = canvas.height = wrap.clientHeight;
  }

  function getNode(i) {
    var a = AGENTS[i];
    return { px: a.x * W, py: a.y * H };
  }

  function spawnPulse() {
    var ci = Math.floor(Math.random() * CONNS.length);
    pulses.push({ ci: ci, prog: 0 });
  }

  function draw() {
    if (document.hidden) { return; }
    ctx.clearRect(0, 0, W, H);
    t += .007;

    // Spawn
    if (Math.random() < .045) spawnPulse();

    // Draw connections
    CONNS.forEach(function(c) {
      var a = getNode(c[0]), b = getNode(c[1]), w = c[2];
      ctx.save();
      ctx.strokeStyle = 'rgba(201,168,76,' + (w * .11) + ')';
      ctx.lineWidth = w > .85 ? 1.1 : .7;
      ctx.beginPath(); ctx.moveTo(a.px, a.py); ctx.lineTo(b.px, b.py); ctx.stroke();
      ctx.restore();
    });

    // Draw pulses
    pulses = pulses.filter(function(p) { return p.prog < 1; });
    pulses.forEach(function(p) {
      p.prog += .013;
      var c = CONNS[p.ci];
      var a = getNode(c[0]), b = getNode(c[1]);
      var px = a.px + (b.px - a.px) * p.prog;
      var py = a.py + (b.py - a.py) * p.prog;
      var alpha = p.prog < .1 ? p.prog * 10 : p.prog > .88 ? (1 - p.prog) * 8.3 : 1;
      ctx.save();
      ctx.globalAlpha = alpha * .95;
      ctx.fillStyle = '#E8C96A';
      ctx.shadowColor = '#C9A84C'; ctx.shadowBlur = 7;
      ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI*2); ctx.fill();
      ctx.restore();
    });

    // Draw nodes
    AGENTS.forEach(function(ag, i) {
      var px = ag.x * W, py = ag.y * H;
      var isHub = ag.n === 'JACHIN';
      var isSec = ag.d === 'security';
      var isHov = (i === hovered);
      var r = isHub ? 12 : (ag.p >= 95 ? 8 : 6.5);
      var col = DCOL[ag.d];

      // pulse ring
      if (isHub || isHov || ag.p >= 95) {
        var pulse = .5 + .5 * Math.sin(t * 1.8 + i * .7);
        var rr = r + 5 + pulse * (isHub ? 5 : 3) + (isHov ? 5 : 0);
        ctx.save();
        ctx.globalAlpha = isHov ? .4 : (isHub ? .28 : .14 + pulse * .07);
        ctx.strokeStyle = col; ctx.lineWidth = isHub ? 1.5 : 1;
        ctx.beginPath(); ctx.arc(px, py, rr, 0, Math.PI*2); ctx.stroke();
        ctx.restore();
      }

      // Node
      ctx.save();
      ctx.globalAlpha = isHov ? 1 : .88;
      ctx.fillStyle = (isHov || isHub) ? col : '#0d0d0d';
      ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = col; ctx.lineWidth = isHov ? 1.5 : 1;
      ctx.stroke();
      ctx.restore();

      // Label
      if (isHov || isHub || r >= 8) {
        ctx.save();
        ctx.font = (isHub ? 'bold ' : '') + '9px "Barlow Condensed", sans-serif';
        ctx.fillStyle = isHov ? '#F2EFE8' : col;
        ctx.globalAlpha = isHov ? 1 : (isHub ? .95 : .72);
        ctx.textAlign = 'center';
        ctx.fillText(ag.n, px, py + r + 11);
        ctx.restore();
      }
    });

    requestAnimationFrame(draw);
  }

  /* ── HOVER ── */
  canvas.addEventListener('mousemove', function(e) {
    var rect = canvas.getBoundingClientRect();
    var mx = e.clientX - rect.left;
    var my = e.clientY - rect.top;
    var found = -1;
    AGENTS.forEach(function(ag, i) {
      var px = ag.x * W, py = ag.y * H;
      var dx = mx - px, dy = my - py;
      if (Math.sqrt(dx*dx + dy*dy) < 18) found = i;
    });
    hovered = found;
    if (found !== -1) {
      var ag = AGENTS[found];
      document.getElementById('at-name').textContent = ag.n;
      document.getElementById('at-dept').textContent = ag.d.toUpperCase() + ' DEPT';
      document.getElementById('at-role').textContent = ag.r;
      document.getElementById('at-perf-fill').style.width = ag.p + '%';
      document.getElementById('at-perf-num').textContent  = ag.p + '/100';
      var tx = e.clientX - rect.left + 18;
      var ty = e.clientY - rect.top - 10;
      if (tx + 260 > W) tx = tx - 278;
      if (ty + 120 > H) ty = ty - 120;
      tip.style.left = tx + 'px';
      tip.style.top  = ty + 'px';
      tip.style.opacity = '1';
      document.body.classList.add('cursor-hover');
    } else {
      tip.style.opacity = '0';
      document.body.classList.remove('cursor-hover');
    }
  });
  canvas.addEventListener('mouseleave', function() {
    hovered = -1;
    tip.style.opacity = '0';
  });

  /* ── INIT on enter viewport ── */
  var started = false;
  var io = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting && !started) {
      started = true;
      resize();
      // Seed pulses staggered
      for (var i = 0; i < 8; i++) {
        (function(idx) { setTimeout(spawnPulse, idx * 300); })(i);
      }
      draw();
      io.disconnect();
    }
  }, { threshold: .1 });
  io.observe(wrap);

  window.addEventListener('resize', function() {
    if (started) resize();
  });

})();


/* ══════════════════════════════════════════════════════════
   AI SYSTEMS — STATS CARD BAR ANIMATION
══════════════════════════════════════════════════════════ */
(function() {
  var fills = document.querySelectorAll('.aisc-fill');
  if (!fills.length) return;
  var io = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      fills.forEach(function(f) {
        var w = f.getAttribute('data-w');
        if (w) setTimeout(function() {
          f.style.transform = 'scaleX(' + w + ')';
          f.classList.add('on');
        }, 450);
      });
      io.disconnect();
    }
  }, { threshold: 0.2 });
  var card = document.querySelector('.ais-stats-card');
  if (card) io.observe(card);
})();

// ─── Pause animations when tab is not visible ────────────────
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // All rAF loops self-pause via document.hidden check
    // Pause any audio/video if present
  }
});
