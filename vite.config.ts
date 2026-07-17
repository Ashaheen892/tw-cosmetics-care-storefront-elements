import { defineConfig } from 'vite';
import {
  sallaBuildPlugin,
  sallaDemoPlugin,
  sallaTransformPlugin,
} from '@salla.sa/twilight-bundles/vite-plugins';

/**
 * Seeds localStorage with twilight-bundle.json field defaults so the demo
 * renders components immediately (Salla demo only reads saved form data).
 */
const seedDemoDefaultsJs = `
(function seedTwilightDemoDefaults() {
  function isEmptyData(data) {
    if (!data || typeof data !== 'object') return true;
    return !Object.keys(data).some(function (key) {
      return key !== 'twilight-bundles-component-name' && data[key] != null && data[key] !== '';
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

      if (typeof field.value !== 'undefined') {
        data[field.id] = field.value;
      }
    });

    return data;
  }

  function seed() {
    var rawMap = window.customComponentsRaw || {};
    var seeded = false;

    Object.keys(rawMap).forEach(function (name) {
      var key = 'form-builder::data_' + name;
      var existingRaw = localStorage.getItem(key);
      var shouldSeed = !existingRaw;

      if (existingRaw) {
        try {
          var parsed = JSON.parse(existingRaw);
          shouldSeed = isEmptyData(parsed);
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

    if (seeded) {
      console.info('[demo] Seeded default component data from twilight-bundle.json');
    }
  }

  seed();
  document.addEventListener('DOMContentLoaded', seed);
})();
`;

export default defineConfig({
  plugins: [
    sallaTransformPlugin(),
    sallaBuildPlugin(),
    sallaDemoPlugin({
      js: seedDemoDefaultsJs,
    }),
  ],
});
