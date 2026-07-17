import { css } from 'lit';

export const componentStyles = css`
  .bff-layout {
    display: grid;
    gap: 1.5rem;
    align-items: start;
  }

  @media (min-width: 860px) {
    .bff-layout {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      gap: 2rem;
    }
  }

  /* —— Selector —— */
  .bff-selector {
    min-width: 0;
  }

  .bff-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .bff-chips--list {
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .bff-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    min-height: 44px;
    padding: 0.5rem 0.9rem 0.5rem 0.6rem;
    padding-inline: 0.6rem 0.9rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: 999px;
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.88rem;
    font-weight: 700;
    line-height: 1.2;
    cursor: pointer;
    text-align: start;
    box-shadow: 0 3px 10px rgba(43, 33, 28, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }

  .bff-chips--list .bff-chip {
    width: 100%;
    justify-content: flex-start;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
  }

  .bff-chip:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(43, 33, 28, 0.1);
  }

  .bff-chip.is-active {
    border-color: var(--fam-color, var(--accent-color, #c2527f));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 30%, transparent),
      0 8px 18px rgba(43, 33, 28, 0.12);
  }

  .bff-chip__swatch {
    flex: 0 0 auto;
    width: 1.6rem;
    height: 1.6rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--fam-color, var(--accent-color, #c2527f));
    color: #fff;
    font-size: 0.9rem;
    line-height: 1;
    box-shadow: inset 0 0 0 2px color-mix(in srgb, #fff 45%, transparent);
  }

  .bff-chip__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bff-chips--list .bff-chip__name {
    white-space: normal;
  }

  /* —— Wheel layout: radial arrangement —— */
  .bff-chips--wheel {
    position: relative;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
  }

  @media (min-width: 560px) {
    .bff-chips--wheel {
      min-height: 320px;
      border-radius: 50%;
    }
    .bff-chips--wheel .bff-chip {
      position: absolute;
      top: 50%;
      inset-inline-start: 50%;
      transform: translate(-50%, -50%)
        rotate(var(--i-angle, 0deg)) translate(var(--wheel-r, 130px))
        rotate(calc(-1 * var(--i-angle, 0deg)));
    }
    .bff-chips--wheel .bff-chip:hover {
      transform: translate(-50%, -50%)
        rotate(var(--i-angle, 0deg)) translate(var(--wheel-r, 130px))
        rotate(calc(-1 * var(--i-angle, 0deg))) scale(1.06);
    }
    .bff-wheel-core {
      position: absolute;
      top: 50%;
      inset-inline-start: 50%;
      transform: translate(-50%, -50%);
      width: 5.5rem;
      height: 5.5rem;
      display: grid;
      place-items: center;
      text-align: center;
      border-radius: 50%;
      background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
      border: 1px dashed color-mix(in srgb, var(--accent-color, #c2527f) 45%, transparent);
      color: var(--muted-color, #8f7a86);
      font-size: 0.72rem;
      font-weight: 700;
      padding: 0.5rem;
      pointer-events: none;
    }
  }

  .bff-wheel-core {
    display: none;
  }

  /* —— Detail panel —— */
  .bff-panel {
    padding: 1.15rem 1.15rem 1.25rem;
    min-width: 0;
  }

  .bff-panel__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.6rem;
  }

  .bff-panel__title {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin: 0;
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
    min-width: 0;
  }

  .bff-panel__badge {
    flex: 0 0 auto;
    width: 1.9rem;
    height: 1.9rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--fam-color, var(--accent-color, #c2527f));
    color: #fff;
    font-size: 1rem;
    line-height: 1;
    box-shadow: inset 0 0 0 2px color-mix(in srgb, #fff 45%, transparent);
  }

  .bff-nav {
    display: inline-flex;
    gap: 0.35rem;
    flex: 0 0 auto;
  }

  .bff-nav__btn {
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
  .bff-nav__btn:hover {
    background: color-mix(in srgb, var(--accent-color, #c2527f) 10%, var(--card-bg, #fff));
  }

  .bff-panel__img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 0.9rem;
    display: block;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 40%, var(--card-bg, #fff));
  }

  .bff-panel__desc {
    margin: 0 0 0.9rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .bff-mood {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }

  .bff-mood__tag {
    font-size: 0.74rem;
    font-weight: 700;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 14%, var(--card-bg, #fff));
    color: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 80%, var(--text-color, #33232e));
  }

  /* —— Notes pyramid —— */
  .bff-pyramid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .bff-tier {
    width: 100%;
    border-radius: 12px;
    padding: 0.7rem 0.9rem;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) var(--tier-tint, 10%), var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 30%, transparent);
    box-sizing: border-box;
    text-align: center;
    transition: width 0.35s ease;
  }

  .bff-tier--top {
    width: 62%;
    --tier-tint: 8%;
  }
  .bff-tier--heart {
    width: 82%;
    --tier-tint: 14%;
  }
  .bff-tier--base {
    width: 100%;
    --tier-tint: 20%;
  }

  .bff-tier__label {
    display: block;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 85%, var(--text-color, #33232e));
    margin-bottom: 0.35rem;
  }

  .bff-tier__notes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.3rem 0.4rem;
  }

  .bff-note {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-color, #33232e);
    background: color-mix(in srgb, var(--card-bg, #fff) 78%, transparent);
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    line-height: 1.4;
  }

  .bff-tier__empty {
    font-size: 0.76rem;
    color: var(--muted-color, #8f7a86);
  }

  @media (max-width: 480px) {
    .bff-tier--top,
    .bff-tier--heart,
    .bff-tier--base {
      width: 100%;
    }
  }

  /* —— Facts rows —— */
  .bff-facts {
    display: grid;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 480px) {
    .bff-facts {
      grid-template-columns: 1fr 1fr;
    }
  }

  .bff-fact {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding: 0.6rem 0.75rem;
    border-radius: 10px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 22%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bff-fact__label {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
  }

  .bff-fact__value {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
  }

  .bff-panel__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .bff-notice {
    margin-top: 1.25rem;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  @media (prefers-reduced-motion: reduce) {
    .bff-chip,
    .bff-tier,
    .bff-nav__btn {
      transition: none !important;
    }
  }
`;
