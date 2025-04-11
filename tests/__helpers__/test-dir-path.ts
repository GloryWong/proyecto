import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { APP_NAME } from '../../constants'

export const TEST_DIR = join(tmpdir(), `${APP_NAME}-test-dir`)
