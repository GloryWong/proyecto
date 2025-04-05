import chalk from 'chalk'
import { ensureDir } from 'fs-extra'
import { ROOT_DIR, TMP_DIR } from './constants.js'

export async function init() {
  try {
    await ensureDir(TMP_DIR)
    await ensureDir(ROOT_DIR)
    return true
  }
  catch (error) {
    console.error(chalk.red('Error: failed to init command.', error))
    return false
  }
}
