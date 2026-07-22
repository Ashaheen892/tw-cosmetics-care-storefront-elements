import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  isExternalUrl,
  isTruthy,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import {
  Autoplay,
  destroyFsSwiper,
  fsSwiperCss,
  mountFsSwiper,
  type Swiper,
} from '../../utils/fsSwiper.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parseBanners } from './utils.js';
import type { PromoBanner } from './types.js';

const AUTOPLAY_MS = 5500;

export default class BeautyPromoBanners extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private swiperReady = false;

  private boundLangHandler = () => {
    this.requestUpdate();
    queueMicrotask(() => this.remountSwiper());
  };
  private swiper: Swiper | null = null;
  private remountTimer: ReturnType<typeof setTimeout> | null = null;

  static styles = [sharedSectionCss, fsSwiperCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    if (this.remountTimer) clearTimeout(this.remountTimer);
    destroyFsSwiper(this.swiper);
    this.swiper = null;
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    this.remountSwiper();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this.scheduleRemount();
  }

  private scheduleRemount(): void {
    if (this.remountTimer) clearTimeout(this.remountTimer);
    this.remountTimer = setTimeout(() => this.remountSwiper(), 0);
  }

  private remountSwiper(): void {
    destroyFsSwiper(this.swiper);
    this.swiper = null;
    this.swiperReady = false;

    const banners = parseBanners(this.config?.bpb_items);
    const root = this.renderRoot.querySelector('.bpb-swiper') as HTMLElement | null;
    if (!root || banners.length < 1) return;

    const multi = banners.length > 1;
    const autoplayOn =
      multi && isTruthy(this.config?.bpb_autoplay, true) && !prefersReducedMotion();
    const prevEl = root.querySelector('.bpb-nav--prev') as HTMLElement | null;
    const nextEl = root.querySelector('.bpb-nav--next') as HTMLElement | null;
    const pagEl = this.renderRoot.querySelector('.bpb-dots') as HTMLElement | null;
    const rtl = getComputedStyle(this).direction !== 'ltr';

    this.swiper = mountFsSwiper(root, {
      rtl,
      modules: autoplayOn ? [Autoplay] : [],
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 480,
      loop: multi,
      watchOverflow: true,
      navigation: multi
        ? {
            prevEl: prevEl || undefined,
            nextEl: nextEl || undefined,
          }
        : undefined,
      pagination: multi && pagEl
        ? {
            el: pagEl,
            clickable: true,
            bulletClass: 'bpb-dot',
            bulletActiveClass: 'is-active',
          }
        : undefined,
      autoplay: autoplayOn
        ? {
            delay: AUTOPLAY_MS,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        : false,
    });

    this.swiperReady = true;
  }

  private renderCard(banner: PromoBanner, index: number, total: number) {
    const external = banner.link ? isExternalUrl(banner.link) : false;
    const dir = getComputedStyle(this).direction === 'ltr' ? 'ltr' : 'rtl';
    const body = html`
      ${banner.image
        ? html`<img
            class="bpb-card__img"
            src=${banner.image}
            alt=""
            loading=${index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            draggable="false"
          />`
        : html`<div class="bpb-card__fallback" aria-hidden="true"></div>`}
      <div class="bpb-card__shade" aria-hidden="true"></div>
      <div class="bpb-card__body">
        ${total > 1
          ? html`<span class="bpb-card__count">${index + 1} / ${total}</span>`
          : nothing}
        ${banner.title ? html`<h3 class="bpb-card__title">${banner.title}</h3>` : nothing}
        ${banner.subtitle ? html`<p class="bpb-card__subtitle">${banner.subtitle}</p>` : nothing}
        ${banner.link
          ? html`<span class="bpb-card__cta">
              <span class="bpb-card__cta-label"
                >${banner.cta_label || t('تسوقي الآن', 'Shop now')}</span
              >
              <span class="bpb-card__cta-arrow" aria-hidden="true"></span>
            </span>`
          : nothing}
      </div>
    `;

    if (banner.link) {
      return html`
        <a
          class="bpb-card bpb-card--link"
          dir=${dir}
          href=${banner.link}
          target=${external ? '_blank' : nothing}
          rel=${external ? 'noopener noreferrer' : nothing}
          aria-label=${banner.title || t('عرض', 'Promotion')}
          draggable="false"
          @dragstart=${(e: DragEvent) => e.preventDefault()}
        >
          ${body}
        </a>
      `;
    }

    return html`
      <article
        class="bpb-card"
        dir=${dir}
        aria-label=${banner.title || t('عرض', 'Promotion')}
      >
        ${body}
      </article>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bpb_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.bpb_title as string);
    const desc = localizedString(c.bpb_desc as string);
    const banners = parseBanners(c.bpb_items);
    const multi = banners.length > 1;

    if (!banners.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي البنرات من إعدادات العنصر', 'Add banners in the element settings')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('عروض الجمال', 'Beauty promotions')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="bpb-carousel">
            <div
              class=${classMap({
                swiper: true,
                'bpb-swiper': true,
                'is-ready': this.swiperReady,
              })}
              role="region"
              aria-roledescription="carousel"
              aria-label=${title || t('عروض الجمال', 'Beauty promotions')}
            >
              <div class="swiper-wrapper">
                ${banners.map(
                  (banner, i) => html`
                    <div class="swiper-slide bpb-slide">
                      ${this.renderCard(banner, i, banners.length)}
                    </div>
                  `
                )}
              </div>

              ${multi
                ? html`
                    <button
                      type="button"
                      class="bpb-nav bpb-nav--prev"
                      aria-label=${t('السابق', 'Previous')}
                    >
                      <span class="bpb-nav__chev" aria-hidden="true"></span>
                    </button>
                    <button
                      type="button"
                      class="bpb-nav bpb-nav--next"
                      aria-label=${t('التالي', 'Next')}
                    >
                      <span class="bpb-nav__chev" aria-hidden="true"></span>
                    </button>
                  `
                : nothing}
            </div>

            ${multi
              ? html`<div
                  class="bpb-dots"
                  aria-label=${t('شرائح العرض', 'Promo slides')}
                ></div>`
              : nothing}
          </div>
        </div>
      </section>
    `;
  }
}
