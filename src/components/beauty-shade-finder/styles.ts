import { css } from 'lit';

export const componentStyles = css`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bsf-wrap {
    display: grid;
    gap: 1.25rem;
    width: 100%;
    max-width: 760px;
    margin-inline: auto;
  }

  .bsf-wrap:has(.bsf-results) {
    max-width: 960px;
  }

  .bsf-progress {
    display: grid;
    gap: 0.45rem;
  }

  .bsf-progress__bar {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 70%, #fff);
    overflow: hidden;
  }

  .bsf-progress__bar span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--accent-color, #c2527f),
      color-mix(in srgb, var(--accent-color, #c2527f) 70%, #7b2c52)
    );
    transition: width 0.25s ease;
  }

  .bsf-progress__text {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
  }

  .bsf-question {
    display: grid;
    gap: 0.75rem;
    padding: 1.15rem 1.2rem;
    border-radius: var(--section-radius, 16px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    box-shadow: 0 8px 24px rgba(194, 82, 127, 0.06);
  }

  .bsf-question__title {
    margin: 0;
    font-size: 1.12rem;
    font-weight: 800;
    line-height: 1.35;
    color: var(--text-color, #33232e);
  }

  .bsf-question__hint {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--muted-color, #8f7a86);
    padding: 0.65rem 0.8rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 8%, #fff);
    border-inline-start: 3px solid var(--accent-color, #c2527f);
  }

  .bsf-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .bsf-chip {
    min-height: 44px;
    padding: 0.55rem 1.05rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 600;
    font-size: 0.9rem;
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

  .bsf-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
  }

  .bsf-nav .fs-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .bsf-results {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 1.25rem;
    align-items: start;
    padding: 1.15rem;
    border-radius: var(--section-radius, 16px);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, #fbf5f8));
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bsf-results__title {
    grid-column: 1 / -1;
    margin: 0;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bsf-results__count {
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
  }

  .bsf-results__actions {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
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
    gap: 0.65rem;
    padding: 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.9);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bsf-detail__media {
    aspect-ratio: 4 / 3;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    box-shadow: inset 0 -40px 50px rgba(0, 0, 0, 0.12);
  }

  .bsf-detail__name {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bsf-detail__number {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
  }

  .bsf-detail__desc {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--muted-color, #8f7a86);
  }

  .bsf-detail__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bsf-detail__chip {
    opacity: 0.55;
  }

  .bsf-detail__chip--on {
    opacity: 1;
  }

  .bsf-detail__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.15rem;
  }

  @media (max-width: 720px) {
    .bsf-results {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bsf-chip,
    .bsf-swatch__chip,
    .bsf-progress__bar span {
      transition: none;
    }
  }
`;
