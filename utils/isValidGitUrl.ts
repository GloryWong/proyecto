export function isValidGitUrl(url: string) {
  return /^https:\/\/github\.com\/[^/\s]+\/[^/\s]+\.git$/.test(url)
}
