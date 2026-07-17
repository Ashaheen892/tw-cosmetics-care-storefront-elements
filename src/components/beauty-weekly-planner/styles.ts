import { css } from 'lit';

export const componentStyles = css`
  .bwp-toolbar {
    display: flex;
    justify-content: center;
    margin-bottom: 1.25rem;
  }

  .bwp-toggle {
    display: inline-flex;
    gap: 0.25rem;
    padding: 0.28rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 40%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #f2dde7);
    flex-wrap: wrap;
    justify-content: center;
  }

  .bwp-toggle__btn {
    min-height: 40px;
    padding: 0.45rem 1rem;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: var(--muted-color, #8f7a86);
    font: inherit;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bwp-toggle__btn:hover {
    color: var(--text-color, #33232e);
  }

  .bwp-toggle__btn[aria-pressed='true'] {
    background: var(--accent-color, #c2527f);
    color: #fff;
    box-shadow: 0 4px 12px rgba(43, 33, 28, 0.18);
  }

  /* Horizontal scroll wrapper for phones — no content cut off, no layout shift */
  .bwp-grid-scroll {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scrollbar-width: thin;
    padding-bottom: 0.35rem;
  }

  .bwp-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(120px, 1fr));
    gap: 0.6rem;
    min-width: 640px;
  }

  .bwp-day {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    background: var(--card-bg, #fff);
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(43, 33, 28, 0.05);
  }

  .bwp-day__head {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 0.55rem 0.5rem;
    text-align: center;
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
    background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
    border-bottom: 1px solid var(--border-color, #f2dde7);
  }

  .bwp-day__body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.55rem 0.5rem 0.65rem;
    flex: 1 1 auto;
  }

  .bwp-slot {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .bwp-slot__label {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--muted-color, #8f7a86);
    text-transform: uppercase;
  }

  .bwp-slot__label::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.55;
  }

  .bwp-chips {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .bwp-chip {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.34rem 0.5rem;
    border-radius: 0.55rem;
    background: color-mix(in srgb, var(--chip-color, var(--accent-color, #c2527f)) 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--chip-color, var(--accent-color, #c2527f)) 28%, transparent);
    font-size: 0.78rem;
    line-height: 1.3;
    color: var(--text-color, #33232e);
  }

  .bwp-chip__dot {
    flex: 0 0 auto;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background: var(--chip-color, var(--accent-color, #c2527f));
  }

  .bwp-chip__icon {
    flex: 0 0 auto;
    font-size: 0.9rem;
    line-height: 1;
  }

  .bwp-chip__name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
  }

  .bwp-slot--empty,
  .bwp-day__empty {
    font-size: 0.72rem;
    color: var(--muted-color, #8f7a86);
    opacity: 0.7;
    padding: 0.25rem 0;
    text-align: center;
  }

  /* Legend */
  .bwp-legend {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.6rem;
  }

  .bwp-legend__item {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.55rem 0.7rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    background: var(--card-bg, #fff);
  }

  .bwp-legend__swatch {
    flex: 0 0 auto;
    width: 1.05rem;
    height: 1.05rem;
    border-radius: 50%;
    background: var(--chip-color, var(--accent-color, #c2527f));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--chip-color, var(--accent-color, #c2527f)) 22%, transparent);
  }

  .bwp-legend__text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .bwp-legend__name {
    font-size: 0.86rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  .bwp-legend__freq {
    font-size: 0.76rem;
    color: var(--muted-color, #8f7a86);
  }

  .bwp-legend__slot {
    margin-inline-start: auto;
    flex: 0 0 auto;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--accent-color, #c2527f);
    background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
    padding: 0.12rem 0.5rem;
    border-radius: 999px;
  }

  .bwp-notice {
    margin-top: 1.35rem;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  @media (max-width: 639px) {
    .bwp-grid {
      grid-template-columns: repeat(7, minmax(112px, 1fr));
      min-width: 600px;
    }
    .bwp-legend {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bwp-toggle__btn {
      transition: none !important;
    }
  }
`;
