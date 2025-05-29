import { openProjectInEditor } from './openProjectInEditor'
import { searchProject } from './searchProject'

export async function searchProjectAndOpen(...args: Parameters<typeof searchProject>) {
  const answer = await searchProject(...args)
  return openProjectInEditor(answer)
}
