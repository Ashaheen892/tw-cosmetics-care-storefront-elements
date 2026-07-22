import { css } from 'lit';

export const componentStyles = css`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .brb-shell {
    position: relative;
    border-radius: var(--section-radius, 16px);
    overflow: hidden;
  }

  .brb-shell__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.16;
    z-index: 0;
  }

  .brb-inner {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 1.25rem;
    width: 100%;
    max-width: 760px;
    margin-inline: auto;
    padding: 1.15rem;
    box-sizing: border-box;
  }

  .brb-inner:has(.brb-results) {
    max-width: 880px;
  }

  .brb-progress {
    display: grid;
    gap: 0.45rem;
  }

  .brb-progress__bar {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, #fff);
    overflow: hidden;
  }

  .brb-progress__bar span {
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

  .brb-progress__text {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted-color, #666666);
  }

  .brb-question {
    display: grid;
    gap: 0.75rem;
    padding: 1.15rem 1.2rem;
    border-radius: var(--section-radius, 16px);
    background: color-mix(in srgb, var(--card-bg, #fff) 90%, var(--section-bg, transparent));
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 8px 24px rgba(194, 82, 127, 0.06);
  }

  .brb-question__title {
    margin: 0;
    font-size: 1.12rem;
    font-weight: 800;
    line-height: 1.35;
    color: var(--text-color, #000000);
  }

  .brb-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .brb-chip {
    min-height: 44px;
    padding: 0.55rem 1.05rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
      transform 0.15s ease;
  }

  .brb-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .brb-chip[aria-pressed='true'] {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    border-color: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    transform: translateY(-1px);
  }

  .brb-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
  }

  .brb-nav .fs-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .brb-results {
    display: grid;
    gap: 0.9rem;
  }

  .brb-routine__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .brb-routine__title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .brb-routine__count {
    font-weight: 600;
    color: var(--muted-color, #666666);
  }

  .brb-results__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .brb-timeline {
    display: grid;
    gap: 0.85rem;
  }

  .brb-step {
    position: relative;
    display: grid;
    grid-template-columns: auto 84px 1fr;
    gap: 0.9rem;
    align-items: center;
    padding: 0.75rem;
    border-radius: var(--card-radius, 14px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 6px 18px rgba(43, 33, 28, 0.05);
  }

  .brb-step__num {
    display: grid;
    place-items: center;
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-weight: 800;
    font-size: 0.95rem;
  }

  .brb-step__thumb {
    width: 84px;
    height: 84px;
    border-radius: calc(var(--card-radius, 14px) * 0.7);
    object-fit: cover;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 45%, #fff);
  }

  .brb-step__body {
    display: grid;
    gap: 0.28rem;
    min-width: 0;
  }

  .brb-step__name {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 700;
    color: var(--text-color, #000000);
  }

  .brb-step__desc {
    margin: 0;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
    line-height: 1.5;
  }

  .brb-step__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.2rem;
  }


  .brb-card--sharp {
    --card-radius: 4px;
  }

  .brb-card--pill {
    --card-radius: 26px;
  }

  @media (max-width: 640px) {
    .brb-step {
      grid-template-columns: auto 64px 1fr;
      gap: 0.6rem;
    }
    .brb-step__thumb {
      width: 64px;
      height: 64px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .brb-chip,
    .brb-progress__bar span {
      transition: none;
    }
  }
`;
