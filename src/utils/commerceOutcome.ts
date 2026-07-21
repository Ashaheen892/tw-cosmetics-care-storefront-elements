import { html, nothing, type TemplateResult } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import {
  extractLink,
  isExternalUrl,
  isTruthy,
  t,
} from './helpers.js';
import { localizedString, type LocaleValue } from './localizedString.js';
import {
  resolveConfigProductSlider,
  resolveSelectionProductSlider,
  type ProductsSliderAttrs,
} from './productPicker.js';
import './productsSwiper.js';

export type CommerceRenderOptions = {
  config?: Record<string, unknown>;
  prefix?: string;
  /** Retained for existing call sites; not used for fake tag-matching. */
  matchTags?: string[];
  /** When false, hide the products block (e.g. before shopper selection / quiz result). */
  ready?: boolean;
  /**
   * Dynamic slider from the current choice cascade.
   * `undefined` = use static config pickers.
   * `null` = hide products (no binding for this selection).
   */
  sliderOverride?: ProductsSliderAttrs | null;
  /** Force dynamic-only: ignore static chosen_products when override is set. */
  dynamicOnly?: boolean;
  /** Active selection/result row — resolves products_source bindings when present. */
  selection?: unknown;
  /** Default products title (kit-specific). */
  defaultProductsTitle?: { ar: string; en: string };
};

function normalizeArgs(
  optionsOrConfig: CommerceRenderOptions | Record<string, unknown>,
  legacyPrefix?: string,
  legacyOptions?: CommerceRenderOptions | string[]
): Required<
  Pick<CommerceRenderOptions, 'config' | 'prefix'>
> &
  CommerceRenderOptions {
  if (
    optionsOrConfig &&
    typeof optionsOrConfig === 'object' &&
    'config' in optionsOrConfig &&
    'prefix' in optionsOrConfig
  ) {
    const o = optionsOrConfig as CommerceRenderOptions;
    return {
      ...o,
      config: o.config || {},
      prefix: o.prefix || '',
    };
  }

  const extra: CommerceRenderOptions =
    legacyOptions && !Array.isArray(legacyOptions) ? legacyOptions : {};
  return {
    ...extra,
    config: (optionsOrConfig as Record<string, unknown>) || {},
    prefix: legacyPrefix || '',
  };
}

/**
 * Merchant-controlled conversion after quizzes/tools.
 * Products come from Salla's real product picker — never fake samples.
 *
 * Sources (Twilight): selected | categories | brands | sales | latest
 * Docs: https://docs.salla.dev/ · https://salla.stoplight.io/
 */
export function renderCommerceOutcome(
  options: CommerceRenderOptions
): TemplateResult | typeof nothing;
export function renderCommerceOutcome(
  config: Record<string, unknown>,
  prefix: string,
  options?: CommerceRenderOptions | string[]
): TemplateResult | typeof nothing;
export function renderCommerceOutcome(
  optionsOrConfig: CommerceRenderOptions | Record<string, unknown>,
  legacyPrefix?: string,
  legacyOptions?: CommerceRenderOptions | string[]
): TemplateResult | typeof nothing {
  const opts = normalizeArgs(optionsOrConfig, legacyPrefix, legacyOptions);
  const c = opts.config || {};
  const prefix = opts.prefix || '';
  /** Explicit sliderOverride (even null) means the caller controls product visibility. */
  const overrideActive = opts.sliderOverride !== undefined;
  const showProducts =
    overrideActive || isTruthy(c[`${prefix}show_products`], false);
  const ready = opts.ready !== false;
  const limit = Math.max(
    1,
    Math.min(40, Number(c[`${prefix}products_limit`]) || 8)
  );
  const defaultTitle = opts.defaultProductsTitle || {
    ar: 'قطع مختارة لك',
    en: 'Selected parts for you',
  };

  let slider: ProductsSliderAttrs | null = null;
  if (showProducts && ready) {
    if (overrideActive) {
      slider = opts.sliderOverride ?? null;
    } else if (opts.selection !== undefined || opts.dynamicOnly) {
      slider = resolveSelectionProductSlider(c, prefix, opts.selection);
    } else {
      slider = resolveConfigProductSlider(c, prefix);
    }
    if (slider) {
      slider = { ...slider, limit: Math.min(limit, slider.limit) || limit };
    }
  }

  const ctaLink = extractLink(
    c[`${prefix}result_link`] ?? c[`${prefix}cta_link`]
  );
  const showCta =
    isTruthy(c[`${prefix}show_cta`], Boolean(ctaLink)) && Boolean(ctaLink);
  const ctaLabel =
    localizedString(c[`${prefix}cta_label`] as LocaleValue, '').trim() ||
    t('تسوق الآن', 'Shop now');
  const productsTitle =
    localizedString(c[`${prefix}products_title`] as LocaleValue, '').trim() ||
    t(defaultTitle.ar, defaultTitle.en);

  const waitingHint =
    showProducts && ready && opts.dynamicOnly && !slider
      ? t(
          'اختر من الخيارات أعلاه لعرض المنتجات المناسبة.',
          'Make a selection above to see matching products.'
        )
      : '';

  if (!slider && !showCta && !waitingHint) return nothing;

  const shadow = isTruthy(c[`${prefix}product_shadow`], true);
  const hideAdd = isTruthy(c[`${prefix}hide_add_btn`], false);
  const showOptions = isTruthy(c[`${prefix}show_product_options`], false);
  const slidesPerView = Math.max(
    1.2,
    Math.min(5, Number(c[`${prefix}slides_per_view`]) || 4.2)
  );
  const sliderKey = slider
    ? `${slider.source}:${slider.sourceValue}:${slider.limit}:${showOptions ? 1 : 0}`
    : '';

  return html`
    <aside class="fs-commerce" aria-label=${t('التسوق', 'Shopping')}>
      ${slider
        ? html`
            <div class="fs-commerce__head">
              <h3 class="fs-commerce__title">${productsTitle}</h3>
            </div>
            ${keyed(
              sliderKey,
              html`<fs-products-swiper
                source=${slider.source}
                source-value=${slider.sourceValue}
                limit=${slider.limit}
                slides-per-view=${slidesPerView}
                ?shadow=${shadow}
                ?hide-add=${hideAdd}
                ?show-options=${showOptions}
              ></fs-products-swiper>`
            )}
          `
        : waitingHint
          ? html`<p class="fs-commerce__hint">${waitingHint}</p>`
          : nothing}
      ${showCta
        ? html`<div class="fs-commerce__actions">
            <a
              class="fs-btn fs-tap fs-commerce__cta"
              href=${ctaLink}
              target=${isExternalUrl(ctaLink) ? '_blank' : nothing}
              rel=${isExternalUrl(ctaLink) ? 'noopener noreferrer' : nothing}
            >${ctaLabel}</a>
          </div>`
        : nothing}
    </aside>
  `;
}
