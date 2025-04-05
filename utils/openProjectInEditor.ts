import { getProjectPath } from './getProjectPath.js'
import { openInEditor } from './openInEditor.js'
import { projectExists } from './projectExists.js'
import { quote } from './quote.js'

export async function openProjectInEditor(name: string) {
  if (!(await projectExists(name, { promptToOpen: false }))) {
    console.error('Failed to open project', quote(name, '.'), getProjectPath(name), 'does not exist.')
    return false
  }

  return openInEditor(getProjectPath(name))
}
