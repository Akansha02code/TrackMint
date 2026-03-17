import { NavLink } from 'react-router-dom'
import { CalendarDays, LayoutDashboard, User } from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3">
      <div className="glass shadow-glass rounded-xl2 grid grid-cols-3">
        {navItems.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              clsx(
                'focus-ring py-3 px-3 flex flex-col items-center gap-1 text-xs',
                isActive ? 'text-base-950 dark:text-white' : 'text-[color:var(--muted)]',
              )
            }
          >
            <it.icon className="h-5 w-5" />
            <span>{it.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
