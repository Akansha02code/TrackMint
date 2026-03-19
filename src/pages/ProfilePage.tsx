import { useMemo } from 'react'
import { addMonths, addWeeks, format, startOfWeek } from 'date-fns'
import { Card } from '../components/common/Card'
import { CategoryPie } from '../components/charts/CategoryPie'
import { MonthlyLine } from '../components/charts/MonthlyLine'
import { WeeklyLine } from '../components/charts/WeeklyLine'
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

  const weeklyPoints = useMemo(() => {
    const end = startOfWeek(today)
    const start = addWeeks(end, -5)
    const weeks = Array.from({ length: 6 }, (_, i) => addWeeks(start, i))
    
    const formatDateKey = (d: Date) => format(d, 'yyyy-MM-dd')
    const map = new Map<string, number>()
    for (const w of weeks) map.set(formatDateKey(w), 0)
    
    for (const e of mine) {
      const eDate = parseExpenseDate(e.date)
      const wDate = startOfWeek(eDate)
      const k = formatDateKey(wDate)
      if (map.has(k)) map.set(k, (map.get(k) ?? 0) + e.amount)
    }
    
    return weeks.map((w) => {
      const k = formatDateKey(w)
      return { week: format(w, 'MMM d'), total: map.get(k) ?? 0 }
    })
  }, [mine, today])

  const monthTotal = useMemo(
    () => monthExpenses.reduce((s, e) => s + e.amount, 0),
    [monthExpenses],
  )

  return (
    <div className="grid xl:grid-cols-2 gap-4">
      <Card className="p-4 relative overflow-hidden backdrop-blur-xl bg-white/60 dark:bg-base-950/60 transition-transform">
        <div className="flex items-end justify-between gap-3 relative z-10">
          <div>
            <div className="font-serif text-2xl tracking-tight text-mint-700 dark:text-mint-400">Category breakdown</div>
            <div className="text-sm text-[color:var(--muted)] mt-1">
              This month total: <span className="font-medium">{formatINR(monthTotal)}</span>
            </div>
          </div>
          <div className="text-xs text-[color:var(--muted)] font-mono">{monthKey(today)}</div>
        </div>
        <div className="mt-4 relative z-10">
          <CategoryPie expenses={monthExpenses} />
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-mint-500/10 rounded-full blur-[80px]" />
      </Card>

      <div className="grid gap-4">
        <Card className="p-4 relative overflow-hidden backdrop-blur-xl bg-white/60 dark:bg-base-950/60 transition-transform hover:-translate-y-1 hover:shadow-xl">
          <div className="font-serif text-xl tracking-tight relative z-10">Weekly trend</div>
          <div className="text-sm text-[color:var(--muted)] relative z-10">
            Last 6 weeks spending.
          </div>
          <div className="mt-2 relative z-10">
            <WeeklyLine points={weeklyPoints} />
          </div>
        </Card>

        <Card className="p-4 relative overflow-hidden backdrop-blur-xl bg-white/60 dark:bg-base-950/60 transition-transform hover:-translate-y-1 hover:shadow-xl">
          <div className="font-serif text-xl tracking-tight relative z-10">Monthly trend</div>
          <div className="text-sm text-[color:var(--muted)] relative z-10">
            Last 6 months spending.
          </div>
          <div className="mt-2 relative z-10">
            <MonthlyLine points={monthlyPoints} />
          </div>
        </Card>
      </div>
    </div>
  )
}
