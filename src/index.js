#!/usr/bin/env node
import { main } from './app'

main(process.argv)
  .catch(e => process.env.DEBUG ? console.error(e) : console.error(e.message))
