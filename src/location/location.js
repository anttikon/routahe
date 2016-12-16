import {getLocationByQuery} from './hslLocation'
import {getLocationByWifi} from './wifiLocation'

exports.getLocation = (searchTerm) => searchTerm ? getLocationByQuery(searchTerm) : getLocationByWifi()