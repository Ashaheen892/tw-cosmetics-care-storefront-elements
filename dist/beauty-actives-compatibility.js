import { css as R, LitElement as A, html as s, nothing as p } from "lit";
import { property as P, state as S } from "lit/decorators.js";
import { classMap as h } from "lit/directives/class-map.js";
import { styleMap as f } from "lit/directives/style-map.js";
import { n as C, l as n, t, g as T, s as E, r as V, p as B, i as N, a as z } from "./sharedStyles--LaFqDVC.js";
const O = R`
  .bac-picker {
    display: grid;
    gap: 0;
    margin-top: 1.5rem;
    padding: 1rem;
    border-radius: var(--section-radius, 16px);
    border: 1px solid var(--border-color, #f2dde7);
    background: color-mix(in srgb, var(--border-color, #f2dde7) 18%, var(--card-bg, #fff));
  }

  .bac-slot {
    display: grid;
    gap: 0.55rem;
    padding: 0.65rem 0;
  }

  .bac-slot__label {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--muted-color, #8f7a86);
  }

  .bac-divider {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.15rem 0;
  }

  .bac-divider__line {
    flex: 1;
    height: 1px;
    background: var(--border-color, #f2dde7);
  }

  .bac-divider__icon {
    flex: 0 0 auto;
    width: 1.75rem;
    height: 1.75rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    color: var(--muted-color, #8f7a86);
    font-size: 0.75rem;
    font-weight: 800;
  }

  .bac-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
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

  /* —— Verdict card —— */
  .bac-verdict {
    padding: 1.35rem 1.25rem 1.4rem;
    border-radius: var(--section-radius, 16px);
    border: 2px solid color-mix(in srgb, var(--verdict-color, var(--accent-color, #c2527f)) 35%, transparent);
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--verdict-color, var(--accent-color, #c2527f)) 14%, var(--card-bg, #fff)) 0%,
      var(--card-bg, #fff) 55%
    );
    box-shadow: 0 12px 32px color-mix(in srgb, var(--verdict-color, #000) 12%, transparent);
    text-align: center;
  }

  .bac-verdict__title {
    margin: 0 0 0.35rem;
    font-size: 0.95rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
    text-align: center;
  }

  .bac-verdict__hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 1rem;
  }

  .bac-verdict__icon {
    width: 3.5rem;
    height: 3.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--verdict-color, var(--accent-color, #c2527f));
    color: #fff;
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1;
    box-shadow: 0 6px 20px color-mix(in srgb, var(--verdict-color, #000) 35%, transparent);
  }

  .bac-verdict__badge {
    display: inline-block;
    padding: 0.35rem 1rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--verdict-color, var(--accent-color, #c2527f)) 18%, var(--card-bg, #fff));
    color: var(--verdict-color, var(--accent-color, #c2527f));
    font-size: 0.92rem;
    font-weight: 800;
    letter-spacing: 0.01em;
  }

  .bac-verdict--unknown .bac-verdict__icon {
    background: color-mix(in srgb, var(--verdict-color, #6b7280) 85%, var(--card-bg, #fff));
    border: 2px dashed color-mix(in srgb, var(--verdict-color, #6b7280) 60%, transparent);
    color: var(--verdict-color, #6b7280);
    box-shadow: none;
  }

  .bac-pair {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.45rem 0.55rem;
    margin-bottom: 0.85rem;
  }

  .bac-pair__pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 35%, var(--card-bg, #fff));
    font-size: 0.84rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
  }

  .bac-pair__dot {
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    display: inline-block;
    border: 1px solid color-mix(in srgb, #000 12%, transparent);
    flex: 0 0 auto;
  }

  .bac-pair__vs {
    color: var(--muted-color, #8f7a86);
    font-weight: 800;
    font-size: 0.9rem;
  }

  .bac-verdict__note {
    margin: 0;
    color: var(--text-color, #33232e);
    font-size: 0.94rem;
    line-height: 1.65;
    text-align: start;
  }

  .bac-tip {
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
    margin-top: 0.9rem;
    padding: 0.7rem 0.85rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--verdict-color, var(--accent-color, #c2527f)) 10%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--verdict-color, var(--accent-color, #c2527f)) 22%, transparent);
    text-align: start;
  }

  .bac-tip__label {
    flex: 0 0 auto;
    font-weight: 800;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--verdict-color, var(--accent-color, #c2527f));
    padding-top: 0.15rem;
  }

  .bac-tip__text {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.55;
    color: var(--text-color, #33232e);
    font-weight: 600;
  }

  .bac-timing {
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
    margin-top: 0.75rem;
    padding: 0.65rem 0.8rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 8%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, #c2527f) 22%, transparent);
    text-align: start;
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
    .bac-tip,
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
`, M = ["compatible", "caution", "avoid"];
function j(l) {
  const e = T(l, "compatible").toLowerCase();
  return M.includes(e) ? e : "compatible";
}
function D(l) {
  return C(l).map((e, i) => {
    const c = n(e.name);
    return {
      id: String(e.active_id ?? "").trim() || `active-${i + 1}`,
      name: c,
      color: String(e.color ?? "").trim(),
      desc: n(e.desc)
    };
  }).filter((e) => e.name);
}
function H(l) {
  return C(l).map((e) => ({
    a: String(e.a ?? "").trim(),
    b: String(e.b ?? "").trim(),
    level: j(e.level),
    note: n(e.note),
    timing: n(e.timing)
  })).filter((e) => e.a && e.b);
}
function U(l, e, i) {
  return !e || !i ? null : l.find(
    (c) => c.a === e && c.b === i || c.a === i && c.b === e
  ) ?? null;
}
const Y = {
  compatible: {
    ar: "يمكنك دمجهما في روتين واحد — راقبي بشرتك عند أول استخدام.",
    en: "You can use both in one routine — watch your skin on first use."
  },
  caution: {
    ar: "جرّبي على منطقة صغيرة أولًا، أو استخدميهما في أوقات مختلفة.",
    en: "Patch-test first, or use them at different times of day."
  },
  avoid: {
    ar: "لا تدمجيهما في نفس الروتين — اختاري واحدًا في كل مرة.",
    en: "Do not combine in the same routine — pick one at a time."
  }
};
function q(l, e, i, c) {
  if (e && i && e === i)
    return {
      level: "same",
      note: t(
        "اخترتِ المكوّن نفسه مرتين. اختاري مكوّنًا مختلفًا لفحص التوافق بينهما.",
        "You picked the same ingredient twice. Choose a different one to check compatibility."
      ),
      tip: t("اختاري مكوّنًا ثانيًا مختلفًا عن الأول.", "Pick a second ingredient different from the first."),
      timing: "",
      hasRule: !1
    };
  const r = U(l, e, i);
  if (r) {
    const a = Y[r.level];
    return {
      level: r.level,
      note: r.note || c,
      tip: t(a.ar, a.en),
      timing: r.timing,
      hasRule: !0
    };
  }
  return {
    level: "unknown",
    note: c || t(
      "لا توجد قاعدة محددة لهذا الزوج — راجعي تعليمات المنتج أو استشيري مختصًا.",
      "No specific rule for this pair — check product labels or consult a professional."
    ),
    tip: t(
      "ابدئي باستخدام واحد فقط، ثم أضيفي الثاني تدريجيًا إذا لم تظهر تهيُّج.",
      "Start with one active, then add the second gradually if no irritation appears."
    ),
    timing: "",
    hasRule: !1
  };
}
var F = Object.defineProperty, k = (l, e, i, c) => {
  for (var r = void 0, a = l.length - 1, o; a >= 0; a--)
    (o = l[a]) && (r = o(e, i, r) || r);
  return r && F(e, i, r), r;
};
const G = {
  compatible: "#2f7d5b",
  caution: "#b8791f",
  avoid: "#b23a4a",
  unknown: "#6b7280",
  same: "#8f7a86"
}, I = {
  compatible: "✓",
  caution: "!",
  avoid: "✕",
  unknown: "?",
  same: "↔"
}, w = class w extends A {
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
    return D((e = this.config) == null ? void 0 : e.bac_actives);
  }
  get rules() {
    var e;
    return H((e = this.config) == null ? void 0 : e.bac_rules);
  }
  resolvePick(e, i, c) {
    var r, a;
    return i && e.some((o) => o.id === i) ? i : ((r = e[c]) == null ? void 0 : r.id) ?? ((a = e[0]) == null ? void 0 : a.id) ?? "";
  }
  renderChips(e, i, c, r) {
    return s`
      <div class="bac-slot">
        <p class="bac-slot__label">${r}</p>
        <div class="bac-chips" role="group" aria-label=${r}>
          ${e.map((a) => {
      const o = a.id === i;
      return s`
              <button
                type="button"
                class=${h({ "bac-chip": !0, "is-selected": o })}
                style=${f(a.color ? { "--swatch": a.color } : {})}
                aria-pressed=${o ? "true" : "false"}
                title=${a.desc || a.name}
                @click=${() => c(a.id)}
              >
                <span class="bac-chip__swatch" aria-hidden="true"></span>
                <span>${a.name}</span>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderResult(e, i, c) {
    const r = this.config || {}, a = e.find(($) => $.id === i) ?? null, o = e.find(($) => $.id === c) ?? null, _ = n(r.bac_default_note) || t(
      "لا توجد قاعدة محددة لهذا الزوج في قاعدة البيانات.",
      "No specific rule for this pair in the database."
    ), g = {
      compatible: n(r.bac_label_compatible) || t("متوافقان", "Compatible"),
      caution: n(r.bac_label_caution) || t("بحذر", "Use with caution"),
      avoid: n(r.bac_label_avoid) || t("تجنّبي الدمج", "Avoid"),
      unknown: n(r.bac_label_unknown) || t("لا قاعدة / غير معروف", "No rule / unknown"),
      same: t("نفس المكوّن", "Same ingredient")
    }, v = q(this.rules, i, c, _), { level: d, note: x, tip: u, timing: m } = v, L = G[d], y = n(r.bac_result_title);
    return s`
      <div
        class=${h({ "bac-verdict": !0, [`bac-verdict--${d}`]: !0 })}
        role="region"
        aria-live="polite"
        aria-label=${g[d]}
        style=${f({ "--verdict-color": L })}
      >
        ${y ? s`<h3 class="bac-verdict__title">${y}</h3>` : p}
        <div class="bac-verdict__hero">
          <span class="bac-verdict__icon" aria-hidden="true">${I[d]}</span>
          <span class="bac-verdict__badge">${g[d]}</span>
        </div>

        ${a && o ? s`<div class="bac-pair" aria-label=${t("المكوّنان المختاران", "Selected pair")}>
              <span class="bac-pair__pill">
                <span
                  class="bac-pair__dot"
                  style=${f(a.color ? { background: a.color } : {})}
                  aria-hidden="true"
                ></span>
                <span>${a.name}</span>
              </span>
              <span class="bac-pair__vs" aria-hidden="true">+</span>
              <span class="bac-pair__pill">
                <span
                  class="bac-pair__dot"
                  style=${f(o.color ? { background: o.color } : {})}
                  aria-hidden="true"
                ></span>
                <span>${o.name}</span>
              </span>
            </div>` : p}

        <p class="bac-verdict__note">${x}</p>

        ${u ? s`<div class="bac-tip">
              <span class="bac-tip__label">${t("نصيحة", "Tip")}</span>
              <p class="bac-tip__text">${u}</p>
            </div>` : p}

        ${m ? s`<div class="bac-timing">
              <span class="bac-timing__label">${t("التوقيت", "Timing")}</span>
              <p class="bac-timing__text">${m}</p>
            </div>` : p}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, i = V(e, "bac_"), c = i.animate && !B(), r = this.actives, a = n(e.bac_title), o = n(e.bac_desc), _ = N(e.bac_show_notice, !0), g = n(e.bac_notice) || t(
      "هذه المعلومات توعوية عامة ولا تُغني عن استشارة مختص العناية بالبشرة.",
      "This information is general and educational and does not replace advice from a skincare professional."
    );
    if (r.length < 2)
      return s`
        <section
          class=${h({ "fs-section": !0, "fs-animate": c })}
          style=${f(z(i))}
          aria-label=${a || t("مدقّق توافق المكونات الفعّالة", "Actives compatibility checker")}
        >
          <div class="fs-container">
            <div class="fs-empty" role="status">
              ${t("أضيفي مكوّنين على الأقل من إعدادات العنصر.", "Add at least two ingredients in the element settings.")}
            </div>
          </div>
        </section>
      `;
    const v = this.resolvePick(r, this.selectedA, 0), d = this.resolvePick(r, this.selectedB, 1), x = n(e.bac_pick_a_label) || t("المكوّن الأول", "First active"), u = n(e.bac_pick_b_label) || t("المكوّن الثاني", "Second active");
    return s`
      <section
        class=${h({ "fs-section": !0, "fs-animate": c })}
        style=${f(z(i))}
        aria-label=${a || t("مدقّق توافق المكونات الفعّالة", "Actives compatibility checker")}
      >
        <div class="fs-container">
          ${a || o ? s`<div class="fs-header">
                ${a ? s`<h2 class="fs-title">${a}</h2>` : p}
                ${o ? s`<p class="fs-desc">${o}</p>` : p}
              </div>` : p}

          ${this.renderResult(r, v, d)}

          <div class="bac-picker" aria-label=${t("اختيار المكوّنين", "Pick ingredients")}>
            ${this.renderChips(r, v, (m) => this.selectedA = m, x)}
            <div class="bac-divider" aria-hidden="true">
              <span class="bac-divider__line"></span>
              <span class="bac-divider__icon">↕</span>
              <span class="bac-divider__line"></span>
            </div>
            ${this.renderChips(r, d, (m) => this.selectedB = m, u)}
          </div>

          ${_ ? s`<p class="bac-notice">${g}</p>` : p}
        </div>
      </section>
    `;
  }
};
w.styles = [E, O];
let b = w;
k([
  P({ type: Object })
], b.prototype, "config");
k([
  S()
], b.prototype, "selectedA");
k([
  S()
], b.prototype, "selectedB");
typeof b < "u" && b.registerSallaComponent("salla-beauty-actives-compatibility");
export {
  b as default
};
