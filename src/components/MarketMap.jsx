import React from 'react'
import { CATEGORIES, AUDIENCE_COLORS } from '../data/companies'

function CompanyChip({ company, isDimmed }) {
  const primaryAudience = company.builtFor[0]
  const bgColor = AUDIENCE_COLORS[primaryAudience] || '#6B7280'
  const isEstablished = company.stage === 'Established'
  const extraCount = company.builtFor.length - 1

  return (
    <a
      href={company.website}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white
        no-underline transition-all duration-150
        ${isDimmed ? 'opacity-20 pointer-events-none' : 'hover:opacity-85 hover:-translate-y-px active:translate-y-0'}
      `}
      style={{
        backgroundColor: bgColor,
        borderRadius: '8px',
        border: isEstablished
          ? '2px solid rgba(255,255,255,0.45)'
          : '1px solid rgba(0,0,0,0.12)',
        boxShadow: isEstablished ? '0 0 0 1px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.15)',
      }}
    >
      {isEstablished && (
        <span className="text-[10px] leading-none">●</span>
      )}
      <span>{company.name}</span>
      {extraCount > 0 && (
        <span
          className="text-[10px] font-semibold leading-none"
          style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '3px', padding: '1px 3px' }}
        >
          +{extraCount}
        </span>
      )}
    </a>
  )
}

export default function MarketMap({ companies, searchQuery }) {
  function matchesSearch(company) {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      company.name.toLowerCase().includes(q) ||
      company.category.toLowerCase().includes(q) ||
      company.builtFor.some(a => a.toLowerCase().includes(q))
    )
  }

  const CATEGORY_LABELS = {
    'Tech': 'Tech',
    'Media': 'Media',
    'Athlete Organization': 'Athlete\nOrg',
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5">
      <div className="space-y-0 divide-y divide-gray-700/60">
        {CATEGORIES.map(category => {
          const categoryCompanies = companies.filter(c => c.category === category)
          const visibleCount = categoryCompanies.filter(c => matchesSearch(c)).length

          return (
            <div key={category} className="flex gap-5 py-4">
              {/* Category label */}
              <div className="w-32 shrink-0 flex flex-col pt-0.5">
                <span className="text-[11px] font-bold text-white uppercase tracking-widest leading-tight whitespace-pre-line">
                  {CATEGORY_LABELS[category] || category}
                </span>
                <span className="text-[11px] text-gray-500 mt-1.5 tabular-nums">
                  {visibleCount}/{categoryCompanies.length}
                </span>
              </div>

              {/* Chips */}
              <div className="flex-1 flex flex-wrap gap-1.5 items-start">
                {categoryCompanies.map(company => (
                  <CompanyChip
                    key={company.name}
                    company={company}
                    isDimmed={!matchesSearch(company)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
