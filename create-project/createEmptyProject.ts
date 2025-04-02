import path from "node:path";
import { ROOT_DIR } from "../constants";
import { confirm } from "../utils/confirm";
import { openInEditor } from "../utils/openInEditor";
import { ensureDir, pathExists } from "fs-extra";
import { initGit } from "../utils/initGit";
import chalk from "chalk";

interface Options {
  /**
   * Initialize with git
   * @default true
   */
  git?: boolean
  /**
   * whether open the project after created
   * @default false
   */
  open?: boolean
}

export async function createEmptyProject(name: string, options: Options = {}) {
  try {
    const { git = true, open = false } = options
    const dir = path.join(ROOT_DIR, name)

    if (await pathExists(dir)) {
      if (await confirm(`Project '${name}' already exists. Do you want to open it?`)) {
        await openInEditor(dir)
      }
      return false
    }

    await ensureDir(dir)
    console.log(chalk.green('Created project', `'${name}'!`))

    if (git) {
      await initGit(dir)
    }

    if (open || await confirm('Do you want to open it?', 'yes')) {
      await openInEditor(dir)
    }

    return true
  } catch (error) {
    console.error('Failed to create an empty project.', error)
    return false
  }
}
