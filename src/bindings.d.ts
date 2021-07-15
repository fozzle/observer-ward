export {}

declare global {
    const DISCORD_WEBHOOK_URL: string;
    const OBSERVER_WARD_WEBHOOK_SECRET: string;
    const PLAYERS: KVNamespace;
    const GUILDS: KVNamespace;
    const DISCORD_PUBLIC_KEY: string;
    const ODOTA_SESSION: string;
    const ODOTA_SESSION_SIG: string;
}