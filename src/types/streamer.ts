export interface Platform {
  type: string
  stream_url: string
  channel_url: string
  is_live: boolean
  is_main_live_platform: boolean
}

export interface Streamer {
  username: string
  avatar: string
  twitch_url: string
  url: string
  is_live: boolean
  is_community_streamer: boolean
  platforms: Platform[]
}