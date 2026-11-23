
 // ============================================================
 // 01. MOBILE NAVIGATION
 // ============================================================
"use strict";

// EN / Myanmar language detection
const isMyanmar = document.documentElement.lang === 'my';

const toggle=document.getElementById('menu-toggle'),nav=document.getElementById('main-navigation');

if(toggle&&nav){
  const menuLabel = open => isMyanmar
    ? (open ? 'မီနူးပိတ်ရန်' : 'မီနူးဖွင့်ရန်')
    : (open ? 'Close navigation menu' : 'Open navigation menu');

  const close=()=>{
    nav.classList.remove('active');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label',menuLabel(false));
  };

  toggle.setAttribute('aria-label',menuLabel(false));

  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('active');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',menuLabel(open));
  });

  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));

  document.addEventListener('click',e=>{
    if(!nav.contains(e.target)&&!toggle.contains(e.target))close();
  });

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape')close();
  });

  window.matchMedia('(min-width: 901px)').addEventListener('change',close);
}

// ============================================================
// 02. FOOTER YEAR
// ============================================================
const year=document.getElementById('year');
if(year)year.textContent=new Date().getFullYear();

// Duplicate one complete row to make the animation loop continuously.
const gallery = document.querySelector('.logo-gallery');
if (gallery) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pause = gallery.querySelector('.logo-toggle');
  let paused = false;

  for (const track of gallery.querySelectorAll('.logo-track')) {
    for (const item of Array.from(track.children)) {
      const copy = item.cloneNode(true);
      copy.classList.add('logo-copy');
      copy.setAttribute('aria-hidden', 'true');
      track.append(copy);
    }
  }

  function updateLogoMotion() {
    gallery.classList.toggle('is-animated', !motion.matches);
    gallery.classList.toggle('is-paused', paused);
    pause.hidden = motion.matches;

    pause.textContent = isMyanmar
      ? (paused
          ? 'လိုဂိုများ ပြန်လည်ရွေ့လျားရန်'
          : 'လိုဂိုများ ရပ်ရန်')
      : (paused
          ? 'Resume logo animation'
          : 'Pause logo animation');
  }

  pause.addEventListener('click', () => {
    paused = !paused;
    updateLogoMotion();
  });
  motion.addEventListener('change', updateLogoMotion);
  updateLogoMotion();
}


// 03. PROJECT PHOTO LIGHTBOX (mouse, keyboard, touch swipe)
(() => {
  const buttons = Array.from(document.querySelectorAll('.project-zoom'));
  const viewer = document.getElementById('project-lightbox');
  if (!buttons.length || !viewer) return;
  const image = viewer.querySelector('.lightbox-image');
  const counter = viewer.querySelector('.lightbox-counter');
  let active = 0, previousFocus = null, touchStart = null;
  const show = i => {
    active = (i + buttons.length) % buttons.length;
    const original = buttons[active].querySelector('img');
    image.src = original.currentSrc || original.src;
    image.alt = original.alt;
    counter.textContent = `${active + 1} / ${buttons.length}`;
  };
  const close = () => {
    viewer.hidden = true;
    document.body.classList.remove('lightbox-open');
    image.removeAttribute('src');
    if (previousFocus) previousFocus.focus();
  };
  buttons.forEach((button, i) => button.addEventListener('click', () => {
    previousFocus = document.activeElement;
    show(i);
    viewer.hidden = false;
    document.body.classList.add('lightbox-open');
    viewer.querySelector('.lightbox-close').focus();
  }));
  viewer.querySelector('.lightbox-close').addEventListener('click', close);
  viewer.querySelector('.lightbox-prev').addEventListener('click', () => show(active - 1));
  viewer.querySelector('.lightbox-next').addEventListener('click', () => show(active + 1));
  viewer.addEventListener('click', e => { if (e.target === viewer) close(); });
  document.addEventListener('keydown', e => {
    if (viewer.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(active - 1);
    if (e.key === 'ArrowRight') show(active + 1);
    if (e.key === 'Tab') {
      const focusables = Array.from(viewer.querySelectorAll('button'));
      const idx = focusables.indexOf(document.activeElement);
      if (e.shiftKey && idx === 0) {e.preventDefault();focusables.at(-1).focus();}
      else if (!e.shiftKey && idx === focusables.length - 1) {e.preventDefault();focusables[0].focus();}
    }
  });
  viewer.addEventListener('touchstart', e => { touchStart = e.changedTouches[0].screenX; }, {passive:true});
  viewer.addEventListener('touchend', e => {
    if (touchStart === null) return;
    const dx = e.changedTouches[0].screenX - touchStart;
    if (Math.abs(dx) > 55) show(active + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, {passive:true});
})();
