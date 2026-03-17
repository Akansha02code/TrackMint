import { Link } from 'react-router-dom'
import { Card } from '../components/common/Card'

export function NotFoundPage() {
  return (
    <div className="min-h-screen grid place-items-center px-4">
      <Card className="p-6 max-w-md w-full text-center">
        <div className="font-serif text-3xl tracking-tight">404</div>
        <div className="text-sm text-[color:var(--muted)] mt-1">
          That page doesn’t exist.
        </div>
        <Link
          className="focus-ring mt-5 inline-flex h-11 items-center justify-center rounded-xl2 px-4 bg-base-950 text-white font-medium"
          to="/dashboard"
        >
          Back to dashboard
        </Link>
      </Card>
    </div>
  )
}

