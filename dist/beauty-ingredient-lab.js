import { css as S, LitElement as C, nothing as s, html as r } from "lit";
import { property as I, state as _ } from "lit/decorators.js";
import { classMap as L } from "lit/directives/class-map.js";
import { styleMap as f } from "lit/directives/style-map.js";
import { n as E, b as j, g as M, l as d, d as v, e as U, s as B, t as o, r as H, p as O, i as x, a as P } from "./sharedStyles-cRSiglXC.js";
const R = S`
  :host {
    direction: inherit;
  }

  .bil-stage {
    position: relative;
    border-radius: var(--section-radius, 18px);
    padding: 1.3rem;
    overflow: hidden;
    background: linear-gradient(
      160deg,
      color-mix(in srgb, var(--accent-color, #c2527f) 8%, var(--section-bg, #fbf5f8)),
      var(--card-bg, #fff)
    );
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bil-bubbles {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .bil-bubble {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      color-mix(in srgb, var(--accent-color, #c2527f) 40%, #fff),
      transparent 70%
    );
    opacity: 0.5;
    animation: bil-float 9s ease-in-out infinite;
  }

  @keyframes bil-float {
    0%,
    100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-14px) scale(1.05);
    }
  }

  .bil-toolbar {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-bottom: 1rem;
  }

  .bil-filter {
    min-height: 40px;
    padding: 0.45rem 0.95rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: color-mix(in srgb, var(--card-bg, #fff) 70%, transparent);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 600;
    font-size: 0.83rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }

  .bil-filter[aria-pressed='true'] {
    background: var(--accent-color, #c2527f);
    border-color: var(--accent-color, #c2527f);
    color: #fff;
  }

  .bil-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.85rem;
  }

  .bil-card {
    display: grid;
    gap: 0.5rem;
    padding: 0.95rem;
    border-radius: 18px;
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 80%, transparent);
    background: color-mix(in srgb, var(--card-bg, #fff) 78%, transparent);
    -webkit-backdrop-filter: blur(9px);
    backdrop-filter: blur(9px);
    box-shadow: 0 8px 24px rgba(43, 33, 28, 0.07);
    cursor: pointer;
    text-align: start;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  }

  .bil-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 38px rgba(43, 33, 28, 0.13);
  }

  .bil-card[aria-pressed='true'] {
    border-color: var(--accent-color, #c2527f);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-color, #c2527f) 30%, transparent);
  }

  .bil-card__badge {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    object-fit: cover;
    color: #fff;
    font-size: 1.3rem;
    font-weight: 700;
  }

  .bil-card__name {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
  }

  .bil-card__texture {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--accent-color, #c2527f);
  }

  .bil-card__desc {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.5;
    color: var(--muted-color, #8f7a86);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bil-detail {
    position: relative;
    z-index: 1;
    margin-top: 1rem;
    display: grid;
    gap: 0.9rem;
    padding: 1.1rem;
    border-radius: 18px;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bil-detail__head {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .bil-detail__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bil-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bil-chip {
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    font-size: 0.76rem;
    font-weight: 600;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
    color: var(--text-color, #33232e);
  }

  .bil-meta {
    display: grid;
    gap: 0.5rem;
  }

  .bil-meta__row {
    font-size: 0.85rem;
    line-height: 1.55;
    color: var(--text-color, #33232e);
  }

  .bil-meta__row b {
    color: var(--accent-color, #c2527f);
  }

  .bil-note {
    padding: 0.7rem 0.9rem;
    border-radius: 12px;
    border-inline-start: 4px solid #d9a441;
    background: color-mix(in srgb, #d9a441 12%, var(--card-bg, #fff));
    font-size: 0.82rem;
    color: var(--text-color, #33232e);
  }

  .bil-link {
    justify-self: start;
    min-height: 40px;
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1.1rem;
    border-radius: 999px;
    border: 1px solid var(--accent-color, #c2527f);
    background: transparent;
    color: var(--accent-color, #c2527f);
    font: inherit;
    font-weight: 600;
    font-size: 0.85rem;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bil-link:hover {
    background: var(--accent-color, #c2527f);
    color: #fff;
  }

  @media (prefers-reduced-motion: reduce) {
    .bil-bubble {
      animation: none;
    }
    .bil-card,
    .bil-filter {
      transition: none;
    }
    .bil-card:hover {
      transform: none;
    }
  }
`, $ = [
  { value: "serum", ar: "سيروم", en: "Serum" },
  { value: "gel", ar: "جل", en: "Gel" },
  { value: "cream", ar: "كريم", en: "Cream" },
  { value: "oil", ar: "زيت", en: "Oil" },
  { value: "foam", ar: "رغوة", en: "Foam" },
  { value: "balm", ar: "بلسم", en: "Balm" },
  { value: "powder", ar: "بودرة", en: "Powder" },
  { value: "spray", ar: "رذاذ", en: "Spray" }
];
function y() {
  var a, e;
  return ((e = typeof document < "u" ? (a = document.documentElement.lang) == null ? void 0 : a.split(/[-_]/)[0] : "ar") == null ? void 0 : e.toLowerCase()) === "en";
}
function Y(a) {
  const e = $.find((t) => t.value === a);
  return e ? y() ? e.en : e.ar : a;
}
function A(a) {
  const e = new Set(a.map((t) => t.texture).filter(Boolean));
  return $.filter((t) => e.has(t.value)).map((t) => ({
    value: t.value,
    label: y() ? t.en : t.ar
  }));
}
function D(a) {
  return E(a).map((e, t) => ({
    id: `ingredient-${t}`,
    name: d(e.name),
    image: U(e.image),
    color: d(e.color) || "#c2527f",
    desc: d(e.desc),
    benefits: v(e.benefits),
    skin_types: v(e.skin_types),
    usage_time: d(e.usage_time),
    note: d(e.note),
    texture: M(e.texture, "").toLowerCase().trim(),
    link: j(e.link ?? e["bil_ingredients.link"])
  })).filter((e) => e.name || e.desc || e.image);
}
function F(a, e) {
  return e ? a.filter((t) => t.texture === e) : a;
}
var q = Object.defineProperty, u = (a, e, t, n) => {
  for (var l = void 0, c = a.length - 1, p; c >= 0; c--)
    (p = a[c]) && (l = p(e, t, l) || l);
  return l && q(e, t, l), l;
};
const m = class m extends C {
  constructor() {
    super(...arguments), this.config = {}, this.activeTexture = "", this.selectedId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.ensureSelection();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && this.ensureSelection();
  }
  get ingredients() {
    var e;
    return D((e = this.config) == null ? void 0 : e.bil_ingredients);
  }
  get filtered() {
    return F(this.ingredients, this.activeTexture);
  }
  ensureSelection() {
    var t;
    const e = this.filtered;
    e.some((n) => n.id === this.selectedId) || (this.selectedId = ((t = e[0]) == null ? void 0 : t.id) ?? "");
  }
  get selected() {
    return this.filtered.find((e) => e.id === this.selectedId) || null;
  }
  setTexture(e) {
    this.activeTexture = this.activeTexture === e ? "" : e, this.ensureSelection();
  }
  select(e) {
    this.selectedId = e.id;
  }
  renderDetail(e, t) {
    return r`
      <div class="bil-detail" aria-live="polite">
        <div class="bil-detail__head">
          ${e.image ? r`<img class="bil-card__badge" src=${e.image} alt="" loading="lazy" />` : r`<span class="bil-card__badge" style=${f({ background: e.color })} aria-hidden="true">
                ${(e.name || "•").slice(0, 1)}
              </span>`}
          <h3 class="bil-detail__title">${e.name || o("مكوّن", "Ingredient")}</h3>
        </div>
        ${e.desc ? r`<p class="bil-card__desc" style="-webkit-line-clamp:unset">${e.desc}</p>` : s}

        ${e.benefits.length ? r`<div>
              <p class="bil-meta__row"><b>${o("الفوائد", "Benefits")}</b></p>
              <div class="bil-chips">
                ${e.benefits.map((n) => r`<span class="bil-chip">${n}</span>`)}
              </div>
            </div>` : s}

        <div class="bil-meta">
          ${e.skin_types.length ? r`<div class="bil-meta__row">
                <b>${o("أنواع البشرة المناسبة", "Suitable skin types")}:</b>
                <div class="bil-chips" style="margin-top:0.35rem">
                  ${e.skin_types.map((n) => r`<span class="bil-chip">${n}</span>`)}
                </div>
              </div>` : s}
          ${e.usage_time ? r`<p class="bil-meta__row"><b>${o("وقت الاستخدام", "Usage time")}:</b> ${e.usage_time}</p>` : s}
        </div>

        ${e.note ? r`<div class="bil-note">${e.note}</div>` : s}

        ${e.link && t ? r`<a class="bil-link" href=${e.link}>${o("اعرفي المزيد", "Learn more")}</a>` : s}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, t = H(e, "bil_"), n = t.animate && !O(), l = d(e.bil_title), c = d(e.bil_desc), p = this.ingredients, k = this.filtered, g = A(p), h = this.selected, w = x(e.bil_show_link, !0), z = x(e.bil_bubbles, !0) && n;
    return p.length ? r`
      <section
        class=${L({ "fs-section": !0, "fs-animate": n })}
        style=${f(P(t))}
        aria-label=${l || o("مختبر المكونات والقوام", "Ingredient & texture lab")}
      >
        <div class="fs-container">
          ${l || c ? r`<div class="fs-header">
                ${l ? r`<h2 class="fs-title">${l}</h2>` : s}
                ${c ? r`<p class="fs-desc">${c}</p>` : s}
              </div>` : s}

          <div class="bil-stage">
            ${z ? r`<div class="bil-bubbles" aria-hidden="true">
                  <span class="bil-bubble" style="width:70px;height:70px;inset-inline-start:8%;top:12%"></span>
                  <span class="bil-bubble" style="width:44px;height:44px;inset-inline-end:14%;top:24%;animation-delay:1.5s"></span>
                  <span class="bil-bubble" style="width:90px;height:90px;inset-inline-end:6%;bottom:10%;animation-delay:0.8s"></span>
                  <span class="bil-bubble" style="width:36px;height:36px;inset-inline-start:22%;bottom:16%;animation-delay:2.2s"></span>
                </div>` : s}

            ${g.length ? r`<div class="bil-toolbar" role="group" aria-label=${o("فلترة حسب القوام", "Filter by texture")}>
                  <button
                    type="button"
                    class="bil-filter"
                    aria-pressed=${this.activeTexture === "" ? "true" : "false"}
                    @click=${() => this.setTexture("")}
                  >
                    ${o("الكل", "All")}
                  </button>
                  ${g.map(
      (i) => r`<button
                      type="button"
                      class="bil-filter"
                      aria-pressed=${this.activeTexture === i.value ? "true" : "false"}
                      @click=${() => this.setTexture(i.value)}
                    >
                      ${i.label}
                    </button>`
    )}
                </div>` : s}

            <div class="bil-grid" role="list">
              ${k.map((i) => {
      const T = i.id === this.selectedId;
      return r`<button
                  type="button"
                  class="bil-card"
                  role="listitem"
                  aria-pressed=${T ? "true" : "false"}
                  @click=${() => this.select(i)}
                >
                  ${i.image ? r`<img class="bil-card__badge" src=${i.image} alt="" loading="lazy" />` : r`<span class="bil-card__badge" style=${f({ background: i.color })} aria-hidden="true">
                        ${(i.name || "•").slice(0, 1)}
                      </span>`}
                  <h3 class="bil-card__name">${i.name || o("مكوّن", "Ingredient")}</h3>
                  ${i.texture ? r`<span class="bil-card__texture">${Y(i.texture)}</span>` : s}
                  ${i.desc ? r`<p class="bil-card__desc">${i.desc}</p>` : s}
                </button>`;
    })}
            </div>

            ${h ? this.renderDetail(h, w) : s}
          </div>
        </div>
      </section>
    ` : r`<div class="fs-empty" role="status">
        ${o("أضيفي المكونات الفعالة من إعدادات العنصر", "Add active ingredients in the element settings")}
      </div>`;
  }
};
m.styles = [B, R];
let b = m;
u([
  I({ type: Object })
], b.prototype, "config");
u([
  _()
], b.prototype, "activeTexture");
u([
  _()
], b.prototype, "selectedId");
typeof b < "u" && b.registerSallaComponent("salla-beauty-ingredient-lab");
export {
  b as default
};
