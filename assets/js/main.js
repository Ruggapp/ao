/**
 * main.js - Inicializador principal de la plataforma Construcciones AO
 */

import { i18n } from './i18n.js';
import { cmp } from './cmp.js';
import { arco } from './arco.js';
import { estimator } from './cotizador.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de subsistemas
  i18n.init();
  cmp.init();
  arco.init();
  estimator.init();

  // Menú móvil
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
      }
    });

    // Cerrar menú al hacer click en enlaces
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Modal Política de Privacidad Art. 14 ter
  const privacyModal = document.getElementById('privacyModal');
  document.querySelectorAll('[data-action="open-privacy"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      privacyModal?.classList.remove('hidden');
    });
  });

  document.querySelectorAll('[data-action="close-privacy"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      privacyModal?.classList.add('hidden');
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
