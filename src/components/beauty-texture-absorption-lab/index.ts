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
import { getPageLocale, localizedString } from '../../utils/localizedString.js';
import { renderCommerceCtaButton } from '../../utils/commerceOutcome.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import {
  indicatorRows,
  parseTextures,
  resolveIndicatorType,
  resolveSampleShape,
} from './utils.js';
import type { IndicatorType, Texture } from './types.js';

export default class BeautyTextureAbsorptionLab extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private selId = '';
  @state() private cmpA = '';
  @state() private cmpB = '';
  @state() private spread = 0;
  @state() private compareOpen = false;

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
      this.selId = '';
      this.cmpA = '';
      this.cmpB = '';
      this.spread = 0;
    }
  }

  private get locale(): 'ar' | 'en' {
    return getPageLocale() === 'en' ? 'en' : 'ar';
  }

  private get textures(): Texture[] {
    return parseTextures(this.config?.bta_textures);
  }

  private active(textures: Texture[]): Texture {
    const preset = String(this.config?.bta_default_texture ?? '').trim();
    return (
      textures.find((tx) => tx.id === this.selId) ||
      textures.find((tx) => tx.id === preset) ||
      textures[0]
    );
  }

  private motionDisabled(): boolean {
    if (prefersReducedMotion()) return true;
    if (isTruthy(this.config?.bta_disable_motion_mobile, false)) {
      try {
        return window.matchMedia('(max-width: 639px)').matches;
      } catch {
        return false;
      }
    }
    return false;
  }

  private select(id: string): void {
    this.selId = id;
    this.spread = 0;
  }

  private onPlayPointer = (e: PointerEvent): void => {
    const area = e.currentTarget as HTMLElement;
    area.setPointerCapture?.(e.pointerId);
    const rect = area.getBoundingClientRect();
    const isRtl = getComputedStyle(this).direction === 'rtl';
    const ratio = isRtl ? (rect.right - e.clientX) / rect.width : (e.clientX - rect.left) / rect.width;
    this.spread = clamp(Number(ratio.toFixed(2)), 0, 1);
  };

  private toggleSpread(): void {
    this.spread = this.spread > 0.5 ? 0 : 1;
  }

  private renderIndicators(tx: Texture, type: IndicatorType, higher?: Record<string, boolean>) {
    const rows = indicatorRows(tx, this.locale);
    if (!rows.length) return nothing;
    return html`<div class="bta-indicators" style=${styleMap({ '--meter-color': tx.color })}>
      ${rows.map((row) => {
        const pct = (row.value / 5) * 100;
        let visual;
        if (type === 'dots' || type === 'circles') {
          visual = html`<span class="bta-dots">
            ${[1, 2, 3, 4, 5].map(
              (n) => html`<span class=${classMap({ [type === 'dots' ? 'bta-dot' : 'bta-circle']: true, 'is-on': n <= row.value })}></span>`
            )}
          </span>`;
        } else if (type === 'semicircle') {
          visual = html`<span class="bta-gauge" style=${styleMap({ '--p': String(row.value / 5) })}></span>`;
        } else {
          visual = html`<span class="fs-meter"><span style=${styleMap({ width: `${pct}%` })}></span></span>`;
        }
        return html`<div class="bta-ind">
          <span class="bta-ind__label">${row.label}</span>
          ${visual}
          <span class=${classMap({ 'bta-ind__val': true, 'is-higher': !!higher?.[row.key] })}>${row.value}/5</span>
        </div>`;
      })}
    </div>`;
  }

  private renderFacts(tx: Texture) {
    const facts: Array<[string, string]> = [
      [t('اللمسة النهائية', 'Finish'), tx.finish],
      [t('طريقة التوزيع', 'Application'), tx.spread],
      [t('الكمية', 'Amount'), tx.amount],
      [t('التوقيت', 'When'), tx.timing],
      [t('الاستخدام المناسب', 'Best for'), tx.usage],
    ].filter(([, v]) => !!v) as Array<[string, string]>;
    if (!facts.length) return nothing;
    return html`<div class="bta-facts">
      ${facts.map(([label, value]) => html`<div class="bta-fact"><b>${label}:</b><span>${value}</span></div>`)}
    </div>`;
  }

  private renderExplore(textures: Texture[]) {
    const c = this.config || {};
    const tx = this.active(textures);
    const indType = resolveIndicatorType(c);
    const showIndicators = isTruthy(c.bta_show_indicators, true);
    const enableSpread = isTruthy(c.bta_enable_spread, true);
    const showImages = isTruthy(c.bta_show_images, true);
    const showTips = isTruthy(c.bta_show_tips, true);
    const showNotes = isTruthy(c.bta_show_notes, true);
    const speed = this.motionDisabled() ? 0 : Math.max(0, toNumber(c.bta_spread_speed, 500));

    return html`<div class="bta-stage" style=${styleMap({ '--sample-color': tx.color, '--meter-color': tx.color })}>
      <div
        class="bta-play"
        style=${styleMap({ '--spread': String(this.spread), '--spread-speed': `${speed}ms` })}
        @pointerdown=${enableSpread ? this.onPlayPointer : undefined}
        @pointermove=${enableSpread ? (e: PointerEvent) => { if (e.buttons) this.onPlayPointer(e); } : undefined}
      >
        ${showImages && tx.image
          ? html`<img class="bta-play__img" src=${tx.image} alt=${tx.name} loading="lazy" decoding="async" />`
          : html`<span class="bta-smear"></span>`}
        ${enableSpread
          ? html`<button type="button" class="bta-play__cta" @click=${() => this.toggleSpread()}>
              <span class="bta-play__cta-icon" aria-hidden="true">${this.spread > 0.5 ? '↺' : '▶'}</span>
              ${this.spread > 0.5 ? t('إعادة', 'Reset') : t('طبّقي القوام', 'Apply texture')}
            </button>`
          : nothing}
        ${enableSpread && !tx.image
          ? html`<span class="bta-play__hint">${t('اسحبي داخل المساحة لرؤية الانتشار', 'Drag inside the area to see it spread')}</span>`
          : nothing}
      </div>

      <div class="bta-details">
        <h3 class="bta-details__name">${tx.name}</h3>
        ${tx.desc ? html`<p class="bta-details__desc">${tx.desc}</p>` : nothing}
        ${showIndicators ? this.renderIndicators(tx, indType) : nothing}
        ${this.renderFacts(tx)}
        ${showTips && tx.tips ? html`<p class="bta-details__desc">💡 ${tx.tips}</p>` : nothing}
        ${showNotes && tx.note ? html`<p class="bta-note">★ ${tx.note}</p>` : nothing}
      </div>
    </div>`;
  }

  private renderCompare(textures: Texture[]) {
    const c = this.config || {};
    const indType = resolveIndicatorType(c);
    const a = textures.find((tx) => tx.id === this.cmpA) || textures[0];
    const b = textures.find((tx) => tx.id === this.cmpB) || textures[1] || textures[0];
    const keys = ['lightness', 'thickness', 'absorption', 'hydration', 'gloss', 'greasiness'] as const;
    const higherA: Record<string, boolean> = {};
    const higherB: Record<string, boolean> = {};
    for (const k of keys) {
      if (a[k] > b[k]) higherA[k] = true;
      else if (b[k] > a[k]) higherB[k] = true;
    }

    const picker = (id: string, current: Texture, onChange: (v: string) => void, label: string) => html`
      <div>
        <label style="font-size:0.76rem;font-weight:700;color:var(--muted-color);display:block;margin-bottom:0.25rem">${label}</label>
        <select id=${id} @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value)}>
          ${textures.map((tx) => html`<option value=${tx.id} ?selected=${tx.id === current?.id}>${tx.name}</option>`)}
        </select>
      </div>
    `;

    return html`
      <div class="bta-compare__picks">
        ${picker('bta-a', a, (v) => (this.cmpA = v), t('القوام الأول', 'First texture'))}
        ${picker('bta-b', b, (v) => (this.cmpB = v), t('القوام الثاني', 'Second texture'))}
      </div>
      <div class="bta-compare">
        <div class="bta-compare__col" style=${styleMap({ '--sample-color': a.color, '--meter-color': a.color })}>
          <h3 class="bta-details__name">${a.name}</h3>
          ${this.renderIndicators(a, indType, higherA)}
          ${this.renderFacts(a)}
        </div>
        <div class="bta-compare__col" style=${styleMap({ '--sample-color': b.color, '--meter-color': b.color })}>
          <h3 class="bta-details__name">${b.name}</h3>
          ${this.renderIndicators(b, indType, higherB)}
          ${this.renderFacts(b)}
        </div>
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bta_');
    const animate = theme.animate && !prefersReducedMotion();
    const textures = this.textures;
    const title = localizedString(c.bta_title as string);
    const desc = localizedString(c.bta_desc as string);
    const shape = resolveSampleShape(c);
    const enableCompare = isTruthy(c.bta_enable_compare, true) && textures.length >= 2;
    const active = textures.length ? this.active(textures) : null;

    if (!textures.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي أنواع القوام من إعدادات العنصر لعرض المختبر.', 'Add texture types in the element settings to show the lab.')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap({
          ...themeStyleMap(theme),
          '--bta-area': String(c.bta_area_color ?? ''),
          '--success-color': '#2f9e63',
        })}
        aria-label=${title || t('مختبر القوام والامتصاص', 'Texture & absorption lab')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class=${classMap({ 'bta-samples': true, [`bta-samples--${shape}`]: true })} role="tablist">
            ${textures.map(
              (tx) => html`<button
                type="button"
                role="tab"
                class=${classMap({ 'bta-sample': true, 'is-active': tx.id === active?.id && !this.compareOpen })}
                aria-selected=${tx.id === active?.id ? 'true' : 'false'}
                style=${styleMap({ '--sample-color': tx.color })}
                @click=${() => { this.compareOpen = false; this.select(tx.id); }}
              >
                <span class="bta-sample__blob">${tx.icon && !tx.icon.startsWith('sicon-') ? tx.icon : ''}</span>
                <span class="bta-sample__name">${tx.name}</span>
              </button>`
            )}
          </div>

          ${this.compareOpen && enableCompare ? this.renderCompare(textures) : this.renderExplore(textures)}

          <div class="bta-toolbar">
            ${enableCompare
              ? html`
                <button
                  type="button"
                  class=${this.compareOpen ? 'fs-btn fs-btn--ghost' : 'fs-btn'}
                  @click=${() => (this.compareOpen = false)}
                >${t('استكشاف قوام', 'Explore one')}</button>
                <button
                  type="button"
                  class=${this.compareOpen ? 'fs-btn' : 'fs-btn fs-btn--ghost'}
                  @click=${() => (this.compareOpen = true)}
                >${t('مقارنة قوامين', 'Compare two')}</button>
                `
              : nothing}
            ${renderCommerceCtaButton(c, 'bta_')}
          </div>
        </div>
      </section>
    `;
  }
}
