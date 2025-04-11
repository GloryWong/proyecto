import os from 'node:os'
import path from 'node:path'

// Names
export const APP_NAME = 'Proyecto'
export const CLI_NAME = 'proyecto'
export const ROOT_NAME = 'Projects'

// Directory paths
export const TMP_DIR = path.join(os.tmpdir(), APP_NAME)
export const ROOT_DIR = Bun.env.NODE_ENV === 'development' ? path.join(TMP_DIR, ROOT_NAME) : path.join(os.homedir(), ROOT_NAME)
