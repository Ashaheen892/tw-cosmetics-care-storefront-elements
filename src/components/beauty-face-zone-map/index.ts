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
  toNumber,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import {
  parseZones,
  resolveAspect,
  resolveDetailMode,
  resolveDotShape,
} from './utils.js';
import type { DotShape, FaceZone } from './types.js';

export default class BeautyFaceZoneMap extends LitElement {
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

  private get zones(): FaceZone[] {
    return parseZones(this.config?.bfz_zones);
  }

  private resolveActive(zones: FaceZone[]): FaceZone | null {
    if (!zones.length) return null;
    if (this.activeId) {
      const found = zones.find((z) => z.id === this.activeId);
      if (found) return found;
    }
    const preset = String(this.config?.bfz_default_zone ?? '').trim();
    if (preset) {
      const found = zones.find((z) => z.id === preset);
      if (found) return found;
    }
    return null;
  }

  private select(id: string): void {
    this.activeId = id;
  }

  private step(zones: FaceZone[], dir: number): void {
    const active = this.resolveActive(zones);
    const idx = active ? zones.findIndex((z) => z.id === active.id) : -1;
    const next = (idx + dir + zones.length) % zones.length;
    this.activeId = zones[next]?.id ?? '';
  }

  private renderDot(zone: FaceZone, shape: DotShape, pulse: boolean, index: number, showNames: boolean) {
    const active = this.activeId === zone.id;
    const label = zone.name || zone.title;
    const withLabel = shape === 'label' || showNames;
    return html`
      <button
        type="button"
        class=${classMap({
          'bfz-dot': true,
          [`bfz-dot--${shape}`]: true,
          'is-active': active,
        })}
        style=${styleMap({
          '--dot-x': `${zone.x}%`,
          '--dot-y': `${zone.y}%`,
          '--dot-size': `${zone.dotSize}px`,
          ...(zone.dotColor ? { '--dot-color': zone.dotColor } : {}),
        })}
        aria-pressed=${active ? 'true' : 'false'}
        aria-controls="bfz-detail"
        aria-label=${label}
        title=${label}
        @click=${() => this.select(zone.id)}
      >
        ${pulse && shape === 'pulse' ? html`<span class="bfz-dot__pulse"></span>` : nothing}
        ${shape === 'number'
          ? html`<span>${index + 1}</span>`
          : shape === 'icon' && zone.icon
            ? html`<span class=${zone.icon.startsWith('sicon-') ? zone.icon : ''}>${zone.icon.startsWith('sicon-') ? '' : zone.icon}</span>`
            : nothing}
        ${withLabel ? html`<span class="bfz-dot__label">${label}</span>` : nothing}
      </button>
    `;
  }

  private renderDetail(zone: FaceZone | null, mode: string) {
    if (!zone) {
      return html`<div class="bfz-panel">
        <p class="bfz-placeholder">
          ${t('اختاري منطقة من الخريطة لعرض تفاصيل العناية بها.', 'Pick a zone on the map to see its care details.')}
        </p>
      </div>`;
    }
    const c = this.config || {};
    const showNav = isTruthy(c.bfz_show_nav, true) && this.zones.length > 1;
    const stepsTitle = t('خطوات العناية', 'Care steps');
    const tipsTitle = t('نصائح', 'Tips');

    return html`
      <div class="bfz-panel" id="bfz-detail" role="region" aria-live="polite">
        <div class="bfz-panel__head">
          <h3 class="bfz-panel__title">${zone.title || zone.name}</h3>
          <div class="bfz-nav">
            ${mode === 'sheet'
              ? html`<button
                  type="button"
                  class="bfz-nav__btn bfz-sheet-close"
                  aria-label=${t('إغلاق', 'Close')}
                  @click=${() => (this.activeId = '')}
                >✕</button>`
              : nothing}
            ${showNav
              ? html`
                  <button type="button" class="bfz-nav__btn" aria-label=${t('السابق', 'Previous')} @click=${() => this.step(this.zones, -1)}>‹</button>
                  <button type="button" class="bfz-nav__btn" aria-label=${t('التالي', 'Next')} @click=${() => this.step(this.zones, 1)}>›</button>
                `
              : nothing}
          </div>
        </div>

        ${zone.image ? html`<img class="bfz-panel__img" src=${zone.image} alt="" loading="lazy" decoding="async" />` : nothing}
        ${zone.desc ? html`<p class="bfz-panel__desc">${zone.desc}</p>` : nothing}

        ${zone.tags.length
          ? html`<div class="bfz-tags">${zone.tags.map((tag) => html`<span class="bfz-tag">${tag}</span>`)}</div>`
          : nothing}

        ${zone.steps.length
          ? html`<div class="bfz-block">
              <h4 class="bfz-block__title">${stepsTitle}</h4>
              <ol class="bfz-steps">${zone.steps.map((s) => html`<li>${s}</li>`)}</ol>
            </div>`
          : nothing}

        ${zone.tips.length
          ? html`<div class="bfz-block">
              <h4 class="bfz-block__title">${tipsTitle}</h4>
              <ul class="bfz-tips">${zone.tips.map((tip) => html`<li>${tip}</li>`)}</ul>
            </div>`
          : nothing}

        ${zone.warning ? html`<div class="bfz-warn"><span>⚠︎</span><span>${zone.warning}</span></div>` : nothing}

        ${zone.link
          ? html`<a class="fs-btn" href=${zone.link} target="_blank" rel="noopener noreferrer">
              ${t('اقرئي المزيد', 'Read more')}
            </a>`
          : nothing}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bfz_');
    const animate = theme.animate && !prefersReducedMotion();
    const zones = this.zones;
    const faceImage = localizedString(c.bfz_face_image as string);
    const title = localizedString(c.bfz_title as string);
    const desc = localizedString(c.bfz_desc as string);
    const shape = resolveDotShape(c);
    const detailMode = resolveDetailMode(c);
    const pulse = isTruthy(c.bfz_pulse, true) && animate;
    const pulseSpeed = Math.max(600, toNumber(c.bfz_pulse_speed, 2200));
    const reverse = isTruthy(c.bfz_reverse, false);
    const showNames = isTruthy(c.bfz_show_names, false);
    const aspect = resolveAspect(c);
    const active = this.resolveActive(zones);
    const showNotice = isTruthy(c.bfz_show_notice, true);
    const notice =
      localizedString(c.bfz_notice as string) ||
      t('المعلومات المعروضة توعوية ولا تُعد تشخيصًا طبيًا.', 'The information shown is educational and is not a medical diagnosis.');

    if (!zones.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي مناطق الوجه من إعدادات العنصر لعرض الخريطة التفاعلية.', 'Add face zones in the element settings to show the interactive map.')}
      </div>`;
    }

    const sheetOpen = detailMode === 'sheet' && !!active;

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap({
          ...themeStyleMap(theme),
          '--bfz-aspect': aspect,
          '--bfz-pulse-speed': `${pulseSpeed}ms`,
        })}
        aria-label=${title || t('خريطة مناطق الوجه والعناية', 'Face care zone map')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div
            class=${classMap({
              'bfz-layout': true,
              'bfz-layout--reverse': reverse,
              'bfz-layout--sheet': detailMode === 'sheet',
            })}
          >
            <div class="bfz-stage">
              ${faceImage
                ? html`<img class="bfz-stage__img" src=${faceImage} alt="" loading="lazy" decoding="async" />`
                : html`<div class="bfz-stage__empty">${t('أضيفي صورة وجه من الإعدادات', 'Add a face image in settings')}</div>`}
              ${zones.map((zone, i) => this.renderDot(zone, shape, pulse, i, showNames))}
            </div>

            ${detailMode === 'sheet'
              ? sheetOpen
                ? html`
                    <button class="bfz-sheet-backdrop" aria-label=${t('إغلاق', 'Close')} @click=${() => (this.activeId = '')}></button>
                    ${this.renderDetail(active, detailMode)}
                  `
                : nothing
              : this.renderDetail(active, detailMode)}
          </div>

          ${showNotice ? html`<p class="bfz-notice">${notice}</p>` : nothing}
        </div>
      </section>
    `;
  }
}
