import React, { useState } from 'react'
import { COMPANIES } from './data/companies'
import MarketMap from './components/MarketMap'
import PasswordGate, { isAuthenticated } from './components/PasswordGate'

export default function App() {
  const [authed, setAuthed] = useState(isAuthenticated)

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
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: '#6366F1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '900',
              fontSize: '14px',
              flexShrink: 0,
            }}
          >
            J
          </div>
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
            JDS Sports · Internal Research · Jun 2026
          </p>
        </div>

        <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#6B7280' }}>
          <span style={{ color: 'white', fontWeight: '600' }}>{COMPANIES.length}</span> companies
        </div>
      </header>

      <MarketMap companies={COMPANIES} />
    </div>
  )
}
