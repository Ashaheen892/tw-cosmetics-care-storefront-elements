/**
 * Shared Swiper.js bootstrap for Twilight elements.
 * All product / content sliders should go through this helper.
 */
import Swiper from 'swiper';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export type FsSwiperOptions = SwiperOptions & {
  /** Force RTL; defaults to document/host direction. */
  rtl?: boolean;
};

const DIR_ATTR = 'dir';

function resolveRtl(el: HTMLElement, forced?: boolean): boolean {
  if (typeof forced === 'boolean') return forced;
  const hostDir =
    el.closest(`[${DIR_ATTR}]`)?.getAttribute(DIR_ATTR) ||
    document.documentElement.getAttribute(DIR_ATTR) ||
    document.body?.getAttribute(DIR_ATTR) ||
    '';
  return hostDir.toLowerCase() === 'rtl';
}

/** Create / replace a Swiper instance on a root that already has .swiper markup. */
export function mountFsSwiper(
  el: HTMLElement,
  options: FsSwiperOptions = {}
): Swiper {
  const { rtl: rtlOpt, modules: extraModules, ...rest } = options;
  const rtl = resolveRtl(el, rtlOpt);
  el.setAttribute(DIR_ATTR, rtl ? 'rtl' : 'ltr');

  const existing = (el as HTMLElement & { swiper?: Swiper }).swiper;
  if (existing && !existing.destroyed) {
    existing.destroy(true, true);
  }

  return new Swiper(el, {
    modules: [Navigation, Pagination, A11y, ...(extraModules || [])],
    slidesPerView: 4.2,
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
    // Keep last so callers cannot accidentally drop RTL
    ...(rtl ? { rtl: true } : {}),
  });
}

export function destroyFsSwiper(instance?: Swiper | null): void {
  if (instance && !instance.destroyed) {
    instance.destroy(true, true);
  }
}

export { Swiper };
