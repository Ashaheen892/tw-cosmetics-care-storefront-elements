import { css as M, LitElement as D, nothing as l, html as t } from "lit";
import { property as F, state as O } from "lit/decorators.js";
import { classMap as y } from "lit/directives/class-map.js";
import { styleMap as g } from "lit/directives/style-map.js";
import { g as h, n as V, l as b, t as a, s as j, r as N, p as R, a as $, i as w } from "./sharedStyles-cRSiglXC.js";
const W = M`
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

  /* Horizontal scroll wrapper for phones — no content cut off, no layout shift */
  .bwp-grid-scroll {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scrollbar-width: thin;
    padding-bottom: 0.35rem;
  }

  .bwp-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(120px, 1fr));
    gap: 0.6rem;
    min-width: 640px;
  }

  .bwp-day {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    background: var(--card-bg, #fff);
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(43, 33, 28, 0.05);
  }

  .bwp-day__head {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 0.55rem 0.5rem;
    text-align: center;
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
    background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
    border-bottom: 1px solid var(--border-color, #f2dde7);
  }

  .bwp-day__body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.55rem 0.5rem 0.65rem;
    flex: 1 1 auto;
  }

  .bwp-slot {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .bwp-slot__label {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--muted-color, #8f7a86);
    text-transform: uppercase;
  }

  .bwp-slot__label::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.55;
  }

  .bwp-chips {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .bwp-chip {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.34rem 0.5rem;
    border-radius: 0.55rem;
    background: color-mix(in srgb, var(--chip-color, var(--accent-color, #c2527f)) 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--chip-color, var(--accent-color, #c2527f)) 28%, transparent);
    font-size: 0.78rem;
    line-height: 1.3;
    color: var(--text-color, #33232e);
  }

  .bwp-chip__dot {
    flex: 0 0 auto;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background: var(--chip-color, var(--accent-color, #c2527f));
  }

  .bwp-chip__icon {
    flex: 0 0 auto;
    font-size: 0.9rem;
    line-height: 1;
  }

  .bwp-chip__name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
  }

  .bwp-slot--empty,
  .bwp-day__empty {
    font-size: 0.72rem;
    color: var(--muted-color, #8f7a86);
    opacity: 0.7;
    padding: 0.25rem 0;
    text-align: center;
  }

  /* Legend */
  .bwp-legend {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.6rem;
  }

  .bwp-legend__item {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.55rem 0.7rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    background: var(--card-bg, #fff);
  }

  .bwp-legend__swatch {
    flex: 0 0 auto;
    width: 1.05rem;
    height: 1.05rem;
    border-radius: 50%;
    background: var(--chip-color, var(--accent-color, #c2527f));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--chip-color, var(--accent-color, #c2527f)) 22%, transparent);
  }

  .bwp-legend__text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .bwp-legend__name {
    font-size: 0.86rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  .bwp-legend__freq {
    font-size: 0.76rem;
    color: var(--muted-color, #8f7a86);
  }

  .bwp-legend__slot {
    margin-inline-start: auto;
    flex: 0 0 auto;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--accent-color, #c2527f);
    background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
    padding: 0.12rem 0.5rem;
    border-radius: 999px;
  }

  .bwp-notice {
    margin-top: 1.35rem;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  @media (max-width: 639px) {
    .bwp-grid {
      grid-template-columns: repeat(7, minmax(112px, 1fr));
      min-width: 600px;
    }
    .bwp-legend {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bwp-toggle__btn {
      transition: none !important;
    }
  }
`, H = ["daily", "x3", "x2", "x1", "alternate"], I = ["am", "pm", "both"], P = ["sat", "sun", "mon"], U = ["week", "am", "pm"], K = [
  { ar: "السبت", en: "Saturday" },
  { ar: "الأحد", en: "Sunday" },
  { ar: "الإثنين", en: "Monday" },
  { ar: "الثلاثاء", en: "Tuesday" },
  { ar: "الأربعاء", en: "Wednesday" },
  { ar: "الخميس", en: "Thursday" },
  { ar: "الجمعة", en: "Friday" }
], Q = { sat: 0, sun: 1, mon: 2 };
function Y(n) {
  const e = h(n.bwp_start_day, "sat");
  return P.includes(e) ? e : "sat";
}
function G(n) {
  const e = h(n.bwp_view_default, "week");
  return U.includes(e) ? e : "week";
}
function J(n) {
  const e = h(n, "daily");
  return H.includes(e) ? e : "daily";
}
function X(n) {
  const e = h(n, "both");
  return I.includes(e) ? e : "both";
}
function Z(n) {
  return V(n).map((e, r) => {
    const c = b(e.name);
    return {
      id: String(e.step_id ?? "").trim() || `step-${r + 1}`,
      name: c,
      color: String(e.color ?? "").trim(),
      icon: String(e.icon ?? "").trim(),
      slot: X(e.slot),
      frequency: J(e.frequency),
      note: b(e.note)
    };
  }).filter((e) => !!e.name);
}
function B(n) {
  switch (n) {
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
function ee(n) {
  const e = Q[n] ?? 0;
  return Array.from({ length: 7 }, (r, c) => {
    const o = K[(e + c) % 7];
    return a(o.ar, o.en);
  });
}
function re(n) {
  switch (n) {
    case "daily":
      return a("يوميًا", "Daily");
    case "x3":
      return a("3 مرات أسبوعيًا", "3× per week");
    case "x2":
      return a("مرتين أسبوعيًا", "2× per week");
    case "x1":
      return a("مرة أسبوعيًا", "Once a week");
    case "alternate":
      return a("يوم بعد يوم", "Every other day");
    default:
      return a("يوميًا", "Daily");
  }
}
function te(n, e, r) {
  const c = Array.from({ length: 7 }, () => ({
    am: [],
    pm: []
  }));
  for (const o of n) {
    const i = o.slot === "am" || o.slot === "both", d = o.slot === "pm" || o.slot === "both";
    for (const m of B(o.frequency))
      m < 0 || m > 6 || (i && r !== "pm" && c[m].am.push(o), d && r !== "am" && c[m].pm.push(o));
  }
  return c;
}
var oe = Object.defineProperty, k = (n, e, r, c) => {
  for (var o = void 0, i = n.length - 1, d; i >= 0; i--)
    (d = n[i]) && (o = d(e, r, o) || o);
  return o && oe(e, r, o), o;
};
const v = class v extends D {
  constructor() {
    super(...arguments), this.config = {}, this.view = "week", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.view = G(this.config || {}));
  }
  get steps() {
    var e;
    return Z((e = this.config) == null ? void 0 : e.bwp_steps);
  }
  setView(e) {
    this.view = e;
  }
  renderChip(e) {
    const r = e.icon.startsWith("sicon-");
    return t`
      <span
        class="bwp-chip"
        style=${g(e.color ? { "--chip-color": e.color } : {})}
      >
        <span class="bwp-chip__dot"></span>
        ${e.icon ? t`<span class="bwp-chip__icon ${r ? e.icon : ""}">${r ? "" : e.icon}</span>` : l}
        <span class="bwp-chip__name" title=${e.name}>${e.name}</span>
      </span>
    `;
  }
  renderSlot(e, r) {
    return r.length ? t`
      <div class="bwp-slot">
        <span class="bwp-slot__label">${e}</span>
        <div class="bwp-chips">${r.map((c) => this.renderChip(c))}</div>
      </div>
    ` : l;
  }
  renderToggle() {
    const e = [
      { id: "week", label: a("الأسبوع الكامل", "Full week") },
      { id: "am", label: a("صباحًا", "Morning") },
      { id: "pm", label: a("مساءً", "Evening") }
    ];
    return t`
      <div class="bwp-toolbar">
        <div class="bwp-toggle" role="group" aria-label=${a("طريقة العرض", "View mode")}>
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
    const e = this.config || {}, r = N(e, "bwp_"), c = r.animate && !R(), o = this.steps, i = b(e.bwp_title), d = b(e.bwp_desc);
    if (!o.length)
      return t`
        <section
          class=${y({ "fs-section": !0, "fs-animate": c })}
          style=${g($(r))}
          aria-label=${i || a("مخطط الروتين الأسبوعي", "Weekly routine planner")}
        >
          <div class="fs-container">
            ${i || d ? t`<div class="fs-header">
                  ${i ? t`<h2 class="fs-title">${i}</h2>` : l}
                  ${d ? t`<p class="fs-desc">${d}</p>` : l}
                </div>` : l}
            <div class="fs-empty" role="status">
              ${a("أضيفي خطوات الروتين من إعدادات العنصر.", "Add routine steps in the element settings.")}
            </div>
          </div>
        </section>
      `;
    const m = Y(e), S = ee(m), C = te(o, m, this.view), z = w(e.bwp_show_view_toggle, !0), T = w(e.bwp_show_legend, !0), L = w(e.bwp_show_notice, !0), A = b(e.bwp_notice) || a(
      "خطة إرشادية؛ عدّليها حسب توصية أخصائي بشرتك.",
      "A guiding plan; adjust it to your skincare specialist’s advice."
    ), _ = a("ص", "AM"), x = a("م", "PM");
    return t`
      <section
        class=${y({ "fs-section": !0, "fs-animate": c })}
        style=${g($(r))}
        aria-label=${i || a("مخطط الروتين الأسبوعي", "Weekly routine planner")}
      >
        <div class="fs-container">
          ${i || d ? t`<div class="fs-header">
                ${i ? t`<h2 class="fs-title">${i}</h2>` : l}
                ${d ? t`<p class="fs-desc">${d}</p>` : l}
              </div>` : l}

          ${z ? this.renderToggle() : l}

          <div class="bwp-grid-scroll">
            <div class="bwp-grid" role="list">
              ${S.map((s, u) => {
      const p = C[u], E = p.am.length > 0 || p.pm.length > 0;
      return t`
                  <div class="bwp-day" role="listitem">
                    <div class="bwp-day__head">${s}</div>
                    <div class="bwp-day__body">
                      ${E ? this.view === "week" ? t`
                              ${this.renderSlot(_, p.am)}
                              ${this.renderSlot(x, p.pm)}
                            ` : t`<div class="bwp-chips">
                              ${[...p.am, ...p.pm].map((q) => this.renderChip(q))}
                            </div>` : t`<span class="bwp-day__empty">—</span>`}
                    </div>
                  </div>
                `;
    })}
            </div>
          </div>

          ${T ? t`<div class="bwp-legend">
                ${o.map((s) => {
      const u = s.icon.startsWith("sicon-"), p = s.slot === "am" ? _ : s.slot === "pm" ? x : a("ص/م", "AM/PM");
      return t`
                    <div
                      class="bwp-legend__item"
                      style=${g(s.color ? { "--chip-color": s.color } : {})}
                    >
                      <span class="bwp-legend__swatch"></span>
                      <span class="bwp-legend__text">
                        <span class="bwp-legend__name">
                          ${s.icon ? t`<span class="${u ? s.icon : ""}">${u ? "" : s.icon}</span>` : l}
                          ${s.name}
                        </span>
                        <span class="bwp-legend__freq">
                          ${re(s.frequency)}${s.note ? t` · ${s.note}` : l}
                        </span>
                      </span>
                      <span class="bwp-legend__slot">${p}</span>
                    </div>
                  `;
    })}
              </div>` : l}

          ${L ? t`<p class="bwp-notice">${A}</p>` : l}
        </div>
      </section>
    `;
  }
};
v.styles = [j, W];
let f = v;
k([
  F({ type: Object })
], f.prototype, "config");
k([
  O()
], f.prototype, "view");
typeof f < "u" && f.registerSallaComponent("salla-beauty-weekly-planner");
export {
  f as default
};
