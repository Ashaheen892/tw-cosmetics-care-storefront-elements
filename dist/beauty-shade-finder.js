import { css as w, LitElement as k, html as i, nothing as c } from "lit";
import { property as $, state as g } from "lit/decorators.js";
import { classMap as v } from "lit/directives/class-map.js";
import { styleMap as u } from "lit/directives/style-map.js";
import { n as S, l as p, c as I, g as y, o as C, s as z, t as d, q, i as E, r as L, p as M, a as N, b as R } from "./sharedStyles-BgfDOkwJ.js";
const D = w`
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
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #7b2c52)
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
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, #fff);
    border-inline-start: 3px solid var(--accent-color, var(--fs-store-primary));
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
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #f2dde7));
  }

  .bsf-chip[aria-pressed='true'] {
    background: var(--accent-color, var(--fs-store-primary));
    border-color: var(--accent-color, var(--fs-store-primary));
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
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.95fr);
    gap: 1.25rem;
    align-items: start;
    padding: 1.25rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, #fbf5f8));
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 90%, #fff);
    box-shadow: 0 12px 30px rgba(120, 44, 82, 0.05);
  }

  .bsf-results__head {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .bsf-results__title {
    margin: 0;
    font-size: 1.08rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bsf-results__count {
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.65rem;
    display: inline-grid;
    place-items: center;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 800;
    color: #fff;
    background: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
  }

  .bsf-results__actions {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .bsf-swatches {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(4.6rem, 1fr));
    gap: 0.75rem 0.55rem;
    padding: 0.85rem;
    border-radius: 16px;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 85%, #fff);
    max-height: min(420px, 55vh);
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .bsf-swatch {
    position: relative;
    display: grid;
    gap: 0.4rem;
    justify-items: center;
    padding: 0.35rem 0.2rem;
    border: none;
    background: none;
    cursor: pointer;
    text-align: center;
    font: inherit;
  }

  .bsf-swatch__ring {
    width: 3.6rem;
    height: 3.6rem;
    padding: 3px;
    border-radius: 999px;
    box-sizing: border-box;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 70%, #fff);
    transition:
      background 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  .bsf-swatch__chip {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      inset 0 -8px 14px rgba(0, 0, 0, 0.16),
      0 4px 10px rgba(43, 33, 28, 0.12);
  }

  .bsf-swatch--square .bsf-swatch__ring,
  .bsf-swatch--square .bsf-swatch__chip {
    border-radius: 12px;
  }

  .bsf-swatch--rounded .bsf-swatch__ring,
  .bsf-swatch--rounded .bsf-swatch__chip {
    border-radius: 18px;
  }

  .bsf-swatch:hover .bsf-swatch__ring {
    transform: translateY(-2px) scale(1.04);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #f2dde7));
  }

  .bsf-swatch.is-active .bsf-swatch__ring,
  .bsf-swatch[aria-pressed='true'] .bsf-swatch__ring {
    background: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      0 0 0 4px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent),
      0 8px 18px rgba(120, 44, 82, 0.16);
    transform: scale(1.06);
  }

  .bsf-swatch__name {
    width: 100%;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bsf-swatch.is-active .bsf-swatch__name,
  .bsf-swatch[aria-pressed='true'] .bsf-swatch__name {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bsf-detail {
    display: grid;
    gap: 0.75rem;
    padding: 1rem 1.05rem 1.1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 90%, #fff);
    box-shadow: 0 10px 26px rgba(120, 44, 82, 0.06);
  }

  .bsf-detail__media {
    aspect-ratio: 16 / 10;
    border-radius: 14px;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.28),
      inset 0 -36px 48px rgba(0, 0, 0, 0.14),
      0 8px 20px rgba(43, 33, 28, 0.1);
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 55%, transparent);
  }

  .bsf-detail__name {
    margin: 0;
    font-size: 1.08rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bsf-detail__number {
    font-size: 0.84rem;
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
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
    opacity: 0.5;
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

    .bsf-swatches {
      grid-template-columns: repeat(auto-fill, minmax(4.2rem, 1fr));
      max-height: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bsf-chip,
    .bsf-swatch__ring,
    .bsf-progress__bar span {
      transition: none;
    }
  }
`, O = [
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
  return C() === "en";
}
function A(l) {
  const e = P();
  return O.map((s) => {
    const r = p(l[s.labelKey]) || (e ? s.labelEn : s.labelAr), t = s.options.map((a) => ({
      value: a.value,
      label: e ? a.en : a.ar
    }));
    return { key: s.key, label: r, options: t };
  });
}
function m(l, e) {
  const s = l[e] ?? l[`bsf_shades.${e}`];
  return y(s, "").toLowerCase().trim();
}
function j(l) {
  return S(l).map((e, s) => {
    const r = p(e.shade_name);
    return {
      id: `shade-${s}`,
      hex: p(e.hex) || "#d9b48f",
      shade_name: r,
      shade_number: p(e.shade_number),
      name: r,
      desc: p(e.desc),
      link: I(e.link),
      product_type: m(e, "product_type"),
      skin: m(e, "skin"),
      undertone: m(e, "undertone"),
      result: m(e, "result")
    };
  }).filter((e) => e.shade_name || e.hex);
}
function B(l, e) {
  const s = ["product_type", "skin", "undertone", "result"], r = l.filter(
    (a) => s.every((o) => {
      const n = e[o];
      if (!n) return !0;
      const f = a[o];
      return !f || f === n;
    })
  );
  if (r.length) return r;
  const t = l.filter((a) => {
    const o = !e.product_type || !a.product_type || a.product_type === e.product_type, n = !e.skin || !a.skin || a.skin === e.skin;
    return o && n;
  });
  return t.length ? t : l;
}
var K = Object.defineProperty, h = (l, e, s, r) => {
  for (var t = void 0, a = l.length - 1, o; a >= 0; a--)
    (o = l[a]) && (t = o(e, s, t) || t);
  return t && K(e, s, t), t;
};
const x = class x extends k {
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
    this.shades = j((e = this.config) == null ? void 0 : e.bsf_shades), this.ensureSelectedShade();
  }
  get steps() {
    return A(this.config || {});
  }
  get onResults() {
    return this.stepIndex >= this.steps.length;
  }
  get filtered() {
    return B(this.shades, this.selection);
  }
  ensureSelectedShade() {
    var s;
    const e = this.filtered;
    e.some((r) => r.id === this.selectedShadeId) || (this.selectedShadeId = ((s = e[0]) == null ? void 0 : s.id) ?? "");
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
  label(e, s, r) {
    var t;
    return p((t = this.config) == null ? void 0 : t[e]) || d(s, r);
  }
  renderProgress(e) {
    const s = Math.min(this.stepIndex + 1, e), r = e ? Math.round(Math.min(this.stepIndex, e) / e * 100) : 0;
    return i`
      <div class="bsf-progress" aria-hidden="true">
        <div class="bsf-progress__bar"><span style=${u({ width: `${r}%` })}></span></div>
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
          ${e.options.map((r) => {
      const t = this.selection[e.key] === r.value;
      return i`<button
              type="button"
              class="bsf-chip"
              aria-pressed=${t ? "true" : "false"}
              @click=${() => this.pick(e.key, r.value)}
            >
              ${r.label}
            </button>`;
    })}
        </div>
      </div>
    `;
  }
  renderNav(e) {
    const s = this.label("bsf_back_btn", "السابق", "Back"), r = this.label("bsf_next_btn", "التالي", "Next"), t = this.label("bsf_see_btn", "عرض الدرجات", "See shades"), a = this.stepIndex === this.steps.length - 1;
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
          ${a ? t : r}
        </button>
      </div>
    `;
  }
  matchChips(e) {
    const s = this.steps, r = [];
    for (const t of s) {
      const a = this.selection[t.key];
      if (!a) continue;
      const o = e[t.key], n = t.options.find((f) => f.value === a);
      r.push({
        label: (n == null ? void 0 : n.label) || a,
        active: !o || o === a
      });
    }
    return r;
  }
  renderDetail(e, s) {
    const r = e.link ? q(e.link) : !1, t = this.matchChips(e);
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
      (a) => i`<span
                  class=${v({
        "fs-pill": !0,
        "bsf-detail__chip": !0,
        "bsf-detail__chip--on": a.active
      })}
                >${a.label}</span>`
    )}
            </div>` : c}
        ${s && e.link ? i`<div class="bsf-detail__actions">
              <a
                class="fs-btn fs-btn--ghost"
                href=${e.link}
                target=${r ? "_blank" : "_self"}
                rel=${r ? "noopener noreferrer" : c}
              >
                ${d("التفاصيل", "Details")}
              </a>
            </div>` : c}
      </div>
    `;
  }
  renderResults() {
    const e = this.config || {}, s = this.filtered, r = this.selectedShade, t = E(e.bsf_show_link, !0), a = y(e.bsf_swatch_shape, "circle"), o = this.label(
      "bsf_results_title",
      "الدرجات المناسبة لكِ",
      "Shades that suit you"
    );
    return i`
      <div class="bsf-results">
        <div class="bsf-results__head">
          <h3 class="bsf-results__title">${o}</h3>
          <span class="bsf-results__count">${s.length}</span>
        </div>
        <div class="bsf-swatches" role="listbox" aria-label=${o}>
          ${s.map((n) => {
      const f = n.id === this.selectedShadeId, _ = n.shade_number || n.shade_name || n.name;
      return i`<button
              type="button"
              class=${v({
        "bsf-swatch": !0,
        "bsf-swatch--square": a === "square",
        "bsf-swatch--rounded": a === "rounded",
        "is-active": f
      })}
              role="option"
              aria-selected=${f ? "true" : "false"}
              aria-pressed=${f ? "true" : "false"}
              aria-label=${n.name || _ || d("درجة", "Shade")}
              @click=${() => this.selectShade(n.id)}
            >
              <span class="bsf-swatch__ring">
                <span class="bsf-swatch__chip" style=${u({ background: n.hex || "#c4a484" })}></span>
              </span>
              ${_ ? i`<span class="bsf-swatch__name">${_}</span>` : c}
            </button>`;
    })}
        </div>
        ${r ? this.renderDetail(r, t) : i`<p class="fs-empty">${d("لا توجد درجات مطابقة", "No matching shades")}</p>`}
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
    const e = this.config || {}, s = L(e, "bsf_"), r = s.animate && !M(), t = p(e.bsf_title), a = p(e.bsf_desc), o = this.steps, n = o[this.stepIndex], f = n ? !!this.selection[n.key] : !1;
    return this.shades.length ? i`
      <section
        class=${v({ "fs-section": !0, "fs-animate": r })}
        style=${u(N(s))}
        aria-label=${t || d("محدد درجة المكياج المناسبة", "Beauty shade finder")}
      >
        <div class="fs-container">
          ${t || a ? i`<div class="fs-header">
                ${t ? i`<h2 class="fs-title">${t}</h2>` : c}
                ${a ? i`<p class="fs-desc">${a}</p>` : c}
              </div>` : c}

          <div class="bsf-wrap">
            ${this.renderProgress(o.length)}
            ${this.onResults ? this.renderResults() : i`
                  ${n ? this.renderQuestion(n) : c}
                  ${this.renderNav(f)}
                `}
          </div>
          ${this.onResults ? R({ config: e, prefix: "bsf_", ready: !0 }) : c}
        </div>
      </section>
    ` : i`<div class="fs-empty" role="status">
        ${d("أضيفي درجات المكياج من إعدادات العنصر", "Add makeup shades in the element settings")}
      </div>`;
  }
};
x.styles = [z, D];
let b = x;
h([
  $({ type: Object })
], b.prototype, "config");
h([
  g()
], b.prototype, "selection");
h([
  g()
], b.prototype, "shades");
h([
  g()
], b.prototype, "selectedShadeId");
h([
  g()
], b.prototype, "stepIndex");
typeof b < "u" && b.registerSallaComponent("salla-beauty-shade-finder");
export {
  b as default
};
