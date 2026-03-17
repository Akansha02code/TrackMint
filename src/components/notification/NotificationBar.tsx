import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, Sparkles } from 'lucide-react'
import { daysRemainingInMonth } from '../../lib/dates'
import { formatINR } from '../../lib/money'
import { useAuthStore } from '../../store/auth'
import { useFinanceStore } from '../../store/finance'
import { isInMonth, monthKey } from '../../lib/dates'

export function NotificationBar() {
  const { session } = useAuthStore()
  const { expenses, budget } = useFinanceStore()
  const [tick, setTick] = useState(() => Date.now())

  useEffect(() => {
    // Update at midnight (local) + when tab wakes up.
    const onVis = () => setTick(Date.now())
    document.addEventListener('visibilitychange', onVis)
    const now = new Date()
    const nextMidnight = new Date(now)
    nextMidnight.setHours(24, 0, 0, 0)
    const t = window.setTimeout(() => setTick(Date.now()), nextMidnight.getTime() - now.getTime())
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      window.clearTimeout(t)
    }
  }, [])

  const today = useMemo(() => new Date(tick), [tick])
  const month = monthKey(today)
  const monthSpend = useMemo(() => {
    return expenses
      .filter((e) => e.userId === session!.user.id && isInMonth(e.date, today))
      .reduce((sum, e) => sum + e.amount, 0)
  }, [expenses, session, today])

  const remaining = budget - monthSpend
  const daysLeft = daysRemainingInMonth(today)
  const overspent = remaining < 0

  return (
    <div
      className={[
        'glass shadow-glass rounded-xl2 px-4 py-3 flex items-center justify-between gap-3',
        overspent ? 'border-peach-400/60' : 'border-white/60 dark:border-white/10',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <div
          className={[
            'h-9 w-9 rounded-xl2 grid place-items-center',
            overspent ? 'bg-peach-500/15' : 'bg-mint-500/15',
          ].join(' ')}
        >
          {overspent ? (
            <AlertTriangle className="h-5 w-5 text-peach-600" />
          ) : (
            <Sparkles className="h-5 w-5 text-mint-600" />
          )}
        </div>
        <div>
          <div className="text-sm font-medium">
            {overspent ? 'Overspent' : 'On track'} for <span className="font-mono">{month}</span>
          </div>
          <div className="text-sm text-[color:var(--muted)]">
            You have{' '}
            <span className={overspent ? 'text-peach-600 font-medium' : 'font-medium'}>
              {formatINR(Math.abs(remaining))}
            </span>{' '}
            {overspent ? 'over budget' : 'remaining'} for <span className="font-medium">{daysLeft}</span>{' '}
            days.
          </div>
        </div>
      </div>
      <div className="text-sm text-[color:var(--muted)] hidden md:block">
        Updates instantly when you add or delete expenses.
      </div>
    </div>
  )
}

