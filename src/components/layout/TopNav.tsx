import { NavLink } from 'react-router-dom'
import { CalendarDays, LayoutDashboard, LogOut, Moon, Plus, Sun, User } from 'lucide-react'
import { clsx } from 'clsx'
import { useMemo } from 'react'
import { useAuthStore } from '../../store/auth'
import { useUiStore } from '../../store/ui'
import { useFinanceStore } from '../../store/finance'
import { Button } from '../common/Button'
import { Logo } from '../common/Logo'
import { formatINR } from '../../lib/money'
import { isInMonth } from '../../lib/dates'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/profile', label: 'Profile', icon: User },
]

export function TopNav({ onAddExpense }: { onAddExpense(): void }) {
  const { session, signOut } = useAuthStore()
  const { theme, toggleTheme } = useUiStore()
  const { expenses } = useFinanceStore()
  
  const today = useMemo(() => new Date(), [])
  const monthSpent = useMemo(() => {
    return expenses.filter(e => isInMonth(e.date, today)).reduce((sum, e) => sum + e.amount, 0)
  }, [expenses, today])

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
            <Logo />
            {/* Email removed here */}
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

            <div className="hidden lg:flex items-center gap-2 pl-1 relative group">
              <div className="cursor-pointer h-10 w-10 rounded-xl grid place-items-center bg-gradient-to-br from-mint-500 to-base-600 dark:from-mint-600 dark:to-mint-800 text-white text-sm font-bold shadow-md hover:scale-105 transition-transform border border-white/20">
                {initials || 'U'}
              </div>
              
              {/* Profile Dropdown */}
              <div className="absolute right-0 top-full mt-3 w-64 p-5 bg-white dark:bg-base-950 shadow-[0_10px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 origin-top-right border border-base-200 dark:border-base-800 z-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full grid place-items-center bg-gradient-to-br from-mint-500 to-base-600 text-white shadow-inner text-lg font-bold">
                    {initials || 'U'}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-base truncate text-base-900 dark:text-white">{session?.user.name}</div>
                    <div className="text-xs text-[color:var(--muted)] truncate">{session?.user.email}</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-base-200 dark:border-base-800/50">
                  <div className="text-xs text-[color:var(--muted)] mb-1 uppercase tracking-wider font-semibold">Spent this month</div>
                  <div className="font-serif text-3xl font-bold tracking-tight text-mint-600 dark:text-mint-400">
                    {formatINR(monthSpent)}
                  </div>
                </div>
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
