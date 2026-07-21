import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  getRadioValue,
  isExternalUrl,
  isTruthy,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { buildSteps, filterShades, parseShades } from './utils.js';
import type { DimensionKey, Shade, ShadeSelection, StepDef } from './types.js';

/**
 * Guided shade quiz: one question at a time, then matching shade results.
 * Product-free — educational matching only (no cart / prices).
 */
export default class BeautyShadeFinder extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private selection: ShadeSelection = {};
  @state() private shades: Shade[] = [];
  @state() private selectedShadeId = '';
  /** 0..steps.length-1 = question; steps.length = results */
  @state() private stepIndex = 0;

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
    this.shades = parseShades(this.config?.bsf_shades);
    this.ensureSelectedShade();
  }

  private get steps(): StepDef[] {
    return buildSteps(this.config || {});
  }

  private get onResults(): boolean {
    return this.stepIndex >= this.steps.length;
  }

  private get filtered(): Shade[] {
    return filterShades(this.shades, this.selection);
  }

  private ensureSelectedShade(): void {
    const list = this.filtered;
    if (!list.some((s) => s.id === this.selectedShadeId)) {
      this.selectedShadeId = list[0]?.id ?? '';
    }
  }

  private get selectedShade(): Shade | null {
    return this.filtered.find((s) => s.id === this.selectedShadeId) || null;
  }

  private pick(key: DimensionKey, value: string): void {
    this.selection = { ...this.selection, [key]: value };
    this.ensureSelectedShade();
  }

  private goNext(): void {
    const max = this.steps.length;
    if (this.stepIndex < max) this.stepIndex += 1;
  }

  private goBack(): void {
    if (this.stepIndex > 0) this.stepIndex -= 1;
  }

  private reset(): void {
    this.selection = {};
    this.stepIndex = 0;
    this.ensureSelectedShade();
  }

  private selectShade(id: string): void {
    this.selectedShadeId = id;
  }

  private label(key: string, ar: string, en: string): string {
    return localizedString(this.config?.[key] as string) || t(ar, en);
  }

  private renderProgress(total: number) {
    const current = Math.min(this.stepIndex + 1, total);
    const pct = total ? Math.round((Math.min(this.stepIndex, total) / total) * 100) : 0;
    return html`
      <div class="bsf-progress" aria-hidden="true">
        <div class="bsf-progress__bar"><span style=${styleMap({ width: `${pct}%` })}></span></div>
        <span class="bsf-progress__text">
          ${this.onResults
            ? t('النتيجة', 'Result')
            : t(`السؤال ${current} من ${total}`, `Question ${current} of ${total}`)}
        </span>
      </div>
    `;
  }

  private renderQuestion(step: StepDef) {
    const hint =
      step.key === 'undertone'
        ? this.label(
            'bsf_undertone_hint',
            'نصيحة: الأوردة الخضراء غالبًا دافئة، والزرقاء باردة، والمختلطة محايدة.',
            'Tip: greenish veins often mean warm, bluish mean cool, mixed mean neutral.'
          )
        : '';

    return html`
      <div class="bsf-question">
        <h3 class="bsf-question__title">${step.label}</h3>
        ${hint ? html`<p class="bsf-question__hint">${hint}</p>` : nothing}
        <div class="bsf-chips" role="group" aria-label=${step.label}>
          ${step.options.map((opt) => {
            const active = this.selection[step.key] === opt.value;
            return html`<button
              type="button"
              class="bsf-chip"
              aria-pressed=${active ? 'true' : 'false'}
              @click=${() => this.pick(step.key, opt.value)}
            >
              ${opt.label}
            </button>`;
          })}
        </div>
      </div>
    `;
  }

  private renderNav(canNext: boolean) {
    const back = this.label('bsf_back_btn', 'السابق', 'Back');
    const next = this.label('bsf_next_btn', 'التالي', 'Next');
    const see = this.label('bsf_see_btn', 'عرض الدرجات', 'See shades');
    const lastQ = this.stepIndex === this.steps.length - 1;

    return html`
      <div class="bsf-nav">
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

  private matchChips(shade: Shade) {
    const steps = this.steps;
    const chips: Array<{ label: string; active: boolean }> = [];
    for (const step of steps) {
      const chosen = this.selection[step.key];
      if (!chosen) continue;
      const shadeVal = shade[step.key];
      const opt = step.options.find((o) => o.value === chosen);
      chips.push({
        label: opt?.label || chosen,
        active: !shadeVal || shadeVal === chosen,
      });
    }
    return chips;
  }

  private renderDetail(shade: Shade, showLink: boolean) {
    const external = shade.link ? isExternalUrl(shade.link) : false;
    const chips = this.matchChips(shade);

    return html`
      <div class="bsf-detail" aria-live="polite">
        <div
          class="bsf-detail__media"
          style=${styleMap({ background: shade.hex })}
          role="img"
          aria-label=${shade.name || shade.shade_number || t('عينة اللون', 'Shade swatch')}
        ></div>
        <h4 class="bsf-detail__name">
          ${shade.name || t('درجة مقترحة', 'Suggested shade')}
          ${shade.shade_number
            ? html`<span class="bsf-detail__number"> · ${shade.shade_number}</span>`
            : nothing}
        </h4>
        ${shade.desc ? html`<p class="bsf-detail__desc">${shade.desc}</p>` : nothing}
        ${chips.length
          ? html`<div class="bsf-detail__chips" aria-label=${t('سبب المطابقة', 'Match reasons')}>
              ${chips.map(
                (chip) => html`<span
                  class=${classMap({
                    'fs-pill': true,
                    'bsf-detail__chip': true,
                    'bsf-detail__chip--on': chip.active,
                  })}
                >${chip.label}</span>`
              )}
            </div>`
          : nothing}
        ${showLink && shade.link
          ? html`<div class="bsf-detail__actions">
              <a
                class="fs-btn fs-btn--ghost"
                href=${shade.link}
                target=${external ? '_blank' : '_self'}
                rel=${external ? 'noopener noreferrer' : nothing}
              >
                ${t('التفاصيل', 'Details')}
              </a>
            </div>`
          : nothing}
      </div>
    `;
  }

  private renderResults() {
    const c = this.config || {};
    const filtered = this.filtered;
    const selected = this.selectedShade;
    const showLink = isTruthy(c.bsf_show_link, true);
    const shape = getRadioValue(c.bsf_swatch_shape, 'circle');
    const resultsTitle = this.label(
      'bsf_results_title',
      'الدرجات المناسبة لكِ',
      'Shades that suit you'
    );

    return html`
      <div class="bsf-results">
        <div class="bsf-results__head">
          <h3 class="bsf-results__title">${resultsTitle}</h3>
          <span class="bsf-results__count">${filtered.length}</span>
        </div>
        <div class="bsf-swatches" role="listbox" aria-label=${resultsTitle}>
          ${filtered.map((shade) => {
            const active = shade.id === this.selectedShadeId;
            const label = shade.shade_number || shade.shade_name || shade.name;
            return html`<button
              type="button"
              class=${classMap({
                'bsf-swatch': true,
                'bsf-swatch--square': shape === 'square',
                'bsf-swatch--rounded': shape === 'rounded',
                'is-active': active,
              })}
              role="option"
              aria-selected=${active ? 'true' : 'false'}
              aria-pressed=${active ? 'true' : 'false'}
              aria-label=${shade.name || label || t('درجة', 'Shade')}
              @click=${() => this.selectShade(shade.id)}
            >
              <span class="bsf-swatch__ring">
                <span class="bsf-swatch__chip" style=${styleMap({ background: shade.hex || '#c4a484' })}></span>
              </span>
              ${label ? html`<span class="bsf-swatch__name">${label}</span>` : nothing}
            </button>`;
          })}
        </div>
        ${selected
          ? this.renderDetail(selected, showLink)
          : html`<p class="fs-empty">${t('لا توجد درجات مطابقة', 'No matching shades')}</p>`}
        <div class="bsf-results__actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
            ${this.label('bsf_back_btn', 'تعديل الإجابات', 'Edit answers')}
          </button>
          <button type="button" class="fs-btn fs-tap" @click=${() => this.reset()}>
            ${this.label('bsf_reset_btn', 'ابدئي من جديد', 'Start over')}
          </button>
        </div>
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bsf_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.bsf_title as string);
    const desc = localizedString(c.bsf_desc as string);
    const steps = this.steps;
    const current = steps[this.stepIndex];
    const answered = current ? Boolean(this.selection[current.key]) : false;

    if (!this.shades.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي درجات المكياج من إعدادات العنصر', 'Add makeup shades in the element settings')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('محدد درجة المكياج المناسبة', 'Beauty shade finder')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="bsf-wrap">
            ${this.renderProgress(steps.length)}
            ${this.onResults
              ? this.renderResults()
              : html`
                  ${current ? this.renderQuestion(current) : nothing}
                  ${this.renderNav(answered)}
                `}
          </div>
          ${this.onResults ? renderCommerceOutcome({ config: c, prefix: 'bsf_', ready: true }) : nothing}
        </div>
      </section>
    `;
  }
}
