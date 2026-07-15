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
  dual-library plan)*. shadcn's default for new projects is the `base-nova`
  preset (`shadcn init --defaults`); maintaining a Radix twin of every
  component doubles the surface for a single maintainer with no matching
  demand. The pre-migration state of `next` (PR #55) is the final Radix-era
  snapshot.
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

- [ ] Evaluate distribution options and pick one:
      - [ ] Namespaced registry (`npx shadcn add @ui-x/date-field`)
      - [ ] GitHub-repo-as-registry (https://ui.shadcn.com/docs/registry/github)
      - [ ] Keep current self-hosted registry.json, upgraded to CLI v3 schema
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

### 4a. Docs platform (fumadocs)

- [ ] Rebuild the v4 docs site on fumadocs (`fumadocs-core`/`-mdx`/`-ui` +
      `fumadocs-docgen`), following shadcn's `apps/v4` structure; remove velite.
- [ ] Upgrade Next 15.5 → 16.x / React 19.2 to match shadcn's stack.
- [ ] Migrate existing MDX content and demo/preview tooling.

### 4b. Site foundation (nova)

- [ ] Re-vendor the docs site's `components/ui/` from the `base-nova` preset;
      adopt the nova theme (neutral base color, Geist, tw-animate-css).
- [ ] Remove Radix dependencies from `apps/v4` once no vendored or registry
      component imports them.
- [ ] Fix site-header vertical separators (found 2026-07-15): the base-nova
      `Separator` uses `data-vertical:self-stretch`, which top-aligns the
      divider once the header caps it with `**:data-[slot=separator]:h-4!`.
      shadcn's own header sidesteps this by still importing the Radix
      `new-york-v4` separator (`h-full`, centered by `items-center`); ui-x
      needs `self-center` on the header's vertical separators (or track
      upstream when shadcn migrates their header).

### 4c. Components — keep/drop audit, then port

For each ui-x component, decide **before** porting (Base UI and shadcn's
catalog now cover several of them natively):

| ui-x component | Likely call | Notes |
| --- | --- | --- |
| `combobox` / `combobox-primitive` | drop | Base UI Combobox does tags/async natively; shadcn ships it — reinforced by Base UI's newer `Autocomplete` |
| `file-list` | drop | superseded by shadcn `attachment` |
| `input-base` | drop/absorb | **confirmed 2026-07-15** — replace with shadcn `input-group`; see migration item below |
| `kbd`, `control-group`, `badge-group` | drop or keep | official `kbd`, `button-group` exist; audit gaps first |
| `native-select` | audit | shadcn now ships `native-select` in the new styles |
| `calendar`, `date-picker` | audit | vs shadcn's rebuilt calendar + Base UI date pieces |
| date/time fields, phone-input, dropzone, confirmer, timeline, description-list, wheel-picker, emoji-picker, sortable, virtualizer, time | keep | still differentiated — these are the port targets |

Base UI coverage audit (2026-07-15, against installed `@base-ui/react`): the
newer Base UI additions — `Autocomplete`, `OTP Field`, `Number Field`,
`Drawer`, `Menubar`, `Field`/`Fieldset`/`Form` — don't cover ui-x's niche.
Date/time fields, phone-input, dropzone, wheel-picker, timeline, confirmer,
sortable, virtualizer and time have **no** Base UI counterpart and remain the
port targets. `Field`/`Form` should replace hand-rolled form plumbing in
demos.

- [ ] **Replace `input-base` with shadcn `input-group`** (big change — many
      dependents). Registry components composing InputBase today: `combobox`,
      `date-picker`, `date-time-field`, `date-time-range-field`,
      `native-select`, `password-input`, plus most form-component examples
      (e.g. `phone-input-demo`). Migrating also fixes the phone-input demo
      height mismatch: InputBase is still `min-h-9` (new-york-v4) while the
      vendored nova Select trigger is `h-8`, so the joined control has a 4px
      step (found 2026-07-15).
- [ ] Port each kept component to Base UI primitives with classes from the
      `base-nova` sources; delete custom primitives Base UI now provides.
- [ ] Rewrite demos/examples against the nova metrics; verify every page.
- [ ] Rebuild registry payloads (single style), update install docs.

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
  recommending the official shadcn/ui version. Still open: whether dropped
  components are removed from the registry entirely or left frozen at the
  Radix-era snapshot.
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
