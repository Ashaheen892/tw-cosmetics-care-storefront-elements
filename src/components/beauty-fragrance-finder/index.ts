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
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parseFamilies, resolveLayout } from './utils.js';
import type { FamilyLayout, FragranceFamily } from './types.js';

const REVEAL_DELAYS = [0, 400, 800];

export default class BeautyFragranceFinder extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeId = '';
  @state() private revealStep = 0;

  private boundLangHandler = () => this.requestUpdate();
  private revealTimers: number[] = [];
  private lastRevealFamilyId = '';

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    this.clearRevealTimers();
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.activeId = '';
      this.revealStep = 0;
      this.lastRevealFamilyId = '';
    }
    const familyId = this.resolveActive(this.families)?.id ?? '';
    if (familyId && familyId !== this.lastRevealFamilyId) {
      this.lastRevealFamilyId = familyId;
      this.startRevealSequence();
    }
  }

  private clearRevealTimers(): void {
    this.revealTimers.forEach((id) => window.clearTimeout(id));
    this.revealTimers = [];
  }

  private startRevealSequence(): void {
    this.clearRevealTimers();
    const reduced = prefersReducedMotion();
    if (reduced) {
      this.revealStep = 3;
      return;
    }
    this.revealStep = 0;
    REVEAL_DELAYS.forEach((delay, i) => {
      const id = window.setTimeout(() => {
        this.revealStep = i + 1;
      }, delay);
      this.revealTimers.push(id);
    });
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
    if (id === this.activeId) return;
    this.activeId = id;
  }

  private step(families: FragranceFamily[], dir: number): void {
    if (!families.length) return;
    const active = this.resolveActive(families);
    const idx = active ? families.findIndex((f) => f.id === active.id) : -1;
    const next = (idx + dir + families.length) % families.length;
    this.activeId = families[next]?.id ?? '';
  }

  private chipHint(family: FragranceFamily): string {
    return family.season || family.mood[0] || '';
  }

  private renderChip(family: FragranceFamily, layout: FamilyLayout, index: number, total: number) {
    const active = this.resolveActive(this.families)?.id === family.id;
    const isSicon = family.icon.startsWith('sicon-');
    const hint = this.chipHint(family);
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
        <span class="bff-chip__swatch" aria-hidden="true">
          ${family.icon
            ? isSicon
              ? html`<span class=${family.icon}></span>`
              : html`<span>${family.icon}</span>`
            : nothing}
        </span>
        <span class="bff-chip__meta">
          <span class="bff-chip__name">${family.name}</span>
          ${hint && layout !== 'wheel' ? html`<span class="bff-chip__hint">${hint}</span>` : nothing}
        </span>
        ${layout !== 'wheel' ? html`<span class="bff-chip__dot" aria-hidden="true"></span>` : nothing}
      </button>
    `;
  }

  private renderTier(
    labelKey: 'top' | 'heart' | 'base',
    label: string,
    notes: string[],
    stepIndex: number
  ) {
    const visible = this.revealStep >= stepIndex;
    const reduced = prefersReducedMotion();
    return html`
      <div
        class=${classMap({
          'bff-tier': true,
          [`bff-tier--${labelKey}`]: true,
          'is-visible': visible,
          'is-instant': reduced,
        })}
        role="listitem"
        aria-hidden=${visible ? 'false' : 'true'}
      >
        <span class="bff-tier__label">${label}</span>
        ${notes.length
          ? html`<div class="bff-tier__notes">
              ${notes.map(
                (note, i) => html`
                  <span
                    class=${classMap({ 'bff-note': true, 'is-visible': visible, 'is-instant': reduced })}
                    style=${styleMap(reduced ? {} : { '--note-i': String(i) })}
                    >${note}</span
                  >
                `
              )}
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
    const seasonLabel = localizedString(c.bff_season_label as string) || t('أنسب موسم', 'Best season');
    const occasionLabel = localizedString(c.bff_occasion_label as string) || t('أنسب مناسبة', 'Occasion');

    const hasPyramid = family.top.length || family.heart.length || family.base.length;
    const style: Record<string, string> = family.color ? { '--fam-color': family.color } : {};

    return html`
      <article class="bff-story" id="bff-detail" role="region" aria-live="polite" style=${styleMap(style)}>
        <div class=${classMap({ 'bff-hero': true, 'bff-hero--media': !!family.image })}>
          <div class="bff-hero__body">
            <div class="bff-hero__top">
              ${family.icon
                ? html`<span class="bff-hero__icon" aria-hidden="true">
                    ${isSicon ? html`<span class=${family.icon}></span>` : family.icon}
                  </span>`
                : html`<span class="bff-hero__icon" aria-hidden="true">✦</span>`}

              ${showNav
                ? html`<div class="bff-nav">
                    <button
                      type="button"
                      class="bff-nav__btn"
                      aria-label=${t('السابق', 'Previous')}
                      @click=${() => this.step(families, -1)}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      class="bff-nav__btn"
                      aria-label=${t('التالي', 'Next')}
                      @click=${() => this.step(families, 1)}
                    >
                      ›
                    </button>
                  </div>`
                : nothing}
            </div>

            <h3 class="bff-hero__title">${family.name}</h3>
            ${family.desc ? html`<p class="bff-hero__desc">${family.desc}</p>` : nothing}
            ${family.mood.length
              ? html`<div class="bff-mood">
                  ${family.mood.map((m) => html`<span class="bff-mood__tag">${m}</span>`)}
                </div>`
              : nothing}
          </div>

          ${family.image
            ? html`<div class="bff-hero__media">
                <img src=${family.image} alt="" loading="lazy" decoding="async" />
              </div>`
            : nothing}
        </div>

        ${showPyramid && hasPyramid
          ? html`<div class="bff-pyramid" role="list" aria-label=${t('هرم النوتات', 'Notes pyramid')}>
              <p class="bff-pyramid__intro">${t('تتكشّف النوتات تدريجيًا…', 'Notes unfold gradually…')}</p>
              ${this.renderTier('top', topLabel, family.top, 1)}
              ${this.renderTier('heart', heartLabel, family.heart, 2)}
              ${this.renderTier('base', baseLabel, family.base, 3)}
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
      </article>
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

          <div class="bff-shell">
            <aside class="bff-selector">
              <p class="bff-selector__label">${t('اختاري عائلة عطرية', 'Pick a fragrance family')}</p>
              <div
                class=${classMap({
                  'bff-chips': true,
                  [`bff-chips--${layout}`]: true,
                })}
                role="group"
                aria-label=${t('عائلات العطر', 'Fragrance families')}
                style=${styleMap(layout === 'wheel' ? { '--wheel-r': '120px' } : {})}
              >
                ${layout === 'wheel'
                  ? html`<div class="bff-wheel-core">${t('عائلات', 'Families')}</div>`
                  : nothing}
                ${families.map((family, i) => this.renderChip(family, layout, i, total))}
              </div>
            </aside>

            ${active ? this.renderDetail(active, families) : nothing}
          </div>

          ${showNotice ? html`<p class="bff-notice">${notice}</p>` : nothing}
          ${renderCommerceOutcome({ config: c, prefix: 'bff_', ready: Boolean(active), selection: active })}
        </div>
      </section>
    `;
  }
}
