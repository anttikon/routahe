import { formatQueryBody, jsonToSchema, jsonToParameters, createQuery } from '../fetch-route'
import moment from 'moment'

const dummyBody = {
  from: {
    label: 'Tehtaankatu 24, Helsinki',
    lon: 24.944215,
    lat: 60.158061,
  },
  to: {
    label: 'Koirapuisto, Vanha-Mankkaa, Espoo',
    lon: 24.762577,
    lat: 60.181903,
  },
  dateTime: moment('2019-04-23T21:50:50.079'),
  arriveBy: undefined,
}

describe('formatQueryBody', () => {
  it('should return formatted query matching to given body without arriveBy', () => {
    expect(formatQueryBody(dummyBody)).toMatchSnapshot()
  })
  it('should return formatted query matching to given body with arriveBy', () => {
    expect(formatQueryBody({ ...dummyBody, arriveBy: true })).toMatchSnapshot()
  })
})

describe('jsonToSchema', () => {
  it('should return matching graphql schema', () => {
    const querySchema = {
      itineraries: {
        duration: {},
        legs: {
          startTime: {},
          endTime: {},
          duration: {},
          distance: {},
          mode: {},
          from: { name: {} },
          to: { name: {} },
          route: { shortName: {} },
        },
      },
    }

    expect(jsonToSchema(querySchema)).toMatchSnapshot()
  })
})

describe('jsonToParameters', () => {
  it('should return matching graphql parameters with undefined arriveBy', () => {
    const jsonParams = {
      numItineraries: 3,
      from: { lat: 60.158061, lon: 24.944215 },
      to: { lat: 60.181903, lon: 24.762577 },
      date: '2019-04-23',
      time: '21:55',
      arriveBy: undefined,
    }

    expect(jsonToParameters(jsonParams)).toMatchSnapshot()
  })

  it('should return matching graphql parameters with defined arriveBy', () => {
    const jsonParams = {
      numItineraries: 3,
      from: { lat: 60.158061, lon: 24.944215 },
      to: { lat: 60.181903, lon: 24.762577 },
      date: '2019-04-23',
      time: '21:55',
      arriveBy: true,
    }

    expect(jsonToParameters(jsonParams)).toMatchSnapshot()
  })
})

describe('createQuery', () => {
  it('should return matching query', () => {
    expect(createQuery(dummyBody)).toMatchSnapshot()
  })
})
