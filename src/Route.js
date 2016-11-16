import {bold} from 'chalk'
import {getRoutes} from './hsl-api/hsl-api'
import {head, last, get, padEnd} from 'lodash'

import {getColorByMode, getEmojiByMode, formatTime, formatDuration} from './view-utils'

class Route {

  constructor(from, to) {
    Route.validateLocation(from)
    Route.printSearchInfo(from, to)
    this.from = from
    this.to = to
  }

  async printRoutes() {
    const routes = await getRoutes(this.from, this.to)
    routes.forEach(printRoute)
  }

  static validateLocation(location) {
    if (!location.label || !location.lon || !location.lat) {
      throw new Error(`Location is missing mandatory information: ${JSON.stringify(location)}`)
    }
    return true
  }

  static printSearchInfo(from, to) {
    console.log(bold(from.label), ' - ', bold(to.label))
  }
}

function maxFieldLength(route, fieldName) {
  return route.legs.reduce((prevMax, route) => {
    const field = get(route, fieldName, "")
    const currLength = field && field.length
    return currLength > prevMax ? currLength : prevMax
  }, 0)
}
function printRoute(route) {
  console.log('')
  const start = head(route.legs).startTime
  const end = last(route.legs).endTime

  printRouteInformation(start, end, route.duration)

  const maxRouteNameLength = maxFieldLength(route, 'route.shortName');
  const maxModeLength = maxFieldLength(route, 'mode');

  route.legs.forEach(leg => printLeg(leg, maxRouteNameLength, maxModeLength))
  console.log('')
}

function printRouteInformation(start, end, duration) {
  console.log(`${formatTime(start)} - ${formatTime(end)} (${formatDuration(duration)})`)
}

function printLeg(leg, maxRouteNameLength, maxModeLength) {
  const color = getColorByMode(leg.mode)
  const emoji = getEmojiByMode(leg.mode)

  const shortName = get(leg, 'route.shortName', '')
  const shortNamePadChar = (!shortName || shortName.length) === 0 ? '.' : ' '
  console.log(color('  | '), `${formatTime(leg.startTime)} - ${formatTime(leg.endTime)}`, emoji, color(padEnd(leg.mode, maxModeLength)), bold(padEnd(shortName, maxRouteNameLength, shortNamePadChar)), `-> ${leg.to.name}`)
}

export default Route
