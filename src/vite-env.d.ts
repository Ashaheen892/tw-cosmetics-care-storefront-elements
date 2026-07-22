/// <reference types="vite/client" />

interface SallaLang {
  getLocale?: () => string;
}

interface SallaGlobal {
  lang?: SallaLang;
}

declare const Salla: SallaGlobal | undefined;

declare module '*.css?inline' {
  const css: string;
  export default css;
}
