// home.js — render featured India tournaments on homepage

document.addEventListener('DOMContentLoaded', async () => {

const listEl = document.getElementById('upcoming-indiatours');

if (!listEl) return;

try {

const res = await fetch('data/tournaments.json');
const all = await res.json();

const india = all.filter(t =>
(t.region && t.region.toLowerCase().includes('india')) ||
['BGMI','Valorant',' Legends','PUBG','CS2'].includes(t.game)
);

if (!india.length) {

listEl.innerHTML = '<p class="meta">No upcoming India events found.</p>';
return;

}

listEl.innerHTML = '';

india.slice(0,6).forEach(t => {

const row = document.createElement('div');
row.className = 'card fade-up';
row.style.padding = '12px';

row.innerHTML = `
<strong>${t.title}</strong>
<div class="meta">${t.game} • ${t.format} • ${t.region} • ${t.start} — ${t.end}</div>
<div style="margin-top:8px">
<a class="btn" href="${t.link}" target="_blank" rel="noopener">Register / Details</a>
</div>
`;

listEl.appendChild(row);

});

} catch (err) {

console.error('failed to load tournaments', err);
listEl.innerHTML = '<p class="meta">Failed to load tournaments.</p>';

}


/* ================= SLIDER ================= */

let slides = document.querySelector(".slides");
let slide = document.querySelectorAll(".slide");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let dotsContainer = document.querySelector(".dots");

let index = 0;

slide.forEach((_,i)=>{

let dot = document.createElement("span");

dot.addEventListener("click",()=>moveSlide(i));

dotsContainer.appendChild(dot);

});

function updateDots(){

let dots = document.querySelectorAll(".dots span");

dots.forEach(d=>d.classList.remove("active"));

dots[index].classList.add("active");

}

function moveSlide(i){

index = i;

slides.style.transform = `translateX(${-index*100}%)`;

updateDots();

}

next.onclick = ()=>{

index++;

if(index >= slide.length) index = 0;

moveSlide(index);

};

prev.onclick = ()=>{

index--;

if(index < 0) index = slide.length-1;

moveSlide(index);

};

setInterval(()=>{

index++;

if(index >= slide.length) index = 0;

moveSlide(index);

},4000);

updateDots();


/* ================= LOGIN SYSTEM ================= */

const user = JSON.parse(localStorage.getItem("loggedUser"));

const username = document.getElementById("username");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");

if(user){

username.innerText = "Welcome " + user.name;

loginBtn.style.display = "none";
signupBtn.style.display = "none";
logoutBtn.style.display = "inline-block";

}else{

username.innerText = "";

loginBtn.style.display = "inline-block";
signupBtn.style.display = "inline-block";
logoutBtn.style.display = "none";

}


/* ================= LOGOUT ================= */

window.logout = function(){

localStorage.removeItem("loggedUser");

alert("Logged out successfully!");

window.location.href = "login.html";

};

});