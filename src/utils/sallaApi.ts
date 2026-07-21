/**
 * Thin wrappers around the Twilight Salla SDK for storefront elements.
 * Avoids hard failures / validation alerts that surface as «تعذر تحميل المنتجات».
 */

export type SallaProductApi = {
  fetch?: (params: Record<string, unknown>) => Promise<unknown>;
  api?: {
    fetch?: (params: Record<string, unknown>) => Promise<unknown>;
    getDetails?: (id: string | number) => Promise<unknown>;
    fetchOptions?: (
      ids: Array<string | number>
    ) => Promise<{ data?: Array<{ id?: string | number; options?: unknown[] }> }>;
  };
  getDetails?: (id: string | number, includes?: string[]) => Promise<unknown>;
};

export type SallaApi = {
  onReady?: () => Promise<unknown> | void;
  api?: {
    withoutNotifier?: <T>(callback: () => T | Promise<T>) => Promise<T>;
  };
  product?: SallaProductApi;
};

export function getSalla(): SallaApi | null {
  const w = window as unknown as { Salla?: SallaApi; salla?: SallaApi };
  return w.Salla || w.salla || null;
}

function isEmptySourceValue(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === 'string') {
    const t = value.trim();
    return !t || t === '[]' || t === 'null' || t === 'undefined';
  }
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

/** Reject API shapes that always trigger Salla validation alerts. */
export function canFetchProducts(params: Record<string, unknown>): boolean {
  const source = String(params.source || '')
    .toLowerCase()
    .trim();
  if (!source) return false;
  if (
    (source === 'categories' ||
      source === 'selected' ||
      source === 'brands' ||
      source === 'tags') &&
    isEmptySourceValue(params.source_value)
  ) {
    return false;
  }
  return true;
}

/**
 * Run a Salla API call without toast/alert notifiers when supported.
 * Twilight local demo mocks `withoutNotifier` incompletely — also mute
 * `window.alert` for the duration of the call.
 */
export async function silentSalla<T>(fn: () => Promise<T>): Promise<T> {
  const salla = getSalla();
  const wrap = salla?.api?.withoutNotifier;
  const win = window as Window & { alert: typeof window.alert };
  const prevAlert = win.alert;
  win.alert = (() => {
    /* swallow demo validation alerts */
  }) as typeof window.alert;

  try {
    if (typeof wrap === 'function') {
      try {
        return await Promise.resolve(wrap(fn) as Promise<T>);
      } catch {
        // Incomplete SDK / demo — retry without the wrapper
      }
    }
    return await fn();
  } finally {
    win.alert = prevAlert;
  }
}

export async function awaitSallaReady(): Promise<SallaApi | null> {
  const salla = getSalla();
  if (!salla) return null;
  try {
    if (typeof salla.onReady === 'function') await salla.onReady();
  } catch {
    // continue
  }
  return salla;
}

export function unwrapData(res: unknown): unknown {
  if (res && typeof res === 'object' && 'data' in (res as object)) {
    return (res as { data: unknown }).data;
  }
  return res;
}

export function unwrapList(res: unknown): unknown[] {
  const data = unwrapData(res);
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data;
    if (Array.isArray(obj.products)) return obj.products;
    if (Array.isArray(obj.items)) return obj.items;
  }
  return [];
}

export function toSourceIds(ids: string[]): Array<number | string> {
  return ids
    .map((id) => String(id).trim())
    .filter(Boolean)
    .map((id) => {
      const numberId = Number(id);
      return Number.isFinite(numberId) && String(numberId) === id
        ? numberId
        : id;
    });
}

/** Build a safe product-list query for the Salla SDK. */
export function buildProductFetchParams(
  source: string,
  sourceValue: string,
  limit: number
): Record<string, unknown> | null {
  const src = String(source || '')
    .toLowerCase()
    .trim();
  if (!src) return null;

  const lim = Math.max(1, Math.min(40, Number(limit) || 8));
  const params: Record<string, unknown> = {
    source: src,
    per_page: lim,
    limit: lim,
  };

  const raw = String(sourceValue ?? '').trim();
  let parsed: unknown = raw;
  if (!raw || raw === '[]') {
    parsed = src === 'sales' ? 'sales' : [];
  } else {
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = raw;
    }
  }

  if (src === 'latest') {
    // Omit empty source_value — demo/SDK often rejects `[]` and throws.
    return params;
  }

  if (src === 'sales') {
    params.source_value = parsed || 'sales';
    return canFetchProducts(params) ? params : null;
  }

  if (src === 'selected' || src === 'categories' || src === 'brands' || src === 'tags') {
    params.source_value = parsed;
    return canFetchProducts(params) ? params : null;
  }

  params.source_value = parsed;
  return canFetchProducts(params) ? params : null;
}

/** Fetch product list silently; tries product.fetch then product.api.fetch. Never throws. */
export async function fetchSallaProducts(
  params: Record<string, unknown>
): Promise<unknown[]> {
  try {
    if (!canFetchProducts(params)) return [];

    const salla = await awaitSallaReady();
    if (!salla?.product) return [];

    const fetchers = [
      salla.product.fetch?.bind(salla.product),
      salla.product.api?.fetch?.bind(salla.product.api),
    ].filter(
      (fn): fn is (p: Record<string, unknown>) => Promise<unknown> =>
        typeof fn === 'function'
    );

    if (!fetchers.length) return [];

    return await silentSalla(async () => {
      for (const fetchFn of fetchers) {
        try {
          const list = unwrapList(await fetchFn(params));
          if (list.length) return list;
        } catch {
          // try next fetcher / shape
        }
      }

      // One more attempt for latest without any extra keys
      if (String(params.source) === 'latest') {
        for (const fetchFn of fetchers) {
          try {
            const list = unwrapList(
              await fetchFn({ source: 'latest', limit: params.limit, per_page: params.per_page })
            );
            if (list.length) return list;
          } catch {
            // continue
          }
        }
      }

      return [];
    });
  } catch {
    return [];
  }
}
