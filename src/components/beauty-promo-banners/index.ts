import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  isTruthy,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { enableDragScroll } from '../../utils/dragScroll.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parseBanners } from './utils.js';

const AUTOPLAY_MS = 5000;

export default class BeautyPromoBanners extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  private boundLangHandler = () => this.requestUpdate();
  private trackEl: HTMLElement | null = null;
  private autoTimer: ReturnType<typeof setInterval> | null = null;
  private paused = false;

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    this.clearAutoplay();
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this.syncAutoplay();
  }

  private bindTrack = (el?: Element) => {
    if (el instanceof HTMLElement) {
      this.trackEl = el;
      enableDragScroll(el);
      this.syncAutoplay();
    }
  };

  private clearAutoplay(): void {
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
      this.autoTimer = null;
    }
  }

  private syncAutoplay(): void {
    this.clearAutoplay();
    const banners = parseBanners(this.config?.bpb_items);
    if (!isTruthy(this.config?.bpb_autoplay, true) || banners.length < 2) return;
    this.autoTimer = setInterval(() => this.advance(), AUTOPLAY_MS);
  }

  /** Advance the scroll-snap track one card, looping back to the start. */
  private advance(): void {
    const track = this.trackEl;
    if (!track || this.paused || !track.isConnected) return;
    const maxStart = track.scrollWidth - track.clientWidth;
    if (maxStart <= 0) return;

    const card = track.querySelector<HTMLElement>('.bpb-card');
    if (!card) return;
    const step = card.offsetWidth + 16;
    const rtl = (getComputedStyle(track).direction || 'ltr') === 'rtl';
    const position = Math.abs(track.scrollLeft);
    const atEnd = position >= maxStart - 8;
    const nextPosition = atEnd ? 0 : Math.min(position + step, maxStart);
    const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';

    // `scroll-snap-type: x mandatory` cancels smooth programmatic scrolling
    // in Chrome, so lift the snap for the duration of the animation.
    const target = rtl ? -nextPosition : nextPosition;
    track.style.scrollSnapType = 'none';
    track.scrollTo({ left: target, behavior });
    window.setTimeout(() => {
      if (!track.isConnected) return;
      // Throttled tabs/iframes never run the smooth animation — force the end
      // position so autoplay still advances.
      if (Math.abs(track.scrollLeft - target) > 4) {
        track.scrollTo({ left: target, behavior: 'auto' });
      }
      track.style.scrollSnapType = '';
    }, 700);
  }

  private pause = () => {
    this.paused = true;
  };

  private resume = () => {
    this.paused = false;
  };

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bpb_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.bpb_title as string);
    const desc = localizedString(c.bpb_desc as string);
    const banners = parseBanners(c.bpb_items);

    if (!banners.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي البنرات من إعدادات العنصر', 'Add banners in the element settings')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('العروض', 'Promotions')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div
            class="bpb-track"
            role="list"
            ${ref(this.bindTrack)}
            @pointerenter=${this.pause}
            @pointerleave=${this.resume}
            @pointerdown=${this.pause}
            @pointerup=${this.resume}
            @pointercancel=${this.resume}
          >
            ${banners.map(
              (banner) => html`
                <article class="bpb-card" role="listitem">
                  ${banner.image
                    ? html`<img class="bpb-card__img" src=${banner.image} alt="" loading="lazy" decoding="async" />`
                    : nothing}
                  <div class="bpb-card__overlay" aria-hidden="true"></div>
                  <div class="bpb-card__body">
                    ${banner.title ? html`<h3 class="bpb-card__title">${banner.title}</h3>` : nothing}
                    ${banner.subtitle ? html`<p class="bpb-card__subtitle">${banner.subtitle}</p>` : nothing}
                    ${banner.link
                      ? html`<a class="bpb-card__cta" href=${banner.link}>
                          ${banner.cta_label || t('تسوقي الآن', 'Shop now')}
                        </a>`
                      : nothing}
                  </div>
                </article>
              `
            )}
          </div>
        </div>
      </section>
    `;
  }
}
