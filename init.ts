import { ensureDir } from "fs-extra";
import { ROOT_DIR } from "./constants";
import chalk from "chalk";

export async function init() {
  try {
    await ensureDir(ROOT_DIR)
    return true
  } catch (error) {
    console.error(chalk.red('Failed to init command.', error))
    return false
  }
}
