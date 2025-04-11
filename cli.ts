#!/usr/bin/env bun

import { main } from './main.js'
import { toExit } from './utils/toExit.js'

toExit(await main(Bun.argv.splice(2)))
