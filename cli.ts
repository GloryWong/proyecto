#!/usr/bin/env bun

import { argv as _argv } from 'bun'
import { init } from './init'
import { createEmptyProject } from './create-project/createEmptyProject'
import { exit } from 'node:process'
import { toExit } from './utils/toExit'
import path from 'node:path'
import minimist from 'minimist'
import chalk from 'chalk'
import { CLI_NAME } from './constants'
import { cloneProject } from './create-project/cloneProject'

function showHelp() {
  console.log(`
Proyecto - A local project manager

Usage: ${CLI_NAME} [command] [options]

Options:
  --help, -h                Show this help message
  --version, -v             Show version

Commands:
  create <name>             Create an empty project
    --open                  Open project in editor after created
    --no-git                Do not initialize with git
  clone <url>               Clone a git repository to create a project (Only support GitHub web URL)
    --open                  Open project in editor after cloned
`)
}

async function showVersion() {
  const version = (await Bun.file(
    path.join(import.meta.dirname, 'version.txt'),
  ).text()).trim()
  console.log(version)
}

async function main() {
  const argv = minimist(_argv.slice(2), {
    boolean: ['help', 'version', 'git'],
    string: ['create', 'clone'],
    alias: {
      h: 'help',
      v: 'version',
    },
  })

  if (!(await init())) exit(1)

  if (argv._.at(0) === 'create') {
    const name = argv._.at(1)?.trim()
    if (!name) {
      console.error(chalk.red('Error: please enter a name for the project'))
      showHelp()
      exit(1)
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

  if (argv['version']) {
    await showVersion()
    return
  }

  if (argv['help']) {
    showHelp()
    return
  }
}

main()
