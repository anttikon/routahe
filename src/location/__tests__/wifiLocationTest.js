import {getStreetAddressByLocation} from '../wifiLocation'

describe('Wifi location', function() {
  describe('getStreetAddressByLocation', () => {
    it('should be able to return address by lon and lat', async() => {
      expect(await getStreetAddressByLocation(60.182643, 24.95981)).toBe('Kaikukatu 5, 00530 Helsinki, Finland')
    })
  })
})