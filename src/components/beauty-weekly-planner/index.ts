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
import {
  buildSchedule,
  emptyDayLabel,
  frequencyLabel,
  parseSteps,
  resolveStartDay,
  resolveView,
  weekdayNames,
} from './utils.js';
import type { PlannerStep, PlannerView } from './types.js';

export default class BeautyWeeklyPlanner extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private view: PlannerView = 'week';

  private viewSynced = false;
  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (!changed.has('config')) return;
    const nextDefault = getRadioValue(this.config?.bwp_view_default, 'week');
    const prev = changed.get('config') as Record<string, unknown> | undefined;
    const prevDefault = prev ? getRadioValue(prev.bwp_view_default, 'week') : undefined;
    // Sync only on first load or when merchant changes the default — keep shopper toggle
    if (!this.viewSynced || prevDefault !== nextDefault) {
      this.view = resolveView(this.config || {});
      this.viewSynced = true;
    }
  }

  private get steps(): PlannerStep[] {
    return parseSteps(this.config?.bwp_steps);
  }

  private setView(view: PlannerView): void {
    this.view = view;
  }

  private renderChip(step: PlannerStep) {
    const isSicon = step.icon.startsWith('sicon-');
    return html`
      <span
        class="bwp-chip"
        style=${styleMap(step.color ? { '--chip-color': step.color } : {})}
      >
        <span class="bwp-chip__dot"></span>
        ${step.icon
          ? html`<span class="bwp-chip__icon ${isSicon ? step.icon : ''}">${isSicon ? '' : step.icon}</span>`
          : nothing}
        <span class="bwp-chip__name" title=${step.name}>${step.name}</span>
      </span>
    `;
  }

  private renderSlot(label: string, steps: PlannerStep[]) {
    return html`
      <div class="bwp-slot">
        <span class="bwp-slot__label">${label}</span>
        ${steps.length
          ? html`<div class="bwp-chips">${steps.map((s) => this.renderChip(s))}</div>`
          : html`<span class="bwp-slot--empty">${t('لا خطوات', 'No steps')}</span>`}
      </div>
    `;
  }

  private renderToggle() {
    const options: { id: PlannerView; label: string }[] = [
      { id: 'week', label: t('الأسبوع الكامل', 'Full week') },
      { id: 'am', label: t('صباحًا', 'Morning') },
      { id: 'pm', label: t('مساءً', 'Evening') },
    ];
    return html`
      <div class="bwp-toolbar">
        <div class="bwp-toggle" role="group" aria-label=${t('طريقة العرض', 'View mode')}>
          ${options.map(
            (opt) => html`
              <button
                type="button"
                class="bwp-toggle__btn"
                aria-pressed=${this.view === opt.id ? 'true' : 'false'}
                @click=${() => this.setView(opt.id)}
              >
                ${opt.label}
              </button>
            `
          )}
        </div>
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bwp_');
    const animate = theme.animate && !prefersReducedMotion();
    const steps = this.steps;
    const title = localizedString(c.bwp_title as string);
    const desc = localizedString(c.bwp_desc as string);

    if (!steps.length) {
      return html`
        <section
          class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t('مخطط الروتين الأسبوعي', 'Weekly routine planner')}
        >
          <div class="fs-container">
            ${title || desc
              ? html`<div class="fs-header">
                  ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                  ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
                </div>`
              : nothing}
            <div class="fs-empty" role="status">
              ${t('أضيفي خطوات الروتين من إعدادات العنصر.', 'Add routine steps in the element settings.')}
            </div>
          </div>
        </section>
      `;
    }

    const startDay = resolveStartDay(c);
    const days = weekdayNames(startDay);
    const schedule = buildSchedule(steps, startDay, this.view);
    const showToggle = isTruthy(c.bwp_show_view_toggle, true);
    const showLegend = isTruthy(c.bwp_show_legend, true);
    const showNotice = isTruthy(c.bwp_show_notice, true);
    const notice =
      localizedString(c.bwp_notice as string) ||
      t(
        'خطة إرشادية؛ عدّليها حسب توصية أخصائي بشرتك.',
        'A guiding plan; adjust it to your skincare specialist’s advice.'
      );
    const amLabel = t('صباحًا', 'Morning');
    const pmLabel = t('مساءً', 'Evening');
    const bothLabel = t('صباحًا ومساءً', 'Morning & evening');

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('مخطط الروتين الأسبوعي', 'Weekly routine planner')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          ${showToggle ? this.renderToggle() : nothing}

          <div class="bwp-grid-scroll">
            <div class=${classMap({ 'bwp-grid': true, [`bwp-grid--${this.view}`]: true })} role="list">
              ${days.map((dayName, i) => {
                const cell = schedule[i];
                const hasContent = cell.am.length > 0 || cell.pm.length > 0;
                return html`
                  <div class=${classMap({ 'bwp-day': true, 'is-empty': !hasContent })} role="listitem">
                    <div class="bwp-day__head">${dayName}</div>
                    <div class="bwp-day__body">
                      ${hasContent
                        ? this.view === 'week'
                          ? html`<div class="bwp-slots bwp-slots--split">
                              ${this.renderSlot(amLabel, cell.am)}
                              ${this.renderSlot(pmLabel, cell.pm)}
                            </div>`
                          : html`<div class="bwp-chips">
                              ${[...cell.am, ...cell.pm].map((s) => this.renderChip(s))}
                            </div>`
                        : html`<span class="bwp-day__empty">${emptyDayLabel()}</span>`}
                    </div>
                  </div>
                `;
              })}
            </div>
          </div>

          ${showLegend
            ? html`<div class="bwp-legend">
                ${steps.map((step) => {
                  const isSicon = step.icon.startsWith('sicon-');
                  const slotText =
                    step.slot === 'am' ? amLabel : step.slot === 'pm' ? pmLabel : bothLabel;
                  return html`
                    <div
                      class="bwp-legend__item"
                      style=${styleMap(step.color ? { '--chip-color': step.color } : {})}
                    >
                      <span class="bwp-legend__swatch"></span>
                      <span class="bwp-legend__text">
                        <span class="bwp-legend__name">
                          ${step.icon
                            ? html`<span class="${isSicon ? step.icon : ''}">${isSicon ? '' : step.icon}</span>`
                            : nothing}
                          ${step.name}
                        </span>
                        <span class="bwp-legend__freq">
                          ${frequencyLabel(step.frequency)}${step.note ? html` · ${step.note}` : nothing}
                        </span>
                      </span>
                      <span class="bwp-legend__slot">${slotText}</span>
                    </div>
                  `;
                })}
              </div>`
            : nothing}

          ${showNotice ? html`<p class="bwp-notice">${notice}</p>` : nothing}
        </div>
      </section>
    `;
  }
}
