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
import { parseItems, resolveMode, revealStagger, cardCountLabel } from './utils.js';
import type { RevealItem, RevealMode } from './types.js';

export default class BeautyCollectionReveal extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private revealed = false;

  private boundLangHandler = () => this.requestUpdate();
  private observer: IntersectionObserver | null = null;

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    this.observer?.disconnect();
    this.observer = null;
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.revealed = false;
    }
    this.maybeObserveAutoStart();
  }

  private maybeObserveAutoStart(): void {
    const auto = isTruthy(this.config?.bcr_auto_start, false);
    if (!auto || this.revealed || this.observer) return;
    if (typeof IntersectionObserver === 'undefined') {
      this.reveal();
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.reveal();
          this.observer?.disconnect();
          this.observer = null;
        }
      },
      { threshold: 0.35 }
    );
    this.observer.observe(this);
  }

  private reveal(): void {
    this.revealed = true;
  }

  private renderCover(mode: RevealMode) {
    const c = this.config || {};
    const coverImg = localizedString(c.bcr_cover_image as string);
    const coverTitle =
      localizedString(c.bcr_cover_title as string) ||
      localizedString(c.bcr_title as string);
    const btnText = localizedString(c.bcr_reveal_btn as string) || t('اكشفي المجموعة', 'Reveal collection');

    const inner = html`
      ${coverImg ? html`<img class="bcr-cover__img" src=${coverImg} alt="" loading="lazy" decoding="async" />` : nothing}
      <div class="bcr-cover__scrim" aria-hidden="true"></div>
      <div class="bcr-cover__inner">
        ${coverTitle ? html`<h3 class="bcr-cover__title">${coverTitle}</h3>` : nothing}
        <p class="bcr-cover__hint">${t('اضغطي للكشف عن البطاقات', 'Tap to reveal the cards')}</p>
        <button type="button" class="fs-btn bcr-cover__btn" @click=${this.reveal}>${btnText}</button>
      </div>
    `;

    // curtain & petals split into two halves for a symmetric open
    if (mode === 'curtain' || mode === 'petals') {
      return html`
        <div class="bcr-cover bcr-cover--${mode}" aria-hidden=${this.revealed ? 'true' : 'false'}>
          ${inner}
        </div>
        <div class="bcr-cover__half bcr-cover__half--start" aria-hidden="true"></div>
        <div class="bcr-cover__half bcr-cover__half--end" aria-hidden="true"></div>
      `;
    }

    return html`
      <div class="bcr-cover bcr-cover--${mode}" aria-hidden=${this.revealed ? 'true' : 'false'}>
        ${inner}
      </div>
    `;
  }

  private renderCard(item: RevealItem, showLink: boolean) {
    const hasLink = !!item.link && showLink;
    return html`
      <article class="bcr-card">
        ${item.image
          ? html`<div class="bcr-card__media">
              <img
                class="bcr-card__img"
                src=${item.image}
                alt=${item.title || ''}
                loading="lazy"
                decoding="async"
              />
              ${item.tag ? html`<span class="bcr-card__tag">${item.tag}</span>` : nothing}
            </div>`
          : item.tag
            ? html`<span class="bcr-card__tag bcr-card__tag--standalone">${item.tag}</span>`
            : nothing}
        <div class="bcr-card__body">
          ${item.title ? html`<h3 class="bcr-card__title">${item.title}</h3>` : nothing}
          ${item.subtitle ? html`<p class="bcr-card__subtitle">${item.subtitle}</p>` : nothing}
          ${hasLink
            ? html`<a class="bcr-card__link" href=${item.link}>
                ${t('اكتشفي المزيد', 'Discover more')}
              </a>`
            : nothing}
        </div>
      </article>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bcr_');
    const animate = theme.animate && !prefersReducedMotion();
    const mode = resolveMode(c);
    const stagger = revealStagger(c);
    const title = localizedString(c.bcr_title as string);
    const desc = localizedString(c.bcr_desc as string);
    const showLink = isTruthy(c.bcr_show_link, true);
    const items = parseItems(c.bcr_items);

    if (!items.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي بطاقات المجموعة من إعدادات العنصر', 'Add collection cards in the element settings')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('الكشف الإبداعي عن المجموعة', 'Creative collection reveal')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div
            class=${classMap({
              'bcr-scene': true,
              'is-open': this.revealed || !animate,
            })}
          >
            ${this.renderCover(mode)}
            <div class=${classMap({ 'bcr-stage': true, [`bcr-stage--${mode}`]: true })}>
              <div class="bcr-grid" role="list" aria-hidden=${this.revealed || !animate ? 'false' : 'true'}>
                ${items.map(
                  (item, i) => html`
                    <div
                      class="bcr-item"
                      role="listitem"
                      style=${styleMap({ '--reveal-delay': `${i * stagger}ms` })}
                    >
                      ${this.renderCard(item, showLink)}
                    </div>
                  `
                )}
              </div>
            </div>
          </div>

          ${this.revealed
            ? html`<p class="bcr-count" role="status">${cardCountLabel(items.length)}</p>`
            : nothing}
        </div>
      </section>
    `;
  }
}
