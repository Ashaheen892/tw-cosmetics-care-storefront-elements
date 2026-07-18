import { css as S, LitElement as C, nothing as i, html as r } from "lit";
import { property as I, state as _ } from "lit/decorators.js";
import { classMap as L } from "lit/directives/class-map.js";
import { styleMap as f } from "lit/directives/style-map.js";
import { n as E, b as j, g as M, l as d, d as v, e as P, m as U, s as B, t as o, r as H, p as O, i as x, a as R } from "./sharedStyles--LaFqDVC.js";
const A = S`
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
      color-mix(in srgb, var(--accent-color, #c2527f) 28%, #fff),
      transparent 70%
    );
    opacity: 0.28;
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

  .bil-filter-wrap {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.45rem;
    margin-bottom: 1rem;
  }

  .bil-filter__label {
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--muted-color, #8f7a86);
  }

  .bil-segment {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;
    padding: 0.22rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 35%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bil-segment__btn {
    flex: 1 1 auto;
    min-height: 40px;
    min-width: 3.5rem;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: var(--muted-color, #8f7a86);
    font: inherit;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  }

  .bil-segment__btn[aria-pressed='true'] {
    background: var(--card-bg, #fff);
    color: var(--accent-color, #c2527f);
    box-shadow: 0 2px 10px rgba(43, 33, 28, 0.1);
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
    gap: 0.45rem;
    padding: 0.85rem;
    border-radius: 16px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    cursor: pointer;
    text-align: start;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .bil-card:hover {
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 35%, var(--border-color, #f2dde7));
  }

  .bil-card[aria-pressed='true'] {
    border-color: var(--accent-color, #c2527f);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-color, #c2527f) 28%, transparent);
    background: color-mix(in srgb, var(--accent-color, #c2527f) 5%, var(--card-bg, #fff));
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
    padding: 1.25rem;
    border-radius: 18px;
    background: var(--card-bg, #fff);
    border: 2px solid var(--accent-color, #c2527f);
    box-shadow:
      0 12px 32px rgba(43, 33, 28, 0.1),
      inset 0 1px 0 color-mix(in srgb, var(--accent-color, #c2527f) 8%, transparent);
  }

  .bil-detail::before {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    top: 1rem;
    bottom: 1rem;
    width: 4px;
    border-radius: 0 4px 4px 0;
    background: linear-gradient(
      180deg,
      var(--accent-color, #c2527f),
      color-mix(in srgb, var(--accent-color, #c2527f) 45%, #5a2f4d)
    );
  }

  [dir='rtl'] .bil-detail::before {
    inset-inline-start: auto;
    inset-inline-end: 0;
    border-radius: 4px 0 0 4px;
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
    .bil-segment__btn {
      transition: none;
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
  return U() === "en";
}
function D(s) {
  const e = $.find((t) => t.value === s);
  return e ? y() ? e.en : e.ar : s;
}
function F(s) {
  const e = new Set(s.map((t) => t.texture).filter(Boolean));
  return $.filter((t) => e.has(t.value)).map((t) => ({
    value: t.value,
    label: y() ? t.en : t.ar
  }));
}
function Y(s) {
  return E(s).map((e, t) => ({
    id: `ingredient-${t}`,
    name: d(e.name),
    image: P(e.image),
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
function q(s, e) {
  return e ? s.filter((t) => t.texture === e) : s;
}
var G = Object.defineProperty, m = (s, e, t, n) => {
  for (var l = void 0, c = s.length - 1, p; c >= 0; c--)
    (p = s[c]) && (l = p(e, t, l) || l);
  return l && G(e, t, l), l;
};
const u = class u extends C {
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
    return Y((e = this.config) == null ? void 0 : e.bil_ingredients);
  }
  get filtered() {
    return q(this.ingredients, this.activeTexture);
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
        ${e.desc ? r`<p class="bil-card__desc" style="-webkit-line-clamp:unset">${e.desc}</p>` : i}

        ${e.benefits.length ? r`<div>
              <p class="bil-meta__row"><b>${o("الفوائد", "Benefits")}</b></p>
              <div class="bil-chips">
                ${e.benefits.map((n) => r`<span class="bil-chip">${n}</span>`)}
              </div>
            </div>` : i}

        <div class="bil-meta">
          ${e.skin_types.length ? r`<div class="bil-meta__row">
                <b>${o("أنواع البشرة المناسبة", "Suitable skin types")}:</b>
                <div class="bil-chips" style="margin-top:0.35rem">
                  ${e.skin_types.map((n) => r`<span class="bil-chip">${n}</span>`)}
                </div>
              </div>` : i}
          ${e.usage_time ? r`<p class="bil-meta__row"><b>${o("وقت الاستخدام", "Usage time")}:</b> ${e.usage_time}</p>` : i}
        </div>

        ${e.note ? r`<div class="bil-note">${e.note}</div>` : i}

        ${e.link && t ? r`<a class="bil-link" href=${e.link}>${o("اعرفي المزيد", "Learn more")}</a>` : i}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, t = H(e, "bil_"), n = t.animate && !O(), l = d(e.bil_title), c = d(e.bil_desc), p = this.ingredients, k = this.filtered, g = F(p), h = this.selected, w = x(e.bil_show_link, !0), z = x(e.bil_bubbles, !0) && n;
    return p.length ? r`
      <section
        class=${L({ "fs-section": !0, "fs-animate": n })}
        style=${f(R(t))}
        aria-label=${l || o("مختبر المكونات والقوام", "Ingredient & texture lab")}
      >
        <div class="fs-container">
          ${l || c ? r`<div class="fs-header">
                ${l ? r`<h2 class="fs-title">${l}</h2>` : i}
                ${c ? r`<p class="fs-desc">${c}</p>` : i}
              </div>` : i}

          <div class="bil-stage">
            ${z ? r`<div class="bil-bubbles" aria-hidden="true">
                  <span class="bil-bubble" style="width:70px;height:70px;inset-inline-start:8%;top:12%"></span>
                  <span class="bil-bubble" style="width:44px;height:44px;inset-inline-end:14%;top:24%;animation-delay:1.5s"></span>
                  <span class="bil-bubble" style="width:90px;height:90px;inset-inline-end:6%;bottom:10%;animation-delay:0.8s"></span>
                  <span class="bil-bubble" style="width:36px;height:36px;inset-inline-start:22%;bottom:16%;animation-delay:2.2s"></span>
                </div>` : i}

            ${g.length ? r`<div class="bil-filter-wrap">
                  <span class="bil-filter__label">${o("القوام", "Texture")}</span>
                  <div class="bil-segment" role="group" aria-label=${o("فلترة حسب القوام", "Filter by texture")}>
                    <button
                      type="button"
                      class="bil-segment__btn"
                      aria-pressed=${this.activeTexture === "" ? "true" : "false"}
                      @click=${() => this.setTexture("")}
                    >
                      ${o("الكل", "All")}
                    </button>
                    ${g.map(
      (a) => r`<button
                        type="button"
                        class="bil-segment__btn"
                        aria-pressed=${this.activeTexture === a.value ? "true" : "false"}
                        @click=${() => this.setTexture(a.value)}
                      >
                        ${a.label}
                      </button>`
    )}
                  </div>
                </div>` : i}

            <div class="bil-grid" role="list">
              ${k.map((a) => {
      const T = a.id === this.selectedId;
      return r`<button
                  type="button"
                  class="bil-card"
                  role="listitem"
                  aria-pressed=${T ? "true" : "false"}
                  @click=${() => this.select(a)}
                >
                  ${a.image ? r`<img class="bil-card__badge" src=${a.image} alt="" loading="lazy" />` : r`<span class="bil-card__badge" style=${f({ background: a.color })} aria-hidden="true">
                        ${(a.name || "•").slice(0, 1)}
                      </span>`}
                  <h3 class="bil-card__name">${a.name || o("مكوّن", "Ingredient")}</h3>
                  ${a.texture ? r`<span class="bil-card__texture">${D(a.texture)}</span>` : i}
                </button>`;
    })}
            </div>

            ${h ? this.renderDetail(h, w) : i}
          </div>
        </div>
      </section>
    ` : r`<div class="fs-empty" role="status">
        ${o("أضيفي المكونات الفعالة من إعدادات العنصر", "Add active ingredients in the element settings")}
      </div>`;
  }
};
u.styles = [B, A];
let b = u;
m([
  I({ type: Object })
], b.prototype, "config");
m([
  _()
], b.prototype, "activeTexture");
m([
  _()
], b.prototype, "selectedId");
typeof b < "u" && b.registerSallaComponent("salla-beauty-ingredient-lab");
export {
  b as default
};
