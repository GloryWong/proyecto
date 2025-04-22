import os, { tmpdir } from 'node:os'
import path from 'node:path'

// Names
export const APP_NAME = 'Proyecto'
export const CLI_NAME = 'proyecto'
export const ROOT_NAME = 'Projects'

// Directory paths
export const ROOT_DIR = Bun.env.NODE_ENV === 'development' ? path.join(tmpdir(), ROOT_NAME) : path.join(os.homedir(), ROOT_NAME)

// Others
export const GITHUB_URL_PREFIX = 'https://github.com/'
