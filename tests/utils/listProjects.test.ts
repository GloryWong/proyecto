import path from 'node:path'
import { expect, it } from 'bun:test'
import { writeFile } from 'fs-extra'
import { ROOT_DIR } from '../../constants'
import { listProjects } from '../../utils/listProjects'
import { createTestProjects } from '../__helpers__/create-test-projects'

it('should list all valid projects', async () => {
  // create valid sample projects
  const projectNames = await createTestProjects([], 5)
  // create invalid projects
  await createTestProjects(['.test', '_test', 'test test', '@test'])
  // create a file
  await writeFile(path.join(ROOT_DIR, 'sample-file'), '')

  const names = await listProjects()

  expect(names.sort()).toEqual(projectNames.sort())
})
