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

// ============================================================
// 03. CUSTOMERS LOGO SLIDER
// ============================================================
const track=document.getElementById('logo-track');
if(track&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){Array.from(track.children).forEach(item=>{const clone=item.cloneNode(true);clone.setAttribute('aria-hidden','true');
const image=clone.querySelector('img');
if(image)image.alt='';track.appendChild(clone)});track.classList.add('is-animated')}

// ============================================================
// 04. QUOTATION FORM (opens the visitor's email app)
// To send directly without an email app, connect a form backend.
// ============================================================
const survey=document.getElementById('survey-form');
if(survey)survey.addEventListener('submit',event=>{event.preventDefault();
if(!survey.reportValidity())return;
const data=new FormData(survey);
const lines=['COOL SPEED - Free Site Survey Request','Full Name: '+data.get('name'),'Phone: '+data.get('phone'),'Project Address: '+data.get('address'),'Area: '+(data.get('area')||'Not provided'),'Building Type: '+data.get('buildingType'),'Thickness: '+data.get('thickness'),'More Details: '+(data.get('details')||'None')];
const subject=encodeURIComponent('COOL SPEED - Site Survey Request');
const body=encodeURIComponent(lines.join('\n'));document.getElementById('form-note').textContent='Your email app will open. Please review the message and press Send. This website has not sent it automatically.';window.location.href='mailto:coolspeed1st@gmail.com?subject='+subject+'&body='+body});
