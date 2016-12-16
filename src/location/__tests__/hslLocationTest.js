import {getHslLocations} from '../hslLocation'

describe('location', function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000
  it('should fetch location by wifi if query is empty', async() => {
    const locations = await getHslLocations('Helsingin päärautatieasema')
    expect(locations.features).toMatchSnapshot()
  })

  it('should return empty array with empyt query', async() => {
    const locations = await getHslLocations('')
    expect(locations.features).toEqual([])
  })
})