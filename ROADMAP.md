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
- **Mirror shadcn's library support**: offer both Radix UI and Base UI variants,
  matching `npx shadcn create` (Base UI is shadcn's default since July 2026).
- **Own the niche, acknowledge the overlap.** Components that shadcn has since
  added (Kbd, Button Group, Input Group, Combobox, …) get an honest callout and
  a recommendation, rather than silently competing.

---

## Phase 0 — Housekeeping (unblocks everything)

- [x] Decide fate of WIP `location-input`: **abandoned** (2026-07-09) — stale,
      untracked files deleted. May revisit from scratch in Phase 5.
- [ ] Upgrade `shadcn` CLI from `2.4.0-canary.13` to v3.x; verify
      `pnpm build:registry` still produces a valid registry.
- [ ] Dependency pass on `apps/v4`: zod (pinned at 3.21.4), lucide-react,
      react-day-picker, radix packages, tailwindcss.
- [ ] Confirm both sites still build and deploy (`turbo build`).

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
- [x] **Overlap callouts** added to kbd, control-group, input-base, combobox —
      placed above the preview, recommending the official shadcn/ui version;
      ui-x's is "provided as-is" (calendar and native-select still need a diff
      vs shadcn's versions — tracked in the audit table below).

### Component overlap audit

| ui-x component | shadcn equivalent (date added) | Action |
| --- | --- | --- |
| `kbd` | Kbd (Oct 2025) | ✅ Callout: recommend official, ours as-is |
| `control-group` | Button Group (Oct 2025) | ✅ Callout: recommend official, ours as-is |
| `input-base` | Input Group (Oct 2025) | ✅ Callout: recommend official, ours as-is |
| `combobox` / `combobox-primitive` | Combobox (built on Base UI's primitive, even in the Radix flavor) | ✅ Callouts on both pages: recommend official, ours as-is |
| `calendar` | Calendar upgrade (Jun 2025) | Diff ours vs theirs; possibly rebase on theirs |
| `native-select` | Field/Select ecosystem | Verify overlap; callout if needed |
| date/time fields, phone-input, dropzone, file-list, confirmer, timeline, description-list, wheel-picker, badge-group, emoji-picker, sortable, virtualizer, time | none | Still differentiated — highlight these |

## Phase 2 — Registry modernization (decides architecture for Phases 3–4)

- [ ] Evaluate distribution options and pick one:
      - [ ] Namespaced registry (`npx shadcn add @ui-x/date-field`)
      - [ ] GitHub-repo-as-registry (https://ui.shadcn.com/docs/registry/github)
      - [ ] Keep current self-hosted registry.json, upgraded to CLI v3 schema
- [ ] Decide registry layout for dual-library support (how shadcn structures
      Radix vs Base UI items — mirror it) and for style variants (new-york,
      Luma, Rhea?).
- [ ] Universal registry items where applicable (hooks, utilities).
- [ ] Consider exposing the registry via MCP server.
- [ ] Evaluate migrating the v4 docs site from velite to fumadocs (shadcn's
      current setup) — decide before writing large amounts of new MDX content
      so it only gets authored once.

## Phase 3 — Component styling refresh

- [ ] Update all ui-x components to match latest shadcn conventions:
      `data-slot` attributes, current sizing/spacing, tw-animate-css idioms,
      current `new-york` output of the v3 CLI.
- [ ] Re-sync the vendored shadcn `ui/` components in `apps/v4` used by the
      docs site itself.
- [ ] Verify every demo/example still renders correctly after restyle.

## Phase 4 — Base UI + Radix dual support

- [ ] Port each ui-x component to Base UI primitives alongside the Radix
      version (start with the differentiated set: date/time fields,
      phone-input, dropzone, confirmer, …).
- [ ] Docs: per-component library switcher or install-command tabs
      (Radix / Base UI), mirroring shadcn's docs UX.
- [ ] Update demos/examples for both variants.

## Phase 5 — New components & catch-up (stretch)

- [ ] Revisit `location-input` (Google Places) from Phase 0.
- [ ] Survey what's newly worth building that shadcn still lacks
      (chat components arrived Jun 2026 — avoid; form/data-entry gaps — pursue).

---

## Open questions

- Deprecation policy — **partially decided (2026-07-09)**: overlapped
  components stay published but are "provided as-is" with a prominent callout
  recommending the official shadcn/ui version. Still open: whether they are
  ever removed from the registry, and whether they get styling refreshes in
  Phase 3.
- Do we adopt shadcn's newer styles (Luma/Rhea) or stay `new-york`-only?
- Monorepo: `packages/` is empty — flatten, or reserve for shared registry
  tooling in Phase 2?

## Status log

- **2026-07-09** — Roadmap created. Current state: v4 site has 34 registry
  items; last feature work Jun 2025; shadcn has since shipped CLI v3, MCP,
  Base UI default, GitHub registries, and 7+ overlapping components.
