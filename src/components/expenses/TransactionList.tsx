import { useDeferredValue, useMemo } from 'react'
import Papa from 'papaparse'
import { Download } from 'lucide-react'
import type { Category, Expense } from '../../types/models'
import { ExpenseCard } from './ExpenseCard'
import { Button } from '../common/Button'
import { FiltersBar } from './FiltersBar'

export function TransactionList({
  expenses,
  onDelete,
  search,
  onSearch,
  category,
  onCategory,
  title = 'Recent transactions',
}: {
  expenses: Expense[]
  onDelete(id: string): void
  search: string
  onSearch(v: string): void
  category: Category | 'All'
  onCategory(v: Category | 'All'): void
  title?: string
}) {
  const deferredSearch = useDeferredValue(search)

  const filtered = useMemo(() => {
    const q = deferredSearch.trim().toLowerCase()
    return expenses.filter((e) => {
      if (category !== 'All' && e.category !== category) return false
      if (!q) return true
      return (
        e.notes.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.date.includes(q)
      )
    })
  }, [expenses, deferredSearch, category])

  function exportCsv() {
    const csv = Papa.unparse(
      filtered.map((e) => ({
        date: e.date,
        category: e.category,
        notes: e.notes,
        amount: e.amount,
      })),
    )
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex items-start md:items-center justify-between gap-3 mb-3">
        <div>
          <div className="font-serif text-xl tracking-tight">{title}</div>
          <div className="text-sm text-[color:var(--muted)]">
            {filtered.length} shown
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={exportCsv}>
            <Download className="h-4 w-4" />
            <span>CSV</span>
          </Button>
        </div>
      </div>

      <FiltersBar
        search={search}
        onSearch={onSearch}
        category={category}
        onCategory={onCategory}
      />

      <div className="mt-3">
        {filtered.length ? (
          <div className="divide-y divide-white/30 dark:divide-white/10">
            {filtered.map((e) => (
              <ExpenseCard
                key={e.id}
                expense={e}
                onDelete={() => onDelete(e.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-sm text-[color:var(--muted)] py-8 text-center">
            No transactions match your filters.
          </div>
        )}
      </div>
    </div>
  )
}

