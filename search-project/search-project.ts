import search from '@inquirer/search';
import { readdir } from 'fs-extra';
import { ROOT_DIR } from '../constants';
import fuzzysort from 'fuzzysort';
import { openProjectInEditor } from '../utils/openProjectInEditor';

export async function searchProject() {
  const list = await readdir(ROOT_DIR, { withFileTypes: true })
  const names = list.filter(v => v.isDirectory()).map(v => v.name)

  const answer = await search<string>({
    message: 'Select a project to open:',
    source: async (term) => {
      if (!term?.trim()) {
        return names
      }

      return fuzzysort.go(term, names).map(v => v.target)
    },
  })

  return await openProjectInEditor(answer)
}
