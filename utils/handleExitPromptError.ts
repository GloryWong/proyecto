import process from 'node:process'

/**
 * Handle ExitPromptError (Ctrl + c) gracefully
 * @param error the error thrown
 */
export function handleExitPromptError<T>(error: unknown): T {
  if (error instanceof Error && error.name === 'ExitPromptError') {
    process.exit()
  }
  else {
    // Rethrow unknown errors
    throw error
  }
}
