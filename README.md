# proyecto

A lightweight CLI to manage local projects.

## Install

```bash
npm install -g proyecto

# pnpm add -g proyecto
# yarn add -g proyecto
# bun add -g proyecto
```

## Usage

```bash
pro --help
```

```
Proyecto - A local project manager

Usage: ${CLI_NAME} [command] [options]

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
