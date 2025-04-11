import { spyOn } from 'bun:test'

export function mockConsole() {
  const consoleLogSpy = spyOn(console, 'log').mockImplementation(() => undefined)
  const consoleErrorSpy = spyOn(console, 'error').mockImplementation(() => undefined)
  return {
    consoleLogSpy,
    consoleErrorSpy,
  }
}
