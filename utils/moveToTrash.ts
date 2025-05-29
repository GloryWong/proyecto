import { join } from 'node:path'
import confirm from '@inquirer/confirm'
import { move } from 'fs-extra'
import timestamp from 'iso-timestamp'
import trash from 'trash'
import { getEnvPaths } from './getEnvPaths'
import { getProjectPath } from './getProjectPath'
import { handleExitPromptError } from './handleExitPromptError'
import { quote } from './quote'

export async function moveToTrash(name: string) {
  try {
    if (await confirm({
      message: `Are you sure to delete ${quote(name)}?`,
      default: false,
    }).catch(err => handleExitPromptError<boolean>(err))) {
      const projectPath = getProjectPath(name)
      if (Bun.which('trash') !== null) {
        await Bun.$`trash ${projectPath}`
        console.log('Deleted! Project', quote(name), 'was successfully moved to your system trash.')
        return true
      }

      try {
        await trash(projectPath)
        console.log('Deleted! Project', quote(name), 'was successfully moved to your system trash.')
        return true
      }
      catch {
        const { backups } = getEnvPaths()
        await move(projectPath, join(backups, `${name}.${timestamp({ excludeMillisecond: true })}`))
        console.log('Deleted! Project', quote(name), `was successfully moved to the backups directory (${backups}).`)
        return true
      }
    }
  }
  catch (error) {
    console.error('Failed to move', quote(name), 'to trash.', error)
    return false
  }
}
