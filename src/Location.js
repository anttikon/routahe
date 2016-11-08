import {getLocationByQuery} from './hsl-api/hsl-api'
import {getLocationByWifi} from './WifiLocation'

exports.getLocation = (searchTerm) => searchTerm ? getLocationByQuery(searchTerm) : getLocationByWifi()