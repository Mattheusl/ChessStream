import type { Streamer } from '../types/streamer'

interface StreamersResponse {
  streamers: Streamer[]
}

const STREAMERS_API_URL = 'https://api.chess.com/pub/streamers'

export async function fetchStreamers(
  signal?: AbortSignal,
): Promise<Streamer[]> {
  const response = await fetch(
    STREAMERS_API_URL,
    signal ? { signal } : undefined,
  )

  if (!response.ok) {
    throw new Error(`Chess.com responded with status ${response.status}.`)
  }

  const data: StreamersResponse = await response.json()
  return data.streamers
}