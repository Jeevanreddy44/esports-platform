let tournamentsData = [];

/* Load tournaments data */

fetch("data/tournaments.json")
.then(res => res.json())
.then(data => {
tournamentsData = data;
});


function toggleChat(){

const chat = document.getElementById("chatbot");

if(chat.style.display === "block"){
chat.style.display = "none";
}else{
chat.style.display = "block";
}

}


function sendMessage(){

const input = document.getElementById("chatInput");
const text = input.value.toLowerCase().trim();

if(text === "") return;

const body = document.getElementById("chatBody");

/* show user message */

body.innerHTML += `<div class="user-msg">${input.value}</div>`;

/* typing animation */

const typing = document.createElement("div");
typing.className="bot-msg typing";
typing.innerHTML="🎮 ArenaAI is typing...";
body.appendChild(typing);

body.scrollTop = body.scrollHeight;

input.value="";


setTimeout(()=>{

typing.remove();

let reply = "I couldn't find tournaments for that game.";


/* search tournaments.json */

if(text.includes("valorant")){

reply = "<b>🎯 Valorant Tournaments</b><br>";

tournamentsData
.filter(t => t.game.toLowerCase().includes("valorant"))
.slice(0,3)
.forEach(t=>{
reply += `• ${t.title}<br>`;
});

}

else if(text.includes("bgmi") || text.includes("pubg")){

reply = "<b>🔫 BGMI / PUBG Tournaments</b><br>";

tournamentsData
.filter(t => t.game.toLowerCase().includes("bgmi") || t.game.toLowerCase().includes("pubg"))
.slice(0,3)
.forEach(t=>{
reply += `• ${t.title}<br>`;
});

}

else if(text.includes("free fire")){

reply = "<b>🔥 Free Fire Tournaments</b><br>";

tournamentsData
.filter(t => t.game.toLowerCase().includes("free fire"))
.slice(0,3)
.forEach(t=>{
reply += `• ${t.title}<br>`;
});

}

else if(text.includes("moba legends") || text.includes("mlbb")){

reply = "<b>⚔ Moba Legends Tournaments</b><br>";

tournamentsData
.filter(t => t.game.toLowerCase().includes("moba legends"))
.slice(0,3)
.forEach(t=>{
reply += `• ${t.title}<br>`;
});

}

else if(text.includes("pokemon")){

reply = "<b>⚡ Pokemon Unite Tournaments</b><br>";

tournamentsData
.filter(t => t.game.toLowerCase().includes("pokemon"))
.slice(0,3)
.forEach(t=>{
reply += `• ${t.title}<br>`;
});

}

else if(text.includes("tournaments") || text.includes("esports")){

reply = "<b>🌍 Upcoming Esports Tournaments</b><br>";

tournamentsData.slice(0,5).forEach(t=>{
reply += `• ${t.title} (${t.game})<br>`;
});

}


/* show response */

body.innerHTML += `<div class="bot-msg">${reply}</div>`;

body.scrollTop = body.scrollHeight;

},1200);

}