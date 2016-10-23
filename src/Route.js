import {bold, green, cyan, blue, red, yellow, magenta, white} from 'chalk'
import {getRoutes} from './hsl-api/hsl-api'
import {head, last} from 'lodash'

import {getColorByMode, formatTime, formatDuration} from './view-utils'

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
  }

  static printSearchInfo(from, to) {
    console.log(bold(from.label), ' - ', bold(to.label))
  }
}

function printRoute(route) {
  console.log('')
  const start = head(route.legs).startTime
  const end = last(route.legs).endTime

  printRouteInformation(start, end, route.duration)
  route.legs.forEach(printLeg)
  console.log('')
}

function printRouteInformation(start, end, duration) {
  console.log(`${formatTime(start)} - ${formatTime(end)} (${formatDuration(duration)})`)
}

function printLeg(leg) {
  const color = getColorByMode(leg.mode)

  if (leg.route && leg.route.shortName) {
    console.log(color('  | '), `${formatTime(leg.startTime)} - ${formatTime(leg.endTime)}`, color(leg.mode), bold(leg.route.shortName), `-> ${leg.to.name}`)
  } else {
    console.log(color('  | '), `${formatTime(leg.startTime)} - ${formatTime(leg.endTime)}`, color(leg.mode), `-> ${leg.to.name}`)
  }
}

export default Route