import { expect, it, mock } from 'bun:test'
import { openProjectInEditor } from '../../utils/openProjectInEditor'
import { mockConsole } from '../__helpers__/mock-console'
import { mockModule } from '../__helpers__/mock-module'

it('should return false when project name does not exist', async () => {
  const { consoleErrorSpy } = mockConsole()
  await mockModule('./utils/projectExists.js', () => ({
    projectExists: mock(async () => false),
  }))

  const result = await openProjectInEditor('test-name')

  expect(result).toBeFalse()
  expect(consoleErrorSpy).toHaveBeenCalled()
})
