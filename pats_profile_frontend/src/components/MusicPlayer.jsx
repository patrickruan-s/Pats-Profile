import { useState, useEffect, useRef } from 'react'

export default function MusicPlayer() {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const audioRefs = useRef({})

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/tracks`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load tracks')
        return res.json()
      })
      .then((data) => {
        setTracks(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className="text-gray-500 text-center py-16">Loading tracks...</p>
  }

  if (error) {
    return <p className="text-red-500 text-center py-16">Error: {error}</p>
  }

  if (tracks.length === 0) {
    return (
      <p className="text-gray-400 text-center py-16">
        No tracks uploaded yet. Add MP3 or WAV files via the Rails backend.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="flex flex-col gap-3 p-5 rounded-xl border border-gray-200 bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <div>
            <p className="font-semibold text-gray-900">{track.title}</p>
            {track.artist && (
              <p className="text-sm text-gray-500">{track.artist}</p>
            )}
          </div>
          {track.audio_url ? (
            <audio
              controls
              src={track.audio_url}
              className="w-full"
              ref={(el) => { audioRefs.current[track.id] = el }}
              onPlay={() => {
                Object.entries(audioRefs.current).forEach(([id, el]) => {
                  if (el && String(id) !== String(track.id)) el.pause()
                })
              }}
            />
          ) : (
            <p className="text-sm text-gray-400">Audio file not available</p>
          )}
        </div>
      ))}
    </div>
  )
}
