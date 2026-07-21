/**
 * Shared Twilight / Saji / Raed product-picker helpers.
 * Docs: https://docs.salla.dev/ · https://salla.stoplight.io/
 *
 * `<fs-products-swiper>` / Salla product sources:
 * - selected  → JSON array of product ids
 * - categories → category id(s)
 * - brands → brand id(s)
 * - sales | latest | …
 */

import { getRadioValue } from './helpers.js';
import { toSourceIds } from './sallaApi.js';

export type ProductSourceType =
  | 'categories'
  | 'brands'
  | 'sales'
  | 'latest'
  | 'selected'
  | 'tags'
  | '';

const SOURCE_VALUES = new Set([
  'none',
  'categories',
  'brands',
  'sales',
  'latest',
  'selected',
  'tags',
]);

/** Unwrap picker / dropdown payloads — never prefer empty `selected` over `value`. */
export function unwrapPickerEntries(raw: unknown): unknown[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    if (Array.isArray(obj.selected) && obj.selected.length) return obj.selected;
    if (Array.isArray(obj.value) && obj.value.length) return obj.value;
    if (Array.isArray(obj.data) && obj.data.length) return obj.data;
    if (Array.isArray(obj.items) && obj.items.length) return obj.items;
    if (Array.isArray(obj.products) && obj.products.length) return obj.products;
    if ('id' in obj || 'value' in obj || 'name' in obj || 'label' in obj) {
      return [obj];
    }
  }
  if (typeof raw === 'number' || typeof raw === 'string') return [raw];
  return [];
}

export function extractEntityId(entry: unknown): string {
  if (entry == null) return '';
  if (typeof entry === 'number' || typeof entry === 'string') {
    return String(entry).trim();
  }
  if (typeof entry !== 'object') return '';
  const obj = entry as Record<string, unknown>;
  const direct =
    obj.id ??
    obj.value ??
    obj.product_id ??
    obj.category_id ??
    obj.brand_id ??
    obj.key;
  if (Array.isArray(direct)) return extractEntityId(direct[0]);
  if (direct != null && typeof direct !== 'object') return String(direct).trim();
  if (direct && typeof direct === 'object') return extractEntityId(direct);
  return '';
}

export function extractPickerIds(raw: unknown): string[] {
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const entry of unwrapPickerEntries(raw)) {
    const id = extractEntityId(entry);
    if (!id || SOURCE_VALUES.has(id.toLowerCase()) || seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }
  return ids;
}

export function normalizeProductSource(raw: unknown): ProductSourceType {
  const val = getRadioValue(raw, '').toLowerCase().trim();
  if (!val || val === 'none') return '';
  if (
    val === 'categories' ||
    val === 'brands' ||
    val === 'sales' ||
    val === 'latest' ||
    val === 'selected' ||
    val === 'tags'
  ) {
    return val;
  }
  return '';
}

export interface ProductsSliderAttrs {
  source: Exclude<ProductSourceType, ''>;
  sourceValue: string;
  limit: number;
}

export interface ProductBindingInput {
  source?: unknown;
  chosen?: unknown;
  category?: unknown;
  brand?: unknown;
  tags?: unknown;
  /** variable-list / link field that may point at brands, categories, or products */
  link?: unknown;
  limit?: number;
}

/** Detect source kind from a Salla variable-list / picker payload. */
export function detectLinkSourceKind(
  raw: unknown
): 'brands' | 'categories' | 'products' | '' {
  if (!raw || typeof raw !== 'object') return '';
  const obj = raw as Record<string, unknown>;
  const kind = String(
    obj.source ?? obj.key ?? obj.type ?? obj.format ?? ''
  )
    .toLowerCase()
    .trim();
  if (kind === 'brands' || kind === 'brand') return 'brands';
  if (kind === 'categories' || kind === 'category') return 'categories';
  if (kind === 'products' || kind === 'product') return 'products';
  if (Array.isArray(obj.selected) && obj.selected[0] && typeof obj.selected[0] === 'object') {
    return detectLinkSourceKind(obj.selected[0]);
  }
  return '';
}

/** Build valid Raed/Saji slider attributes, or null without a valid source. */
export function resolveProductsSliderAttrs(input: {
  source: unknown;
  chosen?: unknown;
  category?: unknown;
  brand?: unknown;
  tags?: unknown;
  limit?: number;
  fallbackSelectedWhenChosen?: boolean;
}): ProductsSliderAttrs | null {
  let source = normalizeProductSource(input.source);
  const chosenIds = extractPickerIds(input.chosen);
  const categoryIds = extractPickerIds(input.category);
  const brandIds = extractPickerIds(input.brand);
  const tagIds = extractPickerIds(input.tags);
  const limit = Math.max(1, Math.min(40, Number(input.limit) || 6));

  if (
    !source &&
    input.fallbackSelectedWhenChosen !== false &&
    chosenIds.length
  ) {
    source = 'selected';
  }
  if (!source && categoryIds.length) source = 'categories';
  if (!source && brandIds.length) source = 'brands';
  if (!source && tagIds.length) source = 'tags';

  if (source === 'selected') {
    if (!chosenIds.length) return null;
    return {
      source,
      sourceValue: JSON.stringify(toSourceIds(chosenIds)),
      limit: Math.min(limit, chosenIds.length) || limit,
    };
  }

  if (source === 'categories') {
    if (!categoryIds.length) return null;
    const ids = toSourceIds(categoryIds);
    return {
      source,
      sourceValue: ids.length === 1 ? String(ids[0]) : JSON.stringify(ids),
      limit,
    };
  }

  if (source === 'brands') {
    if (!brandIds.length) return null;
    const ids = toSourceIds(brandIds);
    return {
      source,
      sourceValue: ids.length === 1 ? String(ids[0]) : JSON.stringify(ids),
      limit,
    };
  }

  if (source === 'tags') {
    if (!tagIds.length) return null;
    const ids = toSourceIds(tagIds);
    return {
      source,
      sourceValue: ids.length === 1 ? String(ids[0]) : JSON.stringify(ids),
      limit,
    };
  }

  if (source === 'sales') {
    return { source, sourceValue: 'sales', limit };
  }

  if (source === 'latest') {
    return { source, sourceValue: '[]', limit };
  }

  return null;
}

/**
 * Resolve a binding from a collection row or link field.
 * Preference: explicit products_source fields → link variable-list kind.
 */
export function resolveProductBinding(
  input: ProductBindingInput
): ProductsSliderAttrs | null {
  const limit = Math.max(1, Math.min(40, Number(input.limit) || 8));
  const explicit = resolveProductsSliderAttrs({
    source: input.source,
    chosen: input.chosen,
    category: input.category,
    brand: input.brand,
    tags: input.tags,
    limit,
    fallbackSelectedWhenChosen: true,
  });
  if (explicit) return explicit;

  const kind = detectLinkSourceKind(input.link);
  if (kind === 'brands') {
    return resolveProductsSliderAttrs({
      source: 'brands',
      brand: input.link,
      limit,
    });
  }
  if (kind === 'categories') {
    return resolveProductsSliderAttrs({
      source: 'categories',
      category: input.link,
      limit,
    });
  }
  if (kind === 'products') {
    return resolveProductsSliderAttrs({
      source: 'selected',
      chosen: input.link,
      limit,
    });
  }
  return null;
}

/** Parse product binding fields from a normalizeCollection row. */
export function productBindingFromRow(
  row: Record<string, unknown>,
  limit = 8
): ProductBindingInput {
  const productsField = row.products;
  const productsAsSource = normalizeProductSource(productsField);
  const sourceRaw =
    row.products_source ??
    row.product_source ??
    row.source ??
    (productsAsSource ? productsField : undefined);
  const source = normalizeProductSource(sourceRaw);
  const chosenFromProducts =
    !productsAsSource && productsField != null ? productsField : undefined;
  return {
    source: source || undefined,
    chosen: row.chosen_products ?? chosenFromProducts,
    category: row.categories ?? row.category,
    brand:
      row.brands ??
      row.salla_brand ??
      row.product_brands ??
      (row.brand && typeof row.brand === 'object' ? row.brand : undefined),
    tags: row.tags,
    link: source ? undefined : row.link,
    limit,
  };
}

/**
 * Cascade bindings from most specific → least (e.g. trim → year → model → brand).
 * First resolvable wins.
 */
export function resolveCascadedProductBinding(
  layers: Array<ProductBindingInput | null | undefined>,
  limit = 8
): ProductsSliderAttrs | null {
  for (let i = layers.length - 1; i >= 0; i -= 1) {
    const layer = layers[i];
    if (!layer) continue;
    const resolved = resolveProductBinding({ ...layer, limit: layer.limit ?? limit });
    if (resolved) return resolved;
  }
  return null;
}

/** Static merchant config: `${prefix}products_source` + pickers. */
export function resolveConfigProductSlider(
  config: Record<string, unknown>,
  prefix: string
): ProductsSliderAttrs | null {
  const limit = Math.max(
    1,
    Math.min(40, Number(config[`${prefix}products_limit`]) || 8)
  );
  const explicitSource =
    config[`${prefix}products_source`] ?? config[`${prefix}product_source`];
  const chosen =
    config[`${prefix}chosen_products`] ?? config[`${prefix}products`];
  const category =
    config[`${prefix}categories`] ?? config[`${prefix}category`];
  const brand =
    config[`${prefix}product_brands`] ??
    config[`${prefix}brands`] ??
    config[`${prefix}brand`];

  const resolved = resolveProductsSliderAttrs({
    source: explicitSource,
    chosen,
    category,
    brand,
    tags: config[`${prefix}tags`],
    limit,
    fallbackSelectedWhenChosen: true,
  });
  if (resolved) return resolved;

  // Default when products are enabled but no picker filled yet.
  return resolveProductsSliderAttrs({ source: 'latest', limit });
}

/**
 * Prefer a selection/result row binding, then fall back to component config.
 */
export function resolveSelectionProductSlider(
  config: Record<string, unknown>,
  prefix: string,
  selection?: unknown
): ProductsSliderAttrs | null {
  const limit = Math.max(
    1,
    Math.min(40, Number(config[`${prefix}products_limit`]) || 8)
  );
  if (selection && typeof selection === 'object') {
    const row = selection as Record<string, unknown>;
    const nested = row.products;
    let binding: ProductBindingInput;
    if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
      binding = {
        ...(nested as ProductBindingInput),
        link: (nested as ProductBindingInput).link ?? row.link,
        limit,
      };
    } else if ('source' in row || 'chosen' in row) {
      binding = { ...(selection as ProductBindingInput), limit };
    } else {
      binding = productBindingFromRow(row, limit);
    }
    const fromSelection = resolveProductBinding(binding);
    if (fromSelection) return fromSelection;
  }
  return resolveConfigProductSlider(config, prefix);
}
