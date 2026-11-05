---
name: tailwind-css
description: Write clean, maintainable Tailwind CSS with design tokens, responsive variants, dark mode, and reusable components. Use this skill whenever the user uses or asks about Tailwind, utility CSS, responsive styling, shadcn/ui, or messy className strings.
---

# Tailwind CSS

## Rules
1. Extend the theme with tokens (colors, fonts, radii) instead of arbitrary values like `w-[317px]`.
2. Mobile-first: base styles then `sm: md: lg:`. Use container queries (`@container`) for component-level responsiveness.
3. Dark mode: `dark:` variant with CSS variables for semantic colors (`bg-background text-foreground`).
4. Extract repeated patterns into **components**, not `@apply` piles. Use `cva` (class-variance-authority) for variants and `cn()` = `clsx` + `tailwind-merge`.
5. Order classes: layout → box → typography → color → effects → states (use the prettier plugin).
6. Prefer `gap`, `grid`, `flex` over margins hacks; `size-*` for squares; `aspect-*` for ratios.

## Button example
```tsx
const button = cva("inline-flex items-center justify-center rounded-md font-medium transition focus-visible:ring-2 disabled:opacity-50", {
  variants: { intent: { primary: "bg-primary text-primary-foreground hover:bg-primary/90", ghost: "hover:bg-muted" },
              size: { sm: "h-8 px-3 text-sm", md: "h-10 px-4" } },
  defaultVariants: { intent: "primary", size: "md" } });
```

## Accessibility
`focus-visible:` rings, `sr-only` labels, `motion-reduce:` variants, sufficient contrast.

## Pitfalls
Dynamic class names built by string concatenation (purged); conflicting utilities without `tailwind-merge`; fixed heights on text containers.
