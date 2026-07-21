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
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #7b2c52)
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
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, #fff);
    border-inline-start: 3px solid var(--accent-color, var(--fs-store-primary));
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
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #f2dde7));
  }

  .bsf-chip[aria-pressed='true'] {
    background: var(--accent-color, var(--fs-store-primary));
    border-color: var(--accent-color, var(--fs-store-primary));
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
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.95fr);
    gap: 1.25rem;
    align-items: start;
    padding: 1.25rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, #fbf5f8));
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 90%, #fff);
    box-shadow: 0 12px 30px rgba(120, 44, 82, 0.05);
  }

  .bsf-results__head {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .bsf-results__title {
    margin: 0;
    font-size: 1.08rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bsf-results__count {
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.65rem;
    display: inline-grid;
    place-items: center;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 800;
    color: #fff;
    background: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
  }

  .bsf-results__actions {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .bsf-swatches {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(4.6rem, 1fr));
    gap: 0.75rem 0.55rem;
    padding: 0.85rem;
    border-radius: 16px;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 85%, #fff);
    max-height: min(420px, 55vh);
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .bsf-swatch {
    position: relative;
    display: grid;
    gap: 0.4rem;
    justify-items: center;
    padding: 0.35rem 0.2rem;
    border: none;
    background: none;
    cursor: pointer;
    text-align: center;
    font: inherit;
  }

  .bsf-swatch__ring {
    width: 3.6rem;
    height: 3.6rem;
    padding: 3px;
    border-radius: 999px;
    box-sizing: border-box;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 70%, #fff);
    transition:
      background 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  .bsf-swatch__chip {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      inset 0 -8px 14px rgba(0, 0, 0, 0.16),
      0 4px 10px rgba(43, 33, 28, 0.12);
  }

  .bsf-swatch--square .bsf-swatch__ring,
  .bsf-swatch--square .bsf-swatch__chip {
    border-radius: 12px;
  }

  .bsf-swatch--rounded .bsf-swatch__ring,
  .bsf-swatch--rounded .bsf-swatch__chip {
    border-radius: 18px;
  }

  .bsf-swatch:hover .bsf-swatch__ring {
    transform: translateY(-2px) scale(1.04);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #f2dde7));
  }

  .bsf-swatch.is-active .bsf-swatch__ring,
  .bsf-swatch[aria-pressed='true'] .bsf-swatch__ring {
    background: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      0 0 0 4px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent),
      0 8px 18px rgba(120, 44, 82, 0.16);
    transform: scale(1.06);
  }

  .bsf-swatch__name {
    width: 100%;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bsf-swatch.is-active .bsf-swatch__name,
  .bsf-swatch[aria-pressed='true'] .bsf-swatch__name {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bsf-detail {
    display: grid;
    gap: 0.75rem;
    padding: 1rem 1.05rem 1.1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 90%, #fff);
    box-shadow: 0 10px 26px rgba(120, 44, 82, 0.06);
  }

  .bsf-detail__media {
    aspect-ratio: 16 / 10;
    border-radius: 14px;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.28),
      inset 0 -36px 48px rgba(0, 0, 0, 0.14),
      0 8px 20px rgba(43, 33, 28, 0.1);
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 55%, transparent);
  }

  .bsf-detail__name {
    margin: 0;
    font-size: 1.08rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bsf-detail__number {
    font-size: 0.84rem;
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
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
    opacity: 0.5;
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

    .bsf-swatches {
      grid-template-columns: repeat(auto-fill, minmax(4.2rem, 1fr));
      max-height: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bsf-chip,
    .bsf-swatch__ring,
    .bsf-progress__bar span {
      transition: none;
    }
  }
`;
