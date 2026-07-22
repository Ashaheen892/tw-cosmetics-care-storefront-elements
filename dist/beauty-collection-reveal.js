var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { g as getRadioValue, c as getUnitValue, n as normalizeCollection, b as extractLink, l as localizedString, e as extractImageUrl, t, s as sharedSectionCss, i as isTruthy, d as isExternalUrl, r as readSectionTheme, p as prefersReducedMotion, a as themeStyleMap } from "./sharedStyles-2kfPtH3m.js";
import { r as renderCommerceCtaButton } from "./commerceOutcome-BDH0KFrf.js";
const componentStyles = css`
  :host {
    direction: inherit;
  }

  .bcr-scene {
    position: relative;
    border-radius: var(--section-radius, 18px);
    overflow: hidden;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--section-bg, transparent));
    border: 1px solid var(--border-color, #e5e7eb);
    min-height: 260px;
  }

  /* Closed: full container width, mid-frame height */
  .bcr-scene:not(.is-open) {
    width: 100%;
    aspect-ratio: 16 / 10;
    max-height: min(42vh, 380px);
  }

  .bcr-scene:not(.is-open) .bcr-stage {
    visibility: hidden;
    height: 0;
    padding: 0;
    overflow: hidden;
    pointer-events: none;
  }

  @media (max-width: 639px) {
    .bcr-scene:not(.is-open) {
      width: 100%;
      aspect-ratio: 1 / 1;
      max-height: min(50vw, 260px);
      min-height: 200px;
    }
  }

  /* —— Cover —— */
  .bcr-cover {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.25rem 1.5rem;
    background: linear-gradient(160deg, #33232e, #4a382f);
    color: #fff;
    transition: transform 0.8s cubic-bezier(0.7, 0, 0.3, 1),
      opacity 0.8s ease, clip-path 0.8s ease;
    will-change: transform, opacity;
  }

  .bcr-cover__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.45;
  }

  .bcr-cover__scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(20, 14, 12, 0.35) 0%,
      rgba(20, 14, 12, 0.72) 55%,
      rgba(20, 14, 12, 0.88) 100%
    );
    pointer-events: none;
  }

  .bcr-cover__inner {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.65rem;
    justify-items: center;
    align-content: center;
    width: min(100%, 22rem);
    margin: 0 auto;
  }

  .bcr-cover__title {
    margin: 0;
    font-size: clamp(1.2rem, 3.2vw, 1.85rem);
    font-weight: 800;
    line-height: 1.25;
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45);
  }

  .bcr-cover__hint {
    margin: 0;
    font-size: 0.88rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.82);
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);
  }

  .bcr-cover__btn {
    /* inherits .fs-btn pill system; only lift contrast on dark cover */
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.32);
  }

  .bcr-cover__btn:hover,
  .bcr-cover__btn:focus-visible {
    filter: brightness(1.06);
  }

  /* Split covers for curtain / petals need two halves */
  .bcr-cover__half {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background: linear-gradient(160deg, #33232e, #4a382f);
    z-index: 4;
    transition: transform 0.85s cubic-bezier(0.7, 0, 0.3, 1);
  }
  .bcr-cover__half--start {
    inset-inline-start: 0;
  }
  .bcr-cover__half--end {
    inset-inline-end: 0;
  }

  /* —— Reveal states per mode —— */
  .bcr-scene.is-open .bcr-cover--box {
    transform: translateY(-102%);
  }
  .bcr-scene.is-open .bcr-cover--bag {
    transform: translateY(-102%);
    clip-path: polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%);
  }
  .bcr-scene.is-open .bcr-cover--drawers {
    transform: translateX(-102%);
  }
  [dir='rtl'] .bcr-scene.is-open .bcr-cover--drawers {
    transform: translateX(102%);
  }
  .bcr-scene.is-open .bcr-cover--carousel {
    transform: scale(1.15);
    opacity: 0;
  }
  .bcr-scene.is-open .bcr-cover__half--start {
    transform: translateX(-102%);
  }
  .bcr-scene.is-open .bcr-cover__half--end {
    transform: translateX(102%);
  }
  [dir='rtl'] .bcr-scene.is-open .bcr-cover__half--start {
    transform: translateX(102%);
  }
  [dir='rtl'] .bcr-scene.is-open .bcr-cover__half--end {
    transform: translateX(-102%);
  }
  .bcr-scene.is-open .bcr-cover--petals {
    opacity: 0;
    transform: scale(1.3);
  }

  /* —— Stage / content cards —— */
  .bcr-stage {
    position: relative;
    z-index: 1;
    padding: 1.1rem;
  }

  .bcr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 0.85rem;
  }

  .bcr-stage--carousel .bcr-grid {
    display: flex;
    gap: 0.85rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.5rem;
  }
  .bcr-stage--carousel .bcr-item {
    flex: 0 0 min(72%, 240px);
    scroll-snap-align: center;
  }

  .bcr-item {
    opacity: 0;
    transform: translateY(16px) scale(0.96);
  }

  .bcr-scene.is-open .bcr-item {
    animation: bcr-pop 0.5s ease forwards;
    animation-delay: var(--reveal-delay, 0ms);
  }

  .bcr-stage--drawers.is-open .bcr-item,
  .bcr-scene.is-open .bcr-stage--drawers .bcr-item {
    animation-name: bcr-drawer;
  }

  @keyframes bcr-pop {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes bcr-drawer {
    from {
      opacity: 0;
      transform: translateX(-24px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* —— Content card —— */
  .bcr-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 18px) - 6px);
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(43, 33, 28, 0.06);
    color: inherit;
    text-decoration: none;
    transition:
      transform 0.22s ease,
      box-shadow 0.22s ease,
      border-color 0.22s ease;
  }

  a.bcr-card--link {
    cursor: pointer;
  }

  a.bcr-card--link:hover,
  a.bcr-card--link:focus-visible {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
    box-shadow: 0 14px 28px rgba(120, 44, 82, 0.14);
    outline: none;
  }

  a.bcr-card--link:hover .bcr-card__link,
  a.bcr-card--link:focus-visible .bcr-card__link {
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
  }

  .bcr-card__media {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, #f2ece8);
  }

  .bcr-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .bcr-card__tag {
    position: absolute;
    inset-block-start: 0.6rem;
    inset-inline-start: 0.6rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1.4;
    color: #fff;
    background: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .bcr-card__tag--standalone {
    position: static;
    align-self: flex-start;
    margin: 0.9rem 0.9rem 0;
  }

  .bcr-card__body {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 0.9rem;
    flex: 1;
  }

  .bcr-card__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-color, #000000);
    line-height: 1.35;
  }

  .bcr-card__subtitle {
    margin: 0;
    font-size: 0.85rem;
    color: var(--muted-color, #666666);
    line-height: 1.5;
  }

  .bcr-card__link {
    margin-top: auto;
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--accent-color, var(--fs-store-primary));
    color: var(--accent-color, var(--fs-store-primary));
    background: transparent;
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bcr-card__link:hover,
  .bcr-card__link:focus-visible {
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
  }

  .bcr-count {
    margin: 0.85rem 0 0;
    text-align: center;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
    letter-spacing: 0.01em;
  }

  .bcr-count::before {
    content: '✦';
    margin-inline-end: 0.35rem;
    color: var(--accent-color, var(--fs-store-primary));
    opacity: 0.75;
  }

  /* CTA below the scene — never over the cards */
  .bcr-cta {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    animation: bcr-pop 0.5s ease both;
  }

  .bcr-cta .fs-btn {
    min-width: min(260px, 100%);
    justify-content: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .bcr-cover,
    .bcr-cover__half {
      transition: none;
    }
    .bcr-item {
      opacity: 1;
      transform: none;
      animation: none !important;
    }
  }
`, REVEAL_MODES = [
  "bag",
  "box",
  "drawers",
  "petals",
  "curtain",
  "carousel"
];
function resolveMode(config) {
  const val = getRadioValue(config.bcr_mode, "box");
  return REVEAL_MODES.includes(val) ? val : "box";
}
__name(resolveMode, "resolveMode");
function revealStagger(config) {
  const speed = getUnitValue(config.bcr_speed, 140);
  return Math.max(0, Math.min(600, speed));
}
__name(revealStagger, "revealStagger");
function cardCountLabel(count) {
  return count === 1 ? t("بطاقة واحدة", "1 card") : t(`${count} بطاقات`, `${count} cards`);
}
__name(cardCountLabel, "cardCountLabel");
function parseItems(raw) {
  return normalizeCollection(raw).map((row) => ({
    title: localizedString(row.title),
    subtitle: localizedString(row.subtitle),
    image: extractImageUrl(row.image),
    tag: localizedString(row.tag),
    link: extractLink(row.link)
  })).filter((item) => item.title || item.image);
}
__name(parseItems, "parseItems");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _BeautyCollectionReveal = class _BeautyCollectionReveal extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.revealed = !1, this.boundLangHandler = () => this.requestUpdate(), this.observer = null;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    var _a;
    window.removeEventListener("language-changed", this.boundLangHandler), (_a = this.observer) == null || _a.disconnect(), this.observer = null, super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.revealed = !1), this.maybeObserveAutoStart();
  }
  maybeObserveAutoStart() {
    var _a;
    if (!(!isTruthy((_a = this.config) == null ? void 0 : _a.bcr_auto_start, !1) || this.revealed || this.observer)) {
      if (typeof IntersectionObserver > "u") {
        this.reveal();
        return;
      }
      this.observer = new IntersectionObserver(
        (entries) => {
          var _a2;
          entries.some((e) => e.isIntersecting) && (this.reveal(), (_a2 = this.observer) == null || _a2.disconnect(), this.observer = null);
        },
        { threshold: 0.35 }
      ), this.observer.observe(this);
    }
  }
  reveal() {
    this.revealed = !0;
  }
  renderCover(mode) {
    const c = this.config || {}, coverImg = localizedString(c.bcr_cover_image), coverTitle = localizedString(c.bcr_cover_title) || localizedString(c.bcr_title), btnText = localizedString(c.bcr_reveal_btn) || t("اكشفي المجموعة", "Reveal collection"), inner = html`
      ${coverImg ? html`<img class="bcr-cover__img" src=${coverImg} alt="" loading="lazy" decoding="async" />` : nothing}
      <div class="bcr-cover__scrim" aria-hidden="true"></div>
      <div class="bcr-cover__inner">
        ${coverTitle ? html`<h3 class="bcr-cover__title">${coverTitle}</h3>` : nothing}
        <p class="bcr-cover__hint">${t("اضغطي للكشف عن البطاقات", "Tap to reveal the cards")}</p>
        <button type="button" class="fs-btn bcr-cover__btn" @click=${this.reveal}>${btnText}</button>
      </div>
    `;
    return mode === "curtain" || mode === "petals" ? html`
        <div class="bcr-cover bcr-cover--${mode}" aria-hidden=${this.revealed ? "true" : "false"}>
          ${inner}
        </div>
        <div class="bcr-cover__half bcr-cover__half--start" aria-hidden="true"></div>
        <div class="bcr-cover__half bcr-cover__half--end" aria-hidden="true"></div>
      ` : html`
      <div class="bcr-cover bcr-cover--${mode}" aria-hidden=${this.revealed ? "true" : "false"}>
        ${inner}
      </div>
    `;
  }
  renderCard(item) {
    const href = item.link || "", external = href ? isExternalUrl(href) : !1, media = item.image ? html`<div class="bcr-card__media">
          <img
            class="bcr-card__img"
            src=${item.image}
            alt=${item.title || ""}
            loading="lazy"
            decoding="async"
          />
          ${item.tag ? html`<span class="bcr-card__tag">${item.tag}</span>` : nothing}
        </div>` : item.tag ? html`<span class="bcr-card__tag bcr-card__tag--standalone">${item.tag}</span>` : nothing, body = html`
      <div class="bcr-card__body">
        ${item.title ? html`<h3 class="bcr-card__title">${item.title}</h3>` : nothing}
        ${item.subtitle ? html`<p class="bcr-card__subtitle">${item.subtitle}</p>` : nothing}
        ${href ? html`<span class="bcr-card__link" aria-hidden="true">
              ${t("اكتشفي المزيد", "Discover more")}
            </span>` : nothing}
      </div>
    `;
    return href ? html`
      <a
        class="bcr-card bcr-card--link"
        href=${href}
        target=${external ? "_blank" : nothing}
        rel=${external ? "noopener noreferrer" : nothing}
        aria-label=${item.title || t("انتقل إلى المجموعة", "Go to collection")}
      >
        ${media}${body}
      </a>
    ` : html`<article class="bcr-card bcr-card--static" aria-label=${item.title || t("بطاقة المجموعة", "Collection card")}>
        ${media}${body}
      </article>`;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bcr_"), animate = theme.animate && !prefersReducedMotion(), mode = resolveMode(c), stagger = revealStagger(c), title = localizedString(c.bcr_title), desc = localizedString(c.bcr_desc), items = parseItems(c.bcr_items);
    return items.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("الكشف الإبداعي عن المجموعة", "Creative collection reveal")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div
            class=${classMap({
      "bcr-scene": !0,
      "is-open": this.revealed || !animate
    })}
          >
            ${this.renderCover(mode)}
            <div class=${classMap({ "bcr-stage": !0, [`bcr-stage--${mode}`]: !0 })}>
              <div class="bcr-grid" role="list" aria-hidden=${this.revealed || !animate ? "false" : "true"}>
                ${items.map(
      (item, i) => html`
                    <div
                      class="bcr-item"
                      role="listitem"
                      style=${styleMap({ "--reveal-delay": `${i * stagger}ms` })}
                    >
                      ${this.renderCard(item)}
                    </div>
                  `
    )}
              </div>
            </div>
          </div>

          ${this.revealed ? html`<p class="bcr-count" role="status">${cardCountLabel(items.length)}</p>` : nothing}
          ${this.revealed || !animate ? html`<div class="bcr-cta">${renderCommerceCtaButton(c, "bcr_")}</div>` : nothing}
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t("أضيفي بطاقات المجموعة من إعدادات العنصر", "Add collection cards in the element settings")}
      </div>`;
  }
};
__name(_BeautyCollectionReveal, "BeautyCollectionReveal"), _BeautyCollectionReveal.styles = [sharedSectionCss, componentStyles];
let BeautyCollectionReveal = _BeautyCollectionReveal;
__decorateClass([
  property({ type: Object })
], BeautyCollectionReveal.prototype, "config");
__decorateClass([
  state()
], BeautyCollectionReveal.prototype, "revealed");
typeof BeautyCollectionReveal < "u" && BeautyCollectionReveal.registerSallaComponent("salla-beauty-collection-reveal");
export {
  BeautyCollectionReveal as default
};
