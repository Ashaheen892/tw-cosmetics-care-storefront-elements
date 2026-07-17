import { css as S, LitElement as L, html as n, nothing as f } from "lit";
import { property as A, state as C } from "lit/decorators.js";
import { classMap as $ } from "lit/directives/class-map.js";
import { styleMap as g } from "lit/directives/style-map.js";
import { n as z, l as c, g as R, s as E, t as o, r as T, p as B, i as O, a as k } from "./sharedStyles-cRSiglXC.js";
const P = S`
  .bac-picker {
    display: grid;
    gap: 1.25rem;
  }

  .bac-row {
    display: grid;
    gap: 0.6rem;
  }

  .bac-row__label {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bac-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .bac-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 44px;
    padding: 0.5rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.86rem;
    font-weight: 600;
    line-height: 1.2;
    cursor: pointer;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  }

  .bac-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 45%, var(--border-color, #f2dde7));
  }

  .bac-chip:active {
    transform: scale(0.97);
  }

  .bac-chip.is-selected {
    border-color: var(--accent-color, #c2527f);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color, #c2527f) 30%, transparent);
  }

  .bac-chip__swatch {
    width: 0.95rem;
    height: 0.95rem;
    border-radius: 50%;
    flex: 0 0 auto;
    border: 1px solid color-mix(in srgb, #000 12%, transparent);
    background: var(--swatch, var(--accent-color, #c2527f));
  }

  .bac-result {
    margin-top: 1.5rem;
    padding: 1.15rem 1.15rem 1.25rem;
    border-inline-start: 5px solid var(--verdict-color, var(--accent-color, #c2527f));
  }

  .bac-result__head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 0.75rem;
  }

  .bac-result__title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bac-pair {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
    color: var(--muted-color, #8f7a86);
    font-size: 0.86rem;
    font-weight: 700;
  }

  .bac-pair__dot {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    display: inline-block;
    border: 1px solid color-mix(in srgb, #000 12%, transparent);
  }

  .bac-pair__sep {
    color: var(--muted-color, #8f7a86);
  }

  .bac-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    background: var(--verdict-color, var(--accent-color, #c2527f));
    color: #fff;
    font-size: 0.82rem;
    font-weight: 800;
    line-height: 1.2;
  }

  .bac-badge__icon {
    font-size: 0.9rem;
    line-height: 1;
  }

  .bac-note {
    margin: 0;
    color: var(--text-color, #33232e);
    font-size: 0.94rem;
    line-height: 1.7;
  }

  .bac-timing {
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
    margin-top: 0.85rem;
    padding: 0.65rem 0.8rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 8%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, #c2527f) 22%, transparent);
  }

  .bac-timing__label {
    font-weight: 800;
    font-size: 0.82rem;
    color: var(--accent-color, #c2527f);
    white-space: nowrap;
  }

  .bac-timing__text {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-color, #33232e);
  }

  .bac-notice {
    margin-top: 1.25rem;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  @media (max-width: 639px) {
    .bac-result__head {
      gap: 0.5rem;
    }
    .bac-timing {
      flex-direction: column;
      gap: 0.3rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bac-chip {
      transition: none !important;
    }
  }
`, V = ["compatible", "caution", "avoid"];
function M(l) {
  const e = R(l, "compatible").toLowerCase();
  return V.includes(e) ? e : "compatible";
}
function N(l) {
  return z(l).map((e, a) => {
    const r = c(e.name);
    return {
      id: String(e.active_id ?? "").trim() || `active-${a + 1}`,
      name: r,
      color: String(e.color ?? "").trim(),
      desc: c(e.desc)
    };
  }).filter((e) => e.name);
}
function H(l) {
  return z(l).map((e) => ({
    a: String(e.a ?? "").trim(),
    b: String(e.b ?? "").trim(),
    level: M(e.level),
    note: c(e.note),
    timing: c(e.timing)
  })).filter((e) => e.a && e.b);
}
function j(l, e, a) {
  return !e || !a ? null : l.find(
    (r) => r.a === e && r.b === a || r.a === a && r.b === e
  ) ?? null;
}
var D = Object.defineProperty, w = (l, e, a, r) => {
  for (var t = void 0, i = l.length - 1, s; i >= 0; i--)
    (s = l[i]) && (t = s(e, a, t) || t);
  return t && D(e, a, t), t;
};
const U = {
  compatible: "#2f7d5b",
  caution: "#b8791f",
  avoid: "#b23a4a"
}, q = {
  compatible: "✓",
  caution: "!",
  avoid: "✕"
}, y = class y extends L {
  constructor() {
    super(...arguments), this.config = {}, this.selectedA = "", this.selectedB = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.selectedA = "", this.selectedB = "");
  }
  get actives() {
    var e;
    return N((e = this.config) == null ? void 0 : e.bac_actives);
  }
  get rules() {
    var e;
    return H((e = this.config) == null ? void 0 : e.bac_rules);
  }
  resolvePick(e, a, r) {
    var t, i;
    return a && e.some((s) => s.id === a) ? a : ((t = e[r]) == null ? void 0 : t.id) ?? ((i = e[0]) == null ? void 0 : i.id) ?? "";
  }
  renderChips(e, a, r) {
    return n`
      <div class="bac-chips" role="group">
        ${e.map((t) => {
      const i = t.id === a;
      return n`
            <button
              type="button"
              class=${$({ "bac-chip": !0, "is-selected": i })}
              style=${g(t.color ? { "--swatch": t.color } : {})}
              aria-pressed=${i ? "true" : "false"}
              title=${t.desc || t.name}
              @click=${() => r(t.id)}
            >
              <span class="bac-chip__swatch"></span>
              <span>${t.name}</span>
            </button>
          `;
    })}
      </div>
    `;
  }
  renderResult(e, a, r) {
    const t = this.config || {}, i = e.find((p) => p.id === a) ?? null, s = e.find((p) => p.id === r) ?? null, x = c(t.bac_result_title) || o("النتيجة", "Result"), v = c(t.bac_default_note) || o(
      "لا يوجد تعارض معروف بين هذين المكوّنين، وغالبًا يمكن استخدامهما معًا.",
      "No known conflict between these two ingredients; they can generally be used together."
    ), _ = {
      compatible: c(t.bac_label_compatible) || o("متوافقان", "Compatible"),
      caution: c(t.bac_label_caution) || o("بحذر", "Use with caution"),
      avoid: c(t.bac_label_avoid) || o("تجنّبي الدمج", "Avoid")
    };
    let d, m, h = "";
    if (a && r && a === r)
      d = "compatible", m = o(
        "اخترتِ المكوّن نفسه مرتين. اختاري مكوّنًا مختلفًا لفحص التوافق بينهما.",
        "You picked the same ingredient twice. Choose a different one to check compatibility."
      );
    else {
      const p = j(this.rules, a, r);
      p ? (d = p.level, m = p.note || v, h = p.timing) : (d = "compatible", m = v);
    }
    const u = U[d];
    return n`
      <div
        class="fs-card bac-result"
        role="region"
        aria-live="polite"
        style=${g({ "--verdict-color": u })}
      >
        <div class="bac-result__head">
          <h3 class="bac-result__title">${x}</h3>
          <span class="bac-badge">
            <span class="bac-badge__icon" aria-hidden="true">${q[d]}</span>
            <span>${_[d]}</span>
          </span>
        </div>

        ${i && s ? n`<div class="bac-pair">
              <span
                class="bac-pair__dot"
                style=${g(i.color ? { background: i.color } : {})}
              ></span>
              <span>${i.name}</span>
              <span class="bac-pair__sep">+</span>
              <span
                class="bac-pair__dot"
                style=${g(s.color ? { background: s.color } : {})}
              ></span>
              <span>${s.name}</span>
            </div>` : f}

        <p class="bac-note">${m}</p>

        ${h ? n`<div class="bac-timing">
              <span class="bac-timing__label">${o("التوقيت", "Timing")}</span>
              <p class="bac-timing__text">${h}</p>
            </div>` : f}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, a = T(e, "bac_"), r = a.animate && !B(), t = this.actives, i = c(e.bac_title), s = c(e.bac_desc), x = O(e.bac_show_notice, !0), v = c(e.bac_notice) || o(
      "هذه المعلومات توعوية عامة ولا تُغني عن استشارة مختص العناية بالبشرة.",
      "This information is general and educational and does not replace advice from a skincare professional."
    );
    if (t.length < 2)
      return n`
        <section
          class=${$({ "fs-section": !0, "fs-animate": r })}
          style=${g(k(a))}
          aria-label=${i || o("مدقّق توافق المكونات الفعّالة", "Actives compatibility checker")}
        >
          <div class="fs-container">
            <div class="fs-empty" role="status">
              ${o("أضيفي مكوّنين على الأقل من إعدادات العنصر.", "Add at least two ingredients in the element settings.")}
            </div>
          </div>
        </section>
      `;
    const _ = this.resolvePick(t, this.selectedA, 0), d = this.resolvePick(t, this.selectedB, 1), m = c(e.bac_pick_a_label) || o("المكوّن الأول", "First active"), h = c(e.bac_pick_b_label) || o("المكوّن الثاني", "Second active");
    return n`
      <section
        class=${$({ "fs-section": !0, "fs-animate": r })}
        style=${g(k(a))}
        aria-label=${i || o("مدقّق توافق المكونات الفعّالة", "Actives compatibility checker")}
      >
        <div class="fs-container">
          ${i || s ? n`<div class="fs-header">
                ${i ? n`<h2 class="fs-title">${i}</h2>` : f}
                ${s ? n`<p class="fs-desc">${s}</p>` : f}
              </div>` : f}

          <div class="bac-picker">
            <div class="bac-row">
              <p class="bac-row__label">${m}</p>
              ${this.renderChips(t, _, (u) => this.selectedA = u)}
            </div>
            <div class="bac-row">
              <p class="bac-row__label">${h}</p>
              ${this.renderChips(t, d, (u) => this.selectedB = u)}
            </div>
          </div>

          ${this.renderResult(t, _, d)}

          ${x ? n`<p class="bac-notice">${v}</p>` : f}
        </div>
      </section>
    `;
  }
};
y.styles = [E, P];
let b = y;
w([
  A({ type: Object })
], b.prototype, "config");
w([
  C()
], b.prototype, "selectedA");
w([
  C()
], b.prototype, "selectedB");
typeof b < "u" && b.registerSallaComponent("salla-beauty-actives-compatibility");
export {
  b as default
};
