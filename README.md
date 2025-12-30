# StyleBase

StyleBase is a **minimal, scalable style foundation** for Angular projects.  
It provides a clean SCSS architecture, design tokens, utilities, and CSS layers - **without being a UI framework like Tailwind or Bootstrap**.

This project is intended to be a solid starting point that teams can **extend and customize**, not a complete design system.

---

## What’s included

### Architecture
- **Angular Standalone**: Built entirely with Angular Standalone Components, eliminating `NgModules` for a simpler and more modern setup.

### SCSS & CSS Architecture
- **Modular SCSS** structure located in `src/scss`
  - **Abstracts**: Design tokens for colors, spacing, typography, and themes
  - **Mixins**: Reusable helpers for breakpoints, truncation, and line-clamping
  - **Utilities**: Config-driven utility generator for spacing, sizing, and typography
- **CSS Layers (`@layer`)** for predictable overrides without `!important`
  - `reset`
  - `base`
  - `components`
  - `utilities`

### Icon System
A lightweight, accessible SVG icon setup:
- **SVG sprites** defined via `IconRegistryComponent` to avoid multiple network requests
- **Reusable `<app-icon>` component** using the `<use>` tag
- **Accessibility-friendly** with built-in support for `ariaLabel`

### Code Quality & Tooling
- **Stylelint** for consistent and error-free SCSS
- **Prettier** for automatic formatting
- **Husky + lint-staged** to enforce quality checks before commits

---

### Editor setup (recommended)

- Prettier (formatting)
- Stylelint (SCSS linting)

## Development

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.

To start a local development server:

```bash
ng serve --open
