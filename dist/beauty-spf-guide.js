import { css as B, LitElement as V, html as r, nothing as c } from "lit";
import { property as H, state as v } from "lit/decorators.js";
import { classMap as C } from "lit/directives/class-map.js";
import { styleMap as u } from "lit/directives/style-map.js";
import { n as y, l as a, h as f, j as x, t as o, s as j, i as P, r as D, p as K, a as z, b as A } from "./sharedStyles-BgfDOkwJ.js";
const F = B`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bsg-wrap {
    display: grid;
    gap: 1.25rem;
    width: 100%;
    max-width: 720px;
    margin-inline: auto;
  }

  .bsg-wrap:has(.bsg-results) {
    max-width: 840px;
  }

  .bsg-progress {
    display: grid;
    gap: 0.45rem;
  }

  .bsg-progress__bar {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 70%, #fff);
    overflow: hidden;
  }

  .bsg-progress__bar span {
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

  .bsg-progress__text {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
  }

  .bsg-progress__step {
    font-weight: 700;
    color: var(--text-color, #33232e);
  }

  .bsg-step {
    display: grid;
    gap: 0.75rem;
    padding: 1.15rem 1.2rem;
    border-radius: var(--section-radius, 16px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    box-shadow: 0 8px 24px rgba(194, 82, 127, 0.06);
  }

  .bsg-step__title {
    margin: 0;
    font-size: 1.12rem;
    font-weight: 800;
    line-height: 1.35;
    color: var(--text-color, #33232e);
  }

  .bsg-step__hint {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.55;
    color: var(--muted-color, #8f7a86);
  }

  .bsg-options {
    display: grid;
    gap: 0.55rem;
  }

  .bsg-options--compact {
    grid-template-columns: repeat(auto-fill, minmax(5.5rem, 1fr));
  }

  .bsg-option {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    width: 100%;
    min-height: 48px;
    padding: 0.75rem 0.9rem;
    border-radius: calc(var(--section-radius, 16px) * 0.75);
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    text-align: start;
    cursor: pointer;
    box-sizing: border-box;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease,
      box-shadow 0.2s ease;
  }

  .bsg-option:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #f2dde7));
  }

  .bsg-option[aria-pressed='true'] {
    border-color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, transparent);
  }

  .bsg-option--compact {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0.85rem 0.5rem;
  }

  .bsg-option__body {
    display: grid;
    gap: 0.15rem;
    min-width: 0;
  }

  .bsg-option__name {
    font-size: 0.92rem;
    font-weight: 700;
    line-height: 1.3;
  }

  .bsg-option__desc {
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--muted-color, #8f7a86);
    line-height: 1.45;
  }

  .bsg-swatch {
    width: 1.15rem;
    height: 1.15rem;
    margin-top: 0.15rem;
    border-radius: 50%;
    border: 1px solid color-mix(in srgb, #000 12%, transparent);
    flex: 0 0 auto;
    background: var(--bsg-swatch, var(--accent-color, var(--fs-store-primary)));
  }

  .bsg-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
  }

  .bsg-nav .fs-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .bsg-results {
    display: grid;
    gap: 1rem;
    padding: 1.25rem 1.2rem 1.35rem;
    border-radius: var(--section-radius, 16px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    box-shadow: 0 10px 30px rgba(43, 33, 28, 0.07);
  }

  .bsg-results__title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bsg-results__summary {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .bsg-results__pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #f2dde7));
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
  }

  .bsg-results__pill .bsg-swatch {
    margin-top: 0;
    width: 0.85rem;
    height: 0.85rem;
  }

  .bsg-duration {
    display: grid;
    gap: 0.3rem;
    padding: 0.9rem 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 20%, transparent);
  }

  .bsg-duration--hero {
    padding: 1.15rem 1.1rem;
    text-align: center;
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, var(--card-bg, #fff)),
      var(--card-bg, #fff)
    );
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, var(--border-color, #f2dde7));
  }

  .bsg-duration__label {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
  }

  .bsg-duration__value {
    font-size: 1.85rem;
    font-weight: 800;
    line-height: 1.1;
    color: var(--accent-color, var(--fs-store-primary));
    letter-spacing: -0.01em;
  }

  .bsg-duration--hero .bsg-duration__value {
    font-size: 2.35rem;
  }

  .bsg-meter-wrap {
    display: grid;
    gap: 0.4rem;
  }

  .bsg-meter-wrap--hero .bsg-meter {
    height: 14px;
  }

  .bsg-meter {
    height: 10px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 65%, #fff);
    overflow: hidden;
  }

  .bsg-meter span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, #e0a100 80%, var(--accent-color, var(--fs-store-primary))),
      var(--accent-color, var(--fs-store-primary))
    );
    transition: width 0.35s ease;
  }

  .bsg-meter-caption {
    margin: 0;
    font-size: 0.72rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.5;
  }

  .bsg-reapply {
    display: flex;
    gap: 0.65rem;
    align-items: flex-start;
    padding: 0.85rem 0.95rem;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    background: color-mix(in srgb, #e0a100 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, #e0a100 35%, transparent);
  }

  .bsg-reapply__icon {
    font-size: 1.25rem;
    line-height: 1.2;
    flex: 0 0 auto;
  }

  .bsg-reapply__body {
    display: grid;
    gap: 0.2rem;
  }

  .bsg-reapply__main {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    color: color-mix(in srgb, #8a5a00 65%, var(--text-color, #33232e));
    line-height: 1.5;
  }

  .bsg-reapply__note {
    margin: 0;
    font-size: 0.82rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.55;
  }

  .bsg-tips {
    display: grid;
    gap: 0.4rem;
  }

  .bsg-tips__title {
    margin: 0 0 0.15rem;
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bsg-tips ul {
    margin: 0;
    padding-inline-start: 1.15rem;
    display: grid;
    gap: 0.35rem;
    color: var(--muted-color, #8f7a86);
    font-size: 0.86rem;
    line-height: 1.55;
  }

  .bsg-results__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .bsg-notice {
    margin: 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  .bsg-notice--inline {
    padding-top: 0.25rem;
    border-top: 1px solid var(--border-color, #f2dde7);
  }

  @media (max-width: 639px) {
    .bsg-duration__value {
      font-size: 1.6rem;
    }
    .bsg-duration--hero .bsg-duration__value {
      font-size: 2rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bsg-option,
    .bsg-progress__bar span,
    .bsg-meter span {
      transition: none;
    }
  }
`;
function U(n) {
  const e = ["phototype", "spf"];
  return n && e.push("condition"), e;
}
function O(n) {
  return y(n).map((e, s) => {
    const t = a(e.name);
    return {
      id: String(e.id ?? e.pt_id ?? "").trim() || `pt-${s + 1}`,
      name: t,
      desc: a(e.desc),
      baseMinutes: f(x(e.base_minutes, 15), 1, 240),
      color: String(e.color ?? "").trim()
    };
  }).filter((e) => e.name);
}
function q(n) {
  return y(n).map((e) => {
    const s = f(Math.round(x(e.spf, 30)), 1, 100), t = a(e.label) || `SPF ${s}`;
    return { spf: s, label: t };
  }).filter((e) => e.spf > 0);
}
function Y(n) {
  return y(n).map((e, s) => {
    const t = a(e.name);
    return {
      id: String(e.id ?? e.cond_id ?? "").trim() || `cond-${s + 1}`,
      name: t,
      factor: f(x(e.factor, 1), 0.1, 3),
      desc: a(e.desc)
    };
  }).filter((e) => e.name);
}
function J(n) {
  return y(n).map((e) => a(e.tip)).filter(Boolean);
}
function Q(n, e, s) {
  return f(n * e * s, 0, 1e5);
}
function W(n) {
  const e = Math.max(0, Math.round(n)), s = Math.floor(e / 60), t = e % 60, i = o("س", "h"), l = o("د", "m");
  return s <= 0 ? `${t}${l}` : t <= 0 ? `${s}${i}` : `${s}${i} ${t}${l}`;
}
function _(n, e) {
  return n === "phototype" ? a(e.bsg_phototype_label) || o("نوع البشرة", "Skin phototype") : n === "spf" ? a(e.bsg_spf_label) || o("عامل الحماية SPF", "SPF value") : a(e.bsg_condition_label) || o("ظروف التعرّض", "Exposure condition");
}
var X = Object.defineProperty, m = (n, e, s, t) => {
  for (var i = void 0, l = n.length - 1, p; l >= 0; l--)
    (p = n[l]) && (i = p(e, s, i) || i);
  return i && X(e, s, i), i;
};
const Z = 480, $ = class $ extends V {
  constructor() {
    super(...arguments), this.config = {}, this.selectedPtId = "", this.selectedSpf = 0, this.selectedCondId = "", this.stepIndex = 0, this.boundLangHandler = () => this.requestUpdate(), this.boundKeyHandler = (e) => this.onKeyDown(e);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.addEventListener("keydown", this.boundKeyHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.removeEventListener("keydown", this.boundKeyHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.selectedPtId = "", this.selectedSpf = 0, this.selectedCondId = "", this.stepIndex = 0);
  }
  get phototypes() {
    var e;
    return O((e = this.config) == null ? void 0 : e.bsg_phototypes);
  }
  get spfValues() {
    var e;
    return q((e = this.config) == null ? void 0 : e.bsg_spf_values);
  }
  get conditions() {
    var e;
    return Y((e = this.config) == null ? void 0 : e.bsg_conditions);
  }
  get plan() {
    return U(this.conditions.length > 0);
  }
  get onResults() {
    return this.stepIndex >= this.plan.length;
  }
  get currentStep() {
    return this.onResults ? null : this.plan[this.stepIndex] ?? null;
  }
  get canNext() {
    const e = this.currentStep;
    return e ? e === "phototype" ? !!this.selectedPtId : e === "spf" ? this.selectedSpf > 0 : e === "condition" ? !!this.selectedCondId : !1 : !1;
  }
  label(e, s, t) {
    var i;
    return a((i = this.config) == null ? void 0 : i[e]) || o(s, t);
  }
  goNext() {
    this.stepIndex < this.plan.length && (this.stepIndex += 1);
  }
  goBack() {
    this.stepIndex > 0 && (this.stepIndex -= 1);
  }
  reset() {
    this.selectedPtId = "", this.selectedSpf = 0, this.selectedCondId = "", this.stepIndex = 0;
  }
  onKeyDown(e) {
    const s = e.target;
    s != null && s.closest("button, a, input, textarea, select") || (e.key === "Enter" && !this.onResults && this.canNext && (e.preventDefault(), this.goNext()), e.key === "Backspace" && this.stepIndex > 0 && !this.onResults && (e.preventDefault(), this.goBack()));
  }
  renderProgress(e) {
    const s = Math.min(this.stepIndex + 1, e), t = e ? Math.round(Math.min(this.stepIndex, e) / e * 100) : 0, i = this.currentStep, l = i ? _(i, this.config || {}) : "";
    return r`
      <div class="bsg-progress" aria-hidden="true">
        <div class="bsg-progress__bar"><span style=${u({ width: `${t}%` })}></span></div>
        <span class="bsg-progress__text">
          ${this.onResults ? o("النتيجة", "Result") : r`${o(`الخطوة ${s} من ${e}`, `Step ${s} of ${e}`)}
                <span class="bsg-progress__step"> · ${l}</span>`}
        </span>
      </div>
    `;
  }
  renderPhototypeStep(e) {
    const s = _("phototype", this.config || {});
    return r`
      <div class="bsg-step">
        <h3 class="bsg-step__title">${s}</h3>
        <p class="bsg-step__hint">${o("اختاري نوع بشرتك حسب حساسيتها للشمس", "Pick your sun-sensitivity phototype")}</p>
        <div class="bsg-options" role="group" aria-label=${s}>
          ${e.map((t) => {
      const i = this.selectedPtId === t.id;
      return r`
              <button
                type="button"
                class="bsg-option"
                aria-pressed=${i ? "true" : "false"}
                style=${u(t.color ? { "--bsg-swatch": t.color } : {})}
                @click=${() => this.selectedPtId = t.id}
              >
                <span class="bsg-swatch" aria-hidden="true"></span>
                <span class="bsg-option__body">
                  <span class="bsg-option__name">${t.name}</span>
                  ${t.desc ? r`<span class="bsg-option__desc">${t.desc}</span>` : c}
                </span>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderSpfStep(e) {
    const s = _("spf", this.config || {});
    return r`
      <div class="bsg-step">
        <h3 class="bsg-step__title">${s}</h3>
        <p class="bsg-step__hint">${o("اختاري عامل الحماية الذي تستخدمينه", "Choose the SPF you apply")}</p>
        <div class="bsg-options bsg-options--compact" role="group" aria-label=${s}>
          ${e.map((t) => {
      const i = this.selectedSpf === t.spf;
      return r`
              <button
                type="button"
                class="bsg-option bsg-option--compact"
                aria-pressed=${i ? "true" : "false"}
                @click=${() => this.selectedSpf = t.spf}
              >
                <span class="bsg-option__name">${t.label}</span>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderConditionStep(e) {
    const s = _("condition", this.config || {});
    return r`
      <div class="bsg-step">
        <h3 class="bsg-step__title">${s}</h3>
        <p class="bsg-step__hint">${o("اختاري ظروف تعرّضك للشمس اليوم", "Pick today's sun exposure setting")}</p>
        <div class="bsg-options" role="group" aria-label=${s}>
          ${e.map((t) => {
      const i = this.selectedCondId === t.id;
      return r`
              <button
                type="button"
                class="bsg-option"
                aria-pressed=${i ? "true" : "false"}
                @click=${() => this.selectedCondId = t.id}
              >
                <span class="bsg-option__body">
                  <span class="bsg-option__name">${t.name}</span>
                  ${t.desc ? r`<span class="bsg-option__desc">${t.desc}</span>` : c}
                </span>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderNav() {
    const e = this.label("bsg_back_btn", "السابق", "Back"), s = this.label("bsg_next_btn", "التالي", "Next"), t = this.label("bsg_see_btn", "عرض التقدير", "See estimate"), i = this.stepIndex === this.plan.length - 1;
    return r`
      <div class="bsg-nav">
        ${this.stepIndex > 0 ? r`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
              ${e}
            </button>` : r`<span></span>`}
        <button
          type="button"
          class="fs-btn fs-tap"
          ?disabled=${!this.canNext}
          @click=${() => this.goNext()}
        >
          ${i ? t : s}
        </button>
      </div>
    `;
  }
  renderCurrentStep() {
    const e = this.currentStep;
    return e ? e === "phototype" ? this.renderPhototypeStep(this.phototypes) : e === "spf" ? this.renderSpfStep(this.spfValues) : this.renderConditionStep(this.conditions) : c;
  }
  renderResults() {
    const e = this.config || {}, s = this.phototypes, t = this.spfValues, i = this.conditions, l = J(e.bsg_tips), p = s.find((h) => h.id === this.selectedPtId) ?? null, d = t.find((h) => h.spf === this.selectedSpf) ?? null, g = i.find((h) => h.id === this.selectedCondId) ?? null, M = (g == null ? void 0 : g.factor) ?? 1, w = Q((p == null ? void 0 : p.baseMinutes) ?? 0, (d == null ? void 0 : d.spf) ?? 0, M), k = f(w / Z * 100, 0, 100), R = P(e.bsg_show_meter, !0), N = P(e.bsg_show_notice, !0), S = f(Math.round(x(e.bsg_reapply_minutes, 120)), 1, 1e5), I = a(e.bsg_reapply_note), E = a(e.bsg_result_title) || o("توصياتك", "Your guidance"), L = a(e.bsg_notice) || o("هذه إرشادات توعوية عامة وليست نصيحة طبية.", "This is general educational guidance, not medical advice."), T = o(
      `أعيدي التطبيق كل ${S} دقيقة`,
      `Reapply every ${S} min`
    );
    return r`
      <div class="bsg-results" aria-live="polite">
        <h3 class="bsg-results__title">${E}</h3>

        <div class="bsg-results__summary">
          ${p ? r`<span class="bsg-results__pill">
                <span
                  class="bsg-swatch"
                  aria-hidden="true"
                  style=${u(p.color ? { "--bsg-swatch": p.color } : {})}
                ></span>
                ${p.name}
              </span>` : c}
          ${d ? r`<span class="bsg-results__pill">${d.label}</span>` : c}
          ${g ? r`<span class="bsg-results__pill">${g.name}</span>` : c}
        </div>

        <div class="bsg-duration bsg-duration--hero">
          <span class="bsg-duration__label">
            ${o("تقدير تقريبي لمدة التعرّض الآمن", "Rough safe-exposure estimate")}
          </span>
          <span class="bsg-duration__value">${W(w)}</span>
        </div>

        ${R ? r`<div class="bsg-meter-wrap bsg-meter-wrap--hero">
              <div
                class="bsg-meter"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow=${Math.round(k)}
                aria-label=${o("مؤشر التعرّض التوضيحي", "Illustrative exposure meter")}
              >
                <span style=${u({ width: `${k}%` })}></span>
              </div>
              <p class="bsg-meter-caption">
                ${o("مؤشر توضيحي فقط — التقدير يقلّ في ظروف الانعكاس العالي.", "Illustrative only — the estimate drops in high-reflection conditions.")}
              </p>
            </div>` : c}

        <div class="bsg-reapply">
          <span class="bsg-reapply__icon" aria-hidden="true">☀︎</span>
          <div class="bsg-reapply__body">
            <p class="bsg-reapply__main">${T}</p>
            ${I ? r`<p class="bsg-reapply__note">${I}</p>` : r`<p class="bsg-reapply__note">${o("أعيدي التطبيق بعد السباحة أو التعرّق.", "Reapply after swimming or sweating.")}</p>`}
          </div>
        </div>

        ${l.length ? r`<div class="bsg-tips">
              <p class="bsg-tips__title">${o("نصائح", "Tips")}</p>
              <ul>${l.map((h) => r`<li>${h}</li>`)}</ul>
            </div>` : c}

        <div class="bsg-results__actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
            ${this.label("bsg_back_btn", "تعديل الاختيارات", "Edit choices")}
          </button>
          <button type="button" class="fs-btn fs-tap" @click=${() => this.reset()}>
            ${this.label("bsg_reset_btn", "ابدئي من جديد", "Start over")}
          </button>
        </div>

        ${N ? r`<p class="bsg-notice bsg-notice--inline">${L}</p>` : c}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, s = D(e, "bsg_"), t = s.animate && !K(), i = this.phototypes, l = this.spfValues, p = this.plan, d = a(e.bsg_title), g = a(e.bsg_desc);
    return !i.length || !l.length ? r`
        <section
          class=${C({ "fs-section": !0, "fs-animate": t })}
          style=${u(z(s))}
          aria-label=${d || o("دليل الحماية من الشمس", "Sun protection guide")}
        >
          <div class="fs-container">
            <div class="fs-empty" role="status">
              ${o("أكملي إعدادات العنصر لعرض الدليل.", "Complete the element settings to show the guide.")}
            </div>
          </div>
        </section>
      ` : r`
      <section
        class=${C({ "fs-section": !0, "fs-animate": t })}
        style=${u(z(s))}
        aria-label=${d || o("دليل الحماية من الشمس", "Sun protection guide")}
        tabindex="0"
      >
        <div class="fs-container">
          ${d || g ? r`<div class="fs-header">
                ${d ? r`<h2 class="fs-title">${d}</h2>` : c}
                ${g ? r`<p class="fs-desc">${g}</p>` : c}
              </div>` : c}

          <div class="bsg-wrap">
            ${this.renderProgress(p.length)}
            ${this.onResults ? this.renderResults() : r`
                  ${this.renderCurrentStep()}
                  ${this.renderNav()}
                `}
          </div>
          ${this.onResults ? A({
      config: e,
      prefix: "bsg_",
      ready: !0
    }) : c}
        </div>
      </section>
    `;
  }
};
$.styles = [j, F];
let b = $;
m([
  H({ type: Object })
], b.prototype, "config");
m([
  v()
], b.prototype, "selectedPtId");
m([
  v()
], b.prototype, "selectedSpf");
m([
  v()
], b.prototype, "selectedCondId");
m([
  v()
], b.prototype, "stepIndex");
typeof b < "u" && b.registerSallaComponent("salla-beauty-spf-guide");
export {
  b as default
};
