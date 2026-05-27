import React from 'react'
import { CATEGORIES, TIERS, CATEGORY_COLORS } from '../data/companies'

const TIER_PILL_COLORS = {
  bootstrapped: { active: 'bg-stone-700 text-white', inactive: 'bg-stone-100 text-stone-600 hover:bg-stone-200' },
  preseed:      { active: 'bg-green-700 text-white',  inactive: 'bg-green-50 text-green-700 hover:bg-green-100' },
  seed:         { active: 'bg-sky-700 text-white',    inactive: 'bg-sky-50 text-sky-700 hover:bg-sky-100' },
  earlygrowth:  { active: 'bg-orange-600 text-white', inactive: 'bg-orange-50 text-orange-700 hover:bg-orange-100' },
  established:  { active: 'bg-slate-700 text-white',  inactive: 'bg-slate-100 text-slate-600 hover:bg-slate-200' },
}

export default function FilterBar({
  activeTier,
  setActiveTier,
  activeCategories,
  setActiveCategories,
  searchQuery,
  setSearchQuery,
  showIncumbents,
  setShowIncumbents,
  filteredCount,
  totalCount,
  onExport,
}) {
  function toggleCategory(cat) {
    setActiveCategories(prev => {
      const next = new Set(prev)
      if (next.has(cat)) {
        if (next.size === 1) return prev // keep at least one
        next.delete(cat)
      } else {
        next.add(cat)
      }
      return next
    })
  }

  function toggleAllCategories() {
    if (activeCategories.size === CATEGORIES.length) {
      setActiveCategories(new Set([CATEGORIES[0]]))
    } else {
      setActiveCategories(new Set(CATEGORIES))
    }
  }

  return (
    <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
      {/* Row 1 — stage filter */}
      <div className="flex items-center gap-2 px-4 py-2.5 flex-wrap border-b border-gray-100">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">Stage</span>
        <button
          onClick={() => setActiveTier(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            activeTier === null
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {TIERS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTier(prev => prev === t.id ? null : t.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeTier === t.id
                ? TIER_PILL_COLORS[t.id].active
                : TIER_PILL_COLORS[t.id].inactive
            }`}
          >
            {t.label}{t.range ? ` (${t.range})` : ''}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-3">
          {/* Show Incumbents toggle */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <div
              onClick={() => setShowIncumbents(v => !v)}
              className={`relative w-9 h-5 rounded-full transition-colors ${showIncumbents ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${showIncumbents ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-xs text-gray-600">Show incumbents</span>
          </label>

          {/* Company count */}
          <span className="text-xs text-gray-500">
            <span className="font-semibold text-gray-900">{filteredCount}</span>
            <span className="mx-1">/</span>
            <span>{totalCount}</span>
            <span className="ml-1">companies</span>
          </span>
        </div>
      </div>

      {/* Row 2 — category filters + search */}
      <div className="flex items-center gap-2 px-4 py-2.5 flex-wrap">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">Category</span>
        <button
          onClick={toggleAllCategories}
          className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
            activeCategories.size === CATEGORIES.length
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {CATEGORIES.map(cat => {
          const isActive = activeCategories.has(cat)
          const color = CATEGORY_COLORS[cat]
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="px-2.5 py-1 rounded text-xs font-medium transition-all border"
              style={{
                backgroundColor: isActive ? color : '#F9FAFB',
                color: isActive ? '#fff' : '#6B7280',
                borderColor: isActive ? color : '#E5E7EB',
              }}
            >
              {cat}
            </button>
          )
        })}

        {/* Search */}
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search companies…"
              className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-full w-44 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Export button */}
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export PNG
          </button>
        </div>
      </div>
    </div>
  )
}
