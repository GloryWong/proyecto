import { GITHUB_URL_PREFIX } from '../constants'

export function normalizeGitUrl(url: string) {
  if (!url.startsWith(GITHUB_URL_PREFIX) && url.split('/').filter(v => !!v.trim()).length === 2) {
    return `${GITHUB_URL_PREFIX}${url.split('/').filter(v => !!v.trim()).map(v => v.trim()).join('/').replace('.git', '')}.git`
  }
  else {
    return url
  }
}
