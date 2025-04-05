# Proyecto

Proyecto is a lightweight CLI tool for managing local projects.

## Install

### Homebrew

Install with [Homebrew CLI](https://brew.sh/):

```bash
brew tap GloryWong/homebrew-tap
brew install proyecto
```

Update:

```bash
brew update
brew upgrade proyecto
```

### NPM

NPM package proyecto relies on the Bun runtime. Please ensure that you have [Bun installed](https://bun.sh/docs/installation) before proceeding.

Install Proyecto globally using Bun:

```bash
bun add -g proyecto-cli
```

## Usage

To get started, run:

```bash
proyecto --help
```

Help output:

```
Proyecto - A Local Project Manager

Proyecto helps you manage your project directories effortlessly without interfering with their contents.

When open a project, it automatically detects the editor to use via the `$EDITOR`, `$VISUAL`, or `$TERM_PROGRAM` environment variables.  
If none of these are set, the system's default editor will be used.

If no valid command or option is provided, you will be prompted to select a project to open in your editor.

Usage:
  proyecto [command] [options]

Options:
  -h, --help                Show this help message
  -v, --version             Show the current version

Commands:
  open   <name>             Open an existing project in the editor
  create <name>             Create a new, empty project
    -o, --open              Automatically open the project in the editor after creation
        --no-git            Skip Git repository initialization
  clone <url>               Clone a GitHub repository to create a new project (Only GitHub web URLs are supported)
    -o, --open              Automatically open the project in the editor after cloning
  delete <name>             Delete an existing project
```

## Contributing

Contributions are welcome! If you have ideas, bug fixes, or improvements, please
Open an issue or submit a pull request on the
[GitHub repository](https://github.com/GloryWong/proyecto).

## License

This project is licensed under the MIT License. See the LICENSE file for more
details.
