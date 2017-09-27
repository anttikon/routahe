import moment from 'moment'
import { maxBy, minBy } from 'lodash'
import RouteQuery from './query/RouteQuery'
import { emoji } from 'node-emoji'
import { bold, gray, green, cyan, blue, yellow, magenta, white } from 'chalk'
import Table from './Table'

const emojis = {
  'WALK': emoji.walking,
  'RAIL': emoji.train,
  'BUS': emoji.bus,
  'TRAM': emoji.tram,
  'SUBWAY': emoji.metro,
  'FERRY': emoji.ferry
}

function createTable(header) {
  return new Table({
    header,
    columns: ['spacer', 'time', 'mode', 'shortName', 'arrow', 'destination'],
    columnModifiers: [
      { condition: (row) => true, modifier: bold, columns: ['shortName'] },
      { condition: (row) => row.mode.includes('WALK'), modifier: gray, columns: ['spacer', 'mode'] },
      { condition: (row) => row.mode.includes('RAIL'), modifier: magenta, columns: ['spacer', 'mode'] },
      { condition: (row) => row.mode.includes('BUS'), modifier: blue, columns: ['spacer', 'mode'] },
      { condition: (row) => row.mode.includes('TRAM'), modifier: green, columns: ['spacer', 'mode'] },
      { condition: (row) => row.mode.includes('SUBWAY'), modifier: yellow, columns: ['spacer', 'mode'] },
      { condition: (row) => row.mode.includes('FERRY'), modifier: cyan, columns: ['spacer', 'mode'] },
    ]
  })
}

export const fetchRoutes = (from, to, dateTime, arriveBy) => new RouteQuery().fetch({ from, to, dateTime, arriveBy })

export const routeToTable = (route) => {
  const startTime = moment(minBy(route.legs, 'startTime').startTime)
  const endTime = moment(maxBy(route.legs, 'endTime').endTime)

  const header = `\n${startTime.format('HH:mm')} - ${endTime.format('HH:mm')} ${endTime.diff(startTime, 'minutes')}min`
  const table = createTable(header)

  route.legs.forEach(leg => {
    const shortName = leg.route && leg.route.shortName ? leg.route.shortName : ''
    table.addRow({
      spacer: '  |',
      time: `${moment(leg.startTime).format('HH:mm')} - ${moment(leg.endTime).format('HH:mm')}`,
      mode: `${emojis[leg.mode]} ${leg.mode}`,
      shortName: shortName,
      arrow: '->',
      destination: leg.to.name
    })
  })

  return table
}

export const printHelp = () => {
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

export const printFromTo = (addressFrom, addressTo) => console.log(bold(`${addressFrom.label} ${gray('->')} ${addressTo.label}`))