#!/usr/bin/env bun

import type { PackageJson } from 'type-fest'
import path from 'node:path'
import { exit } from 'node:process'
import input from '@inquirer/input'
import { argv as _argv } from 'bun'
import chalk from 'chalk'
import { readJson } from 'fs-extra'
import minimist from 'minimist'
import { cloneProject } from './clone-project.js'
import { CLI_NAME } from './constants.js'
import { createEmptyProject } from './create-empty-project.js'
import { deleteProject } from './delete-project.js'
import { init } from './init.js'
import { openProject } from './open-project.js'
import { isValidProjectName } from './utils/isValidProjectName.js'
import { searchProject } from './utils/searchProject.js'
import { toExit } from './utils/toExit.js'
import './package.json' with { type: 'file' } // Instruct `bun compile` to embed the package.json

function showHelp() {
  console.log(`Proyecto - A Local Project Manager

Proyecto helps you manage your project directories effortlessly without interfering with their contents.

When open a project, it automatically detects the editor to use via the \`$EDITOR\`, \`$VISUAL\`, or \`$TERM_PROGRAM\` environment variables.  
If none of these are set, the system's default editor will be used.

If no valid command or option is provided, you will be prompted to select a project to open in your editor.

${chalk.bold('Usage')}:
  ${CLI_NAME} [command] [options]

${chalk.bold('Options')}:
  -h, --help                Show this help message
  -v, --version             Show the current version

${chalk.bold('Commands')}:
  open   <name>             Open an existing project in the editor
  create <name>             Create a new, empty project
    -o, --open              Automatically open the project in the editor after creation
        --no-git            Skip Git repository initialization
  clone <url>               Clone a GitHub repository to create a new project (Only GitHub web URLs are supported)
    -o, --open              Automatically open the project in the editor after cloning
  delete <name>             Delete an existing project`)
}

async function showVersion() {
  const package_: PackageJson = await readJson(path.join(import.meta.dir, 'package.json'))
  console.log(package_.version)
}

async function main() {
  const argv = minimist(_argv.slice(2), {
    boolean: ['help', 'version', 'git'],
    string: ['create', 'clone', 'search', 'delete'],
    alias: {
      h: 'help',
      v: 'version',
      o: 'open',
    },
  })

  if (!(await init())) {
    exit(1)
  }

  if (argv._.at(0) === 'open') {
    const name = argv._.at(1)?.trim()
    toExit(await openProject(name))
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

    toExit(await createEmptyProject(name, {
      git: argv.git,
      open: argv.open,
    }))
  }

  if (argv._.at(0) === 'clone') {
    const url = argv._.at(1)?.trim()
    if (!url) {
      console.error(chalk.red('Error: please enter the git repository url'))
      showHelp()
      exit(1)
    }

    toExit(await cloneProject(url, {
      open: argv.open,
    }))
  }

  if (argv._.at(0) === 'delete') {
    const name = argv._.at(1)?.trim()
    toExit(await deleteProject(name))
  }

  if (argv.version) {
    await showVersion()
    return
  }

  if (argv.help) {
    showHelp()
    return
  }

  // Anything else
  await searchProject('Select a project to open:', true)
}

main()
