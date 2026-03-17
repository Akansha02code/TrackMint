import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { APP_NAME } from '../constants/app'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { FinScene3D } from '../components/landing/FinScene3D'
import { useAuthStore } from '../store/auth'

export function LandingPage() {
  const nav = useNavigate()
  const { session } = useAuthStore()

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      <div className="w-full max-w-6xl mx-auto grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <Card className="p-6 md:p-8">
            <div className="grid lg:grid-cols-[1fr_0.95fr] gap-6 lg:gap-8 items-center">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-[color:var(--muted)]">
                  <Sparkles className="h-4 w-4 text-mint-600" />
                  Welcome back, {session?.user.name}
                </div>

                <h1 className="mt-4 font-serif text-4xl md:text-6xl tracking-tight leading-[0.98]">
                  Your spending, turned into{' '}
                  <span className="underline decoration-mint-400/60">insights</span>.
                </h1>

                <p className="mt-3 text-sm md:text-lg text-[color:var(--muted)] max-w-2xl">
                  {APP_NAME} helps you see where money goes, how fast it’s moving, and what to fix next.
                  Set a budget, add expenses in seconds, and let the dashboard, calendar, and charts update automatically.
                </p>

                <div className="mt-5 grid gap-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-mint-600 mt-0.5" />
                    <div>
                      <span className="font-medium">Stay on track</span> with remaining budget and days-left reminders.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-mint-600 mt-0.5" />
                    <div>
                      <span className="font-medium">Spot patterns</span> using calendar highlights and category charts.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-mint-600 mt-0.5" />
                    <div>
                      <span className="font-medium">Make it effortless</span> with fast entry, filters, search, and CSV export.
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button onClick={() => nav('/dashboard')} className="min-w-44 justify-center">
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <div className="text-xs text-[color:var(--muted)] text-center sm:text-left">
                    Tip: Set your monthly budget first, then add your first expense.
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="grid place-items-center"
              >
                <div className="w-full max-w-xl">
                  <FinScene3D />
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        <footer className="text-center text-xs text-[color:var(--muted)] pb-2">
          Built for your future self: fewer surprises, clearer choices, and a calmer month.
        </footer>
      </div>
    </div>
  )
}
