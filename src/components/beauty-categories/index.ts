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
import { destroyFsSwiper, fsSwiperCss, mountFsSwiper, type Swiper } from '../../utils/fsSwiper.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parseItems, resolveLayout } from './utils.js';
import type { CategoryItem } from './types.js';

const AUTOPLAY_MS = 3500;

export default class BeautyCategories extends LitElement {
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
    if (changed.has('config')) {
      this.scheduleRemount();
    }
  }

  private get items(): CategoryItem[] {
    return parseItems(this.config?.bcat_items);
  }

  private scheduleRemount(): void {
    if (this.remountTimer) clearTimeout(this.remountTimer);
    this.remountTimer = setTimeout(() => this.remountSwiper(), 0);
  }

  private remountSwiper(): void {
    destroyFsSwiper(this.swiper);
    this.swiper = null;
    this.swiperReady = false;

    if (resolveLayout(this.config?.bcat_layout) !== 'slider') return;

    const root = this.renderRoot.querySelector('.bcat-swiper') as HTMLElement | null;
    if (!root || this.items.length < 1) return;

    const autoplayOn = isTruthy(this.config?.bcat_autoplay, true) && !prefersReducedMotion();
    const prevEl = root.querySelector('.bcat-nav--prev') as HTMLElement | null;
    const nextEl = root.querySelector('.bcat-nav--next') as HTMLElement | null;
    const pagEl = root.querySelector('.bcat-dots') as HTMLElement | null;
    const rtl = getComputedStyle(this).direction !== 'ltr';

    this.swiper = mountFsSwiper(root, {
      rtl,
      slidesPerView: 'auto',
      spaceBetween: 18,
      centeredSlides: false,
      watchOverflow: true,
      navigation: {
        prevEl: prevEl || undefined,
        nextEl: nextEl || undefined,
      },
      pagination: pagEl
        ? {
            el: pagEl,
            clickable: true,
            bulletClass: 'bcat-dot',
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
      breakpoints: {
        0: { spaceBetween: 12 },
        640: { spaceBetween: 18 },
      },
    });

    this.swiperReady = true;
  }

  private renderItem(item: CategoryItem) {
    const dir = getComputedStyle(this).direction === 'ltr' ? 'ltr' : 'rtl';
    return html`
      <a
        class="bcat-item"
        dir=${dir}
        href=${item.link || '#'}
        draggable="false"
        @dragstart=${(e: DragEvent) => e.preventDefault()}
        aria-label=${item.title}
      >
        <div class="bcat-disc" aria-hidden=${item.image ? 'false' : 'true'}>
          ${item.image
            ? html`<img
                class="bcat-disc__img"
                src=${item.image}
                alt=""
                loading="lazy"
                decoding="async"
                draggable="false"
              />`
            : html`<span class="bcat-disc__placeholder" aria-hidden="true">✦</span>`}
        </div>
        ${item.title ? html`<p class="bcat-label">${item.title}</p>` : nothing}
      </a>
    `;
  }

  private renderSlider(items: CategoryItem[]) {
    const multi = items.length > 1;

    return html`
      <div
        class=${classMap({
          swiper: true,
          'bcat-swiper': true,
          'is-ready': this.swiperReady,
        })}
        role="region"
        aria-roledescription="carousel"
        aria-label=${t('تصنيفاتنا', 'Our categories')}
      >
        <div class="swiper-wrapper">
          ${items.map(
            (item) => html`
              <div class="swiper-slide bcat-slide" role="group" aria-label=${item.title}>
                ${this.renderItem(item)}
              </div>
            `
          )}
        </div>

        ${multi
          ? html`
              <button
                type="button"
                class="bcat-nav bcat-nav--prev"
                aria-label=${t('السابق', 'Previous')}
              >
                <span class="bcat-nav__chev" aria-hidden="true"></span>
              </button>
              <button
                type="button"
                class="bcat-nav bcat-nav--next"
                aria-label=${t('التالي', 'Next')}
              >
                <span class="bcat-nav__chev" aria-hidden="true"></span>
              </button>
              <div class="bcat-dots" aria-label=${t('صفحات التصنيفات', 'Category pages')}></div>
            `
          : nothing}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bcat_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.bcat_title as string);
    const desc = localizedString(c.bcat_desc as string);
    const layout = resolveLayout(c.bcat_layout);
    const items = this.items;

    if (!items.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي التصنيفات من إعدادات العنصر', 'Add categories in the element settings')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('التصنيفات', 'Categories')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          ${layout === 'grid'
            ? html`
                <div class="bcat-wrap bcat-wrap--grid" role="list">
                  ${items.map((item) => this.renderItem(item))}
                </div>
              `
            : this.renderSlider(items)}
        </div>
      </section>
    `;
  }
}
