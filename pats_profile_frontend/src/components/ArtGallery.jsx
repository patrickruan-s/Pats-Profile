import { useState, useEffect } from 'react'

export default function ArtGallery() {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/artworks`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load artworks')
        return res.json()
      })
      .then((data) => {
        setArtworks(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className="text-gray-500 text-center py-16">Loading artwork...</p>
  }

  if (error) {
    return <p className="text-red-500 text-center py-16">Error: {error}</p>
  }

  if (artworks.length === 0) {
    return (
      <p className="text-gray-400 text-center py-16">
        No artwork uploaded yet. Drop PNG files into the backend and seed the database.
      </p>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {artworks.map((artwork) => (
          <button
            key={artwork.id}
            onClick={() => setSelected(artwork)}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 aspect-square hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {artwork.image_url ? (
              <img
                src={artwork.image_url}
                alt={artwork.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                No image
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-sm font-medium truncate">{artwork.title}</p>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
            {selected.image_url && (
              <img
                src={selected.image_url}
                alt={selected.title}
                className="w-full object-contain max-h-[80vh]"
              />
            )}
            <div className="p-4 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900">{selected.title}</h3>
              {selected.description && (
                <p className="text-gray-500 text-sm mt-1">{selected.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
