import { css } from 'lit';

export const componentStyles = css`
  .bff-shell {
    display: grid;
    gap: 1.35rem;
    align-items: start;
    max-width: 1080px;
    margin-inline: auto;
  }

  @media (min-width: 900px) {
    .bff-shell {
      grid-template-columns: minmax(240px, 0.85fr) minmax(0, 1.35fr);
      gap: 1.75rem;
    }
  }

  /* —— Family selector —— */
  .bff-selector {
    min-width: 0;
    padding: 1rem 1rem 1.1rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, #fbf5f8));
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 90%, #fff);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.06);
  }

  .bff-selector__label {
    margin: 0 0 0.75rem;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--muted-color, #8f7a86);
  }

  .bff-chips {
    display: grid;
    gap: 0.55rem;
  }

  .bff-chips--grid {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 900px) {
    .bff-chips--grid {
      grid-template-columns: 1fr;
    }
  }

  .bff-chips--list {
    grid-template-columns: 1fr;
  }

  .bff-chip {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.65rem;
    min-height: 52px;
    padding: 0.55rem 0.7rem;
    border: 1.5px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 20px) * 0.65);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.25;
    cursor: pointer;
    text-align: start;
    box-shadow: 0 2px 8px rgba(43, 33, 28, 0.04);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .bff-chip:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 45%, var(--border-color, #f2dde7));
    box-shadow: 0 8px 18px rgba(43, 33, 28, 0.08);
  }

  .bff-chip.is-active {
    border-color: var(--fam-color, var(--accent-color, #c2527f));
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 8%, var(--card-bg, #fff));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 22%, transparent),
      0 10px 22px rgba(43, 33, 28, 0.1);
  }

  .bff-chip__swatch {
    flex: 0 0 auto;
    width: 2.15rem;
    height: 2.15rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--fam-color, var(--accent-color, #c2527f));
    color: #fff;
    font-size: 1rem;
    line-height: 1;
    box-shadow:
      inset 0 0 0 2px color-mix(in srgb, #fff 40%, transparent),
      0 4px 10px color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 35%, transparent);
  }

  .bff-chip__meta {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .bff-chip__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bff-chip__hint {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bff-chip__dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: transparent;
    box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--muted-color, #8f7a86) 55%, transparent);
  }

  .bff-chip.is-active .bff-chip__dot {
    background: var(--fam-color, var(--accent-color, #c2527f));
    box-shadow: none;
  }

  /* —— Wheel layout —— */
  .bff-chips--wheel {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0 0.5rem;
  }

  .bff-chips--wheel .bff-chip {
    display: inline-flex;
    grid-template-columns: none;
    border-radius: 999px;
    padding: 0.45rem 0.85rem 0.45rem 0.5rem;
    padding-inline: 0.5rem 0.85rem;
  }

  .bff-chips--wheel .bff-chip__meta,
  .bff-chips--wheel .bff-chip__hint,
  .bff-chips--wheel .bff-chip__dot {
    display: none;
  }

  .bff-chips--wheel .bff-chip__name {
    display: inline;
  }

  @media (min-width: 560px) {
    .bff-chips--wheel {
      position: relative;
      min-height: 300px;
      border-radius: 50%;
    }

    .bff-chips--wheel .bff-chip {
      position: absolute;
      top: 50%;
      inset-inline-start: 50%;
      transform: translate(-50%, -50%)
        rotate(var(--i-angle, 0deg)) translate(var(--wheel-r, 120px))
        rotate(calc(-1 * var(--i-angle, 0deg)));
    }

    .bff-chips--wheel .bff-chip:hover {
      transform: translate(-50%, -50%)
        rotate(var(--i-angle, 0deg)) translate(var(--wheel-r, 120px))
        rotate(calc(-1 * var(--i-angle, 0deg))) scale(1.05);
    }

    .bff-wheel-core {
      display: grid;
      position: absolute;
      top: 50%;
      inset-inline-start: 50%;
      transform: translate(-50%, -50%);
      width: 5.25rem;
      height: 5.25rem;
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

  /* —— Story panel —— */
  .bff-story {
    min-width: 0;
    padding: 1.15rem;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 28%, var(--border-color, #f2dde7));
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 12%, transparent),
      0 16px 36px rgba(120, 44, 82, 0.09);
  }

  .bff-hero {
    position: relative;
    display: grid;
    gap: 1rem;
    margin-bottom: 1.1rem;
  }

  @media (min-width: 640px) {
    .bff-hero--media {
      grid-template-columns: minmax(0, 1.1fr) minmax(160px, 0.75fr);
      align-items: stretch;
    }
  }

  .bff-hero__body {
    position: relative;
    z-index: 1;
    min-width: 0;
    padding: 0.15rem 0.1rem 0;
  }

  .bff-hero__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.55rem;
  }

  .bff-hero__icon {
    display: inline-grid;
    place-items: center;
    width: 2.65rem;
    height: 2.65rem;
    border-radius: 50%;
    background: var(--fam-color, var(--accent-color, #c2527f));
    color: #fff;
    font-size: 1.2rem;
    box-shadow:
      inset 0 0 0 2px color-mix(in srgb, #fff 40%, transparent),
      0 8px 18px color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 35%, transparent);
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
    background: color-mix(in srgb, var(--card-bg, #fff) 70%, var(--section-bg, #fbf5f8));
    color: var(--accent-color, #c2527f);
    font-size: 1.05rem;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .bff-nav__btn:hover {
    background: color-mix(in srgb, var(--accent-color, #c2527f) 10%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 40%, var(--border-color, #f2dde7));
  }

  .bff-hero__title {
    margin: 0 0 0.4rem;
    font-size: clamp(1.35rem, 3.2vw, 1.75rem);
    font-weight: 800;
    color: var(--text-color, #33232e);
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .bff-hero__desc {
    margin: 0 0 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.7;
    font-size: 0.93rem;
  }

  .bff-mood {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bff-mood__tag {
    font-size: 0.74rem;
    font-weight: 700;
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 14%, var(--card-bg, #fff));
    color: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 78%, var(--text-color, #33232e));
  }

  .bff-hero__media {
    position: relative;
    min-width: 0;
    border-radius: calc(var(--section-radius, 20px) * 0.7);
    overflow: hidden;
    background:
      linear-gradient(
        160deg,
        color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 28%, transparent),
        transparent 55%
      ),
      color-mix(in srgb, var(--border-color, #f2dde7) 35%, var(--card-bg, #fff));
    aspect-ratio: 4 / 5;
    max-height: 280px;
  }

  @media (max-width: 639px) {
    .bff-hero__media {
      aspect-ratio: 16 / 10;
      max-height: 220px;
    }
  }

  .bff-hero__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .bff-hero__media::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 45%,
      color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 22%, transparent)
    );
    pointer-events: none;
  }

  /* —— Notes pyramid —— */
  .bff-pyramid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
    margin: 0 0 1.1rem;
    padding: 1rem 0.85rem 1.05rem;
    border-radius: calc(var(--section-radius, 20px) * 0.7);
    background:
      radial-gradient(
        90% 80% at 50% 0%,
        color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 10%, transparent),
        transparent 70%
      ),
      color-mix(in srgb, var(--section-bg, #fbf5f8) 65%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 18%, var(--border-color, #f2dde7));
  }

  .bff-pyramid__intro {
    margin: 0 0 0.55rem;
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
    text-align: center;
  }

  .bff-tier {
    width: 100%;
    border-radius: 14px;
    padding: 0.75rem 0.9rem;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) var(--tier-tint, 10%), var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 28%, transparent);
    box-sizing: border-box;
    text-align: center;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.45s ease, transform 0.45s ease, width 0.35s ease;
  }

  .bff-tier.is-visible,
  .bff-tier.is-instant {
    opacity: 1;
    transform: translateY(0);
  }

  .bff-tier--top {
    width: 58%;
    --tier-tint: 8%;
  }

  .bff-tier--heart {
    width: 78%;
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
    letter-spacing: 0.03em;
    color: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 85%, var(--text-color, #33232e));
    margin-bottom: 0.4rem;
  }

  .bff-tier__notes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.35rem;
  }

  .bff-note {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-color, #33232e);
    background: color-mix(in srgb, var(--card-bg, #fff) 82%, transparent);
    padding: 0.22rem 0.65rem;
    border-radius: 999px;
    line-height: 1.4;
    opacity: 0;
    transform: scale(0.92);
    transition: opacity 0.35s ease, transform 0.35s ease;
    transition-delay: calc(var(--note-i, 0) * 80ms);
  }

  .bff-note.is-visible,
  .bff-note.is-instant {
    opacity: 1;
    transform: scale(1);
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

  /* —— Facts —— */
  .bff-facts {
    display: grid;
    gap: 0.55rem;
    margin-bottom: 0.25rem;
  }

  @media (min-width: 480px) {
    .bff-facts {
      grid-template-columns: 1fr 1fr;
    }
  }

  .bff-fact {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.75rem 0.85rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 7%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 18%, var(--border-color, #f2dde7));
  }

  .bff-fact__label {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
  }

  .bff-fact__value {
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bff-panel__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-top: 1rem;
  }

  .bff-notice {
    max-width: 1080px;
    margin: 1.25rem auto 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.65;
  }

  @media (prefers-reduced-motion: reduce) {
    .bff-chip,
    .bff-tier,
    .bff-note,
    .bff-nav__btn {
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;
