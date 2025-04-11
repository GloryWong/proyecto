import { GITHUB_URL_PREFIX } from '../constants'

export function isValidGitUrl(url: string) {
  return new RegExp(`^${GITHUB_URL_PREFIX}[^/\\s]+\\/[^/\\s]+\\.git$`).test(url)
}
