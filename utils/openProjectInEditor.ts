import { pathExists } from "fs-extra";
import { getProjectPath } from "./getProjectPath";
import { openInEditor } from "./openInEditor";
import { quote } from "./quote";
import { projectExists } from "./projectExists";

export async function openProjectInEditor(name: string) {
  if (!(await projectExists(name, { promptToOpen: false }))) {
    console.error('Failed to open project', quote(name, '.'), getProjectPath(name), 'does not exist.')
    return false
  }

  return openInEditor(getProjectPath(name))
}
