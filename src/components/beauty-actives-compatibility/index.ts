import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
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
import { parseActives, parseRules, resolveVerdict } from './utils.js';
import type { Active, VerdictLevel } from './types.js';

const VERDICT_COLORS: Record<VerdictLevel, string> = {
  compatible: '#2f7d5b',
  caution: '#b8791f',
  avoid: '#b23a4a',
  unknown: '#6b7280',
  same: '#8f7a86',
};

const VERDICT_ICONS: Record<VerdictLevel, string> = {
  compatible: '✓',
  caution: '!',
  avoid: '✕',
  unknown: '?',
  same: '↔',
};

export default class BeautyActivesCompatibility extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private selectedA = '';
  @state() private selectedB = '';

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
      this.selectedA = '';
      this.selectedB = '';
    }
  }

  private get actives(): Active[] {
    return parseActives(this.config?.bac_actives);
  }

  private get rules() {
    return parseRules(this.config?.bac_rules);
  }

  private resolvePick(actives: Active[], current: string, fallbackIndex: number): string {
    if (current && actives.some((a) => a.id === current)) return current;
    return actives[fallbackIndex]?.id ?? actives[0]?.id ?? '';
  }

  private renderChips(
    actives: Active[],
    selectedId: string,
    onPick: (id: string) => void,
    slotLabel: string
  ) {
    return html`
      <div class="bac-slot">
        <p class="bac-slot__label">${slotLabel}</p>
        <div class="bac-chips" role="group" aria-label=${slotLabel}>
          ${actives.map((active) => {
            const selected = active.id === selectedId;
            return html`
              <button
                type="button"
                class=${classMap({ 'bac-chip': true, 'is-selected': selected })}
                style=${styleMap(active.color ? { '--swatch': active.color } : {})}
                aria-pressed=${selected ? 'true' : 'false'}
                title=${active.desc || active.name}
                @click=${() => onPick(active.id)}
              >
                <span class="bac-chip__swatch" aria-hidden="true"></span>
                <span>${active.name}</span>
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  private renderResult(actives: Active[], aId: string, bId: string) {
    const c = this.config || {};
    const activeA = actives.find((a) => a.id === aId) ?? null;
    const activeB = actives.find((a) => a.id === bId) ?? null;

    const defaultNote =
      localizedString(c.bac_default_note as string) ||
      t(
        'لا توجد قاعدة محددة لهذا الزوج في قاعدة البيانات.',
        'No specific rule for this pair in the database.'
      );

    const labels: Record<VerdictLevel, string> = {
      compatible:
        localizedString(c.bac_label_compatible as string) || t('متوافقان', 'Compatible'),
      caution:
        localizedString(c.bac_label_caution as string) || t('بحذر', 'Use with caution'),
      avoid: localizedString(c.bac_label_avoid as string) || t('تجنّبي الدمج', 'Avoid'),
      unknown:
        localizedString(c.bac_label_unknown as string) || t('لا قاعدة / غير معروف', 'No rule / unknown'),
      same: t('نفس المكوّن', 'Same ingredient'),
    };

    const verdict = resolveVerdict(this.rules, aId, bId, defaultNote);
    const { level, note, tip, timing } = verdict;
    const color = VERDICT_COLORS[level];

    const resultTitle = localizedString(c.bac_result_title as string);

    return html`
      <div
        class=${classMap({ 'bac-verdict': true, [`bac-verdict--${level}`]: true })}
        role="region"
        aria-live="polite"
        aria-label=${labels[level]}
        style=${styleMap({ '--verdict-color': color })}
      >
        ${resultTitle ? html`<h3 class="bac-verdict__title">${resultTitle}</h3>` : nothing}
        <div class="bac-verdict__hero">
          <span class="bac-verdict__icon" aria-hidden="true">${VERDICT_ICONS[level]}</span>
          <span class="bac-verdict__badge">${labels[level]}</span>
        </div>

        ${activeA && activeB
          ? html`<div class="bac-pair" aria-label=${t('المكوّنان المختاران', 'Selected pair')}>
              <span class="bac-pair__pill">
                <span
                  class="bac-pair__dot"
                  style=${styleMap(activeA.color ? { background: activeA.color } : {})}
                  aria-hidden="true"
                ></span>
                <span>${activeA.name}</span>
              </span>
              <span class="bac-pair__vs" aria-hidden="true">+</span>
              <span class="bac-pair__pill">
                <span
                  class="bac-pair__dot"
                  style=${styleMap(activeB.color ? { background: activeB.color } : {})}
                  aria-hidden="true"
                ></span>
                <span>${activeB.name}</span>
              </span>
            </div>`
          : nothing}

        <p class="bac-verdict__note">${note}</p>

        ${tip
          ? html`<div class="bac-tip">
              <span class="bac-tip__label">${t('نصيحة', 'Tip')}</span>
              <p class="bac-tip__text">${tip}</p>
            </div>`
          : nothing}

        ${timing
          ? html`<div class="bac-timing">
              <span class="bac-timing__label">${t('التوقيت', 'Timing')}</span>
              <p class="bac-timing__text">${timing}</p>
            </div>`
          : nothing}
        ${renderCommerceCtaButton(c, 'bac_')}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bac_');
    const animate = theme.animate && !prefersReducedMotion();
    const actives = this.actives;

    const title = localizedString(c.bac_title as string);
    const desc = localizedString(c.bac_desc as string);
    const showNotice = isTruthy(c.bac_show_notice, true);
    const notice =
      localizedString(c.bac_notice as string) ||
      t(
        'هذه المعلومات توعوية عامة ولا تُغني عن استشارة مختص العناية بالبشرة.',
        'This information is general and educational and does not replace advice from a skincare professional.'
      );

    if (actives.length < 2) {
      return html`
        <section
          class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t('مدقّق توافق المكونات الفعّالة', 'Actives compatibility checker')}
        >
          <div class="fs-container">
            <div class="fs-empty" role="status">
              ${t('أضيفي مكوّنين على الأقل من إعدادات العنصر.', 'Add at least two ingredients in the element settings.')}
            </div>
          </div>
        </section>
      `;
    }

    const aId = this.resolvePick(actives, this.selectedA, 0);
    const bId = this.resolvePick(actives, this.selectedB, 1);

    const pickALabel =
      localizedString(c.bac_pick_a_label as string) || t('المكوّن الأول', 'First active');
    const pickBLabel =
      localizedString(c.bac_pick_b_label as string) || t('المكوّن الثاني', 'Second active');

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('مدقّق توافق المكونات الفعّالة', 'Actives compatibility checker')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          ${this.renderResult(actives, aId, bId)}

          <div class="bac-picker" aria-label=${t('اختيار المكوّنين', 'Pick ingredients')}>
            ${this.renderChips(actives, aId, (id) => (this.selectedA = id), pickALabel)}
            <div class="bac-divider" aria-hidden="true">
              <span class="bac-divider__line"></span>
              <span class="bac-divider__icon">↕</span>
              <span class="bac-divider__line"></span>
            </div>
            ${this.renderChips(actives, bId, (id) => (this.selectedB = id), pickBLabel)}
          </div>

          ${showNotice ? html`<p class="bac-notice">${notice}</p>` : nothing}
        </div>
      </section>
    `;
  }
}
