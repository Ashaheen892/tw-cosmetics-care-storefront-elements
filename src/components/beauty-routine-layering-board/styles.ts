import { css } from 'lit';

export const componentStyles = css`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .brl-shell {
    width: 100%;
    max-width: 860px;
    margin-inline: auto;
    display: grid;
    gap: 1rem;
  }

  .brl-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    justify-content: center;
  }

  .brl-tab {
    min-height: 38px;
    padding: 0.4rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 700;
    font-size: 0.84rem;
    cursor: pointer;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      transform 0.15s ease;
  }

  .brl-tab:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #f2dde7));
  }

  .brl-tab.is-active {
    background: var(--accent-color, var(--fs-store-primary));
    border-color: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    transform: translateY(-1px);
  }

  .brl-select {
    display: none;
    width: 100%;
    padding: 0.7rem 0.85rem;
    border-radius: 14px;
    border: 1.5px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 600;
  }

  .brl-intro {
    display: grid;
    gap: 0.45rem;
    padding: 0.95rem 1.05rem;
    border-radius: var(--section-radius, 18px);
    background:
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff)),
        var(--card-bg, #fff)
      );
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, var(--border-color, #f2dde7));
    box-shadow: 0 8px 22px rgba(120, 44, 82, 0.05);
  }

  .brl-intro__title {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .brl-intro__text {
    margin: 0;
    font-size: 0.84rem;
    line-height: 1.55;
    color: var(--muted-color, #8f7a86);
  }

  .brl-intro__row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 0.15rem;
  }

  .brl-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    min-height: 30px;
    padding: 0.2rem 0.7rem;
    border-radius: 999px;
    font-size: 0.74rem;
    font-weight: 700;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, transparent);
  }

  .brl-progress {
    display: grid;
    gap: 0.35rem;
  }

  .brl-progress__bar {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 70%, #fff);
    overflow: hidden;
  }

  .brl-progress__bar span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 65%, #5a2f4d)
    );
    transition: width 0.3s ease;
  }

  .brl-progress__text {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
    text-align: center;
  }

  .brl-board {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    padding: 0.85rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--section-bg, #fbf5f8) 55%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 85%, #fff);
  }

  .brl-board--horizontal {
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.75rem;
    scroll-snap-type: x proximity;
    -webkit-overflow-scrolling: touch;
  }

  .brl-board--horizontal .brl-step {
    flex: 0 0 min(82%, 300px);
    scroll-snap-align: start;
  }

  .brl-step {
    position: relative;
    display: flex;
    gap: 0.75rem;
    align-items: stretch;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 90%, #fff);
    border-inline-start: 4px solid var(--step-color, var(--accent-color, var(--fs-store-primary)));
    border-radius: var(--brl-card-radius, 16px);
    padding: 0.8rem 0.9rem;
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, transparent),
      0 8px 20px rgba(120, 44, 82, 0.05);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .brl-step.is-dragging {
    opacity: 0.72;
    box-shadow: 0 18px 40px rgba(43, 33, 28, 0.18);
    transform: scale(1.015);
    z-index: 2;
  }

  .brl-step.is-over {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #f2dde7));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent),
      0 10px 24px rgba(120, 44, 82, 0.08);
  }

  .brl-step__index {
    flex: 0 0 auto;
    align-self: center;
    min-width: 1.7rem;
    height: 1.7rem;
    padding: 0 0.35rem;
    display: grid;
    place-items: center;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 800;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
  }

  .brl-step__marker {
    flex: 0 0 auto;
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    align-self: center;
    border-radius: 50%;
    background: var(--step-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-weight: 800;
    font-size: 0.95rem;
    box-shadow: 0 6px 14px color-mix(in srgb, var(--step-color, var(--accent-color, var(--fs-store-primary))) 28%, transparent);
  }

  .brl-step__thumb {
    flex: 0 0 auto;
    width: 3rem;
    height: 3rem;
    align-self: center;
    object-fit: cover;
    border-radius: 12px;
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 80%, transparent);
    background: color-mix(in srgb, var(--step-color, var(--accent-color, var(--fs-store-primary))) 12%, #fff);
  }

  .brl-step__marker .brl-icon {
    font-size: 1.05rem;
  }

  .brl-step__body {
    flex: 1 1 auto;
    min-width: 0;
    display: grid;
    gap: 0.25rem;
    align-content: center;
  }

  .brl-step__title {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
    line-height: 1.35;
  }

  .brl-badge {
    font-size: 0.66rem;
    font-weight: 700;
    padding: 0.12rem 0.5rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent);
  }

  .brl-step__short {
    margin: 0;
    color: var(--muted-color, #8f7a86);
    font-size: 0.84rem;
    line-height: 1.5;
  }

  .brl-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 0.7rem;
    margin-top: 0.2rem;
    font-size: 0.76rem;
    color: var(--muted-color, #8f7a86);
  }

  .brl-meta b {
    color: var(--text-color, #33232e);
    font-weight: 700;
  }

  .brl-step__long {
    margin: 0.45rem 0 0;
    padding-top: 0.55rem;
    border-top: 1px dashed var(--border-color, #f2dde7);
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text-color, #33232e);
  }

  .brl-step__note {
    margin: 0.35rem 0 0;
    padding: 0.45rem 0.6rem;
    border-radius: 10px;
    font-size: 0.8rem;
    line-height: 1.5;
    background: color-mix(in srgb, #e0a100 12%, var(--card-bg, #fff));
    color: color-mix(in srgb, #8a5a00 70%, var(--text-color, #33232e));
  }

  .brl-step__toggle {
    flex: 0 0 auto;
    align-self: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid var(--border-color, #f2dde7);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, #fbf5f8));
    color: var(--accent-color, var(--fs-store-primary));
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .brl-step__toggle:hover,
  .brl-step__toggle[aria-expanded='true'] {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #f2dde7));
  }

  .brl-handles {
    display: flex;
    flex-direction: column;
    gap: 0.28rem;
    align-self: center;
    flex: 0 0 auto;
  }

  .brl-handle {
    width: 32px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    cursor: pointer;
    font-size: 0.8rem;
    touch-action: none;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .brl-handle:hover:not(:disabled) {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #f2dde7));
    color: var(--accent-color, var(--fs-store-primary));
  }

  .brl-handle:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .brl-handle--drag {
    width: auto;
    min-width: 2.75rem;
    height: auto;
    min-height: 3rem;
    padding: 0.4rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    cursor: grab;
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #f2dde7));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
  }

  .brl-handle--drag:active {
    cursor: grabbing;
  }

  .brl-handle__grip {
    font-size: 1.05rem;
    line-height: 1;
    animation: brl-grip-nudge 2.4s ease-in-out infinite;
  }

  .brl-handle__label {
    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    line-height: 1;
  }

  @keyframes brl-grip-nudge {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  .brl-step__result {
    flex: 0 0 auto;
    align-self: center;
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 0.9rem;
    font-weight: 800;
  }

  .brl-step__result--ok {
    background: color-mix(in srgb, var(--success-color, #2f9e63) 18%, #fff);
    color: var(--success-color, #2f9e63);
  }

  .brl-step__result--bad {
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 16%, #fff);
    color: var(--error-color, #cf4b4b);
  }

  .brl-step.is-ok {
    border-inline-start-color: var(--success-color, #2f9e63);
    background: color-mix(in srgb, var(--success-color, #2f9e63) 6%, var(--card-bg, #fff));
  }

  .brl-step.is-bad {
    border-inline-start-color: var(--error-color, #cf4b4b);
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 5%, var(--card-bg, #fff));
  }

  .brl-board--layers .brl-step:nth-child(odd) {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 3.5%, var(--card-bg, #fff));
  }

  .brl-board--stairs .brl-step:nth-child(2) {
    margin-inline-start: 1.25rem;
  }
  .brl-board--stairs .brl-step:nth-child(3) {
    margin-inline-start: 2.5rem;
  }
  .brl-board--stairs .brl-step:nth-child(4) {
    margin-inline-start: 3.75rem;
  }
  .brl-board--stairs .brl-step:nth-child(5) {
    margin-inline-start: 5rem;
  }
  .brl-board--stairs .brl-step:nth-child(n + 6) {
    margin-inline-start: 6.25rem;
  }

  .brl-board--drops .brl-step__marker {
    border-radius: 50% 50% 50% 0;
    transform: rotate(45deg);
  }
  .brl-board--drops .brl-step__marker > * {
    transform: rotate(-45deg);
  }
  .brl-board--bottles .brl-step__marker {
    border-radius: 40% 40% 30% 30%;
    width: 2.1rem;
    height: 2.6rem;
  }

  .brl-board--path .brl-step::before,
  .brl-board--circles .brl-step::before {
    content: '';
    position: absolute;
    inset-inline-start: calc(0.9rem + 1.25rem - 1px);
    top: -0.7rem;
    height: 0.7rem;
    width: 2px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, var(--border-color, #f2dde7));
  }
  .brl-board--path .brl-step:first-child::before,
  .brl-board--circles .brl-step:first-child::before {
    display: none;
  }

  .brl-feedback {
    padding: 1rem 1.1rem;
    border-radius: 16px;
    text-align: center;
    font-weight: 700;
    border: 1.5px solid var(--border-color, #f2dde7);
    display: grid;
    gap: 0.35rem;
    justify-items: center;
  }

  .brl-feedback__icon {
    width: 2.2rem;
    height: 2.2rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 1.1rem;
    font-weight: 800;
  }

  .brl-feedback__msg {
    font-size: 0.95rem;
    line-height: 1.45;
  }

  .brl-feedback--win {
    background: color-mix(in srgb, var(--success-color, #2f9e63) 12%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--success-color, #2f9e63) 45%, var(--border-color, #f2dde7));
    color: var(--success-color, #2f9e63);
  }

  .brl-feedback--win .brl-feedback__icon {
    background: color-mix(in srgb, var(--success-color, #2f9e63) 20%, #fff);
  }

  .brl-feedback--retry {
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 10%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--error-color, #cf4b4b) 40%, var(--border-color, #f2dde7));
    color: var(--error-color, #cf4b4b);
  }

  .brl-feedback--retry .brl-feedback__icon {
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 18%, #fff);
  }

  .brl-feedback__score {
    display: block;
    font-size: 0.82rem;
    color: var(--muted-color, #8f7a86);
    font-weight: 600;
  }

  .brl-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    justify-content: center;
  }

  .brl-sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  @media (max-width: 639px) {
    .brl-tabs {
      display: none;
    }
    .brl-select {
      display: block;
    }
    .brl-board--horizontal {
      flex-direction: column;
    }
    .brl-board--horizontal .brl-step {
      flex-basis: auto;
    }
    .brl-board--stairs .brl-step {
      margin-inline-start: 0 !important;
    }
    .brl-board {
      padding: 0.65rem;
    }
    .brl-step {
      padding: 0.7rem 0.75rem;
      gap: 0.55rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .brl-step,
    .brl-tab,
    .brl-progress__bar span {
      transition: none !important;
    }
    .brl-handle__grip {
      animation: none;
    }
  }
`;
