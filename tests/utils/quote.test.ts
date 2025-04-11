import { expect, it } from 'bun:test'
import { quote } from '../../utils/quote'

it('should return quoted text', () => {
  expect(quote('test')).toBe('\'test\'')
})

it('should return quoted text with tail', () => {
  expect(quote('test', '?')).toBe('\'test\'?')
})
