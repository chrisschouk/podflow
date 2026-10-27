# podflow

AI-powered podcast digest CLI and podcast guest pitching platform for music PR. Extracts guests, ideas, and interview insights from podcast libraries using Claude/OpenAI/Gemini/Ollama. Part of the Total Audio Promo agent-native suite: TAP (`totalaudiopromo.com`) is the flagship product, and Podflow shares the TAP UI architecture, design tokens (`@totalaudiopromo/ui`), and Studio Purple identity.

## Stack & Architecture

pnpm monorepo workspace containing:
- `.` (root CLI): TypeScript + ESM built with tsup, Node >= 20. Published on npm as `podflow`.
- `packages/ui`: Shared Total Audio Promo design system tokens (`tokens.css`), Tailwind preset (`tailwind-preset.cjs`), and React marketing + app primitives.
- `apps/web`: Next.js App Router web application (`/` landing page hero & interactive simulator, `/dashboard` app shell and opportunities feed). Dev server on port 3005.
- `web/`: separate Vite + React + Tailwind marketing site (package name `web`, static HTML pages such as `pricing-compare.html` and `proof.html`, deployed via `vercel.json`, uses `@totalaudiopromo/ui`). Run with `pnpm --filter web dev`; its `prebuild` script builds `packages/ui` first. Its README is the untouched Vite template.

## Commands that matter

```bash
pnpm dev                      # run CLI directly via tsx
pnpm --filter @podflow/web dev # run Next.js web application on port 3005
pnpm build                    # compile the CLI to dist/ via tsup
pnpm typecheck                # typecheck root CLI, packages/ui, and apps/web
pnpm test                     # vitest run
```

CLI commands (via `podflow <cmd>`):
- `init`: interactive setup wizard; writes `~/.podflow/config.json` (permissions 0600)
- `digest`: process new episodes (add `--dry-run` to preview, `--backfill` for all)
- `subs`: list subscriptions
- `stats`: cache statistics
- `schedule`: install/remove a macOS launchd weekly digest job with push notification
- `ui`: start the interactive local dashboard server (`--port`, default 3010; this is the CLI dashboard, not `apps/web`)
- `import <path>`: import podcast RSS feeds from an OPML file (needs `podflow init` first)
- `mcp`: start the MCP server (stdio); entry point is `src/cli.ts`, so agents connect via stdio

## Brand Identity & Design System

- **Brand Accent**: **Studio Purple** (`#A855F7` / `purple-500`) with TAP Mint Green (`#00F59B` / `emerald-400`) for high-relevance match scores and Warm Amber (`#F59E0B`) for extracted topic tags.
- **Container Width Standard**: `max-w-6xl` (1152px) for primary layout grids (Banner, Nav, Hero, Features, Pricing, Footer); `max-w-5xl` (1024px) for secondary focus sections (How It Works, Simulator, FAQ).

## Publish flow (npm)

Package is published as `podflow` (no scope). The pre-publish hook runs tests + build.
Use an automation token in `~/.npmrc` to bypass 2FA prompts in automated environments.

## House standards

Use `feat:`/`fix:` commit prefixes. No AI buzzwords or filler prose.
