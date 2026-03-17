import { create } from 'zustand'
import { getApi } from '../services/api'
import type { Expense } from '../types/models'
import type { ExpenseInput } from '../services/api/types'
import { monthKey } from '../lib/dates'

type FinanceState = {
  expenses: Expense[]
  budget: number
  month: string
  loading: boolean
  error: string | null
  init(userId: string): Promise<() => void>
  refresh(userId: string): Promise<void>
  addExpense(userId: string, input: ExpenseInput): Promise<void>
  deleteExpense(userId: string, id: string): Promise<void>
  setBudget(userId: string, amount: number): Promise<void>
  resetMonth(userId: string, newBudget: number): Promise<void>
  setMonth(month: string): void
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  expenses: [],
  budget: 0,
  month: monthKey(new Date()),
  loading: false,
  error: null,
  async init(userId) {
    await get().refresh(userId)
    const api = getApi()
    const unsub = api.finance.subscribe(userId, async () => {
      // Any mutation (from this tab or another) triggers a refresh.
      await get().refresh(userId)
    })
    return unsub
  },
  async refresh(userId) {
    set({ loading: true, error: null })
    try {
      const api = getApi()
      const [expenses, budget] = await Promise.all([
        api.finance.listExpenses(userId),
        api.finance.getBudget(userId, get().month),
      ])
      set({ expenses, budget, loading: false })
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : 'Failed to load data.',
        loading: false,
      })
    }
  },
  async addExpense(userId, input) {
    set({ error: null })
    await getApi().finance.addExpense(userId, input)
    await get().refresh(userId)
  },
  async deleteExpense(userId, id) {
    set({ error: null })
    await getApi().finance.deleteExpense(userId, id)
    await get().refresh(userId)
  },
  async setBudget(userId, amount) {
    set({ error: null })
    await getApi().finance.setBudget(userId, get().month, amount)
    await get().refresh(userId)
  },
  async resetMonth(userId, newBudget) {
    set({ error: null })
    await getApi().finance.resetMonth(userId, get().month, newBudget)
    await get().refresh(userId)
  },
  setMonth(month) {
    set({ month })
  },
}))

