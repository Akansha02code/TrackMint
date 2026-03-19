import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Card } from '../../components/common/Card'
import { Input } from '../../components/common/Input'
import { Button } from '../../components/common/Button'
import { useAuthStore } from '../../store/auth'
import { APP_NAME } from '../../constants/app'
import { AuthBackground } from '../../components/auth/AuthBackground'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type FormValues = z.infer<typeof schema>

export function LoginPage() {
  const nav = useNavigate()
  const { session, signIn, loading, error } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  return (
    <div className="min-h-screen grid place-items-center px-4 py-8 relative z-0">
      <AuthBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-lg md:scale-[1.05]"
      >
        {session ? (
          <Card className="p-4 mb-4 backdrop-blur-xl bg-white/40 dark:bg-black/40 border-white/20">
            <div className="text-sm">
              You’re already signed in as <span className="font-medium">{session.user.email}</span>.
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Button onClick={() => nav('/landing')}>Continue</Button>
              <Button variant="ghost" onClick={() => nav('/dashboard')}>
                Dashboard
              </Button>
            </div>
          </Card>
        ) : null}
        
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-3 p-3 rounded-2xl bg-gradient-to-tr from-white/40 to-white/10 dark:from-white/10 dark:to-white/5 shadow-lg backdrop-blur-md border border-white/20 dark:border-white/10"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/favicon.svg" alt="TrackMint Logo" className="w-full h-full object-contain filter drop-shadow-sm" />
            </div>
          </motion.div>
          <h1 className="font-serif text-4xl tracking-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-base-900 to-base-600 dark:from-white dark:to-white/70">
            Welcome back to {APP_NAME}
          </h1>
          <p className="text-sm text-[color:var(--muted)] mt-2 font-medium">
            Sign in to track your spending in real time.
          </p>
        </div>
        
        <Card className="p-8 backdrop-blur-3xl bg-white/70 dark:bg-base-950/70 shadow-[0_20px_50px_rgba(22,196,149,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white/60 dark:border-white/10 rounded-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-mint-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <form
            className="grid gap-5 relative z-10"
            onSubmit={handleSubmit(async (v) => {
              try {
                await signIn(v)
                nav('/landing', { replace: true })
              } catch {
                // store.error already set
              }
            })}
          >
            <div className="grid gap-1">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email')}
                className="bg-white/50 dark:bg-black/20 focus:bg-white dark:focus:bg-black/40 transition-colors h-12 text-base"
              />
            </div>
            <div className="grid gap-1">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
                className="bg-white/50 dark:bg-black/20 focus:bg-white dark:focus:bg-black/40 transition-colors h-12 text-base"
              />
            </div>

            {error ? (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-peach-700 dark:text-peach-300 bg-peach-50/80 dark:bg-peach-900/40 p-3 rounded-xl border border-peach-200 dark:border-peach-800"
              >
                {error}
              </motion.div>
            ) : null}

            <Button type="submit" disabled={loading} className="w-full mt-4 h-14 text-lg shadow-xl shadow-mint-500/30 bg-gradient-to-r from-mint-600 to-mint-500 hover:from-mint-700 hover:to-mint-600 hover:scale-[1.02] transition-all font-bold rounded-xl">
              Sign in
            </Button>
            
            <div className="text-sm text-center text-[color:var(--muted)] mt-4 pt-6 border-t border-base-200 dark:border-base-800/50">
              New here?{' '}
              <Link className="font-bold text-mint-600 dark:text-mint-400 hover:text-mint-800 transition-colors ml-1" to="/signup">
                Create an account
              </Link>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
