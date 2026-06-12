import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="border-b border-[#21262d] bg-[#0d1117] sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg tracking-tight">
          <span className="text-[#e6edf3]">dev</span>
          <span className="text-teal-400">link</span>
          <span className="text-[#e6edf3]">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={"text-sm transition-colors " + (
                pathname === link.path
                  ? 'text-[#e6edf3] font-medium'
                  : 'text-[#8b949e] hover:text-[#e6edf3]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
        >
          <span className={"block w-5 h-0.5 bg-[#8b949e] transition-all " + (menuOpen ? 'rotate-45 translate-y-2' : '')} />
          <span className={"block w-5 h-0.5 bg-[#8b949e] transition-all " + (menuOpen ? 'opacity-0' : '')} />
          <span className={"block w-5 h-0.5 bg-[#8b949e] transition-all " + (menuOpen ? '-rotate-45 -translate-y-2' : '')} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-[#21262d] bg-[#0d1117] px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={"block px-3 py-2 rounded-md text-sm transition-colors " + (
                pathname === link.path
                  ? 'bg-teal-900/30 text-teal-400'
                  : 'text-[#8b949e] hover:bg-[#161b22] hover:text-[#e6edf3]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
