import React, { forwardRef } from 'react'
import { CATEGORIES, TIERS, CATEGORY_COLORS, TIER_STYLES } from '../data/companies'

function matchesSearch(company, query) {
  if (!query) return true
  const q = query.toLowerCase()
  return (
    company.name.toLowerCase().includes(q) ||
    company.description.toLowerCase().includes(q) ||
    company.category.toLowerCase().includes(q) ||
    (company.subCategory || '').toLowerCase().includes(q) ||
    (company.role || '').toLowerCase().includes(q)
  )
}

function CompanyChip({ company, isActive, isDimmed, onClick }) {
  const catColor = CATEGORY_COLORS[company.category] || '#6B7280'
  const isAcquired = company.status === 'Acquired'

  return (
    <button
      onClick={() => onClick(company)}
      className={`
        group relative inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
        border transition-all duration-150 cursor-pointer text-left
        ${isDimmed
          ? 'opacity-25 pointer-events-none'
          : 'hover:shadow-md hover:-translate-y-px active:translate-y-0'
        }
        ${company.jdsTop10
          ? 'ring-2 font-bold shadow-sm'
          : 'shadow-[0_1px_2px_rgba(0,0,0,0.08)]'
        }
        ${company.status === 'Established' || company.status === 'Regulatory Body'
          ? 'bg-slate-50 border-slate-200 text-slate-600'
          : 'bg-white border-gray-200 text-gray-800'
        }
      `}
      style={company.jdsTop10 ? { borderColor: catColor, boxShadow: `0 0 0 2px ${catColor}` } : undefined}
      title={company.name}
    >
      {company.jdsTop10 && (
        <svg
          className="w-2.5 h-2.5 shrink-0"
          viewBox="0 0 20 20"
          fill={catColor}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      <span className={isAcquired ? 'line-through decoration-red-400' : ''}>{company.name}</span>
      {isAcquired && (
        <span className="ml-0.5 text-[10px] text-red-500 font-medium no-underline">ACQ</span>
      )}
    </button>
  )
}

function GridCell({ companies, activeTier, searchQuery, onSelectCompany }) {
  if (companies.length === 0) return (
    <div className="p-2 min-h-[64px]" />
  )

  return (
    <div className="p-2 flex flex-wrap gap-1.5 content-start min-h-[64px]">
      {companies.map(c => {
        const dimByTier   = activeTier !== null && c.tier !== activeTier
        const dimBySearch = searchQuery !== '' && !matchesSearch(c, searchQuery)
        const isDimmed    = dimByTier || dimBySearch
        return (
          <CompanyChip
            key={c.id}
            company={c}
            isDimmed={isDimmed}
            onClick={onSelectCompany}
          />
        )
      })}
    </div>
  )
}

const MarketMap = forwardRef(function MarketMap(
  { companies, activeTier, activeCategories, searchQuery, showIncumbents, onSelectCompany },
  ref
) {
  const visibleCategories = CATEGORIES.filter(c => activeCategories.has(c))

  function getCell(cat, tierId) {
    return companies.filter(c => {
      if (c.category !== cat) return false
      if (c.tier !== tierId) return false
      if (!showIncumbents && (c.status === 'Established' || c.status === 'Acquired' || c.status === 'Regulatory Body')) return false
      return true
    })
  }

  const colCount = visibleCategories.length

  return (
    <div ref={ref} className="overflow-x-auto overflow-y-auto flex-1 min-h-0">
      <div
        className="min-w-max"
        style={{
          display: 'grid',
          gridTemplateColumns: `140px repeat(${colCount}, minmax(196px, 1fr))`,
        }}
      >
        {/* ── Header row ──────────────────────────────────────────── */}
        {/* Corner cell */}
        <div
          className="sticky top-0 left-0 z-30 bg-gray-900 border-b border-r border-gray-700"
          style={{ minHeight: 52 }}
        />
        {visibleCategories.map((cat, i) => {
          const color = CATEGORY_COLORS[cat]
          const count = companies.filter(c =>
            c.category === cat &&
            (showIncumbents || (c.status !== 'Established' && c.status !== 'Acquired' && c.status !== 'Regulatory Body'))
          ).length
          return (
            <div
              key={cat}
              className="sticky top-0 z-20 flex flex-col justify-between px-3 py-2 border-b border-r border-white/20"
              style={{
                backgroundColor: color,
                minHeight: 52,
                borderRightColor: i === visibleCategories.length - 1 ? 'transparent' : 'rgba(255,255,255,0.15)',
              }}
            >
              <span className="text-white text-xs font-semibold leading-tight">{cat}</span>
              <span className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-white text-[10px] font-bold self-start">
                {count}
              </span>
            </div>
          )
        })}

        {/* ── Tier rows ───────────────────────────────────────────── */}
        {TIERS.map(tier => {
          const ts = TIER_STYLES[tier.id]
          const isTierActive = activeTier === tier.id
          return (
            <React.Fragment key={tier.id}>
              {/* Tier label */}
              <div
                className={`sticky left-0 z-10 flex flex-col justify-center px-3 py-3 border-b border-r border-gray-200 transition-colors`}
                style={{
                  backgroundColor: isTierActive ? ts.border : ts.bg,
                  borderRightColor: ts.border,
                  minHeight: 80,
                }}
              >
                <span className="text-xs font-bold text-gray-800 leading-snug">{tier.label}</span>
                {tier.range && (
                  <span className="text-[10px] text-gray-500 mt-0.5">{tier.range}</span>
                )}
              </div>

              {/* Category cells */}
              {visibleCategories.map((cat, i) => {
                const cellCompanies = getCell(cat, tier.id)
                return (
                  <div
                    key={cat}
                    className="border-b border-r"
                    style={{
                      backgroundColor: ts.bg,
                      borderColor: ts.border,
                      borderRightColor: i === visibleCategories.length - 1 ? ts.border : ts.border,
                    }}
                  >
                    <GridCell
                      companies={cellCompanies}
                      activeTier={activeTier}
                      searchQuery={searchQuery}
                      onSelectCompany={onSelectCompany}
                    />
                  </div>
                )
              })}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
})

export default MarketMap
