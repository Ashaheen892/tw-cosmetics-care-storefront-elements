import { css as M, LitElement as F, nothing as l, html as t } from "lit";
import { property as N, state as O } from "lit/decorators.js";
import { classMap as w } from "lit/directives/class-map.js";
import { styleMap as h } from "lit/directives/style-map.js";
import { g as b, n as R, l as f, t as n, s as V, r as j, p as W, a as k, i as v } from "./sharedStyles--LaFqDVC.js";
const H = M`
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
    background: var(--accent-color, #c2527f);
    color: #fff;
    box-shadow: 0 4px 12px rgba(43, 33, 28, 0.18);
  }

  .bwp-grid-scroll {
    overflow: visible;
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--accent-color, #c2527f) 6%, var(--section-bg, #fbf5f8)),
      color-mix(in srgb, var(--accent-color, #c2527f) 3%, var(--card-bg, #fff))
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
      color-mix(in srgb, var(--accent-color, #c2527f) 18%, var(--card-bg, #fff)),
      color-mix(in srgb, var(--accent-color, #c2527f) 8%, var(--card-bg, #fff))
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
    background: color-mix(in srgb, var(--accent-color, #c2527f) 14%, var(--card-bg, #fff));
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
    color: var(--accent-color, #c2527f);
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
    background: color-mix(in srgb, var(--chip-color, var(--accent-color, #c2527f)) 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--chip-color, var(--accent-color, #c2527f)) 28%, transparent);
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
    background: var(--chip-color, var(--accent-color, #c2527f));
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
    color: color-mix(in srgb, var(--muted-color, #8f7a86) 75%, var(--accent-color, #c2527f));
    opacity: 0.9;
    padding: 0.65rem 0.4rem;
    text-align: center;
  }

  .bwp-day.is-empty .bwp-day__empty {
    background: radial-gradient(
      circle at 50% 40%,
      color-mix(in srgb, var(--accent-color, #c2527f) 6%, transparent),
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
    background: var(--chip-color, var(--accent-color, #c2527f));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--chip-color, var(--accent-color, #c2527f)) 22%, transparent);
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
    color: var(--accent-color, #c2527f);
    background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
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
`, I = ["daily", "x3", "x2", "x1", "alternate"], U = ["am", "pm", "both"], K = ["sat", "sun", "mon"], P = ["week", "am", "pm"], Q = [
  { ar: "السبت", en: "Saturday" },
  { ar: "الأحد", en: "Sunday" },
  { ar: "الإثنين", en: "Monday" },
  { ar: "الثلاثاء", en: "Tuesday" },
  { ar: "الأربعاء", en: "Wednesday" },
  { ar: "الخميس", en: "Thursday" },
  { ar: "الجمعة", en: "Friday" }
], Y = { sat: 0, sun: 1, mon: 2 };
function G(o) {
  const e = b(o.bwp_start_day, "sat");
  return K.includes(e) ? e : "sat";
}
function J(o) {
  const e = b(o.bwp_view_default, "week");
  return P.includes(e) ? e : "week";
}
function X(o) {
  const e = b(o, "daily");
  return I.includes(e) ? e : "daily";
}
function Z(o) {
  const e = b(o, "both");
  return U.includes(e) ? e : "both";
}
function B(o) {
  return R(o).map((e, r) => {
    const s = f(e.name);
    return {
      id: String(e.step_id ?? "").trim() || `step-${r + 1}`,
      name: s,
      color: String(e.color ?? "").trim(),
      icon: String(e.icon ?? "").trim(),
      slot: Z(e.slot),
      frequency: X(e.frequency),
      note: f(e.note)
    };
  }).filter((e) => !!e.name);
}
function ee(o) {
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
function re(o) {
  const e = Y[o] ?? 0;
  return Array.from({ length: 7 }, (r, s) => {
    const a = Q[(e + s) % 7];
    return n(a.ar, a.en);
  });
}
function te() {
  return n("راحة", "Rest");
}
function ae(o) {
  switch (o) {
    case "daily":
      return n("يوميًا", "Daily");
    case "x3":
      return n("3 مرات أسبوعيًا", "3× per week");
    case "x2":
      return n("مرتين أسبوعيًا", "2× per week");
    case "x1":
      return n("مرة أسبوعيًا", "Once a week");
    case "alternate":
      return n("يوم بعد يوم", "Every other day");
    default:
      return n("يوميًا", "Daily");
  }
}
function oe(o, e, r) {
  const s = Array.from({ length: 7 }, () => ({
    am: [],
    pm: []
  }));
  for (const a of o) {
    const i = a.slot === "am" || a.slot === "both", d = a.slot === "pm" || a.slot === "both";
    for (const m of ee(a.frequency))
      m < 0 || m > 6 || (i && r !== "pm" && s[m].am.push(a), d && r !== "am" && s[m].pm.push(a));
  }
  return s;
}
var ne = Object.defineProperty, S = (o, e, r, s) => {
  for (var a = void 0, i = o.length - 1, d; i >= 0; i--)
    (d = o[i]) && (a = d(e, r, a) || a);
  return a && ne(e, r, a), a;
};
const _ = class _ extends F {
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
    var i;
    if (!e.has("config")) return;
    const r = b((i = this.config) == null ? void 0 : i.bwp_view_default, "week"), s = e.get("config"), a = s ? b(s.bwp_view_default, "week") : void 0;
    (!this.viewSynced || a !== r) && (this.view = J(this.config || {}), this.viewSynced = !0);
  }
  get steps() {
    var e;
    return B((e = this.config) == null ? void 0 : e.bwp_steps);
  }
  setView(e) {
    this.view = e;
  }
  renderChip(e) {
    const r = e.icon.startsWith("sicon-");
    return t`
      <span
        class="bwp-chip"
        style=${h(e.color ? { "--chip-color": e.color } : {})}
      >
        <span class="bwp-chip__dot"></span>
        ${e.icon ? t`<span class="bwp-chip__icon ${r ? e.icon : ""}">${r ? "" : e.icon}</span>` : l}
        <span class="bwp-chip__name" title=${e.name}>${e.name}</span>
      </span>
    `;
  }
  renderSlot(e, r) {
    return t`
      <div class="bwp-slot">
        <span class="bwp-slot__label">${e}</span>
        ${r.length ? t`<div class="bwp-chips">${r.map((s) => this.renderChip(s))}</div>` : t`<span class="bwp-slot--empty">${n("لا خطوات", "No steps")}</span>`}
      </div>
    `;
  }
  renderToggle() {
    const e = [
      { id: "week", label: n("الأسبوع الكامل", "Full week") },
      { id: "am", label: n("صباحًا", "Morning") },
      { id: "pm", label: n("مساءً", "Evening") }
    ];
    return t`
      <div class="bwp-toolbar">
        <div class="bwp-toggle" role="group" aria-label=${n("طريقة العرض", "View mode")}>
          ${e.map(
      (r) => t`
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
    const e = this.config || {}, r = j(e, "bwp_"), s = r.animate && !W(), a = this.steps, i = f(e.bwp_title), d = f(e.bwp_desc);
    if (!a.length)
      return t`
        <section
          class=${w({ "fs-section": !0, "fs-animate": s })}
          style=${h(k(r))}
          aria-label=${i || n("مخطط الروتين الأسبوعي", "Weekly routine planner")}
        >
          <div class="fs-container">
            ${i || d ? t`<div class="fs-header">
                  ${i ? t`<h2 class="fs-title">${i}</h2>` : l}
                  ${d ? t`<p class="fs-desc">${d}</p>` : l}
                </div>` : l}
            <div class="fs-empty" role="status">
              ${n("أضيفي خطوات الروتين من إعدادات العنصر.", "Add routine steps in the element settings.")}
            </div>
          </div>
        </section>
      `;
    const m = G(e), C = re(m), z = oe(a, m, this.view), L = v(e.bwp_show_view_toggle, !0), T = v(e.bwp_show_legend, !0), E = v(e.bwp_show_notice, !0), D = f(e.bwp_notice) || n(
      "خطة إرشادية؛ عدّليها حسب توصية أخصائي بشرتك.",
      "A guiding plan; adjust it to your skincare specialist’s advice."
    ), y = n("صباحًا", "Morning"), x = n("مساءً", "Evening"), q = n("صباحًا ومساءً", "Morning & evening");
    return t`
      <section
        class=${w({ "fs-section": !0, "fs-animate": s })}
        style=${h(k(r))}
        aria-label=${i || n("مخطط الروتين الأسبوعي", "Weekly routine planner")}
      >
        <div class="fs-container">
          ${i || d ? t`<div class="fs-header">
                ${i ? t`<h2 class="fs-title">${i}</h2>` : l}
                ${d ? t`<p class="fs-desc">${d}</p>` : l}
              </div>` : l}

          ${L ? this.renderToggle() : l}

          <div class="bwp-grid-scroll">
            <div class=${w({ "bwp-grid": !0, [`bwp-grid--${this.view}`]: !0 })} role="list">
              ${C.map((c, u) => {
      const p = z[u], $ = p.am.length > 0 || p.pm.length > 0;
      return t`
                  <div class=${w({ "bwp-day": !0, "is-empty": !$ })} role="listitem">
                    <div class="bwp-day__head">${c}</div>
                    <div class="bwp-day__body">
                      ${$ ? this.view === "week" ? t`<div class="bwp-slots bwp-slots--split">
                              ${this.renderSlot(y, p.am)}
                              ${this.renderSlot(x, p.pm)}
                            </div>` : t`<div class="bwp-chips">
                              ${[...p.am, ...p.pm].map((A) => this.renderChip(A))}
                            </div>` : t`<span class="bwp-day__empty">${te()}</span>`}
                    </div>
                  </div>
                `;
    })}
            </div>
          </div>

          ${T ? t`<div class="bwp-legend">
                ${a.map((c) => {
      const u = c.icon.startsWith("sicon-"), p = c.slot === "am" ? y : c.slot === "pm" ? x : q;
      return t`
                    <div
                      class="bwp-legend__item"
                      style=${h(c.color ? { "--chip-color": c.color } : {})}
                    >
                      <span class="bwp-legend__swatch"></span>
                      <span class="bwp-legend__text">
                        <span class="bwp-legend__name">
                          ${c.icon ? t`<span class="${u ? c.icon : ""}">${u ? "" : c.icon}</span>` : l}
                          ${c.name}
                        </span>
                        <span class="bwp-legend__freq">
                          ${ae(c.frequency)}${c.note ? t` · ${c.note}` : l}
                        </span>
                      </span>
                      <span class="bwp-legend__slot">${p}</span>
                    </div>
                  `;
    })}
              </div>` : l}

          ${E ? t`<p class="bwp-notice">${D}</p>` : l}
        </div>
      </section>
    `;
  }
};
_.styles = [V, H];
let g = _;
S([
  N({ type: Object })
], g.prototype, "config");
S([
  O()
], g.prototype, "view");
typeof g < "u" && g.registerSallaComponent("salla-beauty-weekly-planner");
export {
  g as default
};
