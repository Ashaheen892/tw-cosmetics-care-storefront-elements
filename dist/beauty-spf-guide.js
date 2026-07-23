var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
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
function toNumber(val, fallback = 0) {
  if (typeof val == "number" && Number.isFinite(val)) return val;
  if (typeof val == "string" && val.trim() !== "") {
    const n = Number(val.replace(",", "."));
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}
__name(toNumber, "toNumber");
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
__name(clamp, "clamp");
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
function t(ar, en, value, fallbackAr) {
  return getPageLocale() === "en" ? en : fallbackAr || ar;
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
function renderCommerceCtaButton(config, prefix, options = {}) {
  const ctaLink = (options.href || "").trim() || extractLink(config[`${prefix}result_link`] ?? config[`${prefix}cta_link`]) || "/", ctaLabel = localizedString(config[`${prefix}cta_label`], "").trim() || t("تسوق الآن", "Shop now"), className = ["fs-btn", "fs-tap", options.className || ""].filter(Boolean).join(" ");
  return html`<a
    class=${className}
    href=${ctaLink}
    target=${isExternalUrl(ctaLink) ? "_blank" : nothing}
    rel=${isExternalUrl(ctaLink) ? "noopener noreferrer" : nothing}
  >
    ${ctaLabel}
  </a>`;
}
__name(renderCommerceCtaButton, "renderCommerceCtaButton");
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
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bsg-wrap {
    display: grid;
    gap: 1.25rem;
    width: 100%;
    max-width: 720px;
    margin-inline: auto;
  }

  .bsg-wrap:has(.bsg-results) {
    max-width: 840px;
  }

  .bsg-progress {
    display: grid;
    gap: 0.45rem;
  }

  .bsg-progress__bar {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, #fff);
    overflow: hidden;
  }

  .bsg-progress__bar span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #7b2c52)
    );
    transition: width 0.25s ease;
  }

  .bsg-progress__text {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted-color, #666666);
  }

  .bsg-progress__step {
    font-weight: 700;
    color: var(--text-color, #000000);
  }

  .bsg-step {
    display: grid;
    gap: 0.75rem;
    padding: 1.15rem 1.2rem;
    border-radius: var(--section-radius, 16px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 8px 24px rgba(194, 82, 127, 0.06);
  }

  .bsg-step__title {
    margin: 0;
    font-size: 1.12rem;
    font-weight: 800;
    line-height: 1.35;
    color: var(--text-color, #000000);
  }

  .bsg-step__hint {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.55;
    color: var(--muted-color, #666666);
  }

  .bsg-options {
    display: grid;
    gap: 0.55rem;
  }

  .bsg-options--compact {
    grid-template-columns: repeat(auto-fill, minmax(5.5rem, 1fr));
  }

  .bsg-option {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    width: 100%;
    min-height: 48px;
    padding: 0.75rem 0.9rem;
    border-radius: calc(var(--section-radius, 16px) * 0.75);
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    text-align: start;
    cursor: pointer;
    box-sizing: border-box;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease,
      box-shadow 0.2s ease;
  }

  .bsg-option:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .bsg-option[aria-pressed='true'] {
    border-color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, transparent);
  }

  .bsg-option--compact {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0.85rem 0.5rem;
  }

  .bsg-option__body {
    display: grid;
    gap: 0.15rem;
    min-width: 0;
  }

  .bsg-option__name {
    font-size: 0.92rem;
    font-weight: 700;
    line-height: 1.3;
  }

  .bsg-option__desc {
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--muted-color, #666666);
    line-height: 1.45;
  }

  .bsg-swatch {
    width: 1.15rem;
    height: 1.15rem;
    margin-top: 0.15rem;
    border-radius: 50%;
    border: 1px solid color-mix(in srgb, #000 12%, transparent);
    flex: 0 0 auto;
    background: var(--bsg-swatch, var(--accent-color, var(--fs-store-primary)));
  }

  .bsg-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
  }

  .bsg-nav .fs-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .bsg-results {
    display: grid;
    gap: 1rem;
    padding: 1.25rem 1.2rem 1.35rem;
    border-radius: var(--section-radius, 16px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 10px 30px rgba(43, 33, 28, 0.07);
  }

  .bsg-results__title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bsg-results__summary {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .bsg-results__pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #e5e7eb));
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text-color, #000000);
  }

  .bsg-results__pill .bsg-swatch {
    margin-top: 0;
    width: 0.85rem;
    height: 0.85rem;
  }

  .bsg-duration {
    display: grid;
    gap: 0.3rem;
    padding: 0.9rem 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 20%, transparent);
  }

  .bsg-duration--hero {
    padding: 1.15rem 1.1rem;
    text-align: center;
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, var(--card-bg, #fff)),
      var(--card-bg, #fff)
    );
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, var(--border-color, #e5e7eb));
  }

  .bsg-duration__label {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
  }

  .bsg-duration__value {
    font-size: 1.85rem;
    font-weight: 800;
    line-height: 1.1;
    color: var(--accent-color, var(--fs-store-primary));
    letter-spacing: -0.01em;
  }

  .bsg-duration--hero .bsg-duration__value {
    font-size: 2.35rem;
  }

  .bsg-meter-wrap {
    display: grid;
    gap: 0.4rem;
  }

  .bsg-meter-wrap--hero .bsg-meter {
    height: 14px;
  }

  .bsg-meter {
    height: 10px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 65%, #fff);
    overflow: hidden;
  }

  .bsg-meter span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, #e0a100 80%, var(--accent-color, var(--fs-store-primary))),
      var(--accent-color, var(--fs-store-primary))
    );
    transition: width 0.35s ease;
  }

  .bsg-meter-caption {
    margin: 0;
    font-size: 0.72rem;
    color: var(--muted-color, #666666);
    line-height: 1.5;
  }

  .bsg-reapply {
    display: flex;
    gap: 0.65rem;
    align-items: flex-start;
    padding: 0.85rem 0.95rem;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    background: color-mix(in srgb, #e0a100 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, #e0a100 35%, transparent);
  }

  .bsg-reapply__icon {
    font-size: 1.25rem;
    line-height: 1.2;
    flex: 0 0 auto;
  }

  .bsg-reapply__body {
    display: grid;
    gap: 0.2rem;
  }

  .bsg-reapply__main {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    color: color-mix(in srgb, var(--fs-caution, #e0a100) 45%, var(--text-color, #000000));
    line-height: 1.5;
  }

  .bsg-reapply__note {
    margin: 0;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
    line-height: 1.55;
  }

  .bsg-tips {
    display: grid;
    gap: 0.4rem;
  }

  .bsg-tips__title {
    margin: 0 0 0.15rem;
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bsg-tips ul {
    margin: 0;
    padding-inline-start: 1.15rem;
    display: grid;
    gap: 0.35rem;
    color: var(--muted-color, #666666);
    font-size: 0.86rem;
    line-height: 1.55;
  }

  .bsg-results__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .bsg-notice {
    margin: 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.6;
  }

  .bsg-notice--inline {
    padding-top: 0.25rem;
    border-top: 1px solid var(--border-color, #e5e7eb);
  }

  @media (max-width: 639px) {
    .bsg-duration__value {
      font-size: 1.6rem;
    }
    .bsg-duration--hero .bsg-duration__value {
      font-size: 2rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bsg-option,
    .bsg-progress__bar span,
    .bsg-meter span {
      transition: none;
    }
  }
`;
function buildStepPlan(hasConditions) {
  const steps = ["phototype", "spf"];
  return hasConditions && steps.push("condition"), steps;
}
__name(buildStepPlan, "buildStepPlan");
function parsePhototypes(raw) {
  return normalizeCollection(raw).map((row, i) => {
    const name = localizedString(row.name);
    return {
      id: String(row.id ?? row.pt_id ?? "").trim() || `pt-${i + 1}`,
      name,
      desc: localizedString(row.desc),
      baseMinutes: clamp(toNumber(row.base_minutes, 15), 1, 240),
      color: String(row.color ?? "").trim()
    };
  }).filter((row) => row.name);
}
__name(parsePhototypes, "parsePhototypes");
function parseSpfValues(raw) {
  return normalizeCollection(raw).map((row) => {
    const spf = clamp(Math.round(toNumber(row.spf, 30)), 1, 100), label = localizedString(row.label) || `SPF ${spf}`;
    return { spf, label };
  }).filter((row) => row.spf > 0);
}
__name(parseSpfValues, "parseSpfValues");
function parseConditions(raw) {
  return normalizeCollection(raw).map((row, i) => {
    const name = localizedString(row.name);
    return {
      id: String(row.id ?? row.cond_id ?? "").trim() || `cond-${i + 1}`,
      name,
      factor: clamp(toNumber(row.factor, 1), 0.1, 3),
      desc: localizedString(row.desc)
    };
  }).filter((row) => row.name);
}
__name(parseConditions, "parseConditions");
function parseTips(raw) {
  return normalizeCollection(raw).map((row) => localizedString(row.tip)).filter(Boolean);
}
__name(parseTips, "parseTips");
function estimateMinutes(base, spf, factor) {
  return clamp(base * spf * factor, 0, 1e5);
}
__name(estimateMinutes, "estimateMinutes");
function formatDuration(minutes) {
  const total = Math.max(0, Math.round(minutes)), hours = Math.floor(total / 60), mins = total % 60, hUnit = t("س", "h"), mUnit = t("د", "m");
  return hours <= 0 ? `${mins}${mUnit}` : mins <= 0 ? `${hours}${hUnit}` : `${hours}${hUnit} ${mins}${mUnit}`;
}
__name(formatDuration, "formatDuration");
function stepLabel(key, config) {
  return key === "phototype" ? localizedString(config.bsg_phototype_label) || t("نوع البشرة", "Skin phototype") : key === "spf" ? localizedString(config.bsg_spf_label) || t("عامل الحماية SPF", "SPF value") : localizedString(config.bsg_condition_label) || t("ظروف التعرّض", "Exposure condition");
}
__name(stepLabel, "stepLabel");
const METER_CAP_MINUTES = 480;
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
const _BeautySpfGuide = class _BeautySpfGuide extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.selectedPtId = "", this.selectedSpf = 0, this.selectedCondId = "", this.stepIndex = 0, this.boundLangHandler = () => this.requestUpdate(), this.boundKeyHandler = (event) => this.onKeyDown(event);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.addEventListener("keydown", this.boundKeyHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.removeEventListener("keydown", this.boundKeyHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.selectedPtId = "", this.selectedSpf = 0, this.selectedCondId = "", this.stepIndex = 0);
  }
  get phototypes() {
    var _a;
    return parsePhototypes((_a = this.config) == null ? void 0 : _a.bsg_phototypes);
  }
  get spfValues() {
    var _a;
    return parseSpfValues((_a = this.config) == null ? void 0 : _a.bsg_spf_values);
  }
  get conditions() {
    var _a;
    return parseConditions((_a = this.config) == null ? void 0 : _a.bsg_conditions);
  }
  get plan() {
    return buildStepPlan(this.conditions.length > 0);
  }
  get onResults() {
    return this.stepIndex >= this.plan.length;
  }
  get currentStep() {
    return this.onResults ? null : this.plan[this.stepIndex] ?? null;
  }
  get canNext() {
    const step = this.currentStep;
    return step ? step === "phototype" ? !!this.selectedPtId : step === "spf" ? this.selectedSpf > 0 : step === "condition" ? !!this.selectedCondId : !1 : !1;
  }
  goNext() {
    this.stepIndex < this.plan.length && (this.stepIndex += 1);
  }
  goBack() {
    this.stepIndex > 0 && (this.stepIndex -= 1);
  }
  reset() {
    this.selectedPtId = "", this.selectedSpf = 0, this.selectedCondId = "", this.stepIndex = 0;
  }
  onKeyDown(event) {
    const target = event.target;
    target != null && target.closest("button, a, input, textarea, select") || (event.key === "Enter" && !this.onResults && this.canNext && (event.preventDefault(), this.goNext()), event.key === "Backspace" && this.stepIndex > 0 && !this.onResults && (event.preventDefault(), this.goBack()));
  }
  renderProgress(total) {
    const current = Math.min(this.stepIndex + 1, total), pct = total ? Math.round(Math.min(this.stepIndex, total) / total * 100) : 0, step = this.currentStep, stepName = step ? stepLabel(step, this.config || {}) : "";
    return html`
      <div class="bsg-progress" aria-hidden="true">
        <div class="bsg-progress__bar"><span style=${styleMap({ width: `${pct}%` })}></span></div>
        <span class="bsg-progress__text">
          ${this.onResults ? t("النتيجة", "Result") : html`${t(`الخطوة ${current} من ${total}`, `Step ${current} of ${total}`)}
                <span class="bsg-progress__step"> · ${stepName}</span>`}
        </span>
      </div>
    `;
  }
  renderPhototypeStep(list) {
    const label = stepLabel("phototype", this.config || {});
    return html`
      <div class="bsg-step">
        <h3 class="bsg-step__title">${label}</h3>
        <p class="bsg-step__hint">${t("اختاري نوع بشرتك حسب حساسيتها للشمس", "Pick your sun-sensitivity phototype")}</p>
        <div class="bsg-options" role="group" aria-label=${label}>
          ${list.map((pt) => {
      const isActive = this.selectedPtId === pt.id;
      return html`
              <button
                type="button"
                class="bsg-option"
                aria-pressed=${isActive ? "true" : "false"}
                style=${styleMap(pt.color ? { "--bsg-swatch": pt.color } : {})}
                @click=${() => this.selectedPtId = pt.id}
              >
                <span class="bsg-swatch" aria-hidden="true"></span>
                <span class="bsg-option__body">
                  <span class="bsg-option__name">${pt.name}</span>
                  ${pt.desc ? html`<span class="bsg-option__desc">${pt.desc}</span>` : nothing}
                </span>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderSpfStep(list) {
    const label = stepLabel("spf", this.config || {});
    return html`
      <div class="bsg-step">
        <h3 class="bsg-step__title">${label}</h3>
        <p class="bsg-step__hint">${t("اختاري عامل الحماية الذي تستخدمينه", "Choose the SPF you apply")}</p>
        <div class="bsg-options bsg-options--compact" role="group" aria-label=${label}>
          ${list.map((sv) => {
      const isActive = this.selectedSpf === sv.spf;
      return html`
              <button
                type="button"
                class="bsg-option bsg-option--compact"
                aria-pressed=${isActive ? "true" : "false"}
                @click=${() => this.selectedSpf = sv.spf}
              >
                <span class="bsg-option__name">${sv.label}</span>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderConditionStep(list) {
    const label = stepLabel("condition", this.config || {});
    return html`
      <div class="bsg-step">
        <h3 class="bsg-step__title">${label}</h3>
        <p class="bsg-step__hint">${t("اختاري ظروف تعرّضك للشمس اليوم", "Pick today's sun exposure setting")}</p>
        <div class="bsg-options" role="group" aria-label=${label}>
          ${list.map((cond) => {
      const isActive = this.selectedCondId === cond.id;
      return html`
              <button
                type="button"
                class="bsg-option"
                aria-pressed=${isActive ? "true" : "false"}
                @click=${() => this.selectedCondId = cond.id}
              >
                <span class="bsg-option__body">
                  <span class="bsg-option__name">${cond.name}</span>
                  ${cond.desc ? html`<span class="bsg-option__desc">${cond.desc}</span>` : nothing}
                </span>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderNav() {
    var _a, _b, _c;
    const back = localizedString((_a = this.config) == null ? void 0 : _a.bsg_back_btn) || t("السابق", "Back"), next = localizedString((_b = this.config) == null ? void 0 : _b.bsg_next_btn) || t("التالي", "Next"), see = localizedString((_c = this.config) == null ? void 0 : _c.bsg_see_btn) || t("عرض التقدير", "See estimate"), lastStep = this.stepIndex === this.plan.length - 1;
    return html`
      <div class="bsg-nav">
        ${this.stepIndex > 0 ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
              ${back}
            </button>` : html`<span></span>`}
        <button
          type="button"
          class="fs-btn fs-tap"
          ?disabled=${!this.canNext}
          @click=${() => this.goNext()}
        >
          ${lastStep ? see : next}
        </button>
      </div>
    `;
  }
  renderCurrentStep() {
    const step = this.currentStep;
    return step ? step === "phototype" ? this.renderPhototypeStep(this.phototypes) : step === "spf" ? this.renderSpfStep(this.spfValues) : this.renderConditionStep(this.conditions) : nothing;
  }
  renderResults() {
    var _a, _b;
    const c = this.config || {}, phototypes = this.phototypes, spfValues = this.spfValues, conditions = this.conditions, tips = parseTips(c.bsg_tips), activePt = phototypes.find((p) => p.id === this.selectedPtId) ?? null, activeSpf = spfValues.find((s) => s.spf === this.selectedSpf) ?? null, activeCond = conditions.find((cond) => cond.id === this.selectedCondId) ?? null, factor = (activeCond == null ? void 0 : activeCond.factor) ?? 1, minutes = estimateMinutes((activePt == null ? void 0 : activePt.baseMinutes) ?? 0, (activeSpf == null ? void 0 : activeSpf.spf) ?? 0, factor), meterPct = clamp(minutes / METER_CAP_MINUTES * 100, 0, 100), showMeter = isTruthy(c.bsg_show_meter, !0), showNotice = isTruthy(c.bsg_show_notice, !0), reapplyMinutes = clamp(Math.round(toNumber(c.bsg_reapply_minutes, 120)), 1, 1e5), reapplyNote = localizedString(c.bsg_reapply_note), resultTitle = localizedString(c.bsg_result_title) || t("توصياتك", "Your guidance"), notice = localizedString(c.bsg_notice) || t("هذه إرشادات توعوية عامة وليست نصيحة طبية.", "This is general educational guidance, not medical advice."), reapplyMain = t(
      `أعيدي التطبيق كل ${reapplyMinutes} دقيقة`,
      `Reapply every ${reapplyMinutes} min`
    );
    return html`
      <div class="bsg-results" aria-live="polite">
        <h3 class="bsg-results__title">${resultTitle}</h3>

        <div class="bsg-results__summary">
          ${activePt ? html`<span class="bsg-results__pill">
                <span
                  class="bsg-swatch"
                  aria-hidden="true"
                  style=${styleMap(activePt.color ? { "--bsg-swatch": activePt.color } : {})}
                ></span>
                ${activePt.name}
              </span>` : nothing}
          ${activeSpf ? html`<span class="bsg-results__pill">${activeSpf.label}</span>` : nothing}
          ${activeCond ? html`<span class="bsg-results__pill">${activeCond.name}</span>` : nothing}
        </div>

        <div class="bsg-duration bsg-duration--hero">
          <span class="bsg-duration__label">
            ${t("تقدير تقريبي لمدة التعرّض الآمن", "Rough safe-exposure estimate")}
          </span>
          <span class="bsg-duration__value">${formatDuration(minutes)}</span>
        </div>

        ${showMeter ? html`<div class="bsg-meter-wrap bsg-meter-wrap--hero">
              <div
                class="bsg-meter"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow=${Math.round(meterPct)}
                aria-label=${t("مؤشر التعرّض التوضيحي", "Illustrative exposure meter")}
              >
                <span style=${styleMap({ width: `${meterPct}%` })}></span>
              </div>
              <p class="bsg-meter-caption">
                ${t("مؤشر توضيحي فقط — التقدير يقلّ في ظروف الانعكاس العالي.", "Illustrative only — the estimate drops in high-reflection conditions.")}
              </p>
            </div>` : nothing}

        <div class="bsg-reapply">
          <span class="bsg-reapply__icon" aria-hidden="true">☀︎</span>
          <div class="bsg-reapply__body">
            <p class="bsg-reapply__main">${reapplyMain}</p>
            ${reapplyNote ? html`<p class="bsg-reapply__note">${reapplyNote}</p>` : html`<p class="bsg-reapply__note">${t("أعيدي التطبيق بعد السباحة أو التعرّق.", "Reapply after swimming or sweating.")}</p>`}
          </div>
        </div>

        ${tips.length ? html`<div class="bsg-tips">
              <p class="bsg-tips__title">${t("نصائح", "Tips")}</p>
              <ul>${tips.map((tip) => html`<li>${tip}</li>`)}</ul>
            </div>` : nothing}

        <div class="bsg-results__actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
            ${localizedString((_a = this.config) == null ? void 0 : _a.bsg_back_btn) || t("تعديل الاختيارات", "Edit choices")}
          </button>
          <button type="button" class="fs-btn fs-tap" @click=${() => this.reset()}>
            ${localizedString((_b = this.config) == null ? void 0 : _b.bsg_reset_btn) || t("ابدئي من جديد", "Start over")}
          </button>
          ${renderCommerceCtaButton(c, "bsg_")}
        </div>

        ${showNotice ? html`<p class="bsg-notice bsg-notice--inline">${notice}</p>` : nothing}
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bsg_"), animate = theme.animate && !prefersReducedMotion(), phototypes = this.phototypes, spfValues = this.spfValues, plan = this.plan, title = localizedString(c.bsg_title), desc = localizedString(c.bsg_desc);
    return !phototypes.length || !spfValues.length ? html`
        <section
          class=${classMap({ "fs-section": !0, "fs-animate": animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t("دليل الحماية من الشمس", "Sun protection guide")}
        >
          <div class="fs-container">
            <div class="fs-empty" role="status">
              ${t("أكملي إعدادات العنصر لعرض الدليل.", "Complete the element settings to show the guide.")}
            </div>
          </div>
        </section>
      ` : html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("دليل الحماية من الشمس", "Sun protection guide")}
        tabindex="0"
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="bsg-wrap">
            ${this.renderProgress(plan.length)}
            ${this.onResults ? this.renderResults() : html`
                  ${this.renderCurrentStep()}
                  ${this.renderNav()}
                `}
          </div>
        </div>
      </section>
    `;
  }
};
__name(_BeautySpfGuide, "BeautySpfGuide"), _BeautySpfGuide.styles = [sharedSectionCss, componentStyles];
let BeautySpfGuide = _BeautySpfGuide;
__decorateClass([
  property({ type: Object })
], BeautySpfGuide.prototype, "config");
__decorateClass([
  state()
], BeautySpfGuide.prototype, "selectedPtId");
__decorateClass([
  state()
], BeautySpfGuide.prototype, "selectedSpf");
__decorateClass([
  state()
], BeautySpfGuide.prototype, "selectedCondId");
__decorateClass([
  state()
], BeautySpfGuide.prototype, "stepIndex");
bindSallaRegistration(BeautySpfGuide);
typeof BeautySpfGuide < "u" && BeautySpfGuide.registerSallaComponent("salla-beauty-spf-guide");
export {
  BeautySpfGuide as default
};
