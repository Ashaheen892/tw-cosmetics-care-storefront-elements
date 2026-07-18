import { css as C, LitElement as L, nothing as d, html as s } from "lit";
import { property as T, state as _ } from "lit/decorators.js";
import { classMap as $ } from "lit/directives/class-map.js";
import { styleMap as k } from "lit/directives/style-map.js";
import { n as q, l as c, e as S, g as j, b as D, s as R, t as i, r as B, p as E, a as H } from "./sharedStyles--LaFqDVC.js";
const Q = C`
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

  .bca-trail__hint {
    font-size: 0.76rem;
    color: var(--muted-color, #8f7a86);
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
    background: color-mix(in srgb, var(--border-color, #f2dde7) 70%, transparent);
    overflow: hidden;
  }

  .bca-progress > span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--accent-color, #c2527f),
      color-mix(in srgb, var(--accent-color, #c2527f) 70%, #7b2c52)
    );
    transition: width 0.35s ease;
  }

  .bca-progress__label {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
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
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
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
    border-color: var(--accent-color, #c2527f);
    background: color-mix(in srgb, var(--accent-color, #c2527f) 8%, var(--card-bg, #fff));
  }

  .bca-trail__chip--current {
    border-color: var(--accent-color, #c2527f);
    background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
    color: var(--accent-color, #c2527f);
    cursor: default;
    max-width: 11rem;
  }

  .bca-trail__sep {
    margin-inline: 0.25rem;
    color: var(--muted-color, #8f7a86);
    font-size: 0.85rem;
    user-select: none;
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
    gap: 0.75rem;
    padding: 1.1rem 1.15rem;
    border-radius: calc(var(--section-radius, 18px) * 0.85);
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--accent-color, #c2527f) 14%, var(--card-bg, #fff)),
      var(--card-bg, #fff)
    );
    border: 1px solid color-mix(in srgb, var(--accent-color, #c2527f) 28%, var(--border-color, #f2dde7));
    box-shadow: 0 10px 28px rgba(194, 82, 127, 0.1);
  }

  .bca-result__badge {
    width: 2.4rem;
    height: 2.4rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, #c2527f);
    color: #fff;
    font-size: 1rem;
    font-weight: 800;
  }

  .bca-result__title {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 800;
    line-height: 1.3;
    color: var(--text-color, #33232e);
  }

  .bca-result__desc {
    margin: 0;
    color: var(--muted-color, #8f7a86);
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
function O(a, t) {
  return a.trim().toLowerCase().replace(/\s+/g, "-") || t;
}
function P(a, t) {
  return q(a).map((e, r) => ({
    id: `${t}-a${r}`,
    label: c(e.label),
    image: S(e.image),
    next: c(e.next).trim(),
    result_title: c(e.result_title),
    result_desc: c(e.result_desc),
    link: D(e.link),
    link_text: c(e.link_text)
  })).filter((e) => e.label || e.result_title || e.link);
}
function A(a) {
  return q(a).map((t, e) => {
    const r = O(c(t.q_key), `q${e + 1}`);
    return {
      key: r,
      text: c(t.q_text),
      image: S(t.q_image),
      answers: P(t.answers, r)
    };
  }).filter((t) => t.text || t.answers.length);
}
function I(a, t) {
  var r;
  const e = c(a.bca_start_key).trim().toLowerCase().replace(/\s+/g, "-");
  return e && t.some((n) => n.key === e) ? e : ((r = t[0]) == null ? void 0 : r.key) ?? "";
}
function K(a, t) {
  return a.find((e) => e.key === t) ?? null;
}
function z(a, t) {
  return a.next ? !t.some((e) => e.key === a.next) : !0;
}
function U(a) {
  const t = j(a.bca_style, "chat");
  return t === "expert" || t === "mirror" || t === "cards" ? t : "chat";
}
function Y(a, t) {
  if (!t || !a.length) return 1;
  const e = new Map(a.map((l) => [l.key, l]));
  let r = 1;
  function n(l, o, f) {
    const m = e.get(l);
    if (!m) {
      r = Math.max(r, o);
      return;
    }
    if (f.has(l)) {
      r = Math.max(r, o);
      return;
    }
    const h = new Set(f);
    h.add(l);
    let b = !1;
    for (const p of m.answers)
      z(p, a) ? (r = Math.max(r, o + 1), b = !0) : p.next && (b = !0, n(p.next, o + 1, h));
    b || (r = Math.max(r, o));
  }
  return n(t, 1, /* @__PURE__ */ new Set()), Math.max(r, 1);
}
function G(a, t) {
  return a.length + 1;
}
function J(a, t, e) {
  if (t) return 100;
  const r = a.length + 1, n = Math.max(e, r);
  return Math.min(92, Math.round(r / n * 100));
}
var N = Object.defineProperty, g = (a, t, e, r) => {
  for (var n = void 0, l = a.length - 1, o; l >= 0; l--)
    (o = a[l]) && (n = o(t, e, n) || n);
  return n && N(t, e, n), n;
};
const v = class v extends L {
  constructor() {
    super(...arguments), this.config = {}, this.currentKey = "", this.trail = [], this.result = null, this.boundLangHandler = () => this.requestUpdate();
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
    return A((t = this.config) == null ? void 0 : t.bca_questions);
  }
  get startKey() {
    return I(this.config || {}, this.questions);
  }
  get maxDepth() {
    return Y(this.questions, this.startKey);
  }
  restart() {
    this.currentKey = this.startKey, this.trail = [], this.result = null;
  }
  goBack() {
    if (this.result) {
      this.result = null;
      return;
    }
    const t = [...this.trail], e = t.pop();
    e && (this.trail = t, this.currentKey = e.questionKey);
  }
  jumpToStep(t) {
    if (this.result && (this.result = null), t < 0) {
      this.trail = [], this.currentKey = this.startKey;
      return;
    }
    const e = this.trail.slice(0, t + 1), r = e[e.length - 1];
    r && (this.trail = e.slice(0, -1), this.currentKey = r.questionKey);
  }
  chooseAnswer(t) {
    const e = this.questions, r = K(e, this.currentKey);
    if (r) {
      if (!z(t, e)) {
        this.trail = [
          ...this.trail,
          {
            questionKey: this.currentKey,
            questionText: r.text,
            answerLabel: t.label || i("اختيار", "Choice")
          }
        ], this.currentKey = t.next, this.result = null;
        return;
      }
      this.trail = [
        ...this.trail,
        {
          questionKey: this.currentKey,
          questionText: r.text,
          answerLabel: t.label || i("اختيار", "Choice")
        }
      ], this.result = t;
    }
  }
  renderTrail() {
    return !this.trail.length && !this.result ? d : s`
      <nav class="bca-trail" aria-label=${i("مسار إجاباتك", "Your answer path")}>
        <ol class="bca-trail__list">
          ${this.trail.map(
      (t, e) => s`
              <li class="bca-trail__item">
                <button
                  type="button"
                  class="bca-trail__chip"
                  title=${t.questionText}
                  @click=${() => this.jumpToStep(e)}
                >
                  <span class="bca-trail__answer">${t.answerLabel}</span>
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
  renderResult(t) {
    const e = this.config || {};
    return s`
      <div class="bca-result" aria-live="polite">
        <div class="bca-result__badge" aria-hidden="true">✦</div>
        ${t.result_title ? s`<h3 class="bca-result__title">${t.result_title}</h3>` : s`<h3 class="bca-result__title">${i("إليكِ توصيتنا", "Here is our recommendation")}</h3>`}
        ${t.result_desc ? s`<p class="bca-result__desc">${t.result_desc}</p>` : d}
        ${t.link ? s`<div class="bca-result__actions">
              <a class="fs-btn fs-tap" href=${t.link}>
                ${t.link_text || c(e.bca_result_btn) || i("انتقلي إلى النتيجة", "Go to result")}
              </a>
            </div>` : d}
        <div class="bca-nav">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
            ${i("تعديل آخر إجابة", "Edit last answer")}
          </button>
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.restart}>
            ${c(e.bca_restart_btn) || i("إعادة البدء", "Start over")}
          </button>
        </div>
      </div>
    `;
  }
  renderQuestion(t) {
    return s`
      <div class="bca-answers" role="group" aria-label=${t.text || i("الخيارات", "Options")}>
        ${t.answers.map(
      (e) => s`
            <button type="button" class="bca-answer fs-tap" @click=${() => this.chooseAnswer(e)}>
              ${e.image ? s`<img class="bca-answer__icon" src=${e.image} alt="" loading="lazy" />` : d}
              <span>${e.label || i("اختيار", "Choice")}</span>
            </button>
          `
    )}
      </div>
    `;
  }
  render() {
    const t = this.config || {}, e = B(t, "bca_"), r = e.animate && !E(), n = this.questions, l = U(t), o = c(t.bca_title), f = c(t.bca_desc), m = c(t.bca_assistant_name) || i("خبيرة الجمال", "Beauty expert"), h = c(t.bca_avatar);
    if (!n.length)
      return s`<div class="fs-empty" role="status">
        ${i("أضيفي أسئلة المساعد من إعدادات العنصر", "Add assistant questions in the element settings")}
      </div>`;
    const b = K(n, this.currentKey) || n[0], p = !!this.result, x = G(this.trail, p), M = this.maxDepth, y = J(this.trail, p, M), w = p ? i("اكتملت الرحلة", "Journey complete") : i(`الخطوة ${x}`, `Step ${x}`);
    return s`
      <section
        class=${$({ "fs-section": !0, "fs-animate": r })}
        style=${k(H(e))}
        aria-label=${o || i("مساعد اختيار منتجات الجمال", "Beauty care assistant")}
      >
        <div class="fs-container">
          ${o || f ? s`<div class="fs-header">
                ${o ? s`<h2 class="fs-title">${o}</h2>` : d}
                ${f ? s`<p class="fs-desc">${f}</p>` : d}
              </div>` : d}

          <div class=${$({ [`bca--${l}`]: !0 })}>
            <div class="bca-shell">
              <div class="bca-topbar">
                ${h ? s`<img class="bca-avatar" src=${h} alt="" loading="lazy" />` : s`<span class="bca-avatar" aria-hidden="true">✦</span>`}
                <div class="bca-topbar__meta">
                  <span class="bca-topbar__name">${m}</span>
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
                              ${c(t.bca_restart_btn) || i("إعادة البدء", "Start over")}
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
v.styles = [R, Q];
let u = v;
g([
  T({ type: Object })
], u.prototype, "config");
g([
  _()
], u.prototype, "currentKey");
g([
  _()
], u.prototype, "trail");
g([
  _()
], u.prototype, "result");
typeof u < "u" && u.registerSallaComponent("salla-beauty-care-assistant");
export {
  u as default
};
