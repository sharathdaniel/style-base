# Installing StyleBase

StyleBase is a copy-paste SCSS architecture - there is no npm package to install.
Copy the files you need into your project, configure your build tool, and start using it.

---

## What to Copy

### Core SCSS (Required)

Copy the entire `src/scss/` directory into your project:

    src/scss/                -> your-project/src/scss/
      abstracts/                 Shared Sass logic (functions, mixins, scales)
      base/                      Global reset styles
      components/                Reusable UI blocks
      layout/                    Page-level structures
      tokens/                    CSS custom properties and theme definitions
      utilities/                 Single-purpose helper classes
      main.scss                  Entry point - loads everything in layer order

This is the full style system. Do not cherry-pick individual folders - the system is designed to work as a whole.

> **Path note:** You can place the SCSS directory anywhere in your project. Just update your framework's `includePaths` and the import path to match.

### Tooling Config (Recommended)

These enforce consistent code quality. If you already have these in your project, merge the relevant rules rather than overwriting.

    .stylelintrc.json        SCSS linting rules (enforces logical properties, dvh, etc.)
    .prettierrc              Formatting (LF line endings, 2-space indent)
    .prettierignore          Excludes dist, lock files, etc.
    .editorconfig            Editor-level formatting consistency
    .gitattributes           Enforces LF line endings in git
    .husky/pre-commit        Runs lint-staged on commit
    .vscode/extensions.json  Recommends Prettier, Stylelint, SonarLint extensions
    .vscode/settings.json    Format-on-save, Stylelint auto-fix, disables built-in SCSS validation

### AI Rule Files (Optional)

Architecture rules formatted for AI coding assistants. You can append your own framework-specific instructions to these files.

    CLAUDE.md                            Architecture rules for Claude
    .claude/rules/adding-new-things.md   Extension guidelines for Claude
    .cursor/rules/stylebase.mdc          Architecture rules for Cursor
    .agent/workflows/stylebase.md        Architecture rules for Agent CLI

---

## What NOT to Copy

These are specific to the StyleBase reference repository:

    src/app/                  Angular reference application
    angular.json              Angular CLI config
    tsconfig.*                TypeScript configs
    package.json              Contains Angular-specific dependencies
    public/                   Static assets
    README.md                 Repository documentation
    INSTALLATION.md           This setup guide
    yarn.lock                 Dependency lock file
    .vscode/launch.json       Angular debugger config
    .vscode/tasks.json        Angular dev/test tasks
    .github/                  CI/CD workflows for this repository

---

## Framework Setup

### 1. Install Dependencies

```bash
yarn add -D sass prettier stylelint stylelint-config-standard-scss husky lint-staged
```

Skip `sass` if your framework already bundles it.

#### Framework-Specific Tooling

The default Prettier and Stylelint configs cover `.html`, `.ts`, `.tsx`, `.jsx`, `.scss`, and `.css`. If you are using Vue, Svelte, or Astro, add the relevant plugins:

- **Vue**: Add `stylelint-config-standard-vue` and include `"vue"` in `stylelint.validate` (VS Code settings)
- **Svelte**: Add `prettier-plugin-svelte` and include `"svelte"` in `stylelint.validate` (VS Code settings)
- **Astro**: Add `prettier-plugin-astro`

Also add matching VS Code formatter entries (e.g., `[vue]`, `[svelte]`) to `.vscode/settings.json`.

### 2. Add Scripts

Add the linting and formatting scripts to your `package.json`. See the [Tooling](README.md#tooling) section in README for the recommended configuration.

### 3. Configure Your Framework

Each framework needs two things:
- An SCSS include path pointing to your `scss/` directory
- The `main.scss` loaded as a global stylesheet

#### Angular

```json
// angular.json -> architect.build.options
"stylePreprocessorOptions": {
  "includePaths": ["src/scss"]
},
"styles": ["src/scss/main.scss"]
```

#### Vite (React, Vue, Svelte)

```js
// vite.config.js
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['src/scss']
      }
    }
  }
});
```

```js
// Import in your app entry (main.js / main.ts)
import './src/scss/main.scss';
```

#### Next.js

```js
// next.config.js
const nextConfig = {
  sassOptions: {
    includePaths: ['src/scss']
  }
};
```

```tsx
// Import in app/layout.tsx or pages/_app.tsx
import '../src/scss/main.scss';
```

#### Webpack

```js
// webpack.config.js -> sass-loader options
{
  loader: 'sass-loader',
  options: {
    sassOptions: {
      includePaths: [path.resolve(__dirname, 'src/scss')]
    }
  }
}
```

> Check your framework's documentation for version-specific SCSS configuration syntax.

### 4. Verify Layer Order

The layer declaration in `main.scss` must remain the first rule:

```scss
@layer reset, base, plugins, components, utilities;
```

### 5. Development Rules

- Use semantic tokens inside components
- Avoid hardcoded values
- Use utilities only for edge-case overrides
- Do not escalate specificity to solve ordering issues

### 6. Git Setup (Recommended)

```bash
git config core.autocrlf false
git config core.eol lf
```

---

## Post-Setup Checklist

- [ ] `src/scss/` directory copied into your project
- [ ] `main.scss` loads without build errors
- [ ] Stylelint runs clean (`yarn lint:scss`)
- [ ] Prettier formats SCSS files correctly
- [ ] Husky pre-commit hook fires on commit
- [ ] Light and dark themes render correctly
- [ ] Your application serves the styles
