var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, b as extractLink, e as extractImageUrl, j as toNumber, g as getRadioValue, s as sharedSectionCss, t, i as isTruthy, r as readSectionTheme, p as prefersReducedMotion, a as themeStyleMap } from "./sharedStyles-2kfPtH3m.js";
import { r as renderCommerceCtaButton } from "./commerceOutcome-BDH0KFrf.js";
const componentStyles = css`
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
`, QUESTIONS = [
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
], LEVEL_RANK = { quick: 1, basic: 2, complete: 3 };
function isEn() {
  var _a, _b;
  return ((_b = typeof document < "u" ? (_a = document.documentElement.lang) == null ? void 0 : _a.split(/[-_]/)[0] : "ar") == null ? void 0 : _b.toLowerCase()) === "en";
}
__name(isEn, "isEn");
function buildQuestions(config) {
  const en = isEn();
  return QUESTIONS.map((q) => {
    const label = localizedString(config[q.labelKey]) || (en ? q.labelEn : q.labelAr), options = q.options.map((o) => ({
      value: o.value,
      label: en ? o.en : o.ar
    }));
    return { key: q.key, label, options };
  });
}
__name(buildQuestions, "buildQuestions");
function readMatch(row, key) {
  const raw = row[key] ?? row[`brb_steps.${key}`];
  return getRadioValue(raw, "").toLowerCase().trim();
}
__name(readMatch, "readMatch");
function parseSteps(raw) {
  return normalizeCollection(raw).map((row, index) => {
    const name = localizedString(row.step_name) || "";
    return {
      id: `step-${index}`,
      step_name: name,
      step_desc: localizedString(row.step_desc),
      order: toNumber(row.order, index + 1),
      level: readMatch(row, "level") || "quick",
      skin: readMatch(row, "skin"),
      concern: readMatch(row, "concern"),
      time: readMatch(row, "time"),
      image: extractImageUrl(row.image),
      name,
      link: extractLink(row.link ?? row["brb_steps.link"])
    };
  }).filter((s) => s.step_name || s.step_desc);
}
__name(parseSteps, "parseSteps");
function timeMatches(stepTime, selTime) {
  return !stepTime || !selTime || stepTime === "both" || selTime === "both" ? !0 : stepTime === selTime;
}
__name(timeMatches, "timeMatches");
function buildRoutine(steps, answers) {
  const maxRank = answers.routine ? LEVEL_RANK[answers.routine] ?? 3 : 3;
  return steps.filter((step) => {
    const levelOk = (LEVEL_RANK[step.level] ?? 1) <= maxRank, skinOk = !answers.skin || !step.skin || step.skin === answers.skin, concernOk = !answers.concern || !step.concern || step.concern === answers.concern, timeOk = timeMatches(step.time, answers.time);
    return levelOk && skinOk && concernOk && timeOk;
  }).sort((a, b) => a.order - b.order);
}
__name(buildRoutine, "buildRoutine");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _BeautyRoutineBuilder = class _BeautyRoutineBuilder extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.answers = {}, this.steps = [], this.stepIndex = 0, this.boundLangHandler = () => this.requestUpdate(), this.boundKeyHandler = (event) => this.onKeyDown(event);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.addEventListener("keydown", this.boundKeyHandler), this.load();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.removeEventListener("keydown", this.boundKeyHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.load();
  }
  load() {
    var _a;
    this.steps = parseSteps((_a = this.config) == null ? void 0 : _a.brb_steps);
  }
  get questions() {
    return buildQuestions(this.config || {});
  }
  get onResults() {
    return this.stepIndex >= this.questions.length;
  }
  get routine() {
    return buildRoutine(this.steps, this.answers);
  }
  pick(key, value) {
    this.answers = { ...this.answers, [key]: value };
  }
  goNext() {
    const max = this.questions.length;
    this.stepIndex < max && (this.stepIndex += 1);
  }
  goBack() {
    this.stepIndex > 0 && (this.stepIndex -= 1);
  }
  reset() {
    this.answers = {}, this.stepIndex = 0;
  }
  onKeyDown(event) {
    const target = event.target;
    if (target != null && target.closest("button, a, input, textarea, select")) return;
    const current = this.questions[this.stepIndex], answered = current ? !!this.answers[current.key] : !1;
    event.key === "Enter" && !this.onResults && answered && (event.preventDefault(), this.goNext()), event.key === "Backspace" && this.stepIndex > 0 && !this.onResults && (event.preventDefault(), this.goBack());
  }
  renderProgress(total) {
    const current = Math.min(this.stepIndex + 1, total), pct = total ? Math.round(Math.min(this.stepIndex, total) / total * 100) : 0;
    return html`
      <div class="brb-progress" aria-hidden="true">
        <div class="brb-progress__bar"><span style=${styleMap({ width: `${pct}%` })}></span></div>
        <span class="brb-progress__text">
          ${this.onResults ? t("النتيجة", "Result") : t(`السؤال ${current} من ${total}`, `Question ${current} of ${total}`)}
        </span>
      </div>
    `;
  }
  renderQuestion(q) {
    return html`
      <div class="brb-question">
        <h3 class="brb-question__title">${q.label}</h3>
        <div class="brb-chips" role="group" aria-label=${q.label}>
          ${q.options.map((opt) => {
      const active = this.answers[q.key] === opt.value;
      return html`<button
              type="button"
              class="brb-chip"
              aria-pressed=${active ? "true" : "false"}
              @click=${() => this.pick(q.key, opt.value)}
            >
              ${opt.label}
            </button>`;
    })}
        </div>
      </div>
    `;
  }
  renderNav(canNext) {
    var _a, _b, _c;
    const back = localizedString((_a = this.config) == null ? void 0 : _a.brb_back_btn) || t("السابق", "Back"), next = localizedString((_b = this.config) == null ? void 0 : _b.brb_next_btn) || t("التالي", "Next"), see = localizedString((_c = this.config) == null ? void 0 : _c.brb_see_btn) || t("عرض الروتين", "See routine"), lastQ = this.stepIndex === this.questions.length - 1;
    return html`
      <div class="brb-nav">
        ${this.stepIndex > 0 ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
              ${back}
            </button>` : html`<span></span>`}
        <button
          type="button"
          class="fs-btn fs-tap"
          ?disabled=${!canNext}
          @click=${() => this.goNext()}
        >
          ${lastQ ? see : next}
        </button>
      </div>
    `;
  }
  renderStep(step, index, showLink) {
    return html`
      <div class="brb-step" role="listitem">
        <span class="brb-step__num" aria-hidden="true">${index + 1}</span>
        ${step.image ? html`<img class="brb-step__thumb" src=${step.image} alt="" loading="lazy" decoding="async" />` : html`<span class="brb-step__thumb" aria-hidden="true"></span>`}
        <div class="brb-step__body">
          <h4 class="brb-step__name">${step.step_name || step.name || t("خطوة", "Step")}</h4>
          ${step.step_desc ? html`<p class="brb-step__desc">${step.step_desc}</p>` : nothing}
          ${showLink && step.link ? html`<div class="brb-step__actions">
                <a class="fs-btn fs-btn--ghost" href=${step.link} target="_blank" rel="noopener noreferrer">
                  ${t("التفاصيل", "Details")}
                </a>
              </div>` : nothing}
        </div>
      </div>
    `;
  }
  renderResults() {
    const c = this.config || {}, routine = this.routine, showLink = isTruthy(c.brb_show_link, !0), resultsTitle = localizedString(c.brb_result_title) || t("روتينك المقترح", "Your suggested routine");
    return html`
      <div class="brb-results" aria-live="polite">
        <div class="brb-routine__head">
          <h3 class="brb-routine__title">
            ${resultsTitle}
            ${routine.length ? html`<span class="brb-routine__count"> · ${routine.length} ${t("خطوات", "steps")}</span>` : nothing}
          </h3>
        </div>

        ${routine.length ? html`<div class="brb-timeline" role="list">
              ${routine.map((step, i) => this.renderStep(step, i, showLink))}
            </div>` : html`<p class="fs-empty">${t("لا توجد خطوات مطابقة لاختياراتك", "No steps match your choices")}</p>`}

        <div class="brb-results__actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
            ${localizedString(c.brb_back_btn) || t("تعديل الإجابات", "Edit answers")}
          </button>
          <button type="button" class="fs-btn fs-tap" @click=${() => this.reset()}>
            ${localizedString(c.brb_reset_btn) || t("إعادة الاختيار", "Start over")}
          </button>
          ${renderCommerceCtaButton(c, "brb_")}
        </div>
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "brb_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.brb_title), desc = localizedString(c.brb_desc), questions = this.questions, current = questions[this.stepIndex], answered = current ? !!this.answers[current.key] : !1, shape = getRadioValue(c.brb_card_shape, "soft"), bgImage = localizedString(c.brb_bg_image);
    return this.steps.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("منشئ روتين العناية", "Beauty routine builder")}
        tabindex="0"
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div
            class=${classMap({
      "brb-shell": !0,
      "brb-card--sharp": shape === "sharp",
      "brb-card--pill": shape === "pill"
    })}
          >
            ${bgImage ? html`<img class="brb-shell__bg" src=${bgImage} alt="" loading="lazy" decoding="async" />` : nothing}
            <div class="brb-inner">
              ${this.renderProgress(questions.length)}
              ${this.onResults ? this.renderResults() : html`
                    ${current ? this.renderQuestion(current) : nothing}
                    ${this.renderNav(answered)}
                  `}
            </div>
          </div>
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t("أضيفي خطوات الروتين من إعدادات العنصر", "Add routine steps in the element settings")}
      </div>`;
  }
};
__name(_BeautyRoutineBuilder, "BeautyRoutineBuilder"), _BeautyRoutineBuilder.styles = [sharedSectionCss, componentStyles];
let BeautyRoutineBuilder = _BeautyRoutineBuilder;
__decorateClass([
  property({ type: Object })
], BeautyRoutineBuilder.prototype, "config");
__decorateClass([
  state()
], BeautyRoutineBuilder.prototype, "answers");
__decorateClass([
  state()
], BeautyRoutineBuilder.prototype, "steps");
__decorateClass([
  state()
], BeautyRoutineBuilder.prototype, "stepIndex");
typeof BeautyRoutineBuilder < "u" && BeautyRoutineBuilder.registerSallaComponent("salla-beauty-routine-builder");
export {
  BeautyRoutineBuilder as default
};
