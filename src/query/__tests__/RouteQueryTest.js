import moment from 'moment'
import RouteQuery from '../RouteQuery'

describe('HSL-API', function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000

  const nextWednesday = moment().day(10).hour(15).minute(13)

  it('should be able to get route', async() => {
    const routes = await new RouteQuery().fetch({
      from: {label: 'Kamppi, Helsinki', lon: 24.931861, lat: 60.169067}, to: {
        label: 'Kannistontie 2, Vantaa',
        lon: 24.841085,
        lat: 60.322768
      }, date: nextWednesday, arriveBy: false
    })

    const filteredRoutes = routes.map(route => removeRouteTimeAttributes(route))

    expect(filteredRoutes).toMatchSnapshot()
  })

  it('should be able to get route with arriveBy', async() => {
    const routes = await new RouteQuery().fetch({
      from: {label: 'Kamppi, Helsinki', lon: 24.931861, lat: 60.169067}, to: {
        label: 'Kannistontie 2, Vantaa',
        lon: 24.841085,
        lat: 60.322768
      }, date: nextWednesday, arriveBy: true
    })

    const filteredRoutes = routes.map(route => removeRouteTimeAttributes(route))
    expect(filteredRoutes).toMatchSnapshot()
  })

  function removeRouteTimeAttributes(route) {
    route.legs = route.legs.map(leg => removeLegTimeAttributes(leg))
    return route
  }

  function removeLegTimeAttributes(leg) {
    const {duration, distance, mode, from, to, route} = leg
    return {duration, distance, mode, from, to, route}
  }
})