import path from 'node:path'
import { expect, it, mock } from 'bun:test'
import { ensureDir } from 'fs-extra'
import { ROOT_DIR } from '../constants'
import { deleteProject } from '../delete-project'
import { mockConsole } from './__helpers__/mock-console'
import { mockModule } from './__helpers__/mock-module'

it('should print error and return false if anything wrong during deleting project', async () => {
  const { consoleErrorSpy } = mockConsole()
  await mockModule('./utils/projectExists', () => ({
    projectExists: mock().mockRejectedValue('wrong'),
  }))

  const result = await deleteProject('test')

  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('wrong'))
  expect(result).toBeFalse()
})

it('should delete project and return true if passed project name exists', async () => {
  mockConsole()
  const mockMoveToTrash = mock()
  await mockModule('./utils/moveToTrash.js', () => ({
    moveToTrash: mockMoveToTrash,
  }))
  await ensureDir(path.join(ROOT_DIR, 'test'))

  const result = await deleteProject('test')

  expect(mockMoveToTrash).toHaveBeenCalledWith('test')
  expect(result).toBeTrue()
})

it('should execute searching for a project if passed project name is empty', async () => {
  mockConsole()
  await mockModule('./utils/moveToTrash.js', () => ({
    moveToTrash: mock(),
  }))
  const mockSearchProject = mock()
  await mockModule('./utils/searchProject', () => ({
    searchProject: mockSearchProject,
  }))

  await deleteProject()

  expect(mockSearchProject).toHaveBeenCalled()
})

it('should print log and execute searching for a project if passed project does not exists', async () => {
  const { consoleLogSpy } = mockConsole()
  await mockModule('./utils/moveToTrash.js', () => ({
    moveToTrash: mock(),
  }))
  const mockSearchProject = mock()
  await mockModule('./utils/searchProject', () => ({
    searchProject: mockSearchProject,
  }))

  await deleteProject('test')

  expect(consoleLogSpy).toHaveBeenCalled()
  expect(mockSearchProject).toHaveBeenCalled()
})

it('should delete project and return true after searching for it', async () => {
  mockConsole()
  const mockMoveToTrash = mock()
  await mockModule('./utils/moveToTrash.js', () => ({
    moveToTrash: mockMoveToTrash,
  }))
  await ensureDir(path.join(ROOT_DIR, 'test'))
  await mockModule('./utils/searchProject', () => ({
    searchProject: mock(() => 'test'),
  }))

  const result = await deleteProject('non-existent')

  expect(mockMoveToTrash).toHaveBeenCalledWith('test')
  expect(result).toBeTrue()
})
