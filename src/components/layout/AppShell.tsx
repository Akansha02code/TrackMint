import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { BottomNav } from './BottomNav'
import { TopNav } from './TopNav'
import { NotificationBar } from '../notification/NotificationBar'
import { ExpenseFormModal } from '../expenses/ExpenseFormModal'
import { useAuthStore } from '../../store/auth'
import { useFinanceStore } from '../../store/finance'
import { monthKey } from '../../lib/dates'

export function AppShell() {
  const { session } = useAuthStore()
  const finance = useFinanceStore()
  const [addOpen, setAddOpen] = useState(false)
  const loc = useLocation()
  const onLanding = loc.pathname === '/landing'

  const userId = session!.user.id
  const month = useMemo(() => monthKey(new Date()), [])

  useEffect(() => {
    finance.setMonth(month)
    let unsub: null | (() => void) = null
    void finance.init(userId).then((u) => {
      unsub = u
    })
    return () => unsub?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, month])

  return (
    <div className="min-h-screen">
      {!onLanding ? <TopNav onAddExpense={() => setAddOpen(true)} /> : null}
      <main className="px-4 pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto pt-4 grid gap-4">
          {!onLanding ? <NotificationBar /> : null}
          <Outlet />
        </div>
      </main>

      {!onLanding ? <BottomNav /> : null}

      <ExpenseFormModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        defaultDate={new Date()}
      />
    </div>
  )
}
