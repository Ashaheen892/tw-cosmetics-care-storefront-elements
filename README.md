# Cosmetics & Care Storefront Elements

This starter kit provides a foundation for building custom Twilight components for cosmetics and beauty-care stores on Salla's e-commerce platform. It includes a pre-configured build setup and development environment to help you get started quickly.

These are Twilight storefront add-ons for Theme Raed — not a full theme. Do not follow full-theme upgrade steps (`@salla.sa/twilight`, `npm run prod`); use `pnpm run build` for this kit.

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
dist/
twilight-bundle.json
vite.config.ts
tsconfig.json
package.json
```

## Built-in Plugins

This starter kit includes three Vite plugins that handle the build process:

### 1. Transform Plugin (`sallaTransformPlugin`)
- Transforms component files to ensure proper naming and registration
- Matches components in `src/components/*/index.ts`
- To disable: Remove from `vite.config.ts` plugins array

### 2. Build Plugin (`sallaBuildPlugin`)
- Handles component bundling and output
- Creates individual files for each component in `dist/`
- Configures external dependencies (lit libraries)

### 3. Demo Plugin (`sallaDemoPlugin`)
- Provides a development environment for testing components
- Creates a demo page with your components
- Configures hot module reloading

## Component Management

Create a new component:
```
tw-create-component <component-name>
```

Delete a component:
```
tw-delete-component <component-name>
```

Each component is registered automatically as `salla-<folder-name>`.

## Multilanguage

Every field with `multilanguage: true` must be converted to a single string before render via `localizedString(...)` from `src/utils/localizedString.ts`. Never interpolate `{ ar, en }` objects directly.

## Submission checklist

```
- [ ] No raw multilanguage field display
- [ ] Clean dist covering every component in twilight-bundle.json
- [ ] Every schema key is UUID v4 (`pnpm run build` runs normalize)
- [ ] ZIP < 1MB without node_modules / .git / notion-screenshots / assets previews
- [ ] twilight-bundle.json synced in root + public + dist
```

## Submission ZIP

```bash
rm -rf dist && pnpm run build
mkdir -p release
rm -f release/theme.zip
zip -qr release/theme.zip \
  package.json tsconfig.json vite.config.ts twilight-bundle.json README.md \
  src dist public scripts/normalize_uuid_keys.py \
  -x "*.DS_Store" -x "*node_modules*" -x "*notion-screenshots*" -x "*release*"
ls -lh release/theme.zip
```
