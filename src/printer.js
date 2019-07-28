import { blueBright, bold, cyan, gray, green, magenta, yellow } from 'chalk'
import moment from 'moment'
import Table from 'cli-table/lib'
import tableStyle from './tableStyle'

export const printLocations = (args) => {
  console.log(bold(`${args.from.label} ${gray('->')} ${args.to.label}`))
  return args
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

const getRowProps = mode => {
  switch (mode) {
    case 'WALK':
      return { emoji: String.fromCodePoint(0x1f6b6), color: gray, name: mode }
    case 'RAIL':
      return { emoji: String.fromCodePoint(0x1f685), color: magenta, name: mode }
    case 'BUS':
      return { emoji: String.fromCodePoint(0x1f68c), color: blueBright, name: mode }
    case 'TRAM':
      return { emoji: String.fromCodePoint(0x1f683), color: green, name: mode }
    case 'SUBWAY':
      return { emoji: String.fromCodePoint(0x1f687), color: yellow, name: 'METRO' }
    case 'FERRY':
      return { emoji: String.fromCodePoint(0x1f6a2), color: cyan, name: mode }
    default:
      return { emoji: String.fromCodePoint(0x1f937), color: value => value, name: mode }
  }
}

const getMinAttribute = (array = [], field) => array.reduce((acc, obj) => !acc || acc > obj[field] ? obj[field] : acc, undefined)
const getMaxAttribute = (array = [], field) => array.reduce((acc, obj) => !acc || acc < obj[field] ? obj[field] : acc, undefined)

const getRouteHeaderRow = route => {
  const startTime = moment(getMinAttribute(route.legs, 'startTime'))
  const endTime = moment(getMaxAttribute(route.legs, 'endTime'))

  return `\n${startTime.format('HH:mm')} - ${endTime.format('HH:mm')} ${endTime.diff(startTime, 'minutes')}min`
}

const getRouteLegRow = leg => {
  const { color, emoji, name } = getRowProps(leg.mode)
  return [
    color('  |'),
    `${moment(leg.startTime).format('HH:mm')} - ${moment(leg.endTime).format('HH:mm')}`,
    `${emoji} ${color(name)}`,
    leg?.route?.shortName || '',
    '->',
    leg.to.name,
  ]
}

const stringsToTable = strings => {
  const table = new Table(tableStyle)
  table.push(...strings)
  return table
}

const getRouteRoskas = route => route.legs.map(getRouteLegRow)
  |> stringsToTable
  |> #.toString()


export const printRoutes = (routes) => {
  if (!routes || !routes.length) {
    throw new Error('Cannot find any routes :(')
  }

  const rows = routes.reduce((acc, route) => [
    ...acc,
    getRouteHeaderRow(route),
    getRouteRoskas(route),
  ], [])

  console.log(rows.join('\n'), '\n')
  return rows
}
