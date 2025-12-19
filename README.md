# StyleBase

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Features

### Architecture
- **Standalone**: The entire application is built using Angular Standalone Components, removing the need for `NgModules` and streamlining the architecture.

### SCSS Architecture
The project utilizes a modular SCSS structure inspired by the 7-1 pattern located in `src/scss`:
- **Abstracts**: Centralized configuration for variables (`_variables.scss`), typography (`_typography.scss`), and themes (`_theme-light.scss`).
- **Mixins**: clear, reusable mixins for breakpoints, line-clamping, and text truncation.
- **Utilities**: A robust utility generator (`_utilities.scss`) that creates spacing (margin, padding, gap), sizing, and typography classes based on configurable Sass maps and functions.
- **Layer System**: usage of `@layer` to organize styles into `base`, `components`, and `utilities` to manage specificity.

### Icon System
An efficient and accessible SVG icon system:
- **SVG Sprites**: Uses `IconRegistryComponent` to define SVG symbols (e.g., `icon-home`, `icon-user`) preventing request overhead.
- **Reusable Component**: A standalone `IconComponent` (`<app-icon>`) that renders icons using the `<use>` tag.
- **Accessibility**: Built-in support for `ariaLabel` to properly handle decorative vs. semantic icons.