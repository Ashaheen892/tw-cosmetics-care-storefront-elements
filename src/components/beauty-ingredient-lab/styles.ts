import { css } from 'lit';

export const componentStyles = css`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bil-stage {
    position: relative;
    border-radius: var(--section-radius, 20px);
    padding: 1.35rem;
    overflow: hidden;
    background: linear-gradient(
      160deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--section-bg, #fbf5f8)),
      var(--card-bg, #fff)
    );
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 90%, #fff);
    box-shadow: 0 12px 30px rgba(120, 44, 82, 0.05);
  }

  .bil-bubbles {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .bil-bubble {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, #fff),
      transparent 70%
    );
    opacity: 0.28;
    animation: bil-float 9s ease-in-out infinite;
  }

  @keyframes bil-float {
    0%,
    100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-14px) scale(1.05);
    }
  }

  /* —— Texture filter —— */
  .bil-filter-wrap {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.45rem;
    margin-bottom: 1.1rem;
  }

  .bil-filter__label {
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--muted-color, #8f7a86);
  }

  .bil-segment {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;
    padding: 0.22rem;
    width: fit-content;
    max-width: 100%;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 35%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bil-segment__btn {
    flex: 0 1 auto;
    min-height: 40px;
    min-width: 3.5rem;
    padding: 0.45rem 0.95rem;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: var(--muted-color, #8f7a86);
    font: inherit;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  }

  .bil-segment__btn[aria-pressed='true'] {
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, transparent);
  }

  /* —— Body: list + detail side by side on desktop —— */
  .bil-body {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 1rem;
    align-items: start;
  }

  @media (min-width: 860px) {
    .bil-body {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      gap: 1.25rem;
    }

    .bil-detail {
      position: sticky;
      top: 1rem;
    }
  }

  .bil-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.55rem;
    align-content: start;
  }

  @media (max-width: 859px) {
    .bil-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 0.65rem;
    }
  }

  .bil-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.7rem 0.85rem;
    border-radius: 16px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    cursor: pointer;
    text-align: start;
    font: inherit;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease,
      transform 0.15s ease;
  }

  .bil-card:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #f2dde7));
    transform: translateY(-1px);
  }

  .bil-card[aria-pressed='true'] {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 20%, transparent);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--card-bg, #fff));
  }

  .bil-card__badge {
    flex: 0 0 auto;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    object-fit: cover;
    color: #fff;
    font-size: 1.15rem;
    font-weight: 700;
    background: var(--accent-color, var(--fs-store-primary));
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.35);
  }

  .bil-card__text {
    flex: 1 1 auto;
    min-width: 0;
    display: grid;
    gap: 0.15rem;
  }

  .bil-card__name {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
    line-height: 1.3;
  }

  .bil-card__texture {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bil-card__check {
    flex: 0 0 auto;
    width: 1.5rem;
    height: 1.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 0.72rem;
    font-weight: 800;
    color: transparent;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 50%, transparent);
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bil-card[aria-pressed='true'] .bil-card__check {
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
  }

  @media (max-width: 859px) {
    .bil-card {
      position: relative;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 0.8rem;
    }

    .bil-card__check {
      position: absolute;
      inset-inline-end: 0.6rem;
      top: 0.6rem;
    }
  }

  .bil-empty {
    padding: 1.4rem 1rem;
    text-align: center;
    border-radius: 14px;
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, var(--border-color, #f2dde7));
    background: color-mix(in srgb, var(--section-bg, #fbf5f8) 55%, var(--card-bg, #fff));
    color: var(--muted-color, #8f7a86);
    font-size: 0.88rem;
  }

  /* —— Detail —— */
  .bil-detail {
    position: relative;
    display: grid;
    gap: 0.95rem;
    padding: 1.25rem 1.3rem 1.35rem;
    border-radius: 18px;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 24%, var(--border-color, #f2dde7));
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
      0 14px 34px rgba(120, 44, 82, 0.08);
  }

  .bil-detail__head {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .bil-detail__badge {
    flex: 0 0 auto;
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    object-fit: cover;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 700;
    background: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      inset 0 0 0 2px rgba(255, 255, 255, 0.35),
      0 8px 18px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, transparent);
  }

  .bil-detail__eyebrow {
    margin: 0 0 0.15rem;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bil-detail__title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
    line-height: 1.3;
  }

  .bil-detail__texture {
    display: inline-block;
    margin-top: 0.25rem;
    padding: 0.15rem 0.6rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 700;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bil-detail__desc {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--muted-color, #8f7a86);
  }

  .bil-block {
    display: grid;
    gap: 0.45rem;
  }

  .bil-block__title {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .bil-block__title::before {
    content: '';
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    flex: 0 0 auto;
  }

  .bil-block__text {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.55;
    color: var(--text-color, #33232e);
  }

  .bil-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bil-chip {
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    font-size: 0.76rem;
    font-weight: 700;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent);
  }

  .bil-chip--soft {
    background: color-mix(in srgb, var(--border-color, #f2dde7) 45%, var(--card-bg, #fff));
    color: var(--text-color, #33232e);
    border-color: color-mix(in srgb, var(--border-color, #f2dde7) 80%, transparent);
  }

  .bil-note {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    padding: 0.75rem 0.85rem;
    border-radius: 14px;
    background: color-mix(in srgb, #e0a100 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, #e0a100 34%, transparent);
    color: color-mix(in srgb, #8a5a00 70%, var(--text-color, #33232e));
    font-size: 0.84rem;
    line-height: 1.55;
  }

  .bil-link {
    justify-self: start;
  }

  @media (max-width: 639px) {
    .bil-stage {
      padding: 1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bil-bubble {
      animation: none;
    }
    .bil-card,
    .bil-segment__btn,
    .bil-card__check {
      transition: none;
    }
  }
`;
