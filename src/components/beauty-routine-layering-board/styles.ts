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

  .brl-switcher {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 860px;
    margin: 0 auto 1.15rem;
    display: grid;
    gap: 0.65rem;
    justify-items: center;
  }

  .brl-tabs {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    justify-content: center;
    align-items: center;
    padding: 0.3rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 88%, #fff);
    box-sizing: border-box;
  }

  .brl-tab {
    position: relative;
    z-index: 1;
    min-height: 2.25rem;
    min-width: 0;
    margin: 0;
    padding: 0.45rem 1.05rem;
    border-radius: 999px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 700;
    font-size: 0.84rem;
    line-height: 1.2;
    cursor: pointer;
    white-space: nowrap;
    box-sizing: border-box;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .brl-tab:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
  }

  .brl-tab.is-active {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    border-color: transparent;
    color: #fff;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
  }

  .brl-select-wrap {
    display: none;
    width: 100%;
  }

  .brl-select {
    display: block;
    width: 100%;
    padding: 0.7rem 0.85rem;
    border-radius: 14px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 600;
    box-sizing: border-box;
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
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, var(--border-color, #e5e7eb));
    box-shadow: 0 8px 22px rgba(120, 44, 82, 0.05);
  }

  .brl-intro__title {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .brl-intro__text {
    margin: 0;
    font-size: 0.84rem;
    line-height: 1.55;
    color: var(--muted-color, #666666);
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
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, #fff);
    overflow: hidden;
  }

  .brl-progress__bar span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--accent-color, var(--fs-store-primary));
    transition: width 0.3s ease;
  }

  .brl-progress__text {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
    text-align: center;
  }

  .brl-board {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    padding: 0.85rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--section-bg, transparent) 55%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 85%, #fff);
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
    display: grid;
    grid-template-columns: auto auto minmax(0, 1fr) auto;
    gap: 0.65rem 0.75rem;
    align-items: center;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    border-inline-start: 4px solid var(--step-color, var(--accent-color, var(--fs-store-primary)));
    border-radius: var(--brl-card-radius, 16px);
    padding: 0.85rem 0.95rem;
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, transparent),
      0 8px 20px rgba(120, 44, 82, 0.05);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .brl-step--quiz {
    grid-template-columns: auto auto auto minmax(0, 1fr) auto;
  }

  .brl-step--quiz:not(.has-result) {
    grid-template-columns: auto auto auto minmax(0, 1fr);
  }

  .brl-step--quiz.is-revealed {
    grid-template-columns: auto auto minmax(0, 1fr) auto;
  }

  .brl-step--quiz.is-revealed:not(.has-result) {
    grid-template-columns: auto auto minmax(0, 1fr);
  }

  .brl-step--guide:not(.has-toggle) {
    grid-template-columns: auto auto minmax(0, 1fr);
  }

  .brl-step.is-dragging {
    opacity: 0.72;
    box-shadow: 0 18px 40px rgba(43, 33, 28, 0.18);
    transform: scale(1.015);
    z-index: 2;
  }

  .brl-step.is-over {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
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
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
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
    color: var(--text-color, #000000);
    line-height: 1.35;
  }

  .brl-step__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-top: 0.15rem;
  }

  .brl-badge {
    font-size: 0.66rem;
    font-weight: 700;
    padding: 0.12rem 0.5rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent);
    line-height: 1.2;
  }

  .brl-step__short {
    margin: 0;
    color: var(--muted-color, #666666);
    font-size: 0.84rem;
    line-height: 1.5;
  }

  .brl-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 0.7rem;
    margin-top: 0.2rem;
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
  }

  .brl-meta b {
    color: var(--text-color, #000000);
    font-weight: 700;
  }

  .brl-step__long {
    margin: 0.45rem 0 0;
    padding-top: 0.55rem;
    border-top: 1px dashed var(--border-color, #e5e7eb);
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text-color, #000000);
  }

  .brl-step__note {
    margin: 0.35rem 0 0;
    padding: 0.45rem 0.6rem;
    border-radius: 10px;
    font-size: 0.8rem;
    line-height: 1.5;
    background: color-mix(in srgb, #e0a100 12%, var(--card-bg, #fff));
    color: color-mix(in srgb, var(--fs-caution, #e0a100) 45%, var(--text-color, #000000));
  }

  .brl-step__toggle {
    flex: 0 0 auto;
    align-self: center;
    justify-self: end;
    width: 2rem;
    height: 2rem;
    min-width: 2rem;
    min-height: 2rem;
    padding: 0;
    border-radius: 50%;
    border: 1px solid var(--border-color, #e5e7eb);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
    color: var(--accent-color, var(--fs-store-primary));
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .brl-step__toggle:hover,
  .brl-step__toggle[aria-expanded='true'] {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #e5e7eb));
  }

  .brl-handles {
    display: flex;
    flex-direction: column;
    gap: 0.28rem;
    align-self: center;
    justify-self: start;
    flex: 0 0 auto;
  }

  .brl-handle {
    width: 32px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    cursor: pointer;
    font-size: 0.8rem;
    touch-action: none;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .brl-handle:hover:not(:disabled) {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
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
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #e5e7eb));
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
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, var(--border-color, #e5e7eb));
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
    border: 1.5px solid var(--border-color, #e5e7eb);
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
    border-color: color-mix(in srgb, var(--success-color, #2f9e63) 45%, var(--border-color, #e5e7eb));
    color: var(--success-color, #2f9e63);
  }

  .brl-feedback--win .brl-feedback__icon {
    background: color-mix(in srgb, var(--success-color, #2f9e63) 20%, #fff);
  }

  .brl-feedback--retry {
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 10%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--error-color, #cf4b4b) 40%, var(--border-color, #e5e7eb));
    color: var(--error-color, #cf4b4b);
  }

  .brl-feedback--retry .brl-feedback__icon {
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 18%, #fff);
  }

  .brl-feedback__score {
    display: block;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
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
    .brl-switcher {
      margin-bottom: 1rem;
    }

    .brl-tabs {
      display: none;
    }

    .brl-select-wrap {
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
      gap: 0.45rem 0.55rem;
      grid-template-columns: auto minmax(0, 1fr) auto;
    }

    .brl-step--guide:not(.has-toggle) {
      grid-template-columns: auto minmax(0, 1fr);
    }

    .brl-step--quiz,
    .brl-step--quiz:not(.has-result) {
      grid-template-columns: auto auto minmax(0, 1fr);
    }

    .brl-step--quiz.has-result {
      grid-template-columns: auto auto minmax(0, 1fr) auto;
    }

    .brl-step--quiz.is-revealed {
      grid-template-columns: auto minmax(0, 1fr) auto;
    }

    .brl-step--quiz.is-revealed:not(.has-result) {
      grid-template-columns: auto minmax(0, 1fr);
    }

    .brl-step__index {
      display: none;
    }

    .brl-step__thumb {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 10px;
    }

    .brl-step__marker {
      width: 2.2rem;
      height: 2.2rem;
      font-size: 0.85rem;
    }

    .brl-step__title {
      font-size: 0.9rem;
    }

    .brl-step__short {
      font-size: 0.78rem;
    }

    .brl-handles {
      gap: 0.2rem;
    }

    .brl-handle {
      width: 28px;
      height: 26px;
      font-size: 0.72rem;
    }

    .brl-handle--drag {
      min-width: 2.35rem;
      min-height: 2.5rem;
      padding: 0.3rem 0.35rem;
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
