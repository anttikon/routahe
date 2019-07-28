#!/usr/bin/env node
import { main } from './app'

main()
  .catch(e => process.env.DEBUG ? console.error(e) : console.error(e.message))
