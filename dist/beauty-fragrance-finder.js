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
  .bff-shell {
    display: grid;
    gap: 1.35rem;
    align-items: start;
    max-width: 1080px;
    margin-inline: auto;
  }

  @media (min-width: 900px) {
    .bff-shell {
      grid-template-columns: minmax(240px, 0.85fr) minmax(0, 1.35fr);
      gap: 1.75rem;
    }
  }

  /* —— Family selector —— */
  .bff-selector {
    min-width: 0;
    padding: 1rem 1rem 1.1rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.06);
  }

  .bff-selector__label {
    margin: 0 0 0.75rem;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--muted-color, #666666);
  }

  .bff-chips {
    display: grid;
    gap: 0.55rem;
  }

  .bff-chips--grid {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 900px) {
    .bff-chips--grid {
      grid-template-columns: 1fr;
    }
  }

  .bff-chips--list {
    grid-template-columns: 1fr;
  }

  .bff-chip {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.65rem;
    min-height: 52px;
    padding: 0.55rem 0.7rem;
    border: 1.5px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 20px) * 0.65);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.25;
    cursor: pointer;
    text-align: start;
    box-shadow: 0 2px 8px rgba(43, 33, 28, 0.04);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .bff-chip:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 45%, var(--border-color, #e5e7eb));
    box-shadow: 0 8px 18px rgba(43, 33, 28, 0.08);
  }

  .bff-chip.is-active {
    border-color: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 8%, var(--card-bg, #fff));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 22%, transparent),
      0 10px 22px rgba(43, 33, 28, 0.1);
  }

  .bff-chip__swatch {
    flex: 0 0 auto;
    width: 2.15rem;
    height: 2.15rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-size: 1rem;
    line-height: 1;
    box-shadow:
      inset 0 0 0 2px color-mix(in srgb, #fff 40%, transparent),
      0 4px 10px color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 35%, transparent);
  }

  .bff-chip__meta {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .bff-chip__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bff-chip__hint {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--muted-color, #666666);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bff-chip__dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: transparent;
    box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--muted-color, #8f7a86) 55%, transparent);
  }

  .bff-chip.is-active .bff-chip__dot {
    background: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: none;
  }

  /* —— Wheel layout —— */
  .bff-chips--wheel {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0 0.5rem;
  }

  .bff-chips--wheel .bff-chip {
    display: inline-flex;
    grid-template-columns: none;
    border-radius: 999px;
    padding: 0.45rem 0.85rem 0.45rem 0.5rem;
    padding-inline: 0.5rem 0.85rem;
  }

  .bff-chips--wheel .bff-chip__meta,
  .bff-chips--wheel .bff-chip__hint,
  .bff-chips--wheel .bff-chip__dot {
    display: none;
  }

  .bff-chips--wheel .bff-chip__name {
    display: inline;
  }

  @media (min-width: 560px) {
    .bff-chips--wheel {
      position: relative;
      min-height: 300px;
      border-radius: 50%;
    }

    .bff-chips--wheel .bff-chip {
      position: absolute;
      top: 50%;
      inset-inline-start: 50%;
      transform: translate(-50%, -50%)
        rotate(var(--i-angle, 0deg)) translate(var(--wheel-r, 120px))
        rotate(calc(-1 * var(--i-angle, 0deg)));
    }

    .bff-chips--wheel .bff-chip:hover {
      transform: translate(-50%, -50%)
        rotate(var(--i-angle, 0deg)) translate(var(--wheel-r, 120px))
        rotate(calc(-1 * var(--i-angle, 0deg))) scale(1.05);
    }

    .bff-wheel-core {
      display: grid;
      position: absolute;
      top: 50%;
      inset-inline-start: 50%;
      transform: translate(-50%, -50%);
      width: 5.25rem;
      height: 5.25rem;
      place-items: center;
      text-align: center;
      border-radius: 50%;
      background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
      border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, transparent);
      color: var(--muted-color, #666666);
      font-size: 0.72rem;
      font-weight: 700;
      padding: 0.5rem;
      pointer-events: none;
    }
  }

  .bff-wheel-core {
    display: none;
  }

  /* —— Story panel —— */
  .bff-story {
    min-width: 0;
    padding: 1.15rem;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 28%, var(--border-color, #e5e7eb));
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 12%, transparent),
      0 16px 36px rgba(120, 44, 82, 0.09);
  }

  .bff-hero {
    position: relative;
    display: grid;
    gap: 1rem;
    margin-bottom: 1.1rem;
  }

  @media (min-width: 640px) {
    .bff-hero--media {
      grid-template-columns: minmax(0, 1.1fr) minmax(160px, 0.75fr);
      align-items: stretch;
    }
  }

  .bff-hero__body {
    position: relative;
    z-index: 1;
    min-width: 0;
    padding: 0.15rem 0.1rem 0;
  }

  .bff-hero__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.55rem;
  }

  .bff-hero__icon {
    display: inline-grid;
    place-items: center;
    width: 2.65rem;
    height: 2.65rem;
    border-radius: 50%;
    background: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-size: 1.2rem;
    box-shadow:
      inset 0 0 0 2px color-mix(in srgb, #fff 40%, transparent),
      0 8px 18px color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 35%, transparent);
  }

  .bff-nav {
    display: inline-flex;
    gap: 0.35rem;
    flex: 0 0 auto;
  }

  .bff-nav__btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 1px solid var(--border-color, #e5e7eb);
    background: color-mix(in srgb, var(--card-bg, #fff) 70%, var(--section-bg, transparent));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 1.05rem;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .bff-nav__btn:hover {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  .bff-hero__title {
    margin: 0 0 0.4rem;
    font-size: clamp(1.35rem, 3.2vw, 1.75rem);
    font-weight: 800;
    color: var(--text-color, #000000);
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .bff-hero__desc {
    margin: 0 0 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.7;
    font-size: 0.93rem;
  }

  .bff-mood {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bff-mood__tag {
    font-size: 0.74rem;
    font-weight: 700;
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 14%, var(--card-bg, #fff));
    color: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 78%, var(--text-color, #33232e));
  }

  .bff-hero__media {
    position: relative;
    min-width: 0;
    border-radius: calc(var(--section-radius, 20px) * 0.7);
    overflow: hidden;
    background:
      linear-gradient(
        160deg,
        color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 28%, transparent),
        transparent 55%
      ),
      color-mix(in srgb, var(--border-color, #e5e7eb) 35%, var(--card-bg, #fff));
    aspect-ratio: 4 / 5;
    max-height: 280px;
  }

  @media (max-width: 639px) {
    .bff-hero__media {
      aspect-ratio: 16 / 10;
      max-height: 220px;
    }
  }

  .bff-hero__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .bff-hero__media::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 45%,
      color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 22%, transparent)
    );
    pointer-events: none;
  }

  /* —— Notes pyramid —— */
  .bff-pyramid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
    margin: 0 0 1.1rem;
    padding: 1rem 0.85rem 1.05rem;
    border-radius: calc(var(--section-radius, 20px) * 0.7);
    background:
      radial-gradient(
        90% 80% at 50% 0%,
        color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 10%, transparent),
        transparent 70%
      ),
      color-mix(in srgb, var(--section-bg, transparent) 65%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 18%, var(--border-color, #e5e7eb));
  }

  .bff-pyramid__intro {
    margin: 0 0 0.55rem;
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
    text-align: center;
  }

  .bff-tier {
    width: 100%;
    border-radius: 14px;
    padding: 0.75rem 0.9rem;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) var(--tier-tint, 10%), var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 28%, transparent);
    box-sizing: border-box;
    text-align: center;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.45s ease, transform 0.45s ease, width 0.35s ease;
  }

  .bff-tier.is-visible,
  .bff-tier.is-instant {
    opacity: 1;
    transform: translateY(0);
  }

  .bff-tier--top {
    width: 58%;
    --tier-tint: 8%;
  }

  .bff-tier--heart {
    width: 78%;
    --tier-tint: 14%;
  }

  .bff-tier--base {
    width: 100%;
    --tier-tint: 20%;
  }

  .bff-tier__label {
    display: block;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 85%, var(--text-color, #33232e));
    margin-bottom: 0.4rem;
  }

  .bff-tier__notes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.35rem;
  }

  .bff-note {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-color, #000000);
    background: color-mix(in srgb, var(--card-bg, #fff) 82%, transparent);
    padding: 0.22rem 0.65rem;
    border-radius: 999px;
    line-height: 1.4;
    opacity: 0;
    transform: scale(0.92);
    transition: opacity 0.35s ease, transform 0.35s ease;
    transition-delay: calc(var(--note-i, 0) * 80ms);
  }

  .bff-note.is-visible,
  .bff-note.is-instant {
    opacity: 1;
    transform: scale(1);
  }

  .bff-tier__empty {
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
  }

  @media (max-width: 480px) {
    .bff-tier--top,
    .bff-tier--heart,
    .bff-tier--base {
      width: 100%;
    }
  }

  /* —— Facts —— */
  .bff-facts {
    display: grid;
    gap: 0.55rem;
    margin-bottom: 0.25rem;
  }

  @media (min-width: 480px) {
    .bff-facts {
      grid-template-columns: 1fr 1fr;
    }
  }

  .bff-fact {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.75rem 0.85rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 7%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 18%, var(--border-color, #e5e7eb));
  }

  .bff-fact__label {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
  }

  .bff-fact__value {
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bff-panel__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-top: 1rem;
  }

  .bff-notice {
    max-width: 1080px;
    margin: 1.25rem auto 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.65;
  }

  @media (prefers-reduced-motion: reduce) {
    .bff-chip,
    .bff-tier,
    .bff-note,
    .bff-nav__btn {
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`, LAYOUTS = ["wheel", "grid", "list"];
function splitList(raw) {
  const text = localizedString(raw, "");
  return text ? text.split(/\r?\n|،|;|,/).map((part) => part.trim()).filter(Boolean) : [];
}
__name(splitList, "splitList");
function parseFamilies(raw) {
  return normalizeCollection(raw).map((f, i) => {
    const name = localizedString(f.name);
    return {
      id: String(f.id ?? f.family_id ?? "").trim() || `family-${i + 1}`,
      name,
      color: String(f.color ?? "").trim(),
      icon: String(f.icon ?? "").trim(),
      desc: localizedString(f.desc),
      mood: parseTags(f.mood),
      top: splitList(f.top_notes),
      heart: splitList(f.heart_notes),
      base: splitList(f.base_notes),
      season: localizedString(f.season),
      occasion: localizedString(f.occasion),
      image: extractImageUrl(f.image),
      link: extractLink(f.link)
    };
  }).filter((f) => f.name || f.desc);
}
__name(parseFamilies, "parseFamilies");
function resolveLayout(config) {
  const value = getRadioValue(config.bff_layout, "grid");
  return LAYOUTS.includes(value) ? value : "grid";
}
__name(resolveLayout, "resolveLayout");
const REVEAL_DELAYS = [0, 400, 800], _BeautyFragranceFinder = class _BeautyFragranceFinder extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.revealStep = 0, this.boundLangHandler = () => this.requestUpdate(), this.revealTimers = [], this.lastRevealFamilyId = "";
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    this.clearRevealTimers(), window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    var _a;
    changed.has("config") && (this.activeId = "", this.revealStep = 0, this.lastRevealFamilyId = "");
    const familyId = ((_a = this.resolveActive(this.families)) == null ? void 0 : _a.id) ?? "";
    familyId && familyId !== this.lastRevealFamilyId && (this.lastRevealFamilyId = familyId, this.startRevealSequence());
  }
  clearRevealTimers() {
    this.revealTimers.forEach((id) => window.clearTimeout(id)), this.revealTimers = [];
  }
  startRevealSequence() {
    if (this.clearRevealTimers(), prefersReducedMotion()) {
      this.revealStep = 3;
      return;
    }
    this.revealStep = 0, REVEAL_DELAYS.forEach((delay, i) => {
      const id = window.setTimeout(() => {
        this.revealStep = i + 1;
      }, delay);
      this.revealTimers.push(id);
    });
  }
  get families() {
    var _a;
    return parseFamilies((_a = this.config) == null ? void 0 : _a.bff_families);
  }
  resolveActive(families) {
    var _a;
    if (!families.length) return null;
    if (this.activeId) {
      const found = families.find((f) => f.id === this.activeId);
      if (found) return found;
    }
    const preset = String(((_a = this.config) == null ? void 0 : _a.bff_default_family) ?? "").trim();
    if (preset) {
      const found = families.find((f) => f.id === preset);
      if (found) return found;
    }
    return families[0];
  }
  select(id) {
    id !== this.activeId && (this.activeId = id);
  }
  step(families, dir) {
    var _a;
    if (!families.length) return;
    const active = this.resolveActive(families), next = ((active ? families.findIndex((f) => f.id === active.id) : -1) + dir + families.length) % families.length;
    this.activeId = ((_a = families[next]) == null ? void 0 : _a.id) ?? "";
  }
  chipHint(family) {
    return family.season || family.mood[0] || "";
  }
  renderChip(family, layout, index, total) {
    var _a;
    const active = ((_a = this.resolveActive(this.families)) == null ? void 0 : _a.id) === family.id, isSicon = family.icon.startsWith("sicon-"), hint = this.chipHint(family), chipStyle = family.color ? { "--fam-color": family.color } : {};
    return layout === "wheel" && (chipStyle["--i-angle"] = `${360 / Math.max(total, 1) * index}deg`), html`
      <button
        type="button"
        class=${classMap({ "bff-chip": !0, "is-active": active })}
        style=${styleMap(chipStyle)}
        aria-pressed=${active ? "true" : "false"}
        aria-controls="bff-detail"
        title=${family.name}
        @click=${() => this.select(family.id)}
      >
        <span class="bff-chip__swatch" aria-hidden="true">
          ${family.icon ? isSicon ? html`<span class=${family.icon}></span>` : html`<span>${family.icon}</span>` : nothing}
        </span>
        <span class="bff-chip__meta">
          <span class="bff-chip__name">${family.name}</span>
          ${hint && layout !== "wheel" ? html`<span class="bff-chip__hint">${hint}</span>` : nothing}
        </span>
        ${layout !== "wheel" ? html`<span class="bff-chip__dot" aria-hidden="true"></span>` : nothing}
      </button>
    `;
  }
  renderTier(labelKey, label, notes, stepIndex) {
    const visible = this.revealStep >= stepIndex, reduced = prefersReducedMotion();
    return html`
      <div
        class=${classMap({
      "bff-tier": !0,
      [`bff-tier--${labelKey}`]: !0,
      "is-visible": visible,
      "is-instant": reduced
    })}
        role="listitem"
        aria-hidden=${visible ? "false" : "true"}
      >
        <span class="bff-tier__label">${label}</span>
        ${notes.length ? html`<div class="bff-tier__notes">
              ${notes.map(
      (note, i) => html`
                  <span
                    class=${classMap({ "bff-note": !0, "is-visible": visible, "is-instant": reduced })}
                    style=${styleMap(reduced ? {} : { "--note-i": String(i) })}
                    >${note}</span
                  >
                `
    )}
            </div>` : html`<span class="bff-tier__empty">${t("—", "—")}</span>`}
      </div>
    `;
  }
  renderDetail(family, families) {
    const c = this.config || {}, showNav = families.length > 1, showPyramid = isTruthy(c.bff_show_pyramid, !0), isSicon = family.icon.startsWith("sicon-"), topLabel = localizedString(c.bff_pyramid_top_label) || t("المقدمة", "Top"), heartLabel = localizedString(c.bff_pyramid_heart_label) || t("القلب", "Heart"), baseLabel = localizedString(c.bff_pyramid_base_label) || t("الأساس", "Base"), seasonLabel = localizedString(c.bff_season_label) || t("أنسب موسم", "Best season"), occasionLabel = localizedString(c.bff_occasion_label) || t("أنسب مناسبة", "Occasion"), hasPyramid = family.top.length || family.heart.length || family.base.length, style = family.color ? { "--fam-color": family.color } : {};
    return html`
      <article class="bff-story" id="bff-detail" role="region" aria-live="polite" style=${styleMap(style)}>
        <div class=${classMap({ "bff-hero": !0, "bff-hero--media": !!family.image })}>
          <div class="bff-hero__body">
            <div class="bff-hero__top">
              ${family.icon ? html`<span class="bff-hero__icon" aria-hidden="true">
                    ${isSicon ? html`<span class=${family.icon}></span>` : family.icon}
                  </span>` : html`<span class="bff-hero__icon" aria-hidden="true">✦</span>`}

              ${showNav ? html`<div class="bff-nav">
                    <button
                      type="button"
                      class="bff-nav__btn"
                      aria-label=${t("السابق", "Previous")}
                      @click=${() => this.step(families, -1)}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      class="bff-nav__btn"
                      aria-label=${t("التالي", "Next")}
                      @click=${() => this.step(families, 1)}
                    >
                      ›
                    </button>
                  </div>` : nothing}
            </div>

            <h3 class="bff-hero__title">${family.name}</h3>
            ${family.desc ? html`<p class="bff-hero__desc">${family.desc}</p>` : nothing}
            ${family.mood.length ? html`<div class="bff-mood">
                  ${family.mood.map((m) => html`<span class="bff-mood__tag">${m}</span>`)}
                </div>` : nothing}
          </div>

          ${family.image ? html`<div class="bff-hero__media">
                <img src=${family.image} alt="" loading="lazy" decoding="async" />
              </div>` : nothing}
        </div>

        ${showPyramid && hasPyramid ? html`<div class="bff-pyramid" role="list" aria-label=${t("هرم النوتات", "Notes pyramid")}>
              <p class="bff-pyramid__intro">${t("تتكشّف النوتات تدريجيًا…", "Notes unfold gradually…")}</p>
              ${this.renderTier("top", topLabel, family.top, 1)}
              ${this.renderTier("heart", heartLabel, family.heart, 2)}
              ${this.renderTier("base", baseLabel, family.base, 3)}
            </div>` : nothing}

        ${family.season || family.occasion ? html`<div class="bff-facts">
              ${family.season ? html`<div class="bff-fact">
                    <span class="bff-fact__label">${seasonLabel}</span>
                    <span class="bff-fact__value">${family.season}</span>
                  </div>` : nothing}
              ${family.occasion ? html`<div class="bff-fact">
                    <span class="bff-fact__label">${occasionLabel}</span>
                    <span class="bff-fact__value">${family.occasion}</span>
                  </div>` : nothing}
            </div>` : nothing}

        <div class="bff-panel__actions">
          ${family.link ? html`
              <a class="fs-btn fs-btn--ghost" href=${family.link} target="_blank" rel="noopener noreferrer">
                ${t("اقرئي المزيد", "Read more")}
              </a>
              ` : nothing}
          ${renderCommerceCtaButton(c, "bff_")}
        </div>
      </article>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bff_"), animate = theme.animate && !prefersReducedMotion(), families = this.families, title = localizedString(c.bff_title), desc = localizedString(c.bff_desc), layout = resolveLayout(c), showNotice = isTruthy(c.bff_show_notice, !0), notice = localizedString(c.bff_notice) || t(
      "اختيار العطر تجربة شخصية؛ هذه العائلات دليل استكشافي لمساعدتك على تحديد ما يناسب ذوقك.",
      "Choosing a fragrance is personal; these families are an exploratory guide to help you find what suits your taste."
    );
    if (!families.length)
      return html`<div class="fs-empty" role="status">
        ${t("أضيفي عائلات عطرية من إعدادات العنصر.", "Add fragrance families in the element settings.")}
      </div>`;
    const active = this.resolveActive(families), total = families.length;
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("محدد عائلة العطر", "Fragrance family finder")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="bff-shell">
            <aside class="bff-selector">
              <p class="bff-selector__label">${t("اختاري عائلة عطرية", "Pick a fragrance family")}</p>
              <div
                class=${classMap({
      "bff-chips": !0,
      [`bff-chips--${layout}`]: !0
    })}
                role="group"
                aria-label=${t("عائلات العطر", "Fragrance families")}
                style=${styleMap(layout === "wheel" ? { "--wheel-r": "120px" } : {})}
              >
                ${layout === "wheel" ? html`<div class="bff-wheel-core">${t("عائلات", "Families")}</div>` : nothing}
                ${families.map((family, i) => this.renderChip(family, layout, i, total))}
              </div>
            </aside>

            ${active ? this.renderDetail(active, families) : nothing}
          </div>

          ${showNotice ? html`<p class="bff-notice">${notice}</p>` : nothing}
        </div>
      </section>
    `;
  }
};
__name(_BeautyFragranceFinder, "BeautyFragranceFinder"), _BeautyFragranceFinder.styles = [sharedSectionCss, componentStyles];
let BeautyFragranceFinder = _BeautyFragranceFinder;
__decorateClass([
  property({ type: Object })
], BeautyFragranceFinder.prototype, "config");
__decorateClass([
  state()
], BeautyFragranceFinder.prototype, "activeId");
__decorateClass([
  state()
], BeautyFragranceFinder.prototype, "revealStep");
typeof BeautyFragranceFinder < "u" && BeautyFragranceFinder.registerSallaComponent("salla-beauty-fragrance-finder");
export {
  BeautyFragranceFinder as default
};
