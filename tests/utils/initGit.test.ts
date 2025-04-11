import { expect, it } from 'bun:test'
import { ensureDir, readdir } from 'fs-extra'
import { initGit } from '../../utils/initGit'
import { mockBuiltin } from '../__helpers__/mock-builtin'
import { mockConsole } from '../__helpers__/mock-console'

it('should return false when git not is installed', () => {
  mockBuiltin('which').mockReturnValue(null)
  const { consoleErrorSpy } = mockConsole()

  expect(initGit('test')).resolves.toBeFalse()
  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('failed'), new Error('git not installed'))
})

it('should initialize dir with git and return true', async () => {
  const { consoleLogSpy } = mockConsole()

  await ensureDir('test-git')
  await initGit('test-git')

  expect(await readdir('test-git')).toContain('.git')
  expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('init'))
})
