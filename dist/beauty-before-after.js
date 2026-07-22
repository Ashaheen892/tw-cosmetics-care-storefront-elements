var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { t, n as normalizeCollection, l as localizedString, e as extractImageUrl, s as sharedSectionCss, r as readSectionTheme, p as prefersReducedMotion, a as themeStyleMap } from "./sharedStyles-CPLtr3dp.js";
const componentStyles = css`
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
`, BEFORE = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1000&q=80", AFTER = "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80", DEFAULT_PAIR = {
  before_image: BEFORE,
  after_image: AFTER,
  before_label: t("قبل", "Before"),
  after_label: t("بعد", "After"),
  title: t("النتيجة بعد أسبوعين", "2-week results")
};
function parsePairs(raw) {
  const parsed = normalizeCollection(raw).map((row) => ({
    before_image: extractImageUrl(row.before_image),
    after_image: extractImageUrl(row.after_image),
    before_label: localizedString(row.before_label, ""),
    after_label: localizedString(row.after_label, ""),
    title: localizedString(row.title, "")
  })).filter((p) => p.before_image || p.after_image || p.title);
  return parsed.length ? parsed.map((p) => ({
    ...p,
    before_image: p.before_image || DEFAULT_PAIR.before_image,
    after_image: p.after_image || DEFAULT_PAIR.after_image,
    before_label: p.before_label || DEFAULT_PAIR.before_label,
    after_label: p.after_label || DEFAULT_PAIR.after_label,
    title: p.title || DEFAULT_PAIR.title
  })) : [{ ...DEFAULT_PAIR }];
}
__name(parsePairs, "parsePairs");
function defaultSingleImages() {
  return { before: BEFORE, after: AFTER };
}
__name(defaultSingleImages, "defaultSingleImages");
function clampPosition(value) {
  return Math.max(0, Math.min(100, value));
}
__name(clampPosition, "clampPosition");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _BeautyBeforeAfter = class _BeautyBeforeAfter extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.position = 50, this.activeIndex = 0, this.dragging = !1, this.hintVisible = !0, this.boundLangHandler = () => this.requestUpdate(), this.startDrag = (e) => {
      var _a, _b, _c, _d;
      (_b = (_a = e.target) == null ? void 0 : _a.closest) != null && _b.call(_a, ".bba-nav, .bba-toolbar, .bba-tabs") || (this.dragging = !0, this.hintVisible = !1, (_d = (_c = e.currentTarget) == null ? void 0 : _c.setPointerCapture) == null || _d.call(_c, e.pointerId), this.updatePosition(e));
    }, this.onMove = (e) => {
      this.dragging && this.updatePosition(e);
    }, this.endDrag = () => {
      this.dragging = !1;
    }, this.onKeyDown = (e) => {
      const step = e.shiftKey ? 10 : 4, dir = this.isRtl ? -1 : 1;
      e.key === "ArrowLeft" ? (e.preventDefault(), this.position = clampPosition(this.position - step * dir), this.hintVisible = !1) : e.key === "ArrowRight" ? (e.preventDefault(), this.position = clampPosition(this.position + step * dir), this.hintVisible = !1) : e.key === "Home" ? (e.preventDefault(), this.position = 0, this.hintVisible = !1) : e.key === "End" && (e.preventDefault(), this.position = 100, this.hintVisible = !1);
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
    const viewer = this.renderRoot.querySelector(".bba-viewer");
    if (!viewer) return;
    const rect = viewer.getBoundingClientRect(), x = e.clientX - rect.left, pct = this.isRtl ? (rect.width - x) / rect.width * 100 : x / rect.width * 100;
    this.position = clampPosition(pct);
  }
  goTo(index) {
    this.activeIndex = index, this.position = 50, this.hintVisible = !0;
  }
  stepPair(total, dir) {
    total < 2 || this.goTo((this.activeIndex + dir + total) % total);
  }
  onRangeInput(e) {
    this.position = clampPosition(Number(e.target.value)), this.hintVisible = !1;
  }
  resolvePairs() {
    const c = this.config || {}, pairs = parsePairs(c.bba_items), defaults = defaultSingleImages(), singleBefore = extractImageUrl(c.bba_before_image) || localizedString(c.bba_before_image) || defaults.before, singleAfter = extractImageUrl(c.bba_after_image) || localizedString(c.bba_after_image) || defaults.after;
    return pairs.length ? pairs : [
      {
        before_image: singleBefore,
        after_image: singleAfter,
        before_label: t("قبل", "Before"),
        after_label: t("بعد", "After"),
        title: ""
      }
    ];
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bba_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.bba_title), desc = localizedString(c.bba_desc), allPairs = this.resolvePairs();
    if (!allPairs.length)
      return html`<div class="fs-empty" role="status">
        ${t("أضيفي صور قبل وبعد من إعدادات العنصر", "Add before & after images in element settings")}
      </div>`;
    const idx = Math.min(this.activeIndex, allPairs.length - 1), pair = allPairs[idx], clipRight = `${100 - this.position}%`, handleLeft = `${this.position}%`, beforeLabel = pair.before_label || t("قبل", "Before"), afterLabel = pair.after_label || t("بعد", "After");
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("قبل وبعد", "Before & After")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="bba-shell">
            ${allPairs.length > 1 ? html`<div class="bba-tabs" role="tablist" aria-label=${t("نتائج المقارنة", "Comparison results")}>
                  ${allPairs.map(
      (p, i) => html`<button
                      type="button"
                      role="tab"
                      class=${classMap({ "bba-tab": !0, "is-active": i === idx })}
                      aria-selected=${i === idx ? "true" : "false"}
                      @click=${() => this.goTo(i)}
                    >
                      ${p.title || t(`نتيجة ${i + 1}`, `Result ${i + 1}`)}
                    </button>`
    )}
                </div>` : nothing}

            ${pair.title && allPairs.length === 1 ? html`<p class="bba-case-title">${pair.title}</p>` : nothing}

            <div
              class=${classMap({ "bba-viewer": !0, "is-dragging": this.dragging })}
              style=${styleMap({ "--clip-right": clipRight, "--handle-left": handleLeft })}
              role="slider"
              tabindex="0"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow=${Math.round(this.position)}
              aria-valuetext=${t(
      `${Math.round(this.position)}٪ قبل — ${Math.round(100 - this.position)}٪ بعد`,
      `${Math.round(this.position)}% before — ${Math.round(100 - this.position)}% after`
    )}
              aria-label=${t("اسحبي للمقارنة بين قبل وبعد", "Drag to compare before and after")}
              @pointerdown=${this.startDrag}
              @pointermove=${this.onMove}
              @pointerup=${this.endDrag}
              @pointercancel=${this.endDrag}
              @keydown=${this.onKeyDown}
            >
              <div class="bba-viewer__layer bba-viewer__after">
                ${pair.after_image ? html`<img class="bba-viewer__img" src=${pair.after_image} alt="" loading="lazy" decoding="async" />` : nothing}
              </div>
              <div class="bba-viewer__layer bba-viewer__before">
                ${pair.before_image ? html`<img class="bba-viewer__img" src=${pair.before_image} alt="" loading="lazy" decoding="async" />` : nothing}
              </div>

              <div class="bba-handle" aria-hidden="true">
                <span class="bba-handle__line"></span>
                <span class="bba-handle__pill">
                  <span class="bba-handle__arrows" aria-hidden="true">‹ ›</span>
                </span>
              </div>

              <span class="bba-chip bba-chip--before">${beforeLabel}</span>
              <span class="bba-chip bba-chip--after">${afterLabel}</span>

              ${this.hintVisible && !this.dragging ? html`<div class="bba-hint" aria-hidden="true">
                    <span class="bba-hint__icon">⇔</span>
                    <span>${t("اسحبي للمقارنة", "Drag to compare")}</span>
                  </div>` : nothing}
            </div>

            <div class="bba-toolbar">
              <label class="bba-range">
                <span class="bba-range__label">${t("المقارنة", "Compare")}</span>
                <input
                  class="bba-range__input"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  .value=${String(Math.round(this.position))}
                  aria-label=${t("مقدار إظهار صورة قبل", "Before image amount")}
                  @input=${this.onRangeInput}
                />
              </label>

              <div class="bba-quick">
                <button type="button" class="bba-quick__btn" @click=${() => {
      this.position = 100, this.hintVisible = !1;
    }}>
                  ${beforeLabel}
                </button>
                <button type="button" class="bba-quick__btn" @click=${() => {
      this.position = 50, this.hintVisible = !1;
    }}>
                  50%
                </button>
                <button type="button" class="bba-quick__btn" @click=${() => {
      this.position = 0, this.hintVisible = !1;
    }}>
                  ${afterLabel}
                </button>
              </div>

              ${allPairs.length > 1 ? html`<div class="bba-pair-nav">
                    <button
                      type="button"
                      class="bba-pair-nav__btn"
                      aria-label=${t("السابق", "Previous")}
                      @click=${() => this.stepPair(allPairs.length, -1)}
                    >‹</button>
                    <span class="bba-pair-nav__count">${idx + 1} / ${allPairs.length}</span>
                    <button
                      type="button"
                      class="bba-pair-nav__btn"
                      aria-label=${t("التالي", "Next")}
                      @click=${() => this.stepPair(allPairs.length, 1)}
                    >›</button>
                  </div>` : nothing}
            </div>
          </div>
        </div>
      </section>
    `;
  }
};
__name(_BeautyBeforeAfter, "BeautyBeforeAfter"), _BeautyBeforeAfter.styles = [sharedSectionCss, componentStyles];
let BeautyBeforeAfter = _BeautyBeforeAfter;
__decorateClass([
  property({ type: Object })
], BeautyBeforeAfter.prototype, "config");
__decorateClass([
  state()
], BeautyBeforeAfter.prototype, "position");
__decorateClass([
  state()
], BeautyBeforeAfter.prototype, "activeIndex");
__decorateClass([
  state()
], BeautyBeforeAfter.prototype, "dragging");
__decorateClass([
  state()
], BeautyBeforeAfter.prototype, "hintVisible");
typeof BeautyBeforeAfter < "u" && BeautyBeforeAfter.registerSallaComponent("salla-beauty-before-after");
export {
  BeautyBeforeAfter as default
};
