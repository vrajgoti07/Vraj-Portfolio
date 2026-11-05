---
name: typescript-best-practices
description: Write safe, readable TypeScript with strict typing, narrowing, generics, and runtime validation. Use this skill whenever the user writes TypeScript or Node/React code, hits type errors, uses "any", or asks about types, generics, Zod, or tsconfig.
---

# TypeScript Best Practices

## Config
`"strict": true`, `"noUncheckedIndexedAccess": true`, `"exactOptionalPropertyTypes": true`, `"moduleResolution": "bundler"` (or NodeNext for Node libs).

## Rules
1. No `any`. Use `unknown` and narrow. Use `satisfies` to check shape without widening.
2. Model state with **discriminated unions**: `{status:'loading'} | {status:'ok', data:T} | {status:'error', error:E}`; exhaustive `switch` with `never` check.
3. Types at boundaries come from runtime validators: `z.infer<typeof Schema>` (Zod) — one source of truth.
4. Prefer `type` for unions/utility compositions, `interface` for extendable object contracts.
5. Use utility types: `Pick, Omit, Partial, Required, Readonly, ReturnType, Awaited, Record`.
6. Generics: constrain (`T extends object`), avoid over-generic APIs; name meaningfully (`TItem`).
7. Prefer `const` objects + `as const` over enums.
8. Handle null explicitly; avoid non-null `!`.

## Errors
Return `Result<T,E>` for expected failures; throw only for bugs. Custom error classes with `cause`.

## Tooling
ESLint (`typescript-eslint` strict), Prettier, `tsc --noEmit` in CI, path aliases, `tsx`/`vitest` for scripts and tests.
