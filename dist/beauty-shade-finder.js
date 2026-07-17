import { css as S, LitElement as C, html as i, nothing as c } from "lit";
import { property as E, state as v } from "lit/decorators.js";
import { classMap as w } from "lit/directives/class-map.js";
import { styleMap as _ } from "lit/directives/style-map.js";
import { n as L, l as f, b as z, g as k, s as I, o as D, t as d, r as M, p as A, i as O, a as K } from "./sharedStyles-cRSiglXC.js";
const N = S`
  :host {
    direction: inherit;
  }

  .bsf-wrap {
    display: grid;
    gap: 1.4rem;
  }

  .bsf-steps {
    display: grid;
    gap: 1rem;
  }

  .bsf-step {
    display: grid;
    gap: 0.55rem;
  }

  .bsf-step__label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--text-color, #33232e);
  }

  .bsf-step__num {
    display: grid;
    place-items: center;
    width: 1.55rem;
    height: 1.55rem;
    border-radius: 50%;
    background: var(--accent-color, #c2527f);
    color: #fff;
    font-size: 0.8rem;
    font-weight: 800;
  }

  .bsf-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .bsf-chip {
    min-height: 42px;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 600;
    font-size: 0.86rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
      transform 0.15s ease;
  }

  .bsf-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 45%, var(--border-color, #f2dde7));
  }

  .bsf-chip[aria-pressed='true'] {
    background: var(--accent-color, #c2527f);
    border-color: var(--accent-color, #c2527f);
    color: #fff;
    transform: translateY(-1px);
  }

  .bsf-results {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 1.4rem;
    align-items: start;
    padding: 1.2rem;
    border-radius: var(--section-radius, 16px);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, #fbf5f8));
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bsf-results__title {
    grid-column: 1 / -1;
    margin: 0;
    font-size: 1.02rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
  }

  .bsf-swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
  }

  .bsf-swatch {
    position: relative;
    width: 4.1rem;
    display: grid;
    gap: 0.3rem;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    text-align: center;
  }

  .bsf-swatch__chip {
    width: 4.1rem;
    height: 4.1rem;
    border-radius: 999px;
    border: 3px solid transparent;
    box-shadow: 0 4px 14px rgba(43, 33, 28, 0.16), inset 0 -6px 12px rgba(0, 0, 0, 0.14);
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  .bsf-swatch--square .bsf-swatch__chip {
    border-radius: 10px;
  }

  .bsf-swatch--rounded .bsf-swatch__chip {
    border-radius: 18px;
  }

  .bsf-swatch:hover .bsf-swatch__chip {
    transform: scale(1.06);
  }

  .bsf-swatch[aria-pressed='true'] .bsf-swatch__chip {
    border-color: var(--accent-color, #c2527f);
    transform: scale(1.08);
  }

  .bsf-swatch__name {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bsf-detail {
    display: grid;
    gap: 0.7rem;
    padding: 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.9);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bsf-detail__media {
    position: relative;
    aspect-ratio: 4 / 3;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 40%, #fff);
  }

  .bsf-detail__swatch {
    position: absolute;
    inset-block-end: 0.6rem;
    inset-inline-end: 0.6rem;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    border: 3px solid #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  }

  .bsf-detail__name {
    margin: 0;
    font-size: 1.02rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
  }

  .bsf-detail__number {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
  }

  .bsf-detail__desc {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--muted-color, #8f7a86);
  }

  .bsf-detail__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.2rem;
  }

  @media (max-width: 720px) {
    .bsf-results {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bsf-chip,
    .bsf-swatch__chip {
      transition: none;
    }
  }
`, q = [
  {
    key: "product_type",
    labelKey: "bsf_step_type_label",
    labelAr: "نوع المنتج",
    labelEn: "Product type",
    options: [
      { value: "foundation", ar: "كريم أساس", en: "Foundation" },
      { value: "concealer", ar: "كونسيلر", en: "Concealer" },
      { value: "blush", ar: "بلاشر", en: "Blush" },
      { value: "lipstick", ar: "أحمر شفاه", en: "Lipstick" },
      { value: "contour", ar: "كونتور", en: "Contour" },
      { value: "powder", ar: "بودرة", en: "Powder" }
    ]
  },
  {
    key: "skin",
    labelKey: "bsf_step_skin_label",
    labelAr: "درجة لون البشرة",
    labelEn: "Skin depth",
    options: [
      { value: "very_fair", ar: "فاتحة جدًا", en: "Very fair" },
      { value: "fair", ar: "فاتحة", en: "Fair" },
      { value: "medium", ar: "متوسطة", en: "Medium" },
      { value: "tan", ar: "حنطية", en: "Tan" },
      { value: "deep", ar: "سمراء", en: "Deep" },
      { value: "dark", ar: "داكنة", en: "Dark" }
    ]
  },
  {
    key: "undertone",
    labelKey: "bsf_step_undertone_label",
    labelAr: "الأندرتون",
    labelEn: "Undertone",
    options: [
      { value: "warm", ar: "دافئ", en: "Warm" },
      { value: "cool", ar: "بارد", en: "Cool" },
      { value: "neutral", ar: "محايد", en: "Neutral" },
      { value: "olive", ar: "زيتوني", en: "Olive" }
    ]
  },
  {
    key: "result",
    labelKey: "bsf_step_result_label",
    labelAr: "النتيجة المطلوبة",
    labelEn: "Desired finish",
    options: [
      { value: "natural", ar: "طبيعية", en: "Natural" },
      { value: "radiant", ar: "مشرقة", en: "Radiant" },
      { value: "matte", ar: "مطفية", en: "Matte" },
      { value: "light", ar: "تغطية خفيفة", en: "Light coverage" },
      { value: "medium_cov", ar: "تغطية متوسطة", en: "Medium coverage" },
      { value: "full_cov", ar: "تغطية عالية", en: "Full coverage" }
    ]
  }
];
function P() {
  var n, e;
  return ((e = typeof document < "u" ? (n = document.documentElement.lang) == null ? void 0 : n.split(/[-_]/)[0] : "ar") == null ? void 0 : e.toLowerCase()) === "en";
}
function R(n) {
  const e = P();
  return q.map((s) => {
    const t = f(n[s.labelKey]) || (e ? s.labelEn : s.labelAr), a = s.options.map((r) => ({
      value: r.value,
      label: e ? r.en : r.ar
    }));
    return { key: s.key, label: t, options: a };
  });
}
function m(n, e) {
  const s = n[e] ?? n[`bsf_shades.${e}`];
  return k(s, "").toLowerCase().trim();
}
function V(n) {
  return L(n).map((e, s) => {
    const t = f(e.shade_name);
    return {
      id: `shade-${s}`,
      hex: f(e.hex) || "#d9b48f",
      shade_name: t,
      shade_number: f(e.shade_number),
      name: t,
      desc: f(e.desc),
      link: z(e.link),
      product_type: m(e, "product_type"),
      skin: m(e, "skin"),
      undertone: m(e, "undertone"),
      result: m(e, "result")
    };
  }).filter((e) => e.shade_name || e.hex);
}
function H(n, e) {
  const s = ["product_type", "skin", "undertone", "result"], t = n.filter(
    (r) => s.every((o) => {
      const u = e[o];
      if (!u) return !0;
      const b = r[o];
      return !b || b === u;
    })
  );
  if (t.length) return t;
  const a = n.filter((r) => {
    const o = !e.product_type || !r.product_type || r.product_type === e.product_type, u = !e.skin || !r.skin || r.skin === e.skin;
    return o && u;
  });
  return a.length ? a : n;
}
var T = Object.defineProperty, g = (n, e, s, t) => {
  for (var a = void 0, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (a = o(e, s, a) || a);
  return a && T(e, s, a), a;
};
const y = class y extends C {
  constructor() {
    super(...arguments), this.config = {}, this.selection = {}, this.shades = [], this.selectedShadeId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.load();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && this.load();
  }
  load() {
    var e;
    this.shades = V((e = this.config) == null ? void 0 : e.bsf_shades), this.ensureSelectedShade();
  }
  get filtered() {
    return H(this.shades, this.selection);
  }
  ensureSelectedShade() {
    var s;
    const e = this.filtered;
    e.some((t) => t.id === this.selectedShadeId) || (this.selectedShadeId = ((s = e[0]) == null ? void 0 : s.id) ?? "");
  }
  get selectedShade() {
    return this.filtered.find((e) => e.id === this.selectedShadeId) || null;
  }
  pick(e, s) {
    const t = { ...this.selection };
    t[e] === s ? delete t[e] : t[e] = s, this.selection = t, this.ensureSelectedShade();
  }
  reset() {
    this.selection = {}, this.ensureSelectedShade();
  }
  selectShade(e) {
    this.selectedShadeId = e;
  }
  renderStep(e, s) {
    return i`
      <div class="bsf-step">
        <span class="bsf-step__label">
          <span class="bsf-step__num" aria-hidden="true">${s + 1}</span>
          ${e.label}
        </span>
        <div class="bsf-chips" role="group" aria-label=${e.label}>
          ${e.options.map((t) => {
      const a = this.selection[e.key] === t.value;
      return i`<button
              type="button"
              class="bsf-chip"
              aria-pressed=${a ? "true" : "false"}
              @click=${() => this.pick(e.key, t.value)}
            >
              ${t.label}
            </button>`;
    })}
        </div>
      </div>
    `;
  }
  renderDetail(e, s) {
    const t = e.link ? D(e.link) : !1;
    return i`
      <div class="bsf-detail" aria-live="polite">
        <div class="bsf-detail__media">
          <span class="bsf-detail__swatch" style=${_({ background: e.hex })}></span>
        </div>
        <h4 class="bsf-detail__name">
          ${e.name || d("درجة مقترحة", "Suggested shade")}
          ${e.shade_number ? i`<span class="bsf-detail__number"> · ${e.shade_number}</span>` : c}
        </h4>
        ${e.desc ? i`<p class="bsf-detail__desc">${e.desc}</p>` : c}
        ${s && e.link ? i`<div class="bsf-detail__actions">
              <a
                class="fs-btn fs-btn--ghost"
                href=${e.link}
                target=${t ? "_blank" : "_self"}
                rel=${t ? "noopener noreferrer" : c}
              >
                ${d("التفاصيل", "Details")}
              </a>
            </div>` : c}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, s = M(e, "bsf_"), t = s.animate && !A(), a = f(e.bsf_title), r = f(e.bsf_desc), o = R(e), u = this.filtered, b = this.selectedShade, $ = O(e.bsf_show_link, !0), x = k(e.bsf_swatch_shape, "circle");
    return this.shades.length ? i`
      <section
        class=${w({ "fs-section": !0, "fs-animate": t })}
        style=${_(K(s))}
        aria-label=${a || d("محدد درجة المكياج المناسبة", "Beauty shade finder")}
      >
        <div class="fs-container">
          ${a || r ? i`<div class="fs-header">
                ${a ? i`<h2 class="fs-title">${a}</h2>` : c}
                ${r ? i`<p class="fs-desc">${r}</p>` : c}
              </div>` : c}

          <div class="bsf-wrap">
            <div class="bsf-steps">
              ${o.map((l, h) => this.renderStep(l, h))}
            </div>

            <div class="bsf-results">
              <h3 class="bsf-results__title">
                ${d("الدرجات المناسبة لكِ", "Shades that suit you")}
                <span style="font-weight:600;color:var(--muted-color,#8f7a86)"> · ${u.length}</span>
              </h3>
              <div class="bsf-swatches" role="listbox" aria-label=${d("عينات الألوان", "Shade swatches")}>
                ${u.map((l) => {
      const h = l.id === this.selectedShadeId;
      return i`<button
                    type="button"
                    class=${w({
        "bsf-swatch": !0,
        "bsf-swatch--square": x === "square",
        "bsf-swatch--rounded": x === "rounded"
      })}
                    role="option"
                    aria-selected=${h ? "true" : "false"}
                    aria-pressed=${h ? "true" : "false"}
                    aria-label=${l.name || l.shade_number || d("درجة", "Shade")}
                    @click=${() => this.selectShade(l.id)}
                  >
                    <span class="bsf-swatch__chip" style=${_({ background: l.hex })}></span>
                    ${l.shade_number || l.shade_name ? i`<span class="bsf-swatch__name">${l.shade_number || l.shade_name}</span>` : c}
                  </button>`;
    })}
              </div>
              ${b ? this.renderDetail(b, $) : i`<p class="fs-empty">${d("لا توجد درجات مطابقة", "No matching shades")}</p>`}
              <div style="grid-column:1/-1">
                <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.reset}>
                  ${f(e.bsf_reset_btn) || d("إعادة التحديد", "Reset choices")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    ` : i`<div class="fs-empty" role="status">
        ${d("أضيفي درجات المكياج من إعدادات العنصر", "Add makeup shades in the element settings")}
      </div>`;
  }
};
y.styles = [I, N];
let p = y;
g([
  E({ type: Object })
], p.prototype, "config");
g([
  v()
], p.prototype, "selection");
g([
  v()
], p.prototype, "shades");
g([
  v()
], p.prototype, "selectedShadeId");
typeof p < "u" && p.registerSallaComponent("salla-beauty-shade-finder");
export {
  p as default
};
