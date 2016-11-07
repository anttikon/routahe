import {assert} from 'chai'
import {head} from 'lodash'
import {getHslLocations, getLocationByQuery, getRoutes} from '../src/hsl-api/hsl-api'
import {getLocation} from '../src/Location'

describe('HSL-API', function() {
  this.timeout(50000)

  describe('get location by query', () => {
    it('should return location', async() => {
      const location = await await getLocationByQuery('Kolmas linja 3')
      assert.deepEqual(location,
        {
          label: 'Kolmas linja 3, Helsinki',
          lon: 24.952349,
          lat: 60.181334
        })
    })
  })

  describe('get locations', () => {
    it('should be able to find location information', async() => {
      const locations = await getHslLocations('Helsingin päärautatieasema')
      const firstLocation = head(locations.features).properties
      assert.equal(firstLocation.label, 'Helsingin päärautatieasema, Helsinki')
    })

    it('should return empty array with empyt query', async() => {
      const locations = await getHslLocations('')
      assert.deepEqual(locations.features, [])
    })
  })

  describe('get routes', () => {
    const routeModes = ['WALK', 'RAIL', 'BUS', 'TRAM', 'SUBWAY', 'FERRY']
    let kamppiToSteissi

    before(async() => {
      kamppiToSteissi = await getRoutes(await getLocation('Kamppi'), await new getLocation('Steissi'))
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