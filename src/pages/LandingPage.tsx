import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Receipt,
  PieChart,
  ShieldCheck,
  Wallet,
  Building,
  BarChart3
} from 'lucide-react'
import { APP_NAME } from '../constants/app'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { FinScene3D } from '../components/landing/FinScene3D'
import { useAuthStore } from '../store/auth'

const features = [
  {
    title: 'Expense Management',
    description: 'Automatically create, submit, approve, and reimburse expenses. Reports sync with ease.',
    icon: <Wallet className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
    delay: 0.1
  },
  {
    title: 'Receipt Tracking',
    description: 'Snap a photo, forward email receipts, or upload a file – keep everything in one place.',
    icon: <Receipt className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
    delay: 0.2
  },
  {
    title: 'Spend Management',
    description: 'Control your spend with smart limits, approvals, and visibility across expenses.',
    icon: <ShieldCheck className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
    delay: 0.3
  },
  {
    title: 'Financial Reporting',
    description: 'Build tailored reports to analyze spend, identify trends, and make smarter decisions.',
    icon: <PieChart className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
    delay: 0.4
  },
  {
    title: 'Smart Budgets',
    description: 'Set, track, and manage budgets across your life. Control spend before it happens.',
    icon: <BarChart3 className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
    delay: 0.5
  },
  {
    title: 'Global Scale',
    description: 'Track expenses anywhere in the world, beautifully organized in your local currency.',
    icon: <Building className="h-6 w-6 text-mint-600 dark:text-mint-400" />,
    delay: 0.6
  }
]

export function LandingPage() {
  const nav = useNavigate()
  const { session } = useAuthStore()

  return (
    <div className="min-h-[calc(100vh-3.5rem)] py-12 px-4 space-y-24">
      {/* Hero Section */}
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card className="p-6 md:p-12 overflow-hidden relative border-white/40 dark:border-white/10 shadow-2xl bg-gradient-to-br from-white/60 to-white/30 dark:from-base-900/60 dark:to-black/30 backdrop-blur-3xl">
            {/* Background glowing orbs */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-mint-400/20 dark:bg-mint-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-peach-400/20 dark:bg-peach-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center relative z-10">
              <div className="min-w-0">
                {session ? (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm font-medium text-mint-700 dark:text-mint-300 shadow-sm mb-6"
                  >
                    <Sparkles className="h-4 w-4" />
                    Welcome back, {session.user.name || session.user.email}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 glass border border-mint-500/20 rounded-full px-4 py-1.5 text-sm font-medium text-mint-700 dark:text-mint-300 shadow-sm mb-6"
                  >
                    <Sparkles className="h-4 w-4" />
                    The easiest way to do your expenses
                  </motion.div>
                )}

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mt-2 font-serif text-5xl md:text-7xl lg:text-[5rem] tracking-tight leading-[1] font-bold text-base-950 dark:text-white"
                >
                  Your spending, turned into{' '}
                  <span className="relative inline-block mt-2 md:mt-0">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-mint-600 to-peach-500 dark:from-mint-400 dark:to-peach-400">insights</span>
                    <motion.span 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-mint-200/60 dark:bg-mint-500/30 -rotate-1 origin-left z-0"
                    />
                  </span>.
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 md:mt-8 text-base md:text-xl text-[color:var(--muted)] max-w-xl leading-relaxed"
                >
                  {APP_NAME} is the simplest way to see where your money goes. 
                  Set budgets, snap receipts, and let our dashboard update automatically.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 md:mt-10 grid gap-4 text-sm md:text-base font-medium"
                >
                  {[
                    ['Stay on track', 'with customizable limits and reminders.'],
                    ['Spot patterns', 'using interactive calendar and charts.'],
                    ['Make it effortless', 'with smart filters, search, and exports.'],
                  ].map(([title, desc], i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="mt-0.5 bg-mint-100 dark:bg-mint-900/40 p-1 rounded-full group-hover:bg-mint-200 dark:group-hover:bg-mint-900/60 transition-colors shadow-sm">
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-mint-600 dark:text-mint-400" />
                      </div>
                      <div className="text-[color:var(--text)]">
                        <span className="font-bold text-base-900 dark:text-base-50">{title}</span> <span className="text-[color:var(--muted)]">{desc}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-10 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-5"
                >
                  <Button 
                    onClick={() => nav(session ? '/dashboard' : '/signup')} 
                    className="h-14 px-8 text-lg font-bold shadow-xl shadow-mint-500/25 bg-gradient-to-r from-mint-600 to-mint-500 transform hover:scale-[1.02] hover:shadow-mint-500/40 transition-all rounded-full border-none"
                  >
                    {session ? 'Go to Dashboard' : 'Try it for free'}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                  <div className="text-sm font-semibold text-[color:var(--muted)] text-center sm:text-left flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-peach-500 animate-pulse shadow-[0_0_8px_rgba(255,95,24,0.6)]" />
                    No credit card required
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid place-items-center relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-mint-300/30 via-transparent to-peach-300/30 blur-3xl -z-10 rounded-full" />
                <div className="w-full max-w-xl animate-floaty">
                  <FinScene3D />
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-6xl mx-auto pt-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex font-bold text-mint-600 dark:text-mint-400 tracking-[0.2em] uppercase text-xs mb-4 glass px-4 py-1.5 rounded-full"
          >
            Everything you need
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-base-900 to-base-600 dark:from-white dark:to-white/70 tracking-tight"
          >
            Features that make sense
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: feature.delay, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="p-8 h-full bg-white/60 dark:bg-base-900/40 hover:bg-white dark:hover:bg-base-900/80 transition-all duration-300 border border-white/40 dark:border-white/10 group cursor-default shadow-sm hover:shadow-2xl hover:shadow-mint-500/10 backdrop-blur-md">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mint-50 to-mint-100 dark:from-mint-900/40 dark:to-mint-800/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm border border-mint-200/50 dark:border-mint-700/30">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 font-serif text-base-900 dark:text-base-50 tracking-tight">{feature.title}</h3>
                <p className="text-[color:var(--muted)] leading-relaxed font-medium">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-6xl mx-auto py-10 pb-20">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <Card className="p-10 md:p-16 text-center bg-gradient-to-tr from-mint-500 to-mint-400 dark:from-mint-600 dark:to-mint-500 text-mint-950 shadow-2xl shadow-mint-500/20 overflow-hidden relative border-none rounded-3xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/30 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-mint-200/40 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 grid gap-8 max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Ready to simplify your expenses?
              </h2>
              <p className="text-mint-900 dark:text-mint-100 text-lg md:text-xl font-medium opacity-90">
                Join thousands of others taking control of their financial life with {APP_NAME}. Keep everything in one simple place.
              </p>
              <div className="pt-4">
                <Button 
                  onClick={() => nav('/signup')} 
                  className="h-16 px-12 text-lg font-bold bg-base-950 text-white hover:bg-black hover:scale-105 transition-all shadow-xl shadow-base-950/20 rounded-full border-none"
                >
                  Get Started for Free
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <footer className="mt-24 text-center text-sm font-medium text-[color:var(--muted)] pb-8 pt-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-mint-500 to-base-600 rounded-xl flex items-center justify-center shadow-inner">
              <span className="text-white font-bold text-sm leading-none">T</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-base-900 dark:text-white">{APP_NAME}</span>
          </div>
          <p className="max-w-md mx-auto">Built for your future self: fewer surprises, clearer choices, and a calmer month.</p>
        </footer>
      </div>
    </div>
  )
}

