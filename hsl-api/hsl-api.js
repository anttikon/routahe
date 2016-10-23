import P from 'bluebird'
import {get} from 'lodash'
import {getUrl, getGraphQlQuery} from './query-utils'
const request = P.promisifyAll(require("request"))

async function getLocations(query) {
  const url = getUrl('http://api.digitransit.fi/geocoding/v1/search', {
    'text': encodeURIComponent(query),
    'boundary.rect.min_lat': 59.9,
    'boundary.rect.max_lat': 60.45,
    'boundary.rect.min_lon': 24.3,
    'boundary.rect.max_lon': 25.5
  })
  return (await request.getAsync({url, json: true})).body
}

async function getRoutes(from, to) {
  const routeProjection = {
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

  const {body} = await request.postAsync({
    url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
    json: getGraphQlQuery('plan',
      {
        from: {lat: from.lat, lon: from.lon},
        to: {lat: to.lat, lon: to.lon},
        numItineraries: 3
      },
      routeProjection)
  })

  return get(body, 'data.plan.itineraries')
}

export {getLocations, getRoutes}