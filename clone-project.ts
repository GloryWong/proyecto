import { $ } from "bun";
import chalk from "chalk";
import { isValidGitUrl } from "./utils/isValidGitUrl";
import { ROOT_DIR } from "./constants";
import { projectExists } from "./utils/projectExists";
import { quote } from "./utils/quote";
import confirm from '@inquirer/confirm';
import { openProjectInEditor } from "./utils/openProjectInEditor";

interface Options {
  /**
   * whether open the project after cloned
   * @default false
   */
  open?: boolean
}

export async function cloneProject(url: string, options: Options = {}) {
  try {
    const { open = false } = options

    if (!isValidGitUrl(url))
      throw 'Invalid GitHub web URL.'

    const name = url.match(/([^\/]+)\.git$/)?.[1]
    if (!name)
      throw 'Invalid GitHub web URL.'

    if (await projectExists(name))
      return false

    await $`git clone ${url}`.cwd(ROOT_DIR)
    console.log(chalk.green('Cloned project', quote(name)))

    if (open || await confirm({
      message: 'Do you want to open it?',
      default: true
    })) {
      await openProjectInEditor(name)
    }

    return true
  } catch (error) {
    console.error(chalk.red('Error: failed to clone the project.', error))
    return false
  }
}
