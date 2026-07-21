import { css } from 'lit';

export const componentStyles = css`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bcat-wrap {
    display: flex;
    justify-content: center;
    gap: 1.15rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
    padding: 0.35rem 0.25rem 0.85rem;
  }

  .bcat-wrap--grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    justify-items: center;
    gap: 1.35rem 1rem;
    overflow: visible;
    padding-bottom: 0.35rem;
  }

  .bcat-item {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 118px;
    scroll-snap-align: start;
    text-decoration: none;
    color: inherit;
    transition: transform 0.22s ease;
  }

  .bcat-item:hover,
  .bcat-item:focus-visible {
    transform: translateY(-4px);
    outline: none;
  }

  .bcat-disc {
    position: relative;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    overflow: hidden;
    background:
      radial-gradient(
        80% 80% at 30% 20%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, #fff),
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, #fff)
      );
    border: 3px solid color-mix(in srgb, var(--border-color, #f2dde7) 80%, #fff);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
      0 10px 24px rgba(120, 44, 82, 0.1);
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease,
      transform 0.25s ease;
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
      0 0 0 5px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent),
      0 14px 28px rgba(120, 44, 82, 0.14);
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
    font-size: 1.55rem;
    color: var(--accent-color, var(--fs-store-primary));
    opacity: 0.55;
  }

  .bcat-label {
    margin: 0;
    font-size: 0.86rem;
    font-weight: 800;
    text-align: center;
    color: var(--text-color, #33232e);
    line-height: 1.35;
    max-width: 110px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bcat-item:hover .bcat-label,
  .bcat-item:focus-visible .bcat-label {
    color: var(--accent-color, var(--fs-store-primary));
  }

  @media (max-width: 639px) {
    .bcat-wrap {
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem 0.65rem;
      overflow-x: visible;
      scroll-snap-type: none;
      padding: 0.25rem 0.1rem 0.35rem;
    }

    .bcat-item {
      width: 92px;
      gap: 0.55rem;
    }

    .bcat-disc {
      width: 78px;
      height: 78px;
      border-width: 2.5px;
    }

    .bcat-label {
      font-size: 0.78rem;
      max-width: 92px;
    }

    .bcat-wrap--grid {
      grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
      gap: 1rem 0.65rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bcat-item,
    .bcat-disc,
    .bcat-disc__img {
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
