import {getLocationByQuery} from './hsl-api/hsl-api'
import {getLocationByWifi} from './WifiLocation'
import {head} from 'lodash'

exports.getLocation = (searchTerm) => searchTerm ? getLocationByQuery(searchTerm) : getLocationByWifi()