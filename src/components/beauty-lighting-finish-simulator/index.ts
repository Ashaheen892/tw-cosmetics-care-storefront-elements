import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  clamp,
  getRadioValue,
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
  finishLabel,
  parseLights,
  resolveAspect,
  resolveCompareStyle,
  resolveTransition,
  resolveViewMode,
  usedFinishes,
} from './utils.js';
import type { Finish, LightState } from './types.js';

export default class BeautyLightingFinishSimulator extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private selId = '';
  @state() private selName = '';
  @state() private selFinish = '';
  @state() private cmpA = '';
  @state() private cmpB = '';
  @state() private sliderPos = 50;
  @state() private sliderDragging = false;
  @state() private compareOn: boolean | null = null;

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
      this.selName = '';
      this.selFinish = '';
      this.cmpA = '';
      this.cmpB = '';
      this.compareOn = null;
    }
  }

  private get lights(): LightState[] {
    return parseLights(this.config?.bls_lights);
  }

  private uniqueNames(lights: LightState[]): string[] {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const l of lights) {
      if (!seen.has(l.name)) {
        seen.add(l.name);
        out.push(l.name);
      }
    }
    return out;
  }

  private defaultName(lights: LightState[]): string {
    const preset = String(this.config?.bls_default_light ?? '').trim();
    const byId = lights.find((l) => l.id === preset);
    if (byId) return byId.name;
    const byName = lights.find((l) => l.name === preset);
    if (byName) return byName.name;
    return lights[0]?.name ?? '';
  }

  private defaultFinish(lights: LightState[]): Finish {
    const finishes = usedFinishes(lights);
    const preset = getRadioValue(this.config?.bls_default_finish, '') as Finish;
    if (finishes.includes(preset)) return preset;
    return finishes[0] ?? 'any';
  }

  private activeSingle(lights: LightState[], finishEnabled: boolean): LightState {
    if (finishEnabled) {
      const name = this.selName || this.defaultName(lights);
      const finish = (this.selFinish as Finish) || this.defaultFinish(lights);
      return (
        lights.find((l) => l.name === name && l.finish === finish) ||
        lights.find((l) => l.finish === finish) ||
        lights.find((l) => l.name === name) ||
        lights[0]
      );
    }
    const preset = String(this.config?.bls_default_light ?? '').trim();
    const id = this.selId || preset;
    return lights.find((l) => l.id === id) || lights.find((l) => l.name === id) || lights[0];
  }

  private renderPicture(light: LightState, cls: string, eager: boolean) {
    if (!light?.image) {
      return html`<div class="bls-pic bls-pic--empty ${cls}" role="img" aria-label=${t('لا توجد صورة', 'No image')}>
        <span class="bls-empty__icon" aria-hidden="true">◯</span>
        <span class="bls-empty__text">${t('أضيفي صورة لهذه الحالة', 'Add an image for this state')}</span>
      </div>`;
    }
    return html`<picture class="bls-pic ${cls}">
      ${light.imageMobile
        ? html`<source media="(max-width: 639px)" srcset=${light.imageMobile} />`
        : nothing}
      <img
        src=${light.image}
        alt=${light.name}
        loading=${eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority=${eager ? 'high' : 'low'}
      />
    </picture>`;
  }

  // —— compare slider ——
  private isRtl(): boolean {
    return getComputedStyle(this).direction === 'rtl';
  }

  private onSliderMove = (e: PointerEvent): void => {
    const stage = this.shadowRoot?.querySelector('.bls-cmp-slider') as HTMLElement | null;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const raw = this.isRtl()
      ? (rect.right - e.clientX) / rect.width
      : (e.clientX - rect.left) / rect.width;
    this.sliderPos = clamp(Math.round(raw * 100), 0, 100);
  };

  private onSliderDown = (e: PointerEvent): void => {
    e.preventDefault();
    this.sliderDragging = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    this.onSliderMove(e);
    window.addEventListener('pointermove', this.onSliderMove);
    window.addEventListener('pointerup', this.onSliderUp, { once: true });
  };

  private onSliderUp = (): void => {
    this.sliderDragging = false;
    window.removeEventListener('pointermove', this.onSliderMove);
  };

  private onSliderKey = (e: KeyboardEvent): void => {
    const step = e.shiftKey ? 10 : 5;
    const dir = this.isRtl() ? -1 : 1;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.sliderPos = clamp(this.sliderPos - step * dir, 0, 100);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.sliderPos = clamp(this.sliderPos + step * dir, 0, 100);
    } else if (e.key === 'Home') {
      e.preventDefault();
      this.sliderPos = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      this.sliderPos = 100;
    }
  };

  private renderIndicators(light: LightState, locale: 'ar' | 'en') {
    const allRows: Array<[string, number]> = [
      [locale === 'en' ? 'Glossiness' : 'اللمعان', light.gloss],
      [locale === 'en' ? 'Color clarity' : 'وضوح اللون', light.clarity],
      [locale === 'en' ? 'Contrast' : 'التباين', light.contrast],
    ];
    const rows = allRows.filter(([, v]) => v > 0);
    if (!rows.length) return nothing;
    return html`<div class="bls-indicators">
      ${rows.map(
        ([label, val]) => html`<div class="bls-indicator">
          <span class="bls-indicator__label">${label}</span>
          <span class="fs-meter"><span style=${styleMap({ width: `${(val / 5) * 100}%` })}></span></span>
          <span class="bls-indicator__val">${val}/5</span>
        </div>`
      )}
    </div>`;
  }

  private renderPanel(light: LightState, locale: 'ar' | 'en') {
    const c = this.config || {};
    const showIndicators = isTruthy(c.bls_show_indicators, true);
    const showPalette = isTruthy(c.bls_show_palette, true);
    return html`<div class="bls-panel">
      ${light.desc ? html`<p class="bls-desc">${light.desc}</p>` : nothing}
      ${light.colorEffect ? html`<p class="bls-color-effect">${t('تأثير اللون', 'Color effect')}: ${light.colorEffect}</p>` : nothing}
      ${showIndicators ? this.renderIndicators(light, locale) : nothing}
      ${showPalette && light.palette.length
        ? html`<div class="bls-palette">${light.palette.map((col) => html`<span class="bls-swatch" style=${styleMap({ background: col })} title=${col}></span>`)}</div>`
        : nothing}
      ${light.note ? html`<p class="bls-note">★ ${light.note}</p>` : nothing}
      <div class="fs-actions">
        ${renderCommerceCtaButton(c, 'bls_', { href: light.link })}
      </div>
    </div>`;
  }

  private renderLightChip(light: LightState, active: boolean) {
    const isSicon = light.icon.startsWith('sicon-');
    return html`
      <button
        type="button"
        class=${classMap({ 'bls-chip': true, 'is-active': active })}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => (this.selId = light.id)}
      >
        <span class="bls-chip__icon" aria-hidden="true">
          ${light.icon
            ? isSicon
              ? html`<span class=${light.icon}></span>`
              : light.icon
            : '✦'}
        </span>
        <span class="bls-chip__name">${light.name}</span>
        <span class="bls-chip__dot" aria-hidden="true"></span>
      </button>
    `;
  }

  private renderSingle(lights: LightState[], locale: 'ar' | 'en') {
    const c = this.config || {};
    const finishEnabled = isTruthy(c.bls_enable_finish, false) && usedFinishes(lights).length > 0;
    const eagerAll = getRadioValue(this.config?.bls_preload, 'lazy') === 'eager';
    const transition = resolveTransition(c);
    const active = this.activeSingle(lights, finishEnabled);
    const names = this.uniqueNames(lights);
    const finishes = usedFinishes(lights);
    const activeName = active?.name;
    const activeFinish = (this.selFinish as Finish) || this.defaultFinish(lights);

    return html`
      <div class="bls-shell">
        <aside class="bls-aside">
          <div class="bls-controls-card">
            ${finishEnabled
              ? html`
                  <div class="bls-controls">
                    <span class="bls-controls__label">${t('اللمسة النهائية', 'Finish')}</span>
                    <div class="bls-finish-chips" role="group" aria-label=${t('اللمسة النهائية', 'Finish')}>
                      ${finishes.map(
                        (f) => html`<button
                          type="button"
                          class=${classMap({ 'bls-finish-chip': true, 'is-active': f === activeFinish })}
                          aria-pressed=${f === activeFinish ? 'true' : 'false'}
                          @click=${() => (this.selFinish = f)}
                        >
                          ${finishLabel(f, locale)}
                        </button>`
                      )}
                    </div>
                  </div>
                  <div class="bls-controls">
                    <span class="bls-controls__label">${t('نوع الإضاءة', 'Lighting')}</span>
                    <div class="bls-chips" role="group" aria-label=${t('حالات الإضاءة', 'Lighting states')}>
                      ${names.map((n) => {
                        const sample = lights.find((l) => l.name === n);
                        const isSicon = !!sample?.icon.startsWith('sicon-');
                        return html`<button
                          type="button"
                          class=${classMap({ 'bls-chip': true, 'is-active': n === activeName })}
                          aria-pressed=${n === activeName ? 'true' : 'false'}
                          @click=${() => (this.selName = n)}
                        >
                          <span class="bls-chip__icon" aria-hidden="true">
                            ${sample?.icon
                              ? isSicon
                                ? html`<span class=${sample.icon}></span>`
                                : sample.icon
                              : '✦'}
                          </span>
                          <span class="bls-chip__name">${n}</span>
                          <span class="bls-chip__dot" aria-hidden="true"></span>
                        </button>`;
                      })}
                    </div>
                  </div>
                `
              : html`<div class="bls-controls">
                  <span class="bls-controls__label">${t('اختاري الإضاءة', 'Pick a lighting')}</span>
                  <div class="bls-chips" role="group" aria-label=${t('حالات الإضاءة', 'Lighting states')}>
                    ${lights.map((l) => this.renderLightChip(l, l.id === active?.id))}
                  </div>
                </div>`}
          </div>

          ${active ? this.renderPanel(active, locale) : nothing}
        </aside>

        <div class="bls-mirror">
          <div class=${classMap({ 'bls-stage': true, 'bls-stage--fade': transition === 'fade' })}>
            ${eagerAll
              ? lights.map((l) =>
                  this.renderPicture(l, `bls-layer ${l.id === active?.id ? 'is-on' : ''}`, true)
                )
              : this.renderPicture(active, '', true)}
            <div class="bls-caption">
              <b>${active?.name}</b>${active?.colorEffect ? html` — ${active.colorEffect}` : nothing}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderCompare(lights: LightState[]) {
    const c = this.config || {};
    const style = resolveCompareStyle(c);
    const a = lights.find((l) => l.id === this.cmpA) || lights[0];
    const b = lights.find((l) => l.id === this.cmpB) || lights[1] || lights[0];

    const picks = html`<div class="bls-compare-picks">
      <div>
        <label for="bls-a">${t('الحالة الأولى', 'First state')}</label>
        <select id="bls-a" @change=${(e: Event) => (this.cmpA = (e.target as HTMLSelectElement).value)}>
          ${lights.map((l) => html`<option value=${l.id} ?selected=${l.id === a?.id}>${l.name}</option>`)}
        </select>
        ${renderCommerceCtaButton(c, 'bls_', { href: a?.link })}
      </div>
      <div>
        <label for="bls-b">${t('الحالة الثانية', 'Second state')}</label>
        <select id="bls-b" @change=${(e: Event) => (this.cmpB = (e.target as HTMLSelectElement).value)}>
          ${lights.map((l) => html`<option value=${l.id} ?selected=${l.id === b?.id}>${l.name}</option>`)}
        </select>
        ${renderCommerceCtaButton(c, 'bls_', { href: b?.link })}
      </div>
    </div>`;

    if (style === 'side') {
      return html`<div class="bls-wrap">
        <div class="bls-cmp-side">
          <div class="bls-stage"><span class="bls-cmp-tag bls-cmp-tag--a">${a?.name}</span>${this.renderPicture(a, '', true)}</div>
          <div class="bls-stage"><span class="bls-cmp-tag bls-cmp-tag--b">${b?.name}</span>${this.renderPicture(b, '', true)}</div>
        </div>
        ${picks}
      </div>`;
    }

    const overlayStyle = style === 'slider' ? styleMap({ '--bls-pos': `${this.sliderPos}%` }) : styleMap({});
    return html`<div class="bls-wrap">
      <div
        class=${classMap({
          'bls-stage': true,
          'bls-cmp-slider': style === 'slider',
          'bls-cmp-split': style === 'split',
          'is-dragging': style === 'slider' && this.sliderDragging,
        })}
        style=${overlayStyle}
        role=${style === 'slider' ? 'slider' : nothing}
        tabindex=${style === 'slider' ? '0' : nothing}
        aria-label=${style === 'slider' ? t('اسحبي للمقارنة بين الحالتين', 'Drag to compare the two states') : nothing}
        aria-valuenow=${style === 'slider' ? Math.round(this.sliderPos) : nothing}
        aria-valuemin=${style === 'slider' ? '0' : nothing}
        aria-valuemax=${style === 'slider' ? '100' : nothing}
        @pointerdown=${style === 'slider' ? this.onSliderDown : undefined}
        @keydown=${style === 'slider' ? this.onSliderKey : undefined}
      >
        <span class="bls-cmp-tag bls-cmp-tag--a">${b?.name}</span>
        <span class="bls-cmp-tag bls-cmp-tag--b">${a?.name}</span>
        ${this.renderPicture(a, '', true)}
        ${this.renderPicture(b, 'bls-img--overlay', true)}
        ${style === 'slider'
          ? html`
              <div class="bls-cmp-handle" aria-hidden="true">
                <span class="bls-cmp-handle__pill">‹ ›</span>
              </div>
              ${!this.sliderDragging && this.sliderPos === 50
                ? html`<div class="bls-cmp-hint" aria-hidden="true">${t('اسحبي للمقارنة', 'Drag to compare')}</div>`
                : nothing}
            `
          : nothing}
      </div>
      ${picks}
    </div>`;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bls_');
    const animate = theme.animate && !prefersReducedMotion();
    const lights = this.lights;
    const title = localizedString(c.bls_title as string);
    const desc = localizedString(c.bls_desc as string);
    const locale = getPageLocale() === 'en' ? 'en' : 'ar';
    const viewMode = resolveViewMode(c);
    const showCompare = isTruthy(c.bls_show_compare, true) && lights.length >= 2;
    const compareActive = this.compareOn ?? viewMode === 'compare';
    const effectiveMode = showCompare && compareActive ? 'compare' : 'single';

    if (!lights.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي حالات إضاءة مع صورها من إعدادات العنصر.', 'Add lighting states with their images in the element settings.')}
      </div>`;
    }

    const active = this.activeSingle(lights, isTruthy(c.bls_enable_finish, false));

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap({
          ...themeStyleMap(theme),
          '--bls-aspect': resolveAspect(c),
          '--bls-active': String(c.bls_active_color ?? theme.accent),
          '--bls-speed': `${Math.max(0, toNumber(c.bls_speed, 400))}ms`,
        })}
        aria-label=${title || t('محاكي الإضاءة والمظهر', 'Lighting & finish simulator')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          ${showCompare
            ? html`<div class="bls-mode-toggle" role="group" aria-label=${t('طريقة العرض', 'View mode')}>
                <button
                  type="button"
                  class=${classMap({ 'bls-mode-toggle__btn': true, 'is-active': effectiveMode === 'single' })}
                  aria-pressed=${effectiveMode === 'single' ? 'true' : 'false'}
                  @click=${() => (this.compareOn = false)}
                >
                  ${t('حالة واحدة', 'Single')}
                </button>
                <button
                  type="button"
                  class=${classMap({ 'bls-mode-toggle__btn': true, 'is-active': effectiveMode === 'compare' })}
                  aria-pressed=${effectiveMode === 'compare' ? 'true' : 'false'}
                  @click=${() => (this.compareOn = true)}
                >
                  ${t('مقارنة', 'Compare')}
                </button>
              </div>`
            : nothing}

          ${effectiveMode === 'compare' ? this.renderCompare(lights) : this.renderSingle(lights, locale)}
        </div>
      </section>
    `;
  }
}
