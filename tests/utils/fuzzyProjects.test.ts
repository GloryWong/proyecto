import { expect, it } from 'bun:test'
import { fuzzyProjects } from '../../utils/fuzzyProjects'
import { createTestProjects } from '../__helpers__/create-test-projects'

it('should return all projects when no term provided', async () => {
  const names = await createTestProjects([], 5)

  expect(fuzzyProjects(names)).toEqual(names)
  expect(fuzzyProjects(names, '')).toEqual(names)
  expect(fuzzyProjects(names, ' ')).toEqual(names)
})

it('should return at least given term if exists', async () => {
  const names = await createTestProjects(['test'], 5)
  expect(fuzzyProjects(names, 'test')).toContain('test')
})
