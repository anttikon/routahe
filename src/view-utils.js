import {bold, green, cyan, blue, red, yellow, magenta, white} from 'chalk'
import moment from 'moment'

function getColorByMode(mode) {
  const colorModeMap = {
    'WALK': green,
    'RAIL': cyan,
    'BUS': blue,
    'TRAM': red,
    'SUBWAY': yellow,
    'FERRY': magenta
  }
  return colorModeMap[mode] || white
}

function formatTime(date) {
  return moment(date).format('HH:mm')
}

function formatDuration(seconds) {
  const duration = moment.duration(seconds * 1000)
  return duration.hours() ? `${duration.hours()}h ${duration.minutes()}min` : `${duration.minutes()}min`
}

export {getColorByMode, formatTime, formatDuration}