import RouteQuery from './query/RouteQuery'
import {getLocation} from './location/location'

import {printSearchInfo, printRoutes} from './view/view'
import history from './history'

exports.action = async (opts) => {
  const [fromLocation, toLocation] = await Promise.all([getLocation(opts.addressFrom), getLocation(opts.addressTo)])
  history.add(fromLocation.label, toLocation.label)
  await exports.getRoute(fromLocation, toLocation, opts.dateTime, opts.arriveBy)
}

exports.getRoute = async (from, to, date, arriveBy) => {
  exports.validateLocation(from)
  printSearchInfo(from, to, date, arriveBy)
  const routes = await new RouteQuery().fetch({from, to, date, arriveBy})
  printRoutes(routes)
}

exports.validateLocation = (location) => {
  if (!location.label || !location.lon || !location.lat) {
    throw new Error(`Location is missing mandatory information: ${JSON.stringify(location)}`)
  }
  return true
}