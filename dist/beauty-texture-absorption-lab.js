import { css as T, LitElement as E, nothing as d, html as i } from "lit";
import { property as R, state as x } from "lit/decorators.js";
import { classMap as w } from "lit/directives/class-map.js";
import { styleMap as f } from "lit/directives/style-map.js";
import { n as F, l as b, e as L, g as I, f as z, h as P, s as M, m as B, p as S, i as u, t as c, r as j, a as H } from "./sharedStyles--LaFqDVC.js";
const X = T`
  .bta-samples {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .bta-sample {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    width: 5.5rem;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    font: inherit;
  }

  .bta-sample__blob {
    width: 3.4rem;
    height: 3.4rem;
    background: var(--sample-color, var(--accent-color, #c2527f));
    box-shadow: inset 0 -6px 10px rgba(0, 0, 0, 0.15), 0 6px 14px rgba(43, 33, 28, 0.18);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .bta-sample:hover .bta-sample__blob { transform: scale(1.08); }
  .bta-sample.is-active .bta-sample__blob {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--sample-color, var(--accent-color, #c2527f)) 40%, transparent), 0 8px 18px rgba(43, 33, 28, 0.22);
  }

  .bta-sample__name { font-size: 0.78rem; font-weight: 700; color: var(--text-color, #33232e); text-align: center; }

  /* shape variants */
  .bta-samples--drops .bta-sample__blob { border-radius: 50% 50% 50% 8px; transform: rotate(45deg); }
  .bta-samples--drops .bta-sample:hover .bta-sample__blob { transform: rotate(45deg) scale(1.08); }
  .bta-samples--circles .bta-sample__blob { border-radius: 50%; }
  .bta-samples--swatches .bta-sample__blob { border-radius: 14px; width: 4.2rem; height: 2.8rem; }
  .bta-samples--slides .bta-sample__blob { border-radius: 4px; width: 4.4rem; height: 2.4rem; background: linear-gradient(120deg, color-mix(in srgb, var(--sample-color) 55%, transparent), var(--sample-color)); border: 1px solid rgba(255,255,255,0.4); }
  .bta-samples--blobs .bta-sample__blob { border-radius: 42% 58% 63% 37% / 42% 44% 56% 58%; }
  .bta-samples--bubbles .bta-sample__blob { border-radius: 50%; background: radial-gradient(circle at 32% 30%, rgba(255,255,255,0.75), var(--sample-color) 60%); }

  /* experience area */
  .bta-stage {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: 1fr;
    align-items: start;
  }
  @media (min-width: 820px) {
    .bta-stage { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 1.75rem; }
  }

  .bta-play {
    position: relative;
    aspect-ratio: 4 / 3;
    border-radius: var(--section-radius, 16px);
    overflow: hidden;
    background: var(--bta-area, color-mix(in srgb, var(--border-color, #f2dde7) 35%, var(--card-bg, #fff)));
    border: 1px solid var(--border-color, #f2dde7);
    display: grid;
    place-items: center;
    touch-action: none;
  }

  .bta-play__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

  .bta-smear {
    width: 30%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--sample-color, var(--accent-color, #c2527f));
    box-shadow: inset 0 -8px 14px rgba(0, 0, 0, 0.16);
    transform: scale(calc(0.5 + var(--spread, 0) * 1.9));
    opacity: calc(1 - var(--spread, 0) * 0.55);
    transition: transform var(--spread-speed, 500ms) ease, opacity var(--spread-speed, 500ms) ease;
    will-change: transform;
  }

  .bta-play__hint {
    position: absolute;
    inset-inline: 0;
    bottom: 3.5rem;
    text-align: center;
    font-size: 0.74rem;
    color: var(--muted-color, #8f7a86);
    pointer-events: none;
  }

  .bta-play__cta {
    position: absolute;
    left: 50%;
    bottom: 0.85rem;
    transform: translateX(-50%);
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 44px;
    padding: 0.55rem 1.25rem;
    border: none;
    border-radius: 999px;
    background: var(--sample-color, var(--accent-color, #c2527f));
    color: #fff;
    font: inherit;
    font-size: 0.88rem;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 8px 22px color-mix(in srgb, var(--sample-color, var(--accent-color, #c2527f)) 45%, transparent);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    white-space: nowrap;
  }

  [dir='rtl'] .bta-play__cta {
    left: 50%;
    right: auto;
  }

  .bta-play__cta:hover,
  .bta-play__cta:focus-visible {
    transform: translateX(-50%) scale(1.02);
    box-shadow: 0 10px 26px color-mix(in srgb, var(--sample-color, var(--accent-color, #c2527f)) 55%, transparent);
  }

  [dir='rtl'] .bta-play__cta:hover,
  [dir='rtl'] .bta-play__cta:focus-visible {
    transform: translateX(-50%) scale(1.02);
  }

  .bta-play__cta-icon {
    width: 1.35rem;
    height: 1.35rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.22);
    font-size: 0.72rem;
    line-height: 1;
  }

  .bta-details { display: grid; gap: 0.85rem; }
  .bta-details__name { margin: 0; font-size: 1.15rem; font-weight: 800; color: var(--text-color, #33232e); }
  .bta-details__desc { margin: 0; color: var(--muted-color, #8f7a86); line-height: 1.65; font-size: 0.9rem; }

  .bta-indicators { display: grid; gap: 0.55rem; }

  .bta-indicators .fs-meter {
    --meter-fill: var(--meter-color, var(--accent-color, #c2527f));
  }

  .bta-indicators .fs-meter > span {
    background: var(--meter-fill, var(--accent-color, #c2527f));
  }

  .bta-ind { display: grid; grid-template-columns: 7.5rem 1fr auto; align-items: center; gap: 0.6rem; font-size: 0.8rem; }
  .bta-ind__label { color: var(--muted-color, #8f7a86); font-weight: 700; }
  .bta-ind__val { color: var(--meter-color, var(--accent-color, #c2527f)); font-weight: 800; font-variant-numeric: tabular-nums; }

  .bta-dots { display: inline-flex; gap: 0.28rem; }
  .bta-dot { width: 0.72rem; height: 0.72rem; border-radius: 50%; background: color-mix(in srgb, var(--border-color, #f2dde7) 80%, transparent); }
  .bta-dot.is-on { background: var(--meter-color, var(--accent-color, #c2527f)); }
  .bta-circle { width: 0.8rem; height: 0.8rem; border-radius: 50%; border: 2px solid var(--meter-color, var(--accent-color, #c2527f)); }
  .bta-circle.is-on { background: var(--meter-color, var(--accent-color, #c2527f)); }

  .bta-gauge {
    --p: 0;
    width: 3rem;
    height: 1.5rem;
    border-radius: 3rem 3rem 0 0;
    background:
      conic-gradient(from 270deg at 50% 100%, var(--meter-color, var(--accent-color, #c2527f)) calc(var(--p) * 180deg), color-mix(in srgb, var(--border-color, #f2dde7) 80%, transparent) 0);
  }

  .bta-facts { display: grid; gap: 0.4rem; font-size: 0.84rem; }
  .bta-fact { display: flex; gap: 0.4rem; }
  .bta-fact b { color: var(--text-color, #33232e); font-weight: 700; flex: 0 0 auto; }
  .bta-fact span { color: var(--muted-color, #8f7a86); }

  .bta-note { margin: 0; font-size: 0.82rem; color: color-mix(in srgb, #8a5a00 65%, var(--text-color, #33232e)); }

  .bta-toolbar { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-top: 1.25rem; }

  /* compare */
  .bta-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.25rem; }
  .bta-compare__col {
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: var(--section-radius, 16px);
    padding: 1rem;
    display: grid;
    gap: 0.75rem;
  }
  .bta-compare__picks { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1.25rem; }
  .bta-compare__picks select {
    width: 100%;
    padding: 0.5rem 0.6rem;
    border-radius: 10px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 600;
  }
  .bta-ind__val.is-higher { color: var(--success-color, #2f9e63); }

  @media (max-width: 639px) {
    .bta-ind { grid-template-columns: 6rem 1fr auto; }
    .bta-compare { grid-template-columns: 1fr; }
    .bta-compare__picks { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .bta-smear, .bta-sample__blob, .bta-play__cta { transition: none !important; }
  }
`, D = ["drops", "circles", "swatches", "slides", "blobs", "bubbles"], N = ["bars", "dots", "circles", "semicircle"], _ = (l) => z(P(l, 0), 0, 5);
function G(l) {
  return F(l).map((e, s) => ({
    id: String(e.tex_id ?? "").trim() || `texture-${s + 1}`,
    name: b(e.name) || `${s + 1}`,
    icon: String(e.icon ?? "").trim(),
    image: L(e.image),
    color: String(e.color ?? "").trim() || "#c9a24b",
    desc: b(e.desc),
    lightness: _(e.lightness),
    thickness: _(e.thickness),
    absorption: _(e.absorption),
    hydration: _(e.hydration),
    gloss: _(e.gloss),
    greasiness: _(e.greasiness),
    finish: b(e.finish),
    spread: b(e.spread),
    amount: b(e.amount),
    timing: b(e.timing),
    usage: b(e.usage),
    tips: b(e.tips),
    note: b(e.note)
  })).filter((e) => e.name || e.desc);
}
function U(l, e) {
  return [
    ["lightness", ["الخفة", "Lightness"], l.lightness],
    ["thickness", ["السماكة", "Thickness"], l.thickness],
    ["absorption", ["سرعة الامتصاص", "Absorption"], l.absorption],
    ["hydration", ["الترطيب", "Hydration"], l.hydration],
    ["gloss", ["اللمعان", "Gloss"], l.gloss],
    ["greasiness", ["الإحساس الدهني", "Greasiness"], l.greasiness]
  ].filter(([, , a]) => a > 0).map(([a, [t, r], n]) => ({ key: a, label: e === "en" ? r : t, value: n }));
}
function W(l) {
  const e = I(l.bta_sample_shape, "drops");
  return D.includes(e) ? e : "drops";
}
function C(l) {
  const e = I(l.bta_indicator_type, "bars");
  return N.includes(e) ? e : "bars";
}
var q = Object.defineProperty, y = (l, e, s, a) => {
  for (var t = void 0, r = l.length - 1, n; r >= 0; r--)
    (n = l[r]) && (t = n(e, s, t) || t);
  return t && q(e, s, t), t;
};
const k = class k extends E {
  constructor() {
    super(...arguments), this.config = {}, this.selId = "", this.cmpA = "", this.cmpB = "", this.spread = 0, this.compareOpen = !1, this.boundLangHandler = () => this.requestUpdate(), this.onPlayPointer = (e) => {
      var n;
      const s = e.currentTarget;
      (n = s.setPointerCapture) == null || n.call(s, e.pointerId);
      const a = s.getBoundingClientRect(), r = getComputedStyle(this).direction === "rtl" ? (a.right - e.clientX) / a.width : (e.clientX - a.left) / a.width;
      this.spread = z(Number(r.toFixed(2)), 0, 1);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.selId = "", this.cmpA = "", this.cmpB = "", this.spread = 0);
  }
  get locale() {
    return B() === "en" ? "en" : "ar";
  }
  get textures() {
    var e;
    return G((e = this.config) == null ? void 0 : e.bta_textures);
  }
  active(e) {
    var a;
    const s = String(((a = this.config) == null ? void 0 : a.bta_default_texture) ?? "").trim();
    return e.find((t) => t.id === this.selId) || e.find((t) => t.id === s) || e[0];
  }
  motionDisabled() {
    var e;
    if (S()) return !0;
    if (u((e = this.config) == null ? void 0 : e.bta_disable_motion_mobile, !1))
      try {
        return window.matchMedia("(max-width: 639px)").matches;
      } catch {
        return !1;
      }
    return !1;
  }
  select(e) {
    this.selId = e, this.spread = 0;
  }
  toggleSpread() {
    this.spread = this.spread > 0.5 ? 0 : 1;
  }
  renderIndicators(e, s, a) {
    const t = U(e, this.locale);
    return t.length ? i`<div class="bta-indicators" style=${f({ "--meter-color": e.color })}>
      ${t.map((r) => {
      const n = r.value / 5 * 100;
      let p;
      return s === "dots" || s === "circles" ? p = i`<span class="bta-dots">
            ${[1, 2, 3, 4, 5].map(
        (h) => i`<span class=${w({ [s === "dots" ? "bta-dot" : "bta-circle"]: !0, "is-on": h <= r.value })}></span>`
      )}
          </span>` : s === "semicircle" ? p = i`<span class="bta-gauge" style=${f({ "--p": String(r.value / 5) })}></span>` : p = i`<span class="fs-meter"><span style=${f({ width: `${n}%` })}></span></span>`, i`<div class="bta-ind">
          <span class="bta-ind__label">${r.label}</span>
          ${p}
          <span class=${w({ "bta-ind__val": !0, "is-higher": !!(a != null && a[r.key]) })}>${r.value}/5</span>
        </div>`;
    })}
    </div>` : d;
  }
  renderFacts(e) {
    const s = [
      [c("اللمسة النهائية", "Finish"), e.finish],
      [c("طريقة التوزيع", "Application"), e.spread],
      [c("الكمية", "Amount"), e.amount],
      [c("التوقيت", "When"), e.timing],
      [c("الاستخدام المناسب", "Best for"), e.usage]
    ].filter(([, a]) => !!a);
    return s.length ? i`<div class="bta-facts">
      ${s.map(([a, t]) => i`<div class="bta-fact"><b>${a}:</b><span>${t}</span></div>`)}
    </div>` : d;
  }
  renderExplore(e) {
    const s = this.config || {}, a = this.active(e), t = C(s), r = u(s.bta_show_indicators, !0), n = u(s.bta_enable_spread, !0), p = u(s.bta_show_images, !0), h = u(s.bta_show_tips, !0), m = u(s.bta_show_notes, !0), o = this.motionDisabled() ? 0 : Math.max(0, P(s.bta_spread_speed, 500));
    return i`<div class="bta-stage" style=${f({ "--sample-color": a.color, "--meter-color": a.color })}>
      <div
        class="bta-play"
        style=${f({ "--spread": String(this.spread), "--spread-speed": `${o}ms` })}
        @pointerdown=${n ? this.onPlayPointer : void 0}
        @pointermove=${n ? (v) => {
      v.buttons && this.onPlayPointer(v);
    } : void 0}
      >
        ${p && a.image ? i`<img class="bta-play__img" src=${a.image} alt=${a.name} loading="lazy" decoding="async" />` : i`<span class="bta-smear"></span>`}
        ${n ? i`<button type="button" class="bta-play__cta" @click=${() => this.toggleSpread()}>
              <span class="bta-play__cta-icon" aria-hidden="true">${this.spread > 0.5 ? "↺" : "▶"}</span>
              ${this.spread > 0.5 ? c("إعادة", "Reset") : c("طبّقي القوام", "Apply texture")}
            </button>` : d}
        ${n && !a.image ? i`<span class="bta-play__hint">${c("اسحبي داخل المساحة لرؤية الانتشار", "Drag inside the area to see it spread")}</span>` : d}
      </div>

      <div class="bta-details">
        <h3 class="bta-details__name">${a.name}</h3>
        ${a.desc ? i`<p class="bta-details__desc">${a.desc}</p>` : d}
        ${r ? this.renderIndicators(a, t) : d}
        ${this.renderFacts(a)}
        ${h && a.tips ? i`<p class="bta-details__desc">💡 ${a.tips}</p>` : d}
        ${m && a.note ? i`<p class="bta-note">★ ${a.note}</p>` : d}
      </div>
    </div>`;
  }
  renderCompare(e) {
    const s = this.config || {}, a = C(s), t = e.find((o) => o.id === this.cmpA) || e[0], r = e.find((o) => o.id === this.cmpB) || e[1] || e[0], n = ["lightness", "thickness", "absorption", "hydration", "gloss", "greasiness"], p = {}, h = {};
    for (const o of n)
      t[o] > r[o] ? p[o] = !0 : r[o] > t[o] && (h[o] = !0);
    const m = (o, v, A, O) => i`
      <div>
        <label style="font-size:0.76rem;font-weight:700;color:var(--muted-color);display:block;margin-bottom:0.25rem">${O}</label>
        <select id=${o} @change=${($) => A($.target.value)}>
          ${e.map(($) => i`<option value=${$.id} ?selected=${$.id === (v == null ? void 0 : v.id)}>${$.name}</option>`)}
        </select>
      </div>
    `;
    return i`
      <div class="bta-compare__picks">
        ${m("bta-a", t, (o) => this.cmpA = o, c("القوام الأول", "First texture"))}
        ${m("bta-b", r, (o) => this.cmpB = o, c("القوام الثاني", "Second texture"))}
      </div>
      <div class="bta-compare">
        <div class="bta-compare__col" style=${f({ "--sample-color": t.color, "--meter-color": t.color })}>
          <h3 class="bta-details__name">${t.name}</h3>
          ${this.renderIndicators(t, a, p)}
          ${this.renderFacts(t)}
        </div>
        <div class="bta-compare__col" style=${f({ "--sample-color": r.color, "--meter-color": r.color })}>
          <h3 class="bta-details__name">${r.name}</h3>
          ${this.renderIndicators(r, a, h)}
          ${this.renderFacts(r)}
        </div>
      </div>
    `;
  }
  render() {
    const e = this.config || {}, s = j(e, "bta_"), a = s.animate && !S(), t = this.textures, r = b(e.bta_title), n = b(e.bta_desc), p = W(e), h = u(e.bta_enable_compare, !0) && t.length >= 2, m = t.length ? this.active(t) : null;
    return t.length ? i`
      <section
        class=${w({ "fs-section": !0, "fs-animate": a })}
        style=${f({
      ...H(s),
      "--bta-area": String(e.bta_area_color ?? ""),
      "--success-color": "#2f9e63"
    })}
        aria-label=${r || c("مختبر القوام والامتصاص", "Texture & absorption lab")}
      >
        <div class="fs-container">
          ${r || n ? i`<div class="fs-header">
                ${r ? i`<h2 class="fs-title">${r}</h2>` : d}
                ${n ? i`<p class="fs-desc">${n}</p>` : d}
              </div>` : d}

          <div class=${w({ "bta-samples": !0, [`bta-samples--${p}`]: !0 })} role="tablist">
            ${t.map(
      (o) => i`<button
                type="button"
                role="tab"
                class=${w({ "bta-sample": !0, "is-active": o.id === (m == null ? void 0 : m.id) && !this.compareOpen })}
                aria-selected=${o.id === (m == null ? void 0 : m.id) ? "true" : "false"}
                style=${f({ "--sample-color": o.color })}
                @click=${() => {
        this.compareOpen = !1, this.select(o.id);
      }}
              >
                <span class="bta-sample__blob">${o.icon && !o.icon.startsWith("sicon-") ? o.icon : ""}</span>
                <span class="bta-sample__name">${o.name}</span>
              </button>`
    )}
          </div>

          ${this.compareOpen && h ? this.renderCompare(t) : this.renderExplore(t)}

          ${h ? i`<div class="bta-toolbar">
                <button
                  type="button"
                  class=${this.compareOpen ? "fs-btn fs-btn--ghost" : "fs-btn"}
                  @click=${() => this.compareOpen = !1}
                >${c("استكشاف قوام", "Explore one")}</button>
                <button
                  type="button"
                  class=${this.compareOpen ? "fs-btn" : "fs-btn fs-btn--ghost"}
                  @click=${() => this.compareOpen = !0}
                >${c("مقارنة قوامين", "Compare two")}</button>
              </div>` : d}
        </div>
      </section>
    ` : i`<div class="fs-empty" role="status">
        ${c("أضيفي أنواع القوام من إعدادات العنصر لعرض المختبر.", "Add texture types in the element settings to show the lab.")}
      </div>`;
  }
};
k.styles = [M, X];
let g = k;
y([
  R({ type: Object })
], g.prototype, "config");
y([
  x()
], g.prototype, "selId");
y([
  x()
], g.prototype, "cmpA");
y([
  x()
], g.prototype, "cmpB");
y([
  x()
], g.prototype, "spread");
y([
  x()
], g.prototype, "compareOpen");
typeof g < "u" && g.registerSallaComponent("salla-beauty-texture-absorption-lab");
export {
  g as default
};
