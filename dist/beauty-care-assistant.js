import { css as S, LitElement as z, nothing as c, html as a } from "lit";
import { property as q, state as f } from "lit/decorators.js";
import { classMap as x } from "lit/directives/class-map.js";
import { styleMap as y } from "lit/directives/style-map.js";
import { n as _, l as s, e as $, g as C, b as L, s as K, t as n, r as j, p as M, a as B } from "./sharedStyles-cRSiglXC.js";
const Q = S`
  :host {
    direction: inherit;
  }

  .bca-shell {
    max-width: 720px;
    margin-inline: auto;
    border-radius: var(--section-radius, 18px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    box-shadow: 0 14px 40px rgba(43, 33, 28, 0.08);
    overflow: hidden;
  }

  .bca-topbar {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.9rem 1.1rem;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
    border-bottom: 1px solid var(--border-color, #f2dde7);
  }

  .bca-avatar {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    object-fit: cover;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 30%, #fff);
    display: grid;
    place-items: center;
    color: #fff;
    font-size: 1.1rem;
    flex: 0 0 auto;
  }

  .bca-topbar__meta {
    display: grid;
    gap: 0.1rem;
    min-width: 0;
  }

  .bca-topbar__name {
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--text-color, #33232e);
  }

  .bca-topbar__hint {
    font-size: 0.76rem;
    color: var(--muted-color, #8f7a86);
  }

  .bca-body {
    padding: 1.1rem;
    display: grid;
    gap: 1rem;
  }

  .bca-progress {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 70%, transparent);
    overflow: hidden;
  }

  .bca-progress > span {
    display: block;
    height: 100%;
    background: var(--accent-color, #c2527f);
    transition: width 0.4s ease;
  }

  .bca-bubble {
    max-width: 85%;
    padding: 0.85rem 1.05rem;
    border-radius: 16px;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 10%, var(--card-bg, #fff));
    color: var(--text-color, #33232e);
    font-size: 1rem;
    line-height: 1.6;
    border-start-start-radius: 4px;
  }

  .bca-answers {
    display: grid;
    gap: 0.55rem;
  }

  .bca-answer {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    width: 100%;
    padding: 0.7rem 0.9rem;
    border-radius: 14px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 600;
    text-align: start;
    cursor: pointer;
    transition: border-color 0.2s ease, transform 0.15s ease, background 0.2s ease;
  }

  .bca-answer:hover {
    border-color: var(--accent-color, #c2527f);
    transform: translateY(-1px);
  }

  .bca-answer__icon {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 10px;
    object-fit: cover;
    flex: 0 0 auto;
  }

  .bca-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: space-between;
  }

  .bca-result {
    display: grid;
    gap: 0.9rem;
  }

  .bca-result__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bca-result__desc {
    margin: 0;
    color: var(--muted-color, #8f7a86);
    line-height: 1.65;
  }

  /* —— Style: expert (avatar-forward) —— */
  .bca--expert .bca-topbar {
    flex-direction: column;
    text-align: center;
    padding: 1.3rem;
  }
  .bca--expert .bca-avatar {
    width: 4.5rem;
    height: 4.5rem;
    font-size: 1.8rem;
  }

  /* —— Style: mirror (framed) —— */
  .bca--mirror .bca-shell {
    border-width: 6px;
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 35%, #fff);
    border-radius: 999px / 60px;
    background: linear-gradient(180deg, color-mix(in srgb, var(--accent-color, #c2527f) 6%, #fff), var(--card-bg, #fff));
  }

  /* —— Style: cards —— */
  .bca--cards .bca-bubble {
    max-width: 100%;
    text-align: center;
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 16px;
  }
  .bca--cards .bca-answers {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
  .bca--cards .bca-answer {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
  .bca--cards .bca-answer__icon {
    width: 3.2rem;
    height: 3.2rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .bca-answer,
    .bca-progress > span {
      transition: none;
    }
  }

  @media (max-width: 520px) {
    .bca-bubble {
      max-width: 100%;
    }
  }
`;
function R(r, t) {
  return r.trim().toLowerCase().replace(/\s+/g, "-") || t;
}
function E(r, t) {
  return _(r).map((e, o) => ({
    id: `${t}-a${o}`,
    label: s(e.label),
    image: $(e.image),
    next: s(e.next).trim(),
    result_title: s(e.result_title),
    result_desc: s(e.result_desc),
    link: L(e.link),
    link_text: s(e.link_text)
  })).filter((e) => e.label || e.result_title || e.link);
}
function H(r) {
  return _(r).map((t, e) => {
    const o = R(s(t.q_key), `q${e + 1}`);
    return {
      key: o,
      text: s(t.q_text),
      image: $(t.q_image),
      answers: E(t.answers, o)
    };
  }).filter((t) => t.text || t.answers.length);
}
function I(r, t) {
  var o;
  const e = s(r.bca_start_key).trim().toLowerCase().replace(/\s+/g, "-");
  return e && t.some((i) => i.key === e) ? e : ((o = t[0]) == null ? void 0 : o.key) ?? "";
}
function O(r, t) {
  return r.find((e) => e.key === t) ?? null;
}
function A(r, t) {
  return r.next ? !t.some((e) => e.key === r.next) : !0;
}
function P(r) {
  const t = C(r.bca_style, "chat");
  return t === "expert" || t === "mirror" || t === "cards" ? t : "chat";
}
var T = Object.defineProperty, p = (r, t, e, o) => {
  for (var i = void 0, b = r.length - 1, d; b >= 0; b--)
    (d = r[b]) && (i = d(t, e, i) || i);
  return i && T(t, e, i), i;
};
const g = class g extends z {
  constructor() {
    super(...arguments), this.config = {}, this.currentKey = "", this.history = [], this.result = null, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.restart();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(t) {
    t.has("config") && this.restart();
  }
  get questions() {
    var t;
    return H((t = this.config) == null ? void 0 : t.bca_questions);
  }
  restart() {
    const t = this.questions;
    this.currentKey = I(this.config || {}, t), this.history = [], this.result = null;
  }
  goBack() {
    if (this.result) {
      this.result = null;
      return;
    }
    const t = [...this.history], e = t.pop();
    e && (this.history = t, this.currentKey = e);
  }
  chooseAnswer(t) {
    const e = this.questions;
    if (!A(t, e)) {
      this.history = [...this.history, this.currentKey], this.currentKey = t.next, this.result = null;
      return;
    }
    this.result = t;
  }
  renderResult(t) {
    const e = this.config || {};
    return a`
      <div class="bca-result" aria-live="polite">
        ${t.result_title ? a`<h3 class="bca-result__title">${t.result_title}</h3>` : c}
        ${t.result_desc ? a`<p class="bca-result__desc">${t.result_desc}</p>` : c}
        ${t.link ? a`<div class="fs-actions">
              <a class="fs-btn" href=${t.link}>
                ${t.link_text || s(e.bca_result_btn) || n("انتقلي إلى النتيجة", "Go to result")}
              </a>
            </div>` : c}
        <div class="bca-nav">
          <button type="button" class="fs-btn fs-btn--ghost" @click=${this.goBack}>
            ${n("رجوع", "Back")}
          </button>
          <button type="button" class="fs-btn fs-btn--ghost" @click=${this.restart}>
            ${s(e.bca_restart_btn) || n("إعادة البدء", "Start over")}
          </button>
        </div>
      </div>
    `;
  }
  renderQuestion(t) {
    return a`
      <div class="bca-answers" role="group" aria-label=${t.text || n("الخيارات", "Options")}>
        ${t.answers.map(
      (e) => a`
            <button type="button" class="bca-answer" @click=${() => this.chooseAnswer(e)}>
              ${e.image ? a`<img class="bca-answer__icon" src=${e.image} alt="" loading="lazy" />` : c}
              <span>${e.label || n("اختيار", "Choice")}</span>
            </button>
          `
    )}
      </div>
    `;
  }
  render() {
    const t = this.config || {}, e = j(t, "bca_"), o = e.animate && !M(), i = this.questions, b = P(t), d = s(t.bca_title), h = s(t.bca_desc), k = s(t.bca_assistant_name) || n("خبيرة الجمال", "Beauty expert"), m = s(t.bca_avatar);
    if (!i.length)
      return a`<div class="fs-empty" role="status">
        ${n("أضيفي أسئلة المساعد من إعدادات العنصر", "Add assistant questions in the element settings")}
      </div>`;
    const u = O(i, this.currentKey) || i[0], w = this.history.length + (this.result ? 1 : 0), v = Math.min(100, Math.round((w + 1) / (i.length + 1) * 100));
    return a`
      <section
        class=${x({ "fs-section": !0, "fs-animate": o })}
        style=${y(B(e))}
        aria-label=${d || n("مساعد اختيار منتجات الجمال", "Beauty care assistant")}
      >
        <div class="fs-container">
          ${d || h ? a`<div class="fs-header">
                ${d ? a`<h2 class="fs-title">${d}</h2>` : c}
                ${h ? a`<p class="fs-desc">${h}</p>` : c}
              </div>` : c}

          <div class=${x({ [`bca--${b}`]: !0 })}>
            <div class="bca-shell">
              <div class="bca-topbar">
                ${m ? a`<img class="bca-avatar" src=${m} alt="" loading="lazy" />` : a`<span class="bca-avatar" aria-hidden="true">✦</span>`}
                <div class="bca-topbar__meta">
                  <span class="bca-topbar__name">${k}</span>
                  <span class="bca-topbar__hint">${n("سأساعدك في اختيار الأنسب لكِ", "I will help you choose")}</span>
                </div>
              </div>

              <div class="bca-body">
                <div class="bca-progress" role="progressbar" aria-valuenow=${v} aria-valuemin="0" aria-valuemax="100">
                  <span style=${y({ width: `${v}%` })}></span>
                </div>

                ${this.result ? this.renderResult(this.result) : a`
                      ${u.image ? a`<img
                            src=${u.image}
                            alt=""
                            loading="lazy"
                            style="width:100%;max-height:200px;object-fit:cover;border-radius:14px"
                          />` : c}
                      <div class="bca-bubble">${u.text || n("اختاري أحد الخيارات", "Choose an option")}</div>
                      ${this.renderQuestion(u)}
                      ${this.history.length ? a`<div class="bca-nav">
                            <button type="button" class="fs-btn fs-btn--ghost" @click=${this.goBack}>
                              ${n("رجوع", "Back")}
                            </button>
                            <button type="button" class="fs-btn fs-btn--ghost" @click=${this.restart}>
                              ${s(t.bca_restart_btn) || n("إعادة البدء", "Start over")}
                            </button>
                          </div>` : c}
                    `}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
};
g.styles = [K, Q];
let l = g;
p([
  q({ type: Object })
], l.prototype, "config");
p([
  f()
], l.prototype, "currentKey");
p([
  f()
], l.prototype, "history");
p([
  f()
], l.prototype, "result");
typeof l < "u" && l.registerSallaComponent("salla-beauty-care-assistant");
export {
  l as default
};
