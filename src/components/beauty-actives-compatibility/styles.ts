import { css } from 'lit';

export const componentStyles = css`
  .bac-picker {
    display: grid;
    gap: 0;
    margin-top: 1.5rem;
    padding: 1rem;
    border-radius: var(--section-radius, 16px);
    border: 1px solid var(--border-color, #e5e7eb);
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 18%, var(--card-bg, #fff));
  }

  .bac-slot {
    display: grid;
    gap: 0.55rem;
    padding: 0.65rem 0;
  }

  .bac-slot__label {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
  }

  .bac-divider {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.15rem 0;
  }

  .bac-divider__line {
    flex: 1;
    height: 1px;
    background: var(--border-color, #e5e7eb);
  }

  .bac-divider__icon {
    flex: 0 0 auto;
    width: 1.75rem;
    height: 1.75rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    color: var(--muted-color, #666666);
    font-size: 0.75rem;
    font-weight: 800;
  }

  .bac-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .bac-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 44px;
    padding: 0.5rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.86rem;
    font-weight: 600;
    line-height: 1.2;
    cursor: pointer;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  }

  .bac-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .bac-chip:active {
    transform: scale(0.97);
  }

  .bac-chip.is-selected {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, transparent);
  }

  .bac-chip__swatch {
    width: 0.95rem;
    height: 0.95rem;
    border-radius: 50%;
    flex: 0 0 auto;
    border: 1px solid color-mix(in srgb, #000 12%, transparent);
    background: var(--swatch, var(--accent-color, var(--fs-store-primary)));
  }

  /* —— Verdict card —— */
  .bac-verdict {
    padding: 1.35rem 1.25rem 1.4rem;
    border-radius: var(--section-radius, 16px);
    border: 2px solid color-mix(in srgb, var(--verdict-color, var(--accent-color, var(--fs-store-primary))) 35%, transparent);
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--verdict-color, var(--accent-color, var(--fs-store-primary))) 14%, var(--card-bg, #fff)) 0%,
      var(--card-bg, #fff) 55%
    );
    box-shadow: 0 12px 32px color-mix(in srgb, var(--verdict-color, #000) 12%, transparent);
    text-align: center;
  }

  .bac-verdict__title {
    margin: 0 0 0.35rem;
    font-size: 0.95rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    text-align: center;
  }

  .bac-verdict__hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 1rem;
  }

  .bac-verdict__icon {
    width: 3.5rem;
    height: 3.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--verdict-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1;
    box-shadow: 0 6px 20px color-mix(in srgb, var(--verdict-color, #000) 35%, transparent);
  }

  .bac-verdict__badge {
    display: inline-block;
    padding: 0.35rem 1rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--verdict-color, var(--accent-color, var(--fs-store-primary))) 18%, var(--card-bg, #fff));
    color: var(--verdict-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 0.92rem;
    font-weight: 800;
    letter-spacing: 0.01em;
  }

  .bac-verdict--unknown .bac-verdict__icon {
    background: color-mix(in srgb, var(--verdict-color, #6b7280) 85%, var(--card-bg, #fff));
    border: 2px dashed color-mix(in srgb, var(--verdict-color, #6b7280) 60%, transparent);
    color: var(--verdict-color, #6b7280);
    box-shadow: none;
  }

  .bac-pair {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.45rem 0.55rem;
    margin-bottom: 0.85rem;
  }

  .bac-pair__pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 35%, var(--card-bg, #fff));
    font-size: 0.84rem;
    font-weight: 700;
    color: var(--text-color, #000000);
  }

  .bac-pair__dot {
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    display: inline-block;
    border: 1px solid color-mix(in srgb, #000 12%, transparent);
    flex: 0 0 auto;
  }

  .bac-pair__vs {
    color: var(--muted-color, #666666);
    font-weight: 800;
    font-size: 0.9rem;
  }

  .bac-verdict__note {
    margin: 0;
    color: var(--text-color, #000000);
    font-size: 0.94rem;
    line-height: 1.65;
    text-align: start;
  }

  .bac-tip {
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
    margin-top: 0.9rem;
    padding: 0.7rem 0.85rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--verdict-color, var(--accent-color, var(--fs-store-primary))) 10%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--verdict-color, var(--accent-color, var(--fs-store-primary))) 22%, transparent);
    text-align: start;
  }

  .bac-tip__label {
    flex: 0 0 auto;
    font-weight: 800;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--verdict-color, var(--accent-color, var(--fs-store-primary)));
    padding-top: 0.15rem;
  }

  .bac-tip__text {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
    font-weight: 600;
  }

  .bac-timing {
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
    margin-top: 0.75rem;
    padding: 0.65rem 0.8rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, transparent);
    text-align: start;
  }

  .bac-timing__label {
    font-weight: 800;
    font-size: 0.82rem;
    color: var(--accent-color, var(--fs-store-primary));
    white-space: nowrap;
  }

  .bac-timing__text {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-color, #000000);
  }

  .bac-notice {
    margin-top: 1.25rem;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.6;
  }

  @media (max-width: 639px) {
    .bac-tip,
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
