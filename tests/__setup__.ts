import path from 'node:path'
import { chdir, cwd } from 'node:process'
import { afterEach, beforeEach, mock } from 'bun:test'
import { ensureDir, remove } from 'fs-extra'
import { ROOT_NAME } from '../constants'
import { clearAllModuleMocks, mockModule } from './__helpers__/mock-module'
import { TEST_DIR } from './__helpers__/test-dir-path'

const _cwd = cwd()

beforeEach(async () => {
  await ensureDir(TEST_DIR)
  chdir(TEST_DIR)

  await mockModule('./constants', () => ({
    ROOT_DIR: path.join(TEST_DIR, ROOT_NAME),
  }))

  await mockModule('./utils/getEnvPaths.js', () => ({
    getEnvPaths: () => ({
      tmp: path.join(TEST_DIR, 'tmp'),
      data: path.join(TEST_DIR, 'data'),
      backups: path.join(TEST_DIR, 'data', 'backups'),
    }),
  }))
})

afterEach(async () => {
  mock.restore() // restore all spies
  clearAllModuleMocks()
  chdir(_cwd)
  await remove(TEST_DIR)
})
