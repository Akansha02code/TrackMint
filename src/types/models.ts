export type Category =
  | 'Food'
  | 'Travel'
  | 'Shopping'
  | 'Bills'
  | 'Health'
  | 'Entertainment'
  | 'Education'
  | 'Other'

export type Expense = {
  id: string
  userId: string
  amount: number
  category: Category
  notes: string
  // ISO string in local time, e.g. 2026-03-17
  date: string
  createdAt: string
}

export type UserProfile = {
  id: string
  name: string
  email: string
}

export type AuthSession = {
  token: string
  user: UserProfile
}

