# CLAUDE.md — StyleBase

StyleBase is a minimal, opinionated SCSS architecture for building scalable,
token-driven design systems. It is a style foundation — not a UI kit, not a
utility-first framework. Teams adopt it as a baseline and evolve it for their
product needs.

---

## Project structure

```
src/scss/
├── abstracts/
│   ├── _scales.scss              # SCSS maps: $text-scale, $icon-scale, $space-scale
│   ├── _typography-tools.scss    # Typography variant map + text-style/text-weight mixins
│   ├── functions/
│   │   └── _rem.scss             # rem() conversion function
│   └── mixins/
│       ├── _breakpoint.scss      # breakpoint-up/down/between/only, has-hover, is-touch
│       ├── _line-clamp.scss      # line-clamp($lines) mixin
│       ├── _page-height.scss     # page-height mixin (flex column full-height layout)
│       ├── _rtl.scss             # rtl() mixin wrapping [dir='rtl'] &
│       ├── _svg-mask.scss        # svg-mask() mixin with SVG encoding helper
│       └── _truncate.scss        # truncate() mixin
├── base/
│   └── _reset.scss               # Box-sizing, margin resets, media resets — in @layer reset
├── components/
│   ├── _accordion.scss           # .app-c-accordion — structural only, styled via tokens
│   ├── _badge.scss               # .app-c-badge
│   ├── _button.scss              # .app-c-btn, .app-c-btn-primary, .app-c-btn-secondary
│   ├── _icon.scss                # .app-c-icon + u-icon-* size utilities
│   └── _typography.scss          # body base styles + .ui-page-title, .ui-section-title etc.
├── layout/
│   └── _common.scss              # html/body height + .page-wrap, .page-scroll
├── tokens/
│   ├── themes/
│   │   ├── _dark.scss            # [data-theme='dark'] semantic token mappings
│   │   └── _light.scss           # [data-theme='light'] semantic token mappings
│   ├── _colors.scss              # Base color palettes + RGB channel tokens → :root
│   ├── _font.scss                # Font family, weight, size, line-height tokens → :root
│   ├── _icon.scss                # Icon size scale tokens → :root
│   ├── _spacing.scss             # 4-point spacing scale tokens → :root
│   └── _variables.scss           # Border radius, transitions, scrollbar, app layout tokens
└── utilities/
    ├── _index.scss               # Barrel — loads all utilities inside @layer utilities
    ├── _breakpoint.scss          # Responsive hide utilities (u-hidden-mobile etc.)
    ├── _color.scss               # Semantic text color utilities (u-text-primary etc.)
    ├── _flex-layout.scss         # 12-col flex row system (u-flex-row, u-col-*)
    ├── _grid-layout.scss         # 12-col CSS grid system (u-grid-row, u-col-*)
    ├── _layout.scss              # Display, flex helpers, width/height, alignment
    ├── _misc.scss                # Cursor, sr-only, overflow, pointer-events, scrollbar
    ├── _position.scss            # Position utilities (u-static, u-relative etc.)
    ├── _spacing.scss             # Padding, margin, gap utilities from $space-scale
    ├── _text.scss                # Text alignment, transform, whitespace, truncation
    └── _typography.scss          # Font weight, font size, line-height utilities
```

---

## Entry point

`src/scss/main.scss` is the single entry point. It loads everything in this order:

1. Layer order declaration: `@layer reset, base, plugins, components, utilities`
2. Base reset (`base/reset`)
3. Token files (`tokens/colors`, `tokens/font`, `tokens/spacing`, `tokens/icon`)
4. Themes (`tokens/themes/light`, `tokens/themes/dark`)
5. Global variables (`tokens/variables`)
6. Layout common (`layout/common`)
7. Plugins slot (empty — reserved for vendor CSS)
8. Components (`typography`, `icon`, `button`, `accordion`, `badge`)
9. Utilities (`utilities/` via `_index.scss`)

All loading is done via `@include meta.load-css(...)` — do not switch to `@use` or `@forward` at the entry level.

---

## CSS layers

```scss
@layer reset, base, plugins, components, utilities;
```

| Layer        | Purpose                                                          |
|--------------|------------------------------------------------------------------|
| `reset`      | Box-sizing, margin resets, reduced-motion. Only `base/_reset.scss` writes here. |
| `base`       | Document-level defaults (body font, html/body height).           |
| `plugins`    | Reserved for third-party/vendor CSS from node_modules.           |
| `components` | All reusable UI component classes.                               |
| `utilities`  | Single-purpose helper classes. Always wins over components.      |

**Rules:**
- Token files (`:root` blocks) never use `@layer`.
- Only write to the layer that matches the file's folder.
- Never write utility classes from inside a component file.

---

## Token architecture

### Two-tier model

```
Base tokens          Semantic tokens         Component
(raw values)    →    (meaning)          →    (consumes)

--primary-500        --btn-primary-bg        .app-c-btn-primary
--neutral-200        --border-light          .app-c-accordion
```

Components only consume semantic tokens. Never reference `--primary-500` or `--neutral-200` directly inside a component.

### Color tokens (`tokens/_colors.scss`)

Palettes: `primary`, `accent`, `neutral`, `success`, `warning`, `danger`, `info`, `common`.

RGB channel tokens are emitted selectively via `$rgb-tokens`. Currently enabled for `primary` (300, 400, 500) and `common` (white, black). Use them for alpha variants:

```scss
background: rgb(var(--primary-500-rgb) / 50%);
```

### Semantic tokens (`tokens/themes/`)

Defined per theme (`[data-theme='light']` / `[data-theme='dark']`). Categories:

- `$semantic-bg` — page, surface, hover, selected backgrounds
- `$semantic-text` — primary, secondary, tertiary, disabled, link
- `$semantic-border` — light, medium, strong, focus
- `$semantic-status` — success, error, warning, info
- `$semantic-button` — primary and secondary button states
- `$semantic-accordion` — accordion component tokens
- `$semantic-scrollbar` — scrollbar thumb and track
- `$semantic-sidebar` — sidebar background

### Font tokens (`tokens/_font.scss`)

Primitive sizes: `--fs-10` through `--fs-24`.
Semantic sizes: `--fs-xs` through `--fs-4xl`.
Weights: `--fw-normal` (400), `--fw-medium` (500), `--fw-bold` (700).
Line heights: `--lh-none` (1) through `--lh-relaxed` (1.6).

### Spacing tokens (`tokens/_spacing.scss`)

4-point scale: `--space-0` (0) through `--space-10` (2.5rem / 40px).

### Icon tokens (`tokens/_icon.scss`)

`--icon-xs` (8px) through `--icon-3xl` (48px).

### Variables (`tokens/_variables.scss`)

Border radius scale: `--radius-xs` (2px) through `--radius-2xl` (16px).
Transitions: `--transition-1` (0.15s), `--transition-2` (0.3s), `--transition-3` (cubic-bezier).
Scrollbar: `--scrollbar-width`, `--scrollbar-track`.
App layout: `--app-header-height`, `--app-sidebar-width` (project-specific overrides).

---

## Abstracts

### `_scales.scss`

SCSS maps consumed by utilities and components. Do not import CSS variables directly in utility generators — use the maps.

```scss
@use '../abstracts/scales' as *;

@each $name, $value in $text-scale { ... }
@each $name, $value in $icon-scale { ... }
@each $key,  $value in $space-scale { ... }
```

### `_typography-tools.scss`

Typography variant map + private mixins. Import with `as *` to use without namespace.

```scss
@use '../abstracts/typography-tools' as *;

.my-class {
  @include text-style(body-md);   // sets font-size + line-height
  @include text-weight(medium);   // sets font-weight
}
```

Available variants: `h-md`, `h-lg`, `h-xl`, `h-xxl`, `body-md`, `body-sm`, `ui-md`, `ui-sm`, `ui-xs`.

### `rem()` function

```scss
@use '../abstracts/functions/rem' as *;

padding: rem(16);       // → 1rem
margin: rem(4) rem(8);  // → 0.25rem 0.5rem
```

Do not use `rem()` for `1px` values (borders, dividers). Use `1px` directly.

### Breakpoint mixins

```scss
@use '../abstracts/mixins/breakpoint' as *;

@include breakpoint-up(tablet)           { ... }  // ≥ 768px
@include breakpoint-down(laptop)         { ... }  // < 1024px
@include breakpoint-between(tablet, laptop) { ... }
@include breakpoint-only(mobile)         { ... }  // 0px – <768px
@include has-hover                       { ... }  // hover + fine pointer
@include is-touch                        { ... }  // coarse pointer
```

Breakpoints: `mobile` (0px), `tablet` (768px), `laptop` (1024px), `desktop` (1280px), `large-desktop` (1536px).

Media queries use `px` units, not `em` or `rem`, to avoid font-size-based breakpoint drift.

### Other mixins

```scss
@include truncate;          // single-line overflow ellipsis
@include line-clamp(3);     // multi-line clamp
@include page-height;       // flex column full-height container
@include rtl { ... }        // wraps in [dir='rtl'] &
@include svg-mask($svg);    // inline SVG as CSS mask
```

---

## Components

### Naming convention

```
app-c-{component}            base class
app-c-{component}-{variant}  variant modifier
```

Examples: `.app-c-btn`, `.app-c-btn-primary`, `.app-c-btn-secondary`, `.app-c-badge`, `.app-c-accordion`, `.app-c-icon`.

### Button system

`.app-c-btn` defines CSS custom property defaults (`--btn-bg`, `--btn-color`, etc.).
Variant classes (`.app-c-btn-primary`, `.app-c-btn-secondary`) override those properties.
This means adding new variants only requires overriding the relevant custom properties.

```scss
.app-c-btn-danger {
  --btn-bg: var(--status-error);
  --btn-bg-hover: var(--danger-800);
  --btn-color: var(--common-white);
  --btn-border: var(--status-error);
}
```

### Typography classes

Semantic role classes, not presentational names:

| Class               | Role          | Size token   |
|---------------------|---------------|--------------|
| `.app-c-page-title`    | h-xxl + bold  | `--fs-4xl`   |
| `.app-c-section-title` | h-lg + medium | `--fs-2xl`   |
| `.app-c-field-label`   | ui-sm + medium| `--fs-label` |
| `.app-c-input-text`    | body-md       | `--fs-md`    |
| `.app-c-helper-text`   | ui-xs         | `--fs-sm`    |

---

## Utilities

### Naming convention

All utility classes are prefixed `u-`.

```
u-{property}-{value}
u-{shorthand}-{scale-step}
```

### Spacing utilities

Generated from `$space-scale` (steps 0–10). Shorthand directions:

| Shorthand | Property           |
|-----------|--------------------|
| `u-p-4`   | padding            |
| `u-pt-4`  | padding-top        |
| `u-pb-4`  | padding-bottom     |
| `u-pl-4`  | padding-inline-start (RTL-safe) |
| `u-pr-4`  | padding-inline-end  |
| `u-px-4`  | padding-inline     |
| `u-py-4`  | padding-top + padding-bottom |
| `u-m-4`   | margin             |
| `u-gap-4` | gap                |

### Layout utilities

```html
u-d-flex  u-d-grid  u-d-block  u-d-none  u-d-inline-flex
u-items-center  u-items-start  u-items-end
u-justify-center  u-justify-between  u-justify-start  u-justify-end
u-flex-dir-col  u-flex-wrap  u-flex-1  u-shrink-0  u-grow
u-h-100  u-w-100  u-w-50  u-w-auto  u-min-h-0  u-min-w-0
```

### Flex layout system

12-column, gap-based flex row. Mobile-first, responsive via breakpoint suffixes.

```html
<div class="u-flex-row">
  <div class="u-col-12 u-col-laptop-6">left half on laptop+</div>
  <div class="u-col-12 u-col-laptop-6">right half on laptop+</div>
</div>
```

Column classes: `u-col-{1–12}`, `u-col-auto`, `u-col-fill`.
Responsive infixes: `-tablet-`, `-laptop-`, `-desktop-`, `-large-desktop-`.
Gap override: add `u-gap-{n}` directly on `.u-flex-row`.

### Grid layout system

12-column CSS grid. Same responsive infix pattern as flex layout.

```html
<div class="u-grid-row">
  <div class="u-col-12 u-col-laptop-6">Item 1</div>
  <div class="u-col-12 u-col-laptop-6">Item 2</div>
</div>
```

Additional modifiers: `u-col-{n}-center`, `u-col-start-{n}`, `u-col-end-last`, `u-col-full`.
Auto-fit/fill helpers: `u-grid-auto-fit`, `u-grid-auto-fill` (default min column: `16rem`).

### Responsive visibility

```html
u-hidden-mobile         <!-- hidden < 768px -->
u-hidden-tablet         <!-- hidden 768px–<1024px -->
u-hidden-mobile-tablet  <!-- hidden < 1024px -->
u-hidden-laptop-up      <!-- hidden ≥ 1024px -->
```

### Color utilities

Semantic text colors only: `u-text-primary`, `u-text-secondary`, `u-text-tertiary`,
`u-text-disabled`, `u-text-link`, `u-text-error`, `u-text-success`, `u-text-warning`, `u-text-info`.

### Typography utilities

```
u-fw-normal  u-fw-medium  u-fw-bold
u-text-xs  u-text-sm  u-text-label  u-text-md  u-text-lg  u-text-xl  u-text-2xl  u-text-3xl  u-text-4xl
u-lh-none  u-lh-tight  u-lh-normal  u-lh-body  u-lh-relaxed
```

### Accessibility

```html
u-sr-only  <!-- visually hidden, screen-reader visible -->
```

`!important` is intentional on `u-sr-only` and `u-d-none` — these must always take effect.

---

## Theming

Apply themes via the `data-theme` attribute on any ancestor element (typically `<html>` or `<body>`):

```html
<html data-theme="light"> ... </html>
<html data-theme="dark">  ... </html>
```

Switching themes at runtime:

```ts
document.documentElement.setAttribute('data-theme', 'dark');
```

Both themes must always be defined. Never remove `_light.scss` or `_dark.scss`.

---

## Development rules

### Always

- Use semantic tokens inside components (`--btn-primary-bg`, `--text-primary`, `--border-focus`).
- Use logical CSS properties for RTL support (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`).
- Use `rem()` for spacing and sizing values. Use `1px` only for borders and dividers.
- Keep `@layer` assignments consistent with the file's folder layer.
- Use `dvh` instead of `vh` for viewport height (enforced by stylelint).

### Never

- Hardcode hex colors, pixel spacing, or font-size values in components.
- Use physical directional properties (`margin-left`, `padding-right`, `left`, `right`) — stylelint will error.
- Use `text-align: left/right` or `float: left/right` — use `start`/`end`.
- Use `!important` except in utility classes where override is the explicit intent.
- Replace a component with a chain of utility classes.
- Reference base color tokens directly in components (use semantic tokens instead).

---

## Tooling

### Stack

| Tool                          | Version   | Purpose                          |
|-------------------------------|-----------|----------------------------------|
| Angular CLI                   | ^20.1.1   | Build, serve, test               |
| Sass                          | via Angular build | SCSS compilation          |
| Stylelint                     | ^17.4.0   | SCSS linting                     |
| stylelint-config-standard-scss| ^17       | Stylelint ruleset                |
| Prettier                      | ^3.8.1    | Code formatting                  |
| Husky                         | ^9.1.7    | Git hooks                        |
| lint-staged                   | ^16.4.0   | Pre-commit lint + format         |

### Scripts

```bash
yarn lint:scss         # stylelint "src/**/*.scss"
yarn format:check      # prettier --check on all src files
yarn start             # ng serve
yarn build             # ng build
```

### Pre-commit hook

Husky runs lint-staged on commit:
- SCSS files: `stylelint --fix --cache` then `prettier --write`
- TS/HTML/JSON files: `prettier --write`

### Stylelint rules (key)

- `no-descending-specificity: true` (relaxed inside `components/**`)
- `selector-max-compound-selectors: 4`
- `selector-max-specificity: 0,4,0`
- `max-nesting-depth: 4`
- Physical properties disallowed: `margin-left/right`, `padding-left/right`, `left`, `right`, border-{left,right}-*, border-{corner}-radius
- Physical values disallowed: `text-align: left/right`, `float: left/right`
- `vh` unit disallowed for heights and custom properties (use `dvh`/`svh`)
- Vendor prefixes allowed for `-webkit-mask-*` and `-webkit-user-select`
- SCSS variables must match `^[a-z][a-z0-9-]*$`

### Prettier config

```json
{
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5",
  "endOfLine": "lf"
}
```

### Angular integration

In `angular.json`:
```json
"styles": ["src/scss/main.scss"],
"stylePreprocessorOptions": { "includePaths": ["src/scss"] },
"inlineStyleLanguage": "scss"
```

The `includePaths` setting means all `@use` paths inside SCSS files are relative to `src/scss/`. Example: `@use '../abstracts/scales' as *` from within `utilities/`.

---

## Git and line endings

All files use LF line endings, enforced by `.gitattributes`, `.editorconfig`, and Prettier.

```bash
git config core.autocrlf false
git config core.eol lf
```

To fix mixed line endings in a working tree:

```bash
git add --renormalize .
npx prettier --write .
```

---

## Adding new things

### New token

1. Add the raw value to the appropriate `tokens/_*.scss` file (e.g. `_colors.scss`, `_spacing.scss`).
2. Map it to a semantic name in `tokens/themes/_light.scss` and `tokens/themes/_dark.scss`.
3. Components reference the semantic token. Done.

### New component

1. Create `src/scss/components/_my-component.scss`.
2. Wrap all styles in `@layer components { ... }`.
3. Name the base class `app-c-{name}`.
4. Only consume semantic tokens (no base tokens, no hardcoded values).
5. Add `@include meta.load-css('components/my-component')` in `main.scss` after existing components.

### New utility

1. Add to an existing utility file if the property fits, or create a new `_name.scss`.
2. Do not wrap in `@layer` — the barrel `_index.scss` wraps everything in `@layer utilities`.
3. Add the file to `utilities/_index.scss` if creating a new file.

### New breakpoint

1. Add to `$breakpoints` map in `abstracts/mixins/_breakpoint.scss`.
2. Add a corresponding `@include breakpoint-up(...)` block in both `_flex-layout.scss` and `_grid-layout.scss`.

---

## What StyleBase is not responsible for

- Application routing or state
- Component behaviour or interactivity (JS/TS)
- Design tokens beyond what's in `tokens/` — consuming apps can extend by adding their own token files and loading them after `main.scss`
- Icon SVG content — icons are rendered via SVG sprites; the `svg-mask` mixin and `.app-c-icon` component handle display only
