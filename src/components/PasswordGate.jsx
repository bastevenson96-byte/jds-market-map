import React, { useState } from 'react'

const CORRECT_PASSWORD = 'JDS2026'
const SESSION_KEY = 'jds_auth'

export function isAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === 'true'
}

export default function PasswordGate({ onAuthenticated }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      onAuthenticated()
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      setPassword('')
    }
  }

  function handleChange(e) {
    setPassword(e.target.value)
    if (error) setError(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: '#111827' }}>
      <div className="w-full max-w-sm px-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-black text-base">
            J
          </div>
          <span className="font-bold text-xl tracking-tight text-white">JDS Sports</span>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
        >
          <h1 className="text-white text-lg font-semibold text-center mb-1">
            Market Map Access
          </h1>
          <p className="text-center text-sm mb-7" style={{ color: '#9CA3AF' }}>
            Enter the access password to continue
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div
              className={`transition-transform ${shaking ? 'animate-shake' : ''}`}
              style={shaking ? { animation: 'shake 0.4s ease' } : undefined}
            >
              <input
                type="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                autoFocus
                className={`w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all
                  ${error
                    ? 'ring-2 ring-red-500'
                    : 'focus:ring-2 focus:ring-indigo-500'
                  }`}
                style={{
                  backgroundColor: '#111827',
                  border: `1px solid ${error ? '#EF4444' : '#374151'}`,
                }}
              />
              {error && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                  </svg>
                  Incorrect password
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-5 py-3 rounded-xl text-sm font-semibold text-white transition-colors bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700"
            >
              Enter
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-xs" style={{ color: '#4B5563' }}>
          JDS Sports · Internal Research · May 2026
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.4s ease; }
      `}</style>
    </div>
  )
}
