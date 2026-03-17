import { useMemo } from 'react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { CATEGORIES } from '../../constants/categories'
import { Modal } from '../common/Modal'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { useAuthStore } from '../../store/auth'
import { useFinanceStore } from '../../store/finance'
import type { Category } from '../../types/models'

const schema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((v) => {
      const n = Number(v)
      return Number.isFinite(n) && n > 0
    }, 'Amount must be greater than 0'),
  category: z.enum(CATEGORIES as [string, ...string[]]),
  notes: z.string().max(80).optional().default(''),
  date: z.string().min(10),
})

type FormValues = z.input<typeof schema>

export function ExpenseFormModal({
  open,
  onClose,
  defaultDate,
}: {
  open: boolean
  onClose(): void
  defaultDate: Date
}) {
  const { session } = useAuthStore()
  const finance = useFinanceStore()

  const defaultValues = useMemo<FormValues>(
    () => ({
      amount: '',
      category: 'Food',
      notes: '',
      date: format(defaultDate, 'yyyy-MM-dd'),
    }),
    [defaultDate],
  )

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  async function onSubmit(values: FormValues) {
    if (!session) return
    try {
      const parsed = schema.parse(values)
      await finance.addExpense(session.user.id, {
        amount: Number(parsed.amount),
        category: parsed.category as Category,
        notes: parsed.notes ?? '',
        date: parsed.date,
      })
      toast.success('Expense added')
      onClose()
      reset(defaultValues)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to add expense')
    }
  }

  return (
    <Modal
      open={open}
      title="Add expense"
      onClose={() => {
        onClose()
        reset(defaultValues)
      }}
    >
      <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <Input
              label="Amount (INR)"
              type="number"
              inputMode="numeric"
              step="1"
              placeholder="e.g. 250"
              error={errors.amount?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <label className="block">
              <div className="text-sm font-medium mb-1">Category</div>
              <select
                className="focus-ring h-11 w-full rounded-xl2 px-3 bg-white/60 dark:bg-white/5 border border-white/60 dark:border-white/10 text-sm"
                {...field}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          )}
        />

        <Controller
          control={control}
          name="notes"
          render={({ field }) => (
            <Input
              label="Notes"
              placeholder="e.g. lunch with friends"
              error={errors.notes?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <Input
              label="Date"
              type="date"
              error={errors.date?.message}
              {...field}
            />
          )}
        />

        <div className="flex items-center justify-end gap-2 mt-1">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Add
          </Button>
        </div>
      </form>
    </Modal>
  )
}
