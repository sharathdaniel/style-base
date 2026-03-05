# StyleBase

[![Ask
DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/sharathdaniel/style-base)

**StyleBase is a minimal, opinionated SCSS architecture for building
scalable, token-driven design systems.**

It provides a clean, extensible styling baseline that teams can evolve
based on product needs without locking them into a UI kit or
utility-first workflow.

---

## Table of Contents

- [Purpose and Scope](#purpose-and-scope)
- [Core Principles](#core-principles)
- [Architecture](#architecture)
- [Theming Model](#theming-model)
- [Customization](#customization)
- [CSS Layers](#css-layers)
- [Quick Start](#quick-start)
- [Tooling](#tooling)
- [Reference Implementation](#reference-implementation)

---

## Purpose and Scope

### What it is

- A style architecture, not a finished design system
- Token-driven (colors, spacing, typography)
- Built on modern CSS Layers for predictable overrides
- Framework-agnostic

### What it is not

- A drop-in UI kit
- A utility-first framework
- A replacement for Tailwind or Bootstrap
- A collection of pre-styled components

---

## Core Principles

### Layers over `!important`

Override order is managed through native CSS Layers instead of
specificity escalation.

`!important` is used only in explicit utility-level edge cases where:

- Browser defaults must be forcefully neutralized (e.g.,
  `pointer-events`, `visibility`)
- Accessibility utilities must always win (e.g., screen-reader-only
  helpers)
- Behavioral utilities must override component styles

These uses are intentional, documented, and limited to utilities ---
never components.

### Tokens First

Design decisions live in tokens (base and semantic).

- Base tokens define raw values (colors, spacing, typography)
- Semantic tokens map meaning to those values
- Components consume semantic tokens only

This keeps components theme-aware and prevents value duplication.

### Rem-Based Scaling

Typography, spacing, and layout use `rem` units for accessibility and
consistent scaling.

- Spacing values are defined once in spacing tokens
- Utilities and components consume spacing tokens directly
- No pixel-to-rem conversion is performed at the utility level

`1px` is used only where visual precision is required (e.g., borders,
dividers).

Media queries remain in `px` to avoid unexpected behavior from user
font-size adjustments.

### Exceptions, Not Shortcuts

Utilities solve one-off layout or state problems.

They should not replace components.

```html
<!-- Avoid: utility chains as pseudo-components -->
<div class="u-d-flex u-align-center u-justify-between u-px-4 u-py-3 u-bg-primary u-text-white">
  Submit
</div>
```

```html
<!-- Prefer: reusable component -->
<button class="app-c-button app-c-button-primary">Submit</button>
```

```html
<!-- Acceptable: one-off override -->
<button class="app-c-button app-c-button-primary u-mt-4">Submit</button>
```

---

## Architecture

All styling lives under `src/scss`:

    src/scss/
      abstracts/
        themes/
        tokens/
        _scales.scss
        _typography-tools.scss
        _variables.scss
      components/
      functions/
      mixins/
      utilities/
      _common.scss
      _reset.scss
      main.scss

- **Abstracts**: Tokens, themes, and shared variables (no
  layout/component styles)
- **Components**: Reusable UI building blocks, including local
  overrides for third-party/plugin styles when needed
- **Mixins / Functions**: Reusable SCSS helpers and utilities
  consumed by components and utilities
- **Utilities**: Single-purpose helpers and controlled overrides
- **Common**: Shared global styles used across multiple pages and
  components
- **Reset**: Global normalization and element-level defaults

---

## Theming Model

- Base color tokens are defined per theme (e.g., light, dark)
- Semantic tokens map to the active theme palette
- Components consume semantic tokens only

This allows full theme changes without rewriting component styles.

---

## Customization

Customize in this order, then let components consume the updated values:

1. **Typography foundation**
   - `src/scss/abstracts/tokens/_font.scss` (sizes, line heights, weights, families)
   - `src/scss/abstracts/_typography-tools.scss` (role mappings like `h-lg`, `body-md`, `ui-sm`)
2. **Color foundation**
   - `src/scss/abstracts/tokens/_colors.scss`
   - `src/scss/abstracts/themes/_light.scss` (add additional theme files in the same folder as needed)
3. **Spacing and icon scales**
   - `src/scss/abstracts/tokens/_spacing.scss`
   - `src/scss/abstracts/tokens/_icon.scss`
   - `src/scss/abstracts/_scales.scss`
4. **Component-level overrides (only when needed)**
   - `src/scss/components/_typography.scss` for class-level usage changes
5. **Responsive breakpoints**
   - `src/scss/mixins/_breakpoint.scss`
   - Semantic tiers:
     - `mobile: 0px`
     - `tablet: 768px`
     - `laptop: 1024px`
     - `desktop: 1280px`
     - `large-desktop: 1536px`
   - Core mixins:
     - `breakpoint-up($size)`: target `$size` and above
     - `breakpoint-down($size)`: target below the next tier
     - `breakpoint-between($lower, $upper)`: target an inclusive tier range
    - `breakpoint-only($size)`: target just one tier (for example, only `mobile`)
   - Notes:
     - `breakpoint-down(large-desktop)` throws an error because there is no tier above `large-desktop`
     - `breakpoint-only(large-desktop)` applies to `1536px` and up

Example usage:

```scss
@include breakpoint-only(mobile) {
  // < 768px
}

@include breakpoint-between(mobile, tablet) {
  // >= 0 and < 1024px
}

@include breakpoint-up(laptop) {
  // >= 1024px
}
```

---

## CSS Layers

StyleBase uses native CSS Layers in global stylesheets only:

```scss
@layer reset, base, plugins, components, utilities;
```

- Tokens do not participate in layer order, so token files never
  use `@layer`
- Layers define layer order for global styles and keep overrides
  predictable in cascade order without specificity escalation
- `plugins` is a reserved layer slot for vendor CSS ordering
  (typically loaded from `node_modules`)

---

## Quick Start

### 1. Install Tooling

```bash
yarn add -D sass prettier stylelint stylelint-config-standard-scss husky lint-staged
```

You may skip `sass` if your framework already provides it.

### 2. Load the SCSS entrypoint

```scss
@use './src/scss/main.scss';
```

### 3. Maintain Layer Order

```scss
@layer reset, base, plugins, components, utilities;
```

### 4. Development Rules

- Use semantic tokens inside components
- Avoid hardcoded values
- Use utilities only for edge-case overrides
- Do not escalate specificity to solve ordering issues

---

## Tooling

### Recommended Scripts

```json
{
  "scripts": {
    "lint:scss": "stylelint \"src/**/*.scss\"",
    "format:check": "prettier --check \"src/**/*.{scss,ts,tsx,js,jsx,html,json}\"",
    "prepare": "husky"
  },
  "lint-staged": {
    "src/**/*.scss": ["stylelint --fix --cache", "prettier --write"],
    "src/**/*.{ts,tsx,js,jsx,html,json}": ["prettier --write"]
  }
}
```

### Quality Stack

- Stylelint for SCSS linting
- Prettier for formatting
- Husky + lint-staged for pre-commit enforcement

### Editor Setup

Recommended VS Code extensions:

- Prettier
- Stylelint
- SonarLint (optional, for additional static analysis)

### Git & Line Endings

This repository uses `LF` line endings across text files.

- `.gitattributes` enforces LF (`* text=auto eol=lf`)
- `.editorconfig` sets `end_of_line = lf`
- Prettier uses `endOfLine: "lf"`

Recommended one-time Git setup (per developer machine):

```bash
git config --global core.autocrlf false
git config --global core.eol lf
```

If your working tree has mixed line endings:

```bash
git add --renormalize .
npx prettier --write .
```

---

## Reference Implementation

The repository includes an Angular application demonstrating how
StyleBase can be consumed in a real project.

The reference app illustrates:

- Token-driven component styling
- Layered override strategy
- SVG sprite-based icon usage
- Accessibility considerations

StyleBase itself remains framework-agnostic and can be used with
Angular, React, Vue, or any modern frontend stack.
