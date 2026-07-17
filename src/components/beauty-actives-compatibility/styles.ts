import { css } from 'lit';

export const componentStyles = css`
  .bac-picker {
    display: grid;
    gap: 1.25rem;
  }

  .bac-row {
    display: grid;
    gap: 0.6rem;
  }

  .bac-row__label {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bac-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .bac-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 44px;
    padding: 0.5rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.86rem;
    font-weight: 600;
    line-height: 1.2;
    cursor: pointer;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  }

  .bac-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 45%, var(--border-color, #f2dde7));
  }

  .bac-chip:active {
    transform: scale(0.97);
  }

  .bac-chip.is-selected {
    border-color: var(--accent-color, #c2527f);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color, #c2527f) 30%, transparent);
  }

  .bac-chip__swatch {
    width: 0.95rem;
    height: 0.95rem;
    border-radius: 50%;
    flex: 0 0 auto;
    border: 1px solid color-mix(in srgb, #000 12%, transparent);
    background: var(--swatch, var(--accent-color, #c2527f));
  }

  .bac-result {
    margin-top: 1.5rem;
    padding: 1.15rem 1.15rem 1.25rem;
    border-inline-start: 5px solid var(--verdict-color, var(--accent-color, #c2527f));
  }

  .bac-result__head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 0.75rem;
  }

  .bac-result__title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bac-pair {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
    color: var(--muted-color, #8f7a86);
    font-size: 0.86rem;
    font-weight: 700;
  }

  .bac-pair__dot {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    display: inline-block;
    border: 1px solid color-mix(in srgb, #000 12%, transparent);
  }

  .bac-pair__sep {
    color: var(--muted-color, #8f7a86);
  }

  .bac-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    background: var(--verdict-color, var(--accent-color, #c2527f));
    color: #fff;
    font-size: 0.82rem;
    font-weight: 800;
    line-height: 1.2;
  }

  .bac-badge__icon {
    font-size: 0.9rem;
    line-height: 1;
  }

  .bac-note {
    margin: 0;
    color: var(--text-color, #33232e);
    font-size: 0.94rem;
    line-height: 1.7;
  }

  .bac-timing {
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
    margin-top: 0.85rem;
    padding: 0.65rem 0.8rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 8%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, #c2527f) 22%, transparent);
  }

  .bac-timing__label {
    font-weight: 800;
    font-size: 0.82rem;
    color: var(--accent-color, #c2527f);
    white-space: nowrap;
  }

  .bac-timing__text {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-color, #33232e);
  }

  .bac-notice {
    margin-top: 1.25rem;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  @media (max-width: 639px) {
    .bac-result__head {
      gap: 0.5rem;
    }
    .bac-timing {
      flex-direction: column;
      gap: 0.3rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bac-chip {
      transition: none !important;
    }
  }
`;
