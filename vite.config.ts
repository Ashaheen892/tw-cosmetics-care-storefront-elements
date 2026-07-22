import { defineConfig } from 'vite';
import {
  sallaBuildPlugin,
  sallaDemoPlugin,
  sallaTransformPlugin,
} from '@salla.sa/twilight-bundles/vite-plugins';

export default defineConfig({
  // Keep localizedString readable in dist for Salla review scanners
  esbuild: {
    keepNames: true,
    minifyIdentifiers: false,
  },
  plugins: [sallaTransformPlugin(), sallaBuildPlugin(), sallaDemoPlugin()],
});
