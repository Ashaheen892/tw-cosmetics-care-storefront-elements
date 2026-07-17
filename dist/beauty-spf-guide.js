import { css as O, LitElement as q, html as r, nothing as c } from "lit";
import { property as D, state as x } from "lit/decorators.js";
import { classMap as P } from "lit/directives/class-map.js";
import { styleMap as f } from "lit/directives/style-map.js";
import { n as _, l as n, f as b, h as v, t as i, s as Y, r as J, p as K, a as I, i as L } from "./sharedStyles-cRSiglXC.js";
const Q = O`
  .bsg-layout {
    display: grid;
    gap: 1.5rem;
    align-items: start;
  }

  @media (min-width: 860px) {
    .bsg-layout {
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
      gap: 2rem;
    }
  }

  .bsg-controls {
    display: grid;
    gap: 1.15rem;
  }

  .bsg-group {
    display: grid;
    gap: 0.55rem;
  }

  .bsg-group__label {
    margin: 0;
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
    letter-spacing: 0.01em;
  }

  .bsg-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .bsg-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 44px;
    padding: 0.5rem 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.86rem;
    font-weight: 600;
    line-height: 1.2;
    cursor: pointer;
    text-align: start;
    box-sizing: border-box;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  }

  .bsg-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 45%, var(--border-color, #f2dde7));
  }

  .bsg-chip[aria-pressed='true'] {
    border-color: var(--accent-color, #c2527f);
    background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-color, #c2527f) 30%, transparent);
  }

  .bsg-chip:active {
    transform: scale(0.97);
  }

  .bsg-swatch {
    width: 1.05rem;
    height: 1.05rem;
    border-radius: 50%;
    border: 1px solid color-mix(in srgb, #000 12%, transparent);
    flex: 0 0 auto;
    background: var(--bsg-swatch, var(--accent-color, #c2527f));
  }

  .bsg-chip__sub {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
  }

  .bsg-result {
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: var(--section-radius, 16px);
    padding: 1.25rem 1.2rem 1.35rem;
    box-shadow: 0 10px 30px rgba(43, 33, 28, 0.07);
    display: grid;
    gap: 1rem;
  }

  .bsg-result__title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bsg-result__pt {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
  }

  .bsg-duration {
    display: grid;
    gap: 0.3rem;
    padding: 0.9rem 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    background: color-mix(in srgb, var(--accent-color, #c2527f) 8%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, #c2527f) 20%, transparent);
  }

  .bsg-duration__label {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
  }

  .bsg-duration__value {
    font-size: 1.85rem;
    font-weight: 800;
    line-height: 1.1;
    color: var(--accent-color, #c2527f);
    letter-spacing: -0.01em;
  }

  .bsg-meter-wrap {
    display: grid;
    gap: 0.4rem;
  }

  .bsg-meter-caption {
    font-size: 0.72rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.5;
  }

  .bsg-reapply {
    display: flex;
    gap: 0.65rem;
    align-items: flex-start;
    padding: 0.85rem 0.95rem;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    background: color-mix(in srgb, #e0a100 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, #e0a100 35%, transparent);
  }

  .bsg-reapply__icon {
    font-size: 1.25rem;
    line-height: 1.2;
    flex: 0 0 auto;
  }

  .bsg-reapply__body {
    display: grid;
    gap: 0.2rem;
  }

  .bsg-reapply__main {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    color: color-mix(in srgb, #8a5a00 65%, var(--text-color, #33232e));
    line-height: 1.5;
  }

  .bsg-reapply__note {
    margin: 0;
    font-size: 0.82rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.55;
  }

  .bsg-tips {
    display: grid;
    gap: 0.4rem;
  }

  .bsg-tips__title {
    margin: 0 0 0.15rem;
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bsg-tips ul {
    margin: 0;
    padding-inline-start: 1.15rem;
    display: grid;
    gap: 0.35rem;
    color: var(--muted-color, #8f7a86);
    font-size: 0.86rem;
    line-height: 1.55;
  }

  .bsg-notice {
    margin-top: 1.25rem;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  @media (max-width: 639px) {
    .bsg-duration__value {
      font-size: 1.6rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bsg-chip {
      transition: none !important;
    }
  }
`;
function W(a) {
  return _(a).map((e, s) => {
    const t = n(e.name);
    return {
      id: String(e.pt_id ?? "").trim() || `pt-${s + 1}`,
      name: t,
      desc: n(e.desc),
      baseMinutes: b(v(e.base_minutes, 15), 1, 240),
      color: String(e.color ?? "").trim()
    };
  }).filter((e) => e.name);
}
function X(a) {
  return _(a).map((e) => {
    const s = b(Math.round(v(e.spf, 30)), 1, 100), t = n(e.label) || `SPF ${s}`;
    return { spf: s, label: t };
  }).filter((e) => e.spf > 0);
}
function Z(a) {
  return _(a).map((e, s) => {
    const t = n(e.name);
    return {
      id: String(e.cond_id ?? "").trim() || `cond-${s + 1}`,
      name: t,
      factor: b(v(e.factor, 1), 0.1, 1.5),
      desc: n(e.desc)
    };
  }).filter((e) => e.name);
}
function B(a) {
  return _(a).map((e) => n(e.tip)).filter(Boolean);
}
function G(a, e, s) {
  return b(a * e * s, 0, 1e5);
}
function ee(a) {
  const e = Math.max(0, Math.round(a)), s = Math.floor(e / 60), t = e % 60, o = i("س", "h"), p = i("د", "m");
  return s <= 0 ? `${t}${p}` : t <= 0 ? `${s}${o}` : `${s}${o} ${t}${p}`;
}
var se = Object.defineProperty, $ = (a, e, s, t) => {
  for (var o = void 0, p = a.length - 1, u; p >= 0; p--)
    (u = a[p]) && (o = u(e, s, o) || o);
  return o && se(e, s, o), o;
};
const te = 480, w = class w extends q {
  constructor() {
    super(...arguments), this.config = {}, this.selectedPtId = "", this.selectedSpf = 0, this.selectedCondId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.selectedPtId = "", this.selectedSpf = 0, this.selectedCondId = "");
  }
  get phototypes() {
    var e;
    return W((e = this.config) == null ? void 0 : e.bsg_phototypes);
  }
  get spfValues() {
    var e;
    return X((e = this.config) == null ? void 0 : e.bsg_spf_values);
  }
  get conditions() {
    var e;
    return Z((e = this.config) == null ? void 0 : e.bsg_conditions);
  }
  resolvePhototype(e) {
    return e.length ? e.find((s) => s.id === this.selectedPtId) ?? e[0] : null;
  }
  resolveSpf(e) {
    return e.length ? e.find((s) => s.spf === this.selectedSpf) ?? e[0] : null;
  }
  resolveCondition(e) {
    return e.length ? e.find((s) => s.id === this.selectedCondId) ?? e[0] : null;
  }
  renderPhototypeChips(e, s) {
    return r`
      <div class="bsg-chips" role="group" aria-label=${i("نوع البشرة", "Skin phototype")}>
        ${e.map((t) => {
      const o = (s == null ? void 0 : s.id) === t.id;
      return r`
            <button
              type="button"
              class="bsg-chip"
              aria-pressed=${o ? "true" : "false"}
              style=${f(t.color ? { "--bsg-swatch": t.color } : {})}
              @click=${() => this.selectedPtId = t.id}
            >
              <span class="bsg-swatch" aria-hidden="true"></span>
              <span>${t.name}</span>
            </button>
          `;
    })}
      </div>
    `;
  }
  renderSpfChips(e, s) {
    return r`
      <div class="bsg-chips" role="group" aria-label=${i("عامل الحماية", "SPF value")}>
        ${e.map((t) => {
      const o = (s == null ? void 0 : s.spf) === t.spf;
      return r`
            <button
              type="button"
              class="bsg-chip"
              aria-pressed=${o ? "true" : "false"}
              @click=${() => this.selectedSpf = t.spf}
            >
              <span>${t.label}</span>
            </button>
          `;
    })}
      </div>
    `;
  }
  renderConditionChips(e, s) {
    return e.length ? r`
      <div class="bsg-chips" role="group" aria-label=${i("ظروف التعرّض", "Exposure condition")}>
        ${e.map((t) => {
      const o = (s == null ? void 0 : s.id) === t.id;
      return r`
            <button
              type="button"
              class="bsg-chip"
              aria-pressed=${o ? "true" : "false"}
              title=${t.desc || t.name}
              @click=${() => this.selectedCondId = t.id}
            >
              <span>${t.name}</span>
            </button>
          `;
    })}
      </div>
    ` : c;
  }
  render() {
    const e = this.config || {}, s = J(e, "bsg_"), t = s.animate && !K(), o = this.phototypes, p = this.spfValues, u = this.conditions, S = B(e.bsg_tips), m = n(e.bsg_title), y = n(e.bsg_desc);
    if (!o.length || !p.length)
      return r`
        <section
          class=${P({ "fs-section": !0, "fs-animate": t })}
          style=${f(I(s))}
          aria-label=${m || i("دليل الحماية من الشمس", "Sun protection guide")}
        >
          <div class="fs-container">
            <div class="fs-empty" role="status">
              ${i("أكملي إعدادات العنصر لعرض الدليل.", "Complete the element settings to show the guide.")}
            </div>
          </div>
        </section>
      `;
    const l = this.resolvePhototype(o), h = this.resolveSpf(p), d = this.resolveCondition(u), E = (d == null ? void 0 : d.factor) ?? 1, C = G((l == null ? void 0 : l.baseMinutes) ?? 0, (h == null ? void 0 : h.spf) ?? 0, E), z = b(C / te * 100, 0, 100), T = L(e.bsg_show_meter, !0), R = L(e.bsg_show_notice, !0), M = b(Math.round(v(e.bsg_reapply_minutes, 120)), 1, 1e5), k = n(e.bsg_reapply_note), A = n(e.bsg_phototype_label) || i("نوع البشرة", "Skin phototype"), F = n(e.bsg_spf_label) || i("عامل الحماية SPF", "SPF value"), N = n(e.bsg_condition_label) || i("ظروف التعرّض", "Exposure condition"), U = n(e.bsg_result_title) || i("توصياتك", "Your guidance"), V = n(e.bsg_notice) || i("هذه إرشادات توعوية عامة وليست نصيحة طبية.", "This is general educational guidance, not medical advice."), H = i(
      `أعيدي التطبيق كل ${M} دقيقة`,
      `Reapply every ${M} min`
    );
    return r`
      <section
        class=${P({ "fs-section": !0, "fs-animate": t })}
        style=${f(I(s))}
        aria-label=${m || i("دليل الحماية من الشمس", "Sun protection guide")}
      >
        <div class="fs-container">
          ${m || y ? r`<div class="fs-header">
                ${m ? r`<h2 class="fs-title">${m}</h2>` : c}
                ${y ? r`<p class="fs-desc">${y}</p>` : c}
              </div>` : c}

          <div class="bsg-layout">
            <div class="bsg-controls">
              <div class="bsg-group">
                <p class="bsg-group__label">${A}</p>
                ${this.renderPhototypeChips(o, l)}
                ${l != null && l.desc ? r`<p class="bsg-chip__sub">${l.desc}</p>` : c}
              </div>

              <div class="bsg-group">
                <p class="bsg-group__label">${F}</p>
                ${this.renderSpfChips(p, h)}
              </div>

              ${u.length ? r`<div class="bsg-group">
                    <p class="bsg-group__label">${N}</p>
                    ${this.renderConditionChips(u, d)}
                    ${d != null && d.desc ? r`<p class="bsg-chip__sub">${d.desc}</p>` : c}
                  </div>` : c}
            </div>

            <div class="bsg-result" role="region" aria-live="polite">
              <h3 class="bsg-result__title">${U}</h3>

              ${l ? r`<span class="bsg-result__pt">
                    <span
                      class="bsg-swatch"
                      aria-hidden="true"
                      style=${f(l.color ? { "--bsg-swatch": l.color } : {})}
                    ></span>
                    <span>${l.name}</span>
                  </span>` : c}

              <div class="bsg-duration">
                <span class="bsg-duration__label">
                  ${i("تقدير تقريبي لمدة التعرّض الآمن", "Rough safe-exposure estimate")}
                </span>
                <span class="bsg-duration__value">${ee(C)}</span>
              </div>

              ${T ? r`<div class="bsg-meter-wrap">
                    <div
                      class="fs-meter"
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(z)}
                      aria-label=${i("مؤشر التعرّض التوضيحي", "Illustrative exposure meter")}
                    >
                      <span style=${f({ width: `${z}%` })}></span>
                    </div>
                    <p class="bsg-meter-caption">
                      ${i("مؤشر توضيحي فقط — التقدير يقلّ في ظروف الانعكاس العالي.", "Illustrative only — the estimate drops in high-reflection conditions.")}
                    </p>
                  </div>` : c}

              <div class="bsg-reapply">
                <span class="bsg-reapply__icon" aria-hidden="true">☀︎</span>
                <div class="bsg-reapply__body">
                  <p class="bsg-reapply__main">${H}</p>
                  ${k ? r`<p class="bsg-reapply__note">${k}</p>` : r`<p class="bsg-reapply__note">${i("أعيدي التطبيق بعد السباحة أو التعرّق.", "Reapply after swimming or sweating.")}</p>`}
                </div>
              </div>

              ${S.length ? r`<div class="bsg-tips">
                    <p class="bsg-tips__title">${i("نصائح", "Tips")}</p>
                    <ul>${S.map((j) => r`<li>${j}</li>`)}</ul>
                  </div>` : c}
            </div>
          </div>

          ${R ? r`<p class="bsg-notice">${V}</p>` : c}
        </div>
      </section>
    `;
  }
};
w.styles = [Y, Q];
let g = w;
$([
  D({ type: Object })
], g.prototype, "config");
$([
  x()
], g.prototype, "selectedPtId");
$([
  x()
], g.prototype, "selectedSpf");
$([
  x()
], g.prototype, "selectedCondId");
typeof g < "u" && g.registerSallaComponent("salla-beauty-spf-guide");
export {
  g as default
};
