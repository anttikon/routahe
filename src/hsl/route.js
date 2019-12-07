import fetch from 'node-fetch'

const numItineraries = 5

export const getQueryFromArgs = (args) => {
  const { arriveBy, dateTime, from, to, transports } = args
  const date = dateTime.format('YYYY-MM-DD')
  const time = dateTime.format('HH:mm')
  const transportModes = transports.map(t => ({ mode: t.toUpperCase() }))
  if (transportModes.length > 0) {
    //  All routes require WALK-option
    transportModes.push({ mode: 'WALK' })
  }
  return `
{
  plan(numItineraries: ${numItineraries}, from: {lat: ${from.lat}, lon: ${from.lon}}, to: {lat: ${to.lat}, lon: ${to.lon}}, date: "${date}", time: "${time}", arriveBy: ${arriveBy}, transportModes: ${JSON.stringify(transportModes).replace(/\"/g, '')}) {
    itineraries {
      duration
      legs {
        startTime
        endTime
        duration
        distance
        mode
        from {
          name
        }
        to {
          name
        }
        route {
          shortName
        }
      }
    }
  }
}
`
}

export const getRoutesByQuery = async (query) => {
  const result = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: { 'Content-Type': 'application/json' },
  })
  const json = await result.json()
  return json?.data?.plan?.itineraries
}
