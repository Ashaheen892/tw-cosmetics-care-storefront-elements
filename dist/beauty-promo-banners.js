var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { unsafeCSS, css, LitElement, nothing, html } from "lit";
import { s as swiperCore, a as swiperNav, b as swiperPag, S as Swiper, N as Navigation, P as Pagination, A as A11y, c as Autoplay } from "./pagination-YJLEv1e5.js";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { l as localizedString, g as getPageLocale } from "./localizedString-Bm7wdWFi.js";
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const PRIMARY = "var(--color-primary, var(--primary-color, var(--color-main, #64748b)))";
function detectFsTheme() {
  var _a;
  if (typeof document > "u") return "light";
  const root = document.documentElement, attr = (root.getAttribute("data-theme") || root.getAttribute("data-mode") || "").toLowerCase();
  if (attr === "dark") return "dark";
  if (attr === "light") return "light";
  if (root.classList.contains("dark") || (_a = document.body) != null && _a.classList.contains("dark"))
    return "dark";
  try {
    const stored = localStorage.getItem("salla_demo_theme");
    if (stored === "dark" || stored === "light") return stored;
  } catch {
  }
  return "light";
}
__name(detectFsTheme, "detectFsTheme");
function fsThemeVars(mode = detectFsTheme()) {
  const dark = mode === "dark";
  return {
    "--fs-store-primary": PRIMARY,
    "--accent-color": PRIMARY,
    "--button-bg": PRIMARY,
    "--button-color": "#ffffff",
    "--text-color": dark ? "#ffffff" : "#000000",
    "--muted-color": dark ? "#aaaaaa" : "#666666",
    "--card-bg": dark ? "#0f0f0f" : "#ffffff",
    "--fs-surface": dark ? "#0a0a0a" : "#f0f0f0",
    "--border-color": dark ? "rgba(255, 255, 255, 0.12)" : "#e5e7eb",
    "--section-bg": "transparent"
  };
}
__name(fsThemeVars, "fsThemeVars");
function applyVars(el, vars) {
  for (const [key, value] of Object.entries(vars))
    el.style.setProperty(key, value);
  el.setAttribute("data-fs-theme", detectFsTheme());
}
__name(applyVars, "applyVars");
function walkAndApply(root, vars) {
  root.querySelectorAll(".fs-section").forEach((node) => {
    applyVars(node, vars);
  });
}
__name(walkAndApply, "walkAndApply");
function applyFsThemeToDocument(mode = detectFsTheme()) {
  if (typeof document > "u") return;
  const vars = fsThemeVars(mode);
  walkAndApply(document, vars), document.querySelectorAll("*").forEach((node) => {
    const el = node, shadow = el.shadowRoot;
    shadow && shadow.querySelector(".fs-section") && (applyVars(el, vars), walkAndApply(shadow, vars));
  });
}
__name(applyFsThemeToDocument, "applyFsThemeToDocument");
let watching = !1, syncTimer = null;
function scheduleSync() {
  syncTimer && clearTimeout(syncTimer), syncTimer = setTimeout(() => {
    syncTimer = null, applyFsThemeToDocument();
  }, 50);
}
__name(scheduleSync, "scheduleSync");
function ensureFsThemeWatch() {
  if (!(watching || typeof document > "u")) {
    watching = !0, scheduleSync();
    try {
      new MutationObserver(scheduleSync).observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["data-theme", "data-mode", "class"]
      }), document.body && new MutationObserver(scheduleSync).observe(document.body, {
        attributes: !0,
        attributeFilter: ["class", "data-theme", "data-mode"]
      });
    } catch {
    }
    window.addEventListener("storage", (event) => {
      event.key === "salla_demo_theme" && scheduleSync();
    });
    try {
      new MutationObserver((records) => {
        records.some((r) => r.addedNodes.length) && scheduleSync();
      }).observe(document.documentElement, { childList: !0, subtree: !0 });
    } catch {
    }
  }
}
__name(ensureFsThemeWatch, "ensureFsThemeWatch");
function normalizeItem(item) {
  return Object.entries(item || {}).reduce((acc, [key, value]) => {
    const normalizedKey = key.includes(".") ? key.split(".").pop() : key;
    return acc[normalizedKey] = value, acc;
  }, {});
}
__name(normalizeItem, "normalizeItem");
function slugifyId(value, fallback = "") {
  const raw = typeof value == "string" || typeof value == "number" ? String(value).trim() : localizedString(value, "").trim();
  return raw && raw.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 48) || fallback;
}
__name(slugifyId, "slugifyId");
function itemIdFromLabel(value, fallback = "") {
  if (value && typeof value == "object" && !Array.isArray(value)) {
    const row = value, en = String(row.en ?? "").trim(), ar = String(row.ar ?? "").trim();
    return slugifyId(en || ar, fallback);
  }
  return slugifyId(value, fallback);
}
__name(itemIdFromLabel, "itemIdFromLabel");
function resolveItemId(item, index, prefix = "item") {
  const explicit = String(item.id ?? item.value ?? item.key ?? "").trim();
  return explicit || itemIdFromLabel(item.name ?? item.title ?? item.label ?? item.brand ?? item.model, "") || `${prefix}-${index + 1}`;
}
__name(resolveItemId, "resolveItemId");
function normalizeCollection(items) {
  return Array.isArray(items) ? items.filter((item) => !!item && typeof item == "object").map((item, index) => {
    const normalized = normalizeItem(item), row = normalized;
    return String(row.id ?? "").trim() || (row.id = resolveItemId(row, index)), normalized;
  }) : [];
}
__name(normalizeCollection, "normalizeCollection");
function getUnitValue(val, fallback = 0) {
  return typeof val == "number" && Number.isFinite(val) ? val : typeof val == "string" && val.trim() !== "" && Number.isFinite(Number(val)) ? Number(val) : val && typeof val == "object" && "value" in val ? getUnitValue(val.value, fallback) : fallback;
}
__name(getUnitValue, "getUnitValue");
function isTruthy(val, fallback = !1) {
  if (typeof val == "boolean") return val;
  if (typeof val == "string") {
    const v = val.toLowerCase().trim();
    if (["true", "1", "yes", "on"].includes(v)) return !0;
    if (["false", "0", "no", "off", ""].includes(v)) return !1;
  }
  return typeof val == "number" ? val !== 0 : fallback;
}
__name(isTruthy, "isTruthy");
const STATIC_LINK_PATHS = {
  offers_link: "/offers",
  offers: "/offers",
  brands_link: "/brands",
  blog_link: "/blog",
  blog: "/blog"
};
function extractLink(value) {
  if (!value) return "";
  if (typeof value == "string") {
    const trimmed = value.trim();
    return isValidHref(trimmed) ? /^[\w-]+(\.[\w-]+)+([/?#]|$)/.test(trimmed) && !/^https?:\/\//i.test(trimmed) ? `https://${trimmed}` : trimmed : "";
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      const link = extractLink(item);
      if (link) return link;
    }
    return "";
  }
  if (typeof value == "object") {
    const obj = value, urls = obj.urls && typeof obj.urls == "object" ? obj.urls : void 0, candidates = [
      obj.url,
      obj.href,
      urls == null ? void 0 : urls.customer,
      urls == null ? void 0 : urls.url,
      obj.link,
      obj.custom,
      obj.path,
      // Last: `value` may hold a nested entity, a custom URL, or a bare id.
      obj.value
    ];
    for (const candidate of candidates) {
      const link = extractLink(candidate);
      if (link) return link;
    }
    const typeKey = String(obj.type ?? obj.key ?? obj.source ?? "").toLowerCase().trim();
    if (STATIC_LINK_PATHS[typeKey]) return STATIC_LINK_PATHS[typeKey];
  }
  return "";
}
__name(extractLink, "extractLink");
function isValidHref(url) {
  if (!url || url === "#" || /^\d+$/.test(url)) return !1;
  if (url.startsWith("/") || url.startsWith("#") || url.startsWith("?") || url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("whatsapp:"))
    return !0;
  if (/^https?:\/\//i.test(url))
    try {
      return new URL(url), !0;
    } catch {
      return !1;
    }
  return /^[\w-]+(\.[\w-]+)+([/?#]|$)/.test(url);
}
__name(isValidHref, "isValidHref");
function isExternalUrl(url) {
  try {
    return new URL(url, window.location.origin).origin !== window.location.origin;
  } catch {
    return !1;
  }
}
__name(isExternalUrl, "isExternalUrl");
function isDirectMediaUrl(url) {
  if (!url || typeof url != "string") return !1;
  try {
    const parsed = new URL(url, window.location.origin);
    return !!["http:", "https:"].includes(parsed.protocol);
  } catch {
    return !1;
  }
}
__name(isDirectMediaUrl, "isDirectMediaUrl");
function t(ar, en, value, fallbackAr) {
  return getPageLocale() === "en" ? en : ar;
}
__name(t, "t");
function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
__name(prefersReducedMotion, "prefersReducedMotion");
function readSectionTheme(config, prefix, defaults) {
  const c = config || {};
  return {
    bg: "transparent",
    text: "#000000",
    muted: "#666666",
    accent: "var(--color-primary, var(--primary-color, var(--color-main, #64748b)))",
    card: "var(--color-white, var(--bg-color, #ffffff))",
    border: "var(--color-border, #e5e7eb)",
    buttonBg: "var(--color-primary, var(--primary-color, var(--color-main, #64748b)))",
    buttonColor: "#ffffff",
    radius: `${getUnitValue(c[`${prefix}radius`], 20)}px`,
    spaceDesktop: getUnitValue(
      c[`${prefix}space_desktop`],
      48
    ),
    spaceMobile: getUnitValue(
      c[`${prefix}space_mobile`],
      28
    ),
    animate: isTruthy(c[`${prefix}animate`], !0),
    fullWidth: isTruthy(c[`${prefix}full_width`], !1),
    noBottomMargin: !1,
    hasContainer: !0
  };
}
__name(readSectionTheme, "readSectionTheme");
function themeStyleMap(theme) {
  const useContainer = theme.hasContainer !== !1;
  return ensureFsThemeWatch(), {
    ...fsThemeVars(),
    "--section-radius": theme.radius,
    "--space-desktop": `${theme.spaceDesktop}px`,
    "--space-mobile": `${theme.spaceMobile}px`,
    "--space-desktop-bottom": theme.noBottomMargin ? "0px" : `${theme.spaceDesktop}px`,
    "--space-mobile-bottom": theme.noBottomMargin ? "0px" : `${theme.spaceMobile}px`,
    "--section-container-max": useContainer ? "1440px" : "none",
    "--section-container-pad": useContainer ? "16px" : "0px",
    "--section-container-pad-sm": useContainer ? "12px" : "0px"
  };
}
__name(themeStyleMap, "themeStyleMap");
function extractImageUrl(val) {
  if (!val) return "";
  if (typeof val == "string") {
    const trimmed = val.trim();
    return isDirectMediaUrl(trimmed) || trimmed.startsWith("/") ? trimmed : "";
  }
  if (Array.isArray(val)) {
    for (const item of val) {
      const url = extractImageUrl(item);
      if (url) return url;
    }
    return "";
  }
  if (typeof val == "object") {
    const obj = val, candidates = [obj.url, obj.src, obj.image, obj.thumbnail, obj.original];
    for (const candidate of candidates) {
      const url = extractImageUrl(candidate);
      if (url) return url;
    }
  }
  return "";
}
__name(extractImageUrl, "extractImageUrl");
const fsSwiperCss = unsafeCSS(
  `${swiperCore}
${swiperNav}
${swiperPag}`
), DIR_ATTR = "dir", DRAG_GUARD_FLAG = "fsSwiperDragGuard";
function resolveRtl(el, forced) {
  var _a, _b;
  return typeof forced == "boolean" ? forced : (((_a = el.closest(`[${DIR_ATTR}]`)) == null ? void 0 : _a.getAttribute(DIR_ATTR)) || document.documentElement.getAttribute(DIR_ATTR) || ((_b = document.body) == null ? void 0 : _b.getAttribute(DIR_ATTR)) || "").toLowerCase() === "rtl";
}
__name(resolveRtl, "resolveRtl");
function suppressNativeDrag(el) {
  el.dataset[DRAG_GUARD_FLAG] !== "1" && (el.dataset[DRAG_GUARD_FLAG] = "1", el.addEventListener(
    "dragstart",
    (event) => {
      event.preventDefault();
    },
    { capture: !0 }
  ));
}
__name(suppressNativeDrag, "suppressNativeDrag");
function mountFsSwiper(el, options = {}) {
  const { rtl: rtlOpt, modules: extraModules, ...rest } = options, rtl = resolveRtl(el, rtlOpt);
  el.setAttribute(DIR_ATTR, rtl ? "rtl" : "ltr"), suppressNativeDrag(el);
  const existing = el.swiper;
  return existing && !existing.destroyed && existing.destroy(!0, !0), new Swiper(el, {
    modules: [Navigation, Pagination, A11y, Autoplay, ...extraModules || []],
    slidesPerView: "auto",
    spaceBetween: 16,
    speed: 420,
    watchOverflow: !0,
    grabCursor: !0,
    allowTouchMove: !0,
    simulateTouch: !0,
    threshold: 8,
    touchStartPreventDefault: !1,
    preventClicks: !1,
    preventClicksPropagation: !1,
    observer: !0,
    observeParents: !0,
    a11y: { enabled: !0 },
    ...rest,
    ...rtl ? { rtl: !0 } : {}
  });
}
__name(mountFsSwiper, "mountFsSwiper");
function destroyFsSwiper(instance) {
  instance && !instance.destroyed && instance.destroy(!0, !0);
}
__name(destroyFsSwiper, "destroyFsSwiper");
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
`, componentStyles = css`
  :host {
    direction: inherit;
  }

  .bpb-carousel {
    position: relative;
  }

  .bpb-swiper {
    position: relative;
    border-radius: var(--section-radius, 22px);
    overflow: hidden;
    border: 1px solid var(--border-color, #f2dde7);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--card-bg, #fff));
    box-shadow: 0 14px 36px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, transparent);
  }

  .bpb-slide {
    height: auto;
  }

  .bpb-card {
    position: relative;
    min-height: clamp(240px, 42vw, 420px);
    aspect-ratio: 21 / 9;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, #2a1822);
    -webkit-user-drag: none;
  }

  .bpb-card__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }

  .bpb-card__fallback {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        120% 80% at 80% 10%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, transparent),
        transparent 55%
      ),
      linear-gradient(
        145deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, #3a2230),
        #1f1218 70%
      );
  }

  .bpb-card__shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        100deg,
        rgba(24, 12, 18, 0.72) 0%,
        rgba(24, 12, 18, 0.35) 42%,
        rgba(24, 12, 18, 0.12) 100%
      ),
      linear-gradient(180deg, transparent 35%, rgba(24, 12, 18, 0.78) 100%);
    pointer-events: none;
  }

  .bpb-card__body {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.55rem;
    width: min(100%, 34rem);
    padding: clamp(1.25rem, 3.5vw, 2.35rem);
    box-sizing: border-box;
  }

  .bpb-card__count {
    display: inline-flex;
    align-items: center;
    min-height: 1.55rem;
    padding: 0.15rem 0.65rem;
    border-radius: 999px;
    background: color-mix(in srgb, #fff 16%, transparent);
    border: 1px solid color-mix(in srgb, #fff 28%, transparent);
    color: rgba(255, 255, 255, 0.88);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  .bpb-card__title {
    margin: 0;
    font-size: clamp(1.35rem, 3.2vw, 2.35rem);
    font-weight: 800;
    line-height: 1.2;
    color: #fff;
    text-shadow: 0 2px 18px rgba(0, 0, 0, 0.25);
  }

  .bpb-card__subtitle {
    margin: 0;
    max-width: 28rem;
    font-size: clamp(0.88rem, 1.5vw, 1.05rem);
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.86);
  }

  .bpb-card__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    margin-top: 0.35rem;
    min-height: 44px;
    padding: 0.6rem 1.2rem;
    border-radius: 999px;
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    color: var(--button-color, #fff);
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.2;
    box-shadow: 0 8px 20px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, transparent);
  }

  .bpb-card__cta-arrow {
    width: 0.5rem;
    height: 0.5rem;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(-45deg);
    flex: 0 0 auto;
  }

  .bpb-card[dir='rtl'] .bpb-card__cta-arrow {
    transform: rotate(135deg);
  }

  .bpb-nav {
    position: absolute;
    top: 50%;
    z-index: 3;
    transform: translateY(-50%);
    width: 2.4rem;
    height: 2.4rem;
    min-width: 0;
    min-height: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid color-mix(in srgb, #fff 35%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, #1a1014 45%, transparent);
    color: #fff;
    cursor: pointer;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .bpb-nav--prev {
    inset-inline-start: 0.85rem;
  }

  .bpb-nav--next {
    inset-inline-end: 0.85rem;
  }

  .bpb-nav.swiper-button-disabled {
    opacity: 0.35;
    pointer-events: none;
  }

  .bpb-nav__chev {
    display: block;
    width: 0.45rem;
    height: 0.45rem;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
  }

  .bpb-nav--prev .bpb-nav__chev {
    transform: rotate(135deg);
  }

  .bpb-nav--next .bpb-nav__chev {
    transform: rotate(-45deg);
  }

  .bpb-swiper[dir='rtl'] .bpb-nav--prev .bpb-nav__chev {
    transform: rotate(-45deg);
  }

  .bpb-swiper[dir='rtl'] .bpb-nav--next .bpb-nav__chev {
    transform: rotate(135deg);
  }

  .bpb-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.75rem;
  }

  .bpb-dot {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    min-width: 0;
    min-height: 0;
    padding: 0;
    margin: 0 !important;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
    cursor: pointer;
    opacity: 1;
    transition: width 0.2s ease, background 0.2s ease;
  }

  .bpb-dot.is-active {
    width: 1rem;
    background: var(--accent-color, var(--fs-store-primary));
  }

  .fs-animate .bpb-swiper {
    animation: bpb-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes bpb-rise {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 639px) {
    .bpb-swiper {
      border-radius: 14px;
      box-shadow: 0 8px 20px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent);
    }

    .bpb-card {
      min-height: 168px;
      max-height: 200px;
      aspect-ratio: 2 / 1;
    }

    .bpb-card__shade {
      background:
        linear-gradient(
          180deg,
          rgba(24, 12, 18, 0.05) 0%,
          rgba(24, 12, 18, 0.35) 48%,
          rgba(24, 12, 18, 0.78) 100%
        );
    }

    .bpb-card__body {
      width: 100%;
      gap: 0.2rem;
      padding: 0.7rem 0.85rem 0.75rem;
    }

    .bpb-card__count {
      display: none;
    }

    .bpb-card__title {
      font-size: 0.98rem;
      line-height: 1.25;
      max-width: 14ch;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .bpb-card__subtitle {
      font-size: 0.72rem;
      line-height: 1.35;
      max-width: 22ch;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .bpb-card__cta {
      min-height: 32px !important;
      padding: 0.3rem 0.75rem !important;
      font-size: 0.72rem !important;
      gap: 0.3rem;
      margin-top: 0.15rem;
    }

    .bpb-card__cta-arrow {
      width: 0.36rem;
      height: 0.36rem;
      border-right-width: 1.5px;
      border-bottom-width: 1.5px;
    }

    .bpb-nav {
      display: none;
    }

    .bpb-dots {
      margin-top: 0.65rem;
      gap: 0.28rem;
    }

    .bpb-dot {
      width: 0.3rem;
      height: 0.3rem;
    }

    .bpb-dot.is-active {
      width: 0.75rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bpb-nav,
    .bpb-dot,
    .bpb-card__cta {
      transition: none;
    }

    .fs-animate .bpb-swiper {
      animation: none;
    }
  }
`, DEFAULTS = [
  {
    title: t("عروض الصيف", "Summer Sale"),
    subtitle: t("خصم حتى 40%", "Up to 40% off"),
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1400&q=80",
    link: "",
    cta_label: t("تسوقي الآن", "Shop now")
  },
  {
    title: t("وصل حديثًا", "New Arrivals"),
    subtitle: t("اكتشفي أحدث المنتجات", "Discover the latest"),
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1400&q=80",
    link: "",
    cta_label: t("اكتشفي", "Explore")
  }
];
function parseBanners(raw) {
  const parsed = normalizeCollection(raw).map((row) => ({
    title: localizedString(row.title, ""),
    subtitle: localizedString(
      row.subtitle || row.desc,
      ""
    ),
    image: extractImageUrl(row.image),
    link: extractLink(row.link ?? row.url),
    cta_label: localizedString(
      row.cta_label || row.button,
      ""
    )
  })).filter((b) => b.title || b.image);
  return parsed.length ? parsed.map((b, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...b,
      image: b.image || d.image,
      title: b.title || d.title,
      subtitle: b.subtitle || d.subtitle,
      cta_label: b.cta_label || d.cta_label
    };
  }) : DEFAULTS.map((d) => ({ ...d }));
}
__name(parseBanners, "parseBanners");
const AUTOPLAY_MS = 5500;
function bindSallaRegistration(ctor) {
  ctor.registerSallaComponent = /* @__PURE__ */ __name(function(tagName) {
    if (typeof window > "u") return;
    const attempt = /* @__PURE__ */ __name(() => {
      var _a, _b;
      const bundles = (_a = window.Salla) == null ? void 0 : _a.bundles;
      if (bundles != null && bundles.registerComponent) {
        if ((_b = bundles.isRegistered) != null && _b.call(bundles, tagName)) return !0;
        const dynamicTagName = `${tagName}-${Math.random().toString(36).slice(2, 8)}`;
        return bundles.registerComponent(tagName, {
          component: this,
          dynamicTagName
        }), !0;
      }
      const host = HTMLElement;
      return typeof host.registerSallaComponent == "function" ? (host.registerSallaComponent.call(this, tagName), !0) : !1;
    }, "attempt");
    if (attempt()) return;
    let ticks = 0;
    const timer = window.setInterval(() => {
      ticks += 1, (attempt() || ticks > 200) && window.clearInterval(timer);
    }, 50);
  }, "registerSallaComponent");
}
__name(bindSallaRegistration, "bindSallaRegistration");
const _BeautyPromoBanners = class _BeautyPromoBanners extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.swiperReady = !1, this.boundLangHandler = () => {
      this.requestUpdate(), queueMicrotask(() => this.remountSwiper());
    }, this.swiper = null, this.remountTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.remountTimer && clearTimeout(this.remountTimer), destroyFsSwiper(this.swiper), this.swiper = null, super.disconnectedCallback();
  }
  firstUpdated() {
    this.remountSwiper();
  }
  updated(changed) {
    changed.has("config") && this.scheduleRemount();
  }
  scheduleRemount() {
    this.remountTimer && clearTimeout(this.remountTimer), this.remountTimer = setTimeout(() => this.remountSwiper(), 0);
  }
  remountSwiper() {
    var _a, _b;
    destroyFsSwiper(this.swiper), this.swiper = null, this.swiperReady = !1;
    const banners = parseBanners((_a = this.config) == null ? void 0 : _a.bpb_items), root = this.renderRoot.querySelector(".bpb-swiper");
    if (!root || banners.length < 1) return;
    const multi = banners.length > 1, autoplayOn = multi && isTruthy((_b = this.config) == null ? void 0 : _b.bpb_autoplay, !0) && !prefersReducedMotion(), prevEl = root.querySelector(".bpb-nav--prev"), nextEl = root.querySelector(".bpb-nav--next"), pagEl = this.renderRoot.querySelector(".bpb-dots"), rtl = getComputedStyle(this).direction !== "ltr";
    this.swiper = mountFsSwiper(root, {
      rtl,
      modules: autoplayOn ? [Autoplay] : [],
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 480,
      loop: multi,
      watchOverflow: !0,
      navigation: multi ? {
        prevEl: prevEl || void 0,
        nextEl: nextEl || void 0
      } : void 0,
      pagination: multi && pagEl ? {
        el: pagEl,
        clickable: !0,
        bulletClass: "bpb-dot",
        bulletActiveClass: "is-active"
      } : void 0,
      autoplay: autoplayOn ? {
        delay: AUTOPLAY_MS,
        disableOnInteraction: !1,
        pauseOnMouseEnter: !0
      } : !1
    }), this.swiperReady = !0;
  }
  renderCard(banner, index, total) {
    const external = banner.link ? isExternalUrl(banner.link) : !1, dir = getComputedStyle(this).direction === "ltr" ? "ltr" : "rtl", body = html`
      ${banner.image ? html`<img
            class="bpb-card__img"
            src=${banner.image}
            alt=""
            loading=${index === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable="false"
          />` : html`<div class="bpb-card__fallback" aria-hidden="true"></div>`}
      <div class="bpb-card__shade" aria-hidden="true"></div>
      <div class="bpb-card__body">
        ${total > 1 ? html`<span class="bpb-card__count">${index + 1} / ${total}</span>` : nothing}
        ${banner.title ? html`<h3 class="bpb-card__title">${banner.title}</h3>` : nothing}
        ${banner.subtitle ? html`<p class="bpb-card__subtitle">${banner.subtitle}</p>` : nothing}
        ${banner.link ? html`<span class="bpb-card__cta">
              <span class="bpb-card__cta-label"
                >${banner.cta_label || t("تسوقي الآن", "Shop now")}</span
              >
              <span class="bpb-card__cta-arrow" aria-hidden="true"></span>
            </span>` : nothing}
      </div>
    `;
    return banner.link ? html`
        <a
          class="bpb-card bpb-card--link"
          dir=${dir}
          href=${banner.link}
          target=${external ? "_blank" : nothing}
          rel=${external ? "noopener noreferrer" : nothing}
          aria-label=${banner.title || t("عرض", "Promotion")}
          draggable="false"
          @dragstart=${(e) => e.preventDefault()}
        >
          ${body}
        </a>
      ` : html`
      <article
        class="bpb-card"
        dir=${dir}
        aria-label=${banner.title || t("عرض", "Promotion")}
      >
        ${body}
      </article>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bpb_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.bpb_title), desc = localizedString(c.bpb_desc), banners = parseBanners(c.bpb_items), multi = banners.length > 1;
    return banners.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("عروض الجمال", "Beauty promotions")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="bpb-carousel">
            <div
              class=${classMap({
      swiper: !0,
      "bpb-swiper": !0,
      "is-ready": this.swiperReady
    })}
              role="region"
              aria-roledescription="carousel"
              aria-label=${title || t("عروض الجمال", "Beauty promotions")}
            >
              <div class="swiper-wrapper">
                ${banners.map(
      (banner, i) => html`
                    <div class="swiper-slide bpb-slide">
                      ${this.renderCard(banner, i, banners.length)}
                    </div>
                  `
    )}
              </div>

              ${multi ? html`
                    <button
                      type="button"
                      class="bpb-nav bpb-nav--prev"
                      aria-label=${t("السابق", "Previous")}
                    >
                      <span class="bpb-nav__chev" aria-hidden="true"></span>
                    </button>
                    <button
                      type="button"
                      class="bpb-nav bpb-nav--next"
                      aria-label=${t("التالي", "Next")}
                    >
                      <span class="bpb-nav__chev" aria-hidden="true"></span>
                    </button>
                  ` : nothing}
            </div>

            ${multi ? html`<div
                  class="bpb-dots"
                  aria-label=${t("شرائح العرض", "Promo slides")}
                ></div>` : nothing}
          </div>
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t("أضيفي البنرات من إعدادات العنصر", "Add banners in the element settings")}
      </div>`;
  }
};
__name(_BeautyPromoBanners, "BeautyPromoBanners"), _BeautyPromoBanners.styles = [sharedSectionCss, fsSwiperCss, componentStyles];
let BeautyPromoBanners = _BeautyPromoBanners;
__decorateClass([
  property({ type: Object })
], BeautyPromoBanners.prototype, "config");
__decorateClass([
  state()
], BeautyPromoBanners.prototype, "swiperReady");
bindSallaRegistration(BeautyPromoBanners);
typeof BeautyPromoBanners < "u" && BeautyPromoBanners.registerSallaComponent("salla-beauty-promo-banners");
export {
  BeautyPromoBanners as default
};
