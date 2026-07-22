import { css as F, LitElement as I, html as a, nothing as c } from "lit";
import { property as R, state as v } from "lit/decorators.js";
import { classMap as u } from "lit/directives/class-map.js";
import { styleMap as w } from "lit/directives/style-map.js";
import { n as O, g as x, b as B, l as y, f as H, h as $, j as P, e as D, s as T, t as d, i as _, r as X, p as j, o as q, a as U } from "./sharedStyles-DKbcXBPy.js";
import { r as z } from "./commerceOutcome-Dk8p2VWM.js";
const V = F`
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
`, N = ["any", "matte", "dewy", "glossy", "natural", "velvet"];
function K(p) {
  return O(p).map((e, s) => {
    const r = x(e.finish, "any");
    return {
      id: String(e.id ?? e.light_id ?? "").trim() || `light-${s + 1}`,
      name: y(e.name) || `${s + 1}`,
      icon: String(e.icon ?? "").trim(),
      image: D(e.image),
      imageMobile: D(e.image_mobile),
      finish: N.includes(r) ? r : "any",
      desc: y(e.desc),
      colorEffect: y(e.color_effect),
      gloss: $(P(e.gloss, 0), 0, 5),
      clarity: $(P(e.clarity, 0), 0, 5),
      contrast: $(P(e.contrast, 0), 0, 5),
      palette: H(e.palette),
      note: y(e.note),
      link: B(e.link)
    };
  }).filter((e) => e.image || e.name);
}
function G(p) {
  return x(p.bls_view_mode, "single") === "compare" ? "compare" : "single";
}
function W(p) {
  const e = x(p.bls_compare_style, "slider");
  return ["split", "slider", "side"].includes(e) ? e : "slider";
}
function Y(p) {
  const e = x(p.bls_transition, "fade");
  return ["fade", "slide", "none"].includes(e) ? e : "fade";
}
function J(p, e = "4/5") {
  return (x(p.bls_aspect, e) || e).replace("/", " / ");
}
function Q(p, e) {
  return {
    any: ["عام", "Any"],
    matte: ["مطفي", "Matte"],
    dewy: ["ندي", "Dewy"],
    glossy: ["لامع", "Glossy"],
    natural: ["طبيعي", "Natural"],
    velvet: ["مخملي", "Velvet"]
  }[p][e === "en" ? 1 : 0];
}
function C(p) {
  const e = /* @__PURE__ */ new Set();
  for (const s of p) s.finish !== "any" && e.add(s.finish);
  return N.filter((s) => e.has(s));
}
var Z = Object.defineProperty, f = (p, e, s, r) => {
  for (var i = void 0, t = p.length - 1, n; t >= 0; t--)
    (n = p[t]) && (i = n(e, s, i) || i);
  return i && Z(e, s, i), i;
};
const M = class M extends I {
  constructor() {
    super(...arguments), this.config = {}, this.selId = "", this.selName = "", this.selFinish = "", this.cmpA = "", this.cmpB = "", this.sliderPos = 50, this.sliderDragging = !1, this.compareOn = null, this.boundLangHandler = () => this.requestUpdate(), this.onSliderMove = (e) => {
      var t;
      const s = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".bls-cmp-slider");
      if (!s) return;
      const r = s.getBoundingClientRect(), i = this.isRtl() ? (r.right - e.clientX) / r.width : (e.clientX - r.left) / r.width;
      this.sliderPos = $(Math.round(i * 100), 0, 100);
    }, this.onSliderDown = (e) => {
      var s, r;
      e.preventDefault(), this.sliderDragging = !0, (r = (s = e.currentTarget).setPointerCapture) == null || r.call(s, e.pointerId), this.onSliderMove(e), window.addEventListener("pointermove", this.onSliderMove), window.addEventListener("pointerup", this.onSliderUp, { once: !0 });
    }, this.onSliderUp = () => {
      this.sliderDragging = !1, window.removeEventListener("pointermove", this.onSliderMove);
    }, this.onSliderKey = (e) => {
      const s = e.shiftKey ? 10 : 5, r = this.isRtl() ? -1 : 1;
      e.key === "ArrowLeft" ? (e.preventDefault(), this.sliderPos = $(this.sliderPos - s * r, 0, 100)) : e.key === "ArrowRight" ? (e.preventDefault(), this.sliderPos = $(this.sliderPos + s * r, 0, 100)) : e.key === "Home" ? (e.preventDefault(), this.sliderPos = 0) : e.key === "End" && (e.preventDefault(), this.sliderPos = 100);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.selId = "", this.selName = "", this.selFinish = "", this.cmpA = "", this.cmpB = "", this.compareOn = null);
  }
  get lights() {
    var e;
    return K((e = this.config) == null ? void 0 : e.bls_lights);
  }
  uniqueNames(e) {
    const s = /* @__PURE__ */ new Set(), r = [];
    for (const i of e)
      s.has(i.name) || (s.add(i.name), r.push(i.name));
    return r;
  }
  defaultName(e) {
    var t, n;
    const s = String(((t = this.config) == null ? void 0 : t.bls_default_light) ?? "").trim(), r = e.find((o) => o.id === s);
    if (r) return r.name;
    const i = e.find((o) => o.name === s);
    return i ? i.name : ((n = e[0]) == null ? void 0 : n.name) ?? "";
  }
  defaultFinish(e) {
    var i;
    const s = C(e), r = x((i = this.config) == null ? void 0 : i.bls_default_finish, "");
    return s.includes(r) ? r : s[0] ?? "any";
  }
  activeSingle(e, s) {
    var t;
    if (s) {
      const n = this.selName || this.defaultName(e), o = this.selFinish || this.defaultFinish(e);
      return e.find((l) => l.name === n && l.finish === o) || e.find((l) => l.finish === o) || e.find((l) => l.name === n) || e[0];
    }
    const r = String(((t = this.config) == null ? void 0 : t.bls_default_light) ?? "").trim(), i = this.selId || r;
    return e.find((n) => n.id === i) || e.find((n) => n.name === i) || e[0];
  }
  renderPicture(e, s, r) {
    return e != null && e.image ? a`<picture class="bls-pic ${s}">
      ${e.imageMobile ? a`<source media="(max-width: 639px)" srcset=${e.imageMobile} />` : c}
      <img
        src=${e.image}
        alt=${e.name}
        loading=${r ? "eager" : "lazy"}
        decoding="async"
        fetchpriority=${r ? "high" : "low"}
      />
    </picture>` : a`<div class="bls-pic bls-pic--empty ${s}" role="img" aria-label=${d("لا توجد صورة", "No image")}>
        <span class="bls-empty__icon" aria-hidden="true">◯</span>
        <span class="bls-empty__text">${d("أضيفي صورة لهذه الحالة", "Add an image for this state")}</span>
      </div>`;
  }
  // —— compare slider ——
  isRtl() {
    return getComputedStyle(this).direction === "rtl";
  }
  renderIndicators(e, s) {
    const i = [
      [s === "en" ? "Glossiness" : "اللمعان", e.gloss],
      [s === "en" ? "Color clarity" : "وضوح اللون", e.clarity],
      [s === "en" ? "Contrast" : "التباين", e.contrast]
    ].filter(([, t]) => t > 0);
    return i.length ? a`<div class="bls-indicators">
      ${i.map(
      ([t, n]) => a`<div class="bls-indicator">
          <span class="bls-indicator__label">${t}</span>
          <span class="fs-meter"><span style=${w({ width: `${n / 5 * 100}%` })}></span></span>
          <span class="bls-indicator__val">${n}/5</span>
        </div>`
    )}
    </div>` : c;
  }
  renderPanel(e, s) {
    const r = this.config || {}, i = _(r.bls_show_indicators, !0), t = _(r.bls_show_palette, !0);
    return a`<div class="bls-panel">
      ${e.desc ? a`<p class="bls-desc">${e.desc}</p>` : c}
      ${e.colorEffect ? a`<p class="bls-color-effect">${d("تأثير اللون", "Color effect")}: ${e.colorEffect}</p>` : c}
      ${i ? this.renderIndicators(e, s) : c}
      ${t && e.palette.length ? a`<div class="bls-palette">${e.palette.map((n) => a`<span class="bls-swatch" style=${w({ background: n })} title=${n}></span>`)}</div>` : c}
      ${e.note ? a`<p class="bls-note">★ ${e.note}</p>` : c}
      <div class="fs-actions">
        ${z(r, "bls_", { href: e.link })}
      </div>
    </div>`;
  }
  renderLightChip(e, s) {
    const r = e.icon.startsWith("sicon-");
    return a`
      <button
        type="button"
        class=${u({ "bls-chip": !0, "is-active": s })}
        aria-pressed=${s ? "true" : "false"}
        @click=${() => this.selId = e.id}
      >
        <span class="bls-chip__icon" aria-hidden="true">
          ${e.icon ? r ? a`<span class=${e.icon}></span>` : e.icon : "✦"}
        </span>
        <span class="bls-chip__name">${e.name}</span>
        <span class="bls-chip__dot" aria-hidden="true"></span>
      </button>
    `;
  }
  renderSingle(e, s) {
    var L;
    const r = this.config || {}, i = _(r.bls_enable_finish, !1) && C(e).length > 0, t = x((L = this.config) == null ? void 0 : L.bls_preload, "lazy") === "eager", n = Y(r), o = this.activeSingle(e, i), l = this.uniqueNames(e), k = C(e), S = o == null ? void 0 : o.name, g = this.selFinish || this.defaultFinish(e);
    return a`
      <div class="bls-shell">
        <aside class="bls-aside">
          <div class="bls-controls-card">
            ${i ? a`
                  <div class="bls-controls">
                    <span class="bls-controls__label">${d("اللمسة النهائية", "Finish")}</span>
                    <div class="bls-finish-chips" role="group" aria-label=${d("اللمسة النهائية", "Finish")}>
                      ${k.map(
      (b) => a`<button
                          type="button"
                          class=${u({ "bls-finish-chip": !0, "is-active": b === g })}
                          aria-pressed=${b === g ? "true" : "false"}
                          @click=${() => this.selFinish = b}
                        >
                          ${Q(b, s)}
                        </button>`
    )}
                    </div>
                  </div>
                  <div class="bls-controls">
                    <span class="bls-controls__label">${d("نوع الإضاءة", "Lighting")}</span>
                    <div class="bls-chips" role="group" aria-label=${d("حالات الإضاءة", "Lighting states")}>
                      ${l.map((b) => {
      const h = e.find((A) => A.name === b), E = !!(h != null && h.icon.startsWith("sicon-"));
      return a`<button
                          type="button"
                          class=${u({ "bls-chip": !0, "is-active": b === S })}
                          aria-pressed=${b === S ? "true" : "false"}
                          @click=${() => this.selName = b}
                        >
                          <span class="bls-chip__icon" aria-hidden="true">
                            ${h != null && h.icon ? E ? a`<span class=${h.icon}></span>` : h.icon : "✦"}
                          </span>
                          <span class="bls-chip__name">${b}</span>
                          <span class="bls-chip__dot" aria-hidden="true"></span>
                        </button>`;
    })}
                    </div>
                  </div>
                ` : a`<div class="bls-controls">
                  <span class="bls-controls__label">${d("اختاري الإضاءة", "Pick a lighting")}</span>
                  <div class="bls-chips" role="group" aria-label=${d("حالات الإضاءة", "Lighting states")}>
                    ${e.map((b) => this.renderLightChip(b, b.id === (o == null ? void 0 : o.id)))}
                  </div>
                </div>`}
          </div>

          ${o ? this.renderPanel(o, s) : c}
        </aside>

        <div class="bls-mirror">
          <div class=${u({ "bls-stage": !0, "bls-stage--fade": n === "fade" })}>
            ${t ? e.map(
      (b) => this.renderPicture(b, `bls-layer ${b.id === (o == null ? void 0 : o.id) ? "is-on" : ""}`, !0)
    ) : this.renderPicture(o, "", !0)}
            <div class="bls-caption">
              <b>${o == null ? void 0 : o.name}</b>${o != null && o.colorEffect ? a` — ${o.colorEffect}` : c}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  renderCompare(e) {
    const s = this.config || {}, r = W(s), i = e.find((l) => l.id === this.cmpA) || e[0], t = e.find((l) => l.id === this.cmpB) || e[1] || e[0], n = a`<div class="bls-compare-picks">
      <div>
        <label for="bls-a">${d("الحالة الأولى", "First state")}</label>
        <select id="bls-a" @change=${(l) => this.cmpA = l.target.value}>
          ${e.map((l) => a`<option value=${l.id} ?selected=${l.id === (i == null ? void 0 : i.id)}>${l.name}</option>`)}
        </select>
        ${z(s, "bls_", { href: i == null ? void 0 : i.link })}
      </div>
      <div>
        <label for="bls-b">${d("الحالة الثانية", "Second state")}</label>
        <select id="bls-b" @change=${(l) => this.cmpB = l.target.value}>
          ${e.map((l) => a`<option value=${l.id} ?selected=${l.id === (t == null ? void 0 : t.id)}>${l.name}</option>`)}
        </select>
        ${z(s, "bls_", { href: t == null ? void 0 : t.link })}
      </div>
    </div>`;
    if (r === "side")
      return a`<div class="bls-wrap">
        <div class="bls-cmp-side">
          <div class="bls-stage"><span class="bls-cmp-tag bls-cmp-tag--a">${i == null ? void 0 : i.name}</span>${this.renderPicture(i, "", !0)}</div>
          <div class="bls-stage"><span class="bls-cmp-tag bls-cmp-tag--b">${t == null ? void 0 : t.name}</span>${this.renderPicture(t, "", !0)}</div>
        </div>
        ${n}
      </div>`;
    const o = r === "slider" ? w({ "--bls-pos": `${this.sliderPos}%` }) : w({});
    return a`<div class="bls-wrap">
      <div
        class=${u({
      "bls-stage": !0,
      "bls-cmp-slider": r === "slider",
      "bls-cmp-split": r === "split",
      "is-dragging": r === "slider" && this.sliderDragging
    })}
        style=${o}
        role=${r === "slider" ? "slider" : c}
        tabindex=${r === "slider" ? "0" : c}
        aria-label=${r === "slider" ? d("اسحبي للمقارنة بين الحالتين", "Drag to compare the two states") : c}
        aria-valuenow=${r === "slider" ? Math.round(this.sliderPos) : c}
        aria-valuemin=${r === "slider" ? "0" : c}
        aria-valuemax=${r === "slider" ? "100" : c}
        @pointerdown=${r === "slider" ? this.onSliderDown : void 0}
        @keydown=${r === "slider" ? this.onSliderKey : void 0}
      >
        <span class="bls-cmp-tag bls-cmp-tag--a">${t == null ? void 0 : t.name}</span>
        <span class="bls-cmp-tag bls-cmp-tag--b">${i == null ? void 0 : i.name}</span>
        ${this.renderPicture(i, "", !0)}
        ${this.renderPicture(t, "bls-img--overlay", !0)}
        ${r === "slider" ? a`
              <div class="bls-cmp-handle" aria-hidden="true">
                <span class="bls-cmp-handle__pill">‹ ›</span>
              </div>
              ${!this.sliderDragging && this.sliderPos === 50 ? a`<div class="bls-cmp-hint" aria-hidden="true">${d("اسحبي للمقارنة", "Drag to compare")}</div>` : c}
            ` : c}
      </div>
      ${n}
    </div>`;
  }
  render() {
    const e = this.config || {}, s = X(e, "bls_"), r = s.animate && !j(), i = this.lights, t = y(e.bls_title), n = y(e.bls_desc), o = q() === "en" ? "en" : "ar", l = G(e), k = _(e.bls_show_compare, !0) && i.length >= 2, S = this.compareOn ?? l === "compare", g = k && S ? "compare" : "single";
    return i.length ? (this.activeSingle(i, _(e.bls_enable_finish, !1)), a`
      <section
        class=${u({ "fs-section": !0, "fs-animate": r })}
        style=${w({
      ...U(s),
      "--bls-aspect": J(e),
      "--bls-active": String(e.bls_active_color ?? s.accent),
      "--bls-speed": `${Math.max(0, P(e.bls_speed, 400))}ms`
    })}
        aria-label=${t || d("محاكي الإضاءة والمظهر", "Lighting & finish simulator")}
      >
        <div class="fs-container">
          ${t || n ? a`<div class="fs-header">
                ${t ? a`<h2 class="fs-title">${t}</h2>` : c}
                ${n ? a`<p class="fs-desc">${n}</p>` : c}
              </div>` : c}

          ${k ? a`<div class="bls-mode-toggle" role="group" aria-label=${d("طريقة العرض", "View mode")}>
                <button
                  type="button"
                  class=${u({ "bls-mode-toggle__btn": !0, "is-active": g === "single" })}
                  aria-pressed=${g === "single" ? "true" : "false"}
                  @click=${() => this.compareOn = !1}
                >
                  ${d("حالة واحدة", "Single")}
                </button>
                <button
                  type="button"
                  class=${u({ "bls-mode-toggle__btn": !0, "is-active": g === "compare" })}
                  aria-pressed=${g === "compare" ? "true" : "false"}
                  @click=${() => this.compareOn = !0}
                >
                  ${d("مقارنة", "Compare")}
                </button>
              </div>` : c}

          ${g === "compare" ? this.renderCompare(i) : this.renderSingle(i, o)}
        </div>
      </section>
    `) : a`<div class="fs-empty" role="status">
        ${d("أضيفي حالات إضاءة مع صورها من إعدادات العنصر.", "Add lighting states with their images in the element settings.")}
      </div>`;
  }
};
M.styles = [T, V];
let m = M;
f([
  R({ type: Object })
], m.prototype, "config");
f([
  v()
], m.prototype, "selId");
f([
  v()
], m.prototype, "selName");
f([
  v()
], m.prototype, "selFinish");
f([
  v()
], m.prototype, "cmpA");
f([
  v()
], m.prototype, "cmpB");
f([
  v()
], m.prototype, "sliderPos");
f([
  v()
], m.prototype, "sliderDragging");
f([
  v()
], m.prototype, "compareOn");
typeof m < "u" && m.registerSallaComponent("salla-beauty-lighting-finish-simulator");
export {
  m as default
};
