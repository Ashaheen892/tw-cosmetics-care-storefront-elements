import { css as _, LitElement as y, html as o, nothing as c } from "lit";
import { property as k } from "lit/decorators.js";
import { classMap as $ } from "lit/directives/class-map.js";
import { ref as w } from "lit/directives/ref.js";
import { styleMap as S } from "lit/directives/style-map.js";
import { t as n, n as T, l as d, b as L, e as A, s as C, i as E, p as g, r as z, a as M } from "./sharedStyles-DKbcXBPy.js";
import { e as U } from "./dragScroll-9IoXWKvk.js";
const j = _`
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
`, h = [
  {
    title: n("عروض الصيف", "Summer Sale"),
    subtitle: n("خصم حتى 40%", "Up to 40% off"),
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1400&q=80",
    link: "",
    cta_label: n("تسوقي الآن", "Shop now")
  },
  {
    title: n("وصل حديثًا", "New Arrivals"),
    subtitle: n("اكتشفي أحدث المنتجات", "Discover the latest"),
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1400&q=80",
    link: "",
    cta_label: n("اكتشفي", "Explore")
  }
];
function v(b) {
  const a = T(b).map((e) => ({
    title: d(e.title, ""),
    subtitle: d(
      e.subtitle || e.desc,
      ""
    ),
    image: A(e.image),
    link: L(e.link ?? e.url),
    cta_label: d(
      e.cta_label || e.button,
      ""
    )
  })).filter((e) => e.title || e.image);
  return a.length ? a.map((e, i) => {
    const s = h[i % h.length];
    return {
      ...e,
      image: e.image || s.image,
      title: e.title || s.title,
      subtitle: e.subtitle || s.subtitle,
      cta_label: e.cta_label || s.cta_label
    };
  }) : h.map((e) => ({ ...e }));
}
var q = Object.defineProperty, H = (b, t, a, e) => {
  for (var i = void 0, s = b.length - 1, l; s >= 0; s--)
    (l = b[s]) && (i = l(t, a, i) || i);
  return i && q(t, a, i), i;
};
const D = 5e3, u = class u extends y {
  constructor() {
    super(...arguments), this.config = {}, this.boundLangHandler = () => this.requestUpdate(), this.trackEl = null, this.autoTimer = null, this.paused = !1, this.bindTrack = (t) => {
      t instanceof HTMLElement && (this.trackEl = t, U(t), this.syncAutoplay());
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
  updated(t) {
    t.has("config") && this.syncAutoplay();
  }
  clearAutoplay() {
    this.autoTimer && (clearInterval(this.autoTimer), this.autoTimer = null);
  }
  syncAutoplay() {
    var a, e;
    this.clearAutoplay();
    const t = v((a = this.config) == null ? void 0 : a.bpb_items);
    !E((e = this.config) == null ? void 0 : e.bpb_autoplay, !0) || t.length < 2 || (this.autoTimer = setInterval(() => this.advance(), D));
  }
  /** Advance the scroll-snap track one card, looping back to the start. */
  advance() {
    const t = this.trackEl;
    if (!t || this.paused || !t.isConnected) return;
    const a = t.scrollWidth - t.clientWidth;
    if (a <= 0) return;
    const e = t.querySelector(".bpb-card");
    if (!e) return;
    const i = e.offsetWidth + 16, s = (getComputedStyle(t).direction || "ltr") === "rtl", l = Math.abs(t.scrollLeft), f = l >= a - 8 ? 0 : Math.min(l + i, a), x = g() ? "auto" : "smooth", m = s ? -f : f;
    t.style.scrollSnapType = "none", t.scrollTo({ left: m, behavior: x }), window.setTimeout(() => {
      t.isConnected && (Math.abs(t.scrollLeft - m) > 4 && t.scrollTo({ left: m, behavior: "auto" }), t.style.scrollSnapType = "");
    }, 700);
  }
  render() {
    const t = this.config || {}, a = z(t, "bpb_"), e = a.animate && !g(), i = d(t.bpb_title), s = d(t.bpb_desc), l = v(t.bpb_items);
    return l.length ? o`
      <section
        class=${$({ "fs-section": !0, "fs-animate": e })}
        style=${S(M(a))}
        aria-label=${i || n("العروض", "Promotions")}
      >
        <div class="fs-container">
          ${i || s ? o`<div class="fs-header">
                ${i ? o`<h2 class="fs-title">${i}</h2>` : c}
                ${s ? o`<p class="fs-desc">${s}</p>` : c}
              </div>` : c}

          <div
            class="bpb-track"
            role="list"
            ${w(this.bindTrack)}
            @pointerenter=${this.pause}
            @pointerleave=${this.resume}
            @pointerdown=${this.pause}
            @pointerup=${this.resume}
            @pointercancel=${this.resume}
          >
            ${l.map(
      (r) => o`
                <article class="bpb-card" role="listitem">
                  ${r.image ? o`<img class="bpb-card__img" src=${r.image} alt="" loading="lazy" decoding="async" />` : c}
                  <div class="bpb-card__overlay" aria-hidden="true"></div>
                  <div class="bpb-card__body">
                    ${r.title ? o`<h3 class="bpb-card__title">${r.title}</h3>` : c}
                    ${r.subtitle ? o`<p class="bpb-card__subtitle">${r.subtitle}</p>` : c}
                    ${r.link ? o`<a class="bpb-card__cta" href=${r.link}>
                          ${r.cta_label || n("تسوقي الآن", "Shop now")}
                        </a>` : c}
                  </div>
                </article>
              `
    )}
          </div>
        </div>
      </section>
    ` : o`<div class="fs-empty" role="status">
        ${n("أضيفي البنرات من إعدادات العنصر", "Add banners in the element settings")}
      </div>`;
  }
};
u.styles = [C, j];
let p = u;
H([
  k({ type: Object })
], p.prototype, "config");
typeof p < "u" && p.registerSallaComponent("salla-beauty-promo-banners");
export {
  p as default
};
