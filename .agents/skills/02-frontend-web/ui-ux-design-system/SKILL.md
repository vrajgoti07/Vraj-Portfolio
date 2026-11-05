---
name: ui-ux-design-system
description: Design polished, consistent, accessible UI for web and mobile with design tokens, typography, color, spacing, and component patterns. Use this skill whenever the user asks for a "best UI", beautiful design, landing page, dashboard, design system, wireframe, UX review, or says an interface looks plain or generic.
---

# UI/UX Design System

## Process
1. **Goal & user**: who, what task, what success looks like. 2. **Flows** before screens. 3. **Wireframe** low-fi. 4. **Tokens**. 5. **Components**. 6. **Polish & test**.

## Tokens
- **Color**: 1 brand, 1 accent, neutral ramp (50–900), semantic (success/warn/danger/info). 60-30-10 rule. Verify contrast ≥ 4.5:1 (3:1 large text).
- **Type**: modular scale (e.g., 12/14/16/20/24/32/48), line-height 1.4–1.6 body, ≤ 2 families.
- **Spacing**: 4/8 px grid. **Radius** and **shadow** scales (3 levels each).
- Dark mode via token swap, not duplicated styles.

## Layout principles
Clear hierarchy (one primary action per view); proximity & alignment; generous whitespace; consistent grid (12-col web); mobile-first; max readable line width ~65ch.

## Component states
Default, hover, focus-visible, active, disabled, loading, error, empty. Design all of them.

## UX patterns
Inline validation; skeleton loaders over spinners; optimistic updates; undo instead of confirm dialogs; progressive disclosure; sensible defaults; helpful empty states; clear error copy ("what happened + how to fix").

## Avoid generic look
Pick a distinctive direction (typeface pairing, a signature color, consistent iconography); avoid default purple gradients and stock-card grids; add subtle motion (150–300 ms) with `prefers-reduced-motion` respected.

## Accessibility
Semantic HTML, labels on inputs, keyboard navigable, visible focus, alt text, ARIA only when needed, touch targets ≥ 44 px.

## Checklist
- [ ] Tokens documented  - [ ] All states designed  - [ ] 320 px → 1440 px verified  - [ ] Axe/Lighthouse a11y pass
