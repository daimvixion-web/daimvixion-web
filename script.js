
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
