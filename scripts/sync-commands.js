/**
 * Syncs slash commands with Discord. 
 * Env vars required:
 * BOT_TOKEN: Your Discord bot token
 * APPLICATION_ID: Your Discord application ID
 */

const fetch = require('node-fetch')

const COMMANDS = [
  {
    name: 'subscribe_user',
    description: 'Subscribe to a DotA2 account',
    options: [
      {
        name: 'account_id',
        description: 'The DotA2 account ID to subscribe to',
        type: 3,
        required: true,
      },
      {
        name: 'nickname',
        description: 'A nickname for this account',
        type: 3,
        required: true
      },
    ],
  },
  {
    name: 'unsubscribe_user',
    description: 'Unsubscribe from a DotA2 account',
    options: [
      {
        name: 'account_id',
        description: 'The DotA2 account ID to unsubscribe from',
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: 'list_users',
    description: 'List subscribed DotA2 accounts',
  },
  {
    name: 'configure_guild',
    description: 'Set the channel to post in',
    options: [
      {
        name: 'channel_id',
        description: 'The guild channel to post match results to',
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: 'reset_guild',
    description: 'Remove all players, clear all webhooks. Use to get out of a bad spot.'
  }
]

async function syncCommands() {
  for (const command of COMMANDS) {
    const resp = await fetch(
      `https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/commands`,
      {
        method: 'post',
        body: JSON.stringify(command),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bot ${process.env.BOT_TOKEN}`,
        },
      },
    )
    if (resp.status >= 299) {
      const json = await resp.text()
      throw new Error(json)
    }
  }
}

async function fetchCommands() {
  const resp = await fetch(
    `https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/commands`,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bot ${process.env.BOT_TOKEN}`,
      },
    },
  )
  const json = await resp.json()
}

console.log('Syncing commands')
syncCommands()
  .then(() => {
    console.log('Sync complete')
    fetchCommands()
  })
  .catch((err) => {
    console.error(err)
  })
