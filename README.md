# StyleBase

**StyleBase is a minimal, opinionated SCSS foundation for building custom design systems.**

It provides a **clean, scalable styling baseline** that teams can extend and evolve based on their own product needs.

---

## What StyleBase is (and is not)

### ✅ What it is

- A **style foundation**, not a finished design system
- Token-driven (colors, spacing, typography)
- Built on **modern CSS Layers** for safe overrides

### ❌ What it is not

- A drop-in UI kit
- A utility-first framework
- A replacement for Tailwind or Bootstrap
- A collection of pre-styled components

---

## Core Principles

- **Layers over `!important`**  
  All overrides are handled through CSS Layers, not specificity wars.

- **Tokens first**  
  Design decisions live in tokens, not scattered values.

- **Rem-based scaling**  
  StyleBase uses `rem` units for typography, spacing, and layout to ensure consistent scaling and accessibility.  
  A shared `rem()` utility function is provided in the `functions` folder to handle pixel-to-rem conversion.

  Exceptions:
  - `1px` is used where visual precision is required (e.g. borders, dividers).
  - Media queries use `px`, as `rem`-based breakpoints can be affected by user font-size settings.

- **Foundation, not prescription**  
  StyleBase gives you structure, not visual identity.

- **Exceptions, not shortcuts**  
  Utilities exist to solve edge cases, not to replace components.

---

## Architecture Overview

### SCSS Structure

All styling lives under `src/scss`, organized by responsibility:

- **Abstracts**
  - Design tokens (colors, spacing, typography)
  - Theme definitions
  - No component or layout styles

- **Mixins**
  - Breakpoints
  - Truncation and line-clamping helpers

- **Components**
  - Reusable UI building blocks
  - No page-level layout assumptions

- **Utilities**
  - Single-purpose helpers (spacing, sizing, typography)
  - Intended as overrides

### CSS Layers

StyleBase uses native CSS Layers to guarantee predictable overrides:

```scss
@layer reset, base, plugins, components, utilities;
```

### Icon System

A lightweight, accessible SVG icon setup:

- **SVG sprites** defined via `IconRegistryComponent` to avoid multiple network requests
- **Reusable `<app-icon>` component** using the `<use>` tag
- **Accessibility-friendly** with built-in support for `ariaLabel`

### Code Quality & Tooling

- **Stylelint** for consistent and error-free SCSS
- **Prettier** for automatic formatting
- **Husky + lint-staged** to enforce quality checks before commits

## Installation

```bash
npm install -D sass prettier stylelint stylelint-config-standard-scss stylelint-config-prettier-scss husky lint-staged
```

**package.json** setup

```json
{
  "scripts": {
    "lint:scss": "stylelint \"src/**/*.scss\"",
    "format:check": "prettier --check \"src/**/*.{scss,ts,html,json}\"",
    "prepare": "husky"
  },
  "devDependencies": {
    "sass": "^1.77.0",
    "prettier": "^3.7.4",
    "stylelint": "^16.26.1",
    "stylelint-config-standard-scss": "^16.0.0",
    "stylelint-config-prettier-scss": "^1.0.0",
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
