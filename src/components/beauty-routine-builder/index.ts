import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  getRadioValue,
  isTruthy,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { renderCommerceCtaButton } from '../../utils/commerceOutcome.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { buildQuestions, buildRoutine, parseSteps } from './utils.js';
import type { Answers, Question, QuestionKey, RoutineStep } from './types.js';

/**
 * Guided routine quiz: one question at a time, then a matching routine timeline.
 * Product-free — educational matching only.
 */
export default class BeautyRoutineBuilder extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private answers: Answers = {};
  @state() private steps: RoutineStep[] = [];
  /** 0..questions.length-1 = question; questions.length = results */
  @state() private stepIndex = 0;

  private boundLangHandler = () => this.requestUpdate();
  private boundKeyHandler = (event: KeyboardEvent) => this.onKeyDown(event);

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.addEventListener('keydown', this.boundKeyHandler);
    this.load();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    this.removeEventListener('keydown', this.boundKeyHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this.load();
  }

  private load(): void {
    this.steps = parseSteps(this.config?.brb_steps);
  }

  private get questions(): Question[] {
    return buildQuestions(this.config || {});
  }

  private get onResults(): boolean {
    return this.stepIndex >= this.questions.length;
  }

  private get routine(): RoutineStep[] {
    return buildRoutine(this.steps, this.answers);
  }

  private label(key: string, ar: string, en: string): string {
    return localizedString(this.config?.[key] as string) || t(ar, en);
  }

  private pick(key: QuestionKey, value: string): void {
    this.answers = { ...this.answers, [key]: value };
  }

  private goNext(): void {
    const max = this.questions.length;
    if (this.stepIndex < max) this.stepIndex += 1;
  }

  private goBack(): void {
    if (this.stepIndex > 0) this.stepIndex -= 1;
  }

  private reset(): void {
    this.answers = {};
    this.stepIndex = 0;
  }

  private onKeyDown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (target?.closest('button, a, input, textarea, select')) return;

    const current = this.questions[this.stepIndex];
    const answered = current ? Boolean(this.answers[current.key]) : false;

    if (event.key === 'Enter' && !this.onResults && answered) {
      event.preventDefault();
      this.goNext();
    }
    if (event.key === 'Backspace' && this.stepIndex > 0 && !this.onResults) {
      event.preventDefault();
      this.goBack();
    }
  }

  private renderProgress(total: number) {
    const current = Math.min(this.stepIndex + 1, total);
    const pct = total ? Math.round((Math.min(this.stepIndex, total) / total) * 100) : 0;
    return html`
      <div class="brb-progress" aria-hidden="true">
        <div class="brb-progress__bar"><span style=${styleMap({ width: `${pct}%` })}></span></div>
        <span class="brb-progress__text">
          ${this.onResults
            ? t('النتيجة', 'Result')
            : t(`السؤال ${current} من ${total}`, `Question ${current} of ${total}`)}
        </span>
      </div>
    `;
  }

  private renderQuestion(q: Question) {
    return html`
      <div class="brb-question">
        <h3 class="brb-question__title">${q.label}</h3>
        <div class="brb-chips" role="group" aria-label=${q.label}>
          ${q.options.map((opt) => {
            const active = this.answers[q.key] === opt.value;
            return html`<button
              type="button"
              class="brb-chip"
              aria-pressed=${active ? 'true' : 'false'}
              @click=${() => this.pick(q.key, opt.value)}
            >
              ${opt.label}
            </button>`;
          })}
        </div>
      </div>
    `;
  }

  private renderNav(canNext: boolean) {
    const back = this.label('brb_back_btn', 'السابق', 'Back');
    const next = this.label('brb_next_btn', 'التالي', 'Next');
    const see = this.label('brb_see_btn', 'عرض الروتين', 'See routine');
    const lastQ = this.stepIndex === this.questions.length - 1;

    return html`
      <div class="brb-nav">
        ${this.stepIndex > 0
          ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
              ${back}
            </button>`
          : html`<span></span>`}
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

  private renderStep(step: RoutineStep, index: number, showLink: boolean) {
    return html`
      <div class="brb-step" role="listitem">
        <span class="brb-step__num" aria-hidden="true">${index + 1}</span>
        ${step.image
          ? html`<img class="brb-step__thumb" src=${step.image} alt="" loading="lazy" decoding="async" />`
          : html`<span class="brb-step__thumb" aria-hidden="true"></span>`}
        <div class="brb-step__body">
          <h4 class="brb-step__name">${step.step_name || step.name || t('خطوة', 'Step')}</h4>
          ${step.step_desc ? html`<p class="brb-step__desc">${step.step_desc}</p>` : nothing}
          ${showLink && step.link
            ? html`<div class="brb-step__actions">
                <a class="fs-btn fs-btn--ghost" href=${step.link} target="_blank" rel="noopener noreferrer">
                  ${t('التفاصيل', 'Details')}
                </a>
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  private renderResults() {
    const c = this.config || {};
    const routine = this.routine;
    const showLink = isTruthy(c.brb_show_link, true);
    const resultsTitle =
      localizedString(c.brb_result_title as string) || t('روتينك المقترح', 'Your suggested routine');

    return html`
      <div class="brb-results" aria-live="polite">
        <div class="brb-routine__head">
          <h3 class="brb-routine__title">
            ${resultsTitle}
            ${routine.length
              ? html`<span class="brb-routine__count"> · ${routine.length} ${t('خطوات', 'steps')}</span>`
              : nothing}
          </h3>
        </div>

        ${routine.length
          ? html`<div class="brb-timeline" role="list">
              ${routine.map((step, i) => this.renderStep(step, i, showLink))}
            </div>`
          : html`<p class="fs-empty">${t('لا توجد خطوات مطابقة لاختياراتك', 'No steps match your choices')}</p>`}

        <div class="brb-results__actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
            ${this.label('brb_back_btn', 'تعديل الإجابات', 'Edit answers')}
          </button>
          <button type="button" class="fs-btn fs-tap" @click=${() => this.reset()}>
            ${localizedString(c.brb_reset_btn as string) || t('إعادة الاختيار', 'Start over')}
          </button>
          ${renderCommerceCtaButton(c, 'brb_')}
        </div>
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'brb_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.brb_title as string);
    const desc = localizedString(c.brb_desc as string);
    const questions = this.questions;
    const current = questions[this.stepIndex];
    const answered = current ? Boolean(this.answers[current.key]) : false;
    const shape = getRadioValue(c.brb_card_shape, 'soft');
    const bgImage = localizedString(c.brb_bg_image as string);

    if (!this.steps.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي خطوات الروتين من إعدادات العنصر', 'Add routine steps in the element settings')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('منشئ روتين العناية', 'Beauty routine builder')}
        tabindex="0"
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div
            class=${classMap({
              'brb-shell': true,
              'brb-card--sharp': shape === 'sharp',
              'brb-card--pill': shape === 'pill',
            })}
          >
            ${bgImage
              ? html`<img class="brb-shell__bg" src=${bgImage} alt="" loading="lazy" decoding="async" />`
              : nothing}
            <div class="brb-inner">
              ${this.renderProgress(questions.length)}
              ${this.onResults
                ? this.renderResults()
                : html`
                    ${current ? this.renderQuestion(current) : nothing}
                    ${this.renderNav(answered)}
                  `}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
