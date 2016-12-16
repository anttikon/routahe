import sinon from 'sinon'

import {validateLocation, action} from '../route'
import {parseArguments} from '../argumentParser'

describe('Route', function() {

  beforeEach(() => sinon.spy(console, 'log'))
  afterEach(() => console.log.restore())

  describe('validateLocation', () => {
    it('should throw error if label is missing', () => {
      expect(() => {
        validateLocation({lon: 12, lat: 32})
      }).toThrow('Location is missing mandatory information: {"lon":12,"lat":32}')
    })
    it('should throw error if lon is missing', () => {
      expect(() => {
        validateLocation({label: 'Steissi', lat: 32})
      }).toThrow('Location is missing mandatory information: {"label":"Steissi","lat":32}')
    })
    it('should throw error if lat is missing', () => {
      expect(() => {
        validateLocation({label: 'Steissi', lon: 12})
      }).toThrow('Location is missing mandatory information: {"label":"Steissi","lon":12}')
    })
    it('should work if route does have label, lon and lat', () => {
      expect(validateLocation({label: 'Steissi', lon: 12, lat: 32})).toBe(true)
    })
  })

  it('action', async() => {
    await action(parseArguments(['Kolmas linja 3, Helsinki', 'kannistontie 2, vantaa', '12.12.2016', '13:32']))
    const args = console.log.getCalls().map(call => call.args)
    expect(args).toMatchSnapshot()
  })

  it('action arrive by', async() => {
    await action(parseArguments(['Suomenlinna, Helsinki', 'Rukatunturintie 2, Helsinki', '1.12.2016', '@13:32']))
    const args = console.log.getCalls().map(call => call.args)
    expect(args).toMatchSnapshot()
  })

})