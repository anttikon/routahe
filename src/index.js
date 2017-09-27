#!/usr/bin/env node
import program from 'commander'
import { parseArguments } from './parser'
import { getLocationByQuery } from './location'

import { fetchRoutes, routeToTable, printFromTo, printHelp } from './routahe'

const action = async (parsed) => {
  if (!parsed.from || !parsed.to) {
    return printHelp()
  }

  const [addressFrom, addressTo] = await Promise.all([
    getLocationByQuery(parsed.from),
    getLocationByQuery(parsed.to)
  ])

  if (!addressFrom || !addressTo) {
    throw new Error('Cannot find place')
  }

  printFromTo(addressFrom, addressTo)

  const routes = await fetchRoutes(addressFrom, addressTo, parsed.dateTime, parsed.arriveBy)
  const tables = routes.map(route => routeToTable(route))
  tables.forEach(table => table.print())
}

program.on('--help', () => printHelp())

if (process.argv.length < 3) {
  printHelp()
}

program
  .arguments('[arg1] [arg2] [arg3] [arg4]')
  .action((arg1, arg2, arg3, arg4) => action(parseArguments([arg1, arg2, arg3, arg4]))
    .catch(e => console.log('Error with action', e)))
  .parse(process.argv)