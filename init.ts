import { ensureDir } from "fs-extra";
import { ROOT_DIR, TMP_DIR } from "./constants";
import chalk from "chalk";

export async function init() {
  try {
    await ensureDir(TMP_DIR)
    await ensureDir(ROOT_DIR)
    return true
  } catch (error) {
    console.error(chalk.red('Error: failed to init command.', error))
    return false
  }
}
