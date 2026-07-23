import { LitElement, css, html, nothing, type TemplateResult } from 'lit';
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

/* ---- inlined: components/beauty-lighting-finish-simulator/styles.ts ---- */
const componentStyles = css`
  .bls-mode-toggle {
    display: flex;
    flex-wrap: wrap;
    width: fit-content;
    max-width: 100%;
    gap: 0.35rem;
    margin: 0 auto 1.1rem;
    padding: 0.25rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #e5e7eb);
  }

  .bls-mode-toggle__btn {
    min-height: 34px;
    padding: 0.35rem 0.95rem;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: var(--muted-color, #666666);
    font: inherit;
    font-size: 0.84rem;
    font-weight: 700;
    cursor: pointer;
  }

  .bls-mode-toggle__btn.is-active {
    background: var(--bls-active, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
  }

  .bls-shell {
    display: grid;
    gap: 1.35rem;
    align-items: start;
    max-width: 1100px;
    margin-inline: auto;
  }

  @media (min-width: 900px) {
    .bls-shell {
      grid-template-columns: minmax(260px, 0.9fr) minmax(0, 1.35fr);
      gap: 1.75rem;
    }

    .bls-shell--compare {
      grid-template-columns: 1fr;
    }
  }

  /* —— Side controls —— */
  .bls-aside {
    min-width: 0;
    display: grid;
    gap: 1rem;
  }

  .bls-controls-card {
    padding: 1rem 1rem 1.1rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--card-bg, #fff) 90%, var(--section-bg, transparent));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.06);
  }

  .bls-controls {
    display: grid;
    gap: 0.5rem;
  }

  .bls-controls + .bls-controls {
    margin-top: 0.9rem;
    padding-top: 0.9rem;
    border-top: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
  }

  .bls-controls__label {
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--muted-color, #666666);
    margin-bottom: 0.15rem;
  }

  .bls-chips {
    display: grid;
    gap: 0.45rem;
  }

  @media (max-width: 899px) {
    .bls-chips {
      grid-template-columns: 1fr 1fr;
    }
  }

  .bls-chip {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.55rem;
    min-height: 48px;
    padding: 0.55rem 0.7rem;
    border-radius: calc(var(--section-radius, 20px) * 0.65);
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 700;
    font-size: 0.86rem;
    text-align: start;
    cursor: pointer;
    transition:
      transform 0.15s ease,
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  .bls-chip:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--bls-active, var(--accent-color, var(--fs-store-primary))) 40%, var(--border-color, #e5e7eb));
  }

  .bls-chip.is-active {
    border-color: var(--bls-active, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(in srgb, var(--bls-active, var(--accent-color, var(--fs-store-primary))) 10%, var(--card-bg, #fff));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--bls-active, var(--accent-color, var(--fs-store-primary))) 20%, transparent),
      0 8px 18px rgba(43, 33, 28, 0.08);
  }

  .bls-chip__icon {
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--bls-active, var(--accent-color, var(--fs-store-primary))) 12%, var(--card-bg, #fff));
    color: var(--bls-active, var(--accent-color, var(--fs-store-primary)));
    font-size: 0.95rem;
    line-height: 1;
  }

  .bls-chip.is-active .bls-chip__icon {
    background: var(--bls-active, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
  }

  .bls-chip__name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bls-chip__dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--muted-color, #8f7a86) 55%, transparent);
  }

  .bls-chip.is-active .bls-chip__dot {
    background: var(--bls-active, var(--accent-color, var(--fs-store-primary)));
    box-shadow: none;
  }

  .bls-finish-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bls-finish-chip {
    min-height: 40px;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 700;
    font-size: 0.8rem;
    cursor: pointer;
  }

  .bls-finish-chip.is-active {
    background: var(--bls-active, var(--accent-color, var(--fs-store-primary)));
    border-color: transparent;
    color: #fff;
  }

  /* —— Mirror / stage —— */
  .bls-mirror {
    position: relative;
    min-width: 0;
    padding: 1rem 1rem 1.2rem;
    border-radius: calc(var(--section-radius, 20px) + 4px);
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, #2a1f24),
      #1a1216 55%,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, #2a1f24)
    );
    box-shadow:
      0 16px 40px rgba(43, 33, 28, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .bls-mirror::before {
    content: '';
    position: absolute;
    inset-inline: 1.4rem;
    top: 0.45rem;
    height: 0.35rem;
    border-radius: 999px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    pointer-events: none;
  }

  .bls-stage {
    position: relative;
    width: 100%;
    aspect-ratio: var(--bls-aspect, 4 / 5);
    max-height: min(620px, 78vh);
    border-radius: calc(var(--section-radius, 20px) - 2px);
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 45%, #1a1216);
    border: 3px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, #fff);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.12),
      0 8px 24px rgba(0, 0, 0, 0.35);
  }

  @media (min-width: 900px) {
    .bls-stage {
      aspect-ratio: var(--bls-aspect, 4 / 5);
    }
  }

  .bls-pic {
    position: absolute;
    inset: 0;
    display: block;
  }

  .bls-pic > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .bls-pic--empty {
    display: grid;
    place-items: center;
    gap: 0.55rem;
    background: radial-gradient(
      circle at 50% 35%,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, #2a1f24),
      #1a1216 70%
    );
  }

  .bls-empty__icon {
    width: 3.5rem;
    height: 3.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 2px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 50%, rgba(255, 255, 255, 0.35));
    color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #fff);
    font-size: 1.4rem;
    opacity: 0.85;
  }

  .bls-empty__text {
    max-width: 14rem;
    text-align: center;
    font-size: 0.82rem;
    font-weight: 600;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.72);
    padding: 0 1rem;
  }

  .bls-layer {
    opacity: 0;
  }

  .bls-layer.is-on {
    opacity: 1;
  }

  .bls-stage--fade .bls-layer {
    transition: opacity var(--bls-speed, 0.4s) ease;
  }

  .bls-caption {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    padding: 1.6rem 1rem 0.9rem;
    background: linear-gradient(180deg, transparent, rgba(20, 14, 12, 0.72));
    color: #fff;
    font-size: 0.84rem;
    line-height: 1.5;
    z-index: 2;
  }

  .bls-caption b {
    font-weight: 800;
  }

  /* —— Detail panel —— */
  .bls-panel {
    display: grid;
    gap: 0.85rem;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: var(--section-radius, 20px);
    padding: 1rem 1.1rem 1.1rem;
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.05);
  }

  .bls-desc {
    margin: 0;
    color: var(--text-color, #000000);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .bls-color-effect {
    margin: 0;
    color: var(--muted-color, #666666);
    font-size: 0.85rem;
    font-weight: 600;
  }

  .bls-indicators {
    display: grid;
    gap: 0.55rem;
  }

  .bls-indicator {
    display: grid;
    grid-template-columns: 6.5rem 1fr auto;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.8rem;
  }

  .bls-indicator__label {
    color: var(--muted-color, #666666);
    font-weight: 700;
  }

  .bls-indicator__val {
    color: var(--accent-color, var(--fs-store-primary));
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  .bls-palette {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bls-swatch {
    width: 1.9rem;
    height: 1.9rem;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
  }

  .bls-note {
    margin: 0;
    font-size: 0.82rem;
    color: color-mix(in srgb, var(--fs-caution, #e0a100) 45%, var(--text-color, #000000));
    line-height: 1.55;
  }

  .bls-link {
    align-self: start;
  }

  /* —— Compare —— */
  .bls-wrap {
    max-width: 1100px;
    margin-inline: auto;
  }

  .bls-compare-picks {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: 1fr 1fr;
    margin-top: 1rem;
  }

  .bls-compare-picks label {
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
    display: block;
    margin-bottom: 0.25rem;
  }

  .bls-compare-picks select {
    width: 100%;
    min-height: 44px;
    padding: 0.55rem 0.7rem;
    border-radius: 12px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 600;
  }

  .bls-compare-picks .fs-btn {
    width: 100%;
    margin-top: 0.5rem;
  }

  .bls-cmp-side {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .bls-cmp-side .bls-stage {
    aspect-ratio: var(--bls-aspect, 4 / 5);
    max-height: none;
  }

  .bls-cmp-slider {
    position: relative;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    cursor: col-resize;
    outline: none;
  }

  .bls-cmp-slider:focus-visible {
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, transparent),
      inset 0 0 0 1px rgba(255, 255, 255, 0.12),
      0 8px 24px rgba(0, 0, 0, 0.35);
  }

  .bls-cmp-slider.is-dragging {
    cursor: grabbing;
  }

  .bls-cmp-slider .bls-pic > img {
    pointer-events: none;
    -webkit-user-drag: none;
  }

  .bls-cmp-slider .bls-img--overlay {
    clip-path: inset(0 calc(100% - var(--bls-pos, 50%)) 0 0);
  }

  :host-context([dir='rtl']) .bls-cmp-slider .bls-img--overlay,
  :host([dir='rtl']) .bls-cmp-slider .bls-img--overlay {
    clip-path: inset(0 0 0 calc(100% - var(--bls-pos, 50%)));
  }

  .bls-cmp-handle {
    position: absolute;
    top: 0;
    bottom: 0;
    inset-inline-start: var(--bls-pos, 50%);
    width: 3px;
    transform: translateX(-50%);
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
    pointer-events: none;
    z-index: 3;
  }

  :host-context([dir='rtl']) .bls-cmp-handle,
  :host([dir='rtl']) .bls-cmp-handle {
    transform: translateX(50%);
  }

  .bls-cmp-handle__pill {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    border: 3px solid #fff;
    color: #fff;
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35);
  }

  .bls-cmp-hint {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 4;
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    background: rgba(20, 14, 12, 0.72);
    color: #fff;
    font-size: 0.78rem;
    font-weight: 700;
    white-space: nowrap;
    pointer-events: none;
    animation: bls-hint-pulse 1.8s ease-in-out infinite;
  }

  @keyframes bls-hint-pulse {
    0%,
    100% {
      opacity: 0.85;
    }
    50% {
      opacity: 1;
    }
  }

  .bls-cmp-split .bls-img--overlay {
    clip-path: inset(0 0 0 50%);
  }

  :host-context([dir='rtl']) .bls-cmp-split .bls-img--overlay,
  :host([dir='rtl']) .bls-cmp-split .bls-img--overlay {
    clip-path: inset(0 50% 0 0);
  }

  .bls-cmp-split::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    inset-inline-start: 50%;
    width: 2px;
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
  }

  .bls-cmp-tag {
    position: absolute;
    top: 0.6rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: rgba(20, 14, 12, 0.6);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    z-index: 2;
  }

  .bls-cmp-tag--a {
    inset-inline-start: 0.6rem;
  }

  .bls-cmp-tag--b {
    inset-inline-end: 0.6rem;
  }

  @media (max-width: 899px) {
    /* Preview first on phones/tablets, controls below */
    .bls-mirror {
      order: -1;
    }
  }

  @media (max-width: 639px) {
    .bls-indicator {
      grid-template-columns: 5.2rem 1fr auto;
    }

    .bls-cmp-side {
      grid-template-columns: 1fr;
    }

    .bls-chips {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 639px) {
    .bls-cmp-handle__pill {
      width: 40px;
      height: 40px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bls-stage--fade .bls-layer,
    .bls-chip {
      transition: none !important;
    }
    .bls-cmp-hint {
      animation: none;
    }
  }
`;

/* ---- inlined: components/beauty-lighting-finish-simulator/types.ts ---- */
type ViewMode = 'single' | 'compare';
type CompareStyle = 'split' | 'slider' | 'side';
type TransitionKind = 'fade' | 'slide' | 'none';
type Finish = 'any' | 'matte' | 'dewy' | 'glossy' | 'natural' | 'velvet';

interface LightState {
  id: string;
  name: string;
  icon: string;
  image: string;
  imageMobile: string;
  finish: Finish;
  desc: string;
  colorEffect: string;
  gloss: number;
  clarity: number;
  contrast: number;
  palette: string[];
  note: string;
  link: string;
}

/* ---- inlined: components/beauty-lighting-finish-simulator/utils.ts ---- */
const FINISHES: Finish[] = ['any', 'matte', 'dewy', 'glossy', 'natural', 'velvet'];

function parseLights(raw: unknown): LightState[] {
  return normalizeCollection(raw)
    .map((l, i) => {
      const finish = getRadioValue(l.finish, 'any') as Finish;
      return {
        id: String(l.id ?? l.light_id ?? '').trim() || `light-${i + 1}`,
        name: localizedString(l.name as LocaleValue) || `${i + 1}`,
        icon: String(l.icon ?? '').trim(),
        image: extractImageUrl(l.image),
        imageMobile: extractImageUrl(l.image_mobile),
        finish: FINISHES.includes(finish) ? finish : 'any',
        desc: localizedString(l.desc as LocaleValue),
        colorEffect: localizedString(l.color_effect as LocaleValue),
        gloss: clamp(toNumber(l.gloss, 0), 0, 5),
        clarity: clamp(toNumber(l.clarity, 0), 0, 5),
        contrast: clamp(toNumber(l.contrast, 0), 0, 5),
        palette: parseTags(l.palette),
        note: localizedString(l.note as LocaleValue),
        link: extractLink(l.link),
      } satisfies LightState;
    })
    .filter((l) => l.image || l.name);
}

function resolveViewMode(config: Record<string, unknown>): ViewMode {
  return getRadioValue(config.bls_view_mode, 'single') === 'compare' ? 'compare' : 'single';
}

function resolveCompareStyle(config: Record<string, unknown>): CompareStyle {
  const value = getRadioValue(config.bls_compare_style, 'slider') as CompareStyle;
  return (['split', 'slider', 'side'] as CompareStyle[]).includes(value) ? value : 'slider';
}

function resolveTransition(config: Record<string, unknown>): TransitionKind {
  const value = getRadioValue(config.bls_transition, 'fade') as TransitionKind;
  return (['fade', 'slide', 'none'] as TransitionKind[]).includes(value) ? value : 'fade';
}

function resolveAspect(config: Record<string, unknown>, fallback = '4/5'): string {
  const value = getRadioValue(config.bls_aspect, fallback) || fallback;
  return value.replace('/', ' / ');
}

function finishLabel(finish: Finish, locale: 'ar' | 'en'): string {
  const map: Record<Finish, [string, string]> = {
    any: ['عام', 'Any'],
    matte: ['مطفي', 'Matte'],
    dewy: ['ندي', 'Dewy'],
    glossy: ['لامع', 'Glossy'],
    natural: ['طبيعي', 'Natural'],
    velvet: ['مخملي', 'Velvet'],
  };
  return map[finish][locale === 'en' ? 1 : 0];
}

/** Distinct finishes present across the states (excluding the generic "any"). */
function usedFinishes(lights: LightState[]): Finish[] {
  const seen = new Set<Finish>();
  for (const l of lights) if (l.finish !== 'any') seen.add(l.finish);
  return FINISHES.filter((f) => seen.has(f));
}

/* ---- inlined: components/beauty-lighting-finish-simulator/index.ts ---- */
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

export default class BeautyLightingFinishSimulator extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private selId = '';
  @state() private selName = '';
  @state() private selFinish = '';
  @state() private cmpA = '';
  @state() private cmpB = '';
  @state() private sliderPos = 50;
  @state() private sliderDragging = false;
  @state() private compareOn: boolean | null = null;

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.selId = '';
      this.selName = '';
      this.selFinish = '';
      this.cmpA = '';
      this.cmpB = '';
      this.compareOn = null;
    }
  }

  private get lights(): LightState[] {
    return parseLights(this.config?.bls_lights);
  }

  private uniqueNames(lights: LightState[]): string[] {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const l of lights) {
      if (!seen.has(l.name)) {
        seen.add(l.name);
        out.push(l.name);
      }
    }
    return out;
  }

  private defaultName(lights: LightState[]): string {
    const preset = String(this.config?.bls_default_light ?? '').trim();
    const byId = lights.find((l) => l.id === preset);
    if (byId) return byId.name;
    const byName = lights.find((l) => l.name === preset);
    if (byName) return byName.name;
    return lights[0]?.name ?? '';
  }

  private defaultFinish(lights: LightState[]): Finish {
    const finishes = usedFinishes(lights);
    const preset = getRadioValue(this.config?.bls_default_finish, '') as Finish;
    if (finishes.includes(preset)) return preset;
    return finishes[0] ?? 'any';
  }

  private activeSingle(lights: LightState[], finishEnabled: boolean): LightState {
    if (finishEnabled) {
      const name = this.selName || this.defaultName(lights);
      const finish = (this.selFinish as Finish) || this.defaultFinish(lights);
      return (
        lights.find((l) => l.name === name && l.finish === finish) ||
        lights.find((l) => l.finish === finish) ||
        lights.find((l) => l.name === name) ||
        lights[0]
      );
    }
    const preset = String(this.config?.bls_default_light ?? '').trim();
    const id = this.selId || preset;
    return lights.find((l) => l.id === id) || lights.find((l) => l.name === id) || lights[0];
  }

  private renderPicture(light: LightState, cls: string, eager: boolean) {
    if (!light?.image) {
      return html`<div class="bls-pic bls-pic--empty ${cls}" role="img" aria-label=${t('لا توجد صورة', 'No image')}>
        <span class="bls-empty__icon" aria-hidden="true">◯</span>
        <span class="bls-empty__text">${t('أضيفي صورة لهذه الحالة', 'Add an image for this state')}</span>
      </div>`;
    }
    return html`<picture class="bls-pic ${cls}">
      ${light.imageMobile
        ? html`<source media="(max-width: 639px)" srcset=${light.imageMobile} />`
        : nothing}
      <img
        src=${light.image}
        alt=${light.name}
        loading=${eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority=${eager ? 'high' : 'low'}
      />
    </picture>`;
  }

  // —— compare slider ——
  private isRtl(): boolean {
    return getComputedStyle(this).direction === 'rtl';
  }

  private onSliderMove = (e: PointerEvent): void => {
    const stage = this.shadowRoot?.querySelector('.bls-cmp-slider') as HTMLElement | null;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const raw = this.isRtl()
      ? (rect.right - e.clientX) / rect.width
      : (e.clientX - rect.left) / rect.width;
    this.sliderPos = clamp(Math.round(raw * 100), 0, 100);
  };

  private onSliderDown = (e: PointerEvent): void => {
    e.preventDefault();
    this.sliderDragging = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    this.onSliderMove(e);
    window.addEventListener('pointermove', this.onSliderMove);
    window.addEventListener('pointerup', this.onSliderUp, { once: true });
  };

  private onSliderUp = (): void => {
    this.sliderDragging = false;
    window.removeEventListener('pointermove', this.onSliderMove);
  };

  private onSliderKey = (e: KeyboardEvent): void => {
    const step = e.shiftKey ? 10 : 5;
    const dir = this.isRtl() ? -1 : 1;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.sliderPos = clamp(this.sliderPos - step * dir, 0, 100);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.sliderPos = clamp(this.sliderPos + step * dir, 0, 100);
    } else if (e.key === 'Home') {
      e.preventDefault();
      this.sliderPos = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      this.sliderPos = 100;
    }
  };

  private renderIndicators(light: LightState, locale: 'ar' | 'en') {
    const allRows: Array<[string, number]> = [
      [locale === 'en' ? 'Glossiness' : 'اللمعان', light.gloss],
      [locale === 'en' ? 'Color clarity' : 'وضوح اللون', light.clarity],
      [locale === 'en' ? 'Contrast' : 'التباين', light.contrast],
    ];
    const rows = allRows.filter(([, v]) => v > 0);
    if (!rows.length) return nothing;
    return html`<div class="bls-indicators">
      ${rows.map(
        ([label, val]) => html`<div class="bls-indicator">
          <span class="bls-indicator__label">${label}</span>
          <span class="fs-meter"><span style=${styleMap({ width: `${(val / 5) * 100}%` })}></span></span>
          <span class="bls-indicator__val">${val}/5</span>
        </div>`
      )}
    </div>`;
  }

  private renderPanel(light: LightState, locale: 'ar' | 'en') {
    const c = this.config || {};
    const showIndicators = isTruthy(c.bls_show_indicators, true);
    const showPalette = isTruthy(c.bls_show_palette, true);
    return html`<div class="bls-panel">
      ${light.desc ? html`<p class="bls-desc">${light.desc}</p>` : nothing}
      ${light.colorEffect ? html`<p class="bls-color-effect">${t('تأثير اللون', 'Color effect')}: ${light.colorEffect}</p>` : nothing}
      ${showIndicators ? this.renderIndicators(light, locale) : nothing}
      ${showPalette && light.palette.length
        ? html`<div class="bls-palette">${light.palette.map((col) => html`<span class="bls-swatch" style=${styleMap({ background: col })} title=${col}></span>`)}</div>`
        : nothing}
      ${light.note ? html`<p class="bls-note">★ ${light.note}</p>` : nothing}
      <div class="fs-actions">
        ${renderCommerceCtaButton(c, 'bls_', { href: light.link })}
      </div>
    </div>`;
  }

  private renderLightChip(light: LightState, active: boolean) {
    const isSicon = light.icon.startsWith('sicon-');
    return html`
      <button
        type="button"
        class=${classMap({ 'bls-chip': true, 'is-active': active })}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => (this.selId = light.id)}
      >
        <span class="bls-chip__icon" aria-hidden="true">
          ${light.icon
            ? isSicon
              ? html`<span class=${light.icon}></span>`
              : light.icon
            : '✦'}
        </span>
        <span class="bls-chip__name">${light.name}</span>
        <span class="bls-chip__dot" aria-hidden="true"></span>
      </button>
    `;
  }

  private renderSingle(lights: LightState[], locale: 'ar' | 'en') {
    const c = this.config || {};
    const finishEnabled = isTruthy(c.bls_enable_finish, false) && usedFinishes(lights).length > 0;
    const eagerAll = getRadioValue(this.config?.bls_preload, 'lazy') === 'eager';
    const transition = resolveTransition(c);
    const active = this.activeSingle(lights, finishEnabled);
    const names = this.uniqueNames(lights);
    const finishes = usedFinishes(lights);
    const activeName = active?.name;
    const activeFinish = (this.selFinish as Finish) || this.defaultFinish(lights);

    return html`
      <div class="bls-shell">
        <aside class="bls-aside">
          <div class="bls-controls-card">
            ${finishEnabled
              ? html`
                  <div class="bls-controls">
                    <span class="bls-controls__label">${t('اللمسة النهائية', 'Finish')}</span>
                    <div class="bls-finish-chips" role="group" aria-label=${t('اللمسة النهائية', 'Finish')}>
                      ${finishes.map(
                        (f) => html`<button
                          type="button"
                          class=${classMap({ 'bls-finish-chip': true, 'is-active': f === activeFinish })}
                          aria-pressed=${f === activeFinish ? 'true' : 'false'}
                          @click=${() => (this.selFinish = f)}
                        >
                          ${finishLabel(f, locale)}
                        </button>`
                      )}
                    </div>
                  </div>
                  <div class="bls-controls">
                    <span class="bls-controls__label">${t('نوع الإضاءة', 'Lighting')}</span>
                    <div class="bls-chips" role="group" aria-label=${t('حالات الإضاءة', 'Lighting states')}>
                      ${names.map((n) => {
                        const sample = lights.find((l) => l.name === n);
                        const isSicon = !!sample?.icon.startsWith('sicon-');
                        return html`<button
                          type="button"
                          class=${classMap({ 'bls-chip': true, 'is-active': n === activeName })}
                          aria-pressed=${n === activeName ? 'true' : 'false'}
                          @click=${() => (this.selName = n)}
                        >
                          <span class="bls-chip__icon" aria-hidden="true">
                            ${sample?.icon
                              ? isSicon
                                ? html`<span class=${sample.icon}></span>`
                                : sample.icon
                              : '✦'}
                          </span>
                          <span class="bls-chip__name">${n}</span>
                          <span class="bls-chip__dot" aria-hidden="true"></span>
                        </button>`;
                      })}
                    </div>
                  </div>
                `
              : html`<div class="bls-controls">
                  <span class="bls-controls__label">${t('اختاري الإضاءة', 'Pick a lighting')}</span>
                  <div class="bls-chips" role="group" aria-label=${t('حالات الإضاءة', 'Lighting states')}>
                    ${lights.map((l) => this.renderLightChip(l, l.id === active?.id))}
                  </div>
                </div>`}
          </div>

          ${active ? this.renderPanel(active, locale) : nothing}
        </aside>

        <div class="bls-mirror">
          <div class=${classMap({ 'bls-stage': true, 'bls-stage--fade': transition === 'fade' })}>
            ${eagerAll
              ? lights.map((l) =>
                  this.renderPicture(l, `bls-layer ${l.id === active?.id ? 'is-on' : ''}`, true)
                )
              : this.renderPicture(active, '', true)}
            <div class="bls-caption">
              <b>${active?.name}</b>${active?.colorEffect ? html` — ${active.colorEffect}` : nothing}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderCompare(lights: LightState[]) {
    const c = this.config || {};
    const style = resolveCompareStyle(c);
    const a = lights.find((l) => l.id === this.cmpA) || lights[0];
    const b = lights.find((l) => l.id === this.cmpB) || lights[1] || lights[0];

    const picks = html`<div class="bls-compare-picks">
      <div>
        <label for="bls-a">${t('الحالة الأولى', 'First state')}</label>
        <select id="bls-a" @change=${(e: Event) => (this.cmpA = (e.target as HTMLSelectElement).value)}>
          ${lights.map((l) => html`<option value=${l.id} ?selected=${l.id === a?.id}>${l.name}</option>`)}
        </select>
        ${renderCommerceCtaButton(c, 'bls_', { href: a?.link })}
      </div>
      <div>
        <label for="bls-b">${t('الحالة الثانية', 'Second state')}</label>
        <select id="bls-b" @change=${(e: Event) => (this.cmpB = (e.target as HTMLSelectElement).value)}>
          ${lights.map((l) => html`<option value=${l.id} ?selected=${l.id === b?.id}>${l.name}</option>`)}
        </select>
        ${renderCommerceCtaButton(c, 'bls_', { href: b?.link })}
      </div>
    </div>`;

    if (style === 'side') {
      return html`<div class="bls-wrap">
        <div class="bls-cmp-side">
          <div class="bls-stage"><span class="bls-cmp-tag bls-cmp-tag--a">${a?.name}</span>${this.renderPicture(a, '', true)}</div>
          <div class="bls-stage"><span class="bls-cmp-tag bls-cmp-tag--b">${b?.name}</span>${this.renderPicture(b, '', true)}</div>
        </div>
        ${picks}
      </div>`;
    }

    const overlayStyle = style === 'slider' ? styleMap({ '--bls-pos': `${this.sliderPos}%` }) : styleMap({});
    return html`<div class="bls-wrap">
      <div
        class=${classMap({
          'bls-stage': true,
          'bls-cmp-slider': style === 'slider',
          'bls-cmp-split': style === 'split',
          'is-dragging': style === 'slider' && this.sliderDragging,
        })}
        style=${overlayStyle}
        role=${style === 'slider' ? 'slider' : nothing}
        tabindex=${style === 'slider' ? '0' : nothing}
        aria-label=${style === 'slider' ? t('اسحبي للمقارنة بين الحالتين', 'Drag to compare the two states') : nothing}
        aria-valuenow=${style === 'slider' ? Math.round(this.sliderPos) : nothing}
        aria-valuemin=${style === 'slider' ? '0' : nothing}
        aria-valuemax=${style === 'slider' ? '100' : nothing}
        @pointerdown=${style === 'slider' ? this.onSliderDown : undefined}
        @keydown=${style === 'slider' ? this.onSliderKey : undefined}
      >
        <span class="bls-cmp-tag bls-cmp-tag--a">${b?.name}</span>
        <span class="bls-cmp-tag bls-cmp-tag--b">${a?.name}</span>
        ${this.renderPicture(a, '', true)}
        ${this.renderPicture(b, 'bls-img--overlay', true)}
        ${style === 'slider'
          ? html`
              <div class="bls-cmp-handle" aria-hidden="true">
                <span class="bls-cmp-handle__pill">‹ ›</span>
              </div>
              ${!this.sliderDragging && this.sliderPos === 50
                ? html`<div class="bls-cmp-hint" aria-hidden="true">${t('اسحبي للمقارنة', 'Drag to compare')}</div>`
                : nothing}
            `
          : nothing}
      </div>
      ${picks}
    </div>`;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bls_');
    const animate = theme.animate && !prefersReducedMotion();
    const lights = this.lights;
    const title = localizedString(c.bls_title as string);
    const desc = localizedString(c.bls_desc as string);
    const locale = getPageLocale() === 'en' ? 'en' : 'ar';
    const viewMode = resolveViewMode(c);
    const showCompare = isTruthy(c.bls_show_compare, true) && lights.length >= 2;
    const compareActive = this.compareOn ?? viewMode === 'compare';
    const effectiveMode = showCompare && compareActive ? 'compare' : 'single';

    if (!lights.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي حالات إضاءة مع صورها من إعدادات العنصر.', 'Add lighting states with their images in the element settings.')}
      </div>`;
    }

    const active = this.activeSingle(lights, isTruthy(c.bls_enable_finish, false));

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap({
          ...themeStyleMap(theme),
          '--bls-aspect': resolveAspect(c),
          '--bls-active': String(c.bls_active_color ?? theme.accent),
          '--bls-speed': `${Math.max(0, toNumber(c.bls_speed, 400))}ms`,
        })}
        aria-label=${title || t('محاكي الإضاءة والمظهر', 'Lighting & finish simulator')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          ${showCompare
            ? html`<div class="bls-mode-toggle" role="group" aria-label=${t('طريقة العرض', 'View mode')}>
                <button
                  type="button"
                  class=${classMap({ 'bls-mode-toggle__btn': true, 'is-active': effectiveMode === 'single' })}
                  aria-pressed=${effectiveMode === 'single' ? 'true' : 'false'}
                  @click=${() => (this.compareOn = false)}
                >
                  ${t('حالة واحدة', 'Single')}
                </button>
                <button
                  type="button"
                  class=${classMap({ 'bls-mode-toggle__btn': true, 'is-active': effectiveMode === 'compare' })}
                  aria-pressed=${effectiveMode === 'compare' ? 'true' : 'false'}
                  @click=${() => (this.compareOn = true)}
                >
                  ${t('مقارنة', 'Compare')}
                </button>
              </div>`
            : nothing}

          ${effectiveMode === 'compare' ? this.renderCompare(lights) : this.renderSingle(lights, locale)}
        </div>
      </section>
    `;
  }
}

bindSallaRegistration(BeautyLightingFinishSimulator as unknown as CustomElementConstructor & { registerSallaComponent?: (tagName: string) => void });
