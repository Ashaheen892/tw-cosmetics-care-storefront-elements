import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .bsf-wrap {
    display: grid;
    gap: 1.4rem;
  }

  .bsf-steps {
    display: grid;
    gap: 1rem;
  }

  .bsf-step {
    display: grid;
    gap: 0.55rem;
  }

  .bsf-step__label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--text-color, #33232e);
  }

  .bsf-step__num {
    display: grid;
    place-items: center;
    width: 1.55rem;
    height: 1.55rem;
    border-radius: 50%;
    background: var(--accent-color, #c2527f);
    color: #fff;
    font-size: 0.8rem;
    font-weight: 800;
  }

  .bsf-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .bsf-chip {
    min-height: 42px;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 600;
    font-size: 0.86rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
      transform 0.15s ease;
  }

  .bsf-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 45%, var(--border-color, #f2dde7));
  }

  .bsf-chip[aria-pressed='true'] {
    background: var(--accent-color, #c2527f);
    border-color: var(--accent-color, #c2527f);
    color: #fff;
    transform: translateY(-1px);
  }

  .bsf-results {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 1.4rem;
    align-items: start;
    padding: 1.2rem;
    border-radius: var(--section-radius, 16px);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, #fbf5f8));
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bsf-results__title {
    grid-column: 1 / -1;
    margin: 0;
    font-size: 1.02rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
  }

  .bsf-swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
  }

  .bsf-swatch {
    position: relative;
    width: 4.1rem;
    display: grid;
    gap: 0.3rem;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    text-align: center;
  }

  .bsf-swatch__chip {
    width: 4.1rem;
    height: 4.1rem;
    border-radius: 999px;
    border: 3px solid transparent;
    box-shadow: 0 4px 14px rgba(43, 33, 28, 0.16), inset 0 -6px 12px rgba(0, 0, 0, 0.14);
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  .bsf-swatch--square .bsf-swatch__chip {
    border-radius: 10px;
  }

  .bsf-swatch--rounded .bsf-swatch__chip {
    border-radius: 18px;
  }

  .bsf-swatch:hover .bsf-swatch__chip {
    transform: scale(1.06);
  }

  .bsf-swatch[aria-pressed='true'] .bsf-swatch__chip {
    border-color: var(--accent-color, #c2527f);
    transform: scale(1.08);
  }

  .bsf-swatch__name {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bsf-detail {
    display: grid;
    gap: 0.7rem;
    padding: 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.9);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bsf-detail__media {
    position: relative;
    aspect-ratio: 4 / 3;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 40%, #fff);
  }

  .bsf-detail__swatch {
    position: absolute;
    inset-block-end: 0.6rem;
    inset-inline-end: 0.6rem;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    border: 3px solid #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  }

  .bsf-detail__name {
    margin: 0;
    font-size: 1.02rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
  }

  .bsf-detail__number {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
  }

  .bsf-detail__desc {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--muted-color, #8f7a86);
  }

  .bsf-detail__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.2rem;
  }

  @media (max-width: 720px) {
    .bsf-results {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bsf-chip,
    .bsf-swatch__chip {
      transition: none;
    }
  }
`;
