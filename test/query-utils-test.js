import {assert} from 'chai'
import {getUrl, getGraphQlQuery, getGraphQlParameters} from '../src/hsl-api/query-utils'

describe('query utils', function() {

  it('getUrl', () => {
    const url = getUrl('http://api.digitransit.fi/geocoding/v1/search', {
      'text': encodeURIComponent('Hämeenkatu 2'),
      'boundary.rect.min_lat': 59.9,
      'boundary.rect.max_lat': 60.45,
      'boundary.rect.min_lon': 24.3,
      'boundary.rect.max_lon': 25.5
    })
    assert.equal(url, 'http://api.digitransit.fi/geocoding/v1/search?text=H%C3%A4meenkatu%202&boundary.rect.min_lat=59.9&boundary.rect.max_lat=60.45&boundary.rect.min_lon=24.3&boundary.rect.max_lon=25.5')
  })

  it('getGraphQlQuery', () => {
    const routeProjection = {
      itineraries: {
        fields: {
          duration: {},
          legs: {
            fields: {
              startTime: {},
              endTime: {},
              from: {fields: {name: {}}},
              route: {fields: {shortName: {}}}
            }
          }
        }
      }
    }

    const query = getGraphQlQuery('plan',
      {
        from: {lat: 24.3, lon: 25.5},
        to: {lat: 59.9, lon: 60.45},
        numItineraries: 3
      },
      routeProjection)

    assert.deepEqual(query, {query: '{plan(from:{lat:24.3,lon:25.5},to:{lat:59.9,lon:60.45},numItineraries:3){itineraries{duration,legs{startTime,endTime,from{name},route{shortName}}}}}'})
  })

  it('getGraphQlParameters', () => {
    const parameters = getGraphQlParameters({
      from: {lat: 24.3, lon: 25.5},
      to: {lat: 59.9, lon: 60.45},
      numItineraries: 3,
      date: '2016-11-13',
      time: '1:30:00'
    })
    assert.equal(parameters, '(from:{lat:24.3,lon:25.5},to:{lat:59.9,lon:60.45},numItineraries:3,date:"2016-11-13",time:"1:30:00")')
  })
})