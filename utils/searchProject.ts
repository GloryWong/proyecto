import process from 'node:process'
import search from '@inquirer/search'
import { fuzzyProjects } from './fuzzyProjects.js'
import { handleExitPromptError } from './handleExitPromptError.js'
import { listProjects } from './listProjects.js'

export async function searchProject(message: string, term?: string) {
  const names = await listProjects()

  try {
    if (term) {
      process.stdin.push(term)
    }
  }
  catch { }

  const answer = await search<string>({
    message,
    async source(term) {
      return fuzzyProjects(names, term)
    },
  }).catch(err => handleExitPromptError<string>(err))

  return answer
}
