import React, { useState } from 'react'
import { COMPANIES } from './data/companies'
import MarketMap from './components/MarketMap'
import PasswordGate, { isAuthenticated } from './components/PasswordGate'

export default function App() {
  const [authed, setAuthed] = useState(isAuthenticated)
  const [framework, setFramework] = useState('v2')

  if (!authed) {
    return <PasswordGate onAuthenticated={() => setAuthed(true)} />
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          height: '64px',
          backgroundColor: '#111827',
          borderBottom: '1px solid #1F2937',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <circle cx="20" cy="20" r="19" fill="#111" stroke="white" strokeWidth="2" />
            <text x="20" y="25" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" letterSpacing="1">JDS</text>
          </svg>
          <span style={{ color: 'white', fontWeight: '700', fontSize: '14px', letterSpacing: '-0.01em' }}>
            JDS Sports
          </span>
        </div>

        <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.15)' }} />

        <div>
          <h1 style={{ color: 'white', fontSize: '13px', fontWeight: '600', margin: 0, lineHeight: 1 }}>
            College Sports Market Map
          </h1>
          <p style={{ color: '#6B7280', fontSize: '11px', margin: '3px 0 0 0' }}>
            JDS Sports · Internal Research · Jul 2026
          </p>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '9999px',
              padding: '2px',
              gap: '2px',
            }}
          >
            {[
              { key: 'v2', label: 'Framework 1' },
              { key: 'v1', label: 'Framework 2' },
            ].map(({ key, label }) => {
              const active = framework === key
              return (
                <button
                  key={key}
                  onClick={() => setFramework(key)}
                  style={{
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '5px 14px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    backgroundColor: active ? '#6366F1' : 'transparent',
                    color: active ? 'white' : '#9CA3AF',
                    transition: 'all 0.15s ease',
                    outline: 'none',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <div style={{ fontSize: '12px', color: '#6B7280' }}>
            <span style={{ color: 'white', fontWeight: '600' }}>{COMPANIES.length}</span> companies
          </div>
        </div>
      </header>

      <MarketMap companies={COMPANIES} framework={framework} />
    </div>
  )
}
