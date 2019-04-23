import fetch from 'node-fetch'
import { get, values } from 'lodash'

const querySchema = {
  itineraries: {
    duration: {},
    legs: {
      startTime: {},
      endTime: {},
      duration: {},
      distance: {},
      mode: {},
      from: { name: {} },
      to: { name: {} },
      route: { shortName: {} },
    },
  },
}

const defaultBody = { numItineraries: 3 }

const fromAndToBody = ({ from, to }) => ({
  from: { lat: from.lat, lon: from.lon },
  to: { lat: to.lat, lon: to.lon },
})

const dateTimeToBody = ({ dateTime, arriveBy }) => {
  if (!dateTime) {
    return {}
  }
  return {
    date: dateTime.format('YYYY-MM-DD'),
    time: dateTime.format('HH:mm'),
    arriveBy,
  }
}

export const formatQueryBody = body => ({
  ...defaultBody,
  ...fromAndToBody(body),
  ...dateTimeToBody(body),
})

export const jsonToSchema = json =>
  JSON.stringify(json)
    .replace(new RegExp('"', 'g'), '')
    .replace(new RegExp(':{', 'g'), '{')
    .replace(new RegExp('{}', 'g'), '')

export const jsonToParameters = json => {
  const withoutQuotes = JSON.stringify(json)
    .replace(new RegExp('{"', 'g'), '{')
    .replace(new RegExp('":', 'g'), ':')
    .replace(new RegExp(',"', 'g'), ',')
  return `(${withoutQuotes.slice(1, -1)})`
}

export const createQuery = parameters => {
  const graphQlQuery = {
    command: 'plan',
    parameters: jsonToParameters(parameters),
    projection: jsonToSchema(querySchema),
  }
  return { query: `{${values(graphQlQuery).join('')}}` }
}

export const fetchRoute = async ({ url, body }) => {
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(createQuery(body)),
    headers: { 'Content-Type': 'application/json' },
  })
  return get(await result.json(), 'data.plan.itineraries')
}
