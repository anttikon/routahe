import { isDate, isTime } from '../parser'

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
