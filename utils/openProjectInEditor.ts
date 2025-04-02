import { pathExists } from "fs-extra";
import { getProjectPath } from "./getProjectPath";
import { openInEditor } from "./openInEditor";
import { quote } from "./quote";

export async function openProjectInEditor(name: string) {
  const dir = getProjectPath(name)
  if (await pathExists(dir)) {
    console.error('Failed to open project', quote(name), '.', dir, 'does not exist.')
    return false
  }

  return openInEditor(getProjectPath(name))
}
