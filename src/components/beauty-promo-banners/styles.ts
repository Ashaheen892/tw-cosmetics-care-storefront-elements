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
    background: linear-gradient(135deg, #fdeef5, #f9e4ed);
    border: 1px solid var(--border-color, #f2dde7);
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
    color: var(--text-color, #33232e);
  }

  .bpb-card__subtitle {
    margin: 0;
    font-size: 0.85rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.5;
  }

  .bpb-card__cta {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 0.35rem;
    margin-top: 0.4rem;
    padding: 0.5rem 1.1rem;
    border-radius: 999px;
    background: var(--accent-color, #c2527f);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(194, 82, 127, 0.22);
    transition: filter 0.2s ease;
  }

  .bpb-card__cta:hover {
    filter: brightness(1.08);
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
