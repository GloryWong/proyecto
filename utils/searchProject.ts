import search from '@inquirer/search'
import { fuzzyProjects } from './fuzzyProjects.js'
import { handleExitPromptError } from './handleExitPromptError.js'
import { listProjects } from './listProjects.js'
import { openProjectInEditor } from './openProjectInEditor.js'

export async function searchProject(message: string): Promise<string>
export async function searchProject(message: string, open: boolean): Promise<boolean>
export async function searchProject(message: string, open = false) {
  const names = await listProjects()

  const answer = await search<string>({
    message,
    async source(term) {
      return fuzzyProjects(names, term)
    },
  }).catch(err => handleExitPromptError<string>(err))
  if (open) {
    return openProjectInEditor(answer)
  }

  return answer
}
