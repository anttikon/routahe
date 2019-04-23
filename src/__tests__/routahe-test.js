import { getTripRow, getRouteHeaderRow, getRouteRows, getRowProps, getRowByLeg } from '../routahe'

const dummyRoute = {
  duration: 3279,
  legs: [
    {
      startTime: 1556046104000,
      endTime: 1556046240000,
      duration: 136,
      distance: 156.595,
      mode: 'WALK',
      from: { name: 'Origin' },
      to: { name: 'Kapteeninpuistikko' },
      route: null,
    },
    {
      startTime: 1556046240000,
      endTime: 1556046600000,
      duration: 360,
      distance: 1557.2188592626867,
      mode: 'BUS',
      from: { name: 'Kapteeninpuistikko' },
      to: { name: 'Lasipalatsi' },
      route: { shortName: '24' },
    },
    {
      startTime: 1556046600000,
      endTime: 1556046823000,
      duration: 223,
      distance: 289.68399999999997,
      mode: 'WALK',
      from: { name: 'Lasipalatsi' },
      to: { name: 'Rautatientori' },
      route: null,
    },
    {
      startTime: 1556046960000,
      endTime: 1556047980000,
      duration: 1020,
      distance: 11906.962915531054,
      mode: 'SUBWAY',
      from: { name: 'Rautatientori' },
      to: { name: 'Niittykumpu' },
      route: { shortName: 'M1' },
    },
    {
      startTime: 1556047980000,
      endTime: 1556048350000,
      duration: 370,
      distance: 258.101,
      mode: 'WALK',
      from: { name: 'Niittykumpu' },
      to: { name: 'Niittykumpu (M)' },
      route: null,
    },
    {
      startTime: 1556048940000,
      endTime: 1556049120000,
      duration: 180,
      distance: 1171.1100194427006,
      mode: 'BUS',
      from: { name: 'Niittykumpu (M)' },
      to: { name: 'Parolantie' },
      route: { shortName: '118' },
    },
    {
      startTime: 1556049120000,
      endTime: 1556049383000,
      duration: 263,
      distance: 312.56600000000003,
      mode: 'WALK',
      from: { name: 'Parolantie' },
      to: { name: 'Destination' },
      route: null,
    },
  ],
}

describe('getRowProps', () => {
  it('should return correct row props with WALK', () => {
    expect(getRowProps('WALK')).toMatchSnapshot()
  })
  it('should return default row props with ASDF', () => {
    expect(getRowProps('ASDF')).toMatchSnapshot()
  })
})
describe('getRouteHeaderRow', () => {
  it('should return route header row', () => {
    expect(getRouteHeaderRow(dummyRoute)).toMatchSnapshot()
  })
})
describe('getRowByLeg', () => {
  it('should return row containing route leg information', () => {
    expect(getRowByLeg(dummyRoute.legs[0])).toMatchSnapshot()
  })
})
describe('getRouteRows', () => {
  it('should return route segments as rows', () => {
    expect(getRouteRows(dummyRoute)).toMatchSnapshot()
  })
})
describe('getTripRow', () => {
  it('should return row containing trip information', () => {
    expect(getTripRow({ label: 'Tehtaankatu 24' }, { label: 'Korvatunturi' })).toMatchSnapshot()
  })
})
