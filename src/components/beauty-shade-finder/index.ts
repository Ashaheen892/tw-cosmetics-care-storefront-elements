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
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { buildSteps, filterShades, parseShades } from './utils.js';
import type { DimensionKey, Shade, ShadeSelection, StepDef } from './types.js';

export default class BeautyShadeFinder extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private selection: ShadeSelection = {};
  @state() private shades: Shade[] = [];
  @state() private selectedShadeId = '';

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
    const next = { ...this.selection };
    if (next[key] === value) delete next[key];
    else next[key] = value;
    this.selection = next;
    this.ensureSelectedShade();
  }

  private reset(): void {
    this.selection = {};
    this.ensureSelectedShade();
  }

  private selectShade(id: string): void {
    this.selectedShadeId = id;
  }

  private renderStep(step: StepDef, index: number) {
    return html`
      <div class="bsf-step">
        <span class="bsf-step__label">
          <span class="bsf-step__num" aria-hidden="true">${index + 1}</span>
          ${step.label}
        </span>
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

  private renderDetail(shade: Shade, showLink: boolean) {
    const external = shade.link ? isExternalUrl(shade.link) : false;
    return html`
      <div class="bsf-detail" aria-live="polite">
        <div class="bsf-detail__media">
          <span class="bsf-detail__swatch" style=${styleMap({ background: shade.hex })}></span>
        </div>
        <h4 class="bsf-detail__name">
          ${shade.name || t('درجة مقترحة', 'Suggested shade')}
          ${shade.shade_number
            ? html`<span class="bsf-detail__number"> · ${shade.shade_number}</span>`
            : nothing}
        </h4>
        ${shade.desc
          ? html`<p class="bsf-detail__desc">${shade.desc}</p>`
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

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bsf_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.bsf_title as string);
    const desc = localizedString(c.bsf_desc as string);
    const steps = buildSteps(c);
    const filtered = this.filtered;
    const selected = this.selectedShade;
    const showLink = isTruthy(c.bsf_show_link, true);
    const shape = getRadioValue(c.bsf_swatch_shape, 'circle');

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
            <div class="bsf-steps">
              ${steps.map((s, i) => this.renderStep(s, i))}
            </div>

            <div class="bsf-results">
              <h3 class="bsf-results__title">
                ${t('الدرجات المناسبة لكِ', 'Shades that suit you')}
                <span style="font-weight:600;color:var(--muted-color,#8f7a86)"> · ${filtered.length}</span>
              </h3>
              <div class="bsf-swatches" role="listbox" aria-label=${t('عينات الألوان', 'Shade swatches')}>
                ${filtered.map((shade) => {
                  const active = shade.id === this.selectedShadeId;
                  return html`<button
                    type="button"
                    class=${classMap({
                      'bsf-swatch': true,
                      'bsf-swatch--square': shape === 'square',
                      'bsf-swatch--rounded': shape === 'rounded',
                    })}
                    role="option"
                    aria-selected=${active ? 'true' : 'false'}
                    aria-pressed=${active ? 'true' : 'false'}
                    aria-label=${shade.name || shade.shade_number || t('درجة', 'Shade')}
                    @click=${() => this.selectShade(shade.id)}
                  >
                    <span class="bsf-swatch__chip" style=${styleMap({ background: shade.hex })}></span>
                    ${shade.shade_number || shade.shade_name
                      ? html`<span class="bsf-swatch__name">${shade.shade_number || shade.shade_name}</span>`
                      : nothing}
                  </button>`;
                })}
              </div>
              ${selected
                ? this.renderDetail(selected, showLink)
                : html`<p class="fs-empty">${t('لا توجد درجات مطابقة', 'No matching shades')}</p>`}
              <div style="grid-column:1/-1">
                <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.reset}>
                  ${localizedString(c.bsf_reset_btn as string) || t('إعادة التحديد', 'Reset choices')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
