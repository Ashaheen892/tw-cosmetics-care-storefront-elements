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
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { findVerdict, parseActives, parseRules } from './utils.js';
import type { Active, CompatibilityLevel, Rule } from './types.js';

const VERDICT_COLORS: Record<CompatibilityLevel, string> = {
  compatible: '#2f7d5b',
  caution: '#b8791f',
  avoid: '#b23a4a',
};

const VERDICT_ICONS: Record<CompatibilityLevel, string> = {
  compatible: '✓',
  caution: '!',
  avoid: '✕',
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

  private get rules(): Rule[] {
    return parseRules(this.config?.bac_rules);
  }

  private resolvePick(actives: Active[], current: string, fallbackIndex: number): string {
    if (current && actives.some((a) => a.id === current)) return current;
    return actives[fallbackIndex]?.id ?? actives[0]?.id ?? '';
  }

  private renderChips(
    actives: Active[],
    selectedId: string,
    onPick: (id: string) => void
  ) {
    return html`
      <div class="bac-chips" role="group">
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
              <span class="bac-chip__swatch"></span>
              <span>${active.name}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  private renderResult(actives: Active[], aId: string, bId: string) {
    const c = this.config || {};
    const activeA = actives.find((a) => a.id === aId) ?? null;
    const activeB = actives.find((a) => a.id === bId) ?? null;

    const resultTitle =
      localizedString(c.bac_result_title as string) || t('النتيجة', 'Result');
    const defaultNote =
      localizedString(c.bac_default_note as string) ||
      t(
        'لا يوجد تعارض معروف بين هذين المكوّنين، وغالبًا يمكن استخدامهما معًا.',
        'No known conflict between these two ingredients; they can generally be used together.'
      );

    const labels: Record<CompatibilityLevel, string> = {
      compatible:
        localizedString(c.bac_label_compatible as string) || t('متوافقان', 'Compatible'),
      caution:
        localizedString(c.bac_label_caution as string) || t('بحذر', 'Use with caution'),
      avoid: localizedString(c.bac_label_avoid as string) || t('تجنّبي الدمج', 'Avoid'),
    };

    let level: CompatibilityLevel;
    let note: string;
    let timing = '';

    if (aId && bId && aId === bId) {
      level = 'compatible';
      note = t(
        'اخترتِ المكوّن نفسه مرتين. اختاري مكوّنًا مختلفًا لفحص التوافق بينهما.',
        'You picked the same ingredient twice. Choose a different one to check compatibility.'
      );
    } else {
      const rule = findVerdict(this.rules, aId, bId);
      if (rule) {
        level = rule.level;
        note = rule.note || defaultNote;
        timing = rule.timing;
      } else {
        level = 'compatible';
        note = defaultNote;
      }
    }

    const color = VERDICT_COLORS[level];

    return html`
      <div
        class="fs-card bac-result"
        role="region"
        aria-live="polite"
        style=${styleMap({ '--verdict-color': color })}
      >
        <div class="bac-result__head">
          <h3 class="bac-result__title">${resultTitle}</h3>
          <span class="bac-badge">
            <span class="bac-badge__icon" aria-hidden="true">${VERDICT_ICONS[level]}</span>
            <span>${labels[level]}</span>
          </span>
        </div>

        ${activeA && activeB
          ? html`<div class="bac-pair">
              <span
                class="bac-pair__dot"
                style=${styleMap(activeA.color ? { background: activeA.color } : {})}
              ></span>
              <span>${activeA.name}</span>
              <span class="bac-pair__sep">+</span>
              <span
                class="bac-pair__dot"
                style=${styleMap(activeB.color ? { background: activeB.color } : {})}
              ></span>
              <span>${activeB.name}</span>
            </div>`
          : nothing}

        <p class="bac-note">${note}</p>

        ${timing
          ? html`<div class="bac-timing">
              <span class="bac-timing__label">${t('التوقيت', 'Timing')}</span>
              <p class="bac-timing__text">${timing}</p>
            </div>`
          : nothing}
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

          <div class="bac-picker">
            <div class="bac-row">
              <p class="bac-row__label">${pickALabel}</p>
              ${this.renderChips(actives, aId, (id) => (this.selectedA = id))}
            </div>
            <div class="bac-row">
              <p class="bac-row__label">${pickBLabel}</p>
              ${this.renderChips(actives, bId, (id) => (this.selectedB = id))}
            </div>
          </div>

          ${this.renderResult(actives, aId, bId)}

          ${showNotice ? html`<p class="bac-notice">${notice}</p>` : nothing}
        </div>
      </section>
    `;
  }
}
