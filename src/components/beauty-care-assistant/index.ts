import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import {
  computeProgress,
  currentDepth,
  estimateMaxDepth,
  findQuestion,
  isTerminal,
  parseQuestions,
  resolveStartKey,
  resolveStyle,
} from './utils.js';
import type { AssistantAnswer, AssistantQuestion, TrailStep } from './types.js';

export default class BeautyCareAssistant extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private currentKey = '';
  @state() private trail: TrailStep[] = [];
  @state() private result: AssistantAnswer | null = null;

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.restart();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this.restart();
  }

  private get questions(): AssistantQuestion[] {
    return parseQuestions(this.config?.bca_questions);
  }

  private get startKey(): string {
    return resolveStartKey(this.config || {}, this.questions);
  }

  private get maxDepth(): number {
    return estimateMaxDepth(this.questions, this.startKey);
  }

  private restart(): void {
    this.currentKey = this.startKey;
    this.trail = [];
    this.result = null;
  }

  private goBack(): void {
    if (this.result) {
      this.result = null;
      return;
    }
    const prev = [...this.trail];
    const last = prev.pop();
    if (last) {
      this.trail = prev;
      this.currentKey = last.questionKey;
    }
  }

  private jumpToStep(index: number): void {
    if (this.result) this.result = null;
    if (index < 0) {
      this.trail = [];
      this.currentKey = this.startKey;
      return;
    }
    const slice = this.trail.slice(0, index + 1);
    const target = slice[slice.length - 1];
    if (!target) return;
    this.trail = slice.slice(0, -1);
    this.currentKey = target.questionKey;
  }

  private chooseAnswer(answer: AssistantAnswer): void {
    const questions = this.questions;
    const current = findQuestion(questions, this.currentKey);
    if (!current) return;

    if (!isTerminal(answer, questions)) {
      this.trail = [
        ...this.trail,
        {
          questionKey: this.currentKey,
          questionText: current.text,
          answerLabel: answer.label || t('اختيار', 'Choice'),
        },
      ];
      this.currentKey = answer.next;
      this.result = null;
      return;
    }

    this.trail = [
      ...this.trail,
      {
        questionKey: this.currentKey,
        questionText: current.text,
        answerLabel: answer.label || t('اختيار', 'Choice'),
      },
    ];
    this.result = answer;
  }

  private renderTrail() {
    if (!this.trail.length && !this.result) return nothing;

    return html`
      <nav class="bca-trail" aria-label=${t('مسار إجاباتك', 'Your answer path')}>
        <ol class="bca-trail__list">
          ${this.trail.map(
            (step, index) => html`
              <li class="bca-trail__item">
                <button
                  type="button"
                  class="bca-trail__chip"
                  title=${step.questionText}
                  @click=${() => this.jumpToStep(index)}
                >
                  <span class="bca-trail__answer">${step.answerLabel}</span>
                </button>
                <span class="bca-trail__sep" aria-hidden="true">›</span>
              </li>
            `
          )}
          ${this.result
            ? html`<li class="bca-trail__item bca-trail__item--current" aria-current="step">
                <span class="bca-trail__chip bca-trail__chip--current">
                  ${this.result.result_title || t('النتيجة', 'Result')}
                </span>
              </li>`
            : html`<li class="bca-trail__item bca-trail__item--current" aria-current="step">
                <span class="bca-trail__chip bca-trail__chip--current">
                  ${t('السؤال الحالي', 'Current question')}
                </span>
              </li>`}
        </ol>
      </nav>
    `;
  }

  private renderResult(answer: AssistantAnswer) {
    const c = this.config || {};
    return html`
      <div class="bca-result" aria-live="polite">
        <div class="bca-result__badge" aria-hidden="true">✦</div>
        ${answer.result_title
          ? html`<h3 class="bca-result__title">${answer.result_title}</h3>`
          : html`<h3 class="bca-result__title">${t('إليكِ توصيتنا', 'Here is our recommendation')}</h3>`}
        ${answer.result_desc
          ? html`<p class="bca-result__desc">${answer.result_desc}</p>`
          : nothing}
        ${answer.link
          ? html`<div class="bca-result__actions">
              <a class="fs-btn fs-tap" href=${answer.link}>
                ${answer.link_text || localizedString(c.bca_result_btn as string) || t('انتقلي إلى النتيجة', 'Go to result')}
              </a>
            </div>`
          : nothing}
        <div class="bca-nav">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
            ${t('تعديل آخر إجابة', 'Edit last answer')}
          </button>
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.restart}>
            ${localizedString(c.bca_restart_btn as string) || t('إعادة البدء', 'Start over')}
          </button>
        </div>
      </div>
    `;
  }

  private renderQuestion(question: AssistantQuestion) {
    return html`
      <div class="bca-answers" role="group" aria-label=${question.text || t('الخيارات', 'Options')}>
        ${question.answers.map(
          (answer) => html`
            <button type="button" class="bca-answer fs-tap" @click=${() => this.chooseAnswer(answer)}>
              ${answer.image
                ? html`<img class="bca-answer__icon" src=${answer.image} alt="" loading="lazy" />`
                : nothing}
              <span>${answer.label || t('اختيار', 'Choice')}</span>
            </button>
          `
        )}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bca_');
    const animate = theme.animate && !prefersReducedMotion();
    const questions = this.questions;
    const style = resolveStyle(c);
    const title = localizedString(c.bca_title as string);
    const desc = localizedString(c.bca_desc as string);
    const assistantName =
      localizedString(c.bca_assistant_name as string) || t('خبيرة الجمال', 'Beauty expert');
    const avatar = localizedString(c.bca_avatar as string);

    if (!questions.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي أسئلة المساعد من إعدادات العنصر', 'Add assistant questions in the element settings')}
      </div>`;
    }

    const current = findQuestion(questions, this.currentKey) || questions[0];
    const hasResult = Boolean(this.result);
    const depth = currentDepth(this.trail, hasResult);
    const maxDepth = this.maxDepth;
    const progress = computeProgress(this.trail, hasResult, maxDepth);
    const progressLabel = hasResult
      ? t('اكتملت الرحلة', 'Journey complete')
      : t(`الخطوة ${depth}`, `Step ${depth}`);

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('مساعد اختيار منتجات الجمال', 'Beauty care assistant')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class=${classMap({ [`bca--${style}`]: true })}>
            <div class="bca-shell">
              <div class="bca-topbar">
                ${avatar
                  ? html`<img class="bca-avatar" src=${avatar} alt="" loading="lazy" />`
                  : html`<span class="bca-avatar" aria-hidden="true">✦</span>`}
                <div class="bca-topbar__meta">
                  <span class="bca-topbar__name">${assistantName}</span>
                  <span class="bca-trail__hint">${t('سأساعدك في اختيار الأنسب لكِ', 'I will help you choose')}</span>
                </div>
              </div>

              <div class="bca-body">
                <div class="bca-progress-wrap">
                  <div
                    class="bca-progress"
                    role="progressbar"
                    aria-valuenow=${progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label=${progressLabel}
                  >
                    <span style=${styleMap({ width: `${progress}%` })}></span>
                  </div>
                  <span class="bca-progress__label">${progressLabel}</span>
                </div>

                ${this.renderTrail()}

                ${this.result
                  ? this.renderResult(this.result)
                  : html`
                      ${current.image
                        ? html`<img
                            class="bca-question-img"
                            src=${current.image}
                            alt=""
                            loading="lazy"
                          />`
                        : nothing}
                      <div class="bca-bubble">${current.text || t('اختاري أحد الخيارات', 'Choose an option')}</div>
                      ${this.renderQuestion(current)}
                      ${this.trail.length
                        ? html`<div class="bca-nav">
                            <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
                              ${t('رجوع', 'Back')}
                            </button>
                            <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.restart}>
                              ${localizedString(c.bca_restart_btn as string) || t('إعادة البدء', 'Start over')}
                            </button>
                          </div>`
                        : nothing}
                    `}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
