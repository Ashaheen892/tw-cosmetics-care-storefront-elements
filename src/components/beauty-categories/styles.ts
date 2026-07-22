import { css } from 'lit';

export const componentStyles = css`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  /* —— Grid layout —— */
  .bcat-wrap--grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
    justify-items: center;
    gap: 1.35rem 1rem;
    padding: 0.25rem 0.1rem;
  }

  /* —— Swiper slider —— */
  .bcat-swiper {
    position: relative;
    padding: 0.2rem 2.4rem 0.15rem;
    overflow: hidden;
  }

  .bcat-swiper .swiper-wrapper {
    align-items: flex-start;
  }

  .bcat-slide {
    width: 118px;
    height: auto;
    box-sizing: border-box;
  }

  .bcat-item {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.55rem;
    text-decoration: none;
    color: inherit;
    transition: transform 0.22s ease;
    -webkit-user-drag: none;
  }

  .bcat-item:hover,
  .bcat-item:focus-visible {
    transform: translateY(-3px);
    outline: none;
  }

  .bcat-disc {
    position: relative;
    width: 96px;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;
    background:
      radial-gradient(
        80% 80% at 30% 20%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, #fff),
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, #fff)
      );
    border: 3px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, #fff);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
      0 8px 20px rgba(120, 44, 82, 0.1);
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease;
  }

  .bcat-disc::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, #fff 40%, transparent);
    pointer-events: none;
  }

  .bcat-item:hover .bcat-disc,
  .bcat-item:focus-visible .bcat-disc {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      0 0 0 4px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent),
      0 12px 24px rgba(120, 44, 82, 0.14);
  }

  .bcat-disc__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }

  .bcat-item:hover .bcat-disc__img,
  .bcat-item:focus-visible .bcat-disc__img {
    transform: scale(1.06);
  }

  .bcat-disc__placeholder {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    font-size: 1.4rem;
    color: var(--accent-color, var(--fs-store-primary));
    opacity: 0.55;
  }

  .bcat-label {
    margin: 0;
    font-size: 0.82rem;
    font-weight: 700;
    text-align: center;
    color: var(--text-color, #000000);
    line-height: 1.3;
    max-width: 100%;
    padding-inline: 0.1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bcat-item:hover .bcat-label,
  .bcat-item:focus-visible .bcat-label {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bcat-nav {
    position: absolute;
    top: 3rem;
    z-index: 2;
    transform: translateY(-50%);
    width: 2.1rem;
    height: 2.1rem;
    min-width: 0;
    min-height: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: 999px;
    background: color-mix(in srgb, var(--card-bg, #fff) 94%, transparent);
    color: var(--text-color, #33232e);
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(120, 44, 82, 0.08);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, color 0.2s ease;
  }

  .bcat-nav:hover {
    background: var(--accent-color, var(--fs-store-primary));
    border-color: transparent;
    color: #fff;
    transform: translateY(calc(-50% - 1px));
  }

  .bcat-nav.swiper-button-disabled {
    opacity: 0.35;
    pointer-events: none;
  }

  .bcat-nav--prev {
    inset-inline-start: 0;
  }

  .bcat-nav--next {
    inset-inline-end: 0;
  }

  .bcat-nav__chev {
    display: block;
    width: 0.45rem;
    height: 0.45rem;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
  }

  .bcat-nav--prev .bcat-nav__chev {
    transform: rotate(135deg);
  }

  .bcat-nav--next .bcat-nav__chev {
    transform: rotate(-45deg);
  }

  .bcat-swiper[dir='rtl'] .bcat-nav--prev .bcat-nav__chev {
    transform: rotate(-45deg);
  }

  .bcat-swiper[dir='rtl'] .bcat-nav--next .bcat-nav__chev {
    transform: rotate(135deg);
  }

  .bcat-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.28rem;
    margin-top: 0.85rem;
    position: relative;
  }

  .bcat-dot {
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

  .bcat-dot.is-active {
    width: 0.85rem;
    background: var(--accent-color, var(--fs-store-primary));
  }

  @media (max-width: 639px) {
    .bcat-swiper {
      padding: 0.15rem 1.85rem 0.1rem;
    }

    .bcat-slide {
      width: 96px;
    }

    .bcat-item {
      gap: 0.4rem;
    }

    .bcat-disc {
      width: 76px;
      border-width: 2.5px;
    }

    .bcat-label {
      font-size: 0.72rem;
      line-height: 1.25;
    }

    .bcat-nav {
      top: 2.45rem;
      width: 1.75rem;
      height: 1.75rem;
    }

    .bcat-nav__chev {
      width: 0.38rem;
      height: 0.38rem;
      border-right-width: 1.5px;
      border-bottom-width: 1.5px;
    }

    .bcat-dots {
      gap: 0.22rem;
      margin-top: 0.7rem;
    }

    .bcat-dot {
      width: 0.26rem;
      height: 0.26rem;
    }

    .bcat-dot.is-active {
      width: 0.68rem;
    }

    .bcat-wrap--grid {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 1rem 0.65rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bcat-item,
    .bcat-disc,
    .bcat-disc__img,
    .bcat-nav,
    .bcat-dot {
      transition: none !important;
    }

    .bcat-item:hover,
    .bcat-item:focus-visible {
      transform: none;
    }

    .bcat-item:hover .bcat-disc__img,
    .bcat-item:focus-visible .bcat-disc__img {
      transform: none;
    }
  }
`;
