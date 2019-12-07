import moment from 'moment'
import hsl from './hsl'

const timeParseFormats = ['HH:mm', 'H:mm']
const dateParseFormats = [
  'DD.MM.YYYY',
  'DD.MM.',
  'DD.MM',
  'DD.M.YYYY',
  'DD.M.',
  'DD.M',
  'D.M',
  'D.M.',
  'D.MM',
  'D.MM.',
  'D.M.YYYY',
  'D.MM.YYYY',
]

const parseTime = (str) => {
  const time = str && str.startsWith('@') ? str.slice(1) : str
  return moment(time, timeParseFormats, true)
}

export const populateDateTime = args => {
  const parsedDate = moment(args.inputDate, dateParseFormats, true)
  const parsedTime = parseTime(args.inputTime)

  const date = parsedDate.isValid() ? parsedDate : new moment()
  const time = parsedTime.isValid() ? parsedTime : new moment()

  time.set({ date: date.date(), month: date.month(), year: date.year() })

  return { ...args, dateTime: time }
}

export const isTime = arg => arg && !!arg.match(/^@?\d{1,2}:\d{2}$/g)

export const isDate = arg => arg && !!arg.match(/^\d{1,2}\.\d{1,2}\.?(\d{4})?$/g)

export const isTransport = arg => arg && !!arg.match(/^(rail|bus|tram|ferry|subway)(,(rail|bus|tram|ferry|subway))*$/)

export const argsToObject = (args) => args.reduce((acc, arg) => {
  if (isTime(arg)) {
    acc.inputTime = arg
    acc.arriveBy = arg.startsWith('@')
  } else if (isDate(arg)) {
    acc.inputDate = arg
  } else if (isTransport(arg)) {
    acc.transports = arg.toUpperCase().split(',')
  } else if (!acc.inputFrom) {
    acc.inputFrom = arg
  } else if (!acc.inputTo) {
    acc.inputTo = arg
  }
  return acc
}, { arriveBy: false, transports: [] })

export const validateInput = (args, argv) => !!(args.inputFrom && args.inputTo && argv.length > 2)

export const populateFromTo = async (args) => {
  if (!args.inputFrom || !args.inputTo) {
    return args
  }
  const [from, to] = await Promise.all([hsl.getLocationByString(args.inputFrom), hsl.getLocationByString(args.inputTo)])

  if (!from || !to) {
    const nullLocationInput = !from ? args.inputFrom : args.inputTo
    throw new Error(`Cannot find location for input: ${nullLocationInput}`)
  }
  return { ...args, from, to }
}

export const argvToArray = (argv) => {
  const { 2: arg1, 3: arg2, 4: arg3, 5: arg4, 6: arg5 } = argv
  return [arg1, arg2, arg3, arg4, arg5]
}
