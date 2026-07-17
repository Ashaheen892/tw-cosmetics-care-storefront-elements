import { css } from 'lit';

export const componentStyles = css`
  .brl-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 1.25rem;
  }

  .brl-tab {
    padding: 0.5rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }

  .brl-tab.is-active {
    background: var(--accent-color, #c2527f);
    border-color: var(--accent-color, #c2527f);
    color: #fff;
  }

  .brl-select {
    display: none;
    width: 100%;
    margin-bottom: 1.1rem;
    padding: 0.6rem 0.75rem;
    border-radius: 12px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 600;
  }

  .brl-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    margin-bottom: 1rem;
  }

  .brl-hint {
    color: var(--muted-color, #8f7a86);
    font-size: 0.84rem;
    margin: 0;
  }

  .brl-board {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .brl-board--horizontal {
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scroll-snap-type: x proximity;
  }
  .brl-board--horizontal .brl-step {
    flex: 0 0 min(80%, 320px);
    scroll-snap-align: start;
  }

  .brl-step {
    position: relative;
    display: flex;
    gap: 0.8rem;
    align-items: stretch;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-inline-start: 4px solid var(--step-color, var(--accent-color, #c2527f));
    border-radius: var(--brl-card-radius, 14px);
    padding: 0.7rem 0.85rem;
    box-shadow: 0 4px 14px rgba(43, 33, 28, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }

  .brl-step.is-dragging {
    opacity: 0.65;
    box-shadow: 0 18px 40px rgba(43, 33, 28, 0.2);
    transform: scale(1.01);
  }

  .brl-step__marker {
    flex: 0 0 auto;
    width: 2.4rem;
    height: 2.4rem;
    display: grid;
    place-items: center;
    align-self: center;
    border-radius: 50%;
    background: var(--step-color, var(--accent-color, #c2527f));
    color: #fff;
    font-weight: 800;
    font-size: 0.95rem;
  }

  .brl-step__marker .brl-icon { font-size: 1.05rem; }

  .brl-step__body { flex: 1 1 auto; min-width: 0; }

  .brl-step__title {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .brl-badge {
    font-size: 0.66rem;
    font-weight: 700;
    padding: 0.1rem 0.45rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 14%, var(--card-bg, #fff));
    color: var(--accent-color, #c2527f);
  }

  .brl-step__short {
    margin: 0.25rem 0 0;
    color: var(--muted-color, #8f7a86);
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .brl-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 0.8rem;
    margin-top: 0.5rem;
    font-size: 0.78rem;
    color: var(--muted-color, #8f7a86);
  }
  .brl-meta b { color: var(--text-color, #33232e); font-weight: 700; }

  .brl-step__long {
    margin: 0.55rem 0 0;
    padding-top: 0.55rem;
    border-top: 1px dashed var(--border-color, #f2dde7);
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text-color, #33232e);
  }

  .brl-step__note {
    margin-top: 0.4rem;
    font-size: 0.8rem;
    color: color-mix(in srgb, #8a5a00 65%, var(--text-color, #33232e));
  }

  .brl-step__toggle {
    flex: 0 0 auto;
    align-self: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid var(--border-color, #f2dde7);
    background: transparent;
    color: var(--accent-color, #c2527f);
    cursor: pointer;
    font-size: 0.85rem;
  }

  .brl-handles {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-self: center;
    flex: 0 0 auto;
  }

  .brl-handle {
    width: 30px;
    height: 26px;
    display: grid;
    place-items: center;
    border-radius: 8px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    cursor: pointer;
    font-size: 0.85rem;
    touch-action: none;
  }
  .brl-handle:disabled { opacity: 0.35; cursor: not-allowed; }
  .brl-handle--drag { cursor: grab; }
  .brl-handle--drag:active { cursor: grabbing; }

  .brl-step__result {
    flex: 0 0 auto;
    align-self: center;
    width: 26px;
    height: 26px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 0.9rem;
    font-weight: 800;
  }
  .brl-step__result--ok { background: color-mix(in srgb, var(--success-color, #2f9e63) 18%, #fff); color: var(--success-color, #2f9e63); }
  .brl-step__result--bad { background: color-mix(in srgb, var(--error-color, #cf4b4b) 16%, #fff); color: var(--error-color, #cf4b4b); }

  .brl-step.is-ok { border-inline-start-color: var(--success-color, #2f9e63); }
  .brl-step.is-bad { border-inline-start-color: var(--error-color, #cf4b4b); }

  /* Shape: layers — subtle stacked depth */
  .brl-board--layers .brl-step { backdrop-filter: none; }
  .brl-board--layers .brl-step:nth-child(odd) { background: color-mix(in srgb, var(--accent-color, #c2527f) 4%, var(--card-bg, #fff)); }

  /* Shape: stairs — ascending indentation */
  .brl-board--stairs .brl-step { width: auto; }
  .brl-board--stairs .brl-step:nth-child(2) { margin-inline-start: 1.5rem; }
  .brl-board--stairs .brl-step:nth-child(3) { margin-inline-start: 3rem; }
  .brl-board--stairs .brl-step:nth-child(4) { margin-inline-start: 4.5rem; }
  .brl-board--stairs .brl-step:nth-child(5) { margin-inline-start: 6rem; }
  .brl-board--stairs .brl-step:nth-child(n + 6) { margin-inline-start: 7.5rem; }

  /* Shape: drops / circles / bottles — marker variants */
  .brl-board--drops .brl-step__marker { border-radius: 50% 50% 50% 0; transform: rotate(45deg); }
  .brl-board--drops .brl-step__marker > * { transform: rotate(-45deg); }
  .brl-board--bottles .brl-step__marker { border-radius: 40% 40% 30% 30%; width: 2.1rem; height: 2.6rem; }
  .brl-board--circles .brl-step,
  .brl-board--path .brl-step { position: relative; }
  .brl-board--path .brl-step::before,
  .brl-board--circles .brl-step::before {
    content: '';
    position: absolute;
    inset-inline-start: calc(0.85rem + 1.2rem - 1px);
    top: -0.75rem;
    height: 0.75rem;
    width: 2px;
    background: var(--border-color, #f2dde7);
  }
  .brl-board--path .brl-step:first-child::before,
  .brl-board--circles .brl-step:first-child::before { display: none; }

  .brl-feedback {
    margin-top: 1.1rem;
    padding: 0.9rem 1rem;
    border-radius: 14px;
    text-align: center;
    font-weight: 700;
    border: 1px solid var(--border-color, #f2dde7);
  }
  .brl-feedback--win { background: color-mix(in srgb, var(--success-color, #2f9e63) 12%, var(--card-bg, #fff)); color: var(--success-color, #2f9e63); }
  .brl-feedback--retry { background: color-mix(in srgb, var(--error-color, #cf4b4b) 10%, var(--card-bg, #fff)); color: var(--error-color, #cf4b4b); }
  .brl-feedback__score { display: block; margin-top: 0.25rem; font-size: 0.85rem; color: var(--muted-color, #8f7a86); font-weight: 600; }

  .brl-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    justify-content: center;
    margin-top: 1.1rem;
  }

  .brl-sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  @media (max-width: 639px) {
    .brl-tabs { display: none; }
    .brl-select { display: block; }
    .brl-board--horizontal { flex-direction: column; }
    .brl-board--horizontal .brl-step { flex-basis: auto; }
    .brl-board--stairs .brl-step { margin-inline-start: 0 !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .brl-step { transition: none !important; }
  }
`;
