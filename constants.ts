import path from "node:path";
import os, { tmpdir } from "node:os";

// Names
export const APP_NAME = 'proyecto-cli'
export const CLI_NAME = 'proyecto'
export const ROOT_NAME = 'Projects'

// Directory paths
export const TMP_DIR = path.join(tmpdir(), APP_NAME)
export const ROOT_DIR = Bun.env.NODE_ENV === 'development' ? path.join(TMP_DIR, ROOT_NAME) : path.join(os.homedir(), ROOT_NAME)
