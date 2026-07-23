var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { g as getPageLocale, l as localizedString } from "./localizedString-Bm7wdWFi.js";
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
  .bpa-shell {
    display: grid;
    gap: 1.35rem;
    align-items: start;
    max-width: 1080px;
    margin-inline: auto;
  }

  @media (min-width: 900px) {
    .bpa-shell {
      grid-template-columns: minmax(260px, 0.92fr) minmax(0, 1.18fr);
      gap: 1.75rem;
    }
  }

  /* —— Form card —— */
  .bpa-form-card {
    min-width: 0;
    padding: 1.15rem 1.15rem 1.25rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--card-bg, #fff) 90%, var(--section-bg, transparent));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.06);
  }

  .bpa-form-card__title {
    margin: 0 0 0.25rem;
    font-size: 1rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bpa-form-card__hint {
    margin: 0 0 1rem;
    font-size: 0.8rem;
    line-height: 1.55;
    color: var(--muted-color, #666666);
  }

  .bpa-form {
    display: grid;
    gap: 1rem;
  }

  .bpa-field {
    display: grid;
    gap: 0.45rem;
  }

  .bpa-field label {
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bpa-input,
  .bpa-select {
    width: 100%;
    min-height: 46px;
    padding: 0.65rem 0.8rem;
    border-radius: 14px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .bpa-input:focus,
  .bpa-select:focus {
    outline: none;
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, var(--border-color, #e5e7eb));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent);
  }

  .bpa-cat-chips,
  .bpa-pao-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .bpa-cat-chip,
  .bpa-pao-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 44px;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    transition:
      transform 0.15s ease,
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  .bpa-cat-chip:hover,
  .bpa-pao-chip:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  .bpa-cat-chip.is-active,
  .bpa-pao-chip.is-active {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    border-color: transparent;
    color: #fff;
    box-shadow: 0 8px 18px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
  }

  .bpa-cat-chip__icon {
    font-size: 0.95rem;
    line-height: 1;
  }

  .bpa-cat-chip__months {
    font-size: 0.7rem;
    font-weight: 700;
    opacity: 0.85;
  }

  /* —— Result hero —— */
  .bpa-hero {
    min-width: 0;
    background: var(--card-bg, #fff);
    border: 1.5px solid color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 28%, var(--border-color, #e5e7eb));
    border-radius: var(--section-radius, 20px);
    padding: 1.45rem 1.25rem 1.35rem;
    text-align: center;
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 12%, transparent),
      0 16px 36px rgba(120, 44, 82, 0.09);
  }

  .bpa-hero--safe {
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--bpa-color, #2f9e63) 14%, var(--card-bg, #fff)) 0%,
      var(--card-bg, #fff) 58%
    );
  }

  .bpa-hero--warn {
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--bpa-color, #e0a100) 16%, var(--card-bg, #fff)) 0%,
      var(--card-bg, #fff) 58%
    );
  }

  .bpa-hero--expired {
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--bpa-color, #cf4b4b) 16%, var(--card-bg, #fff)) 0%,
      var(--card-bg, #fff) 58%
    );
  }

  .bpa-hero--empty {
    border-style: dashed;
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #e5e7eb));
    box-shadow: none;
    background:
      radial-gradient(
        80% 70% at 50% 0%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
        transparent 70%
      ),
      color-mix(in srgb, var(--section-bg, transparent) 55%, var(--card-bg, #fff));
  }

  .bpa-hero__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
    padding: 2.4rem 1rem;
    color: var(--muted-color, #666666);
    font-size: 0.92rem;
    line-height: 1.65;
  }

  .bpa-hero__placeholder p {
    margin: 0;
    max-width: 22rem;
  }

  .bpa-hero__placeholder-icon {
    width: 3.5rem;
    height: 3.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 1.55rem;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, transparent);
  }

  .bpa-error {
    padding: 0.85rem 1rem;
    border-radius: 14px;
    background: color-mix(in srgb, #cf4b4b 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, #cf4b4b 35%, transparent);
    color: color-mix(in srgb, #cf4b4b 80%, #000);
    font-size: 0.88rem;
    font-weight: 600;
    line-height: 1.55;
  }

  .bpa-dial {
    position: relative;
    width: min(240px, 70vw);
    height: min(240px, 70vw);
    margin: 0.35rem auto 1.25rem;
    filter: drop-shadow(0 10px 24px color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent));
  }

  .bpa-dial svg {
    transform: rotate(-90deg);
    width: 100%;
    height: 100%;
  }

  .bpa-dial__disc {
    fill: color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 7%, var(--card-bg, #fff));
    stroke: color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 14%, transparent);
    stroke-width: 1;
  }

  .bpa-dial__track {
    fill: none;
    stroke: color-mix(in srgb, var(--bpa-color, var(--border-color, #e5e7eb)) 14%, var(--border-color, #e5e7eb));
    stroke-width: 14;
    opacity: 0.55;
  }

  .bpa-dial__value {
    fill: none;
    stroke: var(--bpa-color, var(--accent-color, var(--fs-store-primary)));
    stroke-width: 14;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.65s ease, stroke 0.3s ease;
  }

  .bpa-dial__center {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    justify-items: center;
    row-gap: 0.15rem;
    text-align: center;
    padding: 1.4rem;
  }

  .bpa-dial__days {
    font-size: clamp(2.5rem, 8vw, 3.4rem);
    font-weight: 800;
    line-height: 1;
    color: var(--bpa-color, var(--text-color, #33232e));
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }

  .bpa-dial__unit {
    font-size: 0.86rem;
    color: var(--text-color, #000000);
    font-weight: 800;
  }

  .bpa-dial__ratio {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--bpa-color, var(--muted-color, #8f7a86));
    padding: 0.18rem 0.6rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 12%, var(--card-bg, #fff));
    margin-top: 0.25rem;
  }

  .bpa-state {
    display: inline-block;
    padding: 0.45rem 1.1rem;
    border-radius: 999px;
    font-weight: 800;
    font-size: 0.9rem;
    margin-bottom: 1.1rem;
    background: color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 16%, var(--card-bg, #fff));
    color: var(--bpa-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 22%, transparent);
  }

  .bpa-dates {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.55rem;
    margin: 0 0 1.05rem;
    text-align: start;
  }

  .bpa-date-cell {
    padding: 0.75rem 0.65rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 6%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--bpa-color, var(--border-color, #e5e7eb)) 18%, var(--border-color, #e5e7eb));
  }

  .bpa-date-cell span {
    display: block;
    font-size: 0.7rem;
    color: var(--muted-color, #666666);
    margin-bottom: 0.25rem;
    font-weight: 700;
  }

  .bpa-date-cell b {
    font-size: 0.84rem;
    color: var(--text-color, #000000);
    font-weight: 800;
    line-height: 1.35;
  }

  .bpa-tips-grid {
    display: grid;
    gap: 0.55rem;
    margin-bottom: 0.9rem;
    text-align: start;
  }

  @media (min-width: 560px) {
    .bpa-tips-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .bpa-tips {
    padding: 0.8rem 0.9rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, var(--border-color, #e5e7eb));
    font-size: 0.84rem;
    line-height: 1.6;
    color: var(--text-color, #000000);
  }

  .bpa-tips h4 {
    margin: 0 0 0.35rem;
    font-size: 0.76rem;
    font-weight: 800;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bpa-tips p {
    margin: 0;
    color: var(--muted-color, #666666);
    white-space: pre-line;
  }

  .bpa-result-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    justify-content: center;
    margin-top: 0.15rem;
  }

  .bpa-notice {
    max-width: 1080px;
    margin: 1.25rem auto 0;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.65;
    text-align: center;
  }

  /* —— Saved records —— */
  .bpa-saved {
    max-width: 1080px;
    margin: 1.6rem auto 0;
    padding: 1.15rem;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.05);
  }

  .bpa-saved__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
    margin-bottom: 0.45rem;
  }

  .bpa-saved__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 800;
  }

  .bpa-saved__note {
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
    margin: 0 0 0.9rem;
    line-height: 1.55;
  }

  .bpa-saved__empty {
    padding: 1.4rem 1rem;
    text-align: center;
    border-radius: 14px;
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, var(--border-color, #e5e7eb));
    background: color-mix(in srgb, var(--section-bg, transparent) 55%, var(--card-bg, #fff));
    color: var(--muted-color, #666666);
    font-size: 0.88rem;
  }

  .bpa-records {
    display: grid;
    gap: 0.65rem;
  }

  .bpa-record {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 0.9rem 0.95rem;
    border: 1px solid color-mix(in srgb, var(--rec-color, var(--border-color, #e5e7eb)) 32%, var(--border-color, #e5e7eb));
    border-inline-start: 4px solid var(--rec-color, var(--border-color, #e5e7eb));
    border-radius: 16px;
    background: color-mix(in srgb, var(--rec-color, transparent) 4%, var(--card-bg, #fff));
    box-shadow: 0 4px 14px rgba(43, 33, 28, 0.04);
  }

  .bpa-record__status {
    position: relative;
    flex: 0 0 auto;
    width: 2.9rem;
    height: 2.9rem;
    display: grid;
    place-items: center;
  }

  .bpa-record__ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 3px solid color-mix(in srgb, var(--rec-color, var(--border-color, #e5e7eb)) 32%, transparent);
    background: color-mix(in srgb, var(--rec-color, var(--border-color, #e5e7eb)) 12%, var(--card-bg, #fff));
  }

  .bpa-record__days {
    position: relative;
    font-size: 0.74rem;
    font-weight: 800;
    color: var(--rec-color, var(--text-color, #33232e));
    line-height: 1;
  }

  .bpa-record__body {
    flex: 1 1 auto;
    min-width: 0;
  }

  .bpa-record__name {
    font-weight: 800;
    font-size: 0.92rem;
    color: var(--text-color, #000000);
    margin-bottom: 0.3rem;
  }

  .bpa-record__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem 0.5rem;
    font-size: 0.74rem;
    color: var(--muted-color, #666666);
  }

  .bpa-record__pill {
    display: inline-block;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    font-size: 0.68rem;
    font-weight: 800;
    background: color-mix(in srgb, var(--rec-color, var(--border-color, #e5e7eb)) 16%, var(--card-bg, #fff));
    color: var(--rec-color, var(--text-color, #33232e));
  }

  .bpa-record__note {
    margin: 0.4rem 0 0;
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
    line-height: 1.45;
  }

  .bpa-record__actions {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    flex: 0 0 auto;
  }

  .bpa-record__edit {
    width: 100%;
    min-height: 40px;
    padding: 0.4rem 0.55rem;
    border-radius: 10px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    font: inherit;
    box-sizing: border-box;
  }

  .bpa-icon-btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--muted-color, #666666);
    cursor: pointer;
    flex: 0 0 auto;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .bpa-icon-btn:hover {
    color: var(--accent-color, var(--fs-store-primary));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  @media (max-width: 639px) {
    .bpa-dates {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bpa-dial__value,
    .bpa-cat-chip,
    .bpa-pao-chip {
      transition: none !important;
    }
  }
`, DAY_MS = 864e5;
function addMonths(date, months) {
  const d = new Date(date.getTime()), day = d.getDate();
  d.setDate(1), d.setMonth(d.getMonth() + months);
  const daysInTarget = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  return d.setDate(Math.min(day, daysInTarget)), d;
}
__name(addMonths, "addMonths");
function startOfDay(date) {
  const d = new Date(date.getTime());
  return d.setHours(0, 0, 0, 0), d;
}
__name(startOfDay, "startOfDay");
function parseDateInput(value) {
  if (!value) return null;
  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return null;
  const [y, m, d] = parts, date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : startOfDay(date);
}
__name(parseDateInput, "parseDateInput");
function toInputValue(date) {
  const pad = /* @__PURE__ */ __name((n) => String(n).padStart(2, "0"), "pad");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
__name(toInputValue, "toInputValue");
function computeExpiry(open, months, warnDays) {
  const today = startOfDay(/* @__PURE__ */ new Date()), expiry = addMonths(open, months), totalDays = Math.max(1, Math.round((expiry.getTime() - open.getTime()) / DAY_MS)), daysRemaining = Math.round((expiry.getTime() - today.getTime()) / DAY_MS), elapsed = Math.round((today.getTime() - open.getTime()) / DAY_MS), elapsedRatio = Math.max(0, Math.min(1, elapsed / totalDays));
  let state2 = "safe";
  return daysRemaining <= 0 ? state2 = "expired" : daysRemaining <= warnDays && (state2 = "warn"), { expiry, daysRemaining, totalDays, elapsedRatio, state: state2 };
}
__name(computeExpiry, "computeExpiry");
function formatDate(date, fmt, locale) {
  const pad = /* @__PURE__ */ __name((n) => String(n).padStart(2, "0"), "pad");
  if (fmt === "short") return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
  if (fmt === "iso") return toInputValue(date);
  try {
    return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "ar", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  } catch {
    return toInputValue(date);
  }
}
__name(formatDate, "formatDate");
function parseCategories(raw) {
  return normalizeCollection(raw).map((c, i) => ({
    id: String(c.id ?? c.cat_id ?? "").trim() || `cat-${i + 1}`,
    name: localizedString(c.name),
    icon: String(c.icon ?? "").trim(),
    paoMonths: Math.max(0, toNumber(c.pao_months, 0))
  })).filter((c) => c.name);
}
__name(parseCategories, "parseCategories");
function parsePaoOptions(raw) {
  return normalizeCollection(raw).map((o) => ({
    months: Math.max(1, toNumber(o.months, 0)),
    label: localizedString(o.label)
  })).filter((o) => o.months > 0);
}
__name(parsePaoOptions, "parsePaoOptions");
function resolveInputMode(config) {
  return getRadioValue(config.bpa_input_mode, "direct") === "category" ? "category" : "direct";
}
__name(resolveInputMode, "resolveInputMode");
function resolveDateFormat(config) {
  const value = getRadioValue(config.bpa_date_format, "long");
  return ["long", "short", "iso"].includes(value) ? value : "long";
}
__name(resolveDateFormat, "resolveDateFormat");
function paoOptionLabel(option, locale) {
  return option.label ? option.label : locale === "en" ? `${option.months} months` : `${option.months} شهرًا`;
}
__name(paoOptionLabel, "paoOptionLabel");
function buildIcs(title, date) {
  const pad = /* @__PURE__ */ __name((n) => String(n).padStart(2, "0"), "pad"), stamp = /* @__PURE__ */ __name((d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`, "stamp"), end = new Date(date.getTime() + DAY_MS);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//beauty-pao-calculator//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@beauty-pao`,
    `DTSTART;VALUE=DATE:${stamp(date)}`,
    `DTEND;VALUE=DATE:${stamp(end)}`,
    `SUMMARY:${title.replace(/\r?\n/g, " ")}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join(`\r
`);
}
__name(buildIcs, "buildIcs");
const STORAGE_KEY = "tw-beauty-pao-records", _BeautyPaoExpiryCalculator = class _BeautyPaoExpiryCalculator extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.catId = "", this.pao = 0, this.openDate = "", this.recName = "", this.note = "", this.records = [], this.editingId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.records = safeStorageGet(STORAGE_KEY, []), this.openDate = toInputValue(/* @__PURE__ */ new Date());
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    var _a;
    changed.has("config") && !this.pao && (this.pao = Math.max(0, toNumber((_a = this.config) == null ? void 0 : _a.bpa_default_pao, 0)));
  }
  get locale() {
    return getPageLocale() === "en" ? "en" : "ar";
  }
  persist() {
    safeStorageSet(STORAGE_KEY, this.records);
  }
  onCategory(id, months) {
    this.catId = id, months > 0 && (this.pao = months);
  }
  saveRecord() {
    var _a;
    if (!parseDateInput(this.openDate) || this.pao <= 0) return;
    const max = Math.max(1, toNumber((_a = this.config) == null ? void 0 : _a.bpa_max_records, 12));
    if (this.records.length >= max) return;
    const record = {
      id: `rec-${Date.now()}`,
      name: this.recName.trim() || (this.locale === "en" ? "Product" : "منتج"),
      category: this.catId,
      open: this.openDate,
      pao: this.pao,
      note: this.note.trim()
    };
    this.records = [record, ...this.records], this.persist(), this.recName = "", this.note = "";
  }
  deleteRecord(id) {
    this.records = this.records.filter((r) => r.id !== id), this.persist();
  }
  clearRecords() {
    this.records = [], this.persist();
  }
  renameRecord(id, name) {
    this.records = this.records.map((r) => r.id === id ? { ...r, name: name.trim() || r.name } : r), this.persist();
  }
  downloadIcs(title, expiry) {
    const ics = buildIcs(title, expiry), blob = new Blob([ics], { type: "text/calendar;charset=utf-8" }), url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url, a.download = "beauty-pao.ics", document.body.appendChild(a), a.click(), document.body.removeChild(a), setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  stateColor(state2) {
    const c = this.config || {};
    return String(state2 === "expired" ? c.bpa_expired_color ?? "#cf4b4b" : state2 === "warn" ? c.bpa_warn_color ?? "#e0a100" : c.bpa_safe_color ?? "#2f9e63");
  }
  stateLabel(state2, days) {
    const c = this.config || {};
    return state2 === "expired" ? localizedString(c.bpa_state_expired) || t("انتهت المدة التقريبية", "Approximate period ended") : state2 === "warn" ? localizedString(c.bpa_state_warn) || t(`قرب الانتهاء — باقٍ ${days} يومًا`, `Ending soon — ${days} days left`) : localizedString(c.bpa_state_safe) || t(`صالح للاستخدام — باقٍ ${days} يومًا`, `Good to use — ${days} days left`);
  }
  renderResult() {
    const c = this.config || {}, open = parseDateInput(this.openDate);
    if (!open || this.pao <= 0)
      return html`<div class="bpa-hero bpa-hero--empty" role="status">
        <div class="bpa-hero__placeholder">
          <span class="bpa-hero__placeholder-icon" aria-hidden="true">◷</span>
          <p>
            ${t(
        "اختاري مدة الاستخدام بعد الفتح وتاريخ فتح العبوة لعرض النتيجة فورًا.",
        "Choose the period after opening and the open date to see the result instantly."
      )}
          </p>
        </div>
      </div>`;
    const today = /* @__PURE__ */ new Date();
    if (today.setHours(0, 0, 0, 0), open.getTime() > today.getTime())
      return html`<div class="bpa-hero bpa-hero--empty" role="alert">
        <div class="bpa-error">
          ${t("تاريخ الفتح في المستقبل. اختاري تاريخًا صحيحًا.", "The open date is in the future. Please pick a valid date.")}
        </div>
      </div>`;
    const warnDays = Math.max(1, toNumber(c.bpa_warn_days, 30)), result = computeExpiry(open, this.pao, warnDays), fmt = resolveDateFormat(c), color = this.stateColor(result.state), r = 92, circ = 2 * Math.PI * r, remainingRatio = result.state === "expired" ? 0 : Math.max(0, Math.min(1, result.daysRemaining / Math.max(1, result.totalDays))), offset = circ * (1 - remainingRatio), enableCalendar = isTruthy(c.bpa_enable_calendar, !0), storageTips = localizedString(c.bpa_storage_tips), stopSignals = localizedString(c.bpa_stop_signals), calTitle = t("انتهاء صلاحية منتج التجميل", "Beauty product expiry"), daysAbs = Math.abs(result.daysRemaining);
    return html`<div
      class="bpa-hero bpa-hero--${result.state}"
      style=${styleMap({ "--bpa-color": color })}
    >
      <div
        class="bpa-dial"
        role="img"
        aria-label=${this.stateLabel(result.state, Math.max(0, result.daysRemaining))}
      >
        <svg viewBox="0 0 210 210" aria-hidden="true">
          <circle class="bpa-dial__disc" cx="105" cy="105" r="80"></circle>
          <circle class="bpa-dial__track" cx="105" cy="105" r=${r}></circle>
          <circle
            class="bpa-dial__value"
            cx="105"
            cy="105"
            r=${r}
            style=${styleMap({ strokeDasharray: `${circ}`, strokeDashoffset: `${offset}` })}
          ></circle>
        </svg>
        <div class="bpa-dial__center">
          <div class="bpa-dial__days">${daysAbs}</div>
          <div class="bpa-dial__unit">
            ${result.daysRemaining >= 0 ? t("يوم متبقٍ", "days left") : t("يوم مضى", "days over")}
          </div>
          ${result.state !== "expired" ? html`<div class="bpa-dial__ratio">
                ${t(`${Math.round(remainingRatio * 100)}٪ من المدة`, `${Math.round(remainingRatio * 100)}% of period`)}
              </div>` : nothing}
        </div>
      </div>

      <span class="bpa-state bpa-state--${result.state}">${this.stateLabel(result.state, Math.max(0, result.daysRemaining))}</span>

      <div class="bpa-dates">
        <div class="bpa-date-cell">
          <span>${t("تاريخ الفتح", "Opened")}</span>
          <b>${formatDate(open, fmt, this.locale)}</b>
        </div>
        <div class="bpa-date-cell">
          <span>${t("المدة", "Period")}</span>
          <b>${t(`${this.pao} شهرًا`, `${this.pao} months`)}</b>
        </div>
        <div class="bpa-date-cell">
          <span>${t("ينتهي تقريبًا", "Approx. end")}</span>
          <b>${formatDate(result.expiry, fmt, this.locale)}</b>
        </div>
      </div>

      ${storageTips || stopSignals ? html`<div class="bpa-tips-grid">
            ${storageTips ? html`<div class="bpa-tips"><h4>${t("نصائح الحفظ", "Storage tips")}</h4><p>${storageTips}</p></div>` : nothing}
            ${stopSignals ? html`<div class="bpa-tips"><h4>${t("متى تتوقفين", "When to stop")}</h4><p>${stopSignals}</p></div>` : nothing}
          </div>` : nothing}

      <div class="bpa-result-actions">
        ${enableCalendar ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.downloadIcs(calTitle, result.expiry)}>
              ${t("إضافة إلى التقويم", "Add to calendar")}
            </button>` : nothing}
        ${isTruthy(c.bpa_enable_storage, !0) ? html`<button type="button" class="fs-btn" @click=${() => this.saveRecord()}>${t("حفظ هذه العبوة", "Save this product")}</button>` : nothing}
        ${renderCommerceCtaButton(c, "bpa_")}
      </div>
    </div>`;
  }
  renderSaved() {
    const c = this.config || {};
    if (!isTruthy(c.bpa_enable_storage, !0)) return nothing;
    const fmt = resolveDateFormat(c), warnDays = Math.max(1, toNumber(c.bpa_warn_days, 30));
    return html`<div class="bpa-saved">
      <div class="bpa-saved__head">
        <h3 class="bpa-saved__title">${t("عبواتي المحفوظة", "My saved products")}</h3>
        ${this.records.length ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.clearRecords()}>${t("مسح الكل", "Clear all")}</button>` : nothing}
      </div>
      <p class="bpa-saved__note">${t("البيانات محفوظة على جهازك فقط ولا تُرسل إلى أي خادم.", "Data is stored on your device only and never sent to any server.")}</p>
      ${this.records.length ? html`<div class="bpa-records">
            ${this.records.map((rec) => {
      const open = parseDateInput(rec.open), res = open ? computeExpiry(open, rec.pao, warnDays) : null, color = res ? this.stateColor(res.state) : "var(--muted-color)", stateClass = (res == null ? void 0 : res.state) ?? "unknown", daysLabel = res ? res.daysRemaining >= 0 ? t(`${res.daysRemaining} يوم`, `${res.daysRemaining} days`) : t(`منتهٍ ${Math.abs(res.daysRemaining)} يوم`, `Expired ${Math.abs(res.daysRemaining)}d ago`) : "";
      return html`<article
                class="bpa-record bpa-record--${stateClass}"
                style=${styleMap({ "--rec-color": color })}
              >
                <div class="bpa-record__status" aria-hidden="true">
                  <span class="bpa-record__ring"></span>
                  ${res ? html`<span class="bpa-record__days">${Math.abs(res.daysRemaining)}</span>` : nothing}
                </div>
                <div class="bpa-record__body">
                  ${this.editingId === rec.id ? html`<input
                        class="bpa-record__edit"
                        .value=${rec.name}
                        aria-label=${t("اسم العبوة", "Product name")}
                        @change=${(e) => {
        this.renameRecord(rec.id, e.target.value), this.editingId = "";
      }}
                      />` : html`<div class="bpa-record__name">${rec.name}</div>`}
                  <div class="bpa-record__meta">
                    ${res && open ? html`<span class="bpa-record__pill bpa-record__pill--${stateClass}">
                          ${res.state === "expired" ? t("منتهٍ", "Expired") : res.state === "warn" ? t("قرب الانتهاء", "Ending soon") : t("صالح", "Good")}
                        </span>` : nothing}
                    ${daysLabel ? html`<span>${daysLabel}</span>` : nothing}
                    ${res && open ? html`<span>· ${t("ينتهي", "Ends")} ${formatDate(res.expiry, fmt, this.locale)}</span>` : nothing}
                  </div>
                  ${rec.note ? html`<p class="bpa-record__note">${rec.note}</p>` : nothing}
                </div>
                <div class="bpa-record__actions">
                  <button type="button" class="bpa-icon-btn" aria-label=${t("تعديل الاسم", "Rename")} @click=${() => this.editingId = this.editingId === rec.id ? "" : rec.id}>✎</button>
                  <button type="button" class="bpa-icon-btn" aria-label=${t("حذف", "Delete")} @click=${() => this.deleteRecord(rec.id)}>🗑</button>
                </div>
              </article>`;
    })}
          </div>` : html`<div class="bpa-saved__empty">${t("لا توجد عبوات محفوظة بعد.", "No saved products yet.")}</div>`}
    </div>`;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bpa_"), title = localizedString(c.bpa_title), desc = localizedString(c.bpa_desc), inputMode = resolveInputMode(c), categories = parseCategories(c.bpa_categories), paoOptions = parsePaoOptions(c.bpa_pao_options), notice = localizedString(c.bpa_notice) || t(
      "النتيجة تقديرية وتعتمد على تاريخ الفتح والمدة المكتوبة على العبوة. اتبعي تعليمات الشركة المصنّعة وتوقّفي عن الاستخدام عند تغيّر الرائحة أو اللون أو القوام.",
      "The result is approximate and based on the open date and the period printed on the packaging. Follow the manufacturer instructions and stop using if the smell, color or texture changes."
    ), showCategories = inputMode === "category" && categories.length > 0;
    return html`
      <section
        class="fs-section"
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("حاسبة مدة الاستخدام بعد الفتح", "PAO & expiry calculator")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="bpa-shell">
            <aside class="bpa-form-card">
              <h3 class="bpa-form-card__title">${t("احسبي المدة", "Calculate the period")}</h3>
              <p class="bpa-form-card__hint">
                ${t(
      "اختاري الفئة أو المدة، ثم حدّدي تاريخ فتح العبوة.",
      "Pick a category or period, then set the open date."
    )}
              </p>

              <div class="bpa-form">
                ${showCategories ? html`<div class="bpa-field">
                      <label>${t("فئة المستحضر", "Product category")}</label>
                      <div class="bpa-cat-chips" role="group" aria-label=${t("فئات المستحضرات", "Product categories")}>
                        ${categories.map((cat) => {
      const active = cat.id === this.catId, isSicon = cat.icon.startsWith("sicon-");
      return html`<button
                            type="button"
                            class=${`bpa-cat-chip${active ? " is-active" : ""}`}
                            aria-pressed=${active ? "true" : "false"}
                            @click=${() => this.onCategory(cat.id, cat.paoMonths)}
                          >
                            ${cat.icon ? html`<span class="bpa-cat-chip__icon" aria-hidden="true">
                                  ${isSicon ? html`<span class=${cat.icon}></span>` : cat.icon}
                                </span>` : nothing}
                            <span>${cat.name}</span>
                            ${cat.paoMonths ? html`<span class="bpa-cat-chip__months"
                                  >${this.locale === "en" ? `${cat.paoMonths}M` : `${cat.paoMonths} شهر`}</span
                                >` : nothing}
                          </button>`;
    })}
                      </div>
                    </div>` : nothing}

                <div class="bpa-field">
                  <label>${t("مدة الاستخدام بعد الفتح", "Period after opening")}</label>
                  ${paoOptions.length ? html`<div class="bpa-pao-chips" role="group" aria-label=${t("مدد الاستخدام", "Use periods")}>
                        ${paoOptions.map(
      (opt) => html`<button
                            type="button"
                            class=${`bpa-pao-chip${this.pao === opt.months ? " is-active" : ""}`}
                            aria-pressed=${this.pao === opt.months ? "true" : "false"}
                            @click=${() => this.pao = opt.months}
                          >
                            ${paoOptionLabel(opt, this.locale)}
                          </button>`
    )}
                      </div>` : html`<input
                        class="bpa-input"
                        type="number"
                        min="1"
                        max="60"
                        .value=${this.pao ? String(this.pao) : ""}
                        placeholder=${t("عدد الأشهر", "Number of months")}
                        @input=${(e) => this.pao = Math.max(0, toNumber(e.target.value, 0))}
                      />`}
                </div>

                <div class="bpa-field">
                  <label for="bpa-open">${t("تاريخ فتح العبوة", "Open date")}</label>
                  <input
                    id="bpa-open"
                    class="bpa-input"
                    type="date"
                    max=${toInputValue(/* @__PURE__ */ new Date())}
                    .value=${this.openDate}
                    @input=${(e) => this.openDate = e.target.value}
                  />
                </div>

                ${isTruthy(c.bpa_enable_name, !0) ? html`<div class="bpa-field">
                      <label for="bpa-name">${t("اسم العبوة (اختياري)", "Product name (optional)")}</label>
                      <input
                        id="bpa-name"
                        class="bpa-input"
                        .value=${this.recName}
                        placeholder=${t("مثال: سيروم فيتامين C", "e.g. Vitamin C serum")}
                        @input=${(e) => this.recName = e.target.value}
                      />
                    </div>` : nothing}

                ${isTruthy(c.bpa_enable_note, !1) ? html`<div class="bpa-field">
                      <label for="bpa-note">${t("ملاحظة (اختياري)", "Note (optional)")}</label>
                      <input
                        id="bpa-note"
                        class="bpa-input"
                        .value=${this.note}
                        @input=${(e) => this.note = e.target.value}
                      />
                    </div>` : nothing}
              </div>
            </aside>

            ${this.renderResult()}
          </div>

          ${this.renderSaved()}

          <p class="bpa-notice">${notice}</p>
        </div>
      </section>
    `;
  }
};
__name(_BeautyPaoExpiryCalculator, "BeautyPaoExpiryCalculator"), _BeautyPaoExpiryCalculator.styles = [sharedSectionCss, componentStyles];
let BeautyPaoExpiryCalculator = _BeautyPaoExpiryCalculator;
__decorateClass([
  property({ type: Object })
], BeautyPaoExpiryCalculator.prototype, "config");
__decorateClass([
  state()
], BeautyPaoExpiryCalculator.prototype, "catId");
__decorateClass([
  state()
], BeautyPaoExpiryCalculator.prototype, "pao");
__decorateClass([
  state()
], BeautyPaoExpiryCalculator.prototype, "openDate");
__decorateClass([
  state()
], BeautyPaoExpiryCalculator.prototype, "recName");
__decorateClass([
  state()
], BeautyPaoExpiryCalculator.prototype, "note");
__decorateClass([
  state()
], BeautyPaoExpiryCalculator.prototype, "records");
__decorateClass([
  state()
], BeautyPaoExpiryCalculator.prototype, "editingId");
typeof BeautyPaoExpiryCalculator < "u" && BeautyPaoExpiryCalculator.registerSallaComponent("salla-beauty-pao-expiry-calculator");
export {
  BeautyPaoExpiryCalculator as default
};
