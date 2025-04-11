import { expect, it } from 'bun:test'
import { showHelp } from '../../utils/showHelp'
import { mockConsole } from '../__helpers__/mock-console'

it('should show help', () => {
  const { consoleLogSpy } = mockConsole()

  showHelp()

  expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(String))
})
