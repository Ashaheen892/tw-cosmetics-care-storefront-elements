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
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bil-stage {
    position: relative;
    border-radius: var(--section-radius, 20px);
    padding: 1.35rem;
    overflow: hidden;
    background: linear-gradient(
      160deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--section-bg, transparent)),
      var(--card-bg, #fff)
    );
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow: 0 12px 30px rgba(120, 44, 82, 0.05);
  }

  .bil-bubbles {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .bil-bubble {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, #fff),
      transparent 70%
    );
    opacity: 0.28;
    animation: bil-float 9s ease-in-out infinite;
  }

  @keyframes bil-float {
    0%,
    100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-14px) scale(1.05);
    }
  }

  /* —— Texture filter —— */
  .bil-filter-wrap {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.45rem;
    margin-bottom: 1.1rem;
  }

  .bil-filter__label {
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
  }

  .bil-segment {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;
    padding: 0.22rem;
    width: fit-content;
    max-width: 100%;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 35%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #e5e7eb);
  }

  .bil-segment__btn {
    flex: 0 1 auto;
    min-height: 40px;
    min-width: 3.5rem;
    padding: 0.45rem 0.95rem;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: var(--muted-color, #666666);
    font: inherit;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  }

  .bil-segment__btn[aria-pressed='true'] {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, transparent);
  }

  /* —— Body: list + detail side by side on desktop —— */
  .bil-body {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 1rem;
    align-items: start;
  }

  @media (min-width: 860px) {
    .bil-body {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      gap: 1.25rem;
    }

    .bil-detail {
      position: sticky;
      top: 1rem;
    }
  }

  .bil-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.55rem;
    align-content: start;
  }

  @media (max-width: 859px) {
    .bil-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 0.65rem;
    }
  }

  .bil-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.7rem 0.85rem;
    border-radius: 16px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    cursor: pointer;
    text-align: start;
    font: inherit;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease,
      transform 0.15s ease;
  }

  .bil-card:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #e5e7eb));
    transform: translateY(-1px);
  }

  .bil-card[aria-pressed='true'] {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 20%, transparent);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--card-bg, #fff));
  }

  .bil-card__badge {
    flex: 0 0 auto;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    object-fit: cover;
    color: #fff;
    font-size: 1.15rem;
    font-weight: 700;
    background: var(--accent-color, var(--fs-store-primary));
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.35);
  }

  .bil-card__text {
    flex: 1 1 auto;
    min-width: 0;
    display: grid;
    gap: 0.15rem;
  }

  .bil-card__name {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    line-height: 1.3;
  }

  .bil-card__texture {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bil-card__check {
    flex: 0 0 auto;
    width: 1.5rem;
    height: 1.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 0.72rem;
    font-weight: 800;
    color: transparent;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 50%, transparent);
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bil-card[aria-pressed='true'] .bil-card__check {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
  }

  @media (max-width: 859px) {
    .bil-card {
      position: relative;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 0.8rem;
    }

    .bil-card__check {
      position: absolute;
      inset-inline-end: 0.6rem;
      top: 0.6rem;
    }
  }

  .bil-empty {
    padding: 1.4rem 1rem;
    text-align: center;
    border-radius: 14px;
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, var(--border-color, #e5e7eb));
    background: color-mix(in srgb, var(--section-bg, transparent) 55%, var(--card-bg, #fff));
    color: var(--muted-color, #666666);
    font-size: 0.88rem;
  }

  /* —— Detail —— */
  .bil-detail {
    position: relative;
    display: grid;
    gap: 0.95rem;
    padding: 1.25rem 1.3rem 1.35rem;
    border-radius: 18px;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 24%, var(--border-color, #e5e7eb));
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
      0 14px 34px rgba(120, 44, 82, 0.08);
  }

  .bil-detail__head {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .bil-detail__badge {
    flex: 0 0 auto;
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    object-fit: cover;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 700;
    background: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      inset 0 0 0 2px rgba(255, 255, 255, 0.35),
      0 8px 18px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, transparent);
  }

  .bil-detail__eyebrow {
    margin: 0 0 0.15rem;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bil-detail__title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    line-height: 1.3;
  }

  .bil-detail__texture {
    display: inline-block;
    margin-top: 0.25rem;
    padding: 0.15rem 0.6rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 700;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bil-detail__desc {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--muted-color, #666666);
  }

  .bil-block {
    display: grid;
    gap: 0.45rem;
  }

  .bil-block__title {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .bil-block__title::before {
    content: '';
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    flex: 0 0 auto;
  }

  .bil-block__text {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
  }

  .bil-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bil-chip {
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    font-size: 0.76rem;
    font-weight: 700;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent);
  }

  .bil-chip--soft {
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 45%, var(--card-bg, #fff));
    color: var(--text-color, #000000);
    border-color: color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
  }

  .bil-note {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    padding: 0.75rem 0.85rem;
    border-radius: 14px;
    background: color-mix(in srgb, #e0a100 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, #e0a100 34%, transparent);
    color: color-mix(in srgb, var(--fs-caution, #e0a100) 45%, var(--text-color, #000000));
    font-size: 0.84rem;
    line-height: 1.55;
  }

  .bil-link {
    justify-self: start;
  }

  @media (max-width: 639px) {
    .bil-stage {
      padding: 1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bil-bubble {
      animation: none;
    }
    .bil-card,
    .bil-segment__btn,
    .bil-card__check {
      transition: none;
    }
  }
`, TEXTURES = [
  { value: "serum", ar: "سيروم", en: "Serum" },
  { value: "gel", ar: "جل", en: "Gel" },
  { value: "cream", ar: "كريم", en: "Cream" },
  { value: "oil", ar: "زيت", en: "Oil" },
  { value: "foam", ar: "رغوة", en: "Foam" },
  { value: "balm", ar: "بلسم", en: "Balm" },
  { value: "powder", ar: "بودرة", en: "Powder" },
  { value: "spray", ar: "رذاذ", en: "Spray" }
];
function isEn() {
  return getPageLocale() === "en";
}
__name(isEn, "isEn");
function textureLabel(value) {
  const def = TEXTURES.find((tex) => tex.value === value);
  return def ? isEn() ? def.en : def.ar : value;
}
__name(textureLabel, "textureLabel");
function usedTextures(ingredients) {
  const present = new Set(ingredients.map((i) => i.texture).filter(Boolean));
  return TEXTURES.filter((tex) => present.has(tex.value)).map((tex) => ({
    value: tex.value,
    label: isEn() ? tex.en : tex.ar
  }));
}
__name(usedTextures, "usedTextures");
function parseIngredients(raw) {
  return normalizeCollection(raw).map((row, index) => ({
    id: `ingredient-${index}`,
    name: localizedString(row.name),
    image: extractImageUrl(row.image),
    color: localizedString(row.color) || "#c2527f",
    desc: localizedString(row.desc),
    benefits: parseTags(row.benefits),
    skin_types: parseTags(row.skin_types),
    usage_time: localizedString(row.usage_time),
    note: localizedString(row.note),
    texture: getRadioValue(row.texture, "").toLowerCase().trim(),
    link: extractLink(row.link ?? row["bil_ingredients.link"])
  })).filter((i) => i.name || i.desc || i.image);
}
__name(parseIngredients, "parseIngredients");
function filterByTexture(ingredients, texture) {
  return texture ? ingredients.filter((i) => i.texture === texture) : ingredients;
}
__name(filterByTexture, "filterByTexture");
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
const _BeautyIngredientLab = class _BeautyIngredientLab extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeTexture = "", this.selectedId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.ensureSelection();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.ensureSelection();
  }
  get ingredients() {
    var _a;
    return parseIngredients((_a = this.config) == null ? void 0 : _a.bil_ingredients);
  }
  get filtered() {
    return filterByTexture(this.ingredients, this.activeTexture);
  }
  ensureSelection() {
    var _a;
    const list = this.filtered;
    list.some((i) => i.id === this.selectedId) || (this.selectedId = ((_a = list[0]) == null ? void 0 : _a.id) ?? "");
  }
  get selected() {
    return this.filtered.find((i) => i.id === this.selectedId) || null;
  }
  setTexture(texture) {
    this.activeTexture = this.activeTexture === texture ? "" : texture, this.ensureSelection();
  }
  select(ingredient) {
    this.selectedId = ingredient.id, window.matchMedia("(max-width: 859px)").matches && requestAnimationFrame(() => {
      const detail = this.renderRoot.querySelector(".bil-detail");
      detail == null || detail.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest" });
    });
  }
  renderBadge(ingredient, cls = "bil-card__badge") {
    return ingredient.image ? html`<img class=${cls} src=${ingredient.image} alt="" loading="lazy" />` : html`<span class=${cls} style=${styleMap({ background: ingredient.color })} aria-hidden="true">
          ${(ingredient.name || "•").slice(0, 1)}
        </span>`;
  }
  renderDetail(ingredient, showLink) {
    return html`
      <div class="bil-detail" aria-live="polite">
        <div class="bil-detail__head">
          ${this.renderBadge(ingredient, "bil-detail__badge")}
          <div>
            <p class="bil-detail__eyebrow">${t("المكوّن المختار", "Selected ingredient")}</p>
            <h3 class="bil-detail__title">${ingredient.name || t("مكوّن", "Ingredient")}</h3>
            ${ingredient.texture ? html`<span class="bil-detail__texture">${textureLabel(ingredient.texture)}</span>` : nothing}
          </div>
        </div>

        ${ingredient.desc ? html`<p class="bil-detail__desc">${ingredient.desc}</p>` : nothing}

        ${ingredient.benefits.length ? html`<div class="bil-block">
              <h4 class="bil-block__title">${t("الفوائد", "Benefits")}</h4>
              <div class="bil-chips">
                ${ingredient.benefits.map((b) => html`<span class="bil-chip">${b}</span>`)}
              </div>
            </div>` : nothing}

        ${ingredient.skin_types.length ? html`<div class="bil-block">
              <h4 class="bil-block__title">${t("أنواع البشرة المناسبة", "Suitable skin types")}</h4>
              <div class="bil-chips">
                ${ingredient.skin_types.map((s) => html`<span class="bil-chip bil-chip--soft">${s}</span>`)}
              </div>
            </div>` : nothing}

        ${ingredient.usage_time ? html`<div class="bil-block">
              <h4 class="bil-block__title">${t("وقت الاستخدام", "Usage time")}</h4>
              <p class="bil-block__text">${ingredient.usage_time}</p>
            </div>` : nothing}

        ${ingredient.note ? html`<div class="bil-note"><span aria-hidden="true">⚠︎</span><span>${ingredient.note}</span></div> ` : nothing}

        <div class="fs-actions">
          ${ingredient.link && showLink ? html`<a class="fs-btn fs-btn--ghost bil-link" href=${ingredient.link}>${t("اعرفي المزيد", "Learn more")}</a>` : nothing}
          ${renderCommerceCtaButton(this.config || {}, "bil_")}
        </div>
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bil_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.bil_title), desc = localizedString(c.bil_desc), ingredients = this.ingredients, filtered = this.filtered, textures = usedTextures(ingredients), selected = this.selected, showLink = isTruthy(c.bil_show_link, !0), showBubbles = isTruthy(c.bil_bubbles, !0) && animate;
    return ingredients.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مختبر المكونات والقوام", "Ingredient & texture lab")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="bil-stage">
            ${showBubbles ? html`<div class="bil-bubbles" aria-hidden="true">
                  <span class="bil-bubble" style="width:70px;height:70px;inset-inline-start:8%;top:12%"></span>
                  <span class="bil-bubble" style="width:44px;height:44px;inset-inline-end:14%;top:24%;animation-delay:1.5s"></span>
                  <span class="bil-bubble" style="width:90px;height:90px;inset-inline-end:6%;bottom:10%;animation-delay:0.8s"></span>
                  <span class="bil-bubble" style="width:36px;height:36px;inset-inline-start:22%;bottom:16%;animation-delay:2.2s"></span>
                </div>` : nothing}

            ${textures.length ? html`<div class="bil-filter-wrap">
                  <span class="bil-filter__label">${t("القوام", "Texture")}</span>
                  <div class="bil-segment" role="group" aria-label=${t("فلترة حسب القوام", "Filter by texture")}>
                    <button
                      type="button"
                      class="bil-segment__btn"
                      aria-pressed=${this.activeTexture === "" ? "true" : "false"}
                      @click=${() => this.setTexture("")}
                    >
                      ${t("الكل", "All")}
                    </button>
                    ${textures.map(
      (tex) => html`<button
                        type="button"
                        class="bil-segment__btn"
                        aria-pressed=${this.activeTexture === tex.value ? "true" : "false"}
                        @click=${() => this.setTexture(tex.value)}
                      >
                        ${tex.label}
                      </button>`
    )}
                  </div>
                </div>` : nothing}

            <div class="bil-body">
              <div class="bil-grid" role="list">
                ${filtered.length ? filtered.map((ingredient) => {
      const active = ingredient.id === this.selectedId;
      return html`<button
                        type="button"
                        class="bil-card"
                        role="listitem"
                        aria-pressed=${active ? "true" : "false"}
                        @click=${() => this.select(ingredient)}
                      >
                        ${this.renderBadge(ingredient)}
                        <span class="bil-card__text">
                          <span class="bil-card__name">${ingredient.name || t("مكوّن", "Ingredient")}</span>
                          ${ingredient.texture ? html`<span class="bil-card__texture">${textureLabel(ingredient.texture)}</span>` : nothing}
                        </span>
                        <span class="bil-card__check" aria-hidden="true">✓</span>
                      </button>`;
    }) : html`<div class="bil-empty" role="status">
                      ${t("لا توجد مكونات بهذا القوام.", "No ingredients with this texture.")}
                    </div>`}
              </div>

              ${selected ? this.renderDetail(selected, showLink) : nothing}
            </div>
          </div>
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t("أضيفي المكونات الفعالة من إعدادات العنصر", "Add active ingredients in the element settings")}
      </div>`;
  }
};
__name(_BeautyIngredientLab, "BeautyIngredientLab"), _BeautyIngredientLab.styles = [sharedSectionCss, componentStyles];
let BeautyIngredientLab = _BeautyIngredientLab;
__decorateClass([
  property({ type: Object })
], BeautyIngredientLab.prototype, "config");
__decorateClass([
  state()
], BeautyIngredientLab.prototype, "activeTexture");
__decorateClass([
  state()
], BeautyIngredientLab.prototype, "selectedId");
bindSallaRegistration(BeautyIngredientLab);
typeof BeautyIngredientLab < "u" && BeautyIngredientLab.registerSallaComponent("salla-beauty-ingredient-lab");
export {
  BeautyIngredientLab as default
};
