import path from 'node:path'
import { expect, it, mock } from 'bun:test'
import { ensureDir } from 'fs-extra'
import { ROOT_DIR } from '../constants'
import { openProject } from '../open-project'
import { mockConsole } from './__helpers__/mock-console'
import { mockModule } from './__helpers__/mock-module'

it('should print error and return false if anything wrong during opening project', async () => {
  const { consoleErrorSpy } = mockConsole()
  await mockModule('./utils/projectExists', () => ({
    projectExists: mock().mockRejectedValue('wrong'),
  }))

  const result = await openProject('test')

  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('wrong'))
  expect(result).toBeFalse()
})

it('should open the project and return true if passed project name exists', async () => {
  await ensureDir(path.join(ROOT_DIR, 'test'))
  const mockOpenProjectInEditor = mock()
  await mockModule('./utils/openProjectInEditor', () => ({
    openProjectInEditor: mockOpenProjectInEditor,
  }))

  const result = await openProject('test')

  expect(mockOpenProjectInEditor).toHaveBeenCalledWith('test')
  expect(result).toBeTrue()
})

it('should execute searching for a project with open true if passed project name is empty', async () => {
  mockConsole()
  await mockModule('./utils/openProjectInEditor', () => ({
    openProjectInEditor: mock(),
  }))
  const mockSearchProject = mock()
  await mockModule('./utils/searchProject', () => ({
    searchProject: mockSearchProject,
  }))

  await openProject()

  expect(mockSearchProject).toHaveBeenCalledWith(expect.any(String), true)
})

it('should print log and execute searching for a project with open true if passed project name does not exists', async () => {
  const { consoleLogSpy } = mockConsole()
  await mockModule('./utils/openProjectInEditor', () => ({
    openProjectInEditor: mock(),
  }))
  const mockSearchProject = mock()
  await mockModule('./utils/searchProject', () => ({
    searchProject: mockSearchProject,
  }))

  await openProject('test')

  expect(consoleLogSpy).toHaveBeenCalled()
  expect(mockSearchProject).toHaveBeenCalledWith(expect.any(String), true)
})
