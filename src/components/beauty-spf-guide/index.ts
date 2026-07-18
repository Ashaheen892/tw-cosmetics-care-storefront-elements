import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  clamp,
  isTruthy,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import {
  buildStepPlan,
  estimateMinutes,
  formatDuration,
  parseConditions,
  parsePhototypes,
  parseSpfValues,
  parseTips,
  stepLabel,
} from './utils.js';
import type { Phototype, SpfStepKey, SpfValue, SunCondition } from './types.js';

const METER_CAP_MINUTES = 480;

export default class BeautySpfGuide extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private selectedPtId = '';
  @state() private selectedSpf = 0;
  @state() private selectedCondId = '';
  /** 0..plan.length-1 = pick step; plan.length = results */
  @state() private stepIndex = 0;

  private boundLangHandler = () => this.requestUpdate();
  private boundKeyHandler = (event: KeyboardEvent) => this.onKeyDown(event);

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.addEventListener('keydown', this.boundKeyHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    this.removeEventListener('keydown', this.boundKeyHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.selectedPtId = '';
      this.selectedSpf = 0;
      this.selectedCondId = '';
      this.stepIndex = 0;
    }
  }

  private get phototypes(): Phototype[] {
    return parsePhototypes(this.config?.bsg_phototypes);
  }

  private get spfValues(): SpfValue[] {
    return parseSpfValues(this.config?.bsg_spf_values);
  }

  private get conditions(): SunCondition[] {
    return parseConditions(this.config?.bsg_conditions);
  }

  private get plan(): SpfStepKey[] {
    return buildStepPlan(this.conditions.length > 0);
  }

  private get onResults(): boolean {
    return this.stepIndex >= this.plan.length;
  }

  private get currentStep(): SpfStepKey | null {
    return this.onResults ? null : this.plan[this.stepIndex] ?? null;
  }

  private get canNext(): boolean {
    const step = this.currentStep;
    if (!step) return false;
    if (step === 'phototype') return Boolean(this.selectedPtId);
    if (step === 'spf') return this.selectedSpf > 0;
    if (step === 'condition') return Boolean(this.selectedCondId);
    return false;
  }

  private label(key: string, ar: string, en: string): string {
    return localizedString(this.config?.[key] as string) || t(ar, en);
  }

  private goNext(): void {
    if (this.stepIndex < this.plan.length) this.stepIndex += 1;
  }

  private goBack(): void {
    if (this.stepIndex > 0) this.stepIndex -= 1;
  }

  private reset(): void {
    this.selectedPtId = '';
    this.selectedSpf = 0;
    this.selectedCondId = '';
    this.stepIndex = 0;
  }

  private onKeyDown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (target?.closest('button, a, input, textarea, select')) return;

    if (event.key === 'Enter' && !this.onResults && this.canNext) {
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
    const step = this.currentStep;
    const stepName = step ? stepLabel(step, this.config || {}) : '';

    return html`
      <div class="bsg-progress" aria-hidden="true">
        <div class="bsg-progress__bar"><span style=${styleMap({ width: `${pct}%` })}></span></div>
        <span class="bsg-progress__text">
          ${this.onResults
            ? t('النتيجة', 'Result')
            : html`${t(`الخطوة ${current} من ${total}`, `Step ${current} of ${total}`)}
                <span class="bsg-progress__step"> · ${stepName}</span>`}
        </span>
      </div>
    `;
  }

  private renderPhototypeStep(list: Phototype[]) {
    const label = stepLabel('phototype', this.config || {});

    return html`
      <div class="bsg-step">
        <h3 class="bsg-step__title">${label}</h3>
        <p class="bsg-step__hint">${t('اختاري نوع بشرتك حسب حساسيتها للشمس', 'Pick your sun-sensitivity phototype')}</p>
        <div class="bsg-options" role="group" aria-label=${label}>
          ${list.map((pt) => {
            const isActive = this.selectedPtId === pt.id;
            return html`
              <button
                type="button"
                class="bsg-option"
                aria-pressed=${isActive ? 'true' : 'false'}
                style=${styleMap(pt.color ? { '--bsg-swatch': pt.color } : {})}
                @click=${() => (this.selectedPtId = pt.id)}
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

  private renderSpfStep(list: SpfValue[]) {
    const label = stepLabel('spf', this.config || {});

    return html`
      <div class="bsg-step">
        <h3 class="bsg-step__title">${label}</h3>
        <p class="bsg-step__hint">${t('اختاري عامل الحماية الذي تستخدمينه', 'Choose the SPF you apply')}</p>
        <div class="bsg-options bsg-options--compact" role="group" aria-label=${label}>
          ${list.map((sv) => {
            const isActive = this.selectedSpf === sv.spf;
            return html`
              <button
                type="button"
                class="bsg-option bsg-option--compact"
                aria-pressed=${isActive ? 'true' : 'false'}
                @click=${() => (this.selectedSpf = sv.spf)}
              >
                <span class="bsg-option__name">${sv.label}</span>
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  private renderConditionStep(list: SunCondition[]) {
    const label = stepLabel('condition', this.config || {});

    return html`
      <div class="bsg-step">
        <h3 class="bsg-step__title">${label}</h3>
        <p class="bsg-step__hint">${t('اختاري ظروف تعرّضك للشمس اليوم', 'Pick today\'s sun exposure setting')}</p>
        <div class="bsg-options" role="group" aria-label=${label}>
          ${list.map((cond) => {
            const isActive = this.selectedCondId === cond.id;
            return html`
              <button
                type="button"
                class="bsg-option"
                aria-pressed=${isActive ? 'true' : 'false'}
                @click=${() => (this.selectedCondId = cond.id)}
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

  private renderNav() {
    const back = this.label('bsg_back_btn', 'السابق', 'Back');
    const next = this.label('bsg_next_btn', 'التالي', 'Next');
    const see = this.label('bsg_see_btn', 'عرض التقدير', 'See estimate');
    const lastStep = this.stepIndex === this.plan.length - 1;

    return html`
      <div class="bsg-nav">
        ${this.stepIndex > 0
          ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
              ${back}
            </button>`
          : html`<span></span>`}
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

  private renderCurrentStep() {
    const step = this.currentStep;
    if (!step) return nothing;

    if (step === 'phototype') return this.renderPhototypeStep(this.phototypes);
    if (step === 'spf') return this.renderSpfStep(this.spfValues);
    return this.renderConditionStep(this.conditions);
  }

  private renderResults() {
    const c = this.config || {};
    const phototypes = this.phototypes;
    const spfValues = this.spfValues;
    const conditions = this.conditions;
    const tips = parseTips(c.bsg_tips);

    const activePt = phototypes.find((p) => p.id === this.selectedPtId) ?? null;
    const activeSpf = spfValues.find((s) => s.spf === this.selectedSpf) ?? null;
    const activeCond = conditions.find((cond) => cond.id === this.selectedCondId) ?? null;

    const factor = activeCond?.factor ?? 1;
    const minutes = estimateMinutes(activePt?.baseMinutes ?? 0, activeSpf?.spf ?? 0, factor);
    const meterPct = clamp((minutes / METER_CAP_MINUTES) * 100, 0, 100);

    const showMeter = isTruthy(c.bsg_show_meter, true);
    const showNotice = isTruthy(c.bsg_show_notice, true);
    const reapplyMinutes = clamp(Math.round(toNumber(c.bsg_reapply_minutes, 120)), 1, 100000);
    const reapplyNote = localizedString(c.bsg_reapply_note as string);
    const resultTitle = localizedString(c.bsg_result_title as string) || t('توصياتك', 'Your guidance');

    const notice =
      localizedString(c.bsg_notice as string) ||
      t('هذه إرشادات توعوية عامة وليست نصيحة طبية.', 'This is general educational guidance, not medical advice.');

    const reapplyMain = t(
      `أعيدي التطبيق كل ${reapplyMinutes} دقيقة`,
      `Reapply every ${reapplyMinutes} min`
    );

    return html`
      <div class="bsg-results" aria-live="polite">
        <h3 class="bsg-results__title">${resultTitle}</h3>

        <div class="bsg-results__summary">
          ${activePt
            ? html`<span class="bsg-results__pill">
                <span
                  class="bsg-swatch"
                  aria-hidden="true"
                  style=${styleMap(activePt.color ? { '--bsg-swatch': activePt.color } : {})}
                ></span>
                ${activePt.name}
              </span>`
            : nothing}
          ${activeSpf
            ? html`<span class="bsg-results__pill">${activeSpf.label}</span>`
            : nothing}
          ${activeCond ? html`<span class="bsg-results__pill">${activeCond.name}</span>` : nothing}
        </div>

        <div class="bsg-duration bsg-duration--hero">
          <span class="bsg-duration__label">
            ${t('تقدير تقريبي لمدة التعرّض الآمن', 'Rough safe-exposure estimate')}
          </span>
          <span class="bsg-duration__value">${formatDuration(minutes)}</span>
        </div>

        ${showMeter
          ? html`<div class="bsg-meter-wrap bsg-meter-wrap--hero">
              <div
                class="bsg-meter"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow=${Math.round(meterPct)}
                aria-label=${t('مؤشر التعرّض التوضيحي', 'Illustrative exposure meter')}
              >
                <span style=${styleMap({ width: `${meterPct}%` })}></span>
              </div>
              <p class="bsg-meter-caption">
                ${t('مؤشر توضيحي فقط — التقدير يقلّ في ظروف الانعكاس العالي.', 'Illustrative only — the estimate drops in high-reflection conditions.')}
              </p>
            </div>`
          : nothing}

        <div class="bsg-reapply">
          <span class="bsg-reapply__icon" aria-hidden="true">☀︎</span>
          <div class="bsg-reapply__body">
            <p class="bsg-reapply__main">${reapplyMain}</p>
            ${reapplyNote
              ? html`<p class="bsg-reapply__note">${reapplyNote}</p>`
              : html`<p class="bsg-reapply__note">${t('أعيدي التطبيق بعد السباحة أو التعرّق.', 'Reapply after swimming or sweating.')}</p>`}
          </div>
        </div>

        ${tips.length
          ? html`<div class="bsg-tips">
              <p class="bsg-tips__title">${t('نصائح', 'Tips')}</p>
              <ul>${tips.map((tip) => html`<li>${tip}</li>`)}</ul>
            </div>`
          : nothing}

        <div class="bsg-results__actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
            ${this.label('bsg_back_btn', 'تعديل الاختيارات', 'Edit choices')}
          </button>
          <button type="button" class="fs-btn fs-tap" @click=${() => this.reset()}>
            ${this.label('bsg_reset_btn', 'ابدئي من جديد', 'Start over')}
          </button>
        </div>

        ${showNotice ? html`<p class="bsg-notice bsg-notice--inline">${notice}</p>` : nothing}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bsg_');
    const animate = theme.animate && !prefersReducedMotion();

    const phototypes = this.phototypes;
    const spfValues = this.spfValues;
    const plan = this.plan;

    const title = localizedString(c.bsg_title as string);
    const desc = localizedString(c.bsg_desc as string);

    if (!phototypes.length || !spfValues.length) {
      return html`
        <section
          class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t('دليل الحماية من الشمس', 'Sun protection guide')}
        >
          <div class="fs-container">
            <div class="fs-empty" role="status">
              ${t('أكملي إعدادات العنصر لعرض الدليل.', 'Complete the element settings to show the guide.')}
            </div>
          </div>
        </section>
      `;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('دليل الحماية من الشمس', 'Sun protection guide')}
        tabindex="0"
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="bsg-wrap">
            ${this.renderProgress(plan.length)}
            ${this.onResults
              ? this.renderResults()
              : html`
                  ${this.renderCurrentStep()}
                  ${this.renderNav()}
                `}
          </div>
        </div>
      </section>
    `;
  }
}
