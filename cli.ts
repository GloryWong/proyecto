#!/usr/bin/env bun

import { argv as _argv } from 'bun'
import { init } from './init'
import { createEmptyProject } from './create-empty-project'
import { exit } from 'node:process'
import { toExit } from './utils/toExit'
import path from 'node:path'
import minimist from 'minimist'
import chalk from 'chalk'
import { CLI_NAME } from './constants'
import { cloneProject } from './clone-project'
import { readJson } from 'fs-extra'
import type { PackageJson } from "type-fest";
import './package.json' with { type: 'file' } // instruct `bun compile` to embed the package.json
import input from '@inquirer/input'
import { isValidProjectName } from './utils/isValidProjectName'
import { deleteProject } from './delete-project'
import { openProject } from './open-project'
import { searchProject } from './utils/searchProject'

function showHelp() {
  console.log(`Proyecto - A local project manager.

Proyecto simply manages your project directories, and does not intervene in their contents.
The editor used to open projects is auto-detected via environments $EDITOR or $VISUAL or $TERM_PROGRAM,
if none of them is set, the system default editor is used.
You are prompt to select a project to open in editor if no valid command and option is used.

${chalk.bold('Usage')}:
  ${CLI_NAME} [command] [options]

${chalk.bold('Options')}:
  -h, --help                Show this help message
  -v, --version             Show version

${chalk.bold('Commands')}:
  open   <name>             Open a project in editor
  create <name>             Create an empty project
    -o, --open              Open project in editor after created
        --no-git            Skip git initialization
  clone <url>               Clone a git repository to create a project (Only support GitHub web URL)
    -o, --open              Open project in editor after cloned
  delete <name>             Delete a project`)
}

async function showVersion() {
  const pkg: PackageJson = await readJson(path.join(import.meta.dir, 'package.json'))
  console.log(pkg.version)
}

async function main() {
  const argv = minimist(_argv.slice(2), {
    boolean: ['help', 'version', 'git'],
    string: ['create', 'clone', 'search', 'delete'],
    alias: {
      h: 'help',
      v: 'version',
      o: 'open'
    },
  })

  if (!(await init())) exit(1)

  if (argv._.at(0) === 'open') {
    const name = argv._.at(1)?.trim()
    toExit(await openProject(name))
  }

  if (argv._.at(0) === 'create') {
    let name = argv._.at(1)?.trim()
    if (!name) {
      name = await input({
        message: 'Enter project name:',
        required: true,
        validate: (val) => {
          const { error } = isValidProjectName(val)
          return error ? error : true
        }
      })
    }

    toExit(await createEmptyProject(name, {
      git: argv['git'],
      open: argv['open']
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
      open: argv['open']
    }))
  }

  if (argv._.at(0) === 'delete') {
    const name = argv._.at(1)?.trim()
    toExit(await deleteProject(name))
  }

  if (argv['version']) {
    await showVersion()
    return
  }

  if (argv['help']) {
    showHelp()
    return
  }

  // Anything else
  await searchProject('Select a project to open:', true)
}

main()
