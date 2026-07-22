var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, e as extractImageUrl, g as getRadioValue, b as extractLink, s as sharedSectionCss, t, r as readSectionTheme, p as prefersReducedMotion, a as themeStyleMap } from "./sharedStyles-Bu7Tok5Z.js";
import { r as renderCommerceCtaButton } from "./commerceOutcome-BLJKzvei.js";
const componentStyles = css`
  :host {
    direction: inherit;
  }

  .bca-shell {
    max-width: 720px;
    margin-inline: auto;
    border-radius: var(--section-radius, 18px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 14px 40px rgba(43, 33, 28, 0.08);
    overflow: hidden;
  }

  .bca-topbar {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.9rem 1.1rem;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    border-bottom: 1px solid var(--border-color, #e5e7eb);
  }

  .bca-avatar {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    object-fit: cover;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, #fff);
    display: grid;
    place-items: center;
    color: #fff;
    font-size: 1.1rem;
    flex: 0 0 auto;
  }

  .bca-topbar__meta {
    display: grid;
    gap: 0.1rem;
    min-width: 0;
  }

  .bca-topbar__name {
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--text-color, #000000);
  }

  .bca-trail__hint {
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
  }

  .bca-body {
    padding: 1.1rem;
    display: grid;
    gap: 1rem;
  }

  .bca-progress-wrap {
    display: grid;
    gap: 0.35rem;
  }

  .bca-progress {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, transparent);
    overflow: hidden;
  }

  .bca-progress > span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #7b2c52)
    );
    transition: width 0.35s ease;
  }

  .bca-progress__label {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--muted-color, #666666);
  }

  .bca-trail {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  .bca-trail__list {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    min-width: min-content;
  }

  .bca-trail__item {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
  }

  .bca-trail__item--current .bca-trail__sep {
    display: none;
  }

  .bca-trail__chip {
    display: inline-flex;
    align-items: center;
    max-width: 9rem;
    padding: 0.35rem 0.65rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.72rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  button.bca-trail__chip:hover {
    border-color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff));
  }

  .bca-trail__chip--current {
    border-color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    cursor: default;
    max-width: 11rem;
  }

  .bca-trail__sep {
    margin-inline: 0.25rem;
    color: var(--muted-color, #666666);
    font-size: 0.85rem;
    user-select: none;
  }

  .bca-bubble {
    max-width: 85%;
    padding: 0.85rem 1.05rem;
    border-radius: 16px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    color: var(--text-color, #000000);
    font-size: 1rem;
    line-height: 1.6;
    border-start-start-radius: 4px;
  }

  .bca-question-img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 14px;
  }

  .bca-answers {
    display: grid;
    gap: 0.55rem;
  }

  .bca-answer {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    width: 100%;
    padding: 0.7rem 0.9rem;
    border-radius: 14px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 600;
    text-align: start;
    cursor: pointer;
    transition: border-color 0.2s ease, transform 0.15s ease, background 0.2s ease;
  }

  .bca-answer:hover {
    border-color: var(--accent-color, var(--fs-store-primary));
    transform: translateY(-1px);
  }

  .bca-answer__icon {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 10px;
    object-fit: cover;
    flex: 0 0 auto;
  }

  .bca-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: space-between;
  }

  .bca-result {
    display: grid;
    gap: 0.75rem;
    padding: 1.1rem 1.15rem;
    border-radius: calc(var(--section-radius, 18px) * 0.85);
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, var(--card-bg, #fff)),
      var(--card-bg, #fff)
    );
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, var(--border-color, #e5e7eb));
    box-shadow: 0 10px 28px rgba(194, 82, 127, 0.1);
  }

  .bca-result__badge {
    width: 2.4rem;
    height: 2.4rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-size: 1rem;
    font-weight: 800;
  }

  .bca-result__title {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 800;
    line-height: 1.3;
    color: var(--text-color, #000000);
  }

  .bca-result__desc {
    margin: 0;
    color: var(--muted-color, #666666);
    line-height: 1.65;
    font-size: 0.95rem;
  }

  .bca-result__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.15rem;
  }

  /* —— Style: expert (avatar-forward) —— */
  .bca--expert .bca-topbar {
    flex-direction: column;
    text-align: center;
    padding: 1.3rem;
  }
  .bca--expert .bca-avatar {
    width: 4.5rem;
    height: 4.5rem;
    font-size: 1.8rem;
  }

  /* —— Style: mirror (framed) —— */
  .bca--mirror .bca-shell {
    border-width: 6px;
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, #fff);
    border-radius: 999px / 60px;
    background: linear-gradient(180deg, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, #fff), var(--card-bg, #fff));
  }

  /* —— Style: cards —— */
  .bca--cards .bca-bubble {
    max-width: 100%;
    text-align: center;
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 16px;
  }
  .bca--cards .bca-answers {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
  .bca--cards .bca-answer {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
  .bca--cards .bca-answer__icon {
    width: 3.2rem;
    height: 3.2rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .bca-answer,
    .bca-progress > span,
    .bca-trail__chip {
      transition: none;
    }
  }

  @media (max-width: 520px) {
    .bca-bubble {
      max-width: 100%;
    }
    .bca-result__title {
      font-size: 1.2rem;
    }
  }
`;
function slug(value, fallback) {
  return value.trim().toLowerCase().replace(/\s+/g, "-") || fallback;
}
__name(slug, "slug");
function parseAnswers(raw, qKey) {
  return normalizeCollection(raw).map((row, index) => ({
    id: `${qKey}-a${index}`,
    label: localizedString(row.label),
    image: extractImageUrl(row.image),
    next: localizedString(row.next).trim(),
    result_title: localizedString(row.result_title),
    result_desc: localizedString(row.result_desc),
    link: extractLink(row.link),
    link_text: localizedString(row.link_text)
  })).filter((a) => a.label || a.result_title || a.link);
}
__name(parseAnswers, "parseAnswers");
function parseQuestions(raw) {
  return normalizeCollection(raw).map((row, index) => {
    const key = slug(localizedString(row.q_key), `q${index + 1}`);
    return {
      key,
      text: localizedString(row.q_text),
      image: extractImageUrl(row.q_image),
      answers: parseAnswers(row.answers, key)
    };
  }).filter((q) => q.text || q.answers.length);
}
__name(parseQuestions, "parseQuestions");
function resolveStartKey(config, questions) {
  var _a;
  const configured = localizedString(config.bca_start_key).trim().toLowerCase().replace(/\s+/g, "-");
  return configured && questions.some((q) => q.key === configured) ? configured : ((_a = questions[0]) == null ? void 0 : _a.key) ?? "";
}
__name(resolveStartKey, "resolveStartKey");
function findQuestion(questions, key) {
  return questions.find((q) => q.key === key) ?? null;
}
__name(findQuestion, "findQuestion");
function isTerminal(answer, questions) {
  return answer.next ? !questions.some((q) => q.key === answer.next) : !0;
}
__name(isTerminal, "isTerminal");
function resolveStyle(config) {
  const val = getRadioValue(config.bca_style, "chat");
  return val === "expert" || val === "mirror" || val === "cards" ? val : "chat";
}
__name(resolveStyle, "resolveStyle");
function estimateMaxDepth(questions, startKey) {
  if (!startKey || !questions.length) return 1;
  const byKey = new Map(questions.map((q) => [q.key, q]));
  let maxDepth = 1;
  function walk(key, depth, seen) {
    const question = byKey.get(key);
    if (!question) {
      maxDepth = Math.max(maxDepth, depth);
      return;
    }
    if (seen.has(key)) {
      maxDepth = Math.max(maxDepth, depth);
      return;
    }
    const nextSeen = new Set(seen);
    nextSeen.add(key);
    let branched = !1;
    for (const answer of question.answers)
      isTerminal(answer, questions) ? (maxDepth = Math.max(maxDepth, depth + 1), branched = !0) : answer.next && (branched = !0, walk(answer.next, depth + 1, nextSeen));
    branched || (maxDepth = Math.max(maxDepth, depth));
  }
  return __name(walk, "walk"), walk(startKey, 1, /* @__PURE__ */ new Set()), Math.max(maxDepth, 1);
}
__name(estimateMaxDepth, "estimateMaxDepth");
function currentDepth(trail, hasResult) {
  return trail.length + 1;
}
__name(currentDepth, "currentDepth");
function computeProgress(trail, hasResult, maxDepth) {
  if (hasResult) return 100;
  const depth = trail.length + 1, cap = Math.max(maxDepth, depth);
  return Math.min(92, Math.round(depth / cap * 100));
}
__name(computeProgress, "computeProgress");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _BeautyCareAssistant = class _BeautyCareAssistant extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.currentKey = "", this.trail = [], this.result = null, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.restart();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.restart();
  }
  get questions() {
    var _a;
    return parseQuestions((_a = this.config) == null ? void 0 : _a.bca_questions);
  }
  get startKey() {
    return resolveStartKey(this.config || {}, this.questions);
  }
  get maxDepth() {
    return estimateMaxDepth(this.questions, this.startKey);
  }
  restart() {
    this.currentKey = this.startKey, this.trail = [], this.result = null;
  }
  goBack() {
    if (this.result) {
      this.result = null;
      return;
    }
    const prev = [...this.trail], last = prev.pop();
    last && (this.trail = prev, this.currentKey = last.questionKey);
  }
  jumpToStep(index) {
    if (this.result && (this.result = null), index < 0) {
      this.trail = [], this.currentKey = this.startKey;
      return;
    }
    const slice = this.trail.slice(0, index + 1), target = slice[slice.length - 1];
    target && (this.trail = slice.slice(0, -1), this.currentKey = target.questionKey);
  }
  chooseAnswer(answer) {
    const questions = this.questions, current = findQuestion(questions, this.currentKey);
    if (current) {
      if (!isTerminal(answer, questions)) {
        this.trail = [
          ...this.trail,
          {
            questionKey: this.currentKey,
            questionText: current.text,
            answerLabel: answer.label || t("اختيار", "Choice")
          }
        ], this.currentKey = answer.next, this.result = null;
        return;
      }
      this.trail = [
        ...this.trail,
        {
          questionKey: this.currentKey,
          questionText: current.text,
          answerLabel: answer.label || t("اختيار", "Choice")
        }
      ], this.result = answer;
    }
  }
  renderTrail() {
    return !this.trail.length && !this.result ? nothing : html`
      <nav class="bca-trail" aria-label=${t("مسار إجاباتك", "Your answer path")}>
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
          ${this.result ? html`<li class="bca-trail__item bca-trail__item--current" aria-current="step">
                <span class="bca-trail__chip bca-trail__chip--current">
                  ${this.result.result_title || t("النتيجة", "Result")}
                </span>
              </li>` : html`<li class="bca-trail__item bca-trail__item--current" aria-current="step">
                <span class="bca-trail__chip bca-trail__chip--current">
                  ${t("السؤال الحالي", "Current question")}
                </span>
              </li>`}
        </ol>
      </nav>
    `;
  }
  renderResult(answer) {
    const c = this.config || {}, resultBtn = localizedString(c.bca_result_btn) || t("انتقلي إلى النتيجة", "Go to result"), restartBtn = localizedString(c.bca_restart_btn) || t("إعادة البدء", "Start over");
    return html`
      <div class="bca-result" aria-live="polite">
        <div class="bca-result__badge" aria-hidden="true">✦</div>
        ${answer.result_title ? html`<h3 class="bca-result__title">${answer.result_title}</h3>` : html`<h3 class="bca-result__title">${t("إليكِ توصيتنا", "Here is our recommendation")}</h3>`}
        ${answer.result_desc ? html`<p class="bca-result__desc">${answer.result_desc}</p>` : nothing}
        ${answer.link ? html`<div class="bca-result__actions">
              <a class="fs-btn fs-tap" href=${answer.link}>
                ${answer.link_text || resultBtn}
              </a>
            </div>` : nothing}
        <div class="bca-nav">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
            ${t("تعديل آخر إجابة", "Edit last answer")}
          </button>
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.restart}>
            ${restartBtn}
          </button>
          ${renderCommerceCtaButton(c, "bca_")}
        </div>
      </div>
    `;
  }
  renderQuestion(question) {
    return html`
      <div class="bca-answers" role="group" aria-label=${question.text || t("الخيارات", "Options")}>
        ${question.answers.map(
      (answer) => html`
            <button type="button" class="bca-answer fs-tap" @click=${() => this.chooseAnswer(answer)}>
              ${answer.image ? html`<img class="bca-answer__icon" src=${answer.image} alt="" loading="lazy" />` : nothing}
              <span>${answer.label || t("اختيار", "Choice")}</span>
            </button>
          `
    )}
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bca_"), animate = theme.animate && !prefersReducedMotion(), questions = this.questions, style = resolveStyle(c), title = localizedString(c.bca_title), desc = localizedString(c.bca_desc), assistantName = localizedString(c.bca_assistant_name) || t("خبيرة الجمال", "Beauty expert"), avatar = localizedString(c.bca_avatar);
    if (!questions.length)
      return html`<div class="fs-empty" role="status">
        ${t("أضيفي أسئلة المساعد من إعدادات العنصر", "Add assistant questions in the element settings")}
      </div>`;
    const current = findQuestion(questions, this.currentKey) || questions[0], hasResult = !!this.result, depth = currentDepth(this.trail, hasResult), maxDepth = this.maxDepth, progress = computeProgress(this.trail, hasResult, maxDepth), progressLabel = hasResult ? t("اكتملت الرحلة", "Journey complete") : t(`الخطوة ${depth}`, `Step ${depth}`);
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مساعد اختيار منتجات الجمال", "Beauty care assistant")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class=${classMap({ [`bca--${style}`]: !0 })}>
            <div class="bca-shell">
              <div class="bca-topbar">
                ${avatar ? html`<img class="bca-avatar" src=${avatar} alt="" loading="lazy" />` : html`<span class="bca-avatar" aria-hidden="true">✦</span>`}
                <div class="bca-topbar__meta">
                  <span class="bca-topbar__name">${assistantName}</span>
                  <span class="bca-trail__hint">${t("سأساعدك في اختيار الأنسب لكِ", "I will help you choose")}</span>
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

                ${this.result ? this.renderResult(this.result) : html`
                      ${current.image ? html`<img
                            class="bca-question-img"
                            src=${current.image}
                            alt=""
                            loading="lazy"
                          />` : nothing}
                      <div class="bca-bubble">${current.text || t("اختاري أحد الخيارات", "Choose an option")}</div>
                      ${this.renderQuestion(current)}
                      ${this.trail.length ? html`<div class="bca-nav">
                            <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
                              ${t("رجوع", "Back")}
                            </button>
                            <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.restart}>
                              ${localizedString(c.bca_restart_btn) || t("إعادة البدء", "Start over")}
                            </button>
                          </div>` : nothing}
                    `}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
};
__name(_BeautyCareAssistant, "BeautyCareAssistant"), _BeautyCareAssistant.styles = [sharedSectionCss, componentStyles];
let BeautyCareAssistant = _BeautyCareAssistant;
__decorateClass([
  property({ type: Object })
], BeautyCareAssistant.prototype, "config");
__decorateClass([
  state()
], BeautyCareAssistant.prototype, "currentKey");
__decorateClass([
  state()
], BeautyCareAssistant.prototype, "trail");
__decorateClass([
  state()
], BeautyCareAssistant.prototype, "result");
typeof BeautyCareAssistant < "u" && BeautyCareAssistant.registerSallaComponent("salla-beauty-care-assistant");
export {
  BeautyCareAssistant as default
};
