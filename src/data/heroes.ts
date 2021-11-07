const HERO_MAP: Record<string, { id: number; name: string }> = {
  '1': {
    id: 1,

    name: 'Anti-Mage',
  },
  '2': {
    id: 2,

    name: 'Axe',
  },
  '3': {
    id: 3,

    name: 'Bane',
  },
  '4': {
    id: 4,

    name: 'Bloodseeker',
  },
  '5': {
    id: 5,

    name: 'Crystal Maiden',
  },
  '6': {
    id: 6,

    name: 'Drow Ranger',
  },
  '7': {
    id: 7,

    name: 'Earthshaker',
  },
  '8': {
    id: 8,

    name: 'Juggernaut',
  },
  '9': {
    id: 9,

    name: 'Mirana',
  },
  '10': {
    id: 10,

    name: 'Morphling',
  },
  '11': {
    id: 11,

    name: 'Shadow Fiend',
  },
  '12': {
    id: 12,

    name: 'Phantom Lancer',
  },
  '13': {
    id: 13,

    name: 'Puck',
  },
  '14': {
    id: 14,

    name: 'Pudge',
  },
  '15': {
    id: 15,

    name: 'Razor',
  },
  '16': {
    id: 16,

    name: 'Sand King',
  },
  '17': {
    id: 17,

    name: 'Storm Spirit',
  },
  '18': {
    id: 18,

    name: 'Sven',
  },
  '19': {
    id: 19,

    name: 'Tiny',
  },
  '20': {
    id: 20,

    name: 'Vengeful Spirit',
  },
  '21': {
    id: 21,

    name: 'Windranger',
  },
  '22': {
    id: 22,

    name: 'Zeus',
  },
  '23': {
    id: 23,

    name: 'Kunkka',
  },
  '25': {
    id: 25,

    name: 'Lina',
  },
  '26': {
    id: 26,

    name: 'Lion',
  },
  '27': {
    id: 27,

    name: 'Shadow Shaman',
  },
  '28': {
    id: 28,

    name: 'Slardar',
  },
  '29': {
    id: 29,

    name: 'Tidehunter',
  },
  '30': {
    id: 30,

    name: 'Witch Doctor',
  },
  '31': {
    id: 31,

    name: 'Lich',
  },
  '32': {
    id: 32,

    name: 'Riki',
  },
  '33': {
    id: 33,

    name: 'Enigma',
  },
  '34': {
    id: 34,

    name: 'Tinker',
  },
  '35': {
    id: 35,

    name: 'Sniper',
  },
  '36': {
    id: 36,

    name: 'Necrophos',
  },
  '37': {
    id: 37,

    name: 'Warlock',
  },
  '38': {
    id: 38,

    name: 'Beastmaster',
  },
  '39': {
    id: 39,

    name: 'Queen of Pain',
  },
  '40': {
    id: 40,

    name: 'Venomancer',
  },
  '41': {
    id: 41,

    name: 'Faceless Void',
  },
  '42': {
    id: 42,

    name: 'Wraith King',
  },
  '43': {
    id: 43,

    name: 'Death Prophet',
  },
  '44': {
    id: 44,

    name: 'Phantom Assassin',
  },
  '45': {
    id: 45,

    name: 'Pugna',
  },
  '46': {
    id: 46,

    name: 'Templar Assassin',
  },
  '47': {
    id: 47,

    name: 'Viper',
  },
  '48': {
    id: 48,

    name: 'Luna',
  },
  '49': {
    id: 49,

    name: 'Dragon Knight',
  },
  '50': {
    id: 50,

    name: 'Dazzle',
  },
  '51': {
    id: 51,

    name: 'Clockwerk',
  },
  '52': {
    id: 52,

    name: 'Leshrac',
  },
  '53': {
    id: 53,

    name: "Nature's Prophet",
  },
  '54': {
    id: 54,

    name: 'Lifestealer',
  },
  '55': {
    id: 55,

    name: 'Dark Seer',
  },
  '56': {
    id: 56,

    name: 'Clinkz',
  },
  '57': {
    id: 57,

    name: 'Omniknight',
  },
  '58': {
    id: 58,

    name: 'Enchantress',
  },
  '59': {
    id: 59,

    name: 'Huskar',
  },
  '60': {
    id: 60,

    name: 'Night Stalker',
  },
  '61': {
    id: 61,

    name: 'Broodmother',
  },
  '62': {
    id: 62,

    name: 'Bounty Hunter',
  },
  '63': {
    id: 63,

    name: 'Weaver',
  },
  '64': {
    id: 64,

    name: 'Jakiro',
  },
  '65': {
    id: 65,

    name: 'Batrider',
  },
  '66': {
    id: 66,

    name: 'Chen',
  },
  '67': {
    id: 67,

    name: 'Spectre',
  },
  '68': {
    id: 68,

    name: 'Ancient Apparition',
  },
  '69': {
    id: 69,

    name: 'Doom',
  },
  '70': {
    id: 70,

    name: 'Ursa',
  },
  '71': {
    id: 71,

    name: 'Spirit Breaker',
  },
  '72': {
    id: 72,

    name: 'Gyrocopter',
  },
  '73': {
    id: 73,

    name: 'Alchemist',
  },
  '74': {
    id: 74,

    name: 'Invoker',
  },
  '75': {
    id: 75,

    name: 'Silencer',
  },
  '76': {
    id: 76,

    name: 'Outworld Devourer',
  },
  '77': {
    id: 77,

    name: 'Lycan',
  },
  '78': {
    id: 78,

    name: 'Brewmaster',
  },
  '79': {
    id: 79,

    name: 'Shadow Demon',
  },
  '80': {
    id: 80,

    name: 'Lone Druid',
  },
  '81': {
    id: 81,

    name: 'Chaos Knight',
  },
  '82': {
    id: 82,

    name: 'Meepo',
  },
  '83': {
    id: 83,

    name: 'Treant Protector',
  },
  '84': {
    id: 84,

    name: 'Ogre Magi',
  },
  '85': {
    id: 85,

    name: 'Undying',
  },
  '86': {
    id: 86,

    name: 'Rubick',
  },
  '87': {
    id: 87,

    name: 'Disruptor',
  },
  '88': {
    id: 88,

    name: 'Nyx Assassin',
  },
  '89': {
    id: 89,

    name: 'Naga Siren',
  },
  '90': {
    id: 90,

    name: 'Keeper of the Light',
  },
  '91': {
    id: 91,

    name: 'Io',
  },
  '92': {
    id: 92,

    name: 'Visage',
  },
  '93': {
    id: 93,

    name: 'Slark',
  },
  '94': {
    id: 94,

    name: 'Medusa',
  },
  '95': {
    id: 95,

    name: 'Troll Warlord',
  },
  '96': {
    id: 96,

    name: 'Centaur Warrunner',
  },
  '97': {
    id: 97,

    name: 'Magnus',
  },
  '98': {
    id: 98,

    name: 'Timbersaw',
  },
  '99': {
    id: 99,

    name: 'Bristleback',
  },
  '100': {
    id: 100,

    name: 'Tusk',
  },
  '101': {
    id: 101,

    name: 'Skywrath Mage',
  },
  '102': {
    id: 102,

    name: 'Abaddon',
  },
  '103': {
    id: 103,

    name: 'Elder Titan',
  },
  '104': {
    id: 104,

    name: 'Legion Commander',
  },
  '105': {
    id: 105,

    name: 'Techies',
  },
  '106': {
    id: 106,

    name: 'Ember Spirit',
  },
  '107': {
    id: 107,

    name: 'Earth Spirit',
  },
  '108': {
    id: 108,

    name: 'Underlord',
  },
  '109': {
    id: 109,

    name: 'Terrorblade',
  },
  '110': {
    id: 110,

    name: 'Phoenix',
  },
  '111': {
    id: 111,

    name: 'Oracle',
  },
  '112': {
    id: 112,

    name: 'Winter Wyvern',
  },
  '113': {
    id: 113,

    name: 'Arc Warden',
  },
  '114': {
    id: 114,

    name: 'Monkey King',
  },
  '119': {
    id: 119,

    name: 'Dark Willow',
  },
  '120': {
    id: 120,

    name: 'Pangolier',
  },
  '121': {
    id: 121,

    name: 'Grimstroke',
  },
  '123': {
    id: 123,

    name: 'Hoodwink',
  },
  '126': {
    id: 126,

    name: 'Void Spirit',
  },
  '128': {
    id: 128,

    name: 'Snapfire',
  },
  '129': {
    id: 129,

    name: 'Mars',
  },
  '135': {
    id: 135,

    name: 'Dawnbreaker',
  },
  '136': {
    id: 136,
    name: 'Marci',
  }
}

export default HERO_MAP
