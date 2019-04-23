#!/usr/bin/env node
import program from 'commander'
import { parseArguments } from './parser'
import { getLocationByQuery } from './location'

import { getRouteRows, getTripRow, getRouteHeaderRow } from './routahe'
import { fetchRoute, formatQueryBody } from './fetch-route'
import { gray, bold } from 'chalk'

const action = async parsed => {
  if (!parsed.from || !parsed.to || process.argv.length < 3) {
    return printHelp()
  }

  const [from, to] = await Promise.all([getLocationByQuery(parsed.from), getLocationByQuery(parsed.to)])

  if (!from) {
    throw new Error(`Cannot find: ${parsed.from}`)
  } else if (!to) {
    throw new Error(`Cannot find: ${parsed.to}`)
  }

  console.log(bold(getTripRow(from, to)))

  const body = formatQueryBody({ from, to, dateTime: parsed.dateTime, arriveBy: parsed.arriveBy })
  const routes = await fetchRoute({ url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', body })

  routes.forEach(route => {
    console.log(getRouteHeaderRow(route))
    console.log(`${getRouteRows(route)}\n`)
  })
}

function printHelp() {
  console.log('  Examples:')
  console.log('')
  console.log(gray('    Default from - to usage'))
  console.log('    $ routahe kamppi pasila')
  console.log('')
  console.log(gray('    Specify departure time'))
  console.log('    $ routahe kamppi pasila 5:30')
  console.log('')
  console.log(gray('    Specify arrival time with @'))
  console.log('    $ routahe kamppi pasila @12:30')
  console.log('')
  console.log(gray('    Specify date with time'))
  console.log('    $ routahe kamppi pasila 12:30 24.12.')
  console.log('')
}

program.on('--help', () => printHelp())

program
  .arguments('[arg1] [arg2] [arg3] [arg4]')
  .action((arg1, arg2, arg3, arg4) =>
    action(parseArguments([arg1, arg2, arg3, arg4])).catch(e => console.log('Error with action', e))
  )
  .parse(process.argv)
