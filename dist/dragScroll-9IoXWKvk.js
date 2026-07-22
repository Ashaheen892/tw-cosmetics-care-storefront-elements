const v = "__fsDragScrollCleanup";
function L(s) {
  var d;
  if (!s) return;
  const e = s;
  (d = e[v]) == null || d.call(e);
  let r = null, l = 0, a = 0, n = !1;
  const c = (t) => {
    t.pointerType !== "mouse" || t.button !== 0 || e.scrollWidth <= e.clientWidth || (r = t.pointerId, l = t.clientX, a = e.scrollLeft, n = !1, e.style.scrollSnapType = "none", e.style.cursor = "grabbing");
  }, p = (t) => {
    if (r === null || t.pointerId !== r) return;
    const o = t.clientX - l;
    if (!n && Math.abs(o) > 6) {
      n = !0;
      try {
        e.setPointerCapture(r);
      } catch {
      }
    }
    n && (t.preventDefault(), e.scrollLeft = a - o);
  }, i = (t) => {
    if (!(r === null || t.pointerId !== r)) {
      if (n)
        try {
          e.releasePointerCapture(r);
        } catch {
        }
      if (r = null, e.style.scrollSnapType = "", e.style.cursor = "", n) {
        const o = (f) => {
          f.preventDefault(), f.stopPropagation();
        };
        e.addEventListener("click", o, { capture: !0, once: !0 }), window.setTimeout(() => {
          e.removeEventListener("click", o, { capture: !0 });
        }, 0);
      }
      n = !1;
    }
  }, u = (t) => {
    t.preventDefault();
  };
  e.addEventListener("pointerdown", c), e.addEventListener("pointermove", p), e.addEventListener("pointerup", i), e.addEventListener("pointercancel", i), e.addEventListener("dragstart", u, { capture: !0 }), e.style.touchAction = "pan-x pan-y", e.scrollWidth > e.clientWidth && (e.style.cursor = "grab"), e[v] = () => {
    e.removeEventListener("pointerdown", c), e.removeEventListener("pointermove", p), e.removeEventListener("pointerup", i), e.removeEventListener("pointercancel", i), e.removeEventListener("dragstart", u, { capture: !0 });
  };
}
export {
  L as e
};
