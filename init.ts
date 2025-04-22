import chalk from 'chalk'
import { ensureDir } from 'fs-extra'
import { ROOT_DIR } from './constants.js'
import { getEnvPaths } from './utils/getEnvPaths.js'

export async function init() {
  try {
    await ensureDir(ROOT_DIR)
    const paths = getEnvPaths()
    for (const path of Object.values(paths)) {
      await ensureDir(path)
    }
    return true
  }
  catch (error) {
    console.error(chalk.red('Error: failed to init command.', error))
    return false
  }
}
