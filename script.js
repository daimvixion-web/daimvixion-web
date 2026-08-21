const WA="51991429347";let pending="";
function askWhatsApp(m){pending=m;const x=document.getElementById("termsModal");if(x)x.style.display="grid"}
function closeTerms(){const x=document.getElementById("termsModal");if(x)x.style.display="none"}
function continueWhatsApp(){const c=document.getElementById("termsAccept");if(!c.checked){alert("Acepta los términos de contacto para continuar.");return}window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(pending),"_blank","noopener");closeTerms()}
document.querySelectorAll("[data-wa]").forEach(x=>x.addEventListener("click",e=>{e.preventDefault();askWhatsApp(x.dataset.wa)}));