import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  extractImageUrl,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parsePairs, clampPosition, defaultSingleImages } from './utils.js';
import type { BeforeAfterPair } from './types.js';

export default class BeautyBeforeAfter extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private position = 50;
  @state() private activeIndex = 0;
  @state() private dragging = false;
  @state() private hintVisible = true;

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

  private get isRtl(): boolean {
    return getComputedStyle(this).direction === 'rtl';
  }

  private startDrag = (e: PointerEvent) => {
    if ((e.target as HTMLElement)?.closest?.('.bba-nav, .bba-toolbar, .bba-tabs')) return;
    this.dragging = true;
    this.hintVisible = false;
    (e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId);
    this.updatePosition(e);
  };

  private onMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    this.updatePosition(e);
  };

  private endDrag = () => {
    this.dragging = false;
  };

  private updatePosition(e: PointerEvent) {
    const viewer = this.renderRoot.querySelector('.bba-viewer') as HTMLElement | null;
    if (!viewer) return;
    const rect = viewer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = this.isRtl ? ((rect.width - x) / rect.width) * 100 : (x / rect.width) * 100;
    this.position = clampPosition(pct);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    const dir = this.isRtl ? -1 : 1;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.position = clampPosition(this.position - step * dir);
      this.hintVisible = false;
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.position = clampPosition(this.position + step * dir);
      this.hintVisible = false;
    } else if (e.key === 'Home') {
      e.preventDefault();
      this.position = 0;
      this.hintVisible = false;
    } else if (e.key === 'End') {
      e.preventDefault();
      this.position = 100;
      this.hintVisible = false;
    }
  };

  private goTo(index: number) {
    this.activeIndex = index;
    this.position = 50;
    this.hintVisible = true;
  }

  private stepPair(total: number, dir: number) {
    if (total < 2) return;
    this.goTo((this.activeIndex + dir + total) % total);
  }

  private onRangeInput(e: Event) {
    this.position = clampPosition(Number((e.target as HTMLInputElement).value));
    this.hintVisible = false;
  }

  private resolvePairs(): BeforeAfterPair[] {
    const c = this.config || {};
    const pairs = parsePairs(c.bba_items);
    const defaults = defaultSingleImages();
    const singleBefore =
      extractImageUrl(c.bba_before_image) ||
      localizedString(c.bba_before_image as string) ||
      defaults.before;
    const singleAfter =
      extractImageUrl(c.bba_after_image) ||
      localizedString(c.bba_after_image as string) ||
      defaults.after;

    if (pairs.length) return pairs;
    if (singleBefore || singleAfter) {
      return [
        {
          before_image: singleBefore,
          after_image: singleAfter,
          before_label: t('قبل', 'Before'),
          after_label: t('بعد', 'After'),
          title: '',
        },
      ];
    }
    return [];
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bba_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.bba_title as string);
    const desc = localizedString(c.bba_desc as string);
    const allPairs = this.resolvePairs();

    if (!allPairs.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي صور قبل وبعد من إعدادات العنصر', 'Add before & after images in element settings')}
      </div>`;
    }

    const idx = Math.min(this.activeIndex, allPairs.length - 1);
    const pair = allPairs[idx];
    const clipRight = `${100 - this.position}%`;
    const handleLeft = `${this.position}%`;
    const beforeLabel = pair.before_label || t('قبل', 'Before');
    const afterLabel = pair.after_label || t('بعد', 'After');

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('قبل وبعد', 'Before & After')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="bba-shell">
            ${allPairs.length > 1
              ? html`<div class="bba-tabs" role="tablist" aria-label=${t('نتائج المقارنة', 'Comparison results')}>
                  ${allPairs.map(
                    (p, i) => html`<button
                      type="button"
                      role="tab"
                      class=${classMap({ 'bba-tab': true, 'is-active': i === idx })}
                      aria-selected=${i === idx ? 'true' : 'false'}
                      @click=${() => this.goTo(i)}
                    >
                      ${p.title || t(`نتيجة ${i + 1}`, `Result ${i + 1}`)}
                    </button>`
                  )}
                </div>`
              : nothing}

            ${pair.title && allPairs.length === 1
              ? html`<p class="bba-case-title">${pair.title}</p>`
              : nothing}

            <div
              class=${classMap({ 'bba-viewer': true, 'is-dragging': this.dragging })}
              style=${styleMap({ '--clip-right': clipRight, '--handle-left': handleLeft })}
              role="slider"
              tabindex="0"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow=${Math.round(this.position)}
              aria-valuetext=${t(
                `${Math.round(this.position)}٪ قبل — ${Math.round(100 - this.position)}٪ بعد`,
                `${Math.round(this.position)}% before — ${Math.round(100 - this.position)}% after`
              )}
              aria-label=${t('اسحبي للمقارنة بين قبل وبعد', 'Drag to compare before and after')}
              @pointerdown=${this.startDrag}
              @pointermove=${this.onMove}
              @pointerup=${this.endDrag}
              @pointercancel=${this.endDrag}
              @keydown=${this.onKeyDown}
            >
              <div class="bba-viewer__layer bba-viewer__after">
                ${pair.after_image
                  ? html`<img class="bba-viewer__img" src=${pair.after_image} alt="" loading="lazy" decoding="async" />`
                  : nothing}
              </div>
              <div class="bba-viewer__layer bba-viewer__before">
                ${pair.before_image
                  ? html`<img class="bba-viewer__img" src=${pair.before_image} alt="" loading="lazy" decoding="async" />`
                  : nothing}
              </div>

              <div class="bba-handle" aria-hidden="true">
                <span class="bba-handle__line"></span>
                <span class="bba-handle__pill">
                  <span class="bba-handle__arrows" aria-hidden="true">‹ ›</span>
                </span>
              </div>

              <span class="bba-chip bba-chip--before">${beforeLabel}</span>
              <span class="bba-chip bba-chip--after">${afterLabel}</span>

              ${this.hintVisible && !this.dragging
                ? html`<div class="bba-hint" aria-hidden="true">
                    <span class="bba-hint__icon">⇔</span>
                    <span>${t('اسحبي للمقارنة', 'Drag to compare')}</span>
                  </div>`
                : nothing}
            </div>

            <div class="bba-toolbar">
              <label class="bba-range">
                <span class="bba-range__label">${t('المقارنة', 'Compare')}</span>
                <input
                  class="bba-range__input"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  .value=${String(Math.round(this.position))}
                  aria-label=${t('مقدار إظهار صورة قبل', 'Before image amount')}
                  @input=${this.onRangeInput}
                />
              </label>

              <div class="bba-quick">
                <button type="button" class="bba-quick__btn" @click=${() => { this.position = 100; this.hintVisible = false; }}>
                  ${beforeLabel}
                </button>
                <button type="button" class="bba-quick__btn" @click=${() => { this.position = 50; this.hintVisible = false; }}>
                  50%
                </button>
                <button type="button" class="bba-quick__btn" @click=${() => { this.position = 0; this.hintVisible = false; }}>
                  ${afterLabel}
                </button>
              </div>

              ${allPairs.length > 1
                ? html`<div class="bba-pair-nav">
                    <button
                      type="button"
                      class="bba-pair-nav__btn"
                      aria-label=${t('السابق', 'Previous')}
                      @click=${() => this.stepPair(allPairs.length, -1)}
                    >‹</button>
                    <span class="bba-pair-nav__count">${idx + 1} / ${allPairs.length}</span>
                    <button
                      type="button"
                      class="bba-pair-nav__btn"
                      aria-label=${t('التالي', 'Next')}
                      @click=${() => this.stepPair(allPairs.length, 1)}
                    >›</button>
                  </div>`
                : nothing}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
