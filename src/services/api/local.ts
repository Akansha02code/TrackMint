import type { Api, AuthApi, FinanceApi } from './types'
import type { AuthSession, Expense, UserProfile } from '../../types/models'
import { randomId } from '../../lib/ids'
import { readJson, writeJson } from '../../lib/storage'

type LocalUser = UserProfile & {
  passwordHash: string
  salt: string
}

type LocalSession = AuthSession & { createdAt: string }

const KEYS = {
  users: 'etw.users',
  session: 'etw.session',
  expenses: (userId: string) => `etw.expenses.${userId}`,
  budgets: (userId: string) => `etw.budgets.${userId}`,
}

const channel =
  typeof window !== 'undefined' && 'BroadcastChannel' in window
    ? new BroadcastChannel('etw')
    : null

function notify(kind: string, userId: string) {
  channel?.postMessage({ kind, userId, at: Date.now() })
}

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function hashPassword(password: string, salt: string): Promise<string> {
  return sha256(`${salt}::${password}`)
}

function readUsers(): LocalUser[] {
  return readJson<LocalUser[]>(KEYS.users, [])
}

function writeUsers(users: LocalUser[]) {
  writeJson(KEYS.users, users)
}

function readSession(): LocalSession | null {
  return readJson<LocalSession | null>(KEYS.session, null)
}

function writeSession(session: LocalSession | null) {
  if (!session) {
    localStorage.removeItem(KEYS.session)
    return
  }
  writeJson(KEYS.session, session)
}

function publicSession(s: LocalSession): AuthSession {
  return { token: s.token, user: s.user }
}

function readExpenses(userId: string): Expense[] {
  return readJson<Expense[]>(KEYS.expenses(userId), [])
}

function writeExpenses(userId: string, expenses: Expense[]) {
  writeJson(KEYS.expenses(userId), expenses)
  notify('expenses', userId)
}

function readBudgets(userId: string): Record<string, number> {
  return readJson<Record<string, number>>(KEYS.budgets(userId), {})
}

function writeBudgets(userId: string, budgets: Record<string, number>) {
  writeJson(KEYS.budgets(userId), budgets)
  notify('budgets', userId)
}

function makeAuth(): AuthApi {
  const listeners = new Set<(s: AuthSession | null) => void>()

  function emit() {
    const s = readSession()
    const pub = s ? publicSession(s) : null
    for (const cb of listeners) cb(pub)
  }

  function storageListener(e: StorageEvent) {
    if (e.key === KEYS.session) emit()
  }

  window.addEventListener('storage', storageListener)

  return {
    async getSession() {
      const s = readSession()
      return s ? publicSession(s) : null
    },
    onAuthStateChange(cb) {
      listeners.add(cb)
      cb(readSession() ? publicSession(readSession()!) : null)
      return () => listeners.delete(cb)
    },
    async signUp({ name, email, password }) {
      const users = readUsers()
      const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (existing) throw new Error('Email already registered.')

      const salt = randomId()
      const passwordHash = await hashPassword(password, salt)
      const user: LocalUser = {
        id: randomId(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        salt,
        passwordHash,
      }
      users.push(user)
      writeUsers(users)

      const session: LocalSession = {
        token: randomId(),
        createdAt: new Date().toISOString(),
        user: { id: user.id, name: user.name, email: user.email },
      }
      writeSession(session)
      emit()
      return publicSession(session)
    },
    async signIn({ email, password }) {
      const users = readUsers()
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (!user) throw new Error('Invalid email or password.')
      const passwordHash = await hashPassword(password, user.salt)
      if (passwordHash !== user.passwordHash) throw new Error('Invalid email or password.')

      const session: LocalSession = {
        token: randomId(),
        createdAt: new Date().toISOString(),
        user: { id: user.id, name: user.name, email: user.email },
      }
      writeSession(session)
      emit()
      return publicSession(session)
    },
    async signOut() {
      writeSession(null)
      emit()
    },
  }
}

function makeFinance(): FinanceApi {
  return {
    async listExpenses(userId) {
      return readExpenses(userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    },
    async addExpense(userId, input) {
      const now = new Date().toISOString()
      const expense: Expense = {
        id: randomId(),
        userId,
        amount: input.amount,
        category: input.category,
        notes: input.notes,
        date: input.date,
        createdAt: now,
      }
      const expenses = readExpenses(userId)
      expenses.push(expense)
      writeExpenses(userId, expenses)
      return expense
    },
    async deleteExpense(userId, expenseId) {
      const expenses = readExpenses(userId).filter((e) => e.id !== expenseId)
      writeExpenses(userId, expenses)
    },
    async getBudget(userId, month) {
      const budgets = readBudgets(userId)
      return budgets[month] ?? 0
    },
    async setBudget(userId, month, amount) {
      const budgets = readBudgets(userId)
      budgets[month] = amount
      writeBudgets(userId, budgets)
      return amount
    },
    async resetMonth(userId, month, newBudget) {
      const budgets = readBudgets(userId)
      budgets[month] = newBudget
      writeBudgets(userId, budgets)
      const expenses = readExpenses(userId).filter((e) => !e.date.startsWith(month))
      writeExpenses(userId, expenses)
    },
    subscribe(userId, cb) {
      const storageListener = (e: StorageEvent) => {
        if (!e.key) return
        if (e.key === KEYS.expenses(userId) || e.key === KEYS.budgets(userId)) cb()
      }
      window.addEventListener('storage', storageListener)
      const onMsg = (ev: MessageEvent) => {
        const msg = ev.data as { kind?: string; userId?: string } | null
        if (!msg?.kind) return
        if (msg.userId !== userId) return
        cb()
      }
      channel?.addEventListener('message', onMsg)
      return () => {
        window.removeEventListener('storage', storageListener)
        channel?.removeEventListener('message', onMsg)
      }
    },
  }
}

export function localApi(): Api {
  const auth = makeAuth()
  const finance = makeFinance()

  return {
    auth,
    finance,
    async getProfile(session) {
      return session.user
    },
  }
}
