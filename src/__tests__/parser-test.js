import { parseArguments, isDate, isTime } from '../parser'

const from = 'Tehtaankatu 24'
const to = 'Koirapuisto'
const date = '8.8.'
const time = '21:00'

describe('parseArguments', () => {
  it('should parse arguments with format: from to date time', () => {
    expect(parseArguments([from, to, date, time])).toMatchSnapshot()
  })

  it('should parse arguments with format: from to time date', () => {
    expect(parseArguments([from, to, time, date])).toMatchSnapshot()
  })

  it('should parse arguments with format: date time from to', () => {
    expect(parseArguments([date, time, from, to])).toMatchSnapshot()
  })

  it('should parse arguments with format: time date from to', () => {
    expect(parseArguments([time, date, from, to])).toMatchSnapshot()
  })
})

describe('isDate', () => {
  it('should return true with 1.1', () => {
    expect(isDate('1.1')).toBeTruthy()
  })

  it('should return true with 1.1.', () => {
    expect(isDate('1.1.')).toBeTruthy()
  })
  it('should return true with 1.1.2019', () => {
    expect(isDate('1.1.2019')).toBeTruthy()
  })
  it('should return false with 1.', () => {
    expect(isDate('1.')).toBeFalsy()
  })
  it('should return false with 1', () => {
    expect(isDate('1')).toBeFalsy()
  })
  it('should return false with asdf', () => {
    expect(isDate('asdf')).toBeFalsy()
  })
  it('should return false with undefined', () => {
    expect(isDate()).toBeFalsy()
  })
})

describe('isTime', () => {
  it('should return true with 00:00', () => {
    expect(isTime('00:00')).toBeTruthy()
  })
  it('should return true with 0:00', () => {
    expect(isTime('0:00')).toBeTruthy()
  })
  it('should return true with 23:59', () => {
    expect(isTime('23:59')).toBeTruthy()
  })
  it('should return false with 23:59:', () => {
    expect(isTime('23:59:')).toBeFalsy()
  })
  it('should return false with asdf', () => {
    expect(isTime('asdf')).toBeFalsy()
  })
  it('should return false with undefined', () => {
    expect(isTime()).toBeFalsy()
  })
})
