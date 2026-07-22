var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ref } from "lit/directives/ref.js";
import { styleMap } from "lit/directives/style-map.js";
import { t, n as normalizeCollection, b as extractLink, e as extractImageUrl, l as localizedString, s as sharedSectionCss, r as readSectionTheme, p as prefersReducedMotion, a as themeStyleMap } from "./sharedStyles-2kfPtH3m.js";
import { e as enableDragScroll } from "./dragScroll-CWPXfZ9c.js";
const componentStyles = css`
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
`, DEFAULTS = [
  { title: t("العناية بالبشرة", "Skincare"), image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80", link: "" },
  { title: t("المكياج", "Makeup"), image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80", link: "" },
  { title: t("العطور", "Fragrances"), image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80", link: "" },
  { title: t("العناية بالشعر", "Haircare"), image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80", link: "" }
];
function parseItems(raw) {
  const parsed = normalizeCollection(raw).map((row) => ({
    title: localizedString(row.title || row.name, ""),
    image: extractImageUrl(row.image),
    link: extractLink(row.link ?? row.url)
  })).filter((item) => item.title || item.image);
  return parsed.length ? parsed.map((item, i) => ({
    ...item,
    image: item.image || DEFAULTS[i % DEFAULTS.length].image,
    title: item.title || DEFAULTS[i % DEFAULTS.length].title
  })) : DEFAULTS.map((d) => ({ ...d }));
}
__name(parseItems, "parseItems");
function resolveLayout(raw) {
  return (typeof raw == "string" ? raw.trim().toLowerCase() : "") === "grid" ? "grid" : "slider";
}
__name(resolveLayout, "resolveLayout");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _BeautyCategories = class _BeautyCategories extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.boundLangHandler = () => this.requestUpdate(), this.bindTrack = (el) => {
      el instanceof HTMLElement && !el.classList.contains("bcat-wrap--grid") && enableDragScroll(el);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bcat_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.bcat_title), desc = localizedString(c.bcat_desc), layout = resolveLayout(c.bcat_layout), items = parseItems(c.bcat_items);
    return items.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("التصنيفات", "Categories")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div
            class=${classMap({ "bcat-wrap": !0, "bcat-wrap--grid": layout === "grid" })}
            role="list"
            ${ref(this.bindTrack)}
          >
            ${items.map(
      (item) => html`
                <a
                  class="bcat-item"
                  role="listitem"
                  href=${item.link || "#"}
                  @click=${(e) => {
        item.link || e.preventDefault();
      }}
                  aria-label=${item.title}
                >
                  <div class="bcat-disc" aria-hidden=${item.image ? "false" : "true"}>
                    ${item.image ? html`<img class="bcat-disc__img" src=${item.image} alt="" loading="lazy" decoding="async" />` : html`<span class="bcat-disc__placeholder" aria-hidden="true">✦</span>`}
                  </div>
                  ${item.title ? html`<p class="bcat-label">${item.title}</p>` : nothing}
                </a>
              `
    )}
          </div>
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t("أضيفي التصنيفات من إعدادات العنصر", "Add categories in the element settings")}
      </div>`;
  }
};
__name(_BeautyCategories, "BeautyCategories"), _BeautyCategories.styles = [sharedSectionCss, componentStyles];
let BeautyCategories = _BeautyCategories;
__decorateClass([
  property({ type: Object })
], BeautyCategories.prototype, "config");
typeof BeautyCategories < "u" && BeautyCategories.registerSallaComponent("salla-beauty-categories");
export {
  BeautyCategories as default
};
