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
import {
  buildHarmony,
  enabledHarmonies,
  harmonyPlainLabel,
  harmonyHint,
  mapToZones,
  parseColors,
} from './utils.js';
import type { HarmonyColor, HarmonyType } from './types.js';

export default class BeautyColorHarmony extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private selectedColorId = '';
  @state() private harmonyType: HarmonyType | '' = '';

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
      this.selectedColorId = '';
      this.harmonyType = '';
    }
  }

  private get colors(): HarmonyColor[] {
    return parseColors(this.config?.bch_colors);
  }

  private resolveColor(colors: HarmonyColor[]): HarmonyColor | null {
    if (!colors.length) return null;
    if (this.selectedColorId) {
      const found = colors.find((c) => c.id === this.selectedColorId);
      if (found) return found;
    }
    const preset = String(this.config?.bch_default_color ?? '').trim();
    if (preset) {
      const found = colors.find((c) => c.id === preset);
      if (found) return found;
    }
    return colors[0];
  }

  private resolveHarmony(types: HarmonyType[]): HarmonyType {
    if (this.harmonyType && types.includes(this.harmonyType)) {
      return this.harmonyType;
    }
    return types[0];
  }

  private selectColor(id: string): void {
    this.selectedColorId = id;
  }

  private selectHarmony(type: HarmonyType): void {
    this.harmonyType = type;
  }

  private renderColors(colors: HarmonyColor[], active: HarmonyColor | null) {
    return html`
      <div class="bch-colors" role="group" aria-label=${t('اختاري لون الأساس', 'Choose base color')}>
        ${colors.map((color) => {
          const selected = active?.id === color.id;
          const label = color.name || color.hex;
          return html`
            <button
              type="button"
              class="bch-color"
              style=${styleMap({ '--swatch': color.hex })}
              aria-pressed=${selected ? 'true' : 'false'}
              aria-label=${`${label} ${color.hex}`}
              @click=${() => this.selectColor(color.id)}
            >
              <span class="bch-color__swatch" aria-hidden="true"></span>
              ${color.name ? html`<span class="bch-color__name">${color.name}</span>` : nothing}
            </button>
          `;
        })}
      </div>
    `;
  }

  private renderTypes(types: HarmonyType[], active: HarmonyType) {
    if (!types.length) return nothing;
    const c = this.config || {};
    const groupLabel =
      localizedString(c.bch_harmony_label as string) ||
      t('2) اختاري نوع التناسق', '2) Choose harmony style');
    return html`
      <div class="bch-group">
        <p class="bch-group__label">${groupLabel}</p>
        <div class="bch-types" role="group" aria-label=${groupLabel}>
          ${types.map((type) => {
            const selected = active === type;
            const label = harmonyPlainLabel(type);
            const hint = harmonyHint(type);
            return html`
              <button
                type="button"
                class="bch-type"
                aria-pressed=${selected ? 'true' : 'false'}
                aria-describedby=${hint ? `bch-hint-${type}` : nothing}
                @click=${() => this.selectHarmony(type)}
              >
                <span class="bch-type__label">${label}</span>
                ${hint ? html`<span class="bch-type__hint" id=${`bch-hint-${type}`}>${hint}</span>` : nothing}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  private renderStrip(harmony: string[], showHex: boolean) {
    return html`
      <div class="bch-strip">
        ${harmony.map(
          (hex) => html`
            <div class="bch-swatch">
              <div
                class="bch-swatch__chip"
                style=${styleMap({ '--swatch': hex })}
                role="img"
                aria-label=${hex}
              ></div>
              ${showHex ? html`<span class="bch-swatch__hex">${hex}</span>` : nothing}
            </div>
          `
        )}
      </div>
    `;
  }

  private renderZones(zones: { lips: string; eyes: string; cheeks: string }, showHex: boolean) {
    const c = this.config || {};
    const items: Array<{ key: keyof typeof zones; label: string }> = [
      { key: 'lips', label: localizedString(c.bch_lips_label as string) || t('الشفاه', 'Lips') },
      { key: 'eyes', label: localizedString(c.bch_eyes_label as string) || t('العيون', 'Eyes') },
      { key: 'cheeks', label: localizedString(c.bch_cheeks_label as string) || t('الخدود', 'Cheeks') },
    ];
    return html`
      <div class="bch-zones">
        ${items.map((item) => {
          const hex = zones[item.key];
          return html`
            <div class="bch-zone">
              <span
                class="bch-zone__swatch"
                style=${styleMap({ '--swatch': hex })}
                role="img"
                aria-label=${`${item.label} ${hex}`}
              ></span>
              <div class="bch-zone__body">
                <span class="bch-zone__label">${item.label}</span>
                ${showHex ? html`<span class="bch-zone__hex">${hex}</span>` : nothing}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bch_');
    const animate = theme.animate && !prefersReducedMotion();
    const colors = this.colors;
    const title = localizedString(c.bch_title as string);
    const desc = localizedString(c.bch_desc as string);
    const showHex = isTruthy(c.bch_show_hex, true);
    const showNotice = isTruthy(c.bch_show_notice, true);
    const notice =
      localizedString(c.bch_notice as string) ||
      t(
        'اقتراحات الألوان إرشادية لمساعدتك على التنسيق.',
        'Color suggestions are guidance to help you coordinate.'
      );

    if (!colors.length) {
      return html`<div class="fs-empty" role="status">
        ${t(
          'أضيفي درجات ألوان من إعدادات العنصر.',
          'Add color shades in the element settings.'
        )}
      </div>`;
    }

    const types = enabledHarmonies(c);
    if (!types.length) {
      return html`<div class="fs-empty" role="status">
        ${t(
          'فعّلي نوع تناسق واحدًا على الأقل من الإعدادات.',
          'Enable at least one harmony type in the settings.'
        )}
      </div>`;
    }

    const activeColor = this.resolveColor(colors);
    const activeType = this.resolveHarmony(types);
    const baseHex = activeColor?.hex ?? colors[0].hex;
    const harmony = buildHarmony(baseHex, activeType);
    const zones = mapToZones(harmony, baseHex);

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('عجلة تناسق ألوان المكياج', 'Makeup color harmony wheel')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="bch-wrap">
            <div class="bch-controls">
              <div class="bch-group">
                <p class="bch-group__label">${t('1) اختاري لون الأساس', '1) Choose a base color')}</p>
                ${this.renderColors(colors, activeColor)}
              </div>
              ${this.renderTypes(types, activeType)}
            </div>

            <div class="bch-result">
              <div class="bch-preview">
                <p class="bch-preview__label">${t('لوحة التناسق', 'Harmony palette')}</p>
                ${this.renderStrip(harmony, showHex)}
              </div>
              <div class="bch-zones-wrap">
                <p class="bch-preview__label">${t('توزيع على الوجه', 'Face placement')}</p>
                ${this.renderZones(zones, showHex)}
              </div>
            </div>

            ${showNotice ? html`<p class="bch-notice">${notice}</p>` : nothing}
          </div>
        </div>
      </section>
    `;
  }
}
