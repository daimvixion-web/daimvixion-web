
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

  // cardinal AI-core nodes (skipped on simplified stages, e.g. Cursos/Investigación)
  if (stage.dataset.simple !== "1"){
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
  }

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

/* --- IA CORE: floating processing words --- */
const PROCESS_WORDS = ["VISIÓN","DETECCIÓN","SEGUIMIENTO","CLASIFICACIÓN","LLM","DATA"];
function startFloatWords(stage){
  const wordList = stage.dataset.words ? stage.dataset.words.split(",") : PROCESS_WORDS;
  const spots = [
    {top:"8%",left:"6%"},{top:"14%",right:"4%"},{top:"48%",left:"2%"},
    {top:"48%",right:"2%"},{top:"85%",left:"10%"},{top:"85%",right:"8%"}
  ];
  let i = 0;
  function cycle(){
    stage.querySelectorAll(".float-word").forEach(w => w.remove());
    const word = document.createElement("div");
    word.className = "float-word";
    const spot = spots[i % spots.length];
    Object.assign(word.style, spot);
    word.textContent = wordList[i % wordList.length];
    stage.appendChild(word);
    requestAnimationFrame(() => word.classList.add("show"));
    setTimeout(() => word.classList.remove("show"), 1900);
    i++;
  }
  cycle();
  setInterval(cycle, 2500);
}
document.querySelectorAll(".motion-stage").forEach(startFloatWords);

/* --- Cursos: animated skill bars --- */
document.querySelectorAll(".skill-row").forEach(row => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting){ row.classList.add("lit"); io.unobserve(row); } });
  }, { threshold: 0.4 });
  io.observe(row);
});

/* --- Investigación: experiment model comparison bars + status ticker --- */
document.querySelectorAll(".model-row").forEach(row => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting){ row.classList.add("lit"); io.unobserve(row); } });
  }, { threshold: 0.4 });
  io.observe(row);
});
document.querySelectorAll(".ep-status").forEach(statusEl => {
  const states = ["EJECUTANDO EXPERIMENTO...", "VALIDANDO...", "RESULTADO ENCONTRADO"];
  const panel = statusEl.closest(".experiment-panel");
  let started = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started){
        started = true;
        let s = 0;
        statusEl.textContent = states[0];
        const iv = setInterval(() => {
          s++;
          if (s >= states.length){ clearInterval(iv); return; }
          statusEl.textContent = states[s];
        }, 1300);
        io.unobserve(panel);
      }
    });
  }, { threshold: 0.3 });
  if (panel) io.observe(panel);
});

/* --- Sports: cycling event callouts + mouse-reactive camera reticle --- */
document.querySelectorAll(".field").forEach(field => {
  const callout = field.querySelector(".event-callout");
  if (callout){
    const events = ["JUGADOR DETECTADO","SEGUIMIENTO DE BALÓN","TIRO DETECTADO","¡GOL!"];
    let ei = 0;
    setInterval(() => {
      callout.classList.remove("show");
      setTimeout(() => {
        callout.textContent = events[ei % events.length];
        callout.classList.add("show");
        ei++;
      }, 300);
    }, 2600);
    setTimeout(() => { callout.textContent = events[0]; callout.classList.add("show"); }, 500);
  }
  const reticle = field.querySelector(".cam-reticle");
  if (reticle){
    field.addEventListener("mousemove", (e) => {
      const rect = field.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      reticle.style.transform = `translate(${x - 35}px, ${y - 35}px)`;
      reticle.style.opacity = ".7";
    });
    field.addEventListener("mouseleave", () => { reticle.style.opacity = ".5"; });
  }
});
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

/* --- DAiMViXiOn unique scene runtime --- */
document.querySelectorAll(".scene").forEach(scene=>{
  const kind=scene.dataset.scene;
  const label=scene.dataset.label||"SISTEMA EN TIEMPO REAL";
  scene.insertAdjacentHTML("afterbegin",`<div class="scene-label">${label}</div><div class="scene-status">EN VIVO</div>`);
  if(kind==="mesh"){
    scene.insertAdjacentHTML("beforeend",`
      <div class="mesh-grid"></div><div class="mesh-core"></div>
      <span class="mesh-node" style="left:18%;top:28%"></span><span class="mesh-node" style="left:78%;top:26%;animation-delay:.7s"></span>
      <span class="mesh-node" style="left:25%;top:72%;animation-delay:1.4s"></span><span class="mesh-node" style="left:76%;top:73%;animation-delay:2s"></span>
      <i class="mesh-line" style="left:20%;top:30%;width:34%;transform:rotate(24deg)"></i>
      <i class="mesh-line" style="left:55%;top:32%;width:28%;transform:rotate(-12deg)"></i>
      <i class="mesh-line" style="left:27%;top:70%;width:31%;transform:rotate(-31deg)"></i>
    `);
  }
  if(kind==="vision"){
    scene.insertAdjacentHTML("beforeend",`<div class="vision-frame"><div class="vision-object"></div><div class="vision-scan"></div></div>`);
  }
  if(kind==="learning"){
    scene.insertAdjacentHTML("beforeend",`
      <div class="learning-track"></div>
      <div class="learning-node active">01</div><div class="learning-node">02</div><div class="learning-node">03</div><div class="learning-node">04</div><div class="learning-node">05</div>
      <div class="learning-card c1"><strong>COMPUTER VISION</strong><span>práctica · proyecto</span></div>
      <div class="learning-card c2"><strong>LLMs</strong><span>aplicación · evaluación</span></div>
    `);
  }
  if(kind==="research"){
    scene.insertAdjacentHTML("beforeend",`<div class="matrix">${[42,67,54,82,38,73,61,91,49,64,77,58].map(h=>`<i style="--h:${h}%"></i>`).join("")}</div><div class="research-axis"></div><div class="research-best">MEJOR MODELO · C · 93.8%</div>`);
  }
  if(kind==="sports"){
    scene.insertAdjacentHTML("beforeend",`<div class="pitch"><span class="player-dot" style="left:18%;top:58%"></span><span class="player-dot b" style="left:45%;top:32%"></span><span class="player-dot c" style="left:68%;top:63%"></span><span class="player-dot" style="left:78%;top:28%;animation-delay:1.4s"></span><span class="ball-live"></span></div>`);
  }
});

/* unique showcase visual renderer */
document.querySelectorAll(".case-visual").forEach(v=>{
 const k=v.dataset.case;
 const tag=v.dataset.tag||"VISIÓN IA";
 const body={};
 if(k==="avocado") body.html=`<div class="cv-pallet"></div>${[[22,25],[48,32],[69,23],[34,58],[62,64]].map((p,i)=>`<i class="cv-fruit" style="left:${p[0]}%;top:${p[1]}%;animation-delay:${i*.35}s"></i>`).join("")}`;
 if(k==="plant") body.html=`<div class="cv-leaf"></div><i class="cv-lesion" style="left:55%;top:34%"></i><i class="cv-lesion" style="left:66%;top:58%;animation-delay:.7s"></i><i class="cv-lesion" style="left:39%;top:67%;animation-delay:1.2s"></i>`;
 if(k==="pose") body.html=`<div class="cv-skeleton"></div>${[[42,18],[49,30],[57,40],[39,48],[63,50],[47,67],[67,78]].map((p,i)=>`<i class="cv-joint" style="left:${p[0]}%;top:${p[1]}%;animation-delay:${i*.18}s"></i>`).join("")}`;
 if(k==="industry") body.html=`<div class="cv-factory"></div><i class="cv-part" style="left:22%;top:43%"></i><i class="cv-part" style="left:55%;top:52%;animation-delay:1.3s"></i><i class="cv-part" style="left:70%;top:30%;animation-delay:2.2s"></i>`;
 if(k==="cattle") body.html=`<div class="cv-cattle"></div><i class="cv-cow" style="left:20%;top:48%"></i><i class="cv-cow" style="left:54%;top:34%;transform:scale(.8);animation-delay:1.2s"></i>`;
 if(k==="text") body.html=`<div class="cv-doc"></div><div class="cv-brain"></div><div class="cv-envelope"></div>`;
 if(k==="llm") body.html=`<div class="cv-brain"></div><div class="cv-envelope"></div><div class="cv-envelope" style="right:35%;top:24%;transform:rotate(6deg) scale(.75);animation:float 4s infinite"></div>`;
 if(k==="security") body.html=`<div class="cv-factory" style="inset:14% 10%"></div><span class="cv-joint" style="left:31%;top:30%"></span><span class="cv-joint" style="left:55%;top:54%;background:#ff5f7a"></span><span class="cv-joint" style="left:72%;top:33%;background:#ff5f7a"></span>`;
 v.innerHTML=`<span class="cv-tag">${tag}</span>${body.html||""}`;
});
