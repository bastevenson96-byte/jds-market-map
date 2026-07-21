import React, { useState, useEffect, useRef, useCallback } from 'react'
import { CATEGORIES, CATEGORIES_V2, AUDIENCE_COLORS, notionUrl } from '../data/companies'

const AUDIENCES = ['Athlete', 'Institution', 'Brand', 'Consumer']
const STAGES = ['Early Growth', 'Established Scale']

const AUDIENCE_TOOLTIPS = {
  Athlete: 'Built with the athlete as the primary end user — tools for earning, competing, developing, and building a career',
  Institution: 'Built for athletic departments, universities, and conference offices managing the new commercial landscape',
  Brand: 'Built for brands and sponsors looking to access and activate college athlete audiences',
  Consumer: 'Built for fans engaging with college sports content, commerce, and experiences',
}

const FILTER_TOOLTIP_MAX_WIDTH = 260

const CATEGORY_STYLE = {
  'Tech': { color: '#FFFFFF', label: 'Tech' },
  'Media': { color: '#FFFFFF', label: 'Media' },
  'Athlete Organization': { color: '#FFFFFF', label: 'Athlete\nOrganization' },
}

const CATEGORY_STYLE_V2 = {
  'Athlete Infrastructure': { color: '#FFFFFF', label: 'Athlete Infrastructure' },
  'Fan Culture and IP': { color: '#FFFFFF', label: 'Fan Culture & IP' },
  'Access Development and Participation': { color: '#FFFFFF', label: 'Access, Development & Participation' },
}

const CATEGORY_SUBTITLE_V2 = {
  'Athlete Infrastructure': 'How athletes actually succeed in this new environment',
  'Fan Culture and IP': 'How fans connect to the athletes and moments that matter to them',
  'Access Development and Participation': 'How the broader ecosystem grows in ways that are durable',
}

const COLUMN_WIDTHS = {
  v1: '56% 25% 19%',
  v2: '37% 34% 29%',
}

const TOOLTIP_MAX_WIDTH = 280
const TOOLTIP_VIEWPORT_MARGIN = 12

function CompanyChip({ company, isDimmed, onClick }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipShift, setTooltipShift] = useState(0)
  const wrapperRef = useRef(null)
  const primaryAudience = company.builtFor[0]
  const bgColor = AUDIENCE_COLORS[primaryAudience] || '#6B7280'
  const isEstablished = company.stage === 'Established'
  const hasMultipleAudiences = company.builtFor.length > 1

  function handleMouseEnter() {
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (rect) {
      const center = rect.left + rect.width / 2
      const halfWidth = TOOLTIP_MAX_WIDTH / 2
      let shift = 0
      const overflowLeft = TOOLTIP_VIEWPORT_MARGIN - (center - halfWidth)
      if (overflowLeft > 0) shift = overflowLeft
      const overflowRight = (center + halfWidth) - (window.innerWidth - TOOLTIP_VIEWPORT_MARGIN)
      if (overflowRight > 0) shift = -overflowRight
      setTooltipShift(shift)
    }
    setShowTooltip(true)
  }

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && company.description && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: `translateX(calc(-50% + ${tooltipShift}px))`,
            maxWidth: `${TOOLTIP_MAX_WIDTH}px`,
            width: 'max-content',
            backgroundColor: '#111827',
            color: 'white',
            fontSize: '11px',
            fontWeight: '400',
            lineHeight: 1.5,
            padding: '8px 10px',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.1)',
            zIndex: 60,
            pointerEvents: 'none',
            opacity: showTooltip ? 1 : 0,
            transition: 'opacity 0.15s ease',
            whiteSpace: 'normal',
          }}
        >
          {company.description}
        </div>
      )}
      <button
        onClick={() => !isDimmed && onClick(company)}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: hasMultipleAudiences ? '4px 10px 10px 10px' : '4px 10px',
          fontSize: '12px',
          fontWeight: isEstablished ? '700' : '500',
          color: 'white',
          backgroundColor: bgColor,
          borderRadius: '8px',
          border: isEstablished
            ? '2px solid rgba(255,255,255,0.55)'
            : '1px solid rgba(0,0,0,0.15)',
          boxShadow: isEstablished
            ? '0 0 0 1px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.2)'
            : '0 1px 2px rgba(0,0,0,0.15)',
          cursor: isDimmed ? 'default' : 'pointer',
          opacity: isDimmed ? 0.15 : 1,
          transition: 'opacity 0.2s ease, transform 0.1s ease',
          outline: 'none',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { if (!isDimmed) e.currentTarget.style.opacity = '0.85' }}
        onMouseLeave={e => { if (!isDimmed) e.currentTarget.style.opacity = '1' }}
      >
        {isEstablished && (
          <span style={{ fontSize: '10px', lineHeight: 1, marginRight: '1px' }}>★</span>
        )}
        <span>{company.name}</span>
        {hasMultipleAudiences && (
          <span
            style={{
              position: 'absolute',
              bottom: '3px',
              right: '6px',
              display: 'flex',
              gap: '2px',
            }}
          >
            {company.builtFor.map(audience => (
              <span
                key={audience}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '9999px',
                  backgroundColor: AUDIENCE_COLORS[audience] || '#6B7280',
                  border: '1px solid rgba(255,255,255,0.55)',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
            ))}
          </span>
        )}
      </button>
    </div>
  )
}

function AudienceButton({ audience, active, onClick }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: `${FILTER_TOOLTIP_MAX_WIDTH}px`,
            width: 'max-content',
            backgroundColor: '#111827',
            color: 'white',
            fontSize: '11px',
            fontWeight: '400',
            lineHeight: 1.5,
            padding: '8px 10px',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.1)',
            zIndex: 60,
            pointerEvents: 'none',
            opacity: showTooltip ? 1 : 0,
            transition: 'opacity 0.15s ease',
            whiteSpace: 'normal',
          }}
        >
          {AUDIENCE_TOOLTIPS[audience]}
        </div>
      )}
      <button
        onClick={onClick}
        style={{
          borderRadius: '9999px',
          padding: '5px 14px',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer',
          border: `1.5px solid ${active ? AUDIENCE_COLORS[audience] : '#374151'}`,
          backgroundColor: active ? AUDIENCE_COLORS[audience] : 'transparent',
          color: active ? 'white' : '#6B7280',
          transition: 'all 0.15s ease',
          outline: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '9999px',
            backgroundColor: AUDIENCE_COLORS[audience],
            display: 'inline-block',
            flexShrink: 0,
            border: active ? '1px solid rgba(255,255,255,0.6)' : 'none',
          }}
        />
        {audience}
      </button>
    </div>
  )
}

function SidePanel({ company, framework, onClose }) {
  const isOpen = !!company

  useEffect(() => {
    if (!isOpen) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const primaryColor = company ? (AUDIENCE_COLORS[company.builtFor[0]] || '#6B7280') : '#6B7280'
  const isEstablished = company?.stage === 'Established'
  const categoryLabel = company
    ? (framework === 'v2'
        ? (CATEGORY_STYLE_V2[company.categoryV2]?.label || company.categoryV2).replace('\n', ' ')
        : company.category)
    : ''

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
          zIndex: 40,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      />

      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: '380px',
          backgroundColor: '#1F2937',
          borderLeft: '1px solid #374151',
          zIndex: 50,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.25s ease',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {company && (
          <>
            {/* Color accent bar */}
            <div style={{ height: '4px', backgroundColor: primaryColor, flexShrink: 0 }} />

            <div style={{ padding: '20px 24px 32px', flex: 1 }}>
              {/* Close button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                <button
                  onClick={onClose}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9CA3AF',
                    padding: '4px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F9FAFB'}
                  onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Company name */}
              <h2 style={{ color: 'white', fontSize: '22px', fontWeight: '800', lineHeight: 1.2, margin: '0 0 8px 0' }}>
                {company.name}
              </h2>

              {/* Description */}
              {company.description && (
                <p style={{ color: '#9CA3AF', fontSize: '13px', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                  {company.description}
                </p>
              )}

              {/* Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                <span
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: '9999px',
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'white',
                  }}
                >
                  {categoryLabel}
                </span>
                <span
                  style={{
                    border: isEstablished ? '2px solid rgba(255,255,255,0.5)' : '1px solid #4B5563',
                    borderRadius: '9999px',
                    padding: isEstablished ? '3px 12px' : '4px 12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'white',
                    backgroundColor: 'transparent',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  {isEstablished && <span style={{ fontSize: '9px' }}>●</span>}
                  {isEstablished ? 'Established Scale' : 'Early Growth'}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: '#374151', marginBottom: '20px' }} />

              {/* Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <DetailRow label="Built For" value={company.builtFor.join(', ')} />
                {company.founded && <DetailRow label="Founded" value={company.founded} />}
                {company.funding && <DetailRow label="Funding" value={company.funding} />}
                {company.website && (
                  <div>
                    <div style={{ color: '#6B7280', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                      Website
                    </div>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#818CF8',
                        fontSize: '13px',
                        textDecoration: 'none',
                        wordBreak: 'break-all',
                        lineHeight: 1.5,
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#A5B4FC'}
                      onMouseLeave={e => e.currentTarget.style.color = '#818CF8'}
                    >
                      {company.website}
                    </a>
                  </div>
                )}
              </div>

              {/* Notion button */}
              {company.notionId && (
                <a
                  href={notionUrl(company.notionId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '28px',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    backgroundColor: '#374151',
                    border: '1px solid #4B5563',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#4B5563'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#374151'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Open in Notion
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

function DetailRow({ label, value }) {
  return (
    <div>
      <div style={{ color: '#6B7280', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
        {label}
      </div>
      <div style={{ color: '#D1D5DB', fontSize: '13px', lineHeight: 1.6 }}>
        {value}
      </div>
    </div>
  )
}

export default function MarketMap({
  companies,
  framework = 'v1',
  audienceFilters,
  setAudienceFilters,
  stageFilters,
  setStageFilters,
}) {
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const controlsRef = useRef(null)
  const [controlsH, setControlsH] = useState(92)

  useEffect(() => {
    const el = controlsRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      setControlsH(entries[0].contentRect.height)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  function toggleAudience(audience) {
    setAudienceFilters(prev => {
      const next = new Set(prev)
      if (next.has(audience)) next.delete(audience)
      else next.add(audience)
      return next
    })
  }

  function toggleStage(stage) {
    setStageFilters(prev => {
      const next = new Set(prev)
      if (next.has(stage)) next.delete(stage)
      else next.add(stage)
      return next
    })
  }

  function matchesFilters(company) {
    const anyAudienceActive = audienceFilters.size > 0
    const anyStageActive = stageFilters.size > 0
    const query = searchQuery.trim().toLowerCase()
    const anyQueryActive = query.length > 0

    const stageKey = company.stage === 'Established' ? 'Established Scale' : 'Early Growth'
    const matchesAudience = !anyAudienceActive || company.builtFor.some(a => audienceFilters.has(a))
    const matchesStage = !anyStageActive || stageFilters.has(stageKey)
    const matchesQuery = !anyQueryActive || company.name.toLowerCase().includes(query)

    return matchesAudience && matchesStage && matchesQuery
  }

  const HEADER_H = 64
  const colHeaderTop = HEADER_H + controlsH

  return (
    <>
      {/* Filter bar + Legend */}
      <div
        ref={controlsRef}
        style={{
          position: 'sticky',
          top: HEADER_H,
          zIndex: 40,
          backgroundColor: '#111827',
          borderBottom: '1px solid #374151',
        }}
      >
        {/* Filters row */}
        <div style={{ padding: '10px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '4px' }}>
            Built For
          </span>
          {AUDIENCES.map(a => (
            <AudienceButton
              key={a}
              audience={a}
              active={audienceFilters.has(a)}
              onClick={() => toggleAudience(a)}
            />
          ))}

          <div style={{ width: '1px', height: '20px', backgroundColor: '#374151', margin: '0 4px' }} />

          <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '4px' }}>
            Stage
          </span>
          {STAGES.map(s => {
            const active = stageFilters.has(s)
            return (
              <button
                key={s}
                onClick={() => toggleStage(s)}
                style={{
                  borderRadius: '9999px',
                  padding: '5px 14px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  border: `1.5px solid ${active ? '#E5E7EB' : '#374151'}`,
                  backgroundColor: active ? '#4B5563' : 'transparent',
                  color: active ? 'white' : '#6B7280',
                  transition: 'all 0.15s ease',
                  outline: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                {s === 'Established Scale' ? 'Established Scale (★)' : s}
              </button>
            )
          })}

          <div style={{ width: '1px', height: '20px', backgroundColor: '#374151', margin: '0 4px' }} />

          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search companies…"
              style={{
                backgroundColor: '#1F2937',
                border: '1.5px solid #374151',
                borderRadius: '9999px',
                padding: '5px 28px 5px 14px',
                fontSize: '12px',
                fontWeight: '500',
                color: 'white',
                outline: 'none',
                width: '180px',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#6366F1' }}
              onBlur={e => { e.currentTarget.style.borderColor = '#374151' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '8px',
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: 'pointer',
                  fontSize: '15px',
                  lineHeight: 1,
                  padding: 0,
                  outline: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F9FAFB' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF' }}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Shared per-column data, computed once so the header row and chip grid stay in sync */}
      {(() => {
        const categoryList = framework === 'v2' ? CATEGORIES_V2 : CATEGORIES
        const columnWidths = COLUMN_WIDTHS[framework].split(' ')
        const columns = categoryList.map((category, idx) => {
          const catCompanies = (framework === 'v2'
            ? companies.filter(c => c.categoryV2 === category)
            : companies.filter(c => c.category === category)
          ).slice().sort((a, b) => AUDIENCES.indexOf(a.builtFor[0]) - AUDIENCES.indexOf(b.builtFor[0]))
          return {
            category,
            catCompanies,
            style: framework === 'v2' ? CATEGORY_STYLE_V2[category] : CATEGORY_STYLE[category],
            isLast: idx === categoryList.length - 1,
            visibleCount: catCompanies.filter(matchesFilters).length,
            width: columnWidths[idx],
          }
        })

        return (
          <>
            {/* Column headers (sticky row, stretched to equal height so dividers line up) */}
            <div
              style={{
                position: 'sticky',
                top: colHeaderTop,
                zIndex: 30,
                display: 'flex',
                alignItems: 'stretch',
                backgroundColor: '#111827',
              }}
            >
              {columns.map(col => (
                <div
                  key={col.category}
                  style={{
                    flex: `0 0 ${col.width}`,
                    width: col.width,
                    borderRight: col.isLast ? 'none' : '1px solid #374151',
                    borderBottom: '1px solid #374151',
                    padding: '10px 16px',
                  }}
                >
                  <h2
                    style={{
                      color: col.style.color,
                      fontSize: '15px',
                      fontWeight: '800',
                      lineHeight: 1.25,
                      margin: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {col.style.label}
                  </h2>
                  {framework === 'v2' && (
                    <p
                      style={{
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: '12px',
                        fontStyle: 'italic',
                        lineHeight: 1.35,
                        margin: '3px 0 0 0',
                      }}
                    >
                      {CATEGORY_SUBTITLE_V2[col.category]}
                    </p>
                  )}
                  <p style={{ color: '#6B7280', fontSize: '11px', margin: '2px 0 0 0' }}>
                    {col.visibleCount} companies
                  </p>
                </div>
              ))}
            </div>

            {/* Three-column chip grid */}
            <div style={{ display: 'grid', gridTemplateColumns: COLUMN_WIDTHS[framework], minHeight: 'calc(100vh - 64px)' }}>
              {columns.map(col => (
                <div
                  key={col.category}
                  style={{
                    borderRight: col.isLast ? 'none' : '1px solid #374151',
                  }}
                >
                  <div
                    style={{
                      padding: '12px 14px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      alignContent: 'flex-start',
                    }}
                  >
                    {col.catCompanies.map((company, i) => (
                      <React.Fragment key={company.name}>
                        {i > 0 && company.builtFor[0] !== col.catCompanies[i - 1].builtFor[0] && (
                          <div style={{ flexBasis: '100%', height: 0 }} />
                        )}
                        <CompanyChip
                          company={company}
                          isDimmed={!matchesFilters(company)}
                          onClick={setSelectedCompany}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      })()}

      <SidePanel company={selectedCompany} framework={framework} onClose={() => setSelectedCompany(null)} />
    </>
  )
}
