import { LitElement, css, html, nothing, unsafeCSS, type CSSResult, type TemplateResult } from 'lit';
import Swiper, { type Swiper as SwiperInstance } from 'swiper';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import swiperCore from 'swiper/css?inline';
import swiperNav from 'swiper/css/navigation?inline';
import swiperPag from 'swiper/css/pagination?inline';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { localizedString, getPageLocale, type LocaleValue } from '../../utils/localizedString.js';

/* ---- inlined: utils/fsTheme.ts ---- */
/**
 * Reliable light/dark + store-primary tokens for Lit shadow roots.
 * `:host-context()` is fragile (iframe demos / Firefox), so we also push
 * CSS variables onto hosts and `.fs-section` nodes when the document theme changes.
 */

type FsThemeMode = 'light' | 'dark';

const PRIMARY =
  'var(--color-primary, var(--primary-color, var(--color-main, #64748b)))';

function detectFsTheme(): FsThemeMode {
  if (typeof document === 'undefined') return 'light';
  const root = document.documentElement;
  const attr = (
    root.getAttribute('data-theme') ||
    root.getAttribute('data-mode') ||
    ''
  ).toLowerCase();
  if (attr === 'dark') return 'dark';
  if (attr === 'light') return 'light';
  if (root.classList.contains('dark') || document.body?.classList.contains('dark')) {
    return 'dark';
  }
  try {
    const stored = localStorage.getItem('salla_demo_theme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    /* ignore */
  }
  return 'light';
}

/** CSS variables that must win inside component trees. */
function fsThemeVars(mode: FsThemeMode = detectFsTheme()): Record<string, string> {
  const dark = mode === 'dark';
  return {
    '--fs-store-primary': PRIMARY,
    '--accent-color': PRIMARY,
    '--button-bg': PRIMARY,
    '--button-color': '#ffffff',
    '--text-color': dark ? '#ffffff' : '#000000',
    '--muted-color': dark ? '#aaaaaa' : '#666666',
    '--card-bg': dark ? '#0f0f0f' : '#ffffff',
    '--fs-surface': dark ? '#0a0a0a' : '#f0f0f0',
    '--border-color': dark ? 'rgba(255, 255, 255, 0.12)' : '#e5e7eb',
    '--section-bg': 'transparent',
  };
}

function applyVars(el: HTMLElement, vars: Record<string, string>): void {
  for (const [key, value] of Object.entries(vars)) {
    el.style.setProperty(key, value);
  }
  el.setAttribute('data-fs-theme', detectFsTheme());
}

function walkAndApply(root: Document | ShadowRoot, vars: Record<string, string>): void {
  root.querySelectorAll('.fs-section').forEach((node) => {
    applyVars(node as HTMLElement, vars);
  });
}

/** Push theme tokens onto every mounted kit host / section. */
function applyFsThemeToDocument(mode: FsThemeMode = detectFsTheme()): void {
  if (typeof document === 'undefined') return;
  const vars = fsThemeVars(mode);
  walkAndApply(document, vars);

  document.querySelectorAll('*').forEach((node) => {
    const el = node as HTMLElement;
    const shadow = el.shadowRoot;
    if (!shadow) return;
    if (shadow.querySelector('.fs-section')) {
      applyVars(el, vars);
      walkAndApply(shadow, vars);
    }
  });
}

let watching = false;
let syncTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleSync(): void {
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncTimer = null;
    applyFsThemeToDocument();
  }, 50);
}

/** Start a single document-level theme observer (idempotent). */
function ensureFsThemeWatch(): void {
  if (watching || typeof document === 'undefined') return;
  watching = true;

  scheduleSync();

  try {
    new MutationObserver(scheduleSync).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-mode', 'class'],
    });
    if (document.body) {
      new MutationObserver(scheduleSync).observe(document.body, {
        attributes: true,
        attributeFilter: ['class', 'data-theme', 'data-mode'],
      });
    }
  } catch {
    /* ignore */
  }

  window.addEventListener('storage', (event) => {
    if (event.key === 'salla_demo_theme') scheduleSync();
  });

  // Catch late-mounted custom elements in the Salla demo grid.
  try {
    new MutationObserver((records) => {
      if (records.some((r) => r.addedNodes.length)) scheduleSync();
    }).observe(document.documentElement, { childList: true, subtree: true });
  } catch {
    /* ignore */
  }
}

/* ---- inlined: utils/helpers.ts ---- */
type ConfigValue = Record<string, unknown> | null | undefined;

function normalizeItem<T extends Record<string, unknown> = Record<string, unknown>>(
  item: Record<string, unknown> | null | undefined
): T {
  return Object.entries(item || {}).reduce((acc, [key, value]) => {
    const normalizedKey = key.includes('.') ? key.split('.').pop()! : key;
    acc[normalizedKey] = value;
    return acc;
  }, {} as Record<string, unknown>) as T;
}

/** Stable id from label when merchant UI has no internal-id field (Raed add-on UX). */
function slugifyId(value: unknown, fallback = ''): string {
  const raw =
    typeof value === 'string' || typeof value === 'number'
      ? String(value).trim()
      : localizedString(value as LocaleValue, '').trim();
  if (!raw) return fallback;
  const slug = raw
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return slug || fallback;
}

/** Prefer English label for stable ASCII ids across AR/EN storefronts. */
function itemIdFromLabel(value: unknown, fallback = ''): string {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const row = value as Record<string, unknown>;
    const en = String(row.en ?? '').trim();
    const ar = String(row.ar ?? '').trim();
    return slugifyId(en || ar, fallback);
  }
  return slugifyId(value, fallback);
}

function resolveItemId(
  item: Record<string, unknown>,
  index: number,
  prefix = 'item'
): string {
  const explicit = String(item.id ?? item.value ?? item.key ?? '').trim();
  if (explicit) return explicit;
  return (
    itemIdFromLabel(item.name ?? item.title ?? item.label ?? item.brand ?? item.model, '') ||
    `${prefix}-${index + 1}`
  );
}

function normalizeCollection<T extends Record<string, unknown> = Record<string, unknown>>(
  items: unknown
): T[] {
  if (!Array.isArray(items)) return [];
  return items
    .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
    .map((item, index) => {
      const normalized = normalizeItem<T>(item);
      const row = normalized as Record<string, unknown>;
      if (!String(row.id ?? '').trim()) {
        row.id = resolveItemId(row, index);
      }
      return normalized;
    });
}

function getUnitValue(val: unknown, fallback = 0): number {
  if (typeof val === 'number' && Number.isFinite(val)) return val;
  if (typeof val === 'string' && val.trim() !== '' && Number.isFinite(Number(val))) {
    return Number(val);
  }
  if (val && typeof val === 'object' && 'value' in (val as object)) {
    return getUnitValue((val as { value: unknown }).value, fallback);
  }
  return fallback;
}

function toNumber(val: unknown, fallback = 0): number {
  if (typeof val === 'number' && Number.isFinite(val)) return val;
  if (typeof val === 'string' && val.trim() !== '') {
    const n = Number(val.replace(',', '.'));
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function isTruthy(val: unknown, fallback = false): boolean {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') {
    const v = val.toLowerCase().trim();
    if (['true', '1', 'yes', 'on'].includes(v)) return true;
    if (['false', '0', 'no', 'off', ''].includes(v)) return false;
  }
  if (typeof val === 'number') return val !== 0;
  return fallback;
}

/** Store paths for variable-list picks that only carry a type key (no URL). */
const STATIC_LINK_PATHS: Record<string, string> = {
  offers_link: '/offers',
  offers: '/offers',
  brands_link: '/brands',
  blog_link: '/blog',
  blog: '/blog',
};

function extractLink(value: unknown): string {
  if (!value) return '';

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!isValidHref(trimmed)) return '';
    // Merchants often paste "www.store.com/x" — make it absolute so the
    // browser doesn't resolve it as a relative path.
    if (/^[\w-]+(\.[\w-]+)+([/?#]|$)/.test(trimmed) && !/^https?:\/\//i.test(trimmed)) {
      return `https://${trimmed}`;
    }
    return trimmed;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const link = extractLink(item);
      if (link) return link;
    }
    return '';
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    // Salla entities (product/category/brand/page pickers) expose `urls.customer`.
    const urls =
      obj.urls && typeof obj.urls === 'object'
        ? (obj.urls as Record<string, unknown>)
        : undefined;
    const candidates = [
      obj.url,
      obj.href,
      urls?.customer,
      urls?.url,
      obj.link,
      obj.custom,
      obj.path,
      // Last: `value` may hold a nested entity, a custom URL, or a bare id.
      obj.value,
    ];

    for (const candidate of candidates) {
      const link = extractLink(candidate);
      if (link) return link;
    }

    // Static picks (offers / blog / brands) carry only a type key.
    const typeKey = String(obj.type ?? obj.key ?? obj.source ?? '')
      .toLowerCase()
      .trim();
    if (STATIC_LINK_PATHS[typeKey]) return STATIC_LINK_PATHS[typeKey];
  }

  return '';
}

function isValidHref(url: string): boolean {
  if (!url || url === '#') return false;
  // Bare entity ids (e.g. "296745705") are picker values, never links.
  if (/^\d+$/.test(url)) return false;
  if (url.startsWith('/') || url.startsWith('#') || url.startsWith('?')) return true;
  if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('whatsapp:')) {
    return true;
  }
  if (/^https?:\/\//i.test(url)) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  // Scheme-less domains like "store.sa/offers" — require a dot to avoid
  // treating arbitrary words/ids as relative URLs.
  return /^[\w-]+(\.[\w-]+)+([/?#]|$)/.test(url);
}

function isExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function isDirectMediaUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url, window.location.origin);
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;
    return true;
  } catch {
    return false;
  }
}

function groupByKey<T extends object>(
  items: T[],
  key: keyof T | string
): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const group = String((item as Record<string, unknown>)[key as string] ?? '').trim();
    if (!group) continue;
    const list = map.get(group) || [];
    list.push(item);
    map.set(group, list);
  }
  return map;
}

function sortByOrder<T extends object>(
  items: T[],
  orderKey: keyof T | string = 'group_order'
): T[] {
  return [...items].sort(
    (a, b) =>
      toNumber((a as Record<string, unknown>)[orderKey as string], 0) -
      toNumber((b as Record<string, unknown>)[orderKey as string], 0)
  );
}

function t(
  ar: string,
  en: string,
  value?: LocaleValue,
  fallbackAr?: string
): string {
  if (value != null) {
    const localized = localizedString(value, '');
    if (localized) return localized;
  }
  // Prefer merchant-provided value; chrome fallbacks follow storefront locale
  // (Salla.lang → html lang → ar), same as the reference bundle.
  if (getPageLocale() === 'en') return en;
  return fallbackAr || ar;
}

function safeStorageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeStorageSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / private mode
  }
}

function safeStorageRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = String(phone || '').replace(/\D+/g, '');
  if (!digits || digits.length < 8) return '';
  const text = encodeURIComponent(message || '');
  return `https://wa.me/${digits}${text ? `?text=${text}` : ''}`;
}

async function copyText(text: string): Promise<boolean> {
  if (!text) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallback below
  }

  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

interface SectionTheme {
  bg: string;
  text: string;
  muted: string;
  accent: string;
  card: string;
  border: string;
  buttonBg: string;
  buttonColor: string;
  radius: string;
  spaceDesktop: number;
  spaceMobile: number;
  animate: boolean;
  fullWidth: boolean;
  /** Standard Salla editor controls (mirror the default element editor). */
  noBottomMargin: boolean;
  hasContainer: boolean;
}

function readSectionTheme(
  config: ConfigValue,
  prefix: string,
  defaults?: Partial<SectionTheme>
): SectionTheme {
  const c = config || {};
  // Colors come from the store theme (primary + light/dark), not merchant pickers.
  return {
    bg: 'transparent',
    text: '#000000',
    muted: '#666666',
    accent: 'var(--color-primary, var(--primary-color, var(--color-main, #64748b)))',
    card: 'var(--color-white, var(--bg-color, #ffffff))',
    border: 'var(--color-border, #e5e7eb)',
    buttonBg: 'var(--color-primary, var(--primary-color, var(--color-main, #64748b)))',
    buttonColor: '#ffffff',
    radius: `${getUnitValue(c[`${prefix}radius`], defaults?.radius ? Number(String(defaults.radius).replace('px', '')) : 20)}px`,
    spaceDesktop: getUnitValue(
      c[`${prefix}space_desktop`],
      defaults?.spaceDesktop ?? 48
    ),
    spaceMobile: getUnitValue(
      c[`${prefix}space_mobile`],
      defaults?.spaceMobile ?? 28
    ),
    animate: isTruthy(c[`${prefix}animate`], defaults?.animate ?? true),
    fullWidth: isTruthy(c[`${prefix}full_width`], defaults?.fullWidth ?? false),
    noBottomMargin: false,
    hasContainer: true,
  };
}

function themeStyleMap(theme: SectionTheme): Record<string, string> {
  const useContainer = theme.hasContainer !== false;
  // Ensure light/dark tokens are applied even when :host-context fails (iframe demos).
  ensureFsThemeWatch();
  return {
    ...fsThemeVars(),
    '--section-radius': theme.radius,
    '--space-desktop': `${theme.spaceDesktop}px`,
    '--space-mobile': `${theme.spaceMobile}px`,
    '--space-desktop-bottom': theme.noBottomMargin ? '0px' : `${theme.spaceDesktop}px`,
    '--space-mobile-bottom': theme.noBottomMargin ? '0px' : `${theme.spaceMobile}px`,
    '--section-container-max': useContainer ? '1440px' : 'none',
    '--section-container-pad': useContainer ? '16px' : '0px',
    '--section-container-pad-sm': useContainer ? '12px' : '0px',
  };
}

function getRadioValue(value: unknown, fallback = ''): string {
  const fromOption = (item: unknown): string => {
    if (typeof item === 'string' && item.trim()) return item.trim();
    if (!item || typeof item !== 'object') return '';
    const o = item as Record<string, unknown>;
    // Prefer logical `value` (bag/box/…) over UUID `key`.
    if (o.value != null && String(o.value).trim()) return String(o.value).trim();
    if (o.key != null && String(o.key).trim()) return String(o.key).trim();
    return '';
  };

  if (typeof value === 'string' && value.trim()) return value.trim();

  if (Array.isArray(value) && value[0]) {
    return fromOption(value[0]) || fallback;
  }

  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    // Twilight dropdown-list: { selected: [{ value | key }], options, ... }
    if (Array.isArray(obj.selected) && obj.selected[0]) {
      const picked = fromOption(obj.selected[0]);
      if (picked) {
        // If editor stored UUID key, map it back to option.value
        if (Array.isArray(obj.options)) {
          for (const opt of obj.options) {
            if (!opt || typeof opt !== 'object') continue;
            const row = opt as Record<string, unknown>;
            const optVal = row.value != null ? String(row.value).trim() : '';
            const optKey = row.key != null ? String(row.key).trim() : '';
            if (picked === optVal || picked === optKey) {
              return optVal || picked;
            }
          }
        }
        return picked;
      }
    }
    if ('value' in obj && obj.value != null && !Array.isArray(obj.value)) {
      const v = String(obj.value).trim();
      if (v) return v;
    }
    if (Array.isArray(obj.value) && obj.value[0]) {
      return fromOption(obj.value[0]) || fallback;
    }
  }
  return fallback;
}

function parseTags(raw: unknown): string[] {
  const text = localizedString(raw as LocaleValue, '');
  if (!text) return [];
  return text
    .split(/[,،|/]/)
    .map((part: string) => part.trim())
    .filter(Boolean);
}

function extractImageUrl(val: unknown): string {
  if (!val) return '';
  if (typeof val === 'string') {
    const trimmed = val.trim();
    return isDirectMediaUrl(trimmed) || trimmed.startsWith('/') ? trimmed : '';
  }
  if (Array.isArray(val)) {
    for (const item of val) {
      const url = extractImageUrl(item);
      if (url) return url;
    }
    return '';
  }
  if (typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    const candidates = [obj.url, obj.src, obj.image, obj.thumbnail, obj.original];
    for (const candidate of candidates) {
      const url = extractImageUrl(candidate);
      if (url) return url;
    }
  }
  return '';
}

/* ---- inlined: utils/commerceOutcome.ts ---- */
type CommerceCtaOptions = {
  className?: string;
  /** Per-item link (e.g. the selected zone/state). Falls back to the merchant's global link. */
  href?: string;
};

/**
 * Merchant conversion CTA — always visible and clickable.
 * Link priority: item href → result_link / cta_link → store home (`/`).
 */
function renderCommerceCtaButton(
  config: Record<string, unknown>,
  prefix: string,
  options: CommerceCtaOptions = {}
): TemplateResult {
  const ctaLink =
    (options.href || '').trim() ||
    extractLink(config[`${prefix}result_link`] ?? config[`${prefix}cta_link`]) ||
    '/';
  const ctaLabel =
    localizedString(config[`${prefix}cta_label`] as LocaleValue, '').trim() ||
    t('تسوق الآن', 'Shop now');
  const className = ['fs-btn', 'fs-tap', options.className || '']
    .filter(Boolean)
    .join(' ');

  return html`<a
    class=${className}
    href=${ctaLink}
    target=${isExternalUrl(ctaLink) ? '_blank' : nothing}
    rel=${isExternalUrl(ctaLink) ? 'noopener noreferrer' : nothing}
  >
    ${ctaLabel}
  </a>`;
}

/* ---- inlined: utils/fsSwiper.ts ---- */
/**
 * Shared Swiper.js bootstrap for Twilight elements.
 * All content carousels / horizontal product-style sliders must use this helper.
 * (Before/after comparison range controls are NOT carousels — keep them custom.)
 */

type FsSwiperOptions = SwiperOptions & {
  /** Force RTL; defaults to document/host direction. */
  rtl?: boolean;
};

/** Swiper CSS for Lit shadow roots (document-injected CSS does not pierce). */
const fsSwiperCss: CSSResult = unsafeCSS(
  `${swiperCore}\n${swiperNav}\n${swiperPag}`
);

const DIR_ATTR = 'dir';
const DRAG_GUARD_FLAG = 'fsSwiperDragGuard';

function resolveRtl(el: HTMLElement, forced?: boolean): boolean {
  if (typeof forced === 'boolean') return forced;
  const hostDir =
    el.closest(`[${DIR_ATTR}]`)?.getAttribute(DIR_ATTR) ||
    document.documentElement.getAttribute(DIR_ATTR) ||
    document.body?.getAttribute(DIR_ATTR) ||
    '';
  return hostDir.toLowerCase() === 'rtl';
}

/**
 * Native HTML5 drag on images/links hijacks Swiper's mouse gesture.
 */
function suppressNativeDrag(el: HTMLElement): void {
  if (el.dataset[DRAG_GUARD_FLAG] === '1') return;
  el.dataset[DRAG_GUARD_FLAG] = '1';
  el.addEventListener(
    'dragstart',
    (event) => {
      event.preventDefault();
    },
    { capture: true }
  );
}

/** Create / replace a Swiper instance on a root that already has .swiper markup. */
function mountFsSwiper(
  el: HTMLElement,
  options: FsSwiperOptions = {}
): Swiper {
  const { rtl: rtlOpt, modules: extraModules, ...rest } = options;
  const rtl = resolveRtl(el, rtlOpt);
  el.setAttribute(DIR_ATTR, rtl ? 'rtl' : 'ltr');
  suppressNativeDrag(el);

  const existing = (el as HTMLElement & { swiper?: Swiper }).swiper;
  if (existing && !existing.destroyed) {
    existing.destroy(true, true);
  }

  return new Swiper(el, {
    modules: [Navigation, Pagination, A11y, Autoplay, ...(extraModules || [])],
    slidesPerView: 'auto',
    spaceBetween: 16,
    speed: 420,
    watchOverflow: true,
    grabCursor: true,
    allowTouchMove: true,
    simulateTouch: true,
    threshold: 8,
    touchStartPreventDefault: false,
    preventClicks: false,
    preventClicksPropagation: false,
    observer: true,
    observeParents: true,
    a11y: { enabled: true },
    ...rest,
    ...(rtl ? { rtl: true } : {}),
  });
}

function destroyFsSwiper(instance?: Swiper | null): void {
  if (instance && !instance.destroyed) {
    instance.destroy(true, true);
  }
}

/* ---- inlined: utils/sharedStyles.ts ---- */
/**
 * Shared section chrome + mobile/tablet baselines.
 * Breakpoints: phone ≤639 · tablet ≤959 · desktop ≥960
 */
const sharedSectionCss = css`
  :host {
    direction: inherit;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    display: block;
    overflow-x: clip;
    /* Store primary + light/dark text defaults */
    --fs-store-primary: var(--color-primary, var(--primary-color, var(--color-main, #64748b)));
    --accent-color: var(--fs-store-primary);
    --button-bg: var(--fs-store-primary);
    --button-color: #ffffff;
    /* Light: titles black · subtitle/desc muted */
    --text-color: #000000;
    --muted-color: #666666;
    --card-bg: #ffffff;
    --border-color: #e5e7eb;
    --section-bg: transparent;
    --fs-surface: #f0f0f0;
    --fs-success: #2f9e63;
    --fs-caution: #e0a100;
    --fs-danger: #cf4b4b;
    --fs-unknown: #8f7a86;
  }

  :host-context(:root:not([data-theme='dark']):not(.dark)),
  :host-context(html:not([data-theme='dark']):not(.dark)) {
    --text-color: #000000;
    --muted-color: #666666;
    --card-bg: #ffffff;
    --border-color: #e5e7eb;
    --section-bg: transparent;
    --fs-surface: #f0f0f0;
    --button-bg: var(--fs-store-primary);
    --button-color: #ffffff;
  }

  :host-context([data-theme='dark']),
  :host-context(.dark),
  :host-context([data-mode='dark']) {
    /* Dark: titles white · subtitle/desc muted · secondary surfaces darker */
    --text-color: #ffffff;
    --muted-color: #aaaaaa;
    --card-bg: #0f0f0f;
    --border-color: rgba(255, 255, 255, 0.12);
    --section-bg: transparent;
    --fs-surface: #0a0a0a;
    --button-bg: var(--fs-store-primary);
    --button-color: #ffffff;
  }

  .fs-section {
    background:
      radial-gradient(
        130% 90% at 100% 0%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
        transparent 58%
      ),
      radial-gradient(
        120% 80% at 0% 100%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 5%, transparent),
        transparent 55%
      ),
      var(--section-bg, transparent);
    color: var(--text-color, #000000);
    padding: var(--space-mobile, 28px) 0
      var(--space-mobile-bottom, var(--space-mobile, 28px));
    overflow-x: clip;
  }

  @media (min-width: 960px) {
    .fs-section {
      padding: var(--space-desktop, 48px) 0
        var(--space-desktop-bottom, var(--space-desktop, 48px));
    }
  }

  .fs-container {
    width: 100%;
    max-width: var(--section-container-max, 1440px);
    margin: 0 auto;
    padding: 0 var(--section-container-pad, 16px);
    box-sizing: border-box;
  }

  .fs-section--full .fs-container {
    max-width: none;
  }

  .fs-header {
    text-align: center;
    margin-bottom: 1.75rem;
  }

  .fs-title {
    margin: 0 0 0.6rem;
    font-size: clamp(1.4rem, 2.6vw, 1.95rem);
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--text-color, #000000);
  }

  /* Distinct beauty motif: a soft gradient rule under the section title */
  .fs-header .fs-title::after {
    content: '';
    display: block;
    width: 54px;
    height: 3px;
    margin: 0.7rem auto 0;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, #5a2f4d)
    );
  }

  .fs-subtitle {
    margin: 0 0 0.45rem;
    color: var(--muted-color, #666666);
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.5;
  }

  .fs-desc {
    margin: 0 auto;
    max-width: 42rem;
    color: var(--muted-color, #666666);
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .fs-title,
  .fs-commerce__title {
    color: var(--text-color, #000000);
  }

  .fs-desc,
  .fs-subtitle,
  .fs-empty {
    color: var(--muted-color, #666666);
  }

  :host([data-fs-theme='dark']) .fs-title,
  :host([data-fs-theme='dark']) .fs-commerce__title {
    color: #ffffff;
  }

  :host([data-fs-theme='dark']) .fs-desc,
  :host([data-fs-theme='dark']) .fs-subtitle,
  :host([data-fs-theme='dark']) .fs-empty {
    color: #aaaaaa;
  }

  :host([data-fs-theme='light']) .fs-title,
  :host([data-fs-theme='light']) .fs-commerce__title {
    color: #000000;
  }

  :host([data-fs-theme='light']) .fs-desc,
  :host([data-fs-theme='light']) .fs-subtitle,
  :host([data-fs-theme='light']) .fs-empty {
    color: #666666;
  }

  /* Tip / notice surfaces — follow light/dark tokens (never hard-mix with #fff) */
  .fs-hint,
  .fs-notice {
    margin: 0;
    padding: 0.7rem 0.85rem;
    border-radius: 12px;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 14%,
      var(--fs-surface, var(--card-bg, #f0f0f0))
    );
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
    border-inline-start: 3px solid var(--accent-color, var(--fs-store-primary));
  }

  :host([data-fs-theme='dark']) .fs-hint,
  :host([data-fs-theme='dark']) .fs-notice {
    color: #ffffff;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 18%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: rgba(255, 255, 255, 0.12);
  }

  :host([data-fs-theme='light']) .fs-hint,
  :host([data-fs-theme='light']) .fs-notice {
    color: #000000;
  }

  :host([data-fs-theme='dark']) .bsf-question__hint,
  :host([data-fs-theme='dark']) .bsg-step__hint,
  :host([data-fs-theme='dark']) .bsg-notice,
  :host([data-fs-theme='dark']) .bac-tip,
  :host([data-fs-theme='dark']) .bac-tip__text,
  :host([data-fs-theme='dark']) .bac-notice,
  :host([data-fs-theme='dark']) .bil-note,
  :host([data-fs-theme='dark']) .brl-step__note,
  :host([data-fs-theme='dark']) .bpa-tips,
  :host([data-fs-theme='dark']) .bpa-notice,
  :host([data-fs-theme='dark']) .bff-notice,
  :host([data-fs-theme='dark']) .bff-note,
  :host([data-fs-theme='dark']) .bfz-notice,
  :host([data-fs-theme='dark']) .bch-notice,
  :host([data-fs-theme='dark']) .bwp-notice,
  :host([data-fs-theme='dark']) .srg-zone-tip,
  :host([data-fs-theme='dark']) .pql-callout,
  :host([data-fs-theme='dark']) .fll-note,
  :host([data-fs-theme='dark']) .inp-note,
  :host([data-fs-theme='dark']) .sfr-tip,
  :host([data-fs-theme='dark']) .nal-tip,
  :host([data-fs-theme='dark']) .pcc-notice,
  :host([data-fs-theme='dark']) .pcc-tips,
  :host([data-fs-theme='dark']) .icpm-tip,
  :host([data-fs-theme='dark']) .mmt-note,
  :host([data-fs-theme='dark']) .csdg-alert,
  :host([data-fs-theme='dark']) .tbsg-notes {
    color: #ffffff;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 18%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: rgba(255, 255, 255, 0.12);
  }

  :host([data-fs-theme='dark']) .bac-tip__text,
  :host([data-fs-theme='dark']) .pcc-notice__text,
  :host([data-fs-theme='dark']) .pcc-tips__text,
  :host([data-fs-theme='dark']) .icpm-tip__text,
  :host([data-fs-theme='dark']) .pcc-tips__title {
    color: #ffffff;
    background: transparent;
    border: none;
  }

  :host-context([data-theme='dark']) .fs-section,
  :host-context(.dark) .fs-section,
  :host-context([data-mode='dark']) .fs-section {
    color: #ffffff;
    background:
      radial-gradient(
        130% 90% at 100% 0%,
        color-mix(in srgb, var(--fs-store-primary) 14%, transparent),
        transparent 58%
      ),
      radial-gradient(
        120% 80% at 0% 100%,
        color-mix(in srgb, var(--fs-store-primary) 8%, transparent),
        transparent 55%
      ),
      var(--section-bg, transparent);
  }

  :host-context([data-theme='dark']) .fs-card,
  :host-context(.dark) .fs-card,
  :host-context([data-mode='dark']) .fs-card,
  :host-context([data-theme='dark']) .fs-stage,
  :host-context(.dark) .fs-stage,
  :host-context([data-mode='dark']) .fs-stage {
    background: var(--card-bg, #0f0f0f);
    border-color: var(--border-color, rgba(255, 255, 255, 0.14));
    color: #ffffff;
  }

  :host-context([data-theme='dark']) .fs-commerce,
  :host-context(.dark) .fs-commerce,
  :host-context([data-mode='dark']) .fs-commerce {
    border-color: var(--border-color, rgba(255, 255, 255, 0.14));
  }

  .fs-card {
    background: var(--card-bg, #ffffff);
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 85%, #fff);
    border-radius: var(--section-radius, 20px);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
      0 14px 34px rgba(120, 44, 82, 0.09);
  }

  /* —— Unified buttons (size + primary fill) —— */
  .fs-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-height: 44px;
    min-width: 44px;
    padding: 0.65rem 1.25rem;
    border: 1.5px solid transparent;
    border-radius: 999px;
    background: var(--button-bg, var(--fs-store-primary));
    color: var(--button-color, #ffffff);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    line-height: 1.2;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    box-shadow: 0 6px 16px color-mix(in srgb, var(--fs-store-primary) 22%, transparent);
    transition:
      box-shadow 0.2s ease,
      transform 0.2s ease,
      filter 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease,
      opacity 0.2s ease;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  .fs-btn:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
    box-shadow: 0 10px 22px color-mix(in srgb, var(--fs-store-primary) 30%, transparent);
  }

  .fs-btn:active {
    transform: translateY(0);
    filter: brightness(0.98);
  }

  .fs-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    filter: none;
  }

  .fs-btn--ghost {
    background: transparent;
    color: var(--accent-color, var(--fs-store-primary));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 50%, var(--border-color, #e5e7eb));
    box-shadow: none;
  }

  .fs-btn--ghost:hover {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent);
    filter: none;
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, var(--border-color, #e5e7eb));
  }

  :host([data-fs-theme='dark']) .fs-btn--ghost {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, rgba(255, 255, 255, 0.2));
  }

  .fs-btn--compact,
  .fs-btn--icon {
    min-width: 44px;
    min-height: 44px;
    padding: 0.5rem 1rem;
    font-size: 0.86rem;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--fs-store-primary) 18%, transparent);
  }

  .fs-btn--icon {
    width: 44px;
    padding: 0;
  }

  .fs-btn--ghost.fs-btn--compact,
  .fs-btn--ghost.fs-btn--icon {
    box-shadow: none;
  }

  /* Choice chips — same height/radius as primary buttons */
  .fs-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 44px;
    min-width: 44px;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.2;
    cursor: pointer;
    text-decoration: none;
    box-sizing: border-box;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  }

  .fs-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .fs-chip[aria-pressed='true'],
  .fs-chip.is-active,
  .fs-chip[aria-selected='true'] {
    background: var(--button-bg, var(--fs-store-primary));
    border-color: transparent;
    color: #ffffff;
    transform: translateY(-1px);
  }

  :host([data-fs-theme='dark']) .fs-chip {
    background: var(--fs-surface, #0a0a0a);
    border-color: rgba(255, 255, 255, 0.14);
    color: #ffffff;
  }

  :host([data-fs-theme='dark']) .fs-chip[aria-pressed='true'],
  :host([data-fs-theme='dark']) .fs-chip.is-active,
  :host([data-fs-theme='dark']) .fs-chip[aria-selected='true'] {
    background: var(--button-bg, var(--fs-store-primary));
    border-color: transparent;
    color: #ffffff;
  }

  /* Align pill CTAs / choice chips only — NOT card-style chips (spa-chip, ffm-chip, …) */
  .bpb-card__cta,
  .spb-card__cta,
  .gpb-card__cta,
  .spb-cta,
  .bsf-chip,
  .bsg-option,
  .brb-option,
  .bca-answer,
  .bch-type,
  .bff-chip,
  .bac-chip {
    min-height: 44px;
    border-radius: 999px;
    box-sizing: border-box;
  }

  .bpb-card__cta,
  .spb-card__cta,
  .gpb-card__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.65rem 1.25rem;
    border: 1.5px solid transparent;
    background: var(--button-bg, var(--fs-store-primary));
    color: var(--button-color, #ffffff);
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.2;
    text-decoration: none;
    box-shadow: 0 6px 16px color-mix(in srgb, var(--fs-store-primary) 22%, transparent);
  }

  .fs-tap {
    min-width: 44px;
    min-height: 44px;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .fs-actions,
  .fs-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.55rem;
  }

  .fs-nav {
    justify-content: center;
    margin-top: 0.35rem;
  }

  .fs-nav .fs-btn {
    min-width: 7.5rem;
  }

  .fs-btn:focus-visible,
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--accent-color, var(--fs-store-primary));
    outline-offset: 2px;
  }

  .fs-empty {
    display: grid;
    place-items: center;
    gap: 0.55rem;
    padding: 2.4rem 1.25rem;
    text-align: center;
    color: var(--muted-color, #8f7a86);
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, var(--border-color, #f2dde7));
    border-radius: var(--section-radius, 20px);
    background:
      radial-gradient(
        80% 80% at 50% 0%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, transparent),
        transparent 70%
      ),
      color-mix(in srgb, var(--card-bg, #fff) 70%, var(--section-bg, transparent));
    font-size: 0.95rem;
    line-height: 1.65;
  }

  .fs-coach {
    display: flex;
    align-items: flex-start;
    gap: 0.7rem;
    padding: 0.85rem 1rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--fs-surface, var(--card-bg, #f0f0f0)));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #f2dde7));
    color: var(--text-color, #33232e);
    font-size: 0.9rem;
    line-height: 1.55;
  }

  :host([data-fs-theme='dark']) .fs-coach {
    color: #ffffff;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 16%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: rgba(255, 255, 255, 0.12);
  }

  .fs-coach__mark {
    flex: 0 0 auto;
    width: 1.55rem;
    height: 1.55rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-size: 0.75rem;
    font-weight: 800;
  }

  .fs-progress {
    display: grid;
    gap: 0.4rem;
  }

  .fs-progress__bar {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 75%, #fff);
    overflow: hidden;
  }

  .fs-progress__bar > span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 65%, #5a2f4d)
    );
    transition: width 0.28s ease;
  }

  .fs-progress__label {
    font-size: 0.8rem;
    font-weight: 650;
    color: var(--muted-color, #8f7a86);
  }

  .fs-stage {
    position: relative;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    box-shadow: 0 12px 32px rgba(120, 44, 82, 0.08);
    overflow: hidden;
  }

  .fs-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 1.7rem;
    padding: 0.2rem 0.7rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, #fff);
    color: var(--accent-color, var(--fs-store-primary));
  }

  .fs-pill--success {
    background: color-mix(in srgb, var(--fs-success) 14%, #fff);
    color: var(--fs-success);
  }

  .fs-pill--caution {
    background: color-mix(in srgb, var(--fs-caution) 16%, #fff);
    color: #9a6d00;
  }

  .fs-pill--danger {
    background: color-mix(in srgb, var(--fs-danger) 14%, #fff);
    color: var(--fs-danger);
  }

  .fs-meter {
    width: 100%;
    height: 8px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 80%, transparent);
    overflow: hidden;
  }

  .fs-meter > span {
    display: block;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 60%, #5a2f4d)
    );
    border-radius: inherit;
    transition: width 0.45s ease;
  }

  .fs-scroll-x {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
  }

  .fs-scroll-x > * {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  /* —— Tablet —— */
  @media (max-width: 959px) {
    .fs-header {
      margin-bottom: 1.25rem;
    }

    .fs-title {
      font-size: clamp(1.3rem, 4vw, 1.75rem);
      line-height: 1.3;
    }

    .fs-desc {
      font-size: 0.92rem;
      line-height: 1.65;
    }

    
    .fs-actions .fs-btn {
      width: 100%;
    }
  }

  /* —— Phone —— */
  @media (max-width: 639px) {
    .fs-section {
      padding: var(--space-mobile, 22px) 0
        var(--space-mobile-bottom, var(--space-mobile, 22px));
    }

    .fs-container {
      padding: 0 var(--section-container-pad-sm, 12px);
    }

    .fs-header {
      margin-bottom: 1rem;
    }

    .fs-title {
      font-size: clamp(1.2rem, 6.2vw, 1.55rem);
      line-height: 1.28;
    }

    .fs-desc {
      font-size: 0.88rem;
      line-height: 1.6;
    }

    .fs-empty {
      padding: 1.35rem 0.85rem;
      font-size: 0.88rem;
    }
    /* Keep primary buttons consistent on phone */
    .fs-btn {
      min-height: 44px;
      padding: 0.65rem 1.2rem;
      font-size: 0.9rem;
    }

    .fs-btn:hover {
      box-shadow: 0 6px 14px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 26%, transparent);
    }

    .fs-tap {
      min-height: 44px;
      min-width: 44px;
    }

    
    /*
     * Shrink choice chips / options / toggles across all beauty tools.
     * !important beats per-component min-heights (styles load after shared).
     * Excludes icon-only nav handles and visual sample pickers.
     */
    button[class*='option'],
    button[class*='segment'],
    button[class*='toggle']:not(.brl-step__toggle),
    button[class*='answer'],
    button[class*='finish'],
    button[role='tab']:not(.bpb-dot):not(.bcat-dot):not(.bcr-dot):not(.brl-tab),
    button.bch-color,
    button.bch-type,
    button.bta-play__cta,
    button.bil-segment__btn,
    button.bcr-cover__btn,
    a.fs-btn {
      min-height: 44px !important;
      padding-top: 0.35rem !important;
      padding-bottom: 0.35rem !important;
      font-size: 0.82rem !important;
    }

    /* Icon controls inside routine cards must stay compact */
    button.brl-step__toggle,
    button.brl-handle {
      min-height: 0 !important;
      min-width: 0 !important;
      padding: 0 !important;
      font-size: inherit !important;
    }

    button.brl-tab {
      min-height: 2.25rem !important;
      min-width: 0 !important;
      padding: 0.45rem 1.05rem !important;
      font-size: 0.82rem !important;
      line-height: 1.2 !important;
    }

    /* Carousel dots / icon nav must stay compact on phone */
    button.bpb-dot,
    button.bcat-dot,
    button.bcr-dot {
      min-height: 0 !important;
      min-width: 0 !important;
      padding: 0 !important;
      font-size: 0 !important;
    }

    button.bpb-nav.fs-tap,
    button.bcat-nav.fs-tap,
    button.bcr-nav {
      min-height: 0 !important;
      min-width: 0 !important;
    }

    /* Form controls that read as large tap targets */
    input.bpa-input,
    select.bpa-select,
    .bpa-input,
    .bpa-select {
      min-height: 38px !important;
      padding: 0.45rem 0.7rem !important;
      font-size: 0.88rem !important;
    }

    /* Multi-line option cards stay readable but smaller */
    button.bch-type,
    button.bsg-option:not([class*='compact']) {
      min-height: 46px !important;
      padding: 0.5rem 0.75rem !important;
      font-size: 0.84rem !important;
    }

    /* Pill-chip icons only — exclude card chips (spa-chip, ffm-chip, …) */
    button.bsf-chip [class*='swatch'],
    button.bsf-chip [class*='icon'],
    button.bff-chip [class*='swatch'],
    button.bff-chip [class*='icon'],
    button.bac-chip [class*='swatch'],
    button.bac-chip [class*='icon'] {
      width: 1.65rem !important;
      height: 1.65rem !important;
      font-size: 0.8rem !important;
    }

    button.bca-answer [class*='icon'],
    button.bca-answer img {
      width: 1.75rem !important;
      height: 1.75rem !important;
    }

  }

  @media (prefers-reduced-motion: reduce) {
    .fs-btn,
    .fs-meter > span,
    * {
      scroll-behavior: auto !important;
    }

    .fs-animate,
    .fs-pulse,
    .fs-fade,
    .fs-curtain,
    .fs-celebrate {
      transition: none !important;
      animation: none !important;
    }

  }
`;

/* ---- inlined: components/beauty-collection-reveal/styles.ts ---- */
const componentStyles = css`
  :host {
    direction: inherit;
  }

  .bcr-scene {
    position: relative;
    border-radius: var(--section-radius, 18px);
    overflow: hidden;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--section-bg, transparent));
    border: 1px solid var(--border-color, #e5e7eb);
    min-height: 260px;
  }

  .bcr-scene:not(.is-open) {
    width: 100%;
    aspect-ratio: 16 / 10;
    max-height: min(42vh, 380px);
  }

  .bcr-scene:not(.is-open) .bcr-stage {
    visibility: hidden;
    height: 0;
    padding: 0;
    overflow: hidden;
    pointer-events: none;
  }

  @media (max-width: 639px) {
    .bcr-scene:not(.is-open) {
      width: 100%;
      aspect-ratio: 1 / 1;
      max-height: min(50vw, 260px);
      min-height: 200px;
    }
  }

  /* —— Cover —— */
  .bcr-cover {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.25rem 1.5rem;
    background: linear-gradient(160deg, #33232e, #4a382f);
    color: #fff;
    transition:
      transform 0.85s cubic-bezier(0.7, 0, 0.3, 1),
      opacity 0.75s ease,
      clip-path 0.85s cubic-bezier(0.7, 0, 0.3, 1),
      filter 0.75s ease;
    will-change: transform, opacity, clip-path;
  }

  .bcr-scene.is-open .bcr-cover {
    pointer-events: none;
  }

  .bcr-cover__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.45;
  }

  .bcr-cover__scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(20, 14, 12, 0.35) 0%,
      rgba(20, 14, 12, 0.72) 55%,
      rgba(20, 14, 12, 0.88) 100%
    );
    pointer-events: none;
  }

  .bcr-cover__inner {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 0.65rem;
    justify-items: center;
    align-content: center;
    width: min(100%, 22rem);
    margin: 0 auto;
    transition: opacity 0.35s ease, transform 0.55s ease;
  }

  .bcr-scene.is-open .bcr-cover__inner {
    opacity: 0;
    transform: scale(0.92);
  }

  .bcr-cover__title {
    margin: 0;
    font-size: clamp(1.2rem, 3.2vw, 1.85rem);
    font-weight: 800;
    line-height: 1.25;
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45);
  }

  .bcr-cover__hint {
    margin: 0;
    font-size: 0.88rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.82);
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);
  }

  .bcr-cover__btn {
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.32);
  }

  .bcr-cover__btn:hover,
  .bcr-cover__btn:focus-visible {
    filter: brightness(1.06);
  }

  /* Split panels (curtain / petals) */
  .bcr-cover--split {
    background: transparent;
    padding: 0;
    overflow: hidden;
  }

  .bcr-cover__panel {
    position: absolute;
    inset-block: 0;
    width: 50%;
    overflow: hidden;
    background: linear-gradient(160deg, #33232e, #4a382f);
    transition: transform 0.9s cubic-bezier(0.7, 0, 0.3, 1);
    will-change: transform;
  }

  .bcr-cover__panel--start {
    inset-inline-start: 0;
  }

  .bcr-cover__panel--end {
    inset-inline-end: 0;
  }

  .bcr-cover__panel .bcr-cover__img {
    width: 200%;
    max-width: none;
  }

  .bcr-cover__panel--start .bcr-cover__img {
    inset-inline-start: 0;
  }

  .bcr-cover__panel--end .bcr-cover__img {
    inset-inline-end: 0;
    inset-inline-start: auto;
  }

  /* —— Mode: box (lid lifts up) —— */
  .bcr-scene.is-open .bcr-cover--box {
    transform: translateY(-110%);
  }

  /* —— Mode: bag (pouch opens upward with clip) —— */
  .bcr-cover--bag {
    clip-path: polygon(0 0, 100% 0, 100% 82%, 50% 100%, 0 82%);
  }

  .bcr-scene.is-open .bcr-cover--bag {
    transform: translateY(-110%);
    clip-path: polygon(0 0, 100% 0, 100% 0, 50% 0, 0 0);
  }

  /* —— Mode: drawers (slides aside) —— */
  .bcr-scene.is-open .bcr-cover--drawers {
    transform: translateX(-110%);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--drawers {
    transform: translateX(110%);
  }

  /* —— Mode: carousel (fade / zoom out) —— */
  .bcr-scene.is-open .bcr-cover--carousel {
    transform: scale(1.12);
    opacity: 0;
    filter: blur(4px);
  }

  /* —— Mode: curtain (panels part left/right) —— */
  .bcr-scene.is-open .bcr-cover--curtain .bcr-cover__panel--start {
    transform: translateX(-105%);
  }

  .bcr-scene.is-open .bcr-cover--curtain .bcr-cover__panel--end {
    transform: translateX(105%);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--curtain .bcr-cover__panel--start {
    transform: translateX(105%);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--curtain .bcr-cover__panel--end {
    transform: translateX(-105%);
  }

  /* —— Mode: petals (panels swing open) —— */
  .bcr-cover--petals .bcr-cover__panel--start {
    transform-origin: left center;
  }

  .bcr-cover--petals .bcr-cover__panel--end {
    transform-origin: right center;
  }

  .bcr-scene[dir='rtl'] .bcr-cover--petals .bcr-cover__panel--start {
    transform-origin: right center;
  }

  .bcr-scene[dir='rtl'] .bcr-cover--petals .bcr-cover__panel--end {
    transform-origin: left center;
  }

  .bcr-scene.is-open .bcr-cover--petals .bcr-cover__panel--start {
    transform: rotate(-78deg) scale(1.05);
  }

  .bcr-scene.is-open .bcr-cover--petals .bcr-cover__panel--end {
    transform: rotate(78deg) scale(1.05);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--petals .bcr-cover__panel--start {
    transform: rotate(78deg) scale(1.05);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--petals .bcr-cover__panel--end {
    transform: rotate(-78deg) scale(1.05);
  }

  .bcr-scene.is-open .bcr-cover--petals,
  .bcr-scene.is-open .bcr-cover--curtain {
    background: transparent;
  }

  /* —— Stage / Swiper cards —— */
  .bcr-stage {
    position: relative;
    z-index: 1;
    padding: 1rem 2.35rem 0.85rem;
  }

  .bcr-scene:not(.is-open) .bcr-stage {
    visibility: hidden;
    height: 0;
    padding: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .bcr-scene.is-open {
    min-height: 0;
    max-height: none;
    aspect-ratio: auto;
    overflow: hidden;
  }

  .bcr-swiper {
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  .bcr-slide {
    width: min(220px, 78vw);
    height: auto;
    box-sizing: border-box;
    opacity: 0;
    transform: translateY(14px) scale(0.96);
  }

  .bcr-scene.is-open .bcr-slide {
    animation: bcr-pop 0.5s ease forwards;
    animation-delay: var(--reveal-delay, 0ms);
  }

  .bcr-scene.is-open .bcr-stage--drawers .bcr-slide {
    animation-name: bcr-drawer;
  }

  .bcr-scene.is-open .bcr-stage--bag .bcr-slide {
    animation-name: bcr-rise;
  }

  .bcr-scene.is-open .bcr-stage--petals .bcr-slide {
    animation-name: bcr-bloom;
  }

  .bcr-scene.is-open .bcr-stage--curtain .bcr-slide {
    animation-name: bcr-fade-in;
  }

  @keyframes bcr-pop {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes bcr-drawer {
    from {
      opacity: 0;
      transform: translateX(-28px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes bcr-rise {
    from {
      opacity: 0;
      transform: translateY(28px) scale(0.94);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes bcr-bloom {
    from {
      opacity: 0;
      transform: scale(0.7) rotate(-6deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes bcr-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .bcr-nav {
    position: absolute;
    top: 42%;
    z-index: 4;
    transform: translateY(-50%);
    width: 2.1rem;
    height: 2.1rem;
    min-width: 0;
    min-height: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 999px;
    background: color-mix(in srgb, var(--card-bg, #fff) 94%, transparent);
    color: var(--text-color, #33232e);
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(120, 44, 82, 0.08);
  }

  .bcr-nav--prev {
    inset-inline-start: 0;
  }

  .bcr-nav--next {
    inset-inline-end: 0;
  }

  .bcr-nav.swiper-button-disabled {
    opacity: 0.35;
    pointer-events: none;
  }

  .bcr-nav__chev {
    display: block;
    width: 0.42rem;
    height: 0.42rem;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
  }

  .bcr-nav--prev .bcr-nav__chev {
    transform: rotate(135deg);
  }

  .bcr-nav--next .bcr-nav__chev {
    transform: rotate(-45deg);
  }

  .bcr-swiper[dir='rtl'] .bcr-nav--prev .bcr-nav__chev {
    transform: rotate(-45deg);
  }

  .bcr-swiper[dir='rtl'] .bcr-nav--next .bcr-nav__chev {
    transform: rotate(135deg);
  }

  .bcr-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.28rem;
    margin-top: 0.85rem;
  }

  .bcr-dot {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    min-width: 0;
    min-height: 0;
    padding: 0;
    margin: 0 !important;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 26%, transparent);
    cursor: pointer;
    opacity: 1;
    transition: width 0.2s ease, background 0.2s ease;
  }

  .bcr-dot.is-active {
    width: 0.85rem;
    background: var(--accent-color, var(--fs-store-primary));
  }

  /* —— Content card —— */
  .bcr-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 18px) - 6px);
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(43, 33, 28, 0.06);
    color: inherit;
    text-decoration: none;
    transition:
      transform 0.22s ease,
      box-shadow 0.22s ease,
      border-color 0.22s ease;
    -webkit-user-drag: none;
  }

  a.bcr-card--link {
    cursor: pointer;
  }

  a.bcr-card--link:hover,
  a.bcr-card--link:focus-visible {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
    box-shadow: 0 14px 28px rgba(120, 44, 82, 0.14);
    outline: none;
  }

  a.bcr-card--link:hover .bcr-card__link,
  a.bcr-card--link:focus-visible .bcr-card__link {
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
  }

  .bcr-card__media {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, #f2ece8);
  }

  .bcr-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .bcr-card__tag {
    position: absolute;
    inset-block-start: 0.6rem;
    inset-inline-start: 0.6rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1.4;
    color: #fff;
    background: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .bcr-card__tag--standalone {
    position: static;
    align-self: flex-start;
    margin: 0.9rem 0.9rem 0;
  }

  .bcr-card__body {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 0.85rem;
    flex: 1;
  }

  .bcr-card__title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-color, #000000);
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bcr-card__subtitle {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bcr-card__link {
    margin-top: auto;
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    border: 1px solid var(--accent-color, var(--fs-store-primary));
    color: var(--accent-color, var(--fs-store-primary));
    background: transparent;
    font-size: 0.78rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bcr-count {
    margin: 0.85rem 0 0;
    text-align: center;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
  }

  .bcr-count::before {
    content: '✦';
    margin-inline-end: 0.35rem;
    color: var(--accent-color, var(--fs-store-primary));
    opacity: 0.75;
  }

  .bcr-cta {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    animation: bcr-pop 0.5s ease both;
  }

  .bcr-cta .fs-btn {
    min-width: min(260px, 100%);
    justify-content: center;
  }

  @media (max-width: 639px) {
    .bcr-stage {
      padding: 0.85rem 1.85rem 0.7rem;
    }

    .bcr-slide {
      width: min(188px, 72vw);
    }

    .bcr-nav {
      width: 1.75rem;
      height: 1.75rem;
      top: 40%;
    }

    .bcr-dots {
      margin-top: 0.7rem;
      gap: 0.22rem;
    }

    .bcr-dot {
      width: 0.26rem;
      height: 0.26rem;
    }

    .bcr-dot.is-active {
      width: 0.68rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bcr-cover,
    .bcr-cover__panel,
    .bcr-cover__inner {
      transition: none;
    }

    .bcr-slide {
      opacity: 1;
      transform: none;
      animation: none !important;
    }
  }
`;

/* ---- inlined: components/beauty-collection-reveal/types.ts ---- */
type RevealMode =
  | 'bag'
  | 'box'
  | 'drawers'
  | 'petals'
  | 'curtain'
  | 'carousel';

const REVEAL_MODES: RevealMode[] = [
  'bag',
  'box',
  'drawers',
  'petals',
  'curtain',
  'carousel',
];

interface RevealItem {
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  link: string;
}

/* ---- inlined: components/beauty-collection-reveal/utils.ts ---- */
function resolveMode(config: Record<string, unknown>): RevealMode {
  const raw = config?.bcr_mode;
  let val = getRadioValue(raw, 'box').toLowerCase().trim();

  // Extra pass: if config still holds the full dropdown field, map UUID → value.
  if (!REVEAL_MODES.includes(val as RevealMode) && raw && typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    const options = Array.isArray(obj.options) ? obj.options : [];
    const selected = Array.isArray(obj.selected) ? obj.selected[0] : null;
    const sel =
      selected && typeof selected === 'object'
        ? (selected as Record<string, unknown>)
        : null;
    const needle = String(sel?.value ?? sel?.key ?? val).trim();
    for (const opt of options) {
      if (!opt || typeof opt !== 'object') continue;
      const row = opt as Record<string, unknown>;
      const optVal = String(row.value ?? '').trim();
      const optKey = String(row.key ?? '').trim();
      if (needle && (needle === optVal || needle === optKey) && optVal) {
        val = optVal.toLowerCase();
        break;
      }
    }
  }

  return REVEAL_MODES.includes(val as RevealMode) ? (val as RevealMode) : 'box';
}

/** Per-item stagger delay (ms), clamped to a sane range. */
function revealStagger(config: Record<string, unknown>): number {
  const speed = getUnitValue(config.bcr_speed, 140);
  return Math.max(0, Math.min(600, speed));
}

/** Localized card count label after reveal. */
function cardCountLabel(count: number): string {
  return count === 1
    ? t('بطاقة واحدة', '1 card')
    : t(`${count} بطاقات`, `${count} cards`);
}

/** Parse configurable content cards from the `bcr_items` collection. */
function parseItems(raw: unknown): RevealItem[] {
  return normalizeCollection(raw)
    .map((row) => ({
      title: localizedString(row.title as LocaleValue),
      subtitle: localizedString(row.subtitle as LocaleValue),
      image: extractImageUrl(row.image),
      tag: localizedString(row.tag as LocaleValue),
      link: extractLink(row.link),
    } satisfies RevealItem))
    .filter((item) => item.title || item.image);
}

/* ---- inlined: components/beauty-collection-reveal/index.ts ---- */
function bindSallaRegistration(
  ctor: CustomElementConstructor & { registerSallaComponent?: (tagName: string) => void }
): void {
  ctor.registerSallaComponent = function registerSallaComponent(tagName: string): void {
    if (typeof window === 'undefined') return;
    const attempt = (): boolean => {
      const bundles = (
        window as Window & {
          Salla?: {
            bundles?: {
              registerComponent: (
                tag: string,
                meta: { component: CustomElementConstructor; dynamicTagName: string }
              ) => void;
              isRegistered?: (tag: string) => boolean;
            };
          };
        }
      ).Salla?.bundles;

      if (bundles?.registerComponent) {
        if (bundles.isRegistered?.(tagName)) return true;
        const dynamicTagName = `${tagName}-${Math.random().toString(36).slice(2, 8)}`;
        bundles.registerComponent(tagName, {
          component: this as CustomElementConstructor,
          dynamicTagName,
        });
        return true;
      }

      const host = HTMLElement as typeof HTMLElement & {
        registerSallaComponent?: (this: CustomElementConstructor, tag: string) => void;
      };
      if (typeof host.registerSallaComponent === 'function') {
        host.registerSallaComponent.call(this as CustomElementConstructor, tagName);
        return true;
      }

      return false;
    };

    if (attempt()) return;

    let ticks = 0;
    const timer = window.setInterval(() => {
      ticks += 1;
      if (attempt() || ticks > 200) window.clearInterval(timer);
    }, 50);
  };
}

export default class BeautyCollectionReveal extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private revealed = false;
  @state() private swiperReady = false;

  private boundLangHandler = () => {
    this.requestUpdate();
    queueMicrotask(() => this.remountSwiper());
  };
  private observer: IntersectionObserver | null = null;
  private swiper: SwiperInstance | null = null;
  private remountTimer: ReturnType<typeof setTimeout> | null = null;

  static styles = [sharedSectionCss, fsSwiperCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    this.observer?.disconnect();
    this.observer = null;
    if (this.remountTimer) clearTimeout(this.remountTimer);
    destroyFsSwiper(this.swiper);
    this.swiper = null;
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.revealed = false;
      this.observer?.disconnect();
      this.observer = null;
      destroyFsSwiper(this.swiper);
      this.swiper = null;
      this.swiperReady = false;
    }
    this.maybeObserveAutoStart();

    // Mount slider once cards become visible — avoid remount loops on swiperReady.
    if (changed.has('revealed') && this.revealed) {
      this.scheduleRemount();
      return;
    }
    if (changed.has('config')) {
      const animate =
        readSectionTheme(this.config || {}, 'bcr_').animate && !prefersReducedMotion();
      if (!animate) this.scheduleRemount();
    }
  }

  protected firstUpdated(): void {
    const animate =
      readSectionTheme(this.config || {}, 'bcr_').animate && !prefersReducedMotion();
    if (this.revealed || !animate) this.scheduleRemount();
  }

  private maybeObserveAutoStart(): void {
    const auto = isTruthy(this.config?.bcr_auto_start, false);
    if (!auto || this.revealed || this.observer) return;
    if (typeof IntersectionObserver === 'undefined') {
      this.reveal();
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.reveal();
          this.observer?.disconnect();
          this.observer = null;
        }
      },
      { threshold: 0.35 }
    );
    this.observer.observe(this);
  }

  private reveal = (): void => {
    this.revealed = true;
  };

  private scheduleRemount(): void {
    if (this.remountTimer) clearTimeout(this.remountTimer);
    // Wait for cover transition + DOM paint before measuring slides.
    this.remountTimer = setTimeout(() => this.remountSwiper(), 80);
  }

  private remountSwiper(): void {
    destroyFsSwiper(this.swiper);
    this.swiper = null;

    const animate =
      readSectionTheme(this.config || {}, 'bcr_').animate && !prefersReducedMotion();
    if (!this.revealed && animate) {
      this.swiperReady = false;
      return;
    }

    const root = this.renderRoot.querySelector('.bcr-swiper') as HTMLElement | null;
    if (!root) return;

    const items = parseItems(this.config?.bcr_items);
    if (items.length < 1) return;

    const rtl = getComputedStyle(this).direction !== 'ltr';
    const prevEl = root.querySelector('.bcr-nav--prev') as HTMLElement | null;
    const nextEl = root.querySelector('.bcr-nav--next') as HTMLElement | null;
    const pagEl = root.querySelector('.bcr-dots') as HTMLElement | null;
    const multi = items.length > 1;

    this.swiper = mountFsSwiper(root, {
      rtl,
      slidesPerView: 'auto',
      spaceBetween: 14,
      centeredSlides: false,
      watchOverflow: true,
      navigation: multi
        ? {
            prevEl: prevEl || undefined,
            nextEl: nextEl || undefined,
          }
        : undefined,
      pagination: multi && pagEl
        ? {
            el: pagEl,
            clickable: true,
            bulletClass: 'bcr-dot',
            bulletActiveClass: 'is-active',
          }
        : undefined,
      breakpoints: {
        0: { spaceBetween: 10 },
        640: { spaceBetween: 14 },
      },
    });

    if (!this.swiperReady) this.swiperReady = true;
    requestAnimationFrame(() => {
      this.swiper?.update();
      this.swiper?.updateSlides();
    });
  }

  private renderCoverMedia() {
    const coverImg = localizedString(this.config?.bcr_cover_image as string);
    return html`
      ${coverImg
        ? html`<img class="bcr-cover__img" src=${coverImg} alt="" loading="lazy" decoding="async" />`
        : nothing}
      <div class="bcr-cover__scrim" aria-hidden="true"></div>
    `;
  }

  private renderCover(mode: RevealMode) {
    const c = this.config || {};
    const coverTitle =
      localizedString(c.bcr_cover_title as string) ||
      localizedString(c.bcr_title as string);
    const btnText =
      localizedString(c.bcr_reveal_btn as string) || t('اكشفي المجموعة', 'Reveal collection');
    const split = mode === 'curtain' || mode === 'petals';

    const inner = html`
      <div class="bcr-cover__inner">
        ${coverTitle ? html`<h3 class="bcr-cover__title">${coverTitle}</h3>` : nothing}
        <p class="bcr-cover__hint">${t('اضغطي للكشف عن البطاقات', 'Tap to reveal the cards')}</p>
        <button type="button" class="fs-btn bcr-cover__btn" @click=${this.reveal}>${btnText}</button>
      </div>
    `;

    if (split) {
      return html`
        <div
          class=${classMap({
            'bcr-cover': true,
            [`bcr-cover--${mode}`]: true,
            'bcr-cover--split': true,
          })}
          aria-hidden=${this.revealed ? 'true' : 'false'}
        >
          <div class="bcr-cover__panel bcr-cover__panel--start" aria-hidden="true">
            ${this.renderCoverMedia()}
          </div>
          <div class="bcr-cover__panel bcr-cover__panel--end" aria-hidden="true">
            ${this.renderCoverMedia()}
          </div>
          ${inner}
        </div>
      `;
    }

    return html`
      <div
        class=${classMap({
          'bcr-cover': true,
          [`bcr-cover--${mode}`]: true,
        })}
        aria-hidden=${this.revealed ? 'true' : 'false'}
      >
        ${this.renderCoverMedia()}
        ${inner}
      </div>
    `;
  }

  private renderCard(item: RevealItem) {
    const href = item.link || '';
    const external = href ? isExternalUrl(href) : false;
    const media = item.image
      ? html`<div class="bcr-card__media">
          <img
            class="bcr-card__img"
            src=${item.image}
            alt=${item.title || ''}
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          ${item.tag ? html`<span class="bcr-card__tag">${item.tag}</span>` : nothing}
        </div>`
      : item.tag
        ? html`<span class="bcr-card__tag bcr-card__tag--standalone">${item.tag}</span>`
        : nothing;
    const body = html`
      <div class="bcr-card__body">
        ${item.title ? html`<h3 class="bcr-card__title">${item.title}</h3>` : nothing}
        ${item.subtitle ? html`<p class="bcr-card__subtitle">${item.subtitle}</p>` : nothing}
        ${href
          ? html`<span class="bcr-card__link" aria-hidden="true">
              ${t('اكتشفي المزيد', 'Discover more')}
            </span>`
          : nothing}
      </div>
    `;

    if (!href) {
      return html`<article
        class="bcr-card bcr-card--static"
        aria-label=${item.title || t('بطاقة المجموعة', 'Collection card')}
      >
        ${media}${body}
      </article>`;
    }

    return html`
      <a
        class="bcr-card bcr-card--link"
        href=${href}
        target=${external ? '_blank' : nothing}
        rel=${external ? 'noopener noreferrer' : nothing}
        aria-label=${item.title || t('انتقل إلى المجموعة', 'Go to collection')}
        draggable="false"
        @dragstart=${(e: DragEvent) => e.preventDefault()}
      >
        ${media}${body}
      </a>
    `;
  }

  private renderSlider(items: RevealItem[], mode: RevealMode, stagger: number, visible: boolean) {
    const multi = items.length > 1;
    return html`
      <div class=${classMap({ 'bcr-stage': true, [`bcr-stage--${mode}`]: true })}>
        <div
          class=${classMap({
            swiper: true,
            'bcr-swiper': true,
            'is-ready': this.swiperReady,
          })}
          role="region"
          aria-roledescription="carousel"
          aria-label=${t('بطاقات المجموعة', 'Collection cards')}
          aria-hidden=${visible ? 'false' : 'true'}
        >
          <div class="swiper-wrapper">
            ${items.map(
              (item, i) => html`
                <div
                  class="swiper-slide bcr-slide"
                  role="group"
                  aria-label=${item.title || `${t('بطاقة', 'Card')} ${i + 1}`}
                  style=${styleMap({ '--reveal-delay': `${i * stagger}ms` })}
                >
                  ${this.renderCard(item)}
                </div>
              `
            )}
          </div>

          ${multi
            ? html`
                <button
                  type="button"
                  class="bcr-nav bcr-nav--prev"
                  aria-label=${t('السابق', 'Previous')}
                >
                  <span class="bcr-nav__chev" aria-hidden="true"></span>
                </button>
                <button
                  type="button"
                  class="bcr-nav bcr-nav--next"
                  aria-label=${t('التالي', 'Next')}
                >
                  <span class="bcr-nav__chev" aria-hidden="true"></span>
                </button>
                <div class="bcr-dots" aria-label=${t('شرائح البطاقات', 'Card slides')}></div>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bcr_');
    const animate = theme.animate && !prefersReducedMotion();
    const mode = resolveMode(c);
    const stagger = revealStagger(c);
    const title = localizedString(c.bcr_title as string);
    const desc = localizedString(c.bcr_desc as string);
    const items = parseItems(c.bcr_items);
    const dir = getComputedStyle(this).direction === 'ltr' ? 'ltr' : 'rtl';

    if (!items.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي بطاقات المجموعة من إعدادات العنصر', 'Add collection cards in the element settings')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('الكشف الإبداعي عن المجموعة', 'Creative collection reveal')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div
            class=${classMap({
              'bcr-scene': true,
              'is-open': this.revealed || !animate,
            })}
            dir=${dir}
            data-mode=${mode}
          >
            ${this.renderCover(mode)}
            ${this.renderSlider(items, mode, stagger, this.revealed || !animate)}
          </div>

          ${this.revealed
            ? html`<p class="bcr-count" role="status">${cardCountLabel(items.length)}</p>`
            : nothing}
          ${this.revealed || !animate
            ? html`<div class="bcr-cta">${renderCommerceCtaButton(c, 'bcr_')}</div>`
            : nothing}
        </div>
      </section>
    `;
  }
}

bindSallaRegistration(BeautyCollectionReveal as unknown as CustomElementConstructor & { registerSallaComponent?: (tagName: string) => void });
