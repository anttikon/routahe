import {assert} from 'chai'
import {head} from 'lodash'
import {getLocations, getRoutes} from '../src/hsl-api/hsl-api'
import Location from '../src/Location'

describe('HSL-API', function() {
  this.timeout(50000)

  describe('get locations', () => {
    it('should be able to find location information', async() => {
      const locations = await getLocations('Steissi')
      const firstLocation = head(locations.features).properties
      assert.equal(firstLocation.label, 'Steissi, Helsinki, Finland')
    })

    it('should return empty array with empyt query', async() => {
      const locations = await getLocations('')
      assert.deepEqual(locations.features, [])
    })
  })

  describe('get routes', () => {
    const routeModes = ['WALK', 'RAIL', 'BUS', 'TRAM', 'SUBWAY', 'FERRY']
    let kamppiToSteissi

    before(async() => {
      kamppiToSteissi = await getRoutes(await new Location('Kamppi').getLocation(), await new Location('Steissi').getLocation())
    })

    it('should return three routes', () => {
      assert.equal(kamppiToSteissi.length, 3)
    })

    it('should be able to fetch route information', async() => {
      const firstRoute = head(kamppiToSteissi)
      const firstLeg = head(firstRoute.legs)

      assert.isNumber(firstRoute.duration)
      assert.isArray(firstRoute.legs)

      assert.isNumber(firstLeg.endTime)
      assert.isNumber(firstLeg.duration)
      assert.isNumber(firstLeg.distance)
      assert.isTrue(routeModes.includes(firstLeg.mode))

      assert.isString(firstLeg.from.name)
      assert.isString(firstLeg.from.name)
    })
  })
})