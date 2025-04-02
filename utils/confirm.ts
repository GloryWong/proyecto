import { createInterface } from "readline/promises"
import { stdin, stdout } from "node:process";

async function question(query: string) {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    terminal: true
  })

  const answer = await rl.question(query ?? '')
  rl.close()

  return answer
}

export type ConfirmDefaultValue = 'yes' | 'no'

export async function confirm(query: string, defaultValue: ConfirmDefaultValue = 'no') {
  const hint = defaultValue === 'yes' ? 'Y/n' : 'y/N'
  const answer = (await question(`${query} [${hint}] `)).toLocaleLowerCase() ||
    defaultValue

  if (['y', 'yes'].includes(answer)) return true
  if (['n', 'no'].includes(answer)) return false

  return confirm(query, defaultValue)
}
