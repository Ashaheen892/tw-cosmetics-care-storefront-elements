import { css as A, LitElement as F, html as a, nothing as c } from "lit";
import { property as I, state as v } from "lit/decorators.js";
import { classMap as u } from "lit/directives/class-map.js";
import { styleMap as _ } from "lit/directives/style-map.js";
import { n as R, g as x, c as O, l as y, f as B, h as $, j as z, e as L, s as H, t as d, i as k, r as T, p as X, o as j, a as q, b as U } from "./sharedStyles-BgfDOkwJ.js";
const V = A`
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
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bls-mode-toggle__btn {
    min-height: 34px;
    padding: 0.35rem 0.95rem;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: var(--muted-color, #8f7a86);
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
    background: color-mix(in srgb, var(--card-bg, #fff) 90%, var(--section-bg, #fbf5f8));
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 90%, #fff);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.06);
  }

  .bls-controls {
    display: grid;
    gap: 0.5rem;
  }

  .bls-controls + .bls-controls {
    margin-top: 0.9rem;
    padding-top: 0.9rem;
    border-top: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 80%, transparent);
  }

  .bls-controls__label {
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--muted-color, #8f7a86);
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
    border: 1.5px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
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
    border-color: color-mix(in srgb, var(--bls-active, var(--accent-color, var(--fs-store-primary))) 40%, var(--border-color, #f2dde7));
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
    border: 1.5px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
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
    background: color-mix(in srgb, var(--border-color, #f2dde7) 45%, #1a1216);
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
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: var(--section-radius, 20px);
    padding: 1rem 1.1rem 1.1rem;
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.05);
  }

  .bls-desc {
    margin: 0;
    color: var(--text-color, #33232e);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .bls-color-effect {
    margin: 0;
    color: var(--muted-color, #8f7a86);
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
    color: var(--muted-color, #8f7a86);
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
    color: color-mix(in srgb, #8a5a00 65%, var(--text-color, #33232e));
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
    color: var(--muted-color, #8f7a86);
    display: block;
    margin-bottom: 0.25rem;
  }

  .bls-compare-picks select {
    width: 100%;
    min-height: 44px;
    padding: 0.55rem 0.7rem;
    border-radius: 12px;
    border: 1.5px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 600;
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
    background: #fff;
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
    background: linear-gradient(
      135deg,
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 65%, #5a2f4d)
    );
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
    background: #fff;
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
`, D = ["any", "matte", "dewy", "glossy", "natural", "velvet"];
function K(p) {
  return R(p).map((e, r) => {
    const s = x(e.finish, "any");
    return {
      id: String(e.id ?? e.light_id ?? "").trim() || `light-${r + 1}`,
      name: y(e.name) || `${r + 1}`,
      icon: String(e.icon ?? "").trim(),
      image: L(e.image),
      imageMobile: L(e.image_mobile),
      finish: D.includes(s) ? s : "any",
      desc: y(e.desc),
      colorEffect: y(e.color_effect),
      gloss: $(z(e.gloss, 0), 0, 5),
      clarity: $(z(e.clarity, 0), 0, 5),
      contrast: $(z(e.contrast, 0), 0, 5),
      palette: B(e.palette),
      note: y(e.note),
      link: O(e.link)
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
  for (const r of p) r.finish !== "any" && e.add(r.finish);
  return D.filter((r) => e.has(r));
}
var Z = Object.defineProperty, f = (p, e, r, s) => {
  for (var i = void 0, t = p.length - 1, n; t >= 0; t--)
    (n = p[t]) && (i = n(e, r, i) || i);
  return i && Z(e, r, i), i;
};
const M = class M extends F {
  constructor() {
    super(...arguments), this.config = {}, this.selId = "", this.selName = "", this.selFinish = "", this.cmpA = "", this.cmpB = "", this.sliderPos = 50, this.sliderDragging = !1, this.compareOn = null, this.boundLangHandler = () => this.requestUpdate(), this.onSliderMove = (e) => {
      var t;
      const r = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".bls-cmp-slider");
      if (!r) return;
      const s = r.getBoundingClientRect(), i = this.isRtl() ? (s.right - e.clientX) / s.width : (e.clientX - s.left) / s.width;
      this.sliderPos = $(Math.round(i * 100), 0, 100);
    }, this.onSliderDown = (e) => {
      var r, s;
      e.preventDefault(), this.sliderDragging = !0, (s = (r = e.currentTarget).setPointerCapture) == null || s.call(r, e.pointerId), this.onSliderMove(e), window.addEventListener("pointermove", this.onSliderMove), window.addEventListener("pointerup", this.onSliderUp, { once: !0 });
    }, this.onSliderUp = () => {
      this.sliderDragging = !1, window.removeEventListener("pointermove", this.onSliderMove);
    }, this.onSliderKey = (e) => {
      const r = e.shiftKey ? 10 : 5, s = this.isRtl() ? -1 : 1;
      e.key === "ArrowLeft" ? (e.preventDefault(), this.sliderPos = $(this.sliderPos - r * s, 0, 100)) : e.key === "ArrowRight" ? (e.preventDefault(), this.sliderPos = $(this.sliderPos + r * s, 0, 100)) : e.key === "Home" ? (e.preventDefault(), this.sliderPos = 0) : e.key === "End" && (e.preventDefault(), this.sliderPos = 100);
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
    const r = /* @__PURE__ */ new Set(), s = [];
    for (const i of e)
      r.has(i.name) || (r.add(i.name), s.push(i.name));
    return s;
  }
  defaultName(e) {
    var t, n;
    const r = String(((t = this.config) == null ? void 0 : t.bls_default_light) ?? "").trim(), s = e.find((o) => o.id === r);
    if (s) return s.name;
    const i = e.find((o) => o.name === r);
    return i ? i.name : ((n = e[0]) == null ? void 0 : n.name) ?? "";
  }
  defaultFinish(e) {
    var i;
    const r = C(e), s = x((i = this.config) == null ? void 0 : i.bls_default_finish, "");
    return r.includes(s) ? s : r[0] ?? "any";
  }
  activeSingle(e, r) {
    var t;
    if (r) {
      const n = this.selName || this.defaultName(e), o = this.selFinish || this.defaultFinish(e);
      return e.find((l) => l.name === n && l.finish === o) || e.find((l) => l.finish === o) || e.find((l) => l.name === n) || e[0];
    }
    const s = String(((t = this.config) == null ? void 0 : t.bls_default_light) ?? "").trim(), i = this.selId || s;
    return e.find((n) => n.id === i) || e.find((n) => n.name === i) || e[0];
  }
  renderPicture(e, r, s) {
    return e != null && e.image ? a`<picture class="bls-pic ${r}">
      ${e.imageMobile ? a`<source media="(max-width: 639px)" srcset=${e.imageMobile} />` : c}
      <img
        src=${e.image}
        alt=${e.name}
        loading=${s ? "eager" : "lazy"}
        decoding="async"
        fetchpriority=${s ? "high" : "low"}
      />
    </picture>` : a`<div class="bls-pic bls-pic--empty ${r}" role="img" aria-label=${d("لا توجد صورة", "No image")}>
        <span class="bls-empty__icon" aria-hidden="true">◯</span>
        <span class="bls-empty__text">${d("أضيفي صورة لهذه الحالة", "Add an image for this state")}</span>
      </div>`;
  }
  // —— compare slider ——
  isRtl() {
    return getComputedStyle(this).direction === "rtl";
  }
  renderIndicators(e, r) {
    const i = [
      [r === "en" ? "Glossiness" : "اللمعان", e.gloss],
      [r === "en" ? "Color clarity" : "وضوح اللون", e.clarity],
      [r === "en" ? "Contrast" : "التباين", e.contrast]
    ].filter(([, t]) => t > 0);
    return i.length ? a`<div class="bls-indicators">
      ${i.map(
      ([t, n]) => a`<div class="bls-indicator">
          <span class="bls-indicator__label">${t}</span>
          <span class="fs-meter"><span style=${_({ width: `${n / 5 * 100}%` })}></span></span>
          <span class="bls-indicator__val">${n}/5</span>
        </div>`
    )}
    </div>` : c;
  }
  renderPanel(e, r) {
    const s = this.config || {}, i = k(s.bls_show_indicators, !0), t = k(s.bls_show_palette, !0);
    return a`<div class="bls-panel">
      ${e.desc ? a`<p class="bls-desc">${e.desc}</p>` : c}
      ${e.colorEffect ? a`<p class="bls-color-effect">${d("تأثير اللون", "Color effect")}: ${e.colorEffect}</p>` : c}
      ${i ? this.renderIndicators(e, r) : c}
      ${t && e.palette.length ? a`<div class="bls-palette">${e.palette.map((n) => a`<span class="bls-swatch" style=${_({ background: n })} title=${n}></span>`)}</div>` : c}
      ${e.note ? a`<p class="bls-note">★ ${e.note}</p>` : c}
      ${e.link ? a`<a class="fs-btn fs-btn--ghost bls-link" href=${e.link} target="_blank" rel="noopener noreferrer">${d("اقرئي المزيد", "Read more")}</a>` : c}
    </div>`;
  }
  renderLightChip(e, r) {
    const s = e.icon.startsWith("sicon-");
    return a`
      <button
        type="button"
        class=${u({ "bls-chip": !0, "is-active": r })}
        aria-pressed=${r ? "true" : "false"}
        @click=${() => this.selId = e.id}
      >
        <span class="bls-chip__icon" aria-hidden="true">
          ${e.icon ? s ? a`<span class=${e.icon}></span>` : e.icon : "✦"}
        </span>
        <span class="bls-chip__name">${e.name}</span>
        <span class="bls-chip__dot" aria-hidden="true"></span>
      </button>
    `;
  }
  renderSingle(e, r) {
    var w;
    const s = this.config || {}, i = k(s.bls_enable_finish, !1) && C(e).length > 0, t = x((w = this.config) == null ? void 0 : w.bls_preload, "lazy") === "eager", n = Y(s), o = this.activeSingle(e, i), l = this.uniqueNames(e), S = C(e), P = o == null ? void 0 : o.name, g = this.selFinish || this.defaultFinish(e);
    return a`
      <div class="bls-shell">
        <aside class="bls-aside">
          <div class="bls-controls-card">
            ${i ? a`
                  <div class="bls-controls">
                    <span class="bls-controls__label">${d("اللمسة النهائية", "Finish")}</span>
                    <div class="bls-finish-chips" role="group" aria-label=${d("اللمسة النهائية", "Finish")}>
                      ${S.map(
      (m) => a`<button
                          type="button"
                          class=${u({ "bls-finish-chip": !0, "is-active": m === g })}
                          aria-pressed=${m === g ? "true" : "false"}
                          @click=${() => this.selFinish = m}
                        >
                          ${Q(m, r)}
                        </button>`
    )}
                    </div>
                  </div>
                  <div class="bls-controls">
                    <span class="bls-controls__label">${d("نوع الإضاءة", "Lighting")}</span>
                    <div class="bls-chips" role="group" aria-label=${d("حالات الإضاءة", "Lighting states")}>
                      ${l.map((m) => {
      const h = e.find((E) => E.name === m), N = !!(h != null && h.icon.startsWith("sicon-"));
      return a`<button
                          type="button"
                          class=${u({ "bls-chip": !0, "is-active": m === P })}
                          aria-pressed=${m === P ? "true" : "false"}
                          @click=${() => this.selName = m}
                        >
                          <span class="bls-chip__icon" aria-hidden="true">
                            ${h != null && h.icon ? N ? a`<span class=${h.icon}></span>` : h.icon : "✦"}
                          </span>
                          <span class="bls-chip__name">${m}</span>
                          <span class="bls-chip__dot" aria-hidden="true"></span>
                        </button>`;
    })}
                    </div>
                  </div>
                ` : a`<div class="bls-controls">
                  <span class="bls-controls__label">${d("اختاري الإضاءة", "Pick a lighting")}</span>
                  <div class="bls-chips" role="group" aria-label=${d("حالات الإضاءة", "Lighting states")}>
                    ${e.map((m) => this.renderLightChip(m, m.id === (o == null ? void 0 : o.id)))}
                  </div>
                </div>`}
          </div>

          ${o ? this.renderPanel(o, r) : c}
        </aside>

        <div class="bls-mirror">
          <div class=${u({ "bls-stage": !0, "bls-stage--fade": n === "fade" })}>
            ${t ? e.map(
      (m) => this.renderPicture(m, `bls-layer ${m.id === (o == null ? void 0 : o.id) ? "is-on" : ""}`, !0)
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
    const r = this.config || {}, s = W(r), i = e.find((l) => l.id === this.cmpA) || e[0], t = e.find((l) => l.id === this.cmpB) || e[1] || e[0], n = a`<div class="bls-compare-picks">
      <div>
        <label for="bls-a">${d("الحالة الأولى", "First state")}</label>
        <select id="bls-a" @change=${(l) => this.cmpA = l.target.value}>
          ${e.map((l) => a`<option value=${l.id} ?selected=${l.id === (i == null ? void 0 : i.id)}>${l.name}</option>`)}
        </select>
      </div>
      <div>
        <label for="bls-b">${d("الحالة الثانية", "Second state")}</label>
        <select id="bls-b" @change=${(l) => this.cmpB = l.target.value}>
          ${e.map((l) => a`<option value=${l.id} ?selected=${l.id === (t == null ? void 0 : t.id)}>${l.name}</option>`)}
        </select>
      </div>
    </div>`;
    if (s === "side")
      return a`<div class="bls-wrap">
        <div class="bls-cmp-side">
          <div class="bls-stage"><span class="bls-cmp-tag bls-cmp-tag--a">${i == null ? void 0 : i.name}</span>${this.renderPicture(i, "", !0)}</div>
          <div class="bls-stage"><span class="bls-cmp-tag bls-cmp-tag--b">${t == null ? void 0 : t.name}</span>${this.renderPicture(t, "", !0)}</div>
        </div>
        ${n}
      </div>`;
    const o = s === "slider" ? _({ "--bls-pos": `${this.sliderPos}%` }) : _({});
    return a`<div class="bls-wrap">
      <div
        class=${u({
      "bls-stage": !0,
      "bls-cmp-slider": s === "slider",
      "bls-cmp-split": s === "split",
      "is-dragging": s === "slider" && this.sliderDragging
    })}
        style=${o}
        role=${s === "slider" ? "slider" : c}
        tabindex=${s === "slider" ? "0" : c}
        aria-label=${s === "slider" ? d("اسحبي للمقارنة بين الحالتين", "Drag to compare the two states") : c}
        aria-valuenow=${s === "slider" ? Math.round(this.sliderPos) : c}
        aria-valuemin=${s === "slider" ? "0" : c}
        aria-valuemax=${s === "slider" ? "100" : c}
        @pointerdown=${s === "slider" ? this.onSliderDown : void 0}
        @keydown=${s === "slider" ? this.onSliderKey : void 0}
      >
        <span class="bls-cmp-tag bls-cmp-tag--a">${t == null ? void 0 : t.name}</span>
        <span class="bls-cmp-tag bls-cmp-tag--b">${i == null ? void 0 : i.name}</span>
        ${this.renderPicture(i, "", !0)}
        ${this.renderPicture(t, "bls-img--overlay", !0)}
        ${s === "slider" ? a`
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
    const e = this.config || {}, r = T(e, "bls_"), s = r.animate && !X(), i = this.lights, t = y(e.bls_title), n = y(e.bls_desc), o = j() === "en" ? "en" : "ar", l = G(e), S = k(e.bls_show_compare, !0) && i.length >= 2, P = this.compareOn ?? l === "compare", g = S && P ? "compare" : "single";
    if (!i.length)
      return a`<div class="fs-empty" role="status">
        ${d("أضيفي حالات إضاءة مع صورها من إعدادات العنصر.", "Add lighting states with their images in the element settings.")}
      </div>`;
    const w = this.activeSingle(i, k(e.bls_enable_finish, !1));
    return a`
      <section
        class=${u({ "fs-section": !0, "fs-animate": s })}
        style=${_({
      ...q(r),
      "--bls-aspect": J(e),
      "--bls-active": String(e.bls_active_color ?? r.accent),
      "--bls-speed": `${Math.max(0, z(e.bls_speed, 400))}ms`
    })}
        aria-label=${t || d("محاكي الإضاءة والمظهر", "Lighting & finish simulator")}
      >
        <div class="fs-container">
          ${t || n ? a`<div class="fs-header">
                ${t ? a`<h2 class="fs-title">${t}</h2>` : c}
                ${n ? a`<p class="fs-desc">${n}</p>` : c}
              </div>` : c}

          ${S ? a`<div class="bls-mode-toggle" role="group" aria-label=${d("طريقة العرض", "View mode")}>
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
          ${U({ config: e, prefix: "bls_", ready: !!w, selection: w })}
        </div>
      </section>
    `;
  }
};
M.styles = [H, V];
let b = M;
f([
  I({ type: Object })
], b.prototype, "config");
f([
  v()
], b.prototype, "selId");
f([
  v()
], b.prototype, "selName");
f([
  v()
], b.prototype, "selFinish");
f([
  v()
], b.prototype, "cmpA");
f([
  v()
], b.prototype, "cmpB");
f([
  v()
], b.prototype, "sliderPos");
f([
  v()
], b.prototype, "sliderDragging");
f([
  v()
], b.prototype, "compareOn");
typeof b < "u" && b.registerSallaComponent("salla-beauty-lighting-finish-simulator");
export {
  b as default
};
