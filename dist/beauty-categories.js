import { css as v, LitElement as x, html as i, nothing as p } from "lit";
import { property as w } from "lit/decorators.js";
import { classMap as h } from "lit/directives/class-map.js";
import { ref as y } from "lit/directives/ref.js";
import { styleMap as _ } from "lit/directives/style-map.js";
import { t as n, n as k, b as $, e as L, l as b, s as S, r as C, p as j, a as z } from "./sharedStyles-DKbcXBPy.js";
import { e as M } from "./dragScroll-9IoXWKvk.js";
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
    border: 3px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, #fff);
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
    color: var(--text-color, #000000);
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
function E(o) {
  const r = k(o).map((t) => ({
    title: b(t.title || t.name, ""),
    image: L(t.image),
    link: $(t.link ?? t.url)
  })).filter((t) => t.title || t.image);
  return r.length ? r.map((t, a) => ({
    ...t,
    image: t.image || l[a % l.length].image,
    title: t.title || l[a % l.length].title
  })) : l.map((t) => ({ ...t }));
}
function H(o) {
  return (typeof o == "string" ? o.trim().toLowerCase() : "") === "grid" ? "grid" : "slider";
}
var T = Object.defineProperty, D = (o, e, r, t) => {
  for (var a = void 0, c = o.length - 1, m; c >= 0; c--)
    (m = o[c]) && (a = m(e, r, a) || a);
  return a && T(e, r, a), a;
};
const f = class f extends x {
  constructor() {
    super(...arguments), this.config = {}, this.boundLangHandler = () => this.requestUpdate(), this.bindTrack = (e) => {
      e instanceof HTMLElement && !e.classList.contains("bcat-wrap--grid") && M(e);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  render() {
    const e = this.config || {}, r = C(e, "bcat_"), t = r.animate && !j(), a = b(e.bcat_title), c = b(e.bcat_desc), m = H(e.bcat_layout), g = E(e.bcat_items);
    return g.length ? i`
      <section
        class=${h({ "fs-section": !0, "fs-animate": t })}
        style=${_(z(r))}
        aria-label=${a || n("التصنيفات", "Categories")}
      >
        <div class="fs-container">
          ${a || c ? i`<div class="fs-header">
                ${a ? i`<h2 class="fs-title">${a}</h2>` : p}
                ${c ? i`<p class="fs-desc">${c}</p>` : p}
              </div>` : p}

          <div
            class=${h({ "bcat-wrap": !0, "bcat-wrap--grid": m === "grid" })}
            role="list"
            ${y(this.bindTrack)}
          >
            ${g.map(
      (s) => i`
                <a
                  class="bcat-item"
                  role="listitem"
                  href=${s.link || "#"}
                  @click=${(u) => {
        s.link || u.preventDefault();
      }}
                  aria-label=${s.title}
                >
                  <div class="bcat-disc" aria-hidden=${s.image ? "false" : "true"}>
                    ${s.image ? i`<img class="bcat-disc__img" src=${s.image} alt="" loading="lazy" decoding="async" />` : i`<span class="bcat-disc__placeholder" aria-hidden="true">✦</span>`}
                  </div>
                  ${s.title ? i`<p class="bcat-label">${s.title}</p>` : p}
                </a>
              `
    )}
          </div>
        </div>
      </section>
    ` : i`<div class="fs-empty" role="status">
        ${n("أضيفي التصنيفات من إعدادات العنصر", "Add categories in the element settings")}
      </div>`;
  }
};
f.styles = [S, q];
let d = f;
D([
  w({ type: Object })
], d.prototype, "config");
typeof d < "u" && d.registerSallaComponent("salla-beauty-categories");
export {
  d as default
};
