# StyleBase

**StyleBase is a minimal, opinionated SCSS foundation for building custom design systems.**

It provides a **clean, scalable styling baseline** that teams can extend and evolve based on their own product needs.

---

## What StyleBase is (and is not)

### ✅ What it is

- A **style foundation**, not a finished design system
- Token-driven (colors, spacing, typography)
- Uses **modern CSS Layers** for global styles and utilities

### ❌ What it is not

- A drop-in UI kit
- A utility-first framework
- A replacement for Tailwind or Bootstrap
- A collection of pre-styled components

---

## Core Principles

- **Layers over `!important`**  
  Style overrides are managed using CSS Layers, avoiding the need for high-specificity selectors or `!important`.

  In a few **intentional utility-level edge cases**, `!important` is used where:
  - browser defaults must be forcefully neutralized (e.g. `pointer-events`, `visibility`)
  - accessibility utilities must always win (e.g. screen-reader-only)
  - component styles should never block a behavioral utility

  These uses are **explicit, documented and limited to utilities**, never components.

- **Tokens first**  
  Design decisions live in tokens (base and semantic), while components consume and locally configure them via scoped CSS variables.
  Colors, typography and spacing are fully tokenized.

- **Rem-based scaling**  
  StyleBase uses `rem` units for typography, spacing and layout to ensure consistent scaling and accessibility.
  - Spacing values are defined once in spacing tokens.
  - Utilities and components consume spacing tokens directly.
  - No pixel-to-rem conversion is performed at the utility level.
  - For rare one-off layout adjustments, the `rem()` function in the `functions` folder may be used in component styles.

  Note:
  - `1px` is used where visual precision is required (e.g. borders, dividers).
  - Media queries use `px`, as `rem`-based breakpoints can be affected by user font-size settings.

- **Exceptions, not shortcuts**  
  Utilities exist to solve edge cases, not to replace components.

  **❌ Avoid using utilities as a substitute for components**

  ```html
  <div class="u-d-flex u-align-center u-justify-between u-px-4 u-py-3 u-bg-primary u-text-white">
    Submit
  </div>
  ```

  **✅ Prefer components for reusable UI**

  ```html
  <button class="app-c-button app-c-button-primary">Submit</button>
  ```

  **✅ Utilities are acceptable for one-off exceptions**

  ```html
  <button class="app-c-button app-c-button-primary u-mt-4">Submit</button>
  ```

---

## Architecture Overview

### SCSS Structure

All styling lives under `src/scss`, organized by responsibility:

- **Abstracts**
  - Design tokens (colors, typography, spacing)
  - Theme definitions
  - No component or layout styles

- **Plugins**
  - Third-party or vendor styles (from node_modules)
  - Base styles for external UI libraries
  - Intended to be overridden by Components or Utilities

- **Components**
  - Reusable UI building blocks
  - Application and design-system components

- **Utilities**
  - Single-purpose helpers (spacing, sizing, typography)
  - Intended as overrides

### Theming model

StyleBase uses **theme-scoped color palettes**.

- Base color tokens are defined per theme (e.g. light, dark)
- Semantic tokens map to the active theme palette
- Components consume semantic tokens only

This allows entire color systems to change between themes without modifying components.

### CSS Layers

StyleBase uses native CSS Layers to guarantee predictable overrides.
CSS Layers are used only in global stylesheets, not in page styles.

```scss
@layer reset, base, plugins, components, utilities;
```

### Tokens vs Layers (Important)

- Tokens define values and never participate in the cascade
- Layers control override order for global styles
- Token files never use `@layer`
- Only global CSS uses layers (`reset`, `base`, `components`, `utilities`)

### Icon system (reference implementation)

StyleBase itself is framework-agnostic.

To illustrate how an icon system could be integrated, the repository includes an Angular-based example.

The Angular-based example demonstrates:

- SVG sprites to avoid multiple network requests
- A reusable `<app-icon>` component using `<use>`
- Accessibility support via `aria-label`

These patterns are optional and can be adapted to any framework (React, Vue, etc).

### Code Quality & Tooling

- **Stylelint** for consistent and error-free SCSS
- **Prettier** for automatic formatting
- **Husky + lint-staged** to enforce quality checks before commits

All configuration files are included in the repository and require no manual setup.

---

## Installation

```bash
yarn add -D sass prettier stylelint stylelint-config-standard-scss husky lint-staged
```

> **Note:** You can skip installing `sass` if your framework already provides it.

**package.json** setup

```json
{
  "scripts": {
    "lint:scss": "stylelint \"src/**/*.scss\"",
    "format:check": "prettier --check \"src/**/*.{scss,ts,html,json}\"",
    "prepare": "husky"
  },
  "devDependencies": {
    "sass": "^1.97.2",
    "prettier": "^3.8.0",
    "stylelint": "^17",
    "stylelint-config-standard-scss": "^17",
    "husky": "^9.1.7",
    "lint-staged": "^16.2.7"
  },
  "lint-staged": {
    "src/**/*.{scss,ts,html,json}": ["prettier --write"],
    "src/**/*.scss": ["stylelint --fix --cache"]
  }
}
```

## Editor setup (recommended)

For the best development experience, install the following extensions (VS Code):

- Prettier (formatting)
- Stylelint (SCSS linting)

## Development

An Angular application is included in this repository as a reference implementation demonstrating the consumption of StyleBase. Use of Angular is not required by StyleBase itself.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.

To start a local development server:

```bash
ng serve --open
```
