/**
 * Shared Swiper.js bootstrap for Twilight elements.
 * All content carousels / horizontal product-style sliders must use this helper.
 * (Before/after comparison range controls are NOT carousels — keep them custom.)
 */
import { unsafeCSS, type CSSResult } from 'lit';
import Swiper from 'swiper';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import swiperCore from 'swiper/css?inline';
import swiperNav from 'swiper/css/navigation?inline';
import swiperPag from 'swiper/css/pagination?inline';

export type FsSwiperOptions = SwiperOptions & {
  /** Force RTL; defaults to document/host direction. */
  rtl?: boolean;
};

/** Swiper CSS for Lit shadow roots (document-injected CSS does not pierce). */
export const fsSwiperCss: CSSResult = unsafeCSS(
  `${swiperCore}\n${swiperNav}\n${swiperPag}`
);

const DIR_ATTR = 'dir';
const DRAG_GUARD_FLAG = 'fsSwiperDragGuard';

function resolveRtl(el: HTMLElement, forced?: boolean): boolean {
  if (typeof forced === 'boolean') return forced;
  const hostDir =
    el.closest(`[${DIR_ATTR}]`)?.getAttribute(DIR_ATTR) ||
    document.documentElement.getAttribute(DIR_ATTR) ||
    document.body?.getAttribute(DIR_ATTR) ||
    '';
  return hostDir.toLowerCase() === 'rtl';
}

/**
 * Native HTML5 drag on images/links hijacks Swiper's mouse gesture.
 */
function suppressNativeDrag(el: HTMLElement): void {
  if (el.dataset[DRAG_GUARD_FLAG] === '1') return;
  el.dataset[DRAG_GUARD_FLAG] = '1';
  el.addEventListener(
    'dragstart',
    (event) => {
      event.preventDefault();
    },
    { capture: true }
  );
}

/** Create / replace a Swiper instance on a root that already has .swiper markup. */
export function mountFsSwiper(
  el: HTMLElement,
  options: FsSwiperOptions = {}
): Swiper {
  const { rtl: rtlOpt, modules: extraModules, ...rest } = options;
  const rtl = resolveRtl(el, rtlOpt);
  el.setAttribute(DIR_ATTR, rtl ? 'rtl' : 'ltr');
  suppressNativeDrag(el);

  const existing = (el as HTMLElement & { swiper?: Swiper }).swiper;
  if (existing && !existing.destroyed) {
    existing.destroy(true, true);
  }

  return new Swiper(el, {
    modules: [Navigation, Pagination, A11y, Autoplay, ...(extraModules || [])],
    slidesPerView: 'auto',
    spaceBetween: 16,
    speed: 420,
    watchOverflow: true,
    grabCursor: true,
    allowTouchMove: true,
    simulateTouch: true,
    threshold: 8,
    touchStartPreventDefault: false,
    preventClicks: false,
    preventClicksPropagation: false,
    observer: true,
    observeParents: true,
    a11y: { enabled: true },
    ...rest,
    ...(rtl ? { rtl: true } : {}),
  });
}

export function destroyFsSwiper(instance?: Swiper | null): void {
  if (instance && !instance.destroyed) {
    instance.destroy(true, true);
  }
}

export { Swiper, Autoplay, Navigation, Pagination, A11y };
