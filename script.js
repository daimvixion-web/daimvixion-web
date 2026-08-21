
const WA="51991429347";
let pendingMessage="";
function openWhatsApp(message){
  pendingMessage=message;
  document.getElementById("termsModal").classList.add("open");
}
function closeTerms(){document.getElementById("termsModal").classList.remove("open")}
function acceptTerms(){
  const ok=document.getElementById("termsAccept");
  if(!ok.checked){alert("Debes aceptar los términos para continuar.");return}
  window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(pendingMessage)," _blank".trim(),"noopener");
  closeTerms();
}
document.querySelectorAll("[data-wa]").forEach(b=>{
  b.addEventListener("click",e=>{e.preventDefault();openWhatsApp(b.dataset.wa)})
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeTerms()});

/* ============================================================
   SPECTACULAR SYSTEMS v4
   ============================================================ */

/* --- AI CORE: cardinal interactive nodes + radar pings + cursor sparks --- */
const CORE_NODES = [
  { pos:"top",    cls:"vision", label:"VISIÓN", kicker:"VISIÓN / CAPACIDADES", items:["Detección de objetos","Seguimiento (Tracking)","Estimación de pose","Clasificación"] },
  { pos:"left",   cls:"data",   label:"DATA",   kicker:"DATA / CAPACIDADES",   items:["Dataset","Variables (Features)","Analítica","Pipelines"] },
  { pos:"right",  cls:"model",  label:"MODELO", kicker:"MODELO / CAPACIDADES", items:["Deep Learning","Computer Vision","LLMs","IA Generativa"] },
  { pos:"bottom", cls:"action", label:"ACCIÓN", kicker:"ACCIÓN / CAPACIDADES", items:["Automatización","Reportes","Alertas","Integración"] }
];

function buildMotionStage(stage){
  if (stage.dataset.enhanced) return;
  stage.dataset.enhanced = "1";

  // radar pings
  for (let i = 0; i < 3; i++){
    const ping = document.createElement("div");
    ping.className = "ping-ring";
    ping.style.animationDelay = (i * 1.15) + "s";
    stage.appendChild(ping);
  }

  // cardinal AI-core nodes
  CORE_NODES.forEach(n => {
    const node = document.createElement("div");
    node.className = "ai-core-node " + n.pos + " " + n.cls;
    node.innerHTML = `
      <span class="node-dot"></span><span class="node-label">${n.label}</span>
      <div class="node-line"></div>
      <div class="node-panel">
        <div class="panel-kicker">${n.kicker}</div>
        <ul>${n.items.map(i => `<li>${i}</li>`).join("")}</ul>
      </div>`;
    node.addEventListener("click", () => {
      const wasActive = node.classList.contains("active");
      stage.querySelectorAll(".ai-core-node.active").forEach(a => a.classList.remove("active"));
      if (!wasActive) node.classList.add("active");
    });
    stage.appendChild(node);
  });

  // cursor-follow sparks (throttled)
  let lastSpark = 0;
  stage.addEventListener("mousemove", (e) => {
    const now = performance.now();
    if (now - lastSpark < 70) return;
    lastSpark = now;
    const rect = stage.getBoundingClientRect();
    const spark = document.createElement("div");
    spark.className = "cursor-spark";
    const size = 3 + Math.random() * 3;
    spark.style.width = size + "px";
    spark.style.height = size + "px";
    spark.style.left = (e.clientX - rect.left) + "px";
    spark.style.top = (e.clientY - rect.top) + "px";
    stage.appendChild(spark);
    setTimeout(() => spark.remove(), 950);
  });
}

document.querySelectorAll(".motion-stage").forEach(buildMotionStage);

/* --- scroll-lit sequences: .flow .step / .pixels-flow .pf-step / .research-flow .rf-node --- */
function litOnScroll(selector, itemSelector, staggerMs){
  document.querySelectorAll(selector).forEach(container => {
    const items = container.querySelectorAll(itemSelector);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          items.forEach((item, i) => setTimeout(() => item.classList.add("lit"), i * staggerMs));
          io.unobserve(container);
        }
      });
    }, { threshold: 0.35 });
    io.observe(container);
  });
}
litOnScroll(".flow", ".step", 140);
litOnScroll(".pixels-flow", ".pf-step", 160);
litOnScroll(".research-flow", ".rf-node", 160);

/* --- WE BUILD word reveal --- */
document.querySelectorAll(".build-words").forEach(el => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){ el.classList.add("lit"); io.unobserve(el); }
    });
  }, { threshold: 0.4 });
  io.observe(el);
});

/* --- count-up numbers: <span data-count-to="98"> --- */
document.querySelectorAll("[data-count-to]").forEach(el => {
  const target = parseFloat(el.dataset.countTo);
  const decimals = el.dataset.countTo.includes(".") ? el.dataset.countTo.split(".")[1].length : 0;
  const suffix = el.dataset.suffix || "";
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(el);
      const duration = 1400, start = performance.now();
      function tick(now){
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  io.observe(el);
});

/* --- Cursos: audience selector tabs --- */
document.querySelectorAll(".audience-tabs").forEach(tabGroup => {
  const tabs = tabGroup.querySelectorAll(".audience-tab");
  const panels = document.querySelectorAll(".audience-panel");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      panels.forEach(p => p.classList.toggle("active", p.dataset.audience === tab.dataset.audience));
    });
  });
});
