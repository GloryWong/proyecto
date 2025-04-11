// Note: as v1.2.9, Bun hasn't provided implementations to restore module mocks.
// So I needs to hack it by myself.
import path from 'node:path'
import { cwd } from 'node:process'
import { mock } from 'bun:test'

const _cwd = cwd()

interface MockResult {
  clear: () => void
}

const mocks: MockResult[] = []

function normalizeModulePath(modulePath: string) {
  return modulePath.startsWith('.') ? path.resolve(_cwd, modulePath) : modulePath
}

/**
 * Mock a module.
 * @param modulePath relative path (started with '.') is resolved, relative to the current working directory where the test bin runs
 */
export async function mockModule(modulePath: string, renderMocks: () => Record<string, any>) {
  const _modulePath = normalizeModulePath(modulePath)
  const original = {
    ...(await import(_modulePath)),
  }
  const result = {
    ...original,
    ...renderMocks(),
  }
  mock.module(_modulePath, () => result)

  mocks.push({
    clear: () => {
      mock.module(_modulePath, () => original)
    },
  })
}

export function clearAllModuleMocks() {
  mocks.forEach(mockResult => mockResult.clear())
  mocks.splice(0) // to empty
}
