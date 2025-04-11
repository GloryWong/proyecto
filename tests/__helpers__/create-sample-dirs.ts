import path, { basename } from 'node:path'
import { mkdir, pathExists } from 'fs-extra'

export async function createSampleDirs(parentPath: string): Promise<string[]>
export async function createSampleDirs(parentPath: string, num: number): Promise<string[]>
export async function createSampleDirs(parentPath: string, names: string[]): Promise<string[]>
export async function createSampleDirs(parentPath: string, opt?: number | string[]) {
  if (!(await pathExists(parentPath)))
    throw new Error(`Failed to create sample dirs. Parent path ${parentPath} does not exist.`)

  let dirs: string[] = []
  if (Array.isArray(opt)) {
    dirs = opt.map(name => path.join(parentPath, name))
  }
  else {
    const num = opt === undefined ? 5 : opt
    dirs = Array.from({ length: num }).fill(undefined).map((_, index) => path.join(parentPath, `sample${index}`))
  }

  await Promise.allSettled(dirs.map(name => mkdir(name)))
  return dirs.map(v => basename(v))
}
