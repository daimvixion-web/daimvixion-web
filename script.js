
const WA="51991429347";
let pendingMessage="";
function openWhatsApp(message){pendingMessage=message;document.getElementById("termsModal")?.classList.add("open")}
function closeTerms(){document.getElementById("termsModal")?.classList.remove("open")}
function acceptTerms(){const c=document.getElementById("termsAccept");if(!c?.checked){alert("Debes aceptar los términos para continuar.");return}window.open("https://web.whatsapp.com/send?phone="+WA+"&text="+encodeURIComponent(pendingMessage), "_blank", "noopener,noreferrer")}
document.querySelectorAll("[data-wa]").forEach(x=>x.addEventListener("click",e=>{e.preventDefault();openWhatsApp(x.dataset.wa)}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeTerms()});

/* ============================================================
   PROYECTOS (ia-real.html): visual propio por categoría
   ============================================================ */
function handleImgError(img){
  img.onerror = null;
  const box = img.closest(".case-visual");
  if (!box) return;
  const src = img.getAttribute("src");
  img.remove();
  box.insertAdjacentHTML("beforeend", `<div class="img-missing-note">Falta subir la imagen: <code>${src}</code></div>`);
}

const CASE_BUILDERS = {
  avocado(box){
    box.innerHTML = `<img src="assets/conteo-paltas.jpg" alt="Conteo automático de paltas con visión por computador" onerror="handleImgError(this)">
      <span class="case-live"><i></i>SISTEMA REAL</span>`;
  },
  plant(box){
    box.innerHTML = `<img src="assets/diagnostico-cultivo.jpg" alt="Diagnóstico de enfermedades en cultivos" onerror="handleImgError(this)">
      <span class="case-live"><i></i>SISTEMA REAL</span>`;
  },
  pose(box){
    box.innerHTML = `<img src="assets/pose-deteccion.jpg" alt="Detección de pose y análisis de movimiento" onerror="handleImgError(this)">
      <span class="case-live"><i></i>SISTEMA REAL</span>`;
  },
  industry(box){
    box.innerHTML = `<img src="assets/industria-piezas.jpg" alt="Inspección de calidad industrial en línea" onerror="handleImgError(this)">
      <span class="case-live"><i></i>SISTEMA REAL</span>`;
  },
  cattle(box){
    box.innerHTML = `<img src="assets/ganado.jpg" alt="Monitoreo inteligente de ganado" onerror="handleImgError(this)">
      <span class="case-live"><i></i>SISTEMA REAL</span>`;
  },
  llm(box){
    box.innerHTML = `<img src="assets/llm-automatizacion.jpg" alt="LLMs y automatización de procesos" onerror="handleImgError(this)">
      <span class="case-live"><i></i>SISTEMA REAL</span>`;
  },
  security(box){
    box.classList.add("security");
    box.innerHTML = `<span class="case-dev">EN DESARROLLO</span>
      <div class="sweep"></div>
      <div class="alert-blip" style="left:38%;top:44%"></div>
      <div class="det-readout" style="color:var(--pink)">MONITOREO · ACTIVO<br>INCIDENTE · EN EVALUACIÓN</div>`;
  },
  health(box){
    box.classList.add("health");
    box.innerHTML = `<span class="case-dev">EN DESARROLLO</span>
      <svg viewBox="0 0 300 220" preserveAspectRatio="none"><path d="M0,140 L60,140 L80,80 L100,180 L120,40 L140,140 L300,140"/></svg>
      <div class="readout">SEÑAL · ESTABLE<br>ANÁLISIS · EN CURSO</div>`;
  },
  text(box){
    box.classList.add("text-nlp");
    box.innerHTML = `<span class="case-dev">EN DESARROLLO</span>
      <div class="tline" style="width:92%"><i></i></div>
      <div class="tline hl" style="width:64%"><i style="animation-delay:.5s"></i></div>
      <div class="tline" style="width:78%"><i style="animation-delay:1s"></i></div>
      <div class="tag-out">ENTIDAD EXTRAÍDA: "FACTURA · 12/08"</div>`;
  }
};

document.querySelectorAll(".case-visual").forEach(box => {
  const builder = CASE_BUILDERS[box.dataset.case];
  if (builder) builder(box);
});

/* --- Cursos: selector de audiencia --- */
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

/* --- revelado por scroll: .flow .step / .research-flow .rf-node / .model-row / .skill-row --- */
function revealOnScroll(selector, itemSelector, stagger){
  document.querySelectorAll(selector).forEach(container => {
    const items = itemSelector ? container.querySelectorAll(itemSelector) : [container];
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          items.forEach((item, i) => setTimeout(() => item.classList.add("lit"), i * stagger));
          io.unobserve(container);
        }
      });
    }, { threshold: 0.3 });
    io.observe(container);
  });
}
revealOnScroll(".process-track .track-grid", ".track-cell, .track-dot", 130);
document.querySelectorAll(".experiment-panel").forEach(panel => {
  const rows = panel.querySelectorAll(".model-row");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        rows.forEach((r,i) => setTimeout(() => r.classList.add("lit"), i*180));
        io.unobserve(panel);
      }
    });
  }, { threshold: 0.3 });
  io.observe(panel);
});

/* --- Investigación: ticker de estado del experimento --- */
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
      }
    });
  }, { threshold: 0.3 });
  if (panel) io.observe(panel);
});

/* --- contador ascendente: [data-count-to] --- */
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
  }, { threshold: 0.4 });
  io.observe(el);
});

/* --- Deportes: eventos en vivo + cámara que sigue el cursor --- */
document.querySelectorAll(".sport-hud .field").forEach(field => {
  const callout = field.querySelector(".event-callout");
  if (callout){
    const events = ["JUGADOR DETECTADO","SEGUIMIENTO DE BALÓN","TIRO DETECTADO","¡GOL!"];
    let ei = 0;
    setInterval(() => {
      callout.classList.remove("show");
      setTimeout(() => { callout.textContent = events[ei % events.length]; callout.classList.add("show"); ei++; }, 300);
    }, 2600);
    setTimeout(() => { callout.textContent = events[0]; callout.classList.add("show"); }, 500);
  }
  const reticle = field.querySelector(".cam-reticle");
  if (reticle){
    field.addEventListener("mousemove", (e) => {
      const rect = field.getBoundingClientRect();
      reticle.style.transform = `translate(${e.clientX - rect.left - 35}px, ${e.clientY - rect.top - 35}px)`;
      reticle.style.opacity = ".7";
    });
    field.addEventListener("mouseleave", () => { reticle.style.opacity = ".5"; });
  }
});
