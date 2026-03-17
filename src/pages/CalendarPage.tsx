import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { Card } from '../components/common/Card'
import { CalendarView } from '../components/calendar/CalendarView'
import { useAuthStore } from '../store/auth'
import { useFinanceStore } from '../store/finance'
import { ExpenseFormModal } from '../components/expenses/ExpenseFormModal'
import { TransactionList } from '../components/expenses/TransactionList'
import type { Category } from '../types/models'

export function CalendarPage() {
  const { session } = useAuthStore()
  const finance = useFinanceStore()
  const userId = session!.user.id

  const [selected, setSelected] = useState<Date>(() => new Date())
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category | 'All'>('All')

  const dayIso = format(selected, 'yyyy-MM-dd')
  const dayExpenses = useMemo(() => {
    return finance.expenses.filter((e) => e.userId === userId && e.date === dayIso)
  }, [finance.expenses, userId, dayIso])

  return (
    <div className="grid xl:grid-cols-[22rem_1fr] gap-4">
      <Card className="p-4">
        <div className="font-serif text-xl tracking-tight mb-2">Pick a day</div>
        <CalendarView
          expenses={finance.expenses.filter((e) => e.userId === userId)}
          selected={selected}
          onSelect={setSelected}
        />
        <div className="mt-3 text-sm text-[color:var(--muted)]">
          Selected: <span className="font-mono">{dayIso}</span>
        </div>
        <button
          className="focus-ring mt-3 w-full h-11 rounded-xl2 bg-base-950 text-white font-medium"
          onClick={() => setOpen(true)}
        >
          Add expense for this date
        </button>
      </Card>

      <Card className="p-4">
        <TransactionList
          title="Expenses on selected date"
          expenses={dayExpenses}
          onDelete={(id) => {
            void finance
              .deleteExpense(userId, id)
              .then(() => toast.success('Deleted'))
              .catch((e) => toast.error(e instanceof Error ? e.message : 'Delete failed'))
          }}
          search={search}
          onSearch={setSearch}
          category={category}
          onCategory={setCategory}
        />
      </Card>

      <ExpenseFormModal open={open} onClose={() => setOpen(false)} defaultDate={selected} />
    </div>
  )
}
