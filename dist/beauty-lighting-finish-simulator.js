import { css as N, LitElement as E, html as n, nothing as p } from "lit";
import { property as I, state as v } from "lit/decorators.js";
import { classMap as u } from "lit/directives/class-map.js";
import { styleMap as y } from "lit/directives/style-map.js";
import { n as A, g as $, b as F, l as g, d as R, f as h, h as _, e as M, s as j, i as x, t as b, r as T, p as q, j as B, a as D } from "./sharedStyles-cRSiglXC.js";
const H = N`
  .bls-wrap {
    max-width: 760px;
    margin-inline: auto;
  }

  .bls-stage {
    position: relative;
    width: 100%;
    aspect-ratio: var(--bls-aspect, 4 / 5);
    border-radius: var(--section-radius, 16px);
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 45%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #f2dde7);
    box-shadow: 0 10px 30px rgba(43, 33, 28, 0.08);
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
    background: color-mix(in srgb, var(--border-color, #f2dde7) 45%, var(--card-bg, #fff));
  }

  /* eager-preload fade stack */
  .bls-layer { opacity: 0; }
  .bls-layer.is-on { opacity: 1; }
  .bls-stage--fade .bls-layer { transition: opacity var(--bls-speed, 0.4s) ease; }

  .bls-empty {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    text-align: center;
    padding: 1.5rem;
    color: var(--muted-color, #8f7a86);
    font-size: 0.9rem;
  }

  .bls-caption {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    padding: 1.5rem 1rem 0.85rem;
    background: linear-gradient(180deg, transparent, rgba(20, 14, 12, 0.72));
    color: #fff;
    font-size: 0.82rem;
    line-height: 1.5;
  }
  .bls-caption b { font-weight: 800; }

  /* control chips */
  .bls-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 1rem;
  }

  .bls-controls__label {
    width: 100%;
    text-align: center;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
    margin-bottom: -0.1rem;
  }

  .bls-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }
  .bls-chip.is-active {
    background: var(--bls-active, var(--accent-color, #c2527f));
    border-color: var(--bls-active, var(--accent-color, #c2527f));
    color: #fff;
  }

  .bls-panel {
    margin-top: 1rem;
    display: grid;
    gap: 0.85rem;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: var(--section-radius, 16px);
    padding: 1rem 1.1rem;
  }

  .bls-desc { margin: 0; color: var(--text-color, #33232e); line-height: 1.65; font-size: 0.92rem; }
  .bls-color-effect { margin: 0; color: var(--muted-color, #8f7a86); font-size: 0.85rem; }

  .bls-indicators { display: grid; gap: 0.55rem; }
  .bls-indicator { display: grid; grid-template-columns: 7rem 1fr auto; align-items: center; gap: 0.6rem; font-size: 0.8rem; }
  .bls-indicator__label { color: var(--muted-color, #8f7a86); font-weight: 700; }
  .bls-indicator__val { color: var(--accent-color, #c2527f); font-weight: 800; font-variant-numeric: tabular-nums; }

  .bls-palette { display: flex; flex-wrap: wrap; gap: 0.4rem; }
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
  }

  .bls-link { align-self: start; }

  /* compare */
  .bls-compare-picks { display: grid; gap: 0.75rem; grid-template-columns: 1fr 1fr; margin-top: 1rem; }
  .bls-compare-picks label { font-size: 0.76rem; font-weight: 700; color: var(--muted-color, #8f7a86); display: block; margin-bottom: 0.25rem; }
  .bls-compare-picks select {
    width: 100%;
    padding: 0.5rem 0.6rem;
    border-radius: 10px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 600;
  }

  .bls-cmp-side { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
  .bls-cmp-side .bls-stage { aspect-ratio: var(--bls-aspect, 4 / 5); }

  .bls-cmp-slider { position: relative; }
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

  .bls-cmp-split .bls-img--overlay { clip-path: inset(0 0 0 50%); }
  :host-context([dir='rtl']) .bls-cmp-split .bls-img--overlay,
  :host([dir='rtl']) .bls-cmp-split .bls-img--overlay { clip-path: inset(0 50% 0 0); }
  .bls-cmp-split::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
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
  .bls-cmp-tag--a { inset-inline-start: 0.6rem; }
  .bls-cmp-tag--b { inset-inline-end: 0.6rem; }

  @media (max-width: 639px) {
    .bls-indicator { grid-template-columns: 5.5rem 1fr auto; }
    .bls-cmp-side { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .bls-stage--fade .bls-img { transition: none !important; }
  }
`, L = ["any", "matte", "dewy", "glossy", "natural", "velvet"];
function U(d) {
  return A(d).map((e, s) => {
    const i = $(e.finish, "any");
    return {
      id: String(e.light_id ?? "").trim() || `light-${s + 1}`,
      name: g(e.name) || `${s + 1}`,
      icon: String(e.icon ?? "").trim(),
      image: M(e.image),
      imageMobile: M(e.image_mobile),
      finish: L.includes(i) ? i : "any",
      desc: g(e.desc),
      colorEffect: g(e.color_effect),
      gloss: h(_(e.gloss, 0), 0, 5),
      clarity: h(_(e.clarity, 0), 0, 5),
      contrast: h(_(e.contrast, 0), 0, 5),
      palette: R(e.palette),
      note: g(e.note),
      link: F(e.link)
    };
  }).filter((e) => e.image || e.name);
}
function V(d) {
  return $(d.bls_view_mode, "single") === "compare" ? "compare" : "single";
}
function G(d) {
  const e = $(d.bls_compare_style, "slider");
  return ["split", "slider", "side"].includes(e) ? e : "slider";
}
function O(d) {
  const e = $(d.bls_transition, "fade");
  return ["fade", "slide", "none"].includes(e) ? e : "fade";
}
function W(d, e = "4/5") {
  return ($(d.bls_aspect, e) || e).replace("/", " / ");
}
function X(d, e) {
  return {
    any: ["عام", "Any"],
    matte: ["مطفي", "Matte"],
    dewy: ["ندي", "Dewy"],
    glossy: ["لامع", "Glossy"],
    natural: ["طبيعي", "Natural"],
    velvet: ["مخملي", "Velvet"]
  }[d][e === "en" ? 1 : 0];
}
function S(d) {
  const e = /* @__PURE__ */ new Set();
  for (const s of d) s.finish !== "any" && e.add(s.finish);
  return L.filter((s) => e.has(s));
}
var J = Object.defineProperty, f = (d, e, s, i) => {
  for (var t = void 0, r = d.length - 1, o; r >= 0; r--)
    (o = d[r]) && (t = o(e, s, t) || t);
  return t && J(e, s, t), t;
};
const P = class P extends E {
  constructor() {
    super(...arguments), this.config = {}, this.selId = "", this.selName = "", this.selFinish = "", this.cmpA = "", this.cmpB = "", this.sliderPos = 50, this.boundLangHandler = () => this.requestUpdate(), this.onSliderMove = (e) => {
      var r;
      const s = (r = this.shadowRoot) == null ? void 0 : r.querySelector(".bls-cmp-slider");
      if (!s) return;
      const i = s.getBoundingClientRect(), t = this.isRtl() ? (i.right - e.clientX) / i.width : (e.clientX - i.left) / i.width;
      this.sliderPos = h(Math.round(t * 100), 0, 100);
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
    e.has("config") && (this.selId = "", this.selName = "", this.selFinish = "", this.cmpA = "", this.cmpB = "");
  }
  get lights() {
    var e;
    return U((e = this.config) == null ? void 0 : e.bls_lights);
  }
  uniqueNames(e) {
    const s = /* @__PURE__ */ new Set(), i = [];
    for (const t of e)
      s.has(t.name) || (s.add(t.name), i.push(t.name));
    return i;
  }
  defaultName(e) {
    var r, o;
    const s = String(((r = this.config) == null ? void 0 : r.bls_default_light) ?? "").trim(), i = e.find((a) => a.id === s);
    if (i) return i.name;
    const t = e.find((a) => a.name === s);
    return t ? t.name : ((o = e[0]) == null ? void 0 : o.name) ?? "";
  }
  defaultFinish(e) {
    var t;
    const s = S(e), i = $((t = this.config) == null ? void 0 : t.bls_default_finish, "");
    return s.includes(i) ? i : s[0] ?? "any";
  }
  activeSingle(e, s) {
    var r;
    if (s) {
      const o = this.selName || this.defaultName(e), a = this.selFinish || this.defaultFinish(e);
      return e.find((l) => l.name === o && l.finish === a) || e.find((l) => l.name === o) || e[0];
    }
    const i = String(((r = this.config) == null ? void 0 : r.bls_default_light) ?? "").trim(), t = this.selId || i;
    return e.find((o) => o.id === t) || e.find((o) => o.name === t) || e[0];
  }
  renderPicture(e, s, i) {
    return e != null && e.image ? n`<picture class="bls-pic ${s}">
      ${e.imageMobile ? n`<source media="(max-width: 639px)" srcset=${e.imageMobile} />` : p}
      <img
        src=${e.image}
        alt=${e.name}
        loading=${i ? "eager" : "lazy"}
        decoding="async"
        fetchpriority=${i ? "high" : "low"}
      />
    </picture>` : n`<div class="bls-pic bls-pic--empty ${s}"></div>`;
  }
  // —— compare slider ——
  isRtl() {
    return getComputedStyle(this).direction === "rtl";
  }
  renderIndicators(e, s) {
    const t = [
      [s === "en" ? "Glossiness" : "اللمعان", e.gloss],
      [s === "en" ? "Color clarity" : "وضوح اللون", e.clarity],
      [s === "en" ? "Contrast" : "التباين", e.contrast]
    ].filter(([, r]) => r > 0);
    return t.length ? n`<div class="bls-indicators">
      ${t.map(
      ([r, o]) => n`<div class="bls-indicator">
          <span class="bls-indicator__label">${r}</span>
          <span class="fs-meter"><span style=${y({ width: `${o / 5 * 100}%` })}></span></span>
          <span class="bls-indicator__val">${o}/5</span>
        </div>`
    )}
    </div>` : p;
  }
  renderPanel(e, s) {
    const i = this.config || {}, t = x(i.bls_show_indicators, !0), r = x(i.bls_show_palette, !0);
    return n`<div class="bls-panel">
      ${e.desc ? n`<p class="bls-desc">${e.desc}</p>` : p}
      ${e.colorEffect ? n`<p class="bls-color-effect">${b("تأثير اللون", "Color effect")}: ${e.colorEffect}</p>` : p}
      ${t ? this.renderIndicators(e, s) : p}
      ${r && e.palette.length ? n`<div class="bls-palette">${e.palette.map((o) => n`<span class="bls-swatch" style=${y({ background: o })} title=${o}></span>`)}</div>` : p}
      ${e.note ? n`<p class="bls-note">★ ${e.note}</p>` : p}
      ${e.link ? n`<a class="fs-btn fs-btn--ghost bls-link" href=${e.link} target="_blank" rel="noopener noreferrer">${b("اقرئي المزيد", "Read more")}</a>` : p}
    </div>`;
  }
  renderSingle(e, s) {
    var z;
    const i = this.config || {}, t = x(i.bls_enable_finish, !1) && S(e).length > 0, r = String(((z = this.config) == null ? void 0 : z.bls_preload) ?? "lazy") === "eager", o = O(i), a = this.activeSingle(e, t), l = this.uniqueNames(e), k = S(e), w = a == null ? void 0 : a.name, C = this.selFinish || this.defaultFinish(e);
    return n`
      <div class="bls-wrap">
        <div class=${u({ "bls-stage": !0, "bls-stage--fade": o === "fade" })}>
          ${r ? e.map(
      (c) => this.renderPicture(c, `bls-layer ${c.id === (a == null ? void 0 : a.id) ? "is-on" : ""}`, !0)
    ) : this.renderPicture(a, "", !0)}
          ${a != null && a.image ? p : n`<div class="bls-empty">${b("أضيفي صورًا لكل حالة إضاءة", "Add an image for each lighting state")}</div>`}
          <div class="bls-caption"><b>${a == null ? void 0 : a.name}</b>${a != null && a.colorEffect ? n` — ${a.colorEffect}` : p}</div>
        </div>

        ${t ? n`
              <div class="bls-controls">
                <span class="bls-controls__label">${b("اللمسة النهائية", "Finish")}</span>
                ${k.map(
      (c) => n`<button
                    type="button"
                    class=${u({ "bls-chip": !0, "is-active": c === C })}
                    aria-pressed=${c === C ? "true" : "false"}
                    @click=${() => this.selFinish = c}
                  >${X(c, s)}</button>`
    )}
              </div>
              <div class="bls-controls">
                <span class="bls-controls__label">${b("نوع الإضاءة", "Lighting")}</span>
                ${l.map(
      (c) => n`<button
                    type="button"
                    class=${u({ "bls-chip": !0, "is-active": c === w })}
                    aria-pressed=${c === w ? "true" : "false"}
                    @click=${() => this.selName = c}
                  >${c}</button>`
    )}
              </div>
            ` : n`<div class="bls-controls">
              ${e.map(
      (c) => n`<button
                  type="button"
                  class=${u({ "bls-chip": !0, "is-active": c.id === (a == null ? void 0 : a.id) })}
                  aria-pressed=${c.id === (a == null ? void 0 : a.id) ? "true" : "false"}
                  @click=${() => this.selId = c.id}
                >
                  ${c.icon ? n`<span class=${c.icon.startsWith("sicon-") ? c.icon : ""}>${c.icon.startsWith("sicon-") ? "" : c.icon}</span>` : p}
                  ${c.name}
                </button>`
    )}
            </div>`}

        ${a ? this.renderPanel(a, s) : p}
      </div>
    `;
  }
  renderCompare(e) {
    const s = this.config || {}, i = G(s), t = e.find((l) => l.id === this.cmpA) || e[0], r = e.find((l) => l.id === this.cmpB) || e[1] || e[0], o = n`<div class="bls-compare-picks">
      <div>
        <label for="bls-a">${b("الحالة الأولى", "First state")}</label>
        <select id="bls-a" @change=${(l) => this.cmpA = l.target.value}>
          ${e.map((l) => n`<option value=${l.id} ?selected=${l.id === (t == null ? void 0 : t.id)}>${l.name}</option>`)}
        </select>
      </div>
      <div>
        <label for="bls-b">${b("الحالة الثانية", "Second state")}</label>
        <select id="bls-b" @change=${(l) => this.cmpB = l.target.value}>
          ${e.map((l) => n`<option value=${l.id} ?selected=${l.id === (r == null ? void 0 : r.id)}>${l.name}</option>`)}
        </select>
      </div>
    </div>`;
    if (i === "side")
      return n`<div class="bls-wrap">
        <div class="bls-cmp-side">
          <div class="bls-stage"><span class="bls-cmp-tag bls-cmp-tag--a">${t == null ? void 0 : t.name}</span>${this.renderPicture(t, "", !0)}</div>
          <div class="bls-stage"><span class="bls-cmp-tag bls-cmp-tag--b">${r == null ? void 0 : r.name}</span>${this.renderPicture(r, "", !0)}</div>
        </div>
        ${o}
      </div>`;
    const a = i === "slider" ? y({ "--bls-pos": `${this.sliderPos}%` }) : y({});
    return n`<div class="bls-wrap">
      <div
        class=${u({ "bls-stage": !0, "bls-cmp-slider": i === "slider", "bls-cmp-split": i === "split" })}
        style=${a}
      >
        <span class="bls-cmp-tag bls-cmp-tag--a">${t == null ? void 0 : t.name}</span>
        <span class="bls-cmp-tag bls-cmp-tag--b">${r == null ? void 0 : r.name}</span>
        ${this.renderPicture(t, "", !0)}
        ${this.renderPicture(r, "bls-img--overlay", !0)}
        ${i === "slider" ? n`<div
              class="bls-cmp-handle"
              role="slider"
              tabindex="0"
              aria-label=${b("حرّكي للمقارنة", "Drag to compare")}
              aria-valuenow=${this.sliderPos}
              aria-valuemin="0"
              aria-valuemax="100"
              @pointerdown=${this.onSliderDown}
              @keydown=${(l) => {
      l.key === "ArrowLeft" && (this.sliderPos = h(this.sliderPos - 5, 0, 100)), l.key === "ArrowRight" && (this.sliderPos = h(this.sliderPos + 5, 0, 100));
    }}
            ></div>` : p}
      </div>
      ${o}
    </div>`;
  }
  render() {
    const e = this.config || {}, s = T(e, "bls_"), i = s.animate && !q(), t = this.lights, r = g(e.bls_title), o = g(e.bls_desc), a = B() === "en" ? "en" : "ar", l = V(e), k = x(e.bls_show_compare, !1), w = l === "compare" && k && t.length >= 2 ? "compare" : "single";
    return t.length ? n`
      <section
        class=${u({ "fs-section": !0, "fs-animate": i })}
        style=${y({
      ...D(s),
      "--bls-aspect": W(e),
      "--bls-active": String(e.bls_active_color ?? s.accent),
      "--bls-speed": `${Math.max(0, _(e.bls_speed, 400))}ms`
    })}
        aria-label=${r || b("محاكي الإضاءة والمظهر", "Lighting & finish simulator")}
      >
        <div class="fs-container">
          ${r || o ? n`<div class="fs-header">
                ${r ? n`<h2 class="fs-title">${r}</h2>` : p}
                ${o ? n`<p class="fs-desc">${o}</p>` : p}
              </div>` : p}

          ${w === "compare" ? this.renderCompare(t) : this.renderSingle(t, a)}
        </div>
      </section>
    ` : n`<div class="fs-empty" role="status">
        ${b("أضيفي حالات إضاءة مع صورها من إعدادات العنصر.", "Add lighting states with their images in the element settings.")}
      </div>`;
  }
};
P.styles = [j, H];
let m = P;
f([
  I({ type: Object })
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
typeof m < "u" && m.registerSallaComponent("salla-beauty-lighting-finish-simulator");
export {
  m as default
};
