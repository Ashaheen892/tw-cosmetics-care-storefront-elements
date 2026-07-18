# Cosmetics & Care Storefront Elements

This kit provides custom Twilight components for cosmetics and beauty-care stores on Salla's e-commerce platform. It includes a pre-configured build setup and development environment to help you get started quickly.

## Getting Started

1. Clone this repository
2. Run `pnpm install` to install dependencies
3. Run `pnpm run dev` to start the development server
4. Run `pnpm run build` to build your components for production

## Project Structure

```
src/
  components/
    your-component-name/
      index.ts        # Main component file
      styles.ts       # Component styles (optional)
      types.ts        # Component types (optional)
      utils.ts        # Component helpers (optional)
  utils/
    localizedString.ts
    helpers.ts
    sharedStyles.ts

dist/                 # Built component files
twilight-bundle.json  # Component settings schema for the Salla editor
vite.config.ts
tsconfig.json
package.json
```

## Components

| Folder | Description |
| --- | --- |
| `beauty-shade-finder` | Interactive shade quiz |
| `beauty-routine-builder` | Care routine builder |
| `beauty-ingredient-lab` | Active ingredients explorer |
| `beauty-care-assistant` | Branching care assistant |
| `beauty-collection-reveal` | Collection reveal experience |
| `beauty-face-zone-map` | Interactive face care map |
| `beauty-routine-layering-board` | Drag-and-drop routine layering |
| `beauty-lighting-finish-simulator` | Lighting & finish simulator |
| `beauty-pao-expiry-calculator` | PAO / expiry calculator |
| `beauty-texture-absorption-lab` | Texture & absorption lab |
| `beauty-actives-compatibility` | Actives compatibility checker |
| `beauty-fragrance-finder` | Fragrance family finder |
| `beauty-spf-guide` | SPF guide |
| `beauty-color-harmony` | Color harmony tool |
| `beauty-weekly-planner` | Weekly care planner |

Each component is registered automatically as `salla-<folder-name>`.

## Built-in Plugins

This starter kit includes three Vite plugins that handle the build process:

### 1. Transform Plugin (`sallaTransformPlugin`)

* Transforms component files to ensure proper naming and registration
* Matches components in `src/components/*/index.ts`
* To disable: Remove from `vite.config.ts` plugins array

### 2. Build Plugin (`sallaBuildPlugin`)

* Handles component bundling and output
* Creates individual files for each component in `dist/`
* Configures external dependencies (lit libraries)

### 3. Demo Plugin (`sallaDemoPlugin`)

* Provides a development environment for testing components
* Creates a demo page with your components
* Configures hot module reloading

## Component Management

### Creating New Components

```bash
pnpm tw-create-component <component-name>
```

Or run without arguments for interactive mode:

```bash
pnpm tw-create-component
```

### Deleting Components

```bash
pnpm tw-delete-component <component-name>
```

## Component Requirements

Each component should:

1. Be a class that extends `LitElement`
2. Export the class as default
3. Be placed in its own directory under `src/components/`
4. Have an `index.ts` as the entry point

Example:

```ts
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class MyComponent extends LitElement {
  @property({ type: Object })
  config?: {
    name: string;
  };

  static styles = css`/* your styles */`;

  render() {
    return html`<div>Hello ${this.config?.name || 'World'}!</div>`;
  }
}
```

## Building for Production

Run `pnpm run build` to create production-ready bundles in the `dist/` directory. Each component will have its own file named after the component (e.g., `beauty-shade-finder.js`).

## Development

Run `pnpm run dev` to start the development server. This will:

1. Create a demo page with all your components
2. Enable hot module reloading
3. Provide a development environment for testing

## License

MIT
