import { expect, it } from 'bun:test'
import { normalizeGitUrl } from '../../utils/normalizeGitUrl'

type Act = 'normalized' | 'original'

it.each<[act: Act, input: string]>([
  ['normalized', 'user/repo'],
  ['normalized', 'user/repo.git'],
  ['normalized', 'user/repo.git/'],
  ['normalized', '/user/repo'],
  ['normalized', '/ / user/repo'],
  ['normalized', 'user/repo/'],
  ['original', 'https://github.com/user/repo.git'],
  ['original', 'https://test.com/user/repo.git'],
  ['original', 'test.com/user/repo.git'],
  ['original', 'test.com/user/repo'],
])('should return %p url if input is %p', (expectAct, input) => {
  const act: Act = normalizeGitUrl(input) === input ? 'original' : 'normalized'

  expect(act).toBe(expectAct)
})
