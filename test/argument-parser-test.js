import {assert} from 'chai'
import {parseArguments, parseDateTime, isTime, isDate} from '../src/argument-parser'
import Moment from 'moment'

const dateTimeFormat = 'HH:mm YYYY-MM-DD'

function argumentsEqual(args, expected) {
  assert.equal(Object.keys(args).length, Object.keys(expected).length)
  Object.keys(expected).forEach(key => {
    if (key === 'dateTime') {
      assert.equal(args[key].format(dateTimeFormat), expected[key])
    } else {
      assert.equal(args[key], expected[key])
    }
  })
}

describe('argument-parser', function() {
  describe('parseArguments', () => {

    let now
    beforeEach(() => now = new Moment())

    it('should be able to parse addressFrom, addressTo, departure time and departure date', () => {
      argumentsEqual(parseArguments(['steissi', 'beissi', '12:30', '1.12']), {
        addressFrom: 'steissi',
        addressTo: 'beissi',
        arriveBy: false,
        time: '12:30',
        date: '1.12',
        dateTime: now.set({minute: 30, hour: 12, date: 1, month: 11}).format(dateTimeFormat)
      })
    })

    it('should be able to parse addressFrom, addressTo, arrival time and departure date', () => {
      argumentsEqual(parseArguments(['steissi', 'beissi', '@1:30', '1.12']), {
        addressFrom: 'steissi',
        addressTo: 'beissi',
        arriveBy: true,
        time: '1:30',
        date: '1.12',
        dateTime: now.set({minute: 30, hour: 1, date: 1, month: 11}).format(dateTimeFormat)
      })
    })

    describe('random argument order', () => {
      it('should be able to parse arguments in addressFrom, departureDate, addressTo, departureTime order', () => {
        argumentsEqual(parseArguments(['steissi', '1.12.', 'beissi', '12:30']), {
          addressFrom: 'steissi',
          addressTo: 'beissi',
          arriveBy: false,
          time: '12:30',
          date: '1.12.',
          dateTime: now.set({minute: 30, hour: 12, date: 1, month: 11}).format(dateTimeFormat)
        })
      })

      it('should be able to parse arguments in addressFrom, departureTime, departureDate, addressTo format', () => {
        argumentsEqual(parseArguments(['steissi', '12:30', '1.12.', 'beissi']), {
          addressFrom: 'steissi',
          addressTo: 'beissi',
          arriveBy: false,
          time: '12:30',
          date: '1.12.',
          dateTime: now.set({minute: 30, hour: 12, date: 1, month: 11}).format(dateTimeFormat)
        })
      })

      it('should be able to parse arguments in departureTime, addressFrom, departureDate, addressTo format', () => {
        argumentsEqual(parseArguments(['12:30', 'steissi', '1.12.', 'beissi']), {
          addressFrom: 'steissi',
          addressTo: 'beissi',
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
      assert.equal(parseDateTime({date: '24.1.2015', time: '12:30'}).format(dateTimeFormat), '12:30 2015-01-24')
    })
    it('should be able to parse DD.MM.YYYY with mm:HH', () => {
      assert.equal(parseDateTime({date: '04.12.2015', time: '12:30'}).format(dateTimeFormat), '12:30 2015-12-04')
    })
    it('should be able to parse DD.MM.YYYY with m:HH', () => {
      assert.equal(parseDateTime({date: '24.12.2015', time: '2:30'}).format(dateTimeFormat), '02:30 2015-12-24')
    })

    it('should be able to parse D.M.YYYY with mm:HH', () => {
      assert.equal(parseDateTime({date: '4.1.2015', time: '12:30'}).format(dateTimeFormat), '12:30 2015-01-04')
    })
    it('should be able to parse D.MM.YYYY with mm:HH', () => {
      assert.equal(parseDateTime({date: '4.12.2015', time: '12:30'}).format(dateTimeFormat), '12:30 2015-12-04')
    })
    it('should be able to parse D.MM.YYYY with m:HH', () => {
      assert.equal(parseDateTime({date: '4.12.2015', time: '2:30'}).format(dateTimeFormat), '02:30 2015-12-04')
    })

    it('should be able to parse DD.M. with mm:HH', () => {
      now.set({minute: 30, hour: 12, date: 24, month: 0})
      assert.equal(parseDateTime({date: '24.1.', time: '12:30'}).format(dateTimeFormat), now.format(dateTimeFormat))
    })
    it('should be able to parse DD.MM. with mm:HH', () => {
      now.set({minute: 30, hour: 12, date: 24, month: 11})
      assert.equal(parseDateTime({date: '24.12.', time: '12:30'}).format(dateTimeFormat), now.format(dateTimeFormat))
    })
    it('should be able to parse DD.MM. with m:HH', () => {
      now.set({minute: 30, hour: 2, date: 24, month: 11})
      assert.equal(parseDateTime({date: '24.12.', time: '2:30'}).format(dateTimeFormat), now.format(dateTimeFormat))
    })

    it('should bea able to parse DD.M with mm:HH', () => {
      now.set({'year': 2016, 'month': 0, 'date': 24, 'hour': 12, 'minute': 30});
      assert.equal(parseDateTime({date: '24.1', time: '12:30'}).format(dateTimeFormat), now.format(dateTimeFormat))
    })

    it('should be able to parse DD.M. with MM:HH', () => {
      now.set({'year': 2016, 'month': 0, 'date': 24, 'hour': 12, 'minute': 30});
      assert.equal(parseDateTime({date: '24.1.', time: '12:30'}).format(dateTimeFormat), now.format(dateTimeFormat))
    })

    it('should return null if date is invalid', () => {
      assert.equal(parseDateTime({time: 'd:30'}), null)
    })
  })

  describe('isTime', () => {
    it('should validate invalid times', () => {
      assert.isFalse(isTime(':20'))
      assert.isFalse(isTime('12:'))
      assert.isFalse(isTime('12:1'))
      assert.isFalse(isTime('12'))
      assert.isFalse(isTime('12a20'))
    })
    it('should validate valid times', () => {
      assert.isTrue(isTime('12:20'))
      assert.isTrue(isTime('2:20'))
    })
  })

  describe('isDate', () => {
    it('should validate invalid dates', () => {
      assert.isFalse(isDate('12'))
      assert.isFalse(isDate('12.'))
      assert.isFalse(isDate('12.12.2'))
      assert.isFalse(isDate('12.12.20'))
      assert.isFalse(isDate('12.12.201'))
      assert.isFalse(isDate('a12.12'))
      assert.isFalse(isDate('12a12'))
      assert.isFalse(isDate('12.12a'))
    })
    it('should validate valid dates', () => {
      assert.isTrue(isDate('1.1'))
      assert.isTrue(isDate('2.1.2016'))
      assert.isTrue(isDate('12.1'))
      assert.isTrue(isDate('12.12'))
      assert.isTrue(isDate('12.12.'))
      assert.isTrue(isDate('12.12.2016'))
    })
  })
})