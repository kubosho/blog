import GAOptout, { GAOptoutKeyStorage } from './ga-optout.mjs';

const gaId = window.__gaId__ || '';
const storage = new GAOptoutKeyStorage();
const optout = new GAOptout(storage);

window.gaOptout = optout || {};

function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function gaInitialize() {
  if (optout.isGADisabled()) {
    optout.gaId = gaId;
    optout.disableGA();
  }

  gtag('js', new Date());
  gtag('config', gaId);
}

gaInitialize();
