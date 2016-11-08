import {assert} from 'chai'
import {getColorByMode, getEmojiByMode, formatTime, formatDuration} from '../src/view-utils'
import moment from 'moment'
import {emoji} from 'node-emoji'

describe('view utils', function() {
  describe('getColorByMode', () => {
    it('with walk', () => {
      assert.equal(getColorByMode('WALK')._styles, 'gray')
    })

    it('with rail', () => {
      assert.equal(getColorByMode('RAIL')._styles, 'magenta')
    })

    it('with bus', () => {
      assert.equal(getColorByMode('BUS')._styles, 'blue')
    })

    it('with tram', () => {
      assert.equal(getColorByMode('TRAM')._styles, 'green')
    })

    it('with subway', () => {
      assert.equal(getColorByMode('SUBWAY')._styles, 'yellow')
    })

    it('with ferry', () => {
      assert.equal(getColorByMode('FERRY')._styles, 'cyan')
    })

    it('with unknown', () => {
      assert.equal(getColorByMode('WHATISTHIS')._styles, 'white')
    })
  })

  describe('getEmojiByMode', () => {
    it('with walk', () => {
      assert.equal(getEmojiByMode('WALK'), emoji.walking)
    })

    it('with rail', () => {
      assert.equal(getEmojiByMode('RAIL'), emoji.train)
    })

    it('with bus', () => {
      assert.equal(getEmojiByMode('BUS'), emoji.bus)
    })

    it('with tram', () => {
      assert.equal(getEmojiByMode('TRAM'), emoji.tram)
    })

    it('with subway', () => {
      assert.equal(getEmojiByMode('SUBWAY'), emoji.metro)
    })

    it('with ferry', () => {
      assert.equal(getEmojiByMode('FERRY'), emoji.ferry)
    })

    it('with unknown', () => {
      assert.equal(getEmojiByMode('WHATISTHIS'), emoji.grey_question)
    })
  })

  it('formatTime', () => {
    assert.equal(formatTime(moment('2016-07-12 12:32:30').toDate()), '12:32')
    assert.equal(formatTime(moment('2016-07-12 06:12:15').toDate()), '06:12')
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
