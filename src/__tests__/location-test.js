import { mapFeature } from '../location'

const dummyFeature = {
  type: 'Feature',
  geometry: { type: 'Point', coordinates: [24.943871, 60.158048] },
  properties: {
    id: 'node:4950866718',
    gid: 'openstreetmap:address:node:4950866718',
    layer: 'address',
    source: 'openstreetmap',
    source_id: 'node:4950866718',
    name: 'Tehtaankatu 24',
    housenumber: '24',
    street: 'Tehtaankatu',
    postalcode: '00150',
    postalcode_gid: 'whosonfirst:postalcode:421472993',
    confidence: 0.7516263013376072,
    accuracy: 'point',
    country: 'Suomi',
    country_gid: 'whosonfirst:country:0',
    country_a: 'FIN',
    region: 'Uusimaa',
    region_gid: 'whosonfirst:region:85683067',
    localadmin: 'Helsinki',
    localadmin_gid: 'whosonfirst:localadmin:907199715',
    locality: 'Helsinki',
    locality_gid: 'whosonfirst:locality:101748417',
    neighbourhood: 'Ullanlinna',
    neighbourhood_gid: 'whosonfirst:neighbourhood:85907973',
    label: 'Tehtaankatu 24, Helsinki',
  },
}

describe('mapFeature', () => {
  it('should return {label, lon, lat}', () => {
    expect(mapFeature(dummyFeature)).toMatchSnapshot()
  })
})
