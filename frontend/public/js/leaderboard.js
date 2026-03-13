function refreshLeaderboard(){

const cards = document.querySelectorAll(".leaderboard-card");

cards.forEach(card=>{
card.classList.add("refresh-out");
});

setTimeout(()=>{
location.reload();
},600);

}