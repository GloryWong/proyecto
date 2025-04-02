#!/usr/bin/env bun

import { argv as _argv } from 'bun'
import { init } from './init'
import { createEmptyProject } from './create-project/createEmptyProject'
import { exit } from 'node:process'
import { toExit } from './utils/toExit'
import path from 'node:path'
import minimist from 'minimist'
import chalk from 'chalk'

function showHelp() {
  console.log(`
Proyecto - A local project manager

Usage: pro [command] [options]

Options:
  --help, -h                Show this help message
  --version, -v             Show version

Commands:
  create <name>             Create an empty project
    --no-git                Do not initialize with git
    --open                  Open in editor after created
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
    string: ['create'],
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
