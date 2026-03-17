import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '../../components/common/Card'
import { Input } from '../../components/common/Input'
import { Button } from '../../components/common/Button'
import { useAuthStore } from '../../store/auth'
import { APP_NAME } from '../../constants/app'

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
    <div className="min-h-screen grid place-items-center px-4 py-8">
      <div className="w-full max-w-md">
        {session ? (
          <Card className="p-4 mb-4">
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
        <div className="text-center mb-5">
          <div className="font-serif text-4xl tracking-tight">Welcome back to {APP_NAME}</div>
          <div className="text-sm text-[color:var(--muted)] mt-1">
            Sign in to track your spending in real time.
          </div>
        </div>
        <Card className="p-5">
          <form
            className="grid gap-3"
            onSubmit={handleSubmit(async (v) => {
              try {
                await signIn(v)
                nav('/landing', { replace: true })
              } catch {
                // store.error already set
              }
            })}
          >
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />

            {error ? (
              <div className="text-sm text-peach-700 dark:text-peach-200">
                {error}
              </div>
            ) : null}

            <Button type="submit" disabled={loading}>
              Sign in
            </Button>
            <div className="text-sm text-[color:var(--muted)]">
              New here?{' '}
              <Link className="underline" to="/signup">
                Create an account
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
