import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export function RequireAuth() {
  const { session, loading } = useAuthStore()
  const loc = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="glass shadow-glass rounded-xl2 px-5 py-4">
          <div className="text-sm text-[color:var(--muted)]">Loading your space…</div>
        </div>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: loc.pathname }} />
  }

  return <Outlet />
}

