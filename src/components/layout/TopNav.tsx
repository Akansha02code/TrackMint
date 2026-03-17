import { NavLink } from 'react-router-dom'
import { CalendarDays, LayoutDashboard, LogOut, Moon, Plus, Sun, User } from 'lucide-react'
import { clsx } from 'clsx'
import { useMemo } from 'react'
import { useAuthStore } from '../../store/auth'
import { useUiStore } from '../../store/ui'
import { Button } from '../common/Button'
import { LogoMark } from '../branding/LogoMark'
import { APP_NAME } from '../../constants/app'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/profile', label: 'Profile', icon: User },
]

export function TopNav({ onAddExpense }: { onAddExpense(): void }) {
  const { session, signOut } = useAuthStore()
  const { theme, toggleTheme } = useUiStore()

  const initials = useMemo(() => {
    const n = session?.user.name?.trim() || 'User'
    const parts = n.split(/\s+/).slice(0, 2)
    return parts.map((p) => p[0]?.toUpperCase()).join('')
  }, [session?.user.name])

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass shadow-glass rounded-xl2 px-3 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <NavLink to="/dashboard" className="focus-ring rounded-2xl">
              <LogoMark />
            </NavLink>
            <div className="min-w-0">
              <div className="font-serif text-xl tracking-tight leading-none">
                {APP_NAME}
              </div>
              <div className="text-xs text-[color:var(--muted)] truncate">
                {session?.user.email}
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  clsx(
                    'focus-ring flex items-center gap-2 rounded-xl2 px-3 py-2 text-sm',
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

          <div className="flex items-center gap-2">
            <Button onClick={onAddExpense} aria-label="Add expense">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add expense</span>
            </Button>

            <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <div className="hidden lg:flex items-center gap-2 pl-1">
              <div className="h-9 w-9 rounded-xl2 grid place-items-center bg-base-950/10 dark:bg-white/10 text-sm font-medium">
                {initials || 'U'}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => void signOut()}
              aria-label="Logout"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
