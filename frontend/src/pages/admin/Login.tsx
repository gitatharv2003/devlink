import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { loginApi } from '../../api/auth.api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!email || !password) { setError('Email aur password required hai'); return }
    setLoading(true)
    setError('')
    try {
      const data = await loginApi(email, password)
      login(data.accessToken, data.refreshToken, data.user)
      navigate('/admin')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-[#e6edf3] font-bold text-2xl">dev</span>
          <span className="text-teal-400 font-bold text-2xl">link</span>
          <p className="text-[#8b949e] text-sm mt-2">Admin panel mein login karo</p>
        </div>

        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
          {error && (
            <div className="bg-red-900/20 text-red-400 border border-red-600/30 text-sm px-4 py-2.5 rounded-md mb-4">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-2.5 text-sm text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-teal-600"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-2.5 text-sm text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-teal-600"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2.5 rounded-md text-sm font-medium hover:bg-teal-500 transition-colors disabled:opacity-50"
            >
              {loading ? 'Login ho raha hai...' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
