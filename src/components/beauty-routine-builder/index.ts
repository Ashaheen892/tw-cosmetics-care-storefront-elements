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
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { buildQuestions, buildRoutine, parseSteps } from './utils.js';
import type { Answers, Question, QuestionKey, RoutineStep } from './types.js';

export default class BeautyRoutineBuilder extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private answers: Answers = {};
  @state() private steps: RoutineStep[] = [];

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.load();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this.load();
  }

  private load(): void {
    this.steps = parseSteps(this.config?.brb_steps);
  }

  private get routine(): RoutineStep[] {
    return buildRoutine(this.steps, this.answers);
  }

  private pick(key: QuestionKey, value: string): void {
    const next = { ...this.answers };
    if (next[key] === value) delete next[key];
    else next[key] = value;
    this.answers = next;
  }

  private reset(): void {
    this.answers = {};
  }

  private renderQuestion(q: Question) {
    return html`
      <div class="brb-q">
        <span class="brb-q__label">${q.label}</span>
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

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'brb_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.brb_title as string);
    const desc = localizedString(c.brb_desc as string);
    const questions = buildQuestions(c);
    const routine = this.routine;
    const showLink = isTruthy(c.brb_show_link, true);
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
              <div class="brb-quiz">
                ${questions.map((q) => this.renderQuestion(q))}
              </div>

              <div class="brb-routine">
                <div class="brb-routine__head">
                  <h3 class="brb-routine__title">
                    ${localizedString(c.brb_result_title as string) || t('روتينك المقترح', 'Your suggested routine')}
                  </h3>
                  <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.reset}>
                    ${localizedString(c.brb_reset_btn as string) || t('إعادة الاختيار', 'Start over')}
                  </button>
                </div>

                ${routine.length
                  ? html`<div class="brb-timeline" role="list">
                      ${routine.map((step, i) => this.renderStep(step, i, showLink))}
                    </div>`
                  : html`<p class="fs-empty">${t('لا توجد خطوات مطابقة لاختياراتك', 'No steps match your choices')}</p>`}

                ${routine.length
                  ? html`<div class="brb-summary">
                      <span class="brb-summary__total">${routine.length} ${t('خطوات', 'steps')}</span>
                    </div>`
                  : nothing}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
