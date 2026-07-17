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
  findQuestion,
  isTerminal,
  parseQuestions,
  resolveStartKey,
  resolveStyle,
} from './utils.js';
import type { AssistantAnswer, AssistantQuestion } from './types.js';

export default class BeautyCareAssistant extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private currentKey = '';
  @state() private history: string[] = [];
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

  private restart(): void {
    const questions = this.questions;
    this.currentKey = resolveStartKey(this.config || {}, questions);
    this.history = [];
    this.result = null;
  }

  private goBack(): void {
    if (this.result) {
      this.result = null;
      return;
    }
    const prev = [...this.history];
    const last = prev.pop();
    if (last) {
      this.history = prev;
      this.currentKey = last;
    }
  }

  private chooseAnswer(answer: AssistantAnswer): void {
    const questions = this.questions;
    if (!isTerminal(answer, questions)) {
      this.history = [...this.history, this.currentKey];
      this.currentKey = answer.next;
      this.result = null;
      return;
    }

    // Terminal → show result
    this.result = answer;
  }

  private renderResult(answer: AssistantAnswer) {
    const c = this.config || {};
    return html`
      <div class="bca-result" aria-live="polite">
        ${answer.result_title
          ? html`<h3 class="bca-result__title">${answer.result_title}</h3>`
          : nothing}
        ${answer.result_desc
          ? html`<p class="bca-result__desc">${answer.result_desc}</p>`
          : nothing}
        ${answer.link
          ? html`<div class="fs-actions">
              <a class="fs-btn" href=${answer.link}>
                ${answer.link_text || localizedString(c.bca_result_btn as string) || t('انتقلي إلى النتيجة', 'Go to result')}
              </a>
            </div>`
          : nothing}
        <div class="bca-nav">
          <button type="button" class="fs-btn fs-btn--ghost" @click=${this.goBack}>
            ${t('رجوع', 'Back')}
          </button>
          <button type="button" class="fs-btn fs-btn--ghost" @click=${this.restart}>
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
            <button type="button" class="bca-answer" @click=${() => this.chooseAnswer(answer)}>
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
    const stepIndex = this.history.length + (this.result ? 1 : 0);
    const progress = Math.min(100, Math.round(((stepIndex + 1) / (questions.length + 1)) * 100));

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
                  <span class="bca-topbar__hint">${t('سأساعدك في اختيار الأنسب لكِ', 'I will help you choose')}</span>
                </div>
              </div>

              <div class="bca-body">
                <div class="bca-progress" role="progressbar" aria-valuenow=${progress} aria-valuemin="0" aria-valuemax="100">
                  <span style=${styleMap({ width: `${progress}%` })}></span>
                </div>

                ${this.result
                  ? this.renderResult(this.result)
                  : html`
                      ${current.image
                        ? html`<img
                            src=${current.image}
                            alt=""
                            loading="lazy"
                            style="width:100%;max-height:200px;object-fit:cover;border-radius:14px"
                          />`
                        : nothing}
                      <div class="bca-bubble">${current.text || t('اختاري أحد الخيارات', 'Choose an option')}</div>
                      ${this.renderQuestion(current)}
                      ${this.history.length
                        ? html`<div class="bca-nav">
                            <button type="button" class="fs-btn fs-btn--ghost" @click=${this.goBack}>
                              ${t('رجوع', 'Back')}
                            </button>
                            <button type="button" class="fs-btn fs-btn--ghost" @click=${this.restart}>
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
