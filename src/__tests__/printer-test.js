import dummyRoute from './dummyRoute.json'
import { printRoutes } from '../printer'

describe('printer', () => {
  describe('printRoutes', () => {
    it('should print routes', () => {
      const printedRows = printRoutes(dummyRoute)
      expect(printedRows.join('\n')).toMatchSnapshot()
    })
  })
})
