/**
 * cmp.js - Gestor de Consentimiento de Cookies (CMP) conforme a la Ley 21.719
 * Controla bloqueo de scripts hasta acción afirmativa y gestiona modal de preferencias.
 */

class CookieConsentManager {
  constructor() {
    this.storageKey = 'ao_cookie_consent_v1';
    this.consent = this.loadConsent();
  }

  loadConsent() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error reading cookie consent', e);
    }
    return null; // Null indica que aún no ha tomado decisión (requiere banner)
  }

  saveConsent(categories) {
    const consentData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      categories: {
        essential: true, // Siempre obligatorias
        analytics: Boolean(categories.analytics),
        marketing: Boolean(categories.marketing)
      },
      status: 'configured'
    };

    localStorage.setItem(this.storageKey, JSON.stringify(consentData));
    this.consent = consentData;
    this.applyConsent();
    this.hideBanner();
    this.hideModal();

    window.dispatchEvent(new CustomEvent('ao:consentUpdated', { detail: consentData }));
  }

  applyConsent() {
    if (!this.consent) return;

    // Si consintió analítica, permitimos o activamos el dispatcher correspondiente
    if (this.consent.categories.analytics) {
      window['dataLayer'] = window['dataLayer'] || [];
      window['dataLayer'].push({ event: 'consent_analytics_granted' });
      // Aquí se inicializarían los píxeles consentidos
    }

    if (this.consent.categories.marketing) {
      window['dataLayer'] = window['dataLayer'] || [];
      window['dataLayer'].push({ event: 'consent_marketing_granted' });
    }
  }

  init() {
    this.setupUI();
    if (!this.consent) {
      this.showBanner();
    } else {
      this.applyConsent();
    }
  }

  setupUI() {
    const banner = document.getElementById('cmpBanner');
    const modal = document.getElementById('cmpModal');
    const btnAccept = document.getElementById('cmpBtnAccept');
    const btnReject = document.getElementById('cmpBtnReject');
    const btnManage = document.getElementById('cmpBtnManage');
    const btnSave = document.getElementById('cmpBtnSave');
    const btnClose = document.getElementById('cmpBtnClose');
    const triggerButtons = document.querySelectorAll('[data-action="open-cmp"]');

    if (btnAccept) {
      btnAccept.addEventListener('click', () => {
        this.saveConsent({ analytics: true, marketing: true });
      });
    }

    if (btnReject) {
      btnReject.addEventListener('click', () => {
        this.saveConsent({ analytics: false, marketing: false });
      });
    }

    if (btnManage) {
      btnManage.addEventListener('click', () => {
        this.showModal();
      });
    }

    if (btnClose) {
      btnClose.addEventListener('click', () => {
        this.hideModal();
      });
    }

    if (btnSave) {
      btnSave.addEventListener('click', () => {
        const analytics = document.getElementById('cmpCheckAnalytics')?.checked || false;
        const marketing = document.getElementById('cmpCheckMarketing')?.checked || false;
        this.saveConsent({ analytics, marketing });
      });
    }

    triggerButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.showModal();
      });
    });
  }

  showBanner() {
    const banner = document.getElementById('cmpBanner');
    if (banner) {
      banner.classList.remove('hidden');
      banner.setAttribute('aria-hidden', 'false');
    }
  }

  hideBanner() {
    const banner = document.getElementById('cmpBanner');
    if (banner) {
      banner.classList.add('hidden');
      banner.setAttribute('aria-hidden', 'true');
    }
  }

  showModal() {
    const modal = document.getElementById('cmpModal');
    if (modal) {
      // Actualizar toggles según consent actual
      const checkAnalytics = document.getElementById('cmpCheckAnalytics');
      const checkMarketing = document.getElementById('cmpCheckMarketing');
      
      if (checkAnalytics) {
        checkAnalytics.checked = this.consent ? this.consent.categories.analytics : false;
      }
      if (checkMarketing) {
        checkMarketing.checked = this.consent ? this.consent.categories.marketing : false;
      }

      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  hideModal() {
    const modal = document.getElementById('cmpModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }
}

export const cmp = new CookieConsentManager();
