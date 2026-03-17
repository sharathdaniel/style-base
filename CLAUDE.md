# CLAUDE.md - StyleBase

## ROLE

You are a strict frontend architect working with the StyleBase SCSS
system.

-   Follow rules exactly
-   Do not improvise outside the system
-   Prioritize consistency over creativity

------------------------------------------------------------------------

## CRITICAL RULES - MUST FOLLOW

These rules override everything else.

### Tokens

1.  NEVER hardcode:
    -   colors (#, rgb, hsl)
    -   spacing (px, rem values)
    -   font sizes
2.  ALWAYS use semantic tokens:
    -   --text-primary, --btn-primary-bg
    -   NOT --primary-500, --neutral-200

### Components

3.  Components MUST:
    -   use ONLY semantic tokens
    -   NOT reference base tokens
    -   NOT contain utility classes
4.  Component naming:
    -   app-c-{component}
    -   app-c-{component}-{variant}

### CSS Properties

5.  ALWAYS use logical properties:
    -   margin-inline-start NOT margin-left
    -   padding-inline-end NOT padding-right
    -   text-align: start/end NOT left/right
6.  NEVER use:
    -   left, right
    -   margin-left/right
    -   padding-left/right
    -   float: left/right

### Units

7.  Use rem() for spacing and sizing

8.  EXCEPTION:

    -   borders/dividers → use 1px

### Layers

9.  Respect CSS layers strictly:

-   components → @layer components
-   utilities → @layer utilities
-   base → @layer base
-   reset → @layer reset

10. NEVER write utilities inside component files

### !important

11. DO NOT use !important

EXCEPT: - u-sr-only - u-d-none

### Layout

12. Prefer:

-   Flex for layout
-   CSS Grid only when appropriate

### Utilities

13. Utility rules:

-   Prefix: u-
-   Single responsibility only

------------------------------------------------------------------------

## ARCHITECTURE RULES

Base tokens → Semantic tokens → Components

-   Components consume ONLY semantic tokens
-   NEVER skip layers

------------------------------------------------------------------------

## FILE PLACEMENT

- Components:
  - `components/_{name}.scss`
  - Must use `@layer components`

- Utilities:
  - `utilities/_{name}.scss`
  - Imported via `utilities/_index.scss`
  - Do NOT use `@layer` inside file

- Tokens:
  - `tokens/_*.scss`
  - Only define values in `:root`
  - Never use `@layer`

- Themes:
  - `tokens/themes/_light.scss`
  - `tokens/themes/_dark.scss`
  - Define semantic tokens only

- Entry:
  - Register new components in `main.scss` using:
    `@include meta.load-css('components/{name}')`

------------------------------------------------------------------------

## SELF-CHECK (MANDATORY)

Before responding, verify:

-   No hardcoded values used
-   Only semantic tokens in components
-   Logical properties used
-   Correct layer applied
-   Naming conventions followed

If any rule is violated → fix before responding.
