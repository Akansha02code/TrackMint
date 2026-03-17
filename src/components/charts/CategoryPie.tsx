import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import type { Expense } from '../../types/models'
import { formatINR } from '../../lib/money'

const COLORS = ['#16c495', '#6b90c5', '#ff7f42', '#c084fc', '#f14806', '#31e2ac', '#93afd8', '#ffab7e']

export function CategoryPie({ expenses }: { expenses: Expense[] }) {
  const data = useMemo(() => {
    const map = new Map<string, number>()
    for (const e of expenses) {
      map.set(e.category, (map.get(e.category) ?? 0) + e.amount)
    }
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [expenses])

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={54} outerRadius={86} paddingAngle={2}>
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v) => formatINR(Number(v))}
            contentStyle={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(12,18,35,0.85)', color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

