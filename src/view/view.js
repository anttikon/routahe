import Printer from './Printer'
import {bold} from 'chalk'
import {head, last, padEnd, get, max} from 'lodash'
import {getColorByMode} from './viewUtils'

exports.printRouteInformation = (route) => {
  new Printer()
    .addDate(head(route.legs).startTime)
    .addString(' - ')
    .addDate(last(route.legs).endTime)
    .addString(' ')
    .addDuration(route.duration)
    .print()
}

exports.printSearchInfo = (from, to, date, arriveBy) => {
  const printer = new Printer()
  printer.addString(from.label, bold)
    .addString(' - ')
    .addString(to.label, bold)

  if (date) {
    printer.addString(' | ')
    arriveBy ? printer.addArrive(date) : printer.addDeparture(date)
  }

  printer.print()
}

exports.printLeg = (route, leg) => {
  const color = getColorByMode(leg.mode)
  const shortName = get(leg, 'route.shortName'),
    padAmount = getShortNamePadAmount(route, leg),
    shortNameWithPadding = padEnd(shortName, padAmount, ' ')

  new Printer()
    .addString('  |  ', color)
    .addDate(leg.startTime)
    .addString(' - ')
    .addDate(leg.endTime)
    .addString(' ')
    .addMode(leg.mode)
    .addString(' ')
    .addString(shortNameWithPadding, bold)
    .addString(' -> ')
    .addString(leg.to.name)
    .print()
}

function getShortNamePadAmount(route, leg) {
  const {mode} = leg
  const longestModeAndShortnameLength = max(route.legs.map(leg => getModeAndShortnameLength(leg)))
  return longestModeAndShortnameLength - mode.length
}

function getModeAndShortnameLength(leg) {
  const {mode} = leg
  const shortName = get(leg, 'route.shortName') || ''
  return mode.length + shortName.length
}

exports.printRoutes = (routes) => {
  if(!routes) {
    console.log('Cannot find any routes! :(')
  }
  const {printRouteInformation, printLeg} = exports
  routes.forEach(route => {
    console.log('')
    printRouteInformation(route)
    route.legs.forEach(leg => printLeg(route, leg))
    console.log('')
  })
}