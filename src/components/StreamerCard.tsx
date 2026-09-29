import type { Streamer } from '../types/streamer'
import './StreamerCard.css'

interface StreamerCardProps {
  streamer: Streamer
}

function formatPlatformName(type: string) {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

export function StreamerCard({ streamer }: StreamerCardProps) {
  const featuredPlatform =
    streamer.platforms.find(
      (platform) => platform.is_live && platform.is_main_live_platform,
    ) ?? streamer.platforms.find((platform) => platform.is_live)
  const watchUrl = featuredPlatform?.stream_url ?? streamer.twitch_url

  return (
    <article className="streamer-card">
      <div className="streamer-card__identity">
        <img
          className="streamer-card__avatar"
          src={streamer.avatar}
          alt={`${streamer.username} avatar`}
          loading="lazy"
        />
        <div className="streamer-card__name-block">
          <h2>{streamer.username}</h2>
          {streamer.is_community_streamer && (
            <span className="streamer-card__community">Community streamer</span>
          )}
        </div>
        <span
          className={`streamer-card__status${streamer.is_live ? ' is-live' : ''}`}
        >
          <span className="streamer-card__status-dot" aria-hidden="true" />
          {streamer.is_live ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>

      <div className="streamer-card__platforms">
        <p>Platforms</p>
        <ul>
          {streamer.platforms.map((platform) => (
            <li
              className="platform-chip"
              key={`${platform.type}-${platform.channel_url}`}
            >
              <span>{formatPlatformName(platform.type)}</span>
              {platform.is_live && <span className="platform-chip__live">LIVE</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="streamer-card__actions">
        <a
          className="streamer-card__watch"
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {streamer.is_live ? 'Watch live' : 'Open channel'}
          <span aria-hidden="true">↗</span>
        </a>
        <a
          className="streamer-card__profile"
          href={streamer.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Chess.com profile
        </a>
      </div>
    </article>
  )
}