import { css as S, LitElement as I, html as n, nothing as f } from "lit";
import { property as C, state as v } from "lit/decorators.js";
import { classMap as y } from "lit/directives/class-map.js";
import { styleMap as g } from "lit/directives/style-map.js";
import { n as z, l as c, b as q, g as $, o as E, s as L, t as l, d as M, i as N, r as R, p as D, a as P } from "./sharedStyles-DKbcXBPy.js";
import { r as A } from "./commerceOutcome-Dk8p2VWM.js";
const B = S`
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
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, #fff);
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
    color: var(--muted-color, #666666);
  }

  .bsf-question {
    display: grid;
    gap: 0.75rem;
    padding: 1.15rem 1.2rem;
    border-radius: var(--section-radius, 16px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 8px 24px rgba(194, 82, 127, 0.06);
  }

  .bsf-question__title {
    margin: 0;
    font-size: 1.12rem;
    font-weight: 800;
    line-height: 1.35;
    color: var(--text-color, #000000);
  }

  .bsf-question__hint {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
    padding: 0.7rem 0.85rem;
    border-radius: 12px;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 14%,
      var(--fs-surface, var(--card-bg, #f0f0f0))
    );
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 75%, transparent);
    border-inline-start: 3px solid var(--accent-color, var(--fs-store-primary));
  }

  :host([data-fs-theme='dark']) .bsf-question__hint {
    color: #ffffff;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 18%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: rgba(255, 255, 255, 0.12);
  }

  .bsf-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .bsf-chip {
    min-height: 44px;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
      transform 0.15s ease;
  }

  .bsf-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .bsf-chip[aria-pressed='true'] {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
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
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
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
    color: var(--text-color, #000000);
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
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 85%, #fff);
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
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, #fff);
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
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #e5e7eb));
  }

  .bsf-swatch.is-active .bsf-swatch__ring,
  .bsf-swatch[aria-pressed='true'] .bsf-swatch__ring {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    box-shadow:
      0 0 0 4px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent),
      0 8px 18px rgba(120, 44, 82, 0.16);
    transform: scale(1.06);
  }

  .bsf-swatch__name {
    width: 100%;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
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
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow: 0 10px 26px rgba(120, 44, 82, 0.06);
  }

  .bsf-detail__media {
    aspect-ratio: 16 / 10;
    border-radius: 14px;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.28),
      inset 0 -36px 48px rgba(0, 0, 0, 0.14),
      0 8px 20px rgba(43, 33, 28, 0.1);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 55%, transparent);
  }

  .bsf-detail__name {
    margin: 0;
    font-size: 1.08rem;
    font-weight: 800;
    color: var(--text-color, #000000);
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
    color: var(--muted-color, #666666);
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
function j() {
  return E() === "en";
}
function K(d) {
  const e = j();
  return O.map((s) => {
    const a = c(d[s.labelKey]) || (e ? s.labelEn : s.labelAr), t = s.options.map((r) => ({
      value: r.value,
      label: e ? r.en : r.ar
    }));
    return { key: s.key, label: a, options: t };
  });
}
function m(d, e) {
  const s = d[e] ?? d[`bsf_shades.${e}`];
  return $(s, "").toLowerCase().trim();
}
function T(d) {
  return z(d).map((e, s) => {
    const a = c(e.shade_name);
    return {
      id: `shade-${s}`,
      hex: c(e.hex) || "#d9b48f",
      shade_name: a,
      shade_number: c(e.shade_number),
      name: a,
      desc: c(e.desc),
      link: q(e.link),
      product_type: m(e, "product_type"),
      skin: m(e, "skin"),
      undertone: m(e, "undertone"),
      result: m(e, "result")
    };
  }).filter((e) => e.shade_name || e.hex);
}
function V(d, e) {
  const s = ["product_type", "skin", "undertone", "result"], a = d.filter(
    (r) => s.every((i) => {
      const o = e[i];
      if (!o) return !0;
      const b = r[i];
      return !b || b === o;
    })
  );
  if (a.length) return a;
  const t = d.filter((r) => {
    const i = !e.product_type || !r.product_type || r.product_type === e.product_type, o = !e.skin || !r.skin || r.skin === e.skin;
    return i && o;
  });
  return t.length ? t : d;
}
var Q = Object.defineProperty, u = (d, e, s, a) => {
  for (var t = void 0, r = d.length - 1, i; r >= 0; r--)
    (i = d[r]) && (t = i(e, s, t) || t);
  return t && Q(e, s, t), t;
};
const w = class w extends I {
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
    this.shades = T((e = this.config) == null ? void 0 : e.bsf_shades), this.ensureSelectedShade();
  }
  get steps() {
    return K(this.config || {});
  }
  get onResults() {
    return this.stepIndex >= this.steps.length;
  }
  get filtered() {
    return V(this.shades, this.selection);
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
  renderProgress(e) {
    const s = Math.min(this.stepIndex + 1, e), a = e ? Math.round(Math.min(this.stepIndex, e) / e * 100) : 0;
    return n`
      <div class="bsf-progress" aria-hidden="true">
        <div class="bsf-progress__bar"><span style=${g({ width: `${a}%` })}></span></div>
        <span class="bsf-progress__text">
          ${this.onResults ? l("النتيجة", "Result") : l(`السؤال ${s} من ${e}`, `Question ${s} of ${e}`)}
        </span>
      </div>
    `;
  }
  renderQuestion(e) {
    var a;
    const s = e.key === "undertone" ? c((a = this.config) == null ? void 0 : a.bsf_undertone_hint) || l("نصيحة: الأوردة الخضراء غالبًا دافئة، والزرقاء باردة، والمختلطة محايدة.", "Tip: greenish veins often mean warm, bluish mean cool, mixed mean neutral.") : "";
    return n`
      <div class="bsf-question">
        <h3 class="bsf-question__title">${e.label}</h3>
        ${s ? n`<p class="bsf-question__hint">${s}</p>` : f}
        <div class="bsf-chips" role="group" aria-label=${e.label}>
          ${e.options.map((t) => {
      const r = this.selection[e.key] === t.value;
      return n`<button
              type="button"
              class="bsf-chip"
              aria-pressed=${r ? "true" : "false"}
              @click=${() => this.pick(e.key, t.value)}
            >
              ${t.label}
            </button>`;
    })}
        </div>
      </div>
    `;
  }
  renderNav(e) {
    var i, o, b;
    const s = c((i = this.config) == null ? void 0 : i.bsf_back_btn) || l("السابق", "Back"), a = c((o = this.config) == null ? void 0 : o.bsf_next_btn) || l("التالي", "Next"), t = c((b = this.config) == null ? void 0 : b.bsf_see_btn) || l("عرض الدرجات", "See shades"), r = this.stepIndex === this.steps.length - 1;
    return n`
      <div class="bsf-nav">
        ${this.stepIndex > 0 ? n`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
              ${s}
            </button>` : n`<span></span>`}
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
      const i = e[t.key], o = t.options.find((b) => b.value === r);
      a.push({
        label: (o == null ? void 0 : o.label) || r,
        active: !i || i === r
      });
    }
    return a;
  }
  renderDetail(e, s) {
    const a = e.link ? M(e.link) : !1, t = this.matchChips(e);
    return n`
      <div class="bsf-detail" aria-live="polite">
        <div
          class="bsf-detail__media"
          style=${g({ background: e.hex })}
          role="img"
          aria-label=${e.name || e.shade_number || l("عينة اللون", "Shade swatch")}
        ></div>
        <h4 class="bsf-detail__name">
          ${e.name || l("درجة مقترحة", "Suggested shade")}
          ${e.shade_number ? n`<span class="bsf-detail__number"> · ${e.shade_number}</span>` : f}
        </h4>
        ${e.desc ? n`<p class="bsf-detail__desc">${e.desc}</p>` : f}
        ${t.length ? n`<div class="bsf-detail__chips" aria-label=${l("سبب المطابقة", "Match reasons")}>
              ${t.map(
      (r) => n`<span
                  class=${y({
        "fs-pill": !0,
        "bsf-detail__chip": !0,
        "bsf-detail__chip--on": r.active
      })}
                >${r.label}</span>`
    )}
            </div>` : f}
        ${s && e.link ? n`<div class="bsf-detail__actions">
              <a
                class="fs-btn fs-btn--ghost"
                href=${e.link}
                target=${a ? "_blank" : "_self"}
                rel=${a ? "noopener noreferrer" : f}
              >
                ${l("التفاصيل", "Details")}
              </a>
            </div>` : f}
      </div>
    `;
  }
  renderResults() {
    var o, b, k;
    const e = this.config || {}, s = this.filtered, a = this.selectedShade, t = N(e.bsf_show_link, !0), r = $(e.bsf_swatch_shape, "circle"), i = c((o = this.config) == null ? void 0 : o.bsf_results_title) || l("الدرجات المناسبة لكِ", "Shades that suit you");
    return n`
      <div class="bsf-results">
        <div class="bsf-results__head">
          <h3 class="bsf-results__title">${i}</h3>
          <span class="bsf-results__count">${s.length}</span>
        </div>
        <div class="bsf-swatches" role="listbox" aria-label=${i}>
          ${s.map((h) => {
      const _ = h.id === this.selectedShadeId, x = h.shade_number || h.shade_name || h.name;
      return n`<button
              type="button"
              class=${y({
        "bsf-swatch": !0,
        "bsf-swatch--square": r === "square",
        "bsf-swatch--rounded": r === "rounded",
        "is-active": _
      })}
              role="option"
              aria-selected=${_ ? "true" : "false"}
              aria-pressed=${_ ? "true" : "false"}
              aria-label=${h.name || x || l("درجة", "Shade")}
              @click=${() => this.selectShade(h.id)}
            >
              <span class="bsf-swatch__ring">
                <span class="bsf-swatch__chip" style=${g({ background: h.hex || "#c4a484" })}></span>
              </span>
              ${x ? n`<span class="bsf-swatch__name">${x}</span>` : f}
            </button>`;
    })}
        </div>
        ${a ? this.renderDetail(a, t) : n`<p class="fs-empty">${l("لا توجد درجات مطابقة", "No matching shades")}</p>`}
        <div class="bsf-results__actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
            ${c((b = this.config) == null ? void 0 : b.bsf_back_btn) || l("تعديل الإجابات", "Edit answers")}
          </button>
          <button type="button" class="fs-btn fs-tap" @click=${() => this.reset()}>
            ${c((k = this.config) == null ? void 0 : k.bsf_reset_btn) || l("ابدئي من جديد", "Start over")}
          </button>
          ${A(e, "bsf_")}
        </div>
      </div>
    `;
  }
  render() {
    const e = this.config || {}, s = R(e, "bsf_"), a = s.animate && !D(), t = c(e.bsf_title), r = c(e.bsf_desc), i = this.steps, o = i[this.stepIndex], b = o ? !!this.selection[o.key] : !1;
    return this.shades.length ? n`
      <section
        class=${y({ "fs-section": !0, "fs-animate": a })}
        style=${g(P(s))}
        aria-label=${t || l("محدد درجة المكياج المناسبة", "Beauty shade finder")}
      >
        <div class="fs-container">
          ${t || r ? n`<div class="fs-header">
                ${t ? n`<h2 class="fs-title">${t}</h2>` : f}
                ${r ? n`<p class="fs-desc">${r}</p>` : f}
              </div>` : f}

          <div class="bsf-wrap">
            ${this.renderProgress(i.length)}
            ${this.onResults ? this.renderResults() : n`
                  ${o ? this.renderQuestion(o) : f}
                  ${this.renderNav(b)}
                `}
          </div>
        </div>
      </section>
    ` : n`<div class="fs-empty" role="status">
        ${l("أضيفي درجات المكياج من إعدادات العنصر", "Add makeup shades in the element settings")}
      </div>`;
  }
};
w.styles = [L, B];
let p = w;
u([
  C({ type: Object })
], p.prototype, "config");
u([
  v()
], p.prototype, "selection");
u([
  v()
], p.prototype, "shades");
u([
  v()
], p.prototype, "selectedShadeId");
u([
  v()
], p.prototype, "stepIndex");
typeof p < "u" && p.registerSallaComponent("salla-beauty-shade-finder");
export {
  p as default
};
