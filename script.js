// ── DRIVE CLICK TO PLAY ──
window.playDrive = function(el, id) {
  el.classList.add('playing');
  const f = document.createElement('iframe');
  f.src = 'https://drive.google.com/file/d/' + id + '/preview';
  f.allow = 'autoplay'; f.frameBorder = '0';
  el.appendChild(f);
};

// ── YOUTUBE OPEN ──
window.openYT = function(id) {
  window.open('https://www.youtube.com/watch?v=' + id, '_blank');
};

document.addEventListener('DOMContentLoaded', function() {

  // ── CURSOR ──
  var cur = document.getElementById('cursor');
  var dot = document.getElementById('cursor-dot');
  var mx = -200, my = -200, cx = -200, cy = -200;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });
  document.addEventListener('mousedown', function() { cur.classList.add('clk'); });
  document.addEventListener('mouseup',   function() { cur.classList.remove('clk'); });

  function animateCursor() {
    cx += (mx - cx) * 0.13;
    cy += (my - cy) * 0.13;
    cur.style.left = cx + 'px';
    cur.style.top  = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  function addHover(sel) {
    document.querySelectorAll(sel).forEach(function(el) {
      el.addEventListener('mouseenter', function() { cur.classList.add('hov'); });
      el.addEventListener('mouseleave', function() { cur.classList.remove('hov'); });
    });
  }
  addHover('a, button, .skill-card, .work-card, .short-card, .work-media, .short-media');

  // ── NAV STUCK ──
  var nav = document.getElementById('nav');
  function checkNav() { nav.classList.toggle('stuck', window.scrollY > 40); }
  checkNav();
  window.addEventListener('scroll', checkNav, { passive: true });

  // ── MOBILE MENU ──
  var tog = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  tog.addEventListener('click', function() {
    var open = links.classList.toggle('open');
    var s = tog.querySelectorAll('span');
    if (open) {
      s[0].style.transform = 'rotate(45deg) translate(4.5px,4.5px)';
      s[1].style.opacity = '0';
      s[2].style.transform = 'rotate(-45deg) translate(4.5px,-4.5px)';
    } else {
      s[0].style.transform = s[2].style.transform = '';
      s[1].style.opacity = '1';
    }
  });
  links.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      links.classList.remove('open');
      var s = tog.querySelectorAll('span');
      s[0].style.transform = s[2].style.transform = '';
      s[1].style.opacity = '1';
    });
  });

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ── SCROLL REVEAL ──
  var timer = setTimeout(function() {
    document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('in'); });
  }, 1200);

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });
  }

});
