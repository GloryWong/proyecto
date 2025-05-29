import path from 'node:path'
import { expect, it, mock } from 'bun:test'
import { ensureDir } from 'fs-extra'
import { ROOT_DIR } from '../constants'
import { createEmptyProject } from '../create-empty-project'
import { projectExists } from '../utils/projectExists'
import { mockConsole } from './__helpers__/mock-console'
import { mockModule } from './__helpers__/mock-module'

it('should print error and return false if the given name is not a valid project name', async () => {
  const { consoleErrorSpy } = mockConsole()
  await mockModule('@inquirer/confirm', () => ({
    default: mock(async () => undefined),
  }))

  const result = await createEmptyProject('@invalid-project-name')

  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringMatching(/invalid/i))
  expect(result).toBeFalse()
})

it('should return false if the given project name already exists', async () => {
  await mockModule('./utils/projectExists.js', () => ({
    projectExists: () => true,
  }))
  await ensureDir(path.join(ROOT_DIR, 'test'))

  const result = await createEmptyProject('test')

  expect(result).toBeFalse()
})

it('should prompt to confirm (with default true) creating a project with the given name', async () => {
  const mockConfirm = mock(async () => false)
  await mockModule('@inquirer/confirm', () => ({
    default: mockConfirm,
  }))

  const result = await createEmptyProject('test')
  expect(mockConfirm).toHaveBeenCalledWith(expect.objectContaining({
    message: expect.stringContaining('test'),
    default: true,
  }))
  expect(result).toBeFalse()
})

it('should create project and return true if confirmed', async () => {
  mockConsole()
  await mockModule('@inquirer/confirm', () => ({
    default: mock(async () => true),
  }))
  await mockModule('./utils/initGit.js', () => ({
    initGit: mock(),
  }))
  await mockModule('./utils/openProjectInEditor.js', () => ({
    openProjectInEditor: mock(),
  }))

  const result = await createEmptyProject('test')

  expect(await projectExists('test', { promptToOpen: false })).toBeTrue()
  expect(result).toBeTrue()
})

it('should init with git by default after project is created', async () => {
  mockConsole()
  await mockModule('@inquirer/confirm', () => ({
    default: mock(async () => true),
  }))
  const mockInitGit = mock()
  await mockModule('./utils/initGit.js', () => ({
    initGit: mockInitGit,
  }))
  await mockModule('./utils/openProjectInEditor.js', () => ({
    openProjectInEditor: mock(),
  }))

  await createEmptyProject('test')

  expect(mockInitGit).toHaveBeenCalled()
})

it('should not init with git after project is created if passed option `git` is false', async () => {
  mockConsole()
  await mockModule('@inquirer/confirm', () => ({
    default: mock(async () => true),
  }))
  const mockInitGit = mock()
  await mockModule('./utils/initGit.js', () => ({
    initGit: mockInitGit,
  }))
  await mockModule('./utils/openProjectInEditor.js', () => ({
    openProjectInEditor: mock(),
  }))

  await createEmptyProject('test', { git: false })

  expect(mockInitGit).not.toHaveBeenCalled()
})

it('should prompt to open project in editor (with default false) by default', async () => {
  mockConsole()
  const mockConfirm = mock(async () => true)
  await mockModule('@inquirer/confirm', () => ({
    default: mockConfirm,
  }))
  await mockModule('./utils/initGit.js', () => ({
    initGit: mock(),
  }))
  await mockModule('./utils/openProjectInEditor.js', () => ({
    openProjectInEditor: mock(),
  }))

  await createEmptyProject('test')

  expect(mockConfirm).toHaveBeenLastCalledWith(expect.objectContaining({
    default: false,
  }))
})

it('should open project in editor if passed option `open` is true', async () => {
  mockConsole()
  await mockModule('@inquirer/confirm', () => ({
    default: mock(async () => true),
  }))
  await mockModule('./utils/initGit.js', () => ({
    initGit: mock(),
  }))
  const mockOpenProjectInEditor = mock()
  await mockModule('./utils/openProjectInEditor.js', () => ({
    openProjectInEditor: mockOpenProjectInEditor,
  }))

  await createEmptyProject('test', { open: true })

  expect(mockOpenProjectInEditor).toHaveBeenCalledWith('test')
})
