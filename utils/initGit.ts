export async function initGit(dir: string) {
  try {
    if (Bun.which('git')) {
      await Bun.$`git init --quiet`.cwd(dir)
      console.log('Git initialzed')
    }
    else {
      throw new Error('git not installed')
    }

    return true
  }
  catch (error: any) {
    console.error('Error: failed to initialzed with git.', error)
    return false
  }
}
