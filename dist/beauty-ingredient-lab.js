var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, b as extractLink, g as getRadioValue, l as localizedString, f as parseTags, e as extractImageUrl, o as getPageLocale, s as sharedSectionCss, p as prefersReducedMotion, t, r as readSectionTheme, i as isTruthy, a as themeStyleMap } from "./sharedStyles-CPLtr3dp.js";
import { r as renderCommerceCtaButton } from "./commerceOutcome-D0x70G-K.js";
const componentStyles = css`
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
`, TEXTURES = [
  { value: "serum", ar: "سيروم", en: "Serum" },
  { value: "gel", ar: "جل", en: "Gel" },
  { value: "cream", ar: "كريم", en: "Cream" },
  { value: "oil", ar: "زيت", en: "Oil" },
  { value: "foam", ar: "رغوة", en: "Foam" },
  { value: "balm", ar: "بلسم", en: "Balm" },
  { value: "powder", ar: "بودرة", en: "Powder" },
  { value: "spray", ar: "رذاذ", en: "Spray" }
];
function isEn() {
  return getPageLocale() === "en";
}
__name(isEn, "isEn");
function textureLabel(value) {
  const def = TEXTURES.find((tex) => tex.value === value);
  return def ? isEn() ? def.en : def.ar : value;
}
__name(textureLabel, "textureLabel");
function usedTextures(ingredients) {
  const present = new Set(ingredients.map((i) => i.texture).filter(Boolean));
  return TEXTURES.filter((tex) => present.has(tex.value)).map((tex) => ({
    value: tex.value,
    label: isEn() ? tex.en : tex.ar
  }));
}
__name(usedTextures, "usedTextures");
function parseIngredients(raw) {
  return normalizeCollection(raw).map((row, index) => ({
    id: `ingredient-${index}`,
    name: localizedString(row.name),
    image: extractImageUrl(row.image),
    color: localizedString(row.color) || "#c2527f",
    desc: localizedString(row.desc),
    benefits: parseTags(row.benefits),
    skin_types: parseTags(row.skin_types),
    usage_time: localizedString(row.usage_time),
    note: localizedString(row.note),
    texture: getRadioValue(row.texture, "").toLowerCase().trim(),
    link: extractLink(row.link ?? row["bil_ingredients.link"])
  })).filter((i) => i.name || i.desc || i.image);
}
__name(parseIngredients, "parseIngredients");
function filterByTexture(ingredients, texture) {
  return texture ? ingredients.filter((i) => i.texture === texture) : ingredients;
}
__name(filterByTexture, "filterByTexture");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _BeautyIngredientLab = class _BeautyIngredientLab extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeTexture = "", this.selectedId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.ensureSelection();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.ensureSelection();
  }
  get ingredients() {
    var _a;
    return parseIngredients((_a = this.config) == null ? void 0 : _a.bil_ingredients);
  }
  get filtered() {
    return filterByTexture(this.ingredients, this.activeTexture);
  }
  ensureSelection() {
    var _a;
    const list = this.filtered;
    list.some((i) => i.id === this.selectedId) || (this.selectedId = ((_a = list[0]) == null ? void 0 : _a.id) ?? "");
  }
  get selected() {
    return this.filtered.find((i) => i.id === this.selectedId) || null;
  }
  setTexture(texture) {
    this.activeTexture = this.activeTexture === texture ? "" : texture, this.ensureSelection();
  }
  select(ingredient) {
    this.selectedId = ingredient.id, window.matchMedia("(max-width: 859px)").matches && requestAnimationFrame(() => {
      const detail = this.renderRoot.querySelector(".bil-detail");
      detail == null || detail.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest" });
    });
  }
  renderBadge(ingredient, cls = "bil-card__badge") {
    return ingredient.image ? html`<img class=${cls} src=${ingredient.image} alt="" loading="lazy" />` : html`<span class=${cls} style=${styleMap({ background: ingredient.color })} aria-hidden="true">
          ${(ingredient.name || "•").slice(0, 1)}
        </span>`;
  }
  renderDetail(ingredient, showLink) {
    return html`
      <div class="bil-detail" aria-live="polite">
        <div class="bil-detail__head">
          ${this.renderBadge(ingredient, "bil-detail__badge")}
          <div>
            <p class="bil-detail__eyebrow">${t("المكوّن المختار", "Selected ingredient")}</p>
            <h3 class="bil-detail__title">${ingredient.name || t("مكوّن", "Ingredient")}</h3>
            ${ingredient.texture ? html`<span class="bil-detail__texture">${textureLabel(ingredient.texture)}</span>` : nothing}
          </div>
        </div>

        ${ingredient.desc ? html`<p class="bil-detail__desc">${ingredient.desc}</p>` : nothing}

        ${ingredient.benefits.length ? html`<div class="bil-block">
              <h4 class="bil-block__title">${t("الفوائد", "Benefits")}</h4>
              <div class="bil-chips">
                ${ingredient.benefits.map((b) => html`<span class="bil-chip">${b}</span>`)}
              </div>
            </div>` : nothing}

        ${ingredient.skin_types.length ? html`<div class="bil-block">
              <h4 class="bil-block__title">${t("أنواع البشرة المناسبة", "Suitable skin types")}</h4>
              <div class="bil-chips">
                ${ingredient.skin_types.map((s) => html`<span class="bil-chip bil-chip--soft">${s}</span>`)}
              </div>
            </div>` : nothing}

        ${ingredient.usage_time ? html`<div class="bil-block">
              <h4 class="bil-block__title">${t("وقت الاستخدام", "Usage time")}</h4>
              <p class="bil-block__text">${ingredient.usage_time}</p>
            </div>` : nothing}

        ${ingredient.note ? html`<div class="bil-note"><span aria-hidden="true">⚠︎</span><span>${ingredient.note}</span></div> ` : nothing}

        <div class="fs-actions">
          ${ingredient.link && showLink ? html`<a class="fs-btn fs-btn--ghost bil-link" href=${ingredient.link}>${t("اعرفي المزيد", "Learn more")}</a>` : nothing}
          ${renderCommerceCtaButton(this.config || {}, "bil_")}
        </div>
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bil_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.bil_title), desc = localizedString(c.bil_desc), ingredients = this.ingredients, filtered = this.filtered, textures = usedTextures(ingredients), selected = this.selected, showLink = isTruthy(c.bil_show_link, !0), showBubbles = isTruthy(c.bil_bubbles, !0) && animate;
    return ingredients.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مختبر المكونات والقوام", "Ingredient & texture lab")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="bil-stage">
            ${showBubbles ? html`<div class="bil-bubbles" aria-hidden="true">
                  <span class="bil-bubble" style="width:70px;height:70px;inset-inline-start:8%;top:12%"></span>
                  <span class="bil-bubble" style="width:44px;height:44px;inset-inline-end:14%;top:24%;animation-delay:1.5s"></span>
                  <span class="bil-bubble" style="width:90px;height:90px;inset-inline-end:6%;bottom:10%;animation-delay:0.8s"></span>
                  <span class="bil-bubble" style="width:36px;height:36px;inset-inline-start:22%;bottom:16%;animation-delay:2.2s"></span>
                </div>` : nothing}

            ${textures.length ? html`<div class="bil-filter-wrap">
                  <span class="bil-filter__label">${t("القوام", "Texture")}</span>
                  <div class="bil-segment" role="group" aria-label=${t("فلترة حسب القوام", "Filter by texture")}>
                    <button
                      type="button"
                      class="bil-segment__btn"
                      aria-pressed=${this.activeTexture === "" ? "true" : "false"}
                      @click=${() => this.setTexture("")}
                    >
                      ${t("الكل", "All")}
                    </button>
                    ${textures.map(
      (tex) => html`<button
                        type="button"
                        class="bil-segment__btn"
                        aria-pressed=${this.activeTexture === tex.value ? "true" : "false"}
                        @click=${() => this.setTexture(tex.value)}
                      >
                        ${tex.label}
                      </button>`
    )}
                  </div>
                </div>` : nothing}

            <div class="bil-body">
              <div class="bil-grid" role="list">
                ${filtered.length ? filtered.map((ingredient) => {
      const active = ingredient.id === this.selectedId;
      return html`<button
                        type="button"
                        class="bil-card"
                        role="listitem"
                        aria-pressed=${active ? "true" : "false"}
                        @click=${() => this.select(ingredient)}
                      >
                        ${this.renderBadge(ingredient)}
                        <span class="bil-card__text">
                          <span class="bil-card__name">${ingredient.name || t("مكوّن", "Ingredient")}</span>
                          ${ingredient.texture ? html`<span class="bil-card__texture">${textureLabel(ingredient.texture)}</span>` : nothing}
                        </span>
                        <span class="bil-card__check" aria-hidden="true">✓</span>
                      </button>`;
    }) : html`<div class="bil-empty" role="status">
                      ${t("لا توجد مكونات بهذا القوام.", "No ingredients with this texture.")}
                    </div>`}
              </div>

              ${selected ? this.renderDetail(selected, showLink) : nothing}
            </div>
          </div>
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t("أضيفي المكونات الفعالة من إعدادات العنصر", "Add active ingredients in the element settings")}
      </div>`;
  }
};
__name(_BeautyIngredientLab, "BeautyIngredientLab"), _BeautyIngredientLab.styles = [sharedSectionCss, componentStyles];
let BeautyIngredientLab = _BeautyIngredientLab;
__decorateClass([
  property({ type: Object })
], BeautyIngredientLab.prototype, "config");
__decorateClass([
  state()
], BeautyIngredientLab.prototype, "activeTexture");
__decorateClass([
  state()
], BeautyIngredientLab.prototype, "selectedId");
typeof BeautyIngredientLab < "u" && BeautyIngredientLab.registerSallaComponent("salla-beauty-ingredient-lab");
export {
  BeautyIngredientLab as default
};
