import moment from 'moment'

const timeParseFormats = ['HH:mm', 'H:mm']
const dateParseFormats = [
  'DD.MM.YYYY',
  'DD.MM.',
  'DD.MM',
  'DD.M.YYYY',
  'DD.M.',
  'DD.M',
  'D.M',
  'D.MM',
  'D.MM.',
  'D.M.YYYY',
  'D.MM.YYYY',
]

function parseTime(time) {
  if (time && time.startsWith('@')) {
    return moment(time.slice(1), timeParseFormats, true)
  } else {
    return moment(time, timeParseFormats, true)
  }
}

export const parseDateTime = opts => {
  const parsedDate = moment(opts.date, dateParseFormats, true)
  const parsedTime = parseTime(opts.time)

  const date = parsedDate.isValid() ? parsedDate : new moment()
  const time = parsedTime.isValid() ? parsedTime : new moment()

  time.set({ date: date.date(), month: date.month(), year: date.year() })

  return time
}

export const isTime = arg => arg && !!arg.match(/^@?\d{1,2}:\d{2}$/g)

export const isDate = arg => arg && !!arg.match(/^\d{1,2}\.\d{1,2}\.?(\d{4})?$/g)

const filterUndefined = array => array.filter(obj => !!obj)

export const parseArguments = args => {
  const definedArgs = filterUndefined(args)

  const mapped = definedArgs.reduce((opts, arg) => {
    if (isTime(arg)) {
      opts.time = arg
    } else if (isDate(arg)) {
      opts.date = arg
    } else if (!opts.from) {
      opts.from = arg
    } else if (!opts.to) {
      opts.to = arg
    }

    if (isTime(arg) && arg.startsWith('@')) {
      opts.arriveBy = true
    }

    return opts
  }, {})

  mapped.dateTime = parseDateTime(mapped)

  return mapped
}
