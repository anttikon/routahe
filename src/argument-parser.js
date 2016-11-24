import Moment from 'moment'

exports.parseArguments = (args) => {
  const {isTime, isDate, parseDateTime} = exports
  const options = args.reduce((opts, arg) => {
    if (arg && isTime(arg)) {
      opts.arriveBy = arg.startsWith('@')
      opts.time = arg.replace('@', '')
    } else if (arg && isDate(arg)) {
      opts.date = arg
    } else if (arg && !opts.addressFrom) {
      opts.addressFrom = arg
    } else if (arg && opts.addressFrom && !opts.addressTo) {
      opts.addressTo = arg
    }
    return opts
  }, {})

  if (options.time) {
    options.dateTime = parseDateTime(options)
  }
  return options
}

exports.parseDateTime = (opts) => {
  const date = opts.date ? Moment(opts.date, ['DD.MM.YYYY', 'DD.MM.', 'DD.MM', 'DD.M.YYYY', 'DD.M.', 'DD.M', 'D.M', 'D.MM', 'D.MM.', 'D.M.YYYY', 'D.MM.YYYY'], true) : new Moment()
  const time = Moment(opts.time, ['HH:mm', 'H:mm'], true)
  if (!time.isValid()) {
    return null
  }
  time.set({date: date.date(), month: date.month(), year: date.year()})
  return time
}

exports.isTime = (arg) => {
  return arg && !!arg.match(/^@?\d{1,2}:\d{2}$/g)
}

exports.isDate = (arg) => {
  return arg && !!arg.match(/^\d{1,2}\.\d{1,2}\.?(\d{4})?$/g)
}