import { expect, it, mock } from 'bun:test'
import { cloneProject } from '../clone-project'
import { mockBuiltin } from './__helpers__/mock-builtin'
import { mockConsole } from './__helpers__/mock-console'
import { mockModule } from './__helpers__/mock-module'

it('should print error and return false if the url is not a valid git url', async () => {
  const { consoleErrorSpy } = mockConsole()

  const result = await cloneProject('test.com')

  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringMatching(/invalid/i))
  expect(result).toBeFalse()
})

it('should print error and return false if the project name extracted from url is empty', async () => {
  const { consoleErrorSpy } = mockConsole()

  const result = await cloneProject('https://github.com/sample/.git')

  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringMatching(/invalid/i))
  expect(result).toBeFalse()
})

it('should return false if the project name extracted from url already exists', async () => {
  await mockModule('./utils/projectExists.js', () => ({
    projectExists: () => true,
  }))

  const result = await cloneProject('https://github.com/sample/test.git')

  expect(result).toBeFalse()
})

it('should clone git repo, print log and return true', async () => {
  const { consoleLogSpy } = mockConsole()
  await mockModule('@inquirer/confirm', () => ({
    default: mock(async () => undefined),
  }))
  await mockModule('./utils/openProjectInEditor.js', () => ({
    openProjectInEditor: mock(),
  }))
  mockBuiltin('$').mockImplementation(() => ({
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
    cwd: () => '',
  }))

  const result = await cloneProject('https://github.com/sample/test.git')

  expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringMatching(/test/))
  expect(result).toBeTrue()
})

it('should clone git repo with url of `userName/repoName`, print log and return true', async () => {
  const { consoleLogSpy } = mockConsole()
  await mockModule('@inquirer/confirm', () => ({
    default: mock(async () => undefined),
  }))
  await mockModule('./utils/openProjectInEditor.js', () => ({
    openProjectInEditor: mock(),
  }))
  mockBuiltin('$').mockImplementation(() => ({
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
    cwd: () => '',
  }))

  const result = await cloneProject('sample/test')

  expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringMatching(/test/))
  expect(result).toBeTrue()
})

it('should prompt to open project in editor with default false if the option `open` is false by default', async () => {
  mockConsole()
  const mockConfirm = mock(async () => undefined)
  await mockModule('@inquirer/confirm', () => ({
    default: mockConfirm,
  }))
  await mockModule('./utils/openProjectInEditor.js', () => ({
    openProjectInEditor: mock(),
  }))
  mockBuiltin('$').mockImplementation(() => ({
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
    cwd: () => '',
  }))

  await cloneProject('https://github.com/sample/test.git')
  expect(mockConfirm).toHaveBeenCalledWith(expect.objectContaining({
    default: false,
  }))
})

it('should open project in editor if the option `open` is true', async () => {
  mockConsole()
  await mockModule('@inquirer/confirm', () => ({
    default: mock(async () => undefined),
  }))
  const mockOpenProjectInEditor = mock()
  await mockModule('./utils/openProjectInEditor.js', () => ({
    openProjectInEditor: mockOpenProjectInEditor,
  }))
  mockBuiltin('$').mockImplementation(() => ({
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
    cwd: () => '',
  }))

  await cloneProject('https://github.com/sample/test.git', { open: true })
  expect(mockOpenProjectInEditor).toHaveBeenCalledWith('test')
})
