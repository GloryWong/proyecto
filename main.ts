import input from '@inquirer/input'
import chalk from 'chalk'
import minimist from 'minimist'
import { cloneProject } from './clone-project.js'
import { createEmptyProject } from './create-empty-project.js'
import { deleteProject } from './delete-project.js'
import { init } from './init.js'
import { openProject } from './open-project.js'
import { isValidProjectName } from './utils/isValidProjectName.js'
import { searchProject } from './utils/searchProject.js'
import { showHelp } from './utils/showHelp.js'
import { showVersion } from './utils/showVersion.js'
import './package.json' with { type: 'file' } // Instruct `bun compile` to embed the package.json

export async function main(_argv: string[]) {
  const argv = minimist(_argv, {
    boolean: ['help', 'version', 'open', 'git'],
    string: ['create', 'clone', 'search', 'delete'],
    alias: {
      h: 'help',
      v: 'version',
      o: 'open',
    },
    default: {
      open: false,
      git: true,
    },
  })

  if (!(await init())) {
    return false
  }

  if (argv._.at(0) === 'open') {
    const name = argv._.at(1)?.trim()
    return openProject(name)
  }

  if (argv._.at(0) === 'create') {
    let name = argv._.at(1)?.trim()
    name ||= await input({
      message: 'Enter project name:',
      required: true,
      validate(value) {
        const { error } = isValidProjectName(value)
        return error || true
      },
    })

    return createEmptyProject(name, {
      git: argv.git,
      open: argv.open,
    })
  }

  if (argv._.at(0) === 'clone') {
    const url = argv._.at(1)?.trim()
    if (!url) {
      console.error(chalk.red('Error: please enter the git repository url'))
      showHelp()
      return false
    }

    return cloneProject(url, {
      open: argv.open,
    })
  }

  if (argv._.at(0) === 'delete') {
    const name = argv._.at(1)?.trim()
    return deleteProject(name)
  }

  if (argv.version) {
    await showVersion()
    return true
  }

  if (argv.help) {
    showHelp()
    return true
  }

  // Anything else
  return searchProject('Select a project to open:', true)
}
