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
import { parseFamilies, resolveLayout } from './utils.js';
import type { FamilyLayout, FragranceFamily } from './types.js';

export default class BeautyFragranceFinder extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeId = '';

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
    if (changed.has('config')) this.activeId = '';
  }

  private get families(): FragranceFamily[] {
    return parseFamilies(this.config?.bff_families);
  }

  private resolveActive(families: FragranceFamily[]): FragranceFamily | null {
    if (!families.length) return null;
    if (this.activeId) {
      const found = families.find((f) => f.id === this.activeId);
      if (found) return found;
    }
    const preset = String(this.config?.bff_default_family ?? '').trim();
    if (preset) {
      const found = families.find((f) => f.id === preset);
      if (found) return found;
    }
    return families[0];
  }

  private select(id: string): void {
    this.activeId = id;
  }

  private step(families: FragranceFamily[], dir: number): void {
    if (!families.length) return;
    const active = this.resolveActive(families);
    const idx = active ? families.findIndex((f) => f.id === active.id) : -1;
    const next = (idx + dir + families.length) % families.length;
    this.activeId = families[next]?.id ?? '';
  }

  private renderChip(family: FragranceFamily, layout: FamilyLayout, index: number, total: number) {
    const active = this.resolveActive(this.families)?.id === family.id;
    const isSicon = family.icon.startsWith('sicon-');
    const chipStyle: Record<string, string> = family.color ? { '--fam-color': family.color } : {};
    if (layout === 'wheel') {
      chipStyle['--i-angle'] = `${(360 / Math.max(total, 1)) * index}deg`;
    }
    return html`
      <button
        type="button"
        class=${classMap({ 'bff-chip': true, 'is-active': active })}
        style=${styleMap(chipStyle)}
        aria-pressed=${active ? 'true' : 'false'}
        aria-controls="bff-detail"
        title=${family.name}
        @click=${() => this.select(family.id)}
      >
        <span class="bff-chip__swatch">
          ${family.icon
            ? isSicon
              ? html`<span class=${family.icon}></span>`
              : html`<span>${family.icon}</span>`
            : nothing}
        </span>
        <span class="bff-chip__name">${family.name}</span>
      </button>
    `;
  }

  private renderTier(labelKey: string, label: string, notes: string[]) {
    return html`
      <div class=${`bff-tier bff-tier--${labelKey}`}>
        <span class="bff-tier__label">${label}</span>
        ${notes.length
          ? html`<div class="bff-tier__notes">
              ${notes.map((note) => html`<span class="bff-note">${note}</span>`)}
            </div>`
          : html`<span class="bff-tier__empty">${t('—', '—')}</span>`}
      </div>
    `;
  }

  private renderDetail(family: FragranceFamily, families: FragranceFamily[]) {
    const c = this.config || {};
    const showNav = families.length > 1;
    const showPyramid = isTruthy(c.bff_show_pyramid, true);
    const isSicon = family.icon.startsWith('sicon-');

    const topLabel = localizedString(c.bff_pyramid_top_label as string) || t('المقدمة', 'Top');
    const heartLabel = localizedString(c.bff_pyramid_heart_label as string) || t('القلب', 'Heart');
    const baseLabel = localizedString(c.bff_pyramid_base_label as string) || t('الأساس', 'Base');
    const seasonLabel = localizedString(c.bff_season_label as string) || t('أفضل موسم', 'Best season');
    const occasionLabel = localizedString(c.bff_occasion_label as string) || t('المناسبة', 'Occasion');

    const hasPyramid = family.top.length || family.heart.length || family.base.length;
    const style: Record<string, string> = family.color ? { '--fam-color': family.color } : {};

    return html`
      <div class="fs-card bff-panel" id="bff-detail" role="region" aria-live="polite" style=${styleMap(style)}>
        <div class="bff-panel__head">
          <h3 class="bff-panel__title">
            ${family.icon
              ? html`<span class="bff-panel__badge">${isSicon ? html`<span class=${family.icon}></span>` : family.icon}</span>`
              : nothing}
            <span>${family.name}</span>
          </h3>
          ${showNav
            ? html`<div class="bff-nav">
                <button type="button" class="bff-nav__btn" aria-label=${t('السابق', 'Previous')} @click=${() => this.step(families, -1)}>‹</button>
                <button type="button" class="bff-nav__btn" aria-label=${t('التالي', 'Next')} @click=${() => this.step(families, 1)}>›</button>
              </div>`
            : nothing}
        </div>

        ${family.image
          ? html`<img class="bff-panel__img" src=${family.image} alt="" loading="lazy" decoding="async" />`
          : nothing}
        ${family.desc ? html`<p class="bff-panel__desc">${family.desc}</p>` : nothing}

        ${family.mood.length
          ? html`<div class="bff-mood">
              ${family.mood.map((m) => html`<span class="bff-mood__tag">${m}</span>`)}
            </div>`
          : nothing}

        ${showPyramid && hasPyramid
          ? html`<div class="bff-pyramid" role="list">
              ${this.renderTier('top', topLabel, family.top)}
              ${this.renderTier('heart', heartLabel, family.heart)}
              ${this.renderTier('base', baseLabel, family.base)}
            </div>`
          : nothing}

        ${family.season || family.occasion
          ? html`<div class="bff-facts">
              ${family.season
                ? html`<div class="bff-fact">
                    <span class="bff-fact__label">${seasonLabel}</span>
                    <span class="bff-fact__value">${family.season}</span>
                  </div>`
                : nothing}
              ${family.occasion
                ? html`<div class="bff-fact">
                    <span class="bff-fact__label">${occasionLabel}</span>
                    <span class="bff-fact__value">${family.occasion}</span>
                  </div>`
                : nothing}
            </div>`
          : nothing}

        ${family.link
          ? html`<div class="bff-panel__actions">
              <a class="fs-btn fs-btn--ghost" href=${family.link} target="_blank" rel="noopener noreferrer">
                ${t('اقرئي المزيد', 'Read more')}
              </a>
            </div>`
          : nothing}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bff_');
    const animate = theme.animate && !prefersReducedMotion();
    const families = this.families;
    const title = localizedString(c.bff_title as string);
    const desc = localizedString(c.bff_desc as string);
    const layout = resolveLayout(c);
    const showNotice = isTruthy(c.bff_show_notice, true);
    const notice =
      localizedString(c.bff_notice as string) ||
      t(
        'اختيار العطر تجربة شخصية؛ هذه العائلات دليل استكشافي لمساعدتك على تحديد ما يناسب ذوقك.',
        'Choosing a fragrance is personal; these families are an exploratory guide to help you find what suits your taste.'
      );

    if (!families.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي عائلات عطرية من إعدادات العنصر.', 'Add fragrance families in the element settings.')}
      </div>`;
    }

    const active = this.resolveActive(families);
    const total = families.length;

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('محدد عائلة العطر', 'Fragrance family finder')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="bff-layout">
            <div class="bff-selector">
              <div
                class=${classMap({
                  'bff-chips': true,
                  [`bff-chips--${layout}`]: true,
                })}
                role="group"
                aria-label=${t('عائلات العطر', 'Fragrance families')}
                style=${styleMap(layout === 'wheel' ? { '--wheel-r': '130px' } : {})}
              >
                ${layout === 'wheel'
                  ? html`<div class="bff-wheel-core">${t('اختاري عائلة', 'Pick a family')}</div>`
                  : nothing}
                ${families.map((family, i) => this.renderChip(family, layout, i, total))}
              </div>
            </div>

            ${active ? this.renderDetail(active, families) : nothing}
          </div>

          ${showNotice ? html`<p class="bff-notice">${notice}</p>` : nothing}
        </div>
      </section>
    `;
  }
}
