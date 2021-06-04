# Observer Ward

A Discord bot that posts about DOTA2.

## Setup

You'll need to make an application on Discord to setup the bot. Get a bot token and use the `scripts/sync-commands` to setup the slash commands for your application.

The `wrangler.toml` file that is checked in is accurate for my own account but will need replacing with your own IDs.

There are also a bunch of environment variables expected to be defined on the worker:

```
export interface WorkerEnvironment {
  OBSERVER_WARD_WEBHOOK_SECRET: string // An arbitrary secret string to use with your ODotA webhooks
  OBSERVER_WARD_WEBHOOK_BASE: string // The URL for inbound webhooks from ODotA 
  DISCORD_PUBLIC_KEY: string // Your Discord interaction public key
  ODOTA_SESSION: string // ODota session token (for interacting w/ webhook URL)
  ODOTA_SESSION_SIG: string // ODota session token signature (for interacting w/ webhook URL)
  DISCORD_BOT_TOKEN: string // Discord bot token
  STEAM_WEB_API_KEY: string // Steam web API key (used for verifying valid steam accounts)
}
```

## Developing

`npm run build` will build the project via rollup to the `/dist` directory.

`npm run devstatic` will serve the static website.

Honestly I would just make a staging environment. I have not run this locally so I don't know how well it works.

## Deploying

Use Cloudflare Wrangler to publish the worker. The static site is deployed automatically via Cloudflare Pages.
