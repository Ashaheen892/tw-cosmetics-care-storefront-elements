import { css as y, LitElement as k, html as i, nothing as c } from "lit";
import { property as $, state as g } from "lit/decorators.js";
import { classMap as _ } from "lit/directives/class-map.js";
import { styleMap as u } from "lit/directives/style-map.js";
import { n as w, l as b, b as S, g as x, m as I, s as C, t as d, o as E, i as L, r as M, p as z, a as q } from "./sharedStyles--LaFqDVC.js";
const N = y`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bsf-wrap {
    display: grid;
    gap: 1.25rem;
    width: 100%;
    max-width: 760px;
    margin-inline: auto;
  }

  .bsf-wrap:has(.bsf-results) {
    max-width: 960px;
  }

  .bsf-progress {
    display: grid;
    gap: 0.45rem;
  }

  .bsf-progress__bar {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 70%, #fff);
    overflow: hidden;
  }

  .bsf-progress__bar span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--accent-color, #c2527f),
      color-mix(in srgb, var(--accent-color, #c2527f) 70%, #7b2c52)
    );
    transition: width 0.25s ease;
  }

  .bsf-progress__text {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
  }

  .bsf-question {
    display: grid;
    gap: 0.75rem;
    padding: 1.15rem 1.2rem;
    border-radius: var(--section-radius, 16px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    box-shadow: 0 8px 24px rgba(194, 82, 127, 0.06);
  }

  .bsf-question__title {
    margin: 0;
    font-size: 1.12rem;
    font-weight: 800;
    line-height: 1.35;
    color: var(--text-color, #33232e);
  }

  .bsf-question__hint {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--muted-color, #8f7a86);
    padding: 0.65rem 0.8rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 8%, #fff);
    border-inline-start: 3px solid var(--accent-color, #c2527f);
  }

  .bsf-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .bsf-chip {
    min-height: 44px;
    padding: 0.55rem 1.05rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 600;
    font-size: 0.9rem;
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

  .bsf-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
  }

  .bsf-nav .fs-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .bsf-results {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 1.25rem;
    align-items: start;
    padding: 1.15rem;
    border-radius: var(--section-radius, 16px);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, #fbf5f8));
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bsf-results__title {
    grid-column: 1 / -1;
    margin: 0;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bsf-results__count {
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
  }

  .bsf-results__actions {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
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
    gap: 0.65rem;
    padding: 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.9);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bsf-detail__media {
    aspect-ratio: 4 / 3;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    box-shadow: inset 0 -40px 50px rgba(0, 0, 0, 0.12);
  }

  .bsf-detail__name {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bsf-detail__number {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
  }

  .bsf-detail__desc {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--muted-color, #8f7a86);
  }

  .bsf-detail__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bsf-detail__chip {
    opacity: 0.55;
  }

  .bsf-detail__chip--on {
    opacity: 1;
  }

  .bsf-detail__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.15rem;
  }

  @media (max-width: 720px) {
    .bsf-results {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bsf-chip,
    .bsf-swatch__chip,
    .bsf-progress__bar span {
      transition: none;
    }
  }
`, R = [
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
function D() {
  return I() === "en";
}
function P(l) {
  const e = D();
  return R.map((s) => {
    const a = b(l[s.labelKey]) || (e ? s.labelEn : s.labelAr), t = s.options.map((r) => ({
      value: r.value,
      label: e ? r.en : r.ar
    }));
    return { key: s.key, label: a, options: t };
  });
}
function m(l, e) {
  const s = l[e] ?? l[`bsf_shades.${e}`];
  return x(s, "").toLowerCase().trim();
}
function A(l) {
  return w(l).map((e, s) => {
    const a = b(e.shade_name);
    return {
      id: `shade-${s}`,
      hex: b(e.hex) || "#d9b48f",
      shade_name: a,
      shade_number: b(e.shade_number),
      name: a,
      desc: b(e.desc),
      link: S(e.link),
      product_type: m(e, "product_type"),
      skin: m(e, "skin"),
      undertone: m(e, "undertone"),
      result: m(e, "result")
    };
  }).filter((e) => e.shade_name || e.hex);
}
function O(l, e) {
  const s = ["product_type", "skin", "undertone", "result"], a = l.filter(
    (r) => s.every((o) => {
      const n = e[o];
      if (!n) return !0;
      const p = r[o];
      return !p || p === n;
    })
  );
  if (a.length) return a;
  const t = l.filter((r) => {
    const o = !e.product_type || !r.product_type || r.product_type === e.product_type, n = !e.skin || !r.skin || r.skin === e.skin;
    return o && n;
  });
  return t.length ? t : l;
}
var B = Object.defineProperty, h = (l, e, s, a) => {
  for (var t = void 0, r = l.length - 1, o; r >= 0; r--)
    (o = l[r]) && (t = o(e, s, t) || t);
  return t && B(e, s, t), t;
};
const v = class v extends k {
  constructor() {
    super(...arguments), this.config = {}, this.selection = {}, this.shades = [], this.selectedShadeId = "", this.stepIndex = 0, this.boundLangHandler = () => this.requestUpdate();
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
    this.shades = A((e = this.config) == null ? void 0 : e.bsf_shades), this.ensureSelectedShade();
  }
  get steps() {
    return P(this.config || {});
  }
  get onResults() {
    return this.stepIndex >= this.steps.length;
  }
  get filtered() {
    return O(this.shades, this.selection);
  }
  ensureSelectedShade() {
    var s;
    const e = this.filtered;
    e.some((a) => a.id === this.selectedShadeId) || (this.selectedShadeId = ((s = e[0]) == null ? void 0 : s.id) ?? "");
  }
  get selectedShade() {
    return this.filtered.find((e) => e.id === this.selectedShadeId) || null;
  }
  pick(e, s) {
    this.selection = { ...this.selection, [e]: s }, this.ensureSelectedShade();
  }
  goNext() {
    const e = this.steps.length;
    this.stepIndex < e && (this.stepIndex += 1);
  }
  goBack() {
    this.stepIndex > 0 && (this.stepIndex -= 1);
  }
  reset() {
    this.selection = {}, this.stepIndex = 0, this.ensureSelectedShade();
  }
  selectShade(e) {
    this.selectedShadeId = e;
  }
  label(e, s, a) {
    var t;
    return b((t = this.config) == null ? void 0 : t[e]) || d(s, a);
  }
  renderProgress(e) {
    const s = Math.min(this.stepIndex + 1, e), a = e ? Math.round(Math.min(this.stepIndex, e) / e * 100) : 0;
    return i`
      <div class="bsf-progress" aria-hidden="true">
        <div class="bsf-progress__bar"><span style=${u({ width: `${a}%` })}></span></div>
        <span class="bsf-progress__text">
          ${this.onResults ? d("النتيجة", "Result") : d(`السؤال ${s} من ${e}`, `Question ${s} of ${e}`)}
        </span>
      </div>
    `;
  }
  renderQuestion(e) {
    const s = e.key === "undertone" ? this.label(
      "bsf_undertone_hint",
      "نصيحة: الأوردة الخضراء غالبًا دافئة، والزرقاء باردة، والمختلطة محايدة.",
      "Tip: greenish veins often mean warm, bluish mean cool, mixed mean neutral."
    ) : "";
    return i`
      <div class="bsf-question">
        <h3 class="bsf-question__title">${e.label}</h3>
        ${s ? i`<p class="bsf-question__hint">${s}</p>` : c}
        <div class="bsf-chips" role="group" aria-label=${e.label}>
          ${e.options.map((a) => {
      const t = this.selection[e.key] === a.value;
      return i`<button
              type="button"
              class="bsf-chip"
              aria-pressed=${t ? "true" : "false"}
              @click=${() => this.pick(e.key, a.value)}
            >
              ${a.label}
            </button>`;
    })}
        </div>
      </div>
    `;
  }
  renderNav(e) {
    const s = this.label("bsf_back_btn", "السابق", "Back"), a = this.label("bsf_next_btn", "التالي", "Next"), t = this.label("bsf_see_btn", "عرض الدرجات", "See shades"), r = this.stepIndex === this.steps.length - 1;
    return i`
      <div class="bsf-nav">
        ${this.stepIndex > 0 ? i`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
              ${s}
            </button>` : i`<span></span>`}
        <button
          type="button"
          class="fs-btn fs-tap"
          ?disabled=${!e}
          @click=${() => this.goNext()}
        >
          ${r ? t : a}
        </button>
      </div>
    `;
  }
  matchChips(e) {
    const s = this.steps, a = [];
    for (const t of s) {
      const r = this.selection[t.key];
      if (!r) continue;
      const o = e[t.key], n = t.options.find((p) => p.value === r);
      a.push({
        label: (n == null ? void 0 : n.label) || r,
        active: !o || o === r
      });
    }
    return a;
  }
  renderDetail(e, s) {
    const a = e.link ? E(e.link) : !1, t = this.matchChips(e);
    return i`
      <div class="bsf-detail" aria-live="polite">
        <div
          class="bsf-detail__media"
          style=${u({ background: e.hex })}
          role="img"
          aria-label=${e.name || e.shade_number || d("عينة اللون", "Shade swatch")}
        ></div>
        <h4 class="bsf-detail__name">
          ${e.name || d("درجة مقترحة", "Suggested shade")}
          ${e.shade_number ? i`<span class="bsf-detail__number"> · ${e.shade_number}</span>` : c}
        </h4>
        ${e.desc ? i`<p class="bsf-detail__desc">${e.desc}</p>` : c}
        ${t.length ? i`<div class="bsf-detail__chips" aria-label=${d("سبب المطابقة", "Match reasons")}>
              ${t.map(
      (r) => i`<span
                  class=${_({
        "fs-pill": !0,
        "bsf-detail__chip": !0,
        "bsf-detail__chip--on": r.active
      })}
                >${r.label}</span>`
    )}
            </div>` : c}
        ${s && e.link ? i`<div class="bsf-detail__actions">
              <a
                class="fs-btn fs-btn--ghost"
                href=${e.link}
                target=${a ? "_blank" : "_self"}
                rel=${a ? "noopener noreferrer" : c}
              >
                ${d("التفاصيل", "Details")}
              </a>
            </div>` : c}
      </div>
    `;
  }
  renderResults() {
    const e = this.config || {}, s = this.filtered, a = this.selectedShade, t = L(e.bsf_show_link, !0), r = x(e.bsf_swatch_shape, "circle"), o = this.label(
      "bsf_results_title",
      "الدرجات المناسبة لكِ",
      "Shades that suit you"
    );
    return i`
      <div class="bsf-results">
        <h3 class="bsf-results__title">
          ${o}
          <span class="bsf-results__count"> · ${s.length}</span>
        </h3>
        <div class="bsf-swatches" role="listbox" aria-label=${o}>
          ${s.map((n) => {
      const p = n.id === this.selectedShadeId;
      return i`<button
              type="button"
              class=${_({
        "bsf-swatch": !0,
        "bsf-swatch--square": r === "square",
        "bsf-swatch--rounded": r === "rounded"
      })}
              role="option"
              aria-selected=${p ? "true" : "false"}
              aria-pressed=${p ? "true" : "false"}
              aria-label=${n.name || n.shade_number || d("درجة", "Shade")}
              @click=${() => this.selectShade(n.id)}
            >
              <span class="bsf-swatch__chip" style=${u({ background: n.hex })}></span>
              ${n.shade_number || n.shade_name ? i`<span class="bsf-swatch__name">${n.shade_number || n.shade_name}</span>` : c}
            </button>`;
    })}
        </div>
        ${a ? this.renderDetail(a, t) : i`<p class="fs-empty">${d("لا توجد درجات مطابقة", "No matching shades")}</p>`}
        <div class="bsf-results__actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
            ${this.label("bsf_back_btn", "تعديل الإجابات", "Edit answers")}
          </button>
          <button type="button" class="fs-btn fs-tap" @click=${() => this.reset()}>
            ${this.label("bsf_reset_btn", "ابدئي من جديد", "Start over")}
          </button>
        </div>
      </div>
    `;
  }
  render() {
    const e = this.config || {}, s = M(e, "bsf_"), a = s.animate && !z(), t = b(e.bsf_title), r = b(e.bsf_desc), o = this.steps, n = o[this.stepIndex], p = n ? !!this.selection[n.key] : !1;
    return this.shades.length ? i`
      <section
        class=${_({ "fs-section": !0, "fs-animate": a })}
        style=${u(q(s))}
        aria-label=${t || d("محدد درجة المكياج المناسبة", "Beauty shade finder")}
      >
        <div class="fs-container">
          ${t || r ? i`<div class="fs-header">
                ${t ? i`<h2 class="fs-title">${t}</h2>` : c}
                ${r ? i`<p class="fs-desc">${r}</p>` : c}
              </div>` : c}

          <div class="bsf-wrap">
            ${this.renderProgress(o.length)}
            ${this.onResults ? this.renderResults() : i`
                  ${n ? this.renderQuestion(n) : c}
                  ${this.renderNav(p)}
                `}
          </div>
        </div>
      </section>
    ` : i`<div class="fs-empty" role="status">
        ${d("أضيفي درجات المكياج من إعدادات العنصر", "Add makeup shades in the element settings")}
      </div>`;
  }
};
v.styles = [C, N];
let f = v;
h([
  $({ type: Object })
], f.prototype, "config");
h([
  g()
], f.prototype, "selection");
h([
  g()
], f.prototype, "shades");
h([
  g()
], f.prototype, "selectedShadeId");
h([
  g()
], f.prototype, "stepIndex");
typeof f < "u" && f.registerSallaComponent("salla-beauty-shade-finder");
export {
  f as default
};
