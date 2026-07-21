import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .bcr-scene {
    position: relative;
    border-radius: var(--section-radius, 18px);
    overflow: hidden;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--section-bg, #fbf5f8));
    border: 1px solid var(--border-color, #f2dde7);
    min-height: 260px;
  }

  /* Closed: full container width, mid-frame height */
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
    transition: transform 0.8s cubic-bezier(0.7, 0, 0.3, 1),
      opacity 0.8s ease, clip-path 0.8s ease;
    will-change: transform, opacity;
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
    z-index: 1;
    display: grid;
    gap: 0.65rem;
    justify-items: center;
    align-content: center;
    width: min(100%, 22rem);
    margin: 0 auto;
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
    min-height: 48px;
    padding: 0.65rem 1.75rem;
    background: var(--accent-color, var(--fs-store-primary));
    border-color: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-size: 0.95rem;
    font-weight: 800;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
  }

  .bcr-cover__btn:hover,
  .bcr-cover__btn:focus-visible {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 88%, #fff);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 88%, #fff);
    color: #fff;
  }

  /* Split covers for curtain / petals need two halves */
  .bcr-cover__half {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background: linear-gradient(160deg, #33232e, #4a382f);
    z-index: 4;
    transition: transform 0.85s cubic-bezier(0.7, 0, 0.3, 1);
  }
  .bcr-cover__half--start {
    inset-inline-start: 0;
  }
  .bcr-cover__half--end {
    inset-inline-end: 0;
  }

  /* —— Reveal states per mode —— */
  .bcr-scene.is-open .bcr-cover--box {
    transform: translateY(-102%);
  }
  .bcr-scene.is-open .bcr-cover--bag {
    transform: translateY(-102%);
    clip-path: polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%);
  }
  .bcr-scene.is-open .bcr-cover--drawers {
    transform: translateX(-102%);
  }
  [dir='rtl'] .bcr-scene.is-open .bcr-cover--drawers {
    transform: translateX(102%);
  }
  .bcr-scene.is-open .bcr-cover--carousel {
    transform: scale(1.15);
    opacity: 0;
  }
  .bcr-scene.is-open .bcr-cover__half--start {
    transform: translateX(-102%);
  }
  .bcr-scene.is-open .bcr-cover__half--end {
    transform: translateX(102%);
  }
  [dir='rtl'] .bcr-scene.is-open .bcr-cover__half--start {
    transform: translateX(102%);
  }
  [dir='rtl'] .bcr-scene.is-open .bcr-cover__half--end {
    transform: translateX(-102%);
  }
  .bcr-scene.is-open .bcr-cover--petals {
    opacity: 0;
    transform: scale(1.3);
  }

  /* —— Stage / content cards —— */
  .bcr-stage {
    position: relative;
    z-index: 1;
    padding: 1.1rem;
  }

  .bcr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 0.85rem;
  }

  .bcr-stage--carousel .bcr-grid {
    display: flex;
    gap: 0.85rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.5rem;
  }
  .bcr-stage--carousel .bcr-item {
    flex: 0 0 min(72%, 240px);
    scroll-snap-align: center;
  }

  .bcr-item {
    opacity: 0;
    transform: translateY(16px) scale(0.96);
  }

  .bcr-scene.is-open .bcr-item {
    animation: bcr-pop 0.5s ease forwards;
    animation-delay: var(--reveal-delay, 0ms);
  }

  .bcr-stage--drawers.is-open .bcr-item,
  .bcr-scene.is-open .bcr-stage--drawers .bcr-item {
    animation-name: bcr-drawer;
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
      transform: translateX(-24px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* —— Content card —— */
  .bcr-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 18px) - 6px);
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(43, 33, 28, 0.06);
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
    padding: 0.9rem;
    flex: 1;
  }

  .bcr-card__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
    line-height: 1.35;
  }

  .bcr-card__subtitle {
    margin: 0;
    font-size: 0.85rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.5;
  }

  .bcr-card__link {
    margin-top: auto;
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--accent-color, var(--fs-store-primary));
    color: var(--accent-color, var(--fs-store-primary));
    background: transparent;
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bcr-card__link:hover,
  .bcr-card__link:focus-visible {
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
  }

  .bcr-count {
    margin: 0.85rem 0 0;
    text-align: center;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
    letter-spacing: 0.01em;
  }

  .bcr-count::before {
    content: '✦';
    margin-inline-end: 0.35rem;
    color: var(--accent-color, var(--fs-store-primary));
    opacity: 0.75;
  }

  @media (prefers-reduced-motion: reduce) {
    .bcr-cover,
    .bcr-cover__half {
      transition: none;
    }
    .bcr-item {
      opacity: 1;
      transform: none;
      animation: none !important;
    }
  }
`;
