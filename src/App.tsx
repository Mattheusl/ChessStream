import { useCallback, useEffect, useState } from 'react'
import { StreamerCard } from './components/StreamerCard'
import { fetchStreamers } from './services/streamers'
import type { Streamer } from './types/streamer'
import './App.css'

const PAGE_SIZE = 6

function getPageNumbers(
  currentPage: number,
  totalPages: number,
): Array<number | 'ellipsis'> {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages: Array<number | 'ellipsis'> = [1]
  const firstVisiblePage = Math.max(2, currentPage - 1)
  const lastVisiblePage = Math.min(totalPages - 1, currentPage + 1)

  if (firstVisiblePage > 2) pages.push('ellipsis')

  for (let page = firstVisiblePage; page <= lastVisiblePage; page += 1) {
    pages.push(page)
  }

  if (lastVisiblePage < totalPages - 1) pages.push('ellipsis')
  pages.push(totalPages)

  return pages
}

function App() {
  const [streamers, setStreamers] = useState<Streamer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const loadStreamers = useCallback(async (signal?: AbortSignal) => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchStreamers(signal)
      setStreamers(data)
      setCurrentPage(1)
    } catch (requestError) {
      if (!signal?.aborted) {
        console.error('Unable to load streamers.', requestError)
        setError('We could not load the streamers. Please try again.')
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void loadStreamers(controller.signal)
    return () => controller.abort()
  }, [loadStreamers])

  const liveStreamersCount = streamers.filter(
    (streamer) => streamer.is_live,
  ).length
  const totalPages = Math.ceil(streamers.length / PAGE_SIZE)
  const visibleStreamers = streamers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )
  const pageNumbers = getPageNumbers(currentPage, totalPages)

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">CHESS STREAM / LIVE</p>
        <h1>Live chess, right now.</h1>
        <p className="page-intro">
          Find chess players streaming their games right now.
        </p>
        <div className="page-header__toolbar">
          <div className="streamer-count" aria-live="polite">
            <span className="count-dot" aria-hidden="true" />
            {loading
              ? 'Updating streamers...'
              : `${liveStreamersCount} streamer${liveStreamersCount === 1 ? '' : 's'} live`}
          </div>
          <button
            className="refresh-button"
            type="button"
            onClick={() => void loadStreamers()}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Refresh'}
          </button>
        </div>
      </header>

      {error && (
        <p className="streamer-feedback streamer-feedback--error" role="alert">
          {error}
        </p>
      )}

      {loading && streamers.length === 0 && (
        <p className="streamer-feedback" role="status">
          Loading streamers...
        </p>
      )}

      {!loading && !error && streamers.length === 0 && (
        <p className="streamer-feedback">
          No chess streamers are live right now.
        </p>
      )}

      <section className="streamer-list" aria-label="Live chess streamers">
        {visibleStreamers.map((streamer) => (
          <StreamerCard key={streamer.username} streamer={streamer} />
        ))}
      </section>

      {streamers.length > 0 && (
        <footer className="page-footer">
          <nav className="pagination" aria-label="Streamer list pages">
            <button
              className="pagination__button pagination__edge"
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              Previous
            </button>
            {pageNumbers.map((page, index) =>
              page === 'ellipsis' ? (
                <span
                  className="pagination__ellipsis"
                  key={`ellipsis-${index}`}
                  aria-hidden="true"
                >
                  ...
                </span>
              ) : (
                <button
                  className="pagination__button"
                  type="button"
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ),
            )}
            <button
              className="pagination__button pagination__edge"
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next
            </button>
          </nav>
        </footer>
      )}
    </main>
  )
}

export default App
