var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, h as clamp, j as toNumber, t, s as sharedSectionCss, i as isTruthy, r as readSectionTheme, p as prefersReducedMotion, a as themeStyleMap } from "./sharedStyles-2kfPtH3m.js";
import { r as renderCommerceCtaButton } from "./commerceOutcome-BDH0KFrf.js";
const componentStyles = css`
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
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, #fff);
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
    color: var(--muted-color, #666666);
  }

  .bsg-progress__step {
    font-weight: 700;
    color: var(--text-color, #000000);
  }

  .bsg-step {
    display: grid;
    gap: 0.75rem;
    padding: 1.15rem 1.2rem;
    border-radius: var(--section-radius, 16px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 8px 24px rgba(194, 82, 127, 0.06);
  }

  .bsg-step__title {
    margin: 0;
    font-size: 1.12rem;
    font-weight: 800;
    line-height: 1.35;
    color: var(--text-color, #000000);
  }

  .bsg-step__hint {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.55;
    color: var(--muted-color, #666666);
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
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    text-align: start;
    cursor: pointer;
    box-sizing: border-box;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease,
      box-shadow 0.2s ease;
  }

  .bsg-option:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
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
    color: var(--muted-color, #666666);
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
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 10px 30px rgba(43, 33, 28, 0.07);
  }

  .bsg-results__title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #000000);
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
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #e5e7eb));
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text-color, #000000);
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
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, var(--border-color, #e5e7eb));
  }

  .bsg-duration__label {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
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
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 65%, #fff);
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
    color: var(--muted-color, #666666);
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
    color: color-mix(in srgb, var(--fs-caution, #e0a100) 45%, var(--text-color, #000000));
    line-height: 1.5;
  }

  .bsg-reapply__note {
    margin: 0;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
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
    color: var(--text-color, #000000);
  }

  .bsg-tips ul {
    margin: 0;
    padding-inline-start: 1.15rem;
    display: grid;
    gap: 0.35rem;
    color: var(--muted-color, #666666);
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
    color: var(--muted-color, #666666);
    line-height: 1.6;
  }

  .bsg-notice--inline {
    padding-top: 0.25rem;
    border-top: 1px solid var(--border-color, #e5e7eb);
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
function buildStepPlan(hasConditions) {
  const steps = ["phototype", "spf"];
  return hasConditions && steps.push("condition"), steps;
}
__name(buildStepPlan, "buildStepPlan");
function parsePhototypes(raw) {
  return normalizeCollection(raw).map((row, i) => {
    const name = localizedString(row.name);
    return {
      id: String(row.id ?? row.pt_id ?? "").trim() || `pt-${i + 1}`,
      name,
      desc: localizedString(row.desc),
      baseMinutes: clamp(toNumber(row.base_minutes, 15), 1, 240),
      color: String(row.color ?? "").trim()
    };
  }).filter((row) => row.name);
}
__name(parsePhototypes, "parsePhototypes");
function parseSpfValues(raw) {
  return normalizeCollection(raw).map((row) => {
    const spf = clamp(Math.round(toNumber(row.spf, 30)), 1, 100), label = localizedString(row.label) || `SPF ${spf}`;
    return { spf, label };
  }).filter((row) => row.spf > 0);
}
__name(parseSpfValues, "parseSpfValues");
function parseConditions(raw) {
  return normalizeCollection(raw).map((row, i) => {
    const name = localizedString(row.name);
    return {
      id: String(row.id ?? row.cond_id ?? "").trim() || `cond-${i + 1}`,
      name,
      factor: clamp(toNumber(row.factor, 1), 0.1, 3),
      desc: localizedString(row.desc)
    };
  }).filter((row) => row.name);
}
__name(parseConditions, "parseConditions");
function parseTips(raw) {
  return normalizeCollection(raw).map((row) => localizedString(row.tip)).filter(Boolean);
}
__name(parseTips, "parseTips");
function estimateMinutes(base, spf, factor) {
  return clamp(base * spf * factor, 0, 1e5);
}
__name(estimateMinutes, "estimateMinutes");
function formatDuration(minutes) {
  const total = Math.max(0, Math.round(minutes)), hours = Math.floor(total / 60), mins = total % 60, hUnit = t("س", "h"), mUnit = t("د", "m");
  return hours <= 0 ? `${mins}${mUnit}` : mins <= 0 ? `${hours}${hUnit}` : `${hours}${hUnit} ${mins}${mUnit}`;
}
__name(formatDuration, "formatDuration");
function stepLabel(key, config) {
  return key === "phototype" ? localizedString(config.bsg_phototype_label) || t("نوع البشرة", "Skin phototype") : key === "spf" ? localizedString(config.bsg_spf_label) || t("عامل الحماية SPF", "SPF value") : localizedString(config.bsg_condition_label) || t("ظروف التعرّض", "Exposure condition");
}
__name(stepLabel, "stepLabel");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const METER_CAP_MINUTES = 480, _BeautySpfGuide = class _BeautySpfGuide extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.selectedPtId = "", this.selectedSpf = 0, this.selectedCondId = "", this.stepIndex = 0, this.boundLangHandler = () => this.requestUpdate(), this.boundKeyHandler = (event) => this.onKeyDown(event);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.addEventListener("keydown", this.boundKeyHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.removeEventListener("keydown", this.boundKeyHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.selectedPtId = "", this.selectedSpf = 0, this.selectedCondId = "", this.stepIndex = 0);
  }
  get phototypes() {
    var _a;
    return parsePhototypes((_a = this.config) == null ? void 0 : _a.bsg_phototypes);
  }
  get spfValues() {
    var _a;
    return parseSpfValues((_a = this.config) == null ? void 0 : _a.bsg_spf_values);
  }
  get conditions() {
    var _a;
    return parseConditions((_a = this.config) == null ? void 0 : _a.bsg_conditions);
  }
  get plan() {
    return buildStepPlan(this.conditions.length > 0);
  }
  get onResults() {
    return this.stepIndex >= this.plan.length;
  }
  get currentStep() {
    return this.onResults ? null : this.plan[this.stepIndex] ?? null;
  }
  get canNext() {
    const step = this.currentStep;
    return step ? step === "phototype" ? !!this.selectedPtId : step === "spf" ? this.selectedSpf > 0 : step === "condition" ? !!this.selectedCondId : !1 : !1;
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
  onKeyDown(event) {
    const target = event.target;
    target != null && target.closest("button, a, input, textarea, select") || (event.key === "Enter" && !this.onResults && this.canNext && (event.preventDefault(), this.goNext()), event.key === "Backspace" && this.stepIndex > 0 && !this.onResults && (event.preventDefault(), this.goBack()));
  }
  renderProgress(total) {
    const current = Math.min(this.stepIndex + 1, total), pct = total ? Math.round(Math.min(this.stepIndex, total) / total * 100) : 0, step = this.currentStep, stepName = step ? stepLabel(step, this.config || {}) : "";
    return html`
      <div class="bsg-progress" aria-hidden="true">
        <div class="bsg-progress__bar"><span style=${styleMap({ width: `${pct}%` })}></span></div>
        <span class="bsg-progress__text">
          ${this.onResults ? t("النتيجة", "Result") : html`${t(`الخطوة ${current} من ${total}`, `Step ${current} of ${total}`)}
                <span class="bsg-progress__step"> · ${stepName}</span>`}
        </span>
      </div>
    `;
  }
  renderPhototypeStep(list) {
    const label = stepLabel("phototype", this.config || {});
    return html`
      <div class="bsg-step">
        <h3 class="bsg-step__title">${label}</h3>
        <p class="bsg-step__hint">${t("اختاري نوع بشرتك حسب حساسيتها للشمس", "Pick your sun-sensitivity phototype")}</p>
        <div class="bsg-options" role="group" aria-label=${label}>
          ${list.map((pt) => {
      const isActive = this.selectedPtId === pt.id;
      return html`
              <button
                type="button"
                class="bsg-option"
                aria-pressed=${isActive ? "true" : "false"}
                style=${styleMap(pt.color ? { "--bsg-swatch": pt.color } : {})}
                @click=${() => this.selectedPtId = pt.id}
              >
                <span class="bsg-swatch" aria-hidden="true"></span>
                <span class="bsg-option__body">
                  <span class="bsg-option__name">${pt.name}</span>
                  ${pt.desc ? html`<span class="bsg-option__desc">${pt.desc}</span>` : nothing}
                </span>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderSpfStep(list) {
    const label = stepLabel("spf", this.config || {});
    return html`
      <div class="bsg-step">
        <h3 class="bsg-step__title">${label}</h3>
        <p class="bsg-step__hint">${t("اختاري عامل الحماية الذي تستخدمينه", "Choose the SPF you apply")}</p>
        <div class="bsg-options bsg-options--compact" role="group" aria-label=${label}>
          ${list.map((sv) => {
      const isActive = this.selectedSpf === sv.spf;
      return html`
              <button
                type="button"
                class="bsg-option bsg-option--compact"
                aria-pressed=${isActive ? "true" : "false"}
                @click=${() => this.selectedSpf = sv.spf}
              >
                <span class="bsg-option__name">${sv.label}</span>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderConditionStep(list) {
    const label = stepLabel("condition", this.config || {});
    return html`
      <div class="bsg-step">
        <h3 class="bsg-step__title">${label}</h3>
        <p class="bsg-step__hint">${t("اختاري ظروف تعرّضك للشمس اليوم", "Pick today's sun exposure setting")}</p>
        <div class="bsg-options" role="group" aria-label=${label}>
          ${list.map((cond) => {
      const isActive = this.selectedCondId === cond.id;
      return html`
              <button
                type="button"
                class="bsg-option"
                aria-pressed=${isActive ? "true" : "false"}
                @click=${() => this.selectedCondId = cond.id}
              >
                <span class="bsg-option__body">
                  <span class="bsg-option__name">${cond.name}</span>
                  ${cond.desc ? html`<span class="bsg-option__desc">${cond.desc}</span>` : nothing}
                </span>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderNav() {
    var _a, _b, _c;
    const back = localizedString((_a = this.config) == null ? void 0 : _a.bsg_back_btn) || t("السابق", "Back"), next = localizedString((_b = this.config) == null ? void 0 : _b.bsg_next_btn) || t("التالي", "Next"), see = localizedString((_c = this.config) == null ? void 0 : _c.bsg_see_btn) || t("عرض التقدير", "See estimate"), lastStep = this.stepIndex === this.plan.length - 1;
    return html`
      <div class="bsg-nav">
        ${this.stepIndex > 0 ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
              ${back}
            </button>` : html`<span></span>`}
        <button
          type="button"
          class="fs-btn fs-tap"
          ?disabled=${!this.canNext}
          @click=${() => this.goNext()}
        >
          ${lastStep ? see : next}
        </button>
      </div>
    `;
  }
  renderCurrentStep() {
    const step = this.currentStep;
    return step ? step === "phototype" ? this.renderPhototypeStep(this.phototypes) : step === "spf" ? this.renderSpfStep(this.spfValues) : this.renderConditionStep(this.conditions) : nothing;
  }
  renderResults() {
    var _a, _b;
    const c = this.config || {}, phototypes = this.phototypes, spfValues = this.spfValues, conditions = this.conditions, tips = parseTips(c.bsg_tips), activePt = phototypes.find((p) => p.id === this.selectedPtId) ?? null, activeSpf = spfValues.find((s) => s.spf === this.selectedSpf) ?? null, activeCond = conditions.find((cond) => cond.id === this.selectedCondId) ?? null, factor = (activeCond == null ? void 0 : activeCond.factor) ?? 1, minutes = estimateMinutes((activePt == null ? void 0 : activePt.baseMinutes) ?? 0, (activeSpf == null ? void 0 : activeSpf.spf) ?? 0, factor), meterPct = clamp(minutes / METER_CAP_MINUTES * 100, 0, 100), showMeter = isTruthy(c.bsg_show_meter, !0), showNotice = isTruthy(c.bsg_show_notice, !0), reapplyMinutes = clamp(Math.round(toNumber(c.bsg_reapply_minutes, 120)), 1, 1e5), reapplyNote = localizedString(c.bsg_reapply_note), resultTitle = localizedString(c.bsg_result_title) || t("توصياتك", "Your guidance"), notice = localizedString(c.bsg_notice) || t("هذه إرشادات توعوية عامة وليست نصيحة طبية.", "This is general educational guidance, not medical advice."), reapplyMain = t(
      `أعيدي التطبيق كل ${reapplyMinutes} دقيقة`,
      `Reapply every ${reapplyMinutes} min`
    );
    return html`
      <div class="bsg-results" aria-live="polite">
        <h3 class="bsg-results__title">${resultTitle}</h3>

        <div class="bsg-results__summary">
          ${activePt ? html`<span class="bsg-results__pill">
                <span
                  class="bsg-swatch"
                  aria-hidden="true"
                  style=${styleMap(activePt.color ? { "--bsg-swatch": activePt.color } : {})}
                ></span>
                ${activePt.name}
              </span>` : nothing}
          ${activeSpf ? html`<span class="bsg-results__pill">${activeSpf.label}</span>` : nothing}
          ${activeCond ? html`<span class="bsg-results__pill">${activeCond.name}</span>` : nothing}
        </div>

        <div class="bsg-duration bsg-duration--hero">
          <span class="bsg-duration__label">
            ${t("تقدير تقريبي لمدة التعرّض الآمن", "Rough safe-exposure estimate")}
          </span>
          <span class="bsg-duration__value">${formatDuration(minutes)}</span>
        </div>

        ${showMeter ? html`<div class="bsg-meter-wrap bsg-meter-wrap--hero">
              <div
                class="bsg-meter"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow=${Math.round(meterPct)}
                aria-label=${t("مؤشر التعرّض التوضيحي", "Illustrative exposure meter")}
              >
                <span style=${styleMap({ width: `${meterPct}%` })}></span>
              </div>
              <p class="bsg-meter-caption">
                ${t("مؤشر توضيحي فقط — التقدير يقلّ في ظروف الانعكاس العالي.", "Illustrative only — the estimate drops in high-reflection conditions.")}
              </p>
            </div>` : nothing}

        <div class="bsg-reapply">
          <span class="bsg-reapply__icon" aria-hidden="true">☀︎</span>
          <div class="bsg-reapply__body">
            <p class="bsg-reapply__main">${reapplyMain}</p>
            ${reapplyNote ? html`<p class="bsg-reapply__note">${reapplyNote}</p>` : html`<p class="bsg-reapply__note">${t("أعيدي التطبيق بعد السباحة أو التعرّق.", "Reapply after swimming or sweating.")}</p>`}
          </div>
        </div>

        ${tips.length ? html`<div class="bsg-tips">
              <p class="bsg-tips__title">${t("نصائح", "Tips")}</p>
              <ul>${tips.map((tip) => html`<li>${tip}</li>`)}</ul>
            </div>` : nothing}

        <div class="bsg-results__actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
            ${localizedString((_a = this.config) == null ? void 0 : _a.bsg_back_btn) || t("تعديل الاختيارات", "Edit choices")}
          </button>
          <button type="button" class="fs-btn fs-tap" @click=${() => this.reset()}>
            ${localizedString((_b = this.config) == null ? void 0 : _b.bsg_reset_btn) || t("ابدئي من جديد", "Start over")}
          </button>
          ${renderCommerceCtaButton(c, "bsg_")}
        </div>

        ${showNotice ? html`<p class="bsg-notice bsg-notice--inline">${notice}</p>` : nothing}
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bsg_"), animate = theme.animate && !prefersReducedMotion(), phototypes = this.phototypes, spfValues = this.spfValues, plan = this.plan, title = localizedString(c.bsg_title), desc = localizedString(c.bsg_desc);
    return !phototypes.length || !spfValues.length ? html`
        <section
          class=${classMap({ "fs-section": !0, "fs-animate": animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t("دليل الحماية من الشمس", "Sun protection guide")}
        >
          <div class="fs-container">
            <div class="fs-empty" role="status">
              ${t("أكملي إعدادات العنصر لعرض الدليل.", "Complete the element settings to show the guide.")}
            </div>
          </div>
        </section>
      ` : html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("دليل الحماية من الشمس", "Sun protection guide")}
        tabindex="0"
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="bsg-wrap">
            ${this.renderProgress(plan.length)}
            ${this.onResults ? this.renderResults() : html`
                  ${this.renderCurrentStep()}
                  ${this.renderNav()}
                `}
          </div>
        </div>
      </section>
    `;
  }
};
__name(_BeautySpfGuide, "BeautySpfGuide"), _BeautySpfGuide.styles = [sharedSectionCss, componentStyles];
let BeautySpfGuide = _BeautySpfGuide;
__decorateClass([
  property({ type: Object })
], BeautySpfGuide.prototype, "config");
__decorateClass([
  state()
], BeautySpfGuide.prototype, "selectedPtId");
__decorateClass([
  state()
], BeautySpfGuide.prototype, "selectedSpf");
__decorateClass([
  state()
], BeautySpfGuide.prototype, "selectedCondId");
__decorateClass([
  state()
], BeautySpfGuide.prototype, "stepIndex");
typeof BeautySpfGuide < "u" && BeautySpfGuide.registerSallaComponent("salla-beauty-spf-guide");
export {
  BeautySpfGuide as default
};
