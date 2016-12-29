import sinon from 'sinon'

import {validateLocation} from '../route'

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

})