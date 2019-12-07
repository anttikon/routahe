import moment from 'moment'
import { populateFromTo } from './parser'
import { getRoutesByQuery, getQueryFromArgs } from './hsl/route'

const getDateTime = (opts) => {
  const dateTime = opts.dateTime
  if (dateTime && moment.isMoment(dateTime)) {
    return dateTime
  } else if (dateTime && moment.isDate(dateTime)) {
    return moment(dateTime)
  }
  return moment()
}

export const getRoute = async (opts) => {
  if (!opts.from) {
    throw new Error('Missing required attribute: from')
  } else if (!opts.to) {
    throw new Error('Missing required attribute: to')
  }

  const { from, to } = await populateFromTo({ inputFrom: opts.from, inputTo: opts.to })
  const dateTime = getDateTime(opts)
  const arriveBy = opts.arriveBy || false
  const transports = opts.transports || []
  return getQueryFromArgs({ arriveBy, from, to, dateTime, transports })
    |> getRoutesByQuery
}
