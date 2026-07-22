import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .bpb-track {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
    padding-bottom: 0.6rem;
  }

  .bpb-card {
    flex: 0 0 min(85%, 420px);
    scroll-snap-align: center;
    position: relative;
    border-radius: var(--section-radius, 24px);
    overflow: hidden;
    min-height: 220px;
    display: flex;
    align-items: flex-end;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 8px 24px rgba(194, 82, 127, 0.08);
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .bpb-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(194, 82, 127, 0.14);
  }

  .bpb-card__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .bpb-card__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(251, 245, 248, 0) 20%,
      rgba(251, 245, 248, 0.65) 55%,
      rgba(251, 245, 248, 0.92) 100%
    );
    pointer-events: none;
  }

  .bpb-card__body {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    padding: 1.25rem 1.4rem;
    width: 100%;
    box-sizing: border-box;
  }

  .bpb-card__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
    line-height: 1.3;
    color: var(--text-color, #000000);
  }

  .bpb-card__subtitle {
    margin: 0;
    font-size: 0.85rem;
    color: var(--muted-color, #666666);
    line-height: 1.5;
  }

  .bpb-card__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    gap: 0.4rem;
    margin-top: 0.4rem;
    min-height: 44px;
    padding: 0.65rem 1.25rem;
    border: 1.5px solid transparent;
    border-radius: 999px;
    background: var(--button-bg, var(--fs-store-primary));
    color: var(--button-color, #fff);
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.2;
    text-decoration: none;
    box-shadow: 0 6px 16px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
    transition: filter 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .bpb-card__cta:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
  }

  @media (max-width: 639px) {
    .bpb-track {
      flex-direction: column;
      overflow-x: visible;
      scroll-snap-type: none;
      gap: 0.85rem;
      padding-bottom: 0;
    }

    .bpb-card {
      flex: 1 1 auto;
      width: 100%;
      min-height: 180px;
      border-radius: 20px;
    }

    .bpb-card__body {
      padding: 1rem 1.1rem;
    }

    .bpb-card__title {
      font-size: 1rem;
    }
  }
`;
