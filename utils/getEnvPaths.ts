import path from 'node:path'
import envPaths from 'env-paths'
import { APP_NAME } from '../constants'

export function getEnvPaths() {
  const ENV_PATHS = envPaths(APP_NAME)

  const tmp = ENV_PATHS.temp
  const data = ENV_PATHS.data
  const backups = path.join(data, 'backups')

  return {
    tmp,
    data,
    backups,
  }
}
