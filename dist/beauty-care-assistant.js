import { css as M, LitElement as L, nothing as d, html as s } from "lit";
import { property as T, state as v } from "lit/decorators.js";
import { classMap as $ } from "lit/directives/class-map.js";
import { styleMap as k } from "lit/directives/style-map.js";
import { n as q, l as o, e as S, g as j, b as B, s as D, t as i, r as R, p as E, a as H } from "./sharedStyles-DKbcXBPy.js";
import { r as Q } from "./commerceOutcome-Dk8p2VWM.js";
const O = M`
  :host {
    direction: inherit;
  }

  .bca-shell {
    max-width: 720px;
    margin-inline: auto;
    border-radius: var(--section-radius, 18px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 14px 40px rgba(43, 33, 28, 0.08);
    overflow: hidden;
  }

  .bca-topbar {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.9rem 1.1rem;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    border-bottom: 1px solid var(--border-color, #e5e7eb);
  }

  .bca-avatar {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    object-fit: cover;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, #fff);
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
    color: var(--text-color, #000000);
  }

  .bca-trail__hint {
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
  }

  .bca-body {
    padding: 1.1rem;
    display: grid;
    gap: 1rem;
  }

  .bca-progress-wrap {
    display: grid;
    gap: 0.35rem;
  }

  .bca-progress {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, transparent);
    overflow: hidden;
  }

  .bca-progress > span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #7b2c52)
    );
    transition: width 0.35s ease;
  }

  .bca-progress__label {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--muted-color, #666666);
  }

  .bca-trail {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  .bca-trail__list {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    min-width: min-content;
  }

  .bca-trail__item {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
  }

  .bca-trail__item--current .bca-trail__sep {
    display: none;
  }

  .bca-trail__chip {
    display: inline-flex;
    align-items: center;
    max-width: 9rem;
    padding: 0.35rem 0.65rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.72rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  button.bca-trail__chip:hover {
    border-color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff));
  }

  .bca-trail__chip--current {
    border-color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    cursor: default;
    max-width: 11rem;
  }

  .bca-trail__sep {
    margin-inline: 0.25rem;
    color: var(--muted-color, #666666);
    font-size: 0.85rem;
    user-select: none;
  }

  .bca-bubble {
    max-width: 85%;
    padding: 0.85rem 1.05rem;
    border-radius: 16px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    color: var(--text-color, #000000);
    font-size: 1rem;
    line-height: 1.6;
    border-start-start-radius: 4px;
  }

  .bca-question-img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 14px;
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
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 600;
    text-align: start;
    cursor: pointer;
    transition: border-color 0.2s ease, transform 0.15s ease, background 0.2s ease;
  }

  .bca-answer:hover {
    border-color: var(--accent-color, var(--fs-store-primary));
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
    gap: 0.75rem;
    padding: 1.1rem 1.15rem;
    border-radius: calc(var(--section-radius, 18px) * 0.85);
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, var(--card-bg, #fff)),
      var(--card-bg, #fff)
    );
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, var(--border-color, #e5e7eb));
    box-shadow: 0 10px 28px rgba(194, 82, 127, 0.1);
  }

  .bca-result__badge {
    width: 2.4rem;
    height: 2.4rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-size: 1rem;
    font-weight: 800;
  }

  .bca-result__title {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 800;
    line-height: 1.3;
    color: var(--text-color, #000000);
  }

  .bca-result__desc {
    margin: 0;
    color: var(--muted-color, #666666);
    line-height: 1.65;
    font-size: 0.95rem;
  }

  .bca-result__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.15rem;
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
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, #fff);
    border-radius: 999px / 60px;
    background: linear-gradient(180deg, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, #fff), var(--card-bg, #fff));
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
    .bca-progress > span,
    .bca-trail__chip {
      transition: none;
    }
  }

  @media (max-width: 520px) {
    .bca-bubble {
      max-width: 100%;
    }
    .bca-result__title {
      font-size: 1.2rem;
    }
  }
`;
function P(a, r) {
  return a.trim().toLowerCase().replace(/\s+/g, "-") || r;
}
function A(a, r) {
  return q(a).map((t, e) => ({
    id: `${r}-a${e}`,
    label: o(t.label),
    image: S(t.image),
    next: o(t.next).trim(),
    result_title: o(t.result_title),
    result_desc: o(t.result_desc),
    link: B(t.link),
    link_text: o(t.link_text)
  })).filter((t) => t.label || t.result_title || t.link);
}
function I(a) {
  return q(a).map((r, t) => {
    const e = P(o(r.q_key), `q${t + 1}`);
    return {
      key: e,
      text: o(r.q_text),
      image: S(r.q_image),
      answers: A(r.answers, e)
    };
  }).filter((r) => r.text || r.answers.length);
}
function U(a, r) {
  var e;
  const t = o(a.bca_start_key).trim().toLowerCase().replace(/\s+/g, "-");
  return t && r.some((n) => n.key === t) ? t : ((e = r[0]) == null ? void 0 : e.key) ?? "";
}
function K(a, r) {
  return a.find((t) => t.key === r) ?? null;
}
function z(a, r) {
  return a.next ? !r.some((t) => t.key === a.next) : !0;
}
function Y(a) {
  const r = j(a.bca_style, "chat");
  return r === "expert" || r === "mirror" || r === "cards" ? r : "chat";
}
function G(a, r) {
  if (!r || !a.length) return 1;
  const t = new Map(a.map((l) => [l.key, l]));
  let e = 1;
  function n(l, c, h) {
    const f = t.get(l);
    if (!f) {
      e = Math.max(e, c);
      return;
    }
    if (h.has(l)) {
      e = Math.max(e, c);
      return;
    }
    const m = new Set(h);
    m.add(l);
    let b = !1;
    for (const p of f.answers)
      z(p, a) ? (e = Math.max(e, c + 1), b = !0) : p.next && (b = !0, n(p.next, c + 1, m));
    b || (e = Math.max(e, c));
  }
  return n(r, 1, /* @__PURE__ */ new Set()), Math.max(e, 1);
}
function J(a, r) {
  return a.length + 1;
}
function N(a, r, t) {
  if (r) return 100;
  const e = a.length + 1, n = Math.max(t, e);
  return Math.min(92, Math.round(e / n * 100));
}
var V = Object.defineProperty, g = (a, r, t, e) => {
  for (var n = void 0, l = a.length - 1, c; l >= 0; l--)
    (c = a[l]) && (n = c(r, t, n) || n);
  return n && V(r, t, n), n;
};
const _ = class _ extends L {
  constructor() {
    super(...arguments), this.config = {}, this.currentKey = "", this.trail = [], this.result = null, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.restart();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(r) {
    r.has("config") && this.restart();
  }
  get questions() {
    var r;
    return I((r = this.config) == null ? void 0 : r.bca_questions);
  }
  get startKey() {
    return U(this.config || {}, this.questions);
  }
  get maxDepth() {
    return G(this.questions, this.startKey);
  }
  restart() {
    this.currentKey = this.startKey, this.trail = [], this.result = null;
  }
  goBack() {
    if (this.result) {
      this.result = null;
      return;
    }
    const r = [...this.trail], t = r.pop();
    t && (this.trail = r, this.currentKey = t.questionKey);
  }
  jumpToStep(r) {
    if (this.result && (this.result = null), r < 0) {
      this.trail = [], this.currentKey = this.startKey;
      return;
    }
    const t = this.trail.slice(0, r + 1), e = t[t.length - 1];
    e && (this.trail = t.slice(0, -1), this.currentKey = e.questionKey);
  }
  chooseAnswer(r) {
    const t = this.questions, e = K(t, this.currentKey);
    if (e) {
      if (!z(r, t)) {
        this.trail = [
          ...this.trail,
          {
            questionKey: this.currentKey,
            questionText: e.text,
            answerLabel: r.label || i("اختيار", "Choice")
          }
        ], this.currentKey = r.next, this.result = null;
        return;
      }
      this.trail = [
        ...this.trail,
        {
          questionKey: this.currentKey,
          questionText: e.text,
          answerLabel: r.label || i("اختيار", "Choice")
        }
      ], this.result = r;
    }
  }
  renderTrail() {
    return !this.trail.length && !this.result ? d : s`
      <nav class="bca-trail" aria-label=${i("مسار إجاباتك", "Your answer path")}>
        <ol class="bca-trail__list">
          ${this.trail.map(
      (r, t) => s`
              <li class="bca-trail__item">
                <button
                  type="button"
                  class="bca-trail__chip"
                  title=${r.questionText}
                  @click=${() => this.jumpToStep(t)}
                >
                  <span class="bca-trail__answer">${r.answerLabel}</span>
                </button>
                <span class="bca-trail__sep" aria-hidden="true">›</span>
              </li>
            `
    )}
          ${this.result ? s`<li class="bca-trail__item bca-trail__item--current" aria-current="step">
                <span class="bca-trail__chip bca-trail__chip--current">
                  ${this.result.result_title || i("النتيجة", "Result")}
                </span>
              </li>` : s`<li class="bca-trail__item bca-trail__item--current" aria-current="step">
                <span class="bca-trail__chip bca-trail__chip--current">
                  ${i("السؤال الحالي", "Current question")}
                </span>
              </li>`}
        </ol>
      </nav>
    `;
  }
  renderResult(r) {
    const t = this.config || {};
    return s`
      <div class="bca-result" aria-live="polite">
        <div class="bca-result__badge" aria-hidden="true">✦</div>
        ${r.result_title ? s`<h3 class="bca-result__title">${r.result_title}</h3>` : s`<h3 class="bca-result__title">${i("إليكِ توصيتنا", "Here is our recommendation")}</h3>`}
        ${r.result_desc ? s`<p class="bca-result__desc">${r.result_desc}</p>` : d}
        ${r.link ? s`<div class="bca-result__actions">
              <a class="fs-btn fs-tap" href=${r.link}>
                ${r.link_text || o(t.bca_result_btn) || i("انتقلي إلى النتيجة", "Go to result")}
              </a>
            </div>` : d}
        <div class="bca-nav">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
            ${i("تعديل آخر إجابة", "Edit last answer")}
          </button>
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.restart}>
            ${o(t.bca_restart_btn) || i("إعادة البدء", "Start over")}
          </button>
          ${Q(t, "bca_")}
        </div>
      </div>
    `;
  }
  renderQuestion(r) {
    return s`
      <div class="bca-answers" role="group" aria-label=${r.text || i("الخيارات", "Options")}>
        ${r.answers.map(
      (t) => s`
            <button type="button" class="bca-answer fs-tap" @click=${() => this.chooseAnswer(t)}>
              ${t.image ? s`<img class="bca-answer__icon" src=${t.image} alt="" loading="lazy" />` : d}
              <span>${t.label || i("اختيار", "Choice")}</span>
            </button>
          `
    )}
      </div>
    `;
  }
  render() {
    const r = this.config || {}, t = R(r, "bca_"), e = t.animate && !E(), n = this.questions, l = Y(r), c = o(r.bca_title), h = o(r.bca_desc), f = o(r.bca_assistant_name) || i("خبيرة الجمال", "Beauty expert"), m = o(r.bca_avatar);
    if (!n.length)
      return s`<div class="fs-empty" role="status">
        ${i("أضيفي أسئلة المساعد من إعدادات العنصر", "Add assistant questions in the element settings")}
      </div>`;
    const b = K(n, this.currentKey) || n[0], p = !!this.result, x = J(this.trail, p), C = this.maxDepth, y = N(this.trail, p, C), w = p ? i("اكتملت الرحلة", "Journey complete") : i(`الخطوة ${x}`, `Step ${x}`);
    return s`
      <section
        class=${$({ "fs-section": !0, "fs-animate": e })}
        style=${k(H(t))}
        aria-label=${c || i("مساعد اختيار منتجات الجمال", "Beauty care assistant")}
      >
        <div class="fs-container">
          ${c || h ? s`<div class="fs-header">
                ${c ? s`<h2 class="fs-title">${c}</h2>` : d}
                ${h ? s`<p class="fs-desc">${h}</p>` : d}
              </div>` : d}

          <div class=${$({ [`bca--${l}`]: !0 })}>
            <div class="bca-shell">
              <div class="bca-topbar">
                ${m ? s`<img class="bca-avatar" src=${m} alt="" loading="lazy" />` : s`<span class="bca-avatar" aria-hidden="true">✦</span>`}
                <div class="bca-topbar__meta">
                  <span class="bca-topbar__name">${f}</span>
                  <span class="bca-trail__hint">${i("سأساعدك في اختيار الأنسب لكِ", "I will help you choose")}</span>
                </div>
              </div>

              <div class="bca-body">
                <div class="bca-progress-wrap">
                  <div
                    class="bca-progress"
                    role="progressbar"
                    aria-valuenow=${y}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label=${w}
                  >
                    <span style=${k({ width: `${y}%` })}></span>
                  </div>
                  <span class="bca-progress__label">${w}</span>
                </div>

                ${this.renderTrail()}

                ${this.result ? this.renderResult(this.result) : s`
                      ${b.image ? s`<img
                            class="bca-question-img"
                            src=${b.image}
                            alt=""
                            loading="lazy"
                          />` : d}
                      <div class="bca-bubble">${b.text || i("اختاري أحد الخيارات", "Choose an option")}</div>
                      ${this.renderQuestion(b)}
                      ${this.trail.length ? s`<div class="bca-nav">
                            <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
                              ${i("رجوع", "Back")}
                            </button>
                            <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.restart}>
                              ${o(r.bca_restart_btn) || i("إعادة البدء", "Start over")}
                            </button>
                          </div>` : d}
                    `}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
};
_.styles = [D, O];
let u = _;
g([
  T({ type: Object })
], u.prototype, "config");
g([
  v()
], u.prototype, "currentKey");
g([
  v()
], u.prototype, "trail");
g([
  v()
], u.prototype, "result");
typeof u < "u" && u.registerSallaComponent("salla-beauty-care-assistant");
export {
  u as default
};
