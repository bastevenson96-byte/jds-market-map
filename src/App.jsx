import React, { useState, useRef, useCallback, useMemo } from 'react'
import { COMPANIES, CATEGORIES } from './data/companies'
import FilterBar from './components/FilterBar'
import MarketMap from './components/MarketMap'
import CompanyPanel from './components/CompanyPanel'
import PasswordGate, { isAuthenticated } from './components/PasswordGate'

export default function App() {
  const [authed, setAuthed] = useState(isAuthenticated)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [activeTier, setActiveTier] = useState(null)
  const [activeCategories, setActiveCategories] = useState(new Set(CATEGORIES))
  const [searchQuery, setSearchQuery] = useState('')
  const [showIncumbents, setShowIncumbents] = useState(true)

  const mapRef = useRef(null)

  const filteredCount = useMemo(() => {
    return COMPANIES.filter(c => {
      if (!activeCategories.has(c.category)) return false
      if (!showIncumbents && (c.status === 'Established' || c.status === 'Acquired' || c.status === 'Regulatory Body')) return false
      if (activeTier !== null && c.tier !== activeTier) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
        )
      }
      return true
    }).length
  }, [activeCategories, showIncumbents, activeTier, searchQuery])

  const handleExport = useCallback(async () => {
    try {
      const { default: html2canvas } = await import('html2canvas')
      const el = mapRef.current
      if (!el) return

      // Temporarily expand scroll container to capture full grid
      const prevMaxH   = el.style.maxHeight
      const prevOverflow = el.style.overflow
      el.style.maxHeight = 'none'
      el.style.overflow = 'visible'

      const canvas = await html2canvas(el, {
        backgroundColor: '#F7F6F3',
        scale: 2,
        useCORS: true,
        logging: false,
      })

      el.style.maxHeight = prevMaxH
      el.style.overflow  = prevOverflow

      const link = document.createElement('a')
      link.download = `jds-market-map-${new Date().toISOString().slice(0, 10)}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
      alert('Export failed. Please try again.')
    }
  }, [])

  if (!authed) {
    return <PasswordGate onAuthenticated={() => setAuthed(true)} />
  }

  return (
    <div className="flex flex-col h-screen bg-[#F7F6F3]">
      {/* ── Sticky header ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#111827] text-white flex items-center justify-between px-5 h-16 shrink-0 shadow-lg">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center text-white font-black text-sm">
              J
            </div>
            <span className="font-bold text-sm tracking-tight text-white">JDS Sports</span>
          </div>

          <div className="w-px h-6 bg-white/20" />

          <div>
            <h1 className="text-sm font-semibold leading-none">College Sports Startup Market Map</h1>
            <p className="text-[11px] text-gray-400 mt-0.5">JDS Sports · Internal Research · May 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            <span className="text-white font-semibold">{COMPANIES.length}</span> companies tracked
          </span>
        </div>
      </header>

      {/* ── Filter bar ────────────────────────────────────────── */}
      <FilterBar
        activeTier={activeTier}
        setActiveTier={setActiveTier}
        activeCategories={activeCategories}
        setActiveCategories={setActiveCategories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showIncumbents={showIncumbents}
        setShowIncumbents={setShowIncumbents}
        filteredCount={filteredCount}
        totalCount={COMPANIES.length}
        onExport={handleExport}
      />

      {/* ── Market map grid ───────────────────────────────────── */}
      <MarketMap
        ref={mapRef}
        companies={COMPANIES}
        activeTier={activeTier}
        activeCategories={activeCategories}
        searchQuery={searchQuery}
        showIncumbents={showIncumbents}
        onSelectCompany={setSelectedCompany}
      />

      {/* ── Company detail panel ──────────────────────────────── */}
      <CompanyPanel
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />

      {/* ── Footer legend ─────────────────────────────────────── */}
      <footer className="shrink-0 bg-white border-t border-gray-200 px-5 py-2 flex items-center gap-6 overflow-x-auto">
        <span className="text-[11px] text-gray-400 font-medium shrink-0">Legend</span>
        {[
          { label: 'JDS Top 10', icon: '★', color: '#B45309' },
          { label: 'Active', color: '#059669' },
          { label: 'Established', color: '#2563EB' },
          { label: 'Acquired', color: '#DC2626', extra: 'line-through' },
          { label: 'Nonprofit', color: '#D97706' },
          { label: 'Regulatory Body', color: '#475569' },
        ].map(({ label, icon, color, extra }) => (
          <div key={label} className="flex items-center gap-1 shrink-0">
            {icon && <span style={{ color }} className="text-xs">{icon}</span>}
            <span className={`text-[11px] text-gray-600 ${extra || ''}`} style={extra ? { textDecorationColor: color } : undefined}>
              {label}
            </span>
            {!icon && (
              <span className="w-1.5 h-1.5 rounded-full ml-0.5" style={{ backgroundColor: color }} />
            )}
          </div>
        ))}
        <span className="ml-auto text-[11px] text-gray-400 shrink-0">
          Press <kbd className="px-1 py-0.5 text-[10px] bg-gray-100 border border-gray-200 rounded font-mono">Esc</kbd> to close panel
        </span>
      </footer>
    </div>
  )
}
