import { expect, it } from 'vitest'
import { ROOT_DIR } from '../../constants'
import { getProjectPath } from '../../utils/getProjectPath'

it('should return correct project path', async () => {
  expect(getProjectPath('test')).toBe(`${ROOT_DIR}/test`)
})
