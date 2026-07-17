import { css } from 'lit';

export const componentStyles = css`
  .bpa-grid {
    display: grid;
    gap: 1.5rem;
    align-items: start;
  }

  @media (min-width: 820px) {
    .bpa-grid {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
      gap: 2rem;
    }
  }

  .bpa-form {
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: var(--section-radius, 16px);
    padding: 1.15rem 1.15rem 1.25rem;
    display: grid;
    gap: 0.9rem;
  }

  .bpa-field { display: grid; gap: 0.35rem; }
  .bpa-field label { font-size: 0.82rem; font-weight: 700; color: var(--text-color, #33232e); }

  .bpa-input,
  .bpa-select {
    width: 100%;
    padding: 0.6rem 0.7rem;
    border-radius: 12px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    box-sizing: border-box;
  }

  .bpa-pao-chips { display: flex; flex-wrap: wrap; gap: 0.45rem; }
  .bpa-pao-chip {
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
  }
  .bpa-pao-chip.is-active {
    background: var(--accent-color, #c2527f);
    border-color: var(--accent-color, #c2527f);
    color: #fff;
  }

  .bpa-error {
    padding: 0.6rem 0.8rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--bpa-expired, #cf4b4b) 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--bpa-expired, #cf4b4b) 40%, transparent);
    color: color-mix(in srgb, var(--bpa-expired, #cf4b4b) 75%, #000);
    font-size: 0.84rem;
    font-weight: 600;
  }

  /* result */
  .bpa-result {
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: var(--section-radius, 16px);
    padding: 1.25rem;
    text-align: center;
  }

  .bpa-dial {
    position: relative;
    width: 190px;
    height: 190px;
    margin: 0 auto 1rem;
  }
  .bpa-dial svg { transform: rotate(-90deg); width: 100%; height: 100%; }
  .bpa-dial__track { fill: none; stroke: color-mix(in srgb, var(--border-color, #f2dde7) 70%, transparent); stroke-width: 12; }
  .bpa-dial__value { fill: none; stroke: var(--bpa-color, var(--accent-color, #c2527f)); stroke-width: 12; stroke-linecap: round; transition: stroke-dashoffset 0.6s ease, stroke 0.3s ease; }
  .bpa-dial__center {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    text-align: center;
  }
  .bpa-dial__days { font-size: 1.9rem; font-weight: 800; line-height: 1; color: var(--text-color, #33232e); }
  .bpa-dial__unit { font-size: 0.78rem; color: var(--muted-color, #8f7a86); margin-top: 0.2rem; }

  .bpa-state {
    display: inline-block;
    padding: 0.3rem 0.9rem;
    border-radius: 999px;
    font-weight: 800;
    font-size: 0.85rem;
    margin-bottom: 0.85rem;
    background: color-mix(in srgb, var(--bpa-color, var(--accent-color, #c2527f)) 15%, var(--card-bg, #fff));
    color: var(--bpa-color, var(--accent-color, #c2527f));
  }

  .bpa-dates {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin: 0.5rem 0 1rem;
  }
  .bpa-date-cell {
    padding: 0.6rem 0.4rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 30%, var(--card-bg, #fff));
  }
  .bpa-date-cell span { display: block; font-size: 0.72rem; color: var(--muted-color, #8f7a86); margin-bottom: 0.2rem; }
  .bpa-date-cell b { font-size: 0.82rem; color: var(--text-color, #33232e); }

  .bpa-tips {
    text-align: start;
    margin: 0.75rem 0;
    padding: 0.75rem 0.85rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 6%, var(--card-bg, #fff));
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text-color, #33232e);
  }
  .bpa-tips h4 { margin: 0 0 0.3rem; font-size: 0.8rem; }
  .bpa-tips p { margin: 0; color: var(--muted-color, #8f7a86); white-space: pre-line; }

  .bpa-result-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-top: 0.5rem; }

  .bpa-notice {
    margin-top: 1rem;
    font-size: 0.78rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
    text-align: center;
  }

  /* saved records */
  .bpa-saved { margin-top: 1.5rem; }
  .bpa-saved__head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.6rem; }
  .bpa-saved__title { margin: 0; font-size: 0.95rem; font-weight: 800; }
  .bpa-saved__note { font-size: 0.74rem; color: var(--muted-color, #8f7a86); margin: 0 0 0.6rem; }

  .bpa-record {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 0.7rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: 12px;
    margin-bottom: 0.5rem;
    background: var(--card-bg, #fff);
  }
  .bpa-record__dot { width: 0.7rem; height: 0.7rem; border-radius: 50%; flex: 0 0 auto; }
  .bpa-record__info { flex: 1 1 auto; min-width: 0; }
  .bpa-record__name { font-weight: 700; font-size: 0.86rem; color: var(--text-color, #33232e); }
  .bpa-record__meta { font-size: 0.74rem; color: var(--muted-color, #8f7a86); }
  .bpa-record__edit {
    flex: 1 1 auto;
    padding: 0.35rem 0.5rem;
    border-radius: 8px;
    border: 1px solid var(--border-color, #f2dde7);
    font: inherit;
  }
  .bpa-icon-btn {
    width: 32px; height: 32px;
    display: grid; place-items: center;
    border-radius: 8px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--muted-color, #8f7a86);
    cursor: pointer;
    flex: 0 0 auto;
  }
  .bpa-icon-btn:hover { color: var(--accent-color, #c2527f); }

  @media (max-width: 639px) {
    .bpa-dial { width: 160px; height: 160px; }
    .bpa-dates { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .bpa-dial__value { transition: none !important; }
  }
`;
