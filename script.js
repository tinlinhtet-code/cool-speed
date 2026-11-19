// ============================================================
// 01. MOBILE NAVIGATION
// ============================================================
"use strict";
const toggle=document.getElementById('menu-toggle'),nav=document.getElementById('main-navigation');
if(toggle&&nav){const close=()=>{nav.classList.remove('active');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation menu')};toggle.addEventListener('click',()=>{const open=nav.classList.toggle('active');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!toggle.contains(e.target))close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});window.matchMedia('(min-width: 901px)').addEventListener('change',close)}

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
    pause.textContent = paused ? 'Resume logo animation' : 'Pause logo animation';
  }

  pause.addEventListener('click', () => {
    paused = !paused;
    updateLogoMotion();
  });
  motion.addEventListener('change', updateLogoMotion);
  updateLogoMotion();
}
