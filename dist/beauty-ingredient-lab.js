import { css as I, LitElement as L, html as t, nothing as a } from "lit";
import { property as B, state as $ } from "lit/decorators.js";
import { classMap as E } from "lit/directives/class-map.js";
import { styleMap as v } from "lit/directives/style-map.js";
import { n as j, b as M, g as P, l as d, f as x, e as R, o as U, s as q, p as _, t as i, r as A, i as y, a as D } from "./sharedStyles-DKbcXBPy.js";
import { r as F } from "./commerceOutcome-Dk8p2VWM.js";
const H = I`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bil-stage {
    position: relative;
    border-radius: var(--section-radius, 20px);
    padding: 1.35rem;
    overflow: hidden;
    background: linear-gradient(
      160deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--section-bg, transparent)),
      var(--card-bg, #fff)
    );
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow: 0 12px 30px rgba(120, 44, 82, 0.05);
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
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, #fff),
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

  /* —— Texture filter —— */
  .bil-filter-wrap {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.45rem;
    margin-bottom: 1.1rem;
  }

  .bil-filter__label {
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
  }

  .bil-segment {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;
    padding: 0.22rem;
    width: fit-content;
    max-width: 100%;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 35%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #e5e7eb);
  }

  .bil-segment__btn {
    flex: 0 1 auto;
    min-height: 40px;
    min-width: 3.5rem;
    padding: 0.45rem 0.95rem;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: var(--muted-color, #666666);
    font: inherit;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  }

  .bil-segment__btn[aria-pressed='true'] {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, transparent);
  }

  /* —— Body: list + detail side by side on desktop —— */
  .bil-body {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 1rem;
    align-items: start;
  }

  @media (min-width: 860px) {
    .bil-body {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      gap: 1.25rem;
    }

    .bil-detail {
      position: sticky;
      top: 1rem;
    }
  }

  .bil-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.55rem;
    align-content: start;
  }

  @media (max-width: 859px) {
    .bil-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 0.65rem;
    }
  }

  .bil-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.7rem 0.85rem;
    border-radius: 16px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    cursor: pointer;
    text-align: start;
    font: inherit;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease,
      transform 0.15s ease;
  }

  .bil-card:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #e5e7eb));
    transform: translateY(-1px);
  }

  .bil-card[aria-pressed='true'] {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 20%, transparent);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--card-bg, #fff));
  }

  .bil-card__badge {
    flex: 0 0 auto;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    object-fit: cover;
    color: #fff;
    font-size: 1.15rem;
    font-weight: 700;
    background: var(--accent-color, var(--fs-store-primary));
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.35);
  }

  .bil-card__text {
    flex: 1 1 auto;
    min-width: 0;
    display: grid;
    gap: 0.15rem;
  }

  .bil-card__name {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    line-height: 1.3;
  }

  .bil-card__texture {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bil-card__check {
    flex: 0 0 auto;
    width: 1.5rem;
    height: 1.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 0.72rem;
    font-weight: 800;
    color: transparent;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 50%, transparent);
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bil-card[aria-pressed='true'] .bil-card__check {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
  }

  @media (max-width: 859px) {
    .bil-card {
      position: relative;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 0.8rem;
    }

    .bil-card__check {
      position: absolute;
      inset-inline-end: 0.6rem;
      top: 0.6rem;
    }
  }

  .bil-empty {
    padding: 1.4rem 1rem;
    text-align: center;
    border-radius: 14px;
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, var(--border-color, #e5e7eb));
    background: color-mix(in srgb, var(--section-bg, transparent) 55%, var(--card-bg, #fff));
    color: var(--muted-color, #666666);
    font-size: 0.88rem;
  }

  /* —— Detail —— */
  .bil-detail {
    position: relative;
    display: grid;
    gap: 0.95rem;
    padding: 1.25rem 1.3rem 1.35rem;
    border-radius: 18px;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 24%, var(--border-color, #e5e7eb));
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
      0 14px 34px rgba(120, 44, 82, 0.08);
  }

  .bil-detail__head {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .bil-detail__badge {
    flex: 0 0 auto;
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    object-fit: cover;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 700;
    background: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      inset 0 0 0 2px rgba(255, 255, 255, 0.35),
      0 8px 18px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, transparent);
  }

  .bil-detail__eyebrow {
    margin: 0 0 0.15rem;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bil-detail__title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    line-height: 1.3;
  }

  .bil-detail__texture {
    display: inline-block;
    margin-top: 0.25rem;
    padding: 0.15rem 0.6rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 700;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bil-detail__desc {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--muted-color, #666666);
  }

  .bil-block {
    display: grid;
    gap: 0.45rem;
  }

  .bil-block__title {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .bil-block__title::before {
    content: '';
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    flex: 0 0 auto;
  }

  .bil-block__text {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
  }

  .bil-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bil-chip {
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    font-size: 0.76rem;
    font-weight: 700;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent);
  }

  .bil-chip--soft {
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 45%, var(--card-bg, #fff));
    color: var(--text-color, #000000);
    border-color: color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
  }

  .bil-note {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    padding: 0.75rem 0.85rem;
    border-radius: 14px;
    background: color-mix(in srgb, #e0a100 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, #e0a100 34%, transparent);
    color: color-mix(in srgb, var(--fs-caution, #e0a100) 45%, var(--text-color, #000000));
    font-size: 0.84rem;
    line-height: 1.55;
  }

  .bil-link {
    justify-self: start;
  }

  @media (max-width: 639px) {
    .bil-stage {
      padding: 1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bil-bubble {
      animation: none;
    }
    .bil-card,
    .bil-segment__btn,
    .bil-card__check {
      transition: none;
    }
  }
`, w = [
  { value: "serum", ar: "سيروم", en: "Serum" },
  { value: "gel", ar: "جل", en: "Gel" },
  { value: "cream", ar: "كريم", en: "Cream" },
  { value: "oil", ar: "زيت", en: "Oil" },
  { value: "foam", ar: "رغوة", en: "Foam" },
  { value: "balm", ar: "بلسم", en: "Balm" },
  { value: "powder", ar: "بودرة", en: "Powder" },
  { value: "spray", ar: "رذاذ", en: "Spray" }
];
function z() {
  return U() === "en";
}
function k(s) {
  const e = w.find((r) => r.value === s);
  return e ? z() ? e.en : e.ar : s;
}
function O(s) {
  const e = new Set(s.map((r) => r.texture).filter(Boolean));
  return w.filter((r) => e.has(r.value)).map((r) => ({
    value: r.value,
    label: z() ? r.en : r.ar
  }));
}
function Y(s) {
  return j(s).map((e, r) => ({
    id: `ingredient-${r}`,
    name: d(e.name),
    image: R(e.image),
    color: d(e.color) || "#c2527f",
    desc: d(e.desc),
    benefits: x(e.benefits),
    skin_types: x(e.skin_types),
    usage_time: d(e.usage_time),
    note: d(e.note),
    texture: P(e.texture, "").toLowerCase().trim(),
    link: M(e.link ?? e["bil_ingredients.link"])
  })).filter((e) => e.name || e.desc || e.image);
}
function V(s, e) {
  return e ? s.filter((r) => r.texture === e) : s;
}
var G = Object.defineProperty, m = (s, e, r, n) => {
  for (var o = void 0, c = s.length - 1, p; c >= 0; c--)
    (p = s[c]) && (o = p(e, r, o) || o);
  return o && G(e, r, o), o;
};
const f = class f extends L {
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
    return V(this.ingredients, this.activeTexture);
  }
  ensureSelection() {
    var r;
    const e = this.filtered;
    e.some((n) => n.id === this.selectedId) || (this.selectedId = ((r = e[0]) == null ? void 0 : r.id) ?? "");
  }
  get selected() {
    return this.filtered.find((e) => e.id === this.selectedId) || null;
  }
  setTexture(e) {
    this.activeTexture = this.activeTexture === e ? "" : e, this.ensureSelection();
  }
  select(e) {
    this.selectedId = e.id, window.matchMedia("(max-width: 859px)").matches && requestAnimationFrame(() => {
      const r = this.renderRoot.querySelector(".bil-detail");
      r == null || r.scrollIntoView({ behavior: _() ? "auto" : "smooth", block: "nearest" });
    });
  }
  renderBadge(e, r = "bil-card__badge") {
    return e.image ? t`<img class=${r} src=${e.image} alt="" loading="lazy" />` : t`<span class=${r} style=${v({ background: e.color })} aria-hidden="true">
          ${(e.name || "•").slice(0, 1)}
        </span>`;
  }
  renderDetail(e, r) {
    return t`
      <div class="bil-detail" aria-live="polite">
        <div class="bil-detail__head">
          ${this.renderBadge(e, "bil-detail__badge")}
          <div>
            <p class="bil-detail__eyebrow">${i("المكوّن المختار", "Selected ingredient")}</p>
            <h3 class="bil-detail__title">${e.name || i("مكوّن", "Ingredient")}</h3>
            ${e.texture ? t`<span class="bil-detail__texture">${k(e.texture)}</span>` : a}
          </div>
        </div>

        ${e.desc ? t`<p class="bil-detail__desc">${e.desc}</p>` : a}

        ${e.benefits.length ? t`<div class="bil-block">
              <h4 class="bil-block__title">${i("الفوائد", "Benefits")}</h4>
              <div class="bil-chips">
                ${e.benefits.map((n) => t`<span class="bil-chip">${n}</span>`)}
              </div>
            </div>` : a}

        ${e.skin_types.length ? t`<div class="bil-block">
              <h4 class="bil-block__title">${i("أنواع البشرة المناسبة", "Suitable skin types")}</h4>
              <div class="bil-chips">
                ${e.skin_types.map((n) => t`<span class="bil-chip bil-chip--soft">${n}</span>`)}
              </div>
            </div>` : a}

        ${e.usage_time ? t`<div class="bil-block">
              <h4 class="bil-block__title">${i("وقت الاستخدام", "Usage time")}</h4>
              <p class="bil-block__text">${e.usage_time}</p>
            </div>` : a}

        ${e.note ? t`<div class="bil-note"><span aria-hidden="true">⚠︎</span><span>${e.note}</span></div> ` : a}

        <div class="fs-actions">
          ${e.link && r ? t`<a class="fs-btn fs-btn--ghost bil-link" href=${e.link}>${i("اعرفي المزيد", "Learn more")}</a>` : a}
          ${F(this.config || {}, "bil_")}
        </div>
      </div>
    `;
  }
  render() {
    const e = this.config || {}, r = A(e, "bil_"), n = r.animate && !_(), o = d(e.bil_title), c = d(e.bil_desc), p = this.ingredients, g = this.filtered, u = O(p), h = this.selected, T = y(e.bil_show_link, !0), S = y(e.bil_bubbles, !0) && n;
    return p.length ? t`
      <section
        class=${E({ "fs-section": !0, "fs-animate": n })}
        style=${v(D(r))}
        aria-label=${o || i("مختبر المكونات والقوام", "Ingredient & texture lab")}
      >
        <div class="fs-container">
          ${o || c ? t`<div class="fs-header">
                ${o ? t`<h2 class="fs-title">${o}</h2>` : a}
                ${c ? t`<p class="fs-desc">${c}</p>` : a}
              </div>` : a}

          <div class="bil-stage">
            ${S ? t`<div class="bil-bubbles" aria-hidden="true">
                  <span class="bil-bubble" style="width:70px;height:70px;inset-inline-start:8%;top:12%"></span>
                  <span class="bil-bubble" style="width:44px;height:44px;inset-inline-end:14%;top:24%;animation-delay:1.5s"></span>
                  <span class="bil-bubble" style="width:90px;height:90px;inset-inline-end:6%;bottom:10%;animation-delay:0.8s"></span>
                  <span class="bil-bubble" style="width:36px;height:36px;inset-inline-start:22%;bottom:16%;animation-delay:2.2s"></span>
                </div>` : a}

            ${u.length ? t`<div class="bil-filter-wrap">
                  <span class="bil-filter__label">${i("القوام", "Texture")}</span>
                  <div class="bil-segment" role="group" aria-label=${i("فلترة حسب القوام", "Filter by texture")}>
                    <button
                      type="button"
                      class="bil-segment__btn"
                      aria-pressed=${this.activeTexture === "" ? "true" : "false"}
                      @click=${() => this.setTexture("")}
                    >
                      ${i("الكل", "All")}
                    </button>
                    ${u.map(
      (l) => t`<button
                        type="button"
                        class="bil-segment__btn"
                        aria-pressed=${this.activeTexture === l.value ? "true" : "false"}
                        @click=${() => this.setTexture(l.value)}
                      >
                        ${l.label}
                      </button>`
    )}
                  </div>
                </div>` : a}

            <div class="bil-body">
              <div class="bil-grid" role="list">
                ${g.length ? g.map((l) => {
      const C = l.id === this.selectedId;
      return t`<button
                        type="button"
                        class="bil-card"
                        role="listitem"
                        aria-pressed=${C ? "true" : "false"}
                        @click=${() => this.select(l)}
                      >
                        ${this.renderBadge(l)}
                        <span class="bil-card__text">
                          <span class="bil-card__name">${l.name || i("مكوّن", "Ingredient")}</span>
                          ${l.texture ? t`<span class="bil-card__texture">${k(l.texture)}</span>` : a}
                        </span>
                        <span class="bil-card__check" aria-hidden="true">✓</span>
                      </button>`;
    }) : t`<div class="bil-empty" role="status">
                      ${i("لا توجد مكونات بهذا القوام.", "No ingredients with this texture.")}
                    </div>`}
              </div>

              ${h ? this.renderDetail(h, T) : a}
            </div>
          </div>
        </div>
      </section>
    ` : t`<div class="fs-empty" role="status">
        ${i("أضيفي المكونات الفعالة من إعدادات العنصر", "Add active ingredients in the element settings")}
      </div>`;
  }
};
f.styles = [q, H];
let b = f;
m([
  B({ type: Object })
], b.prototype, "config");
m([
  $()
], b.prototype, "activeTexture");
m([
  $()
], b.prototype, "selectedId");
typeof b < "u" && b.registerSallaComponent("salla-beauty-ingredient-lab");
export {
  b as default
};
