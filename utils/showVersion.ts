import type { PackageJson } from 'type-fest'
import path from 'node:path'
import { readJson } from 'fs-extra'

export async function showVersion() {
  const package_: PackageJson = await readJson(path.join(import.meta.dir, 'package.json'))
  console.log(package_.version)
}
