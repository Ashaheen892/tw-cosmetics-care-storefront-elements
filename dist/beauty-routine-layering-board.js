var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, g as getRadioValue, j as toNumber, i as isTruthy, e as extractImageUrl, s as sharedSectionCss, t, r as readSectionTheme, p as prefersReducedMotion, o as getPageLocale, c as getUnitValue, a as themeStyleMap } from "./sharedStyles-Bu7Tok5Z.js";
import { r as renderCommerceCtaButton } from "./commerceOutcome-BLJKzvei.js";
const componentStyles = css`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .brl-shell {
    width: 100%;
    max-width: 860px;
    margin-inline: auto;
    display: grid;
    gap: 1rem;
  }

  .brl-switcher {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 860px;
    margin: 0 auto 1.15rem;
    display: grid;
    gap: 0.65rem;
    justify-items: center;
  }

  .brl-tabs {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    justify-content: center;
    align-items: center;
    padding: 0.3rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 88%, #fff);
    box-sizing: border-box;
  }

  .brl-tab {
    position: relative;
    z-index: 1;
    min-height: 2.25rem;
    min-width: 0;
    margin: 0;
    padding: 0.45rem 1.05rem;
    border-radius: 999px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 700;
    font-size: 0.84rem;
    line-height: 1.2;
    cursor: pointer;
    white-space: nowrap;
    box-sizing: border-box;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .brl-tab:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
  }

  .brl-tab.is-active {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    border-color: transparent;
    color: #fff;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
  }

  .brl-select-wrap {
    display: none;
    width: 100%;
  }

  .brl-select {
    display: block;
    width: 100%;
    padding: 0.7rem 0.85rem;
    border-radius: 14px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 600;
    box-sizing: border-box;
  }

  .brl-intro {
    display: grid;
    gap: 0.45rem;
    padding: 0.95rem 1.05rem;
    border-radius: var(--section-radius, 18px);
    background:
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff)),
        var(--card-bg, #fff)
      );
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, var(--border-color, #e5e7eb));
    box-shadow: 0 8px 22px rgba(120, 44, 82, 0.05);
  }

  .brl-intro__title {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .brl-intro__text {
    margin: 0;
    font-size: 0.84rem;
    line-height: 1.55;
    color: var(--muted-color, #666666);
  }

  .brl-intro__row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 0.15rem;
  }

  .brl-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    min-height: 30px;
    padding: 0.2rem 0.7rem;
    border-radius: 999px;
    font-size: 0.74rem;
    font-weight: 700;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, transparent);
  }

  .brl-progress {
    display: grid;
    gap: 0.35rem;
  }

  .brl-progress__bar {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, #fff);
    overflow: hidden;
  }

  .brl-progress__bar span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--accent-color, var(--fs-store-primary));
    transition: width 0.3s ease;
  }

  .brl-progress__text {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
    text-align: center;
  }

  .brl-board {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    padding: 0.85rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--section-bg, transparent) 55%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 85%, #fff);
  }

  .brl-board--horizontal {
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.75rem;
    scroll-snap-type: x proximity;
    -webkit-overflow-scrolling: touch;
  }

  .brl-board--horizontal .brl-step {
    flex: 0 0 min(82%, 300px);
    scroll-snap-align: start;
  }

  .brl-step {
    position: relative;
    display: grid;
    grid-template-columns: auto auto minmax(0, 1fr) auto;
    gap: 0.65rem 0.75rem;
    align-items: center;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    border-inline-start: 4px solid var(--step-color, var(--accent-color, var(--fs-store-primary)));
    border-radius: var(--brl-card-radius, 16px);
    padding: 0.85rem 0.95rem;
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, transparent),
      0 8px 20px rgba(120, 44, 82, 0.05);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .brl-step--quiz {
    grid-template-columns: auto auto auto minmax(0, 1fr) auto;
  }

  .brl-step--quiz:not(.has-result) {
    grid-template-columns: auto auto auto minmax(0, 1fr);
  }

  .brl-step--quiz.is-revealed {
    grid-template-columns: auto auto minmax(0, 1fr) auto;
  }

  .brl-step--quiz.is-revealed:not(.has-result) {
    grid-template-columns: auto auto minmax(0, 1fr);
  }

  .brl-step--guide:not(.has-toggle) {
    grid-template-columns: auto auto minmax(0, 1fr);
  }

  .brl-step.is-dragging {
    opacity: 0.72;
    box-shadow: 0 18px 40px rgba(43, 33, 28, 0.18);
    transform: scale(1.015);
    z-index: 2;
  }

  .brl-step.is-over {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent),
      0 10px 24px rgba(120, 44, 82, 0.08);
  }

  .brl-step__index {
    flex: 0 0 auto;
    align-self: center;
    min-width: 1.7rem;
    height: 1.7rem;
    padding: 0 0.35rem;
    display: grid;
    place-items: center;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 800;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
  }

  .brl-step__marker {
    flex: 0 0 auto;
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    align-self: center;
    border-radius: 50%;
    background: var(--step-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-weight: 800;
    font-size: 0.95rem;
    box-shadow: 0 6px 14px color-mix(in srgb, var(--step-color, var(--accent-color, var(--fs-store-primary))) 28%, transparent);
  }

  .brl-step__thumb {
    flex: 0 0 auto;
    width: 3rem;
    height: 3rem;
    align-self: center;
    object-fit: cover;
    border-radius: 12px;
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
    background: color-mix(in srgb, var(--step-color, var(--accent-color, var(--fs-store-primary))) 12%, #fff);
  }

  .brl-step__marker .brl-icon {
    font-size: 1.05rem;
  }

  .brl-step__body {
    flex: 1 1 auto;
    min-width: 0;
    display: grid;
    gap: 0.25rem;
    align-content: center;
  }

  .brl-step__title {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    line-height: 1.35;
  }

  .brl-step__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-top: 0.15rem;
  }

  .brl-badge {
    font-size: 0.66rem;
    font-weight: 700;
    padding: 0.12rem 0.5rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent);
    line-height: 1.2;
  }

  .brl-step__short {
    margin: 0;
    color: var(--muted-color, #666666);
    font-size: 0.84rem;
    line-height: 1.5;
  }

  .brl-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 0.7rem;
    margin-top: 0.2rem;
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
  }

  .brl-meta b {
    color: var(--text-color, #000000);
    font-weight: 700;
  }

  .brl-step__long {
    margin: 0.45rem 0 0;
    padding-top: 0.55rem;
    border-top: 1px dashed var(--border-color, #e5e7eb);
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text-color, #000000);
  }

  .brl-step__note {
    margin: 0.35rem 0 0;
    padding: 0.45rem 0.6rem;
    border-radius: 10px;
    font-size: 0.8rem;
    line-height: 1.5;
    background: color-mix(in srgb, #e0a100 12%, var(--card-bg, #fff));
    color: color-mix(in srgb, var(--fs-caution, #e0a100) 45%, var(--text-color, #000000));
  }

  .brl-step__toggle {
    flex: 0 0 auto;
    align-self: center;
    justify-self: end;
    width: 2rem;
    height: 2rem;
    min-width: 2rem;
    min-height: 2rem;
    padding: 0;
    border-radius: 50%;
    border: 1px solid var(--border-color, #e5e7eb);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
    color: var(--accent-color, var(--fs-store-primary));
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .brl-step__toggle:hover,
  .brl-step__toggle[aria-expanded='true'] {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #e5e7eb));
  }

  .brl-handles {
    display: flex;
    flex-direction: column;
    gap: 0.28rem;
    align-self: center;
    justify-self: start;
    flex: 0 0 auto;
  }

  .brl-handle {
    width: 32px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    cursor: pointer;
    font-size: 0.8rem;
    touch-action: none;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .brl-handle:hover:not(:disabled) {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
    color: var(--accent-color, var(--fs-store-primary));
  }

  .brl-handle:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .brl-handle--drag {
    width: auto;
    min-width: 2.75rem;
    height: auto;
    min-height: 3rem;
    padding: 0.4rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    cursor: grab;
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #e5e7eb));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
  }

  .brl-handle--drag:active {
    cursor: grabbing;
  }

  .brl-handle__grip {
    font-size: 1.05rem;
    line-height: 1;
    animation: brl-grip-nudge 2.4s ease-in-out infinite;
  }

  .brl-handle__label {
    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    line-height: 1;
  }

  @keyframes brl-grip-nudge {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  .brl-step__result {
    flex: 0 0 auto;
    align-self: center;
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 0.9rem;
    font-weight: 800;
  }

  .brl-step__result--ok {
    background: color-mix(in srgb, var(--success-color, #2f9e63) 18%, #fff);
    color: var(--success-color, #2f9e63);
  }

  .brl-step__result--bad {
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 16%, #fff);
    color: var(--error-color, #cf4b4b);
  }

  .brl-step.is-ok {
    border-inline-start-color: var(--success-color, #2f9e63);
    background: color-mix(in srgb, var(--success-color, #2f9e63) 6%, var(--card-bg, #fff));
  }

  .brl-step.is-bad {
    border-inline-start-color: var(--error-color, #cf4b4b);
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 5%, var(--card-bg, #fff));
  }

  .brl-board--layers .brl-step:nth-child(odd) {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 3.5%, var(--card-bg, #fff));
  }

  .brl-board--stairs .brl-step:nth-child(2) {
    margin-inline-start: 1.25rem;
  }
  .brl-board--stairs .brl-step:nth-child(3) {
    margin-inline-start: 2.5rem;
  }
  .brl-board--stairs .brl-step:nth-child(4) {
    margin-inline-start: 3.75rem;
  }
  .brl-board--stairs .brl-step:nth-child(5) {
    margin-inline-start: 5rem;
  }
  .brl-board--stairs .brl-step:nth-child(n + 6) {
    margin-inline-start: 6.25rem;
  }

  .brl-board--drops .brl-step__marker {
    border-radius: 50% 50% 50% 0;
    transform: rotate(45deg);
  }
  .brl-board--drops .brl-step__marker > * {
    transform: rotate(-45deg);
  }
  .brl-board--bottles .brl-step__marker {
    border-radius: 40% 40% 30% 30%;
    width: 2.1rem;
    height: 2.6rem;
  }

  .brl-board--path .brl-step::before,
  .brl-board--circles .brl-step::before {
    content: '';
    position: absolute;
    inset-inline-start: calc(0.9rem + 1.25rem - 1px);
    top: -0.7rem;
    height: 0.7rem;
    width: 2px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, var(--border-color, #e5e7eb));
  }
  .brl-board--path .brl-step:first-child::before,
  .brl-board--circles .brl-step:first-child::before {
    display: none;
  }

  .brl-feedback {
    padding: 1rem 1.1rem;
    border-radius: 16px;
    text-align: center;
    font-weight: 700;
    border: 1.5px solid var(--border-color, #e5e7eb);
    display: grid;
    gap: 0.35rem;
    justify-items: center;
  }

  .brl-feedback__icon {
    width: 2.2rem;
    height: 2.2rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 1.1rem;
    font-weight: 800;
  }

  .brl-feedback__msg {
    font-size: 0.95rem;
    line-height: 1.45;
  }

  .brl-feedback--win {
    background: color-mix(in srgb, var(--success-color, #2f9e63) 12%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--success-color, #2f9e63) 45%, var(--border-color, #e5e7eb));
    color: var(--success-color, #2f9e63);
  }

  .brl-feedback--win .brl-feedback__icon {
    background: color-mix(in srgb, var(--success-color, #2f9e63) 20%, #fff);
  }

  .brl-feedback--retry {
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 10%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--error-color, #cf4b4b) 40%, var(--border-color, #e5e7eb));
    color: var(--error-color, #cf4b4b);
  }

  .brl-feedback--retry .brl-feedback__icon {
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 18%, #fff);
  }

  .brl-feedback__score {
    display: block;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
    font-weight: 600;
  }

  .brl-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    justify-content: center;
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
    .brl-switcher {
      margin-bottom: 1rem;
    }

    .brl-tabs {
      display: none;
    }

    .brl-select-wrap {
      display: block;
    }

    .brl-board--horizontal {
      flex-direction: column;
    }
    .brl-board--horizontal .brl-step {
      flex-basis: auto;
    }
    .brl-board--stairs .brl-step {
      margin-inline-start: 0 !important;
    }
    .brl-board {
      padding: 0.65rem;
    }
    .brl-step {
      padding: 0.7rem 0.75rem;
      gap: 0.45rem 0.55rem;
      grid-template-columns: auto minmax(0, 1fr) auto;
    }

    .brl-step--guide:not(.has-toggle) {
      grid-template-columns: auto minmax(0, 1fr);
    }

    .brl-step--quiz,
    .brl-step--quiz:not(.has-result) {
      grid-template-columns: auto auto minmax(0, 1fr);
    }

    .brl-step--quiz.has-result {
      grid-template-columns: auto auto minmax(0, 1fr) auto;
    }

    .brl-step--quiz.is-revealed {
      grid-template-columns: auto minmax(0, 1fr) auto;
    }

    .brl-step--quiz.is-revealed:not(.has-result) {
      grid-template-columns: auto minmax(0, 1fr);
    }

    .brl-step__index {
      display: none;
    }

    .brl-step__thumb {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 10px;
    }

    .brl-step__marker {
      width: 2.2rem;
      height: 2.2rem;
      font-size: 0.85rem;
    }

    .brl-step__title {
      font-size: 0.9rem;
    }

    .brl-step__short {
      font-size: 0.78rem;
    }

    .brl-handles {
      gap: 0.2rem;
    }

    .brl-handle {
      width: 28px;
      height: 26px;
      font-size: 0.72rem;
    }

    .brl-handle--drag {
      min-width: 2.35rem;
      min-height: 2.5rem;
      padding: 0.3rem 0.35rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .brl-step,
    .brl-tab,
    .brl-progress__bar span {
      transition: none !important;
    }
    .brl-handle__grip {
      animation: none;
    }
  }
`, SHAPES = ["layers", "drops", "bottles", "stairs", "path", "circles"], PERIODS = ["morning", "evening", "both"];
function parseSteps(raw) {
  return normalizeCollection(raw).map((s, i) => {
    const period = getRadioValue(s.period, "both");
    return {
      id: String(s.id ?? s.step_id ?? "").trim() || `step-${i + 1}`,
      title: localizedString(s.step_title),
      icon: String(s.icon ?? "").trim(),
      image: extractImageUrl(s.image),
      descShort: localizedString(s.desc_short),
      descLong: localizedString(s.desc_long),
      timing: localizedString(s.timing),
      wait: localizedString(s.wait),
      amount: localizedString(s.amount),
      note: localizedString(s.note),
      color: String(s.color ?? "").trim(),
      optional: isTruthy(s.optional, !1),
      period: PERIODS.includes(period) ? period : "both",
      correctOrder: toNumber(s.correct_order, i + 1)
    };
  }).filter((s) => s.title);
}
__name(parseSteps, "parseSteps");
function parseRoutines(raw) {
  return normalizeCollection(raw).map((r, i) => ({
    id: String(r.id ?? r.routine_id ?? "").trim() || `routine-${i + 1}`,
    name: localizedString(r.name) || `${i + 1}`,
    steps: parseSteps(r.steps)
  })).filter((r) => r.steps.length);
}
__name(parseRoutines, "parseRoutines");
function sortedByCorrect(steps) {
  return [...steps].sort((a, b) => a.correctOrder - b.correctOrder);
}
__name(sortedByCorrect, "sortedByCorrect");
function shuffleOrder(steps) {
  const ids = steps.map((s) => s.id);
  if (ids.length < 2) return ids;
  const correct = sortedByCorrect(steps).map((s) => s.id);
  let out = [...ids];
  for (let attempt = 0; attempt < 6; attempt += 1) {
    for (let i = out.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    if (out.some((id, idx) => id !== correct[idx])) return out;
  }
  return out = [...correct.slice(1), correct[0]], out;
}
__name(shuffleOrder, "shuffleOrder");
function resolveMode(config) {
  return getRadioValue(config.brl_mode, "guide") === "quiz" ? "quiz" : "guide";
}
__name(resolveMode, "resolveMode");
function resolveShape(config) {
  const value = getRadioValue(config.brl_shape, "layers");
  return SHAPES.includes(value) ? value : "layers";
}
__name(resolveShape, "resolveShape");
function resolveDirection(config) {
  return getRadioValue(config.brl_direction, "vertical") === "horizontal" ? "horizontal" : "vertical";
}
__name(resolveDirection, "resolveDirection");
function periodLabel(period, locale) {
  return {
    morning: ["صباحي", "Morning"],
    evening: ["مسائي", "Evening"],
    both: ["صباحي ومسائي", "AM / PM"]
  }[period][locale === "en" ? 1 : 0];
}
__name(periodLabel, "periodLabel");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _BeautyRoutineLayeringBoard = class _BeautyRoutineLayeringBoard extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.routineId = "", this.expandedId = "", this.order = [], this.orderKey = "", this.checked = !1, this.revealed = !1, this.draggingId = "", this.overId = "", this.announce = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.routineId = "", this.resetQuiz());
  }
  get routines() {
    var _a;
    return parseRoutines((_a = this.config) == null ? void 0 : _a.brl_routines);
  }
  currentRoutine(routines) {
    var _a;
    if (!routines.length) return null;
    const preset = String(((_a = this.config) == null ? void 0 : _a.brl_default_routine) ?? "").trim();
    return routines.find((r) => r.id === this.routineId) || routines.find((r) => r.id === preset) || routines[0];
  }
  resetQuiz() {
    this.checked = !1, this.revealed = !1, this.expandedId = "", this.orderKey = "", this.order = [], this.draggingId = "", this.overId = "";
  }
  ensureOrder(routine) {
    return (this.orderKey !== routine.id || this.order.length !== routine.steps.length) && (this.order = shuffleOrder(routine.steps), this.orderKey = routine.id, this.checked = !1, this.revealed = !1), this.order;
  }
  selectRoutine(id) {
    id !== this.routineId && (this.routineId = id, this.resetQuiz());
  }
  toggleExpand(id) {
    this.expandedId = this.expandedId === id ? "" : id;
  }
  // —— quiz reordering ——
  moveStep(index, dir) {
    const target = index + dir;
    if (target < 0 || target >= this.order.length) return;
    const next = [...this.order];
    [next[index], next[target]] = [next[target], next[index]], this.order = next, this.checked = !1, this.announceOrder();
  }
  moveIdTo(id, targetIndex) {
    const from = this.order.indexOf(id);
    if (from < 0 || from === targetIndex) return;
    const next = [...this.order];
    next.splice(from, 1), next.splice(targetIndex, 0, id), this.order = next;
  }
  onPointerDown(e, id) {
    var _a, _b;
    this.revealed || (this.draggingId = id, (_b = (_a = e.currentTarget).setPointerCapture) == null || _b.call(_a, e.pointerId));
  }
  onPointerMove(e) {
    var _a;
    if (!this.draggingId) return;
    const el = (_a = this.shadowRoot) == null ? void 0 : _a.elementFromPoint(e.clientX, e.clientY), row = el == null ? void 0 : el.closest("[data-step]"), overId = (row == null ? void 0 : row.getAttribute("data-step")) || "";
    this.overId = overId && overId !== this.draggingId ? overId : "", !(!overId || overId === this.draggingId) && this.moveIdTo(this.draggingId, this.order.indexOf(overId));
  }
  onPointerUp() {
    this.draggingId && (this.draggingId = "", this.overId = "", this.checked = !1, this.announceOrder());
  }
  announceOrder() {
    this.announce = t("تم تحديث ترتيب الخطوات.", "Step order updated.");
  }
  verify(routine) {
    this.checked = !0;
    const correct = sortedByCorrect(routine.steps).map((s) => s.id), score = this.order.filter((id, i) => id === correct[i]).length;
    this.announce = score === routine.steps.length ? t("ترتيب صحيح تمامًا.", "Perfect order.") : t(`${score} من ${routine.steps.length} في مكانها الصحيح.`, `${score} of ${routine.steps.length} in the correct place.`);
  }
  showAnswer(routine) {
    this.order = sortedByCorrect(routine.steps).map((s) => s.id), this.checked = !0, this.revealed = !0;
  }
  retry(routine) {
    this.order = shuffleOrder(routine.steps), this.checked = !1, this.revealed = !1, this.announceOrder();
  }
  renderMeta(step) {
    const bits = [
      step.timing ? html`<span>${t("التوقيت", "When")}: <b>${step.timing}</b></span>` : nothing,
      step.wait ? html`<span>${t("الانتظار", "Wait")}: <b>${step.wait}</b></span>` : nothing,
      step.amount ? html`<span>${t("الكمية", "Amount")}: <b>${step.amount}</b></span>` : nothing
    ].filter((x) => x !== nothing);
    return bits.length ? html`<div class="brl-meta">${bits}</div>` : nothing;
  }
  renderMarker(step, display) {
    return html`<span
      class="brl-step__marker"
      style=${styleMap(step.color ? { "--step-color": step.color } : {})}
    >
      ${step.icon ? step.icon.startsWith("sicon-") ? html`<span class="brl-icon ${step.icon}"></span>` : html`<span class="brl-icon">${step.icon}</span>` : display}
    </span>`;
  }
  renderStepBadges(step, locale) {
    const badges = [
      step.optional ? html`<span class="brl-badge">${t("اختيارية", "Optional")}</span>` : nothing,
      step.period !== "both" ? html`<span class="brl-badge">${periodLabel(step.period, locale)}</span>` : nothing
    ].filter((x) => x !== nothing);
    return badges.length ? html`<div class="brl-step__badges">${badges}</div>` : nothing;
  }
  renderGuide(routine, locale) {
    const steps = sortedByCorrect(routine.steps);
    return html`<div
      class=${classMap({ "brl-board": !0, [`brl-board--${resolveShape(this.config)}`]: !0, "brl-board--horizontal": resolveDirection(this.config) === "horizontal" })}
    >
      ${steps.map((step, i) => {
      const expanded = this.expandedId === step.id, canToggle = !!(step.descLong || step.note);
      return html`<div
          class=${classMap({
        "brl-step": !0,
        "brl-step--guide": !0,
        "has-toggle": canToggle
      })}
          style=${styleMap(step.color ? { "--step-color": step.color } : {})}
        >
          <span class="brl-step__index" aria-hidden="true">${i + 1}</span>
          ${step.image ? html`<img class="brl-step__thumb" src=${step.image} alt="" loading="lazy" decoding="async" />` : this.renderMarker(step, i + 1)}
          <div class="brl-step__body">
            <h3 class="brl-step__title">${step.title}</h3>
            ${this.renderStepBadges(step, locale)}
            ${step.descShort ? html`<p class="brl-step__short">${step.descShort}</p>` : nothing}
            ${this.renderMeta(step)}
            ${expanded ? html`
                  ${step.descLong ? html`<p class="brl-step__long">${step.descLong}</p>` : nothing}
                  ${step.note ? html`<p class="brl-step__note">★ ${step.note}</p>` : nothing}
                ` : nothing}
          </div>
          ${canToggle ? html`<button
                type="button"
                class="brl-step__toggle"
                aria-expanded=${expanded ? "true" : "false"}
                aria-label=${expanded ? t("إخفاء التفاصيل", "Hide details") : t("عرض التفاصيل", "Show details")}
                @click=${() => this.toggleExpand(step.id)}
              >${expanded ? "−" : "+"}</button>` : nothing}
        </div>`;
    })}
    </div>`;
  }
  renderQuiz(routine, locale) {
    var _a;
    const order = this.ensureOrder(routine), byId = new Map(routine.steps.map((s) => [s.id, s])), correct = sortedByCorrect(routine.steps).map((s) => s.id), enableDrag = isTruthy((_a = this.config) == null ? void 0 : _a.brl_enable_drag, !0) && !this.revealed, score = this.checked ? order.filter((id, i) => id === correct[i]).length : 0, progressPct = this.checked ? Math.round(score / Math.max(1, routine.steps.length) * 100) : 0;
    return html`
      <div class="brl-intro">
        <p class="brl-intro__title">${t("رتّبي الطبقات من الأولى إلى الأخيرة", "Order layers from first to last")}</p>
        <p class="brl-intro__text">
          ${t(
      "اسحبي البطاقة من المقبض أو استخدمي الأسهم، ثم اضغطي «تحقّقي من الترتيب».",
      "Drag a card from the handle or use the arrows, then tap “Check order”."
    )}
        </p>
        <div class="brl-intro__row">
          <span class="brl-pill">${t(`${routine.steps.length} طبقات`, `${routine.steps.length} layers`)}</span>
          ${enableDrag ? html`<span class="brl-pill">⠿ ${t("اسحبي لإعادة الترتيب", "Drag to reorder")}</span>` : nothing}
        </div>
      </div>

      ${this.checked ? html`<div class="brl-progress" role="status">
            <div class="brl-progress__bar"><span style=${styleMap({ width: `${progressPct}%` })}></span></div>
            <div class="brl-progress__text">
              ${t(`${score} من ${routine.steps.length} في المكان الصحيح`, `${score} of ${routine.steps.length} in the right place`)}
            </div>
          </div>` : nothing}

      <div
        class=${classMap({ "brl-board": !0, [`brl-board--${resolveShape(this.config)}`]: !0, "brl-board--horizontal": resolveDirection(this.config) === "horizontal" })}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
      >
        ${order.map((id, i) => {
      const step = byId.get(id);
      if (!step) return nothing;
      const ok = this.checked ? id === correct[i] : null;
      return html`<div
            class=${classMap({
        "brl-step": !0,
        "brl-step--quiz": !0,
        "has-result": ok !== null,
        "is-revealed": this.revealed,
        "is-dragging": this.draggingId === id,
        "is-over": this.overId === id,
        "is-ok": ok === !0,
        "is-bad": ok === !1
      })}
            data-step=${id}
            style=${styleMap(step.color ? { "--step-color": step.color } : {})}
          >
            ${this.revealed ? nothing : html`<div class="brl-handles">
                  ${enableDrag ? html`<button
                        type="button"
                        class="brl-handle brl-handle--drag"
                        aria-label=${t("اسحبي لإعادة الترتيب", "Drag to reorder")}
                        @pointerdown=${(e) => this.onPointerDown(e, id)}
                      >
                        <span class="brl-handle__grip" aria-hidden="true">⠿</span>
                        <span class="brl-handle__label">${t("اسحبي", "Drag")}</span>
                      </button>` : nothing}
                  <button type="button" class="brl-handle" ?disabled=${i === 0} aria-label=${t("نقل لأعلى", "Move up")} @click=${() => this.moveStep(i, -1)}>▲</button>
                  <button type="button" class="brl-handle" ?disabled=${i === order.length - 1} aria-label=${t("نقل لأسفل", "Move down")} @click=${() => this.moveStep(i, 1)}>▼</button>
                </div>`}
            <span class="brl-step__index" aria-hidden="true">${i + 1}</span>
            ${step.image ? html`<img class="brl-step__thumb" src=${step.image} alt="" loading="lazy" decoding="async" />` : this.renderMarker(step, i + 1)}
            <div class="brl-step__body">
              <h3 class="brl-step__title">${step.title}</h3>
              ${this.renderStepBadges(step, locale)}
              ${step.descShort ? html`<p class="brl-step__short">${step.descShort}</p>` : nothing}
            </div>
            ${ok === null ? nothing : html`<span class="brl-step__result ${ok ? "brl-step__result--ok" : "brl-step__result--bad"}" aria-hidden="true">${ok ? "✓" : "✗"}</span>`}
          </div>`;
    })}
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "brl_"), animate = theme.animate && !prefersReducedMotion(), routines = this.routines, title = localizedString(c.brl_title), desc = localizedString(c.brl_desc), mode = resolveMode(c), locale = getPageLocale() === "en" ? "en" : "ar", cardRadius = `${getUnitValue(c.brl_card_radius, 14)}px`;
    if (!routines.length)
      return html`<div class="fs-empty" role="status">
        ${t("أضيفي روتينًا واحدًا على الأقل مع خطواته من إعدادات العنصر.", "Add at least one routine with its steps in the element settings.")}
      </div>`;
    const routine = this.currentRoutine(routines);
    if (!routine) return nothing;
    const win = mode === "quiz" && this.checked && this.order.every((id, i) => id === sortedByCorrect(routine.steps).map((s) => s.id)[i]), successMsg = localizedString(c.brl_success_msg) || t("أحسنتِ! هذا هو الترتيب الصحيح.", "Well done! This is the correct order."), retryMsg = localizedString(c.brl_retry_msg) || t("قريب! عدّلي الترتيب وحاولي مجددًا.", "Close! Adjust the order and try again.");
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap({
      ...themeStyleMap(theme),
      "--brl-card-radius": cardRadius,
      "--step-color": String(c.brl_step_color ?? theme.accent),
      "--success-color": String(c.brl_success_color ?? "#2f9e63"),
      "--error-color": String(c.brl_error_color ?? "#cf4b4b")
    })}
        aria-label=${title || t("ترتيب طبقات روتين العناية", "Routine layering board")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          ${routines.length > 1 ? html`
                <div class="brl-switcher">
                  <div class="brl-tabs" role="tablist" aria-label=${t("اختاري الروتين", "Choose routine")}>
                    ${routines.map(
      (r) => html`<button
                        type="button"
                        role="tab"
                        class=${classMap({ "brl-tab": !0, "is-active": r.id === routine.id })}
                        aria-selected=${r.id === routine.id ? "true" : "false"}
                        @click=${() => this.selectRoutine(r.id)}
                      >${r.name}</button>`
    )}
                  </div>
                  <label class="brl-select-wrap">
                    <span class="brl-sr">${t("اختاري الروتين", "Choose routine")}</span>
                    <select
                      class="brl-select"
                      aria-label=${t("اختاري الروتين", "Choose routine")}
                      @change=${(e) => this.selectRoutine(e.target.value)}
                    >
                      ${routines.map(
      (r) => html`<option value=${r.id} ?selected=${r.id === routine.id}>${r.name}</option>`
    )}
                    </select>
                  </label>
                </div>
              ` : nothing}

          <div class="brl-shell">
            ${mode === "quiz" ? this.renderQuiz(routine, locale) : this.renderGuide(routine, locale)}

            ${mode === "quiz" && this.checked ? html`<div class=${classMap({ "brl-feedback": !0, "brl-feedback--win": win, "brl-feedback--retry": !win })} role="status">
                  <span class="brl-feedback__icon" aria-hidden="true">${win ? "✓" : "↻"}</span>
                  <span class="brl-feedback__msg">${win ? successMsg : retryMsg}</span>
                  <span class="brl-feedback__score">
                    ${(() => {
      const correct = sortedByCorrect(routine.steps).map((s) => s.id), score = this.order.filter((id, i) => id === correct[i]).length;
      return t(`${score} من ${routine.steps.length} صحيحة`, `${score} of ${routine.steps.length} correct`);
    })()}
                  </span>
                </div>` : nothing}

            <div class="brl-actions">
              ${mode === "quiz" ? html`
                  ${isTruthy(c.brl_enable_check, !0) && !this.revealed ? html`<button type="button" class="fs-btn" @click=${() => this.verify(routine)}>${t("تحقّقي من الترتيب", "Check order")}</button>` : nothing}
                  ${isTruthy(c.brl_enable_retry, !0) ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.retry(routine)}>${t("إعادة المحاولة", "Try again")}</button>` : nothing}
                  ${isTruthy(c.brl_show_answer, !0) ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.showAnswer(routine)}>${t("إظهار الترتيب الصحيح", "Show correct order")}</button>` : nothing}
                  ` : nothing}
              ${renderCommerceCtaButton(c, "brl_")}
            </div>
          </div>

          <span class="brl-sr" role="status" aria-live="polite">${this.announce}</span>
        </div>
      </section>
    `;
  }
};
__name(_BeautyRoutineLayeringBoard, "BeautyRoutineLayeringBoard"), _BeautyRoutineLayeringBoard.styles = [sharedSectionCss, componentStyles];
let BeautyRoutineLayeringBoard = _BeautyRoutineLayeringBoard;
__decorateClass([
  property({ type: Object })
], BeautyRoutineLayeringBoard.prototype, "config");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "routineId");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "expandedId");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "order");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "orderKey");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "checked");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "revealed");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "draggingId");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "overId");
__decorateClass([
  state()
], BeautyRoutineLayeringBoard.prototype, "announce");
typeof BeautyRoutineLayeringBoard < "u" && BeautyRoutineLayeringBoard.registerSallaComponent("salla-beauty-routine-layering-board");
export {
  BeautyRoutineLayeringBoard as default
};
