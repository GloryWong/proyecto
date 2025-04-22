import chalk from 'chalk'
import { moveToTrash } from './utils/moveToTrash.js'
import { projectExists } from './utils/projectExists.js'
import { quote } from './utils/quote.js'
import { searchProject } from './utils/searchProject.js'

export async function deleteProject(name?: string) {
  try {
    if (name && await projectExists(name, { promptToOpen: false })) {
      await moveToTrash(name)
    }
    else {
      name && console.log(quote(name), 'does not exist.')
      const selected = await searchProject('Select a project to delete:')
      await moveToTrash(selected)
    }

    return true
  }
  catch (error) {
    console.error(chalk.red('Failed to delete project.', error))
    return false
  }
}
