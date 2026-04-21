const POKEDEX_URL = 'https://pokedex-drab-psi-22.vercel.app'

export default function PokedexSection() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Pokédex</h2>
        <a
          href={POKEDEX_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          Open Full Screen ↗
        </a>
      </div>
      <iframe
        src={POKEDEX_URL}
        title="Pokédex"
        className="w-full rounded-lg border border-gray-200 flex-1"
        style={{ height: 'min(800px, 75vh)' }}
        loading="lazy"
      />
    </div>
  )
}
