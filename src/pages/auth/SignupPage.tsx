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
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type FormValues = z.infer<typeof schema>

export function SignupPage() {
  const nav = useNavigate()
  const { signUp, loading, error } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '' },
  })

  return (
    <div className="min-h-screen grid place-items-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-5">
          <div className="font-serif text-4xl tracking-tight">Create your {APP_NAME} account</div>
          <div className="text-sm text-[color:var(--muted)] mt-1">
            Your budget dashboard, in a browser.
          </div>
        </div>
        <Card className="p-5">
          <form
            className="grid gap-3"
            onSubmit={handleSubmit(async (v) => {
              try {
                await signUp(v)
                nav('/landing', { replace: true })
              } catch {
                // store.error already set
              }
            })}
          >
            <Input
              label="Name"
              placeholder="Akansha"
              error={errors.name?.message}
              {...register('name')}
            />
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
              placeholder="At least 6 characters"
              error={errors.password?.message}
              {...register('password')}
            />

            {error ? (
              <div className="text-sm text-peach-700 dark:text-peach-200">
                {error}
              </div>
            ) : null}

            <Button type="submit" disabled={loading}>
              Sign up
            </Button>
            <div className="text-sm text-[color:var(--muted)]">
              Already have an account?{' '}
              <Link className="underline" to="/login">
                Sign in
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
