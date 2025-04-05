import { exit } from 'node:process'

/**
 * Exit process
 * @param bool exit with code 0 if true, otherwise 1
 */
export function toExit(bool: boolean) {
  exit(bool ? 0 : 1)
}
