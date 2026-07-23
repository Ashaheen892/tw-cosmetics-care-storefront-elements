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

  .brl-shell {
    width: 100%;
    max-width: 860px;
    margin-inline: auto;
    display: grid;
    gap: 1rem;
  }

  .brl-switcher {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 860px;
    margin: 0 auto 1.15rem;
    display: grid;
    gap: 0.65rem;
    justify-items: center;
  }

  .brl-tabs {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    justify-content: center;
    align-items: center;
    padding: 0.3rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 88%, #fff);
    box-sizing: border-box;
  }

  .brl-tab {
    position: relative;
    z-index: 1;
    min-height: 2.25rem;
    min-width: 0;
    margin: 0;
    padding: 0.45rem 1.05rem;
    border-radius: 999px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 700;
    font-size: 0.84rem;
    line-height: 1.2;
    cursor: pointer;
    white-space: nowrap;
    box-sizing: border-box;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .brl-tab:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
  }

  .brl-tab.is-active {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    border-color: transparent;
    color: #fff;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
  }

  .brl-select-wrap {
    display: none;
    width: 100%;
  }

  .brl-select {
    display: block;
    width: 100%;
    padding: 0.7rem 0.85rem;
    border-radius: 14px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 600;
    box-sizing: border-box;
  }

  .brl-intro {
    display: grid;
    gap: 0.45rem;
    padding: 0.95rem 1.05rem;
    border-radius: var(--section-radius, 18px);
    background:
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff)),
        var(--card-bg, #fff)
      );
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, var(--border-color, #e5e7eb));
    box-shadow: 0 8px 22px rgba(120, 44, 82, 0.05);
  }

  .brl-intro__title {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .brl-intro__text {
    margin: 0;
    font-size: 0.84rem;
    line-height: 1.55;
    color: var(--muted-color, #666666);
  }

  .brl-intro__row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 0.15rem;
  }

  .brl-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    min-height: 30px;
    padding: 0.2rem 0.7rem;
    border-radius: 999px;
    font-size: 0.74rem;
    font-weight: 700;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, transparent);
  }

  .brl-progress {
    display: grid;
    gap: 0.35rem;
  }

  .brl-progress__bar {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, #fff);
    overflow: hidden;
  }

  .brl-progress__bar span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--accent-color, var(--fs-store-primary));
    transition: width 0.3s ease;
  }

  .brl-progress__text {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
    text-align: center;
  }

  .brl-board {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    padding: 0.85rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--section-bg, transparent) 55%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 85%, #fff);
  }

  .brl-board--horizontal {
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.75rem;
    scroll-snap-type: x proximity;
    -webkit-overflow-scrolling: touch;
  }

  .brl-board--horizontal .brl-step {
    flex: 0 0 min(82%, 300px);
    scroll-snap-align: start;
  }

  .brl-step {
    position: relative;
    display: grid;
    grid-template-columns: auto auto minmax(0, 1fr) auto;
    gap: 0.65rem 0.75rem;
    align-items: center;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    border-inline-start: 4px solid var(--step-color, var(--accent-color, var(--fs-store-primary)));
    border-radius: var(--brl-card-radius, 16px);
    padding: 0.85rem 0.95rem;
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, transparent),
      0 8px 20px rgba(120, 44, 82, 0.05);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .brl-step--quiz {
    grid-template-columns: auto auto auto minmax(0, 1fr) auto;
  }

  .brl-step--quiz:not(.has-result) {
    grid-template-columns: auto auto auto minmax(0, 1fr);
  }

  .brl-step--quiz.is-revealed {
    grid-template-columns: auto auto minmax(0, 1fr) auto;
  }

  .brl-step--quiz.is-revealed:not(.has-result) {
    grid-template-columns: auto auto minmax(0, 1fr);
  }

  .brl-step--guide:not(.has-toggle) {
    grid-template-columns: auto auto minmax(0, 1fr);
  }

  .brl-step.is-dragging {
    opacity: 0.72;
    box-shadow: 0 18px 40px rgba(43, 33, 28, 0.18);
    transform: scale(1.015);
    z-index: 2;
  }

  .brl-step.is-over {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent),
      0 10px 24px rgba(120, 44, 82, 0.08);
  }

  .brl-step__index {
    flex: 0 0 auto;
    align-self: center;
    min-width: 1.7rem;
    height: 1.7rem;
    padding: 0 0.35rem;
    display: grid;
    place-items: center;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 800;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
  }

  .brl-step__marker {
    flex: 0 0 auto;
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    align-self: center;
    border-radius: 50%;
    background: var(--step-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-weight: 800;
    font-size: 0.95rem;
    box-shadow: 0 6px 14px color-mix(in srgb, var(--step-color, var(--accent-color, var(--fs-store-primary))) 28%, transparent);
  }

  .brl-step__thumb {
    flex: 0 0 auto;
    width: 3rem;
    height: 3rem;
    align-self: center;
    object-fit: cover;
    border-radius: 12px;
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
    background: color-mix(in srgb, var(--step-color, var(--accent-color, var(--fs-store-primary))) 12%, #fff);
  }

  .brl-step__marker .brl-icon {
    font-size: 1.05rem;
  }

  .brl-step__body {
    flex: 1 1 auto;
    min-width: 0;
    display: grid;
    gap: 0.25rem;
    align-content: center;
  }

  .brl-step__title {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    line-height: 1.35;
  }

  .brl-step__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-top: 0.15rem;
  }

  .brl-badge {
    font-size: 0.66rem;
    font-weight: 700;
    padding: 0.12rem 0.5rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent);
    line-height: 1.2;
  }

  .brl-step__short {
    margin: 0;
    color: var(--muted-color, #666666);
    font-size: 0.84rem;
    line-height: 1.5;
  }

  .brl-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 0.7rem;
    margin-top: 0.2rem;
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
  }

  .brl-meta b {
    color: var(--text-color, #000000);
    font-weight: 700;
  }

  .brl-step__long {
    margin: 0.45rem 0 0;
    padding-top: 0.55rem;
    border-top: 1px dashed var(--border-color, #e5e7eb);
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text-color, #000000);
  }

  .brl-step__note {
    margin: 0.35rem 0 0;
    padding: 0.45rem 0.6rem;
    border-radius: 10px;
    font-size: 0.8rem;
    line-height: 1.5;
    background: color-mix(in srgb, #e0a100 12%, var(--card-bg, #fff));
    color: color-mix(in srgb, var(--fs-caution, #e0a100) 45%, var(--text-color, #000000));
  }

  .brl-step__toggle {
    flex: 0 0 auto;
    align-self: center;
    justify-self: end;
    width: 2rem;
    height: 2rem;
    min-width: 2rem;
    min-height: 2rem;
    padding: 0;
    border-radius: 50%;
    border: 1px solid var(--border-color, #e5e7eb);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
    color: var(--accent-color, var(--fs-store-primary));
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .brl-step__toggle:hover,
  .brl-step__toggle[aria-expanded='true'] {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #e5e7eb));
  }

  .brl-handles {
    display: flex;
    flex-direction: column;
    gap: 0.28rem;
    align-self: center;
    justify-self: start;
    flex: 0 0 auto;
  }

  .brl-handle {
    width: 32px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    cursor: pointer;
    font-size: 0.8rem;
    touch-action: none;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .brl-handle:hover:not(:disabled) {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
    color: var(--accent-color, var(--fs-store-primary));
  }

  .brl-handle:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .brl-handle--drag {
    width: auto;
    min-width: 2.75rem;
    height: auto;
    min-height: 3rem;
    padding: 0.4rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    cursor: grab;
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #e5e7eb));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
  }

  .brl-handle--drag:active {
    cursor: grabbing;
  }

  .brl-handle__grip {
    font-size: 1.05rem;
    line-height: 1;
    animation: brl-grip-nudge 2.4s ease-in-out infinite;
  }

  .brl-handle__label {
    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    line-height: 1;
  }

  @keyframes brl-grip-nudge {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  .brl-step__result {
    flex: 0 0 auto;
    align-self: center;
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 0.9rem;
    font-weight: 800;
  }

  .brl-step__result--ok {
    background: color-mix(in srgb, var(--success-color, #2f9e63) 18%, #fff);
    color: var(--success-color, #2f9e63);
  }

  .brl-step__result--bad {
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 16%, #fff);
    color: var(--error-color, #cf4b4b);
  }

  .brl-step.is-ok {
    border-inline-start-color: var(--success-color, #2f9e63);
    background: color-mix(in srgb, var(--success-color, #2f9e63) 6%, var(--card-bg, #fff));
  }

  .brl-step.is-bad {
    border-inline-start-color: var(--error-color, #cf4b4b);
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 5%, var(--card-bg, #fff));
  }

  .brl-board--layers .brl-step:nth-child(odd) {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 3.5%, var(--card-bg, #fff));
  }

  .brl-board--stairs .brl-step:nth-child(2) {
    margin-inline-start: 1.25rem;
  }
  .brl-board--stairs .brl-step:nth-child(3) {
    margin-inline-start: 2.5rem;
  }
  .brl-board--stairs .brl-step:nth-child(4) {
    margin-inline-start: 3.75rem;
  }
  .brl-board--stairs .brl-step:nth-child(5) {
    margin-inline-start: 5rem;
  }
  .brl-board--stairs .brl-step:nth-child(n + 6) {
    margin-inline-start: 6.25rem;
  }

  .brl-board--drops .brl-step__marker {
    border-radius: 50% 50% 50% 0;
    transform: rotate(45deg);
  }
  .brl-board--drops .brl-step__marker > * {
    transform: rotate(-45deg);
  }
  .brl-board--bottles .brl-step__marker {
    border-radius: 40% 40% 30% 30%;
    width: 2.1rem;
    height: 2.6rem;
  }

  .brl-board--path .brl-step::before,
  .brl-board--circles .brl-step::before {
    content: '';
    position: absolute;
    inset-inline-start: calc(0.9rem + 1.25rem - 1px);
    top: -0.7rem;
    height: 0.7rem;
    width: 2px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, var(--border-color, #e5e7eb));
  }
  .brl-board--path .brl-step:first-child::before,
  .brl-board--circles .brl-step:first-child::before {
    display: none;
  }

  .brl-feedback {
    padding: 1rem 1.1rem;
    border-radius: 16px;
    text-align: center;
    font-weight: 700;
    border: 1.5px solid var(--border-color, #e5e7eb);
    display: grid;
    gap: 0.35rem;
    justify-items: center;
  }

  .brl-feedback__icon {
    width: 2.2rem;
    height: 2.2rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 1.1rem;
    font-weight: 800;
  }

  .brl-feedback__msg {
    font-size: 0.95rem;
    line-height: 1.45;
  }

  .brl-feedback--win {
    background: color-mix(in srgb, var(--success-color, #2f9e63) 12%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--success-color, #2f9e63) 45%, var(--border-color, #e5e7eb));
    color: var(--success-color, #2f9e63);
  }

  .brl-feedback--win .brl-feedback__icon {
    background: color-mix(in srgb, var(--success-color, #2f9e63) 20%, #fff);
  }

  .brl-feedback--retry {
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 10%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--error-color, #cf4b4b) 40%, var(--border-color, #e5e7eb));
    color: var(--error-color, #cf4b4b);
  }

  .brl-feedback--retry .brl-feedback__icon {
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 18%, #fff);
  }

  .brl-feedback__score {
    display: block;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
    font-weight: 600;
  }

  .brl-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    justify-content: center;
  }

  .brl-sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  @media (max-width: 639px) {
    .brl-switcher {
      margin-bottom: 1rem;
    }

    .brl-tabs {
      display: none;
    }

    .brl-select-wrap {
      display: block;
    }

    .brl-board--horizontal {
      flex-direction: column;
    }
    .brl-board--horizontal .brl-step {
      flex-basis: auto;
    }
    .brl-board--stairs .brl-step {
      margin-inline-start: 0 !important;
    }
    .brl-board {
      padding: 0.65rem;
    }
    .brl-step {
      padding: 0.7rem 0.75rem;
      gap: 0.45rem 0.55rem;
      grid-template-columns: auto minmax(0, 1fr) auto;
    }

    .brl-step--guide:not(.has-toggle) {
      grid-template-columns: auto minmax(0, 1fr);
    }

    .brl-step--quiz,
    .brl-step--quiz:not(.has-result) {
      grid-template-columns: auto auto minmax(0, 1fr);
    }

    .brl-step--quiz.has-result {
      grid-template-columns: auto auto minmax(0, 1fr) auto;
    }

    .brl-step--quiz.is-revealed {
      grid-template-columns: auto minmax(0, 1fr) auto;
    }

    .brl-step--quiz.is-revealed:not(.has-result) {
      grid-template-columns: auto minmax(0, 1fr);
    }

    .brl-step__index {
      display: none;
    }

    .brl-step__thumb {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 10px;
    }

    .brl-step__marker {
      width: 2.2rem;
      height: 2.2rem;
      font-size: 0.85rem;
    }

    .brl-step__title {
      font-size: 0.9rem;
    }

    .brl-step__short {
      font-size: 0.78rem;
    }

    .brl-handles {
      gap: 0.2rem;
    }

    .brl-handle {
      width: 28px;
      height: 26px;
      font-size: 0.72rem;
    }

    .brl-handle--drag {
      min-width: 2.35rem;
      min-height: 2.5rem;
      padding: 0.3rem 0.35rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .brl-step,
    .brl-tab,
    .brl-progress__bar span {
      transition: none !important;
    }
    .brl-handle__grip {
      animation: none;
    }
  }
`, SHAPES = ["layers", "drops", "bottles", "stairs", "path", "circles"], PERIODS = ["morning", "evening", "both"];
function parseSteps(raw) {
  return normalizeCollection(raw).map((s, i) => {
    const period = getRadioValue(s.period, "both");
    return {
      id: String(s.id ?? s.step_id ?? "").trim() || `step-${i + 1}`,
      title: localizedString(s.step_title),
      icon: String(s.icon ?? "").trim(),
      image: extractImageUrl(s.image),
      descShort: localizedString(s.desc_short),
      descLong: localizedString(s.desc_long),
      timing: localizedString(s.timing),
      wait: localizedString(s.wait),
      amount: localizedString(s.amount),
      note: localizedString(s.note),
      color: String(s.color ?? "").trim(),
      optional: isTruthy(s.optional, !1),
      period: PERIODS.includes(period) ? period : "both",
      correctOrder: toNumber(s.correct_order, i + 1)
    };
  }).filter((s) => s.title);
}
__name(parseSteps, "parseSteps");
function parseRoutines(raw) {
  return normalizeCollection(raw).map((r, i) => ({
    id: String(r.id ?? r.routine_id ?? "").trim() || `routine-${i + 1}`,
    name: localizedString(r.name) || `${i + 1}`,
    steps: parseSteps(r.steps)
  })).filter((r) => r.steps.length);
}
__name(parseRoutines, "parseRoutines");
function sortedByCorrect(steps) {
  return [...steps].sort((a, b) => a.correctOrder - b.correctOrder);
}
__name(sortedByCorrect, "sortedByCorrect");
function shuffleOrder(steps) {
  const ids = steps.map((s) => s.id);
  if (ids.length < 2) return ids;
  const correct = sortedByCorrect(steps).map((s) => s.id);
  let out = [...ids];
  for (let attempt = 0; attempt < 6; attempt += 1) {
    for (let i = out.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    if (out.some((id, idx) => id !== correct[idx])) return out;
  }
  return out = [...correct.slice(1), correct[0]], out;
}
__name(shuffleOrder, "shuffleOrder");
function resolveMode(config) {
  return getRadioValue(config.brl_mode, "guide") === "quiz" ? "quiz" : "guide";
}
__name(resolveMode, "resolveMode");
function resolveShape(config) {
  const value = getRadioValue(config.brl_shape, "layers");
  return SHAPES.includes(value) ? value : "layers";
}
__name(resolveShape, "resolveShape");
function resolveDirection(config) {
  return getRadioValue(config.brl_direction, "vertical") === "horizontal" ? "horizontal" : "vertical";
}
__name(resolveDirection, "resolveDirection");
function periodLabel(period, locale) {
  return {
    morning: ["صباحي", "Morning"],
    evening: ["مسائي", "Evening"],
    both: ["صباحي ومسائي", "AM / PM"]
  }[period][locale === "en" ? 1 : 0];
}
__name(periodLabel, "periodLabel");
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
const _BeautyRoutineLayeringBoard = class _BeautyRoutineLayeringBoard extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.routineId = "", this.expandedId = "", this.order = [], this.orderKey = "", this.checked = !1, this.revealed = !1, this.draggingId = "", this.overId = "", this.announce = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.routineId = "", this.resetQuiz());
  }
  get routines() {
    var _a;
    return parseRoutines((_a = this.config) == null ? void 0 : _a.brl_routines);
  }
  currentRoutine(routines) {
    var _a;
    if (!routines.length) return null;
    const preset = String(((_a = this.config) == null ? void 0 : _a.brl_default_routine) ?? "").trim();
    return routines.find((r) => r.id === this.routineId) || routines.find((r) => r.id === preset) || routines[0];
  }
  resetQuiz() {
    this.checked = !1, this.revealed = !1, this.expandedId = "", this.orderKey = "", this.order = [], this.draggingId = "", this.overId = "";
  }
  ensureOrder(routine) {
    return (this.orderKey !== routine.id || this.order.length !== routine.steps.length) && (this.order = shuffleOrder(routine.steps), this.orderKey = routine.id, this.checked = !1, this.revealed = !1), this.order;
  }
  selectRoutine(id) {
    id !== this.routineId && (this.routineId = id, this.resetQuiz());
  }
  toggleExpand(id) {
    this.expandedId = this.expandedId === id ? "" : id;
  }
  // —— quiz reordering ——
  moveStep(index, dir) {
    const target = index + dir;
    if (target < 0 || target >= this.order.length) return;
    const next = [...this.order];
    [next[index], next[target]] = [next[target], next[index]], this.order = next, this.checked = !1, this.announceOrder();
  }
  moveIdTo(id, targetIndex) {
    const from = this.order.indexOf(id);
    if (from < 0 || from === targetIndex) return;
    const next = [...this.order];
    next.splice(from, 1), next.splice(targetIndex, 0, id), this.order = next;
  }
  onPointerDown(e, id) {
    var _a, _b;
    this.revealed || (this.draggingId = id, (_b = (_a = e.currentTarget).setPointerCapture) == null || _b.call(_a, e.pointerId));
  }
  onPointerMove(e) {
    var _a;
    if (!this.draggingId) return;
    const el = (_a = this.shadowRoot) == null ? void 0 : _a.elementFromPoint(e.clientX, e.clientY), row = el == null ? void 0 : el.closest("[data-step]"), overId = (row == null ? void 0 : row.getAttribute("data-step")) || "";
    this.overId = overId && overId !== this.draggingId ? overId : "", !(!overId || overId === this.draggingId) && this.moveIdTo(this.draggingId, this.order.indexOf(overId));
  }
  onPointerUp() {
    this.draggingId && (this.draggingId = "", this.overId = "", this.checked = !1, this.announceOrder());
  }
  announceOrder() {
    this.announce = t("تم تحديث ترتيب الخطوات.", "Step order updated.");
  }
  verify(routine) {
    this.checked = !0;
    const correct = sortedByCorrect(routine.steps).map((s) => s.id), score = this.order.filter((id, i) => id === correct[i]).length;
    this.announce = score === routine.steps.length ? t("ترتيب صحيح تمامًا.", "Perfect order.") : t(`${score} من ${routine.steps.length} في مكانها الصحيح.`, `${score} of ${routine.steps.length} in the correct place.`);
  }
  showAnswer(routine) {
    this.order = sortedByCorrect(routine.steps).map((s) => s.id), this.checked = !0, this.revealed = !0;
  }
  retry(routine) {
    this.order = shuffleOrder(routine.steps), this.checked = !1, this.revealed = !1, this.announceOrder();
  }
  renderMeta(step) {
    const bits = [
      step.timing ? html`<span>${t("التوقيت", "When")}: <b>${step.timing}</b></span>` : nothing,
      step.wait ? html`<span>${t("الانتظار", "Wait")}: <b>${step.wait}</b></span>` : nothing,
      step.amount ? html`<span>${t("الكمية", "Amount")}: <b>${step.amount}</b></span>` : nothing
    ].filter((x) => x !== nothing);
    return bits.length ? html`<div class="brl-meta">${bits}</div>` : nothing;
  }
  renderMarker(step, display) {
    return html`<span
      class="brl-step__marker"
      style=${styleMap(step.color ? { "--step-color": step.color } : {})}
    >
      ${step.icon ? step.icon.startsWith("sicon-") ? html`<span class="brl-icon ${step.icon}"></span>` : html`<span class="brl-icon">${step.icon}</span>` : display}
    </span>`;
  }
  renderStepBadges(step, locale) {
    const badges = [
      step.optional ? html`<span class="brl-badge">${t("اختيارية", "Optional")}</span>` : nothing,
      step.period !== "both" ? html`<span class="brl-badge">${periodLabel(step.period, locale)}</span>` : nothing
    ].filter((x) => x !== nothing);
    return badges.length ? html`<div class="brl-step__badges">${badges}</div>` : nothing;
  }
  renderGuide(routine, locale) {
    const steps = sortedByCorrect(routine.steps);
    return html`<div
      class=${classMap({ "brl-board": !0, [`brl-board--${resolveShape(this.config)}`]: !0, "brl-board--horizontal": resolveDirection(this.config) === "horizontal" })}
    >
      ${steps.map((step, i) => {
      const expanded = this.expandedId === step.id, canToggle = !!(step.descLong || step.note);
      return html`<div
          class=${classMap({
        "brl-step": !0,
        "brl-step--guide": !0,
        "has-toggle": canToggle
      })}
          style=${styleMap(step.color ? { "--step-color": step.color } : {})}
        >
          <span class="brl-step__index" aria-hidden="true">${i + 1}</span>
          ${step.image ? html`<img class="brl-step__thumb" src=${step.image} alt="" loading="lazy" decoding="async" />` : this.renderMarker(step, i + 1)}
          <div class="brl-step__body">
            <h3 class="brl-step__title">${step.title}</h3>
            ${this.renderStepBadges(step, locale)}
            ${step.descShort ? html`<p class="brl-step__short">${step.descShort}</p>` : nothing}
            ${this.renderMeta(step)}
            ${expanded ? html`
                  ${step.descLong ? html`<p class="brl-step__long">${step.descLong}</p>` : nothing}
                  ${step.note ? html`<p class="brl-step__note">★ ${step.note}</p>` : nothing}
                ` : nothing}
          </div>
          ${canToggle ? html`<button
                type="button"
                class="brl-step__toggle"
                aria-expanded=${expanded ? "true" : "false"}
                aria-label=${expanded ? t("إخفاء التفاصيل", "Hide details") : t("عرض التفاصيل", "Show details")}
                @click=${() => this.toggleExpand(step.id)}
              >${expanded ? "−" : "+"}</button>` : nothing}
        </div>`;
    })}
    </div>`;
  }
  renderQuiz(routine, locale) {
    var _a;
    const order = this.ensureOrder(routine), byId = new Map(routine.steps.map((s) => [s.id, s])), correct = sortedByCorrect(routine.steps).map((s) => s.id), enableDrag = isTruthy((_a = this.config) == null ? void 0 : _a.brl_enable_drag, !0) && !this.revealed, score = this.checked ? order.filter((id, i) => id === correct[i]).length : 0, progressPct = this.checked ? Math.round(score / Math.max(1, routine.steps.length) * 100) : 0;
    return html`
      <div class="brl-intro">
        <p class="brl-intro__title">${t("رتّبي الطبقات من الأولى إلى الأخيرة", "Order layers from first to last")}</p>
        <p class="brl-intro__text">
          ${t(
      "اسحبي البطاقة من المقبض أو استخدمي الأسهم، ثم اضغطي «تحقّقي من الترتيب».",
      "Drag a card from the handle or use the arrows, then tap “Check order”."
    )}
        </p>
        <div class="brl-intro__row">
          <span class="brl-pill">${t(`${routine.steps.length} طبقات`, `${routine.steps.length} layers`)}</span>
          ${enableDrag ? html`<span class="brl-pill">⠿ ${t("اسحبي لإعادة الترتيب", "Drag to reorder")}</span>` : nothing}
        </div>
      </div>

      ${this.checked ? html`<div class="brl-progress" role="status">
            <div class="brl-progress__bar"><span style=${styleMap({ width: `${progressPct}%` })}></span></div>
            <div class="brl-progress__text">
              ${t(`${score} من ${routine.steps.length} في المكان الصحيح`, `${score} of ${routine.steps.length} in the right place`)}
            </div>
          </div>` : nothing}

      <div
        class=${classMap({ "brl-board": !0, [`brl-board--${resolveShape(this.config)}`]: !0, "brl-board--horizontal": resolveDirection(this.config) === "horizontal" })}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
      >
        ${order.map((id, i) => {
      const step = byId.get(id);
      if (!step) return nothing;
      const ok = this.checked ? id === correct[i] : null;
      return html`<div
            class=${classMap({
        "brl-step": !0,
        "brl-step--quiz": !0,
        "has-result": ok !== null,
        "is-revealed": this.revealed,
        "is-dragging": this.draggingId === id,
        "is-over": this.overId === id,
        "is-ok": ok === !0,
        "is-bad": ok === !1
      })}
            data-step=${id}
            style=${styleMap(step.color ? { "--step-color": step.color } : {})}
          >
            ${this.revealed ? nothing : html`<div class="brl-handles">
                  ${enableDrag ? html`<button
                        type="button"
                        class="brl-handle brl-handle--drag"
                        aria-label=${t("اسحبي لإعادة الترتيب", "Drag to reorder")}
                        @pointerdown=${(e) => this.onPointerDown(e, id)}
                      >
                        <span class="brl-handle__grip" aria-hidden="true">⠿</span>
                        <span class="brl-handle__label">${t("اسحبي", "Drag")}</span>
                      </button>` : nothing}
                  <button type="button" class="brl-handle" ?disabled=${i === 0} aria-label=${t("نقل لأعلى", "Move up")} @click=${() => this.moveStep(i, -1)}>▲</button>
                  <button type="button" class="brl-handle" ?disabled=${i === order.length - 1} aria-label=${t("نقل لأسفل", "Move down")} @click=${() => this.moveStep(i, 1)}>▼</button>
                </div>`}
            <span class="brl-step__index" aria-hidden="true">${i + 1}</span>
            ${step.image ? html`<img class="brl-step__thumb" src=${step.image} alt="" loading="lazy" decoding="async" />` : this.renderMarker(step, i + 1)}
            <div class="brl-step__body">
              <h3 class="brl-step__title">${step.title}</h3>
              ${this.renderStepBadges(step, locale)}
              ${step.descShort ? html`<p class="brl-step__short">${step.descShort}</p>` : nothing}
            </div>
            ${ok === null ? nothing : html`<span class="brl-step__result ${ok ? "brl-step__result--ok" : "brl-step__result--bad"}" aria-hidden="true">${ok ? "✓" : "✗"}</span>`}
          </div>`;
    })}
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "brl_"), animate = theme.animate && !prefersReducedMotion(), routines = this.routines, title = localizedString(c.brl_title), desc = localizedString(c.brl_desc), mode = resolveMode(c), locale = getPageLocale() === "en" ? "en" : "ar", cardRadius = `${getUnitValue(c.brl_card_radius, 14)}px`;
    if (!routines.length)
      return html`<div class="fs-empty" role="status">
        ${t("أضيفي روتينًا واحدًا على الأقل مع خطواته من إعدادات العنصر.", "Add at least one routine with its steps in the element settings.")}
      </div>`;
    const routine = this.currentRoutine(routines);
    if (!routine) return nothing;
    const win = mode === "quiz" && this.checked && this.order.every((id, i) => id === sortedByCorrect(routine.steps).map((s) => s.id)[i]), successMsg = localizedString(c.brl_success_msg) || t("أحسنتِ! هذا هو الترتيب الصحيح.", "Well done! This is the correct order."), retryMsg = localizedString(c.brl_retry_msg) || t("قريب! عدّلي الترتيب وحاولي مجددًا.", "Close! Adjust the order and try again.");
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap({
      ...themeStyleMap(theme),
      "--brl-card-radius": cardRadius,
      "--step-color": String(c.brl_step_color ?? theme.accent),
      "--success-color": String(c.brl_success_color ?? "#2f9e63"),
      "--error-color": String(c.brl_error_color ?? "#cf4b4b")
    })}
        aria-label=${title || t("ترتيب طبقات روتين العناية", "Routine layering board")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          ${routines.length > 1 ? html`
                <div class="brl-switcher">
                  <div class="brl-tabs" role="tablist" aria-label=${t("اختاري الروتين", "Choose routine")}>
                    ${routines.map(
      (r) => html`<button
                        type="button"
                        role="tab"
                        class=${classMap({ "brl-tab": !0, "is-active": r.id === routine.id })}
                        aria-selected=${r.id === routine.id ? "true" : "false"}
                        @click=${() => this.selectRoutine(r.id)}
                      >${r.name}</button>`
    )}
                  </div>
                  <label class="brl-select-wrap">
                    <span class="brl-sr">${t("اختاري الروتين", "Choose routine")}</span>
                    <select
                      class="brl-select"
                      aria-label=${t("اختاري الروتين", "Choose routine")}
                      @change=${(e) => this.selectRoutine(e.target.value)}
                    >
                      ${routines.map(
      (r) => html`<option value=${r.id} ?selected=${r.id === routine.id}>${r.name}</option>`
    )}
                    </select>
                  </label>
                </div>
              ` : nothing}

          <div class="brl-shell">
            ${mode === "quiz" ? this.renderQuiz(routine, locale) : this.renderGuide(routine, locale)}

            ${mode === "quiz" && this.checked ? html`<div class=${classMap({ "brl-feedback": !0, "brl-feedback--win": win, "brl-feedback--retry": !win })} role="status">
                  <span class="brl-feedback__icon" aria-hidden="true">${win ? "✓" : "↻"}</span>
                  <span class="brl-feedback__msg">${win ? successMsg : retryMsg}</span>
                  <span class="brl-feedback__score">
                    ${(() => {
      const correct = sortedByCorrect(routine.steps).map((s) => s.id), score = this.order.filter((id, i) => id === correct[i]).length;
      return t(`${score} من ${routine.steps.length} صحيحة`, `${score} of ${routine.steps.length} correct`);
    })()}
                  </span>
                </div>` : nothing}

            <div class="brl-actions">
              ${mode === "quiz" ? html`
                  ${isTruthy(c.brl_enable_check, !0) && !this.revealed ? html`<button type="button" class="fs-btn" @click=${() => this.verify(routine)}>${t("تحقّقي من الترتيب", "Check order")}</button>` : nothing}
                  ${isTruthy(c.brl_enable_retry, !0) ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.retry(routine)}>${t("إعادة المحاولة", "Try again")}</button>` : nothing}
                  ${isTruthy(c.brl_show_answer, !0) ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.showAnswer(routine)}>${t("إظهار الترتيب الصحيح", "Show correct order")}</button>` : nothing}
                  ` : nothing}
              ${renderCommerceCtaButton(c, "brl_")}
            </div>
          </div>

          <span class="brl-sr" role="status" aria-live="polite">${this.announce}</span>
        </div>
      </section>
    `;
  }
};
__name(_BeautyRoutineLayeringBoard, "BeautyRoutineLayeringBoard"), _BeautyRoutineLayeringBoard.styles = [sharedSectionCss, componentStyles];
let BeautyRoutineLayeringBoard = _BeautyRoutineLayeringBoard;
__decorateClass([
  property({ type: Object })
], BeautyRoutineLayeringBoard.prototype, "config");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "routineId");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "expandedId");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "order");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "orderKey");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "checked");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "revealed");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "draggingId");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "overId");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "announce");
bindSallaRegistration(BeautyRoutineLayeringBoard);
typeof BeautyRoutineLayeringBoard < "u" && BeautyRoutineLayeringBoard.registerSallaComponent("salla-beauty-routine-layering-board");
export {
  BeautyRoutineLayeringBoard as default
};
