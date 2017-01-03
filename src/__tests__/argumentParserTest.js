import {parseArguments, parseDateTime, isTime, isDate} from '../argumentParser'
import Moment from 'moment'

const dateTimeFormat = 'HH:mm YYYY-MM-DD'

function argumentsEqual(args, expected) {
  expect(Object.keys(args).length).toBe(Object.keys(expected).length)
  Object.keys(expected).forEach(key => {
    if (key === 'dateTime') {
      expect(args[key].format(dateTimeFormat)).toBe(expected[key])
    } else {
      expect(args[key]).toBe(expected[key])
    }
  })
}

describe('argument parser', function() {
  describe('parseArguments', () => {

    let now
    beforeEach(() => now = new Moment())

    it('should be able to parse addressFrom, addressTo, departure time and departure date', () => {
      argumentsEqual(parseArguments(['Steissi', 'Kamppi', '12:30', '1.12']), {
        addressFrom: 'Steissi',
        addressTo: 'Kamppi',
        arriveBy: false,
        time: '12:30',
        date: '1.12',
        dateTime: now.set({minute: 30, hour: 12, date: 1, month: 11}).format(dateTimeFormat)
      })
    })

    it('should be able to parse addressFrom, addressTo, arrival time and departure date', () => {
      argumentsEqual(parseArguments(['Steissi', 'Kamppi', '@1:30', '1.12']), {
        addressFrom: 'Steissi',
        addressTo: 'Kamppi',
        arriveBy: true,
        time: '1:30',
        date: '1.12',
        dateTime: now.set({minute: 30, hour: 1, date: 1, month: 11}).format(dateTimeFormat)
      })
    })

    describe('random argument order', () => {
      it('should be able to parse arguments in addressFrom, departureDate, addressTo, departureTime order', () => {
        argumentsEqual(parseArguments(['Steissi', '1.12.', 'Kamppi', '12:30']), {
          addressFrom: 'Steissi',
          addressTo: 'Kamppi',
          arriveBy: false,
          time: '12:30',
          date: '1.12.',
          dateTime: now.set({minute: 30, hour: 12, date: 1, month: 11}).format(dateTimeFormat)
        })
      })

      it('should be able to parse arguments in addressFrom, departureTime, departureDate, addressTo format', () => {
        argumentsEqual(parseArguments(['Steissi', '12:30', '1.12.', 'Kamppi']), {
          addressFrom: 'Steissi',
          addressTo: 'Kamppi',
          arriveBy: false,
          time: '12:30',
          date: '1.12.',
          dateTime: now.set({minute: 30, hour: 12, date: 1, month: 11}).format(dateTimeFormat)
        })
      })

      it('should be able to parse arguments in addressTo format', () => {
        argumentsEqual(parseArguments(['Steissi']), {
          addressTo: 'Steissi'
        })
      })

      it('should be able to parse arguments in departureTime, addressFrom, departureDate, addressTo format', () => {
        argumentsEqual(parseArguments(['12:30', 'Steissi', '1.12.', 'Kamppi']), {
          addressFrom: 'Steissi',
          addressTo: 'Kamppi',
          arriveBy: false,
          time: '12:30',
          date: '1.12.',
          dateTime: now.set({minute: 30, hour: 12, date: 1, month: 11}).format(dateTimeFormat)
        })
      })
    })
  })
  describe('parseDateTime', () => {

    let now
    beforeEach(() => now = new Moment())

    it('should be able to parse DD.M.YYYY with mm:HH', () => {
      expect(parseDateTime({date: '24.1.2015', time: '12:30'}).format(dateTimeFormat)).toBe('12:30 2015-01-24')
    })
    it('should be able to parse DD.MM.YYYY with mm:HH', () => {
      expect(parseDateTime({date: '04.12.2015', time: '12:30'}).format(dateTimeFormat)).toBe('12:30 2015-12-04')
    })
    it('should be able to parse DD.MM.YYYY with m:HH', () => {
      expect(parseDateTime({date: '24.12.2015', time: '2:30'}).format(dateTimeFormat)).toBe('02:30 2015-12-24')
    })
    it('should be able to parse D.M.YYYY with mm:HH', () => {
      expect(parseDateTime({date: '4.1.2015', time: '12:30'}).format(dateTimeFormat)).toBe('12:30 2015-01-04')
    })
    it('should be able to parse D.MM.YYYY with mm:HH', () => {
      expect(parseDateTime({date: '4.12.2015', time: '12:30'}).format(dateTimeFormat)).toBe('12:30 2015-12-04')
    })
    it('should be able to parse D.MM.YYYY with m:HH', () => {
      expect(parseDateTime({date: '4.12.2015', time: '2:30'}).format(dateTimeFormat)).toBe('02:30 2015-12-04')
    })

    it('should be able to parse DD.M. with mm:HH', () => {
      now.set({minute: 30, hour: 12, date: 24, month: 0})
      expect(parseDateTime({date: '24.1.', time: '12:30'}).format(dateTimeFormat)).toBe(now.format(dateTimeFormat))
    })
    it('should be able to parse DD.MM. with mm:HH', () => {
      now.set({minute: 30, hour: 12, date: 24, month: 11})
      expect(parseDateTime({date: '24.12.', time: '12:30'}).format(dateTimeFormat)).toBe(now.format(dateTimeFormat))
    })
    it('should be able to parse DD.MM. with m:HH', () => {
      now.set({minute: 30, hour: 2, date: 24, month: 11})
      expect(parseDateTime({date: '24.12.', time: '2:30'}).format(dateTimeFormat)).toBe(now.format(dateTimeFormat))
    })

    it('should bea able to parse DD.M with mm:HH', () => {
      now.set({'year': now.year(), 'month': 0, 'date': 24, 'hour': 12, 'minute': 30})
      expect(parseDateTime({date: '24.1', time: '12:30'}).format(dateTimeFormat)).toBe(now.format(dateTimeFormat))
    })

    it('should be able to parse DD.M. with MM:HH', () => {
      now.set({'year': now.year(), 'month': 0, 'date': 24, 'hour': 12, 'minute': 30})
      expect(parseDateTime({date: '24.1.', time: '12:30'}).format(dateTimeFormat)).toBe(now.format(dateTimeFormat))
    })

    it('should return null if date is invalid', () => {
      expect(parseDateTime({time: 'd:30'})).toBe(null)
    })
  })

  describe('isTime', () => {
    it('should validate invalid times', () => {
      expect(isTime(':20')).toBe(false)
      expect(isTime('12:')).toBe(false)
      expect(isTime('12:1')).toBe(false)
      expect(isTime('12')).toBe(false)
      expect(isTime('12a20')).toBe(false)
    })
    it('should validate valid times', () => {
      expect(isTime('12:20')).toBe(true)
      expect(isTime('2:20')).toBe(true)
    })
  })

  describe('isDate', () => {
    it('should validate invalid dates', () => {
      expect(isDate('12')).toBe(false)
      expect(isDate('12.')).toBe(false)
      expect(isDate('12.12.2')).toBe(false)
      expect(isDate('12.12.20')).toBe(false)
      expect(isDate('12.12.201')).toBe(false)
      expect(isDate('a12.12')).toBe(false)
      expect(isDate('12a12')).toBe(false)
      expect(isDate('12.12a')).toBe(false)
    })
    it('should validate valid dates', () => {
      expect(isDate('1.1')).toBe(true)
      expect(isDate('2.1.2016')).toBe(true)
      expect(isDate('12.1')).toBe(true)
      expect(isDate('12.12')).toBe(true)
      expect(isDate('12.12.')).toBe(true)
      expect(isDate('12.12.2016')).toBe(true)
    })
  })
})