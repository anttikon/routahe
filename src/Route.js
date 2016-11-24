import {bold, gray, cyan} from 'chalk'
import {getRoutes} from './hsl-api/hsl-api'
import {head, last, get, padEnd, max} from 'lodash'

import {getColorByMode, getEmojiByMode, formatTime, formatDuration} from './view-utils'

class Route {

  constructor(from, to, date, arriveBy) {
    Route.validateLocation(from)
    Route.printSearchInfo(from, to, date, arriveBy)
    this.arriveBy = arriveBy
    this.date = date
    this.from = from
    this.to = to
  }

  async printRoutes() {
    const routes = await getRoutes(this.from, this.to, this.date, this.arriveBy)
    routes ? routes.forEach(printRoute) : console.log('No routes found! :(')
  }

  static validateLocation(location) {
    if (!location.label || !location.lon || !location.lat) {
      throw new Error(`Location is missing mandatory information: ${JSON.stringify(location)}`)
    }
    return true
  }

  static printSearchInfo(from, to, date, arriveBy) {
    if (date) {
      console.log(`${bold(from.label)} - ${bold(to.label)} | ${arriveBy ? gray('arrive') : gray('departure')} ${cyan(date.format('H:mm YYYY.MM.DD'))}`)
    } else {
      console.log(`${bold(from.label)} - ${bold(to.label)}`)
    }
  }
}

function printRoute(route) {
  console.log('')
  const start = head(route.legs).startTime
  const end = last(route.legs).endTime

  printRouteInformation(start, end, route.duration)

  const longestModeAndShortnameLength = max(route.legs.map(leg => getModeAndShortnameLength(leg)))
  route.legs.forEach(leg => printLeg(leg, longestModeAndShortnameLength))
  console.log('')
}

function getModeAndShortnameLength(leg) {
  const {mode} = leg
  const shortName = get(leg, 'route.shortName') || ''
  return mode.length + shortName.length
}

function getPad(leg, longestModeAndShortnameLength) {
  const {mode} = leg
  return longestModeAndShortnameLength - mode.length
}

function printRouteInformation(start, end, duration) {
  console.log(`${formatTime(start)} - ${formatTime(end)} (${formatDuration(duration)})`)
}

function printLeg(leg, longestModeAndShortnameLength) {
  const color = getColorByMode(leg.mode)
  const emoji = getEmojiByMode(leg.mode)
  const shortName = get(leg, 'route.shortName')
  const padAmount = getPad(leg, longestModeAndShortnameLength)
  console.log(color('  | '), `${formatTime(leg.startTime)} - ${formatTime(leg.endTime)}`, emoji, color(leg.mode), bold(padEnd(shortName, padAmount, ' ')), `-> ${leg.to.name}`)
}

export default Route
