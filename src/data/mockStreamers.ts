import type { Streamer } from '../types/streamer'

export const mockStreamers: Streamer[] = [
  {
    username: 'ChessTV',
    avatar:
      'https://images.chesscomfiles.com/uploads/v1/user/12892566.fb3a2474.50x50o.8eedb8fc4b9b.png',
    twitch_url: 'https://twitch.tv/chess',
    url: 'https://www.chess.com/member/ChessTV',
    is_live: true,
    is_community_streamer: false,
    platforms: [
      {
        type: 'twitch',
        stream_url: 'https://twitch.tv/chess',
        channel_url: 'https://twitch.tv/chess',
        is_live: true,
        is_main_live_platform: true,
      },
    ],
  },
  {
    username: 'Witty_Alien',
    avatar:
      'https://images.chesscomfiles.com/uploads/v1/user/24250668.edaa550e.50x50o.adf21fb42a9e.png',
    twitch_url: 'https://twitch.tv/witty_alien',
    url: 'https://www.chess.com/member/Witty_Alien',
    is_live: true,
    is_community_streamer: false,
    platforms: [
      {
        type: 'twitch',
        stream_url: 'https://twitch.tv/witty_alien',
        channel_url: 'https://twitch.tv/witty_alien',
        is_live: true,
        is_main_live_platform: true,
      },
      {
        type: 'youtube',
        stream_url: 'https://www.youtube.com/watch?v=BifKWMOldrw',
        channel_url: 'https://youtube.com/@witty_alienclips',
        is_live: true,
        is_main_live_platform: false,
      },
    ],
  },
]