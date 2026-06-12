import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const links = [
  { label: 'Dashboard', path: '/admin', icon: 'ti-layout-dashboard' },
  { label: 'New Post', path: '/admin/posts/new', icon: 'ti-pencil' },
  { label: 'Projects', path: '/admin/projects', icon: 'ti-folder' },
  { label: 'Analytics', path: '/admin/analytics', icon: 'ti-chart-bar' },
]

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const { pathname } = useLocation()
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleClick = () => {
    if (onClose) onClose()
  }

  return (
    <aside className="w-56 min-h-screen bg-[#161b22] border-r border-[#21262d] flex flex-col px-3 py-5">
      <div className="px-3 mb-8">
        <span className="text-[#e6edf3] font-semibold">dev</span>
        <span className="text-teal-400 font-semibold">link</span>
        <span className="text-[#8b949e] text-xs ml-2">admin</span>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            onClick={handleClick}
            className={"flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors " + (
              pathname === link.path
                ? 'bg-teal-900/40 text-teal-400 border border-teal-600/30'
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#e6edf3]'
            )}
          >
            <i className={"ti " + link.icon} style={{fontSize:'15px'}} aria-hidden="true"></i>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-[#21262d] pt-3 mt-3">
        <Link to="/" target="_blank" onClick={handleClick}
          className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-[#8b949e] hover:bg-[#21262d] hover:text-[#e6edf3] transition-colors mb-1">
          <i className="ti ti-external-link" style={{fontSize:'15px'}} aria-hidden="true"></i>
          Portfolio
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-[#8b949e] hover:bg-[#21262d] hover:text-red-400 transition-colors text-left"
        >
          <i className="ti ti-logout" style={{fontSize:'15px'}} aria-hidden="true"></i>
          Logout
        </button>
      </div>
    </aside>
  )
}
