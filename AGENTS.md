# AGENTS.md

Guidance for AI agents (and humans) working in **junwen-k/ui-x**. Read this
before writing code. It encodes the philosophy and the API-design rules that
keep this registry coherent — follow them by default, and only deviate with a
stated reason.

---

## What this project is

ui-x is a **shadcn-style component registry** — a natural extension of
[shadcn/ui](https://ui.shadcn.com), not a fork of it. We ship the components
shadcn doesn't (yet) have, built and styled so they feel like they came from
shadcn itself. A user should be able to `npx shadcn add` one of ours next to
theirs and not feel a seam.

Consequences of that stance:

- **Compose shadcn, don't reinvent it.** If shadcn ships a component, we depend
  on it — we never copy or restyle it. When shadcn ships a first-class version
  of something we filled in, that component is **superseded** and removed in
  favor of the official one (see `apps/v4/content/docs/changelog.mdx`).
- **Match shadcn's conventions exactly** — `data-slot` attributes, CVA variants,
  `render`-prop composition, file layout, naming, prose tone. When unsure how to
  do something, find the closest shadcn/ui component and mirror it.
- The live registry and roadmap of the overhaul live in `ROADMAP.md`. Consult it
  for what's planned, done, or frozen; don't duplicate its contents elsewhere.

---

## Non-negotiables

- **Base UI only.** Every primitive is built on [Base UI](https://base-ui.com).
  Radix is gone — never add a `@radix-ui/*` dependency or reintroduce Radix
  patterns.
- **One style: `base-nova`.** It's set in `apps/v4/components.json`. There is no
  `new-york-v4` variant to target. (The on-disk folder is still named
  `new-york/` for historical reasons — the _style_ is `base-nova`.)
- **Never hand-transcribe shadcn classes.** To pull in a shadcn core component,
  use the CLI: `npx shadcn@latest add <name>`. It resolves to the correct
  `base-nova` payload. Base-nova payloads sometimes run ahead of the released
  Tailwind CSS (new `cn-*` utilities) — if you must vendor a class, verify it
  exists in the released `tailwind.css` first.
- **Conventional Commits**, enforced by commitlint on every commit. Type the
  message to pass (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:` …).
- **Never self-merge a PR.** Branch, push, open the PR, and leave it for the
  maintainer. Never force-push or run destructive git without explicit
  confirmation.
- **Verify frozen/remote state directly** rather than assuming it. Read the file,
  check the branch, look at the registry.

---

## Architecture: primitive + styled, two layers

Almost every component is two registry items:

| Layer         | File                                            | Type          | Contains                                                                  |
| ------------- | ----------------------------------------------- | ------------- | ------------------------------------------------------------------------- |
| **Primitive** | `src/registry/new-york/ui/<name>-primitive.tsx` | `registry:ui` | Unstyled Base UI behavior. `data-slot`s, context/hooks, zero shadcn deps. |
| **Styled**    | `src/registry/new-york/ui/<name>.tsx`           | `registry:ui` | Composes shadcn core + the primitive into the styled component.           |

Import boundaries — keep these straight:

- **shadcn core** → `@/components/ui/*` (lives in `apps/v4/src/components/ui/`,
  added via the CLI, **not** part of our registry).
- **ui-x components & primitives** → `@/registry/new-york/{ui,components}/*`
  (our published registry).
- **Demos** import the styled component from `@/registry/new-york/ui/<name>`.

`apps/v4/src/registry/new-york/ui/date-picker.tsx` is the gold-standard
reference — study it before designing a new component.

---

## The wrapping principle (the core API rule)

When you expose a sub-component, decide deliberately between **wrapping and
re-exporting** vs. **composing from the outside**. Get this right; it's what
keeps the API honest.

> **Wrap + re-export only when the wrapper earns it — behavior, styling, or a
> composed default. If it's purely cosmetic (a `data-slot` rename over someone
> else's part), don't wrap it; let the consumer compose that part directly.**

**Wrap it (keep the wrapper)** when it:

- reads your primitive's context or a hook (`useDatePicker`, `usePhoneInput`,
  drag state);
- binds a primitive part via `render` (`<Primitive.Input render={<Input />} />`);
- adds meaningful styling (`w-auto` on the content, heavy item styling);
- ships a composed default (a placeholder, an icon that swaps on state).

**Compose from the outside (no wrapper)** when the "wrapper" would only rename a
`data-slot` on a part that belongs to a _different_ component — shadcn core,
another ui-x component, or a third-party lib. That's a cosmetic re-export; it
adds indirection and a maintenance surface for nothing. Export nothing; let the
consumer import the real part.

**The test:** _Remove the wrapper and inline the part it wraps. Does anything
change besides the `data-slot` string?_ No → delete the wrapper. Yes → keep it.

**Concrete precedents in this repo:**

- ✅ `DatePickerAnchor` → wraps _its own_ `DatePickerPrimitive.Anchor` with a
  `data-slot`. Wrapping your own primitive's part is the architecture — always fine.
- ✅ `PhoneInputCountrySelect` / `…Value` / `…Content` — wire `usePhoneInput`,
  add a composed flag placeholder, add `w-auto`. Behavioral → keep.
- ✅ `DropzoneUploadIcon` — swaps the icon on drag state. Behavioral → keep.
- ✅ `DateField*` / `TimeField*` — re-export `DateTimeField*` with a curated
  subset and a separator default (`/`, `:`). The rename _is_ the deliverable
  (two mutually-consistent presets) → keep.
- ❌ `PasswordInputAdornment` (removed) — was just `<InputGroupAddon data-slot=… />`.
  Consumers now use `InputGroupAddon` directly.
- ❌ `PhoneInputCountrySelectTrigger` (removed) — was just `<SelectTrigger data-slot=… />`.
  Consumers now use `SelectTrigger` directly.

When you drop or add a sub-component, update in lockstep: the demos
(`src/components/examples/`), the docs (Usage, Anatomy, API Reference,
Accessibility), and — if a part disappears — the changelog.

---

## Registry conventions

Each item is declared in `apps/v4/registry.json`:

- `dependencies` — npm packages (`@base-ui/react`, `timescape`, …).
- `registryDependencies` — **shadcn core as plain strings** (`"input-group"`,
  `"button"`, `"empty"`, `"select"`); **ui-x-internal as** `"junwen-k/ui-x/<name>"`.
- A styled component lists both its primitive (`junwen-k/ui-x/<name>-primitive`)
  and every shadcn core part it composes.

Validate after any registry change:

```bash
cd apps/v4 && pnpm registry:validate
```

---

## Docs conventions

Docs are fumadocs MDX under `apps/v4/content/docs/`:

- **Component pages** (`components/*.mdx`): Installation (CLI + Manual),
  Usage, Examples (each an `<ComponentPreview name="…" />` mapping to a file in
  `src/components/examples/`), Accessibility, API Reference.
- **Primitive pages** (`primitives/*.mdx`): document the unstyled layer with full
  prop tables. The styled API Reference links back to it rather than repeating props.
- **Primitives stay unstyled in their demos.** Don't dress a primitive demo up to
  look like its styled sibling — keep the markup plain and add the "Unstyled" callout.
- **Forms are library-agnostic.** Component Form sections show Base UI
  `Field`/`Form` markup; React Hook Form / TanStack wiring lives in shadcn's
  central [forms guides](https://ui.shadcn.com/docs/forms), which we link to.
- In form demos, pass controlled values as `field.value ?? null` so Base UI's
  `useControlled` never flips between controlled/uncontrolled modes.
- **Tone:** no maintenance promises, no "as-is" laundry lists — prefer a
  clean-cut when something is superseded. Keep the changelog to meaningful
  releases, not piecemeal per-part entries.

---

## Workflow for a change

1. **Understand first.** Find the nearest shadcn/ui precedent and the nearest
   in-repo precedent (start from `date-picker.tsx`). Use the **shadcn MCP**
   (configured in `.mcp.json`) to search/view/pull registry items and examples
   live.
2. **Design the API** against the wrapping principle above before writing code.
3. **Implement** — primitive first if new, then the styled layer, then update
   `registry.json`, demos, and docs in lockstep.
4. **Verify** (run all three from `apps/v4/`):
   ```bash
   npx tsc --noEmit          # types
   pnpm lint                 # 0 errors expected (a few known warnings pre-exist)
   pnpm registry:validate    # registry integrity
   ```
   Then eyeball the affected doc pages on the dev server (`pnpm dev`, :3000).
5. **Commit** with a Conventional Commit message; **branch and open a PR** — do
   not merge it yourself.

---

## Tooling

- **shadcn MCP** (`.mcp.json`): live registry access — `search_items_in_registries`,
  `view_items_in_registries`, `get_item_examples_from_registries`. Prefer it over
  guessing at a component's shape or classes.
- **shadcn CLI**: `npx shadcn@latest add <name>` to bring a core component into
  `src/components/ui/`; `npx shadcn@latest docs <name>` for its docs.
