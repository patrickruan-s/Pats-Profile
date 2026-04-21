import { useState } from 'react'
import Sidebar from './components/Sidebar'
import AboutSection from './components/AboutSection'
import ResumeSection from './components/ResumeSection'
import ArtGallery from './components/ArtGallery'
import MusicPlayer from './components/MusicPlayer'

const TABS = [
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'art', label: 'Art' },
  { id: 'music', label: 'Music' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('about')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Pat&apos;s Profile</h1>
          <p className="text-sm text-gray-500 mt-0.5">Developer · Artist · Musician</p>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Tab bar */}
          <nav className="bg-white border-b border-gray-200 px-8">
            <div className="flex gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'px-5 py-4 text-sm font-medium border-b-2 -mb-px transition-colors',
                    activeTab === tab.id
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  ].join(' ')}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Tab content */}
          <div className="flex-1 p-8 bg-white">
            {activeTab === 'about' && <AboutSection />}
            {activeTab === 'resume' && <ResumeSection />}
            {activeTab === 'art' && <ArtGallery />}
            {activeTab === 'music' && <MusicPlayer />}
          </div>
        </main>
      </div>
    </div>
  )
}
