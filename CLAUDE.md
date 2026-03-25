# StyleBase Architecture

## ROLE

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
   - app-c-{component}-{variant}

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
9. EXCEPTION: borders/dividers → use 1px
10. Use dvh NOT vh for viewport heights
11. Media queries MUST use px, not rem (breakpoint mixins handle this automatically)

### Layers

12. Respect CSS layers strictly:
    - reset → @layer reset
    - base → @layer base
    - plugins → @layer plugins (reserved for vendor/third-party CSS)
    - components → @layer components
    - utilities → @layer utilities
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

- **Components:** `components/_{name}.scss` - must use `@layer components`
- **Utilities:** `utilities/_{name}.scss` - imported via `utilities/_index.scss`, no `@layer` inside file
- **Tokens:** `tokens/_*.scss` - only define values in `:root`, never use `@layer`
- **Themes:** `tokens/themes/_light.scss` and `tokens/themes/_dark.scss` - define semantic tokens only; BOTH must always exist - never delete either. Light is the `:root` default; dark auto-applies via `prefers-color-scheme: dark` when no `data-theme` is set. Explicit `data-theme` attribute always overrides system preference.
- **Layout:** `layout/_{name}.scss` - uses `@layer base` or `@layer components` depending on scope
- **Entry:** register new components in `main.scss` via `@include meta.load-css('components/{name}')`

---

## KEY ABSTRACTS

Use these - do not write raw equivalents.

**Breakpoints** (`abstracts/mixins/_breakpoint.scss`):
- `breakpoint-up(md)` >=768px | `breakpoint-down(lg)` <1024px
- `breakpoint-between(md, lg)` | `breakpoint-only(base)`
- Named points: base (0px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

**Typography** (`abstracts/_typography-tools.scss`):
- `text-style(body-md)` - sets font-size + line-height
- `text-weight(medium)` - sets font-weight
- Variants: h-md, h-lg, h-xl, h-xxl, h-2xl, body-md, body-sm, ui-md, ui-sm, ui-xs

**Flex Layout** (`utilities/_flex-layout.scss`):
- Container: `u-flex-row` (flex wrap with default gap `--space-4`)
- Columns: `u-col-{1-12}`, `u-col-auto`, `u-col-fill`
- Responsive: `u-col-sm-{1-12}`, `u-col-md-{1-12}`, `u-col-lg-{1-12}`, `u-col-xl-{1-12}`, `u-col-2xl-{1-12}`
- Gaps: `u-gap-{key}`, `u-col-gap-{key}`, `u-row-gap-{key}`

**Grid Layout** (`utilities/_grid-layout.scss`):
- Container: `u-grid-row` (12-column CSS grid with default gap `--space-4`)
- Spans: `u-col-{1-12}`, `u-col-full` (responsive variants same as flex)
- Positioning: `u-col-start-{1-12}`, `u-col-{n}-center`, `u-col-end-last`
- Auto helpers: `u-grid-auto-fit`, `u-grid-auto-fill`

Both layout systems are 12-column, mobile-first. Base is the default (no breakpoint suffix).
Prefer flex layout for most layouts (single-axis alignment, spacing, distribution). Use grid layout only when you need two-dimensional control across both rows and columns.

**Other mixins:** `truncate`, `line-clamp($n)`, `page-height`, `rtl { }`, `svg-mask($svg)`

**rem()** (`abstracts/functions/_rem.scss`): `rem(16)` converts to `1rem`

---

## SELF-CHECK (MANDATORY)

Before responding, verify:

- No hardcoded values used
- Only semantic tokens in components
- Logical properties used
- Correct layer applied
- Naming conventions followed

If any rule is violated - fix before responding.
