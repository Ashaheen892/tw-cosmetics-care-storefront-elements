import { css as $, LitElement as k, nothing as c, html as r } from "lit";
import { property as w, state as z } from "lit/decorators.js";
import { classMap as v } from "lit/directives/class-map.js";
import { styleMap as m } from "lit/directives/style-map.js";
import { g as C, c as S, n as L, b as M, l as n, e as X, s as O, i as h, t as b, r as j, p as E, a as I } from "./sharedStyles-cRSiglXC.js";
const A = $`
  :host {
    direction: inherit;
  }

  .bcr-scene {
    position: relative;
    border-radius: var(--section-radius, 18px);
    overflow: hidden;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 6%, var(--section-bg, #fbf5f8));
    border: 1px solid var(--border-color, #f2dde7);
    min-height: 260px;
  }

  /* —— Cover —— */
  .bcr-cover {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: grid;
    place-items: center;
    text-align: center;
    padding: 1.5rem;
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
    opacity: 0.55;
  }

  .bcr-cover__inner {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.9rem;
    justify-items: center;
  }

  .bcr-cover__title {
    margin: 0;
    font-size: clamp(1.3rem, 3vw, 2rem);
    font-weight: 800;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
  }

  .bcr-cover__btn {
    background: #fff;
    color: #33232e;
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
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 18px) - 6px);
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(43, 33, 28, 0.06);
  }

  .bcr-card__media {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 8%, #f2ece8);
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
    background: var(--accent-color, #c2527f);
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
    color: var(--text-color, #33232e);
    line-height: 1.35;
  }

  .bcr-card__subtitle {
    margin: 0;
    font-size: 0.85rem;
    color: var(--muted-color, #8f7a86);
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
    border: 1px solid var(--accent-color, #c2527f);
    color: var(--accent-color, #c2527f);
    background: transparent;
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bcr-card__link:hover,
  .bcr-card__link:focus-visible {
    background: var(--accent-color, #c2527f);
    color: #fff;
  }

  .bcr-actions {
    margin-top: 1rem;
    display: flex;
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
`, R = [
  "bag",
  "box",
  "drawers",
  "petals",
  "curtain",
  "carousel"
];
function T(l) {
  const e = C(l.bcr_mode, "box");
  return R.includes(e) ? e : "box";
}
function Y(l) {
  const e = S(l.bcr_speed, 140);
  return Math.max(0, Math.min(600, e));
}
function H(l) {
  return L(l).map((e) => ({
    title: n(e.title),
    subtitle: n(e.subtitle),
    image: X(e.image),
    tag: n(e.tag),
    link: M(e.link)
  })).filter((e) => e.title || e.image);
}
var U = Object.defineProperty, u = (l, e, t, s) => {
  for (var a = void 0, o = l.length - 1, i; o >= 0; o--)
    (i = l[o]) && (a = i(e, t, a) || a);
  return a && U(e, t, a), a;
};
const p = class p extends k {
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
    if (!(!h((t = this.config) == null ? void 0 : t.bcr_auto_start, !1) || this.revealed || this.observer)) {
      if (typeof IntersectionObserver > "u") {
        this.reveal();
        return;
      }
      this.observer = new IntersectionObserver(
        (s) => {
          var a;
          s.some((o) => o.isIntersecting) && (this.reveal(), (a = this.observer) == null || a.disconnect(), this.observer = null);
        },
        { threshold: 0.35 }
      ), this.observer.observe(this);
    }
  }
  reveal() {
    this.revealed = !0;
  }
  renderCover(e) {
    const t = this.config || {}, s = n(t.bcr_cover_image), a = n(t.bcr_cover_title) || n(t.bcr_title), o = n(t.bcr_reveal_btn) || b("اكشفي المجموعة", "Reveal collection"), i = r`
      ${s ? r`<img class="bcr-cover__img" src=${s} alt="" loading="lazy" decoding="async" />` : c}
      <div class="bcr-cover__inner">
        ${a ? r`<h3 class="bcr-cover__title">${a}</h3>` : c}
        <button type="button" class="fs-btn bcr-cover__btn" @click=${this.reveal}>${o}</button>
      </div>
    `;
    return e === "curtain" || e === "petals" ? r`
        <div class="bcr-cover bcr-cover--${e}" aria-hidden=${this.revealed ? "true" : "false"}>
          ${i}
        </div>
        <div class="bcr-cover__half bcr-cover__half--start" aria-hidden="true"></div>
        <div class="bcr-cover__half bcr-cover__half--end" aria-hidden="true"></div>
      ` : r`
      <div class="bcr-cover bcr-cover--${e}" aria-hidden=${this.revealed ? "true" : "false"}>
        ${i}
      </div>
    `;
  }
  renderCard(e, t) {
    const s = !!e.link && t;
    return r`
      <article class="bcr-card">
        ${e.image ? r`<div class="bcr-card__media">
              <img
                class="bcr-card__img"
                src=${e.image}
                alt=${e.title || ""}
                loading="lazy"
                decoding="async"
              />
              ${e.tag ? r`<span class="bcr-card__tag">${e.tag}</span>` : c}
            </div>` : e.tag ? r`<span class="bcr-card__tag bcr-card__tag--standalone">${e.tag}</span>` : c}
        <div class="bcr-card__body">
          ${e.title ? r`<h3 class="bcr-card__title">${e.title}</h3>` : c}
          ${e.subtitle ? r`<p class="bcr-card__subtitle">${e.subtitle}</p>` : c}
          ${s ? r`<a class="bcr-card__link" href=${e.link}>
                ${b("اكتشفي المزيد", "Discover more")}
              </a>` : c}
        </div>
      </article>
    `;
  }
  render() {
    const e = this.config || {}, t = j(e, "bcr_"), s = t.animate && !E(), a = T(e), o = Y(e), i = n(e.bcr_title), f = n(e.bcr_desc), _ = h(e.bcr_show_link, !0), g = H(e.bcr_items);
    return g.length ? r`
      <section
        class=${v({ "fs-section": !0, "fs-animate": s })}
        style=${m(I(t))}
        aria-label=${i || b("الكشف الإبداعي عن المجموعة", "Creative collection reveal")}
      >
        <div class="fs-container">
          ${i || f ? r`<div class="fs-header">
                ${i ? r`<h2 class="fs-title">${i}</h2>` : c}
                ${f ? r`<p class="fs-desc">${f}</p>` : c}
              </div>` : c}

          <div
            class=${v({
      "bcr-scene": !0,
      "is-open": this.revealed || !s
    })}
          >
            ${this.renderCover(a)}
            <div class=${v({ "bcr-stage": !0, [`bcr-stage--${a}`]: !0 })}>
              <div class="bcr-grid" role="list" aria-hidden=${this.revealed || !s ? "false" : "true"}>
                ${g.map(
      (x, y) => r`
                    <div
                      class="bcr-item"
                      role="listitem"
                      style=${m({ "--reveal-delay": `${y * o}ms` })}
                    >
                      ${this.renderCard(x, _)}
                    </div>
                  `
    )}
              </div>
            </div>
          </div>

          ${this.revealed ? c : r`<div class="bcr-actions">
                <button type="button" class="fs-btn" @click=${this.reveal}>
                  ${n(e.bcr_reveal_btn) || b("اكشفي المجموعة", "Reveal collection")}
                </button>
              </div>`}
        </div>
      </section>
    ` : r`<div class="fs-empty" role="status">
        ${b("أضيفي بطاقات المجموعة من إعدادات العنصر", "Add collection cards in the element settings")}
      </div>`;
  }
};
p.styles = [O, A];
let d = p;
u([
  w({ type: Object })
], d.prototype, "config");
u([
  z()
], d.prototype, "revealed");
typeof d < "u" && d.registerSallaComponent("salla-beauty-collection-reveal");
export {
  d as default
};
