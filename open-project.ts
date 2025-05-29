import chalk from 'chalk'
import { openProjectInEditor } from './utils/openProjectInEditor.js'
import { projectExists } from './utils/projectExists.js'
import { quote } from './utils/quote.js'
import { searchProjectAndOpen } from './utils/searchProjectAndOpen.js'

export async function openProject(name?: string) {
  try {
    if (name && await projectExists(name, { promptToOpen: false })) {
      await openProjectInEditor(name)
    }
    else {
      name && console.log(quote(name), 'does not exist.')
      await searchProjectAndOpen('Select a project to open:', name)
    }

    return true
  }
  catch (error) {
    console.error(chalk.red('Failed to open project.', error))
    return false
  }
}
