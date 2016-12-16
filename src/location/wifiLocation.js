import triangulate from 'wifi-triangulate'
import fetch from 'node-fetch'
import {head} from 'lodash'

exports.getLocationByWifi = async() => {
  const {lat, lng, accuracy} = await getMyLocation()
  const label = await exports.getStreetAddressByLocation(lat, lng)
  return {lon: lng, lat, label, accuracy,}

  function getMyLocation() {
    return new Promise((resolve, reject) => triangulate((err, location) => err ? reject(err) : resolve(location)))
  }
}

exports.getStreetAddressByLocation = async(lat, lon) => {
  const response = await fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&sensor=true`)
  const {formatted_address} = head((await response.json()).results)
  return formatted_address || 'Unknown'
}