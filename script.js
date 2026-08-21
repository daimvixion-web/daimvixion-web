
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

/* --- SPECTACULAR CORE: builds the orbiting label ring + radar pings around .ai-orb --- */
const AI_LABELS = ["MACHINE LEARNING","DEEP LEARNING","COMPUTER VISION","LLMs","IA GENERATIVA","AUTOMATIZACIÓN"];

function buildMotionStage(stage){
  if (stage.dataset.enhanced) return;
  stage.dataset.enhanced = "1";

  const ring = document.createElement("div");
  ring.className = "label-ring";

  const slots = AI_LABELS.map((text, i) => {
    const angle = (360 / AI_LABELS.length) * i;
    const slot = document.createElement("div");
    slot.className = "orbit-slot";
    const pill = document.createElement("div");
    pill.className = "orbit-pill" + (i % 3 === 1 ? " alt" : i % 3 === 2 ? " alt2" : "");
    pill.textContent = text;
    slot.appendChild(pill);
    ring.appendChild(slot);
    return { slot, angle };
  });

  stage.appendChild(ring);

  function positionSlots(){
    const size = Math.min(stage.clientWidth, stage.clientHeight);
    const radius = Math.max(120, Math.min(230, size / 2 - 55));
    slots.forEach(({ slot, angle }) => {
      slot.style.transform = `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`;
    });
  }
  positionSlots();
  window.addEventListener("resize", positionSlots);

  for (let i = 0; i < 3; i++){
    const ping = document.createElement("div");
    ping.className = "ping-ring";
    ping.style.animationDelay = (i * 1.15) + "s";
    stage.appendChild(ping);
  }
}

document.querySelectorAll(".motion-stage").forEach(buildMotionStage);
