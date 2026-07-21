import { css as v, LitElement as x, html as i, nothing as p } from "lit";
import { property as w } from "lit/decorators.js";
import { classMap as h } from "lit/directives/class-map.js";
import { styleMap as y } from "lit/directives/style-map.js";
import { t as n, n as _, c as k, e as $, l as b, s as L, r as C, p as S, a as j, b as z } from "./sharedStyles-BgfDOkwJ.js";
const q = v`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bcat-wrap {
    display: flex;
    justify-content: center;
    gap: 1.15rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
    padding: 0.35rem 0.25rem 0.85rem;
  }

  .bcat-wrap--grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    justify-items: center;
    gap: 1.35rem 1rem;
    overflow: visible;
    padding-bottom: 0.35rem;
  }

  .bcat-item {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 118px;
    scroll-snap-align: start;
    text-decoration: none;
    color: inherit;
    transition: transform 0.22s ease;
  }

  .bcat-item:hover,
  .bcat-item:focus-visible {
    transform: translateY(-4px);
    outline: none;
  }

  .bcat-disc {
    position: relative;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    overflow: hidden;
    background:
      radial-gradient(
        80% 80% at 30% 20%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, #fff),
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, #fff)
      );
    border: 3px solid color-mix(in srgb, var(--border-color, #f2dde7) 80%, #fff);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
      0 10px 24px rgba(120, 44, 82, 0.1);
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease,
      transform 0.25s ease;
  }

  .bcat-disc::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, #fff 40%, transparent);
    pointer-events: none;
  }

  .bcat-item:hover .bcat-disc,
  .bcat-item:focus-visible .bcat-disc {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      0 0 0 5px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent),
      0 14px 28px rgba(120, 44, 82, 0.14);
  }

  .bcat-disc__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }

  .bcat-item:hover .bcat-disc__img,
  .bcat-item:focus-visible .bcat-disc__img {
    transform: scale(1.06);
  }

  .bcat-disc__placeholder {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    font-size: 1.55rem;
    color: var(--accent-color, var(--fs-store-primary));
    opacity: 0.55;
  }

  .bcat-label {
    margin: 0;
    font-size: 0.86rem;
    font-weight: 800;
    text-align: center;
    color: var(--text-color, #33232e);
    line-height: 1.35;
    max-width: 110px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bcat-item:hover .bcat-label,
  .bcat-item:focus-visible .bcat-label {
    color: var(--accent-color, var(--fs-store-primary));
  }

  @media (max-width: 639px) {
    .bcat-wrap {
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem 0.65rem;
      overflow-x: visible;
      scroll-snap-type: none;
      padding: 0.25rem 0.1rem 0.35rem;
    }

    .bcat-item {
      width: 92px;
      gap: 0.55rem;
    }

    .bcat-disc {
      width: 78px;
      height: 78px;
      border-width: 2.5px;
    }

    .bcat-label {
      font-size: 0.78rem;
      max-width: 92px;
    }

    .bcat-wrap--grid {
      grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
      gap: 1rem 0.65rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bcat-item,
    .bcat-disc,
    .bcat-disc__img {
      transition: none !important;
    }

    .bcat-item:hover,
    .bcat-item:focus-visible {
      transform: none;
    }

    .bcat-item:hover .bcat-disc__img,
    .bcat-item:focus-visible .bcat-disc__img {
      transform: none;
    }
  }
`, l = [
  { title: n("العناية بالبشرة", "Skincare"), image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80", link: "" },
  { title: n("المكياج", "Makeup"), image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80", link: "" },
  { title: n("العطور", "Fragrances"), image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80", link: "" },
  { title: n("العناية بالشعر", "Haircare"), image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80", link: "" }
];
function M(s) {
  const r = _(s).map((e) => ({
    title: b(e.title || e.name, ""),
    image: $(e.image),
    link: k(e.link ?? e.url)
  })).filter((e) => e.title || e.image);
  return r.length ? r.map((e, t) => ({
    ...e,
    image: e.image || l[t % l.length].image,
    title: e.title || l[t % l.length].title
  })) : l.map((e) => ({ ...e }));
}
function E(s) {
  return (typeof s == "string" ? s.trim().toLowerCase() : "") === "grid" ? "grid" : "slider";
}
var H = Object.defineProperty, O = (s, a, r, e) => {
  for (var t = void 0, c = s.length - 1, m; c >= 0; c--)
    (m = s[c]) && (t = m(a, r, t) || t);
  return t && H(a, r, t), t;
};
const f = class f extends x {
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
    const a = this.config || {}, r = C(a, "bcat_"), e = r.animate && !S(), t = b(a.bcat_title), c = b(a.bcat_desc), m = E(a.bcat_layout), g = M(a.bcat_items);
    return g.length ? i`
      <section
        class=${h({ "fs-section": !0, "fs-animate": e })}
        style=${y(j(r))}
        aria-label=${t || n("التصنيفات", "Categories")}
      >
        <div class="fs-container">
          ${t || c ? i`<div class="fs-header">
                ${t ? i`<h2 class="fs-title">${t}</h2>` : p}
                ${c ? i`<p class="fs-desc">${c}</p>` : p}
              </div>` : p}

          <div class=${h({ "bcat-wrap": !0, "bcat-wrap--grid": m === "grid" })} role="list">
            ${g.map(
      (o) => i`
                <a
                  class="bcat-item"
                  role="listitem"
                  href=${o.link || "#"}
                  @click=${(u) => {
        o.link || u.preventDefault();
      }}
                  aria-label=${o.title}
                >
                  <div class="bcat-disc" aria-hidden=${o.image ? "false" : "true"}>
                    ${o.image ? i`<img class="bcat-disc__img" src=${o.image} alt="" loading="lazy" decoding="async" />` : i`<span class="bcat-disc__placeholder" aria-hidden="true">✦</span>`}
                  </div>
                  ${o.title ? i`<p class="bcat-label">${o.title}</p>` : p}
                </a>
              `
    )}
          </div>

          ${z({ config: a, prefix: "bcat_", ready: !0 })}
        </div>
      </section>
    ` : i`<div class="fs-empty" role="status">
        ${n("أضيفي التصنيفات من إعدادات العنصر", "Add categories in the element settings")}
      </div>`;
  }
};
f.styles = [L, q];
let d = f;
O([
  w({ type: Object })
], d.prototype, "config");
typeof d < "u" && d.registerSallaComponent("salla-beauty-categories");
export {
  d as default
};
