import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { enableDragScroll } from '../../utils/dragScroll.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parseItems, resolveLayout } from './utils.js';

export default class BeautyCategories extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  private bindTrack = (el?: Element) => {
    if (el instanceof HTMLElement && !el.classList.contains('bcat-wrap--grid')) {
      enableDragScroll(el);
    }
  };

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bcat_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.bcat_title as string);
    const desc = localizedString(c.bcat_desc as string);
    const layout = resolveLayout(c.bcat_layout);
    const items = parseItems(c.bcat_items);

    if (!items.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي التصنيفات من إعدادات العنصر', 'Add categories in the element settings')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('التصنيفات', 'Categories')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div
            class=${classMap({ 'bcat-wrap': true, 'bcat-wrap--grid': layout === 'grid' })}
            role="list"
            ${ref(this.bindTrack)}
          >
            ${items.map(
              (item) => html`
                <a
                  class="bcat-item"
                  role="listitem"
                  href=${item.link || '#'}
                  @click=${(e: Event) => {
                    if (!item.link) e.preventDefault();
                  }}
                  aria-label=${item.title}
                >
                  <div class="bcat-disc" aria-hidden=${item.image ? 'false' : 'true'}>
                    ${item.image
                      ? html`<img class="bcat-disc__img" src=${item.image} alt="" loading="lazy" decoding="async" />`
                      : html`<span class="bcat-disc__placeholder" aria-hidden="true">✦</span>`}
                  </div>
                  ${item.title ? html`<p class="bcat-label">${item.title}</p>` : nothing}
                </a>
              `
            )}
          </div>
        </div>
      </section>
    `;
  }
}
