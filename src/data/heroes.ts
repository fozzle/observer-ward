const HERO_MAP: Record<string, { id: number; emoji?: string; name: string }> = {
  '1': {
    id: 1,
    emoji: '<:dota_hero_antimage:1266159502307364995>',
    name: 'Anti-Mage',
  },
  '2': {
    id: 2,
    emoji: '<:dota_hero_axe:1266159524172271748>',
    name: 'Axe',
  },
  '3': {
    id: 3,
    emoji: '<:dota_hero_bane:1266159534800506971>',
    name: 'Bane',
  },
  '4': {
    id: 4,
    emoji: '<:dota_hero_bloodseeker:1266159565473317061>',
    name: 'Bloodseeker',
  },
  '5': {
    id: 5,
    emoji: '<:dota_hero_crystal_maiden:1266159683832385566>',
    name: 'Crystal Maiden',
  },
  '6': {
    id: 6,
    emoji: '<:dota_hero_drow_ranger:1266159812555702455>',
    name: 'Drow Ranger',
  },
  '7': {
    id: 7,
    emoji: '<:dota_hero_earthshaker:1266159847360036967>',
    name: 'Earthshaker',
  },
  '8': {
    id: 8,
    emoji: '<:dota_hero_juggernaut:1266160048200093856>',
    name: 'Juggernaut',
  },
  '9': {
    id: 9,
    emoji: '<:dota_hero_mirana:1266160319382818827>',
    name: 'Mirana',
  },
  '10': {
    id: 10,
    emoji: '<:dota_hero_morphling:1266160350441508956>',
    name: 'Morphling',
  },
  '11': {
    id: 11,
    emoji: '<:dota_hero_nevermore:1266160400882471016>',
    name: 'Shadow Fiend',
  },
  '12': {
    id: 12,
    emoji: '<:dota_hero_phantom_lancer:1266160621704188124>',
    name: 'Phantom Lancer',
  },
  '13': {
    id: 13,
    emoji: '<:dota_hero_puck:1266160651970150410>',
    name: 'Puck',
  },
  '14': {
    id: 14,
    emoji: '<:dota_hero_pudge:1266160673155711017>',
    name: 'Pudge',
  },
  '15': {
    id: 15,
    emoji: '<:dota_hero_razor:1266160748418044096>',
    name: 'Razor',
  },
  '16': {
    id: 16,
    emoji: '<:dota_hero_sand_king:1266160802964963449>',
    name: 'Sand King',
  },
  '17': {
    id: 17,
    emoji: '<:dota_hero_storm_spirit:1266161070054310084>',
    name: 'Storm Spirit',
  },
  '18': {
    id: 18,
    emoji: '<:dota_hero_sven:1266161093286559876>',
    name: 'Sven',
  },
  '19': {
    id: 19,
    emoji: '<:dota_hero_tiny:1266161225163739136>',
    name: 'Tiny',
  },
  '20': {
    id: 20,
    emoji: '<:dota_hero_vengefulspirit:1266161379455275018>',
    name: 'Vengeful Spirit',
  },
  '21': {
    id: 21,
    emoji: '<:dota_hero_windrunner:1266161475169292410>',
    name: 'Windranger',
  },
  '22': {
    id: 22,
    emoji: '<:dota_hero_zeus:1266159210505310330>',
    name: 'Zeus',
  },
  '23': {
    id: 23,
    emoji: '<:dota_hero_kunkka:1266160074687254722>',
    name: 'Kunkka',
  },
  '25': {
    id: 25,
    emoji: '<:dota_hero_lina:1266160178466787389>',
    name: 'Lina',
  },
  '26': {
    id: 26,
    emoji: '<:dota_hero_lion:1266160193205702729>',
    name: 'Lion',
  },
  '27': {
    id: 27,
    emoji: '<:dota_hero_shadow_shaman:1266160839719911536>',
    name: 'Shadow Shaman',
  },
  '28': {
    id: 28,
    emoji: '<:dota_hero_slardar:1266160948440469536>',
    name: 'Slardar',
  },
  '29': {
    id: 29,
    emoji: '<:dota_hero_tidehunter:1266161190699012096>',
    name: 'Tidehunter',
  },
  '30': {
    id: 30,
    emoji: '<:dota_hero_witch_doctor:1266161519515668492>',
    name: 'Witch Doctor',
  },
  '31': {
    id: 31,
    emoji: '<:dota_hero_lich:1266160118731505736>',
    name: 'Lich',
  },
  '32': {
    id: 32,
    emoji: '<:dota_hero_riki:1266160763496824904>',
    name: 'Riki',
  },
  '33': {
    id: 33,
    emoji: '<:dota_hero_enigma:1266159918193447033>',
    name: 'Enigma',
  },
  '34': {
    id: 34,
    emoji: '<:dota_hero_tinker:1266161207296131186>',
    name: 'Tinker',
  },
  '35': {
    id: 35,
    emoji: '<:dota_hero_sniper:1266161002404249714>',
    name: 'Sniper',
  },
  '36': {
    id: 36,
    emoji: '<:dota_hero_necrolyte:1266160383962386485>',
    name: 'Necrophos',
  },
  '37': {
    id: 37,
    emoji: '<:dota_hero_warlock:1266161446178394294>',
    name: 'Warlock',
  },
  '38': {
    id: 38,
    emoji: '<:dota_hero_beastmaster:1266159555088351275>',
    name: 'Beastmaster',
  },
  '39': {
    id: 39,
    emoji: '<:dota_hero_queenofpain:1266160713273970779>',
    name: 'Queen of Pain',
  },
  '40': {
    id: 40,
    emoji: '<:dota_hero_venomancer:1266161393196073003>',
    name: 'Venomancer',
  },
  '41': {
    id: 41,
    emoji: '<:dota_hero_faceless_void:1266159932894347295>',
    name: 'Faceless Void',
  },
  '42': {
    id: 42,
    emoji: '<:dota_hero_skeleton_king:1266160901648683080>',
    name: 'Wraith King',
  },
  '43': {
    id: 43,
    emoji: '<:dota_hero_death_prophet:1266159762194694205>',
    name: 'Death Prophet',
  },
  '44': {
    id: 44,
    emoji: '<:dota_hero_phantom_assassin:1266160603743911936>',
    name: 'Phantom Assassin',
  },
  '45': {
    id: 45,
    emoji: '<:dota_hero_pugna:1266160697100865596>',
    name: 'Pugna',
  },
  '46': {
    id: 46,
    emoji: '<:dota_hero_templar_assassin:1266161128963047484>',
    name: 'Templar Assassin',
  },
  '47': {
    id: 47,
    emoji: '<:dota_hero_viper:1266161405393109062>',
    name: 'Viper',
  },
  '48': {
    id: 48,
    emoji: '<:dota_hero_luna:1266160224746868867>',
    name: 'Luna',
  },
  '49': {
    id: 49,
    emoji: '<:dota_hero_dragon_knight:1266159799456759888>',
    name: 'Dragon Knight',
  },
  '50': {
    id: 50,
    emoji: '<:dota_hero_dazzle:1266159751021199380>',
    name: 'Dazzle',
  },
  '51': {
    id: 51,
    emoji: '<:dota_hero_rattletrap:1266160734572773489>',
    name: 'Clockwerk',
  },
  '52': {
    id: 52,
    emoji: '<:dota_hero_leshrac:1266160105641214073>',
    name: 'Leshrac',
  },
  '53': {
    id: 53,
    emoji: '<:dota_hero_furion:1266159945577926696>',
    name: "Nature's Prophet",
  },
  '54': {
    id: 54,
    emoji: '<:dota_hero_life_stealer:1266160134908809216>',
    name: 'Lifestealer',
  },
  '55': {
    id: 55,
    emoji: '<:dota_hero_dark_seer:1266159711296819321>',
    name: 'Dark Seer',
  },
  '56': {
    id: 56,
    emoji: '<:dota_hero_clinkz:1266159667806076999>',
    name: 'Clinkz',
  },
  '57': {
    id: 57,
    emoji: '<:dota_hero_omniknight:1266160481509445695>',
    name: 'Omniknight',
  },
  '58': {
    id: 58,
    emoji: '<:dota_hero_enchantress:1266159906168508476>',
    name: 'Enchantress',
  },
  '59': {
    id: 59,
    emoji: '<:dota_hero_huskar:1266160003052605450>',
    name: 'Huskar',
  },
  '60': {
    id: 60,
    emoji: '<:dota_hero_night_stalker:1266160417416286360>',
    name: 'Night Stalker',
  },
  '61': {
    id: 61,
    emoji: '<:dota_hero_broodmother:1266159612847984690>',
    name: 'Broodmother',
  },
  '62': {
    id: 62,
    emoji: '<:dota_hero_bounty_hunter:1266159577611898983>',
    name: 'Bounty Hunter',
  },
  '63': {
    id: 63,
    emoji: '<:dota_hero_weaver:1266161462166949980>',
    name: 'Weaver',
  },
  '64': {
    id: 64,
    emoji: '<:dota_hero_jakiro:1266160037387178114>',
    name: 'Jakiro',
  },
  '65': {
    id: 65,
    emoji: '<:dota_hero_batrider:1266159543771988132>',
    name: 'Batrider',
  },
  '66': {
    id: 66,
    emoji: '<:dota_hero_chen:1266159653545316462>',
    name: 'Chen',
  },
  '67': {
    id: 67,
    emoji: '<:dota_hero_spectre:1266161020968243251>',
    name: 'Spectre',
  },
  '68': {
    id: 68,
    emoji: '<:dota_hero_ancient_apparition:1266159492006019164>',
    name: 'Ancient Apparition',
  },
  '69': {
    id: 69,
    emoji: '<:dota_hero_doom_bringer:1266159788543180894>',
    name: 'Doom',
  },
  '70': {
    id: 70,
    emoji: '<:dota_hero_ursa:1266161366704848956>',
    name: 'Ursa',
  },
  '71': {
    id: 71,
    emoji: '<:dota_hero_spirit_breaker:1266161051855229082>',
    name: 'Spirit Breaker',
  },
  '72': {
    id: 72,
    emoji: '<:dota_hero_gyrocopter:1266159970592886845>',
    name: 'Gyrocopter',
  },
  '73': {
    id: 73,
    emoji: '<:dota_hero_alchemist:1266159482832949298>',
    name: 'Alchemist',
  },
  '74': {
    id: 74,
    emoji: '<:dota_hero_invoker:1266160023155904636>',
    name: 'Invoker',
  },
  '75': {
    id: 75,
    emoji: '<:dota_hero_silencer:1266160882904465509>',
    name: 'Silencer',
  },
  '76': {
    id: 76,
    emoji: '<:dota_hero_obsidian_destroyer:1266160448407998555>',
    name: 'Outworld Devourer',
  },
  '77': {
    id: 77,
    emoji: '<:dota_hero_lycan:1266160239066222694>',
    name: 'Lycan',
  },
  '78': {
    id: 78,
    emoji: '<:dota_hero_brewmaster:1266159586809872384>',
    name: 'Brewmaster',
  },
  '79': {
    id: 79,
    emoji: '<:dota_hero_shadow_demon:1266160822510682142>',
    name: 'Shadow Demon',
  },
  '80': {
    id: 80,
    emoji: '<:dota_hero_lone_druid:1266160203934728203>',
    name: 'Lone Druid',
  },
  '81': {
    id: 81,
    emoji: '<:dota_hero_chaos_knight:1266159637196181548>',
    name: 'Chaos Knight',
  },
  '82': {
    id: 82,
    emoji: '<:dota_hero_meepo:1266160307257217108>',
    name: 'Meepo',
  },
  '83': {
    id: 83,
    emoji: '<:dota_hero_treant:1266161239009005680>',
    name: 'Treant Protector',
  },
  '84': {
    id: 84,
    emoji: '<:dota_hero_ogre_magi:1266160466443636826>',
    name: 'Ogre Magi',
  },
  '85': {
    id: 85,
    emoji: '<:dota_hero_undying:1266161348845240441>',
    name: 'Undying',
  },
  '86': {
    id: 86,
    emoji: '<:dota_hero_rubick:1266160784858153011>',
    name: 'Rubick',
  },
  '87': {
    id: 87,
    emoji: '<:dota_hero_disruptor:1266159774085550230>',
    name: 'Disruptor',
  },
  '88': {
    id: 88,
    emoji: '<:dota_hero_nyx_assassin:1266160434004627590>',
    name: 'Nyx Assassin',
  },
  '89': {
    id: 89,
    emoji: '<:dota_hero_naga_siren:1266160367919431690>',
    name: 'Naga Siren',
  },
  '90': {
    id: 90,
    emoji: '<:dota_hero_keeper_of_the_light:1266160059348422666>',
    name: 'Keeper of the Light',
  },
  '91': {
    id: 91,
    emoji: '<:dota_hero_wisp:1266161507004055662>',
    name: 'Io',
  },
  '92': {
    id: 92,
    emoji: '<:dota_hero_visage:1266161418298986517>',
    name: 'Visage',
  },
  '93': {
    id: 93,
    emoji: '<:dota_hero_slark:1266160963879571538>',
    name: 'Slark',
  },
  '94': {
    id: 94,
    emoji: '<:dota_hero_medusa:1266160295492059247>',
    name: 'Medusa',
  },
  '95': {
    id: 95,
    emoji: '<:dota_hero_troll_warlord:1266161251554300017>',
    name: 'Troll Warlord',
  },
  '96': {
    id: 96,
    emoji: '<:dota_hero_centaur:1266159624114147349>',
    name: 'Centaur Warrunner',
  },
  '97': {
    id: 97,
    emoji: '<:dota_hero_magnataur:1266160255230939136>',
    name: 'Magnus',
  },
  '98': {
    id: 98,
    emoji: '<:dota_hero_shredder:1266160863967187068>',
    name: 'Timbersaw',
  },
  '99': {
    id: 99,
    emoji: '<:dota_hero_bristleback:1266159595097690175>',
    name: 'Bristleback',
  },
  '100': {
    id: 100,
    emoji: '<:dota_hero_tusk:1266161321351712799>',
    name: 'Tusk',
  },
  '101': {
    id: 101,
    emoji: '<:dota_hero_skywrath_mage:1266160915712315432>',
    name: 'Skywrath Mage',
  },
  '102': {
    id: 102,
    emoji: '<:dota_hero_abaddon:1266159459806347304>',
    name: 'Abaddon',
  },
  '103': {
    id: 103,
    emoji: '<:dota_hero_elder_titan:1266159879144607745>',
    name: 'Elder Titan',
  },
  '104': {
    id: 104,
    emoji: '<:dota_hero_legion_commander:1266160090302644266>',
    name: 'Legion Commander',
  },
  '105': {
    id: 105,
    emoji: '<:dota_hero_techies:1266161112571711520>',
    name: 'Techies',
  },
  '106': {
    id: 106,
    emoji: '<:dota_hero_ember_spirit:1266159891337187419>',
    name: 'Ember Spirit',
  },
  '107': {
    id: 107,
    emoji: '<:dota_hero_earth_spirit:1266159830540878035>',
    name: 'Earth Spirit',
  },
  '108': {
    id: 108,
    emoji: '<:dota_hero_abyssal_underlord:1266159471948992533>',
    name: 'Underlord',
  },
  '109': {
    id: 109,
    emoji: '<:dota_hero_terrorblade:1266161147485093929>',
    name: 'Terrorblade',
  },
  '110': {
    id: 110,
    emoji: '<:dota_hero_phoenix:1266160638015836243>',
    name: 'Phoenix',
  },
  '111': {
    id: 111,
    emoji: '<:dota_hero_oracle:1266160561968644199>',
    name: 'Oracle',
  },
  '112': {
    id: 112,
    emoji: '<:dota_hero_winter_wyvern:1266161489136455800>',
    name: 'Winter Wyvern',
  },
  '113': {
    id: 113,
    emoji: '<:dota_hero_arc_warden:1266159512931270706>',
    name: 'Arc Warden',
  },
  '114': {
    id: 114,
    emoji: '<:dota_hero_monkey_king:1266160338928140370>',
    name: 'Monkey King',
  },
  '119': {
    id: 119,
    emoji: '<:dota_hero_dark_willow:1266159725712506911>',
    name: 'Dark Willow',
  },
  '120': {
    id: 120,
    emoji: '<:dota_hero_pangolier:1266160588162207870>',
    name: 'Pangolier',
  },
  '121': {
    id: 121,
    emoji: '<:dota_hero_grimstroke:1266159958735454281>',
    name: 'Grimstroke',
  },
  '123': {
    id: 123,
    emoji: '<:dota_hero_hoodwink:1266159986317332552>',
    name: 'Hoodwink',
  },
  '126': {
    id: 126,
    emoji: '<:dota_hero_void_spirit:1266161432118952008>',
    name: 'Void Spirit',
  },
  '128': {
    id: 128,
    emoji: '<:dota_hero_snapfire:1266160980711182418>',
    name: 'Snapfire',
  },
  '129': {
    id: 129,
    emoji: '<:dota_hero_mars:1266160281059328131>',
    name: 'Mars',
  },
  '135': {
    id: 135,
    emoji: '<:dota_hero_dawnbreaker:1266159738601865247>',
    name: 'Dawnbreaker',
  },
  '136': {
    id: 136,
    emoji: '<:dota_hero_marci:1266161790031495249>',
    name: 'Marci',
  },
  '137': {
    id: 137,
    emoji: '<:dota_hero_primal_beast:1266161753318752447>',
    name: 'Primal Beast'
  },
  '138': {
    id: 138,
    emoji: '<:dota_hero_muerta:1266161643159556119>',
    name: 'Muerta'
  }
}

export default HERO_MAP
