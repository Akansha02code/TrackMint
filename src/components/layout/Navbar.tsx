import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '../common/Button'

export function Navbar({ onAddExpense }: { onAddExpense(): void }) {
  const loc = useLocation()
  const title = useMemo(() => {
    if (loc.pathname.startsWith('/calendar')) return 'Calendar'
    if (loc.pathname.startsWith('/profile')) return 'Profile'
    return 'Dashboard'
  }, [loc.pathname])

  return (
    <div className="glass shadow-glass rounded-xl2 px-4 py-3 flex items-center justify-between gap-3">
      <div>
        <div className="font-serif text-2xl tracking-tight">{title}</div>
        <div className="text-sm text-[color:var(--muted)]">
          Real-time budget, expenses, and insights.
        </div>
      </div>
      <Button onClick={onAddExpense}>
        <Plus className="h-4 w-4" />
        <span>Add expense</span>
      </Button>
    </div>
  )
}

