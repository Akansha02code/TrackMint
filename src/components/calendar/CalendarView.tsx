import { DayPicker } from 'react-day-picker'
import { useMemo } from 'react'
import { format } from 'date-fns'
import type { Expense } from '../../types/models'

import 'react-day-picker/dist/style.css'

export function CalendarView({
  expenses,
  selected,
  onSelect,
}: {
  expenses: Expense[]
  selected: Date
  onSelect(d: Date): void
}) {
  const datesWithExpenses = useMemo(() => {
    const set = new Set<string>()
    for (const e of expenses) set.add(e.date)
    return set
  }, [expenses])

  return (
    <div className="rounded-xl2 border border-white/30 dark:border-white/10 overflow-hidden">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={(d) => d && onSelect(d)}
        modifiers={{
          hasExpense: (day) => datesWithExpenses.has(format(day, 'yyyy-MM-dd')),
        }}
        modifiersClassNames={{
          hasExpense:
            'relative after:content-[""] after:absolute after:bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-mint-500',
        }}
        classNames={{
          root: 'rdp w-full bg-transparent',
          caption: 'flex justify-between items-center px-3 py-2',
          caption_label: 'font-serif text-lg',
          nav: 'flex items-center gap-2',
          nav_button:
            'focus-ring h-9 w-9 rounded-xl2 bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10',
          head: 'text-[color:var(--muted)]',
          cell: 'p-1',
          day: 'focus-ring h-10 w-10 rounded-xl2 text-sm hover:bg-white/25 dark:hover:bg-white/10',
          day_selected: 'bg-base-950 text-white hover:bg-base-950',
          day_today: 'border border-mint-400/60',
          day_outside: 'opacity-35',
        }}
        weekStartsOn={1}
        showOutsideDays
      />
    </div>
  )
}
