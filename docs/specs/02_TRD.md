# TRD - Especificaciones Técnicas y Stack

## 1. Arquitectura del Sistema
- **Plataforma de Despliegue:** Cloudflare Pages (Arquitectura JAMstack estática pura).
- **Entorno de Ejecución:** Navegador cliente moderno (ES2022+), sin dependencias pesadas de runtime en servidor.
- **Formato:** Single Page Application (SPA) con navegación interna anclada y modales accesibles para privacidad y canal ARCO+.

## 2. Tecnologías y Librerías
- **HTML5:** Semántica estricta W3C, accesibilidad WCAG 2.1 AA (`aria-expanded`, `aria-modal`, `role="dialog"`).
- **CSS3 / Estilos:**
  - Tailwind CSS CDN v3.4 configurado con la paleta Andean Organic Craft (`forest-deep`, `terracotta`, `warm-wood`, etc.).
  - Tipografías Google Fonts: *Merriweather* (títulos / display) y *Plus Jakarta Sans* (cuerpo y controles UI).
  - Google Material Symbols Outlined para iconografía de construcción y legal.
- **JavaScript (Vanilla ES6+):**
  - Módulos en arquitectura limpia:
    - `i18n.js`: Diccionario multilingüe (`es`, `pt`, `en`), conmutador reactivo y persistencia `localStorage`.
    - `cotizador.js`: Lógica de estimación paramétrica de obras civiles según m2 y tipología de material.
    - `cmp.js`: Consent Management Platform con almacenamiento de consentimientos (`essential`, `analytics`, `marketing`) y evento de inicialización.
    - `arco.js`: Gestor del canal ARCO+, validación de formularios, generación de acuse con token y plazos legales (30d / 2d hábiles).
    - `main.js`: Controlador global del menú móvil, modales y enlaces rápidos.
- **Configuraciones Cloudflare:**
  - `_headers`: Políticas de seguridad `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
  - `_routes.json`: Enrutamiento estático Cloudflare Pages.

## 3. Seguridad y Protección de Datos
- Cifrado en tránsito HTTPS forzado por Cloudflare.
- Protección contra recolección no consentida de analítica mediante compuerta CMP.
- Sanitización de entradas del usuario antes de emisión de acuse o redirección.
