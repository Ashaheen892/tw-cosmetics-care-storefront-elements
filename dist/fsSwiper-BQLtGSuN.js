var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { unsafeCSS } from "lit";
function isObject$1(obj) {
  return obj !== null && typeof obj == "object" && "constructor" in obj && obj.constructor === Object;
}
__name(isObject$1, "isObject$1");
function extend$1(target, src) {
  target === void 0 && (target = {}), src === void 0 && (src = {});
  const noExtend = ["__proto__", "constructor", "prototype"];
  Object.keys(src).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
    typeof target[key] > "u" ? target[key] = src[key] : isObject$1(src[key]) && isObject$1(target[key]) && Object.keys(src[key]).length > 0 && extend$1(target[key], src[key]);
  });
}
__name(extend$1, "extend$1");
const ssrDocument = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function getDocument() {
  const doc = typeof document < "u" ? document : {};
  return extend$1(doc, ssrDocument), doc;
}
__name(getDocument, "getDocument");
const ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: /* @__PURE__ */ __name(function() {
    return this;
  }, "CustomEvent"),
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(callback) {
    return typeof setTimeout > "u" ? (callback(), null) : setTimeout(callback, 0);
  },
  cancelAnimationFrame(id) {
    typeof setTimeout > "u" || clearTimeout(id);
  }
};
function getWindow() {
  const win = typeof window < "u" ? window : {};
  return extend$1(win, ssrWindow), win;
}
__name(getWindow, "getWindow");
function classesToTokens(classes2) {
  return classes2 === void 0 && (classes2 = ""), classes2.trim().split(" ").filter((c) => !!c.trim());
}
__name(classesToTokens, "classesToTokens");
function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach((key) => {
    try {
      object[key] = null;
    } catch {
    }
    try {
      delete object[key];
    } catch {
    }
  });
}
__name(deleteProps, "deleteProps");
function nextTick(callback, delay) {
  return delay === void 0 && (delay = 0), setTimeout(callback, delay);
}
__name(nextTick, "nextTick");
function now() {
  return Date.now();
}
__name(now, "now");
function getComputedStyle$1(el) {
  const window2 = getWindow();
  let style;
  return window2.getComputedStyle && (style = window2.getComputedStyle(el, null)), !style && el.currentStyle && (style = el.currentStyle), style || (style = el.style), style;
}
__name(getComputedStyle$1, "getComputedStyle$1");
function getTranslate(el, axis) {
  axis === void 0 && (axis = "x");
  const window2 = getWindow();
  let matrix, curTransform, transformMatrix;
  const curStyle = getComputedStyle$1(el);
  return window2.WebKitCSSMatrix ? (curTransform = curStyle.transform || curStyle.webkitTransform, curTransform.split(",").length > 6 && (curTransform = curTransform.split(", ").map((a) => a.replace(",", ".")).join(", ")), transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform)) : (transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), matrix = transformMatrix.toString().split(",")), axis === "x" && (window2.WebKitCSSMatrix ? curTransform = transformMatrix.m41 : matrix.length === 16 ? curTransform = parseFloat(matrix[12]) : curTransform = parseFloat(matrix[4])), axis === "y" && (window2.WebKitCSSMatrix ? curTransform = transformMatrix.m42 : matrix.length === 16 ? curTransform = parseFloat(matrix[13]) : curTransform = parseFloat(matrix[5])), curTransform || 0;
}
__name(getTranslate, "getTranslate");
function isObject(o) {
  return typeof o == "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
__name(isObject, "isObject");
function isNode(node) {
  return typeof window < "u" && typeof window.HTMLElement < "u" ? node instanceof HTMLElement : node && (node.nodeType === 1 || node.nodeType === 11);
}
__name(isNode, "isNode");
function extend() {
  const to = Object(arguments.length <= 0 ? void 0 : arguments[0]), noExtend = ["__proto__", "constructor", "prototype"];
  for (let i = 1; i < arguments.length; i += 1) {
    const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
    if (nextSource != null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex], desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        desc !== void 0 && desc.enumerable && (isObject(to[nextKey]) && isObject(nextSource[nextKey]) ? nextSource[nextKey].__swiper__ ? to[nextKey] = nextSource[nextKey] : extend(to[nextKey], nextSource[nextKey]) : !isObject(to[nextKey]) && isObject(nextSource[nextKey]) ? (to[nextKey] = {}, nextSource[nextKey].__swiper__ ? to[nextKey] = nextSource[nextKey] : extend(to[nextKey], nextSource[nextKey])) : to[nextKey] = nextSource[nextKey]);
      }
    }
  }
  return to;
}
__name(extend, "extend");
function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
}
__name(setCSSProperty, "setCSSProperty");
function animateCSSModeScroll(_ref) {
  let {
    swiper,
    targetPosition,
    side
  } = _ref;
  const window2 = getWindow(), startPosition = -swiper.translate;
  let startTime = null, time;
  const duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = "none", window2.cancelAnimationFrame(swiper.cssModeFrameID);
  const dir = targetPosition > startPosition ? "next" : "prev", isOutOfBound = /* @__PURE__ */ __name((current, target) => dir === "next" && current >= target || dir === "prev" && current <= target, "isOutOfBound"), animate = /* @__PURE__ */ __name(() => {
    time = (/* @__PURE__ */ new Date()).getTime(), startTime === null && (startTime = time);
    const progress = Math.max(Math.min((time - startTime) / duration, 1), 0), easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition) && (currentPosition = targetPosition), swiper.wrapperEl.scrollTo({
      [side]: currentPosition
    }), isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = "hidden", swiper.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        swiper.wrapperEl.style.overflow = "", swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });
      }), window2.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window2.requestAnimationFrame(animate);
  }, "animate");
  animate();
}
__name(animateCSSModeScroll, "animateCSSModeScroll");
function elementChildren(element, selector) {
  selector === void 0 && (selector = "");
  const window2 = getWindow(), children = [...element.children];
  return window2.HTMLSlotElement && element instanceof HTMLSlotElement && children.push(...element.assignedElements()), selector ? children.filter((el) => el.matches(selector)) : children;
}
__name(elementChildren, "elementChildren");
function elementIsChildOfSlot(el, slot) {
  const elementsQueue = [slot];
  for (; elementsQueue.length > 0; ) {
    const elementToCheck = elementsQueue.shift();
    if (el === elementToCheck)
      return !0;
    elementsQueue.push(...elementToCheck.children, ...elementToCheck.shadowRoot ? elementToCheck.shadowRoot.children : [], ...elementToCheck.assignedElements ? elementToCheck.assignedElements() : []);
  }
}
__name(elementIsChildOfSlot, "elementIsChildOfSlot");
function elementIsChildOf(el, parent) {
  const window2 = getWindow();
  let isChild = parent.contains(el);
  return !isChild && window2.HTMLSlotElement && parent instanceof HTMLSlotElement && (isChild = [...parent.assignedElements()].includes(el), isChild || (isChild = elementIsChildOfSlot(el, parent))), isChild;
}
__name(elementIsChildOf, "elementIsChildOf");
function showWarning(text) {
  try {
    console.warn(text);
    return;
  } catch {
  }
}
__name(showWarning, "showWarning");
function createElement(tag, classes2) {
  classes2 === void 0 && (classes2 = []);
  const el = document.createElement(tag);
  return el.classList.add(...Array.isArray(classes2) ? classes2 : classesToTokens(classes2)), el;
}
__name(createElement, "createElement");
function elementPrevAll(el, selector) {
  const prevEls = [];
  for (; el.previousElementSibling; ) {
    const prev = el.previousElementSibling;
    selector ? prev.matches(selector) && prevEls.push(prev) : prevEls.push(prev), el = prev;
  }
  return prevEls;
}
__name(elementPrevAll, "elementPrevAll");
function elementNextAll(el, selector) {
  const nextEls = [];
  for (; el.nextElementSibling; ) {
    const next = el.nextElementSibling;
    selector ? next.matches(selector) && nextEls.push(next) : nextEls.push(next), el = next;
  }
  return nextEls;
}
__name(elementNextAll, "elementNextAll");
function elementStyle(el, prop) {
  return getWindow().getComputedStyle(el, null).getPropertyValue(prop);
}
__name(elementStyle, "elementStyle");
function elementIndex(el) {
  let child = el, i;
  if (child) {
    for (i = 0; (child = child.previousSibling) !== null; )
      child.nodeType === 1 && (i += 1);
    return i;
  }
}
__name(elementIndex, "elementIndex");
function elementParents(el, selector) {
  const parents = [];
  let parent = el.parentElement;
  for (; parent; )
    selector ? parent.matches(selector) && parents.push(parent) : parents.push(parent), parent = parent.parentElement;
  return parents;
}
__name(elementParents, "elementParents");
function elementOuterSize(el, size, includeMargins) {
  const window2 = getWindow();
  return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
}
__name(elementOuterSize, "elementOuterSize");
function makeElementsArray(el) {
  return (Array.isArray(el) ? el : [el]).filter((e) => !!e);
}
__name(makeElementsArray, "makeElementsArray");
function setInnerHTML(el, html) {
  html === void 0 && (html = ""), typeof trustedTypes < "u" ? el.innerHTML = trustedTypes.createPolicy("html", {
    createHTML: /* @__PURE__ */ __name((s) => s, "createHTML")
  }).createHTML(html) : el.innerHTML = html;
}
__name(setInnerHTML, "setInnerHTML");
let support;
function calcSupport() {
  const window2 = getWindow(), document2 = getDocument();
  return {
    smoothScroll: document2.documentElement && document2.documentElement.style && "scrollBehavior" in document2.documentElement.style,
    touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
  };
}
__name(calcSupport, "calcSupport");
function getSupport() {
  return support || (support = calcSupport()), support;
}
__name(getSupport, "getSupport");
let deviceCached;
function calcDevice(_temp) {
  let {
    userAgent
  } = _temp === void 0 ? {} : _temp;
  const support2 = getSupport(), window2 = getWindow(), platform = window2.navigator.platform, ua = userAgent || window2.navigator.userAgent, device = {
    ios: !1,
    android: !1
  }, screenWidth = window2.screen.width, screenHeight = window2.screen.height, android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/), iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/), windows = platform === "Win32";
  let macos = platform === "MacIntel";
  const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  return !ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0 && (ipad = ua.match(/(Version)\/([\d.]+)/), ipad || (ipad = [0, 1, "13_0_0"]), macos = !1), android && !windows && (device.os = "android", device.android = !0), (ipad || iphone || ipod) && (device.os = "ios", device.ios = !0), device;
}
__name(calcDevice, "calcDevice");
function getDevice(overrides) {
  return overrides === void 0 && (overrides = {}), deviceCached || (deviceCached = calcDevice(overrides)), deviceCached;
}
__name(getDevice, "getDevice");
let browser;
function calcBrowser() {
  const window2 = getWindow(), device = getDevice();
  let needPerspectiveFix = !1;
  function isSafari() {
    const ua = window2.navigator.userAgent.toLowerCase();
    return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
  }
  if (__name(isSafari, "isSafari"), isSafari()) {
    const ua = String(window2.navigator.userAgent);
    if (ua.includes("Version/")) {
      const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
      needPerspectiveFix = major < 16 || major === 16 && minor < 2;
    }
  }
  const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent), isSafariBrowser = isSafari(), need3dFix = isSafariBrowser || isWebView && device.ios;
  return {
    isSafari: needPerspectiveFix || isSafariBrowser,
    needPerspectiveFix,
    need3dFix,
    isWebView
  };
}
__name(calcBrowser, "calcBrowser");
function getBrowser() {
  return browser || (browser = calcBrowser()), browser;
}
__name(getBrowser, "getBrowser");
function Resize(_ref) {
  let {
    swiper,
    on,
    emit
  } = _ref;
  const window2 = getWindow();
  let observer = null, animationFrame = null;
  const resizeHandler = /* @__PURE__ */ __name(() => {
    !swiper || swiper.destroyed || !swiper.initialized || (emit("beforeResize"), emit("resize"));
  }, "resizeHandler"), createObserver = /* @__PURE__ */ __name(() => {
    !swiper || swiper.destroyed || !swiper.initialized || (observer = new ResizeObserver((entries) => {
      animationFrame = window2.requestAnimationFrame(() => {
        const {
          width,
          height
        } = swiper;
        let newWidth = width, newHeight = height;
        entries.forEach((_ref2) => {
          let {
            contentBoxSize,
            contentRect,
            target
          } = _ref2;
          target && target !== swiper.el || (newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize, newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize);
        }), (newWidth !== width || newHeight !== height) && resizeHandler();
      });
    }), observer.observe(swiper.el));
  }, "createObserver"), removeObserver = /* @__PURE__ */ __name(() => {
    animationFrame && window2.cancelAnimationFrame(animationFrame), observer && observer.unobserve && swiper.el && (observer.unobserve(swiper.el), observer = null);
  }, "removeObserver"), orientationChangeHandler = /* @__PURE__ */ __name(() => {
    !swiper || swiper.destroyed || !swiper.initialized || emit("orientationchange");
  }, "orientationChangeHandler");
  on("init", () => {
    if (swiper.params.resizeObserver && typeof window2.ResizeObserver < "u") {
      createObserver();
      return;
    }
    window2.addEventListener("resize", resizeHandler), window2.addEventListener("orientationchange", orientationChangeHandler);
  }), on("destroy", () => {
    removeObserver(), window2.removeEventListener("resize", resizeHandler), window2.removeEventListener("orientationchange", orientationChangeHandler);
  });
}
__name(Resize, "Resize");
function Observer(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  const observers = [], window2 = getWindow(), attach = /* @__PURE__ */ __name(function(target, options) {
    options === void 0 && (options = {});
    const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver, observer = new ObserverFunc((mutations) => {
      if (swiper.__preventObserver__) return;
      if (mutations.length === 1) {
        emit("observerUpdate", mutations[0]);
        return;
      }
      const observerUpdate = /* @__PURE__ */ __name(function() {
        emit("observerUpdate", mutations[0]);
      }, "observerUpdate");
      window2.requestAnimationFrame ? window2.requestAnimationFrame(observerUpdate) : window2.setTimeout(observerUpdate, 0);
    });
    observer.observe(target, {
      attributes: typeof options.attributes > "u" ? !0 : options.attributes,
      childList: swiper.isElement || (typeof options.childList > "u" ? !0 : options).childList,
      characterData: typeof options.characterData > "u" ? !0 : options.characterData
    }), observers.push(observer);
  }, "attach"), init = /* @__PURE__ */ __name(() => {
    if (swiper.params.observer) {
      if (swiper.params.observeParents) {
        const containerParents = elementParents(swiper.hostEl);
        for (let i = 0; i < containerParents.length; i += 1)
          attach(containerParents[i]);
      }
      attach(swiper.hostEl, {
        childList: swiper.params.observeSlideChildren
      }), attach(swiper.wrapperEl, {
        attributes: !1
      });
    }
  }, "init"), destroy = /* @__PURE__ */ __name(() => {
    observers.forEach((observer) => {
      observer.disconnect();
    }), observers.splice(0, observers.length);
  }, "destroy");
  extendParams({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), on("init", init), on("destroy", destroy);
}
__name(Observer, "Observer");
var eventsEmitter = {
  on(events2, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed || typeof handler != "function") return self;
    const method = priority ? "unshift" : "push";
    return events2.split(" ").forEach((event) => {
      self.eventsListeners[event] || (self.eventsListeners[event] = []), self.eventsListeners[event][method](handler);
    }), self;
  },
  once(events2, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed || typeof handler != "function") return self;
    function onceHandler() {
      self.off(events2, onceHandler), onceHandler.__emitterProxy && delete onceHandler.__emitterProxy;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)
        args[_key] = arguments[_key];
      handler.apply(self, args);
    }
    return __name(onceHandler, "onceHandler"), onceHandler.__emitterProxy = handler, self.on(events2, onceHandler, priority);
  },
  onAny(handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed || typeof handler != "function") return self;
    const method = priority ? "unshift" : "push";
    return self.eventsAnyListeners.indexOf(handler) < 0 && self.eventsAnyListeners[method](handler), self;
  },
  offAny(handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed || !self.eventsAnyListeners) return self;
    const index = self.eventsAnyListeners.indexOf(handler);
    return index >= 0 && self.eventsAnyListeners.splice(index, 1), self;
  },
  off(events2, handler) {
    const self = this;
    return !self.eventsListeners || self.destroyed || !self.eventsListeners || events2.split(" ").forEach((event) => {
      typeof handler > "u" ? self.eventsListeners[event] = [] : self.eventsListeners[event] && self.eventsListeners[event].forEach((eventHandler, index) => {
        (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) && self.eventsListeners[event].splice(index, 1);
      });
    }), self;
  },
  emit() {
    const self = this;
    if (!self.eventsListeners || self.destroyed || !self.eventsListeners) return self;
    let events2, data, context;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
      args[_key2] = arguments[_key2];
    return typeof args[0] == "string" || Array.isArray(args[0]) ? (events2 = args[0], data = args.slice(1, args.length), context = self) : (events2 = args[0].events, data = args[0].data, context = args[0].context || self), data.unshift(context), (Array.isArray(events2) ? events2 : events2.split(" ")).forEach((event) => {
      self.eventsAnyListeners && self.eventsAnyListeners.length && self.eventsAnyListeners.forEach((eventHandler) => {
        eventHandler.apply(context, [event, ...data]);
      }), self.eventsListeners && self.eventsListeners[event] && self.eventsListeners[event].forEach((eventHandler) => {
        eventHandler.apply(context, data);
      });
    }), self;
  }
};
function updateSize() {
  const swiper = this;
  let width, height;
  const el = swiper.el;
  typeof swiper.params.width < "u" && swiper.params.width !== null ? width = swiper.params.width : width = el.clientWidth, typeof swiper.params.height < "u" && swiper.params.height !== null ? height = swiper.params.height : height = el.clientHeight, !(width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) && (width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10), height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10), Number.isNaN(width) && (width = 0), Number.isNaN(height) && (height = 0), Object.assign(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height
  }));
}
__name(updateSize, "updateSize");
function updateSlides() {
  const swiper = this;
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
  }
  __name(getDirectionPropertyValue, "getDirectionPropertyValue");
  const params = swiper.params, {
    wrapperEl,
    slidesEl,
    size: swiperSize,
    rtlTranslate: rtl,
    wrongRTL
  } = swiper, isVirtual = swiper.virtual && params.virtual.enabled, previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length, slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`), slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [], slidesSizesGrid = [];
  let offsetBefore = params.slidesOffsetBefore;
  typeof offsetBefore == "function" && (offsetBefore = params.slidesOffsetBefore.call(swiper));
  let offsetAfter = params.slidesOffsetAfter;
  typeof offsetAfter == "function" && (offsetAfter = params.slidesOffsetAfter.call(swiper));
  const previousSnapGridLength = swiper.snapGrid.length, previousSlidesGridLength = swiper.slidesGrid.length;
  let spaceBetween = params.spaceBetween, slidePosition = -offsetBefore, prevSlideSize = 0, index = 0;
  if (typeof swiperSize > "u")
    return;
  typeof spaceBetween == "string" && spaceBetween.indexOf("%") >= 0 ? spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize : typeof spaceBetween == "string" && (spaceBetween = parseFloat(spaceBetween)), swiper.virtualSize = -spaceBetween, slides.forEach((slideEl) => {
    rtl ? slideEl.style.marginLeft = "" : slideEl.style.marginRight = "", slideEl.style.marginBottom = "", slideEl.style.marginTop = "";
  }), params.centeredSlides && params.cssMode && (setCSSProperty(wrapperEl, "--swiper-centered-offset-before", ""), setCSSProperty(wrapperEl, "--swiper-centered-offset-after", ""));
  const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  gridEnabled ? swiper.grid.initSlides(slides) : swiper.grid && swiper.grid.unsetSlides();
  let slideSize;
  const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => typeof params.breakpoints[key].slidesPerView < "u").length > 0;
  for (let i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    let slide2;
    if (slides[i] && (slide2 = slides[i]), gridEnabled && swiper.grid.updateSlide(i, slide2, slides), !(slides[i] && elementStyle(slide2, "display") === "none")) {
      if (params.slidesPerView === "auto") {
        shouldResetSlideSize && (slides[i].style[swiper.getDirectionLabel("width")] = "");
        const slideStyles = getComputedStyle(slide2), currentTransform = slide2.style.transform, currentWebKitTransform = slide2.style.webkitTransform;
        if (currentTransform && (slide2.style.transform = "none"), currentWebKitTransform && (slide2.style.webkitTransform = "none"), params.roundLengths)
          slideSize = swiper.isHorizontal() ? elementOuterSize(slide2, "width") : elementOuterSize(slide2, "height");
        else {
          const width = getDirectionPropertyValue(slideStyles, "width"), paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left"), paddingRight = getDirectionPropertyValue(slideStyles, "padding-right"), marginLeft = getDirectionPropertyValue(slideStyles, "margin-left"), marginRight = getDirectionPropertyValue(slideStyles, "margin-right"), boxSizing = slideStyles.getPropertyValue("box-sizing");
          if (boxSizing && boxSizing === "border-box")
            slideSize = width + marginLeft + marginRight;
          else {
            const {
              clientWidth,
              offsetWidth
            } = slide2;
            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
          }
        }
        currentTransform && (slide2.style.transform = currentTransform), currentWebKitTransform && (slide2.style.webkitTransform = currentWebKitTransform), params.roundLengths && (slideSize = Math.floor(slideSize));
      } else
        slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView, params.roundLengths && (slideSize = Math.floor(slideSize)), slides[i] && (slides[i].style[swiper.getDirectionLabel("width")] = `${slideSize}px`);
      slides[i] && (slides[i].swiperSlideSize = slideSize), slidesSizesGrid.push(slideSize), params.centeredSlides ? (slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween, prevSlideSize === 0 && i !== 0 && (slidePosition = slidePosition - swiperSize / 2 - spaceBetween), i === 0 && (slidePosition = slidePosition - swiperSize / 2 - spaceBetween), Math.abs(slidePosition) < 1 / 1e3 && (slidePosition = 0), params.roundLengths && (slidePosition = Math.floor(slidePosition)), index % params.slidesPerGroup === 0 && snapGrid.push(slidePosition), slidesGrid.push(slidePosition)) : (params.roundLengths && (slidePosition = Math.floor(slidePosition)), (index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0 && snapGrid.push(slidePosition), slidesGrid.push(slidePosition), slidePosition = slidePosition + slideSize + spaceBetween), swiper.virtualSize += slideSize + spaceBetween, prevSlideSize = slideSize, index += 1;
    }
  }
  if (swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter, rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow") && (wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`), params.setWrapperSize && (wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`), gridEnabled && swiper.grid.updateWrapperSize(slideSize, snapGrid), !params.centeredSlides) {
    const newSlidesGrid = [];
    for (let i = 0; i < snapGrid.length; i += 1) {
      let slidesGridItem = snapGrid[i];
      params.roundLengths && (slidesGridItem = Math.floor(slidesGridItem)), snapGrid[i] <= swiper.virtualSize - swiperSize && newSlidesGrid.push(slidesGridItem);
    }
    snapGrid = newSlidesGrid, Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1 && snapGrid.push(swiper.virtualSize - swiperSize);
  }
  if (isVirtual && params.loop) {
    const size = slidesSizesGrid[0] + spaceBetween;
    if (params.slidesPerGroup > 1) {
      const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup), groupSize = size * params.slidesPerGroup;
      for (let i = 0; i < groups; i += 1)
        snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
    }
    for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1)
      params.slidesPerGroup === 1 && snapGrid.push(snapGrid[snapGrid.length - 1] + size), slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size), swiper.virtualSize += size;
  }
  if (snapGrid.length === 0 && (snapGrid = [0]), spaceBetween !== 0) {
    const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
    slides.filter((_, slideIndex) => !params.cssMode || params.loop ? !0 : slideIndex !== slides.length - 1).forEach((slideEl) => {
      slideEl.style[key] = `${spaceBetween}px`;
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    }), allSlidesSize -= spaceBetween;
    const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
    snapGrid = snapGrid.map((snap) => snap <= 0 ? -offsetBefore : snap > maxSnap ? maxSnap + offsetAfter : snap);
  }
  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    }), allSlidesSize -= spaceBetween;
    const offsetSize = (params.slidesOffsetBefore || 0) + (params.slidesOffsetAfter || 0);
    if (allSlidesSize + offsetSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      }), slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  if (Object.assign(swiper, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid
  }), params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`), setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
    const addToSnapGrid = -swiper.snapGrid[0], addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid), swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
  }
  if (slidesLength !== previousSlidesLength && swiper.emit("slidesLengthChange"), snapGrid.length !== previousSnapGridLength && (swiper.params.watchOverflow && swiper.checkOverflow(), swiper.emit("snapGridLengthChange")), slidesGrid.length !== previousSlidesGridLength && swiper.emit("slidesGridLengthChange"), params.watchSlidesProgress && swiper.updateSlidesOffset(), swiper.emit("slidesUpdated"), !isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`, hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
    slidesLength <= params.maxBackfaceHiddenSlides ? hasClassBackfaceClassAdded || swiper.el.classList.add(backFaceHiddenClass) : hasClassBackfaceClassAdded && swiper.el.classList.remove(backFaceHiddenClass);
  }
}
__name(updateSlides, "updateSlides");
function updateAutoHeight(speed) {
  const swiper = this, activeSlides = [], isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  let newHeight = 0, i;
  typeof speed == "number" ? swiper.setTransition(speed) : speed === !0 && swiper.setTransition(swiper.params.speed);
  const getSlideByIndex = /* @__PURE__ */ __name((index) => isVirtual ? swiper.slides[swiper.getSlideIndexByData(index)] : swiper.slides[index], "getSlideByIndex");
  if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1)
    if (swiper.params.centeredSlides)
      (swiper.visibleSlides || []).forEach((slide2) => {
        activeSlides.push(slide2);
      });
    else
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        const index = swiper.activeIndex + i;
        if (index > swiper.slides.length && !isVirtual) break;
        activeSlides.push(getSlideByIndex(index));
      }
  else
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  for (i = 0; i < activeSlides.length; i += 1)
    if (typeof activeSlides[i] < "u") {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  (newHeight || newHeight === 0) && (swiper.wrapperEl.style.height = `${newHeight}px`);
}
__name(updateAutoHeight, "updateAutoHeight");
function updateSlidesOffset() {
  const swiper = this, slides = swiper.slides, minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
  for (let i = 0; i < slides.length; i += 1)
    slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
}
__name(updateSlidesOffset, "updateSlidesOffset");
const toggleSlideClasses$1 = /* @__PURE__ */ __name((slideEl, condition, className) => {
  condition && !slideEl.classList.contains(className) ? slideEl.classList.add(className) : !condition && slideEl.classList.contains(className) && slideEl.classList.remove(className);
}, "toggleSlideClasses$1");
function updateSlidesProgress(translate2) {
  translate2 === void 0 && (translate2 = this && this.translate || 0);
  const swiper = this, params = swiper.params, {
    slides,
    rtlTranslate: rtl,
    snapGrid
  } = swiper;
  if (slides.length === 0) return;
  typeof slides[0].swiperSlideOffset > "u" && swiper.updateSlidesOffset();
  let offsetCenter = -translate2;
  rtl && (offsetCenter = translate2), swiper.visibleSlidesIndexes = [], swiper.visibleSlides = [];
  let spaceBetween = params.spaceBetween;
  typeof spaceBetween == "string" && spaceBetween.indexOf("%") >= 0 ? spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size : typeof spaceBetween == "string" && (spaceBetween = parseFloat(spaceBetween));
  for (let i = 0; i < slides.length; i += 1) {
    const slide2 = slides[i];
    let slideOffset = slide2.swiperSlideOffset;
    params.cssMode && params.centeredSlides && (slideOffset -= slides[0].swiperSlideOffset);
    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween), originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween), slideBefore = -(offsetCenter - slideOffset), slideAfter = slideBefore + swiper.slidesSizesGrid[i], isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i], isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    isVisible && (swiper.visibleSlides.push(slide2), swiper.visibleSlidesIndexes.push(i)), toggleSlideClasses$1(slide2, isVisible, params.slideVisibleClass), toggleSlideClasses$1(slide2, isFullyVisible, params.slideFullyVisibleClass), slide2.progress = rtl ? -slideProgress : slideProgress, slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}
__name(updateSlidesProgress, "updateSlidesProgress");
function updateProgress(translate2) {
  const swiper = this;
  if (typeof translate2 > "u") {
    const multiplier = swiper.rtlTranslate ? -1 : 1;
    translate2 = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  const params = swiper.params, translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  let {
    progress,
    isBeginning,
    isEnd,
    progressLoop
  } = swiper;
  const wasBeginning = isBeginning, wasEnd = isEnd;
  if (translatesDiff === 0)
    progress = 0, isBeginning = !0, isEnd = !0;
  else {
    progress = (translate2 - swiper.minTranslate()) / translatesDiff;
    const isBeginningRounded = Math.abs(translate2 - swiper.minTranslate()) < 1, isEndRounded = Math.abs(translate2 - swiper.maxTranslate()) < 1;
    isBeginning = isBeginningRounded || progress <= 0, isEnd = isEndRounded || progress >= 1, isBeginningRounded && (progress = 0), isEndRounded && (progress = 1);
  }
  if (params.loop) {
    const firstSlideIndex = swiper.getSlideIndexByData(0), lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1), firstSlideTranslate = swiper.slidesGrid[firstSlideIndex], lastSlideTranslate = swiper.slidesGrid[lastSlideIndex], translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1], translateAbs = Math.abs(translate2);
    translateAbs >= firstSlideTranslate ? progressLoop = (translateAbs - firstSlideTranslate) / translateMax : progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax, progressLoop > 1 && (progressLoop -= 1);
  }
  Object.assign(swiper, {
    progress,
    progressLoop,
    isBeginning,
    isEnd
  }), (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) && swiper.updateSlidesProgress(translate2), isBeginning && !wasBeginning && swiper.emit("reachBeginning toEdge"), isEnd && !wasEnd && swiper.emit("reachEnd toEdge"), (wasBeginning && !isBeginning || wasEnd && !isEnd) && swiper.emit("fromEdge"), swiper.emit("progress", progress);
}
__name(updateProgress, "updateProgress");
const toggleSlideClasses = /* @__PURE__ */ __name((slideEl, condition, className) => {
  condition && !slideEl.classList.contains(className) ? slideEl.classList.add(className) : !condition && slideEl.classList.contains(className) && slideEl.classList.remove(className);
}, "toggleSlideClasses");
function updateSlidesClasses() {
  const swiper = this, {
    slides,
    params,
    slidesEl,
    activeIndex
  } = swiper, isVirtual = swiper.virtual && params.virtual.enabled, gridEnabled = swiper.grid && params.grid && params.grid.rows > 1, getFilteredSlide = /* @__PURE__ */ __name((selector) => elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0], "getFilteredSlide");
  let activeSlide, prevSlide, nextSlide;
  if (isVirtual)
    if (params.loop) {
      let slideIndex = activeIndex - swiper.virtual.slidesBefore;
      slideIndex < 0 && (slideIndex = swiper.virtual.slides.length + slideIndex), slideIndex >= swiper.virtual.slides.length && (slideIndex -= swiper.virtual.slides.length), activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
    } else
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
  else
    gridEnabled ? (activeSlide = slides.find((slideEl) => slideEl.column === activeIndex), nextSlide = slides.find((slideEl) => slideEl.column === activeIndex + 1), prevSlide = slides.find((slideEl) => slideEl.column === activeIndex - 1)) : activeSlide = slides[activeIndex];
  activeSlide && (gridEnabled || (nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0], params.loop && !nextSlide && (nextSlide = slides[0]), prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0], params.loop && !prevSlide === 0 && (prevSlide = slides[slides.length - 1]))), slides.forEach((slideEl) => {
    toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass), toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass), toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
  }), swiper.emitSlidesClasses();
}
__name(updateSlidesClasses, "updateSlidesClasses");
const processLazyPreloader = /* @__PURE__ */ __name((swiper, imageEl) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  const slideSelector = /* @__PURE__ */ __name(() => swiper.isElement ? "swiper-slide" : `.${swiper.params.slideClass}`, "slideSelector"), slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
    !lazyEl && swiper.isElement && (slideEl.shadowRoot ? lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
      slideEl.shadowRoot && (lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`), lazyEl && lazyEl.remove());
    })), lazyEl && lazyEl.remove();
  }
}, "processLazyPreloader"), unlazy = /* @__PURE__ */ __name((swiper, index) => {
  if (!swiper.slides[index]) return;
  const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
  imageEl && imageEl.removeAttribute("loading");
}, "unlazy"), preload = /* @__PURE__ */ __name((swiper) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  let amount = swiper.params.lazyPreloadPrevNext;
  const len = swiper.slides.length;
  if (!len || !amount || amount < 0) return;
  amount = Math.min(amount, len);
  const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView), activeIndex = swiper.activeIndex;
  if (swiper.params.grid && swiper.params.grid.rows > 1) {
    const activeColumn = activeIndex, preloadColumns = [activeColumn - amount];
    preloadColumns.push(...Array.from({
      length: amount
    }).map((_, i) => activeColumn + slidesPerView + i)), swiper.slides.forEach((slideEl, i) => {
      preloadColumns.includes(slideEl.column) && unlazy(swiper, i);
    });
    return;
  }
  const slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind || swiper.params.loop)
    for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
      const realIndex = (i % len + len) % len;
      (realIndex < activeIndex || realIndex > slideIndexLastInView) && unlazy(swiper, realIndex);
    }
  else
    for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1)
      i !== activeIndex && (i > slideIndexLastInView || i < activeIndex) && unlazy(swiper, i);
}, "preload");
function getActiveIndexByTranslate(swiper) {
  const {
    slidesGrid,
    params
  } = swiper, translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  let activeIndex;
  for (let i = 0; i < slidesGrid.length; i += 1)
    typeof slidesGrid[i + 1] < "u" ? translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2 ? activeIndex = i : translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1] && (activeIndex = i + 1) : translate2 >= slidesGrid[i] && (activeIndex = i);
  return params.normalizeSlideIndex && (activeIndex < 0 || typeof activeIndex > "u") && (activeIndex = 0), activeIndex;
}
__name(getActiveIndexByTranslate, "getActiveIndexByTranslate");
function updateActiveIndex(newActiveIndex) {
  const swiper = this, translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate, {
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex
  } = swiper;
  let activeIndex = newActiveIndex, snapIndex;
  const getVirtualRealIndex = /* @__PURE__ */ __name((aIndex) => {
    let realIndex2 = aIndex - swiper.virtual.slidesBefore;
    return realIndex2 < 0 && (realIndex2 = swiper.virtual.slides.length + realIndex2), realIndex2 >= swiper.virtual.slides.length && (realIndex2 -= swiper.virtual.slides.length), realIndex2;
  }, "getVirtualRealIndex");
  if (typeof activeIndex > "u" && (activeIndex = getActiveIndexByTranslate(swiper)), snapGrid.indexOf(translate2) >= 0)
    snapIndex = snapGrid.indexOf(translate2);
  else {
    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length && (snapIndex = snapGrid.length - 1), activeIndex === previousIndex && !swiper.params.loop) {
    snapIndex !== previousSnapIndex && (swiper.snapIndex = snapIndex, swiper.emit("snapIndexChange"));
    return;
  }
  if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
    swiper.realIndex = getVirtualRealIndex(activeIndex);
    return;
  }
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  let realIndex;
  if (swiper.virtual && params.virtual.enabled && params.loop)
    realIndex = getVirtualRealIndex(activeIndex);
  else if (gridEnabled) {
    const firstSlideInColumn = swiper.slides.find((slideEl) => slideEl.column === activeIndex);
    let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(activeSlideIndex) && (activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0)), realIndex = Math.floor(activeSlideIndex / params.grid.rows);
  } else if (swiper.slides[activeIndex]) {
    const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
    slideIndex ? realIndex = parseInt(slideIndex, 10) : realIndex = activeIndex;
  } else
    realIndex = activeIndex;
  Object.assign(swiper, {
    previousSnapIndex,
    snapIndex,
    previousRealIndex,
    realIndex,
    previousIndex,
    activeIndex
  }), swiper.initialized && preload(swiper), swiper.emit("activeIndexChange"), swiper.emit("snapIndexChange"), (swiper.initialized || swiper.params.runCallbacksOnInit) && (previousRealIndex !== realIndex && swiper.emit("realIndexChange"), swiper.emit("slideChange"));
}
__name(updateActiveIndex, "updateActiveIndex");
function updateClickedSlide(el, path) {
  const swiper = this, params = swiper.params;
  let slide2 = el.closest(`.${params.slideClass}, swiper-slide`);
  !slide2 && swiper.isElement && path && path.length > 1 && path.includes(el) && [...path.slice(path.indexOf(el) + 1, path.length)].forEach((pathEl) => {
    !slide2 && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`) && (slide2 = pathEl);
  });
  let slideFound = !1, slideIndex;
  if (slide2) {
    for (let i = 0; i < swiper.slides.length; i += 1)
      if (swiper.slides[i] === slide2) {
        slideFound = !0, slideIndex = i;
        break;
      }
  }
  if (slide2 && slideFound)
    swiper.clickedSlide = slide2, swiper.virtual && swiper.params.virtual.enabled ? swiper.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10) : swiper.clickedIndex = slideIndex;
  else {
    swiper.clickedSlide = void 0, swiper.clickedIndex = void 0;
    return;
  }
  params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex && swiper.slideToClickedSlide();
}
__name(updateClickedSlide, "updateClickedSlide");
var update = {
  updateSize,
  updateSlides,
  updateAutoHeight,
  updateSlidesOffset,
  updateSlidesProgress,
  updateProgress,
  updateSlidesClasses,
  updateActiveIndex,
  updateClickedSlide
};
function getSwiperTranslate(axis) {
  axis === void 0 && (axis = this.isHorizontal() ? "x" : "y");
  const swiper = this, {
    params,
    rtlTranslate: rtl,
    translate: translate2,
    wrapperEl
  } = swiper;
  if (params.virtualTranslate)
    return rtl ? -translate2 : translate2;
  if (params.cssMode)
    return translate2;
  let currentTranslate = getTranslate(wrapperEl, axis);
  return currentTranslate += swiper.cssOverflowAdjustment(), rtl && (currentTranslate = -currentTranslate), currentTranslate || 0;
}
__name(getSwiperTranslate, "getSwiperTranslate");
function setTranslate(translate2, byController) {
  const swiper = this, {
    rtlTranslate: rtl,
    params,
    wrapperEl,
    progress
  } = swiper;
  let x = 0, y = 0;
  const z = 0;
  swiper.isHorizontal() ? x = rtl ? -translate2 : translate2 : y = translate2, params.roundLengths && (x = Math.floor(x), y = Math.floor(y)), swiper.previousTranslate = swiper.translate, swiper.translate = swiper.isHorizontal() ? x : y, params.cssMode ? wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y : params.virtualTranslate || (swiper.isHorizontal() ? x -= swiper.cssOverflowAdjustment() : y -= swiper.cssOverflowAdjustment(), wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`);
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  translatesDiff === 0 ? newProgress = 0 : newProgress = (translate2 - swiper.minTranslate()) / translatesDiff, newProgress !== progress && swiper.updateProgress(translate2), swiper.emit("setTranslate", swiper.translate, byController);
}
__name(setTranslate, "setTranslate");
function minTranslate() {
  return -this.snapGrid[0];
}
__name(minTranslate, "minTranslate");
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
__name(maxTranslate, "maxTranslate");
function translateTo(translate2, speed, runCallbacks, translateBounds, internal) {
  translate2 === void 0 && (translate2 = 0), speed === void 0 && (speed = this.params.speed), runCallbacks === void 0 && (runCallbacks = !0), translateBounds === void 0 && (translateBounds = !0);
  const swiper = this, {
    params,
    wrapperEl
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition)
    return !1;
  const minTranslate2 = swiper.minTranslate(), maxTranslate2 = swiper.maxTranslate();
  let newTranslate;
  if (translateBounds && translate2 > minTranslate2 ? newTranslate = minTranslate2 : translateBounds && translate2 < maxTranslate2 ? newTranslate = maxTranslate2 : newTranslate = translate2, swiper.updateProgress(newTranslate), params.cssMode) {
    const isH = swiper.isHorizontal();
    if (speed === 0)
      wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
    else {
      if (!swiper.support.smoothScroll)
        return animateCSSModeScroll({
          swiper,
          targetPosition: -newTranslate,
          side: isH ? "left" : "top"
        }), !0;
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: -newTranslate,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return speed === 0 ? (swiper.setTransition(0), swiper.setTranslate(newTranslate), runCallbacks && (swiper.emit("beforeTransitionStart", speed, internal), swiper.emit("transitionEnd"))) : (swiper.setTransition(speed), swiper.setTranslate(newTranslate), runCallbacks && (swiper.emit("beforeTransitionStart", speed, internal), swiper.emit("transitionStart")), swiper.animating || (swiper.animating = !0, swiper.onTranslateToWrapperTransitionEnd || (swiper.onTranslateToWrapperTransitionEnd = /* @__PURE__ */ __name(function(e) {
    !swiper || swiper.destroyed || e.target === this && (swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd), swiper.onTranslateToWrapperTransitionEnd = null, delete swiper.onTranslateToWrapperTransitionEnd, swiper.animating = !1, runCallbacks && swiper.emit("transitionEnd"));
  }, "transitionEnd")), swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd))), !0;
}
__name(translateTo, "translateTo");
var translate = {
  getTranslate: getSwiperTranslate,
  setTranslate,
  minTranslate,
  maxTranslate,
  translateTo
};
function setTransition(duration, byController) {
  const swiper = this;
  swiper.params.cssMode || (swiper.wrapperEl.style.transitionDuration = `${duration}ms`, swiper.wrapperEl.style.transitionDelay = duration === 0 ? "0ms" : ""), swiper.emit("setTransition", duration, byController);
}
__name(setTransition, "setTransition");
function transitionEmit(_ref) {
  let {
    swiper,
    runCallbacks,
    direction,
    step
  } = _ref;
  const {
    activeIndex,
    previousIndex
  } = swiper;
  let dir = direction;
  dir || (activeIndex > previousIndex ? dir = "next" : activeIndex < previousIndex ? dir = "prev" : dir = "reset"), swiper.emit(`transition${step}`), runCallbacks && dir === "reset" ? swiper.emit(`slideResetTransition${step}`) : runCallbacks && activeIndex !== previousIndex && (swiper.emit(`slideChangeTransition${step}`), dir === "next" ? swiper.emit(`slideNextTransition${step}`) : swiper.emit(`slidePrevTransition${step}`));
}
__name(transitionEmit, "transitionEmit");
function transitionStart(runCallbacks, direction) {
  runCallbacks === void 0 && (runCallbacks = !0);
  const swiper = this, {
    params
  } = swiper;
  params.cssMode || (params.autoHeight && swiper.updateAutoHeight(), transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "Start"
  }));
}
__name(transitionStart, "transitionStart");
function transitionEnd(runCallbacks, direction) {
  runCallbacks === void 0 && (runCallbacks = !0);
  const swiper = this, {
    params
  } = swiper;
  swiper.animating = !1, !params.cssMode && (swiper.setTransition(0), transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "End"
  }));
}
__name(transitionEnd, "transitionEnd");
var transition = {
  setTransition,
  transitionStart,
  transitionEnd
};
function slideTo(index, speed, runCallbacks, internal, initial) {
  index === void 0 && (index = 0), runCallbacks === void 0 && (runCallbacks = !0), typeof index == "string" && (index = parseInt(index, 10));
  const swiper = this;
  let slideIndex = index;
  slideIndex < 0 && (slideIndex = 0);
  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl,
    wrapperEl,
    enabled
  } = swiper;
  if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition)
    return !1;
  typeof speed > "u" && (speed = swiper.params.speed);
  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  snapIndex >= snapGrid.length && (snapIndex = snapGrid.length - 1);
  const translate2 = -snapGrid[snapIndex];
  if (params.normalizeSlideIndex)
    for (let i = 0; i < slidesGrid.length; i += 1) {
      const normalizedTranslate = -Math.floor(translate2 * 100), normalizedGrid = Math.floor(slidesGrid[i] * 100), normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      typeof slidesGrid[i + 1] < "u" ? normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2 ? slideIndex = i : normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext && (slideIndex = i + 1) : normalizedTranslate >= normalizedGrid && (slideIndex = i);
    }
  if (swiper.initialized && slideIndex !== activeIndex && (!swiper.allowSlideNext && (rtl ? translate2 > swiper.translate && translate2 > swiper.minTranslate() : translate2 < swiper.translate && translate2 < swiper.minTranslate()) || !swiper.allowSlidePrev && translate2 > swiper.translate && translate2 > swiper.maxTranslate() && (activeIndex || 0) !== slideIndex))
    return !1;
  slideIndex !== (previousIndex || 0) && runCallbacks && swiper.emit("beforeSlideChangeStart"), swiper.updateProgress(translate2);
  let direction;
  slideIndex > activeIndex ? direction = "next" : slideIndex < activeIndex ? direction = "prev" : direction = "reset";
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  if (!(isVirtual && initial) && (rtl && -translate2 === swiper.translate || !rtl && translate2 === swiper.translate))
    return swiper.updateActiveIndex(slideIndex), params.autoHeight && swiper.updateAutoHeight(), swiper.updateSlidesClasses(), params.effect !== "slide" && swiper.setTranslate(translate2), direction !== "reset" && (swiper.transitionStart(runCallbacks, direction), swiper.transitionEnd(runCallbacks, direction)), !1;
  if (params.cssMode) {
    const isH = swiper.isHorizontal(), t = rtl ? translate2 : -translate2;
    if (speed === 0)
      isVirtual && (swiper.wrapperEl.style.scrollSnapType = "none", swiper._immediateVirtual = !0), isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0 ? (swiper._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
      })) : wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t, isVirtual && requestAnimationFrame(() => {
        swiper.wrapperEl.style.scrollSnapType = "", swiper._immediateVirtual = !1;
      });
    else {
      if (!swiper.support.smoothScroll)
        return animateCSSModeScroll({
          swiper,
          targetPosition: t,
          side: isH ? "left" : "top"
        }), !0;
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: t,
        behavior: "smooth"
      });
    }
    return !0;
  }
  const isSafari = getBrowser().isSafari;
  return isVirtual && !initial && isSafari && swiper.isElement && swiper.virtual.update(!1, !1, slideIndex), swiper.setTransition(speed), swiper.setTranslate(translate2), swiper.updateActiveIndex(slideIndex), swiper.updateSlidesClasses(), swiper.emit("beforeTransitionStart", speed, internal), swiper.transitionStart(runCallbacks, direction), speed === 0 ? swiper.transitionEnd(runCallbacks, direction) : swiper.animating || (swiper.animating = !0, swiper.onSlideToWrapperTransitionEnd || (swiper.onSlideToWrapperTransitionEnd = /* @__PURE__ */ __name(function(e) {
    !swiper || swiper.destroyed || e.target === this && (swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd), swiper.onSlideToWrapperTransitionEnd = null, delete swiper.onSlideToWrapperTransitionEnd, swiper.transitionEnd(runCallbacks, direction));
  }, "transitionEnd")), swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd)), !0;
}
__name(slideTo, "slideTo");
function slideToLoop(index, speed, runCallbacks, internal) {
  index === void 0 && (index = 0), runCallbacks === void 0 && (runCallbacks = !0), typeof index == "string" && (index = parseInt(index, 10));
  const swiper = this;
  if (swiper.destroyed) return;
  typeof speed > "u" && (speed = swiper.params.speed);
  const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
  let newIndex = index;
  if (swiper.params.loop)
    if (swiper.virtual && swiper.params.virtual.enabled)
      newIndex = newIndex + swiper.virtual.slidesBefore;
    else {
      let targetSlideIndex;
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid.rows;
        targetSlideIndex = swiper.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
      } else
        targetSlideIndex = swiper.getSlideIndexByData(newIndex);
      const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length, {
        centeredSlides
      } = swiper.params;
      let slidesPerView = swiper.params.slidesPerView;
      slidesPerView === "auto" ? slidesPerView = swiper.slidesPerViewDynamic() : (slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10)), centeredSlides && slidesPerView % 2 === 0 && (slidesPerView = slidesPerView + 1));
      let needLoopFix = cols - targetSlideIndex < slidesPerView;
      if (centeredSlides && (needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2)), internal && centeredSlides && swiper.params.slidesPerView !== "auto" && !gridEnabled && (needLoopFix = !1), needLoopFix) {
        const direction = centeredSlides ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
        swiper.loopFix({
          direction,
          slideTo: !0,
          activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
          slideRealIndex: direction === "next" ? swiper.realIndex : void 0
        });
      }
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid.rows;
        newIndex = swiper.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
      } else
        newIndex = swiper.getSlideIndexByData(newIndex);
    }
  return requestAnimationFrame(() => {
    swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }), swiper;
}
__name(slideToLoop, "slideToLoop");
function slideNext(speed, runCallbacks, internal) {
  runCallbacks === void 0 && (runCallbacks = !0);
  const swiper = this, {
    enabled,
    params,
    animating
  } = swiper;
  if (!enabled || swiper.destroyed) return swiper;
  typeof speed > "u" && (speed = swiper.params.speed);
  let perGroup = params.slidesPerGroup;
  params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto && (perGroup = Math.max(swiper.slidesPerViewDynamic("current", !0), 1));
  const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup, isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return !1;
    if (swiper.loopFix({
      direction: "next"
    }), swiper._clientLeft = swiper.wrapperEl.clientLeft, swiper.activeIndex === swiper.slides.length - 1 && params.cssMode)
      return requestAnimationFrame(() => {
        swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
      }), !0;
  }
  return params.rewind && swiper.isEnd ? swiper.slideTo(0, speed, runCallbacks, internal) : swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}
__name(slideNext, "slideNext");
function slidePrev(speed, runCallbacks, internal) {
  runCallbacks === void 0 && (runCallbacks = !0);
  const swiper = this, {
    params,
    snapGrid,
    slidesGrid,
    rtlTranslate,
    enabled,
    animating
  } = swiper;
  if (!enabled || swiper.destroyed) return swiper;
  typeof speed > "u" && (speed = swiper.params.speed);
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return !1;
    swiper.loopFix({
      direction: "prev"
    }), swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    return val < 0 ? -Math.floor(Math.abs(val)) : Math.floor(val);
  }
  __name(normalize, "normalize");
  const normalizedTranslate = normalize(translate2), normalizedSnapGrid = snapGrid.map((val) => normalize(val)), isFreeMode = params.freeMode && params.freeMode.enabled;
  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap > "u" && (params.cssMode || isFreeMode)) {
    let prevSnapIndex;
    snapGrid.forEach((snap, snapIndex) => {
      normalizedTranslate >= snap && (prevSnapIndex = snapIndex);
    }), typeof prevSnapIndex < "u" && (prevSnap = isFreeMode ? snapGrid[prevSnapIndex] : snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex]);
  }
  let prevIndex = 0;
  if (typeof prevSnap < "u" && (prevIndex = slidesGrid.indexOf(prevSnap), prevIndex < 0 && (prevIndex = swiper.activeIndex - 1), params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto && (prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", !0) + 1, prevIndex = Math.max(prevIndex, 0))), params.rewind && swiper.isBeginning) {
    const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
  } else if (params.loop && swiper.activeIndex === 0 && params.cssMode)
    return requestAnimationFrame(() => {
      swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }), !0;
  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}
__name(slidePrev, "slidePrev");
function slideReset(speed, runCallbacks, internal) {
  runCallbacks === void 0 && (runCallbacks = !0);
  const swiper = this;
  if (!swiper.destroyed)
    return typeof speed > "u" && (speed = swiper.params.speed), swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}
__name(slideReset, "slideReset");
function slideToClosest(speed, runCallbacks, internal, threshold) {
  runCallbacks === void 0 && (runCallbacks = !0), threshold === void 0 && (threshold = 0.5);
  const swiper = this;
  if (swiper.destroyed) return;
  typeof speed > "u" && (speed = swiper.params.speed);
  let index = swiper.activeIndex;
  const skip = Math.min(swiper.params.slidesPerGroupSkip, index), snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup), translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate2 >= swiper.snapGrid[snapIndex]) {
    const currentSnap = swiper.snapGrid[snapIndex], nextSnap = swiper.snapGrid[snapIndex + 1];
    translate2 - currentSnap > (nextSnap - currentSnap) * threshold && (index += swiper.params.slidesPerGroup);
  } else {
    const prevSnap = swiper.snapGrid[snapIndex - 1], currentSnap = swiper.snapGrid[snapIndex];
    translate2 - prevSnap <= (currentSnap - prevSnap) * threshold && (index -= swiper.params.slidesPerGroup);
  }
  return index = Math.max(index, 0), index = Math.min(index, swiper.slidesGrid.length - 1), swiper.slideTo(index, speed, runCallbacks, internal);
}
__name(slideToClosest, "slideToClosest");
function slideToClickedSlide() {
  const swiper = this;
  if (swiper.destroyed) return;
  const {
    params,
    slidesEl
  } = swiper, slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.getSlideIndexWhenGrid(swiper.clickedIndex), realIndex;
  const slideSelector = swiper.isElement ? "swiper-slide" : `.${params.slideClass}`, isGrid = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10), params.centeredSlides ? swiper.slideToLoop(realIndex) : slideToIndex > (isGrid ? (swiper.slides.length - slidesPerView) / 2 - (swiper.params.grid.rows - 1) : swiper.slides.length - slidesPerView) ? (swiper.loopFix(), slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]), nextTick(() => {
      swiper.slideTo(slideToIndex);
    })) : swiper.slideTo(slideToIndex);
  } else
    swiper.slideTo(slideToIndex);
}
__name(slideToClickedSlide, "slideToClickedSlide");
var slide = {
  slideTo,
  slideToLoop,
  slideNext,
  slidePrev,
  slideReset,
  slideToClosest,
  slideToClickedSlide
};
function loopCreate(slideRealIndex, initial) {
  const swiper = this, {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
  const initSlides = /* @__PURE__ */ __name(() => {
    elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`).forEach((el, index) => {
      el.setAttribute("data-swiper-slide-index", index);
    });
  }, "initSlides"), clearBlankSlides = /* @__PURE__ */ __name(() => {
    const slides = elementChildren(slidesEl, `.${params.slideBlankClass}`);
    slides.forEach((el) => {
      el.remove();
    }), slides.length > 0 && (swiper.recalcSlides(), swiper.updateSlides());
  }, "clearBlankSlides"), gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  params.loopAddBlankSlides && (params.slidesPerGroup > 1 || gridEnabled) && clearBlankSlides();
  const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1), shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0, shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0, addBlankSlides = /* @__PURE__ */ __name((amountOfSlides) => {
    for (let i = 0; i < amountOfSlides; i += 1) {
      const slideEl = swiper.isElement ? createElement("swiper-slide", [params.slideBlankClass]) : createElement("div", [params.slideClass, params.slideBlankClass]);
      swiper.slidesEl.append(slideEl);
    }
  }, "addBlankSlides");
  if (shouldFillGroup) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
      addBlankSlides(slidesToAdd), swiper.recalcSlides(), swiper.updateSlides();
    } else
      showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    initSlides();
  } else if (shouldFillGrid) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
      addBlankSlides(slidesToAdd), swiper.recalcSlides(), swiper.updateSlides();
    } else
      showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    initSlides();
  } else
    initSlides();
  swiper.loopFix({
    slideRealIndex,
    direction: params.centeredSlides ? void 0 : "next",
    initial
  });
}
__name(loopCreate, "loopCreate");
function loopFix(_temp) {
  let {
    slideRealIndex,
    slideTo: slideTo2 = !0,
    direction,
    setTranslate: setTranslate2,
    activeSlideIndex,
    initial,
    byController,
    byMousewheel
  } = _temp === void 0 ? {} : _temp;
  const swiper = this;
  if (!swiper.params.loop) return;
  swiper.emit("beforeLoopFix");
  const {
    slides,
    allowSlidePrev,
    allowSlideNext,
    slidesEl,
    params
  } = swiper, {
    centeredSlides,
    initialSlide
  } = params;
  if (swiper.allowSlidePrev = !0, swiper.allowSlideNext = !0, swiper.virtual && params.virtual.enabled) {
    slideTo2 && (!params.centeredSlides && swiper.snapIndex === 0 ? swiper.slideTo(swiper.virtual.slides.length, 0, !1, !0) : params.centeredSlides && swiper.snapIndex < params.slidesPerView ? swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, !1, !0) : swiper.snapIndex === swiper.snapGrid.length - 1 && swiper.slideTo(swiper.virtual.slidesBefore, 0, !1, !0)), swiper.allowSlidePrev = allowSlidePrev, swiper.allowSlideNext = allowSlideNext, swiper.emit("loopFix");
    return;
  }
  let slidesPerView = params.slidesPerView;
  slidesPerView === "auto" ? slidesPerView = swiper.slidesPerViewDynamic() : (slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10)), centeredSlides && slidesPerView % 2 === 0 && (slidesPerView = slidesPerView + 1));
  const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
  let loopedSlides = centeredSlides ? Math.max(slidesPerGroup, Math.ceil(slidesPerView / 2)) : slidesPerGroup;
  loopedSlides % slidesPerGroup !== 0 && (loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup), loopedSlides += params.loopAdditionalSlides, swiper.loopedSlides = loopedSlides;
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  slides.length < slidesPerView + loopedSlides || swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2 ? showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : gridEnabled && params.grid.fill === "row" && showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const prependSlidesIndexes = [], appendSlidesIndexes = [], cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length, isInitialOverflow = initial && cols - initialSlide < slidesPerView && !centeredSlides;
  let activeIndex = isInitialOverflow ? initialSlide : swiper.activeIndex;
  typeof activeSlideIndex > "u" ? activeSlideIndex = swiper.getSlideIndex(slides.find((el) => el.classList.contains(params.slideActiveClass))) : activeIndex = activeSlideIndex;
  const isNext = direction === "next" || !direction, isPrev = direction === "prev" || !direction;
  let slidesPrepended = 0, slidesAppended = 0;
  const activeColIndexWithShift = (gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex) + (centeredSlides && typeof setTranslate2 > "u" ? -slidesPerView / 2 + 0.5 : 0);
  if (activeColIndexWithShift < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
    for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        const colIndexToPrepend = cols - index - 1;
        for (let i2 = slides.length - 1; i2 >= 0; i2 -= 1)
          slides[i2].column === colIndexToPrepend && prependSlidesIndexes.push(i2);
      } else
        prependSlidesIndexes.push(cols - index - 1);
    }
  } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
    slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup), isInitialOverflow && (slidesAppended = Math.max(slidesAppended, slidesPerView - cols + initialSlide + 1));
    for (let i = 0; i < slidesAppended; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      gridEnabled ? slides.forEach((slide2, slideIndex) => {
        slide2.column === index && appendSlidesIndexes.push(slideIndex);
      }) : appendSlidesIndexes.push(index);
    }
  }
  if (swiper.__preventObserver__ = !0, requestAnimationFrame(() => {
    swiper.__preventObserver__ = !1;
  }), swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2 && (appendSlidesIndexes.includes(activeSlideIndex) && appendSlidesIndexes.splice(appendSlidesIndexes.indexOf(activeSlideIndex), 1), prependSlidesIndexes.includes(activeSlideIndex) && prependSlidesIndexes.splice(prependSlidesIndexes.indexOf(activeSlideIndex), 1)), isPrev && prependSlidesIndexes.forEach((index) => {
    slides[index].swiperLoopMoveDOM = !0, slidesEl.prepend(slides[index]), slides[index].swiperLoopMoveDOM = !1;
  }), isNext && appendSlidesIndexes.forEach((index) => {
    slides[index].swiperLoopMoveDOM = !0, slidesEl.append(slides[index]), slides[index].swiperLoopMoveDOM = !1;
  }), swiper.recalcSlides(), params.slidesPerView === "auto" ? swiper.updateSlides() : gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext) && swiper.slides.forEach((slide2, slideIndex) => {
    swiper.grid.updateSlide(slideIndex, slide2, swiper.slides);
  }), params.watchSlidesProgress && swiper.updateSlidesOffset(), slideTo2) {
    if (prependSlidesIndexes.length > 0 && isPrev) {
      if (typeof slideRealIndex > "u") {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex], diff = swiper.slidesGrid[activeIndex + slidesPrepended] - currentSlideTranslate;
        byMousewheel ? swiper.setTranslate(swiper.translate - diff) : (swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, !1, !0), setTranslate2 && (swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff, swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff));
      } else if (setTranslate2) {
        const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
        swiper.slideTo(swiper.activeIndex + shift, 0, !1, !0), swiper.touchEventsData.currentTranslate = swiper.translate;
      }
    } else if (appendSlidesIndexes.length > 0 && isNext)
      if (typeof slideRealIndex > "u") {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex], diff = swiper.slidesGrid[activeIndex - slidesAppended] - currentSlideTranslate;
        byMousewheel ? swiper.setTranslate(swiper.translate - diff) : (swiper.slideTo(activeIndex - slidesAppended, 0, !1, !0), setTranslate2 && (swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff, swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff));
      } else {
        const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
        swiper.slideTo(swiper.activeIndex - shift, 0, !1, !0);
      }
  }
  if (swiper.allowSlidePrev = allowSlidePrev, swiper.allowSlideNext = allowSlideNext, swiper.controller && swiper.controller.control && !byController) {
    const loopParams = {
      slideRealIndex,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      byController: !0
    };
    Array.isArray(swiper.controller.control) ? swiper.controller.control.forEach((c) => {
      !c.destroyed && c.params.loop && c.loopFix({
        ...loopParams,
        slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo2 : !1
      });
    }) : swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop && swiper.controller.control.loopFix({
      ...loopParams,
      slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo2 : !1
    });
  }
  swiper.emit("loopFix");
}
__name(loopFix, "loopFix");
function loopDestroy() {
  const swiper = this, {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || !slidesEl || swiper.virtual && swiper.params.virtual.enabled) return;
  swiper.recalcSlides();
  const newSlidesOrder = [];
  swiper.slides.forEach((slideEl) => {
    const index = typeof slideEl.swiperSlideIndex > "u" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
    newSlidesOrder[index] = slideEl;
  }), swiper.slides.forEach((slideEl) => {
    slideEl.removeAttribute("data-swiper-slide-index");
  }), newSlidesOrder.forEach((slideEl) => {
    slidesEl.append(slideEl);
  }), swiper.recalcSlides(), swiper.slideTo(swiper.realIndex, 0);
}
__name(loopDestroy, "loopDestroy");
var loop = {
  loopCreate,
  loopFix,
  loopDestroy
};
function setGrabCursor(moving) {
  const swiper = this;
  if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
  const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
  swiper.isElement && (swiper.__preventObserver__ = !0), el.style.cursor = "move", el.style.cursor = moving ? "grabbing" : "grab", swiper.isElement && requestAnimationFrame(() => {
    swiper.__preventObserver__ = !1;
  });
}
__name(setGrabCursor, "setGrabCursor");
function unsetGrabCursor() {
  const swiper = this;
  swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode || (swiper.isElement && (swiper.__preventObserver__ = !0), swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", swiper.isElement && requestAnimationFrame(() => {
    swiper.__preventObserver__ = !1;
  }));
}
__name(unsetGrabCursor, "unsetGrabCursor");
var grabCursor = {
  setGrabCursor,
  unsetGrabCursor
};
function closestElement(selector, base) {
  base === void 0 && (base = this);
  function __closestFrom(el) {
    if (!el || el === getDocument() || el === getWindow()) return null;
    el.assignedSlot && (el = el.assignedSlot);
    const found = el.closest(selector);
    return !found && !el.getRootNode ? null : found || __closestFrom(el.getRootNode().host);
  }
  return __name(__closestFrom, "__closestFrom"), __closestFrom(base);
}
__name(closestElement, "closestElement");
function preventEdgeSwipe(swiper, event, startX) {
  const window2 = getWindow(), {
    params
  } = swiper, edgeSwipeDetection = params.edgeSwipeDetection, edgeSwipeThreshold = params.edgeSwipeThreshold;
  return edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold) ? edgeSwipeDetection === "prevent" ? (event.preventDefault(), !0) : !1 : !0;
}
__name(preventEdgeSwipe, "preventEdgeSwipe");
function onTouchStart(event) {
  const swiper = this, document2 = getDocument();
  let e = event;
  e.originalEvent && (e = e.originalEvent);
  const data = swiper.touchEventsData;
  if (e.type === "pointerdown") {
    if (data.pointerId !== null && data.pointerId !== e.pointerId)
      return;
    data.pointerId = e.pointerId;
  } else e.type === "touchstart" && e.targetTouches.length === 1 && (data.touchId = e.targetTouches[0].identifier);
  if (e.type === "touchstart") {
    preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
    return;
  }
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled || !params.simulateTouch && e.pointerType === "mouse" || swiper.animating && params.preventInteractionOnTransition)
    return;
  !swiper.animating && params.cssMode && params.loop && swiper.loopFix();
  let targetEl = e.target;
  if (params.touchEventsTarget === "wrapper" && !elementIsChildOf(targetEl, swiper.wrapperEl) || "which" in e && e.which === 3 || "button" in e && e.button > 0 || data.isTouched && data.isMoved) return;
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "", eventPath = e.composedPath ? e.composedPath() : e.path;
  swipingClassHasValue && e.target && e.target.shadowRoot && eventPath && (targetEl = eventPath[0]);
  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`, isTargetShadow = !!(e.target && e.target.shadowRoot);
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
    swiper.allowClick = !0;
    return;
  }
  if (params.swipeHandler && !targetEl.closest(params.swipeHandler))
    return;
  touches.currentX = e.pageX, touches.currentY = e.pageY;
  const startX = touches.currentX, startY = touches.currentY;
  if (!preventEdgeSwipe(swiper, e, startX))
    return;
  Object.assign(data, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), touches.startX = startX, touches.startY = startY, data.touchStartTime = now(), swiper.allowClick = !0, swiper.updateSize(), swiper.swipeDirection = void 0, params.threshold > 0 && (data.allowThresholdMove = !1);
  let preventDefault = !0;
  targetEl.matches(data.focusableElements) && (preventDefault = !1, targetEl.nodeName === "SELECT" && (data.isTouched = !1)), document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl && (e.pointerType === "mouse" || e.pointerType !== "mouse" && !targetEl.matches(data.focusableElements)) && document2.activeElement.blur();
  const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
  (params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable && e.preventDefault(), params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode && swiper.freeMode.onTouchStart(), swiper.emit("touchStart", e);
}
__name(onTouchStart, "onTouchStart");
function onTouchMove(event) {
  const document2 = getDocument(), swiper = this, data = swiper.touchEventsData, {
    params,
    touches,
    rtlTranslate: rtl,
    enabled
  } = swiper;
  if (!enabled || !params.simulateTouch && event.pointerType === "mouse") return;
  let e = event;
  if (e.originalEvent && (e = e.originalEvent), e.type === "pointermove" && (data.touchId !== null || e.pointerId !== data.pointerId))
    return;
  let targetTouch;
  if (e.type === "touchmove") {
    if (targetTouch = [...e.changedTouches].find((t) => t.identifier === data.touchId), !targetTouch || targetTouch.identifier !== data.touchId) return;
  } else
    targetTouch = e;
  if (!data.isTouched) {
    data.startMoving && data.isScrolling && swiper.emit("touchMoveOpposite", e);
    return;
  }
  const pageX = targetTouch.pageX, pageY = targetTouch.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX, touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    e.target.matches(data.focusableElements) || (swiper.allowClick = !1), data.isTouched && (Object.assign(touches, {
      startX: pageX,
      startY: pageY,
      currentX: pageX,
      currentY: pageY
    }), data.touchStartTime = now());
    return;
  }
  if (params.touchReleaseOnEdges && !params.loop)
    if (swiper.isVertical()) {
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = !1, data.isMoved = !1;
        return;
      }
    } else {
      if (rtl && (pageX > touches.startX && -swiper.translate <= swiper.maxTranslate() || pageX < touches.startX && -swiper.translate >= swiper.minTranslate()))
        return;
      if (!rtl && (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()))
        return;
    }
  if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== e.target && e.pointerType !== "mouse" && document2.activeElement.blur(), document2.activeElement && e.target === document2.activeElement && e.target.matches(data.focusableElements)) {
    data.isMoved = !0, swiper.allowClick = !1;
    return;
  }
  data.allowTouchCallbacks && swiper.emit("touchMove", e), touches.previousX = touches.currentX, touches.previousY = touches.currentY, touches.currentX = pageX, touches.currentY = pageY;
  const diffX = touches.currentX - touches.startX, diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
  if (typeof data.isScrolling > "u") {
    let touchAngle;
    swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX ? data.isScrolling = !1 : diffX * diffX + diffY * diffY >= 25 && (touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI, data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle);
  }
  if (data.isScrolling && swiper.emit("touchMoveOpposite", e), typeof data.startMoving > "u" && (touches.currentX !== touches.startX || touches.currentY !== touches.startY) && (data.startMoving = !0), data.isScrolling || e.type === "touchmove" && data.preventTouchMoveFromPointerMove) {
    data.isTouched = !1;
    return;
  }
  if (!data.startMoving)
    return;
  swiper.allowClick = !1, !params.cssMode && e.cancelable && e.preventDefault(), params.touchMoveStopPropagation && !params.nested && e.stopPropagation();
  let diff = swiper.isHorizontal() ? diffX : diffY, touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
  params.oneWayMovement && (diff = Math.abs(diff) * (rtl ? 1 : -1), touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1)), touches.diff = diff, diff *= params.touchRatio, rtl && (diff = -diff, touchesDiff = -touchesDiff);
  const prevTouchesDirection = swiper.touchesDirection;
  swiper.swipeDirection = diff > 0 ? "prev" : "next", swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
  const isLoop = swiper.params.loop && !params.cssMode, allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
  if (!data.isMoved) {
    if (isLoop && allowLoopFix && swiper.loopFix({
      direction: swiper.swipeDirection
    }), data.startTranslate = swiper.getTranslate(), swiper.setTransition(0), swiper.animating) {
      const evt = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: {
          bySwiperTouchMove: !0
        }
      });
      swiper.wrapperEl.dispatchEvent(evt);
    }
    data.allowMomentumBounce = !1, params.grabCursor && (swiper.allowSlideNext === !0 || swiper.allowSlidePrev === !0) && swiper.setGrabCursor(!0), swiper.emit("sliderFirstMove", e);
  }
  if ((/* @__PURE__ */ new Date()).getTime(), params._loopSwapReset !== !1 && data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
    Object.assign(touches, {
      startX: pageX,
      startY: pageY,
      currentX: pageX,
      currentY: pageY,
      startTranslate: data.currentTranslate
    }), data.loopSwapReset = !0, data.startTranslate = data.currentTranslate;
    return;
  }
  swiper.emit("sliderMove", e), data.isMoved = !0, data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = !0, resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges && (resistanceRatio = 0), diff > 0 ? (isLoop && allowLoopFix && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate()) && swiper.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), data.currentTranslate > swiper.minTranslate() && (disableParentSwiper = !1, params.resistance && (data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio))) : diff < 0 && (isLoop && allowLoopFix && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate()) && swiper.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
  }), data.currentTranslate < swiper.maxTranslate() && (disableParentSwiper = !1, params.resistance && (data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio))), disableParentSwiper && (e.preventedByNestedSwiper = !0), !swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate && (data.currentTranslate = data.startTranslate), !swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate && (data.currentTranslate = data.startTranslate), !swiper.allowSlidePrev && !swiper.allowSlideNext && (data.currentTranslate = data.startTranslate), params.threshold > 0)
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = !0, touches.startX = touches.currentX, touches.startY = touches.currentY, data.currentTranslate = data.startTranslate, touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  !params.followFinger || params.cssMode || ((params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) && (swiper.updateActiveIndex(), swiper.updateSlidesClasses()), params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.freeMode.onTouchMove(), swiper.updateProgress(data.currentTranslate), swiper.setTranslate(data.currentTranslate));
}
__name(onTouchMove, "onTouchMove");
function onTouchEnd(event) {
  const swiper = this, data = swiper.touchEventsData;
  let e = event;
  e.originalEvent && (e = e.originalEvent);
  let targetTouch;
  if (e.type === "touchend" || e.type === "touchcancel") {
    if (targetTouch = [...e.changedTouches].find((t) => t.identifier === data.touchId), !targetTouch || targetTouch.identifier !== data.touchId) return;
  } else {
    if (data.touchId !== null || e.pointerId !== data.pointerId) return;
    targetTouch = e;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(e.type) && !(["pointercancel", "contextmenu"].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView)))
    return;
  data.pointerId = null, data.touchId = null;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    slidesGrid,
    enabled
  } = swiper;
  if (!enabled || !params.simulateTouch && e.pointerType === "mouse") return;
  if (data.allowTouchCallbacks && swiper.emit("touchEnd", e), data.allowTouchCallbacks = !1, !data.isTouched) {
    data.isMoved && params.grabCursor && swiper.setGrabCursor(!1), data.isMoved = !1, data.startMoving = !1;
    return;
  }
  params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === !0 || swiper.allowSlidePrev === !0) && swiper.setGrabCursor(!1);
  const touchEndTime = now(), timeDiff = touchEndTime - data.touchStartTime;
  if (swiper.allowClick) {
    const pathTree = e.path || e.composedPath && e.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree), swiper.emit("tap click", e), timeDiff < 300 && touchEndTime - data.lastClickTime < 300 && swiper.emit("doubleTap doubleClick", e);
  }
  if (data.lastClickTime = now(), nextTick(() => {
    swiper.destroyed || (swiper.allowClick = !0);
  }), !data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
    data.isTouched = !1, data.isMoved = !1, data.startMoving = !1;
    return;
  }
  data.isTouched = !1, data.isMoved = !1, data.startMoving = !1;
  let currentPos;
  if (params.followFinger ? currentPos = rtl ? swiper.translate : -swiper.translate : currentPos = -data.currentTranslate, params.cssMode)
    return;
  if (params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos
    });
    return;
  }
  const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
  let stopIndex = 0, groupSize = swiper.slidesSizesGrid[0];
  for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment2 = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    typeof slidesGrid[i + increment2] < "u" ? (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment2]) && (stopIndex = i, groupSize = slidesGrid[i + increment2] - slidesGrid[i]) : (swipeToLast || currentPos >= slidesGrid[i]) && (stopIndex = i, groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2]);
  }
  let rewindFirstIndex = null, rewindLastIndex = null;
  params.rewind && (swiper.isBeginning ? rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1 : swiper.isEnd && (rewindFirstIndex = 0));
  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize, increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    swiper.swipeDirection === "next" && (ratio >= params.longSwipesRatio ? swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment) : swiper.slideTo(stopIndex)), swiper.swipeDirection === "prev" && (ratio > 1 - params.longSwipesRatio ? swiper.slideTo(stopIndex + increment) : rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio ? swiper.slideTo(rewindLastIndex) : swiper.slideTo(stopIndex));
  } else {
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl) ? e.target === swiper.navigation.nextEl ? swiper.slideTo(stopIndex + increment) : swiper.slideTo(stopIndex) : (swiper.swipeDirection === "next" && swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment), swiper.swipeDirection === "prev" && swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex));
  }
}
__name(onTouchEnd, "onTouchEnd");
function onResize() {
  const swiper = this, {
    params,
    el
  } = swiper;
  if (el && el.offsetWidth === 0) return;
  params.breakpoints && swiper.setBreakpoint();
  const {
    allowSlideNext,
    allowSlidePrev,
    snapGrid
  } = swiper, isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  swiper.allowSlideNext = !0, swiper.allowSlidePrev = !0, swiper.updateSize(), swiper.updateSlides(), swiper.updateSlidesClasses();
  const isVirtualLoop = isVirtual && params.loop;
  (params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop ? swiper.slideTo(swiper.slides.length - 1, 0, !1, !0) : swiper.params.loop && !isVirtual ? swiper.slideToLoop(swiper.realIndex, 0, !1, !0) : swiper.slideTo(swiper.activeIndex, 0, !1, !0), swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused && (clearTimeout(swiper.autoplay.resizeTimeout), swiper.autoplay.resizeTimeout = setTimeout(() => {
    swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused && swiper.autoplay.resume();
  }, 500)), swiper.allowSlidePrev = allowSlidePrev, swiper.allowSlideNext = allowSlideNext, swiper.params.watchOverflow && snapGrid !== swiper.snapGrid && swiper.checkOverflow();
}
__name(onResize, "onResize");
function onClick(e) {
  const swiper = this;
  swiper.enabled && (swiper.allowClick || (swiper.params.preventClicks && e.preventDefault(), swiper.params.preventClicksPropagation && swiper.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
}
__name(onClick, "onClick");
function onScroll() {
  const swiper = this, {
    wrapperEl,
    rtlTranslate,
    enabled
  } = swiper;
  if (!enabled) return;
  swiper.previousTranslate = swiper.translate, swiper.isHorizontal() ? swiper.translate = -wrapperEl.scrollLeft : swiper.translate = -wrapperEl.scrollTop, swiper.translate === 0 && (swiper.translate = 0), swiper.updateActiveIndex(), swiper.updateSlidesClasses();
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  translatesDiff === 0 ? newProgress = 0 : newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff, newProgress !== swiper.progress && swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate), swiper.emit("setTranslate", swiper.translate, !1);
}
__name(onScroll, "onScroll");
function onLoad(e) {
  const swiper = this;
  processLazyPreloader(swiper, e.target), !(swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) && swiper.update();
}
__name(onLoad, "onLoad");
function onDocumentTouchStart() {
  const swiper = this;
  swiper.documentTouchHandlerProceeded || (swiper.documentTouchHandlerProceeded = !0, swiper.params.touchReleaseOnEdges && (swiper.el.style.touchAction = "auto"));
}
__name(onDocumentTouchStart, "onDocumentTouchStart");
const events = /* @__PURE__ */ __name((swiper, method) => {
  const document2 = getDocument(), {
    params,
    el,
    wrapperEl,
    device
  } = swiper, capture = !!params.nested, domMethod = method === "on" ? "addEventListener" : "removeEventListener", swiperMethod = method;
  !el || typeof el == "string" || (document2[domMethod]("touchstart", swiper.onDocumentTouchStart, {
    passive: !1,
    capture
  }), el[domMethod]("touchstart", swiper.onTouchStart, {
    passive: !1
  }), el[domMethod]("pointerdown", swiper.onTouchStart, {
    passive: !1
  }), document2[domMethod]("touchmove", swiper.onTouchMove, {
    passive: !1,
    capture
  }), document2[domMethod]("pointermove", swiper.onTouchMove, {
    passive: !1,
    capture
  }), document2[domMethod]("touchend", swiper.onTouchEnd, {
    passive: !0
  }), document2[domMethod]("pointerup", swiper.onTouchEnd, {
    passive: !0
  }), document2[domMethod]("pointercancel", swiper.onTouchEnd, {
    passive: !0
  }), document2[domMethod]("touchcancel", swiper.onTouchEnd, {
    passive: !0
  }), document2[domMethod]("pointerout", swiper.onTouchEnd, {
    passive: !0
  }), document2[domMethod]("pointerleave", swiper.onTouchEnd, {
    passive: !0
  }), document2[domMethod]("contextmenu", swiper.onTouchEnd, {
    passive: !0
  }), (params.preventClicks || params.preventClicksPropagation) && el[domMethod]("click", swiper.onClick, !0), params.cssMode && wrapperEl[domMethod]("scroll", swiper.onScroll), params.updateOnWindowResize ? swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, !0) : swiper[swiperMethod]("observerUpdate", onResize, !0), el[domMethod]("load", swiper.onLoad, {
    capture: !0
  }));
}, "events");
function attachEvents() {
  const swiper = this, {
    params
  } = swiper;
  swiper.onTouchStart = onTouchStart.bind(swiper), swiper.onTouchMove = onTouchMove.bind(swiper), swiper.onTouchEnd = onTouchEnd.bind(swiper), swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper), params.cssMode && (swiper.onScroll = onScroll.bind(swiper)), swiper.onClick = onClick.bind(swiper), swiper.onLoad = onLoad.bind(swiper), events(swiper, "on");
}
__name(attachEvents, "attachEvents");
function detachEvents() {
  events(this, "off");
}
__name(detachEvents, "detachEvents");
var events$1 = {
  attachEvents,
  detachEvents
};
const isGridEnabled = /* @__PURE__ */ __name((swiper, params) => swiper.grid && params.grid && params.grid.rows > 1, "isGridEnabled");
function setBreakpoint() {
  const swiper = this, {
    realIndex,
    initialized,
    params,
    el
  } = swiper, breakpoints2 = params.breakpoints;
  if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0) return;
  const document2 = getDocument(), breakpointsBase = params.breakpointsBase === "window" || !params.breakpointsBase ? params.breakpointsBase : "container", breakpointContainer = ["window", "container"].includes(params.breakpointsBase) || !params.breakpointsBase ? swiper.el : document2.querySelector(params.breakpointsBase), breakpoint = swiper.getBreakpoint(breakpoints2, breakpointsBase, breakpointContainer);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
  const breakpointParams = (breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0) || swiper.originalParams, wasMultiRow = isGridEnabled(swiper, params), isMultiRow = isGridEnabled(swiper, breakpointParams), wasGrabCursor = swiper.params.grabCursor, isGrabCursor = breakpointParams.grabCursor, wasEnabled = params.enabled;
  wasMultiRow && !isMultiRow ? (el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`), swiper.emitContainerClasses()) : !wasMultiRow && isMultiRow && (el.classList.add(`${params.containerModifierClass}grid`), (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") && el.classList.add(`${params.containerModifierClass}grid-column`), swiper.emitContainerClasses()), wasGrabCursor && !isGrabCursor ? swiper.unsetGrabCursor() : !wasGrabCursor && isGrabCursor && swiper.setGrabCursor(), ["navigation", "pagination", "scrollbar"].forEach((prop) => {
    if (typeof breakpointParams[prop] > "u") return;
    const wasModuleEnabled = params[prop] && params[prop].enabled, isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    wasModuleEnabled && !isModuleEnabled && swiper[prop].disable(), !wasModuleEnabled && isModuleEnabled && swiper[prop].enable();
  });
  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction, needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged), wasLoop = params.loop;
  directionChanged && initialized && swiper.changeDirection(), extend(swiper.params, breakpointParams);
  const isEnabled = swiper.params.enabled, hasLoop = swiper.params.loop;
  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev
  }), wasEnabled && !isEnabled ? swiper.disable() : !wasEnabled && isEnabled && swiper.enable(), swiper.currentBreakpoint = breakpoint, swiper.emit("_beforeBreakpoint", breakpointParams), initialized && (needsReLoop ? (swiper.loopDestroy(), swiper.loopCreate(realIndex), swiper.updateSlides()) : !wasLoop && hasLoop ? (swiper.loopCreate(realIndex), swiper.updateSlides()) : wasLoop && !hasLoop && swiper.loopDestroy()), swiper.emit("breakpoint", breakpointParams);
}
__name(setBreakpoint, "setBreakpoint");
function getBreakpoint(breakpoints2, base, containerEl) {
  if (base === void 0 && (base = "window"), !breakpoints2 || base === "container" && !containerEl) return;
  let breakpoint = !1;
  const window2 = getWindow(), currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight, points = Object.keys(breakpoints2).map((point) => {
    if (typeof point == "string" && point.indexOf("@") === 0) {
      const minRatio = parseFloat(point.substr(1));
      return {
        value: currentHeight * minRatio,
        point
      };
    }
    return {
      value: point,
      point
    };
  });
  points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  for (let i = 0; i < points.length; i += 1) {
    const {
      point,
      value
    } = points[i];
    base === "window" ? window2.matchMedia(`(min-width: ${value}px)`).matches && (breakpoint = point) : value <= containerEl.clientWidth && (breakpoint = point);
  }
  return breakpoint || "max";
}
__name(getBreakpoint, "getBreakpoint");
var breakpoints = {
  setBreakpoint,
  getBreakpoint
};
function prepareClasses(entries, prefix) {
  const resultClasses = [];
  return entries.forEach((item) => {
    typeof item == "object" ? Object.keys(item).forEach((classNames) => {
      item[classNames] && resultClasses.push(prefix + classNames);
    }) : typeof item == "string" && resultClasses.push(prefix + item);
  }), resultClasses;
}
__name(prepareClasses, "prepareClasses");
function addClasses() {
  const swiper = this, {
    classNames,
    params,
    rtl,
    el,
    device
  } = swiper, suffixes = prepareClasses(["initialized", params.direction, {
    "free-mode": swiper.params.freeMode && params.freeMode.enabled
  }, {
    autoheight: params.autoHeight
  }, {
    rtl
  }, {
    grid: params.grid && params.grid.rows > 1
  }, {
    "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
  }, {
    android: device.android
  }, {
    ios: device.ios
  }, {
    "css-mode": params.cssMode
  }, {
    centered: params.cssMode && params.centeredSlides
  }, {
    "watch-progress": params.watchSlidesProgress
  }], params.containerModifierClass);
  classNames.push(...suffixes), el.classList.add(...classNames), swiper.emitContainerClasses();
}
__name(addClasses, "addClasses");
function removeClasses() {
  const swiper = this, {
    el,
    classNames
  } = swiper;
  !el || typeof el == "string" || (el.classList.remove(...classNames), swiper.emitContainerClasses());
}
__name(removeClasses, "removeClasses");
var classes = {
  addClasses,
  removeClasses
};
function checkOverflow() {
  const swiper = this, {
    isLocked: wasLocked,
    params
  } = swiper, {
    slidesOffsetBefore
  } = params;
  if (slidesOffsetBefore) {
    const lastSlideIndex = swiper.slides.length - 1, lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else
    swiper.isLocked = swiper.snapGrid.length === 1;
  params.allowSlideNext === !0 && (swiper.allowSlideNext = !swiper.isLocked), params.allowSlidePrev === !0 && (swiper.allowSlidePrev = !swiper.isLocked), wasLocked && wasLocked !== swiper.isLocked && (swiper.isEnd = !1), wasLocked !== swiper.isLocked && swiper.emit(swiper.isLocked ? "lock" : "unlock");
}
__name(checkOverflow, "checkOverflow");
var checkOverflow$1 = {
  checkOverflow
}, defaults = {
  init: !0,
  direction: "horizontal",
  oneWayMovement: !1,
  swiperElementNodeName: "SWIPER-CONTAINER",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: !1,
  updateOnWindowResize: !0,
  resizeObserver: !0,
  nested: !1,
  createElements: !1,
  eventsPrefix: "swiper",
  enabled: !0,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: !1,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: !1,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: !1,
  // Set wrapper width
  setWrapperSize: !1,
  // Virtual Translate
  virtualTranslate: !1,
  // Effects
  effect: "slide",
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: !1,
  centeredSlides: !1,
  centeredSlidesBounds: !1,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: !0,
  centerInsufficientSlides: !1,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: !0,
  // Round length
  roundLengths: !1,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: !0,
  shortSwipes: !0,
  longSwipes: !0,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: !0,
  allowTouchMove: !0,
  threshold: 5,
  touchMoveStopPropagation: !1,
  touchStartPreventDefault: !0,
  touchStartForcePreventDefault: !1,
  touchReleaseOnEdges: !1,
  // Unique Navigation Elements
  uniqueNavElements: !0,
  // Resistance
  resistance: !0,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: !1,
  // Cursor
  grabCursor: !1,
  // Clicks
  preventClicks: !0,
  preventClicksPropagation: !0,
  slideToClickedSlide: !1,
  // loop
  loop: !1,
  loopAddBlankSlides: !0,
  loopAdditionalSlides: 0,
  loopPreventsSliding: !0,
  // rewind
  rewind: !1,
  // Swiping/no swiping
  allowSlidePrev: !0,
  allowSlideNext: !0,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: !0,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: !0,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  // NEW
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-blank",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideFullyVisibleClass: "swiper-slide-fully-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: !0,
  // Internals
  _emitClasses: !1
};
function moduleExtendParams(params, allModulesParams) {
  return /* @__PURE__ */ __name(function(obj) {
    obj === void 0 && (obj = {});
    const moduleParamName = Object.keys(obj)[0], moduleParams = obj[moduleParamName];
    if (typeof moduleParams != "object" || moduleParams === null) {
      extend(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === !0 && (params[moduleParamName] = {
      enabled: !0
    }), moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl && (params[moduleParamName].auto = !0), ["pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el && (params[moduleParamName].auto = !0), !(moduleParamName in params && "enabled" in moduleParams)) {
      extend(allModulesParams, obj);
      return;
    }
    typeof params[moduleParamName] == "object" && !("enabled" in params[moduleParamName]) && (params[moduleParamName].enabled = !0), params[moduleParamName] || (params[moduleParamName] = {
      enabled: !1
    }), extend(allModulesParams, obj);
  }, "extendParams");
}
__name(moduleExtendParams, "moduleExtendParams");
const prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events: events$1,
  breakpoints,
  checkOverflow: checkOverflow$1,
  classes
}, extendedDefaults = {}, _Swiper = class _Swiper {
  constructor() {
    let el, params;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)
      args[_key] = arguments[_key];
    args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object" ? params = args[0] : [el, params] = args, params || (params = {}), params = extend({}, params), el && !params.el && (params.el = el);
    const document2 = getDocument();
    if (params.el && typeof params.el == "string" && document2.querySelectorAll(params.el).length > 1) {
      const swipers = [];
      return document2.querySelectorAll(params.el).forEach((containerEl) => {
        const newParams = extend({}, params, {
          el: containerEl
        });
        swipers.push(new _Swiper(newParams));
      }), swipers;
    }
    const swiper = this;
    swiper.__swiper__ = !0, swiper.support = getSupport(), swiper.device = getDevice({
      userAgent: params.userAgent
    }), swiper.browser = getBrowser(), swiper.eventsListeners = {}, swiper.eventsAnyListeners = [], swiper.modules = [...swiper.__modules__], params.modules && Array.isArray(params.modules) && swiper.modules.push(...params.modules);
    const allModulesParams = {};
    swiper.modules.forEach((mod) => {
      mod({
        params,
        swiper,
        extendParams: moduleExtendParams(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    });
    const swiperParams = extend({}, defaults, allModulesParams);
    return swiper.params = extend({}, swiperParams, extendedDefaults, params), swiper.originalParams = extend({}, swiper.params), swiper.passedParams = extend({}, params), swiper.params && swiper.params.on && Object.keys(swiper.params.on).forEach((eventName) => {
      swiper.on(eventName, swiper.params.on[eventName]);
    }), swiper.params && swiper.params.onAny && swiper.onAny(swiper.params.onAny), Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return swiper.params.direction === "horizontal";
      },
      isVertical() {
        return swiper.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: !0,
      isEnd: !1,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: !1,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        pointerId: null,
        touchId: null
      },
      // Clicks
      allowClick: !0,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    }), swiper.emit("_swiper"), swiper.params.init && swiper.init(), swiper;
  }
  getDirectionLabel(property) {
    return this.isHorizontal() ? property : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    }[property];
  }
  getSlideIndex(slideEl) {
    const {
      slidesEl,
      params
    } = this, slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`), firstSlideIndex = elementIndex(slides[0]);
    return elementIndex(slideEl) - firstSlideIndex;
  }
  getSlideIndexByData(index) {
    return this.getSlideIndex(this.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index));
  }
  getSlideIndexWhenGrid(index) {
    return this.grid && this.params.grid && this.params.grid.rows > 1 && (this.params.grid.fill === "column" ? index = Math.floor(index / this.params.grid.rows) : this.params.grid.fill === "row" && (index = index % Math.ceil(this.slides.length / this.params.grid.rows))), index;
  }
  recalcSlides() {
    const swiper = this, {
      slidesEl,
      params
    } = swiper;
    swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
  }
  enable() {
    const swiper = this;
    swiper.enabled || (swiper.enabled = !0, swiper.params.grabCursor && swiper.setGrabCursor(), swiper.emit("enable"));
  }
  disable() {
    const swiper = this;
    swiper.enabled && (swiper.enabled = !1, swiper.params.grabCursor && swiper.unsetGrabCursor(), swiper.emit("disable"));
  }
  setProgress(progress, speed) {
    const swiper = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min = swiper.minTranslate(), current = (swiper.maxTranslate() - min) * progress + min;
    swiper.translateTo(current, typeof speed > "u" ? 0 : speed), swiper.updateActiveIndex(), swiper.updateSlidesClasses();
  }
  emitContainerClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const cls = swiper.el.className.split(" ").filter((className) => className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0);
    swiper.emit("_containerClasses", cls.join(" "));
  }
  getSlideClasses(slideEl) {
    const swiper = this;
    return swiper.destroyed ? "" : slideEl.className.split(" ").filter((className) => className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0).join(" ");
  }
  emitSlidesClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const updates = [];
    swiper.slides.forEach((slideEl) => {
      const classNames = swiper.getSlideClasses(slideEl);
      updates.push({
        slideEl,
        classNames
      }), swiper.emit("_slideClass", slideEl, classNames);
    }), swiper.emit("_slideClasses", updates);
  }
  slidesPerViewDynamic(view, exact) {
    view === void 0 && (view = "current"), exact === void 0 && (exact = !1);
    const swiper = this, {
      params,
      slides,
      slidesGrid,
      slidesSizesGrid,
      size: swiperSize,
      activeIndex
    } = swiper;
    let spv = 1;
    if (typeof params.slidesPerView == "number") return params.slidesPerView;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0, breakLoop;
      for (let i = activeIndex + 1; i < slides.length; i += 1)
        slides[i] && !breakLoop && (slideSize += Math.ceil(slides[i].swiperSlideSize), spv += 1, slideSize > swiperSize && (breakLoop = !0));
      for (let i = activeIndex - 1; i >= 0; i -= 1)
        slides[i] && !breakLoop && (slideSize += slides[i].swiperSlideSize, spv += 1, slideSize > swiperSize && (breakLoop = !0));
    } else if (view === "current")
      for (let i = activeIndex + 1; i < slides.length; i += 1)
        (exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize) && (spv += 1);
    else
      for (let i = activeIndex - 1; i >= 0; i -= 1)
        slidesGrid[activeIndex] - slidesGrid[i] < swiperSize && (spv += 1);
    return spv;
  }
  update() {
    const swiper = this;
    if (!swiper || swiper.destroyed) return;
    const {
      snapGrid,
      params
    } = swiper;
    params.breakpoints && swiper.setBreakpoint(), [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
      imageEl.complete && processLazyPreloader(swiper, imageEl);
    }), swiper.updateSize(), swiper.updateSlides(), swiper.updateProgress(), swiper.updateSlidesClasses();
    function setTranslate2() {
      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate, newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate), swiper.updateActiveIndex(), swiper.updateSlidesClasses();
    }
    __name(setTranslate2, "setTranslate");
    let translated;
    if (params.freeMode && params.freeMode.enabled && !params.cssMode)
      setTranslate2(), params.autoHeight && swiper.updateAutoHeight();
    else {
      if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
        const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
        translated = swiper.slideTo(slides.length - 1, 0, !1, !0);
      } else
        translated = swiper.slideTo(swiper.activeIndex, 0, !1, !0);
      translated || setTranslate2();
    }
    params.watchOverflow && snapGrid !== swiper.snapGrid && swiper.checkOverflow(), swiper.emit("update");
  }
  changeDirection(newDirection, needUpdate) {
    needUpdate === void 0 && (needUpdate = !0);
    const swiper = this, currentDirection = swiper.params.direction;
    return newDirection || (newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal"), newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical" || (swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`), swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`), swiper.emitContainerClasses(), swiper.params.direction = newDirection, swiper.slides.forEach((slideEl) => {
      newDirection === "vertical" ? slideEl.style.width = "" : slideEl.style.height = "";
    }), swiper.emit("changeDirection"), needUpdate && swiper.update()), swiper;
  }
  changeLanguageDirection(direction) {
    const swiper = this;
    swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr" || (swiper.rtl = direction === "rtl", swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl, swiper.rtl ? (swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`), swiper.el.dir = "rtl") : (swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`), swiper.el.dir = "ltr"), swiper.update());
  }
  mount(element) {
    const swiper = this;
    if (swiper.mounted) return !0;
    let el = element || swiper.params.el;
    if (typeof el == "string" && (el = document.querySelector(el)), !el)
      return !1;
    el.swiper = swiper, el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase() && (swiper.isElement = !0);
    const getWrapperSelector = /* @__PURE__ */ __name(() => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`, "getWrapperSelector");
    let wrapperEl = (/* @__PURE__ */ __name(() => el && el.shadowRoot && el.shadowRoot.querySelector ? el.shadowRoot.querySelector(getWrapperSelector()) : elementChildren(el, getWrapperSelector())[0], "getWrapper"))();
    return !wrapperEl && swiper.params.createElements && (wrapperEl = createElement("div", swiper.params.wrapperClass), el.append(wrapperEl), elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl) => {
      wrapperEl.append(slideEl);
    })), Object.assign(swiper, {
      el,
      wrapperEl,
      slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
      hostEl: swiper.isElement ? el.parentNode.host : el,
      mounted: !0,
      // RTL
      rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
      rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
      wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
    }), !0;
  }
  init(el) {
    const swiper = this;
    if (swiper.initialized || swiper.mount(el) === !1) return swiper;
    swiper.emit("beforeInit"), swiper.params.breakpoints && swiper.setBreakpoint(), swiper.addClasses(), swiper.updateSize(), swiper.updateSlides(), swiper.params.watchOverflow && swiper.checkOverflow(), swiper.params.grabCursor && swiper.enabled && swiper.setGrabCursor(), swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled ? swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, !1, !0) : swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, !1, !0), swiper.params.loop && swiper.loopCreate(void 0, !0), swiper.attachEvents();
    const lazyElements = [...swiper.el.querySelectorAll('[loading="lazy"]')];
    return swiper.isElement && lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]')), lazyElements.forEach((imageEl) => {
      imageEl.complete ? processLazyPreloader(swiper, imageEl) : imageEl.addEventListener("load", (e) => {
        processLazyPreloader(swiper, e.target);
      });
    }), preload(swiper), swiper.initialized = !0, preload(swiper), swiper.emit("init"), swiper.emit("afterInit"), swiper;
  }
  destroy(deleteInstance, cleanStyles) {
    deleteInstance === void 0 && (deleteInstance = !0), cleanStyles === void 0 && (cleanStyles = !0);
    const swiper = this, {
      params,
      el,
      wrapperEl,
      slides
    } = swiper;
    return typeof swiper.params > "u" || swiper.destroyed || (swiper.emit("beforeDestroy"), swiper.initialized = !1, swiper.detachEvents(), params.loop && swiper.loopDestroy(), cleanStyles && (swiper.removeClasses(), el && typeof el != "string" && el.removeAttribute("style"), wrapperEl && wrapperEl.removeAttribute("style"), slides && slides.length && slides.forEach((slideEl) => {
      slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass), slideEl.removeAttribute("style"), slideEl.removeAttribute("data-swiper-slide-index");
    })), swiper.emit("destroy"), Object.keys(swiper.eventsListeners).forEach((eventName) => {
      swiper.off(eventName);
    }), deleteInstance !== !1 && (swiper.el && typeof swiper.el != "string" && (swiper.el.swiper = null), deleteProps(swiper)), swiper.destroyed = !0), null;
  }
  static extendDefaults(newDefaults) {
    extend(extendedDefaults, newDefaults);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(mod) {
    _Swiper.prototype.__modules__ || (_Swiper.prototype.__modules__ = []);
    const modules = _Swiper.prototype.__modules__;
    typeof mod == "function" && modules.indexOf(mod) < 0 && modules.push(mod);
  }
  static use(module) {
    return Array.isArray(module) ? (module.forEach((m) => _Swiper.installModule(m)), _Swiper) : (_Swiper.installModule(module), _Swiper);
  }
};
__name(_Swiper, "Swiper");
let Swiper = _Swiper;
Object.keys(prototypes).forEach((prototypeGroup) => {
  Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper.use([Resize, Observer]);
function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  return swiper.params.createElements && Object.keys(checkProps).forEach((key) => {
    if (!params[key] && params.auto === !0) {
      let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
      element || (element = createElement("div", checkProps[key]), element.className = checkProps[key], swiper.el.append(element)), params[key] = element, originalParams[key] = element;
    }
  }), params;
}
__name(createElementIfNotDefined, "createElementIfNotDefined");
function Navigation(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  }), swiper.navigation = {
    nextEl: null,
    prevEl: null
  };
  function getEl(el) {
    let res;
    return el && typeof el == "string" && swiper.isElement && (res = swiper.el.querySelector(el) || swiper.hostEl.querySelector(el), res) ? res : (el && (typeof el == "string" && (res = [...document.querySelectorAll(el)]), swiper.params.uniqueNavElements && typeof el == "string" && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1 ? res = swiper.el.querySelector(el) : res && res.length === 1 && (res = res[0])), el && !res ? el : res);
  }
  __name(getEl, "getEl");
  function toggleEl(el, disabled) {
    const params = swiper.params.navigation;
    el = makeElementsArray(el), el.forEach((subEl) => {
      subEl && (subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" ")), subEl.tagName === "BUTTON" && (subEl.disabled = disabled), swiper.params.watchOverflow && swiper.enabled && subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass));
    });
  }
  __name(toggleEl, "toggleEl");
  function update2() {
    const {
      nextEl,
      prevEl
    } = swiper.navigation;
    if (swiper.params.loop) {
      toggleEl(prevEl, !1), toggleEl(nextEl, !1);
      return;
    }
    toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind), toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
  }
  __name(update2, "update");
  function onPrevClick(e) {
    e.preventDefault(), !(swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) && (swiper.slidePrev(), emit("navigationPrev"));
  }
  __name(onPrevClick, "onPrevClick");
  function onNextClick(e) {
    e.preventDefault(), !(swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) && (swiper.slideNext(), emit("navigationNext"));
  }
  __name(onNextClick, "onNextClick");
  function init() {
    const params = swiper.params.navigation;
    if (swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    }), !(params.nextEl || params.prevEl)) return;
    let nextEl = getEl(params.nextEl), prevEl = getEl(params.prevEl);
    Object.assign(swiper.navigation, {
      nextEl,
      prevEl
    }), nextEl = makeElementsArray(nextEl), prevEl = makeElementsArray(prevEl);
    const initButton = /* @__PURE__ */ __name((el, dir) => {
      el && el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick), !swiper.enabled && el && el.classList.add(...params.lockClass.split(" "));
    }, "initButton");
    nextEl.forEach((el) => initButton(el, "next")), prevEl.forEach((el) => initButton(el, "prev"));
  }
  __name(init, "init");
  function destroy() {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl), prevEl = makeElementsArray(prevEl);
    const destroyButton = /* @__PURE__ */ __name((el, dir) => {
      el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick), el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
    }, "destroyButton");
    nextEl.forEach((el) => destroyButton(el, "next")), prevEl.forEach((el) => destroyButton(el, "prev"));
  }
  __name(destroy, "destroy"), on("init", () => {
    swiper.params.navigation.enabled === !1 ? disable() : (init(), update2());
  }), on("toEdge fromEdge lock unlock", () => {
    update2();
  }), on("destroy", () => {
    destroy();
  }), on("enable disable", () => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    if (nextEl = makeElementsArray(nextEl), prevEl = makeElementsArray(prevEl), swiper.enabled) {
      update2();
      return;
    }
    [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.add(swiper.params.navigation.lockClass));
  }), on("click", (_s, e) => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl), prevEl = makeElementsArray(prevEl);
    const targetEl = e.target;
    let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
    if (swiper.isElement && !targetIsButton) {
      const path = e.path || e.composedPath && e.composedPath();
      path && (targetIsButton = path.find((pathEl) => nextEl.includes(pathEl) || prevEl.includes(pathEl)));
    }
    if (swiper.params.navigation.hideOnClick && !targetIsButton) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
      let isHidden;
      nextEl.length ? isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass) : prevEl.length && (isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass)), emit(isHidden === !0 ? "navigationShow" : "navigationHide"), [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.toggle(swiper.params.navigation.hiddenClass));
    }
  });
  const enable = /* @__PURE__ */ __name(() => {
    swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" ")), init(), update2();
  }, "enable"), disable = /* @__PURE__ */ __name(() => {
    swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" ")), destroy();
  }, "disable");
  Object.assign(swiper.navigation, {
    enable,
    disable,
    update: update2,
    init,
    destroy
  });
}
__name(Navigation, "Navigation");
function classesToSelector(classes2) {
  return classes2 === void 0 && (classes2 = ""), `.${classes2.trim().replace(/([\.:!+\/()[\]])/g, "\\$1").replace(/ /g, ".")}`;
}
__name(classesToSelector, "classesToSelector");
function Pagination(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  const pfx = "swiper-pagination";
  extendParams({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: /* @__PURE__ */ __name((number) => number, "formatFractionCurrent"),
      formatFractionTotal: /* @__PURE__ */ __name((number) => number, "formatFractionTotal"),
      bulletClass: `${pfx}-bullet`,
      bulletActiveClass: `${pfx}-bullet-active`,
      modifierClass: `${pfx}-`,
      currentClass: `${pfx}-current`,
      totalClass: `${pfx}-total`,
      hiddenClass: `${pfx}-hidden`,
      progressbarFillClass: `${pfx}-progressbar-fill`,
      progressbarOppositeClass: `${pfx}-progressbar-opposite`,
      clickableClass: `${pfx}-clickable`,
      lockClass: `${pfx}-lock`,
      horizontalClass: `${pfx}-horizontal`,
      verticalClass: `${pfx}-vertical`,
      paginationDisabledClass: `${pfx}-disabled`
    }
  }), swiper.pagination = {
    el: null,
    bullets: []
  };
  let bulletSize, dynamicBulletIndex = 0;
  function isPaginationDisabled() {
    return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
  }
  __name(isPaginationDisabled, "isPaginationDisabled");
  function setSideBullets(bulletEl, position) {
    const {
      bulletActiveClass
    } = swiper.params.pagination;
    bulletEl && (bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`], bulletEl && (bulletEl.classList.add(`${bulletActiveClass}-${position}`), bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`], bulletEl && bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`)));
  }
  __name(setSideBullets, "setSideBullets");
  function getMoveDirection(prevIndex, nextIndex, length) {
    if (prevIndex = prevIndex % length, nextIndex = nextIndex % length, nextIndex === prevIndex + 1)
      return "next";
    if (nextIndex === prevIndex - 1)
      return "previous";
  }
  __name(getMoveDirection, "getMoveDirection");
  function onBulletClick(e) {
    const bulletEl = e.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
    if (!bulletEl)
      return;
    e.preventDefault();
    const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
    if (swiper.params.loop) {
      if (swiper.realIndex === index) return;
      const moveDirection = getMoveDirection(swiper.realIndex, index, swiper.slides.length);
      moveDirection === "next" ? swiper.slideNext() : moveDirection === "previous" ? swiper.slidePrev() : swiper.slideToLoop(index);
    } else
      swiper.slideTo(index);
  }
  __name(onBulletClick, "onBulletClick");
  function update2() {
    const rtl = swiper.rtl, params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    let el = swiper.pagination.el;
    el = makeElementsArray(el);
    let current, previousIndex;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length, total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop ? (previousIndex = swiper.previousRealIndex || 0, current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex) : typeof swiper.snapIndex < "u" ? (current = swiper.snapIndex, previousIndex = swiper.previousSnapIndex) : (previousIndex = swiper.previousIndex || 0, current = swiper.activeIndex || 0), params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      const bullets = swiper.pagination.bullets;
      let firstIndex, lastIndex, midIndex;
      if (params.dynamicBullets && (bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height"), el.forEach((subEl) => {
        subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
      }), params.dynamicMainBullets > 1 && previousIndex !== void 0 && (dynamicBulletIndex += current - (previousIndex || 0), dynamicBulletIndex > params.dynamicMainBullets - 1 ? dynamicBulletIndex = params.dynamicMainBullets - 1 : dynamicBulletIndex < 0 && (dynamicBulletIndex = 0)), firstIndex = Math.max(current - dynamicBulletIndex, 0), lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1), midIndex = (lastIndex + firstIndex) / 2), bullets.forEach((bulletEl) => {
        const classesToRemove = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((suffix) => `${params.bulletActiveClass}${suffix}`)].map((s) => typeof s == "string" && s.includes(" ") ? s.split(" ") : s).flat();
        bulletEl.classList.remove(...classesToRemove);
      }), el.length > 1)
        bullets.forEach((bullet) => {
          const bulletIndex = elementIndex(bullet);
          bulletIndex === current ? bullet.classList.add(...params.bulletActiveClass.split(" ")) : swiper.isElement && bullet.setAttribute("part", "bullet"), params.dynamicBullets && (bulletIndex >= firstIndex && bulletIndex <= lastIndex && bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" ")), bulletIndex === firstIndex && setSideBullets(bullet, "prev"), bulletIndex === lastIndex && setSideBullets(bullet, "next"));
        });
      else {
        const bullet = bullets[current];
        if (bullet && bullet.classList.add(...params.bulletActiveClass.split(" ")), swiper.isElement && bullets.forEach((bulletEl, bulletIndex) => {
          bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
        }), params.dynamicBullets) {
          const firstDisplayedBullet = bullets[firstIndex], lastDisplayedBullet = bullets[lastIndex];
          for (let i = firstIndex; i <= lastIndex; i += 1)
            bullets[i] && bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
          setSideBullets(firstDisplayedBullet, "prev"), setSideBullets(lastDisplayedBullet, "next");
        }
      }
      if (params.dynamicBullets) {
        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4), bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize, offsetProp = rtl ? "right" : "left";
        bullets.forEach((bullet) => {
          bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
        });
      }
    }
    el.forEach((subEl, subElIndex) => {
      if (params.type === "fraction" && (subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl) => {
        fractionEl.textContent = params.formatFractionCurrent(current + 1);
      }), subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl) => {
        totalEl.textContent = params.formatFractionTotal(total);
      })), params.type === "progressbar") {
        let progressbarDirection;
        params.progressbarOpposite ? progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal" : progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
        const scale = (current + 1) / total;
        let scaleX = 1, scaleY = 1;
        progressbarDirection === "horizontal" ? scaleX = scale : scaleY = scale, subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach((progressEl) => {
          progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`, progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
        });
      }
      params.type === "custom" && params.renderCustom ? (setInnerHTML(subEl, params.renderCustom(swiper, current + 1, total)), subElIndex === 0 && emit("paginationRender", subEl)) : (subElIndex === 0 && emit("paginationRender", subEl), emit("paginationUpdate", subEl)), swiper.params.watchOverflow && swiper.enabled && subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
    });
  }
  __name(update2, "update");
  function render() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.grid && swiper.params.grid.rows > 1 ? swiper.slides.length / Math.ceil(swiper.params.grid.rows) : swiper.slides.length;
    let el = swiper.pagination.el;
    el = makeElementsArray(el);
    let paginationHTML = "";
    if (params.type === "bullets") {
      let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength && (numberOfBullets = slidesLength);
      for (let i = 0; i < numberOfBullets; i += 1)
        params.renderBullet ? paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass) : paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
    }
    params.type === "fraction" && (params.renderFraction ? paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass) : paginationHTML = `<span class="${params.currentClass}"></span> / <span class="${params.totalClass}"></span>`), params.type === "progressbar" && (params.renderProgressbar ? paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass) : paginationHTML = `<span class="${params.progressbarFillClass}"></span>`), swiper.pagination.bullets = [], el.forEach((subEl) => {
      params.type !== "custom" && setInnerHTML(subEl, paginationHTML || ""), params.type === "bullets" && swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
    }), params.type !== "custom" && emit("paginationRender", el[0]);
  }
  __name(render, "render");
  function init() {
    swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: "swiper-pagination"
    });
    const params = swiper.params.pagination;
    if (!params.el) return;
    let el;
    typeof params.el == "string" && swiper.isElement && (el = swiper.el.querySelector(params.el)), !el && typeof params.el == "string" && (el = [...document.querySelectorAll(params.el)]), el || (el = params.el), !(!el || el.length === 0) && (swiper.params.uniqueNavElements && typeof params.el == "string" && Array.isArray(el) && el.length > 1 && (el = [...swiper.el.querySelectorAll(params.el)], el.length > 1 && (el = el.find((subEl) => elementParents(subEl, ".swiper")[0] === swiper.el))), Array.isArray(el) && el.length === 1 && (el = el[0]), Object.assign(swiper.pagination, {
      el
    }), el = makeElementsArray(el), el.forEach((subEl) => {
      params.type === "bullets" && params.clickable && subEl.classList.add(...(params.clickableClass || "").split(" ")), subEl.classList.add(params.modifierClass + params.type), subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass), params.type === "bullets" && params.dynamicBullets && (subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`), dynamicBulletIndex = 0, params.dynamicMainBullets < 1 && (params.dynamicMainBullets = 1)), params.type === "progressbar" && params.progressbarOpposite && subEl.classList.add(params.progressbarOppositeClass), params.clickable && subEl.addEventListener("click", onBulletClick), swiper.enabled || subEl.classList.add(params.lockClass);
    }));
  }
  __name(init, "init");
  function destroy() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    let el = swiper.pagination.el;
    el && (el = makeElementsArray(el), el.forEach((subEl) => {
      subEl.classList.remove(params.hiddenClass), subEl.classList.remove(params.modifierClass + params.type), subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass), params.clickable && (subEl.classList.remove(...(params.clickableClass || "").split(" ")), subEl.removeEventListener("click", onBulletClick));
    })), swiper.pagination.bullets && swiper.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
  }
  __name(destroy, "destroy"), on("changeDirection", () => {
    if (!swiper.pagination || !swiper.pagination.el) return;
    const params = swiper.params.pagination;
    let {
      el
    } = swiper.pagination;
    el = makeElementsArray(el), el.forEach((subEl) => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass), subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  }), on("init", () => {
    swiper.params.pagination.enabled === !1 ? disable() : (init(), render(), update2());
  }), on("activeIndexChange", () => {
    typeof swiper.snapIndex > "u" && update2();
  }), on("snapIndexChange", () => {
    update2();
  }), on("snapGridLengthChange", () => {
    render(), update2();
  }), on("destroy", () => {
    destroy();
  }), on("enable disable", () => {
    let {
      el
    } = swiper.pagination;
    el && (el = makeElementsArray(el), el.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass)));
  }), on("lock unlock", () => {
    update2();
  }), on("click", (_s, e) => {
    const targetEl = e.target, el = makeElementsArray(swiper.pagination.el);
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
      const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
      emit(isHidden === !0 ? "paginationShow" : "paginationHide"), el.forEach((subEl) => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
    }
  });
  const enable = /* @__PURE__ */ __name(() => {
    swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
    let {
      el
    } = swiper.pagination;
    el && (el = makeElementsArray(el), el.forEach((subEl) => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass))), init(), render(), update2();
  }, "enable"), disable = /* @__PURE__ */ __name(() => {
    swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
    let {
      el
    } = swiper.pagination;
    el && (el = makeElementsArray(el), el.forEach((subEl) => subEl.classList.add(swiper.params.pagination.paginationDisabledClass))), destroy();
  }, "disable");
  Object.assign(swiper.pagination, {
    enable,
    disable,
    render,
    update: update2,
    init,
    destroy
  });
}
__name(Pagination, "Pagination");
function A11y(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    a11y: {
      enabled: !0,
      notificationClass: "swiper-notification",
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
      firstSlideMessage: "This is the first slide",
      lastSlideMessage: "This is the last slide",
      paginationBulletMessage: "Go to slide {{index}}",
      slideLabelMessage: "{{index}} / {{slidesLength}}",
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      containerRole: null,
      itemRoleDescriptionMessage: null,
      slideRole: "group",
      id: null,
      scrollOnFocus: !0
    }
  }), swiper.a11y = {
    clicked: !1
  };
  let liveRegion = null, preventFocusHandler, focusTargetSlideEl, visibilityChangedTimestamp = (/* @__PURE__ */ new Date()).getTime();
  function notify(message) {
    const notification = liveRegion;
    notification.length !== 0 && setInnerHTML(notification, message);
  }
  __name(notify, "notify");
  function getRandomNumber(size) {
    const randomChar = /* @__PURE__ */ __name(() => Math.round(16 * Math.random()).toString(16), "randomChar");
    return "x".repeat(size).replace(/x/g, randomChar);
  }
  __name(getRandomNumber, "getRandomNumber");
  function makeElFocusable(el) {
    el = makeElementsArray(el), el.forEach((subEl) => {
      subEl.setAttribute("tabIndex", "0");
    });
  }
  __name(makeElFocusable, "makeElFocusable");
  function makeElNotFocusable(el) {
    el = makeElementsArray(el), el.forEach((subEl) => {
      subEl.setAttribute("tabIndex", "-1");
    });
  }
  __name(makeElNotFocusable, "makeElNotFocusable");
  function addElRole(el, role) {
    el = makeElementsArray(el), el.forEach((subEl) => {
      subEl.setAttribute("role", role);
    });
  }
  __name(addElRole, "addElRole");
  function addElRoleDescription(el, description) {
    el = makeElementsArray(el), el.forEach((subEl) => {
      subEl.setAttribute("aria-roledescription", description);
    });
  }
  __name(addElRoleDescription, "addElRoleDescription");
  function addElControls(el, controls) {
    el = makeElementsArray(el), el.forEach((subEl) => {
      subEl.setAttribute("aria-controls", controls);
    });
  }
  __name(addElControls, "addElControls");
  function addElLabel(el, label) {
    el = makeElementsArray(el), el.forEach((subEl) => {
      subEl.setAttribute("aria-label", label);
    });
  }
  __name(addElLabel, "addElLabel");
  function addElId(el, id) {
    el = makeElementsArray(el), el.forEach((subEl) => {
      subEl.setAttribute("id", id);
    });
  }
  __name(addElId, "addElId");
  function addElLive(el, live) {
    el = makeElementsArray(el), el.forEach((subEl) => {
      subEl.setAttribute("aria-live", live);
    });
  }
  __name(addElLive, "addElLive");
  function disableEl(el) {
    el = makeElementsArray(el), el.forEach((subEl) => {
      subEl.setAttribute("aria-disabled", !0);
    });
  }
  __name(disableEl, "disableEl");
  function enableEl(el) {
    el = makeElementsArray(el), el.forEach((subEl) => {
      subEl.setAttribute("aria-disabled", !1);
    });
  }
  __name(enableEl, "enableEl");
  function onEnterOrSpaceKey(e) {
    if (e.keyCode !== 13 && e.keyCode !== 32) return;
    const params = swiper.params.a11y, targetEl = e.target;
    if (!(swiper.pagination && swiper.pagination.el && (targetEl === swiper.pagination.el || swiper.pagination.el.contains(e.target)) && !e.target.matches(classesToSelector(swiper.params.pagination.bulletClass)))) {
      if (swiper.navigation && swiper.navigation.prevEl && swiper.navigation.nextEl) {
        const prevEls = makeElementsArray(swiper.navigation.prevEl);
        makeElementsArray(swiper.navigation.nextEl).includes(targetEl) && (swiper.isEnd && !swiper.params.loop || swiper.slideNext(), swiper.isEnd ? notify(params.lastSlideMessage) : notify(params.nextSlideMessage)), prevEls.includes(targetEl) && (swiper.isBeginning && !swiper.params.loop || swiper.slidePrev(), swiper.isBeginning ? notify(params.firstSlideMessage) : notify(params.prevSlideMessage));
      }
      swiper.pagination && targetEl.matches(classesToSelector(swiper.params.pagination.bulletClass)) && targetEl.click();
    }
  }
  __name(onEnterOrSpaceKey, "onEnterOrSpaceKey");
  function updateNavigation() {
    if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
    const {
      nextEl,
      prevEl
    } = swiper.navigation;
    prevEl && (swiper.isBeginning ? (disableEl(prevEl), makeElNotFocusable(prevEl)) : (enableEl(prevEl), makeElFocusable(prevEl))), nextEl && (swiper.isEnd ? (disableEl(nextEl), makeElNotFocusable(nextEl)) : (enableEl(nextEl), makeElFocusable(nextEl)));
  }
  __name(updateNavigation, "updateNavigation");
  function hasPagination() {
    return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
  }
  __name(hasPagination, "hasPagination");
  function hasClickablePagination() {
    return hasPagination() && swiper.params.pagination.clickable;
  }
  __name(hasClickablePagination, "hasClickablePagination");
  function updatePagination() {
    const params = swiper.params.a11y;
    hasPagination() && swiper.pagination.bullets.forEach((bulletEl) => {
      swiper.params.pagination.clickable && (makeElFocusable(bulletEl), swiper.params.pagination.renderBullet || (addElRole(bulletEl, "button"), addElLabel(bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, elementIndex(bulletEl) + 1)))), bulletEl.matches(classesToSelector(swiper.params.pagination.bulletActiveClass)) ? bulletEl.setAttribute("aria-current", "true") : bulletEl.removeAttribute("aria-current");
    });
  }
  __name(updatePagination, "updatePagination");
  const initNavEl = /* @__PURE__ */ __name((el, wrapperId, message) => {
    makeElFocusable(el), el.tagName !== "BUTTON" && (addElRole(el, "button"), el.addEventListener("keydown", onEnterOrSpaceKey)), addElLabel(el, message), addElControls(el, wrapperId);
  }, "initNavEl"), handlePointerDown = /* @__PURE__ */ __name((e) => {
    focusTargetSlideEl && focusTargetSlideEl !== e.target && !focusTargetSlideEl.contains(e.target) && (preventFocusHandler = !0), swiper.a11y.clicked = !0;
  }, "handlePointerDown"), handlePointerUp = /* @__PURE__ */ __name(() => {
    preventFocusHandler = !1, requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        swiper.destroyed || (swiper.a11y.clicked = !1);
      });
    });
  }, "handlePointerUp"), onVisibilityChange = /* @__PURE__ */ __name((e) => {
    visibilityChangedTimestamp = (/* @__PURE__ */ new Date()).getTime();
  }, "onVisibilityChange"), handleFocus = /* @__PURE__ */ __name((e) => {
    if (swiper.a11y.clicked || !swiper.params.a11y.scrollOnFocus || (/* @__PURE__ */ new Date()).getTime() - visibilityChangedTimestamp < 100) return;
    const slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
    if (!slideEl || !swiper.slides.includes(slideEl)) return;
    focusTargetSlideEl = slideEl;
    const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex, isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
    isActive || isVisible || e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || (swiper.isHorizontal() ? swiper.el.scrollLeft = 0 : swiper.el.scrollTop = 0, requestAnimationFrame(() => {
      preventFocusHandler || (swiper.params.loop ? swiper.slideToLoop(swiper.getSlideIndexWhenGrid(parseInt(slideEl.getAttribute("data-swiper-slide-index"))), 0) : swiper.slideTo(swiper.getSlideIndexWhenGrid(swiper.slides.indexOf(slideEl)), 0), preventFocusHandler = !1);
    }));
  }, "handleFocus"), initSlides = /* @__PURE__ */ __name(() => {
    const params = swiper.params.a11y;
    params.itemRoleDescriptionMessage && addElRoleDescription(swiper.slides, params.itemRoleDescriptionMessage), params.slideRole && addElRole(swiper.slides, params.slideRole);
    const slidesLength = swiper.slides.length;
    params.slideLabelMessage && swiper.slides.forEach((slideEl, index) => {
      const slideIndex = swiper.params.loop ? parseInt(slideEl.getAttribute("data-swiper-slide-index"), 10) : index, ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
      addElLabel(slideEl, ariaLabelMessage);
    });
  }, "initSlides"), init = /* @__PURE__ */ __name(() => {
    const params = swiper.params.a11y;
    swiper.el.append(liveRegion);
    const containerEl = swiper.el;
    params.containerRoleDescriptionMessage && addElRoleDescription(containerEl, params.containerRoleDescriptionMessage), params.containerMessage && addElLabel(containerEl, params.containerMessage), params.containerRole && addElRole(containerEl, params.containerRole);
    const wrapperEl = swiper.wrapperEl, wrapperId = params.id || wrapperEl.getAttribute("id") || `swiper-wrapper-${getRandomNumber(16)}`, live = swiper.params.autoplay && swiper.params.autoplay.enabled ? "off" : "polite";
    addElId(wrapperEl, wrapperId), addElLive(wrapperEl, live), initSlides();
    let {
      nextEl,
      prevEl
    } = swiper.navigation ? swiper.navigation : {};
    nextEl = makeElementsArray(nextEl), prevEl = makeElementsArray(prevEl), nextEl && nextEl.forEach((el) => initNavEl(el, wrapperId, params.nextSlideMessage)), prevEl && prevEl.forEach((el) => initNavEl(el, wrapperId, params.prevSlideMessage)), hasClickablePagination() && makeElementsArray(swiper.pagination.el).forEach((el) => {
      el.addEventListener("keydown", onEnterOrSpaceKey);
    }), getDocument().addEventListener("visibilitychange", onVisibilityChange), swiper.el.addEventListener("focus", handleFocus, !0), swiper.el.addEventListener("focus", handleFocus, !0), swiper.el.addEventListener("pointerdown", handlePointerDown, !0), swiper.el.addEventListener("pointerup", handlePointerUp, !0);
  }, "init");
  function destroy() {
    liveRegion && liveRegion.remove();
    let {
      nextEl,
      prevEl
    } = swiper.navigation ? swiper.navigation : {};
    nextEl = makeElementsArray(nextEl), prevEl = makeElementsArray(prevEl), nextEl && nextEl.forEach((el) => el.removeEventListener("keydown", onEnterOrSpaceKey)), prevEl && prevEl.forEach((el) => el.removeEventListener("keydown", onEnterOrSpaceKey)), hasClickablePagination() && makeElementsArray(swiper.pagination.el).forEach((el) => {
      el.removeEventListener("keydown", onEnterOrSpaceKey);
    }), getDocument().removeEventListener("visibilitychange", onVisibilityChange), swiper.el && typeof swiper.el != "string" && (swiper.el.removeEventListener("focus", handleFocus, !0), swiper.el.removeEventListener("pointerdown", handlePointerDown, !0), swiper.el.removeEventListener("pointerup", handlePointerUp, !0));
  }
  __name(destroy, "destroy"), on("beforeInit", () => {
    liveRegion = createElement("span", swiper.params.a11y.notificationClass), liveRegion.setAttribute("aria-live", "assertive"), liveRegion.setAttribute("aria-atomic", "true");
  }), on("afterInit", () => {
    swiper.params.a11y.enabled && init();
  }), on("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
    swiper.params.a11y.enabled && initSlides();
  }), on("fromEdge toEdge afterInit lock unlock", () => {
    swiper.params.a11y.enabled && updateNavigation();
  }), on("paginationUpdate", () => {
    swiper.params.a11y.enabled && updatePagination();
  }), on("destroy", () => {
    swiper.params.a11y.enabled && destroy();
  });
}
__name(A11y, "A11y");
function Autoplay(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit,
    params
  } = _ref;
  swiper.autoplay = {
    running: !1,
    paused: !1,
    timeLeft: 0
  }, extendParams({
    autoplay: {
      enabled: !1,
      delay: 3e3,
      waitForTransition: !0,
      disableOnInteraction: !1,
      stopOnLastSlide: !1,
      reverseDirection: !1,
      pauseOnMouseEnter: !1
    }
  });
  let timeout, raf, autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3, autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3, autoplayTimeLeft, autoplayStartTime = (/* @__PURE__ */ new Date()).getTime(), wasPaused, isTouched, pausedByTouch, touchStartTimeout, slideChanged, pausedByInteraction, pausedByPointerEnter;
  function onTransitionEnd(e) {
    !swiper || swiper.destroyed || !swiper.wrapperEl || e.target === swiper.wrapperEl && (swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd), !(pausedByPointerEnter || e.detail && e.detail.bySwiperTouchMove) && resume());
  }
  __name(onTransitionEnd, "onTransitionEnd");
  const calcTimeLeft = /* @__PURE__ */ __name(() => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    swiper.autoplay.paused ? wasPaused = !0 : wasPaused && (autoplayDelayCurrent = autoplayTimeLeft, wasPaused = !1);
    const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (/* @__PURE__ */ new Date()).getTime();
    swiper.autoplay.timeLeft = timeLeft, emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal), raf = requestAnimationFrame(() => {
      calcTimeLeft();
    });
  }, "calcTimeLeft"), getSlideDelay = /* @__PURE__ */ __name(() => {
    let activeSlideEl;
    return swiper.virtual && swiper.params.virtual.enabled ? activeSlideEl = swiper.slides.find((slideEl) => slideEl.classList.contains("swiper-slide-active")) : activeSlideEl = swiper.slides[swiper.activeIndex], activeSlideEl ? parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10) : void 0;
  }, "getSlideDelay"), run = /* @__PURE__ */ __name((delayForce) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    cancelAnimationFrame(raf), calcTimeLeft();
    let delay = typeof delayForce > "u" ? swiper.params.autoplay.delay : delayForce;
    autoplayDelayTotal = swiper.params.autoplay.delay, autoplayDelayCurrent = swiper.params.autoplay.delay;
    const currentSlideDelay = getSlideDelay();
    !Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce > "u" && (delay = currentSlideDelay, autoplayDelayTotal = currentSlideDelay, autoplayDelayCurrent = currentSlideDelay), autoplayTimeLeft = delay;
    const speed = swiper.params.speed, proceed = /* @__PURE__ */ __name(() => {
      !swiper || swiper.destroyed || (swiper.params.autoplay.reverseDirection ? !swiper.isBeginning || swiper.params.loop || swiper.params.rewind ? (swiper.slidePrev(speed, !0, !0), emit("autoplay")) : swiper.params.autoplay.stopOnLastSlide || (swiper.slideTo(swiper.slides.length - 1, speed, !0, !0), emit("autoplay")) : !swiper.isEnd || swiper.params.loop || swiper.params.rewind ? (swiper.slideNext(speed, !0, !0), emit("autoplay")) : swiper.params.autoplay.stopOnLastSlide || (swiper.slideTo(0, speed, !0, !0), emit("autoplay")), swiper.params.cssMode && (autoplayStartTime = (/* @__PURE__ */ new Date()).getTime(), requestAnimationFrame(() => {
        run();
      })));
    }, "proceed");
    return delay > 0 ? (clearTimeout(timeout), timeout = setTimeout(() => {
      proceed();
    }, delay)) : requestAnimationFrame(() => {
      proceed();
    }), delay;
  }, "run"), start = /* @__PURE__ */ __name(() => {
    autoplayStartTime = (/* @__PURE__ */ new Date()).getTime(), swiper.autoplay.running = !0, run(), emit("autoplayStart");
  }, "start"), stop = /* @__PURE__ */ __name(() => {
    swiper.autoplay.running = !1, clearTimeout(timeout), cancelAnimationFrame(raf), emit("autoplayStop");
  }, "stop"), pause = /* @__PURE__ */ __name((internal, reset) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    clearTimeout(timeout), internal || (pausedByInteraction = !0);
    const proceed = /* @__PURE__ */ __name(() => {
      emit("autoplayPause"), swiper.params.autoplay.waitForTransition ? swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd) : resume();
    }, "proceed");
    if (swiper.autoplay.paused = !0, reset) {
      slideChanged && (autoplayTimeLeft = swiper.params.autoplay.delay), slideChanged = !1, proceed();
      return;
    }
    autoplayTimeLeft = (autoplayTimeLeft || swiper.params.autoplay.delay) - ((/* @__PURE__ */ new Date()).getTime() - autoplayStartTime), !(swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) && (autoplayTimeLeft < 0 && (autoplayTimeLeft = 0), proceed());
  }, "pause"), resume = /* @__PURE__ */ __name(() => {
    swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running || (autoplayStartTime = (/* @__PURE__ */ new Date()).getTime(), pausedByInteraction ? (pausedByInteraction = !1, run(autoplayTimeLeft)) : run(), swiper.autoplay.paused = !1, emit("autoplayResume"));
  }, "resume"), onVisibilityChange = /* @__PURE__ */ __name(() => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    const document2 = getDocument();
    document2.visibilityState === "hidden" && (pausedByInteraction = !0, pause(!0)), document2.visibilityState === "visible" && resume();
  }, "onVisibilityChange"), onPointerEnter = /* @__PURE__ */ __name((e) => {
    e.pointerType === "mouse" && (pausedByInteraction = !0, pausedByPointerEnter = !0, !(swiper.animating || swiper.autoplay.paused) && pause(!0));
  }, "onPointerEnter"), onPointerLeave = /* @__PURE__ */ __name((e) => {
    e.pointerType === "mouse" && (pausedByPointerEnter = !1, swiper.autoplay.paused && resume());
  }, "onPointerLeave"), attachMouseEvents = /* @__PURE__ */ __name(() => {
    swiper.params.autoplay.pauseOnMouseEnter && (swiper.el.addEventListener("pointerenter", onPointerEnter), swiper.el.addEventListener("pointerleave", onPointerLeave));
  }, "attachMouseEvents"), detachMouseEvents = /* @__PURE__ */ __name(() => {
    swiper.el && typeof swiper.el != "string" && (swiper.el.removeEventListener("pointerenter", onPointerEnter), swiper.el.removeEventListener("pointerleave", onPointerLeave));
  }, "detachMouseEvents"), attachDocumentEvents = /* @__PURE__ */ __name(() => {
    getDocument().addEventListener("visibilitychange", onVisibilityChange);
  }, "attachDocumentEvents"), detachDocumentEvents = /* @__PURE__ */ __name(() => {
    getDocument().removeEventListener("visibilitychange", onVisibilityChange);
  }, "detachDocumentEvents");
  on("init", () => {
    swiper.params.autoplay.enabled && (attachMouseEvents(), attachDocumentEvents(), start());
  }), on("destroy", () => {
    detachMouseEvents(), detachDocumentEvents(), swiper.autoplay.running && stop();
  }), on("_freeModeStaticRelease", () => {
    (pausedByTouch || pausedByInteraction) && resume();
  }), on("_freeModeNoMomentumRelease", () => {
    swiper.params.autoplay.disableOnInteraction ? stop() : pause(!0, !0);
  }), on("beforeTransitionStart", (_s, speed, internal) => {
    swiper.destroyed || !swiper.autoplay.running || (internal || !swiper.params.autoplay.disableOnInteraction ? pause(!0, !0) : stop());
  }), on("sliderFirstMove", () => {
    if (!(swiper.destroyed || !swiper.autoplay.running)) {
      if (swiper.params.autoplay.disableOnInteraction) {
        stop();
        return;
      }
      isTouched = !0, pausedByTouch = !1, pausedByInteraction = !1, touchStartTimeout = setTimeout(() => {
        pausedByInteraction = !0, pausedByTouch = !0, pause(!0);
      }, 200);
    }
  }), on("touchEnd", () => {
    if (!(swiper.destroyed || !swiper.autoplay.running || !isTouched)) {
      if (clearTimeout(touchStartTimeout), clearTimeout(timeout), swiper.params.autoplay.disableOnInteraction) {
        pausedByTouch = !1, isTouched = !1;
        return;
      }
      pausedByTouch && swiper.params.cssMode && resume(), pausedByTouch = !1, isTouched = !1;
    }
  }), on("slideChange", () => {
    swiper.destroyed || !swiper.autoplay.running || (slideChanged = !0);
  }), Object.assign(swiper.autoplay, {
    start,
    stop,
    pause,
    resume
  });
}
__name(Autoplay, "Autoplay");
const swiperCore = '@font-face{font-family:swiper-icons;src:url(data:application/font-woff;charset=utf-8;base64,\\ d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA);font-weight:400;font-style:normal}:root{--swiper-theme-color: #007aff}:host{position:relative;display:block;margin-left:auto;margin-right:auto;z-index:1}.swiper{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1;display:block}.swiper-vertical>.swiper-wrapper{flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:flex;transition-property:transform;transition-timing-function:var(--swiper-wrapper-transition-timing-function, initial);box-sizing:content-box}.swiper-android .swiper-slide,.swiper-ios .swiper-slide,.swiper-wrapper{transform:translateZ(0)}.swiper-horizontal{touch-action:pan-y}.swiper-vertical{touch-action:pan-x}.swiper-slide{flex-shrink:0;width:100%;height:100%;position:relative;transition-property:transform;display:block}.swiper-slide-invisible-blank{visibility:hidden}.swiper-autoheight,.swiper-autoheight .swiper-slide{height:auto}.swiper-autoheight .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-backface-hidden .swiper-slide{transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-3d.swiper-css-mode .swiper-wrapper{perspective:1200px}.swiper-3d .swiper-wrapper{transform-style:preserve-3d}.swiper-3d{perspective:1200px}.swiper-3d .swiper-slide,.swiper-3d .swiper-cube-shadow{transform-style:preserve-3d}.swiper-css-mode>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}.swiper-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-css-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:start start}.swiper-css-mode.swiper-horizontal>.swiper-wrapper{scroll-snap-type:x mandatory}.swiper-css-mode.swiper-vertical>.swiper-wrapper{scroll-snap-type:y mandatory}.swiper-css-mode.swiper-free-mode>.swiper-wrapper{scroll-snap-type:none}.swiper-css-mode.swiper-free-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:none}.swiper-css-mode.swiper-centered>.swiper-wrapper:before{content:"";flex-shrink:0;order:9999}.swiper-css-mode.swiper-centered>.swiper-wrapper>.swiper-slide{scroll-snap-align:center center;scroll-snap-stop:always}.swiper-css-mode.swiper-centered.swiper-horizontal>.swiper-wrapper>.swiper-slide:first-child{margin-inline-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-horizontal>.swiper-wrapper:before{height:100%;min-height:1px;width:var(--swiper-centered-offset-after)}.swiper-css-mode.swiper-centered.swiper-vertical>.swiper-wrapper>.swiper-slide:first-child{margin-block-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-vertical>.swiper-wrapper:before{width:100%;min-width:1px;height:var(--swiper-centered-offset-after)}.swiper-3d .swiper-slide-shadow,.swiper-3d .swiper-slide-shadow-left,.swiper-3d .swiper-slide-shadow-right,.swiper-3d .swiper-slide-shadow-top,.swiper-3d .swiper-slide-shadow-bottom{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-3d .swiper-slide-shadow{background:#00000026}.swiper-3d .swiper-slide-shadow-left{background-image:linear-gradient(to left,#00000080,#0000)}.swiper-3d .swiper-slide-shadow-right{background-image:linear-gradient(to right,#00000080,#0000)}.swiper-3d .swiper-slide-shadow-top{background-image:linear-gradient(to top,#00000080,#0000)}.swiper-3d .swiper-slide-shadow-bottom{background-image:linear-gradient(to bottom,#00000080,#0000)}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;transform-origin:50%;box-sizing:border-box;border:4px solid var(--swiper-preloader-color, var(--swiper-theme-color));border-radius:50%;border-top-color:transparent}.swiper:not(.swiper-watch-progress) .swiper-lazy-preloader,.swiper-watch-progress .swiper-slide-visible .swiper-lazy-preloader{animation:swiper-preloader-spin 1s infinite linear}.swiper-lazy-preloader-white{--swiper-preloader-color: #fff}.swiper-lazy-preloader-black{--swiper-preloader-color: #000}@keyframes swiper-preloader-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}', swiperNav = ':root{--swiper-navigation-size: 44px}.swiper-button-prev,.swiper-button-next{position:absolute;top:var(--swiper-navigation-top-offset, 50%);width:calc(var(--swiper-navigation-size) / 44 * 27);height:var(--swiper-navigation-size);margin-top:calc(0px - (var(--swiper-navigation-size) / 2));z-index:10;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--swiper-navigation-color, var(--swiper-theme-color))}.swiper-button-prev.swiper-button-disabled,.swiper-button-next.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-prev.swiper-button-hidden,.swiper-button-next.swiper-button-hidden{opacity:0;cursor:auto;pointer-events:none}.swiper-navigation-disabled .swiper-button-prev,.swiper-navigation-disabled .swiper-button-next{display:none!important}.swiper-button-prev svg,.swiper-button-next svg{width:100%;height:100%;object-fit:contain;transform-origin:center}.swiper-rtl .swiper-button-prev svg,.swiper-rtl .swiper-button-next svg{transform:rotate(180deg)}.swiper-button-prev,.swiper-rtl .swiper-button-next{left:var(--swiper-navigation-sides-offset, 10px);right:auto}.swiper-button-lock{display:none}.swiper-button-prev:after,.swiper-button-next:after{font-family:swiper-icons;font-size:var(--swiper-navigation-size);text-transform:none!important;letter-spacing:0;font-variant:initial;line-height:1}.swiper-button-prev:after,.swiper-rtl .swiper-button-next:after{content:"prev"}.swiper-button-next,.swiper-rtl .swiper-button-prev{right:var(--swiper-navigation-sides-offset, 10px);left:auto}.swiper-button-next:after,.swiper-rtl .swiper-button-prev:after{content:"next"}', swiperPag = ".swiper-pagination{position:absolute;text-align:center;transition:.3s opacity;transform:translateZ(0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-pagination-disabled>.swiper-pagination,.swiper-pagination.swiper-pagination-disabled{display:none!important}.swiper-pagination-fraction,.swiper-pagination-custom,.swiper-horizontal>.swiper-pagination-bullets,.swiper-pagination-bullets.swiper-pagination-horizontal{bottom:var(--swiper-pagination-bottom, 8px);top:var(--swiper-pagination-top, auto);left:0;width:100%}.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transform:scale(.33);position:relative}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active,.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{transform:scale(.33)}.swiper-pagination-bullet{width:var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 8px));height:var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 8px));display:inline-block;border-radius:var(--swiper-pagination-bullet-border-radius, 50%);background:var(--swiper-pagination-bullet-inactive-color, #000);opacity:var(--swiper-pagination-bullet-inactive-opacity, .2)}button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet:only-child{display:none!important}.swiper-pagination-bullet-active{opacity:var(--swiper-pagination-bullet-opacity, 1);background:var(--swiper-pagination-color, var(--swiper-theme-color))}.swiper-vertical>.swiper-pagination-bullets,.swiper-pagination-vertical.swiper-pagination-bullets{right:var(--swiper-pagination-right, 8px);left:var(--swiper-pagination-left, auto);top:50%;transform:translate3d(0,-50%,0)}.swiper-vertical>.swiper-pagination-bullets .swiper-pagination-bullet,.swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet{margin:var(--swiper-pagination-bullet-vertical-gap, 6px) 0;display:block}.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;transform:translateY(-50%);width:8px}.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;transition:.2s transform,.2s top}.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 var(--swiper-pagination-bullet-horizontal-gap, 4px)}.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;transform:translate(-50%);white-space:nowrap}.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s left}.swiper-horizontal.swiper-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s right}.swiper-pagination-fraction{color:var(--swiper-pagination-fraction-color, inherit)}.swiper-pagination-progressbar{background:var(--swiper-pagination-progressbar-bg-color, rgba(0, 0, 0, .25));position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--swiper-pagination-color, var(--swiper-theme-color));position:absolute;left:0;top:0;width:100%;height:100%;transform:scale(0);transform-origin:left top}.swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{transform-origin:right top}.swiper-horizontal>.swiper-pagination-progressbar,.swiper-pagination-progressbar.swiper-pagination-horizontal,.swiper-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite{width:100%;height:var(--swiper-pagination-progressbar-size, 4px);left:0;top:0}.swiper-vertical>.swiper-pagination-progressbar,.swiper-pagination-progressbar.swiper-pagination-vertical,.swiper-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite{width:var(--swiper-pagination-progressbar-size, 4px);height:100%;left:0;top:0}.swiper-pagination-lock{display:none}", fsSwiperCss = unsafeCSS(
  `${swiperCore}
${swiperNav}
${swiperPag}`
), DIR_ATTR = "dir", DRAG_GUARD_FLAG = "fsSwiperDragGuard";
function resolveRtl(el, forced) {
  var _a, _b;
  return typeof forced == "boolean" ? forced : (((_a = el.closest(`[${DIR_ATTR}]`)) == null ? void 0 : _a.getAttribute(DIR_ATTR)) || document.documentElement.getAttribute(DIR_ATTR) || ((_b = document.body) == null ? void 0 : _b.getAttribute(DIR_ATTR)) || "").toLowerCase() === "rtl";
}
__name(resolveRtl, "resolveRtl");
function suppressNativeDrag(el) {
  el.dataset[DRAG_GUARD_FLAG] !== "1" && (el.dataset[DRAG_GUARD_FLAG] = "1", el.addEventListener(
    "dragstart",
    (event) => {
      event.preventDefault();
    },
    { capture: !0 }
  ));
}
__name(suppressNativeDrag, "suppressNativeDrag");
function mountFsSwiper(el, options = {}) {
  const { rtl: rtlOpt, modules: extraModules, ...rest } = options, rtl = resolveRtl(el, rtlOpt);
  el.setAttribute(DIR_ATTR, rtl ? "rtl" : "ltr"), suppressNativeDrag(el);
  const existing = el.swiper;
  return existing && !existing.destroyed && existing.destroy(!0, !0), new Swiper(el, {
    modules: [Navigation, Pagination, A11y, Autoplay, ...extraModules || []],
    slidesPerView: "auto",
    spaceBetween: 16,
    speed: 420,
    watchOverflow: !0,
    grabCursor: !0,
    allowTouchMove: !0,
    simulateTouch: !0,
    threshold: 8,
    touchStartPreventDefault: !1,
    preventClicks: !1,
    preventClicksPropagation: !1,
    observer: !0,
    observeParents: !0,
    a11y: { enabled: !0 },
    ...rest,
    ...rtl ? { rtl: !0 } : {}
  });
}
__name(mountFsSwiper, "mountFsSwiper");
function destroyFsSwiper(instance) {
  instance && !instance.destroyed && instance.destroy(!0, !0);
}
__name(destroyFsSwiper, "destroyFsSwiper");
export {
  Autoplay as A,
  destroyFsSwiper as d,
  fsSwiperCss as f,
  mountFsSwiper as m
};
