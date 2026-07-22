import { css as C, LitElement as V, html as n, nothing as l } from "lit";
import { property as q, state as _ } from "lit/decorators.js";
import { classMap as x } from "lit/directives/class-map.js";
import { styleMap as k } from "lit/directives/style-map.js";
import { t as i, n as I, l as p, e as v, s as L, r as S, p as A, a as E } from "./sharedStyles-DKbcXBPy.js";
const T = C`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bba-shell {
    width: 100%;
    max-width: 820px;
    margin-inline: auto;
    display: grid;
    gap: 1rem;
  }

  .bba-case-title {
    margin: 0;
    text-align: center;
    font-size: 1rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bba-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    justify-content: center;
  }

  .bba-tab {
    min-height: 38px;
    padding: 0.4rem 0.95rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      transform 0.15s ease;
  }

  .bba-tab:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  .bba-tab.is-active {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    border-color: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    transform: translateY(-1px);
  }

  .bba-viewer {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: var(--section-radius, 22px);
    overflow: hidden;
    background:
      radial-gradient(
        90% 70% at 50% 0%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
        transparent 65%
      ),
      color-mix(in srgb, var(--border-color, #e5e7eb) 35%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
      0 18px 40px rgba(120, 44, 82, 0.1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    cursor: col-resize;
    outline: none;
  }

  .bba-viewer:focus-visible {
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent),
      0 18px 40px rgba(120, 44, 82, 0.1);
  }

  .bba-viewer.is-dragging {
    cursor: grabbing;
  }

  .bba-viewer__layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .bba-viewer__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }

  .bba-viewer__before {
    z-index: 2;
    clip-path: inset(0 var(--clip-right, 50%) 0 0);
  }

  .bba-viewer__after {
    z-index: 1;
  }

  .bba-handle {
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--handle-left, 50%);
    z-index: 3;
    width: 2px;
    transform: translateX(-50%);
    pointer-events: none;
  }

  .bba-handle__line {
    position: absolute;
    inset: 0;
    width: 3px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
    box-shadow: 0 0 10px rgba(20, 14, 12, 0.28);
  }

  .bba-handle__pill {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    border: 3px solid #fff;
    box-shadow: 0 8px 22px rgba(120, 44, 82, 0.28);
    display: grid;
    place-items: center;
  }

  .bba-handle__arrows {
    color: #fff;
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    line-height: 1;
  }

  .bba-chip {
    position: absolute;
    bottom: 0.9rem;
    z-index: 4;
    padding: 0.35rem 0.8rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--card-bg, #fff) 92%, transparent);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    font-size: 0.74rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 70%, transparent);
    box-shadow: 0 4px 14px rgba(20, 14, 12, 0.1);
    pointer-events: none;
  }

  .bba-chip--before {
    inset-inline-start: 0.9rem;
  }

  .bba-chip--after {
    inset-inline-end: 0.9rem;
  }

  .bba-hint {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 5;
    transform: translate(-50%, -50%);
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.55rem 0.95rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--text-color, #33232e) 88%, transparent);
    color: #fff;
    font-size: 0.8rem;
    font-weight: 700;
    pointer-events: none;
    animation: bba-hint-pulse 1.8s ease-in-out infinite;
    box-shadow: 0 10px 28px rgba(20, 14, 12, 0.22);
  }

  .bba-hint__icon {
    font-size: 1rem;
    line-height: 1;
  }

  @keyframes bba-hint-pulse {
    0%,
    100% {
      opacity: 0.92;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.03);
    }
  }

  .bba-viewer.is-dragging .bba-hint {
    display: none;
  }

  .bba-toolbar {
    display: grid;
    gap: 0.75rem;
    justify-items: center;
  }

  .bba-range {
    display: grid;
    gap: 0.35rem;
    width: min(100%, 420px);
  }

  .bba-range__label {
    font-size: 0.74rem;
    font-weight: 800;
    color: var(--muted-color, #666666);
    text-align: center;
  }

  .bba-range__input {
    width: 100%;
    accent-color: var(--accent-color, var(--fs-store-primary));
    cursor: pointer;
  }

  .bba-quick {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    justify-content: center;
  }

  .bba-quick__btn {
    min-height: 34px;
    padding: 0.3rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }

  .bba-quick__btn:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bba-pair-nav {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
  }

  .bba-pair-nav__btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 1.1rem;
    cursor: pointer;
  }

  .bba-pair-nav__btn:hover {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
  }

  .bba-pair-nav__count {
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--muted-color, #666666);
    min-width: 3.5rem;
    text-align: center;
  }

  @media (max-width: 639px) {
    .bba-viewer {
      border-radius: 18px;
      aspect-ratio: 3 / 4;
    }

    .bba-handle__pill {
      width: 40px;
      height: 40px;
    }

    .bba-hint {
      font-size: 0.74rem;
      padding: 0.45rem 0.8rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bba-hint,
    .bba-tab,
    .bba-quick__btn {
      animation: none !important;
      transition: none !important;
    }
  }
`, z = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1000&q=80", P = "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80", f = {
  before_image: z,
  after_image: P,
  before_label: i("قبل", "Before"),
  after_label: i("بعد", "After"),
  title: i("النتيجة بعد أسبوعين", "2-week results")
};
function j(d) {
  const a = I(d).map((t) => ({
    before_image: v(t.before_image),
    after_image: v(t.after_image),
    before_label: p(t.before_label, ""),
    after_label: p(t.after_label, ""),
    title: p(t.title, "")
  })).filter((t) => t.before_image || t.after_image || t.title);
  return a.length ? a.map((t) => ({
    ...t,
    before_image: t.before_image || f.before_image,
    after_image: t.after_image || f.after_image,
    before_label: t.before_label || f.before_label,
    after_label: t.after_label || f.after_label,
    title: t.title || f.title
  })) : [{ ...f }];
}
function B() {
  return { before: z, after: P };
}
function u(d) {
  return Math.max(0, Math.min(100, d));
}
var H = Object.defineProperty, g = (d, e, a, t) => {
  for (var r = void 0, o = d.length - 1, s; o >= 0; o--)
    (s = d[o]) && (r = s(e, a, r) || r);
  return r && H(e, a, r), r;
};
const w = class w extends V {
  constructor() {
    super(...arguments), this.config = {}, this.position = 50, this.activeIndex = 0, this.dragging = !1, this.hintVisible = !0, this.boundLangHandler = () => this.requestUpdate(), this.startDrag = (e) => {
      var a, t, r, o;
      (t = (a = e.target) == null ? void 0 : a.closest) != null && t.call(a, ".bba-nav, .bba-toolbar, .bba-tabs") || (this.dragging = !0, this.hintVisible = !1, (o = (r = e.currentTarget) == null ? void 0 : r.setPointerCapture) == null || o.call(r, e.pointerId), this.updatePosition(e));
    }, this.onMove = (e) => {
      this.dragging && this.updatePosition(e);
    }, this.endDrag = () => {
      this.dragging = !1;
    }, this.onKeyDown = (e) => {
      const a = e.shiftKey ? 10 : 4, t = this.isRtl ? -1 : 1;
      e.key === "ArrowLeft" ? (e.preventDefault(), this.position = u(this.position - a * t), this.hintVisible = !1) : e.key === "ArrowRight" ? (e.preventDefault(), this.position = u(this.position + a * t), this.hintVisible = !1) : e.key === "Home" ? (e.preventDefault(), this.position = 0, this.hintVisible = !1) : e.key === "End" && (e.preventDefault(), this.position = 100, this.hintVisible = !1);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  get isRtl() {
    return getComputedStyle(this).direction === "rtl";
  }
  updatePosition(e) {
    const a = this.renderRoot.querySelector(".bba-viewer");
    if (!a) return;
    const t = a.getBoundingClientRect(), r = e.clientX - t.left, o = this.isRtl ? (t.width - r) / t.width * 100 : r / t.width * 100;
    this.position = u(o);
  }
  goTo(e) {
    this.activeIndex = e, this.position = 50, this.hintVisible = !0;
  }
  stepPair(e, a) {
    e < 2 || this.goTo((this.activeIndex + a + e) % e);
  }
  onRangeInput(e) {
    this.position = u(Number(e.target.value)), this.hintVisible = !1;
  }
  resolvePairs() {
    const e = this.config || {}, a = j(e.bba_items), t = B(), r = v(e.bba_before_image) || p(e.bba_before_image) || t.before, o = v(e.bba_after_image) || p(e.bba_after_image) || t.after;
    return a.length ? a : [
      {
        before_image: r,
        after_image: o,
        before_label: i("قبل", "Before"),
        after_label: i("بعد", "After"),
        title: ""
      }
    ];
  }
  render() {
    const e = this.config || {}, a = S(e, "bba_"), t = a.animate && !A(), r = p(e.bba_title), o = p(e.bba_desc), s = this.resolvePairs();
    if (!s.length)
      return n`<div class="fs-empty" role="status">
        ${i("أضيفي صور قبل وبعد من إعدادات العنصر", "Add before & after images in element settings")}
      </div>`;
    const m = Math.min(this.activeIndex, s.length - 1), c = s[m], M = `${100 - this.position}%`, D = `${this.position}%`, y = c.before_label || i("قبل", "Before"), $ = c.after_label || i("بعد", "After");
    return n`
      <section
        class=${x({ "fs-section": !0, "fs-animate": t })}
        style=${k(E(a))}
        aria-label=${r || i("قبل وبعد", "Before & After")}
      >
        <div class="fs-container">
          ${r || o ? n`<div class="fs-header">
                ${r ? n`<h2 class="fs-title">${r}</h2>` : l}
                ${o ? n`<p class="fs-desc">${o}</p>` : l}
              </div>` : l}

          <div class="bba-shell">
            ${s.length > 1 ? n`<div class="bba-tabs" role="tablist" aria-label=${i("نتائج المقارنة", "Comparison results")}>
                  ${s.map(
      (R, h) => n`<button
                      type="button"
                      role="tab"
                      class=${x({ "bba-tab": !0, "is-active": h === m })}
                      aria-selected=${h === m ? "true" : "false"}
                      @click=${() => this.goTo(h)}
                    >
                      ${R.title || i(`نتيجة ${h + 1}`, `Result ${h + 1}`)}
                    </button>`
    )}
                </div>` : l}

            ${c.title && s.length === 1 ? n`<p class="bba-case-title">${c.title}</p>` : l}

            <div
              class=${x({ "bba-viewer": !0, "is-dragging": this.dragging })}
              style=${k({ "--clip-right": M, "--handle-left": D })}
              role="slider"
              tabindex="0"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow=${Math.round(this.position)}
              aria-valuetext=${i(
      `${Math.round(this.position)}٪ قبل — ${Math.round(100 - this.position)}٪ بعد`,
      `${Math.round(this.position)}% before — ${Math.round(100 - this.position)}% after`
    )}
              aria-label=${i("اسحبي للمقارنة بين قبل وبعد", "Drag to compare before and after")}
              @pointerdown=${this.startDrag}
              @pointermove=${this.onMove}
              @pointerup=${this.endDrag}
              @pointercancel=${this.endDrag}
              @keydown=${this.onKeyDown}
            >
              <div class="bba-viewer__layer bba-viewer__after">
                ${c.after_image ? n`<img class="bba-viewer__img" src=${c.after_image} alt="" loading="lazy" decoding="async" />` : l}
              </div>
              <div class="bba-viewer__layer bba-viewer__before">
                ${c.before_image ? n`<img class="bba-viewer__img" src=${c.before_image} alt="" loading="lazy" decoding="async" />` : l}
              </div>

              <div class="bba-handle" aria-hidden="true">
                <span class="bba-handle__line"></span>
                <span class="bba-handle__pill">
                  <span class="bba-handle__arrows" aria-hidden="true">‹ ›</span>
                </span>
              </div>

              <span class="bba-chip bba-chip--before">${y}</span>
              <span class="bba-chip bba-chip--after">${$}</span>

              ${this.hintVisible && !this.dragging ? n`<div class="bba-hint" aria-hidden="true">
                    <span class="bba-hint__icon">⇔</span>
                    <span>${i("اسحبي للمقارنة", "Drag to compare")}</span>
                  </div>` : l}
            </div>

            <div class="bba-toolbar">
              <label class="bba-range">
                <span class="bba-range__label">${i("المقارنة", "Compare")}</span>
                <input
                  class="bba-range__input"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  .value=${String(Math.round(this.position))}
                  aria-label=${i("مقدار إظهار صورة قبل", "Before image amount")}
                  @input=${this.onRangeInput}
                />
              </label>

              <div class="bba-quick">
                <button type="button" class="bba-quick__btn" @click=${() => {
      this.position = 100, this.hintVisible = !1;
    }}>
                  ${y}
                </button>
                <button type="button" class="bba-quick__btn" @click=${() => {
      this.position = 50, this.hintVisible = !1;
    }}>
                  50%
                </button>
                <button type="button" class="bba-quick__btn" @click=${() => {
      this.position = 0, this.hintVisible = !1;
    }}>
                  ${$}
                </button>
              </div>

              ${s.length > 1 ? n`<div class="bba-pair-nav">
                    <button
                      type="button"
                      class="bba-pair-nav__btn"
                      aria-label=${i("السابق", "Previous")}
                      @click=${() => this.stepPair(s.length, -1)}
                    >‹</button>
                    <span class="bba-pair-nav__count">${m + 1} / ${s.length}</span>
                    <button
                      type="button"
                      class="bba-pair-nav__btn"
                      aria-label=${i("التالي", "Next")}
                      @click=${() => this.stepPair(s.length, 1)}
                    >›</button>
                  </div>` : l}
            </div>
          </div>
        </div>
      </section>
    `;
  }
};
w.styles = [L, T];
let b = w;
g([
  q({ type: Object })
], b.prototype, "config");
g([
  _()
], b.prototype, "position");
g([
  _()
], b.prototype, "activeIndex");
g([
  _()
], b.prototype, "dragging");
g([
  _()
], b.prototype, "hintVisible");
typeof b < "u" && b.registerSallaComponent("salla-beauty-before-after");
export {
  b as default
};
