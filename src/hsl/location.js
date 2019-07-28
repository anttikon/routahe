import fetch from 'node-fetch'
import querystring from 'querystring'

const getHslLocation = async (query) => {
  const params = {
    text: query,
    'boundary.rect.min_lat': 59.9,
    'boundary.rect.max_lat': 60.45,
    'boundary.rect.min_lon': 24.3,
    'boundary.rect.max_lon': 25.5,
    size: 1,
    lang: 'fi',
  }
  const response = await fetch(`http://api.digitransit.fi/geocoding/v1/search?${querystring.stringify(params)}`)
  return response.json()
}

const mapFeature = feature => {
  if (!feature) {
    return feature
  }
  const [lon, lat] = feature.geometry.coordinates
  const label = feature.properties.label
  return { label, lon, lat }
}

export const getLocationByString = async query => {
  const hslLocation = await getHslLocation(query)
  return mapFeature(hslLocation.features?.[0])
}
