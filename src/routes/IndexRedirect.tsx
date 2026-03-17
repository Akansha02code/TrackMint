import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export function IndexRedirect() {
  const { session, loading } = useAuthStore()
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="glass shadow-glass rounded-xl2 px-5 py-4">
          <div className="text-sm text-[color:var(--muted)]">Loading…</div>
        </div>
      </div>
    )
  }
  return <Navigate to={session ? '/landing' : '/login'} replace />
}
