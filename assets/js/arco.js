/**
 * arco.js - Canal Formal de Ejercicio de Derechos ARCO+ (Ley 21.719)
 * - Derechos: Acceso, Rectificación, Cancelación, Oposición, Portabilidad y Bloqueo Temporal.
 * - Procedimiento prioritario de 2 días hábiles para Bloqueo Temporal (Fase 3).
 * - Plazo ordinario de 30 días hábiles.
 * - Emisión de Folio único y Acuse de Recibo descargable/imprimible.
 */

import { i18n } from './i18n.js';

class ArcoChannelManager {
  constructor() {
    this.modal = null;
    this.receiptModal = null;
    this.form = null;
  }

  init() {
    this.modal = document.getElementById('arcoModal');
    this.receiptModal = document.getElementById('arcoReceiptModal');
    this.form = document.getElementById('arcoForm');

    this.setupListeners();
  }

  setupListeners() {
    // Botones para abrir canal ARCO
    document.querySelectorAll('[data-action="open-arco"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal();
      });
    });

    // Botones para cerrar modal
    document.querySelectorAll('[data-action="close-arco"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.closeModal();
      });
    });

    // Botones para cerrar acuse
    document.querySelectorAll('[data-action="close-arco-receipt"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.closeReceiptModal();
      });
    });

    // Imprimir o guardar acuse
    const btnPrint = document.getElementById('arcoBtnPrint');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }

    // Selector de derecho para alertar el procedimiento de bloqueo de 2 días hábiles
    const selectRight = document.getElementById('arcoRightType');
    const alertStandard = document.getElementById('arcoAlertStandard');
    const alertPriority = document.getElementById('arcoAlertPriority');

    if (selectRight) {
      selectRight.addEventListener('change', () => {
        const val = selectRight.value;
        if (val === 'bloqueo') {
          alertStandard?.classList.add('hidden');
          alertPriority?.classList.remove('hidden');
        } else {
          alertStandard?.classList.remove('hidden');
          alertPriority?.classList.add('hidden');
        }
      });
    }

    // Envío del formulario
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  }

  openModal() {
    if (this.modal) {
      this.modal.classList.remove('hidden');
      this.modal.setAttribute('aria-hidden', 'false');
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.add('hidden');
      this.modal.setAttribute('aria-hidden', 'true');
    }
  }

  openReceiptModal(data) {
    if (this.receiptModal) {
      document.getElementById('receiptFolio').textContent = data.folio;
      document.getElementById('receiptName').textContent = data.name;
      document.getElementById('receiptRut').textContent = data.rut;
      document.getElementById('receiptEmail').textContent = data.email;
      document.getElementById('receiptRight').textContent = data.rightText;
      document.getElementById('receiptDate').textContent = data.submittedDate;
      document.getElementById('receiptDeadline').textContent = data.deadline;
      document.getElementById('receiptOfficer').textContent = "Delegado de Protección de Datos (construyeao@gmail.com)";

      this.receiptModal.classList.remove('hidden');
      this.receiptModal.setAttribute('aria-hidden', 'false');
    }
  }

  closeReceiptModal() {
    if (this.receiptModal) {
      this.receiptModal.classList.add('hidden');
      this.receiptModal.setAttribute('aria-hidden', 'true');
    }
  }

  calculateDeadline(isPriority) {
    const today = new Date();
    let businessDays = isPriority ? 2 : 30;
    let count = 0;
    let cur = new Date(today);

    while (count < businessDays) {
      cur.setDate(cur.getDate() + 1);
      const dayOfWeek = cur.getDay();
      // Excluir sábados (6) y domingos (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
    }

    return cur.toLocaleDateString(document.documentElement.lang || 'es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  handleSubmit() {
    const name = document.getElementById('arcoName')?.value.trim();
    const rut = document.getElementById('arcoRut')?.value.trim();
    const email = document.getElementById('arcoEmail')?.value.trim();
    const phone = document.getElementById('arcoPhone')?.value.trim() || 'No informado';
    const rightSelect = document.getElementById('arcoRightType');
    const rightVal = rightSelect?.value || 'acceso';
    const rightText = rightSelect?.options[rightSelect.selectedIndex]?.text || 'Acceso';
    const details = document.getElementById('arcoDetails')?.value.trim();

    if (!name || !rut || !email || !details) {
      alert('Por favor complete los campos obligatorios para tramitar su requerimiento formal.');
      return;
    }

    const isPriority = rightVal === 'bloqueo';
    const folioRandom = Math.floor(1000 + Math.random() * 9000);
    const dateCode = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const folio = `AO-ARCO-${dateCode}-${folioRandom}`;
    const deadline = this.calculateDeadline(isPriority);

    const submissionData = {
      folio,
      name,
      rut,
      email,
      phone,
      rightVal,
      rightText,
      submittedDate: new Date().toLocaleString(),
      deadline,
      isPriority
    };

    // Almacenar en historial local de auditoría (Fase 1 & 4)
    try {
      const records = JSON.parse(localStorage.getItem('ao_arco_requests') || '[]');
      records.push(submissionData);
      localStorage.setItem('ao_arco_requests', JSON.stringify(records));
    } catch (e) {
      console.warn('Could not cache ARCO request', e);
    }

    // Limpiar formulario y cerrar modal de carga
    this.form.reset();
    this.closeModal();

    // Desplegar Acuse Oficial
    this.openReceiptModal(submissionData);
  }
}

export const arco = new ArcoChannelManager();
