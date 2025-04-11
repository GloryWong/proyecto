import chalk from 'chalk'
import { APP_NAME, CLI_NAME } from '../constants'

export function showHelp() {
  console.log(`${APP_NAME} - A Local Project Manager

${APP_NAME} helps you manage your project directories effortlessly without interfering with their contents.

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
  clone <url>               Clone a GitHub repository to create a new project (GitHub web URLs or \`user-name/repo-name\`)
    -o, --open              Automatically open the project in the editor after cloning
  delete <name>             Delete an existing project`)
}
