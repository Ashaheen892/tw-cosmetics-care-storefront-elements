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
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 40%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #e5e7eb);
    flex-wrap: wrap;
    justify-content: center;
  }

  .bwp-toggle__btn {
    min-height: 40px;
    padding: 0.45rem 1rem;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: var(--muted-color, #666666);
    font: inherit;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bwp-toggle__btn:hover {
    color: var(--text-color, #000000);
  }

  .bwp-toggle__btn[aria-pressed='true'] {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    box-shadow: 0 4px 12px rgba(43, 33, 28, 0.18);
  }

  .bwp-grid-scroll {
    overflow: visible;
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--section-bg, transparent)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 3%, var(--card-bg, #fff))
    );
    border: 1px solid var(--border-color, #e5e7eb);
    padding: 0.75rem;
  }

  .bwp-grid {
    display: grid;
    gap: 0.65rem;
  }

  /* Mobile / tablet: readable vertical day cards */
  .bwp-grid {
    grid-template-columns: 1fr;
  }

  .bwp-grid--am .bwp-day__head,
  .bwp-grid--pm .bwp-day__head {
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, var(--card-bg, #fff)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff))
    );
  }

  .bwp-day {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 20px) * 0.65);
    background: var(--card-bg, #fff);
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(43, 33, 28, 0.06);
    min-height: 0;
  }

  .bwp-day.is-empty {
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 18%, var(--card-bg, #fff));
  }

  .bwp-day__head {
    padding: 0.75rem 0.9rem;
    text-align: start;
    font-size: 0.95rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, var(--card-bg, #fff));
    border-bottom: 1px solid var(--border-color, #e5e7eb);
    letter-spacing: 0.01em;
  }

  .bwp-day__body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.8rem 0.85rem 0.9rem;
    flex: 1 1 auto;
  }

  .bwp-slots {
    display: grid;
    gap: 0.75rem;
  }

  @media (min-width: 480px) {
    .bwp-slots--split {
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }
  }

  .bwp-slot {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    min-width: 0;
  }

  .bwp-slot__label {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bwp-slot__label::before {
    content: '';
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.7;
  }

  .bwp-chips {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .bwp-chip {
    display: flex;
    align-items: flex-start;
    gap: 0.45rem;
    padding: 0.55rem 0.65rem;
    border-radius: 0.7rem;
    background: color-mix(in srgb, var(--chip-color, var(--accent-color, var(--fs-store-primary))) 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--chip-color, var(--accent-color, var(--fs-store-primary))) 28%, transparent);
    font-size: 0.9rem;
    line-height: 1.45;
    color: var(--text-color, #000000);
  }

  .bwp-chip__dot {
    flex: 0 0 auto;
    width: 0.75rem;
    height: 0.75rem;
    margin-top: 0.28rem;
    border-radius: 50%;
    background: var(--chip-color, var(--accent-color, var(--fs-store-primary)));
  }

  .bwp-chip__icon {
    flex: 0 0 auto;
    margin-top: 0.1rem;
    font-size: 1rem;
    line-height: 1;
  }

  .bwp-chip__name {
    min-width: 0;
    flex: 1 1 auto;
    font-weight: 700;
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    word-break: break-word;
  }

  .bwp-slot--empty,
  .bwp-day__empty {
    display: grid;
    place-items: center;
    flex: 1;
    min-height: 3rem;
    font-size: 0.9rem;
    font-weight: 700;
    font-style: italic;
    color: color-mix(in srgb, var(--muted-color, #8f7a86) 75%, var(--accent-color, var(--fs-store-primary)));
    opacity: 0.9;
    padding: 0.65rem 0.4rem;
    text-align: center;
  }

  .bwp-day.is-empty .bwp-day__empty {
    background: radial-gradient(
      circle at 50% 40%,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, transparent),
      transparent 70%
    );
  }

  /* Legend */
  .bwp-legend {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.65rem;
  }

  .bwp-legend__item {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.7rem 0.8rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    background: var(--card-bg, #fff);
  }

  .bwp-legend__swatch {
    flex: 0 0 auto;
    width: 1.1rem;
    height: 1.1rem;
    margin-top: 0.15rem;
    border-radius: 50%;
    background: var(--chip-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--chip-color, var(--accent-color, var(--fs-store-primary))) 22%, transparent);
  }

  .bwp-legend__text {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
    flex: 1 1 auto;
  }

  .bwp-legend__name {
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--text-color, #000000);
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    flex-wrap: wrap;
    line-height: 1.4;
  }

  .bwp-legend__freq {
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
    line-height: 1.5;
    white-space: normal;
  }

  .bwp-legend__slot {
    margin-inline-start: auto;
    flex: 0 0 auto;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    white-space: nowrap;
  }

  .bwp-notice {
    margin-top: 1.35rem;
    text-align: center;
    font-size: 0.84rem;
    color: var(--muted-color, #666666);
    line-height: 1.65;
  }

  /* Desktop: classic 7-day week table */
  @media (min-width: 960px) {
    .bwp-grid-scroll {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-x: contain;
      scrollbar-width: thin;
    }

    .bwp-grid {
      grid-template-columns: repeat(7, minmax(0, 1fr));
      gap: 0.55rem;
      min-width: 0;
    }

    .bwp-day {
      min-height: 8rem;
    }

    .bwp-day__head {
      text-align: center;
      font-size: 0.84rem;
      padding: 0.6rem 0.4rem;
    }

    .bwp-day__body {
      padding: 0.55rem 0.45rem 0.65rem;
      gap: 0.5rem;
    }

    .bwp-slots--split {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .bwp-slot__label {
      font-size: 0.72rem;
    }

    .bwp-chip {
      font-size: 0.8rem;
      padding: 0.4rem 0.5rem;
      align-items: center;
    }

    .bwp-chip__dot {
      margin-top: 0;
    }

    .bwp-chip__name {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .bwp-legend {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bwp-toggle__btn {
      transition: none !important;
    }
  }
`;
