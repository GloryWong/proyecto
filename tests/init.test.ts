import { expect, it, mock } from 'bun:test'
import { init } from '../init'
import { mockConsole } from './__helpers__/mock-console'
import { mockModule } from './__helpers__/mock-module'

it('should print error and return false if anything throw error during init', async () => {
  const { consoleErrorSpy } = mockConsole()
  await mockModule('fs-extra', () => ({
    ensureDir: mock().mockRejectedValue('wrong'),
  }))

  const result = await init()

  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringMatching(/failed/i))
  expect(result).toBeFalse()
})

it('should return true if init successfully', async () => {
  await mockModule('fs-extra', () => ({
    ensureDir: mock(),
  }))

  const result = await init()

  expect(result).toBeTrue()
})
