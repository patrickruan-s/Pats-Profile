const links = [
  {
    label: 'GitHub',
    url: 'https://github.com/patrickruan-s',
    domain: 'github.com',
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/patrickruan',
    domain: 'linkedin.com',
  },
    {
    label: 'Spotify',
    url: 'https://open.spotify.com/artist/2ZnwaAXoFmbgF43o5JgxnL?si=YUHm4-DgSMCbJr5ceFYFyQ',
    domain: 'spotify.com',
  },
]

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 sticky top-0 h-screen flex flex-col gap-2 p-6 border-r border-gray-200 bg-white">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Links</p>
      {links.map((link) => (
        <a
          key={link.domain}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium"
        >
          <img
            src={`https://www.google.com/s2/favicons?domain=${link.domain}&sz=32`}
            alt={link.label}
            width={20}
            height={20}
            className="rounded"
          />
          {link.label}
        </a>
      ))}
    </aside>
  )
}
