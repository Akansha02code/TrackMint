import { useMemo } from 'react'
import { addMonths, format } from 'date-fns'
import { Card } from '../components/common/Card'
import { CategoryPie } from '../components/charts/CategoryPie'
import { MonthlyLine } from '../components/charts/MonthlyLine'
import { useAuthStore } from '../store/auth'
import { useFinanceStore } from '../store/finance'
import { isInMonth, monthKey, parseExpenseDate } from '../lib/dates'
import { formatINR } from '../lib/money'

export function ProfilePage() {
  const { session } = useAuthStore()
  const { expenses } = useFinanceStore()
  const userId = session!.user.id
  const today = useMemo(() => new Date(), [])

  const mine = useMemo(() => expenses.filter((e) => e.userId === userId), [expenses, userId])
  const monthExpenses = useMemo(() => mine.filter((e) => isInMonth(e.date, today)), [mine, today])

  const monthlyPoints = useMemo(() => {
    const start = addMonths(today, -5)
    const months = Array.from({ length: 6 }, (_, i) => addMonths(start, i))
    const map = new Map<string, number>()
    for (const m of months) map.set(monthKey(m), 0)
    for (const e of mine) {
      const k = monthKey(parseExpenseDate(e.date))
      if (map.has(k)) map.set(k, (map.get(k) ?? 0) + e.amount)
    }
    return months.map((m) => {
      const k = monthKey(m)
      return { month: format(m, 'MMM'), total: map.get(k) ?? 0 }
    })
  }, [mine, today])

  const monthTotal = useMemo(
    () => monthExpenses.reduce((s, e) => s + e.amount, 0),
    [monthExpenses],
  )

  return (
    <div className="grid xl:grid-cols-2 gap-4">
      <Card className="p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="font-serif text-xl tracking-tight">Category breakdown</div>
            <div className="text-sm text-[color:var(--muted)]">
              This month total: <span className="font-medium">{formatINR(monthTotal)}</span>
            </div>
          </div>
          <div className="text-xs text-[color:var(--muted)] font-mono">{monthKey(today)}</div>
        </div>
        <div className="mt-2">
          <CategoryPie expenses={monthExpenses} />
        </div>
      </Card>

      <Card className="p-4">
        <div className="font-serif text-xl tracking-tight">Monthly trend</div>
        <div className="text-sm text-[color:var(--muted)]">
          Last 6 months spending.
        </div>
        <div className="mt-2">
          <MonthlyLine points={monthlyPoints} />
        </div>
      </Card>
    </div>
  )
}
