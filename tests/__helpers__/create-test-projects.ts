import { ensureDir } from 'fs-extra'
import { ROOT_DIR } from '../../constants'
import { createSampleDirs } from './create-sample-dirs'

export async function createTestProjects(names: string[], sampleNum = 0) {
  await ensureDir(ROOT_DIR)
  return [...await createSampleDirs(ROOT_DIR, names), ...await createSampleDirs(ROOT_DIR, sampleNum)]
}
