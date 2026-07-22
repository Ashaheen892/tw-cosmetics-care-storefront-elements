import { css } from 'lit';

export const componentStyles = css`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bba-shell {
    width: 100%;
    max-width: 820px;
    margin-inline: auto;
    display: grid;
    gap: 1rem;
  }

  .bba-case-title {
    margin: 0;
    text-align: center;
    font-size: 1rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bba-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    justify-content: center;
  }

  .bba-tab {
    min-height: 38px;
    padding: 0.4rem 0.95rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      transform 0.15s ease;
  }

  .bba-tab:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  .bba-tab.is-active {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    border-color: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    transform: translateY(-1px);
  }

  .bba-viewer {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: var(--section-radius, 22px);
    overflow: hidden;
    background:
      radial-gradient(
        90% 70% at 50% 0%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
        transparent 65%
      ),
      color-mix(in srgb, var(--border-color, #e5e7eb) 35%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
      0 18px 40px rgba(120, 44, 82, 0.1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    cursor: col-resize;
    outline: none;
  }

  .bba-viewer:focus-visible {
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent),
      0 18px 40px rgba(120, 44, 82, 0.1);
  }

  .bba-viewer.is-dragging {
    cursor: grabbing;
  }

  .bba-viewer__layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .bba-viewer__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }

  .bba-viewer__before {
    z-index: 2;
    clip-path: inset(0 var(--clip-right, 50%) 0 0);
  }

  .bba-viewer__after {
    z-index: 1;
  }

  .bba-handle {
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--handle-left, 50%);
    z-index: 3;
    width: 2px;
    transform: translateX(-50%);
    pointer-events: none;
  }

  .bba-handle__line {
    position: absolute;
    inset: 0;
    width: 3px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
    box-shadow: 0 0 10px rgba(20, 14, 12, 0.28);
  }

  .bba-handle__pill {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    border: 3px solid #fff;
    box-shadow: 0 8px 22px rgba(120, 44, 82, 0.28);
    display: grid;
    place-items: center;
  }

  .bba-handle__arrows {
    color: #fff;
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    line-height: 1;
  }

  .bba-chip {
    position: absolute;
    bottom: 0.9rem;
    z-index: 4;
    padding: 0.35rem 0.8rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--card-bg, #fff) 92%, transparent);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    font-size: 0.74rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 70%, transparent);
    box-shadow: 0 4px 14px rgba(20, 14, 12, 0.1);
    pointer-events: none;
  }

  .bba-chip--before {
    inset-inline-start: 0.9rem;
  }

  .bba-chip--after {
    inset-inline-end: 0.9rem;
  }

  .bba-hint {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 5;
    transform: translate(-50%, -50%);
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.55rem 0.95rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--text-color, #33232e) 88%, transparent);
    color: #fff;
    font-size: 0.8rem;
    font-weight: 700;
    pointer-events: none;
    animation: bba-hint-pulse 1.8s ease-in-out infinite;
    box-shadow: 0 10px 28px rgba(20, 14, 12, 0.22);
  }

  .bba-hint__icon {
    font-size: 1rem;
    line-height: 1;
  }

  @keyframes bba-hint-pulse {
    0%,
    100% {
      opacity: 0.92;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.03);
    }
  }

  .bba-viewer.is-dragging .bba-hint {
    display: none;
  }

  .bba-toolbar {
    display: grid;
    gap: 0.75rem;
    justify-items: center;
  }

  .bba-range {
    display: grid;
    gap: 0.35rem;
    width: min(100%, 420px);
  }

  .bba-range__label {
    font-size: 0.74rem;
    font-weight: 800;
    color: var(--muted-color, #666666);
    text-align: center;
  }

  .bba-range__input {
    width: 100%;
    accent-color: var(--accent-color, var(--fs-store-primary));
    cursor: pointer;
  }

  .bba-quick {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    justify-content: center;
  }

  .bba-quick__btn {
    min-height: 34px;
    padding: 0.3rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }

  .bba-quick__btn:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bba-pair-nav {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
  }

  .bba-pair-nav__btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 1.1rem;
    cursor: pointer;
  }

  .bba-pair-nav__btn:hover {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
  }

  .bba-pair-nav__count {
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--muted-color, #666666);
    min-width: 3.5rem;
    text-align: center;
  }

  @media (max-width: 639px) {
    .bba-viewer {
      border-radius: 18px;
      aspect-ratio: 3 / 4;
    }

    .bba-handle__pill {
      width: 40px;
      height: 40px;
    }

    .bba-hint {
      font-size: 0.74rem;
      padding: 0.45rem 0.8rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bba-hint,
    .bba-tab,
    .bba-quick__btn {
      animation: none !important;
      transition: none !important;
    }
  }
`;
