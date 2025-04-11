import { expect, it } from 'bun:test'
import { isValidGitUrl } from '../../utils/isValidGitUrl'

it.each([
  [false, 'http://github.com/a/b.git'],
  [false, 'github.com/a/b.git'],
  [false, 'https://test.com/a/b.git'],
  [false, 'https://github.com/a/b'],
  [true, 'https://github.com/a/b.git'],
])('should return %p when given string is %p', (expected, str) => {
  expect(isValidGitUrl(str)).toBe(expected)
})
