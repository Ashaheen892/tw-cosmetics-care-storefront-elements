import { defineConfig } from 'vite';
import { sallaBuildPlugin, sallaDemoPlugin, sallaTransformPlugin } from '@salla.sa/twilight-bundles/vite-plugins';

/**
 * Demo helpers:
 * 1) Seed localStorage from twilight-bundle.json (full defaults + images)
 * 2) Show Arabic component titles in the sidebar (demo SDK uses technical `name`)
 */
const demoEnhancementsJs = `
(function demoEnhancements() {
  var SEED_VERSION = 'v12-bfz-default-zone';

  function resolveTitle(raw) {
    if (!raw) return '';
    if (typeof raw === 'string') return raw.trim();
    if (typeof raw === 'object') return String(raw.ar || raw.en || '').trim();
    return '';
  }

  function applyArabicTitles() {
    var map = window.customComponentsRaw || {};
    document.querySelectorAll('.visibility-item[data-component-name]').forEach(function (el) {
      var name = el.getAttribute('data-component-name');
      var title = resolveTitle(map[name] && map[name].title);
      if (!title) return;
      var label = el.querySelector('.visibility-item-name');
      if (label && label.textContent !== title) label.textContent = title;
      el.setAttribute('title', title);
      el.setAttribute('aria-label', title);
    });
    document.querySelectorAll('.empty-state-title, [data-component-title]').forEach(function (el) {
      var text = String(el.textContent || '').trim().toLowerCase();
      Object.keys(map).forEach(function (name) {
        if (text === name || text === name.replace(/-/g, ' ')) {
          var title = resolveTitle(map[name] && map[name].title);
          if (title) el.textContent = title;
        }
      });
    });
    // Fallback inside the components sidebar only
    var sidebar = document.querySelector('.visibility-list, .components-list, [class*="visibility"]');
    if (sidebar) {
      Object.keys(map).forEach(function (name) {
        var title = resolveTitle(map[name] && map[name].title);
        if (!title) return;
        sidebar.querySelectorAll('span, div, p, button, label').forEach(function (el) {
          if (el.children && el.children.length) return;
          if (String(el.textContent || '').trim() === name) el.textContent = title;
        });
      });
    }
  }

  function isBlankMultilang(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
    if (!('ar' in value) && !('en' in value)) return false;
    return !String(value.ar || '').trim() && !String(value.en || '').trim();
  }

  function isEmptyData(data) {
    if (!data || typeof data !== 'object') return true;
    var keys = Object.keys(data).filter(function (key) {
      return key !== 'twilight-bundles-component-name';
    });
    if (!keys.length) return true;

    var collectionKeys = keys.filter(function (key) {
      return Array.isArray(data[key]);
    });
    if (collectionKeys.length && collectionKeys.every(function (key) {
      return !data[key].length;
    })) {
      return true;
    }

    return !keys.some(function (key) {
      var value = data[key];
      if (value == null || value === '') return false;
      if (Array.isArray(value)) return value.length > 0;
      if (isBlankMultilang(value)) return false;
      return true;
    });
  }

  function buildDefaults(raw) {
    var data = {};
    if (!raw || !Array.isArray(raw.fields)) return data;

    raw.fields.forEach(function (field) {
      if (!field || !field.id) return;
      if (field.type === 'static') return;
      if (String(field.id).indexOf('static-') === 0) return;
      if (field.id === 'twilight-bundles-component-name') return;

      if (field.type === 'collection') {
        data[field.id] = Array.isArray(field.value) ? field.value : [];
        return;
      }

      // Twilight dropdown-list stores choice in selected, not value
      if (field.format === 'dropdown-list' && Array.isArray(field.selected) && field.selected[0]) {
        var pick = field.selected[0];
        data[field.id] =
          pick && typeof pick === 'object'
            ? pick.value != null
              ? pick.value
              : pick.key != null
                ? pick.key
                : pick
            : pick;
        return;
      }

      if (typeof field.value !== 'undefined') {
        data[field.id] = field.value;
      }
    });

    return data;
  }

  function seed() {
    var rawMap = window.customComponentsRaw || {};
    var seeded = false;
    var verKey = 'tw-cosmetics-demo-seed-ver';
    var forceReseed = localStorage.getItem(verKey) !== SEED_VERSION;

    Object.keys(rawMap).forEach(function (name) {
      var key = 'form-builder::data_' + name;
      var existingRaw = localStorage.getItem(key);
      var shouldSeed = forceReseed || !existingRaw;

      if (!shouldSeed && existingRaw) {
        try {
          shouldSeed = isEmptyData(JSON.parse(existingRaw));
        } catch (err) {
          shouldSeed = true;
        }
      }

      if (!shouldSeed) return;

      var defaults = buildDefaults(rawMap[name]);
      if (!Object.keys(defaults).length) return;

      localStorage.setItem(key, JSON.stringify(defaults));
      seeded = true;
    });

    if (forceReseed || seeded) {
      localStorage.setItem(verKey, SEED_VERSION);
    }

    if (seeded) {
      console.info('[demo] Seeded default component data from twilight-bundle.json');
      if (forceReseed && !sessionStorage.getItem('tw-cosmetics-seed-reloaded')) {
        sessionStorage.setItem('tw-cosmetics-seed-reloaded', '1');
        location.reload();
      }
    }
  }

  function boot() {
    seed();
    applyArabicTitles();
    var timer = null;
    var obs = new MutationObserver(function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(applyArabicTitles, 80);
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
    // Language switcher in the demo toolbar may flip html[lang]
    document.addEventListener('click', function () {
      setTimeout(applyArabicTitles, 50);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
`;

export default defineConfig({
  plugins: [
    sallaTransformPlugin(),
    sallaBuildPlugin(),
    sallaDemoPlugin({
      js: demoEnhancementsJs,
    }),
  ],
});
