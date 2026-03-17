import { useMemo } from 'react'
import { CATEGORIES } from '../../constants/categories'
import type { Category } from '../../types/models'

export function FiltersBar({
  search,
  onSearch,
  category,
  onCategory,
}: {
  search: string
  onSearch(v: string): void
  category: Category | 'All'
  onCategory(v: Category | 'All'): void
}) {
  const options = useMemo(() => ['All' as const, ...CATEGORIES], [])
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2">
      <input
        className="focus-ring h-10 w-full md:flex-1 rounded-xl2 px-3 bg-white/60 dark:bg-white/5 border border-white/60 dark:border-white/10 text-sm"
        placeholder="Search notes…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        className="focus-ring h-10 w-full md:w-48 rounded-xl2 px-3 bg-white/60 dark:bg-white/5 border border-white/60 dark:border-white/10 text-sm"
        value={category}
        onChange={(e) => {
          const v = e.target.value
          onCategory(v === 'All' ? 'All' : (v as Category))
        }}
      >
        {options.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  )
}
