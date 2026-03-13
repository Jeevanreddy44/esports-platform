// dashboard.js — load tournaments from local JSON and render into the dashboard page
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('tournaments');
  if (!container) return;

  try {
    const res = await fetch('data/tournaments.json');
    const list = await res.json();
    container.innerHTML = '';
    list.forEach(t => {
      const card = document.createElement('div');
      card.className = 'card fade-up';
      card.innerHTML = `
        <h3>${t.title}</h3>
        <p class="meta">${t.game} • ${t.region} • ${t.format} • Prize ${t.prize}</p>
        <p class="meta">${t.start} — ${t.end}</p>
        <p class="mt-12"><a class="btn" href="${t.link}" target="_blank" rel="noopener">Join</a></p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load tournaments', err);
  }
});
