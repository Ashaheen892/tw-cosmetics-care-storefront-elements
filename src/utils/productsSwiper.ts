/**
 * Owned product slider: Swiper.js + Theme Raed product cards.
 * Optionally mounts `<salla-product-options>` on each card when the merchant enables it.
 */
import { html, LitElement, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ref } from 'lit/directives/ref.js';
import type { Swiper as SwiperInstance } from 'swiper';
import { destroyFsSwiper, mountFsSwiper } from './fsSwiper.js';
import { ensureRaedProductStyles } from './raedProductStyles.js';
import { t } from './helpers.js';
import {
  awaitSallaReady,
  buildProductFetchParams,
  fetchSallaProducts,
  getSalla,
} from './sallaApi.js';

type SallaProduct = Record<string, unknown> & {
  id?: string | number;
  name?: string;
  options?: unknown[];
  options_count?: number;
  has_options?: boolean;
  has_product_options?: boolean;
  type?: string;
};

const TAG = 'fs-products-swiper';

async function fetchProducts(
  source: string,
  sourceValue: string,
  limit: number
): Promise<SallaProduct[]> {
  const params = buildProductFetchParams(source, sourceValue, limit);
  if (!params) return [];

  // Wait briefly for Twilight demo / storefront SDK to boot.
  await awaitSallaReady();
  if (!getSalla()?.product) {
    await new Promise((r) => setTimeout(r, 300));
    await awaitSallaReady();
  }

  const list = await fetchSallaProducts(params);
  return (list as SallaProduct[]).slice(0, Math.max(1, Math.min(40, Number(limit) || 8)));
}

function productMayHaveOptions(product: SallaProduct): boolean {
  if (Array.isArray(product.options) && product.options.length) return true;
  if (Number(product.options_count) > 0) return true;
  if (product.has_options || product.has_product_options) return true;
  return false;
}

function resolveCardTag(): 'custom-salla-product-card' | 'salla-product-card' {
  if (typeof customElements !== 'undefined' && customElements.get('custom-salla-product-card')) {
    return 'custom-salla-product-card';
  }
  return 'salla-product-card';
}

async function fetchOptionsMap(
  products: SallaProduct[]
): Promise<Map<string, unknown[]>> {
  const map = new Map<string, unknown[]>();
  const needIds: Array<string | number> = [];

  for (const p of products) {
    const id = p.id;
    if (id == null) continue;
    const key = String(id);
    if (Array.isArray(p.options) && p.options.length) {
      map.set(key, p.options);
      continue;
    }
    if (productMayHaveOptions(p) || !('options' in p)) {
      needIds.push(id);
    }
  }

  if (!needIds.length) return map;

  const salla = getSalla();
  const fetchOptions = salla?.product?.api?.fetchOptions?.bind(salla.product.api);
  if (typeof fetchOptions !== 'function') return map;

  try {
    const res = await fetchOptions(needIds);
    const items = Array.isArray(res?.data) ? res.data : [];
    for (const item of items) {
      if (item?.id == null) continue;
      const options = Array.isArray(item.options) ? item.options : [];
      map.set(String(item.id), options);
    }
  } catch {
    /* keep empty */
  }
  return map;
}

const styles = css`
  :host {
    display: block;
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  .fs-ps {
    position: relative;
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  .fs-ps__status {
    margin: 0;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
    line-height: 1.5;
    padding: 0.75rem 0.25rem;
  }

  /*
   * Swiper base CSS must live in the Lit shadow root.
   * Do NOT force slide widths with !important — that breaks drag/translate math.
   */
  .fs-ps .swiper {
    position: relative;
    display: block;
    width: 100%;
    margin: 0;
    padding: 0.35rem 2.4rem 1.25rem;
    overflow: hidden;
    list-style: none;
    z-index: 1;
    box-sizing: border-box;
    touch-action: pan-y;
  }

  .fs-ps .swiper-wrapper {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 1;
    box-sizing: content-box;
    align-items: stretch;
    transition-property: transform;
    transition-timing-function: ease;
  }

  .fs-ps .swiper-slide {
    position: relative;
    display: block;
    flex-shrink: 0;
    height: auto;
    width: auto;
    box-sizing: border-box;
    transition-property: transform;
  }

  .fs-ps__item {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-width: 0;
  }

  .fs-ps salla-product-card,
  .fs-ps custom-salla-product-card {
    display: block;
    width: 100%;
    flex: 1 1 auto;
    pointer-events: auto;
  }

  /* Theme Raed .cart-options / product options on card */
  .fs-ps__options.cart-options {
    margin-top: 0.65rem;
    padding: 0.75rem 0.85rem;
    background: #fff;
    border: 1px dashed #9ca3af;
    border-radius: 0.375rem;
    box-sizing: border-box;
  }

  .fs-ps__options salla-product-options {
    display: block;
    margin: 0;
    padding: 0;
  }

  .fs-ps__options .s-product-options-option:not(.s-product-options-option-booking) {
    display: block !important;
  }

  .fs-ps__options .s-product-options-label {
    margin-bottom: 0.75rem;
  }

  .fs-ps__options .s-form-control,
  .fs-ps__options .s-datetime-picker-input {
    border-radius: 0.375rem;
    border-color: #e5e7eb;
  }

  .fs-ps__options .s-product-options-multiple-options-wrapper {
    display: block !important;
  }

  .fs-ps__options .s-product-options-colors-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .fs-ps__options .s-product-options-colors-item {
    margin: 0;
    width: auto;
  }

  .fs-ps__nav {
    position: absolute;
    top: 42%;
    z-index: 20;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.35rem;
    height: 2.35rem;
    border: 1px solid #e5e7eb;
    border-radius: 999px;
    background: #fff;
    color: #1f2937;
    box-shadow: 5px 10px 30px rgba(43, 45, 52, 0.051);
    cursor: pointer;
    pointer-events: auto;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .fs-ps__nav--prev {
    inset-inline-start: 0;
  }

  .fs-ps__nav--next {
    inset-inline-end: 0;
  }

  .fs-ps__nav.swiper-button-disabled {
    opacity: 0.35;
    cursor: default;
  }

  .fs-ps__nav:not(.swiper-button-disabled):hover {
    border-color: var(--color-primary, #21636d);
    color: var(--color-primary, #21636d);
  }

  .fs-ps[data-hide-add='1'] .s-product-card-content-footer,
  .fs-ps[data-hide-add='1'] .s-add-product-button,
  .fs-ps[data-hide-add='1'] salla-add-product-button {
    display: none !important;
  }
`;

export class FsProductsSwiper extends LitElement {
  static styles = styles;

  @property({ type: String }) source = 'latest';
  @property({ type: String, attribute: 'source-value' }) sourceValue = '[]';
  @property({ type: Number }) limit = 8;
  /** Desktop default: 4 full cards + peek of the 5th */
  @property({ type: Number, attribute: 'slides-per-view' }) slidesPerView = 4.2;
  @property({ type: Boolean }) shadow = true;
  @property({ type: Boolean, attribute: 'hide-add' }) hideAdd = false;
  /** Merchant toggle: show product options (colors/sizes…) on each card — Raed/Saji pattern. */
  @property({ type: Boolean, attribute: 'show-options' }) showOptions = false;

  @state() private products: SallaProduct[] = [];
  @state() private optionsById = new Map<string, unknown[]>();
  @state() private loading = true;
  @state() private error = '';
  @state() private cardTag: 'custom-salla-product-card' | 'salla-product-card' =
    'salla-product-card';

  private swiper?: SwiperInstance;
  private swiperEl?: HTMLElement;
  private fetchToken = 0;
  private mountedKey = '';
  private updateTimers: number[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    this.cardTag = resolveCardTag();
    void this.loadProducts();
  }

  disconnectedCallback(): void {
    this.clearUpdateTimers();
    destroyFsSwiper(this.swiper);
    this.swiper = undefined;
    this.mountedKey = '';
    super.disconnectedCallback();
  }

  private clearUpdateTimers(): void {
    this.updateTimers.forEach((id) => window.clearTimeout(id));
    this.updateTimers = [];
  }

  protected updated(changed: Map<string, unknown>): void {
    if (
      changed.has('source') ||
      changed.has('sourceValue') ||
      changed.has('limit') ||
      changed.has('showOptions')
    ) {
      void this.loadProducts();
      return;
    }
    if (
      changed.has('products') ||
      changed.has('optionsById') ||
      changed.has('slidesPerView') ||
      changed.has('shadow') ||
      changed.has('hideAdd')
    ) {
      queueMicrotask(() => {
        this.mountSwiper();
        this.mountOptionsWidgets();
      });
    }
  }

  private async loadProducts(): Promise<void> {
    const token = ++this.fetchToken;
    this.loading = true;
    this.error = '';
    this.cardTag = resolveCardTag();
    try {
      let items = await fetchProducts(this.source, this.sourceValue, this.limit);
      // Demo/preview: SDK may boot a moment after first paint
      if (!items.length && !getSalla()?.product) {
        await new Promise((r) => setTimeout(r, 800));
        if (token !== this.fetchToken) return;
        items = await fetchProducts(this.source, this.sourceValue, this.limit);
      }
      if (token !== this.fetchToken) return;
      this.products = items;
      try {
        if (this.showOptions && items.length) {
          this.optionsById = await fetchOptionsMap(items);
        } else {
          this.optionsById = new Map();
        }
      } catch {
        this.optionsById = new Map();
      }
      if (!items.length) {
        const hasSdk = Boolean(getSalla()?.product);
        this.error = hasSdk
          ? t('لا توجد منتجات للعرض حالياً.', 'No products to show right now.')
          : t(
              'بانتظار تهيئة متجر سلة لعرض المنتجات…',
              'Waiting for Salla storefront to load products…'
            );
      }
    } catch (err) {
      console.warn('[fs-products-swiper] load failed', err);
      if (token !== this.fetchToken) return;
      this.products = [];
      this.optionsById = new Map();
      // Soft message — never a hard crash string for recoverable SDK issues
      this.error = t(
        'لا توجد منتجات للعرض حالياً.',
        'No products to show right now.'
      );
    } finally {
      if (token === this.fetchToken) this.loading = false;
    }
  }

  private bindRoot = (el?: Element) => {
    if (el instanceof HTMLElement) {
      this.swiperEl = el;
      ensureRaedProductStyles(el);
      this.mountSwiper();
      this.mountOptionsWidgets();
    }
  };

  private slidePrev = (e?: Event) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (!this.swiper || this.swiper.destroyed) return;
    this.swiper.slidePrev();
  };

  private slideNext = (e?: Event) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (!this.swiper || this.swiper.destroyed) return;
    this.swiper.slideNext();
  };

  private syncNavDisabled(): void {
    const prevEl = this.renderRoot.querySelector('.fs-ps__nav--prev');
    const nextEl = this.renderRoot.querySelector('.fs-ps__nav--next');
    const sw = this.swiper;
    if (!prevEl || !nextEl || !sw || sw.destroyed) return;
    prevEl.classList.toggle('swiper-button-disabled', sw.isBeginning);
    nextEl.classList.toggle('swiper-button-disabled', sw.isEnd);
    prevEl.setAttribute('aria-disabled', sw.isBeginning ? 'true' : 'false');
    nextEl.setAttribute('aria-disabled', sw.isEnd ? 'true' : 'false');
  }

  private mountSwiper(): void {
    if (!this.swiperEl || !this.products.length) return;

    const spv = this.showOptions
      ? Math.min(this.slidesPerView, 2.4)
      : this.slidesPerView;
    const key = `${this.products.length}:${spv}:${this.showOptions ? 1 : 0}:${this.shadow ? 1 : 0}`;

    // Reuse instance when only soft props change — remounting kills drag mid-gesture
    if (this.swiper && !this.swiper.destroyed && this.mountedKey === key) {
      this.swiper.update();
      this.syncNavDisabled();
      ensureRaedProductStyles(this.swiperEl);
      return;
    }

    this.clearUpdateTimers();
    destroyFsSwiper(this.swiper);
    this.swiper = undefined;

    // Click handlers own the arrows — do not also wire Swiper Navigation
    // (double listeners would skip two slides per click).
    this.swiper = mountFsSwiper(this.swiperEl, {
      slidesPerView: spv,
      spaceBetween: 16,
      speed: 420,
      threshold: 8,
      resistanceRatio: 0.65,
      allowTouchMove: true,
      simulateTouch: true,
      grabCursor: true,
      touchStartPreventDefault: false,
      preventClicks: false,
      preventClicksPropagation: false,
      slideToClickedSlide: false,
      breakpoints: {
        0: { slidesPerView: Math.min(1.15, spv) },
        640: { slidesPerView: Math.min(2.2, spv) },
        960: { slidesPerView: Math.min(3.2, spv) },
        1200: { slidesPerView: spv },
      },
      on: {
        init: () => this.syncNavDisabled(),
        slideChange: () => this.syncNavDisabled(),
        reachBeginning: () => this.syncNavDisabled(),
        reachEnd: () => this.syncNavDisabled(),
        fromEdge: () => this.syncNavDisabled(),
        resize: () => this.syncNavDisabled(),
      },
    });
    this.mountedKey = key;
    ensureRaedProductStyles(this.swiperEl);
    this.syncNavDisabled();

    const instance = this.swiper;
    const bump = () => {
      if (!instance || instance.destroyed) return;
      instance.updateSize();
      instance.updateSlides();
      instance.update();
      this.syncNavDisabled();
    };
    requestAnimationFrame(bump);
    this.updateTimers = [120, 400].map((ms) =>
      window.setTimeout(bump, ms)
    );
  }

  private mountOptionsWidgets(): void {
    if (!this.showOptions) return;
    const wraps = this.renderRoot.querySelectorAll<HTMLElement>('[data-fs-product-options]');
    wraps.forEach((wrap) => {
      if (wrap.querySelector('salla-product-options')) return;
      const id = wrap.getAttribute('data-product-id');
      if (!id) return;
      const options = this.optionsById.get(id);
      if (!options?.length) {
        wrap.hidden = true;
        return;
      }
      wrap.hidden = false;
      const el = document.createElement('salla-product-options') as HTMLElement & {
        options?: unknown;
        productId?: string | number;
        product?: unknown;
      };
      el.setAttribute('product-id', id);
      Object.assign(el, {
        options,
        productId: id,
      });
      wrap.appendChild(el);
    });
  }

  private renderCard(product: SallaProduct) {
    const common = {
      product,
      shadow: this.shadow,
      hideAdd: this.hideAdd,
    };
    if (this.cardTag === 'custom-salla-product-card') {
      return html`<custom-salla-product-card
        .product=${common.product}
        ?shadowOnHover=${common.shadow}
        ?hideAddBtn=${common.hideAdd}
      ></custom-salla-product-card>`;
    }
    return html`<salla-product-card
      .product=${common.product}
      ?shadow=${common.shadow}
      ?shadow-on-hover=${common.shadow}
      ?hide-add-btn=${common.hideAdd}
    ></salla-product-card>`;
  }

  protected render() {
    if (this.loading) {
      return html`<p class="fs-ps__status">${t('جاري تحميل المنتجات…', 'Loading products…')}</p>`;
    }
    if (!this.products.length) {
      return html`<p class="fs-ps__status">${this.error}</p>`;
    }

    return html`
      <div
        class=${classMap({
          'fs-ps': true,
          'fs-commerce__slider': true,
          'fs-commerce__slider--shadow': this.shadow,
        })}
        data-hide-add=${this.hideAdd ? '1' : '0'}
        data-show-options=${this.showOptions ? '1' : '0'}
      >
        <button
          type="button"
          class="fs-ps__nav fs-ps__nav--prev"
          aria-label=${t('السابق', 'Previous')}
          @click=${this.slidePrev}
        >‹</button>
        <button
          type="button"
          class="fs-ps__nav fs-ps__nav--next"
          aria-label=${t('التالي', 'Next')}
          @click=${this.slideNext}
        >›</button>
        <div class="swiper" ${ref(this.bindRoot)}>
          <div class="swiper-wrapper">
            ${this.products.map((product) => {
              const id = product.id != null ? String(product.id) : '';
              const opts = id ? this.optionsById.get(id) : undefined;
              const showOptsWrap =
                this.showOptions && id && (opts?.length || productMayHaveOptions(product));
              return html`
                <div class="swiper-slide">
                  <div class="fs-ps__item">
                    ${this.renderCard(product)}
                    ${showOptsWrap
                      ? html`<div
                          class="cart-options product-options fs-ps__options"
                          data-fs-product-options
                          data-product-id=${id}
                        ></div>`
                      : null}
                  </div>
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }
}

export function registerFsProductsSwiper(): void {
  if (typeof customElements === 'undefined') return;
  if (!customElements.get(TAG)) {
    customElements.define(TAG, FsProductsSwiper);
  }
}

registerFsProductsSwiper();
