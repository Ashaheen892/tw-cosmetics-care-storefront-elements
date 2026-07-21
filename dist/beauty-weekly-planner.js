import { css as M, LitElement as O, nothing as c, html as a } from "lit";
import { property as F, state as N } from "lit/decorators.js";
import { classMap as w } from "lit/directives/class-map.js";
import { styleMap as h } from "lit/directives/style-map.js";
import { g as b, n as R, l as f, t as i, s as V, r as j, p as W, a as k, i as v, b as H } from "./sharedStyles-BgfDOkwJ.js";
const I = M`
  .bwp-toolbar {
    display: flex;
    justify-content: center;
    margin-bottom: 1.25rem;
  }

  .bwp-toggle {
    display: inline-flex;
    gap: 0.25rem;
    padding: 0.28rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 40%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #f2dde7);
    flex-wrap: wrap;
    justify-content: center;
  }

  .bwp-toggle__btn {
    min-height: 40px;
    padding: 0.45rem 1rem;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: var(--muted-color, #8f7a86);
    font: inherit;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bwp-toggle__btn:hover {
    color: var(--text-color, #33232e);
  }

  .bwp-toggle__btn[aria-pressed='true'] {
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    box-shadow: 0 4px 12px rgba(43, 33, 28, 0.18);
  }

  .bwp-grid-scroll {
    overflow: visible;
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--section-bg, #fbf5f8)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 3%, var(--card-bg, #fff))
    );
    border: 1px solid var(--border-color, #f2dde7);
    padding: 0.75rem;
  }

  .bwp-grid {
    display: grid;
    gap: 0.65rem;
  }

  /* Mobile / tablet: readable vertical day cards */
  .bwp-grid {
    grid-template-columns: 1fr;
  }

  .bwp-grid--am .bwp-day__head,
  .bwp-grid--pm .bwp-day__head {
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, var(--card-bg, #fff)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff))
    );
  }

  .bwp-day {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 20px) * 0.65);
    background: var(--card-bg, #fff);
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(43, 33, 28, 0.06);
    min-height: 0;
  }

  .bwp-day.is-empty {
    background: color-mix(in srgb, var(--border-color, #f2dde7) 18%, var(--card-bg, #fff));
  }

  .bwp-day__head {
    padding: 0.75rem 0.9rem;
    text-align: start;
    font-size: 0.95rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, var(--card-bg, #fff));
    border-bottom: 1px solid var(--border-color, #f2dde7);
    letter-spacing: 0.01em;
  }

  .bwp-day__body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.8rem 0.85rem 0.9rem;
    flex: 1 1 auto;
  }

  .bwp-slots {
    display: grid;
    gap: 0.75rem;
  }

  @media (min-width: 480px) {
    .bwp-slots--split {
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }
  }

  .bwp-slot {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    min-width: 0;
  }

  .bwp-slot__label {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bwp-slot__label::before {
    content: '';
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.7;
  }

  .bwp-chips {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .bwp-chip {
    display: flex;
    align-items: flex-start;
    gap: 0.45rem;
    padding: 0.55rem 0.65rem;
    border-radius: 0.7rem;
    background: color-mix(in srgb, var(--chip-color, var(--accent-color, var(--fs-store-primary))) 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--chip-color, var(--accent-color, var(--fs-store-primary))) 28%, transparent);
    font-size: 0.9rem;
    line-height: 1.45;
    color: var(--text-color, #33232e);
  }

  .bwp-chip__dot {
    flex: 0 0 auto;
    width: 0.75rem;
    height: 0.75rem;
    margin-top: 0.28rem;
    border-radius: 50%;
    background: var(--chip-color, var(--accent-color, var(--fs-store-primary)));
  }

  .bwp-chip__icon {
    flex: 0 0 auto;
    margin-top: 0.1rem;
    font-size: 1rem;
    line-height: 1;
  }

  .bwp-chip__name {
    min-width: 0;
    flex: 1 1 auto;
    font-weight: 700;
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    word-break: break-word;
  }

  .bwp-slot--empty,
  .bwp-day__empty {
    display: grid;
    place-items: center;
    flex: 1;
    min-height: 3rem;
    font-size: 0.86rem;
    font-weight: 700;
    font-style: italic;
    color: color-mix(in srgb, var(--muted-color, #8f7a86) 75%, var(--accent-color, var(--fs-store-primary)));
    opacity: 0.9;
    padding: 0.65rem 0.4rem;
    text-align: center;
  }

  .bwp-day.is-empty .bwp-day__empty {
    background: radial-gradient(
      circle at 50% 40%,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, transparent),
      transparent 70%
    );
  }

  /* Legend */
  .bwp-legend {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.65rem;
  }

  .bwp-legend__item {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.7rem 0.8rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    background: var(--card-bg, #fff);
  }

  .bwp-legend__swatch {
    flex: 0 0 auto;
    width: 1.1rem;
    height: 1.1rem;
    margin-top: 0.15rem;
    border-radius: 50%;
    background: var(--chip-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--chip-color, var(--accent-color, var(--fs-store-primary))) 22%, transparent);
  }

  .bwp-legend__text {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
    flex: 1 1 auto;
  }

  .bwp-legend__name {
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    flex-wrap: wrap;
    line-height: 1.4;
  }

  .bwp-legend__freq {
    font-size: 0.82rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.5;
    white-space: normal;
  }

  .bwp-legend__slot {
    margin-inline-start: auto;
    flex: 0 0 auto;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    white-space: nowrap;
  }

  .bwp-notice {
    margin-top: 1.35rem;
    text-align: center;
    font-size: 0.84rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.65;
  }

  /* Desktop: classic 7-day week table */
  @media (min-width: 960px) {
    .bwp-grid-scroll {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-x: contain;
      scrollbar-width: thin;
    }

    .bwp-grid {
      grid-template-columns: repeat(7, minmax(0, 1fr));
      gap: 0.55rem;
      min-width: 0;
    }

    .bwp-day {
      min-height: 8rem;
    }

    .bwp-day__head {
      text-align: center;
      font-size: 0.84rem;
      padding: 0.6rem 0.4rem;
    }

    .bwp-day__body {
      padding: 0.55rem 0.45rem 0.65rem;
      gap: 0.5rem;
    }

    .bwp-slots--split {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .bwp-slot__label {
      font-size: 0.72rem;
    }

    .bwp-chip {
      font-size: 0.8rem;
      padding: 0.4rem 0.5rem;
      align-items: center;
    }

    .bwp-chip__dot {
      margin-top: 0;
    }

    .bwp-chip__name {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .bwp-legend {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bwp-toggle__btn {
      transition: none !important;
    }
  }
`, U = ["daily", "x3", "x2", "x1", "alternate"], K = ["am", "pm", "both"], P = ["sat", "sun", "mon"], Q = ["week", "am", "pm"], Y = [
  { ar: "السبت", en: "Saturday" },
  { ar: "الأحد", en: "Sunday" },
  { ar: "الإثنين", en: "Monday" },
  { ar: "الثلاثاء", en: "Tuesday" },
  { ar: "الأربعاء", en: "Wednesday" },
  { ar: "الخميس", en: "Thursday" },
  { ar: "الجمعة", en: "Friday" }
], G = { sat: 0, sun: 1, mon: 2 };
function J(o) {
  const e = b(o.bwp_start_day, "sat");
  return P.includes(e) ? e : "sat";
}
function X(o) {
  const e = b(o.bwp_view_default, "week");
  return Q.includes(e) ? e : "week";
}
function Z(o) {
  const e = b(o, "daily");
  return U.includes(e) ? e : "daily";
}
function B(o) {
  const e = b(o, "both");
  return K.includes(e) ? e : "both";
}
function ee(o) {
  return R(o).map((e, r) => {
    const s = f(e.name);
    return {
      id: String(e.id ?? e.step_id ?? "").trim() || `step-${r + 1}`,
      name: s,
      color: String(e.color ?? "").trim(),
      icon: String(e.icon ?? "").trim(),
      slot: B(e.slot),
      frequency: Z(e.frequency),
      note: f(e.note)
    };
  }).filter((e) => !!e.name);
}
function re(o) {
  switch (o) {
    case "daily":
      return [0, 1, 2, 3, 4, 5, 6];
    case "x3":
      return [0, 2, 4];
    case "x2":
      return [1, 4];
    case "x1":
      return [1];
    case "alternate":
      return [0, 2, 4, 6];
    default:
      return [0, 1, 2, 3, 4, 5, 6];
  }
}
function ae(o) {
  const e = G[o] ?? 0;
  return Array.from({ length: 7 }, (r, s) => {
    const t = Y[(e + s) % 7];
    return i(t.ar, t.en);
  });
}
function te() {
  return i("راحة", "Rest");
}
function oe(o) {
  switch (o) {
    case "daily":
      return i("يوميًا", "Daily");
    case "x3":
      return i("3 مرات أسبوعيًا", "3× per week");
    case "x2":
      return i("مرتين أسبوعيًا", "2× per week");
    case "x1":
      return i("مرة أسبوعيًا", "Once a week");
    case "alternate":
      return i("يوم بعد يوم", "Every other day");
    default:
      return i("يوميًا", "Daily");
  }
}
function ie(o, e, r) {
  const s = Array.from({ length: 7 }, () => ({
    am: [],
    pm: []
  }));
  for (const t of o) {
    const n = t.slot === "am" || t.slot === "both", d = t.slot === "pm" || t.slot === "both";
    for (const m of re(t.frequency))
      m < 0 || m > 6 || (n && r !== "pm" && s[m].am.push(t), d && r !== "am" && s[m].pm.push(t));
  }
  return s;
}
var ne = Object.defineProperty, S = (o, e, r, s) => {
  for (var t = void 0, n = o.length - 1, d; n >= 0; n--)
    (d = o[n]) && (t = d(e, r, t) || t);
  return t && ne(e, r, t), t;
};
const y = class y extends O {
  constructor() {
    super(...arguments), this.config = {}, this.view = "week", this.viewSynced = !1, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    var n;
    if (!e.has("config")) return;
    const r = b((n = this.config) == null ? void 0 : n.bwp_view_default, "week"), s = e.get("config"), t = s ? b(s.bwp_view_default, "week") : void 0;
    (!this.viewSynced || t !== r) && (this.view = X(this.config || {}), this.viewSynced = !0);
  }
  get steps() {
    var e;
    return ee((e = this.config) == null ? void 0 : e.bwp_steps);
  }
  setView(e) {
    this.view = e;
  }
  renderChip(e) {
    const r = e.icon.startsWith("sicon-");
    return a`
      <span
        class="bwp-chip"
        style=${h(e.color ? { "--chip-color": e.color } : {})}
      >
        <span class="bwp-chip__dot"></span>
        ${e.icon ? a`<span class="bwp-chip__icon ${r ? e.icon : ""}">${r ? "" : e.icon}</span>` : c}
        <span class="bwp-chip__name" title=${e.name}>${e.name}</span>
      </span>
    `;
  }
  renderSlot(e, r) {
    return a`
      <div class="bwp-slot">
        <span class="bwp-slot__label">${e}</span>
        ${r.length ? a`<div class="bwp-chips">${r.map((s) => this.renderChip(s))}</div>` : a`<span class="bwp-slot--empty">${i("لا خطوات", "No steps")}</span>`}
      </div>
    `;
  }
  renderToggle() {
    const e = [
      { id: "week", label: i("الأسبوع الكامل", "Full week") },
      { id: "am", label: i("صباحًا", "Morning") },
      { id: "pm", label: i("مساءً", "Evening") }
    ];
    return a`
      <div class="bwp-toolbar">
        <div class="bwp-toggle" role="group" aria-label=${i("طريقة العرض", "View mode")}>
          ${e.map(
      (r) => a`
              <button
                type="button"
                class="bwp-toggle__btn"
                aria-pressed=${this.view === r.id ? "true" : "false"}
                @click=${() => this.setView(r.id)}
              >
                ${r.label}
              </button>
            `
    )}
        </div>
      </div>
    `;
  }
  render() {
    const e = this.config || {}, r = j(e, "bwp_"), s = r.animate && !W(), t = this.steps, n = f(e.bwp_title), d = f(e.bwp_desc);
    if (!t.length)
      return a`
        <section
          class=${w({ "fs-section": !0, "fs-animate": s })}
          style=${h(k(r))}
          aria-label=${n || i("مخطط الروتين الأسبوعي", "Weekly routine planner")}
        >
          <div class="fs-container">
            ${n || d ? a`<div class="fs-header">
                  ${n ? a`<h2 class="fs-title">${n}</h2>` : c}
                  ${d ? a`<p class="fs-desc">${d}</p>` : c}
                </div>` : c}
            <div class="fs-empty" role="status">
              ${i("أضيفي خطوات الروتين من إعدادات العنصر.", "Add routine steps in the element settings.")}
            </div>
          </div>
        </section>
      `;
    const m = J(e), C = ae(m), z = ie(t, m, this.view), L = v(e.bwp_show_view_toggle, !0), T = v(e.bwp_show_legend, !0), E = v(e.bwp_show_notice, !0), D = f(e.bwp_notice) || i(
      "خطة إرشادية؛ عدّليها حسب توصية أخصائي بشرتك.",
      "A guiding plan; adjust it to your skincare specialist’s advice."
    ), _ = i("صباحًا", "Morning"), x = i("مساءً", "Evening"), q = i("صباحًا ومساءً", "Morning & evening");
    return a`
      <section
        class=${w({ "fs-section": !0, "fs-animate": s })}
        style=${h(k(r))}
        aria-label=${n || i("مخطط الروتين الأسبوعي", "Weekly routine planner")}
      >
        <div class="fs-container">
          ${n || d ? a`<div class="fs-header">
                ${n ? a`<h2 class="fs-title">${n}</h2>` : c}
                ${d ? a`<p class="fs-desc">${d}</p>` : c}
              </div>` : c}

          ${L ? this.renderToggle() : c}

          <div class="bwp-grid-scroll">
            <div class=${w({ "bwp-grid": !0, [`bwp-grid--${this.view}`]: !0 })} role="list">
              ${C.map((l, u) => {
      const p = z[u], $ = p.am.length > 0 || p.pm.length > 0;
      return a`
                  <div class=${w({ "bwp-day": !0, "is-empty": !$ })} role="listitem">
                    <div class="bwp-day__head">${l}</div>
                    <div class="bwp-day__body">
                      ${$ ? this.view === "week" ? a`<div class="bwp-slots bwp-slots--split">
                              ${this.renderSlot(_, p.am)}
                              ${this.renderSlot(x, p.pm)}
                            </div>` : a`<div class="bwp-chips">
                              ${[...p.am, ...p.pm].map((A) => this.renderChip(A))}
                            </div>` : a`<span class="bwp-day__empty">${te()}</span>`}
                    </div>
                  </div>
                `;
    })}
            </div>
          </div>

          ${T ? a`<div class="bwp-legend">
                ${t.map((l) => {
      const u = l.icon.startsWith("sicon-"), p = l.slot === "am" ? _ : l.slot === "pm" ? x : q;
      return a`
                    <div
                      class="bwp-legend__item"
                      style=${h(l.color ? { "--chip-color": l.color } : {})}
                    >
                      <span class="bwp-legend__swatch"></span>
                      <span class="bwp-legend__text">
                        <span class="bwp-legend__name">
                          ${l.icon ? a`<span class="${u ? l.icon : ""}">${u ? "" : l.icon}</span>` : c}
                          ${l.name}
                        </span>
                        <span class="bwp-legend__freq">
                          ${oe(l.frequency)}${l.note ? a` · ${l.note}` : c}
                        </span>
                      </span>
                      <span class="bwp-legend__slot">${p}</span>
                    </div>
                  `;
    })}
              </div>` : c}

          ${E ? a`<p class="bwp-notice">${D}</p>` : c}
          ${H({ config: e, prefix: "bwp_", ready: !0 })}
        </div>
      </section>
    `;
  }
};
y.styles = [V, I];
let g = y;
S([
  F({ type: Object })
], g.prototype, "config");
S([
  N()
], g.prototype, "view");
typeof g < "u" && g.registerSallaComponent("salla-beauty-weekly-planner");
export {
  g as default
};
