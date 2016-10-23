import {bold, green, cyan, blue, red, yellow, magenta, white} from 'chalk'
import moment from 'moment'
require("moment-duration-format")

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
  return moment.duration({seconds}).format("d[d] h[h] mm[min]")
}

export {getColorByMode, formatTime, formatDuration}