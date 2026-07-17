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
  estimateMinutes,
  formatDuration,
  parseConditions,
  parsePhototypes,
  parseSpfValues,
  parseTips,
} from './utils.js';
import type { Phototype, SpfValue, SunCondition } from './types.js';

const METER_CAP_MINUTES = 480;

export default class BeautySpfGuide extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private selectedPtId = '';
  @state() private selectedSpf = 0;
  @state() private selectedCondId = '';

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
    if (changed.has('config')) {
      this.selectedPtId = '';
      this.selectedSpf = 0;
      this.selectedCondId = '';
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

  private resolvePhototype(list: Phototype[]): Phototype | null {
    if (!list.length) return null;
    return list.find((p) => p.id === this.selectedPtId) ?? list[0];
  }

  private resolveSpf(list: SpfValue[]): SpfValue | null {
    if (!list.length) return null;
    return list.find((s) => s.spf === this.selectedSpf) ?? list[0];
  }

  private resolveCondition(list: SunCondition[]): SunCondition | null {
    if (!list.length) return null;
    return list.find((c) => c.id === this.selectedCondId) ?? list[0];
  }

  private renderPhototypeChips(list: Phototype[], active: Phototype | null) {
    return html`
      <div class="bsg-chips" role="group" aria-label=${t('نوع البشرة', 'Skin phototype')}>
        ${list.map((pt) => {
          const isActive = active?.id === pt.id;
          return html`
            <button
              type="button"
              class="bsg-chip"
              aria-pressed=${isActive ? 'true' : 'false'}
              style=${styleMap(pt.color ? { '--bsg-swatch': pt.color } : {})}
              @click=${() => (this.selectedPtId = pt.id)}
            >
              <span class="bsg-swatch" aria-hidden="true"></span>
              <span>${pt.name}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  private renderSpfChips(list: SpfValue[], active: SpfValue | null) {
    return html`
      <div class="bsg-chips" role="group" aria-label=${t('عامل الحماية', 'SPF value')}>
        ${list.map((sv) => {
          const isActive = active?.spf === sv.spf;
          return html`
            <button
              type="button"
              class="bsg-chip"
              aria-pressed=${isActive ? 'true' : 'false'}
              @click=${() => (this.selectedSpf = sv.spf)}
            >
              <span>${sv.label}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  private renderConditionChips(list: SunCondition[], active: SunCondition | null) {
    if (!list.length) return nothing;
    return html`
      <div class="bsg-chips" role="group" aria-label=${t('ظروف التعرّض', 'Exposure condition')}>
        ${list.map((cond) => {
          const isActive = active?.id === cond.id;
          return html`
            <button
              type="button"
              class="bsg-chip"
              aria-pressed=${isActive ? 'true' : 'false'}
              title=${cond.desc || cond.name}
              @click=${() => (this.selectedCondId = cond.id)}
            >
              <span>${cond.name}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bsg_');
    const animate = theme.animate && !prefersReducedMotion();

    const phototypes = this.phototypes;
    const spfValues = this.spfValues;
    const conditions = this.conditions;
    const tips = parseTips(c.bsg_tips);

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

    const activePt = this.resolvePhototype(phototypes);
    const activeSpf = this.resolveSpf(spfValues);
    const activeCond = this.resolveCondition(conditions);

    const factor = activeCond?.factor ?? 1;
    const minutes = estimateMinutes(activePt?.baseMinutes ?? 0, activeSpf?.spf ?? 0, factor);
    const meterPct = clamp((minutes / METER_CAP_MINUTES) * 100, 0, 100);

    const showMeter = isTruthy(c.bsg_show_meter, true);
    const showNotice = isTruthy(c.bsg_show_notice, true);
    const reapplyMinutes = clamp(Math.round(toNumber(c.bsg_reapply_minutes, 120)), 1, 100000);
    const reapplyNote = localizedString(c.bsg_reapply_note as string);

    const phototypeLabel = localizedString(c.bsg_phototype_label as string) || t('نوع البشرة', 'Skin phototype');
    const spfLabel = localizedString(c.bsg_spf_label as string) || t('عامل الحماية SPF', 'SPF value');
    const conditionLabel = localizedString(c.bsg_condition_label as string) || t('ظروف التعرّض', 'Exposure condition');
    const resultTitle = localizedString(c.bsg_result_title as string) || t('توصياتك', 'Your guidance');

    const notice =
      localizedString(c.bsg_notice as string) ||
      t('هذه إرشادات توعوية عامة وليست نصيحة طبية.', 'This is general educational guidance, not medical advice.');

    const reapplyMain = t(
      `أعيدي التطبيق كل ${reapplyMinutes} دقيقة`,
      `Reapply every ${reapplyMinutes} min`
    );

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('دليل الحماية من الشمس', 'Sun protection guide')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="bsg-layout">
            <div class="bsg-controls">
              <div class="bsg-group">
                <p class="bsg-group__label">${phototypeLabel}</p>
                ${this.renderPhototypeChips(phototypes, activePt)}
                ${activePt?.desc
                  ? html`<p class="bsg-chip__sub">${activePt.desc}</p>`
                  : nothing}
              </div>

              <div class="bsg-group">
                <p class="bsg-group__label">${spfLabel}</p>
                ${this.renderSpfChips(spfValues, activeSpf)}
              </div>

              ${conditions.length
                ? html`<div class="bsg-group">
                    <p class="bsg-group__label">${conditionLabel}</p>
                    ${this.renderConditionChips(conditions, activeCond)}
                    ${activeCond?.desc
                      ? html`<p class="bsg-chip__sub">${activeCond.desc}</p>`
                      : nothing}
                  </div>`
                : nothing}
            </div>

            <div class="bsg-result" role="region" aria-live="polite">
              <h3 class="bsg-result__title">${resultTitle}</h3>

              ${activePt
                ? html`<span class="bsg-result__pt">
                    <span
                      class="bsg-swatch"
                      aria-hidden="true"
                      style=${styleMap(activePt.color ? { '--bsg-swatch': activePt.color } : {})}
                    ></span>
                    <span>${activePt.name}</span>
                  </span>`
                : nothing}

              <div class="bsg-duration">
                <span class="bsg-duration__label">
                  ${t('تقدير تقريبي لمدة التعرّض الآمن', 'Rough safe-exposure estimate')}
                </span>
                <span class="bsg-duration__value">${formatDuration(minutes)}</span>
              </div>

              ${showMeter
                ? html`<div class="bsg-meter-wrap">
                    <div
                      class="fs-meter"
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
            </div>
          </div>

          ${showNotice ? html`<p class="bsg-notice">${notice}</p>` : nothing}
        </div>
      </section>
    `;
  }
}
