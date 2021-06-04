export {}

declare global {
    const DISCORD_WEBHOOK_URL: string;
    const WEBHOOK_SECRET: string;
    const PLAYERS: KVNamespace;
    const GUILDS: KVNamespace;
    const DISCORD_PUBLIC_KEY: string;
}