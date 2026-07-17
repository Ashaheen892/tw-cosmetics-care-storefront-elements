/// <reference types="vite/client" />

interface SallaLang {
  getLocale?: () => string;
}

interface SallaGlobal {
  lang?: SallaLang;
}

declare const Salla: SallaGlobal | undefined;

interface HTMLElementTagNameMap {
  'salla-products-slider': HTMLElement;
}
