import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import type { Category } from '../types/models'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { ProgressBar } from '../components/common/ProgressBar'
import { TransactionList } from '../components/expenses/TransactionList'
import { useAuthStore } from '../store/auth'
import { useFinanceStore } from '../store/finance'
import { formatINR } from '../lib/money'
import { isInMonth, monthKey } from '../lib/dates'
import { Modal } from '../components/common/Modal'

export function DashboardPage() {
  const { session } = useAuthStore()
  const { expenses, budget, setBudget, resetMonth, deleteExpense } = useFinanceStore()
  const userId = session!.user.id
  const today = useMemo(() => new Date(), [])
  const month = monthKey(today)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [budgetOpen, setBudgetOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [budgetValue, setBudgetValue] = useState(String(budget || ''))

  const total = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses])
  const thisMonth = useMemo(() => {
    return expenses.filter((e) => isInMonth(e.date, today)).reduce((s, e) => s + e.amount, 0)
  }, [expenses, today])

  const remaining = budget - thisMonth
  const usage = budget > 0 ? thisMonth / budget : 0
  const overspent = remaining < 0

  const recent = useMemo(() => expenses.slice(0, 14), [expenses])

  async function onDelete(id: string) {
    try {
      await deleteExpense(userId, id)
      toast.success('Deleted')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Delete failed')
    }
  }

  return (
    <div className="grid gap-4">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="h-full">
          <div className="h-full flex flex-col">
            <div className="text-sm text-[color:var(--muted)]">Total expenses</div>
            <div className="mt-1 font-serif text-3xl tracking-tight">{formatINR(total)}</div>
            <div className="mt-auto pt-4 text-xs text-[color:var(--muted)]">
              All-time, across categories.
            </div>
          </div>
        </Card>

        <Card className="h-full">
          <div className="h-full flex flex-col">
            <div className="text-sm text-[color:var(--muted)]">This month</div>
            <div className="mt-1 font-serif text-3xl tracking-tight">{formatINR(thisMonth)}</div>
            <div className="mt-3">
              <ProgressBar value={usage} />
              <div className="mt-2 text-xs text-[color:var(--muted)]">
                {budget > 0 ? `${Math.round(usage * 100)}% of budget used` : 'Set a budget to see progress'}
              </div>
            </div>
            <div className="mt-auto" />
          </div>
        </Card>

        <Card className="h-full">
          <div className="h-full flex flex-col">
            <div className="text-sm text-[color:var(--muted)]">Monthly budget</div>
            <div className="mt-1 font-serif text-3xl tracking-tight">
              {budget > 0 ? formatINR(budget) : '—'}
            </div>
            <div className="mt-auto pt-4 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setBudgetValue(String(budget || ''))
                setBudgetOpen(true)
              }}
            >
              Set budget
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setBudgetValue(String(budget || ''))
                setResetOpen(true)
              }}
            >
              Reset month
            </Button>
            </div>
          </div>
        </Card>

        <Card className="h-full" tone={overspent ? 'danger' : 'default'}>
          <div className="h-full flex flex-col">
            <div className="text-sm text-[color:var(--muted)]">Remaining</div>
            <div className="mt-1 font-serif text-3xl tracking-tight">
              <span className={overspent ? 'text-peach-600' : ''}>
                {formatINR(remaining)}
              </span>
            </div>
            <div className="mt-auto pt-4 text-xs text-[color:var(--muted)]">
              Month: <span className="font-mono">{month}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <TransactionList
          title="Recent transactions"
          expenses={recent}
          onDelete={onDelete}
          search={search}
          onSearch={setSearch}
          category={category}
          onCategory={setCategory}
        />
      </Card>

      <Modal open={budgetOpen} title="Set monthly budget" onClose={() => setBudgetOpen(false)}>
        <div className="grid gap-3">
          <Input
            label="Budget amount"
            type="number"
            inputMode="numeric"
            step="1"
            placeholder="e.g. 20000"
            value={budgetValue}
            onChange={(e) => setBudgetValue(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={() => setBudgetOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const n = Number(budgetValue)
                if (!Number.isFinite(n) || n < 0) {
                  toast.error('Enter a valid number')
                  return
                }
                void setBudget(userId, n).then(() => {
                  toast.success('Budget updated')
                  setBudgetOpen(false)
                })
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={resetOpen} title="Reset this month" onClose={() => setResetOpen(false)}>
        <div className="grid gap-3">
          <div className="text-sm text-[color:var(--muted)]">
            This clears all expenses for <span className="font-mono">{month}</span> and sets a new budget.
          </div>
          <Input
            label="New budget amount"
            type="number"
            inputMode="numeric"
            step="1"
            placeholder="e.g. 25000"
            value={budgetValue}
            onChange={(e) => setBudgetValue(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={() => setResetOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                const n = Number(budgetValue)
                if (!Number.isFinite(n) || n < 0) {
                  toast.error('Enter a valid number')
                  return
                }
                void resetMonth(userId, n).then(() => {
                  toast.success('Month reset')
                  setResetOpen(false)
                })
              }}
            >
              Confirm reset
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
