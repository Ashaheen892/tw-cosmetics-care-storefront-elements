var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, t, i as isTruthy, s as sharedSectionCss, r as readSectionTheme, p as prefersReducedMotion, a as themeStyleMap } from "./sharedStyles-Bu7Tok5Z.js";
import { r as renderCommerceCtaButton } from "./commerceOutcome-BLJKzvei.js";
const componentStyles = css`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bch-wrap {
    display: grid;
    gap: 1.5rem;
    width: 100%;
    max-width: 1040px;
    margin-inline: auto;
  }

  .bch-controls {
    display: grid;
    gap: 1.15rem;
    padding: 1.15rem 1.2rem;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.06);
  }

  .bch-group {
    display: grid;
    gap: 0.65rem;
  }

  .bch-group__label {
    margin: 0;
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.01em;
    color: var(--muted-color, #666666);
  }

  /* —— base color chips —— */
  .bch-colors {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .bch-color {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    min-height: 44px;
    padding: 0.4rem 0.85rem 0.4rem 0.4rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 999px;
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.88rem;
    font-weight: 700;
    line-height: 1.2;
    cursor: pointer;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  }

  .bch-color:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  .bch-color[aria-pressed='true'] {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 32%, transparent);
  }

  .bch-color__swatch {
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    flex: 0 0 auto;
    border: 2px solid #fff;
    box-shadow: 0 2px 6px rgba(20, 14, 12, 0.22);
    background: var(--swatch, #ccc);
  }

  .bch-color__name {
    white-space: nowrap;
  }

  /* —— harmony type chips —— */
  .bch-types {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  @media (min-width: 640px) {
    .bch-types {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .bch-type {
    display: grid;
    gap: 0.2rem;
    min-height: 64px;
    padding: 0.7rem 0.9rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 16px) * 0.65);
    background: color-mix(in srgb, var(--section-bg, transparent) 55%, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    text-align: start;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }

  .bch-type__label {
    line-height: 1.3;
  }

  .bch-type__hint {
    font-size: 0.74rem;
    font-weight: 600;
    color: var(--muted-color, #666666);
    line-height: 1.35;
  }

  .bch-type[aria-pressed='true'] .bch-type__hint {
    color: rgba(255, 255, 255, 0.85);
  }

  .bch-type:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  .bch-type[aria-pressed='true'] {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    border-color: var(--accent-color, var(--fs-store-primary));
    color: #fff;
  }

  /* —— result area —— */
  .bch-result {
    display: grid;
    gap: 1.15rem;
  }

  @media (min-width: 900px) {
    .bch-result {
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
      align-items: start;
    }
  }

  .bch-cta {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    margin-top: 0.15rem;
  }

  .bch-cta__btn {
    min-height: 38px;
    min-width: auto;
    padding: 0.4rem 1.15rem;
    font-size: 0.82rem;
    font-weight: 700;
    border-radius: 999px;
    box-shadow: none;
  }

  .bch-cta__btn:hover {
    box-shadow: none;
  }

  .bch-preview,
  .bch-zones-wrap {
    display: grid;
    gap: 0.8rem;
    min-width: 0;
  }

  .bch-preview {
    padding: 1.2rem;
    border-radius: calc(var(--section-radius, 16px) * 0.9);
    background: linear-gradient(
      160deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff)),
      var(--card-bg, #fff)
    );
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 12px 32px rgba(43, 33, 28, 0.08);
  }

  .bch-zones-wrap {
    padding: 1.2rem;
    border-radius: calc(var(--section-radius, 16px) * 0.9);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
  }

  .bch-preview__label {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--muted-color, #666666);
  }

  .bch-strip {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 0.75rem;
  }

  .bch-swatch {
    display: grid;
    gap: 0.45rem;
    justify-items: center;
    text-align: center;
    min-width: 0;
  }

  .bch-swatch__chip {
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    border: 1px solid color-mix(in srgb, #000 8%, transparent);
    box-shadow: 0 8px 20px rgba(20, 14, 12, 0.16);
    background: var(--swatch, #ccc);
  }

  .bch-swatch__hex {
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--muted-color, #666666);
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
  }

  .bch-zones {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) {
    .bch-zones {
      grid-template-columns: 1fr;
    }
  }

  .bch-zone {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem;
    background: color-mix(in srgb, var(--section-bg, transparent) 60%, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 16px) * 0.7);
  }

  .bch-zone__swatch {
    width: 2.75rem;
    height: 2.75rem;
    flex: 0 0 auto;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 3px 10px rgba(20, 14, 12, 0.2);
    background: var(--swatch, #ccc);
  }

  .bch-zone__body {
    display: grid;
    gap: 0.15rem;
    min-width: 0;
  }

  .bch-zone__label {
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bch-zone__hex {
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
  }

  .bch-notice {
    margin: 0;
    text-align: center;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
    line-height: 1.6;
  }

  @media (prefers-reduced-motion: reduce) {
    .bch-color,
    .bch-type {
      transition: none !important;
    }
  }
`, FALLBACK_HEX = "#cccccc";
function readHexRaw(raw) {
  if (typeof raw == "string") return raw.trim();
  if (typeof raw == "number" && Number.isFinite(raw)) return String(raw);
  if (raw && typeof raw == "object") {
    const obj = raw;
    for (const key of ["hex", "value", "color", "code"]) {
      const v = obj[key];
      if (typeof v == "string" && v.trim()) return v.trim();
    }
  }
  return "";
}
__name(readHexRaw, "readHexRaw");
function parseColors(raw) {
  return normalizeCollection(raw).map((row, i) => {
    const name = localizedString(row.name), hex = normalizeHex(readHexRaw(row.hex ?? row.color));
    return {
      id: String(row.id ?? row.color_id ?? row.id ?? "").trim() || `color-${i + 1}`,
      name,
      hex
    };
  }).filter((color) => !!(color.name || color.hex));
}
__name(parseColors, "parseColors");
function normalizeHex(input) {
  const value = String(input || "").trim(), match = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.exec(value);
  if (!match) return FALLBACK_HEX;
  let hex = match[1].toLowerCase();
  return hex.length === 3 && (hex = hex.split("").map((ch) => ch + ch).join("")), `#${hex}`;
}
__name(normalizeHex, "normalizeHex");
function hexToHsl(hex) {
  const normalized = normalizeHex(hex), r = parseInt(normalized.slice(1, 3), 16) / 255, g = parseInt(normalized.slice(3, 5), 16) / 255, b = parseInt(normalized.slice(5, 7), 16) / 255, max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
  let h = 0;
  delta !== 0 && (max === r ? h = (g - b) / delta % 6 : max === g ? h = (b - r) / delta + 2 : h = (r - g) / delta + 4, h *= 60, h < 0 && (h += 360));
  const l = (max + min) / 2, s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}
__name(hexToHsl, "hexToHsl");
function hslToHex(hsl) {
  const h = (hsl.h % 360 + 360) % 360, s = clamp01(hsl.s / 100), l = clamp01(hsl.l / 100), c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(h / 60 % 2 - 1)), m = l - c / 2;
  let r = 0, g = 0, b = 0;
  h < 60 ? [r, g, b] = [c, x, 0] : h < 120 ? [r, g, b] = [x, c, 0] : h < 180 ? [r, g, b] = [0, c, x] : h < 240 ? [r, g, b] = [0, x, c] : h < 300 ? [r, g, b] = [x, 0, c] : [r, g, b] = [c, 0, x];
  const toByte = /* @__PURE__ */ __name((v) => Math.round((v + m) * 255).toString(16).padStart(2, "0"), "toByte");
  return `#${toByte(r)}${toByte(g)}${toByte(b)}`;
}
__name(hslToHex, "hslToHex");
function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}
__name(clamp01, "clamp01");
function rotateHue(hsl, deg) {
  return { ...hsl, h: ((hsl.h + deg) % 360 + 360) % 360 };
}
__name(rotateHue, "rotateHue");
function buildHarmony(baseHex, type) {
  const base = hexToHsl(baseHex);
  switch (type) {
    case "complementary":
      return [hslToHex(base), hslToHex(rotateHue(base, 180))];
    case "analogous":
      return [
        hslToHex(rotateHue(base, -30)),
        hslToHex(base),
        hslToHex(rotateHue(base, 30))
      ];
    case "triadic":
      return [
        hslToHex(base),
        hslToHex(rotateHue(base, 120)),
        hslToHex(rotateHue(base, 240))
      ];
    default:
      return [hslToHex(base)];
  }
}
__name(buildHarmony, "buildHarmony");
function mapToZones(harmony, baseHex) {
  const base = hexToHsl(baseHex), lips = harmony[0] || hslToHex(base), eyes = harmony[1] || harmony[0] || hslToHex(base), cheeks = harmony[2] || hslToHex({
    h: base.h,
    s: Math.round(base.s * 0.55),
    l: Math.min(92, Math.round(base.l + (100 - base.l) * 0.4))
  });
  return { lips, eyes, cheeks };
}
__name(mapToZones, "mapToZones");
function harmonyPlainLabel(type) {
  const map = {
    complementary: ["ألوان متعاكسة", "Opposite colors"],
    analogous: ["ألوان متقاربة", "Neighboring colors"],
    triadic: ["ثلاثة ألوان متوازنة", "Three balanced colors"]
  }, [ar, en] = map[type];
  return t(ar, en);
}
__name(harmonyPlainLabel, "harmonyPlainLabel");
function harmonyHint(type) {
  const map = {
    complementary: ["تباين جريء", "Bold contrast"],
    analogous: ["انسجام ناعم", "Soft blend"],
    triadic: ["توازن حيوي", "Vibrant balance"]
  }, [ar, en] = map[type];
  return t(ar, en);
}
__name(harmonyHint, "harmonyHint");
function enabledHarmonies(config) {
  const out = [];
  return isTruthy(config.bch_show_complementary, !0) && out.push("complementary"), isTruthy(config.bch_show_analogous, !0) && out.push("analogous"), isTruthy(config.bch_show_triadic, !0) && out.push("triadic"), out;
}
__name(enabledHarmonies, "enabledHarmonies");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _BeautyColorHarmony = class _BeautyColorHarmony extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.selectedColorId = "", this.harmonyType = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.selectedColorId = "", this.harmonyType = "");
  }
  get colors() {
    var _a;
    return parseColors((_a = this.config) == null ? void 0 : _a.bch_colors);
  }
  resolveColor(colors) {
    var _a;
    if (!colors.length) return null;
    if (this.selectedColorId) {
      const found = colors.find((c) => c.id === this.selectedColorId);
      if (found) return found;
    }
    const preset = String(((_a = this.config) == null ? void 0 : _a.bch_default_color) ?? "").trim();
    if (preset) {
      const found = colors.find((c) => c.id === preset);
      if (found) return found;
    }
    return colors[0];
  }
  resolveHarmony(types) {
    return this.harmonyType && types.includes(this.harmonyType) ? this.harmonyType : types[0];
  }
  selectColor(id) {
    this.selectedColorId = id;
  }
  selectHarmony(type) {
    this.harmonyType = type;
  }
  renderColors(colors, active) {
    return html`
      <div class="bch-colors" role="group" aria-label=${t("اختاري لون الأساس", "Choose base color")}>
        ${colors.map((color) => {
      const selected = (active == null ? void 0 : active.id) === color.id, label = color.name || color.hex;
      return html`
            <button
              type="button"
              class="bch-color"
              style=${styleMap({ "--swatch": color.hex })}
              aria-pressed=${selected ? "true" : "false"}
              aria-label=${`${label} ${color.hex}`}
              @click=${() => this.selectColor(color.id)}
            >
              <span class="bch-color__swatch" aria-hidden="true"></span>
              ${color.name ? html`<span class="bch-color__name">${color.name}</span>` : nothing}
            </button>
          `;
    })}
      </div>
    `;
  }
  renderTypes(types, active) {
    if (!types.length) return nothing;
    const c = this.config || {}, groupLabel = localizedString(c.bch_harmony_label) || t("2) اختاري نوع التناسق", "2) Choose harmony style");
    return html`
      <div class="bch-group">
        <p class="bch-group__label">${groupLabel}</p>
        <div class="bch-types" role="group" aria-label=${groupLabel}>
          ${types.map((type) => {
      const selected = active === type, label = harmonyPlainLabel(type), hint = harmonyHint(type);
      return html`
              <button
                type="button"
                class="bch-type"
                aria-pressed=${selected ? "true" : "false"}
                aria-describedby=${hint ? `bch-hint-${type}` : nothing}
                @click=${() => this.selectHarmony(type)}
              >
                <span class="bch-type__label">${label}</span>
                ${hint ? html`<span class="bch-type__hint" id=${`bch-hint-${type}`}>${hint}</span>` : nothing}
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderStrip(harmony, showHex) {
    return html`
      <div class="bch-strip">
        ${harmony.map(
      (hex) => html`
            <div class="bch-swatch">
              <div
                class="bch-swatch__chip"
                style=${styleMap({ "--swatch": hex })}
                role="img"
                aria-label=${hex}
              ></div>
              ${showHex ? html`<span class="bch-swatch__hex">${hex}</span>` : nothing}
            </div>
          `
    )}
      </div>
    `;
  }
  renderZones(zones, showHex) {
    const c = this.config || {}, items = [
      { key: "lips", label: localizedString(c.bch_lips_label) || t("الشفاه", "Lips") },
      { key: "eyes", label: localizedString(c.bch_eyes_label) || t("العيون", "Eyes") },
      { key: "cheeks", label: localizedString(c.bch_cheeks_label) || t("الخدود", "Cheeks") }
    ];
    return html`
      <div class="bch-zones">
        ${items.map((item) => {
      const hex = zones[item.key];
      return html`
            <div class="bch-zone">
              <span
                class="bch-zone__swatch"
                style=${styleMap({ "--swatch": hex })}
                role="img"
                aria-label=${`${item.label} ${hex}`}
              ></span>
              <div class="bch-zone__body">
                <span class="bch-zone__label">${item.label}</span>
                ${showHex ? html`<span class="bch-zone__hex">${hex}</span>` : nothing}
              </div>
            </div>
          `;
    })}
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bch_"), animate = theme.animate && !prefersReducedMotion(), colors = this.colors, title = localizedString(c.bch_title), desc = localizedString(c.bch_desc), showHex = isTruthy(c.bch_show_hex, !0), showNotice = isTruthy(c.bch_show_notice, !0), notice = localizedString(c.bch_notice) || t(
      "اقتراحات الألوان إرشادية لمساعدتك على التنسيق.",
      "Color suggestions are guidance to help you coordinate."
    );
    if (!colors.length)
      return html`<div class="fs-empty" role="status">
        ${t(
        "أضيفي درجات ألوان من إعدادات العنصر.",
        "Add color shades in the element settings."
      )}
      </div>`;
    const types = enabledHarmonies(c);
    if (!types.length)
      return html`<div class="fs-empty" role="status">
        ${t(
        "فعّلي نوع تناسق واحدًا على الأقل من الإعدادات.",
        "Enable at least one harmony type in the settings."
      )}
      </div>`;
    const activeColor = this.resolveColor(colors), activeType = this.resolveHarmony(types), baseHex = (activeColor == null ? void 0 : activeColor.hex) ?? colors[0].hex, harmony = buildHarmony(baseHex, activeType), zones = mapToZones(harmony, baseHex);
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("عجلة تناسق ألوان المكياج", "Makeup color harmony wheel")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="bch-wrap">
            <div class="bch-controls">
              <div class="bch-group">
                <p class="bch-group__label">${t("1) اختاري لون الأساس", "1) Choose a base color")}</p>
                ${this.renderColors(colors, activeColor)}
              </div>
              ${this.renderTypes(types, activeType)}
            </div>

            <div class="bch-result">
              <div class="bch-preview">
                <p class="bch-preview__label">${t("لوحة التناسق", "Harmony palette")}</p>
                ${this.renderStrip(harmony, showHex)}
              </div>
              <div class="bch-zones-wrap">
                <p class="bch-preview__label">${t("توزيع على الوجه", "Face placement")}</p>
                ${this.renderZones(zones, showHex)}
              </div>
              <div class="bch-cta">
                ${renderCommerceCtaButton(c, "bch_", { className: "bch-cta__btn" })}
              </div>
            </div>

            ${showNotice ? html`<p class="bch-notice">${notice}</p>` : nothing}
          </div>
        </div>
      </section>
    `;
  }
};
__name(_BeautyColorHarmony, "BeautyColorHarmony"), _BeautyColorHarmony.styles = [sharedSectionCss, componentStyles];
let BeautyColorHarmony = _BeautyColorHarmony;
__decorateClass([
  property({ type: Object })
], BeautyColorHarmony.prototype, "config");
__decorateClass([
  state()
], BeautyColorHarmony.prototype, "selectedColorId");
__decorateClass([
  state()
], BeautyColorHarmony.prototype, "harmonyType");
typeof BeautyColorHarmony < "u" && BeautyColorHarmony.registerSallaComponent("salla-beauty-color-harmony");
export {
  BeautyColorHarmony as default
};
