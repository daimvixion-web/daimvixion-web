
const form=document.querySelector("#leadForm");
if(form) form.addEventListener("submit",e=>{
 e.preventDefault();
 const d=new FormData(form);
 const text=`Hola DAiMViXiOn. Quiero información.%0A%0ANombre: ${encodeURIComponent(d.get("nombre"))}%0AEmpresa: ${encodeURIComponent(d.get("empresa"))}%0AWhatsApp: ${encodeURIComponent(d.get("telefono"))}%0ACorreo: ${encodeURIComponent(d.get("correo"))}%0AInterés: ${encodeURIComponent(d.get("interes"))}%0A%0AMensaje: ${encodeURIComponent(d.get("mensaje"))}`;
 window.open("https://wa.me/51991429347?text="+text,"_blank");
});
document.querySelectorAll("[data-year]").forEach(x=>x.textContent=new Date().getFullYear());
