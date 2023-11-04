const HERO_MAP: Record<string, { id: number; emoji?: string; name: string }> = {
  '1': {
    id: 1,
    emoji: ':dota_hero_antimage:907140587482906654',
    name: 'Anti-Mage',
  },
  '2': {
    id: 2,
    emoji: ':dota_hero_axe:907140587482906655',
    name: 'Axe',
  },
  '3': {
    id: 3,
    emoji: ':dota_hero_bane:907140587164143618',
    name: 'Bane',
  },
  '4': {
    id: 4,
    emoji: ':dota_hero_bloodseeker:907140587600363571',
    name: 'Bloodseeker',
  },
  '5': {
    id: 5,
    emoji: ':dota_hero_crystal_maiden:907140587612934165',
    name: 'Crystal Maiden',
  },
  '6': {
    id: 6,
    emoji: ':dota_hero_drow_ranger:907140624199860234',
    name: 'Drow Ranger',
  },
  '7': {
    id: 7,
    emoji: ':dota_hero_earthshaker:907140624279547904',
    name: 'Earthshaker',
  },
  '8': {
    id: 8,
    emoji: ':dota_hero_juggernaut:907140624283742249',
    name: 'Juggernaut',
  },
  '9': {
    id: 9,
    emoji: ':dota_hero_mirana:907144576001790002',
    name: 'Mirana',
  },
  '10': {
    id: 10,
    emoji: ':dota_hero_morphling:907144575762722857',
    name: 'Morphling',
  },
  '11': {
    id: 11,
    emoji: ':dota_hero_nevermore:907144576098254910',
    name: 'Shadow Fiend',
  },
  '12': {
    id: 12,
    emoji: ':dota_hero_phantom_lancer:907144576224067614',
    name: 'Phantom Lancer',
  },
  '13': {
    id: 13,
    emoji: ':dota_hero_puck:907144576207315024',
    name: 'Puck',
  },
  '14': {
    id: 14,
    emoji: ':dota_hero_pudge:907144576098254911',
    name: 'Pudge',
  },
  '15': {
    id: 15,
    emoji: ':dota_hero_razor:907144575875960844',
    name: 'Razor',
  },
  '16': {
    id: 16,
    emoji: ':dota_hero_sand_king:907144576521883658',
    name: 'Sand King',
  },
  '17': {
    id: 17,
    emoji: ':dota_hero_storm_spirit:907144576526086155',
    name: 'Storm Spirit',
  },
  '18': {
    id: 18,
    emoji: ':dota_hero_sven:907144576551235606',
    name: 'Sven',
  },
  '19': {
    id: 19,
    emoji: ':dota_hero_tiny:907147458180698152',
    name: 'Tiny',
  },
  '20': {
    id: 20,
    emoji: ':dota_hero_vengefulspirit:907147458235207711',
    name: 'Vengeful Spirit',
  },
  '21': {
    id: 21,
    emoji: ':dota_hero_windrunner:907147458218430465',
    name: 'Windranger',
  },
  '22': {
    id: 22,
    emoji: ':dota_hero_zuus:907147458176512021',
    name: 'Zeus',
  },
  '23': {
    id: 23,
    emoji: ':dota_hero_kunkka:907140624367644763',
    name: 'Kunkka',
  },
  '25': {
    id: 25,
    emoji: ':dota_hero_lina:907144575582371843',
    name: 'Lina',
  },
  '26': {
    id: 26,
    emoji: ':dota_hero_lion:907144575829819442',
    name: 'Lion',
  },
  '27': {
    id: 27,
    emoji: ':dota_hero_shadow_shaman:907144576471531580',
    name: 'Shadow Shaman',
  },
  '28': {
    id: 28,
    emoji: ':dota_hero_slardar:907144576224071722',
    name: 'Slardar',
  },
  '29': {
    id: 29,
    emoji: ':dota_hero_tidehunter:907147458142961665',
    name: 'Tidehunter',
  },
  '30': {
    id: 30,
    emoji: ':dota_hero_witch_doctor:907147458428166144',
    name: 'Witch Doctor',
  },
  '31': {
    id: 31,
    emoji: ':dota_hero_lich:907140624275370025',
    name: 'Lich',
  },
  '32': {
    id: 32,
    emoji: ':dota_hero_riki:907144576349917224',
    name: 'Riki',
  },
  '33': {
    id: 33,
    emoji: ':dota_hero_enigma:907140624115990609',
    name: 'Enigma',
  },
  '34': {
    id: 34,
    emoji: ':dota_hero_tinker:907147458168102962',
    name: 'Tinker',
  },
  '35': {
    id: 35,
    emoji: ':dota_hero_sniper:907144576626728980',
    name: 'Sniper',
  },
  '36': {
    id: 36,
    emoji: ':dota_hero_necrolyte:907144576043741244',
    name: 'Necrophos',
  },
  '37': {
    id: 37,
    emoji: ':dota_hero_warlock:907147458264592435',
    name: 'Warlock',
  },
  '38': {
    id: 38,
    emoji: ':dota_hero_beastmaster:907140587512299530',
    name: 'Beastmaster',
  },
  '39': {
    id: 39,
    emoji: ':dota_hero_queenofpain:907144576022773762',
    name: 'Queen of Pain',
  },
  '40': {
    id: 40,
    emoji: ':dota_hero_venomancer:907147458142961666',
    name: 'Venomancer',
  },
  '41': {
    id: 41,
    emoji: ':dota_hero_faceless_void:907140624233410560',
    name: 'Faceless Void',
  },
  '42': {
    id: 42,
    emoji: ':dota_hero_skeleton_king:907144576098238487',
    name: 'Wraith King',
  },
  '43': {
    id: 43,
    emoji: ':dota_hero_death_prophet:907140587759759400',
    name: 'Death Prophet',
  },
  '44': {
    id: 44,
    emoji: ':dota_hero_phantom_assassin:907144575976603680',
    name: 'Phantom Assassin',
  },
  '45': {
    id: 45,
    emoji: ':dota_hero_pugna:907144576022773761',
    name: 'Pugna',
  },
  '46': {
    id: 46,
    emoji: ':dota_hero_templar_assassin:907144576349917225',
    name: 'Templar Assassin',
  },
  '47': {
    id: 47,
    emoji: ':dota_hero_viper:907147458205851699',
    name: 'Viper',
  },
  '48': {
    id: 48,
    emoji: ':dota_hero_luna:907144575846588426',
    name: 'Luna',
  },
  '49': {
    id: 49,
    emoji: ':dota_hero_dragon_knight:907140624145338418',
    name: 'Dragon Knight',
  },
  '50': {
    id: 50,
    emoji: ':dota_hero_dazzle:907140587583578144',
    name: 'Dazzle',
  },
  '51': {
    id: 51,
    emoji: ':dota_hero_rattletrap:907144576303771679',
    name: 'Clockwerk',
  },
  '52': {
    id: 52,
    emoji: ':dota_hero_leshrac:907140624229216307',
    name: 'Leshrac',
  },
  '53': {
    id: 53,
    emoji: ':dota_hero_furion:907140624120172575',
    name: "Nature's Prophet",
  },
  '54': {
    id: 54,
    emoji: ':dota_hero_life_stealer:907140624380215367',
    name: 'Lifestealer',
  },
  '55': {
    id: 55,
    emoji: ':dota_hero_dark_seer:907140587503906838',
    name: 'Dark Seer',
  },
  '56': {
    id: 56,
    emoji: ':dota_hero_clinkz:907140587612934164',
    name: 'Clinkz',
  },
  '57': {
    id: 57,
    emoji: ':dota_hero_omniknight:907144576094072853',
    name: 'Omniknight',
  },
  '58': {
    id: 58,
    emoji: ':dota_hero_enchantress:907140624166322216',
    name: 'Enchantress',
  },
  '59': {
    id: 59,
    emoji: ':dota_hero_huskar:907140624258580520',
    name: 'Huskar',
  },
  '60': {
    id: 60,
    emoji: ':dota_hero_night_stalker:907144575804645448',
    name: 'Night Stalker',
  },
  '61': {
    id: 61,
    emoji: ':dota_hero_broodmother:907140587587792937',
    name: 'Broodmother',
  },
  '62': {
    id: 62,
    emoji: ':dota_hero_bounty_hunter:907140587587792936',
    name: 'Bounty Hunter',
  },
  '63': {
    id: 63,
    emoji: ':dota_hero_weaver:907147458285543464',
    name: 'Weaver',
  },
  '64': {
    id: 64,
    emoji: ':dota_hero_jakiro:907140624216625194',
    name: 'Jakiro',
  },
  '65': {
    id: 65,
    emoji: ':dota_hero_batrider:907140587508097085',
    name: 'Batrider',
  },
  '66': {
    id: 66,
    emoji: ':dota_hero_chen:907140587604553848',
    name: 'Chen',
  },
  '67': {
    id: 67,
    emoji: ':dota_hero_spectre:907144576370868267',
    name: 'Spectre',
  },
  '68': {
    id: 68,
    emoji: ':dota_hero_ancient_apparition:907140587474542632',
    name: 'Ancient Apparition',
  },
  '69': {
    id: 69,
    emoji: ':dota_hero_doom_bringer:907140624216625193',
    name: 'Doom',
  },
  '70': {
    id: 70,
    emoji: ':dota_hero_ursa:907147458080043040',
    name: 'Ursa',
  },
  '71': {
    id: 71,
    emoji: ':dota_hero_spirit_breaker:907144576651903038',
    name: 'Spirit Breaker',
  },
  '72': {
    id: 72,
    emoji: ':dota_hero_gyrocopter:907140624229216306',
    name: 'Gyrocopter',
  },
  '73': {
    id: 73,
    emoji: ':dota_hero_alchemist:907140587466133514',
    name: 'Alchemist',
  },
  '74': {
    id: 74,
    emoji: ':dota_hero_invoker:907140624283742248',
    name: 'Invoker',
  },
  '75': {
    id: 75,
    emoji: ':dota_hero_silencer:907144576215683115',
    name: 'Silencer',
  },
  '76': {
    id: 76,
    emoji: ':dota_hero_obsidian_destroyer:907144575976603679',
    name: 'Outworld Devourer',
  },
  '77': {
    id: 77,
    emoji: ':dota_hero_lycan:907144575829819443',
    name: 'Lycan',
  },
  '78': {
    id: 78,
    emoji: ':dota_hero_brewmaster:907140587583578142',
    name: 'Brewmaster',
  },
  '79': {
    id: 79,
    emoji: ':dota_hero_shadow_demon:907144576370868266',
    name: 'Shadow Demon',
  },
  '80': {
    id: 80,
    emoji: ':dota_hero_lone_druid:907144575829803078',
    name: 'Lone Druid',
  },
  '81': {
    id: 81,
    emoji: ':dota_hero_chaos_knight:907140587600363570',
    name: 'Chaos Knight',
  },
  '82': {
    id: 82,
    emoji: ':dota_hero_meepo:907144575561400382',
    name: 'Meepo',
  },
  '83': {
    id: 83,
    emoji: ':dota_hero_treant:907147458042282005',
    name: 'Treant Protector',
  },
  '84': {
    id: 84,
    emoji: ':dota_hero_ogre_magi:907144576094072852',
    name: 'Ogre Magi',
  },
  '85': {
    id: 85,
    emoji: ':dota_hero_undying:907147458080043039',
    name: 'Undying',
  },
  '86': {
    id: 86,
    emoji: ':dota_hero_rubick:907144576043741246',
    name: 'Rubick',
  },
  '87': {
    id: 87,
    emoji: ':dota_hero_disruptor:907140624124370944',
    name: 'Disruptor',
  },
  '88': {
    id: 88,
    emoji: ':dota_hero_nyx_assassin:907144576043741245',
    name: 'Nyx Assassin',
  },
  '89': {
    id: 89,
    emoji: ':dota_hero_naga_siren:907144575959830548',
    name: 'Naga Siren',
  },
  '90': {
    id: 90,
    emoji: ':dota_hero_keeper_of_the_light:907140624363454484',
    name: 'Keeper of the Light',
  },
  '91': {
    id: 91,
    emoji: ':dota_hero_wisp:907147458264592437',
    name: 'Io',
  },
  '92': {
    id: 92,
    emoji: ':dota_hero_visage:907147458256191498',
    name: 'Visage',
  },
  '93': {
    id: 93,
    emoji: ':dota_hero_slark:907144576651903036',
    name: 'Slark',
  },
  '94': {
    id: 94,
    emoji: ':dota_hero_medusa:907144575829827675',
    name: 'Medusa',
  },
  '95': {
    id: 95,
    emoji: ':dota_hero_troll_warlord:907147457866104894',
    name: 'Troll Warlord',
  },
  '96': {
    id: 96,
    emoji: ':dota_hero_centaur:907140587617124422',
    name: 'Centaur Warrunner',
  },
  '97': {
    id: 97,
    emoji: ':dota_hero_magnataur:907144575875960842',
    name: 'Magnus',
  },
  '98': {
    id: 98,
    emoji: ':dota_hero_shredder:907144576526086154',
    name: 'Timbersaw',
  },
  '99': {
    id: 99,
    emoji: ':dota_hero_bristleback:907140587503906837',
    name: 'Bristleback',
  },
  '100': {
    id: 100,
    emoji: ':dota_hero_tusk:907147458205851698',
    name: 'Tusk',
  },
  '101': {
    id: 101,
    emoji: ':dota_hero_skywrath_mage:907144576605765673',
    name: 'Skywrath Mage',
  },
  '102': {
    id: 102,
    emoji: ':dota_hero_abaddon:907140587453546537',
    name: 'Abaddon',
  },
  '103': {
    id: 103,
    emoji: ':dota_hero_elder_titan:907140623751073855',
    name: 'Elder Titan',
  },
  '104': {
    id: 104,
    emoji: ':dota_hero_legion_commander:907140624409559060',
    name: 'Legion Commander',
  },
  '105': {
    id: 105,
    emoji: ':dota_hero_techies:907144576471531581',
    name: 'Techies',
  },
  '106': {
    id: 106,
    emoji: ':dota_hero_ember_spirit:907140624178872370',
    name: 'Ember Spirit',
  },
  '107': {
    id: 107,
    emoji: ':dota_hero_earth_spirit:907140624178901002',
    name: 'Earth Spirit',
  },
  '108': {
    id: 108,
    emoji: ':dota_hero_abyssal_underlord:907140587453546536',
    name: 'Underlord',
  },
  '109': {
    id: 109,
    emoji: ':dota_hero_terrorblade:907147458201677914',
    name: 'Terrorblade',
  },
  '110': {
    id: 110,
    emoji: ':dota_hero_phoenix:907144576186347550',
    name: 'Phoenix',
  },
  '111': {
    id: 111,
    emoji: ':dota_hero_oracle:907144576098238484',
    name: 'Oracle',
  },
  '112': {
    id: 112,
    emoji: ':dota_hero_winter_wyvern:907147458201677915',
    name: 'Winter Wyvern',
  },
  '113': {
    id: 113,
    emoji: ':dota_hero_arc_warden:907140587503906836',
    name: 'Arc Warden',
  },
  '114': {
    id: 114,
    emoji: ':dota_hero_monkey_king:907144575976603678',
    name: 'Monkey King',
  },
  '119': {
    id: 119,
    emoji: ':dota_hero_dark_willow:907140587713613854',
    name: 'Dark Willow',
  },
  '120': {
    id: 120,
    emoji: ':dota_hero_pangolier:907144576215683112',
    name: 'Pangolier',
  },
  '121': {
    id: 121,
    emoji: ':dota_hero_grimstroke:907140624275370024',
    name: 'Grimstroke',
  },
  '123': {
    id: 123,
    emoji: ':dota_hero_hoodwink:907140624145338419',
    name: 'Hoodwink',
  },
  '126': {
    id: 126,
    emoji: ':dota_hero_void_spirit:907147458142961667',
    name: 'Void Spirit',
  },
  '128': {
    id: 128,
    emoji: ':dota_hero_snapfire:907144576559624252',
    name: 'Snapfire',
  },
  '129': {
    id: 129,
    emoji: ':dota_hero_mars:907144575804645447',
    name: 'Mars',
  },
  '135': {
    id: 135,
    emoji: ':dota_hero_dawnbreaker:907140587730395156',
    name: 'Dawnbreaker',
  },
  '136': {
    id: 136,
    emoji: ':dota_hero_marci:936029253470924901',
    name: 'Marci',
  },
  '137': {
    id: 137,
    emoji: ':dota_hero_primal_beast:1007802344043446294',
    name: 'Primal Beast'
  },
  '138': {
    id: 138,
    emoji: ':dota_hero_muerta:1170448168509521920',
    name: 'Muerta'
  }
}

export default HERO_MAP
