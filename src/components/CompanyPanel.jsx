import React, { useEffect } from 'react'
import { CATEGORY_COLORS } from '../data/companies'

const STATUS_BADGE = {
  Active:         { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  Established:    { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    dot: 'bg-blue-500' },
  Acquired:       { bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200',     dot: 'bg-red-500' },
  Nonprofit:      { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-500' },
  'Regulatory Body': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200',   dot: 'bg-slate-500' },
}

function DetailRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex gap-3">
      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider w-24 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-gray-800 leading-snug">{value}</span>
    </div>
  )
}

export default function CompanyPanel({ company, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const isOpen = !!company

  if (!company) {
    return (
      <div
        className="fixed top-0 right-0 h-full w-[480px] bg-white shadow-2xl z-50 transition-transform duration-300 ease-out translate-x-full pointer-events-none"
        aria-hidden="true"
      />
    )
  }

  const badge = STATUS_BADGE[company.status] || STATUS_BADGE.Active
  const catColor = CATEGORY_COLORS[company.category] || '#6B7280'

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 h-full w-[480px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out translate-x-0"
        role="dialog"
        aria-modal="true"
      >
        {/* Header bar */}
        <div
          className="h-1.5 w-full shrink-0"
          style={{ backgroundColor: catColor }}
        />

        {/* Title row */}
        <div className="flex items-start justify-between gap-4 p-5 pb-3 border-b border-gray-100">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {company.jdsTop10 && (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  JDS Top 10
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                {company.status}
              </span>
            </div>
            <h2 className={`text-xl font-bold text-gray-900 leading-tight ${company.status === 'Acquired' ? 'line-through decoration-red-400' : ''}`}>
              {company.name}
            </h2>
            {company.description && (
              <p className="mt-1.5 text-xs text-gray-400 italic leading-relaxed line-clamp-3">{company.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close panel"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Category chips */}
          <div className="flex gap-2 flex-wrap">
            <span
              className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: catColor }}
            >
              {company.category}
            </span>
            {company.subCategory && (
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {company.subCategory}
              </span>
            )}
            {company.role && (
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {company.role}
              </span>
            )}
          </div>

          {/* Key details grid */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <DetailRow label="Stage" value={company.stage || company.tier} />
            <DetailRow label="Funding" value={company.funding} />
            <DetailRow label="Founded" value={company.founded} />
            <DetailRow label="HQ" value={company.hq} />
            {company.website && (
              <div className="flex gap-3">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider w-24 shrink-0 pt-0.5">Website</span>
                <a
                  href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline truncate"
                >
                  {company.website}
                </a>
              </div>
            )}
          </div>

          {/* Partners */}
          {company.partners && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Key Partners / Owners</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{company.partners}</p>
            </div>
          )}

          {/* Diligence notes */}
          {company.notes && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                JDS Diligence Notes
              </h3>
              <p className="text-sm text-amber-800 leading-relaxed">{company.notes}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
