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
  the `next` → `main` merge; the changelog points Radix users at `#radix`.
  No dual registry, no legacy branch to maintain.
- **One published style: nova.** ui-x targets shadcn's default preset
  (nova: h-8 controls, rounded-lg, ring-3, Lucide, Geist) rather than the
  legacy `new-york-v4` or the full 8-style family (nova/vega/lyra/luma/maia/
  mira/sera/rhea). Users on other styles adapt classes themselves, as with any
  third-party registry.
- **Docs move to fumadocs.** The velite setup was a learning exercise; the v4
  site is rebuilt following shadcn's own stack (`fumadocs-core`/`-mdx`/`-ui` +
  `fumadocs-docgen`, Next 16).
- **Own the niche — superseded components are removed, not listed as-is**
  *(2026-07-15, supersedes the earlier "callout + provided as-is" policy)*.
  Components that shadcn has since added (Kbd, Button Group/Control Group,
  Input Group/Input Base, Combobox, Attachment/File List, Native Select,
  Calendar) are removed from the registry and docs entirely at ship time.
  Keeping them frozen wasn't hacky, but the ROI wasn't there: permanently
  off-style demos once the site goes nova, Radix packages pinned in `apps/v4`,
  and docs pages whose main message is "use the official one". The ship
  changelog announces Base UI as Radix's modern successor and points existing
  users at the official shadcn/ui components and at `#radix` for the old
  sources. (The interim callouts + "In shadcn/ui" sidebar group on `next`
  served until removal.)

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
      requirements. (`tailwind-v4.mdx` and the homepage "Introducing Tailwind
      v4" announcement badge removed 2026-07-15 — old news; the v3 pointer
      lives in `installation.mdx`.)
- [ ] Refresh `changelog.mdx` — deferred: write a single entry once the
      overhaul actually ships, not piecemeal. Must announce Base UI as Radix's
      modern successor, the removal of the superseded components, and the
      `#radix` tag for old sources. Consider a new homepage announcement badge
      pointing at it.
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
      nova theme adopted. The `ui/form.tsx` straggler (Radix label/slot) was
      replaced with base-nova `field.tsx` in PR #63 (2026-07-16).
- [x] Remove Radix dependencies from `apps/v4` — **all of them** (re-decided
      2026-07-15 with the clean-cut policy: the earlier "no maintained
      component imports Radix" carve-out for frozen superseded components no
      longer applies since those are removed rather than frozen). Shipped
      2026-07-16 (PR #63): zero `@radix-ui/*` packages remain after the 4c
      ports, the superseded-component removal, and the `ui/form.tsx` →
      base-nova `field.tsx` replacement.
- [x] Fix site-header vertical separators — shipped 2026-07-15
      (PR #61, `fix/header-separator`).

### 4c. Components — keep/drop audit ✅, then port

**Audit closed 2026-07-15.** Every registry item now has a verdict; the docs
sidebar's "In shadcn/ui" group mirrors the superseded list exactly.

**Superseded — removed entirely, never ported** (clean cut decided 2026-07-15;
old sources remain reachable via the `#radix` tag):

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
- [x] Port each kept component: swap Radix building blocks for Base UI
      equivalents and apply classes from the `base-nova` sources — shipped
      2026-07-16 (PR #63). Concrete Radix → Base UI swaps (surveyed
      2026-07-15):
      - Full primitives: `date-picker-primitive` popover → Base UI Popover;
        `badge-group` + `emoji-picker` toggle-group → Base UI Toggle Group;
        `sortable` portal → React DOM `createPortal`.
      - Utility packages everywhere else (`react-slot`, `react-primitive`,
        `compose-refs`, `use-controllable-state`, `primitive`) → Base UI
        `useRender`/`mergeProps` + React 19 ref handling. 16 registry files
        affected; `phone-input.tsx` already uses Base UI.
- [x] **Remove the 7 superseded components** (before or alongside the ports):
      delete their registry sources, examples, docs pages and registry.json
      entries; drop the "In shadcn/ui" sidebar group and the overlap callouts
      with them. `date-picker`'s registry dep switches to the official bare
      `"calendar"`. Done 2026-07-16: 8 registry sources (incl.
      `combobox-primitive`), 29 examples and 8 docs pages deleted;
      registry.json 34 → 26 items; entangled keeper examples rewritten
      against vendored shadcn `kbd`/`button-group`/`attachment`/`combobox`
      (Base UI) in `apps/v4/src/components/ui/`.
- [x] Rewrite demos/examples against the nova metrics (adopt Base UI
      `Field`/`Form` for form plumbing, replacing `ui/form.tsx`); verify
      every page — shipped 2026-07-16 (PR #63); form demos stay controlled
      from first render (`field.value ?? null`).
- [ ] Styling polish during the ports: date/time field segments render
      taller than desired (noted 2026-07-16) — revisit segment height when
      applying nova classes to the field components.
- [x] Update registry.json (single style) and install docs after the
      removals + ports — done 2026-07-16: internal `registryDependencies`
      switched from dead self-hosted `https://ui-x.junwen-k.dev/r/*.json`
      URLs to GitHub-registry addresses (`junwen-k/ui-x/<item>`), registry
      validated (`shadcn registry validate`, 26 items); `installation.mdx`
      already documents the `junwen-k/ui-x/<item>` install form.

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

- Deprecation policy — **decided (2026-07-15)**: clean cut. Superseded
  components are removed from the registry and docs entirely at ship time
  (see Guiding decisions); the ship changelog announces Base UI as the modern
  successor and points at `#radix` for the old sources. The interim
  "provided as-is" callouts and "In shadcn/ui" sidebar group go away with the
  removal.
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
- **2026-07-15 (clean cut)** — Deprecation policy settled: superseded
  components get removed entirely at ship time instead of staying frozen
  "as-is"; changelog announces Base UI as the modern successor, `#radix` tag
  covers legacy installs; all `@radix-ui/*` packages leave `apps/v4`. Also
  removed the stale Tailwind v4 docs page and the homepage announcement badge
  linking to it (plus the now-unused `@icons-pack/react-simple-icons` dep).
- **2026-07-16** — Superseded-component removal executed on `next`: 8 registry
  sources, 29 examples, 8 docs pages and the "In shadcn/ui" sidebar group
  deleted; registry.json down to 26 items. shadcn's Base UI `kbd`,
  `button-group`, `attachment` and `combobox` vendored into the site's
  `components/ui/` to rewrite the entangled keeper examples (phone-input,
  dropzone, emoji-picker, virtualizer). Verified with typecheck, `pnpm build`
  (28 docs paths) and in-browser smoke tests of every rewritten page.
