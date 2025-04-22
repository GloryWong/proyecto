import { spyOn } from 'bun:test'

export function mockBuiltin<T extends keyof typeof globalThis.Bun>(builtIn: T, implementation?: typeof import('bun')[T] extends (...args: any[]) => any ? typeof import('bun')[T] : never) {
  const spy = spyOn(globalThis.Bun, builtIn)
  if (implementation)
    return spy.mockImplementation(implementation)
  return spy
}
