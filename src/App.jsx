import React, { useState } from 'react'
import { COMPANIES, AUDIENCE_COLORS } from './data/companies'
import MarketMap from './components/MarketMap'
import PasswordGate, { isAuthenticated } from './components/PasswordGate'

export default function App() {
  const [authed, setAuthed] = useState(isAuthenticated)
  const [searchQuery, setSearchQuery] = useState('')

  if (!authed) {
    return <PasswordGate onAuthenticated={() => setAuthed(true)} />
  }

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#111827] text-white flex items-center justify-between px-5 h-16 shrink-0 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center text-white font-black text-sm">
              J
            </div>
            <span className="font-bold text-sm tracking-tight text-white">JDS Sports</span>
          </div>
          <div className="w-px h-6 bg-white/20" />
          <div>
            <h1 className="text-sm font-semibold leading-none">College Sports Startup Market Map</h1>
            <p className="text-[11px] text-gray-400 mt-0.5">JDS Sports · Internal Research · Jun 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search companies…"
              className="pl-8 pr-3 py-1.5 text-xs rounded-full w-44 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white placeholder-gray-400 border border-gray-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <span className="text-xs text-gray-400">
            <span className="text-white font-semibold">{COMPANIES.length}</span> companies
          </span>
        </div>
      </header>

      {/* Legend */}
      <div className="shrink-0 bg-[#1A2435] border-b border-gray-700/70 px-6 py-2.5 flex items-center gap-5 flex-wrap">
        <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Built for</span>

        {Object.entries(AUDIENCE_COLORS).map(([audience, color]) => (
          <div key={audience} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-[11px] text-gray-300">{audience}</span>
          </div>
        ))}

        <div className="w-px h-3.5 bg-gray-600 mx-0.5" />

        <div className="flex items-center gap-1.5">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] text-white font-medium"
            style={{
              backgroundColor: '#6B7280',
              borderRadius: '6px',
              border: '2px solid rgba(255,255,255,0.45)',
            }}
          >
            <span className="text-[9px]">●</span>
            Scale
          </span>
          <span className="text-[11px] text-gray-400">= Established Scale</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] text-white font-medium"
            style={{
              backgroundColor: '#6B7280',
              borderRadius: '6px',
              border: '1px solid rgba(0,0,0,0.12)',
            }}
          >
            Growth
          </span>
          <span className="text-[11px] text-gray-400">= Early Growth</span>
        </div>
      </div>

      {/* Market map */}
      <MarketMap
        companies={COMPANIES}
        searchQuery={searchQuery}
      />
    </div>
  )
}
