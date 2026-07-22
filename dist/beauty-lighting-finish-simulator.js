var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, g as getRadioValue, b as extractLink, l as localizedString, f as parseTags, h as clamp, j as toNumber, e as extractImageUrl, s as sharedSectionCss, t, i as isTruthy, r as readSectionTheme, p as prefersReducedMotion, o as getPageLocale, a as themeStyleMap } from "./sharedStyles-CPLtr3dp.js";
import { r as renderCommerceCtaButton } from "./commerceOutcome-D0x70G-K.js";
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
`, FINISHES = ["any", "matte", "dewy", "glossy", "natural", "velvet"];
function parseLights(raw) {
  return normalizeCollection(raw).map((l, i) => {
    const finish = getRadioValue(l.finish, "any");
    return {
      id: String(l.id ?? l.light_id ?? "").trim() || `light-${i + 1}`,
      name: localizedString(l.name) || `${i + 1}`,
      icon: String(l.icon ?? "").trim(),
      image: extractImageUrl(l.image),
      imageMobile: extractImageUrl(l.image_mobile),
      finish: FINISHES.includes(finish) ? finish : "any",
      desc: localizedString(l.desc),
      colorEffect: localizedString(l.color_effect),
      gloss: clamp(toNumber(l.gloss, 0), 0, 5),
      clarity: clamp(toNumber(l.clarity, 0), 0, 5),
      contrast: clamp(toNumber(l.contrast, 0), 0, 5),
      palette: parseTags(l.palette),
      note: localizedString(l.note),
      link: extractLink(l.link)
    };
  }).filter((l) => l.image || l.name);
}
__name(parseLights, "parseLights");
function resolveViewMode(config) {
  return getRadioValue(config.bls_view_mode, "single") === "compare" ? "compare" : "single";
}
__name(resolveViewMode, "resolveViewMode");
function resolveCompareStyle(config) {
  const value = getRadioValue(config.bls_compare_style, "slider");
  return ["split", "slider", "side"].includes(value) ? value : "slider";
}
__name(resolveCompareStyle, "resolveCompareStyle");
function resolveTransition(config) {
  const value = getRadioValue(config.bls_transition, "fade");
  return ["fade", "slide", "none"].includes(value) ? value : "fade";
}
__name(resolveTransition, "resolveTransition");
function resolveAspect(config, fallback = "4/5") {
  return (getRadioValue(config.bls_aspect, fallback) || fallback).replace("/", " / ");
}
__name(resolveAspect, "resolveAspect");
function finishLabel(finish, locale) {
  return {
    any: ["عام", "Any"],
    matte: ["مطفي", "Matte"],
    dewy: ["ندي", "Dewy"],
    glossy: ["لامع", "Glossy"],
    natural: ["طبيعي", "Natural"],
    velvet: ["مخملي", "Velvet"]
  }[finish][locale === "en" ? 1 : 0];
}
__name(finishLabel, "finishLabel");
function usedFinishes(lights) {
  const seen = /* @__PURE__ */ new Set();
  for (const l of lights) l.finish !== "any" && seen.add(l.finish);
  return FINISHES.filter((f) => seen.has(f));
}
__name(usedFinishes, "usedFinishes");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _BeautyLightingFinishSimulator = class _BeautyLightingFinishSimulator extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.selId = "", this.selName = "", this.selFinish = "", this.cmpA = "", this.cmpB = "", this.sliderPos = 50, this.sliderDragging = !1, this.compareOn = null, this.boundLangHandler = () => this.requestUpdate(), this.onSliderMove = (e) => {
      var _a;
      const stage = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(".bls-cmp-slider");
      if (!stage) return;
      const rect = stage.getBoundingClientRect(), raw = this.isRtl() ? (rect.right - e.clientX) / rect.width : (e.clientX - rect.left) / rect.width;
      this.sliderPos = clamp(Math.round(raw * 100), 0, 100);
    }, this.onSliderDown = (e) => {
      var _a, _b;
      e.preventDefault(), this.sliderDragging = !0, (_b = (_a = e.currentTarget).setPointerCapture) == null || _b.call(_a, e.pointerId), this.onSliderMove(e), window.addEventListener("pointermove", this.onSliderMove), window.addEventListener("pointerup", this.onSliderUp, { once: !0 });
    }, this.onSliderUp = () => {
      this.sliderDragging = !1, window.removeEventListener("pointermove", this.onSliderMove);
    }, this.onSliderKey = (e) => {
      const step = e.shiftKey ? 10 : 5, dir = this.isRtl() ? -1 : 1;
      e.key === "ArrowLeft" ? (e.preventDefault(), this.sliderPos = clamp(this.sliderPos - step * dir, 0, 100)) : e.key === "ArrowRight" ? (e.preventDefault(), this.sliderPos = clamp(this.sliderPos + step * dir, 0, 100)) : e.key === "Home" ? (e.preventDefault(), this.sliderPos = 0) : e.key === "End" && (e.preventDefault(), this.sliderPos = 100);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.selId = "", this.selName = "", this.selFinish = "", this.cmpA = "", this.cmpB = "", this.compareOn = null);
  }
  get lights() {
    var _a;
    return parseLights((_a = this.config) == null ? void 0 : _a.bls_lights);
  }
  uniqueNames(lights) {
    const seen = /* @__PURE__ */ new Set(), out = [];
    for (const l of lights)
      seen.has(l.name) || (seen.add(l.name), out.push(l.name));
    return out;
  }
  defaultName(lights) {
    var _a, _b;
    const preset = String(((_a = this.config) == null ? void 0 : _a.bls_default_light) ?? "").trim(), byId = lights.find((l) => l.id === preset);
    if (byId) return byId.name;
    const byName = lights.find((l) => l.name === preset);
    return byName ? byName.name : ((_b = lights[0]) == null ? void 0 : _b.name) ?? "";
  }
  defaultFinish(lights) {
    var _a;
    const finishes = usedFinishes(lights), preset = getRadioValue((_a = this.config) == null ? void 0 : _a.bls_default_finish, "");
    return finishes.includes(preset) ? preset : finishes[0] ?? "any";
  }
  activeSingle(lights, finishEnabled) {
    var _a;
    if (finishEnabled) {
      const name = this.selName || this.defaultName(lights), finish = this.selFinish || this.defaultFinish(lights);
      return lights.find((l) => l.name === name && l.finish === finish) || lights.find((l) => l.finish === finish) || lights.find((l) => l.name === name) || lights[0];
    }
    const preset = String(((_a = this.config) == null ? void 0 : _a.bls_default_light) ?? "").trim(), id = this.selId || preset;
    return lights.find((l) => l.id === id) || lights.find((l) => l.name === id) || lights[0];
  }
  renderPicture(light, cls, eager) {
    return light != null && light.image ? html`<picture class="bls-pic ${cls}">
      ${light.imageMobile ? html`<source media="(max-width: 639px)" srcset=${light.imageMobile} />` : nothing}
      <img
        src=${light.image}
        alt=${light.name}
        loading=${eager ? "eager" : "lazy"}
        decoding="async"
        fetchpriority=${eager ? "high" : "low"}
      />
    </picture>` : html`<div class="bls-pic bls-pic--empty ${cls}" role="img" aria-label=${t("لا توجد صورة", "No image")}>
        <span class="bls-empty__icon" aria-hidden="true">◯</span>
        <span class="bls-empty__text">${t("أضيفي صورة لهذه الحالة", "Add an image for this state")}</span>
      </div>`;
  }
  // —— compare slider ——
  isRtl() {
    return getComputedStyle(this).direction === "rtl";
  }
  renderIndicators(light, locale) {
    const rows = [
      [locale === "en" ? "Glossiness" : "اللمعان", light.gloss],
      [locale === "en" ? "Color clarity" : "وضوح اللون", light.clarity],
      [locale === "en" ? "Contrast" : "التباين", light.contrast]
    ].filter(([, v]) => v > 0);
    return rows.length ? html`<div class="bls-indicators">
      ${rows.map(
      ([label, val]) => html`<div class="bls-indicator">
          <span class="bls-indicator__label">${label}</span>
          <span class="fs-meter"><span style=${styleMap({ width: `${val / 5 * 100}%` })}></span></span>
          <span class="bls-indicator__val">${val}/5</span>
        </div>`
    )}
    </div>` : nothing;
  }
  renderPanel(light, locale) {
    const c = this.config || {}, showIndicators = isTruthy(c.bls_show_indicators, !0), showPalette = isTruthy(c.bls_show_palette, !0);
    return html`<div class="bls-panel">
      ${light.desc ? html`<p class="bls-desc">${light.desc}</p>` : nothing}
      ${light.colorEffect ? html`<p class="bls-color-effect">${t("تأثير اللون", "Color effect")}: ${light.colorEffect}</p>` : nothing}
      ${showIndicators ? this.renderIndicators(light, locale) : nothing}
      ${showPalette && light.palette.length ? html`<div class="bls-palette">${light.palette.map((col) => html`<span class="bls-swatch" style=${styleMap({ background: col })} title=${col}></span>`)}</div>` : nothing}
      ${light.note ? html`<p class="bls-note">★ ${light.note}</p>` : nothing}
      <div class="fs-actions">
        ${renderCommerceCtaButton(c, "bls_", { href: light.link })}
      </div>
    </div>`;
  }
  renderLightChip(light, active) {
    const isSicon = light.icon.startsWith("sicon-");
    return html`
      <button
        type="button"
        class=${classMap({ "bls-chip": !0, "is-active": active })}
        aria-pressed=${active ? "true" : "false"}
        @click=${() => this.selId = light.id}
      >
        <span class="bls-chip__icon" aria-hidden="true">
          ${light.icon ? isSicon ? html`<span class=${light.icon}></span>` : light.icon : "✦"}
        </span>
        <span class="bls-chip__name">${light.name}</span>
        <span class="bls-chip__dot" aria-hidden="true"></span>
      </button>
    `;
  }
  renderSingle(lights, locale) {
    var _a;
    const c = this.config || {}, finishEnabled = isTruthy(c.bls_enable_finish, !1) && usedFinishes(lights).length > 0, eagerAll = getRadioValue((_a = this.config) == null ? void 0 : _a.bls_preload, "lazy") === "eager", transition = resolveTransition(c), active = this.activeSingle(lights, finishEnabled), names = this.uniqueNames(lights), finishes = usedFinishes(lights), activeName = active == null ? void 0 : active.name, activeFinish = this.selFinish || this.defaultFinish(lights);
    return html`
      <div class="bls-shell">
        <aside class="bls-aside">
          <div class="bls-controls-card">
            ${finishEnabled ? html`
                  <div class="bls-controls">
                    <span class="bls-controls__label">${t("اللمسة النهائية", "Finish")}</span>
                    <div class="bls-finish-chips" role="group" aria-label=${t("اللمسة النهائية", "Finish")}>
                      ${finishes.map(
      (f) => html`<button
                          type="button"
                          class=${classMap({ "bls-finish-chip": !0, "is-active": f === activeFinish })}
                          aria-pressed=${f === activeFinish ? "true" : "false"}
                          @click=${() => this.selFinish = f}
                        >
                          ${finishLabel(f, locale)}
                        </button>`
    )}
                    </div>
                  </div>
                  <div class="bls-controls">
                    <span class="bls-controls__label">${t("نوع الإضاءة", "Lighting")}</span>
                    <div class="bls-chips" role="group" aria-label=${t("حالات الإضاءة", "Lighting states")}>
                      ${names.map((n) => {
      const sample = lights.find((l) => l.name === n), isSicon = !!(sample != null && sample.icon.startsWith("sicon-"));
      return html`<button
                          type="button"
                          class=${classMap({ "bls-chip": !0, "is-active": n === activeName })}
                          aria-pressed=${n === activeName ? "true" : "false"}
                          @click=${() => this.selName = n}
                        >
                          <span class="bls-chip__icon" aria-hidden="true">
                            ${sample != null && sample.icon ? isSicon ? html`<span class=${sample.icon}></span>` : sample.icon : "✦"}
                          </span>
                          <span class="bls-chip__name">${n}</span>
                          <span class="bls-chip__dot" aria-hidden="true"></span>
                        </button>`;
    })}
                    </div>
                  </div>
                ` : html`<div class="bls-controls">
                  <span class="bls-controls__label">${t("اختاري الإضاءة", "Pick a lighting")}</span>
                  <div class="bls-chips" role="group" aria-label=${t("حالات الإضاءة", "Lighting states")}>
                    ${lights.map((l) => this.renderLightChip(l, l.id === (active == null ? void 0 : active.id)))}
                  </div>
                </div>`}
          </div>

          ${active ? this.renderPanel(active, locale) : nothing}
        </aside>

        <div class="bls-mirror">
          <div class=${classMap({ "bls-stage": !0, "bls-stage--fade": transition === "fade" })}>
            ${eagerAll ? lights.map(
      (l) => this.renderPicture(l, `bls-layer ${l.id === (active == null ? void 0 : active.id) ? "is-on" : ""}`, !0)
    ) : this.renderPicture(active, "", !0)}
            <div class="bls-caption">
              <b>${active == null ? void 0 : active.name}</b>${active != null && active.colorEffect ? html` — ${active.colorEffect}` : nothing}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  renderCompare(lights) {
    const c = this.config || {}, style = resolveCompareStyle(c), a = lights.find((l) => l.id === this.cmpA) || lights[0], b = lights.find((l) => l.id === this.cmpB) || lights[1] || lights[0], picks = html`<div class="bls-compare-picks">
      <div>
        <label for="bls-a">${t("الحالة الأولى", "First state")}</label>
        <select id="bls-a" @change=${(e) => this.cmpA = e.target.value}>
          ${lights.map((l) => html`<option value=${l.id} ?selected=${l.id === (a == null ? void 0 : a.id)}>${l.name}</option>`)}
        </select>
        ${renderCommerceCtaButton(c, "bls_", { href: a == null ? void 0 : a.link })}
      </div>
      <div>
        <label for="bls-b">${t("الحالة الثانية", "Second state")}</label>
        <select id="bls-b" @change=${(e) => this.cmpB = e.target.value}>
          ${lights.map((l) => html`<option value=${l.id} ?selected=${l.id === (b == null ? void 0 : b.id)}>${l.name}</option>`)}
        </select>
        ${renderCommerceCtaButton(c, "bls_", { href: b == null ? void 0 : b.link })}
      </div>
    </div>`;
    if (style === "side")
      return html`<div class="bls-wrap">
        <div class="bls-cmp-side">
          <div class="bls-stage"><span class="bls-cmp-tag bls-cmp-tag--a">${a == null ? void 0 : a.name}</span>${this.renderPicture(a, "", !0)}</div>
          <div class="bls-stage"><span class="bls-cmp-tag bls-cmp-tag--b">${b == null ? void 0 : b.name}</span>${this.renderPicture(b, "", !0)}</div>
        </div>
        ${picks}
      </div>`;
    const overlayStyle = style === "slider" ? styleMap({ "--bls-pos": `${this.sliderPos}%` }) : styleMap({});
    return html`<div class="bls-wrap">
      <div
        class=${classMap({
      "bls-stage": !0,
      "bls-cmp-slider": style === "slider",
      "bls-cmp-split": style === "split",
      "is-dragging": style === "slider" && this.sliderDragging
    })}
        style=${overlayStyle}
        role=${style === "slider" ? "slider" : nothing}
        tabindex=${style === "slider" ? "0" : nothing}
        aria-label=${style === "slider" ? t("اسحبي للمقارنة بين الحالتين", "Drag to compare the two states") : nothing}
        aria-valuenow=${style === "slider" ? Math.round(this.sliderPos) : nothing}
        aria-valuemin=${style === "slider" ? "0" : nothing}
        aria-valuemax=${style === "slider" ? "100" : nothing}
        @pointerdown=${style === "slider" ? this.onSliderDown : void 0}
        @keydown=${style === "slider" ? this.onSliderKey : void 0}
      >
        <span class="bls-cmp-tag bls-cmp-tag--a">${b == null ? void 0 : b.name}</span>
        <span class="bls-cmp-tag bls-cmp-tag--b">${a == null ? void 0 : a.name}</span>
        ${this.renderPicture(a, "", !0)}
        ${this.renderPicture(b, "bls-img--overlay", !0)}
        ${style === "slider" ? html`
              <div class="bls-cmp-handle" aria-hidden="true">
                <span class="bls-cmp-handle__pill">‹ ›</span>
              </div>
              ${!this.sliderDragging && this.sliderPos === 50 ? html`<div class="bls-cmp-hint" aria-hidden="true">${t("اسحبي للمقارنة", "Drag to compare")}</div>` : nothing}
            ` : nothing}
      </div>
      ${picks}
    </div>`;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bls_"), animate = theme.animate && !prefersReducedMotion(), lights = this.lights, title = localizedString(c.bls_title), desc = localizedString(c.bls_desc), locale = getPageLocale() === "en" ? "en" : "ar", viewMode = resolveViewMode(c), showCompare = isTruthy(c.bls_show_compare, !0) && lights.length >= 2, compareActive = this.compareOn ?? viewMode === "compare", effectiveMode = showCompare && compareActive ? "compare" : "single";
    return lights.length ? (this.activeSingle(lights, isTruthy(c.bls_enable_finish, !1)), html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap({
      ...themeStyleMap(theme),
      "--bls-aspect": resolveAspect(c),
      "--bls-active": String(c.bls_active_color ?? theme.accent),
      "--bls-speed": `${Math.max(0, toNumber(c.bls_speed, 400))}ms`
    })}
        aria-label=${title || t("محاكي الإضاءة والمظهر", "Lighting & finish simulator")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          ${showCompare ? html`<div class="bls-mode-toggle" role="group" aria-label=${t("طريقة العرض", "View mode")}>
                <button
                  type="button"
                  class=${classMap({ "bls-mode-toggle__btn": !0, "is-active": effectiveMode === "single" })}
                  aria-pressed=${effectiveMode === "single" ? "true" : "false"}
                  @click=${() => this.compareOn = !1}
                >
                  ${t("حالة واحدة", "Single")}
                </button>
                <button
                  type="button"
                  class=${classMap({ "bls-mode-toggle__btn": !0, "is-active": effectiveMode === "compare" })}
                  aria-pressed=${effectiveMode === "compare" ? "true" : "false"}
                  @click=${() => this.compareOn = !0}
                >
                  ${t("مقارنة", "Compare")}
                </button>
              </div>` : nothing}

          ${effectiveMode === "compare" ? this.renderCompare(lights) : this.renderSingle(lights, locale)}
        </div>
      </section>
    `) : html`<div class="fs-empty" role="status">
        ${t("أضيفي حالات إضاءة مع صورها من إعدادات العنصر.", "Add lighting states with their images in the element settings.")}
      </div>`;
  }
};
__name(_BeautyLightingFinishSimulator, "BeautyLightingFinishSimulator"), _BeautyLightingFinishSimulator.styles = [sharedSectionCss, componentStyles];
let BeautyLightingFinishSimulator = _BeautyLightingFinishSimulator;
__decorateClass([
  property({ type: Object })
], BeautyLightingFinishSimulator.prototype, "config");
__decorateClass([
  state()
], BeautyLightingFinishSimulator.prototype, "selId");
__decorateClass([
  state()
], BeautyLightingFinishSimulator.prototype, "selName");
__decorateClass([
  state()
], BeautyLightingFinishSimulator.prototype, "selFinish");
__decorateClass([
  state()
], BeautyLightingFinishSimulator.prototype, "cmpA");
__decorateClass([
  state()
], BeautyLightingFinishSimulator.prototype, "cmpB");
__decorateClass([
  state()
], BeautyLightingFinishSimulator.prototype, "sliderPos");
__decorateClass([
  state()
], BeautyLightingFinishSimulator.prototype, "sliderDragging");
__decorateClass([
  state()
], BeautyLightingFinishSimulator.prototype, "compareOn");
typeof BeautyLightingFinishSimulator < "u" && BeautyLightingFinishSimulator.registerSallaComponent("salla-beauty-lighting-finish-simulator");
export {
  BeautyLightingFinishSimulator as default
};
