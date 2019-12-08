import { isDate, isTime, isTransport } from '../parser'

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

describe('isTransport', () => {
  it('should accept one parameter: bus', () => {
    expect(isTransport('bus')).toBeTruthy()
  })
  it('should accept one parameter: ferry', () => {
    expect(isTransport('bus')).toBeTruthy()
  })
  it('should accept two parameters: ferry,bus', () => {
    expect(isTransport('bus,ferry')).toBeTruthy()
  })
  it('should accept five parameters: bus,ferry,rail,subway,tram', () => {
    expect(isTransport('bus,ferry,rail,subway,tram')).toBeTruthy()
  })
  it('should fail on one invalid parameter: busa', () => {
    expect(isTransport('busa')).toBeFalsy()
  })
  it('should fail on one valid and one invalid parameter: bus,foobar', () => {
    expect(isTransport('bus,foobar')).toBeFalsy()
  })
})
