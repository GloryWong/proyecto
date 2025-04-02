import { createInterface } from "readline/promises"

async function question(query: string) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
  })

  const answer = await rl.question(query ?? '')
  rl.close()

  return answer
}

export async function confirm(query: string, defaultValue: 'yes' | 'no' = 'no') {
  const hint = defaultValue === 'yes' ? 'Y/n' : 'y/N'
  const answer = (await question(`${query} [${hint}] `)).toLocaleLowerCase() ||
    defaultValue

  if (['y', 'yes'].includes(answer)) return true
  if (['n', 'no'].includes(answer)) return false

  return confirm(query, defaultValue)
}
