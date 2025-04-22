import path from 'node:path'
import { expect, it, mock } from 'bun:test'
import { ensureDir, readdir } from 'fs-extra'
import { ROOT_DIR } from '../../constants'
import { getEnvPaths } from '../../utils/getEnvPaths'
import { moveToTrash } from '../../utils/moveToTrash'
import { mockBuiltin } from '../__helpers__/mock-builtin'
import { mockConsole } from '../__helpers__/mock-console'
import { mockModule } from '../__helpers__/mock-module'

it('should print error and return false if anything wrong during move to trash', async () => {
  const { consoleErrorSpy } = mockConsole()
  await mockModule('@inquirer/confirm', () => ({
    default: mock().mockRejectedValue('wrong'),
  }))

  const result = await moveToTrash('test')

  expect(consoleErrorSpy).toHaveBeenCalled()
  expect(result).toBeFalse()
})

it('should prompt to confirm with default false', async () => {
  const mockConfirm = mock().mockResolvedValue(false)
  await mockModule('@inquirer/confirm', () => ({
    default: mockConfirm,
  }))

  await moveToTrash('test')

  expect(mockConfirm).toHaveBeenCalledWith(expect.objectContaining({
    message: expect.stringContaining('test'),
    default: false,
  }))
})

it('should move to trash with the system `trash` bin, print success, and return true if it exists', async () => {
  const { consoleLogSpy } = mockConsole()
  await mockModule('@inquirer/confirm', () => ({
    default: mock().mockResolvedValue(true),
  }))
  mockBuiltin('which').mockReturnValue('trash')
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  const mockShell = mockBuiltin('$').mockReturnValue()

  const result = await moveToTrash('test')

  expect(mockShell).toHaveBeenCalled()
  expect(consoleLogSpy).toHaveBeenCalled()
  expect(result).toBeTrue()
})

it('should move to trash with the `trash` lib, print success, and return true if it exists and the system `trash` bin does not exist', async () => {
  const { consoleLogSpy } = mockConsole()
  await mockModule('@inquirer/confirm', () => ({
    default: mock().mockResolvedValue(true),
  }))
  mockBuiltin('which').mockReturnValue(null)
  const mockTrash = mock()
  await mockModule('trash', () => ({
    default: mockTrash,
  }))

  const result = await moveToTrash('test')

  expect(mockTrash).toHaveBeenCalled()
  expect(consoleLogSpy).toHaveBeenCalled()
  expect(result).toBeTrue()
})

it('should move to the backup dir, print success, and return true if failed to execute the `trash` lib', async () => {
  const { consoleLogSpy } = mockConsole()
  await mockModule('@inquirer/confirm', () => ({
    default: mock().mockResolvedValue(true),
  }))
  mockBuiltin('which').mockReturnValue(null)
  await mockModule('trash', () => ({
    default: mock(async () => { throw new Error('wrong') }),
  }))
  await ensureDir(path.join(ROOT_DIR, 'test'))

  const result = await moveToTrash('test')

  const { backups } = getEnvPaths()
  const files = await readdir(backups)
  expect(files).toEqual([expect.stringMatching(/^test/)])
  expect(consoleLogSpy).toHaveBeenCalled()
  expect(result).toBeTrue()
})
