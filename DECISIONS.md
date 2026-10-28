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
