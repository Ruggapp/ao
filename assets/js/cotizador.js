/**
 * cotizador.js - Lógica interactiva de cálculo presupuestario para obras de cordillera
 * Incluye desglose por tipo de proyecto, superficie m2, materiales y zona geográfica.
 */

class ProjectEstimator {
  constructor() {
    this.typeSelect = null;
    this.areaInput = null;
    this.areaValueDisplay = null;
    this.materialSelect = null;
    this.zoneSelect = null;
    this.resultUf = null;
    this.resultClp = null;
    this.btnWhatsapp = null;

    // Valores promedio referenciales (UF base por m2)
    // 1 UF ~ $38.000 CLP referencial
    this.UF_VALUE = 38000;

    this.baseRates = {
      cabana: { min: 20, max: 28 },      // UF por m2
      ampliacion: { min: 16, max: 24 },  // UF por m2
      deck: { min: 4, max: 8 },          // UF por m2
      civil: { min: 12, max: 20 }        // UF por m2
    };

    this.materialMultipliers = {
      premium: 1.25,
      standard: 1.0,
      rustic: 0.9
    };

    this.zoneMultipliers = {
      sjm: 1.10,     // Dificultad de acceso cordillera
      pirque: 1.05,
      puente_alto: 1.0,
      la_florida: 1.0
    };
  }

  init() {
    this.typeSelect = document.getElementById('calcProjectType');
    this.areaInput = document.getElementById('calcArea');
    this.areaValueDisplay = document.getElementById('calcAreaValue');
    this.materialSelect = document.getElementById('calcMaterial');
    this.zoneSelect = document.getElementById('calcZone');
    this.resultUf = document.getElementById('calcResultUF');
    this.resultClp = document.getElementById('calcResultCLP');
    this.btnWhatsapp = document.getElementById('calcBtnWhatsapp');

    this.setupListeners();
    this.calculate();
  }

  setupListeners() {
    if (this.areaInput && this.areaValueDisplay) {
      this.areaInput.addEventListener('input', () => {
        this.areaValueDisplay.textContent = `${this.areaInput.value} m²`;
        this.calculate();
      });
    }

    [this.typeSelect, this.materialSelect, this.zoneSelect].forEach((el) => {
      if (el) {
        el.addEventListener('change', () => this.calculate());
      }
    });

    if (this.btnWhatsapp) {
      this.btnWhatsapp.addEventListener('click', (e) => {
        e.preventDefault();
        this.sendToWhatsapp();
      });
    }
  }

  calculate() {
    if (!this.typeSelect || !this.areaInput || !this.materialSelect || !this.zoneSelect) return;

    const projectType = this.typeSelect.value || 'cabana';
    const area = parseFloat(this.areaInput.value) || 50;
    const material = this.materialSelect.value || 'standard';
    const zone = this.zoneSelect.value || 'sjm';

    const base = this.baseRates[projectType] || this.baseRates.cabana;
    const matMult = this.materialMultipliers[material] || 1.0;
    const zoneMult = this.zoneMultipliers[zone] || 1.0;

    const totalMinUF = Math.round(area * base.min * matMult * zoneMult);
    const totalMaxUF = Math.round(area * base.max * matMult * zoneMult);

    const totalMinCLP = Math.round(totalMinUF * this.UF_VALUE);
    const totalMaxCLP = Math.round(totalMaxUF * this.UF_VALUE);

    const formatterCLP = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    });

    if (this.resultUf) {
      this.resultUf.textContent = `${totalMinUF.toLocaleString()} - ${totalMaxUF.toLocaleString()} UF`;
    }

    if (this.resultClp) {
      this.resultClp.textContent = `${formatterCLP.format(totalMinCLP)} - ${formatterCLP.format(totalMaxCLP)}`;
    }
  }

  sendToWhatsapp() {
    const projectType = this.typeSelect?.options[this.typeSelect.selectedIndex]?.text || '';
    const area = this.areaInput?.value || '';
    const material = this.materialSelect?.options[this.materialSelect.selectedIndex]?.text || '';
    const zone = this.zoneSelect?.options[this.zoneSelect.selectedIndex]?.text || '';
    const ufRange = this.resultUf?.textContent || '';
    const clpRange = this.resultClp?.textContent || '';

    const text = `Hola Construcciones AO, estuve utilizando su cotizador web:\n` +
      `• Proyecto: ${projectType}\n` +
      `• Superficie: ${area} m²\n` +
      `• Materialidad: ${material}\n` +
      `• Ubicación: ${zone}\n` +
      `• Estimación: ${ufRange} (${clpRange})\n\n` +
      `Quisiera coordinar una visita técnica o recibir una propuesta formal. ¡Muchas gracias!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/56979925812?text=${encoded}`, '_blank');
  }
}

export const estimator = new ProjectEstimator();
