import { expect, it, mock } from 'bun:test'
import { searchProjectAndOpen } from '../../utils/searchProjectAndOpen'
import { createTestProjects } from '../__helpers__/create-test-projects'
import { mockModule } from '../__helpers__/mock-module'

it('should open project of the searched term in editor', async () => {
  await createTestProjects([])
  await mockModule('./utils/searchProject.js', () => ({
    searchProject: async () => 'test',
  }))
  const mockOpenProjectInEditor = mock()
  await mockModule('./utils/openProjectInEditor.js', () => ({
    openProjectInEditor: mockOpenProjectInEditor,
  }))

  await searchProjectAndOpen('')

  expect(mockOpenProjectInEditor).toHaveBeenCalledWith('test')
})
