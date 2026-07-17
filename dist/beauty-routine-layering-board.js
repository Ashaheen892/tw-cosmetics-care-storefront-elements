import { css as A, LitElement as E, nothing as a, html as s } from "lit";
import { property as T, state as $ } from "lit/decorators.js";
import { classMap as x } from "lit/directives/class-map.js";
import { styleMap as z } from "lit/directives/style-map.js";
import { n as R, l as g, g as S, h as D, i as k, e as U, s as H, t as l, r as K, p as Q, j as W, c as G, a as V } from "./sharedStyles-cRSiglXC.js";
const F = A`
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
`, N = ["layers", "drops", "bottles", "stairs", "path", "circles"], X = ["morning", "evening", "both"];
function Y(c) {
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
      optional: k(r.optional, !1),
      period: X.includes(o) ? o : "both",
      correctOrder: D(r.correct_order, t + 1)
    };
  }).filter((r) => r.title);
}
function J(c) {
  return R(c).map((r, t) => ({
    id: String(r.routine_id ?? "").trim() || `routine-${t + 1}`,
    name: g(r.name) || `${t + 1}`,
    steps: Y(r.steps)
  })).filter((r) => r.steps.length);
}
function _(c) {
  return [...c].sort((r, t) => r.correctOrder - t.correctOrder);
}
function O(c) {
  const r = c.map((e) => e.id);
  if (r.length < 2) return r;
  const t = _(c).map((e) => e.id);
  let o = [...r];
  for (let e = 0; e < 6; e += 1) {
    for (let i = o.length - 1; i > 0; i -= 1) {
      const d = Math.floor(Math.random() * (i + 1));
      [o[i], o[d]] = [o[d], o[i]];
    }
    if (o.some((i, d) => i !== t[d])) return o;
  }
  return o = [...t.slice(1), t[0]], o;
}
function Z(c) {
  return S(c.brl_mode, "guide") === "quiz" ? "quiz" : "guide";
}
function P(c) {
  const r = S(c.brl_shape, "layers");
  return N.includes(r) ? r : "layers";
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
var B = Object.defineProperty, f = (c, r, t, o) => {
  for (var e = void 0, i = c.length - 1, d; i >= 0; i--)
    (d = c[i]) && (e = d(r, t, e) || e);
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
    var i;
    if (!this.draggingId) return;
    const t = (i = this.shadowRoot) == null ? void 0 : i.elementFromPoint(r.clientX, r.clientY), o = t == null ? void 0 : t.closest("[data-step]"), e = o == null ? void 0 : o.getAttribute("data-step");
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
    const t = _(r.steps).map((e) => e.id), o = this.order.filter((e, i) => e === t[i]).length;
    this.announce = o === r.steps.length ? l("ترتيب صحيح تمامًا.", "Perfect order.") : l(`${o} من ${r.steps.length} في مكانها الصحيح.`, `${o} of ${r.steps.length} in the correct place.`);
  }
  showAnswer(r) {
    this.order = _(r.steps).map((t) => t.id), this.checked = !0, this.revealed = !0;
  }
  retry(r) {
    this.order = O(r.steps), this.checked = !1, this.revealed = !1, this.announceOrder();
  }
  renderMeta(r) {
    const t = [
      r.timing ? s`<span>${l("التوقيت", "When")}: <b>${r.timing}</b></span>` : a,
      r.wait ? s`<span>${l("الانتظار", "Wait")}: <b>${r.wait}</b></span>` : a,
      r.amount ? s`<span>${l("الكمية", "Amount")}: <b>${r.amount}</b></span>` : a
    ].filter((o) => o !== a);
    return t.length ? s`<div class="brl-meta">${t}</div>` : a;
  }
  renderMarker(r, t) {
    return s`<span
      class="brl-step__marker"
      style=${z(r.color ? { "--step-color": r.color } : {})}
    >
      ${r.icon ? r.icon.startsWith("sicon-") ? s`<span class="brl-icon ${r.icon}"></span>` : s`<span class="brl-icon">${r.icon}</span>` : t}
    </span>`;
  }
  renderGuide(r, t) {
    const o = _(r.steps);
    return s`<div
      class=${x({ "brl-board": !0, [`brl-board--${P(this.config)}`]: !0, "brl-board--horizontal": C(this.config) === "horizontal" })}
    >
      ${o.map((e, i) => {
      const d = this.expandedId === e.id;
      return s`<div class="brl-step" style=${z(e.color ? { "--step-color": e.color } : {})}>
          ${this.renderMarker(e, i + 1)}
          <div class="brl-step__body">
            <h3 class="brl-step__title">
              ${e.title}
              ${e.optional ? s`<span class="brl-badge">${l("اختيارية", "Optional")}</span>` : a}
              ${e.period !== "both" ? s`<span class="brl-badge">${L(e.period, t)}</span>` : a}
            </h3>
            ${e.descShort ? s`<p class="brl-step__short">${e.descShort}</p>` : a}
            ${this.renderMeta(e)}
            ${d ? s`
                  ${e.descLong ? s`<p class="brl-step__long">${e.descLong}</p>` : a}
                  ${e.note ? s`<p class="brl-step__note">★ ${e.note}</p>` : a}
                ` : a}
          </div>
          ${e.descLong || e.note ? s`<button
                type="button"
                class="brl-step__toggle"
                aria-expanded=${d ? "true" : "false"}
                aria-label=${d ? l("إخفاء التفاصيل", "Hide details") : l("عرض التفاصيل", "Show details")}
                @click=${() => this.toggleExpand(e.id)}
              >${d ? "−" : "+"}</button>` : a}
        </div>`;
    })}
    </div>`;
  }
  renderQuiz(r, t) {
    var m;
    const o = this.ensureOrder(r), e = new Map(r.steps.map((p) => [p.id, p])), i = _(r.steps).map((p) => p.id), d = k((m = this.config) == null ? void 0 : m.brl_enable_drag, !0) && !this.revealed;
    return s`<div
      class=${x({ "brl-board": !0, [`brl-board--${P(this.config)}`]: !0, "brl-board--horizontal": C(this.config) === "horizontal" })}
      @pointermove=${this.onPointerMove}
      @pointerup=${this.onPointerUp}
      @pointercancel=${this.onPointerUp}
    >
      ${o.map((p, v) => {
      const n = e.get(p);
      if (!n) return a;
      const u = this.checked ? p === i[v] : null;
      return s`<div
          class=${x({
        "brl-step": !0,
        "is-dragging": this.draggingId === p,
        "is-ok": u === !0,
        "is-bad": u === !1
      })}
          data-step=${p}
          style=${z(n.color ? { "--step-color": n.color } : {})}
        >
          ${d ? s`<div class="brl-handles">
                <button
                  type="button"
                  class="brl-handle brl-handle--drag"
                  aria-label=${l("اسحبي لإعادة الترتيب", "Drag to reorder")}
                  @pointerdown=${(I) => this.onPointerDown(I, p)}
                >⠿</button>
                <button type="button" class="brl-handle" ?disabled=${v === 0} aria-label=${l("نقل لأعلى", "Move up")} @click=${() => this.moveStep(v, -1)}>▲</button>
                <button type="button" class="brl-handle" ?disabled=${v === o.length - 1} aria-label=${l("نقل لأسفل", "Move down")} @click=${() => this.moveStep(v, 1)}>▼</button>
              </div>` : a}
          ${this.renderMarker(n, v + 1)}
          <div class="brl-step__body">
            <h3 class="brl-step__title">
              ${n.title}
              ${n.optional ? s`<span class="brl-badge">${l("اختيارية", "Optional")}</span>` : a}
              ${n.period !== "both" ? s`<span class="brl-badge">${L(n.period, t)}</span>` : a}
            </h3>
            ${this.checked && n.descShort ? s`<p class="brl-step__short">${n.descShort}</p>` : a}
          </div>
          ${u === null ? a : s`<span class="brl-step__result ${u ? "brl-step__result--ok" : "brl-step__result--bad"}" aria-hidden="true">${u ? "✓" : "✗"}</span>`}
        </div>`;
    })}
    </div>`;
  }
  render() {
    const r = this.config || {}, t = K(r, "brl_"), o = t.animate && !Q(), e = this.routines, i = g(r.brl_title), d = g(r.brl_desc), m = Z(r), p = W() === "en" ? "en" : "ar", v = `${G(r.brl_card_radius, 14)}px`;
    if (!e.length)
      return s`<div class="fs-empty" role="status">
        ${l("أضيفي روتينًا واحدًا على الأقل مع خطواته من إعدادات العنصر.", "Add at least one routine with its steps in the element settings.")}
      </div>`;
    const n = this.currentRoutine(e);
    if (!n) return a;
    const u = m === "quiz" && this.checked && this.order.every((b, w) => b === _(n.steps).map((y) => y.id)[w]), I = g(r.brl_success_msg) || l("أحسنتِ! هذا هو الترتيب الصحيح.", "Well done! This is the correct order."), j = g(r.brl_retry_msg) || l("قريب! عدّلي الترتيب وحاولي مجددًا.", "Close! Adjust the order and try again.");
    return s`
      <section
        class=${x({ "fs-section": !0, "fs-animate": o })}
        style=${z({
      ...V(t),
      "--brl-card-radius": v,
      "--step-color": String(r.brl_step_color ?? t.accent),
      "--success-color": String(r.brl_success_color ?? "#2f9e63"),
      "--error-color": String(r.brl_error_color ?? "#cf4b4b")
    })}
        aria-label=${i || l("ترتيب طبقات روتين العناية", "Routine layering board")}
      >
        <div class="fs-container">
          ${i || d ? s`<div class="fs-header">
                ${i ? s`<h2 class="fs-title">${i}</h2>` : a}
                ${d ? s`<p class="fs-desc">${d}</p>` : a}
              </div>` : a}

          ${e.length > 1 ? s`
                <div class="brl-tabs" role="tablist">
                  ${e.map(
      (b) => s`<button
                      type="button"
                      role="tab"
                      class=${x({ "brl-tab": !0, "is-active": b.id === n.id })}
                      aria-selected=${b.id === n.id ? "true" : "false"}
                      @click=${() => this.selectRoutine(b.id)}
                    >${b.name}</button>`
    )}
                </div>
                <select
                  class="brl-select"
                  aria-label=${l("اختاري الروتين", "Choose routine")}
                  @change=${(b) => this.selectRoutine(b.target.value)}
                >
                  ${e.map((b) => s`<option value=${b.id} ?selected=${b.id === n.id}>${b.name}</option>`)}
                </select>
              ` : a}

          ${m === "quiz" ? s`<div class="brl-toolbar">
                <p class="brl-hint">${l("رتّبي الخطوات بالسحب أو بالأسهم ثم تحققي.", "Order the steps by dragging or with arrows, then check.")}</p>
              </div>` : a}

          ${m === "quiz" ? this.renderQuiz(n, p) : this.renderGuide(n, p)}

          ${m === "quiz" && this.checked ? s`<div class=${x({ "brl-feedback": !0, "brl-feedback--win": u, "brl-feedback--retry": !u })} role="status">
                ${u ? I : j}
                <span class="brl-feedback__score">
                  ${(() => {
      const b = _(n.steps).map((y) => y.id), w = this.order.filter((y, q) => y === b[q]).length;
      return l(`${w} من ${n.steps.length} صحيحة`, `${w} of ${n.steps.length} correct`);
    })()}
                </span>
              </div>` : a}

          ${m === "quiz" ? s`<div class="brl-actions">
                ${k(r.brl_enable_check, !0) && !this.revealed ? s`<button type="button" class="fs-btn" @click=${() => this.verify(n)}>${l("تحقّقي من الترتيب", "Check order")}</button>` : a}
                ${k(r.brl_enable_retry, !0) ? s`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.retry(n)}>${l("إعادة المحاولة", "Try again")}</button>` : a}
                ${k(r.brl_show_answer, !0) ? s`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.showAnswer(n)}>${l("إظهار الترتيب الصحيح", "Show correct order")}</button>` : a}
              </div>` : a}

          <span class="brl-sr" role="status" aria-live="polite">${this.announce}</span>
        </div>
      </section>
    `;
  }
};
M.styles = [H, F];
let h = M;
f([
  T({ type: Object })
], h.prototype, "config");
f([
  $()
], h.prototype, "routineId");
f([
  $()
], h.prototype, "expandedId");
f([
  $()
], h.prototype, "order");
f([
  $()
], h.prototype, "orderKey");
f([
  $()
], h.prototype, "checked");
f([
  $()
], h.prototype, "revealed");
f([
  $()
], h.prototype, "draggingId");
f([
  $()
], h.prototype, "announce");
typeof h < "u" && h.registerSallaComponent("salla-beauty-routine-layering-board");
export {
  h as default
};
