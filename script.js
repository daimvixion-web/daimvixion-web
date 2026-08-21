
const WA="51991429347";
function wa(message){
  const url="https://wa.me/"+WA+"?text="+encodeURIComponent(message);
  window.open(url,"_blank","noopener");
}
document.querySelectorAll("[data-wa]").forEach(b=>{
  b.addEventListener("click",()=>wa(b.dataset.wa));
});
