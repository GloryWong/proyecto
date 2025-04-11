import { spyOn } from 'bun:test'

export function mockBuiltin<T extends keyof typeof globalThis.Bun>(builtIn: T) {
  return spyOn(globalThis.Bun, builtIn)
}
