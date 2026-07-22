/**
 * Mouse drag-to-scroll for horizontal overflow tracks (scroll-snap sliders).
 * Touch devices already scroll natively; this covers desktop pointers where
 * merchants expect to grab and drag banner/category tracks.
 */

const CLEANUP_KEY = '__fsDragScrollCleanup';
const DRAG_THRESHOLD_PX = 6;

type DragScrollHost = HTMLElement & {
  [CLEANUP_KEY]?: () => void;
};

export function enableDragScroll(el: HTMLElement | null | undefined): void {
  if (!el) return;
  const host = el as DragScrollHost;
  // Re-bind safely after Lit re-renders replace listeners' targets.
  host[CLEANUP_KEY]?.();

  let pointerId: number | null = null;
  let startX = 0;
  let startScrollLeft = 0;
  let dragged = false;

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    if (host.scrollWidth <= host.clientWidth) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScrollLeft = host.scrollLeft;
    dragged = false;
    host.style.scrollSnapType = 'none';
    host.style.cursor = 'grabbing';
  };

  const onPointerMove = (event: PointerEvent) => {
    if (pointerId === null || event.pointerId !== pointerId) return;
    const dx = event.clientX - startX;
    if (!dragged && Math.abs(dx) > DRAG_THRESHOLD_PX) {
      dragged = true;
      try {
        host.setPointerCapture(pointerId);
      } catch {
        /* pointer may be gone */
      }
    }
    if (dragged) {
      event.preventDefault();
      host.scrollLeft = startScrollLeft - dx;
    }
  };

  const endDrag = (event: PointerEvent) => {
    if (pointerId === null || event.pointerId !== pointerId) return;
    if (dragged) {
      try {
        host.releasePointerCapture(pointerId);
      } catch {
        /* already released */
      }
    }
    pointerId = null;
    host.style.scrollSnapType = '';
    host.style.cursor = '';
    // Swallow the click that ends a real drag so cards/links don't fire.
    if (dragged) {
      const suppressClick = (clickEvent: Event) => {
        clickEvent.preventDefault();
        clickEvent.stopPropagation();
      };
      host.addEventListener('click', suppressClick, { capture: true, once: true });
      window.setTimeout(() => {
        host.removeEventListener('click', suppressClick, { capture: true });
      }, 0);
    }
    dragged = false;
  };

  const onDragStart = (event: Event) => {
    event.preventDefault();
  };

  host.addEventListener('pointerdown', onPointerDown);
  host.addEventListener('pointermove', onPointerMove);
  host.addEventListener('pointerup', endDrag);
  host.addEventListener('pointercancel', endDrag);
  host.addEventListener('dragstart', onDragStart, { capture: true });
  host.style.touchAction = 'pan-x pan-y';
  if (host.scrollWidth > host.clientWidth) {
    host.style.cursor = 'grab';
  }

  host[CLEANUP_KEY] = () => {
    host.removeEventListener('pointerdown', onPointerDown);
    host.removeEventListener('pointermove', onPointerMove);
    host.removeEventListener('pointerup', endDrag);
    host.removeEventListener('pointercancel', endDrag);
    host.removeEventListener('dragstart', onDragStart, { capture: true });
  };
}
