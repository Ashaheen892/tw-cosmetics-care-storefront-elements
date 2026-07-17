import { css } from 'lit';

export const componentStyles = css`
  .bch-wrap {
    display: grid;
    gap: 1.5rem;
  }

  .bch-group {
    display: grid;
    gap: 0.65rem;
  }

  .bch-group__label {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.01em;
    color: var(--muted-color, #8f7a86);
    text-transform: uppercase;
  }

  /* —— base color chips —— */
  .bch-colors {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .bch-color {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.4rem 0.7rem 0.4rem 0.4rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: 999px;
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.85rem;
    font-weight: 700;
    line-height: 1.2;
    cursor: pointer;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  }

  .bch-color:hover {
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 40%, var(--border-color, #f2dde7));
  }

  .bch-color[aria-pressed='true'] {
    border-color: var(--accent-color, #c2527f);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-color, #c2527f) 32%, transparent);
  }

  .bch-color__swatch {
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
    flex: 0 0 auto;
    border: 2px solid #fff;
    box-shadow: 0 2px 6px rgba(20, 14, 12, 0.22);
    background: var(--swatch, #ccc);
  }

  .bch-color__name {
    white-space: nowrap;
  }

  /* —— harmony type chips —— */
  .bch-types {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .bch-type {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: 999px;
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }

  .bch-type:hover {
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 40%, var(--border-color, #f2dde7));
  }

  .bch-type[aria-pressed='true'] {
    background: var(--accent-color, #c2527f);
    border-color: var(--accent-color, #c2527f);
    color: #fff;
  }

  /* —— result area —— */
  .bch-result {
    display: grid;
    gap: 1.25rem;
  }

  .bch-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .bch-swatch {
    flex: 1 1 100px;
    min-width: 88px;
    display: grid;
    gap: 0.4rem;
    justify-items: center;
    text-align: center;
  }

  .bch-swatch__chip {
    width: 100%;
    aspect-ratio: 3 / 2;
    border-radius: calc(var(--section-radius, 16px) * 0.65);
    border: 1px solid color-mix(in srgb, #000 8%, transparent);
    box-shadow: 0 6px 16px rgba(20, 14, 12, 0.14);
    background: var(--swatch, #ccc);
  }

  .bch-swatch__hex {
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--muted-color, #8f7a86);
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
  }

  /* —— zone mapping cards —— */
  .bch-zones {
    display: grid;
    gap: 0.85rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) {
    .bch-zones {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .bch-zone {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.85rem;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 16px) * 0.75);
    box-shadow: 0 6px 18px rgba(43, 33, 28, 0.05);
  }

  .bch-zone__swatch {
    width: 2.75rem;
    height: 2.75rem;
    flex: 0 0 auto;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 3px 10px rgba(20, 14, 12, 0.2);
    background: var(--swatch, #ccc);
  }

  .bch-zone__body {
    display: grid;
    gap: 0.15rem;
    min-width: 0;
  }

  .bch-zone__label {
    font-size: 0.9rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bch-zone__hex {
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
  }

  .bch-notice {
    margin: 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  @media (prefers-reduced-motion: reduce) {
    .bch-color,
    .bch-type {
      transition: none !important;
    }
  }
`;
