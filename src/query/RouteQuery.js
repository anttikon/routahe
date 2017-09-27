import GraphQlQuery from './GraphQlQuery'
import { get } from 'lodash'

class RouteQuery extends GraphQlQuery {
  constructor() {
    super({
      url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
      command: 'plan',
      schema: {
        itineraries: {
          fields: {
            duration: {},
            legs: {
              fields: {
                startTime: {},
                endTime: {},
                duration: {},
                distance: {},
                mode: {},
                from: { fields: { name: {} } },
                to: { fields: { name: {} } },
                route: { fields: { shortName: {} } }
              }
            }
          }
        }
      }
    })
  }

  preProcess({ from, to, dateTime, arriveBy }) {
    const queryJson = {
      from: { lat: from.lat, lon: from.lon },
      to: { lat: to.lat, lon: to.lon },
      numItineraries: 3
    }

    if (dateTime) {
      const dateQuery = {
        date: dateTime.format('YYYY-MM-DD'),
        time: dateTime.format('HH:mm'),
        arriveBy
      }
      return { ...queryJson, ...dateQuery }
    }
    return queryJson
  }

  postProcess(result) {
    return get(result, 'data.plan.itineraries')
  }
}

export default RouteQuery