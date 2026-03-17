export function randomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  // Fallback, good enough for local mode.
  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`
}

