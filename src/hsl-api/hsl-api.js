import {get} from 'lodash'
import {getUrl, getGraphQlQuery, getQueryJson, getRouteProjection} from './query-utils'
import fetch from 'node-fetch'
import {head} from 'lodash'

async function getHslLocations(query) {
  const response = await fetch(getUrl('http://api.digitransit.fi/geocoding/v1/search', {
    'text': encodeURIComponent(query),
    'boundary.rect.min_lat': 59.9,
    'boundary.rect.max_lat': 60.45,
    'boundary.rect.min_lon': 24.3,
    'boundary.rect.max_lon': 25.5
  }))
  return response.json()
}

async function getLocationByQuery(query) {
  const hslLocations = await getHslLocations(query)
  if (!hslLocations.features) {
    return {}
  }
  return head(hslLocations.features.map(mapFeature))

  function mapFeature(feature) {
    const [lon, lat] = feature.geometry.coordinates
    const label = feature.properties.label
    return {label, lon, lat}
  }
}

async function getRoutes(from, to, date, arriveBy) {
  const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
    method: 'POST',
    body: JSON.stringify(getGraphQlQuery('plan', getQueryJson(from, to, date, arriveBy), getRouteProjection())),
    headers: {'Content-Type': 'application/json'}
  })

  return get(await response.json(), 'data.plan.itineraries')
}

export {getHslLocations, getLocationByQuery, getRoutes}