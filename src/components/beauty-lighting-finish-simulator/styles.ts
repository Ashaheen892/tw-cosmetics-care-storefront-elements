import { css } from 'lit';

export const componentStyles = css`
  .bls-wrap {
    max-width: 760px;
    margin-inline: auto;
  }

  .bls-stage {
    position: relative;
    width: 100%;
    aspect-ratio: var(--bls-aspect, 4 / 5);
    border-radius: var(--section-radius, 16px);
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 45%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #f2dde7);
    box-shadow: 0 10px 30px rgba(43, 33, 28, 0.08);
  }

  .bls-pic {
    position: absolute;
    inset: 0;
    display: block;
  }
  .bls-pic > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .bls-pic--empty {
    background: color-mix(in srgb, var(--border-color, #f2dde7) 45%, var(--card-bg, #fff));
  }

  /* eager-preload fade stack */
  .bls-layer { opacity: 0; }
  .bls-layer.is-on { opacity: 1; }
  .bls-stage--fade .bls-layer { transition: opacity var(--bls-speed, 0.4s) ease; }

  .bls-empty {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    text-align: center;
    padding: 1.5rem;
    color: var(--muted-color, #8f7a86);
    font-size: 0.9rem;
  }

  .bls-caption {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    padding: 1.5rem 1rem 0.85rem;
    background: linear-gradient(180deg, transparent, rgba(20, 14, 12, 0.72));
    color: #fff;
    font-size: 0.82rem;
    line-height: 1.5;
  }
  .bls-caption b { font-weight: 800; }

  /* control chips */
  .bls-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 1rem;
  }

  .bls-controls__label {
    width: 100%;
    text-align: center;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
    margin-bottom: -0.1rem;
  }

  .bls-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }
  .bls-chip.is-active {
    background: var(--bls-active, var(--accent-color, #c2527f));
    border-color: var(--bls-active, var(--accent-color, #c2527f));
    color: #fff;
  }

  .bls-panel {
    margin-top: 1rem;
    display: grid;
    gap: 0.85rem;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: var(--section-radius, 16px);
    padding: 1rem 1.1rem;
  }

  .bls-desc { margin: 0; color: var(--text-color, #33232e); line-height: 1.65; font-size: 0.92rem; }
  .bls-color-effect { margin: 0; color: var(--muted-color, #8f7a86); font-size: 0.85rem; }

  .bls-indicators { display: grid; gap: 0.55rem; }
  .bls-indicator { display: grid; grid-template-columns: 7rem 1fr auto; align-items: center; gap: 0.6rem; font-size: 0.8rem; }
  .bls-indicator__label { color: var(--muted-color, #8f7a86); font-weight: 700; }
  .bls-indicator__val { color: var(--accent-color, #c2527f); font-weight: 800; font-variant-numeric: tabular-nums; }

  .bls-palette { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .bls-swatch {
    width: 1.9rem;
    height: 1.9rem;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
  }

  .bls-note {
    margin: 0;
    font-size: 0.82rem;
    color: color-mix(in srgb, #8a5a00 65%, var(--text-color, #33232e));
  }

  .bls-link { align-self: start; }

  /* compare */
  .bls-compare-picks { display: grid; gap: 0.75rem; grid-template-columns: 1fr 1fr; margin-top: 1rem; }
  .bls-compare-picks label { font-size: 0.76rem; font-weight: 700; color: var(--muted-color, #8f7a86); display: block; margin-bottom: 0.25rem; }
  .bls-compare-picks select {
    width: 100%;
    padding: 0.5rem 0.6rem;
    border-radius: 10px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 600;
  }

  .bls-cmp-side { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
  .bls-cmp-side .bls-stage { aspect-ratio: var(--bls-aspect, 4 / 5); }

  .bls-cmp-slider { position: relative; }
  .bls-cmp-slider .bls-img--overlay {
    clip-path: inset(0 calc(100% - var(--bls-pos, 50%)) 0 0);
  }
  :host-context([dir='rtl']) .bls-cmp-slider .bls-img--overlay,
  :host([dir='rtl']) .bls-cmp-slider .bls-img--overlay {
    clip-path: inset(0 0 0 calc(100% - var(--bls-pos, 50%)));
  }
  .bls-cmp-handle {
    position: absolute;
    top: 0;
    bottom: 0;
    inset-inline-start: var(--bls-pos, 50%);
    width: 2px;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
    cursor: ew-resize;
    touch-action: none;
  }
  .bls-cmp-handle::after {
    content: '⇆';
    position: absolute;
    top: 50%;
    inset-inline-start: 50%;
    transform: translate(-50%, -50%);
    width: 2.1rem;
    height: 2.1rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #fff;
    color: #33232e;
    font-size: 0.9rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  }

  .bls-cmp-split .bls-img--overlay { clip-path: inset(0 0 0 50%); }
  :host-context([dir='rtl']) .bls-cmp-split .bls-img--overlay,
  :host([dir='rtl']) .bls-cmp-split .bls-img--overlay { clip-path: inset(0 50% 0 0); }
  .bls-cmp-split::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    inset-inline-start: 50%;
    width: 2px;
    background: #fff;
  }

  .bls-cmp-tag {
    position: absolute;
    top: 0.6rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: rgba(20, 14, 12, 0.6);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    z-index: 2;
  }
  .bls-cmp-tag--a { inset-inline-start: 0.6rem; }
  .bls-cmp-tag--b { inset-inline-end: 0.6rem; }

  @media (max-width: 639px) {
    .bls-indicator { grid-template-columns: 5.5rem 1fr auto; }
    .bls-cmp-side { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .bls-stage--fade .bls-img { transition: none !important; }
  }
`;
