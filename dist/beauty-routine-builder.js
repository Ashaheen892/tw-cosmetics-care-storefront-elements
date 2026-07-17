import { css as z, LitElement as S, html as n, nothing as c } from "lit";
import { property as E, state as k } from "lit/decorators.js";
import { classMap as _ } from "lit/directives/class-map.js";
import { styleMap as C } from "lit/directives/style-map.js";
import { n as L, l, b as M, e as A, h as O, g as x, s as q, t as o, r as j, p as K, i as N, a as Q } from "./sharedStyles-cRSiglXC.js";
const D = z`
  :host {
    direction: inherit;
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
    gap: 1.4rem;
  }

  .brb-quiz {
    display: grid;
    gap: 1rem;
    padding: 1.15rem;
    border-radius: var(--section-radius, 16px);
    background: color-mix(in srgb, var(--card-bg, #fff) 90%, var(--section-bg, #fbf5f8));
    border: 1px solid var(--border-color, #f2dde7);
  }

  .brb-q {
    display: grid;
    gap: 0.5rem;
  }

  .brb-q__label {
    font-weight: 700;
    font-size: 0.92rem;
    color: var(--text-color, #33232e);
  }

  .brb-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .brb-chip {
    min-height: 42px;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }

  .brb-chip[aria-pressed='true'] {
    background: var(--accent-color, #c2527f);
    border-color: var(--accent-color, #c2527f);
    color: #fff;
  }

  .brb-routine {
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
    font-weight: 700;
    color: var(--text-color, #33232e);
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
    border: 1px solid var(--border-color, #f2dde7);
    box-shadow: 0 6px 18px rgba(43, 33, 28, 0.05);
  }

  .brb-step__num {
    display: grid;
    place-items: center;
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    background: var(--accent-color, #c2527f);
    color: #fff;
    font-weight: 800;
    font-size: 0.95rem;
  }

  .brb-step__thumb {
    width: 84px;
    height: 84px;
    border-radius: calc(var(--card-radius, 14px) * 0.7);
    object-fit: cover;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 45%, #fff);
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
    color: var(--text-color, #33232e);
  }

  .brb-step__desc {
    margin: 0;
    font-size: 0.82rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.5;
  }

  .brb-step__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.2rem;
  }

  .brb-step__actions .fs-btn {
    min-height: 36px;
    padding: 0.4rem 0.85rem;
    font-size: 0.8rem;
  }

  .brb-summary {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    align-items: center;
    justify-content: space-between;
    padding: 0.9rem 1.1rem;
    border-radius: var(--section-radius, 16px);
    background: color-mix(in srgb, var(--accent-color, #c2527f) 10%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, #c2527f) 25%, var(--border-color, #f2dde7));
  }

  .brb-summary__total {
    font-weight: 800;
    color: var(--text-color, #33232e);
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
    .brb-chip {
      transition: none;
    }
  }
`, P = [
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
], y = { quick: 1, basic: 2, complete: 3 };
function R() {
  var a, e;
  return ((e = typeof document < "u" ? (a = document.documentElement.lang) == null ? void 0 : a.split(/[-_]/)[0] : "ar") == null ? void 0 : e.toLowerCase()) === "en";
}
function U(a) {
  const e = R();
  return P.map((r) => {
    const t = l(a[r.labelKey]) || (e ? r.labelEn : r.labelAr), s = r.options.map((i) => ({
      value: i.value,
      label: e ? i.en : i.ar
    }));
    return { key: r.key, label: t, options: s };
  });
}
function u(a, e) {
  const r = a[e] ?? a[`brb_steps.${e}`];
  return x(r, "").toLowerCase().trim();
}
function H(a) {
  return L(a).map((e, r) => {
    const t = l(e.step_name) || "";
    return {
      id: `step-${r}`,
      step_name: t,
      step_desc: l(e.step_desc),
      order: O(e.order, r + 1),
      level: u(e, "level") || "quick",
      skin: u(e, "skin"),
      concern: u(e, "concern"),
      time: u(e, "time"),
      image: A(e.image),
      name: t,
      link: M(e.link ?? e["brb_steps.link"])
    };
  }).filter((e) => e.step_name || e.step_desc);
}
function I(a, e) {
  return !a || !e || a === "both" || e === "both" ? !0 : a === e;
}
function V(a, e) {
  const r = e.routine ? y[e.routine] ?? 3 : 3;
  return a.filter((t) => {
    const s = (y[t.level] ?? 1) <= r, i = !e.skin || !t.skin || t.skin === e.skin, d = !e.concern || !t.concern || t.concern === e.concern, p = I(t.time, e.time);
    return s && i && d && p;
  }).sort((t, s) => t.order - s.order);
}
var F = Object.defineProperty, g = (a, e, r, t) => {
  for (var s = void 0, i = a.length - 1, d; i >= 0; i--)
    (d = a[i]) && (s = d(e, r, s) || s);
  return s && F(e, r, s), s;
};
const f = class f extends S {
  constructor() {
    super(...arguments), this.config = {}, this.answers = {}, this.steps = [], this.boundLangHandler = () => this.requestUpdate();
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
    this.steps = H((e = this.config) == null ? void 0 : e.brb_steps);
  }
  get routine() {
    return V(this.steps, this.answers);
  }
  pick(e, r) {
    const t = { ...this.answers };
    t[e] === r ? delete t[e] : t[e] = r, this.answers = t;
  }
  reset() {
    this.answers = {};
  }
  renderQuestion(e) {
    return n`
      <div class="brb-q">
        <span class="brb-q__label">${e.label}</span>
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
  render() {
    const e = this.config || {}, r = j(e, "brb_"), t = r.animate && !K(), s = l(e.brb_title), i = l(e.brb_desc), d = U(e), p = this.routine, $ = N(e.brb_show_link, !0), h = x(e.brb_card_shape, "soft"), v = l(e.brb_bg_image);
    return this.steps.length ? n`
      <section
        class=${_({ "fs-section": !0, "fs-animate": t })}
        style=${C(Q(r))}
        aria-label=${s || o("منشئ روتين العناية", "Beauty routine builder")}
      >
        <div class="fs-container">
          ${s || i ? n`<div class="fs-header">
                ${s ? n`<h2 class="fs-title">${s}</h2>` : c}
                ${i ? n`<p class="fs-desc">${i}</p>` : c}
              </div>` : c}

          <div
            class=${_({
      "brb-shell": !0,
      "brb-card--sharp": h === "sharp",
      "brb-card--pill": h === "pill"
    })}
          >
            ${v ? n`<img class="brb-shell__bg" src=${v} alt="" loading="lazy" decoding="async" />` : c}
            <div class="brb-inner">
              <div class="brb-quiz">
                ${d.map((m) => this.renderQuestion(m))}
              </div>

              <div class="brb-routine">
                <div class="brb-routine__head">
                  <h3 class="brb-routine__title">
                    ${l(e.brb_result_title) || o("روتينك المقترح", "Your suggested routine")}
                  </h3>
                  <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.reset}>
                    ${l(e.brb_reset_btn) || o("إعادة الاختيار", "Start over")}
                  </button>
                </div>

                ${p.length ? n`<div class="brb-timeline" role="list">
                      ${p.map((m, w) => this.renderStep(m, w, $))}
                    </div>` : n`<p class="fs-empty">${o("لا توجد خطوات مطابقة لاختياراتك", "No steps match your choices")}</p>`}

                ${p.length ? n`<div class="brb-summary">
                      <span class="brb-summary__total">${p.length} ${o("خطوات", "steps")}</span>
                    </div>` : c}
              </div>
            </div>
          </div>
        </div>
      </section>
    ` : n`<div class="fs-empty" role="status">
        ${o("أضيفي خطوات الروتين من إعدادات العنصر", "Add routine steps in the element settings")}
      </div>`;
  }
};
f.styles = [q, D];
let b = f;
g([
  E({ type: Object })
], b.prototype, "config");
g([
  k()
], b.prototype, "answers");
g([
  k()
], b.prototype, "steps");
typeof b < "u" && b.registerSallaComponent("salla-beauty-routine-builder");
export {
  b as default
};
