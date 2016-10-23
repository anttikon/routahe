import sinon from 'sinon'
import {assert} from 'chai'
import Route from '../src/Route'

describe('Route', function() {

  it('printSearchInfo', () => {
    sinon.spy(console, 'log')
    Route.printSearchInfo({label: 'Jäkälä'}, {label: 'Öylätti'})
    assert.equal(console.log.callCount, 1)
    assert.equal(console.log.getCall(0).args.join(''), '\u001b[1mJäkälä\u001b[22m - \u001b[1mÖylätti\u001b[22m')
  })

  describe('validateLocation', () => {
    it('should throw error if label is missing', () => {
      assert.throws(() => {
        Route.validateLocation({lon: 12, lat: 32})
      }, 'Location is missing mandatory information: {"lon":12,"lat":32}')
    })
    it('should throw error if lon is missing', () => {
      assert.throws(() => {
        Route.validateLocation({label: 'Steissi', lat: 32})
      }, 'Location is missing mandatory information: {"label":"Steissi","lat":32}')
    })
    it('should throw error if lat is missing', () => {
      assert.throws(() => {
        Route.validateLocation({label: 'Steissi', lon: 12})
      }, 'Location is missing mandatory information: {"label":"Steissi","lon":12}')
    })
    it('should work if route does have label, lon and lat', () => {
      assert.isTrue(Route.validateLocation({label: 'Steissi', lon: 12, lat: 32}))
    })
  })

  it('printRoutes')

})