const GAME_MODES: Record<
  string,
  { id: number; name: string; balanced?: boolean }
> = {
  '0': { id: 0, name: 'Unknown', balanced: true },
  '1': { id: 1, name: 'All Pick', balanced: true },
  '2': { id: 2, name: 'Captains Mode', balanced: true },
  '3': { id: 3, name: 'Random Draft', balanced: true },
  '4': { id: 4, name: 'Single Draft', balanced: true },
  '5': { id: 5, name: 'All Random', balanced: true },
  '6': { id: 6, name: 'Intro' },
  '7': { id: 7, name: 'Diretide' },
  '8': { id: 8, name: 'Reverse Captains Mode' },
  '9': { id: 9, name: 'Greeviling' },
  '10': { id: 10, name: 'Tutorial' },
  '11': { id: 11, name: 'Mid Only' },
  '12': { id: 12, name: 'Least Played', balanced: true },
  '13': { id: 13, name: 'Limited Heroes' },
  '14': { id: 14, name: 'Compendium Matchmaking' },
  '15': { id: 15, name: 'Custom' },
  '16': { id: 16, name: 'Captains Draft', balanced: true },
  '17': { id: 17, name: 'Balanced Draft', balanced: true },
  '18': { id: 18, name: 'Ability Draft' },
  '19': { id: 19, name: 'Event' },
  '20': { id: 20, name: 'All Random Death Match' },
  '21': { id: 21, name: '1v1 Mid' },
  '22': { id: 22, name: 'All Draft', balanced: true },
  '23': { id: 23, name: 'Turbo' },
  '24': { id: 24, name: 'Mutation' },
}

export default GAME_MODES
