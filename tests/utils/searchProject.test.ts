import { expect, it, mock } from 'bun:test'
import { searchProject } from '../../utils/searchProject'
import { createTestProjects } from '../__helpers__/create-test-projects'
import { mockModule } from '../__helpers__/mock-module'

it('should return answer successfully', async () => {
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

// it('should use initial given term to search', async () => {
//   await createTestProjects(['test'], 5)
//   const mockSearch = mock(async () => 'test')
//   await mockModule('@inquirer/search', () => ({
//     default: mockSearch,
//   }))
//   const mockProcess = stdin.p
//   await mockModule('node:process', () => ({
//     default: {
//       stdio
//     }
//   }))

//   const result = await searchProject('to search', 'test')

//   expect(result).toBe('test')
//   expect(mockSearch).toHaveBeenCalledWith(expect.objectContaining({
//     message: 'to search',
//   }))
// })
