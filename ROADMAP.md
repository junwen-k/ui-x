# ui-x Overhaul Roadmap

> Tracking document for bringing ui-x up to date with the modern shadcn ecosystem.
> Philosophy is unchanged: **additional** accessible, customizable components that
> complement (not fork) shadcn/ui — focused on form-heavy and data-entry components
> shadcn doesn't ship.

## Branch strategy

Overhaul work happens on feature branches (`docs/…`, `feat/…`) merged into the
long-running **`next`** integration branch via PRs. `next` merges into `main`
only once the overhaul is finalized.

## Guiding decisions

- **v3 is frozen.** `apps/v3` (Tailwind v3) receives no new content. It gets a
  banner — "You are viewing docs for Tailwind v3. Switch to latest →" — and the
  Tailwind v4 site becomes canonical at `ui-x.junwen-k.dev`.
- **Base UI only — Radix is dropped** *(2026-07-10, supersedes the earlier
  dual-library plan; reconfirmed 2026-07-15)*. shadcn's default for new
  projects is the `base-nova` preset (`shadcn init --defaults`); maintaining a
  Radix twin of every component doubles the surface for a single maintainer
  with no matching demand. Because the registry distributes copies (not a
  package dependency), dropping Radix breaks no existing install — users
  already own their code.
- **Radix legacy access via git tag, not a maintained variant.** The shadcn
  GitHub registry supports refs: `npx shadcn@latest add
  junwen-k/ui-x/<item>#<ref>`. Tag `main` (e.g. `radix`) immediately before
  the `next` → `main` merge; the changelog and superseded-component docs point
  Radix users at `#radix`. No dual registry, no legacy branch to maintain.
- **One published style: nova.** ui-x targets shadcn's default preset
  (nova: h-8 controls, rounded-lg, ring-3, Lucide, Geist) rather than the
  legacy `new-york-v4` or the full 8-style family (nova/vega/lyra/luma/maia/
  mira/sera/rhea). Users on other styles adapt classes themselves, as with any
  third-party registry.
- **Docs move to fumadocs.** The velite setup was a learning exercise; the v4
  site is rebuilt following shadcn's own stack (`fumadocs-core`/`-mdx`/`-ui` +
  `fumadocs-docgen`, Next 16).
- **Own the niche, acknowledge the overlap.** Components that shadcn has since
  added (Kbd, Button Group, Input Group, Combobox, Attachment, …) get an honest
  callout and a recommendation, rather than silently competing.

---

## Phase 0 — Housekeeping (unblocks everything)

- [x] Decide fate of WIP `location-input`: **abandoned** (2026-07-09) — stale,
      untracked files deleted. May revisit from scratch in Phase 5.
- [x] Upgrade `shadcn` CLI (now `4.13.0`) — superseded by the GitHub registry
      migration (2026-07-14): `shadcn build`/`build:registry` is gone entirely,
      the CLI reads `registry.json` straight from the repo
      (`npx shadcn@latest add junwen-k/ui-x/<item>`), validated in CI via
      `shadcn registry validate`.
- [ ] Dependency pass on `apps/v4`: zod (pinned at 3.21.4), lucide-react,
      react-day-picker, tailwindcss. (Radix packages get removed in Phase 4
      rather than upgraded.)
- [x] Confirm both sites still build and deploy (`turbo build`) — verified via
      PR #55 Vercel deploys (2026-07-10); also fixed the `app-sidebar` type
      error and calendar import order that blocked the v4 build.

## Phase 1 — Documentation up to date (user-visible, low risk)

- [x] Add v3 "you are viewing old docs" banner in `apps/v3` linking to the v4
      site (keep the existing `version-dropdown-menu` as secondary navigation).
- [ ] Point canonical domain / SEO (sitemap, robots, `metadataBase`, og) at the
      v4 site; v3 moves to a `v3.` subdomain or subpath.
- [x] Update `installation.mdx` with registry install instructions and
      requirements (`index.mdx` / `tailwind-v4.mdx` reviewed, still accurate).
- [ ] Refresh `changelog.mdx` — deferred: write a single entry once the
      overhaul actually ships, not piecemeal.
- [x] Clear stale "New" labels in `src/config/docs.ts`.
- [x] **Overlap callouts** added to kbd, control-group, input-base, combobox,
      file-list (→ Attachment) — placed above the preview, recommending the
      official shadcn/ui version; ui-x's is "provided as-is".

## Phase 2 — Registry modernization (decides architecture for Phase 4)

- [x] Evaluate distribution options — **decided (2026-07-14):
      GitHub-repo-as-registry.** The CLI reads `registry.json` straight from
      the repo (`npx shadcn@latest add junwen-k/ui-x/<item>`), validated in CI
      via `shadcn registry validate`. No namespaced/self-hosted variant.
- [x] Registry layout for library/style variants — **decided (2026-07-10)**:
      single library (Base UI), single style (nova). No variant matrix.
- [ ] Universal registry items where applicable (hooks, utilities).
- [ ] Consider exposing the registry via MCP server.
- [x] Docs platform — **decided (2026-07-10)**: migrate v4 site from velite to
      fumadocs, mirroring shadcn's `apps/v4` setup. Executed as part of
      Phase 4 so new MDX content is only authored once.

## Phase 3 — Component styling refresh ✅

Completed 2026-07-10 (PR #55, `feat/style-refresh`). All 31 registry
components updated to the latest `new-york-v4` conventions: `data-slot`
attributes, current focus/aria-invalid ring model, sizing/spacing, Icon-suffixed
lucide imports, calendar rebuilt on react-day-picker v9. Registry payloads
rebuilt; demos verified. This is the final Radix-era, `new-york-v4`-parity
snapshot before the Phase 4 migration.

## Phase 4 — Base UI + nova migration (the big one)

One migration, done together, because shadcn's nova sources are written against
Base UI DOM — porting styles onto Radix first would mean doing the class work
twice. Reference sources: `https://ui.shadcn.com/r/styles/base-nova/<name>.json`.

### 4a. Docs platform (fumadocs) ✅

- [x] Rebuild the v4 docs site on fumadocs (`fumadocs-core` 16 /
      `fumadocs-mdx` 15), following shadcn's `apps/v4` structure; velite
      removed.
- [x] Upgrade to Next 16.2.7 / React 19.2.
- [x] Migrate existing MDX content and demo/preview tooling.

### 4b. Site foundation (nova)

- [x] Re-vendor the docs site's `components/ui/` from the `base-nova` preset;
      nova theme adopted. Remaining straggler: `ui/form.tsx` still imports
      `@radix-ui/react-label`/`react-slot` — replace with Base UI
      `Field`/`Form` when demo form plumbing is reworked (see 4c).
- [ ] Remove Radix dependencies from `apps/v4` — reframed 2026-07-15: the goal
      is **no maintained component imports Radix**. The 7 frozen superseded
      components keep their Radix-utility imports (their registry payloads
      declare npm deps for consumers), so the handful of packages they use
      (`react-slot`, `react-primitive`, `compose-refs`, `primitive`,
      `use-controllable-state`, plus `react-popover`/`roving-focus` via
      `combobox-primitive`) stay in `apps/v4` for live previews. Everything
      else goes after the 4c ports + `ui/form.tsx`.
- [x] Fix site-header vertical separators — shipped 2026-07-15
      (PR #61, `fix/header-separator`).

### 4c. Components — keep/drop audit ✅, then port

**Audit closed 2026-07-15.** Every registry item now has a verdict; the docs
sidebar's "In shadcn/ui" group mirrors the superseded list exactly.

**Superseded — frozen as-is, never ported** (callout + sidebar group; stay at
the Radix-era snapshot):

| ui-x component | Superseded by |
| --- | --- |
| `calendar` | shadcn `calendar` — ours is a verbatim `new-york-v4` copy; the preferred bordered dropdown look is a `classNames` snippet on the official one, not a fork. Retire by pointing `date-picker`'s registry dep at bare `"calendar"` during the port |
| `combobox` / `combobox-primitive` | shadcn `combobox` (Base UI Combobox/Autocomplete does tags/async natively). Dropping this also removes ui-x's hardest Radix dependency (`roving-focus` + popover state machine) |
| `control-group` | shadcn `button-group` |
| `file-list` | shadcn `attachment` |
| `input-base` | shadcn `input-group` — dependents migrated 2026-07-15 (PR #62) |
| `kbd` | shadcn `kbd` |
| `native-select` | shadcn `native-select` |

**Keep — truly ui-x, no shadcn/Base UI counterpart** (the port targets):
date-field, date-time-field(+primitive), date-time-range-field(+primitive),
date-picker(+primitive), time-field, time, phone-input(+primitive),
password-input(+primitive), dropzone(+primitive), badge-group, confirmer,
description-list, emoji-picker, timeline, wheel-picker, sortable,
virtualizer, bprogress providers, use-timescape.

Base UI coverage audit (2026-07-15, against installed `@base-ui/react`): the
newer Base UI additions — `Autocomplete`, `OTP Field`, `Number Field`,
`Drawer`, `Menubar`, `Field`/`Fieldset`/`Form` — don't cover ui-x's niche.
Date/time fields, phone-input, dropzone, wheel-picker, timeline, confirmer,
sortable, virtualizer and time have **no** Base UI counterpart and remain the
port targets. `Field`/`Form` should replace hand-rolled form plumbing in
demos.

- [x] **Replace `input-base` with shadcn `input-group`** — shipped 2026-07-15
      (PR #62): combobox, date-picker, date/time fields, native-select,
      password-input and all examples migrated; phone-input 4px height
      mismatch fixed; every page browser-verified.
- [ ] Port each kept component: swap Radix building blocks for Base UI
      equivalents and apply classes from the `base-nova` sources. Concrete
      Radix → Base UI swaps (surveyed 2026-07-15):
      - Full primitives: `date-picker-primitive` popover → Base UI Popover;
        `badge-group` + `emoji-picker` toggle-group → Base UI Toggle Group;
        `sortable` portal → React DOM `createPortal`.
      - Utility packages everywhere else (`react-slot`, `react-primitive`,
        `compose-refs`, `use-controllable-state`, `primitive`) → Base UI
        `useRender`/`mergeProps` + React 19 ref handling. 16 registry files
        affected; `phone-input.tsx` already uses Base UI.
- [ ] Rewrite demos/examples against the nova metrics (adopt Base UI
      `Field`/`Form` for form plumbing, replacing `ui/form.tsx`); verify
      every page.
- [ ] Update registry.json (single style): `date-picker` → bare `"calendar"`
      dep; update install docs.

### 4d. Docs content — API Reference & Accessibility sections (after ports)

Follow shadcn's hand-authored format (surveyed 2026-07-15: 51 of their base
docs have `## API Reference`, 8 newer ones have `## Accessibility`; no docgen
tooling anywhere — tables are written by hand, thin Base UI wrappers just link
out, e.g. accordion → "See the Base UI documentation").

- [ ] Add **API Reference** to every doc: markdown tables per sub-component
      (`Prop | Type | Default | Description`). Primitives get full tables;
      wrapper components link to their primitive's section instead —
      mirroring how shadcn defers to Base UI. Tables become part of the
      definition-of-done when a component's props change.
- [ ] Add **Accessibility** where there's real guidance to give (icon-only
      button labeling, keyboard interaction, meaning beyond color): prose
      with `###` sub-headings and short aria snippets, per shadcn's
      attachment/message/field docs.

## Phase 5 — New components & catch-up (stretch)

- [ ] Revisit `location-input` (Google Places) from Phase 0.
- [ ] Survey what's newly worth building that shadcn still lacks
      (chat components arrived Jun 2026 — avoid; form/data-entry gaps — pursue).

---

## Open questions

- Deprecation policy — **partially decided (2026-07-09)**: overlapped
  components stay published but are "provided as-is" with a prominent callout
  recommending the official shadcn/ui version; since 2026-07-15 they are also
  grouped under "In shadcn/ui" in the docs sidebar. Still open: whether
  superseded components are removed from the registry entirely or left frozen
  at the Radix-era snapshot (leaning: keep frozen — they'll be intentionally
  style-inconsistent once the rest goes nova, which the as-is framing covers).
- Monorepo: `packages/` is empty — flatten, or reserve for shared registry
  tooling in Phase 2?

## Status log

- **2026-07-09** — Roadmap created. Current state: v4 site has 34 registry
  items; last feature work Jun 2025; shadcn has since shipped CLI v3, MCP,
  Base UI default, GitHub registries, and 7+ overlapping components.
- **2026-07-10** — Phase 3 shipped (PR #55). Direction reset: shadcn's new
  8-style system discovered (`base-nova` is the default preset); decided to
  drop Radix entirely and do Base UI + nova + fumadocs as one Phase 4
  migration on `feat/base-nova`.
- **2026-07-15** — PR #59 up (nativeButton fixes; docs tabs layout turned out
  to be stale dev-server CSS, not a source bug). Decisions/triage: adopt
  shadcn `input-group` to replace `input-base` (4c); Base UI coverage audit
  confirms the port list unchanged; phone-input demo 4px height mismatch and
  header separator top-alignment triaged (4c/4b); docs get hand-written API
  Reference + Accessibility sections after the ports (4d).
- **2026-07-15 (later)** — PRs #61 (header separators) and #62 (input-group
  migration + overlap callouts for native-select and calendar + "In shadcn/ui"
  sidebar group) merged into `next`. 4c keep/drop audit closed: 7 superseded
  (calendar, combobox, control-group, file-list, input-base, kbd,
  native-select), everything else confirmed as port targets. Calendar verdict:
  verbatim shadcn copy — retire during the port, keep the bordered dropdown
  look as a documented `classNames` snippet. Roadmap synced with reality:
  4a (fumadocs/Next 16) and most of 4b already shipped; remaining bulk is the
  4c ports (16 Radix-importing registry files, mostly utility packages) and
  4d docs sections.
