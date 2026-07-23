var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
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
  return getPageLocale() === "en" ? en : fallbackAr || ar;
}
__name(t, "t");
function safeStorageGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
__name(safeStorageGet, "safeStorageGet");
function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
}
__name(safeStorageSet, "safeStorageSet");
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
function getRadioValue(value, fallback = "") {
  const fromOption = /* @__PURE__ */ __name((item) => {
    if (typeof item == "string" && item.trim()) return item.trim();
    if (!item || typeof item != "object") return "";
    const o = item;
    return o.value != null && String(o.value).trim() ? String(o.value).trim() : o.key != null && String(o.key).trim() ? String(o.key).trim() : "";
  }, "fromOption");
  if (typeof value == "string" && value.trim()) return value.trim();
  if (Array.isArray(value) && value[0])
    return fromOption(value[0]) || fallback;
  if (value && typeof value == "object") {
    const obj = value;
    if (Array.isArray(obj.selected) && obj.selected[0]) {
      const picked = fromOption(obj.selected[0]);
      if (picked) {
        if (Array.isArray(obj.options))
          for (const opt of obj.options) {
            if (!opt || typeof opt != "object") continue;
            const row = opt, optVal = row.value != null ? String(row.value).trim() : "", optKey = row.key != null ? String(row.key).trim() : "";
            if (picked === optVal || picked === optKey)
              return optVal || picked;
          }
        return picked;
      }
    }
    if ("value" in obj && obj.value != null && !Array.isArray(obj.value)) {
      const v = String(obj.value).trim();
      if (v) return v;
    }
    if (Array.isArray(obj.value) && obj.value[0])
      return fromOption(obj.value[0]) || fallback;
  }
  return fallback;
}
__name(getRadioValue, "getRadioValue");
function parseTags(raw) {
  const text = localizedString(raw, "");
  return text ? text.split(/[,،|/]/).map((part) => part.trim()).filter(Boolean) : [];
}
__name(parseTags, "parseTags");
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

  .bfz-layout {
    display: grid;
    gap: 1.35rem;
    align-items: start;
    width: 100%;
  }

  @media (min-width: 860px) {
    .bfz-layout {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      gap: 1.75rem;
    }

    .bfz-layout--reverse .bfz-stage-wrap {
      order: 2;
    }

    .bfz-layout--reverse .bfz-panel {
      order: 1;
    }

    .bfz-panel {
      position: sticky;
      top: 1rem;
    }
  }

  /* —— Map stage —— */
  .bfz-stage-wrap {
    position: relative;
    width: 100%;
    min-width: 0;
    display: grid;
    gap: 0.85rem;
  }

  .bfz-stage {
    position: relative;
    width: 100%;
    aspect-ratio: var(--bfz-aspect, 3 / 4);
    border-radius: var(--section-radius, 20px);
    overflow: hidden;
    background:
      radial-gradient(
        90% 70% at 50% 20%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
        transparent 60%
      ),
      color-mix(in srgb, var(--border-color, #e5e7eb) 35%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
      0 18px 40px rgba(120, 44, 82, 0.08);
  }

  .bfz-stage::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, #fff 35%, transparent);
    z-index: 2;
  }

  .bfz-stage__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .bfz-stage__empty,
  .bfz-stage__missing {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.5rem;
    color: var(--muted-color, #666666);
    font-size: 0.88rem;
    line-height: 1.55;
    background: repeating-linear-gradient(
      -45deg,
      color-mix(in srgb, var(--border-color, #e5e7eb) 25%, var(--card-bg, #fff)),
      color-mix(in srgb, var(--border-color, #e5e7eb) 25%, var(--card-bg, #fff)) 10px,
      color-mix(in srgb, var(--border-color, #e5e7eb) 12%, var(--card-bg, #fff)) 10px,
      color-mix(in srgb, var(--border-color, #e5e7eb) 12%, var(--card-bg, #fff)) 20px
    );
  }

  .bfz-stage__missing p {
    margin: 0;
    max-width: 14rem;
    font-weight: 600;
  }

  .bfz-stage__missing-icon {
    font-size: 2.5rem;
    opacity: 0.35;
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  /* —— Zone legend —— */
  .bfz-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    justify-content: center;
  }

  .bfz-legend__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 36px;
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
      transform 0.15s ease;
  }

  .bfz-legend__btn:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .bfz-legend__btn.is-active {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    border-color: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    transform: translateY(-1px);
  }

  .bfz-legend__swatch {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: var(--dot-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: 0 0 0 2px color-mix(in srgb, #fff 70%, transparent);
    flex: 0 0 auto;
  }

  .bfz-legend__btn.is-active .bfz-legend__swatch {
    box-shadow: 0 0 0 2px color-mix(in srgb, #fff 35%, transparent);
  }

  /* —— Hotspots —— */
  .bfz-dot {
    position: absolute;
    z-index: 3;
    transform: translate(-50%, -50%);
    inset-inline-start: var(--dot-x, 50%);
    top: var(--dot-y, 50%);
    width: var(--dot-size, 30px);
    height: var(--dot-size, 30px);
    min-width: 28px;
    min-height: 28px;
    display: grid;
    place-items: center;
    padding: 0;
    border-radius: 50%;
    border: 2.5px solid #fff;
    background: var(--dot-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-size: 0.8rem;
    font-weight: 800;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(20, 14, 12, 0.28);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  :host-context([dir='rtl']) .bfz-dot,
  :host([dir='rtl']) .bfz-dot {
    inset-inline-start: auto;
    inset-inline-end: var(--dot-x, 50%);
    transform: translate(50%, -50%);
  }

  .bfz-dot:hover,
  .bfz-dot:focus-visible {
    transform: translate(-50%, -50%) scale(1.14);
    outline: none;
  }

  :host-context([dir='rtl']) .bfz-dot:hover,
  :host-context([dir='rtl']) .bfz-dot:focus-visible,
  :host([dir='rtl']) .bfz-dot:hover,
  :host([dir='rtl']) .bfz-dot:focus-visible {
    transform: translate(50%, -50%) scale(1.14);
  }

  .bfz-dot.is-active {
    box-shadow:
      0 0 0 5px color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 32%, transparent),
      0 8px 18px rgba(20, 14, 12, 0.3);
  }

  .bfz-dot--ring {
    background: color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 12%, transparent);
    border-color: var(--dot-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 28%, transparent);
  }

  .bfz-dot--area {
    border-radius: 14px;
    background: color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 22%, transparent);
    border-style: dashed;
    width: calc(var(--dot-size, 30px) * 2.2);
    height: calc(var(--dot-size, 30px) * 1.6);
  }

  .bfz-dot--icon {
    background: color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 88%, #000);
  }

  .bfz-dot__pulse {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: inherit;
    opacity: 0.55;
    animation: bfz-pulse var(--bfz-pulse-speed, 2200ms) ease-out infinite;
    pointer-events: none;
  }

  @keyframes bfz-pulse {
    0% {
      transform: scale(1);
      opacity: 0.55;
    }
    70% {
      transform: scale(2.1);
      opacity: 0;
    }
    100% {
      transform: scale(2.1);
      opacity: 0;
    }
  }

  .bfz-dot__label {
    position: absolute;
    top: calc(100% + 6px);
    inset-inline-start: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-color, #000000);
    background: color-mix(in srgb, var(--card-bg, #fff) 92%, transparent);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
    padding: 0.15rem 0.45rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(43, 33, 28, 0.08);
    pointer-events: none;
  }

  /* —— Detail panel —— */
  .bfz-panel {
    min-width: 0;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    border-radius: var(--section-radius, 20px);
    padding: 1.2rem 1.25rem 1.35rem;
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
      0 16px 36px rgba(120, 44, 82, 0.08);
    display: grid;
    gap: 0.95rem;
  }

  .bfz-panel__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .bfz-panel__eyebrow {
    margin: 0 0 0.25rem;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--accent-color, var(--fs-store-primary));
    text-transform: uppercase;
  }

  .bfz-panel__title {
    margin: 0;
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    font-weight: 800;
    line-height: 1.3;
    color: var(--text-color, #000000);
  }

  .bfz-nav {
    display: inline-flex;
    gap: 0.35rem;
    flex: 0 0 auto;
  }

  .bfz-nav__btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 1px solid var(--border-color, #e5e7eb);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 1.05rem;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  }

  .bfz-nav__btn:hover,
  .bfz-nav__btn:focus-visible {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
    outline: none;
  }

  .bfz-panel__img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: calc(var(--section-radius, 20px) - 8px);
    display: block;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, #f2ece8);
  }

  .bfz-panel__desc {
    margin: 0;
    color: var(--muted-color, #666666);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .bfz-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bfz-tag {
    font-size: 0.74rem;
    font-weight: 700;
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent);
  }

  .bfz-block {
    display: grid;
    gap: 0.55rem;
    padding-top: 0.15rem;
  }

  .bfz-block__title {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--text-color, #000000);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .bfz-block__title::before {
    content: '';
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    flex: 0 0 auto;
  }

  .bfz-steps {
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: bfz-step;
    display: grid;
    gap: 0.5rem;
  }

  .bfz-steps li {
    counter-increment: bfz-step;
    position: relative;
    padding-block: 0.65rem;
    padding-inline: 2.45rem 0.75rem;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 5%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
    border-radius: 12px;
  }

  .bfz-steps li::before {
    content: counter(bfz-step);
    position: absolute;
    inset-inline-start: 0.55rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.45rem;
    height: 1.45rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-size: 0.72rem;
    font-weight: 800;
  }

  .bfz-tips {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.4rem;
  }

  .bfz-tips li {
    position: relative;
    padding-inline-start: 1.15rem;
    color: var(--muted-color, #666666);
    font-size: 0.86rem;
    line-height: 1.55;
  }

  .bfz-tips li::before {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    top: 0.55em;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #fff);
  }

  .bfz-warn {
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
    padding: 0.75rem 0.85rem;
    border-radius: 14px;
    background: color-mix(in srgb, #e0a100 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, #e0a100 34%, transparent);
    color: color-mix(in srgb, var(--fs-caution, #e0a100) 45%, var(--text-color, #000000));
    font-size: 0.84rem;
    line-height: 1.55;
  }

  .bfz-panel .fs-btn {
    justify-self: start;
    margin-top: 0.15rem;
  }

  .bfz-notice {
    margin: 1.35rem 0 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.6;
  }

  .bfz-dot.is-coach-pulse {
    animation: bfz-coach-dot 1.8s ease-in-out infinite;
  }

  @keyframes bfz-coach-dot {
    0%,
    100% {
      box-shadow:
        0 6px 16px rgba(20, 14, 12, 0.28),
        0 0 0 0 color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 45%, transparent);
    }
    50% {
      box-shadow:
        0 6px 16px rgba(20, 14, 12, 0.28),
        0 0 0 10px color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 0%, transparent);
    }
  }

  .bfz-coach {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
    padding: 0.7rem 0.9rem;
    border-radius: 14px;
    background: linear-gradient(
      135deg,
      var(--text-color, #33232e),
      color-mix(in srgb, var(--text-color, #33232e) 78%, var(--accent-color, var(--fs-store-primary)))
    );
    color: #fff;
    font-size: 0.84rem;
    font-weight: 700;
    box-shadow: 0 10px 28px rgba(20, 14, 12, 0.2);
    animation: bfz-coach-in 0.35s ease;
  }

  .bfz-coach__text {
    margin: 0;
  }

  .bfz-coach__dismiss {
    flex: 0 0 auto;
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, #fff 18%, transparent);
    color: #fff;
    cursor: pointer;
    font-size: 0.75rem;
  }

  @keyframes bfz-coach-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .bfz-panel--empty {
    min-height: 14rem;
    place-items: center;
  }

  .bfz-empty-state {
    text-align: center;
    padding: 1.35rem 1rem;
    max-width: 20rem;
    margin-inline: auto;
  }

  .bfz-empty-state__icon {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    margin: 0 auto 0.75rem;
    border-radius: 50%;
    font-size: 1.25rem;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    line-height: 1;
  }

  .bfz-empty-state__title {
    margin: 0 0 0.4rem;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bfz-empty-state__text {
    margin: 0;
    font-size: 0.86rem;
    color: var(--muted-color, #666666);
    line-height: 1.65;
  }

  .bfz-layout--sheet .bfz-sheet-close {
    display: grid;
  }

  @media (max-width: 859px) {
    .bfz-layout--sheet .bfz-panel--empty {
      display: none;
    }

    .bfz-layout--sheet .bfz-panel:not(.bfz-panel--empty) {
      position: fixed;
      inset-inline: 0;
      bottom: 0;
      z-index: 60;
      border-radius: 20px 20px 0 0;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 -14px 44px rgba(20, 14, 12, 0.28);
      animation: bfz-sheet-up 0.28s ease;
    }

    .bfz-sheet-backdrop {
      position: fixed;
      inset: 0;
      z-index: 55;
      background: rgba(20, 14, 12, 0.42);
      border: none;
    }
  }

  @keyframes bfz-sheet-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bfz-dot,
    .bfz-dot__pulse,
    .bfz-dot.is-coach-pulse,
    .bfz-coach,
    .bfz-panel,
    .bfz-legend__btn {
      animation: none !important;
      transition: none !important;
    }
  }
`, DOT_SHAPES = ["pulse", "ring", "number", "icon", "area", "label"];
function splitList(raw) {
  const text = localizedString(raw, "");
  return text ? text.split(/\r?\n|،|;|,/).map((part) => part.trim()).filter(Boolean) : [];
}
__name(splitList, "splitList");
function parseZones(raw) {
  return normalizeCollection(raw).map((z, i) => {
    const name = localizedString(z.name), title = localizedString(z.title) || name;
    return {
      id: String(z.id ?? z.zone_id ?? "").trim() || `zone-${i + 1}`,
      name,
      x: clamp(toNumber(z.x, 50), 0, 100),
      y: clamp(toNumber(z.y, 50), 0, 100),
      dotSize: clamp(toNumber(z.dot_size, 30), 12, 120),
      dotColor: String(z.dot_color ?? "").trim(),
      icon: String(z.icon ?? "").trim(),
      title,
      desc: localizedString(z.desc),
      tags: parseTags(z.tags),
      steps: splitList(z.steps),
      tips: splitList(z.tips),
      warning: localizedString(z.warning),
      image: extractImageUrl(z.image),
      link: extractLink(z.link)
    };
  }).filter((z) => z.name || z.title || z.desc);
}
__name(parseZones, "parseZones");
function resolveDotShape(config) {
  const value = getRadioValue(config.bfz_dot_shape, "pulse");
  return DOT_SHAPES.includes(value) ? value : "pulse";
}
__name(resolveDotShape, "resolveDotShape");
function resolveDetailMode(config) {
  return getRadioValue(config.bfz_detail_mode, "inline") === "sheet" ? "sheet" : "inline";
}
__name(resolveDetailMode, "resolveDetailMode");
function resolveAspect(config, fallback = "3/4") {
  return (getRadioValue(config.bfz_aspect, fallback) || fallback).replace("/", " / ");
}
__name(resolveAspect, "resolveAspect");
const COACH_KEY = "tw-bfz-coach-seen", _BeautyFaceZoneMap = class _BeautyFaceZoneMap extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.showCoach = !1, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.showCoach = !safeStorageGet(COACH_KEY, !1);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.activeId = this.defaultZoneId(this.zones));
  }
  dismissCoach() {
    this.showCoach = !1, safeStorageSet(COACH_KEY, !0);
  }
  get zones() {
    var _a;
    return parseZones((_a = this.config) == null ? void 0 : _a.bfz_zones);
  }
  /** Merchant preset, otherwise the first zone — never leave the panel empty. */
  defaultZoneId(zones) {
    var _a, _b;
    if (!zones.length) return "";
    const preset = String(((_a = this.config) == null ? void 0 : _a.bfz_default_zone) ?? "").trim();
    return preset && zones.some((z) => z.id === preset) ? preset : ((_b = zones[0]) == null ? void 0 : _b.id) ?? "";
  }
  resolveActive(zones) {
    if (!zones.length || this.activeId === "__none__") return null;
    if (this.activeId) {
      const found = zones.find((z) => z.id === this.activeId);
      if (found) return found;
    }
    const fallbackId = this.defaultZoneId(zones);
    return zones.find((z) => z.id === fallbackId) ?? zones[0] ?? null;
  }
  select(id) {
    this.activeId = id, this.dismissCoach();
  }
  step(zones, dir) {
    var _a;
    const active = this.resolveActive(zones), next = ((active ? zones.findIndex((z) => z.id === active.id) : -1) + dir + zones.length) % zones.length;
    this.activeId = ((_a = zones[next]) == null ? void 0 : _a.id) ?? "", this.dismissCoach();
  }
  renderDot(zone, shape, pulse, index, showNames, coachPulse, activeId) {
    const active = activeId === zone.id, label = zone.name || zone.title, withLabel = shape === "label" || showNames, shouldPulse = pulse || coachPulse;
    return html`
      <button
        type="button"
        class=${classMap({
      "bfz-dot": !0,
      [`bfz-dot--${shape}`]: !0,
      "is-active": active,
      "is-coach-pulse": coachPulse && !active
    })}
        style=${styleMap({
      "--dot-x": `${zone.x}%`,
      "--dot-y": `${zone.y}%`,
      "--dot-size": `${zone.dotSize}px`,
      ...zone.dotColor ? { "--dot-color": zone.dotColor } : {}
    })}
        aria-pressed=${active ? "true" : "false"}
        aria-controls="bfz-detail"
        aria-label=${label}
        title=${label}
        @click=${() => this.select(zone.id)}
      >
        ${shouldPulse ? html`<span class="bfz-dot__pulse" aria-hidden="true"></span>` : nothing}
        ${shape === "number" ? html`<span>${index + 1}</span>` : shape === "icon" && zone.icon ? html`<span class=${zone.icon.startsWith("sicon-") ? zone.icon : ""}>${zone.icon.startsWith("sicon-") ? "" : zone.icon}</span>` : nothing}
        ${withLabel ? html`<span class="bfz-dot__label">${label}</span>` : nothing}
      </button>
    `;
  }
  renderEmptyPanel(detailMode) {
    return html`<div class="bfz-panel bfz-panel--empty" id="bfz-detail" role="region">
      <div class="bfz-empty-state">
        <span class="bfz-empty-state__icon" aria-hidden="true">◎</span>
        <h3 class="bfz-empty-state__title">${t("اختاري منطقة", "Pick a zone")}</h3>
        <p class="bfz-empty-state__text">
          ${t(
      "اضغطي على أي نقطة في الخريطة لعرض خطوات العناية والنصائح الخاصة بكل منطقة.",
      "Tap any hotspot on the map to see care steps and tips for that zone."
    )}
        </p>
      </div>
    </div>`;
  }
  renderLegend(zones, activeId) {
    return zones.length < 2 ? nothing : html`
      <div class="bfz-legend" role="tablist" aria-label=${t("مناطق الوجه", "Face zones")}>
        ${zones.map(
      (zone) => html`
            <button
              type="button"
              role="tab"
              class=${classMap({ "bfz-legend__btn": !0, "is-active": activeId === zone.id })}
              style=${styleMap(zone.dotColor ? { "--dot-color": zone.dotColor } : {})}
              aria-selected=${activeId === zone.id ? "true" : "false"}
              @click=${() => this.select(zone.id)}
            >
              <span class="bfz-legend__swatch" aria-hidden="true"></span>
              <span>${zone.name || zone.title}</span>
            </button>
          `
    )}
      </div>
    `;
  }
  renderDetail(zone, mode) {
    if (!zone)
      return this.renderEmptyPanel(mode);
    const c = this.config || {}, showNav = isTruthy(c.bfz_show_nav, !0) && this.zones.length > 1, stepsTitle = t("خطوات العناية", "Care steps"), tipsTitle = t("نصائح", "Tips"), zoneIndex = this.zones.findIndex((z) => z.id === zone.id);
    return html`
      <div class="bfz-panel" id="bfz-detail" role="region" aria-live="polite">
        <div class="bfz-panel__head">
          <div>
            <p class="bfz-panel__eyebrow">
              ${t("منطقة العناية", "Care zone")}${zoneIndex >= 0 ? ` · ${zoneIndex + 1}/${this.zones.length}` : ""}
            </p>
            <h3 class="bfz-panel__title">${zone.title || zone.name}</h3>
          </div>
          <div class="bfz-nav">
            ${mode === "sheet" ? html`<button
                  type="button"
                  class="bfz-nav__btn bfz-sheet-close"
                  aria-label=${t("إغلاق", "Close")}
                  @click=${() => this.activeId = "__none__"}
                >✕</button>` : nothing}
            ${showNav ? html`
                  <button type="button" class="bfz-nav__btn" aria-label=${t("السابق", "Previous")} @click=${() => this.step(this.zones, -1)}>‹</button>
                  <button type="button" class="bfz-nav__btn" aria-label=${t("التالي", "Next")} @click=${() => this.step(this.zones, 1)}>›</button>
                ` : nothing}
          </div>
        </div>

        ${zone.image ? html`<img class="bfz-panel__img" src=${zone.image} alt="" loading="lazy" decoding="async" />` : nothing}
        ${zone.desc ? html`<p class="bfz-panel__desc">${zone.desc}</p>` : nothing}

        ${zone.tags.length ? html`<div class="bfz-tags">${zone.tags.map((tag) => html`<span class="bfz-tag">${tag}</span>`)}</div>` : nothing}

        ${zone.steps.length ? html`<div class="bfz-block">
              <h4 class="bfz-block__title">${stepsTitle}</h4>
              <ol class="bfz-steps">${zone.steps.map((s) => html`<li>${s}</li>`)}</ol>
            </div>` : nothing}

        ${zone.tips.length ? html`<div class="bfz-block">
              <h4 class="bfz-block__title">${tipsTitle}</h4>
              <ul class="bfz-tips">${zone.tips.map((tip) => html`<li>${tip}</li>`)}</ul>
            </div>` : nothing}

        ${zone.warning ? html`<div class="bfz-warn"><span aria-hidden="true">⚠︎</span><span>${zone.warning}</span></div>` : nothing}

        <div class="fs-actions">
          ${renderCommerceCtaButton(c, "bfz_", { href: zone.link })}
        </div>
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bfz_"), animate = theme.animate && !prefersReducedMotion(), zones = this.zones, faceImage = localizedString(c.bfz_face_image), title = localizedString(c.bfz_title), desc = localizedString(c.bfz_desc), shape = resolveDotShape(c), detailMode = resolveDetailMode(c), pulse = isTruthy(c.bfz_pulse, !0) && animate, pulseSpeed = Math.max(600, toNumber(c.bfz_pulse_speed, 2200)), reverse = isTruthy(c.bfz_reverse, !1), showNames = isTruthy(c.bfz_show_names, !1), aspect = resolveAspect(c), active = this.resolveActive(zones), showNotice = isTruthy(c.bfz_show_notice, !0), notice = localizedString(c.bfz_notice) || t("المعلومات المعروضة توعوية ولا تُعد تشخيصًا طبيًا.", "The information shown is educational and is not a medical diagnosis."), activeZoneId = (active == null ? void 0 : active.id) ?? "", coachActive = this.showCoach && !active;
    if (!zones.length)
      return html`<div class="fs-empty" role="status">
        ${t("أضيفي مناطق الوجه من إعدادات العنصر لعرض الخريطة التفاعلية.", "Add face zones in the element settings to show the interactive map.")}
      </div>`;
    const sheetOpen = detailMode === "sheet" && !!active;
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap({
      ...themeStyleMap(theme),
      "--bfz-aspect": aspect,
      "--bfz-pulse-speed": `${pulseSpeed}ms`
    })}
        aria-label=${title || t("خريطة مناطق الوجه والعناية", "Face care zone map")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div
            class=${classMap({
      "bfz-layout": !0,
      "bfz-layout--reverse": reverse,
      "bfz-layout--sheet": detailMode === "sheet"
    })}
          >
            <div class="bfz-stage-wrap">
              <div class="bfz-stage">
                ${faceImage ? html`<img class="bfz-stage__img" src=${faceImage} alt="" loading="lazy" decoding="async" />` : html`<div class="bfz-stage__missing" role="img" aria-label=${t("صورة وجه غير متوفرة", "Face image not available")}>
                      <span class="bfz-stage__missing-icon" aria-hidden="true">👤</span>
                      <p>${t("أضيفي صورة وجه من الإعدادات", "Add a face image in settings")}</p>
                    </div>`}
                ${zones.map(
      (zone, i) => this.renderDot(zone, shape, pulse, i, showNames, coachActive && animate, activeZoneId)
    )}
              </div>

              ${this.renderLegend(zones, activeZoneId)}

              ${coachActive ? html`<div class="bfz-coach" role="status">
                    <p class="bfz-coach__text">${t("اضغطي على منطقة في الخريطة", "Tap a zone on the map")}</p>
                    <button type="button" class="bfz-coach__dismiss" aria-label=${t("إخفاء", "Dismiss")} @click=${() => this.dismissCoach()}>✕</button>
                  </div>` : nothing}
            </div>

            ${detailMode === "sheet" ? html`
                  ${sheetOpen ? html`<button
                        class="bfz-sheet-backdrop"
                        aria-label=${t("إغلاق", "Close")}
                        @click=${() => this.activeId = "__none__"}
                      ></button>` : nothing}
                  ${this.renderDetail(active, detailMode)}
                ` : this.renderDetail(active, detailMode)}
          </div>

          ${showNotice ? html`<p class="bfz-notice">${notice}</p>` : nothing}
        </div>
      </section>
    `;
  }
};
__name(_BeautyFaceZoneMap, "BeautyFaceZoneMap"), _BeautyFaceZoneMap.styles = [sharedSectionCss, componentStyles];
let BeautyFaceZoneMap = _BeautyFaceZoneMap;
__decorateClass([
  property({ type: Object })
], BeautyFaceZoneMap.prototype, "config");
__decorateClass([
  state()
], BeautyFaceZoneMap.prototype, "activeId");
__decorateClass([
  state()
], BeautyFaceZoneMap.prototype, "showCoach");
typeof BeautyFaceZoneMap < "u" && BeautyFaceZoneMap.registerSallaComponent("salla-beauty-face-zone-map");
export {
  BeautyFaceZoneMap as default
};
