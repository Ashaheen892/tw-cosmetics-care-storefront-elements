import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parseBanners } from './utils.js';

export default class BeautyPromoBanners extends LitElement {
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

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bpb_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.bpb_title as string);
    const desc = localizedString(c.bpb_desc as string);
    const banners = parseBanners(c.bpb_items);

    if (!banners.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي البنرات من إعدادات العنصر', 'Add banners in the element settings')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('العروض', 'Promotions')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="bpb-track" role="list">
            ${banners.map(
              (banner) => html`
                <article class="bpb-card" role="listitem">
                  ${banner.image
                    ? html`<img class="bpb-card__img" src=${banner.image} alt="" loading="lazy" decoding="async" />`
                    : nothing}
                  <div class="bpb-card__overlay" aria-hidden="true"></div>
                  <div class="bpb-card__body">
                    ${banner.title ? html`<h3 class="bpb-card__title">${banner.title}</h3>` : nothing}
                    ${banner.subtitle ? html`<p class="bpb-card__subtitle">${banner.subtitle}</p>` : nothing}
                    ${banner.link
                      ? html`<a class="bpb-card__cta" href=${banner.link}>
                          ${banner.cta_label || t('تسوقي الآن', 'Shop now')}
                        </a>`
                      : nothing}
                  </div>
                </article>
              `
            )}
          </div>

          ${renderCommerceOutcome({ config: c, prefix: 'bpb_', ready: true })}
        </div>
      </section>
    `;
  }
}
