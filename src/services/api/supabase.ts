import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Api, AuthApi, ExpenseInput, FinanceApi } from './types'
import type { AuthSession, Expense, UserProfile } from '../../types/models'
import { randomId } from '../../lib/ids'

type SupabaseFactoryInput = {
  url: string
  anonKey: string
}

type ExpenseRow = {
  id: string
  user_id: string
  amount: number | string
  category: Expense['category']
  notes: string | null
  date: string
  created_at: string
}

// Schema expectation (see SUPABASE_SCHEMA.md in project root):
// - expenses: id, user_id, amount, category, notes, date, created_at
// - budgets: user_id, month, amount
export function supabaseApi({ url, anonKey }: SupabaseFactoryInput): Api {
  const supabase = createClient(url, anonKey)

  function toSession(
    s: Awaited<ReturnType<SupabaseClient['auth']['getSession']>>['data']['session'],
  ): AuthSession | null {
    if (!s?.user) return null
    const md = (s.user.user_metadata ?? {}) as { name?: string }
    return {
      token: s.access_token,
      user: {
        id: s.user.id,
        name: md.name ?? s.user.email ?? 'User',
        email: s.user.email ?? '',
      },
    }
  }

  const auth: AuthApi = {
    async getSession() {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      return toSession(data.session)
    },
    onAuthStateChange(cb) {
      const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
        cb(toSession(session))
      })
      return () => data.subscription.unsubscribe()
    },
    async signUp({ name, email, password }) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      })
      if (error) throw error
      // If email confirmation is enabled, session can be null.
      if (!data.session) {
        return {
          token: randomId(),
          user: { id: data.user?.id ?? randomId(), name, email },
        }
      }
      return toSession(data.session)!
    },
    async signIn({ email, password }) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return toSession(data.session)!
    },
    async signOut() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
  }

  const finance: FinanceApi = {
    async listExpenses(userId) {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (error) throw error
      return ((data ?? []) as ExpenseRow[]).map(
        (r): Expense => ({
          id: r.id,
          userId: r.user_id,
          amount: Number(r.amount),
          category: r.category,
          notes: r.notes ?? '',
          date: r.date,
          createdAt: r.created_at,
        }),
      )
    },
    async addExpense(userId, input: ExpenseInput) {
      const { data, error } = await supabase
        .from('expenses')
        .insert({
          user_id: userId,
          amount: input.amount,
          category: input.category,
          notes: input.notes,
          date: input.date,
        })
        .select('*')
        .single()
      if (error) throw error
      const r = data as unknown as ExpenseRow
      return {
        id: r.id,
        userId: r.user_id,
        amount: Number(r.amount),
        category: r.category,
        notes: r.notes ?? '',
        date: r.date,
        createdAt: r.created_at,
      }
    },
    async deleteExpense(userId, expenseId) {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', expenseId)
        .eq('user_id', userId)
      if (error) throw error
    },
    async getBudget(userId, month) {
      const { data, error } = await supabase
        .from('budgets')
        .select('amount')
        .eq('user_id', userId)
        .eq('month', month)
        .maybeSingle()
      if (error) throw error
      return data?.amount ? Number(data.amount) : 0
    },
    async setBudget(userId, month, amount) {
      const { error } = await supabase.from('budgets').upsert(
        {
          user_id: userId,
          month,
          amount,
        },
        { onConflict: 'user_id,month' },
      )
      if (error) throw error
      return amount
    },
    async resetMonth(userId, month, newBudget) {
      const { error: bErr } = await supabase.from('budgets').upsert(
        {
          user_id: userId,
          month,
          amount: newBudget,
        },
        { onConflict: 'user_id,month' },
      )
      if (bErr) throw bErr
      const { error: eErr } = await supabase
        .from('expenses')
        .delete()
        .eq('user_id', userId)
        .like('date', `${month}%`)
      if (eErr) throw eErr
    },
    subscribe(userId, cb) {
      const ch = supabase
        .channel(`etw:${userId}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'expenses', filter: `user_id=eq.${userId}` },
          () => cb(),
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'budgets', filter: `user_id=eq.${userId}` },
          () => cb(),
        )
        .subscribe()
      return () => {
        supabase.removeChannel(ch)
      }
    },
  }

  return {
    auth,
    finance,
    async getProfile(session: AuthSession): Promise<UserProfile> {
      return session.user
    },
  }
}
