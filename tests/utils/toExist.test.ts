import { expect, it, mock } from 'bun:test'
import { toExit } from '../../utils/toExit'
import { mockModule } from '../__helpers__/mock-module'

it.each([
  [0, true],
  [1, false],
])('should exit with %p when the param is %p', async (expected, param) => {
  const mockExit = mock()
  await mockModule('node:process', () => ({
    exit: mockExit,
  }))

  toExit(param)

  expect(mockExit).toHaveBeenCalledWith(expected)
})
