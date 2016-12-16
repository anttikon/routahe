import {getColorByMode, getEmojiByMode, formatTime, formatDuration} from '../viewUtils'
import moment from 'moment'
import {emoji} from 'node-emoji'

describe('view utils', function() {
  describe('getColorByMode', () => {
    it('with walk', () => {
      expect(getColorByMode('WALK')._styles).toEqual(['gray'])
    })

    it('with rail', () => {
      expect(getColorByMode('RAIL')._styles).toEqual(['magenta'])
    })

    it('with bus', () => {
      expect(getColorByMode('BUS')._styles).toEqual(['blue'])
    })

    it('with tram', () => {
      expect(getColorByMode('TRAM')._styles).toEqual(['green'])
    })

    it('with subway', () => {
      expect(getColorByMode('SUBWAY')._styles).toEqual(['yellow'])
    })

    it('with ferry', () => {
      expect(getColorByMode('FERRY')._styles).toEqual(['cyan'])
    })

    it('with unknown', () => {
      expect(getColorByMode('WHATISTHIS')._styles).toEqual(['white'])
    })
  })

  describe('getEmojiByMode', () => {
    it('with walk', () => {
      expect(getEmojiByMode('WALK')).toBe(emoji.walking)
    })

    it('with rail', () => {
      expect(getEmojiByMode('RAIL')).toBe(emoji.train)
    })

    it('with bus', () => {
      expect(getEmojiByMode('BUS')).toBe(emoji.bus)
    })

    it('with tram', () => {
      expect(getEmojiByMode('TRAM')).toBe(emoji.tram)
    })

    it('with subway', () => {
      expect(getEmojiByMode('SUBWAY')).toBe(emoji.metro)
    })

    it('with ferry', () => {
      expect(getEmojiByMode('FERRY')).toBe(emoji.ferry)
    })

    it('with unknown', () => {
      expect(getEmojiByMode('WHATISTHIS')).toBe(emoji.grey_question)
    })
  })

  it('formatTime', () => {
    expect(formatTime(moment('2016-07-12 12:32:30').toDate())).toBe('12:32')
    expect(formatTime(moment('2016-07-12 06:12:15').toDate())).toBe('06:12')
  })

  describe('formatDuration', () => {
    it('empty duration', () => {
      expect(formatDuration()).toBe('0min')
    })

    it('zero duration', () => {
      expect(formatDuration(0)).toBe('0min')
    })

    it('minutes', () => {
      expect(formatDuration(2520)).toBe('42min')
    })

    it('hours', () => {
      expect(formatDuration(10080)).toBe('2h 48min')
    })

    it('days', () => {
      expect(formatDuration(92452)).toBe('1d 1h 40min')
    })
  })
})
