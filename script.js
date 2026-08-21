
const WA="51991429347";
let pendingMessage="";
function openWhatsApp(message){pendingMessage=message;document.getElementById("termsModal")?.classList.add("open")}
function closeTerms(){document.getElementById("termsModal")?.classList.remove("open")}
function acceptTerms(){const c=document.getElementById("termsAccept");if(!c?.checked){alert("Debes aceptar los términos para continuar.");return}window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(pendingMessage),"_blank","noopener,noreferrer");closeTerms()}
document.querySelectorAll("[data-wa]").forEach(x=>x.addEventListener("click",e=>{e.preventDefault();openWhatsApp(x.dataset.wa)}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeTerms()});
