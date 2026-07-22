var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
const CLEANUP_KEY = "__fsDragScrollCleanup";
function enableDragScroll(el) {
  var _a;
  if (!el) return;
  const host = el;
  (_a = host[CLEANUP_KEY]) == null || _a.call(host);
  let pointerId = null, startX = 0, startScrollLeft = 0, dragged = !1;
  const onPointerDown = /* @__PURE__ */ __name((event) => {
    event.pointerType !== "mouse" || event.button !== 0 || host.scrollWidth <= host.clientWidth || (pointerId = event.pointerId, startX = event.clientX, startScrollLeft = host.scrollLeft, dragged = !1, host.style.scrollSnapType = "none", host.style.cursor = "grabbing");
  }, "onPointerDown"), onPointerMove = /* @__PURE__ */ __name((event) => {
    if (pointerId === null || event.pointerId !== pointerId) return;
    const dx = event.clientX - startX;
    if (!dragged && Math.abs(dx) > 6) {
      dragged = !0;
      try {
        host.setPointerCapture(pointerId);
      } catch {
      }
    }
    dragged && (event.preventDefault(), host.scrollLeft = startScrollLeft - dx);
  }, "onPointerMove"), endDrag = /* @__PURE__ */ __name((event) => {
    if (!(pointerId === null || event.pointerId !== pointerId)) {
      if (dragged)
        try {
          host.releasePointerCapture(pointerId);
        } catch {
        }
      if (pointerId = null, host.style.scrollSnapType = "", host.style.cursor = "", dragged) {
        const suppressClick = /* @__PURE__ */ __name((clickEvent) => {
          clickEvent.preventDefault(), clickEvent.stopPropagation();
        }, "suppressClick");
        host.addEventListener("click", suppressClick, { capture: !0, once: !0 }), window.setTimeout(() => {
          host.removeEventListener("click", suppressClick, { capture: !0 });
        }, 0);
      }
      dragged = !1;
    }
  }, "endDrag"), onDragStart = /* @__PURE__ */ __name((event) => {
    event.preventDefault();
  }, "onDragStart");
  host.addEventListener("pointerdown", onPointerDown), host.addEventListener("pointermove", onPointerMove), host.addEventListener("pointerup", endDrag), host.addEventListener("pointercancel", endDrag), host.addEventListener("dragstart", onDragStart, { capture: !0 }), host.style.touchAction = "pan-x pan-y", host.scrollWidth > host.clientWidth && (host.style.cursor = "grab"), host[CLEANUP_KEY] = () => {
    host.removeEventListener("pointerdown", onPointerDown), host.removeEventListener("pointermove", onPointerMove), host.removeEventListener("pointerup", endDrag), host.removeEventListener("pointercancel", endDrag), host.removeEventListener("dragstart", onDragStart, { capture: !0 });
  };
}
__name(enableDragScroll, "enableDragScroll");
export {
  enableDragScroll as e
};
