import { css } from 'lit';

export const componentStyles = css`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bfz-layout {
    display: grid;
    gap: 1.35rem;
    align-items: start;
    width: 100%;
  }

  @media (min-width: 860px) {
    .bfz-layout {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      gap: 1.75rem;
    }

    .bfz-layout--reverse .bfz-stage-wrap {
      order: 2;
    }

    .bfz-layout--reverse .bfz-panel {
      order: 1;
    }

    .bfz-panel {
      position: sticky;
      top: 1rem;
    }
  }

  /* —— Map stage —— */
  .bfz-stage-wrap {
    position: relative;
    width: 100%;
    min-width: 0;
    display: grid;
    gap: 0.85rem;
  }

  .bfz-stage {
    position: relative;
    width: 100%;
    aspect-ratio: var(--bfz-aspect, 3 / 4);
    border-radius: var(--section-radius, 20px);
    overflow: hidden;
    background:
      radial-gradient(
        90% 70% at 50% 20%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
        transparent 60%
      ),
      color-mix(in srgb, var(--border-color, #f2dde7) 35%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 90%, #fff);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
      0 18px 40px rgba(120, 44, 82, 0.08);
  }

  .bfz-stage::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, #fff 35%, transparent);
    z-index: 2;
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

  /* —— Zone legend —— */
  .bfz-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    justify-content: center;
  }

  .bfz-legend__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 36px;
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
      transform 0.15s ease;
  }

  .bfz-legend__btn:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #f2dde7));
  }

  .bfz-legend__btn.is-active {
    background: var(--accent-color, var(--fs-store-primary));
    border-color: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    transform: translateY(-1px);
  }

  .bfz-legend__swatch {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: var(--dot-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: 0 0 0 2px color-mix(in srgb, #fff 70%, transparent);
    flex: 0 0 auto;
  }

  .bfz-legend__btn.is-active .bfz-legend__swatch {
    box-shadow: 0 0 0 2px color-mix(in srgb, #fff 35%, transparent);
  }

  /* —— Hotspots —— */
  .bfz-dot {
    position: absolute;
    z-index: 3;
    transform: translate(-50%, -50%);
    inset-inline-start: var(--dot-x, 50%);
    top: var(--dot-y, 50%);
    width: var(--dot-size, 30px);
    height: var(--dot-size, 30px);
    min-width: 28px;
    min-height: 28px;
    display: grid;
    place-items: center;
    padding: 0;
    border-radius: 50%;
    border: 2.5px solid #fff;
    background: var(--dot-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-size: 0.8rem;
    font-weight: 800;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(20, 14, 12, 0.28);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  :host-context([dir='rtl']) .bfz-dot,
  :host([dir='rtl']) .bfz-dot {
    inset-inline-start: auto;
    inset-inline-end: var(--dot-x, 50%);
    transform: translate(50%, -50%);
  }

  .bfz-dot:hover,
  .bfz-dot:focus-visible {
    transform: translate(-50%, -50%) scale(1.14);
    outline: none;
  }

  :host-context([dir='rtl']) .bfz-dot:hover,
  :host-context([dir='rtl']) .bfz-dot:focus-visible,
  :host([dir='rtl']) .bfz-dot:hover,
  :host([dir='rtl']) .bfz-dot:focus-visible {
    transform: translate(50%, -50%) scale(1.14);
  }

  .bfz-dot.is-active {
    box-shadow:
      0 0 0 5px color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 32%, transparent),
      0 8px 18px rgba(20, 14, 12, 0.3);
  }

  .bfz-dot--ring {
    background: color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 12%, transparent);
    border-color: var(--dot-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 28%, transparent);
  }

  .bfz-dot--area {
    border-radius: 14px;
    background: color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 22%, transparent);
    border-style: dashed;
    width: calc(var(--dot-size, 30px) * 2.2);
    height: calc(var(--dot-size, 30px) * 1.6);
  }

  .bfz-dot--icon {
    background: color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 88%, #000);
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
    0% {
      transform: scale(1);
      opacity: 0.55;
    }
    70% {
      transform: scale(2.1);
      opacity: 0;
    }
    100% {
      transform: scale(2.1);
      opacity: 0;
    }
  }

  .bfz-dot__label {
    position: absolute;
    top: calc(100% + 6px);
    inset-inline-start: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
    background: color-mix(in srgb, var(--card-bg, #fff) 92%, transparent);
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 80%, transparent);
    padding: 0.15rem 0.45rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(43, 33, 28, 0.08);
    pointer-events: none;
  }

  /* —— Detail panel —— */
  .bfz-panel {
    min-width: 0;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 90%, #fff);
    border-radius: var(--section-radius, 20px);
    padding: 1.2rem 1.25rem 1.35rem;
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
      0 16px 36px rgba(120, 44, 82, 0.08);
    display: grid;
    gap: 0.95rem;
  }

  .bfz-panel__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .bfz-panel__eyebrow {
    margin: 0 0 0.25rem;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--accent-color, var(--fs-store-primary));
    text-transform: uppercase;
  }

  .bfz-panel__title {
    margin: 0;
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    font-weight: 800;
    line-height: 1.3;
    color: var(--text-color, #33232e);
  }

  .bfz-nav {
    display: inline-flex;
    gap: 0.35rem;
    flex: 0 0 auto;
  }

  .bfz-nav__btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 1px solid var(--border-color, #f2dde7);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, #fbf5f8));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 1.05rem;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  }

  .bfz-nav__btn:hover,
  .bfz-nav__btn:focus-visible {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #f2dde7));
    outline: none;
  }

  .bfz-panel__img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: calc(var(--section-radius, 20px) - 8px);
    display: block;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, #f2ece8);
  }

  .bfz-panel__desc {
    margin: 0;
    color: var(--muted-color, #8f7a86);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .bfz-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bfz-tag {
    font-size: 0.74rem;
    font-weight: 700;
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent);
  }

  .bfz-block {
    display: grid;
    gap: 0.55rem;
    padding-top: 0.15rem;
  }

  .bfz-block__title {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--text-color, #33232e);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .bfz-block__title::before {
    content: '';
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    flex: 0 0 auto;
  }

  .bfz-steps {
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: bfz-step;
    display: grid;
    gap: 0.5rem;
  }

  .bfz-steps li {
    counter-increment: bfz-step;
    position: relative;
    padding-block: 0.65rem;
    padding-inline: 2.45rem 0.75rem;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--text-color, #33232e);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 5%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 80%, transparent);
    border-radius: 12px;
  }

  .bfz-steps li::before {
    content: counter(bfz-step);
    position: absolute;
    inset-inline-start: 0.55rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.45rem;
    height: 1.45rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-size: 0.72rem;
    font-weight: 800;
  }

  .bfz-tips {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.4rem;
  }

  .bfz-tips li {
    position: relative;
    padding-inline-start: 1.15rem;
    color: var(--muted-color, #8f7a86);
    font-size: 0.86rem;
    line-height: 1.55;
  }

  .bfz-tips li::before {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    top: 0.55em;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #fff);
  }

  .bfz-warn {
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
    padding: 0.75rem 0.85rem;
    border-radius: 14px;
    background: color-mix(in srgb, #e0a100 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, #e0a100 34%, transparent);
    color: color-mix(in srgb, #8a5a00 70%, var(--text-color, #33232e));
    font-size: 0.84rem;
    line-height: 1.55;
  }

  .bfz-panel .fs-btn {
    justify-self: start;
    margin-top: 0.15rem;
  }

  .bfz-notice {
    margin: 1.35rem 0 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  .bfz-dot.is-coach-pulse {
    animation: bfz-coach-dot 1.8s ease-in-out infinite;
  }

  @keyframes bfz-coach-dot {
    0%,
    100% {
      box-shadow:
        0 6px 16px rgba(20, 14, 12, 0.28),
        0 0 0 0 color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 45%, transparent);
    }
    50% {
      box-shadow:
        0 6px 16px rgba(20, 14, 12, 0.28),
        0 0 0 10px color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 0%, transparent);
    }
  }

  .bfz-coach {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
    padding: 0.7rem 0.9rem;
    border-radius: 14px;
    background: linear-gradient(
      135deg,
      var(--text-color, #33232e),
      color-mix(in srgb, var(--text-color, #33232e) 78%, var(--accent-color, var(--fs-store-primary)))
    );
    color: #fff;
    font-size: 0.84rem;
    font-weight: 700;
    box-shadow: 0 10px 28px rgba(20, 14, 12, 0.2);
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
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .bfz-panel--empty {
    min-height: 14rem;
    place-items: center;
  }

  .bfz-empty-state {
    text-align: center;
    padding: 1.35rem 1rem;
    max-width: 20rem;
    margin-inline: auto;
  }

  .bfz-empty-state__icon {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    margin: 0 auto 0.75rem;
    border-radius: 50%;
    font-size: 1.25rem;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    line-height: 1;
  }

  .bfz-empty-state__title {
    margin: 0 0 0.4rem;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bfz-empty-state__text {
    margin: 0;
    font-size: 0.86rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.65;
  }

  .bfz-layout--sheet .bfz-sheet-close {
    display: grid;
  }

  @media (max-width: 859px) {
    .bfz-layout--sheet .bfz-panel--empty {
      display: none;
    }

    .bfz-layout--sheet .bfz-panel:not(.bfz-panel--empty) {
      position: fixed;
      inset-inline: 0;
      bottom: 0;
      z-index: 60;
      border-radius: 20px 20px 0 0;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 -14px 44px rgba(20, 14, 12, 0.28);
      animation: bfz-sheet-up 0.28s ease;
    }

    .bfz-sheet-backdrop {
      position: fixed;
      inset: 0;
      z-index: 55;
      background: rgba(20, 14, 12, 0.42);
      border: none;
    }
  }

  @keyframes bfz-sheet-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bfz-dot,
    .bfz-dot__pulse,
    .bfz-dot.is-coach-pulse,
    .bfz-coach,
    .bfz-panel,
    .bfz-legend__btn {
      animation: none !important;
      transition: none !important;
    }
  }
`;
