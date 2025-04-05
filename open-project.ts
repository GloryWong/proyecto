import chalk from 'chalk'
import { openProjectInEditor } from './utils/openProjectInEditor.js'
import { projectExists } from './utils/projectExists.js'
import { quote } from './utils/quote.js'
import { searchProject } from './utils/searchProject.js'

export async function openProject(name?: string) {
  try {
    if (name && await projectExists(name, { promptToOpen: false })) {
      await openProjectInEditor(name)
    }
    else {
      name && console.log(quote(name), 'does not exist.')
      await searchProject('Select a project to open:', true)
    }

    return true
  }
  catch (error) {
    console.error(chalk.red('Failed to open project.', error))
    return false
  }
}
