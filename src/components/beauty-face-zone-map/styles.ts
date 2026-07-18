import { css } from 'lit';

export const componentStyles = css`
  .bfz-layout {
    display: grid;
    gap: 1.5rem;
    align-items: start;
  }

  @media (min-width: 860px) {
    .bfz-layout {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 2rem;
    }
    .bfz-layout--reverse {
      direction: inherit;
    }
    .bfz-layout--reverse .bfz-stage {
      order: 2;
    }
  }

  .bfz-stage-wrap {
    position: relative;
    max-width: 520px;
    margin-inline: auto;
    width: 100%;
  }

  .bfz-stage {
    position: relative;
    width: 100%;
    aspect-ratio: var(--bfz-aspect, 3 / 4);
    border-radius: var(--section-radius, 16px);
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 40%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bfz-stage__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .bfz-stage__empty,
  .bfz-stage__missing {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.5rem;
    color: var(--muted-color, #8f7a86);
    font-size: 0.88rem;
    line-height: 1.55;
    background: repeating-linear-gradient(
      -45deg,
      color-mix(in srgb, var(--border-color, #f2dde7) 25%, var(--card-bg, #fff)),
      color-mix(in srgb, var(--border-color, #f2dde7) 25%, var(--card-bg, #fff)) 10px,
      color-mix(in srgb, var(--border-color, #f2dde7) 12%, var(--card-bg, #fff)) 10px,
      color-mix(in srgb, var(--border-color, #f2dde7) 12%, var(--card-bg, #fff)) 20px
    );
  }

  .bfz-stage__missing p {
    margin: 0;
    max-width: 14rem;
    font-weight: 600;
  }

  .bfz-stage__missing-icon {
    font-size: 2.5rem;
    opacity: 0.35;
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .bfz-dot {
    position: absolute;
    transform: translate(-50%, -50%);
    inset-inline-start: var(--dot-x, 50%);
    top: var(--dot-y, 50%);
    width: var(--dot-size, 30px);
    height: var(--dot-size, 30px);
    min-width: 26px;
    min-height: 26px;
    display: grid;
    place-items: center;
    padding: 0;
    border-radius: 50%;
    border: 2px solid #fff;
    background: var(--dot-color, var(--accent-color, #c2527f));
    color: #fff;
    font-size: 0.8rem;
    font-weight: 800;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(20, 14, 12, 0.28);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  /* RTL: mirror horizontal placement so % maps to the visual side authors expect */
  :host-context([dir='rtl']) .bfz-dot,
  :host([dir='rtl']) .bfz-dot {
    inset-inline-start: auto;
    inset-inline-end: var(--dot-x, 50%);
    transform: translate(50%, -50%);
  }

  .bfz-dot:hover {
    transform: translate(-50%, -50%) scale(1.12);
  }
  :host-context([dir='rtl']) .bfz-dot:hover,
  :host([dir='rtl']) .bfz-dot:hover {
    transform: translate(50%, -50%) scale(1.12);
  }

  .bfz-dot.is-active {
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--dot-color, var(--accent-color, #c2527f)) 35%, transparent),
      0 6px 16px rgba(20, 14, 12, 0.32);
  }

  .bfz-dot--ring {
    background: transparent;
    border-color: var(--dot-color, var(--accent-color, #c2527f));
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--dot-color, var(--accent-color, #c2527f)) 45%, transparent);
  }

  .bfz-dot--area {
    border-radius: 12px;
    background: color-mix(in srgb, var(--dot-color, var(--accent-color, #c2527f)) 22%, transparent);
    border-style: dashed;
    width: calc(var(--dot-size, 30px) * 2.2);
    height: calc(var(--dot-size, 30px) * 1.6);
  }

  .bfz-dot--icon {
    background: color-mix(in srgb, var(--dot-color, var(--accent-color, #c2527f)) 88%, #000);
  }

  .bfz-dot__pulse {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: inherit;
    opacity: 0.55;
    animation: bfz-pulse var(--bfz-pulse-speed, 2200ms) ease-out infinite;
    pointer-events: none;
  }

  @keyframes bfz-pulse {
    0% { transform: scale(1); opacity: 0.55; }
    70% { transform: scale(2.1); opacity: 0; }
    100% { transform: scale(2.1); opacity: 0; }
  }

  .bfz-dot__label {
    position: absolute;
    top: calc(100% + 4px);
    inset-inline-start: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    padding: 1px 6px;
    border-radius: 6px;
    pointer-events: none;
  }

  .bfz-panel {
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: var(--section-radius, 16px);
    padding: 1.15rem 1.15rem 1.25rem;
    box-shadow: 0 10px 30px rgba(43, 33, 28, 0.07);
  }

  .bfz-panel__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .bfz-panel__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bfz-nav {
    display: inline-flex;
    gap: 0.35rem;
  }

  .bfz-nav__btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--accent-color, #c2527f);
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .bfz-nav__btn:hover { background: color-mix(in srgb, var(--accent-color, #c2527f) 10%, var(--card-bg, #fff)); }

  .bfz-panel__desc {
    margin: 0 0 0.9rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .bfz-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.9rem;
  }

  .bfz-tag {
    font-size: 0.74rem;
    font-weight: 700;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
    color: var(--accent-color, #c2527f);
  }

  .bfz-block { margin-bottom: 0.9rem; }

  .bfz-block__title {
    margin: 0 0 0.4rem;
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .bfz-steps {
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: bfz-step;
    display: grid;
    gap: 0.45rem;
  }

  .bfz-steps li {
    counter-increment: bfz-step;
    position: relative;
    padding-inline-start: 2rem;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--text-color, #33232e);
  }

  .bfz-steps li::before {
    content: counter(bfz-step);
    position: absolute;
    inset-inline-start: 0;
    top: 0;
    width: 1.4rem;
    height: 1.4rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, #c2527f);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 800;
  }

  .bfz-tips {
    margin: 0;
    padding-inline-start: 1.1rem;
    display: grid;
    gap: 0.35rem;
    color: var(--muted-color, #8f7a86);
    font-size: 0.86rem;
    line-height: 1.55;
  }

  .bfz-warn {
    display: flex;
    gap: 0.5rem;
    padding: 0.65rem 0.8rem;
    border-radius: 12px;
    background: color-mix(in srgb, #e0a100 14%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, #e0a100 40%, transparent);
    color: color-mix(in srgb, #8a5a00 70%, var(--text-color, #33232e));
    font-size: 0.84rem;
    line-height: 1.55;
    margin-bottom: 0.9rem;
  }

  .bfz-panel__img {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 0.9rem;
    display: block;
  }

  .bfz-notice {
    margin-top: 1.25rem;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  .bfz-dot.is-coach-pulse {
    animation: bfz-coach-dot 1.8s ease-in-out infinite;
  }

  @keyframes bfz-coach-dot {
    0%, 100% { box-shadow: 0 4px 12px rgba(20, 14, 12, 0.28), 0 0 0 0 color-mix(in srgb, var(--dot-color, var(--accent-color, #c2527f)) 45%, transparent); }
    50% { box-shadow: 0 4px 12px rgba(20, 14, 12, 0.28), 0 0 0 8px color-mix(in srgb, var(--dot-color, var(--accent-color, #c2527f)) 0%, transparent); }
  }

  .bfz-coach {
    position: absolute;
    inset-inline: 0;
    bottom: -0.35rem;
    transform: translateY(100%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
    padding: 0.65rem 0.85rem;
    border-radius: 12px;
    background: var(--text-color, #33232e);
    color: #fff;
    font-size: 0.84rem;
    font-weight: 700;
    box-shadow: 0 8px 24px rgba(20, 14, 12, 0.22);
    z-index: 5;
    animation: bfz-coach-in 0.35s ease;
  }

  .bfz-coach__text {
    margin: 0;
  }

  .bfz-coach__dismiss {
    flex: 0 0 auto;
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, #fff 18%, transparent);
    color: #fff;
    cursor: pointer;
    font-size: 0.75rem;
  }

  @keyframes bfz-coach-in {
    from { opacity: 0; transform: translateY(calc(100% + 6px)); }
    to { opacity: 1; transform: translateY(100%); }
  }

  .bfz-panel--empty {
    min-height: 10rem;
    display: grid;
    place-items: center;
  }

  .bfz-empty-state {
    text-align: center;
    padding: 1.25rem 1rem;
    max-width: 20rem;
    margin-inline: auto;
  }

  .bfz-empty-state__icon {
    display: block;
    font-size: 2rem;
    color: var(--accent-color, #c2527f);
    opacity: 0.5;
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .bfz-empty-state__title {
    margin: 0 0 0.4rem;
    font-size: 1rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bfz-empty-state__text {
    margin: 0;
    font-size: 0.86rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  .bfz-layout--sheet .bfz-sheet-close {
    display: grid;
  }

  /* Bottom sheet on mobile; desktop keeps inline panel + empty state */
  @media (max-width: 859px) {
    .bfz-layout--sheet .bfz-panel--empty {
      display: none;
    }

    .bfz-layout--sheet .bfz-panel:not(.bfz-panel--empty) {
      position: fixed;
      inset-inline: 0;
      bottom: 0;
      z-index: 60;
      border-radius: 18px 18px 0 0;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 -12px 40px rgba(20, 14, 12, 0.28);
      animation: bfz-sheet-up 0.28s ease;
    }

    .bfz-sheet-backdrop {
      position: fixed;
      inset: 0;
      z-index: 55;
      background: rgba(20, 14, 12, 0.4);
      border: none;
    }
  }

  @keyframes bfz-sheet-up {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .bfz-dot,
    .bfz-dot__pulse,
    .bfz-dot.is-coach-pulse,
    .bfz-coach,
    .bfz-panel {
      animation: none !important;
      transition: none !important;
    }
  }
`;
