/**
 * Theme Raed product-card styles for nested Salla web components.
 *
 * Lit `css` lives in our host Shadow DOM and cannot style nodes inside
 * `salla-products-slider` / `salla-products-list` shadow roots (where cards
 * actually render). Theme `app.css` also cannot pierce our host shadow.
 * This bridge injects Raed-like CSS into those nested roots.
 */

const STYLE_ATTR = 'data-tw-raed-product-styles';

/** CSS applied inside salla-products-slider / list shadow roots. */
export const RAED_PRODUCT_CARD_CSS = `
  .s-slider-block__title {
    display: none !important;
  }

  .swiper,
  .s-slider-container {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    padding: 0.35rem 0.2rem 1.1rem;
    box-sizing: border-box;
  }

  .swiper-wrapper {
    display: flex !important;
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
    align-items: stretch;
    transition-property: transform;
  }

  .swiper-slide,
  .s-products-slider-card {
    flex-shrink: 0;
    height: auto !important;
    /* Let Swiper set width via slidesPerView — forced widths break drag */
    box-sizing: border-box;
  }

  salla-product-card,
  custom-salla-product-card,
  .s-product-card-entry {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: start;
    color: #1f2937;
    background: #fff;
    border: 0;
    border-radius: 15px;
    box-shadow: none;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
    box-sizing: border-box;
  }

  .s-product-card-vertical {
    flex-direction: column;
  }

  :host(.tw-raed-shadow) .s-product-card-entry:hover,
  :host(.tw-raed-shadow) .s-product-card-shadow:hover,
  .s-product-card-shadow:hover {
    box-shadow: 5px 10px 30px rgba(43, 45, 52, 0.051);
  }

  :host(.tw-raed-hide-add) .s-product-card-content-footer,
  :host(.tw-raed-hide-add) .s-add-product-button,
  :host(.tw-raed-hide-add) salla-add-product-button {
    display: none !important;
  }

  .s-product-card-image {
    position: relative;
    display: block;
    flex: 1 1 0%;
    overflow: hidden;
    width: 100%;
    min-height: 11rem;
    max-height: 15rem;
    aspect-ratio: 1 / 1;
    background: #f3f4f6;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  /* Salla injects a sallaicons placeholder via ::before — hide it */
  .s-product-card-image::before,
  .s-product-card-image a::before,
  .s-product-card-image .salla-file-pond::before,
  .s-product-card-image [class*='placeholder']::before {
    content: none !important;
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
    font-size: 0 !important;
    background: none !important;
    pointer-events: none !important;
  }

  .s-product-card-image:hover {
    opacity: 1;
  }

  .s-product-card-image:hover img {
    transform: scale(1.03);
  }

  .s-product-card-image a {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }

  .s-product-card-image img,
  .s-product-card-image-cover,
  .s-product-card-image-contain {
    display: block;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .s-product-card-image-contain {
    object-fit: contain;
  }

  .s-product-card-wishlist-btn {
    position: absolute;
    top: 0.5rem;
    inset-inline-end: 0.5rem;
    z-index: 2;
    opacity: 0.75;
  }

  .s-product-card-wishlist-btn:hover {
    opacity: 1;
  }

  .s-product-card-wishlist-btn button,
  .s-product-card-wishlist-btn .s-button-element {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    width: 2.35rem;
    height: 2.35rem;
    margin: 0 !important;
    padding: 0 !important;
    border: 1px solid rgba(31, 41, 55, 0.08) !important;
    border-radius: 999px !important;
    background: rgba(255, 255, 255, 0.95) !important;
    box-shadow: 0 4px 14px rgba(43, 45, 52, 0.08);
    cursor: pointer;
    transition: transform 200ms ease, box-shadow 200ms ease;
  }

  .s-product-card-wishlist-btn button:hover,
  .s-product-card-wishlist-btn .s-button-element:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(43, 45, 52, 0.12);
  }

  .s-product-card-wishlist-btn svg {
    width: 1rem;
    height: 1rem;
    fill: #6b7280;
  }

  .s-product-card-wishlist-btn button:hover svg {
    fill: #4b5563;
  }

  .s-product-card-wishlist-added svg,
  .s-product-card-wishlist-added i {
    fill: #ef4444;
    color: #ef4444;
  }

  .s-product-card-promotion-title {
    position: absolute;
    top: 1rem;
    left: 0;
    z-index: 2;
    max-width: calc(100% - 60px);
    padding: 0.375rem 0.625rem;
    border-radius: 0 15px 15px 0;
    background: #991b1b;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  [dir='rtl'] .s-product-card-promotion-title,
  :host([dir='rtl']) .s-product-card-promotion-title {
    right: 0;
    left: auto;
    border-radius: 15px 0 0 15px;
  }

  .s-product-card-quantity {
    position: absolute;
    bottom: 0.25rem;
    left: 50%;
    z-index: 2;
    max-width: calc(100% - 60px);
    transform: translateX(-50%);
    padding: 0.375rem 0.625rem;
    border-radius: 15px;
    background: #f87171;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
  }

  .s-product-card-out-badge {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    z-index: 2;
    max-width: calc(100% - 60px);
    transform: translateX(-50%);
    padding: 0.375rem 0.625rem;
    border-radius: 0.375rem;
    background: #f3f4f6;
    color: #999;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
  }

  .s-product-card-out-of-stock img {
    filter: grayscale(100%);
  }

  .s-product-card-content {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 0.75rem;
    min-width: 0;
    box-sizing: border-box;
  }

  @media (min-width: 640px) {
    .s-product-card-content {
      padding: 1.25rem;
    }
  }

  .s-product-card-content-title {
    margin: 0 0 0.625rem;
    max-width: 100%;
    line-height: 1.5rem;
    word-break: break-word;
  }

  .s-product-card-content-title a {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #1f2937;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
    text-decoration: none;
  }

  .s-product-card-content-title a:hover {
    color: var(--color-primary, var(--accent-color, #21636d));
  }

  .s-product-card-content-subtitle {
    margin: 0 0 0.625rem;
    color: #4b5563;
    font-size: 0.875rem;
    line-height: 1.5rem;
  }

  .s-product-card-content-sub {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .s-product-card-content-footer {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 0.65rem;
    margin-top: auto;
  }

  .s-product-card-price {
    margin: 0;
    color: #1f2937;
    font-size: 0.9375rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .s-product-card-sale-price {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem;
  }

  .s-product-card-sale-price h4 {
    margin: 0;
    display: inline-block;
    color: #991b1b !important;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .s-product-card-sale-price span {
    color: #9ca3af;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-decoration: line-through;
  }

  .s-product-card-starting-price {
    display: flex;
    width: auto;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 0.625rem;
  }

  .s-product-card-starting-price h4 {
    margin: 0;
    display: inline-block;
    color: #991b1b;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .s-product-card-starting-price p {
    margin: 0;
    color: #6b7280;
    font-size: 0.75rem;
  }

  .s-product-card-rating {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: #9ca3af;
    font-size: 0.875rem;
  }

  .s-product-card-rating span svg {
    width: 1rem;
    height: 1rem;
    margin-bottom: 3px;
    fill: #fbbf24;
  }

  .s-add-product-button,
  .s-add-product-button-main,
  .s-product-card-content-footer salla-add-product-button {
    display: block;
    width: 100%;
    margin: 0;
  }

  .s-add-product-button .s-button-element,
  .s-add-product-button-main .s-button-element,
  .s-product-card-content-footer salla-add-product-button .s-button-element {
    display: block !important;
    width: 100% !important;
  }

  .s-add-product-button .s-button-btn,
  .s-add-product-button-main .s-button-btn,
  .s-product-card-content-footer .s-button-btn {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 100%;
    min-height: 2.55rem;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    border: 1px solid var(--color-primary, var(--accent-color, #21636d));
    background: var(--color-primary, var(--accent-color, #21636d));
    color: var(--color-primary-reverse, #fff);
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    white-space: nowrap;
    box-shadow: 0 8px 18px color-mix(in srgb, var(--color-primary, #21636d) 22%, transparent);
    transition: transform 180ms ease, opacity 180ms ease, box-shadow 180ms ease;
    cursor: pointer;
  }

  .s-add-product-button .s-button-btn:hover,
  .s-add-product-button-main .s-button-btn:hover,
  .s-product-card-content-footer .s-button-btn:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 10px 22px color-mix(in srgb, var(--color-primary, #21636d) 28%, transparent);
  }

  .s-add-product-button .s-button-text,
  .s-add-product-button-main .s-button-text,
  .s-product-card-content-footer .s-button-text {
    color: inherit !important;
    font-weight: inherit;
  }

  salla-add-product-button[product-status='out-and-notify'] .s-button-btn,
  salla-add-product-button[product-status='out'] .s-button-btn {
    background: #e5e7eb !important;
    border-color: #d1d5db !important;
    color: #374151 !important;
    box-shadow: none;
  }

  /* Theme Raed product.scss */
  .s-product-card-content-title {
    word-break: break-word;
  }

  .s-product-card-image img {
    opacity: 1;
  }

  .s-product-card-wishlist-added i {
    color: #ef4444;
  }

  .s-product-card-promotion-title {
    background: #991b1b !important;
    color: #fff !important;
  }

  .s-product-card-sale-price h4 {
    color: #991b1b !important;
  }

  .s-product-card-starting-price h4 {
    color: #991b1b !important;
  }

  .s-product-card-full-image salla-add-product-button {
    background: #fff;
    border-radius: 0.25rem;
  }

  .s-rating-stars-reviews {
    color: #6b7280;
  }

  .s-product-card-content-pie-svg-base {
    transition: stroke-dashoffset 1s linear;
    stroke: #e8edf2;
    stroke-width: 2px;
    stroke-linecap: round;
    fill: none;
  }

  .s-product-card-content-pie-svg-bar {
    fill: none;
    stroke: var(--color-primary, #21636d);
    stroke-dasharray: 100 100;
    stroke-dashoffset: 100;
  }

  .cart-options,
  .product-options {
    background: #fff;
    border: 1px dashed #9ca3af;
    border-radius: 0.375rem;
  }

  .cart-options salla-product-options,
  .product-options salla-product-options {
    display: block;
    margin-bottom: 0;
    padding-top: 0;
  }

  .s-product-options-colors-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .s-product-options-colors-item {
    margin: 0 !important;
    width: auto;
  }

  salla-add-product-button[product-status='out-and-notify'] .s-button-primary,
  .s-product-availability-wrap .s-button-primary {
    background: #e5e7eb !important;
    color: #1f2937 !important;
    border-color: #d1d5db !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .s-product-card-entry,
    .s-product-card-image img {
      transition: none;
    }
  }
`.trim();

const SLIDER_TAGS = new Set([
  'SALLA-PRODUCTS-SLIDER',
  'SALLA-PRODUCTS-LIST',
  'SALLA-PRODUCTS-GRID',
]);

function buildCss(_opts: { shadow: boolean; hideAdd: boolean }): string {
  return RAED_PRODUCT_CARD_CSS;
}

function injectStyle(
  root: ShadowRoot | Document | HTMLElement,
  opts: { shadow: boolean; hideAdd: boolean }
): void {
  const css = buildCss(opts);
  const parent: ParentNode =
    root instanceof ShadowRoot || root instanceof Document
      ? root
      : root;

  let style =
    parent instanceof ShadowRoot || parent instanceof Document
      ? parent.querySelector<HTMLStyleElement>(`style[${STYLE_ATTR}]`)
      : null;

  if (!style) {
    style = document.createElement('style');
    style.setAttribute(STYLE_ATTR, '1');
    if (parent instanceof ShadowRoot) {
      parent.appendChild(style);
    } else if (parent instanceof Document) {
      parent.head.appendChild(style);
    } else {
      parent.appendChild(style);
    }
  }
  if (style.textContent !== css) style.textContent = css;

  if (root instanceof ShadowRoot) {
    root.host.classList.toggle('tw-raed-shadow', opts.shadow);
    root.host.classList.toggle('tw-raed-hide-add', opts.hideAdd);
  }
}

function readOptsFromWrapper(wrapper: HTMLElement | null): {
  shadow: boolean;
  hideAdd: boolean;
} {
  if (!wrapper) return { shadow: true, hideAdd: false };
  return {
    shadow: wrapper.classList.contains('fs-commerce__slider--shadow'),
    hideAdd: wrapper.getAttribute('data-hide-add') === '1',
  };
}

const CARD_TAGS = new Set([
  'SALLA-PRODUCT-CARD',
  'CUSTOM-SALLA-PRODUCT-CARD',
]);

function enhanceTree(el: HTMLElement, opts: { shadow: boolean; hideAdd: boolean }): void {
  const apply = () => {
    if (el.shadowRoot) {
      injectStyle(el.shadowRoot, opts);
      // Cards may use their own shadow roots — pierce one level deeper
      el.shadowRoot.querySelectorAll('*').forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (CARD_TAGS.has(node.tagName) && node.shadowRoot) {
          injectStyle(node.shadowRoot, opts);
        }
      });
    }
  };
  apply();
  // Stencil / Twilight hydrate asynchronously
  [0, 50, 150, 400, 1000, 2000].forEach((ms) => window.setTimeout(apply, ms));

  if (el.shadowRoot && !(el as HTMLElement & { __twRaedObserved?: boolean }).__twRaedObserved) {
    (el as HTMLElement & { __twRaedObserved?: boolean }).__twRaedObserved = true;
    const mo = new MutationObserver(() => apply());
    mo.observe(el.shadowRoot, { childList: true, subtree: true });
  }
}

function walk(node: Node, opts: { shadow: boolean; hideAdd: boolean }): void {
  if (!(node instanceof HTMLElement) && !(node instanceof ShadowRoot)) return;

  if (node instanceof HTMLElement) {
    if (SLIDER_TAGS.has(node.tagName)) {
      enhanceTree(node, opts);
    }
    if (node.shadowRoot) walk(node.shadowRoot, opts);
    node.querySelectorAll?.('*').forEach((child) => {
      if (child instanceof HTMLElement && SLIDER_TAGS.has(child.tagName)) {
        enhanceTree(child, opts);
      }
      if (child instanceof HTMLElement && child.shadowRoot) {
        walk(child.shadowRoot, opts);
      }
    });
  } else {
    node.querySelectorAll('*').forEach((child) => {
      if (child instanceof HTMLElement && SLIDER_TAGS.has(child.tagName)) {
        enhanceTree(child, opts);
      }
      if (child instanceof HTMLElement && child.shadowRoot) {
        walk(child.shadowRoot, opts);
      }
    });
  }
}

/**
 * Inject Theme Raed product styles into:
 * - our host shadow (`fs-products-swiper`)
 * - nested Salla product slider / card shadows
 */
export function ensureRaedProductStyles(from: Element | null | undefined): void {
  if (!from || typeof document === 'undefined') return;
  const wrapper =
    from instanceof HTMLElement && from.classList.contains('fs-commerce__slider')
      ? from
      : from instanceof HTMLElement
        ? from.closest('.fs-commerce__slider')
        : null;
  const opts = readOptsFromWrapper(
    wrapper instanceof HTMLElement ? wrapper : from instanceof HTMLElement ? from : null
  );

  const root = (from.getRootNode?.() ?? null) as Document | ShadowRoot | null;
  if (root instanceof ShadowRoot) {
    injectStyle(root, opts);
    walk(root, opts);
  }

  walk(from, opts);

  // Pierce product-card shadows under the mount point
  if (from instanceof HTMLElement) {
    from.querySelectorAll?.('salla-product-card, custom-salla-product-card').forEach((card) => {
      if (card instanceof HTMLElement && card.shadowRoot) {
        injectStyle(card.shadowRoot, opts);
      }
    });
  }
}
