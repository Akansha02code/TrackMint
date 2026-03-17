import { endOfMonth, format, isSameMonth, parseISO, startOfMonth } from 'date-fns'

export function monthKey(d: Date): string {
  return format(d, 'yyyy-MM')
}

export function parseExpenseDate(isoDate: string): Date {
  // Stored as yyyy-MM-dd; parseISO treats it as local time.
  return parseISO(isoDate)
}

export function isInMonth(expenseDateIso: string, target: Date): boolean {
  return isSameMonth(parseExpenseDate(expenseDateIso), target)
}

export function monthRange(d: Date): { from: Date; to: Date } {
  return { from: startOfMonth(d), to: endOfMonth(d) }
}

export function daysRemainingInMonth(today = new Date()): number {
  const end = endOfMonth(today)
  // inclusive remaining days, e.g. on 17th: end - today + 1
  const start = new Date(today)
  start.setHours(0, 0, 0, 0)
  const ms = end.getTime() - start.getTime()
  return Math.max(0, Math.floor(ms / (24 * 60 * 60 * 1000)) + 1)
}
