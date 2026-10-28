# DATA SCHEMA - Contratos de Datos y Esquemas

## 1. Objeto de Preferencias de Cookies (CMP)
```json
{
  "version": "1.0",
  "timestamp": "2026-10-28T17:35:00Z",
  "categories": {
    "necessary": true,
    "analytics": false,
    "marketing": false
  },
  "ip_anonymized": true,
  "status": "configured"
}
```

## 2. Objeto de Solicitud Derechos ARCO+ (Ley 21.719)
```json
{
  "id": "AO-ARCO-20261028-9841",
  "created_at": "2026-10-28T17:35:00Z",
  "applicant": {
    "full_name": "Nombre Solicitante",
    "rut": "12.345.678-9",
    "email": "solicitante@ejemplo.cl",
    "phone": "+56912345678",
    "is_representative": false
  },
  "request_details": {
    "right_type": "bloqueo", 
    "description": "Detalle fundamentado de la solicitud de bloqueo...",
    "legal_deadline_business_days": 2,
    "max_response_date": "2026-10-30"
  },
  "status": "received",
  "assigned_officer": "DPD Construcciones AO (construyeao@gmail.com)"
}
```

## 3. Parámetros del Cotizador
```json
{
  "project_type": "cabana_alpina | ampliacion | terraza_deck | quincho | obra_nueva",
  "approx_m2": 65,
  "materials": "roble_cipres | pino_impregnado | metalcon_termico | mixto_piedra",
  "location": "san_jose_de_maipo | pirque | puente_alto | la_florida",
  "estimated_uf_range": {
    "min": 1250,
    "max": 1600
  },
  "estimated_clp_range": {
    "min": 47500000,
    "max": 60800000
  }
}
```
