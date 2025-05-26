import confirm from '@inquirer/confirm'
import chalk from 'chalk'
import { ensureDir } from 'fs-extra'
import { getProjectPath } from './utils/getProjectPath.js'
import { initGit } from './utils/initGit.js'
import { isValidProjectName } from './utils/isValidProjectName.js'
import { openProjectInEditor } from './utils/openProjectInEditor.js'
import { projectExists } from './utils/projectExists.js'
import { quote } from './utils/quote.js'

interface Options {
  /**
   * Initialize with git
   * @default true
   */
  git?: boolean
  /**
   * Whether open the project after created
   * @default false
   */
  open?: boolean
}

export async function createEmptyProject(name: string, options: Options = {}) {
  try {
    const result = isValidProjectName(name)
    if (!result.valid) {
      throw new Error(`Invalid project name: ${result.error}`)
    }

    const { git = true, open = false } = options

    const existent = await projectExists(name)
    if (existent) {
      return false
    }

    if (!(await confirm({
      message: `Are you sure to create an empty project called ${quote(name)}?`,
      default: true,
    }))) {
      return false
    }

    const dir = getProjectPath(name)
    await ensureDir(dir)
    console.log(chalk.green('Created project', quote(name, '!')))

    if (git) {
      await initGit(dir)
    }

    if (open || await confirm({
      message: 'Do you want to open it?',
      default: false,
    })) {
      await openProjectInEditor(name)
    }

    return true
  }
  catch (error) {
    console.error(chalk.red('Error: failed to create an empty project.', error))
    return false
  }
}
