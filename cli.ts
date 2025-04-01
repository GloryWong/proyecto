#!/usr/bin/env zx

import { argv as _argv } from 'bun'
import { minimist, path } from 'zx'

function showHelp() {
  console.log(`
Usage: updown [options] [command]

Upload or download files to or from GitHub Gist

Commands:
  create                    Create an empty project

Options:
  --help, -h                Show this help message
  --version, -v             Show version

Environment variables:
  UPDOWN_UPLOAD_FORCE       The same to --force-upload
  UPDOWN_GIST_ID            The same to --gist-id
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
    boolean: ['help', 'version'],
    string: ['create'],
    alias: {
      h: 'help',
      v: 'version',
    },
  })

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
