import { NavLink } from 'react-router-dom'
import { CalendarDays, LayoutDashboard, LogOut, Moon, Sun, User } from 'lucide-react'
import { clsx } from 'clsx'
import { useAuthStore } from '../../store/auth'
import { useUiStore } from '../../store/ui'
import { Button } from '../common/Button'
import { Logo } from '../common/Logo'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/profile', label: 'Profile', icon: User },
]

export function Sidebar() {
  const { session, signOut } = useAuthStore()
  const { theme, toggleTheme } = useUiStore()

  return (
    <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:gap-3 lg:p-4">
      <div className="glass shadow-glass rounded-xl2 p-4">
        <div className="mb-2">
          <Logo />
        </div>
        <div className="text-sm text-[color:var(--muted)] mt-1">
          {session?.user.name}
          <span className="mx-2 opacity-40">•</span>
          {session?.user.email}
        </div>
      </div>

      <nav className="glass shadow-glass rounded-xl2 p-2 flex flex-col gap-1">
        {navItems.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              clsx(
                'focus-ring flex items-center gap-3 rounded-xl2 px-3 py-2 text-sm',
                isActive
                  ? 'bg-base-950 text-white'
                  : 'hover:bg-white/25 dark:hover:bg-white/10',
              )
            }
          >
            <it.icon className="h-4 w-4" />
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="glass shadow-glass rounded-xl2 p-3 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => void signOut()}>
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  )
}

