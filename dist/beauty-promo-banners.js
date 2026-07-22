var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { t, n as normalizeCollection, l as localizedString, b as extractLink, e as extractImageUrl, s as sharedSectionCss, i as isTruthy, p as prefersReducedMotion, d as isExternalUrl, r as readSectionTheme, a as themeStyleMap } from "./sharedStyles-Bu7Tok5Z.js";
import { f as fsSwiperCss, d as destroyFsSwiper, m as mountFsSwiper, A as Autoplay } from "./fsSwiper-BQLtGSuN.js";
const componentStyles = css`
  :host {
    direction: inherit;
  }

  .bpb-carousel {
    position: relative;
  }

  .bpb-swiper {
    position: relative;
    border-radius: var(--section-radius, 22px);
    overflow: hidden;
    border: 1px solid var(--border-color, #f2dde7);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--card-bg, #fff));
    box-shadow: 0 14px 36px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, transparent);
  }

  .bpb-slide {
    height: auto;
  }

  .bpb-card {
    position: relative;
    min-height: clamp(240px, 42vw, 420px);
    aspect-ratio: 21 / 9;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, #2a1822);
    -webkit-user-drag: none;
  }

  .bpb-card__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }

  .bpb-card__fallback {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        120% 80% at 80% 10%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, transparent),
        transparent 55%
      ),
      linear-gradient(
        145deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, #3a2230),
        #1f1218 70%
      );
  }

  .bpb-card__shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        100deg,
        rgba(24, 12, 18, 0.72) 0%,
        rgba(24, 12, 18, 0.35) 42%,
        rgba(24, 12, 18, 0.12) 100%
      ),
      linear-gradient(180deg, transparent 35%, rgba(24, 12, 18, 0.78) 100%);
    pointer-events: none;
  }

  .bpb-card__body {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.55rem;
    width: min(100%, 34rem);
    padding: clamp(1.25rem, 3.5vw, 2.35rem);
    box-sizing: border-box;
  }

  .bpb-card__count {
    display: inline-flex;
    align-items: center;
    min-height: 1.55rem;
    padding: 0.15rem 0.65rem;
    border-radius: 999px;
    background: color-mix(in srgb, #fff 16%, transparent);
    border: 1px solid color-mix(in srgb, #fff 28%, transparent);
    color: rgba(255, 255, 255, 0.88);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  .bpb-card__title {
    margin: 0;
    font-size: clamp(1.35rem, 3.2vw, 2.35rem);
    font-weight: 800;
    line-height: 1.2;
    color: #fff;
    text-shadow: 0 2px 18px rgba(0, 0, 0, 0.25);
  }

  .bpb-card__subtitle {
    margin: 0;
    max-width: 28rem;
    font-size: clamp(0.88rem, 1.5vw, 1.05rem);
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.86);
  }

  .bpb-card__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    margin-top: 0.35rem;
    min-height: 44px;
    padding: 0.6rem 1.2rem;
    border-radius: 999px;
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    color: var(--button-color, #fff);
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.2;
    box-shadow: 0 8px 20px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, transparent);
  }

  .bpb-card__cta-arrow {
    width: 0.5rem;
    height: 0.5rem;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(-45deg);
    flex: 0 0 auto;
  }

  .bpb-card[dir='rtl'] .bpb-card__cta-arrow {
    transform: rotate(135deg);
  }

  .bpb-nav {
    position: absolute;
    top: 50%;
    z-index: 3;
    transform: translateY(-50%);
    width: 2.4rem;
    height: 2.4rem;
    min-width: 0;
    min-height: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid color-mix(in srgb, #fff 35%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, #1a1014 45%, transparent);
    color: #fff;
    cursor: pointer;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .bpb-nav--prev {
    inset-inline-start: 0.85rem;
  }

  .bpb-nav--next {
    inset-inline-end: 0.85rem;
  }

  .bpb-nav.swiper-button-disabled {
    opacity: 0.35;
    pointer-events: none;
  }

  .bpb-nav__chev {
    display: block;
    width: 0.45rem;
    height: 0.45rem;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
  }

  .bpb-nav--prev .bpb-nav__chev {
    transform: rotate(135deg);
  }

  .bpb-nav--next .bpb-nav__chev {
    transform: rotate(-45deg);
  }

  .bpb-swiper[dir='rtl'] .bpb-nav--prev .bpb-nav__chev {
    transform: rotate(-45deg);
  }

  .bpb-swiper[dir='rtl'] .bpb-nav--next .bpb-nav__chev {
    transform: rotate(135deg);
  }

  .bpb-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.75rem;
  }

  .bpb-dot {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    min-width: 0;
    min-height: 0;
    padding: 0;
    margin: 0 !important;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
    cursor: pointer;
    opacity: 1;
    transition: width 0.2s ease, background 0.2s ease;
  }

  .bpb-dot.is-active {
    width: 1rem;
    background: var(--accent-color, var(--fs-store-primary));
  }

  .fs-animate .bpb-swiper {
    animation: bpb-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes bpb-rise {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 639px) {
    .bpb-swiper {
      border-radius: 14px;
      box-shadow: 0 8px 20px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent);
    }

    .bpb-card {
      min-height: 168px;
      max-height: 200px;
      aspect-ratio: 2 / 1;
    }

    .bpb-card__shade {
      background:
        linear-gradient(
          180deg,
          rgba(24, 12, 18, 0.05) 0%,
          rgba(24, 12, 18, 0.35) 48%,
          rgba(24, 12, 18, 0.78) 100%
        );
    }

    .bpb-card__body {
      width: 100%;
      gap: 0.2rem;
      padding: 0.7rem 0.85rem 0.75rem;
    }

    .bpb-card__count {
      display: none;
    }

    .bpb-card__title {
      font-size: 0.98rem;
      line-height: 1.25;
      max-width: 14ch;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .bpb-card__subtitle {
      font-size: 0.72rem;
      line-height: 1.35;
      max-width: 22ch;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .bpb-card__cta {
      min-height: 32px !important;
      padding: 0.3rem 0.75rem !important;
      font-size: 0.72rem !important;
      gap: 0.3rem;
      margin-top: 0.15rem;
    }

    .bpb-card__cta-arrow {
      width: 0.36rem;
      height: 0.36rem;
      border-right-width: 1.5px;
      border-bottom-width: 1.5px;
    }

    .bpb-nav {
      display: none;
    }

    .bpb-dots {
      margin-top: 0.65rem;
      gap: 0.28rem;
    }

    .bpb-dot {
      width: 0.3rem;
      height: 0.3rem;
    }

    .bpb-dot.is-active {
      width: 0.75rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bpb-nav,
    .bpb-dot,
    .bpb-card__cta {
      transition: none;
    }

    .fs-animate .bpb-swiper {
      animation: none;
    }
  }
`, DEFAULTS = [
  {
    title: t("عروض الصيف", "Summer Sale"),
    subtitle: t("خصم حتى 40%", "Up to 40% off"),
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1400&q=80",
    link: "",
    cta_label: t("تسوقي الآن", "Shop now")
  },
  {
    title: t("وصل حديثًا", "New Arrivals"),
    subtitle: t("اكتشفي أحدث المنتجات", "Discover the latest"),
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1400&q=80",
    link: "",
    cta_label: t("اكتشفي", "Explore")
  }
];
function parseBanners(raw) {
  const parsed = normalizeCollection(raw).map((row) => ({
    title: localizedString(row.title, ""),
    subtitle: localizedString(
      row.subtitle || row.desc,
      ""
    ),
    image: extractImageUrl(row.image),
    link: extractLink(row.link ?? row.url),
    cta_label: localizedString(
      row.cta_label || row.button,
      ""
    )
  })).filter((b) => b.title || b.image);
  return parsed.length ? parsed.map((b, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...b,
      image: b.image || d.image,
      title: b.title || d.title,
      subtitle: b.subtitle || d.subtitle,
      cta_label: b.cta_label || d.cta_label
    };
  }) : DEFAULTS.map((d) => ({ ...d }));
}
__name(parseBanners, "parseBanners");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const AUTOPLAY_MS = 5500, _BeautyPromoBanners = class _BeautyPromoBanners extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.swiperReady = !1, this.boundLangHandler = () => {
      this.requestUpdate(), queueMicrotask(() => this.remountSwiper());
    }, this.swiper = null, this.remountTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.remountTimer && clearTimeout(this.remountTimer), destroyFsSwiper(this.swiper), this.swiper = null, super.disconnectedCallback();
  }
  firstUpdated() {
    this.remountSwiper();
  }
  updated(changed) {
    changed.has("config") && this.scheduleRemount();
  }
  scheduleRemount() {
    this.remountTimer && clearTimeout(this.remountTimer), this.remountTimer = setTimeout(() => this.remountSwiper(), 0);
  }
  remountSwiper() {
    var _a, _b;
    destroyFsSwiper(this.swiper), this.swiper = null, this.swiperReady = !1;
    const banners = parseBanners((_a = this.config) == null ? void 0 : _a.bpb_items), root = this.renderRoot.querySelector(".bpb-swiper");
    if (!root || banners.length < 1) return;
    const multi = banners.length > 1, autoplayOn = multi && isTruthy((_b = this.config) == null ? void 0 : _b.bpb_autoplay, !0) && !prefersReducedMotion(), prevEl = root.querySelector(".bpb-nav--prev"), nextEl = root.querySelector(".bpb-nav--next"), pagEl = this.renderRoot.querySelector(".bpb-dots"), rtl = getComputedStyle(this).direction !== "ltr";
    this.swiper = mountFsSwiper(root, {
      rtl,
      modules: autoplayOn ? [Autoplay] : [],
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 480,
      loop: multi,
      watchOverflow: !0,
      navigation: multi ? {
        prevEl: prevEl || void 0,
        nextEl: nextEl || void 0
      } : void 0,
      pagination: multi && pagEl ? {
        el: pagEl,
        clickable: !0,
        bulletClass: "bpb-dot",
        bulletActiveClass: "is-active"
      } : void 0,
      autoplay: autoplayOn ? {
        delay: AUTOPLAY_MS,
        disableOnInteraction: !1,
        pauseOnMouseEnter: !0
      } : !1
    }), this.swiperReady = !0;
  }
  renderCard(banner, index, total) {
    const external = banner.link ? isExternalUrl(banner.link) : !1, dir = getComputedStyle(this).direction === "ltr" ? "ltr" : "rtl", body = html`
      ${banner.image ? html`<img
            class="bpb-card__img"
            src=${banner.image}
            alt=""
            loading=${index === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable="false"
          />` : html`<div class="bpb-card__fallback" aria-hidden="true"></div>`}
      <div class="bpb-card__shade" aria-hidden="true"></div>
      <div class="bpb-card__body">
        ${total > 1 ? html`<span class="bpb-card__count">${index + 1} / ${total}</span>` : nothing}
        ${banner.title ? html`<h3 class="bpb-card__title">${banner.title}</h3>` : nothing}
        ${banner.subtitle ? html`<p class="bpb-card__subtitle">${banner.subtitle}</p>` : nothing}
        ${banner.link ? html`<span class="bpb-card__cta">
              <span class="bpb-card__cta-label"
                >${banner.cta_label || t("تسوقي الآن", "Shop now")}</span
              >
              <span class="bpb-card__cta-arrow" aria-hidden="true"></span>
            </span>` : nothing}
      </div>
    `;
    return banner.link ? html`
        <a
          class="bpb-card bpb-card--link"
          dir=${dir}
          href=${banner.link}
          target=${external ? "_blank" : nothing}
          rel=${external ? "noopener noreferrer" : nothing}
          aria-label=${banner.title || t("عرض", "Promotion")}
          draggable="false"
          @dragstart=${(e) => e.preventDefault()}
        >
          ${body}
        </a>
      ` : html`
      <article
        class="bpb-card"
        dir=${dir}
        aria-label=${banner.title || t("عرض", "Promotion")}
      >
        ${body}
      </article>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bpb_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.bpb_title), desc = localizedString(c.bpb_desc), banners = parseBanners(c.bpb_items), multi = banners.length > 1;
    return banners.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("عروض الجمال", "Beauty promotions")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="bpb-carousel">
            <div
              class=${classMap({
      swiper: !0,
      "bpb-swiper": !0,
      "is-ready": this.swiperReady
    })}
              role="region"
              aria-roledescription="carousel"
              aria-label=${title || t("عروض الجمال", "Beauty promotions")}
            >
              <div class="swiper-wrapper">
                ${banners.map(
      (banner, i) => html`
                    <div class="swiper-slide bpb-slide">
                      ${this.renderCard(banner, i, banners.length)}
                    </div>
                  `
    )}
              </div>

              ${multi ? html`
                    <button
                      type="button"
                      class="bpb-nav bpb-nav--prev"
                      aria-label=${t("السابق", "Previous")}
                    >
                      <span class="bpb-nav__chev" aria-hidden="true"></span>
                    </button>
                    <button
                      type="button"
                      class="bpb-nav bpb-nav--next"
                      aria-label=${t("التالي", "Next")}
                    >
                      <span class="bpb-nav__chev" aria-hidden="true"></span>
                    </button>
                  ` : nothing}
            </div>

            ${multi ? html`<div
                  class="bpb-dots"
                  aria-label=${t("شرائح العرض", "Promo slides")}
                ></div>` : nothing}
          </div>
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t("أضيفي البنرات من إعدادات العنصر", "Add banners in the element settings")}
      </div>`;
  }
};
__name(_BeautyPromoBanners, "BeautyPromoBanners"), _BeautyPromoBanners.styles = [sharedSectionCss, fsSwiperCss, componentStyles];
let BeautyPromoBanners = _BeautyPromoBanners;
__decorateClass([
  property({ type: Object })
], BeautyPromoBanners.prototype, "config");
__decorateClass([
  state()
], BeautyPromoBanners.prototype, "swiperReady");
typeof BeautyPromoBanners < "u" && BeautyPromoBanners.registerSallaComponent("salla-beauty-promo-banners");
export {
  BeautyPromoBanners as default
};
