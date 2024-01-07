export interface DotaPlayer {
  account_id: number
  player_slot: number
  team_number: number
  team_slot: number
  hero_id: number
  name?: string
  personaname?: string
  kills: number
  deaths: number
  assists: number
  // TODO: more but I dont care.
}

export interface DotaMatch {
  barracks_status_dire: number
  barracks_status_radiant: number
  cluster: number
  dire_score: number
  // seconds
  duration: number
  engine: number
  first_blood_time: number
  flags: number
  game_mode: number
  human_players: number
  leagueid: number
  lobby_type: number
  match_id: number
  match_seq_num: number
  players: DotaPlayer[]
  pre_game_duration: number
  radiant_score: number
  radiant_win: boolean
  // seconds
  start_time: number
  tower_status_dire: number
  tower_status_radiant: number
}
