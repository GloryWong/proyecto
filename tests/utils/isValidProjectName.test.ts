import { expect, it } from 'bun:test'
import { isValidProjectName } from '../../utils/isValidProjectName'

it.each([
  '',
  Array.from({ length: 51 }).fill('a').join(''),
])('should return valid false when name length is smaller than 1 or larger than 50', (str) => {
  expect(isValidProjectName(str)).toEqual({
    valid: false,
    error: expect.stringMatching(/.[^\n\r1\u2028\u2029]*1.+50/),
  })
})

it.each([
  '!',
  '.test',
  '@test',
  'test test',
  '_test',
  'test-',
])('should return valid false when given name is %p', (str) => {
  expect(isValidProjectName(str)).toEqual({
    valid: false,
    error: expect.stringMatching(/alphanumeric.+hyphens.+underscores.+cannot start or end with a hyphen or underscore/),
  })
})

it.each([
  '123test',
  'test123',
  'test-test',
  'test_test',
])('should return valid true when given name is %p', (str) => {
  expect(isValidProjectName(str)).toEqual({
    valid: true,
  })
})
