import { css as f, LitElement as h, html as i, nothing as n } from "lit";
import { property as u } from "lit/decorators.js";
import { classMap as _ } from "lit/directives/class-map.js";
import { styleMap as x } from "lit/directives/style-map.js";
import { t as o, n as v, l as d, c as y, e as w, s as $, r as k, p as S, a as z, b as C } from "./sharedStyles-BgfDOkwJ.js";
const L = f`
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
    background: linear-gradient(135deg, #fdeef5, #f9e4ed);
    border: 1px solid var(--border-color, #f2dde7);
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
    color: var(--text-color, #33232e);
  }

  .bpb-card__subtitle {
    margin: 0;
    font-size: 0.85rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.5;
  }

  .bpb-card__cta {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 0.35rem;
    margin-top: 0.4rem;
    padding: 0.5rem 1.1rem;
    border-radius: 999px;
    background: var(--accent-color, #c2527f);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(194, 82, 127, 0.22);
    transition: filter 0.2s ease;
  }

  .bpb-card__cta:hover {
    filter: brightness(1.08);
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
`, m = [
  {
    title: o("عروض الصيف", "Summer Sale"),
    subtitle: o("خصم حتى 40%", "Up to 40% off"),
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1400&q=80",
    link: "",
    cta_label: o("تسوقي الآن", "Shop now")
  },
  {
    title: o("وصل حديثًا", "New Arrivals"),
    subtitle: o("اكتشفي أحدث المنتجات", "Discover the latest"),
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1400&q=80",
    link: "",
    cta_label: o("اكتشفي", "Explore")
  }
];
function E(b) {
  const l = v(b).map((e) => ({
    title: d(e.title, ""),
    subtitle: d(
      e.subtitle || e.desc,
      ""
    ),
    image: w(e.image),
    link: y(e.link ?? e.url),
    cta_label: d(
      e.cta_label || e.button,
      ""
    )
  })).filter((e) => e.title || e.image);
  return l.length ? l.map((e, t) => {
    const a = m[t % m.length];
    return {
      ...e,
      image: e.image || a.image,
      title: e.title || a.title,
      subtitle: e.subtitle || a.subtitle,
      cta_label: e.cta_label || a.cta_label
    };
  }) : m.map((e) => ({ ...e }));
}
var M = Object.defineProperty, U = (b, r, l, e) => {
  for (var t = void 0, a = b.length - 1, c; a >= 0; a--)
    (c = b[a]) && (t = c(r, l, t) || t);
  return t && M(r, l, t), t;
};
const g = class g extends h {
  constructor() {
    super(...arguments), this.config = {}, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  render() {
    const r = this.config || {}, l = k(r, "bpb_"), e = l.animate && !S(), t = d(r.bpb_title), a = d(r.bpb_desc), c = E(r.bpb_items);
    return c.length ? i`
      <section
        class=${_({ "fs-section": !0, "fs-animate": e })}
        style=${x(z(l))}
        aria-label=${t || o("العروض", "Promotions")}
      >
        <div class="fs-container">
          ${t || a ? i`<div class="fs-header">
                ${t ? i`<h2 class="fs-title">${t}</h2>` : n}
                ${a ? i`<p class="fs-desc">${a}</p>` : n}
              </div>` : n}

          <div class="bpb-track" role="list">
            ${c.map(
      (s) => i`
                <article class="bpb-card" role="listitem">
                  ${s.image ? i`<img class="bpb-card__img" src=${s.image} alt="" loading="lazy" decoding="async" />` : n}
                  <div class="bpb-card__overlay" aria-hidden="true"></div>
                  <div class="bpb-card__body">
                    ${s.title ? i`<h3 class="bpb-card__title">${s.title}</h3>` : n}
                    ${s.subtitle ? i`<p class="bpb-card__subtitle">${s.subtitle}</p>` : n}
                    ${s.link ? i`<a class="bpb-card__cta" href=${s.link}>
                          ${s.cta_label || o("تسوقي الآن", "Shop now")}
                        </a>` : n}
                  </div>
                </article>
              `
    )}
          </div>

          ${C({ config: r, prefix: "bpb_", ready: !0 })}
        </div>
      </section>
    ` : i`<div class="fs-empty" role="status">
        ${o("أضيفي البنرات من إعدادات العنصر", "Add banners in the element settings")}
      </div>`;
  }
};
g.styles = [$, L];
let p = g;
U([
  u({ type: Object })
], p.prototype, "config");
typeof p < "u" && p.registerSallaComponent("salla-beauty-promo-banners");
export {
  p as default
};
