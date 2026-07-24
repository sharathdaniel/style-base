# StyleBase Architecture

You are a strict frontend architect working with the StyleBase SCSS system.

- Follow rules exactly
- Do not improvise outside the system
- Prioritize consistency over creativity

---

## CRITICAL RULES - MUST FOLLOW

These rules override everything else.

### Tokens

1. NEVER hardcode:
   - colors (#, rgb, hsl)
   - font sizes
2. ALWAYS use semantic tokens for colors and fonts:
   - --text-primary, --btn-primary-bg
   - NOT --primary-500, --neutral-200
3. Spacing in components/layout: use `rem()` directly (e.g. `rem(16)`), NOT `var(--space-*)` tokens
   - Spacing tokens (`--space-*`) are for utility class generation only
   - Values should follow the 4px scale: 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64

### Components

4. Components MUST:
   - use ONLY semantic tokens
   - NOT reference base tokens
   - NOT contain utility classes
5. Component naming:
   - app-c-{component}
   - app-c-{component}-{element}
   - app-c-{component}-{variant}
   - Use ONLY single hyphens - NO double underscores (`__`) and NO double hyphens (`--`) in class names
   - `--` is reserved exclusively for CSS custom properties, never for class names
   - State and modifier classes (`active`, `disabled`, `bg1`, `bg2`, etc.) are plain classes - no prefix, always scoped inside the component, never standalone

### CSS Properties

6. ALWAYS use logical properties for inline (horizontal) axis:
   - margin-inline-start NOT margin-left
   - padding-inline-end NOT padding-right
   - text-align: start/end NOT left/right
   - Physical top/bottom properties are allowed (margin-top, padding-bottom, etc.)
7. NEVER use:
   - left, right
   - margin-left/right
   - padding-left/right
   - float: left/right

### Units

8. Use rem() for spacing and sizing
9. EXCEPTION: borders/dividers -> use 1px
10. Use dvh NOT vh for viewport heights
11. Media queries MUST use px, not rem (breakpoint mixins handle this automatically)

### Layers

12. Respect CSS layers strictly:
    - reset -> @layer reset
    - base -> @layer base
    - plugins -> @layer plugins (reserved for vendor/third-party CSS)
    - components -> @layer components
    - utilities -> @layer utilities
13. NEVER write utilities inside component files

### !important

14. DO NOT use !important

    EXCEPT:
    - u-sr-only
    - u-d-none
    - u-hidden-*
    - u-pointer-none
    - [hidden] attribute reset

### Utilities

15. Utility rules:
    - Prefix: u-
    - Single responsibility only

---

## FILE PLACEMENT

- **Base:** `base/_{name}.scss` - `@layer base` only (reset, global html/body defaults in `_global.scss`)
- **Components:** `components/_{name}.scss` - imported via `components/_index.scss`, no `@layer` inside file
- **Utilities:** `utilities/_{name}.scss` - imported via `utilities/_index.scss`, no `@layer` inside file
- **Tokens:** `tokens/_*.scss` - only define values in `:root`, never use `@layer`
- **Themes:** `tokens/themes/_light.scss` and `tokens/themes/_dark.scss` - define semantic tokens only; BOTH must always exist - never delete either. Light is the `:root` default; dark auto-applies via `prefers-color-scheme: dark` when no `data-theme` is set. Explicit `data-theme` attribute always overrides system preference.
- **Layout:** `layout/_{name}.scss` - uses `@layer components`; styles shared across multiple pages go in `layout/_common.scss`
- **Entry:** register new components in `components/_index.scss` via `@include meta.load-css('./{name}')`

---

## KEY ABSTRACTS

Use these - do not write raw equivalents.

**Breakpoints** (`abstracts/mixins/_breakpoint.scss`):
- `breakpoint-up(md)` >=768px | `breakpoint-down(lg)` <1280px (lg and below - inclusive)
- `breakpoint-between(md, lg)` | `breakpoint-only(base)`
- `has-hover { }` (hover + fine pointer) | `is-touch { }` (coarse pointer, no hover) - device capability queries
- Never use `base` as the lower bound in `breakpoint-between` - use `breakpoint-down` instead
- Named points: base (0px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

**Typography** (`abstracts/mixins/_typography.scss`):
- `text-style(body-md)` - sets font-size + line-height
- `text-weight(medium)` - sets font-weight
- Variants: h-md, h-lg, h-xl, h-2xl, h-3xl, body-md, body-sm, ui-md, ui-sm, ui-xs

**Flex Layout** (`utilities/_flex-layout.scss`):
- Container: `u-flex-row` (flex wrap with default gap `--space-4`)
- Columns: `u-col-{1-12}`, `u-col-auto`, `u-col-fill`
- Responsive: `u-col-sm-{1-12}`, `u-col-md-{1-12}`, `u-col-lg-{1-12}`, `u-col-xl-{1-12}`, `u-col-2xl-{1-12}` (applies to `auto`/`fill` too, e.g. `u-col-lg-fill`)
- Gaps: `u-gap-{key}`, `u-col-gap-{key}`, `u-row-gap-{key}`

**Grid Layout** (`utilities/_grid-layout.scss`):
- Container: `u-grid-row` (12-column CSS grid with default gap `--space-4`)
- Column spans: `u-col-{1-12}`, `u-col-full` (responsive variants same as flex)
- Column positioning: `u-col-start-{1-12}`, `u-col-{n}-center`, `u-col-end-last`
- Row tracks (container): `u-grid-rows-{1-6}` declares explicit rows (responsive variants same as columns); `u-auto-rows-{auto|min|max|fr}` sizes implicit rows (base only)
- Row spans: `u-row-{1-6}` (responsive variants same as columns)
- Row positioning: `u-row-start-{1-6}` - pair with `u-grid-rows-{n}` when the item must land on a known row
- No row equivalent of `u-col-end-last` or `u-col-{n}-center`: columns can offer them because the container always declares 12 tracks, the row count is not fixed, and grid line numbers must be literal integers (no `calc()`). Use `u-self-center` to centre within a row.
- Auto helpers: `u-grid-auto-fit`, `u-grid-auto-fill`

Both layout systems are 12-column, mobile-first. Base is the default (no breakpoint suffix).
Prefer flex layout for most layouts (single-axis alignment, spacing, distribution). Use grid layout only when you need two-dimensional control across both rows and columns.

**Button sizing** (`abstracts/mixins/_button-size.scss`):
- `btn-size(sm|md|lg|xl)` - text-button per-size dimensions (height, padding, font, `--icon-size`)
- `btn-icon-size(xs|sm|md|lg)` - icon-only button shape + per-size dimensions

**Other mixins:** `truncate`, `line-clamp($n)`, `page-height`, `rtl { }`, `svg-mask($svg)`

**rem()** (`abstracts/functions/_rem.scss`): `rem(16)` converts to `1rem`

---

## ADDING NEW THINGS

### New component
1. Create `components/_{name}.scss` - no `@layer` inside file (`components/_index.scss` wraps all components in `@layer components`)
2. Name base class `app-c-{name}`, use only semantic tokens
3. Register in `components/_index.scss`: `@include meta.load-css('./{name}')`

### New token
1. Add raw value to appropriate `tokens/_*.scss`
2. Map to semantic name in both `_light.scss` and `_dark.scss`
3. Reference the semantic token in components

### New utility
1. Add to existing utility file or create `utilities/_{name}.scss`
2. No `@layer` in the file - `_index.scss` handles it
3. If new file: add to `utilities/_index.scss`

### New breakpoint
1. Add to `$breakpoints` map in `abstracts/mixins/_breakpoint.scss`
2. Add `breakpoint-up(...)` block in both `_flex-layout.scss` and `_grid-layout.scss`
3. Add `u-hidden-{name}` class in `utilities/_visibility.scss`
4. Update breakpoint lists in `AGENTS.md`, `.cursor/rules/stylebase.mdc`, and `README.md`

---

## SELF-CHECK (MANDATORY)

Before responding, verify:

- No hardcoded values used
- Only semantic tokens in components
- Logical properties used
- Correct layer applied
- Naming conventions followed

If any rule is violated - fix before responding.
