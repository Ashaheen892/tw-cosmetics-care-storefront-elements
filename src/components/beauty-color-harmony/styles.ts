import { css } from 'lit';

export const componentStyles = css`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bch-wrap {
    display: grid;
    gap: 1.5rem;
    width: 100%;
    max-width: 1040px;
    margin-inline: auto;
  }

  .bch-controls {
    display: grid;
    gap: 1.15rem;
    padding: 1.15rem 1.2rem;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.06);
  }

  .bch-group {
    display: grid;
    gap: 0.65rem;
  }

  .bch-group__label {
    margin: 0;
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.01em;
    color: var(--muted-color, #8f7a86);
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
    min-height: 44px;
    padding: 0.4rem 0.85rem 0.4rem 0.4rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: 999px;
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.88rem;
    font-weight: 700;
    line-height: 1.2;
    cursor: pointer;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  }

  .bch-color:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #f2dde7));
  }

  .bch-color[aria-pressed='true'] {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 32%, transparent);
  }

  .bch-color__swatch {
    width: 1.75rem;
    height: 1.75rem;
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
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  @media (min-width: 640px) {
    .bch-types {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .bch-type {
    display: grid;
    gap: 0.2rem;
    min-height: 64px;
    padding: 0.7rem 0.9rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 16px) * 0.65);
    background: color-mix(in srgb, var(--section-bg, #fbf5f8) 55%, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    text-align: start;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }

  .bch-type__label {
    line-height: 1.3;
  }

  .bch-type__hint {
    font-size: 0.74rem;
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
    line-height: 1.35;
  }

  .bch-type[aria-pressed='true'] .bch-type__hint {
    color: rgba(255, 255, 255, 0.85);
  }

  .bch-type:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #f2dde7));
  }

  .bch-type[aria-pressed='true'] {
    background: var(--accent-color, var(--fs-store-primary));
    border-color: var(--accent-color, var(--fs-store-primary));
    color: #fff;
  }

  /* —— result area —— */
  .bch-result {
    display: grid;
    gap: 1.15rem;
  }

  @media (min-width: 900px) {
    .bch-result {
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
      align-items: start;
    }
  }

  .bch-preview,
  .bch-zones-wrap {
    display: grid;
    gap: 0.8rem;
    min-width: 0;
  }

  .bch-preview {
    padding: 1.2rem;
    border-radius: calc(var(--section-radius, 16px) * 0.9);
    background: linear-gradient(
      160deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff)),
      var(--card-bg, #fff)
    );
    border: 1px solid var(--border-color, #f2dde7);
    box-shadow: 0 12px 32px rgba(43, 33, 28, 0.08);
  }

  .bch-zones-wrap {
    padding: 1.2rem;
    border-radius: calc(var(--section-radius, 16px) * 0.9);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bch-preview__label {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--muted-color, #8f7a86);
  }

  .bch-strip {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 0.75rem;
  }

  .bch-swatch {
    display: grid;
    gap: 0.45rem;
    justify-items: center;
    text-align: center;
    min-width: 0;
  }

  .bch-swatch__chip {
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    border: 1px solid color-mix(in srgb, #000 8%, transparent);
    box-shadow: 0 8px 20px rgba(20, 14, 12, 0.16);
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

  .bch-zones {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) {
    .bch-zones {
      grid-template-columns: 1fr;
    }
  }

  .bch-zone {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem;
    background: color-mix(in srgb, var(--section-bg, #fbf5f8) 60%, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 16px) * 0.7);
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
    font-size: 0.92rem;
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
    font-size: 0.82rem;
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
