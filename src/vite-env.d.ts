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
  'salla-product-card': HTMLElement & { product?: unknown };
  'custom-salla-product-card': HTMLElement & { product?: unknown };
  'salla-product-options': HTMLElement;
  'fs-products-swiper': HTMLElement;
}
