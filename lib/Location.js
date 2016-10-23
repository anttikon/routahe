import {getLocations} from '../hsl-api/hsl-api'
import {head} from 'lodash'

class Location {

  constructor(searchTerm) {
    this.searchTerm = searchTerm
  }

  async getLocation() {
    const hslLocations = await getLocations(this.searchTerm)
    if (!hslLocations.features) {
      return {}
    }
    return head(hslLocations.features.map(Location.mapFeature))
  }

  static mapFeature(feature) {
    const [lon, lat] = feature.geometry.coordinates
    const label = feature.properties.label
    return {label, lon, lat}
  }
}


export default Location