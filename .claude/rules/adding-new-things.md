---
description: Instructions for adding new components, tokens, utilities, and breakpoints
paths:
  - components/**/*
  - utilities/**/*
  - tokens/**/*
  - abstracts/**/*
  - layout/**/*
  - main.scss
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
2. No `@layer` in the file - `_index.scss` handles it
3. If new file: add to `utilities/_index.scss`

### New breakpoint
1. Add to `$breakpoints` map in `abstracts/mixins/_breakpoint.scss`
2. Add `breakpoint-up(...)` block in both `_flex-layout.scss` and `_grid-layout.scss`
