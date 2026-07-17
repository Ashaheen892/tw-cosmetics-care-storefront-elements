import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .bil-stage {
    position: relative;
    border-radius: var(--section-radius, 18px);
    padding: 1.3rem;
    overflow: hidden;
    background: linear-gradient(
      160deg,
      color-mix(in srgb, var(--accent-color, #c2527f) 8%, var(--section-bg, #fbf5f8)),
      var(--card-bg, #fff)
    );
    border: 1px solid var(--border-color, #f2dde7);
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
      color-mix(in srgb, var(--accent-color, #c2527f) 40%, #fff),
      transparent 70%
    );
    opacity: 0.5;
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

  .bil-toolbar {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-bottom: 1rem;
  }

  .bil-filter {
    min-height: 40px;
    padding: 0.45rem 0.95rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: color-mix(in srgb, var(--card-bg, #fff) 70%, transparent);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 600;
    font-size: 0.83rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }

  .bil-filter[aria-pressed='true'] {
    background: var(--accent-color, #c2527f);
    border-color: var(--accent-color, #c2527f);
    color: #fff;
  }

  .bil-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.85rem;
  }

  .bil-card {
    display: grid;
    gap: 0.5rem;
    padding: 0.95rem;
    border-radius: 18px;
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 80%, transparent);
    background: color-mix(in srgb, var(--card-bg, #fff) 78%, transparent);
    -webkit-backdrop-filter: blur(9px);
    backdrop-filter: blur(9px);
    box-shadow: 0 8px 24px rgba(43, 33, 28, 0.07);
    cursor: pointer;
    text-align: start;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  }

  .bil-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 38px rgba(43, 33, 28, 0.13);
  }

  .bil-card[aria-pressed='true'] {
    border-color: var(--accent-color, #c2527f);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-color, #c2527f) 30%, transparent);
  }

  .bil-card__badge {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    object-fit: cover;
    color: #fff;
    font-size: 1.3rem;
    font-weight: 700;
  }

  .bil-card__name {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
  }

  .bil-card__texture {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--accent-color, #c2527f);
  }

  .bil-card__desc {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.5;
    color: var(--muted-color, #8f7a86);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bil-detail {
    position: relative;
    z-index: 1;
    margin-top: 1rem;
    display: grid;
    gap: 0.9rem;
    padding: 1.1rem;
    border-radius: 18px;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bil-detail__head {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .bil-detail__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bil-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bil-chip {
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    font-size: 0.76rem;
    font-weight: 600;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
    color: var(--text-color, #33232e);
  }

  .bil-meta {
    display: grid;
    gap: 0.5rem;
  }

  .bil-meta__row {
    font-size: 0.85rem;
    line-height: 1.55;
    color: var(--text-color, #33232e);
  }

  .bil-meta__row b {
    color: var(--accent-color, #c2527f);
  }

  .bil-note {
    padding: 0.7rem 0.9rem;
    border-radius: 12px;
    border-inline-start: 4px solid #d9a441;
    background: color-mix(in srgb, #d9a441 12%, var(--card-bg, #fff));
    font-size: 0.82rem;
    color: var(--text-color, #33232e);
  }

  .bil-link {
    justify-self: start;
    min-height: 40px;
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1.1rem;
    border-radius: 999px;
    border: 1px solid var(--accent-color, #c2527f);
    background: transparent;
    color: var(--accent-color, #c2527f);
    font: inherit;
    font-weight: 600;
    font-size: 0.85rem;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bil-link:hover {
    background: var(--accent-color, #c2527f);
    color: #fff;
  }

  @media (prefers-reduced-motion: reduce) {
    .bil-bubble {
      animation: none;
    }
    .bil-card,
    .bil-filter {
      transition: none;
    }
    .bil-card:hover {
      transform: none;
    }
  }
`;
