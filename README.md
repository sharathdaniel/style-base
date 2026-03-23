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
- [CSS Layers](#css-layers)
- [Theming Model](#theming-model)
- [Customization](#customization)
- [Flex and Grid Layout Systems](#flex-and-grid-layout-systems)
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

Override order is managed through native CSS Layers and predictable
cascade flow instead of specificity escalation.

Use `!important` only for rare, utility-level exceptions where a
deterministic override is required (for example, accessibility helpers,
forced behavioral resets, or targeted overrides against third-party
inline styles). Keep it intentional, documented, and never the default.

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
- Utilities consume spacing tokens for class generation
- Components and layout use `rem()` directly for spacing (e.g., `rem(16)`)
- Values follow a 4px scale

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
      base/
      components/
      layout/
      tokens/
      utilities/
      main.scss

- **Abstracts**: Shared Sass logic with no CSS output (functions, mixins, scales)
- **Base**: Global reset styles
- **Components**: Reusable UI building blocks
- **Layout**: Macro-level structures and shared page wrappers
- **Tokens**: CSS custom properties, SCSS variables, and theme definitions
- **Utilities**: Single-purpose helpers and utility classes

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

## Theming Model

- Base color tokens are defined per theme (e.g., light, dark)
- Semantic tokens map to the active theme palette
- Components consume semantic tokens only
- Light theme is the `:root` default - works without any `data-theme` attribute
- Dark theme auto-applies via `prefers-color-scheme: dark` when no explicit theme is set
- Setting `data-theme="light"` or `data-theme="dark"` always overrides system preference

This allows full theme changes without rewriting component styles.

---

## Customization

Customize in this order, then let components consume the updated values:

1. **Typography foundation**
   - `src/scss/tokens/_font.scss` (sizes, line heights, weights, families)
   - `src/scss/abstracts/_typography-tools.scss` (role mappings like `h-lg`, `body-md`, `ui-sm`)
   - `src/scss/components/_typography.scss` for class-level usage changes (only when needed)
2. **Color foundation**
   - `src/scss/tokens/_colors.scss`
   - `src/scss/tokens/themes/_light.scss`
   - `src/scss/tokens/themes/_dark.scss`
3. **System scales**
   - `src/scss/tokens/_spacing.scss`
   - `src/scss/tokens/_icon.scss`
   - `src/scss/abstracts/_scales.scss`
4. **Responsive breakpoints**
   - `src/scss/abstracts/mixins/_breakpoint.scss`
   - Semantic tiers:
     - `mobile: 0px`
     - `mobile-lg: 640px`
     - `tablet: 768px`
     - `laptop: 1024px`
     - `desktop: 1280px`
     - `desktop-lg: 1536px`

---

## Flex and Grid Layout Systems

StyleBase provides dedicated flex and grid layout systems, both using a 12-column structure by default:

- `src/scss/utilities/_flex-layout.scss` for one-dimensional row-based layouts
- `src/scss/utilities/_grid-layout.scss` for two-dimensional column/row layouts

Both layout systems use the same responsive tier names:

- `mobile-lg`
- `tablet`
- `laptop`
- `desktop`
- `desktop-lg`

Mobile is the default (no breakpoint suffix). Responsive class variants start at `mobile-lg` and up.

Start with flex layout for most common UI composition needs (row/column alignment, spacing, and distribution in a single axis).
Choose grid layout when you need two-dimensional control across both rows and columns.

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

Follow the layer order defined in the [CSS Layers](#css-layers)
section.

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

### AI Assistants

StyleBase includes architecture rules formatted for popular AI coding assistants. When adopting StyleBase, you can safely append your own framework-specific instructions to these files:

- `CLAUDE.md` - Read automatically by Claude
- `.cursor/rules/stylebase.mdc` - Read automatically by Cursor
- `.agent/workflows/stylebase.md` - Read automatically by Antigravity and other agent CLI tools

### Git & Line Endings

This repository uses `LF` line endings across text files.
Using LF avoids cross-platform diffs, keeps commits cleaner, and matches most tooling and CI/Linux environments by default.

- `.gitattributes` enforces LF (`* text=auto eol=lf`)
- `.editorconfig` sets `end_of_line = lf`
- Prettier uses `endOfLine: "lf"`

Recommended Git setup for this repository only:

```bash
git config core.autocrlf false
git config core.eol lf
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
