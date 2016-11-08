import {gray, green, cyan, blue, yellow, magenta, white} from 'chalk'
import moment from 'moment'
import {emoji} from 'node-emoji'
require('moment-duration-format')

function getColorByMode(mode) {
  const colorModeMap = {
    'WALK': gray,
    'RAIL': magenta,
    'BUS': blue,
    'TRAM': green,
    'SUBWAY': yellow,
    'FERRY': cyan
  }
  return colorModeMap[mode] || white
}

function getEmojiByMode(mode) {
  const emojis = {
    'WALK': emoji.walking,
    'RAIL': emoji.train,
    'BUS': emoji.bus,
    'TRAM': emoji.tram,
    'SUBWAY': emoji.metro,
    'FERRY': emoji.ferry
  }
  return emojis[mode] || emoji.grey_question
}

function formatTime(date) {
  return moment(date).format('HH:mm')
}

function formatDuration(seconds) {
  return moment.duration({seconds}).format('d[d] h[h] mm[min]')
}

export {getColorByMode, getEmojiByMode, formatTime, formatDuration}
