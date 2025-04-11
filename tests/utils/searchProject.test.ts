import { expect, it, mock } from 'bun:test'
import { searchProject } from '../../utils/searchProject'
import { createTestProjects } from '../__helpers__/create-test-projects'
import { mockModule } from '../__helpers__/mock-module'

it('should return answer with successfully searched term', async () => {
  await createTestProjects(['test'], 5)
  const mockSearch = mock(async () => 'test')
  await mockModule('@inquirer/search', () => ({
    default: mockSearch,
  }))

  const result = await searchProject('to search')

  expect(result).toBe('test')
  expect(mockSearch).toHaveBeenCalledWith(expect.objectContaining({
    message: 'to search',
  }))
})

it('should open project in editor when open is set to true', async () => {
  await createTestProjects([])
  await mockModule('@inquirer/search', () => ({
    default: () => 'test',
  }))
  const mockOpenProjectInEditor = mock()
  await mockModule('./utils/openProjectInEditor.js', () => ({
    openProjectInEditor: mockOpenProjectInEditor,
  }))

  await searchProject('', true)

  expect(mockOpenProjectInEditor).toHaveBeenCalledWith('test')
})
