import { useState } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'

const PASSWORD = '!2026LuDWeiler100%'
const SESSION_KEY = 'fv_access'

export function isAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === '1'
}

export default function PasswordGate({ children }) {
  const [authenticated, setAuthenticated] = useState(isAuthenticated)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthenticated(true)
    } else {
      setError(true)
      setInput('')
    }
  }

  if (authenticated) return children

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Seite in Entwicklung</h1>
        <p className="text-sm text-gray-500 mb-6">Bitte Passwort eingeben, um fortzufahren.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false) }}
              placeholder="Passwort"
              autoFocus
              className={`w-full px-4 py-3 pr-10 border rounded-lg text-sm outline-none transition-colors ${
                error ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-primary-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-xs text-red-500">Falsches Passwort. Bitte erneut versuchen.</p>}
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg text-sm transition-colors"
          >
            Zugang erhalten
          </button>
        </form>
      </div>
    </div>
  )
}
