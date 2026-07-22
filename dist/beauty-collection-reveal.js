var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, b as extractLink, l as localizedString, e as extractImageUrl, g as getRadioValue, c as getUnitValue, t, s as sharedSectionCss, r as readSectionTheme, p as prefersReducedMotion, i as isTruthy, d as isExternalUrl, a as themeStyleMap } from "./sharedStyles-CPLtr3dp.js";
import { r as renderCommerceCtaButton } from "./commerceOutcome-D0x70G-K.js";
import { f as fsSwiperCss, d as destroyFsSwiper, m as mountFsSwiper } from "./fsSwiper-BQLtGSuN.js";
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
    transition:
      transform 0.85s cubic-bezier(0.7, 0, 0.3, 1),
      opacity 0.75s ease,
      clip-path 0.85s cubic-bezier(0.7, 0, 0.3, 1),
      filter 0.75s ease;
    will-change: transform, opacity, clip-path;
  }

  .bcr-scene.is-open .bcr-cover {
    pointer-events: none;
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
    z-index: 2;
    display: grid;
    gap: 0.65rem;
    justify-items: center;
    align-content: center;
    width: min(100%, 22rem);
    margin: 0 auto;
    transition: opacity 0.35s ease, transform 0.55s ease;
  }

  .bcr-scene.is-open .bcr-cover__inner {
    opacity: 0;
    transform: scale(0.92);
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
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.32);
  }

  .bcr-cover__btn:hover,
  .bcr-cover__btn:focus-visible {
    filter: brightness(1.06);
  }

  /* Split panels (curtain / petals) */
  .bcr-cover--split {
    background: transparent;
    padding: 0;
    overflow: hidden;
  }

  .bcr-cover__panel {
    position: absolute;
    inset-block: 0;
    width: 50%;
    overflow: hidden;
    background: linear-gradient(160deg, #33232e, #4a382f);
    transition: transform 0.9s cubic-bezier(0.7, 0, 0.3, 1);
    will-change: transform;
  }

  .bcr-cover__panel--start {
    inset-inline-start: 0;
  }

  .bcr-cover__panel--end {
    inset-inline-end: 0;
  }

  .bcr-cover__panel .bcr-cover__img {
    width: 200%;
    max-width: none;
  }

  .bcr-cover__panel--start .bcr-cover__img {
    inset-inline-start: 0;
  }

  .bcr-cover__panel--end .bcr-cover__img {
    inset-inline-end: 0;
    inset-inline-start: auto;
  }

  /* —— Mode: box (lid lifts up) —— */
  .bcr-scene.is-open .bcr-cover--box {
    transform: translateY(-110%);
  }

  /* —— Mode: bag (pouch opens upward with clip) —— */
  .bcr-cover--bag {
    clip-path: polygon(0 0, 100% 0, 100% 82%, 50% 100%, 0 82%);
  }

  .bcr-scene.is-open .bcr-cover--bag {
    transform: translateY(-110%);
    clip-path: polygon(0 0, 100% 0, 100% 0, 50% 0, 0 0);
  }

  /* —— Mode: drawers (slides aside) —— */
  .bcr-scene.is-open .bcr-cover--drawers {
    transform: translateX(-110%);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--drawers {
    transform: translateX(110%);
  }

  /* —— Mode: carousel (fade / zoom out) —— */
  .bcr-scene.is-open .bcr-cover--carousel {
    transform: scale(1.12);
    opacity: 0;
    filter: blur(4px);
  }

  /* —— Mode: curtain (panels part left/right) —— */
  .bcr-scene.is-open .bcr-cover--curtain .bcr-cover__panel--start {
    transform: translateX(-105%);
  }

  .bcr-scene.is-open .bcr-cover--curtain .bcr-cover__panel--end {
    transform: translateX(105%);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--curtain .bcr-cover__panel--start {
    transform: translateX(105%);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--curtain .bcr-cover__panel--end {
    transform: translateX(-105%);
  }

  /* —— Mode: petals (panels swing open) —— */
  .bcr-cover--petals .bcr-cover__panel--start {
    transform-origin: left center;
  }

  .bcr-cover--petals .bcr-cover__panel--end {
    transform-origin: right center;
  }

  .bcr-scene[dir='rtl'] .bcr-cover--petals .bcr-cover__panel--start {
    transform-origin: right center;
  }

  .bcr-scene[dir='rtl'] .bcr-cover--petals .bcr-cover__panel--end {
    transform-origin: left center;
  }

  .bcr-scene.is-open .bcr-cover--petals .bcr-cover__panel--start {
    transform: rotate(-78deg) scale(1.05);
  }

  .bcr-scene.is-open .bcr-cover--petals .bcr-cover__panel--end {
    transform: rotate(78deg) scale(1.05);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--petals .bcr-cover__panel--start {
    transform: rotate(78deg) scale(1.05);
  }

  .bcr-scene[dir='rtl'].is-open .bcr-cover--petals .bcr-cover__panel--end {
    transform: rotate(-78deg) scale(1.05);
  }

  .bcr-scene.is-open .bcr-cover--petals,
  .bcr-scene.is-open .bcr-cover--curtain {
    background: transparent;
  }

  /* —— Stage / Swiper cards —— */
  .bcr-stage {
    position: relative;
    z-index: 1;
    padding: 1rem 2.35rem 0.85rem;
  }

  .bcr-scene:not(.is-open) .bcr-stage {
    visibility: hidden;
    height: 0;
    padding: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .bcr-scene.is-open {
    min-height: 0;
    max-height: none;
    aspect-ratio: auto;
    overflow: hidden;
  }

  .bcr-swiper {
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  .bcr-slide {
    width: min(220px, 78vw);
    height: auto;
    box-sizing: border-box;
    opacity: 0;
    transform: translateY(14px) scale(0.96);
  }

  .bcr-scene.is-open .bcr-slide {
    animation: bcr-pop 0.5s ease forwards;
    animation-delay: var(--reveal-delay, 0ms);
  }

  .bcr-scene.is-open .bcr-stage--drawers .bcr-slide {
    animation-name: bcr-drawer;
  }

  .bcr-scene.is-open .bcr-stage--bag .bcr-slide {
    animation-name: bcr-rise;
  }

  .bcr-scene.is-open .bcr-stage--petals .bcr-slide {
    animation-name: bcr-bloom;
  }

  .bcr-scene.is-open .bcr-stage--curtain .bcr-slide {
    animation-name: bcr-fade-in;
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
      transform: translateX(-28px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes bcr-rise {
    from {
      opacity: 0;
      transform: translateY(28px) scale(0.94);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes bcr-bloom {
    from {
      opacity: 0;
      transform: scale(0.7) rotate(-6deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes bcr-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .bcr-nav {
    position: absolute;
    top: 42%;
    z-index: 4;
    transform: translateY(-50%);
    width: 2.1rem;
    height: 2.1rem;
    min-width: 0;
    min-height: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 999px;
    background: color-mix(in srgb, var(--card-bg, #fff) 94%, transparent);
    color: var(--text-color, #33232e);
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(120, 44, 82, 0.08);
  }

  .bcr-nav--prev {
    inset-inline-start: 0;
  }

  .bcr-nav--next {
    inset-inline-end: 0;
  }

  .bcr-nav.swiper-button-disabled {
    opacity: 0.35;
    pointer-events: none;
  }

  .bcr-nav__chev {
    display: block;
    width: 0.42rem;
    height: 0.42rem;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
  }

  .bcr-nav--prev .bcr-nav__chev {
    transform: rotate(135deg);
  }

  .bcr-nav--next .bcr-nav__chev {
    transform: rotate(-45deg);
  }

  .bcr-swiper[dir='rtl'] .bcr-nav--prev .bcr-nav__chev {
    transform: rotate(-45deg);
  }

  .bcr-swiper[dir='rtl'] .bcr-nav--next .bcr-nav__chev {
    transform: rotate(135deg);
  }

  .bcr-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.28rem;
    margin-top: 0.85rem;
  }

  .bcr-dot {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    min-width: 0;
    min-height: 0;
    padding: 0;
    margin: 0 !important;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 26%, transparent);
    cursor: pointer;
    opacity: 1;
    transition: width 0.2s ease, background 0.2s ease;
  }

  .bcr-dot.is-active {
    width: 0.85rem;
    background: var(--accent-color, var(--fs-store-primary));
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
    -webkit-user-drag: none;
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
    padding: 0.85rem;
    flex: 1;
  }

  .bcr-card__title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-color, #000000);
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bcr-card__subtitle {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bcr-card__link {
    margin-top: auto;
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    border: 1px solid var(--accent-color, var(--fs-store-primary));
    color: var(--accent-color, var(--fs-store-primary));
    background: transparent;
    font-size: 0.78rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bcr-count {
    margin: 0.85rem 0 0;
    text-align: center;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
  }

  .bcr-count::before {
    content: '✦';
    margin-inline-end: 0.35rem;
    color: var(--accent-color, var(--fs-store-primary));
    opacity: 0.75;
  }

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

  @media (max-width: 639px) {
    .bcr-stage {
      padding: 0.85rem 1.85rem 0.7rem;
    }

    .bcr-slide {
      width: min(188px, 72vw);
    }

    .bcr-nav {
      width: 1.75rem;
      height: 1.75rem;
      top: 40%;
    }

    .bcr-dots {
      margin-top: 0.7rem;
      gap: 0.22rem;
    }

    .bcr-dot {
      width: 0.26rem;
      height: 0.26rem;
    }

    .bcr-dot.is-active {
      width: 0.68rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bcr-cover,
    .bcr-cover__panel,
    .bcr-cover__inner {
      transition: none;
    }

    .bcr-slide {
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
  const raw = config == null ? void 0 : config.bcr_mode;
  let val = getRadioValue(raw, "box").toLowerCase().trim();
  if (!REVEAL_MODES.includes(val) && raw && typeof raw == "object") {
    const obj = raw, options = Array.isArray(obj.options) ? obj.options : [], selected = Array.isArray(obj.selected) ? obj.selected[0] : null, sel = selected && typeof selected == "object" ? selected : null, needle = String((sel == null ? void 0 : sel.value) ?? (sel == null ? void 0 : sel.key) ?? val).trim();
    for (const opt of options) {
      if (!opt || typeof opt != "object") continue;
      const row = opt, optVal = String(row.value ?? "").trim(), optKey = String(row.key ?? "").trim();
      if (needle && (needle === optVal || needle === optKey) && optVal) {
        val = optVal.toLowerCase();
        break;
      }
    }
  }
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
    super(...arguments), this.config = {}, this.revealed = !1, this.swiperReady = !1, this.boundLangHandler = () => {
      this.requestUpdate(), queueMicrotask(() => this.remountSwiper());
    }, this.observer = null, this.swiper = null, this.remountTimer = null, this.reveal = () => {
      this.revealed = !0;
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    var _a;
    window.removeEventListener("language-changed", this.boundLangHandler), (_a = this.observer) == null || _a.disconnect(), this.observer = null, this.remountTimer && clearTimeout(this.remountTimer), destroyFsSwiper(this.swiper), this.swiper = null, super.disconnectedCallback();
  }
  updated(changed) {
    var _a;
    if (changed.has("config") && (this.revealed = !1, (_a = this.observer) == null || _a.disconnect(), this.observer = null, destroyFsSwiper(this.swiper), this.swiper = null, this.swiperReady = !1), this.maybeObserveAutoStart(), changed.has("revealed") && this.revealed) {
      this.scheduleRemount();
      return;
    }
    changed.has("config") && (readSectionTheme(this.config || {}, "bcr_").animate && !prefersReducedMotion() || this.scheduleRemount());
  }
  firstUpdated() {
    const animate = readSectionTheme(this.config || {}, "bcr_").animate && !prefersReducedMotion();
    (this.revealed || !animate) && this.scheduleRemount();
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
  scheduleRemount() {
    this.remountTimer && clearTimeout(this.remountTimer), this.remountTimer = setTimeout(() => this.remountSwiper(), 80);
  }
  remountSwiper() {
    var _a;
    destroyFsSwiper(this.swiper), this.swiper = null;
    const animate = readSectionTheme(this.config || {}, "bcr_").animate && !prefersReducedMotion();
    if (!this.revealed && animate) {
      this.swiperReady = !1;
      return;
    }
    const root = this.renderRoot.querySelector(".bcr-swiper");
    if (!root) return;
    const items = parseItems((_a = this.config) == null ? void 0 : _a.bcr_items);
    if (items.length < 1) return;
    const rtl = getComputedStyle(this).direction !== "ltr", prevEl = root.querySelector(".bcr-nav--prev"), nextEl = root.querySelector(".bcr-nav--next"), pagEl = root.querySelector(".bcr-dots"), multi = items.length > 1;
    this.swiper = mountFsSwiper(root, {
      rtl,
      slidesPerView: "auto",
      spaceBetween: 14,
      centeredSlides: !1,
      watchOverflow: !0,
      navigation: multi ? {
        prevEl: prevEl || void 0,
        nextEl: nextEl || void 0
      } : void 0,
      pagination: multi && pagEl ? {
        el: pagEl,
        clickable: !0,
        bulletClass: "bcr-dot",
        bulletActiveClass: "is-active"
      } : void 0,
      breakpoints: {
        0: { spaceBetween: 10 },
        640: { spaceBetween: 14 }
      }
    }), this.swiperReady || (this.swiperReady = !0), requestAnimationFrame(() => {
      var _a2, _b;
      (_a2 = this.swiper) == null || _a2.update(), (_b = this.swiper) == null || _b.updateSlides();
    });
  }
  renderCoverMedia() {
    var _a;
    const coverImg = localizedString((_a = this.config) == null ? void 0 : _a.bcr_cover_image);
    return html`
      ${coverImg ? html`<img class="bcr-cover__img" src=${coverImg} alt="" loading="lazy" decoding="async" />` : nothing}
      <div class="bcr-cover__scrim" aria-hidden="true"></div>
    `;
  }
  renderCover(mode) {
    const c = this.config || {}, coverTitle = localizedString(c.bcr_cover_title) || localizedString(c.bcr_title), btnText = localizedString(c.bcr_reveal_btn) || t("اكشفي المجموعة", "Reveal collection"), split = mode === "curtain" || mode === "petals", inner = html`
      <div class="bcr-cover__inner">
        ${coverTitle ? html`<h3 class="bcr-cover__title">${coverTitle}</h3>` : nothing}
        <p class="bcr-cover__hint">${t("اضغطي للكشف عن البطاقات", "Tap to reveal the cards")}</p>
        <button type="button" class="fs-btn bcr-cover__btn" @click=${this.reveal}>${btnText}</button>
      </div>
    `;
    return split ? html`
        <div
          class=${classMap({
      "bcr-cover": !0,
      [`bcr-cover--${mode}`]: !0,
      "bcr-cover--split": !0
    })}
          aria-hidden=${this.revealed ? "true" : "false"}
        >
          <div class="bcr-cover__panel bcr-cover__panel--start" aria-hidden="true">
            ${this.renderCoverMedia()}
          </div>
          <div class="bcr-cover__panel bcr-cover__panel--end" aria-hidden="true">
            ${this.renderCoverMedia()}
          </div>
          ${inner}
        </div>
      ` : html`
      <div
        class=${classMap({
      "bcr-cover": !0,
      [`bcr-cover--${mode}`]: !0
    })}
        aria-hidden=${this.revealed ? "true" : "false"}
      >
        ${this.renderCoverMedia()}
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
            draggable="false"
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
        draggable="false"
        @dragstart=${(e) => e.preventDefault()}
      >
        ${media}${body}
      </a>
    ` : html`<article
        class="bcr-card bcr-card--static"
        aria-label=${item.title || t("بطاقة المجموعة", "Collection card")}
      >
        ${media}${body}
      </article>`;
  }
  renderSlider(items, mode, stagger, visible) {
    const multi = items.length > 1;
    return html`
      <div class=${classMap({ "bcr-stage": !0, [`bcr-stage--${mode}`]: !0 })}>
        <div
          class=${classMap({
      swiper: !0,
      "bcr-swiper": !0,
      "is-ready": this.swiperReady
    })}
          role="region"
          aria-roledescription="carousel"
          aria-label=${t("بطاقات المجموعة", "Collection cards")}
          aria-hidden=${visible ? "false" : "true"}
        >
          <div class="swiper-wrapper">
            ${items.map(
      (item, i) => html`
                <div
                  class="swiper-slide bcr-slide"
                  role="group"
                  aria-label=${item.title || `${t("بطاقة", "Card")} ${i + 1}`}
                  style=${styleMap({ "--reveal-delay": `${i * stagger}ms` })}
                >
                  ${this.renderCard(item)}
                </div>
              `
    )}
          </div>

          ${multi ? html`
                <button
                  type="button"
                  class="bcr-nav bcr-nav--prev"
                  aria-label=${t("السابق", "Previous")}
                >
                  <span class="bcr-nav__chev" aria-hidden="true"></span>
                </button>
                <button
                  type="button"
                  class="bcr-nav bcr-nav--next"
                  aria-label=${t("التالي", "Next")}
                >
                  <span class="bcr-nav__chev" aria-hidden="true"></span>
                </button>
                <div class="bcr-dots" aria-label=${t("شرائح البطاقات", "Card slides")}></div>
              ` : nothing}
        </div>
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bcr_"), animate = theme.animate && !prefersReducedMotion(), mode = resolveMode(c), stagger = revealStagger(c), title = localizedString(c.bcr_title), desc = localizedString(c.bcr_desc), items = parseItems(c.bcr_items), dir = getComputedStyle(this).direction === "ltr" ? "ltr" : "rtl";
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
            dir=${dir}
            data-mode=${mode}
          >
            ${this.renderCover(mode)}
            ${this.renderSlider(items, mode, stagger, this.revealed || !animate)}
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
__name(_BeautyCollectionReveal, "BeautyCollectionReveal"), _BeautyCollectionReveal.styles = [sharedSectionCss, fsSwiperCss, componentStyles];
let BeautyCollectionReveal = _BeautyCollectionReveal;
__decorateClass([
  property({ type: Object })
], BeautyCollectionReveal.prototype, "config");
__decorateClass([
  state()
], BeautyCollectionReveal.prototype, "revealed");
__decorateClass([
  state()
], BeautyCollectionReveal.prototype, "swiperReady");
typeof BeautyCollectionReveal < "u" && BeautyCollectionReveal.registerSallaComponent("salla-beauty-collection-reveal");
export {
  BeautyCollectionReveal as default
};
