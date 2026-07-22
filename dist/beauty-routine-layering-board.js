import { css as A, LitElement as E, nothing as s, html as a } from "lit";
import { property as q, state as u } from "lit/decorators.js";
import { classMap as $ } from "lit/directives/class-map.js";
import { styleMap as k } from "lit/directives/style-map.js";
import { n as j, l as f, g as M, j as T, i as w, e as U, s as H, t as i, r as K, p as Q, o as W, c as Y, a as G } from "./sharedStyles-DKbcXBPy.js";
import { r as V } from "./commerceOutcome-Dk8p2VWM.js";
const F = A`
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

  .brl-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    justify-content: center;
  }

  .brl-tab {
    min-height: 38px;
    padding: 0.4rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 700;
    font-size: 0.84rem;
    cursor: pointer;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      transform 0.15s ease;
  }

  .brl-tab:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  .brl-tab.is-active {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    border-color: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    transform: translateY(-1px);
  }

  .brl-select {
    display: none;
    width: 100%;
    padding: 0.7rem 0.85rem;
    border-radius: 14px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 600;
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
    display: flex;
    gap: 0.75rem;
    align-items: stretch;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    border-inline-start: 4px solid var(--step-color, var(--accent-color, var(--fs-store-primary)));
    border-radius: var(--brl-card-radius, 16px);
    padding: 0.8rem 0.9rem;
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, transparent),
      0 8px 20px rgba(120, 44, 82, 0.05);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
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
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
    line-height: 1.35;
  }

  .brl-badge {
    font-size: 0.66rem;
    font-weight: 700;
    padding: 0.12rem 0.5rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent);
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
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid var(--border-color, #e5e7eb);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
    color: var(--accent-color, var(--fs-store-primary));
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
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
    .brl-tabs {
      display: none;
    }
    .brl-select {
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
      gap: 0.55rem;
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
`, N = ["layers", "drops", "bottles", "stairs", "path", "circles"], X = ["morning", "evening", "both"];
function J(c) {
  return j(c).map((r, t) => {
    const o = M(r.period, "both");
    return {
      id: String(r.id ?? r.step_id ?? "").trim() || `step-${t + 1}`,
      title: f(r.step_title),
      icon: String(r.icon ?? "").trim(),
      image: U(r.image),
      descShort: f(r.desc_short),
      descLong: f(r.desc_long),
      timing: f(r.timing),
      wait: f(r.wait),
      amount: f(r.amount),
      note: f(r.note),
      color: String(r.color ?? "").trim(),
      optional: w(r.optional, !1),
      period: X.includes(o) ? o : "both",
      correctOrder: T(r.correct_order, t + 1)
    };
  }).filter((r) => r.title);
}
function Z(c) {
  return j(c).map((r, t) => ({
    id: String(r.id ?? r.routine_id ?? "").trim() || `routine-${t + 1}`,
    name: f(r.name) || `${t + 1}`,
    steps: J(r.steps)
  })).filter((r) => r.steps.length);
}
function _(c) {
  return [...c].sort((r, t) => r.correctOrder - t.correctOrder);
}
function P(c) {
  const r = c.map((e) => e.id);
  if (r.length < 2) return r;
  const t = _(c).map((e) => e.id);
  let o = [...r];
  for (let e = 0; e < 6; e += 1) {
    for (let n = o.length - 1; n > 0; n -= 1) {
      const d = Math.floor(Math.random() * (n + 1));
      [o[n], o[d]] = [o[d], o[n]];
    }
    if (o.some((n, d) => n !== t[d])) return o;
  }
  return o = [...t.slice(1), t[0]], o;
}
function B(c) {
  return M(c.brl_mode, "guide") === "quiz" ? "quiz" : "guide";
}
function C(c) {
  const r = M(c.brl_shape, "layers");
  return N.includes(r) ? r : "layers";
}
function L(c) {
  return M(c.brl_direction, "vertical") === "horizontal" ? "horizontal" : "vertical";
}
function R(c, r) {
  return {
    morning: ["صباحي", "Morning"],
    evening: ["مسائي", "Evening"],
    both: ["صباحي ومسائي", "AM / PM"]
  }[c][r === "en" ? 1 : 0];
}
var rr = Object.defineProperty, m = (c, r, t, o) => {
  for (var e = void 0, n = c.length - 1, d; n >= 0; n--)
    (d = c[n]) && (e = d(r, t, e) || e);
  return e && rr(r, t, e), e;
};
const O = class O extends E {
  constructor() {
    super(...arguments), this.config = {}, this.routineId = "", this.expandedId = "", this.order = [], this.orderKey = "", this.checked = !1, this.revealed = !1, this.draggingId = "", this.overId = "", this.announce = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(r) {
    r.has("config") && (this.routineId = "", this.resetQuiz());
  }
  get routines() {
    var r;
    return Z((r = this.config) == null ? void 0 : r.brl_routines);
  }
  currentRoutine(r) {
    var o;
    if (!r.length) return null;
    const t = String(((o = this.config) == null ? void 0 : o.brl_default_routine) ?? "").trim();
    return r.find((e) => e.id === this.routineId) || r.find((e) => e.id === t) || r[0];
  }
  resetQuiz() {
    this.checked = !1, this.revealed = !1, this.expandedId = "", this.orderKey = "", this.order = [], this.draggingId = "", this.overId = "";
  }
  ensureOrder(r) {
    return (this.orderKey !== r.id || this.order.length !== r.steps.length) && (this.order = P(r.steps), this.orderKey = r.id, this.checked = !1, this.revealed = !1), this.order;
  }
  selectRoutine(r) {
    r !== this.routineId && (this.routineId = r, this.resetQuiz());
  }
  toggleExpand(r) {
    this.expandedId = this.expandedId === r ? "" : r;
  }
  // —— quiz reordering ——
  moveStep(r, t) {
    const o = r + t;
    if (o < 0 || o >= this.order.length) return;
    const e = [...this.order];
    [e[r], e[o]] = [e[o], e[r]], this.order = e, this.checked = !1, this.announceOrder();
  }
  moveIdTo(r, t) {
    const o = this.order.indexOf(r);
    if (o < 0 || o === t) return;
    const e = [...this.order];
    e.splice(o, 1), e.splice(t, 0, r), this.order = e;
  }
  onPointerDown(r, t) {
    var o, e;
    this.revealed || (this.draggingId = t, (e = (o = r.currentTarget).setPointerCapture) == null || e.call(o, r.pointerId));
  }
  onPointerMove(r) {
    var n;
    if (!this.draggingId) return;
    const t = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(r.clientX, r.clientY), o = t == null ? void 0 : t.closest("[data-step]"), e = (o == null ? void 0 : o.getAttribute("data-step")) || "";
    this.overId = e && e !== this.draggingId ? e : "", !(!e || e === this.draggingId) && this.moveIdTo(this.draggingId, this.order.indexOf(e));
  }
  onPointerUp() {
    this.draggingId && (this.draggingId = "", this.overId = "", this.checked = !1, this.announceOrder());
  }
  announceOrder() {
    this.announce = i("تم تحديث ترتيب الخطوات.", "Step order updated.");
  }
  verify(r) {
    this.checked = !0;
    const t = _(r.steps).map((e) => e.id), o = this.order.filter((e, n) => e === t[n]).length;
    this.announce = o === r.steps.length ? i("ترتيب صحيح تمامًا.", "Perfect order.") : i(`${o} من ${r.steps.length} في مكانها الصحيح.`, `${o} of ${r.steps.length} in the correct place.`);
  }
  showAnswer(r) {
    this.order = _(r.steps).map((t) => t.id), this.checked = !0, this.revealed = !0;
  }
  retry(r) {
    this.order = P(r.steps), this.checked = !1, this.revealed = !1, this.announceOrder();
  }
  renderMeta(r) {
    const t = [
      r.timing ? a`<span>${i("التوقيت", "When")}: <b>${r.timing}</b></span>` : s,
      r.wait ? a`<span>${i("الانتظار", "Wait")}: <b>${r.wait}</b></span>` : s,
      r.amount ? a`<span>${i("الكمية", "Amount")}: <b>${r.amount}</b></span>` : s
    ].filter((o) => o !== s);
    return t.length ? a`<div class="brl-meta">${t}</div>` : s;
  }
  renderMarker(r, t) {
    return a`<span
      class="brl-step__marker"
      style=${k(r.color ? { "--step-color": r.color } : {})}
    >
      ${r.icon ? r.icon.startsWith("sicon-") ? a`<span class="brl-icon ${r.icon}"></span>` : a`<span class="brl-icon">${r.icon}</span>` : t}
    </span>`;
  }
  renderGuide(r, t) {
    const o = _(r.steps);
    return a`<div
      class=${$({ "brl-board": !0, [`brl-board--${C(this.config)}`]: !0, "brl-board--horizontal": L(this.config) === "horizontal" })}
    >
      ${o.map((e, n) => {
      const d = this.expandedId === e.id;
      return a`<div class="brl-step" style=${k(e.color ? { "--step-color": e.color } : {})}>
          <span class="brl-step__index" aria-hidden="true">${n + 1}</span>
          ${e.image ? a`<img class="brl-step__thumb" src=${e.image} alt="" loading="lazy" decoding="async" />` : this.renderMarker(e, n + 1)}
          <div class="brl-step__body">
            <h3 class="brl-step__title">
              ${e.title}
              ${e.optional ? a`<span class="brl-badge">${i("اختيارية", "Optional")}</span>` : s}
              ${e.period !== "both" ? a`<span class="brl-badge">${R(e.period, t)}</span>` : s}
            </h3>
            ${e.descShort ? a`<p class="brl-step__short">${e.descShort}</p>` : s}
            ${this.renderMeta(e)}
            ${d ? a`
                  ${e.descLong ? a`<p class="brl-step__long">${e.descLong}</p>` : s}
                  ${e.note ? a`<p class="brl-step__note">★ ${e.note}</p>` : s}
                ` : s}
          </div>
          ${e.descLong || e.note ? a`<button
                type="button"
                class="brl-step__toggle"
                aria-expanded=${d ? "true" : "false"}
                aria-label=${d ? i("إخفاء التفاصيل", "Hide details") : i("عرض التفاصيل", "Show details")}
                @click=${() => this.toggleExpand(e.id)}
              >${d ? "−" : "+"}</button>` : s}
        </div>`;
    })}
    </div>`;
  }
  renderQuiz(r, t) {
    var I;
    const o = this.ensureOrder(r), e = new Map(r.steps.map((l) => [l.id, l])), n = _(r.steps).map((l) => l.id), d = w((I = this.config) == null ? void 0 : I.brl_enable_drag, !0) && !this.revealed, v = this.checked ? o.filter((l, p) => l === n[p]).length : 0, z = this.checked ? Math.round(v / Math.max(1, r.steps.length) * 100) : 0;
    return a`
      <div class="brl-intro">
        <p class="brl-intro__title">${i("رتّبي الطبقات من الأولى إلى الأخيرة", "Order layers from first to last")}</p>
        <p class="brl-intro__text">
          ${i(
      "اسحبي البطاقة من المقبض أو استخدمي الأسهم، ثم اضغطي «تحقّقي من الترتيب».",
      "Drag a card from the handle or use the arrows, then tap “Check order”."
    )}
        </p>
        <div class="brl-intro__row">
          <span class="brl-pill">${i(`${r.steps.length} طبقات`, `${r.steps.length} layers`)}</span>
          ${d ? a`<span class="brl-pill">⠿ ${i("اسحبي لإعادة الترتيب", "Drag to reorder")}</span>` : s}
        </div>
      </div>

      ${this.checked ? a`<div class="brl-progress" role="status">
            <div class="brl-progress__bar"><span style=${k({ width: `${z}%` })}></span></div>
            <div class="brl-progress__text">
              ${i(`${v} من ${r.steps.length} في المكان الصحيح`, `${v} of ${r.steps.length} in the right place`)}
            </div>
          </div>` : s}

      <div
        class=${$({ "brl-board": !0, [`brl-board--${C(this.config)}`]: !0, "brl-board--horizontal": L(this.config) === "horizontal" })}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
      >
        ${o.map((l, p) => {
      const g = e.get(l);
      if (!g) return s;
      const x = this.checked ? l === n[p] : null;
      return a`<div
            class=${$({
        "brl-step": !0,
        "is-dragging": this.draggingId === l,
        "is-over": this.overId === l,
        "is-ok": x === !0,
        "is-bad": x === !1
      })}
            data-step=${l}
            style=${k(g.color ? { "--step-color": g.color } : {})}
          >
            ${this.revealed ? s : a`<div class="brl-handles">
                  ${d ? a`<button
                        type="button"
                        class="brl-handle brl-handle--drag"
                        aria-label=${i("اسحبي لإعادة الترتيب", "Drag to reorder")}
                        @pointerdown=${(b) => this.onPointerDown(b, l)}
                      >
                        <span class="brl-handle__grip" aria-hidden="true">⠿</span>
                        <span class="brl-handle__label">${i("اسحبي", "Drag")}</span>
                      </button>` : s}
                  <button type="button" class="brl-handle" ?disabled=${p === 0} aria-label=${i("نقل لأعلى", "Move up")} @click=${() => this.moveStep(p, -1)}>▲</button>
                  <button type="button" class="brl-handle" ?disabled=${p === o.length - 1} aria-label=${i("نقل لأسفل", "Move down")} @click=${() => this.moveStep(p, 1)}>▼</button>
                </div>`}
            <span class="brl-step__index" aria-hidden="true">${p + 1}</span>
            ${g.image ? a`<img class="brl-step__thumb" src=${g.image} alt="" loading="lazy" decoding="async" />` : this.renderMarker(g, p + 1)}
            <div class="brl-step__body">
              <h3 class="brl-step__title">
                ${g.title}
                ${g.optional ? a`<span class="brl-badge">${i("اختيارية", "Optional")}</span>` : s}
                ${g.period !== "both" ? a`<span class="brl-badge">${R(g.period, t)}</span>` : s}
              </h3>
              ${g.descShort ? a`<p class="brl-step__short">${g.descShort}</p>` : s}
            </div>
            ${x === null ? s : a`<span class="brl-step__result ${x ? "brl-step__result--ok" : "brl-step__result--bad"}" aria-hidden="true">${x ? "✓" : "✗"}</span>`}
          </div>`;
    })}
      </div>
    `;
  }
  render() {
    const r = this.config || {}, t = K(r, "brl_"), o = t.animate && !Q(), e = this.routines, n = f(r.brl_title), d = f(r.brl_desc), v = B(r), z = W() === "en" ? "en" : "ar", I = `${Y(r.brl_card_radius, 14)}px`;
    if (!e.length)
      return a`<div class="fs-empty" role="status">
        ${i("أضيفي روتينًا واحدًا على الأقل مع خطواته من إعدادات العنصر.", "Add at least one routine with its steps in the element settings.")}
      </div>`;
    const l = this.currentRoutine(e);
    if (!l) return s;
    const p = v === "quiz" && this.checked && this.order.every((b, S) => b === _(l.steps).map((y) => y.id)[S]), g = f(r.brl_success_msg) || i("أحسنتِ! هذا هو الترتيب الصحيح.", "Well done! This is the correct order."), x = f(r.brl_retry_msg) || i("قريب! عدّلي الترتيب وحاولي مجددًا.", "Close! Adjust the order and try again.");
    return a`
      <section
        class=${$({ "fs-section": !0, "fs-animate": o })}
        style=${k({
      ...G(t),
      "--brl-card-radius": I,
      "--step-color": String(r.brl_step_color ?? t.accent),
      "--success-color": String(r.brl_success_color ?? "#2f9e63"),
      "--error-color": String(r.brl_error_color ?? "#cf4b4b")
    })}
        aria-label=${n || i("ترتيب طبقات روتين العناية", "Routine layering board")}
      >
        <div class="fs-container">
          ${n || d ? a`<div class="fs-header">
                ${n ? a`<h2 class="fs-title">${n}</h2>` : s}
                ${d ? a`<p class="fs-desc">${d}</p>` : s}
              </div>` : s}

          ${e.length > 1 ? a`
                <div class="brl-tabs" role="tablist">
                  ${e.map(
      (b) => a`<button
                      type="button"
                      role="tab"
                      class=${$({ "brl-tab": !0, "is-active": b.id === l.id })}
                      aria-selected=${b.id === l.id ? "true" : "false"}
                      @click=${() => this.selectRoutine(b.id)}
                    >${b.name}</button>`
    )}
                </div>
                <select
                  class="brl-select"
                  aria-label=${i("اختاري الروتين", "Choose routine")}
                  @change=${(b) => this.selectRoutine(b.target.value)}
                >
                  ${e.map((b) => a`<option value=${b.id} ?selected=${b.id === l.id}>${b.name}</option>`)}
                </select>
              ` : s}

          <div class="brl-shell">
            ${v === "quiz" ? this.renderQuiz(l, z) : this.renderGuide(l, z)}

            ${v === "quiz" && this.checked ? a`<div class=${$({ "brl-feedback": !0, "brl-feedback--win": p, "brl-feedback--retry": !p })} role="status">
                  <span class="brl-feedback__icon" aria-hidden="true">${p ? "✓" : "↻"}</span>
                  <span class="brl-feedback__msg">${p ? g : x}</span>
                  <span class="brl-feedback__score">
                    ${(() => {
      const b = _(l.steps).map((y) => y.id), S = this.order.filter((y, D) => y === b[D]).length;
      return i(`${S} من ${l.steps.length} صحيحة`, `${S} of ${l.steps.length} correct`);
    })()}
                  </span>
                </div>` : s}

            <div class="brl-actions">
              ${v === "quiz" ? a`
                  ${w(r.brl_enable_check, !0) && !this.revealed ? a`<button type="button" class="fs-btn" @click=${() => this.verify(l)}>${i("تحقّقي من الترتيب", "Check order")}</button>` : s}
                  ${w(r.brl_enable_retry, !0) ? a`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.retry(l)}>${i("إعادة المحاولة", "Try again")}</button>` : s}
                  ${w(r.brl_show_answer, !0) ? a`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.showAnswer(l)}>${i("إظهار الترتيب الصحيح", "Show correct order")}</button>` : s}
                  ` : s}
              ${V(r, "brl_")}
            </div>
          </div>

          <span class="brl-sr" role="status" aria-live="polite">${this.announce}</span>
        </div>
      </section>
    `;
  }
};
O.styles = [H, F];
let h = O;
m([
  q({ type: Object })
], h.prototype, "config");
m([
  u()
], h.prototype, "routineId");
m([
  u()
], h.prototype, "expandedId");
m([
  u()
], h.prototype, "order");
m([
  u()
], h.prototype, "orderKey");
m([
  u()
], h.prototype, "checked");
m([
  u()
], h.prototype, "revealed");
m([
  u()
], h.prototype, "draggingId");
m([
  u()
], h.prototype, "overId");
m([
  u()
], h.prototype, "announce");
typeof h < "u" && h.registerSallaComponent("salla-beauty-routine-layering-board");
export {
  h as default
};
