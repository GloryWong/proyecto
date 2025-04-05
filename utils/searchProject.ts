import search from '@inquirer/search'
import { readdir } from 'fs-extra'
import fuzzysort from 'fuzzysort'
import { ROOT_DIR } from '../constants.js'
import { openProjectInEditor } from './openProjectInEditor.js'

export async function searchProject(message: string): Promise<string>
export async function searchProject(message: string, open: boolean): Promise<boolean>
export async function searchProject(message: string, open = false) {
  const list = await readdir(ROOT_DIR, { withFileTypes: true })
  const names = list.filter(v => v.isDirectory()).map(v => v.name)

  const answer = await search<string>({
    message,
    async source(term) {
      if (!term?.trim()) {
        return names
      }

      return fuzzysort.go(term, names).map(v => v.target)
    },
  })

  if (open) {
    return openProjectInEditor(answer)
  }

  return answer
}
