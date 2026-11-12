```
    ___  ___  ___/ / _/ /__ _    __
   / _ \/ _ \/ _  / _/ / _ \ |/|/ /
  / .__/\___/\_,_/_//_/\___/__,__/
 /_/
```

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org)

**Podcast digests and guest research for music PR.** podflow reads your Apple Podcasts library and RSS feeds, then pulls out guests, episode angles, host matches and ideas worth keeping.

---

## Workspace Packages

- **`podflow` CLI**: CLI digest tool & native MCP server (`src/cli.ts`, npm package `podflow`).
- **`@podflow/web`**: Next.js web application (`apps/web`) featuring the interactive pitching simulator, host match scoring cards, and PR roster dashboard.
- **`@totalaudiopromo/ui`**: Total Audio Promo shared design system (`packages/ui`) with Studio Purple (`#A855F7`) theme tokens, Tailwind presets, and React components.

---

## Web App Quick Start

```bash
pnpm install
pnpm --filter @podflow/web dev    # starts Next.js dev server on port 3010
```

---

## Quick Start (CLI)

```bash
npx podflow init                          # create config
npx podflow digest --dry-run              # preview episodes
npx podflow digest --max-episodes 10      # process 10 episodes
```

Or install globally:

```bash
npm install -g podflow
podflow digest
```

## Commands

| Command | Description |
| ------- | ----------- |
| `podflow init` | Create config at `~/.podflow/` |
| `podflow digest` | Process new episodes (default) |
| `podflow digest --dry-run` | Preview without API calls |
| `podflow digest --backfill` | Process all episodes |
| `podflow subs` | List podcast subscriptions |
| `podflow stats` | Cache statistics |
| `podflow import <path>` | Import podcast RSS feeds from an OPML file |
| `podflow ui` | Start the interactive local dashboard (default port 3010) |
| `podflow schedule` | Weekly automatic digests + notification (macOS) |
| `podflow mcp` | Start the MCP server (stdio) for agents |

## Scheduled digests

`podflow init` walks you through setup (provider, key, interests), so there is no JSON to edit. Then:

```bash
podflow schedule            # weekly, Mondays 08:00
podflow schedule --daily --time 07:30
podflow schedule --status   # check it
podflow schedule --off      # remove it
```

Each scheduled run processes new episodes and ends with a macOS notification, so the
digest reaches you instead of waiting in a file. Your API key is stored in
`~/.podflow/config.json` (permissions 0600) so scheduled runs work without shell
environment variables.

## Agents can use it too (MCP)

podflow ships an [MCP](https://modelcontextprotocol.io) server, so AI agents can query
your podcast notes directly: what was said, by whom, and why it matters.

```json
{
  "mcpServers": {
    "podflow": {
      "command": "npx",
      "args": ["-y", "podflow", "mcp"]
    }
  }
}
```

Six tools:

| Tool | What an agent gets |
| ---- | ------------------ |
| `search_episodes` | Keyword search across titles, guests, ideas, and notes |
| `get_guest` | Cross-episode guest profile: role, company, appearances, why follow |
| `get_ideas` | Extracted ideas filtered by topic and relevance |
| `list_follow_worthy` | Guests flagged worth following, with context |
| `get_stats` | Cache totals and cost |
| `ingest_feed` | Point it at any podcast RSS feed to extract new episodes on demand |

Intelligence is episode-level (descriptions plus Apple transcript snippets where
available). Uses your existing `~/.podflow` config and provider key; `ingest_feed`
costs pennies per episode, same as `digest`.

<p align="center">
  <img src="assets/podflow-demo.svg" alt="podflow terminal demo" width="90%">
</p>

---

## Why podflow?

- **Local first.** Reads the Apple Podcasts database on your Mac, with an optional web dashboard.
- **Your AI key, your choice.** Supports OpenRouter (default), Anthropic, OpenAI, Google, and Ollama (local, free).
- **Incremental.** Only processes new episodes. Run it weekly, costs pennies.
- **Configurable interests.** Scores everything against what matters to *you*.

## How It Works

1. Reads the Apple Podcasts SQLite database & RSS feeds
2. Prioritises episodes by podcast tier (you configure which podcasts matter)
3. Batches episodes and sends to your chosen AI provider
4. Extracts guests, ideas, people mentioned, and host match relevance scores
5. Caches results incrementally (interrupted runs resume)
6. Generates a markdown digest & powers the Podflow web pitching dashboard

## Configuration

After `podflow init`, edit `~/.podflow/config.json`:

```json
{
  "about": "A founder building developer tools",
  "interests": [
    {
      "name": "Customer Acquisition",
      "keywords": ["pricing", "growth", "retention", "PLG"],
      "why": "Growing from 0 to first paying customers"
    },
    {
      "name": "AI & Agents",
      "keywords": ["AI", "LLM", "agent", "automation"],
      "why": "Building AI-powered features"
    }
  ],
  "provider": "openrouter",
  "model": "deepseek/deepseek-v4.1-flash",
  "outputPath": "./podflow-digest.md"
}
```

### Podcast Tiers

Edit `~/.podflow/podcasts.json` to prioritise specific podcasts:

```json
{
  "podcasts": {
    "My Favourite Podcast": { "tier": 1, "extractGuests": true, "extractIdeas": true },
    "Entertainment Only": { "tier": 4, "extractGuests": false, "extractIdeas": false }
  },
  "defaults": { "tier": 3, "extractGuests": true, "extractIdeas": true }
}
```

Tiers 1-3 are processed by default. Tier 4 is skipped (use `--include-all` to override).

## Global Flags

```
--dry-run               Preview without API calls
--backfill              Process all episodes
--max-episodes <n>      Limit episodes (default: 50)
--tier <n>              Only process specific tier (1-4)
--include-all           Include tier 4
--provider <name>       openrouter, anthropic, openai, google, ollama
--model <name>          Override model name
--output <path>         Output file path
--recent <days>         Days of history (default: 365)
--rss <url>             Process a specific RSS feed URL
--verbose               Show episode details
-q, --quiet             Suppress output except errors
```

## AI Providers

| Provider | Env Var | Cost / 1,000 eps | Best For |
| -------- | ------- | ----------------- | -------- |
| OpenRouter (DeepSeek Flash) | `OPENROUTER_API_KEY` | ~$2 | Default; one key, many models |
| Anthropic (Haiku) | `ANTHROPIC_API_KEY` | ~$2 | Best quality/cost ratio |
| OpenAI (GPT-4o-mini) | `OPENAI_API_KEY` | ~$0.50 | Cheapest cloud option |
| Google (Gemini Flash) | `GOOGLE_GENERATIVE_AI_API_KEY` | ~$0.25 | Budget option |
| Ollama (local) | None | Free | Privacy, no API key |

```bash
podflow digest --provider openai --model gpt-4o-mini
podflow digest --provider ollama --model llama3.2
```

## Output

Generates a markdown digest with:

- **People to Follow**: guests flagged as worth following, with roles, companies, and social links
- **Ideas by Topic**: insights grouped by your configured interest areas
- **High Relevance**: episodes scored 7+ for relevance to your work
- **Recent Insights**: last 30 days of extracted intelligence
- **Guest Index**: every guest across all episodes, cross-referenced

## Cost

| Scenario | Episodes | Cost (Haiku) |
| -------- | -------- | ------------ |
| Weekly run | ~20 | ~$0.03 |
| Monthly | ~80 | ~$0.12 |
| Full backfill | 1,000 | ~$2.00 |

## Requirements

- macOS with Apple Podcasts (Sync Library enabled)
- Node.js 20+
- An API key for your chosen provider (or Ollama for local)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for dev setup and guidelines.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## More from me

I'm [Chris Schofield](https://github.com/chrisschouk). I work in music PR and radio plugging in Brighton, and I build the tools I need for it.

| Project | What it does |
| --- | --- |
| [Total Audio Promo](https://totalaudiopromo.com) | Release platform for independent artists |
| [SpotCheck](https://spotcheck.cc) | Bot risk scores for Spotify playlists |
| [NewsJack](https://newsjack.cc) | Music industry news, scored and drafted into posts |
| [datasink](https://github.com/chrisschouk/sink-cli) | Contact list hygiene for music PR |
| [podflow](https://github.com/chrisschouk/podflow) | Podcast digests and guest research |
| [audx](https://github.com/chrisschouk/audx) | Terminal DAW with Ableton export |

Questions or bugs: open an issue, or find me on [X](https://x.com/chrisschouk).

## Licence

MIT
