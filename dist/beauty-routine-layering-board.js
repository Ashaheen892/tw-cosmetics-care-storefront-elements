import { css as A, LitElement as E, nothing as s, html as a } from "lit";
import { property as D, state as _ } from "lit/decorators.js";
import { classMap as x } from "lit/directives/class-map.js";
import { styleMap as z } from "lit/directives/style-map.js";
import { n as R, l as g, g as S, h as T, i as y, e as U, s as H, t as l, r as K, p as Q, m as W, c as Y, a as G } from "./sharedStyles--LaFqDVC.js";
const V = A`
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
    flex: 1 1 100%;
  }

  .brl-drag-tip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0;
    padding: 0.4rem 0.75rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 10%, var(--card-bg, #fff));
    border: 1px dashed color-mix(in srgb, var(--accent-color, #c2527f) 35%, var(--border-color, #f2dde7));
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--accent-color, #c2527f);
  }

  .brl-drag-tip__icon {
    font-size: 1rem;
    line-height: 1;
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

  .brl-step__thumb {
    flex: 0 0 auto;
    width: 2.75rem;
    height: 2.75rem;
    align-self: center;
    object-fit: cover;
    border-radius: 10px;
    background: color-mix(in srgb, var(--step-color, var(--accent-color, #c2527f)) 12%, #fff);
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

  .brl-handle--drag {
    width: auto;
    min-width: 2.6rem;
    height: auto;
    min-height: 2.75rem;
    padding: 0.35rem 0.45rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
    cursor: grab;
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 35%, var(--border-color, #f2dde7));
    background: color-mix(in srgb, var(--accent-color, #c2527f) 8%, var(--card-bg, #fff));
    color: var(--accent-color, #c2527f);
  }

  .brl-handle--drag:active { cursor: grabbing; }

  .brl-handle__grip {
    font-size: 1rem;
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
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }

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

  .brl-step.is-ok {
    border-inline-start-color: var(--success-color, #2f9e63);
    background: color-mix(in srgb, var(--success-color, #2f9e63) 6%, var(--card-bg, #fff));
  }
  .brl-step.is-bad {
    border-inline-start-color: var(--error-color, #cf4b4b);
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 5%, var(--card-bg, #fff));
  }

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
    padding: 1rem 1.1rem;
    border-radius: 14px;
    text-align: center;
    font-weight: 700;
    border: 2px solid var(--border-color, #f2dde7);
    display: grid;
    gap: 0.35rem;
    justify-items: center;
  }

  .brl-feedback__icon {
    width: 2rem;
    height: 2rem;
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
    border-color: color-mix(in srgb, var(--success-color, #2f9e63) 45%, var(--border-color, #f2dde7));
    color: var(--success-color, #2f9e63);
  }

  .brl-feedback--win .brl-feedback__icon {
    background: color-mix(in srgb, var(--success-color, #2f9e63) 20%, #fff);
  }

  .brl-feedback--retry {
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 10%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--error-color, #cf4b4b) 40%, var(--border-color, #f2dde7));
    color: var(--error-color, #cf4b4b);
  }

  .brl-feedback--retry .brl-feedback__icon {
    background: color-mix(in srgb, var(--error-color, #cf4b4b) 18%, #fff);
  }

  .brl-feedback__score { display: block; font-size: 0.85rem; color: var(--muted-color, #8f7a86); font-weight: 600; }

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
    .brl-handle__grip { animation: none; }
  }
`, F = ["layers", "drops", "bottles", "stairs", "path", "circles"], N = ["morning", "evening", "both"];
function X(c) {
  return R(c).map((r, t) => {
    const o = S(r.period, "both");
    return {
      id: String(r.step_id ?? "").trim() || `step-${t + 1}`,
      title: g(r.step_title),
      icon: String(r.icon ?? "").trim(),
      image: U(r.image),
      descShort: g(r.desc_short),
      descLong: g(r.desc_long),
      timing: g(r.timing),
      wait: g(r.wait),
      amount: g(r.amount),
      note: g(r.note),
      color: String(r.color ?? "").trim(),
      optional: y(r.optional, !1),
      period: N.includes(o) ? o : "both",
      correctOrder: T(r.correct_order, t + 1)
    };
  }).filter((r) => r.title);
}
function J(c) {
  return R(c).map((r, t) => ({
    id: String(r.routine_id ?? "").trim() || `routine-${t + 1}`,
    name: g(r.name) || `${t + 1}`,
    steps: X(r.steps)
  })).filter((r) => r.steps.length);
}
function $(c) {
  return [...c].sort((r, t) => r.correctOrder - t.correctOrder);
}
function O(c) {
  const r = c.map((e) => e.id);
  if (r.length < 2) return r;
  const t = $(c).map((e) => e.id);
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
function Z(c) {
  return S(c.brl_mode, "guide") === "quiz" ? "quiz" : "guide";
}
function P(c) {
  const r = S(c.brl_shape, "layers");
  return F.includes(r) ? r : "layers";
}
function C(c) {
  return S(c.brl_direction, "vertical") === "horizontal" ? "horizontal" : "vertical";
}
function L(c, r) {
  return {
    morning: ["صباحي", "Morning"],
    evening: ["مسائي", "Evening"],
    both: ["صباحي ومسائي", "AM / PM"]
  }[c][r === "en" ? 1 : 0];
}
var B = Object.defineProperty, u = (c, r, t, o) => {
  for (var e = void 0, n = c.length - 1, d; n >= 0; n--)
    (d = c[n]) && (e = d(r, t, e) || e);
  return e && B(r, t, e), e;
};
const M = class M extends E {
  constructor() {
    super(...arguments), this.config = {}, this.routineId = "", this.expandedId = "", this.order = [], this.orderKey = "", this.checked = !1, this.revealed = !1, this.draggingId = "", this.announce = "", this.boundLangHandler = () => this.requestUpdate();
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
    return J((r = this.config) == null ? void 0 : r.brl_routines);
  }
  currentRoutine(r) {
    var o;
    if (!r.length) return null;
    const t = String(((o = this.config) == null ? void 0 : o.brl_default_routine) ?? "").trim();
    return r.find((e) => e.id === this.routineId) || r.find((e) => e.id === t) || r[0];
  }
  resetQuiz() {
    this.checked = !1, this.revealed = !1, this.expandedId = "", this.orderKey = "", this.order = [];
  }
  ensureOrder(r) {
    return (this.orderKey !== r.id || this.order.length !== r.steps.length) && (this.order = O(r.steps), this.orderKey = r.id, this.checked = !1, this.revealed = !1), this.order;
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
    const t = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(r.clientX, r.clientY), o = t == null ? void 0 : t.closest("[data-step]"), e = o == null ? void 0 : o.getAttribute("data-step");
    !e || e === this.draggingId || this.moveIdTo(this.draggingId, this.order.indexOf(e));
  }
  onPointerUp() {
    this.draggingId && (this.draggingId = "", this.checked = !1, this.announceOrder());
  }
  announceOrder() {
    this.announce = l("تم تحديث ترتيب الخطوات.", "Step order updated.");
  }
  verify(r) {
    this.checked = !0;
    const t = $(r.steps).map((e) => e.id), o = this.order.filter((e, n) => e === t[n]).length;
    this.announce = o === r.steps.length ? l("ترتيب صحيح تمامًا.", "Perfect order.") : l(`${o} من ${r.steps.length} في مكانها الصحيح.`, `${o} of ${r.steps.length} in the correct place.`);
  }
  showAnswer(r) {
    this.order = $(r.steps).map((t) => t.id), this.checked = !0, this.revealed = !0;
  }
  retry(r) {
    this.order = O(r.steps), this.checked = !1, this.revealed = !1, this.announceOrder();
  }
  renderMeta(r) {
    const t = [
      r.timing ? a`<span>${l("التوقيت", "When")}: <b>${r.timing}</b></span>` : s,
      r.wait ? a`<span>${l("الانتظار", "Wait")}: <b>${r.wait}</b></span>` : s,
      r.amount ? a`<span>${l("الكمية", "Amount")}: <b>${r.amount}</b></span>` : s
    ].filter((o) => o !== s);
    return t.length ? a`<div class="brl-meta">${t}</div>` : s;
  }
  renderMarker(r, t) {
    return a`<span
      class="brl-step__marker"
      style=${z(r.color ? { "--step-color": r.color } : {})}
    >
      ${r.icon ? r.icon.startsWith("sicon-") ? a`<span class="brl-icon ${r.icon}"></span>` : a`<span class="brl-icon">${r.icon}</span>` : t}
    </span>`;
  }
  renderGuide(r, t) {
    const o = $(r.steps);
    return a`<div
      class=${x({ "brl-board": !0, [`brl-board--${P(this.config)}`]: !0, "brl-board--horizontal": C(this.config) === "horizontal" })}
    >
      ${o.map((e, n) => {
      const d = this.expandedId === e.id;
      return a`<div class="brl-step" style=${z(e.color ? { "--step-color": e.color } : {})}>
          ${e.image ? a`<img class="brl-step__thumb" src=${e.image} alt="" loading="lazy" decoding="async" />` : this.renderMarker(e, n + 1)}
          <div class="brl-step__body">
            <h3 class="brl-step__title">
              ${e.title}
              ${e.optional ? a`<span class="brl-badge">${l("اختيارية", "Optional")}</span>` : s}
              ${e.period !== "both" ? a`<span class="brl-badge">${L(e.period, t)}</span>` : s}
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
                aria-label=${d ? l("إخفاء التفاصيل", "Hide details") : l("عرض التفاصيل", "Show details")}
                @click=${() => this.toggleExpand(e.id)}
              >${d ? "−" : "+"}</button>` : s}
        </div>`;
    })}
    </div>`;
  }
  renderQuiz(r, t) {
    var m;
    const o = this.ensureOrder(r), e = new Map(r.steps.map((p) => [p.id, p])), n = $(r.steps).map((p) => p.id), d = y((m = this.config) == null ? void 0 : m.brl_enable_drag, !0) && !this.revealed;
    return a`<div
      class=${x({ "brl-board": !0, [`brl-board--${P(this.config)}`]: !0, "brl-board--horizontal": C(this.config) === "horizontal" })}
      @pointermove=${this.onPointerMove}
      @pointerup=${this.onPointerUp}
      @pointercancel=${this.onPointerUp}
    >
      ${o.map((p, v) => {
      const i = e.get(p);
      if (!i) return s;
      const f = this.checked ? p === n[v] : null;
      return a`<div
          class=${x({
        "brl-step": !0,
        "is-dragging": this.draggingId === p,
        "is-ok": f === !0,
        "is-bad": f === !1
      })}
          data-step=${p}
          style=${z(i.color ? { "--step-color": i.color } : {})}
        >
          ${this.revealed ? s : a`<div class="brl-handles">
                ${d ? a`<button
                      type="button"
                      class="brl-handle brl-handle--drag"
                      aria-label=${l("اسحبي لإعادة الترتيب", "Drag to reorder")}
                      @pointerdown=${(I) => this.onPointerDown(I, p)}
                    >
                      <span class="brl-handle__grip" aria-hidden="true">⠿</span>
                      <span class="brl-handle__label">${l("اسحبي", "Drag")}</span>
                    </button>` : s}
                <button type="button" class="brl-handle" ?disabled=${v === 0} aria-label=${l("نقل لأعلى", "Move up")} @click=${() => this.moveStep(v, -1)}>▲</button>
                <button type="button" class="brl-handle" ?disabled=${v === o.length - 1} aria-label=${l("نقل لأسفل", "Move down")} @click=${() => this.moveStep(v, 1)}>▼</button>
              </div>`}
          ${i.image ? a`<img class="brl-step__thumb" src=${i.image} alt="" loading="lazy" decoding="async" />` : this.renderMarker(i, v + 1)}
          <div class="brl-step__body">
            <h3 class="brl-step__title">
              ${i.title}
              ${i.optional ? a`<span class="brl-badge">${l("اختيارية", "Optional")}</span>` : s}
              ${i.period !== "both" ? a`<span class="brl-badge">${L(i.period, t)}</span>` : s}
            </h3>
            ${this.checked && i.descShort ? a`<p class="brl-step__short">${i.descShort}</p>` : s}
          </div>
          ${f === null ? s : a`<span class="brl-step__result ${f ? "brl-step__result--ok" : "brl-step__result--bad"}" aria-hidden="true">${f ? "✓" : "✗"}</span>`}
        </div>`;
    })}
    </div>`;
  }
  render() {
    const r = this.config || {}, t = K(r, "brl_"), o = t.animate && !Q(), e = this.routines, n = g(r.brl_title), d = g(r.brl_desc), m = Z(r), p = W() === "en" ? "en" : "ar", v = `${Y(r.brl_card_radius, 14)}px`;
    if (!e.length)
      return a`<div class="fs-empty" role="status">
        ${l("أضيفي روتينًا واحدًا على الأقل مع خطواته من إعدادات العنصر.", "Add at least one routine with its steps in the element settings.")}
      </div>`;
    const i = this.currentRoutine(e);
    if (!i) return s;
    const f = m === "quiz" && this.checked && this.order.every((b, w) => b === $(i.steps).map((k) => k.id)[w]), I = g(r.brl_success_msg) || l("أحسنتِ! هذا هو الترتيب الصحيح.", "Well done! This is the correct order."), j = g(r.brl_retry_msg) || l("قريب! عدّلي الترتيب وحاولي مجددًا.", "Close! Adjust the order and try again.");
    return a`
      <section
        class=${x({ "fs-section": !0, "fs-animate": o })}
        style=${z({
      ...G(t),
      "--brl-card-radius": v,
      "--step-color": String(r.brl_step_color ?? t.accent),
      "--success-color": String(r.brl_success_color ?? "#2f9e63"),
      "--error-color": String(r.brl_error_color ?? "#cf4b4b")
    })}
        aria-label=${n || l("ترتيب طبقات روتين العناية", "Routine layering board")}
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
                      class=${x({ "brl-tab": !0, "is-active": b.id === i.id })}
                      aria-selected=${b.id === i.id ? "true" : "false"}
                      @click=${() => this.selectRoutine(b.id)}
                    >${b.name}</button>`
    )}
                </div>
                <select
                  class="brl-select"
                  aria-label=${l("اختاري الروتين", "Choose routine")}
                  @change=${(b) => this.selectRoutine(b.target.value)}
                >
                  ${e.map((b) => a`<option value=${b.id} ?selected=${b.id === i.id}>${b.name}</option>`)}
                </select>
              ` : s}

          ${m === "quiz" ? a`<div class="brl-toolbar">
                <p class="brl-hint">${l("رتّبي الخطوات بالسحب أو بالأسهم ثم تحققي.", "Order the steps by dragging or with arrows, then check.")}</p>
                ${y(r.brl_enable_drag, !0) ? a`<p class="brl-drag-tip">
                      <span class="brl-drag-tip__icon" aria-hidden="true">⠿</span>
                      ${l("على الجوال: اضغطي على المقبض واسحبي", "On mobile: press the handle and drag")}
                    </p>` : s}
              </div>` : s}

          ${m === "quiz" ? this.renderQuiz(i, p) : this.renderGuide(i, p)}

          ${m === "quiz" && this.checked ? a`<div class=${x({ "brl-feedback": !0, "brl-feedback--win": f, "brl-feedback--retry": !f })} role="status">
                <span class="brl-feedback__icon" aria-hidden="true">${f ? "✓" : "↻"}</span>
                <span class="brl-feedback__msg">${f ? I : j}</span>
                <span class="brl-feedback__score">
                  ${(() => {
      const b = $(i.steps).map((k) => k.id), w = this.order.filter((k, q) => k === b[q]).length;
      return l(`${w} من ${i.steps.length} صحيحة`, `${w} of ${i.steps.length} correct`);
    })()}
                </span>
              </div>` : s}

          ${m === "quiz" ? a`<div class="brl-actions">
                ${y(r.brl_enable_check, !0) && !this.revealed ? a`<button type="button" class="fs-btn" @click=${() => this.verify(i)}>${l("تحقّقي من الترتيب", "Check order")}</button>` : s}
                ${y(r.brl_enable_retry, !0) ? a`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.retry(i)}>${l("إعادة المحاولة", "Try again")}</button>` : s}
                ${y(r.brl_show_answer, !0) ? a`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.showAnswer(i)}>${l("إظهار الترتيب الصحيح", "Show correct order")}</button>` : s}
              </div>` : s}

          <span class="brl-sr" role="status" aria-live="polite">${this.announce}</span>
        </div>
      </section>
    `;
  }
};
M.styles = [H, V];
let h = M;
u([
  D({ type: Object })
], h.prototype, "config");
u([
  _()
], h.prototype, "routineId");
u([
  _()
], h.prototype, "expandedId");
u([
  _()
], h.prototype, "order");
u([
  _()
], h.prototype, "orderKey");
u([
  _()
], h.prototype, "checked");
u([
  _()
], h.prototype, "revealed");
u([
  _()
], h.prototype, "draggingId");
u([
  _()
], h.prototype, "announce");
typeof h < "u" && h.registerSallaComponent("salla-beauty-routine-layering-board");
export {
  h as default
};
