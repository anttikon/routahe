import moment from 'moment'
import RouteQuery from '../RouteQuery'

describe('HSL-API', function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000

  it('should be able to get route', async() => {
    const date = moment(1481728405559)
    const routes = await new RouteQuery().fetch({
      from: {label: 'Kamppi, Helsinki', lon: 24.931861, lat: 60.169067}, to: {
        label: 'Kannistontie 2, Vantaa',
        lon: 24.841085,
        lat: 60.322768
      }, date, arriveBy: false
    })
    expect(routes).toMatchSnapshot()
  })

  it('should be able to get route with arriveBy', async() => {
    const date = moment(1481728405559)
    const routes = await new RouteQuery().fetch({
      from: {label: 'Kamppi, Helsinki', lon: 24.931861, lat: 60.169067}, to: {
        label: 'Kannistontie 2, Vantaa',
        lon: 24.841085,
        lat: 60.322768
      }, date, arriveBy: true
    })
    expect(routes).toMatchSnapshot()
  })
})