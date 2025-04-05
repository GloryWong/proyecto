import search from '@inquirer/search';
import { readdir } from 'fs-extra';
import { ROOT_DIR } from '../constants';
import fuzzysort from 'fuzzysort';
import { openProjectInEditor } from './openProjectInEditor';

export async function searchProject(message: string): Promise<string>
export async function searchProject(message: string, open: boolean): Promise<boolean>
export async function searchProject(message: string, open = false) {
  const list = await readdir(ROOT_DIR, { withFileTypes: true })
  const names = list.filter(v => v.isDirectory()).map(v => v.name)

  const answer = await search<string>({
    message,
    source: async (term) => {
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
