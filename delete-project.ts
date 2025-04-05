import confirm from '@inquirer/confirm'
import chalk from 'chalk'
import trash from 'trash'
import { getProjectPath } from './utils/getProjectPath.js'
import { projectExists } from './utils/projectExists.js'
import { quote } from './utils/quote.js'
import { searchProject } from './utils/searchProject.js'

async function moveToTrash(name: string) {
  if (await confirm({
    message: `Are you sure to delete ${quote(name)}?`,
    default: false,
  })) {
    await trash(getProjectPath(name))
    console.log('Deleted! Project', quote(name), 'was successfully moved to your system trash.')
  }
}

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
