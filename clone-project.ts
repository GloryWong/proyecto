import confirm from '@inquirer/confirm'
import { $ } from 'bun'
import chalk from 'chalk'
import { ROOT_DIR } from './constants.js'
import { isValidGitUrl } from './utils/isValidGitUrl.js'
import { openProjectInEditor } from './utils/openProjectInEditor.js'
import { projectExists } from './utils/projectExists.js'
import { quote } from './utils/quote.js'

interface Options {
  /**
   * Whether open the project after cloned
   * @default false
   */
  open?: boolean
}

export async function cloneProject(url: string, options: Options = {}) {
  try {
    const { open = false } = options

    if (!isValidGitUrl(url)) {
      throw new Error('Invalid GitHub web URL.')
    }

    const name = (/([^/]+)\.git$/.exec(url))?.[1]
    if (!name) {
      throw new Error('Invalid GitHub web URL.')
    }

    if (await projectExists(name)) {
      return false
    }

    await $`git clone ${url}`.cwd(ROOT_DIR)
    console.log(chalk.green('Cloned project', quote(name)))

    if (open || await confirm({
      message: 'Do you want to open it?',
      default: true,
    })) {
      await openProjectInEditor(name)
    }

    return true
  }
  catch (error) {
    console.error(chalk.red('Error: failed to clone the project.', error))
    return false
  }
}
