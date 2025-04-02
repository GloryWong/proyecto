
import { pathExists } from "fs-extra"
import { confirm, type ConfirmDefaultValue } from "./confirm"
import { quote } from "./quote"
import { getProjectPath } from "./getProjectPath"
import { openProjectInEditor } from "./openProjectInEditor"

interface Options {
  /**
   * Prompt for a confirmation to open in editor
   * @default true
   */
  promptToOpen?: boolean
  /**
   * Default value for the confirmation
   * @default 'no'
   */
  promptToOpenDefault?: ConfirmDefaultValue
}

export async function projectExists(name: string, options: Options = {}) {
  const { promptToOpen = true, promptToOpenDefault = 'no' } = options
  const dir = getProjectPath(name)

  if (await pathExists(dir)) {
    if (promptToOpen && await confirm(`Project ${quote(name)} already exists. Do you want to open it?`, promptToOpenDefault)) {
      await openProjectInEditor(name)
    }
    return true
  }

  return false
}
