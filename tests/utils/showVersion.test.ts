import { expect, it } from 'bun:test'
import { showVersion } from '../../utils/showVersion'
import { mockConsole } from '../__helpers__/mock-console'
import { mockModule } from '../__helpers__/mock-module'

it('should show version', async () => {
  const { consoleLogSpy } = mockConsole()
  await mockModule('fs-extra', () => ({
    readJson: async () => ({ version: '1.1.1' }),
  }))

  await showVersion()

  expect(consoleLogSpy).toHaveBeenCalledWith('1.1.1')
})
