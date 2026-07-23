import { defineConfig, type Plugin } from 'vite';
import {
  sallaBuildPlugin,
  sallaDemoPlugin,
} from '@salla.sa/twilight-bundles/vite-plugins';

/**
 * Salla's stock transform grabs the FIRST `class Foo` in the file.
 * After flattening helpers into index.ts, helper classes (e.g. FrameLoader)
 * get registered instead of the component. Prefer `export default class`.
 */
function sallaTransformPluginFixed(): Plugin {
  const pathRe =
    /^.*\/(?<componentDir>components)\/(?<componentName>[^/]+)\/index\.ts$/;
  return {
    name: 'salla-component-transform-fixed',
    enforce: 'pre',
    transform(code, id) {
      const matched = id.match(pathRe);
      if (!matched) return null;

      const classMatch =
        code.match(/export\s+default\s+class\s+(\w+)/) ||
        code.match(/class\s+(\w+)\s+extends\s+[\w.]+/);
      if (!classMatch) return null;

      const className = classMatch[1];
      const componentName =
        matched.groups?.componentName ||
        id.split('/')[id.split('/').indexOf('components') + 1];
      const prefix =
        componentName.substring(0, 6).toLowerCase() === 'salla-' ? '' : 'salla-';

      return {
        code: `${code}
        if (typeof ${className} !== 'undefined') {${className}.registerSallaComponent('${prefix}${componentName}');}`,
      };
    },
  };
}

export default defineConfig({
  // Keep localizedString readable in dist for Salla review scanners
  esbuild: {
    keepNames: true,
    minifyIdentifiers: false,
  },
  plugins: [sallaTransformPluginFixed(), sallaBuildPlugin(), sallaDemoPlugin()],
});
