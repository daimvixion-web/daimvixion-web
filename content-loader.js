async function loadCollection(folder, targetId, template) {
  const target = document.getElementById(targetId);
  if (!target) return;
  try {
    const idx = await fetch(`${folder}/index.json`, {cache:"no-store"});
    if (!idx.ok) throw new Error("index");
    const files = await idx.json();
    const items = await Promise.all(files.map(f => fetch(`${folder}/${f}`, {cache:"no-store"}).then(r=>r.json())));
    const visible = items.filter(x => x.published !== false);
    target.innerHTML = visible.length ? visible.map(template).join("") : '<p class="muted">No hay contenido publicado todavía.</p>';
  } catch(e) {
    target.innerHTML = '<p class="muted">Contenido disponible próximamente.</p>';
  }
}
const esc = s => String(s ?? "").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
function courseCard(x){ return `<article class="card"><div class="icon">✦</div><h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p><p><b>Modalidad:</b> ${esc(x.modality)}</p></article>`; }
function projectCard(x){ return `<article class="card"><div class="icon">◉</div><h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p><p><b>${esc(x.category)}</b></p></article>`; }
function mediaCard(x){ return `<article class="card"><div class="icon">▣</div><h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p></article>`; }
