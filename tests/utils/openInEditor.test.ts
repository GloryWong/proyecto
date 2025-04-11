import { expect, it, mock } from 'bun:test'
import { openInEditor } from '../../utils/openInEditor'
import { mockConsole } from '../__helpers__/mock-console'
import { mockModule } from '../__helpers__/mock-module'

it('should print error and return false if anything wrong during opening', async () => {
  const { consoleErrorSpy } = mockConsole()
  await mockModule('open-editor', () => ({
    default: mock().mockRejectedValue('wrong'),
  }))

  const result = await openInEditor('testfile', {
    editor: 'any-editor',
  })

  expect(consoleErrorSpy).toHaveBeenCalled()
  expect(result).toBeFalse()
})

it('should use given editor and return true if it is passed through the options', async () => {
  mockConsole()
  const openEditorMock = mock()
  await mockModule('open-editor', () => ({
    default: openEditorMock,
  }))

  const result = await openInEditor('testfile', {
    editor: 'any-editor',
  })

  expect(openEditorMock).toHaveBeenCalledWith(expect.arrayContaining([]), {
    editor: 'any-editor',
  })
  expect(result).toBeTrue()
})

it('should use the default editor and return true if no editor passed in', async () => {
  mockConsole()
  const openEditorMock = mock()
  await mockModule('open-editor', () => ({
    default: openEditorMock,
  }))

  const result = await openInEditor('testfile')

  expect(openEditorMock).toHaveBeenCalledWith(expect.arrayContaining([]), expect.objectContaining({}))
  expect(result).toBeTrue()
})
