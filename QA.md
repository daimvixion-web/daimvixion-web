# QA técnico — DAiMViXiOn

## Estado
**Aprobado para siguiente fase: staging/publicación**, con una observación importante sobre los recursos visuales definitivos.

## Verificaciones realizadas

- [x] Las 5 páginas HTML existen: `index.html`, `ia-real.html`, `formacion.html`, `investigacion.html`, `media.html`.
- [x] `styles.css` y `script.js` existen y las referencias locales desde HTML no tienen rutas rotas.
- [x] Sintaxis de `script.js` validada con Node (`node --check`).
- [x] Los 5 HTML pasan un parseo estructural básico.
- [x] Navegación interna entre las cuatro áreas principales y el inicio está presente.
- [x] Los enlaces de WhatsApp externos usan `rel="noopener noreferrer"`.
- [x] Se mantuvo el flujo de confirmación antes de abrir WhatsApp.
- [x] Cada página tiene una escena principal distinta: mesh, visión, aprendizaje, investigación y deportes.
- [x] Los casos de IA Real tienen 9 tipos visuales distintos: avocado, plant, pose, security, health, industry, cattle, text y llm.
- [x] Se corrigió la duplicación visual del caso de salud, que usaba el mismo tipo `plant`.
- [x] La navegación móvil ya no desaparece por completo: se mantiene visible y desplazable horizontalmente.
- [x] Existe `prefers-reduced-motion` para reducir animaciones cuando el sistema lo solicita.

## Observación antes de producción

El paquete no contiene una carpeta de imágenes/assets externos. Las escenas actuales son visualizaciones CSS/JS y no incorporan directamente las imágenes de referencia compartidas durante la conversación.

Esto **no bloquea la demo ni el funcionamiento del sitio**, pero sí es el siguiente trabajo recomendado si las imágenes reales deben aparecer como casos visuales finales.

## Siguiente fase

1. Abrir el ZIP en un hosting/staging.
2. Probar en Chrome/Safari/Firefox y móvil real.
3. Confirmar los textos, número de WhatsApp y dominio definitivo.
4. Incorporar las imágenes finales de los casos donde corresponda.
5. Añadir SEO, favicon, Open Graph, sitemap y analítica.
6. Publicar.
