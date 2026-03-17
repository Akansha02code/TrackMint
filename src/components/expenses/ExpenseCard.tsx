import { Trash2 } from 'lucide-react'
import type { Expense } from '../../types/models'
import { formatINR } from '../../lib/money'
import { Button } from '../common/Button'

export function ExpenseCard({
  expense,
  onDelete,
}: {
  expense: Expense
  onDelete(): void
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-white/30 dark:border-white/10 last:border-b-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate">{expense.notes || 'Expense'}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-base-950/10 dark:bg-white/10">
            {expense.category}
          </span>
        </div>
        <div className="text-xs text-[color:var(--muted)] mt-0.5">{expense.date}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm font-medium tabular-nums">{formatINR(expense.amount)}</div>
        <Button variant="ghost" size="sm" onClick={onDelete} aria-label="Delete expense">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

