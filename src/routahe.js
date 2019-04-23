import moment from 'moment'
import { maxBy, minBy, get } from 'lodash'
import { gray, green, cyan, blueBright, yellow, magenta } from 'chalk'
import Table from 'cli-table'

const spacer = '  |'

const tableStyle = {
  chars: {
    top: '',
    'top-mid': '',
    'top-left': '',
    'top-right': '',
    bottom: '',
    'bottom-mid': '',
    'bottom-left': '',
    'bottom-right': '',
    left: '',
    'left-mid': '',
    mid: '',
    'mid-mid': '',
    right: '',
    'right-mid': '',
    middle: ' ',
  },
  style: { 'padding-left': 0, 'padding-right': 0 },
}

export const getRowProps = mode => {
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

export const getRouteHeaderRow = route => {
  const startTime = moment(minBy(route.legs, 'startTime').startTime)
  const endTime = moment(maxBy(route.legs, 'endTime').endTime)

  return `\n${startTime.format('HH:mm')} - ${endTime.format('HH:mm')} ${endTime.diff(startTime, 'minutes')}min`
}

export const getRowByLeg = leg => {
  const { color, emoji, name } = getRowProps(leg.mode)

  return [
    color(spacer),
    `${moment(leg.startTime).format('HH:mm')} - ${moment(leg.endTime).format('HH:mm')}`,
    `${emoji} ${color(name)}`,
    get(leg, 'route.shortName', ''),
    '->',
    leg.to.name,
  ]
}

export const getRouteRows = route => {
  const table = new Table(tableStyle)
  route.legs.forEach(leg => table.push(getRowByLeg(leg)))
  return table.toString()
}

export const getTripRow = (addressFrom, addressTo) => `${addressFrom.label} ${gray('->')} ${addressTo.label}`
