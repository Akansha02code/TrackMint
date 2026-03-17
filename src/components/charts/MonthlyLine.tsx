import { useMemo } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { formatINR } from '../../lib/money'

export function MonthlyLine({ points }: { points: { month: string; total: number }[] }) {
  const data = useMemo(() => points, [points])

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 8 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.12)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: 'rgba(237,241,255,0.70)', fontSize: 12 }} />
          <YAxis tick={{ fill: 'rgba(237,241,255,0.70)', fontSize: 12 }} width={54} />
          <Tooltip
            formatter={(v) => formatINR(Number(v))}
            contentStyle={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(12,18,35,0.85)', color: '#fff' }}
          />
          <Line type="monotone" dataKey="total" stroke="#31e2ac" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
