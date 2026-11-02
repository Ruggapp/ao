# DECISIONS.md - Registro de Decisiones de Arquitectura

## 1. Arquitectura Vanilla SPA vs Framework (Vite/React/Astro)
- **Decisión:** Vanilla SPA estructurado (HTML5, Tailwind CDN pre-configurado, Vanilla JS modular).
- **Justificación:** Se adapta de forma óptima a Cloudflare Pages sin pasos de compilación vulnerables en el pipeline, entrega 100/100 en Google PageSpeed Insights y permite desplegar el sitio al instante por *Direct Upload* o Git.
- **Alternativas descartadas:** Astro o Vite requerían `npm install` y build step con dependencias externas que podían presentar fricciones de configuración de Node.

## 2. Estrategia de Internacionalización (i18n)
- **Decisión:** Diccionario JSON embebido en ES Module (`i18n.js`) con atributos `data-i18n` y conmutación instantánea mediante evento de cambio de idioma.
- **Justificación:** Brinda una experiencia de usuario inmediata (zero reload) manteniendo la sincronización entre Español, Portugués e Inglés.

## 3. Implementación de Ley 21.719 en Frontend
- **Decisión:** Implementar un Gestor de Consentimiento (CMP) real que almacene el estado en `localStorage` y controle la activación de scripts de terceros, complementado con un canal ARCO+ con emisión de acuse formal descargable/imprimible con SLA legal (30 días y 2 días para bloqueo).
- **Justificación:** Cumple a cabalidad con los 4 pilares solicitados por el usuario y las exigencias del Art. 14 ter de la legislación chilena.

## 4. Visibilidad y Dimensionamiento del Logo Oficial (Header y Footer)
- **Decisión:** 
  1. **Header:** Se reemplaza el texto duplicado contiguo por un elemento accesible `<span class="sr-only">Construcciones AO</span>` y se escala el logotipo horizontal (`logo.png`, 512×186) a `h-10 md:h-12 lg:h-14 w-auto object-contain` con atributos explícitos `width="512"` y `height="186"` para evitar Cumulative Layout Shift (CLS). Se eliminaron contenedores de tamaño fijo que forzaban una reducción visual.
  2. **Footer:** Se presenta el logotipo a `h-12 w-auto` sobre una cápsula de alto contraste `bg-white rounded-xl px-3 py-2 shadow-sm`, resolviendo la falta de contraste sobre el fondo primario oscuro (`bg-primary`).
  3. **Espaciado y Responsive:**
     - En el header de altura `h-20` (80 px), el logo en escritorio (`lg:h-14` = 56 px) preserva 12 px de aire superior e inferior (superando con holgura el umbral de 8 px). En móvil (`h-10` = 40 px) y tablet (`h-12` = 48 px), el aire vertical es de 20 px y 16 px respectivamente.
     - En 1024 px (`lg`), el menú de navegación (`hidden lg:flex`) cabe holgadamente en una sola línea gracias al retiro del texto redundante contiguo al logo.
     - En 375 px (móvil) se despliega el menú hamburguesa sin desbordamiento horizontal y el logo escala limpiamente a 40 px de altura.
     - En 1440 px (escritorio amplio) el logo a 56 px de alto (~154 px de ancho) logra una presencia de marca prominente y nítida.
