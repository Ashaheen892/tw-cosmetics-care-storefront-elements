import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  isTruthy,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import {
  filterByTexture,
  parseIngredients,
  textureLabel,
  usedTextures,
} from './utils.js';
import type { Ingredient } from './types.js';

export default class BeautyIngredientLab extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeTexture = '';
  @state() private selectedId = '';

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.ensureSelection();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this.ensureSelection();
  }

  private get ingredients(): Ingredient[] {
    return parseIngredients(this.config?.bil_ingredients);
  }

  private get filtered(): Ingredient[] {
    return filterByTexture(this.ingredients, this.activeTexture);
  }

  private ensureSelection(): void {
    const list = this.filtered;
    if (!list.some((i) => i.id === this.selectedId)) {
      this.selectedId = list[0]?.id ?? '';
    }
  }

  private get selected(): Ingredient | null {
    return this.filtered.find((i) => i.id === this.selectedId) || null;
  }

  private setTexture(texture: string): void {
    this.activeTexture = this.activeTexture === texture ? '' : texture;
    this.ensureSelection();
  }

  private select(ingredient: Ingredient): void {
    this.selectedId = ingredient.id;
  }

  private renderDetail(ingredient: Ingredient, showLink: boolean) {
    return html`
      <div class="bil-detail" aria-live="polite">
        <div class="bil-detail__head">
          ${ingredient.image
            ? html`<img class="bil-card__badge" src=${ingredient.image} alt="" loading="lazy" />`
            : html`<span class="bil-card__badge" style=${styleMap({ background: ingredient.color })} aria-hidden="true">
                ${(ingredient.name || '•').slice(0, 1)}
              </span>`}
          <h3 class="bil-detail__title">${ingredient.name || t('مكوّن', 'Ingredient')}</h3>
        </div>
        ${ingredient.desc ? html`<p class="bil-card__desc" style="-webkit-line-clamp:unset">${ingredient.desc}</p>` : nothing}

        ${ingredient.benefits.length
          ? html`<div>
              <p class="bil-meta__row"><b>${t('الفوائد', 'Benefits')}</b></p>
              <div class="bil-chips">
                ${ingredient.benefits.map((b) => html`<span class="bil-chip">${b}</span>`)}
              </div>
            </div>`
          : nothing}

        <div class="bil-meta">
          ${ingredient.skin_types.length
            ? html`<div class="bil-meta__row">
                <b>${t('أنواع البشرة المناسبة', 'Suitable skin types')}:</b>
                <div class="bil-chips" style="margin-top:0.35rem">
                  ${ingredient.skin_types.map((s) => html`<span class="bil-chip">${s}</span>`)}
                </div>
              </div>`
            : nothing}
          ${ingredient.usage_time
            ? html`<p class="bil-meta__row"><b>${t('وقت الاستخدام', 'Usage time')}:</b> ${ingredient.usage_time}</p>`
            : nothing}
        </div>

        ${ingredient.note ? html`<div class="bil-note">${ingredient.note}</div>` : nothing}

        ${ingredient.link && showLink
          ? html`<a class="bil-link" href=${ingredient.link}>${t('اعرفي المزيد', 'Learn more')}</a>`
          : nothing}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bil_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.bil_title as string);
    const desc = localizedString(c.bil_desc as string);
    const ingredients = this.ingredients;
    const filtered = this.filtered;
    const textures = usedTextures(ingredients);
    const selected = this.selected;
    const showLink = isTruthy(c.bil_show_link, true);
    const showBubbles = isTruthy(c.bil_bubbles, true) && animate;

    if (!ingredients.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي المكونات الفعالة من إعدادات العنصر', 'Add active ingredients in the element settings')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('مختبر المكونات والقوام', 'Ingredient & texture lab')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="bil-stage">
            ${showBubbles
              ? html`<div class="bil-bubbles" aria-hidden="true">
                  <span class="bil-bubble" style="width:70px;height:70px;inset-inline-start:8%;top:12%"></span>
                  <span class="bil-bubble" style="width:44px;height:44px;inset-inline-end:14%;top:24%;animation-delay:1.5s"></span>
                  <span class="bil-bubble" style="width:90px;height:90px;inset-inline-end:6%;bottom:10%;animation-delay:0.8s"></span>
                  <span class="bil-bubble" style="width:36px;height:36px;inset-inline-start:22%;bottom:16%;animation-delay:2.2s"></span>
                </div>`
              : nothing}

            ${textures.length
              ? html`<div class="bil-toolbar" role="group" aria-label=${t('فلترة حسب القوام', 'Filter by texture')}>
                  <button
                    type="button"
                    class="bil-filter"
                    aria-pressed=${this.activeTexture === '' ? 'true' : 'false'}
                    @click=${() => this.setTexture('')}
                  >
                    ${t('الكل', 'All')}
                  </button>
                  ${textures.map(
                    (tex) => html`<button
                      type="button"
                      class="bil-filter"
                      aria-pressed=${this.activeTexture === tex.value ? 'true' : 'false'}
                      @click=${() => this.setTexture(tex.value)}
                    >
                      ${tex.label}
                    </button>`
                  )}
                </div>`
              : nothing}

            <div class="bil-grid" role="list">
              ${filtered.map((ingredient) => {
                const active = ingredient.id === this.selectedId;
                return html`<button
                  type="button"
                  class="bil-card"
                  role="listitem"
                  aria-pressed=${active ? 'true' : 'false'}
                  @click=${() => this.select(ingredient)}
                >
                  ${ingredient.image
                    ? html`<img class="bil-card__badge" src=${ingredient.image} alt="" loading="lazy" />`
                    : html`<span class="bil-card__badge" style=${styleMap({ background: ingredient.color })} aria-hidden="true">
                        ${(ingredient.name || '•').slice(0, 1)}
                      </span>`}
                  <h3 class="bil-card__name">${ingredient.name || t('مكوّن', 'Ingredient')}</h3>
                  ${ingredient.texture
                    ? html`<span class="bil-card__texture">${textureLabel(ingredient.texture)}</span>`
                    : nothing}
                  ${ingredient.desc ? html`<p class="bil-card__desc">${ingredient.desc}</p>` : nothing}
                </button>`;
              })}
            </div>

            ${selected ? this.renderDetail(selected, showLink) : nothing}
          </div>
        </div>
      </section>
    `;
  }
}
