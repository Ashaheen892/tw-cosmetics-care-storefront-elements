import { css } from 'lit';

export const componentStyles = css`
  .bpa-shell {
    display: grid;
    gap: 1.35rem;
    align-items: start;
    max-width: 1080px;
    margin-inline: auto;
  }

  @media (min-width: 900px) {
    .bpa-shell {
      grid-template-columns: minmax(260px, 0.92fr) minmax(0, 1.18fr);
      gap: 1.75rem;
    }
  }

  /* —— Form card —— */
  .bpa-form-card {
    min-width: 0;
    padding: 1.15rem 1.15rem 1.25rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--card-bg, #fff) 90%, var(--section-bg, #fbf5f8));
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 90%, #fff);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.06);
  }

  .bpa-form-card__title {
    margin: 0 0 0.25rem;
    font-size: 1rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bpa-form-card__hint {
    margin: 0 0 1rem;
    font-size: 0.8rem;
    line-height: 1.55;
    color: var(--muted-color, #8f7a86);
  }

  .bpa-form {
    display: grid;
    gap: 1rem;
  }

  .bpa-field {
    display: grid;
    gap: 0.45rem;
  }

  .bpa-field label {
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bpa-input,
  .bpa-select {
    width: 100%;
    min-height: 46px;
    padding: 0.65rem 0.8rem;
    border-radius: 14px;
    border: 1.5px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .bpa-input:focus,
  .bpa-select:focus {
    outline: none;
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 55%, var(--border-color, #f2dde7));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color, #c2527f) 18%, transparent);
  }

  .bpa-cat-chips,
  .bpa-pao-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .bpa-cat-chip,
  .bpa-pao-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 44px;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    border: 1.5px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    transition:
      transform 0.15s ease,
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  .bpa-cat-chip:hover,
  .bpa-pao-chip:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 40%, var(--border-color, #f2dde7));
  }

  .bpa-cat-chip.is-active,
  .bpa-pao-chip.is-active {
    background: linear-gradient(
      135deg,
      var(--accent-color, #c2527f),
      color-mix(in srgb, var(--accent-color, #c2527f) 65%, #5a2f4d)
    );
    border-color: transparent;
    color: #fff;
    box-shadow: 0 8px 18px color-mix(in srgb, var(--accent-color, #c2527f) 28%, transparent);
  }

  .bpa-cat-chip__icon {
    font-size: 0.95rem;
    line-height: 1;
  }

  .bpa-cat-chip__months {
    font-size: 0.7rem;
    font-weight: 700;
    opacity: 0.85;
  }

  /* —— Result hero —— */
  .bpa-hero {
    min-width: 0;
    background: var(--card-bg, #fff);
    border: 1.5px solid color-mix(in srgb, var(--bpa-color, var(--accent-color, #c2527f)) 28%, var(--border-color, #f2dde7));
    border-radius: var(--section-radius, 20px);
    padding: 1.45rem 1.25rem 1.35rem;
    text-align: center;
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--bpa-color, var(--accent-color, #c2527f)) 12%, transparent),
      0 16px 36px rgba(120, 44, 82, 0.09);
  }

  .bpa-hero--safe {
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--bpa-color, #2f9e63) 14%, var(--card-bg, #fff)) 0%,
      var(--card-bg, #fff) 58%
    );
  }

  .bpa-hero--warn {
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--bpa-color, #e0a100) 16%, var(--card-bg, #fff)) 0%,
      var(--card-bg, #fff) 58%
    );
  }

  .bpa-hero--expired {
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--bpa-color, #cf4b4b) 16%, var(--card-bg, #fff)) 0%,
      var(--card-bg, #fff) 58%
    );
  }

  .bpa-hero--empty {
    border-style: dashed;
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 22%, var(--border-color, #f2dde7));
    box-shadow: none;
    background:
      radial-gradient(
        80% 70% at 50% 0%,
        color-mix(in srgb, var(--accent-color, #c2527f) 8%, transparent),
        transparent 70%
      ),
      color-mix(in srgb, var(--section-bg, #fbf5f8) 55%, var(--card-bg, #fff));
  }

  .bpa-hero__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
    padding: 2.4rem 1rem;
    color: var(--muted-color, #8f7a86);
    font-size: 0.92rem;
    line-height: 1.65;
  }

  .bpa-hero__placeholder p {
    margin: 0;
    max-width: 22rem;
  }

  .bpa-hero__placeholder-icon {
    width: 3.5rem;
    height: 3.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 1.55rem;
    color: var(--accent-color, #c2527f);
    background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
    border: 1px dashed color-mix(in srgb, var(--accent-color, #c2527f) 40%, transparent);
  }

  .bpa-error {
    padding: 0.85rem 1rem;
    border-radius: 14px;
    background: color-mix(in srgb, #cf4b4b 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, #cf4b4b 35%, transparent);
    color: color-mix(in srgb, #cf4b4b 80%, #000);
    font-size: 0.88rem;
    font-weight: 600;
    line-height: 1.55;
  }

  .bpa-dial {
    position: relative;
    width: min(230px, 68vw);
    height: min(230px, 68vw);
    margin: 0.15rem auto 1.15rem;
  }

  .bpa-dial svg {
    transform: rotate(-90deg);
    width: 100%;
    height: 100%;
  }

  .bpa-dial__track {
    fill: none;
    stroke: color-mix(in srgb, var(--border-color, #f2dde7) 75%, transparent);
    stroke-width: 13;
  }

  .bpa-dial__value {
    fill: none;
    stroke: var(--bpa-color, var(--accent-color, #c2527f));
    stroke-width: 13;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.65s ease, stroke 0.3s ease;
  }

  .bpa-dial__center {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    text-align: center;
  }

  .bpa-dial__days {
    font-size: clamp(2.35rem, 8vw, 3.1rem);
    font-weight: 800;
    line-height: 1;
    color: var(--bpa-color, var(--text-color, #33232e));
    letter-spacing: -0.02em;
  }

  .bpa-dial__unit {
    font-size: 0.84rem;
    color: var(--muted-color, #8f7a86);
    margin-top: 0.3rem;
    font-weight: 700;
  }

  .bpa-state {
    display: inline-block;
    padding: 0.45rem 1.1rem;
    border-radius: 999px;
    font-weight: 800;
    font-size: 0.9rem;
    margin-bottom: 1.1rem;
    background: color-mix(in srgb, var(--bpa-color, var(--accent-color, #c2527f)) 16%, var(--card-bg, #fff));
    color: var(--bpa-color, var(--accent-color, #c2527f));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--bpa-color, var(--accent-color, #c2527f)) 22%, transparent);
  }

  .bpa-dates {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.55rem;
    margin: 0 0 1.05rem;
    text-align: start;
  }

  .bpa-date-cell {
    padding: 0.75rem 0.65rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--bpa-color, var(--accent-color, #c2527f)) 6%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--bpa-color, var(--border-color, #f2dde7)) 18%, var(--border-color, #f2dde7));
  }

  .bpa-date-cell span {
    display: block;
    font-size: 0.7rem;
    color: var(--muted-color, #8f7a86);
    margin-bottom: 0.25rem;
    font-weight: 700;
  }

  .bpa-date-cell b {
    font-size: 0.84rem;
    color: var(--text-color, #33232e);
    font-weight: 800;
    line-height: 1.35;
  }

  .bpa-tips-grid {
    display: grid;
    gap: 0.55rem;
    margin-bottom: 0.9rem;
    text-align: start;
  }

  @media (min-width: 560px) {
    .bpa-tips-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .bpa-tips {
    padding: 0.8rem 0.9rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 7%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, #c2527f) 14%, var(--border-color, #f2dde7));
    font-size: 0.84rem;
    line-height: 1.6;
    color: var(--text-color, #33232e);
  }

  .bpa-tips h4 {
    margin: 0 0 0.35rem;
    font-size: 0.76rem;
    font-weight: 800;
    color: var(--accent-color, #c2527f);
  }

  .bpa-tips p {
    margin: 0;
    color: var(--muted-color, #8f7a86);
    white-space: pre-line;
  }

  .bpa-result-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    justify-content: center;
    margin-top: 0.15rem;
  }

  .bpa-notice {
    max-width: 1080px;
    margin: 1.25rem auto 0;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.65;
    text-align: center;
  }

  /* —— Saved records —— */
  .bpa-saved {
    max-width: 1080px;
    margin: 1.6rem auto 0;
    padding: 1.15rem;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 90%, #fff);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.05);
  }

  .bpa-saved__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
    margin-bottom: 0.45rem;
  }

  .bpa-saved__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 800;
  }

  .bpa-saved__note {
    font-size: 0.76rem;
    color: var(--muted-color, #8f7a86);
    margin: 0 0 0.9rem;
    line-height: 1.55;
  }

  .bpa-saved__empty {
    padding: 1.4rem 1rem;
    text-align: center;
    border-radius: 14px;
    border: 1px dashed color-mix(in srgb, var(--accent-color, #c2527f) 25%, var(--border-color, #f2dde7));
    background: color-mix(in srgb, var(--section-bg, #fbf5f8) 55%, var(--card-bg, #fff));
    color: var(--muted-color, #8f7a86);
    font-size: 0.88rem;
  }

  .bpa-records {
    display: grid;
    gap: 0.65rem;
  }

  .bpa-record {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 0.9rem 0.95rem;
    border: 1px solid color-mix(in srgb, var(--rec-color, var(--border-color, #f2dde7)) 32%, var(--border-color, #f2dde7));
    border-inline-start: 4px solid var(--rec-color, var(--border-color, #f2dde7));
    border-radius: 16px;
    background: color-mix(in srgb, var(--rec-color, transparent) 4%, var(--card-bg, #fff));
    box-shadow: 0 4px 14px rgba(43, 33, 28, 0.04);
  }

  .bpa-record__status {
    position: relative;
    flex: 0 0 auto;
    width: 2.9rem;
    height: 2.9rem;
    display: grid;
    place-items: center;
  }

  .bpa-record__ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 3px solid color-mix(in srgb, var(--rec-color, var(--border-color, #f2dde7)) 32%, transparent);
    background: color-mix(in srgb, var(--rec-color, var(--border-color, #f2dde7)) 12%, var(--card-bg, #fff));
  }

  .bpa-record__days {
    position: relative;
    font-size: 0.74rem;
    font-weight: 800;
    color: var(--rec-color, var(--text-color, #33232e));
    line-height: 1;
  }

  .bpa-record__body {
    flex: 1 1 auto;
    min-width: 0;
  }

  .bpa-record__name {
    font-weight: 800;
    font-size: 0.92rem;
    color: var(--text-color, #33232e);
    margin-bottom: 0.3rem;
  }

  .bpa-record__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem 0.5rem;
    font-size: 0.74rem;
    color: var(--muted-color, #8f7a86);
  }

  .bpa-record__pill {
    display: inline-block;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    font-size: 0.68rem;
    font-weight: 800;
    background: color-mix(in srgb, var(--rec-color, var(--border-color, #f2dde7)) 16%, var(--card-bg, #fff));
    color: var(--rec-color, var(--text-color, #33232e));
  }

  .bpa-record__note {
    margin: 0.4rem 0 0;
    font-size: 0.76rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.45;
  }

  .bpa-record__actions {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    flex: 0 0 auto;
  }

  .bpa-record__edit {
    width: 100%;
    min-height: 40px;
    padding: 0.4rem 0.55rem;
    border-radius: 10px;
    border: 1.5px solid var(--border-color, #f2dde7);
    font: inherit;
    box-sizing: border-box;
  }

  .bpa-icon-btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--muted-color, #8f7a86);
    cursor: pointer;
    flex: 0 0 auto;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .bpa-icon-btn:hover {
    color: var(--accent-color, #c2527f);
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 40%, var(--border-color, #f2dde7));
  }

  @media (max-width: 639px) {
    .bpa-dates {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bpa-dial__value,
    .bpa-cat-chip,
    .bpa-pao-chip {
      transition: none !important;
    }
  }
`;
