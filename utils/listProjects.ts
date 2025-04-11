import { readdir } from 'fs-extra'
import { ROOT_DIR } from '../constants'
import { isValidProjectName } from './isValidProjectName'

export async function listProjects() {
  const list = await readdir(ROOT_DIR, { withFileTypes: true })
  const names = list.filter(v => v.isDirectory() && isValidProjectName(v.name).valid).map(v => v.name)
  return names
}
