import { $, which } from 'bun'

export async function initGit(dir: string) {
  try {
    if (which('git')) {
      await $`git init --quiet`.cwd(dir)
      console.log('Git initialzed')
    }
    else {
      throw new Error('git not installed')
    }

    return true
  }
  catch (error) {
    console.error('Error: failed to initialzed with git.', error)
    return false
  }
}
