import {assert} from 'chai'
import {getColorByMode, formatTime, formatDuration} from '../src/view-utils'
import moment from 'moment'

describe('view utils', function() {
  describe('getColorByMode', () => {
    it('with walk', () => {
      assert.equal(getColorByMode('WALK')._styles, 'green')
    })

    it('with rail', () => {
      assert.equal(getColorByMode('RAIL')._styles, 'cyan')
    })

    it('with bus', () => {
      assert.equal(getColorByMode('BUS')._styles, 'blue')
    })

    it('with tram', () => {
      assert.equal(getColorByMode('TRAM')._styles, 'red')
    })


    it('with subway', () => {
      assert.equal(getColorByMode('SUBWAY')._styles, 'yellow')
    })


    it('with ferry', () => {
      assert.equal(getColorByMode('FERRY')._styles, 'magenta')
    })

    it('with unknown', () => {
      assert.equal(getColorByMode('WHATISTHIS')._styles, 'white')
    })
  })

  it('formatTime', () => {
    assert.equal(formatTime(moment("2016-07-12 12:32:30").toDate()), '12:32')
    assert.equal(formatTime(moment("2016-07-12 06:12:15").toDate()), '06:12')
  })

  describe('formatDuration', () => {
    it('empty duration', () => {
      assert.equal(formatDuration(), '0min')
    })

    it('zero duration', () => {
      assert.equal(formatDuration(0), '0min')
    })

    it('minutes', () => {
      assert.equal(formatDuration(2520), '42min')
    })

    it('hours', () => {
      assert.equal(formatDuration(10080), '2h 48min')
    })

    it('days', () => {
      assert.equal(formatDuration(92452), '1d 1h 40min')
    })
  })
})