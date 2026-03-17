# CLAUDE.md - StyleBase

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
   - spacing (px, rem values)
   - font sizes
2. ALWAYS use semantic tokens:
   - --text-primary, --btn-primary-bg
   - NOT --primary-500, --neutral-200

### Components

3. Components MUST:
   - use ONLY semantic tokens
   - NOT reference base tokens
   - NOT contain utility classes
4. Component naming:
   - app-c-{component}
   - app-c-{component}-{variant}

### CSS Properties

5. ALWAYS use logical properties:
   - margin-inline-start NOT margin-left
   - padding-inline-end NOT padding-right
   - text-align: start/end NOT left/right
6. NEVER use:
   - left, right
   - margin-left/right
   - padding-left/right
   - float: left/right

### Units

7. Use rem() for spacing and sizing
8. EXCEPTION: borders/dividers → use 1px
9. Use dvh NOT vh for viewport heights

### Layers

10. Respect CSS layers strictly:
    - components → @layer components
    - utilities → @layer utilities
    - base → @layer base
    - reset → @layer reset
11. NEVER write utilities inside component files

### !important

12. DO NOT use !important

    EXCEPT:
    - u-sr-only
    - u-d-none

### Utilities

13. Utility rules:
    - Prefix: u-
    - Single responsibility only

---

## FILE PLACEMENT

- **Components:** `components/_{name}.scss` - must use `@layer components`
- **Utilities:** `utilities/_{name}.scss` - imported via `utilities/_index.scss`, no `@layer` inside file
- **Tokens:** `tokens/_*.scss` - only define values in `:root`, never use `@layer`
- **Themes:** `tokens/themes/_light.scss` and `tokens/themes/_dark.scss` - define semantic tokens only; BOTH must always exist - never delete either
- **Entry:** register new components in `main.scss` via `@include meta.load-css('components/{name}')`

---

## KEY ABSTRACTS

Use these — do not write raw equivalents.

**Breakpoints** (`abstracts/mixins/_breakpoint.scss`):
- `breakpoint-up(tablet)` >=768px | `breakpoint-down(laptop)` <1024px
- `breakpoint-between(tablet, laptop)` | `breakpoint-only(mobile)`
- Named points: mobile (0px), tablet (768px), laptop (1024px), desktop (1280px), large-desktop (1536px)

**Typography** (`abstracts/_typography-tools.scss`):
- `text-style(body-md)` - sets font-size + line-height
- `text-weight(medium)` - sets font-weight
- Variants: h-md, h-lg, h-xl, h-xxl, body-md, body-sm, ui-md, ui-sm, ui-xs

**Other mixins:** `truncate`, `line-clamp($n)`, `page-height`, `rtl { }`, `svg-mask($svg)`

**rem()** (`abstracts/functions/_rem.scss`): `rem(16)` converts to `1rem`

---

## ADDING NEW THINGS

### New component
1. Create `components/_{name}.scss`, wrap all styles in `@layer components`
2. Name base class `app-c-{name}`, use only semantic tokens
3. Register in `main.scss`: `@include meta.load-css('components/{name}')`

### New token
1. Add raw value to appropriate `tokens/_*.scss`
2. Map to semantic name in both `_light.scss` and `_dark.scss`
3. Reference the semantic token in components

### New utility
1. Add to existing utility file or create `utilities/_{name}.scss`
2. No `@layer` in the file — `_index.scss` handles it
3. If new file: add to `utilities/_index.scss`

### New breakpoint
1. Add to `$breakpoints` map in `abstracts/mixins/_breakpoint.scss`
2. Add `breakpoint-up(...)` block in both `_flex-layout.scss` and `_grid-layout.scss`

---

## SELF-CHECK (MANDATORY)

Before responding, verify:

- No hardcoded values used
- Only semantic tokens in components
- Logical properties used
- Correct layer applied
- Naming conventions followed

If any rule is violated - fix before responding.
