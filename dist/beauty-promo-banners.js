var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ref } from "lit/directives/ref.js";
import { styleMap } from "lit/directives/style-map.js";
import { t, n as normalizeCollection, l as localizedString, b as extractLink, e as extractImageUrl, s as sharedSectionCss, i as isTruthy, p as prefersReducedMotion, r as readSectionTheme, a as themeStyleMap } from "./sharedStyles-2kfPtH3m.js";
import { e as enableDragScroll } from "./dragScroll-CWPXfZ9c.js";
const componentStyles = css`
  :host {
    direction: inherit;
  }

  .bpb-track {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
    padding-bottom: 0.6rem;
  }

  .bpb-card {
    flex: 0 0 min(85%, 420px);
    scroll-snap-align: center;
    position: relative;
    border-radius: var(--section-radius, 24px);
    overflow: hidden;
    min-height: 220px;
    display: flex;
    align-items: flex-end;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 8px 24px rgba(194, 82, 127, 0.08);
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .bpb-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(194, 82, 127, 0.14);
  }

  .bpb-card__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .bpb-card__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(251, 245, 248, 0) 20%,
      rgba(251, 245, 248, 0.65) 55%,
      rgba(251, 245, 248, 0.92) 100%
    );
    pointer-events: none;
  }

  .bpb-card__body {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    padding: 1.25rem 1.4rem;
    width: 100%;
    box-sizing: border-box;
  }

  .bpb-card__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
    line-height: 1.3;
    color: var(--text-color, #000000);
  }

  .bpb-card__subtitle {
    margin: 0;
    font-size: 0.85rem;
    color: var(--muted-color, #666666);
    line-height: 1.5;
  }

  .bpb-card__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    gap: 0.4rem;
    margin-top: 0.4rem;
    min-height: 44px;
    padding: 0.65rem 1.25rem;
    border: 1.5px solid transparent;
    border-radius: 999px;
    background: var(--button-bg, var(--fs-store-primary));
    color: var(--button-color, #fff);
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.2;
    text-decoration: none;
    box-shadow: 0 6px 16px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
    transition: filter 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .bpb-card__cta:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
  }

  @media (max-width: 639px) {
    .bpb-track {
      flex-direction: column;
      overflow-x: visible;
      scroll-snap-type: none;
      gap: 0.85rem;
      padding-bottom: 0;
    }

    .bpb-card {
      flex: 1 1 auto;
      width: 100%;
      min-height: 180px;
      border-radius: 20px;
    }

    .bpb-card__body {
      padding: 1rem 1.1rem;
    }

    .bpb-card__title {
      font-size: 1rem;
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
const AUTOPLAY_MS = 5e3, _BeautyPromoBanners = class _BeautyPromoBanners extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.boundLangHandler = () => this.requestUpdate(), this.trackEl = null, this.autoTimer = null, this.paused = !1, this.bindTrack = (el) => {
      el instanceof HTMLElement && (this.trackEl = el, enableDragScroll(el), this.syncAutoplay());
    }, this.pause = () => {
      this.paused = !0;
    }, this.resume = () => {
      this.paused = !1;
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.clearAutoplay(), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.syncAutoplay();
  }
  clearAutoplay() {
    this.autoTimer && (clearInterval(this.autoTimer), this.autoTimer = null);
  }
  syncAutoplay() {
    var _a, _b;
    this.clearAutoplay();
    const banners = parseBanners((_a = this.config) == null ? void 0 : _a.bpb_items);
    !isTruthy((_b = this.config) == null ? void 0 : _b.bpb_autoplay, !0) || banners.length < 2 || (this.autoTimer = setInterval(() => this.advance(), AUTOPLAY_MS));
  }
  /** Advance the scroll-snap track one card, looping back to the start. */
  advance() {
    const track = this.trackEl;
    if (!track || this.paused || !track.isConnected) return;
    const maxStart = track.scrollWidth - track.clientWidth;
    if (maxStart <= 0) return;
    const card = track.querySelector(".bpb-card");
    if (!card) return;
    const step = card.offsetWidth + 16, rtl = (getComputedStyle(track).direction || "ltr") === "rtl", position = Math.abs(track.scrollLeft), nextPosition = position >= maxStart - 8 ? 0 : Math.min(position + step, maxStart), behavior = prefersReducedMotion() ? "auto" : "smooth", target = rtl ? -nextPosition : nextPosition;
    track.style.scrollSnapType = "none", track.scrollTo({ left: target, behavior }), window.setTimeout(() => {
      track.isConnected && (Math.abs(track.scrollLeft - target) > 4 && track.scrollTo({ left: target, behavior: "auto" }), track.style.scrollSnapType = "");
    }, 700);
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bpb_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.bpb_title), desc = localizedString(c.bpb_desc), banners = parseBanners(c.bpb_items);
    return banners.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("العروض", "Promotions")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div
            class="bpb-track"
            role="list"
            ${ref(this.bindTrack)}
            @pointerenter=${this.pause}
            @pointerleave=${this.resume}
            @pointerdown=${this.pause}
            @pointerup=${this.resume}
            @pointercancel=${this.resume}
          >
            ${banners.map(
      (banner) => html`
                <article class="bpb-card" role="listitem">
                  ${banner.image ? html`<img class="bpb-card__img" src=${banner.image} alt="" loading="lazy" decoding="async" />` : nothing}
                  <div class="bpb-card__overlay" aria-hidden="true"></div>
                  <div class="bpb-card__body">
                    ${banner.title ? html`<h3 class="bpb-card__title">${banner.title}</h3>` : nothing}
                    ${banner.subtitle ? html`<p class="bpb-card__subtitle">${banner.subtitle}</p>` : nothing}
                    ${banner.link ? html`<a class="bpb-card__cta" href=${banner.link}>
                          ${banner.cta_label || t("تسوقي الآن", "Shop now")}
                        </a>` : nothing}
                  </div>
                </article>
              `
    )}
          </div>
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t("أضيفي البنرات من إعدادات العنصر", "Add banners in the element settings")}
      </div>`;
  }
};
__name(_BeautyPromoBanners, "BeautyPromoBanners"), _BeautyPromoBanners.styles = [sharedSectionCss, componentStyles];
let BeautyPromoBanners = _BeautyPromoBanners;
__decorateClass([
  property({ type: Object })
], BeautyPromoBanners.prototype, "config");
typeof BeautyPromoBanners < "u" && BeautyPromoBanners.registerSallaComponent("salla-beauty-promo-banners");
export {
  BeautyPromoBanners as default
};
