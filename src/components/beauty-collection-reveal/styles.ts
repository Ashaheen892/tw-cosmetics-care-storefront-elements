import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .bcr-scene {
    position: relative;
    border-radius: var(--section-radius, 18px);
    overflow: hidden;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--section-bg, transparent));
    border: 1px solid var(--border-color, #e5e7eb);
    min-height: 260px;
  }

  .bcr-scene:not(.is-open) {
    width: 100%;
    aspect-ratio: 16 / 10;
    max-height: min(42vh, 380px);
  }

  .bcr-scene:not(.is-open) .bcr-stage {
    visibility: hidden;
    height: 0;
    padding: 0;
    overflow: hidden;
    pointer-events: none;
  }

  @media (max-width: 639px) {
    .bcr-scene:not(.is-open) {
      width: 100%;
      aspect-ratio: 1 / 1;
      max-height: min(50vw, 260px);
      min-height: 200px;
    }
  }

  /* —— Cover —— */
  .bcr-cover {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.25rem 1.5rem;
    background: linear-gradient(160deg, #33232e, #4a382f);
    color: #fff;
    transition:
      transform 0.85s cubic-bezier(0.7, 0, 0.3, 1),
      opacity 0.75s ease,
      clip-path 0.85s cubic-bezier(0.7, 0, 0.3, 1),
      filter 0.75s ease;
    will-change: transform, opacity, clip-path;
  }

  .bcr-scene.is-open .bcr-cover {
    pointer-events: none;
  }

  .bcr-cover__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.45;
  }

  .bcr-cover__scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(20, 14, 12, 0.35) 0%,
      rgba(20, 14, 12, 0.72) 55%,
      rgba(20, 14, 12, 0.88) 100%
    );
    pointer-events: none;
  }

  .bcr-cover__inner {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 0.65rem;
    justify-items: center;
    align-content: center;
    width: min(100%, 22rem);
    margin: 0 auto;
    transition: opacity 0.35s ease, transform 0.55s ease;
  }

  .bcr-scene.is-open .bcr-cover__inner {
    opacity: 0;
    transform: scale(0.92);
  }

  .bcr-cover__title {
    margin: 0;
    font-size: clamp(1.2rem, 3.2vw, 1.85rem);
    font-weight: 800;
    line-height: 1.25;
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45);
  }

  .bcr-cover__hint {
    margin: 0;
    font-size: 0.88rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.82);
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);
  }

  .bcr-cover__btn {
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.32);
  }

  .bcr-cover__btn:hover,
  .bcr-cover__btn:focus-visible {
    filter: brightness(1.06);
  }

  /* Split panels (curtain / petals) */
  .bcr-cover--split {
    background: transparent;
    padding: 0;
    overflow: hidden;
  }

  .bcr-cover__panel {
    position: absolute;
    inset-block: 0;
    width: 50%;
    overflow: hidden;
    background: linear-gradient(160deg, #33232e, #4a382f);
    transition: transform 0.9s cubic-bezier(0.7, 0, 0.3, 1);
    will-change: transform;
  }

  .bcr-cover__panel--start {
    inset-inline-start: 0;
  }

  .bcr-cover__panel--end {
    inset-inline-end: 0;
  }

  .bcr-cover__panel .bcr-cover__img {
    width: 200%;
    max-width: none;
  }

  .bcr-cover__panel--start .bcr-cover__img {
    inset-inline-start: 0;
  }

  .bcr-cover__panel--end .bcr-cover__img {
    inset-inline-end: 0;
    inset-inline-start: auto;
  }

  /* —— Mode: box (lid lifts up) —— */
  .bcr-scene.is-open .bcr-cover--box {
    transform: translateY(-110%);
  }

  /* —— Mode: bag (pouch opens upward with clip) —— */
  .bcr-cover--bag {
    clip-path: polygon(0 0, 100% 0, 100% 82%, 50% 100%, 0 82%);
  }

  .bcr-scene.is-open .bcr-cover--bag {
    transform: translateY(-110%);
    clip-path: polygon(0 0, 100% 0, 100% 0, 50% 0, 0 0);
  }

  /* —— Mode: drawers (slides aside) —— */
  .bcr-scene.is-open .bcr-cover--drawers {
    transform: translateX(-110%);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--drawers {
    transform: translateX(110%);
  }

  /* —— Mode: carousel (fade / zoom out) —— */
  .bcr-scene.is-open .bcr-cover--carousel {
    transform: scale(1.12);
    opacity: 0;
    filter: blur(4px);
  }

  /* —— Mode: curtain (panels part left/right) —— */
  .bcr-scene.is-open .bcr-cover--curtain .bcr-cover__panel--start {
    transform: translateX(-105%);
  }

  .bcr-scene.is-open .bcr-cover--curtain .bcr-cover__panel--end {
    transform: translateX(105%);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--curtain .bcr-cover__panel--start {
    transform: translateX(105%);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--curtain .bcr-cover__panel--end {
    transform: translateX(-105%);
  }

  /* —— Mode: petals (panels swing open) —— */
  .bcr-cover--petals .bcr-cover__panel--start {
    transform-origin: left center;
  }

  .bcr-cover--petals .bcr-cover__panel--end {
    transform-origin: right center;
  }

  .bcr-scene[dir='rtl'] .bcr-cover--petals .bcr-cover__panel--start {
    transform-origin: right center;
  }

  .bcr-scene[dir='rtl'] .bcr-cover--petals .bcr-cover__panel--end {
    transform-origin: left center;
  }

  .bcr-scene.is-open .bcr-cover--petals .bcr-cover__panel--start {
    transform: rotate(-78deg) scale(1.05);
  }

  .bcr-scene.is-open .bcr-cover--petals .bcr-cover__panel--end {
    transform: rotate(78deg) scale(1.05);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--petals .bcr-cover__panel--start {
    transform: rotate(78deg) scale(1.05);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--petals .bcr-cover__panel--end {
    transform: rotate(-78deg) scale(1.05);
  }

  .bcr-scene.is-open .bcr-cover--petals,
  .bcr-scene.is-open .bcr-cover--curtain {
    background: transparent;
  }

  /* —— Stage / Swiper cards —— */
  .bcr-stage {
    position: relative;
    z-index: 1;
    padding: 1rem 2.35rem 0.85rem;
  }

  .bcr-scene:not(.is-open) .bcr-stage {
    visibility: hidden;
    height: 0;
    padding: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .bcr-scene.is-open {
    min-height: 0;
    max-height: none;
    aspect-ratio: auto;
    overflow: hidden;
  }

  .bcr-swiper {
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  .bcr-slide {
    width: min(220px, 78vw);
    height: auto;
    box-sizing: border-box;
    opacity: 0;
    transform: translateY(14px) scale(0.96);
  }

  .bcr-scene.is-open .bcr-slide {
    animation: bcr-pop 0.5s ease forwards;
    animation-delay: var(--reveal-delay, 0ms);
  }

  .bcr-scene.is-open .bcr-stage--drawers .bcr-slide {
    animation-name: bcr-drawer;
  }

  .bcr-scene.is-open .bcr-stage--bag .bcr-slide {
    animation-name: bcr-rise;
  }

  .bcr-scene.is-open .bcr-stage--petals .bcr-slide {
    animation-name: bcr-bloom;
  }

  .bcr-scene.is-open .bcr-stage--curtain .bcr-slide {
    animation-name: bcr-fade-in;
  }

  @keyframes bcr-pop {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes bcr-drawer {
    from {
      opacity: 0;
      transform: translateX(-28px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes bcr-rise {
    from {
      opacity: 0;
      transform: translateY(28px) scale(0.94);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes bcr-bloom {
    from {
      opacity: 0;
      transform: scale(0.7) rotate(-6deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes bcr-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .bcr-nav {
    position: absolute;
    top: 42%;
    z-index: 4;
    transform: translateY(-50%);
    width: 2.1rem;
    height: 2.1rem;
    min-width: 0;
    min-height: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 999px;
    background: color-mix(in srgb, var(--card-bg, #fff) 94%, transparent);
    color: var(--text-color, #33232e);
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(120, 44, 82, 0.08);
  }

  .bcr-nav--prev {
    inset-inline-start: 0;
  }

  .bcr-nav--next {
    inset-inline-end: 0;
  }

  .bcr-nav.swiper-button-disabled {
    opacity: 0.35;
    pointer-events: none;
  }

  .bcr-nav__chev {
    display: block;
    width: 0.42rem;
    height: 0.42rem;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
  }

  .bcr-nav--prev .bcr-nav__chev {
    transform: rotate(135deg);
  }

  .bcr-nav--next .bcr-nav__chev {
    transform: rotate(-45deg);
  }

  .bcr-swiper[dir='rtl'] .bcr-nav--prev .bcr-nav__chev {
    transform: rotate(-45deg);
  }

  .bcr-swiper[dir='rtl'] .bcr-nav--next .bcr-nav__chev {
    transform: rotate(135deg);
  }

  .bcr-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.28rem;
    margin-top: 0.85rem;
  }

  .bcr-dot {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    min-width: 0;
    min-height: 0;
    padding: 0;
    margin: 0 !important;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 26%, transparent);
    cursor: pointer;
    opacity: 1;
    transition: width 0.2s ease, background 0.2s ease;
  }

  .bcr-dot.is-active {
    width: 0.85rem;
    background: var(--accent-color, var(--fs-store-primary));
  }

  /* —— Content card —— */
  .bcr-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 18px) - 6px);
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(43, 33, 28, 0.06);
    color: inherit;
    text-decoration: none;
    transition:
      transform 0.22s ease,
      box-shadow 0.22s ease,
      border-color 0.22s ease;
    -webkit-user-drag: none;
  }

  a.bcr-card--link {
    cursor: pointer;
  }

  a.bcr-card--link:hover,
  a.bcr-card--link:focus-visible {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
    box-shadow: 0 14px 28px rgba(120, 44, 82, 0.14);
    outline: none;
  }

  a.bcr-card--link:hover .bcr-card__link,
  a.bcr-card--link:focus-visible .bcr-card__link {
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
  }

  .bcr-card__media {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, #f2ece8);
  }

  .bcr-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .bcr-card__tag {
    position: absolute;
    inset-block-start: 0.6rem;
    inset-inline-start: 0.6rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1.4;
    color: #fff;
    background: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .bcr-card__tag--standalone {
    position: static;
    align-self: flex-start;
    margin: 0.9rem 0.9rem 0;
  }

  .bcr-card__body {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 0.85rem;
    flex: 1;
  }

  .bcr-card__title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-color, #000000);
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bcr-card__subtitle {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bcr-card__link {
    margin-top: auto;
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    border: 1px solid var(--accent-color, var(--fs-store-primary));
    color: var(--accent-color, var(--fs-store-primary));
    background: transparent;
    font-size: 0.78rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bcr-count {
    margin: 0.85rem 0 0;
    text-align: center;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
  }

  .bcr-count::before {
    content: '✦';
    margin-inline-end: 0.35rem;
    color: var(--accent-color, var(--fs-store-primary));
    opacity: 0.75;
  }

  .bcr-cta {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    animation: bcr-pop 0.5s ease both;
  }

  .bcr-cta .fs-btn {
    min-width: min(260px, 100%);
    justify-content: center;
  }

  @media (max-width: 639px) {
    .bcr-stage {
      padding: 0.85rem 1.85rem 0.7rem;
    }

    .bcr-slide {
      width: min(188px, 72vw);
    }

    .bcr-nav {
      width: 1.75rem;
      height: 1.75rem;
      top: 40%;
    }

    .bcr-dots {
      margin-top: 0.7rem;
      gap: 0.22rem;
    }

    .bcr-dot {
      width: 0.26rem;
      height: 0.26rem;
    }

    .bcr-dot.is-active {
      width: 0.68rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bcr-cover,
    .bcr-cover__panel,
    .bcr-cover__inner {
      transition: none;
    }

    .bcr-slide {
      opacity: 1;
      transform: none;
      animation: none !important;
    }
  }
`;
