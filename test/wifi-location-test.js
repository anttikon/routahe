import {assert} from 'chai'
import {getStreetAddressByLocation} from '../src/WifiLocation'

describe('WifiLocation', function() {
  describe('getStreetAddressByLocation', () => {
    it('should be able to return address by lon and lat', async() => {
      assert.equal(await getStreetAddressByLocation(60.182643, 24.95981), 'Kaikukatu 5, 00530 Helsinki, Finland')
    })
  })
})