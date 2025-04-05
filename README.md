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
Proyecto - A local project manager

Usage: proyecto [command] [options]

Options:
  --help, -h                Show this help message
  --version, -v             Show version

Commands:
  create <name>             Create an empty project
    --open, -o              Open project in editor after created
    --no-git                Do not initialize with git
  clone <url>               Clone a git repository to create a project (Only support GitHub web URL)
    --open, -o              Open project in editor after cloned
  search                    Search for a project to open
```

## Contributing

Contributions are welcome! If you have ideas, bug fixes, or improvements, please
Open an issue or submit a pull request on the
[GitHub repository](https://github.com/GloryWong/proyecto).

## License

This project is licensed under the MIT License. See the LICENSE file for more
details.
