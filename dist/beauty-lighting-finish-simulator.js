import { css as F, LitElement as I, html as a, nothing as b } from "lit";
import { property as R, state as x } from "lit/decorators.js";
import { classMap as h } from "lit/directives/class-map.js";
import { styleMap as y } from "lit/directives/style-map.js";
import { n as O, g as v, b as D, l as $, d as T, f as w, h as P, e as M, s as q, t as c, i as S, r as B, p as H, m as U, a as V } from "./sharedStyles--LaFqDVC.js";
const j = F`
  .bls-mode-toggle {
    display: flex;
    flex-wrap: wrap;
    width: fit-content;
    max-width: 100%;
    gap: 0.35rem;
    margin: 0 auto 1.1rem;
    padding: 0.25rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 8%, var(--card-bg, #fff));
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
    background: var(--bls-active, var(--accent-color, #c2527f));
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
    border-color: color-mix(in srgb, var(--bls-active, var(--accent-color, #c2527f)) 40%, var(--border-color, #f2dde7));
  }

  .bls-chip.is-active {
    border-color: var(--bls-active, var(--accent-color, #c2527f));
    background: color-mix(in srgb, var(--bls-active, var(--accent-color, #c2527f)) 10%, var(--card-bg, #fff));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--bls-active, var(--accent-color, #c2527f)) 20%, transparent),
      0 8px 18px rgba(43, 33, 28, 0.08);
  }

  .bls-chip__icon {
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--bls-active, var(--accent-color, #c2527f)) 12%, var(--card-bg, #fff));
    color: var(--bls-active, var(--accent-color, #c2527f));
    font-size: 0.95rem;
    line-height: 1;
  }

  .bls-chip.is-active .bls-chip__icon {
    background: var(--bls-active, var(--accent-color, #c2527f));
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
    background: var(--bls-active, var(--accent-color, #c2527f));
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
    background: var(--bls-active, var(--accent-color, #c2527f));
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
      color-mix(in srgb, var(--accent-color, #c2527f) 14%, #2a1f24),
      #1a1216 55%,
      color-mix(in srgb, var(--accent-color, #c2527f) 8%, #2a1f24)
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
    border: 3px solid color-mix(in srgb, var(--accent-color, #c2527f) 35%, #fff);
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
      color-mix(in srgb, var(--accent-color, #c2527f) 12%, #2a1f24),
      #1a1216 70%
    );
  }

  .bls-empty__icon {
    width: 3.5rem;
    height: 3.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 2px dashed color-mix(in srgb, var(--accent-color, #c2527f) 50%, rgba(255, 255, 255, 0.35));
    color: color-mix(in srgb, var(--accent-color, #c2527f) 70%, #fff);
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
    color: var(--accent-color, #c2527f);
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
    width: 2px;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
    cursor: ew-resize;
    touch-action: none;
    z-index: 3;
  }

  .bls-cmp-handle::after {
    content: '⇆';
    position: absolute;
    top: 50%;
    inset-inline-start: 50%;
    transform: translate(-50%, -50%);
    width: 2.1rem;
    height: 2.1rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #fff;
    color: #33232e;
    font-size: 0.9rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
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

  @media (prefers-reduced-motion: reduce) {
    .bls-stage--fade .bls-layer,
    .bls-chip {
      transition: none !important;
    }
  }
`, N = ["any", "matte", "dewy", "glossy", "natural", "velvet"];
function G(d) {
  return O(d).map((e, s) => {
    const i = v(e.finish, "any");
    return {
      id: String(e.light_id ?? "").trim() || `light-${s + 1}`,
      name: $(e.name) || `${s + 1}`,
      icon: String(e.icon ?? "").trim(),
      image: M(e.image),
      imageMobile: M(e.image_mobile),
      finish: N.includes(i) ? i : "any",
      desc: $(e.desc),
      colorEffect: $(e.color_effect),
      gloss: w(P(e.gloss, 0), 0, 5),
      clarity: w(P(e.clarity, 0), 0, 5),
      contrast: w(P(e.contrast, 0), 0, 5),
      palette: T(e.palette),
      note: $(e.note),
      link: D(e.link)
    };
  }).filter((e) => e.image || e.name);
}
function W(d) {
  return v(d.bls_view_mode, "single") === "compare" ? "compare" : "single";
}
function X(d) {
  const e = v(d.bls_compare_style, "slider");
  return ["split", "slider", "side"].includes(e) ? e : "slider";
}
function Y(d) {
  const e = v(d.bls_transition, "fade");
  return ["fade", "slide", "none"].includes(e) ? e : "fade";
}
function J(d, e = "4/5") {
  return (v(d.bls_aspect, e) || e).replace("/", " / ");
}
function K(d, e) {
  return {
    any: ["عام", "Any"],
    matte: ["مطفي", "Matte"],
    dewy: ["ندي", "Dewy"],
    glossy: ["لامع", "Glossy"],
    natural: ["طبيعي", "Natural"],
    velvet: ["مخملي", "Velvet"]
  }[d][e === "en" ? 1 : 0];
}
function z(d) {
  const e = /* @__PURE__ */ new Set();
  for (const s of d) s.finish !== "any" && e.add(s.finish);
  return N.filter((s) => e.has(s));
}
var Q = Object.defineProperty, u = (d, e, s, i) => {
  for (var r = void 0, t = d.length - 1, l; t >= 0; t--)
    (l = d[t]) && (r = l(e, s, r) || r);
  return r && Q(e, s, r), r;
};
const C = class C extends I {
  constructor() {
    super(...arguments), this.config = {}, this.selId = "", this.selName = "", this.selFinish = "", this.cmpA = "", this.cmpB = "", this.sliderPos = 50, this.compareOn = null, this.boundLangHandler = () => this.requestUpdate(), this.onSliderMove = (e) => {
      var t;
      const s = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".bls-cmp-slider");
      if (!s) return;
      const i = s.getBoundingClientRect(), r = this.isRtl() ? (i.right - e.clientX) / i.width : (e.clientX - i.left) / i.width;
      this.sliderPos = w(Math.round(r * 100), 0, 100);
    }, this.onSliderDown = (e) => {
      var s, i;
      (i = (s = e.currentTarget).setPointerCapture) == null || i.call(s, e.pointerId), this.onSliderMove(e), window.addEventListener("pointermove", this.onSliderMove), window.addEventListener("pointerup", this.onSliderUp, { once: !0 });
    }, this.onSliderUp = () => {
      window.removeEventListener("pointermove", this.onSliderMove);
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
    return G((e = this.config) == null ? void 0 : e.bls_lights);
  }
  uniqueNames(e) {
    const s = /* @__PURE__ */ new Set(), i = [];
    for (const r of e)
      s.has(r.name) || (s.add(r.name), i.push(r.name));
    return i;
  }
  defaultName(e) {
    var t, l;
    const s = String(((t = this.config) == null ? void 0 : t.bls_default_light) ?? "").trim(), i = e.find((o) => o.id === s);
    if (i) return i.name;
    const r = e.find((o) => o.name === s);
    return r ? r.name : ((l = e[0]) == null ? void 0 : l.name) ?? "";
  }
  defaultFinish(e) {
    var r;
    const s = z(e), i = v((r = this.config) == null ? void 0 : r.bls_default_finish, "");
    return s.includes(i) ? i : s[0] ?? "any";
  }
  activeSingle(e, s) {
    var t;
    if (s) {
      const l = this.selName || this.defaultName(e), o = this.selFinish || this.defaultFinish(e);
      return e.find((n) => n.name === l && n.finish === o) || e.find((n) => n.finish === o) || e.find((n) => n.name === l) || e[0];
    }
    const i = String(((t = this.config) == null ? void 0 : t.bls_default_light) ?? "").trim(), r = this.selId || i;
    return e.find((l) => l.id === r) || e.find((l) => l.name === r) || e[0];
  }
  renderPicture(e, s, i) {
    return e != null && e.image ? a`<picture class="bls-pic ${s}">
      ${e.imageMobile ? a`<source media="(max-width: 639px)" srcset=${e.imageMobile} />` : b}
      <img
        src=${e.image}
        alt=${e.name}
        loading=${i ? "eager" : "lazy"}
        decoding="async"
        fetchpriority=${i ? "high" : "low"}
      />
    </picture>` : a`<div class="bls-pic bls-pic--empty ${s}" role="img" aria-label=${c("لا توجد صورة", "No image")}>
        <span class="bls-empty__icon" aria-hidden="true">◯</span>
        <span class="bls-empty__text">${c("أضيفي صورة لهذه الحالة", "Add an image for this state")}</span>
      </div>`;
  }
  // —— compare slider ——
  isRtl() {
    return getComputedStyle(this).direction === "rtl";
  }
  renderIndicators(e, s) {
    const r = [
      [s === "en" ? "Glossiness" : "اللمعان", e.gloss],
      [s === "en" ? "Color clarity" : "وضوح اللون", e.clarity],
      [s === "en" ? "Contrast" : "التباين", e.contrast]
    ].filter(([, t]) => t > 0);
    return r.length ? a`<div class="bls-indicators">
      ${r.map(
      ([t, l]) => a`<div class="bls-indicator">
          <span class="bls-indicator__label">${t}</span>
          <span class="fs-meter"><span style=${y({ width: `${l / 5 * 100}%` })}></span></span>
          <span class="bls-indicator__val">${l}/5</span>
        </div>`
    )}
    </div>` : b;
  }
  renderPanel(e, s) {
    const i = this.config || {}, r = S(i.bls_show_indicators, !0), t = S(i.bls_show_palette, !0);
    return a`<div class="bls-panel">
      ${e.desc ? a`<p class="bls-desc">${e.desc}</p>` : b}
      ${e.colorEffect ? a`<p class="bls-color-effect">${c("تأثير اللون", "Color effect")}: ${e.colorEffect}</p>` : b}
      ${r ? this.renderIndicators(e, s) : b}
      ${t && e.palette.length ? a`<div class="bls-palette">${e.palette.map((l) => a`<span class="bls-swatch" style=${y({ background: l })} title=${l}></span>`)}</div>` : b}
      ${e.note ? a`<p class="bls-note">★ ${e.note}</p>` : b}
      ${e.link ? a`<a class="fs-btn fs-btn--ghost bls-link" href=${e.link} target="_blank" rel="noopener noreferrer">${c("اقرئي المزيد", "Read more")}</a>` : b}
    </div>`;
  }
  renderLightChip(e, s) {
    const i = e.icon.startsWith("sicon-");
    return a`
      <button
        type="button"
        class=${h({ "bls-chip": !0, "is-active": s })}
        aria-pressed=${s ? "true" : "false"}
        @click=${() => this.selId = e.id}
      >
        <span class="bls-chip__icon" aria-hidden="true">
          ${e.icon ? i ? a`<span class=${e.icon}></span>` : e.icon : "✦"}
        </span>
        <span class="bls-chip__name">${e.name}</span>
        <span class="bls-chip__dot" aria-hidden="true"></span>
      </button>
    `;
  }
  renderSingle(e, s) {
    var L;
    const i = this.config || {}, r = S(i.bls_enable_finish, !1) && z(e).length > 0, t = v((L = this.config) == null ? void 0 : L.bls_preload, "lazy") === "eager", l = Y(i), o = this.activeSingle(e, r), n = this.uniqueNames(e), _ = z(e), k = o == null ? void 0 : o.name, f = this.selFinish || this.defaultFinish(e);
    return a`
      <div class="bls-shell">
        <aside class="bls-aside">
          <div class="bls-controls-card">
            ${r ? a`
                  <div class="bls-controls">
                    <span class="bls-controls__label">${c("اللمسة النهائية", "Finish")}</span>
                    <div class="bls-finish-chips" role="group" aria-label=${c("اللمسة النهائية", "Finish")}>
                      ${_.map(
      (p) => a`<button
                          type="button"
                          class=${h({ "bls-finish-chip": !0, "is-active": p === f })}
                          aria-pressed=${p === f ? "true" : "false"}
                          @click=${() => this.selFinish = p}
                        >
                          ${K(p, s)}
                        </button>`
    )}
                    </div>
                  </div>
                  <div class="bls-controls">
                    <span class="bls-controls__label">${c("نوع الإضاءة", "Lighting")}</span>
                    <div class="bls-chips" role="group" aria-label=${c("حالات الإضاءة", "Lighting states")}>
                      ${n.map((p) => {
      const g = e.find((E) => E.name === p), A = !!(g != null && g.icon.startsWith("sicon-"));
      return a`<button
                          type="button"
                          class=${h({ "bls-chip": !0, "is-active": p === k })}
                          aria-pressed=${p === k ? "true" : "false"}
                          @click=${() => this.selName = p}
                        >
                          <span class="bls-chip__icon" aria-hidden="true">
                            ${g != null && g.icon ? A ? a`<span class=${g.icon}></span>` : g.icon : "✦"}
                          </span>
                          <span class="bls-chip__name">${p}</span>
                          <span class="bls-chip__dot" aria-hidden="true"></span>
                        </button>`;
    })}
                    </div>
                  </div>
                ` : a`<div class="bls-controls">
                  <span class="bls-controls__label">${c("اختاري الإضاءة", "Pick a lighting")}</span>
                  <div class="bls-chips" role="group" aria-label=${c("حالات الإضاءة", "Lighting states")}>
                    ${e.map((p) => this.renderLightChip(p, p.id === (o == null ? void 0 : o.id)))}
                  </div>
                </div>`}
          </div>

          ${o ? this.renderPanel(o, s) : b}
        </aside>

        <div class="bls-mirror">
          <div class=${h({ "bls-stage": !0, "bls-stage--fade": l === "fade" })}>
            ${t ? e.map(
      (p) => this.renderPicture(p, `bls-layer ${p.id === (o == null ? void 0 : o.id) ? "is-on" : ""}`, !0)
    ) : this.renderPicture(o, "", !0)}
            <div class="bls-caption">
              <b>${o == null ? void 0 : o.name}</b>${o != null && o.colorEffect ? a` — ${o.colorEffect}` : b}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  renderCompare(e) {
    const s = this.config || {}, i = X(s), r = e.find((n) => n.id === this.cmpA) || e[0], t = e.find((n) => n.id === this.cmpB) || e[1] || e[0], l = a`<div class="bls-compare-picks">
      <div>
        <label for="bls-a">${c("الحالة الأولى", "First state")}</label>
        <select id="bls-a" @change=${(n) => this.cmpA = n.target.value}>
          ${e.map((n) => a`<option value=${n.id} ?selected=${n.id === (r == null ? void 0 : r.id)}>${n.name}</option>`)}
        </select>
      </div>
      <div>
        <label for="bls-b">${c("الحالة الثانية", "Second state")}</label>
        <select id="bls-b" @change=${(n) => this.cmpB = n.target.value}>
          ${e.map((n) => a`<option value=${n.id} ?selected=${n.id === (t == null ? void 0 : t.id)}>${n.name}</option>`)}
        </select>
      </div>
    </div>`;
    if (i === "side")
      return a`<div class="bls-wrap">
        <div class="bls-cmp-side">
          <div class="bls-stage"><span class="bls-cmp-tag bls-cmp-tag--a">${r == null ? void 0 : r.name}</span>${this.renderPicture(r, "", !0)}</div>
          <div class="bls-stage"><span class="bls-cmp-tag bls-cmp-tag--b">${t == null ? void 0 : t.name}</span>${this.renderPicture(t, "", !0)}</div>
        </div>
        ${l}
      </div>`;
    const o = i === "slider" ? y({ "--bls-pos": `${this.sliderPos}%` }) : y({});
    return a`<div class="bls-wrap">
      <div
        class=${h({ "bls-stage": !0, "bls-cmp-slider": i === "slider", "bls-cmp-split": i === "split" })}
        style=${o}
      >
        <span class="bls-cmp-tag bls-cmp-tag--a">${r == null ? void 0 : r.name}</span>
        <span class="bls-cmp-tag bls-cmp-tag--b">${t == null ? void 0 : t.name}</span>
        ${this.renderPicture(r, "", !0)}
        ${this.renderPicture(t, "bls-img--overlay", !0)}
        ${i === "slider" ? a`<div
              class="bls-cmp-handle"
              role="slider"
              tabindex="0"
              aria-label=${c("حرّكي للمقارنة", "Drag to compare")}
              aria-valuenow=${this.sliderPos}
              aria-valuemin="0"
              aria-valuemax="100"
              @pointerdown=${this.onSliderDown}
              @keydown=${(n) => {
      n.key === "ArrowLeft" && (this.sliderPos = w(this.sliderPos - 5, 0, 100)), n.key === "ArrowRight" && (this.sliderPos = w(this.sliderPos + 5, 0, 100));
    }}
            ></div>` : b}
      </div>
      ${l}
    </div>`;
  }
  render() {
    const e = this.config || {}, s = B(e, "bls_"), i = s.animate && !H(), r = this.lights, t = $(e.bls_title), l = $(e.bls_desc), o = U() === "en" ? "en" : "ar", n = W(e), _ = S(e.bls_show_compare, !0) && r.length >= 2, k = this.compareOn ?? n === "compare", f = _ && k ? "compare" : "single";
    return r.length ? a`
      <section
        class=${h({ "fs-section": !0, "fs-animate": i })}
        style=${y({
      ...V(s),
      "--bls-aspect": J(e),
      "--bls-active": String(e.bls_active_color ?? s.accent),
      "--bls-speed": `${Math.max(0, P(e.bls_speed, 400))}ms`
    })}
        aria-label=${t || c("محاكي الإضاءة والمظهر", "Lighting & finish simulator")}
      >
        <div class="fs-container">
          ${t || l ? a`<div class="fs-header">
                ${t ? a`<h2 class="fs-title">${t}</h2>` : b}
                ${l ? a`<p class="fs-desc">${l}</p>` : b}
              </div>` : b}

          ${_ ? a`<div class="bls-mode-toggle" role="group" aria-label=${c("طريقة العرض", "View mode")}>
                <button
                  type="button"
                  class=${h({ "bls-mode-toggle__btn": !0, "is-active": f === "single" })}
                  aria-pressed=${f === "single" ? "true" : "false"}
                  @click=${() => this.compareOn = !1}
                >
                  ${c("حالة واحدة", "Single")}
                </button>
                <button
                  type="button"
                  class=${h({ "bls-mode-toggle__btn": !0, "is-active": f === "compare" })}
                  aria-pressed=${f === "compare" ? "true" : "false"}
                  @click=${() => this.compareOn = !0}
                >
                  ${c("مقارنة", "Compare")}
                </button>
              </div>` : b}

          ${f === "compare" ? this.renderCompare(r) : this.renderSingle(r, o)}
        </div>
      </section>
    ` : a`<div class="fs-empty" role="status">
        ${c("أضيفي حالات إضاءة مع صورها من إعدادات العنصر.", "Add lighting states with their images in the element settings.")}
      </div>`;
  }
};
C.styles = [q, j];
let m = C;
u([
  R({ type: Object })
], m.prototype, "config");
u([
  x()
], m.prototype, "selId");
u([
  x()
], m.prototype, "selName");
u([
  x()
], m.prototype, "selFinish");
u([
  x()
], m.prototype, "cmpA");
u([
  x()
], m.prototype, "cmpB");
u([
  x()
], m.prototype, "sliderPos");
u([
  x()
], m.prototype, "compareOn");
typeof m < "u" && m.registerSallaComponent("salla-beauty-lighting-finish-simulator");
export {
  m as default
};
