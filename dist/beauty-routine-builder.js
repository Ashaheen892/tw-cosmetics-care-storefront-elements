import { css as w, LitElement as E, html as n, nothing as c } from "lit";
import { property as I, state as g } from "lit/decorators.js";
import { classMap as _ } from "lit/directives/class-map.js";
import { styleMap as y } from "lit/directives/style-map.js";
import { n as S, l as b, b as z, e as C, j as L, g as k, s as M, t as o, i as R, r as q, p as K, a as N } from "./sharedStyles-DKbcXBPy.js";
import { r as A } from "./commerceOutcome-Dk8p2VWM.js";
const D = w`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .brb-shell {
    position: relative;
    border-radius: var(--section-radius, 16px);
    overflow: hidden;
  }

  .brb-shell__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.16;
    z-index: 0;
  }

  .brb-inner {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 1.25rem;
    width: 100%;
    max-width: 760px;
    margin-inline: auto;
    padding: 1.15rem;
    box-sizing: border-box;
  }

  .brb-inner:has(.brb-results) {
    max-width: 880px;
  }

  .brb-progress {
    display: grid;
    gap: 0.45rem;
  }

  .brb-progress__bar {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, #fff);
    overflow: hidden;
  }

  .brb-progress__bar span {
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

  .brb-progress__text {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted-color, #666666);
  }

  .brb-question {
    display: grid;
    gap: 0.75rem;
    padding: 1.15rem 1.2rem;
    border-radius: var(--section-radius, 16px);
    background: color-mix(in srgb, var(--card-bg, #fff) 90%, var(--section-bg, transparent));
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 8px 24px rgba(194, 82, 127, 0.06);
  }

  .brb-question__title {
    margin: 0;
    font-size: 1.12rem;
    font-weight: 800;
    line-height: 1.35;
    color: var(--text-color, #000000);
  }

  .brb-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .brb-chip {
    min-height: 44px;
    padding: 0.55rem 1.05rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
      transform 0.15s ease;
  }

  .brb-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .brb-chip[aria-pressed='true'] {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    border-color: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    transform: translateY(-1px);
  }

  .brb-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
  }

  .brb-nav .fs-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .brb-results {
    display: grid;
    gap: 0.9rem;
  }

  .brb-routine__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .brb-routine__title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .brb-routine__count {
    font-weight: 600;
    color: var(--muted-color, #666666);
  }

  .brb-results__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .brb-timeline {
    display: grid;
    gap: 0.85rem;
  }

  .brb-step {
    position: relative;
    display: grid;
    grid-template-columns: auto 84px 1fr;
    gap: 0.9rem;
    align-items: center;
    padding: 0.75rem;
    border-radius: var(--card-radius, 14px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 6px 18px rgba(43, 33, 28, 0.05);
  }

  .brb-step__num {
    display: grid;
    place-items: center;
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-weight: 800;
    font-size: 0.95rem;
  }

  .brb-step__thumb {
    width: 84px;
    height: 84px;
    border-radius: calc(var(--card-radius, 14px) * 0.7);
    object-fit: cover;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 45%, #fff);
  }

  .brb-step__body {
    display: grid;
    gap: 0.28rem;
    min-width: 0;
  }

  .brb-step__name {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 700;
    color: var(--text-color, #000000);
  }

  .brb-step__desc {
    margin: 0;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
    line-height: 1.5;
  }

  .brb-step__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.2rem;
  }


  .brb-card--sharp {
    --card-radius: 4px;
  }

  .brb-card--pill {
    --card-radius: 26px;
  }

  @media (max-width: 640px) {
    .brb-step {
      grid-template-columns: auto 64px 1fr;
      gap: 0.6rem;
    }
    .brb-step__thumb {
      width: 64px;
      height: 64px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .brb-chip,
    .brb-progress__bar span {
      transition: none;
    }
  }
`, O = [
  {
    key: "skin",
    labelKey: "brb_q_skin_label",
    labelAr: "نوع البشرة",
    labelEn: "Skin type",
    options: [
      { value: "dry", ar: "جافة", en: "Dry" },
      { value: "oily", ar: "دهنية", en: "Oily" },
      { value: "combination", ar: "مختلطة", en: "Combination" },
      { value: "normal", ar: "عادية", en: "Normal" },
      { value: "sensitive", ar: "حساسة", en: "Sensitive" }
    ]
  },
  {
    key: "concern",
    labelKey: "brb_q_concern_label",
    labelAr: "المشكلة الأساسية",
    labelEn: "Main concern",
    options: [
      { value: "dryness", ar: "الجفاف", en: "Dryness" },
      { value: "acne", ar: "الحبوب", en: "Acne" },
      { value: "pigmentation", ar: "التصبغات", en: "Pigmentation" },
      { value: "pores", ar: "المسام", en: "Pores" },
      { value: "dullness", ar: "البهتان", en: "Dullness" },
      { value: "fine_lines", ar: "الخطوط الدقيقة", en: "Fine lines" }
    ]
  },
  {
    key: "time",
    labelKey: "brb_q_time_label",
    labelAr: "وقت الاستخدام",
    labelEn: "Usage time",
    options: [
      { value: "morning", ar: "صباحي", en: "Morning" },
      { value: "evening", ar: "مسائي", en: "Evening" },
      { value: "both", ar: "صباحي ومسائي", en: "Morning & evening" }
    ]
  },
  {
    key: "routine",
    labelKey: "brb_q_routine_label",
    labelAr: "نوع الروتين",
    labelEn: "Routine type",
    options: [
      { value: "quick", ar: "روتين سريع", en: "Quick routine" },
      { value: "basic", ar: "روتين أساسي", en: "Basic routine" },
      { value: "complete", ar: "روتين متكامل", en: "Complete routine" }
    ]
  }
], x = { quick: 1, basic: 2, complete: 3 };
function j() {
  var i, e;
  return ((e = typeof document < "u" ? (i = document.documentElement.lang) == null ? void 0 : i.split(/[-_]/)[0] : "ar") == null ? void 0 : e.toLowerCase()) === "en";
}
function B(i) {
  const e = j();
  return O.map((r) => {
    const t = b(i[r.labelKey]) || (e ? r.labelEn : r.labelAr), s = r.options.map((a) => ({
      value: a.value,
      label: e ? a.en : a.ar
    }));
    return { key: r.key, label: t, options: s };
  });
}
function u(i, e) {
  const r = i[e] ?? i[`brb_steps.${e}`];
  return k(r, "").toLowerCase().trim();
}
function Q(i) {
  return S(i).map((e, r) => {
    const t = b(e.step_name) || "";
    return {
      id: `step-${r}`,
      step_name: t,
      step_desc: b(e.step_desc),
      order: L(e.order, r + 1),
      level: u(e, "level") || "quick",
      skin: u(e, "skin"),
      concern: u(e, "concern"),
      time: u(e, "time"),
      image: C(e.image),
      name: t,
      link: z(e.link ?? e["brb_steps.link"])
    };
  }).filter((e) => e.step_name || e.step_desc);
}
function H(i, e) {
  return !i || !e || i === "both" || e === "both" ? !0 : i === e;
}
function P(i, e) {
  const r = e.routine ? x[e.routine] ?? 3 : 3;
  return i.filter((t) => {
    const s = (x[t.level] ?? 1) <= r, a = !e.skin || !t.skin || t.skin === e.skin, l = !e.concern || !t.concern || t.concern === e.concern, p = H(t.time, e.time);
    return s && a && l && p;
  }).sort((t, s) => t.order - s.order);
}
var U = Object.defineProperty, h = (i, e, r, t) => {
  for (var s = void 0, a = i.length - 1, l; a >= 0; a--)
    (l = i[a]) && (s = l(e, r, s) || s);
  return s && U(e, r, s), s;
};
const m = class m extends E {
  constructor() {
    super(...arguments), this.config = {}, this.answers = {}, this.steps = [], this.stepIndex = 0, this.boundLangHandler = () => this.requestUpdate(), this.boundKeyHandler = (e) => this.onKeyDown(e);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.addEventListener("keydown", this.boundKeyHandler), this.load();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.removeEventListener("keydown", this.boundKeyHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && this.load();
  }
  load() {
    var e;
    this.steps = Q((e = this.config) == null ? void 0 : e.brb_steps);
  }
  get questions() {
    return B(this.config || {});
  }
  get onResults() {
    return this.stepIndex >= this.questions.length;
  }
  get routine() {
    return P(this.steps, this.answers);
  }
  label(e, r, t) {
    var s;
    return b((s = this.config) == null ? void 0 : s[e]) || o(r, t);
  }
  pick(e, r) {
    this.answers = { ...this.answers, [e]: r };
  }
  goNext() {
    const e = this.questions.length;
    this.stepIndex < e && (this.stepIndex += 1);
  }
  goBack() {
    this.stepIndex > 0 && (this.stepIndex -= 1);
  }
  reset() {
    this.answers = {}, this.stepIndex = 0;
  }
  onKeyDown(e) {
    const r = e.target;
    if (r != null && r.closest("button, a, input, textarea, select")) return;
    const t = this.questions[this.stepIndex], s = t ? !!this.answers[t.key] : !1;
    e.key === "Enter" && !this.onResults && s && (e.preventDefault(), this.goNext()), e.key === "Backspace" && this.stepIndex > 0 && !this.onResults && (e.preventDefault(), this.goBack());
  }
  renderProgress(e) {
    const r = Math.min(this.stepIndex + 1, e), t = e ? Math.round(Math.min(this.stepIndex, e) / e * 100) : 0;
    return n`
      <div class="brb-progress" aria-hidden="true">
        <div class="brb-progress__bar"><span style=${y({ width: `${t}%` })}></span></div>
        <span class="brb-progress__text">
          ${this.onResults ? o("النتيجة", "Result") : o(`السؤال ${r} من ${e}`, `Question ${r} of ${e}`)}
        </span>
      </div>
    `;
  }
  renderQuestion(e) {
    return n`
      <div class="brb-question">
        <h3 class="brb-question__title">${e.label}</h3>
        <div class="brb-chips" role="group" aria-label=${e.label}>
          ${e.options.map((r) => {
      const t = this.answers[e.key] === r.value;
      return n`<button
              type="button"
              class="brb-chip"
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
    const r = this.label("brb_back_btn", "السابق", "Back"), t = this.label("brb_next_btn", "التالي", "Next"), s = this.label("brb_see_btn", "عرض الروتين", "See routine"), a = this.stepIndex === this.questions.length - 1;
    return n`
      <div class="brb-nav">
        ${this.stepIndex > 0 ? n`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
              ${r}
            </button>` : n`<span></span>`}
        <button
          type="button"
          class="fs-btn fs-tap"
          ?disabled=${!e}
          @click=${() => this.goNext()}
        >
          ${a ? s : t}
        </button>
      </div>
    `;
  }
  renderStep(e, r, t) {
    return n`
      <div class="brb-step" role="listitem">
        <span class="brb-step__num" aria-hidden="true">${r + 1}</span>
        ${e.image ? n`<img class="brb-step__thumb" src=${e.image} alt="" loading="lazy" decoding="async" />` : n`<span class="brb-step__thumb" aria-hidden="true"></span>`}
        <div class="brb-step__body">
          <h4 class="brb-step__name">${e.step_name || e.name || o("خطوة", "Step")}</h4>
          ${e.step_desc ? n`<p class="brb-step__desc">${e.step_desc}</p>` : c}
          ${t && e.link ? n`<div class="brb-step__actions">
                <a class="fs-btn fs-btn--ghost" href=${e.link} target="_blank" rel="noopener noreferrer">
                  ${o("التفاصيل", "Details")}
                </a>
              </div>` : c}
        </div>
      </div>
    `;
  }
  renderResults() {
    const e = this.config || {}, r = this.routine, t = R(e.brb_show_link, !0), s = b(e.brb_result_title) || o("روتينك المقترح", "Your suggested routine");
    return n`
      <div class="brb-results" aria-live="polite">
        <div class="brb-routine__head">
          <h3 class="brb-routine__title">
            ${s}
            ${r.length ? n`<span class="brb-routine__count"> · ${r.length} ${o("خطوات", "steps")}</span>` : c}
          </h3>
        </div>

        ${r.length ? n`<div class="brb-timeline" role="list">
              ${r.map((a, l) => this.renderStep(a, l, t))}
            </div>` : n`<p class="fs-empty">${o("لا توجد خطوات مطابقة لاختياراتك", "No steps match your choices")}</p>`}

        <div class="brb-results__actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
            ${this.label("brb_back_btn", "تعديل الإجابات", "Edit answers")}
          </button>
          <button type="button" class="fs-btn fs-tap" @click=${() => this.reset()}>
            ${b(e.brb_reset_btn) || o("إعادة الاختيار", "Start over")}
          </button>
          ${A(e, "brb_")}
        </div>
      </div>
    `;
  }
  render() {
    const e = this.config || {}, r = q(e, "brb_"), t = r.animate && !K(), s = b(e.brb_title), a = b(e.brb_desc), l = this.questions, p = l[this.stepIndex], $ = p ? !!this.answers[p.key] : !1, f = k(e.brb_card_shape, "soft"), v = b(e.brb_bg_image);
    return this.steps.length ? n`
      <section
        class=${_({ "fs-section": !0, "fs-animate": t })}
        style=${y(N(r))}
        aria-label=${s || o("منشئ روتين العناية", "Beauty routine builder")}
        tabindex="0"
      >
        <div class="fs-container">
          ${s || a ? n`<div class="fs-header">
                ${s ? n`<h2 class="fs-title">${s}</h2>` : c}
                ${a ? n`<p class="fs-desc">${a}</p>` : c}
              </div>` : c}

          <div
            class=${_({
      "brb-shell": !0,
      "brb-card--sharp": f === "sharp",
      "brb-card--pill": f === "pill"
    })}
          >
            ${v ? n`<img class="brb-shell__bg" src=${v} alt="" loading="lazy" decoding="async" />` : c}
            <div class="brb-inner">
              ${this.renderProgress(l.length)}
              ${this.onResults ? this.renderResults() : n`
                    ${p ? this.renderQuestion(p) : c}
                    ${this.renderNav($)}
                  `}
            </div>
          </div>
        </div>
      </section>
    ` : n`<div class="fs-empty" role="status">
        ${o("أضيفي خطوات الروتين من إعدادات العنصر", "Add routine steps in the element settings")}
      </div>`;
  }
};
m.styles = [M, D];
let d = m;
h([
  I({ type: Object })
], d.prototype, "config");
h([
  g()
], d.prototype, "answers");
h([
  g()
], d.prototype, "steps");
h([
  g()
], d.prototype, "stepIndex");
typeof d < "u" && d.registerSallaComponent("salla-beauty-routine-builder");
export {
  d as default
};
