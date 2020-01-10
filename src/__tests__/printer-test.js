import dummyRoute from './dummyRoute.json'
import { printRoutes, roundUpToNearest10 } from '../printer'

describe('printer', () => {
  describe('roundUpToNearest10', () => {
    it('should round up to nearest 10', () => {
      const data = [
        { from: 0, rounded: 0 },
        { from: 110.22, rounded: 110 },
        { from: 97.2, rounded: 100 },
        { from: 143.22, rounded: 150 },
        { from: 8.22, rounded: 10 }
      ]
      data.forEach(t => expect(roundUpToNearest10(t.from)).toEqual(t.rounded))
    })
  })

  describe('printRoutes', () => {
    it('should print routes', () => {
      const printedRows = printRoutes(dummyRoute)
      expect(printedRows.join('\n')).toMatchSnapshot()
    })
  })
})
