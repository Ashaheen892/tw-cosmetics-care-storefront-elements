import { nothing as n, html as c } from "lit";
import { b as m, l as i, t as $, d as l } from "./sharedStyles-DKbcXBPy.js";
function h(t, r, e = {}) {
  const a = (e.href || "").trim() || m(t[`${r}result_link`] ?? t[`${r}cta_link`]) || "/", o = i(t[`${r}cta_label`], "").trim() || $("تسوق الآن", "Shop now"), s = ["fs-btn", "fs-tap", e.className || ""].filter(Boolean).join(" ");
  return c`<a
    class=${s}
    href=${a}
    target=${l(a) ? "_blank" : n}
    rel=${l(a) ? "noopener noreferrer" : n}
  >
    ${o}
  </a>`;
}
export {
  h as r
};
