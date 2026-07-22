import { css as x, LitElement as y, nothing as i, html as r } from "lit";
import { property as $, state as w } from "lit/decorators.js";
import { classMap as f } from "lit/directives/class-map.js";
import { styleMap as g } from "lit/directives/style-map.js";
import { g as k, c as C, n as z, b as S, l as d, e as j, t as l, s as L, i as M, d as X, r as E, p as O, a as I } from "./sharedStyles-DKbcXBPy.js";
import { r as T } from "./commerceOutcome-Dk8p2VWM.js";
const A = x`
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
`, Y = [
  "bag",
  "box",
  "drawers",
  "petals",
  "curtain",
  "carousel"
];
function U(c) {
  const e = k(c.bcr_mode, "box");
  return Y.includes(e) ? e : "box";
}
function H(c) {
  const e = C(c.bcr_speed, 140);
  return Math.max(0, Math.min(600, e));
}
function R(c) {
  return c === 1 ? l("بطاقة واحدة", "1 card") : l(`${c} بطاقات`, `${c} cards`);
}
function V(c) {
  return z(c).map((e) => ({
    title: d(e.title),
    subtitle: d(e.subtitle),
    image: j(e.image),
    tag: d(e.tag),
    link: S(e.link)
  })).filter((e) => e.title || e.image);
}
var D = Object.defineProperty, h = (c, e, t, s) => {
  for (var a = void 0, n = c.length - 1, o; n >= 0; n--)
    (o = c[n]) && (a = o(e, t, a) || a);
  return a && D(e, t, a), a;
};
const m = class m extends y {
  constructor() {
    super(...arguments), this.config = {}, this.revealed = !1, this.boundLangHandler = () => this.requestUpdate(), this.observer = null;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    var e;
    window.removeEventListener("language-changed", this.boundLangHandler), (e = this.observer) == null || e.disconnect(), this.observer = null, super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.revealed = !1), this.maybeObserveAutoStart();
  }
  maybeObserveAutoStart() {
    var t;
    if (!(!M((t = this.config) == null ? void 0 : t.bcr_auto_start, !1) || this.revealed || this.observer)) {
      if (typeof IntersectionObserver > "u") {
        this.reveal();
        return;
      }
      this.observer = new IntersectionObserver(
        (s) => {
          var a;
          s.some((n) => n.isIntersecting) && (this.reveal(), (a = this.observer) == null || a.disconnect(), this.observer = null);
        },
        { threshold: 0.35 }
      ), this.observer.observe(this);
    }
  }
  reveal() {
    this.revealed = !0;
  }
  renderCover(e) {
    const t = this.config || {}, s = d(t.bcr_cover_image), a = d(t.bcr_cover_title) || d(t.bcr_title), n = d(t.bcr_reveal_btn) || l("اكشفي المجموعة", "Reveal collection"), o = r`
      ${s ? r`<img class="bcr-cover__img" src=${s} alt="" loading="lazy" decoding="async" />` : i}
      <div class="bcr-cover__scrim" aria-hidden="true"></div>
      <div class="bcr-cover__inner">
        ${a ? r`<h3 class="bcr-cover__title">${a}</h3>` : i}
        <p class="bcr-cover__hint">${l("اضغطي للكشف عن البطاقات", "Tap to reveal the cards")}</p>
        <button type="button" class="fs-btn bcr-cover__btn" @click=${this.reveal}>${n}</button>
      </div>
    `;
    return e === "curtain" || e === "petals" ? r`
        <div class="bcr-cover bcr-cover--${e}" aria-hidden=${this.revealed ? "true" : "false"}>
          ${o}
        </div>
        <div class="bcr-cover__half bcr-cover__half--start" aria-hidden="true"></div>
        <div class="bcr-cover__half bcr-cover__half--end" aria-hidden="true"></div>
      ` : r`
      <div class="bcr-cover bcr-cover--${e}" aria-hidden=${this.revealed ? "true" : "false"}>
        ${o}
      </div>
    `;
  }
  renderCard(e) {
    const t = e.link || "", s = t ? X(t) : !1, a = e.image ? r`<div class="bcr-card__media">
          <img
            class="bcr-card__img"
            src=${e.image}
            alt=${e.title || ""}
            loading="lazy"
            decoding="async"
          />
          ${e.tag ? r`<span class="bcr-card__tag">${e.tag}</span>` : i}
        </div>` : e.tag ? r`<span class="bcr-card__tag bcr-card__tag--standalone">${e.tag}</span>` : i, n = r`
      <div class="bcr-card__body">
        ${e.title ? r`<h3 class="bcr-card__title">${e.title}</h3>` : i}
        ${e.subtitle ? r`<p class="bcr-card__subtitle">${e.subtitle}</p>` : i}
        ${t ? r`<span class="bcr-card__link" aria-hidden="true">
              ${l("اكتشفي المزيد", "Discover more")}
            </span>` : i}
      </div>
    `;
    return t ? r`
      <a
        class="bcr-card bcr-card--link"
        href=${t}
        target=${s ? "_blank" : i}
        rel=${s ? "noopener noreferrer" : i}
        aria-label=${e.title || l("انتقل إلى المجموعة", "Go to collection")}
      >
        ${a}${n}
      </a>
    ` : r`<article class="bcr-card bcr-card--static" aria-label=${e.title || l("بطاقة المجموعة", "Collection card")}>
        ${a}${n}
      </article>`;
  }
  render() {
    const e = this.config || {}, t = E(e, "bcr_"), s = t.animate && !O(), a = U(e), n = H(e), o = d(e.bcr_title), p = d(e.bcr_desc), v = V(e.bcr_items);
    return v.length ? r`
      <section
        class=${f({ "fs-section": !0, "fs-animate": s })}
        style=${g(I(t))}
        aria-label=${o || l("الكشف الإبداعي عن المجموعة", "Creative collection reveal")}
      >
        <div class="fs-container">
          ${o || p ? r`<div class="fs-header">
                ${o ? r`<h2 class="fs-title">${o}</h2>` : i}
                ${p ? r`<p class="fs-desc">${p}</p>` : i}
              </div>` : i}

          <div
            class=${f({
      "bcr-scene": !0,
      "is-open": this.revealed || !s
    })}
          >
            ${this.renderCover(a)}
            <div class=${f({ "bcr-stage": !0, [`bcr-stage--${a}`]: !0 })}>
              <div class="bcr-grid" role="list" aria-hidden=${this.revealed || !s ? "false" : "true"}>
                ${v.map(
      (u, _) => r`
                    <div
                      class="bcr-item"
                      role="listitem"
                      style=${g({ "--reveal-delay": `${_ * n}ms` })}
                    >
                      ${this.renderCard(u)}
                    </div>
                  `
    )}
              </div>
            </div>
          </div>

          ${this.revealed ? r`<p class="bcr-count" role="status">${R(v.length)}</p>` : i}
          ${this.revealed || !s ? r`<div class="bcr-cta">${T(e, "bcr_")}</div>` : i}
        </div>
      </section>
    ` : r`<div class="fs-empty" role="status">
        ${l("أضيفي بطاقات المجموعة من إعدادات العنصر", "Add collection cards in the element settings")}
      </div>`;
  }
};
m.styles = [L, A];
let b = m;
h([
  $({ type: Object })
], b.prototype, "config");
h([
  w()
], b.prototype, "revealed");
typeof b < "u" && b.registerSallaComponent("salla-beauty-collection-reveal");
export {
  b as default
};
