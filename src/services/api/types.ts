import type { AuthSession, Expense, UserProfile } from '../../types/models'

export type ExpenseInput = {
  amount: number
  category: Expense['category']
  notes: string
  date: string // yyyy-MM-dd
}

export type AuthApi = {
  getSession(): Promise<AuthSession | null>
  onAuthStateChange(cb: (session: AuthSession | null) => void): () => void
  signUp(input: {
    name: string
    email: string
    password: string
  }): Promise<AuthSession>
  signIn(input: { email: string; password: string }): Promise<AuthSession>
  signOut(): Promise<void>
}

export type FinanceApi = {
  listExpenses(userId: string): Promise<Expense[]>
  addExpense(userId: string, input: ExpenseInput): Promise<Expense>
  deleteExpense(userId: string, expenseId: string): Promise<void>

  getBudget(userId: string, month: string): Promise<number>
  setBudget(userId: string, month: string, amount: number): Promise<number>
  resetMonth(userId: string, month: string, newBudget: number): Promise<void>

  subscribe(userId: string, cb: () => void): () => void
}

export type Api = {
  auth: AuthApi
  finance: FinanceApi
  getProfile(session: AuthSession): Promise<UserProfile>
}

