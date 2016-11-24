import graphqlify from 'graphqlify'
import {values, extend} from 'lodash'

function getUrl(api, params) {
  const urlParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
  return `${api}?${urlParams}`
}

function getGraphQlQuery(command, parameters, projection) {
  const graphQlQuery = {
    command: command,
    parameters: getGraphQlParameters(parameters),
    projection: graphqlify(projection)
  }
  return {query: `{${values(graphQlQuery).join('')}}`}
}

function getGraphQlParameters(jsonParameters = {}) {
  const parameters = JSON.stringify(jsonParameters)
  const withoutQuotes = parameters
    .replace(new RegExp('{"', 'g'), '{')
    .replace(new RegExp('":', 'g'), ':')
    .replace(new RegExp(',"', 'g'), ',')
  return `(${withoutQuotes.slice(1, -1)})`
}

function getQueryJson(from, to, date, arriveBy) {
  const queryJson = {
    from: {lat: from.lat, lon: from.lon},
    to: {lat: to.lat, lon: to.lon},
    numItineraries: 3
  }

  if (date) {
    extend(queryJson, {
      date: date.format('YYYY-MM-DD'),
      time: date.format('HH:mm'),
      arriveBy
    })
  }

  return queryJson
}

function getRouteProjection() {
  return {
    itineraries: {
      fields: {
        duration: {},
        legs: {
          fields: {
            startTime: {},
            endTime: {},
            duration: {},
            distance: {},
            mode: {},
            from: {fields: {name: {}}},
            to: {fields: {name: {}}},
            route: {fields: {shortName: {}}}
          }
        }
      }
    }
  }
}


export {getUrl, getGraphQlQuery, getGraphQlParameters, getQueryJson, getRouteProjection}