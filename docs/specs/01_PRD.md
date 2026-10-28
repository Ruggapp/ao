# PRD - Plataforma Web Construcciones AO (Cloudflare Pages)

## 1. Visión y Resumen del Producto
Sitio web corporativo y de cotización para **INGENIERÍA EN PROYECTOS DE OBRAS CIVILES SUSTENTABLES Y EDIFICACIÓN AO** (Nombre comercial: **Construcciones AO**), orientado a clientes y propietarios de viviendas y obras civiles en la zona cordillerana de San José de Maipo, Pirque, Puente Alto y La Florida (Región Metropolitana de Chile).

El portal combina una estética andina-orgánica de alta gama con herramientas interactivas de presupuesto y un estándar pionero de cumplimiento legal integral con la **Ley 21.719** de Protección de Datos Personales de Chile.

## 2. Requerimientos Principales

### 2.1 Despliegue en Cloudflare Pages
- Estructura optimizada para Cloudflare Pages (*Direct Upload* o Git CI/CD) sin dependencia de compilador Node pesado.
- Cero tiempo de arranque, CDN perimetral global ultra veloz y configuración de headers de seguridad HTTP en `_headers`.

### 2.2 Soporte Multiidioma (i18n)
- 3 idiomas soportados con persistencia en `localStorage`:
  1. **Español (`es`)** [Predeterminado]
  2. **Portugués (`pt`)**
  3. **Inglés (`en`)**
- Selector visual accesible en el navbar y sincronización instantánea de textos sin recargar la página.

### 2.3 Identidad Corporativa y Marca
- **Razón Social:** INGENIERÍA EN PROYECTOS DE OBRAS CIVILES SUSTENTABLES Y EDIFICACIÓN AO
- **RUT:** 78.154.344-6
- **Nombre comercial:** Construcciones AO
- **Correo oficial:** construyeao@gmail.com
- **Teléfono directo / WhatsApp:** +56 9 7992 5812
- **Zonas de cobertura prioritarias:** San José de Maipo, Pirque, Puente Alto y La Florida (Región Metropolitana).
- **Recursos visuales:** Logo corporativo oficial y fotografía hero cinemática del Cajón del Maipo.

### 2.4 Cumplimiento Normativo Ley 21.719 (4 Fases Operativas)
1. **Fase 1: Auditoría y Clasificación de Datos**
   - Transparencia en recolección de formularios (cotizador y contacto).
   - Base de licitud (consentimiento explícito, ejecución de medidas precontractuales).
2. **Fase 2: Rediseño Legal y Consentimiento Granular**
   - Política de Privacidad Web conforme al Artículo 14 ter (12 exigencias legales).
   - Formularios sin casillas premarcadas con checkboxes desagregados.
   - Gestor de Consentimiento de Cookies (CMP) interactivo que bloquea scripts no esenciales antes de la acción afirmativa.
3. **Fase 3: Canal ARCO+ e Infraestructura de Seguridad**
   - Formulario interactivo para Derechos ARCO+ (Acceso, Rectificación, Cancelación, Oposición, Portabilidad y Bloqueo Temporal).
   - Generación de acuse de recibo con código de seguimiento único (`AO-ARCO-XXXXX`).
   - SLA y plazos legales: 30 días hábiles para respuesta general y procedimiento prioritario de 2 días hábiles para bloqueo temporal.
   - Resguardo técnico TLS y política estricta de retención de datos.
4. **Fase 4: Gobernanza y Delegado de Protección de Datos (DPD)**
   - Publicación transparente del canal del DPD (`construyeao@gmail.com`).
   - Registro visible del Modelo de Prevención de Infracciones.

### 2.5 Módulos y Funcionalidades
- **Hero & Métricas:** Propuesta de valor cordillerana, 15 años de trayectoria, 200+ obras y rating 5.0 Google.
- **Servicios:** Arquitectura sustentable, obras civiles, cabañas alpinas, decks, quinchos y remodelaciones.
- **Cotizador Interactivo:** Estimación de obra con cálculo en tiempo real y opción de envío directo por WhatsApp o correo.
- **Canal ARCO+ & Privacidad:** Centro interactivo de privacidad, consulta de derechos y formulario de ejercicio con acuse.
- **Gestor CMP Flotante:** Centro de preferencias de cookies accesible permanentemente en pantalla.
