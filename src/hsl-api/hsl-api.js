import {get} from 'lodash'
import {getUrl, getGraphQlQuery} from './query-utils'
import fetch from 'node-fetch'

async function getLocations(query) {
  const response = await fetch(getUrl('http://api.digitransit.fi/geocoding/v1/search', {
    'text': encodeURIComponent(query),
    'boundary.rect.min_lat': 59.9,
    'boundary.rect.max_lat': 60.45,
    'boundary.rect.min_lon': 24.3,
    'boundary.rect.max_lon': 25.5
  }))
  return response.json()
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

  const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
    method: 'POST',
    body: JSON.stringify(getGraphQlQuery('plan',
      {
        from: {lat: from.lat, lon: from.lon},
        to: {lat: to.lat, lon: to.lon},
        numItineraries: 3
      },
      routeProjection)),
    headers: {'Content-Type': 'application/json'}
  })

  return get(await response.json(), 'data.plan.itineraries')
}

export {getLocations, getRoutes}