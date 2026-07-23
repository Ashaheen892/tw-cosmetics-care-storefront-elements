var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
function getPageLocale() {
  var _a, _b, _c;
  try {
    const sallaLocale = typeof Salla < "u" ? (_b = (_a = Salla == null ? void 0 : Salla.lang) == null ? void 0 : _a.getLocale) == null ? void 0 : _b.call(_a) : void 0, htmlLocale = (_c = document.documentElement.lang) == null ? void 0 : _c.split("-")[0];
    return String(sallaLocale || htmlLocale || "ar").toLowerCase();
  } catch {
    return "ar";
  }
}
__name(getPageLocale, "getPageLocale");
function localizedString(value, fallback = "") {
  if (value == null)
    return fallback;
  if (typeof value == "string")
    return value.trim() || fallback;
  if (typeof value == "number")
    return String(value);
  if (typeof value == "object") {
    const obj = value, candidates = [getPageLocale(), "ar", "en", ...Object.keys(obj)];
    for (const key of candidates) {
      const v = obj[key];
      if (typeof v == "string" && v.trim())
        return v.trim();
    }
  }
  return fallback;
}
__name(localizedString, "localizedString");
export {
  getPageLocale as g,
  localizedString as l
};
