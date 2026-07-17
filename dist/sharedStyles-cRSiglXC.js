import { css as l } from "lit";
function m() {
  var r, t, o;
  try {
    const e = typeof Salla < "u" ? (t = (r = Salla == null ? void 0 : Salla.lang) == null ? void 0 : r.getLocale) == null ? void 0 : t.call(r) : void 0, n = (o = document.documentElement.lang) == null ? void 0 : o.split(/[-_]/)[0];
    return (e || n || "ar").toLowerCase();
  } catch {
    return "ar";
  }
}
function b(r, t = "") {
  if (r == null) return t;
  if (typeof r == "string")
    return r.trim() || t;
  if (typeof r == "number" && Number.isFinite(r))
    return String(r);
  if (typeof r == "object") {
    const o = r, n = [m(), "ar", "en", ...Object.keys(o)];
    for (const c of n) {
      const i = o[c];
      if (typeof i == "string" && i.trim()) return i.trim();
      if (typeof i == "number" && Number.isFinite(i)) return String(i);
    }
  }
  return t;
}
function u(r) {
  return Object.entries(r || {}).reduce((t, [o, e]) => {
    const n = o.includes(".") ? o.split(".").pop() : o;
    return t[n] = e, t;
  }, {});
}
function w(r) {
  return Array.isArray(r) ? r.filter((t) => !!t && typeof t == "object").map((t) => u(t)) : [];
}
function s(r, t = 0) {
  return typeof r == "number" && Number.isFinite(r) ? r : typeof r == "string" && r.trim() !== "" && Number.isFinite(Number(r)) ? Number(r) : r && typeof r == "object" && "value" in r ? s(r.value, t) : t;
}
function y(r, t = 0) {
  if (typeof r == "number" && Number.isFinite(r)) return r;
  if (typeof r == "string" && r.trim() !== "") {
    const o = Number(r.replace(",", "."));
    return Number.isFinite(o) ? o : t;
  }
  return t;
}
function _(r, t, o) {
  return Math.min(o, Math.max(t, r));
}
function a(r, t = !1) {
  if (typeof r == "boolean") return r;
  if (typeof r == "string") {
    const o = r.toLowerCase().trim();
    if (["true", "1", "yes", "on"].includes(o)) return !0;
    if (["false", "0", "no", "off", ""].includes(o)) return !1;
  }
  return typeof r == "number" ? r !== 0 : t;
}
function d(r) {
  if (!r) return "";
  if (typeof r == "string") {
    const t = r.trim();
    return g(t) ? t : "";
  }
  if (Array.isArray(r)) {
    for (const t of r) {
      const o = d(t);
      if (o) return o;
    }
    return "";
  }
  if (typeof r == "object") {
    const t = r, o = [
      t.url,
      t.href,
      t.link,
      t.value,
      t.custom,
      t.path
    ];
    for (const e of o) {
      const n = d(e);
      if (n) return n;
    }
  }
  return "";
}
function g(r) {
  if (!r || r === "#") return !1;
  if (r.startsWith("/") || r.startsWith("#") || r.startsWith("?") || r.startsWith("mailto:") || r.startsWith("tel:") || r.startsWith("whatsapp:"))
    return !0;
  try {
    const t = new URL(r, window.location.origin);
    return ["http:", "https:", "mailto:", "tel:"].includes(t.protocol);
  } catch {
    return !1;
  }
}
function v(r) {
  try {
    return new URL(r, window.location.origin).origin !== window.location.origin;
  } catch {
    return !1;
  }
}
function x(r) {
  if (!r || typeof r != "string") return !1;
  try {
    const t = new URL(r, window.location.origin);
    return !!["http:", "https:"].includes(t.protocol);
  } catch {
    return !1;
  }
}
function k(r, t, o, e) {
  var c, i;
  return ((i = typeof document < "u" ? (c = document.documentElement.lang) == null ? void 0 : c.split(/[-_]/)[0] : "ar") == null ? void 0 : i.toLowerCase()) === "en" ? t : r;
}
function z(r, t) {
  try {
    const o = localStorage.getItem(r);
    return o ? JSON.parse(o) : t;
  } catch {
    return t;
  }
}
function S(r, t) {
  try {
    localStorage.setItem(r, JSON.stringify(t));
  } catch {
  }
}
function j() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
function $(r, t, o) {
  const e = r || {};
  return {
    bg: String(e[`${t}bg`] ?? (o == null ? void 0 : o.bg) ?? "#fbf5f8"),
    text: String(e[`${t}text`] ?? (o == null ? void 0 : o.text) ?? "#33232e"),
    muted: String(e[`${t}muted`] ?? (o == null ? void 0 : o.muted) ?? "#8f7a86"),
    accent: String(e[`${t}accent`] ?? (o == null ? void 0 : o.accent) ?? "#c2527f"),
    card: String(e[`${t}card`] ?? (o == null ? void 0 : o.card) ?? "#ffffff"),
    border: String(e[`${t}border`] ?? (o == null ? void 0 : o.border) ?? "#f2dde7"),
    buttonBg: String(e[`${t}button_bg`] ?? (o == null ? void 0 : o.buttonBg) ?? "#c2527f"),
    buttonColor: String(
      e[`${t}button_color`] ?? (o == null ? void 0 : o.buttonColor) ?? "#ffffff"
    ),
    radius: `${s(e[`${t}radius`], 20)}px`,
    spaceDesktop: s(
      e[`${t}space_desktop`],
      48
    ),
    spaceMobile: s(
      e[`${t}space_mobile`],
      28
    ),
    animate: a(e[`${t}animate`], !0),
    fullWidth: a(e[`${t}full_width`], !1),
    noBottomMargin: a(e.notmrb, !1),
    hasContainer: a(e.has_container, !0),
    bgOverride: a(e.add_component_background_color, !1) ? String(e.component_background_color ?? "").trim() : ""
  };
}
function A(r) {
  const t = r.hasContainer !== !1;
  return {
    "--section-bg": r.bgOverride || r.bg,
    "--text-color": r.text,
    "--muted-color": r.muted,
    "--accent-color": r.accent,
    "--card-bg": r.card,
    "--border-color": r.border,
    "--button-bg": r.buttonBg,
    "--button-color": r.buttonColor,
    "--section-radius": r.radius,
    "--space-desktop": `${r.spaceDesktop}px`,
    "--space-mobile": `${r.spaceMobile}px`,
    // Standard editor controls (default element editor parity):
    // notmrb → remove the section's bottom spacing.
    "--space-desktop-bottom": r.noBottomMargin ? "0px" : `${r.spaceDesktop}px`,
    "--space-mobile-bottom": r.noBottomMargin ? "0px" : `${r.spaceMobile}px`,
    // has_container → constrain width & side padding, otherwise go edge-to-edge.
    "--section-container-max": t ? "1440px" : "none",
    "--section-container-pad": t ? "16px" : "0px",
    "--section-container-pad-sm": t ? "12px" : "0px"
  };
}
function f(r, t = "") {
  if (typeof r == "string" && r.trim()) return r.trim();
  if (Array.isArray(r) && r[0]) {
    const o = r[0];
    if (typeof o == "string") return o;
    if (o && typeof o == "object" && "value" in o)
      return String(o.value ?? t);
    if (o && typeof o == "object" && "key" in o)
      return String(o.key ?? t);
  }
  if (r && typeof r == "object") {
    const o = r;
    if (Array.isArray(o.selected) && o.selected[0])
      return f(o.selected, t);
    if ("value" in o && o.value != null && !Array.isArray(o.value))
      return String(o.value ?? t);
    if (Array.isArray(o.value) && o.value[0])
      return f(o.value, t);
  }
  return t;
}
function M(r) {
  const t = b(r, "");
  return t ? t.split(/[,،|/]/).map((o) => o.trim()).filter(Boolean) : [];
}
function p(r) {
  if (!r) return "";
  if (typeof r == "string") {
    const t = r.trim();
    return x(t) || t.startsWith("/") ? t : "";
  }
  if (Array.isArray(r)) {
    for (const t of r) {
      const o = p(t);
      if (o) return o;
    }
    return "";
  }
  if (typeof r == "object") {
    const t = r, o = [t.url, t.src, t.image, t.thumbnail, t.original];
    for (const e of o) {
      const n = p(e);
      if (n) return n;
    }
  }
  return "";
}
const N = l`
  :host {
    display: block;
    overflow-x: clip;
  }

  .fs-section {
    background:
      radial-gradient(
        130% 90% at 100% 0%,
        color-mix(in srgb, var(--accent-color, #c2527f) 9%, transparent),
        transparent 58%
      ),
      radial-gradient(
        120% 80% at 0% 100%,
        color-mix(in srgb, var(--accent-color, #c2527f) 6%, transparent),
        transparent 55%
      ),
      var(--section-bg, #fbf5f8);
    color: var(--text-color, #33232e);
    padding: var(--space-mobile, 28px) 0
      var(--space-mobile-bottom, var(--space-mobile, 28px));
    overflow-x: clip;
  }

  @media (min-width: 960px) {
    .fs-section {
      padding: var(--space-desktop, 48px) 0
        var(--space-desktop-bottom, var(--space-desktop, 48px));
    }
  }

  .fs-container {
    width: 100%;
    max-width: var(--section-container-max, 1440px);
    margin: 0 auto;
    padding: 0 var(--section-container-pad, 16px);
    box-sizing: border-box;
  }

  .fs-section--full .fs-container {
    max-width: none;
  }

  .fs-header {
    text-align: center;
    margin-bottom: 1.75rem;
  }

  .fs-title {
    margin: 0 0 0.6rem;
    font-size: clamp(1.4rem, 2.6vw, 1.95rem);
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--text-color, #33232e);
  }

  /* Distinct beauty motif: a soft gradient rule under the section title */
  .fs-header .fs-title::after {
    content: '';
    display: block;
    width: 54px;
    height: 3px;
    margin: 0.7rem auto 0;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      var(--accent-color, #c2527f),
      color-mix(in srgb, var(--accent-color, #c2527f) 45%, #5a2f4d)
    );
  }

  .fs-desc {
    margin: 0 auto;
    max-width: 42rem;
    color: var(--muted-color, #8f7a86);
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .fs-card {
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 85%, #fff);
    border-radius: var(--section-radius, 20px);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, #c2527f) 10%, transparent),
      0 14px 34px rgba(120, 44, 82, 0.09);
  }

  .fs-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-height: 46px;
    padding: 0.7rem 1.4rem;
    border: none;
    border-radius: 999px;
    background: linear-gradient(
      135deg,
      var(--button-bg, #c2527f),
      color-mix(in srgb, var(--button-bg, #c2527f) 62%, #5a2f4d)
    );
    color: var(--button-color, #fff);
    font: inherit;
    font-weight: 700;
    letter-spacing: 0.01em;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 8px 20px color-mix(in srgb, var(--accent-color, #c2527f) 26%, transparent);
    transition: box-shadow 0.2s ease, transform 0.2s ease, filter 0.2s ease;
    box-sizing: border-box;
  }

  .fs-btn:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
    box-shadow: 0 12px 26px color-mix(in srgb, var(--accent-color, #c2527f) 34%, transparent);
  }

  .fs-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .fs-btn--ghost {
    background: transparent;
    color: var(--accent-color, #c2527f);
    border: 1.5px solid color-mix(in srgb, var(--accent-color, #c2527f) 45%, var(--border-color, #f2dde7));
    box-shadow: none;
  }

  .fs-btn--ghost:hover {
    background: color-mix(in srgb, var(--accent-color, #c2527f) 8%, transparent);
    filter: none;
  }

  .fs-btn:focus-visible,
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--accent-color, #c2527f);
    outline-offset: 2px;
  }

  .fs-empty {
    padding: 2rem 1rem;
    text-align: center;
    color: var(--muted-color, #8f7a86);
    border: 1px dashed var(--border-color, #f2dde7);
    border-radius: var(--section-radius, 16px);
  }

  .fs-meter {
    width: 100%;
    height: 8px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 80%, transparent);
    overflow: hidden;
  }

  .fs-meter > span {
    display: block;
    height: 100%;
    background: var(--accent-color, #c2527f);
    border-radius: inherit;
    transition: width 0.45s ease;
  }

  .fs-scroll-x {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
  }

  .fs-scroll-x > * {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  .fs-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .fs-tap {
    min-height: 44px;
    min-width: 44px;
  }

  /* —— Salla theme-raed style product card —— */
  .fs-product-card {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-align: start;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 85%, transparent);
    border-radius: calc(var(--section-radius, 16px) * 0.95);
    box-shadow: 0 4px 16px rgba(43, 33, 28, 0.05);
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease,
      transform 0.25s ease;
  }

  .fs-product-card:hover {
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 30%, var(--border-color, #f2dde7));
    box-shadow: 0 18px 38px rgba(43, 33, 28, 0.12);
    transform: translateY(-4px);
  }

  .fs-product-card--selectable {
    cursor: pointer;
  }

  .fs-product-card--selectable:focus-visible {
    outline: 2px solid var(--accent-color, #c2527f);
    outline-offset: 2px;
  }

  .fs-product-card.is-selected {
    border-color: var(--accent-color, #c2527f);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, #c2527f) 32%, transparent),
      0 16px 34px rgba(43, 33, 28, 0.12);
  }

  .fs-product-card__media {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 45%, #fff);
  }

  /* soft scrim so overlays stay legible on light images */
  .fs-product-card__media::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(20, 14, 12, 0.14) 0%,
      transparent 22%,
      transparent 78%,
      rgba(20, 14, 12, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
  }

  .fs-product-card:hover .fs-product-card__media::after {
    opacity: 1;
  }

  .fs-product-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s cubic-bezier(0.2, 0.6, 0.2, 1);
  }

  .fs-product-card:hover .fs-product-card__img {
    transform: scale(1.06);
  }

  .fs-product-card__img--empty {
    background: linear-gradient(145deg, #3a2c26, #1c1613);
  }

  .fs-product-card__badge {
    position: absolute;
    top: 0.65rem;
    inset-inline-start: 0.65rem;
    z-index: 2;
    padding: 0.24rem 0.6rem;
    border-radius: 999px;
    background: linear-gradient(
      135deg,
      #d1495b,
      color-mix(in srgb, #d1495b 70%, #8b2f3d)
    );
    color: #fff;
    font-size: 0.66rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    box-shadow: 0 4px 12px rgba(160, 40, 60, 0.35);
  }

  .fs-product-card__wishlist {
    position: absolute;
    top: 0.6rem;
    inset-inline-end: 0.6rem;
    z-index: 3;
    width: 2.15rem;
    height: 2.15rem;
    display: grid;
    place-items: center;
    padding: 0;
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 70%, transparent);
    border-radius: 50%;
    background: color-mix(in srgb, var(--card-bg, #fff) 82%, transparent);
    color: var(--muted-color, #8f7a86);
    font-size: 0.98rem;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(43, 33, 28, 0.12);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    transition:
      color 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .fs-product-card__wishlist:hover {
    transform: scale(1.1);
    color: #d1495b;
    border-color: color-mix(in srgb, #d1495b 35%, var(--border-color, #f2dde7));
  }

  .fs-product-card__wishlist:active {
    transform: scale(0.94);
  }

  .fs-product-card__wishlist.is-active {
    color: #fff;
    border-color: transparent;
    background: linear-gradient(135deg, #d1495b, #b23a4a);
    animation: fs-heart-pop 0.32s ease;
  }

  @keyframes fs-heart-pop {
    0% {
      transform: scale(0.8);
    }
    55% {
      transform: scale(1.18);
    }
    100% {
      transform: scale(1);
    }
  }

  .fs-product-card__check {
    position: absolute;
    top: 0.6rem;
    inset-inline-start: 0.6rem;
    z-index: 3;
    width: 1.65rem;
    height: 1.65rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, #c2527f);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 0 6px 14px rgba(43, 33, 28, 0.22);
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .fs-product-card.is-selected .fs-product-card__check {
    opacity: 1;
    transform: scale(1);
  }

  .fs-product-card__body {
    display: flex;
    flex-direction: column;
    gap: 0.42rem;
    padding: 0.8rem 0.85rem 0.9rem;
    flex: 1 1 auto;
  }

  .fs-product-card__title {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 700;
    line-height: 1.45;
    color: var(--text-color, #33232e);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .fs-product-card__title a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .fs-product-card:hover .fs-product-card__title a {
    color: var(--accent-color, #c2527f);
  }

  .fs-product-card__subtitle {
    margin: 0;
    font-size: 0.76rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.45;
  }

  .fs-product-card__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.35rem 0.6rem;
    margin-top: auto;
    padding-top: 0.15rem;
  }

  .fs-product-card__price {
    display: inline-flex;
    align-items: baseline;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .fs-product-card__price-now {
    font-size: 1rem;
    font-weight: 800;
    color: var(--accent-color, #c2527f);
    letter-spacing: -0.01em;
  }

  .fs-product-card__price-old {
    font-size: 0.76rem;
    font-weight: 500;
    color: var(--muted-color, #8f7a86);
    text-decoration: line-through;
  }

  .fs-product-card__rating {
    display: inline-flex;
    align-items: center;
    gap: 0.22rem;
    padding: 0.15rem 0.45rem;
    border-radius: 999px;
    background: color-mix(in srgb, #f4a940 16%, var(--card-bg, #fff));
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
  }

  .fs-product-card__rating .sicon-star2 {
    color: #f4a940;
  }

  .fs-product-card__add {
    width: 100%;
    margin-top: 0.6rem;
    min-height: 42px;
    font-size: 0.85rem;
    font-weight: 700;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      transform 0.15s ease;
  }

  .fs-product-card__add:hover {
    background: var(--button-bg, #c2527f);
    color: var(--button-color, #fff);
    border-color: var(--button-bg, #c2527f);
  }

  .fs-product-card__add:active {
    transform: scale(0.98);
  }

  .fs-product-card__link {
    margin-top: 0.2rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--accent-color, #c2527f);
    text-decoration: none;
  }

  .fs-product-card__link:hover {
    text-decoration: underline;
  }

  /* —— Tablet —— */
  @media (max-width: 959px) {
    .fs-header {
      margin-bottom: 1.25rem;
    }

    .fs-title {
      font-size: clamp(1.3rem, 4vw, 1.75rem);
      line-height: 1.3;
    }

    .fs-desc {
      font-size: 0.92rem;
      line-height: 1.65;
    }

    .fs-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .fs-actions .fs-btn {
      width: 100%;
    }
  }

  /* —— Phone —— */
  @media (max-width: 639px) {
    .fs-section {
      padding: var(--space-mobile, 22px) 0
        var(--space-mobile-bottom, var(--space-mobile, 22px));
    }

    .fs-container {
      padding: 0 var(--section-container-pad-sm, 12px);
    }

    .fs-header {
      margin-bottom: 1rem;
    }

    .fs-title {
      font-size: clamp(1.2rem, 6.2vw, 1.55rem);
      line-height: 1.28;
    }

    .fs-desc {
      font-size: 0.88rem;
      line-height: 1.6;
    }

    .fs-empty {
      padding: 1.35rem 0.85rem;
      font-size: 0.88rem;
    }

    .fs-product-card__body {
      padding: 0.65rem 0.65rem 0.75rem;
      gap: 0.35rem;
    }

    .fs-product-card__title {
      font-size: 0.86rem;
    }

    .fs-product-card__price-now {
      font-size: 0.92rem;
    }

    .fs-product-card__wishlist {
      width: 1.95rem;
      height: 1.95rem;
      font-size: 0.9rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fs-btn,
    .fs-meter > span,
    * {
      scroll-behavior: auto !important;
    }

    .fs-animate,
    .fs-pulse,
    .fs-fade,
    .fs-curtain,
    .fs-celebrate,
    .fs-product-card,
    .fs-product-card__img,
    .fs-product-card__media::after,
    .fs-product-card__wishlist,
    .fs-product-card__check,
    .fs-product-card__add {
      transition: none !important;
      animation: none !important;
    }

    .fs-product-card:hover {
      transform: none;
    }

    .fs-product-card:hover .fs-product-card__img {
      transform: none;
    }
  }
`;
export {
  A as a,
  d as b,
  s as c,
  M as d,
  p as e,
  _ as f,
  f as g,
  y as h,
  a as i,
  m as j,
  z as k,
  b as l,
  S as m,
  w as n,
  v as o,
  j as p,
  $ as r,
  N as s,
  k as t
};
