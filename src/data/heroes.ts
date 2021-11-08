const HERO_MAP: Record<string, { id: number; emoji?: string; name: string }> = {
  '1': {
    id: 1,
    emoji: ':dota_hero_antimage:448669280121126924',
    name: 'Anti-Mage',
  },
  '2': {
    id: 2,
    emoji: ':dota_hero_axe:448669285162942495',
    name: 'Axe',
  },
  '3': {
    id: 3,
    emoji: ':dota_hero_bane:448669290489446415',
    name: 'Bane',
  },
  '4': {
    id: 4,
    emoji: ':dota_hero_bloodseeker:448669295036203020',
    name: 'Bloodseeker',
  },
  '5': {
    id: 5,
    emoji: ':dota_hero_crystal_maiden:448669299972898858',
    name: 'Crystal Maiden',
  },
  '6': {
    id: 6,
    emoji: ':dota_hero_drow_ranger:448669305299664926',
    name: 'Drow Ranger',
  },
  '7': {
    id: 7,
    emoji: ':dota_hero_earthshaker:448669310437556244',
    name: 'Earthshaker',
  },
  '8': {
    id: 8,
    emoji: ':dota_hero_juggernaut:448669315084845067',
    name: 'Juggernaut',
  },
  '9': {
    id: 9,
    emoji: ':dota_hero_mirana:448669319941849089',
    name: 'Mirana',
  },
  '10': {
    id: 10,
    emoji: ':dota_hero_morphling:448669324803047445',
    name: 'Morphling',
  },
  '11': {
    id: 11,
    emoji: ':dota_hero_nevermore:448669329806852097',
    name: 'Shadow Fiend',
  },
  '12': {
    id: 12,
    emoji: ':dota_hero_phantom_lancer:448669334823370752',
    name: 'Phantom Lancer',
  },
  '13': {
    id: 13,
    emoji: ':dota_hero_puck:448669340347400202',
    name: 'Puck',
  },
  '14': {
    id: 14,
    emoji: ':dota_hero_pudge:448669345212530688',
    name: 'Pudge',
  },
  '15': {
    id: 15,
    emoji: ':dota_hero_razor:448669349973065758',
    name: 'Razor',
  },
  '16': {
    id: 16,
    emoji: ':dota_hero_sand_king:448669354809098244',
    name: 'Sand King',
  },
  '17': {
    id: 17,   emoji: ':dota_hero_storm_spirit:448669359674621962',
    name: 'Storm Spirit',
  },
  '18': {
    id: 18,
    emoji: ':dota_hero_sven:448669364569374720',
    name: 'Sven',
  },
  '19': {
    id: 19,
    emoji: ':dota_hero_tiny:448669369224921098',
    name: 'Tiny',
  },
  '20': {
    id: 20,
    emoji: ':dota_hero_vengefulspirit:448669374170136576',
    name: 'Vengeful Spirit',
  },
  '21': {
    id: 21,
    emoji: ':dota_hero_windrunner:448669379069083687',
    name: 'Windranger',
  },
  '22': {
    id: 22,
    emoji: ':dota_hero_zuus:448669383896596511',
    name: 'Zeus',
  },
  '23': {
    id: 23,
    emoji: ':dota_hero_kunkka:448669388787417118',
    name: 'Kunkka',
  },
  '25': {
    id: 25,
    emoji: ':dota_hero_lina:448669393447288833',
    name: 'Lina',
  },
  '26': {
    id: 26,
    emoji: ':dota_hero_lion:448669398258024449',
    name: 'Lion',
  },
  '27': {
    id: 27,
    emoji: ':dota_hero_shadow_shaman:448669403115159563',
    name: 'Shadow Shaman',
  },
  '28': {
    id: 28,   emoji: ':dota_hero_slardar:448669408223559720',
    name: 'Slardar',
  },
  '29': {
    id: 29,   emoji: ':dota_hero_tidehunter:448669412682235925',
    name: 'Tidehunter',
  },
  '30': {
    id: 30,   emoji: ':dota_hero_witch_doctor:448669417946218496',
    name: 'Witch Doctor',
  },
  '31': {
    id: 31,   emoji: ':dota_hero_lich:448669423159476234',
    name: 'Lich',
  },
  '32': {
    id: 32,
    emoji: ':dota_hero_riki:448669427857358849',
    name: 'Riki',
  },
  '33': {
    id: 33,
    emoji: ':dota_hero_enigma:448669432747655192',
    name: 'Enigma',
  },
  '34': {
    id: 34,
    emoji: ':dota_hero_tinker:448669438053711872',
    name: 'Tinker',
  },
  '35': {
    id: 35,
    emoji: ':dota_hero_sniper:448669442566782997',
    name: 'Sniper',
  },
  '36': {
    id: 36,
    emoji: ':dota_hero_necrolyte:448669447792754728',
    name: 'Necrophos',
  },
  '37': {
    id: 37,
    emoji: ':dota_hero_warlock:448669452561809418',
    name: 'Warlock',
  },
  '38': {
    id: 38,
    emoji: ':dota_hero_beastmaster:448669457125081100',
    name: 'Beastmaster',
  },
  '39': {
    id: 39,
    emoji: ':dota_hero_queenofpain:448669462061776917',
    name: 'Queen of Pain',
  },
  '40': {
    id: 40,
    emoji: ':dota_hero_venomancer:448669467308982273',
    name: 'Venomancer',
  },
  '41': {
    id: 41,
    emoji: ':dota_hero_faceless_void:448669472258129930',
    name: 'Faceless Void',
  },
  '42': {
    id: 42,
    emoji: ':dota_hero_skeleton_king:448669476833984523',
    name: 'Wraith King',
  },
  '43': {
    id: 43,
    emoji: ':dota_hero_death_prophet:448669481859022859',
    name: 'Death Prophet',
  },
  '44': {
    id: 44,
    emoji: ':dota_hero_phantom_assassin:448669486992850974',
    name: 'Phantom Assassin',
  },
  '45': {
    id: 45,
    emoji: ':dota_hero_pugna:448669491857981450',
    name: 'Pugna',
  },
  '46': {
    id: 46,
    emoji: ':dota_hero_templar_assassin:448669496417320961',
    name: 'Templar Assassin',
  },
  '47': {
    id: 47,
    emoji: ':dota_hero_viper:448669501551149086',
    name: 'Viper',
  },
  '48': {
    id: 48,
    emoji: ':dota_hero_luna:448669506097643531',
    name: 'Luna',
  },
  '49': {
    id: 49,
    emoji: ':dota_hero_dragon_knight:448669511193722890',
    name: 'Dragon Knight',
  },
  '50': {
    id: 50,
    emoji: ':dota_hero_dazzle:448669516147195904',
    name: 'Dazzle',
  },
  '51': {
    id: 51,
    emoji: ':dota_hero_rattletrap:448687354798931980',
    name: 'Clockwerk',
  },
  '52': {
    id: 52,
    emoji: ':dota_hero_leshrac:448687360297664512',
    name: 'Leshrac',
  },
  '53': {
    id: 53,
    emoji: ':dota_hero_furion:448687365167251466',
    name: "Nature's Prophet",
  },
  '54': {
    id: 54,
    emoji: ':dota_hero_life_stealer:448687370150215681',
    name: 'Lifestealer',
  },
  '55': {
    id: 55,
    emoji: ':dota_hero_dark_seer:448687374747041805',
    name: 'Dark Seer',
  },
  '56': {
    id: 56,
    emoji: ':dota_hero_clinkz:448687380057161736',
    name: 'Clinkz',
  },
  '57': {
    id: 57,
    emoji: ':dota_hero_omniknight:448687384721358859',
    name: 'Omniknight',
  },
  '58': {
    id: 58,
    emoji: ':dota_hero_enchantress:448687389708386305',
    name: 'Enchantress',
  },
  '59': {
    id: 59,
    emoji: ':dota_hero_huskar:448687394544418816',
    name: 'Huskar',
  },
  '60': {
    id: 60,
    emoji: ':dota_hero_night_stalker:448687399275331585',
    name: 'Night Stalker',
  },
  '61': {
    id: 61,
    emoji: ':dota_hero_broodmother:448687404501434368',
    name: 'Broodmother',
  },
  '62': {
    id: 62,
    emoji: ':dota_hero_bounty_hunter:448687409442586625',
    name: 'Bounty Hunter',
  },
  '63': {
    id: 63,
    emoji: ':dota_hero_weaver:448687414085419029',
    name: 'Weaver',
  },
  '64': {
    id: 64,
    emoji: ':dota_hero_jakiro:448687419043086347',
    name: 'Jakiro',
  },
  '65': {
    id: 65,
    emoji: ':dota_hero_batrider:448687424080445471',
    name: 'Batrider',
  },
  '66': {
    id: 66,
    emoji: ':dota_hero_chen:448687429155684362',
    name: 'Chen',
  },
  '67': {
    id: 67,
    emoji: ':dota_hero_spectre:448687434188980224',
    name: 'Spectre',
  },
  '68': {
    id: 68,
    emoji: ':dota_hero_ancient_apparition:448687438869692427',
    name: 'Ancient Apparition',
  },
  '69': {
    id: 69,
    emoji: ':dota_hero_doom_bringer:448687443785547787',
    name: 'Doom',
  },
  '70': {
    id: 70,
    emoji: ':dota_hero_ursa:448687448869044224',
    name: 'Ursa',
  },
  '71': {
    id: 71,
    emoji: ':dota_hero_spirit_breaker:448687453692493824',
    name: 'Spirit Breaker',
  },
  '72': {
    id: 72,
    emoji: ':dota_hero_gyrocopter:448687458155102239',
    name: 'Gyrocopter',
  },
  '73': {
    id: 73,
    emoji: ':dota_hero_alchemist:448687462915637249',
    name: 'Alchemist',
  },
  '74': {
    id: 74,
    emoji: ':dota_hero_invoker:448687468087345153',
    name: 'Invoker',
  },
  '75': {
    id: 75,
    emoji: ':dota_hero_silencer:448687472897949719',
    name: 'Silencer',
  },
  '76': {
    id: 76,
    emoji: ':dota_hero_obsidian_destroyer:448687477746827284',
    name: 'Outworld Devourer',
  },
  '77': {
    id: 77,
    emoji: ':dota_hero_lycan:448687482528202753',
    name: 'Lycan',
  },
  '78': {
    id: 78,
    emoji: ':dota_hero_brewmaster:448687487271829515',
    name: 'Brewmaster',
  },
  '79': {
    id: 79,
    emoji: ':dota_hero_shadow_demon:448687492082827275',
    name: 'Shadow Demon',
  },
  '80': {
    id: 80,
    emoji: ':dota_hero_lone_druid:448687497023717396',
    name: 'Lone Druid',
  },
  '81': {
    id: 81,
    emoji: ':dota_hero_chaos_knight:448687501834452992',
    name: 'Chaos Knight',
  },
  '82': {
    id: 82,
    emoji: ':dota_hero_meepo:448687506460770305',
    name: 'Meepo',
  },
  '83': {
    id: 83,
    emoji: ':dota_hero_treant:448687511472963585',
    name: 'Treant Protector',
  },
  '84': {
    id: 84,
    emoji: ':dota_hero_ogre_magi:448687516468641792',
    name: 'Ogre Magi',
  },
  '85': {
    id: 85,
    emoji: ':dota_hero_undying:448687521078181890',
    name: 'Undying',
  },
  '86': {
    id: 86,
    emoji: ':dota_hero_rubick:448687525951700993',
    name: 'Rubick',
  },
  '87': {
    id: 87,
    emoji: ':dota_hero_disruptor:448687531114889216',
    name: 'Disruptor',
  },
  '88': {
    id: 88,
    emoji: ':dota_hero_nyx_assassin:448687535946727425',
    name: 'Nyx Assassin',
  },
  '89': {
    id: 89,
    emoji: ':dota_hero_naga_siren:448687540627832845',
    name: 'Naga Siren',
  },
  '90': {
    id: 90,
    emoji: ':dota_hero_keeper_of_the_light:448687545895747584',
    name: 'Keeper of the Light',
  },
  '91': {
    id: 91,
    emoji: ':dota_hero_wisp:448687550459019266',
    name: 'Io',
  },
  '92': {
    id: 92,
    emoji: ':dota_hero_visage:448687555651567636',
    name: 'Visage',
  },
  '93': {
    id: 93,
    emoji: ':dota_hero_slark:448687560513028096',
    name: 'Slark',
  },
  '94': {
    id: 94,
    emoji: ':dota_hero_medusa:448687565344735232',
    name: 'Medusa',
  },
  '95': {
    id: 95,
    emoji: ':dota_hero_troll_warlord:448687570159665158',
    name: 'Troll Warlord',
  },
  '96': {
    id: 96,
    emoji: ':dota_hero_centaur:448687575008280576',
    name: 'Centaur Warrunner',
  },
  '97': {
    id: 97,
    emoji: ':dota_hero_magnataur:448687579823603712',
    name: 'Magnus',
  },
  '98': {
    id: 98,
    emoji: ':dota_hero_shredder:448687584676151307',
    name: 'Timbersaw',
  },
  '99': {
    id: 99,
    emoji: ':dota_hero_bristleback:448687589440880641',
    name: 'Bristleback',
  },
  '100': {
    id: 100,
    emoji: ':dota_hero_tusk:448687594562256916',
    name: 'Tusk',
  },
  '101': {
    id: 101,
    emoji: ':dota_hero_skywrath_mage:448687599184379906',
    name: 'Skywrath Mage',
  },
  '102': {
    id: 102,
    emoji: ':dota_hero_abaddon:448687604250968064',
    name: 'Abaddon',
  },
  '103': {
    id: 103,
    emoji: ':dota_hero_elder_titan:448687608697192459',
    name: 'Elder Titan',
  },
  '104': {
    id: 104,
    emoji: ':dota_hero_legion_commander:448687613797203968',
    name: 'Legion Commander',
  },
  '105': {
    id: 105,
    emoji: ':dota_hero_techies:448687618646081546',
    name: 'Techies',
  },
  '106': {
    id: 106,
    emoji: ':dota_hero_ember_spirit:448687623523926016',
    name: 'Ember Spirit',
  },
  '107': {
    id: 107,
    emoji: ':dota_hero_earth_spirit:448687628343181319',
    name: 'Earth Spirit',
  },
  '108': {
    id: 108,
    emoji: ':dota_hero_abyssal_underlord:448687632977756162',
    name: 'Underlord',
  },
  '109': {
    id: 109,
    emoji: ':dota_hero_terrorblade:448687638015246336',
    name: 'Terrorblade',
  },
  '110': {
    id: 110,
    emoji: ':dota_hero_phoenix:448687642842890241',
    name: 'Phoenix',
  },
  '111': {
    id: 111,
    emoji: ':dota_hero_oracle:448687647406292995',
    name: 'Oracle',
  },
  '112': {
    id: 112,
    emoji: ':dota_hero_winter_wyvern:448687652594778123',
    name: 'Winter Wyvern',
  },
  '113': {
    id: 113,
    emoji: ':dota_hero_arc_warden:448687657430679564',
    name: 'Arc Warden',
  },
  '114': {
    id: 114,
    emoji: ':dota_hero_monkey_king:448687663076212736',
    name: 'Monkey King',
  },
  '119': {
    id: 119,
    emoji: ':dota_hero_dark_willow:448687667916570661',
    name: 'Dark Willow',
  },
  '120': {
    id: 120,
    emoji: ':dota_hero_pangolier:448687672702140416',
    name: 'Pangolier',
  },
  '121': {
    id: 121,
    emoji: ':dota_hero_grimstroke:483856677859229696',
    name: 'Grimstroke',
  },
  '123': {
    id: 123,
    emoji: ':dota_hero_hoodwink:811736100946837575',
    name: 'Hoodwink',
  },
  '126': {
    id: 126,
    emoji: ':dota_hero_void_spirit:661721109237989386',
    name: 'Void Spirit',
  },
  '128': {
    id: 128,
    emoji: ':dota_hero_snapfire:661721109263286272',
    name: 'Snapfire',
  },
  '129': {
    id: 129,
    emoji: ':dota_hero_mars:554558224519528454',
    name: 'Mars',
  },
  '135': {
    id: 135,
    emoji: ':dota_hero_dawnbreaker:834276260469276684',
    name: 'Dawnbreaker',
  },
  '136': {
    id: 136,
    name: 'Marci',
  },
}

export default HERO_MAP
