import moment from 'moment'
import * as printer from '../printer'
import { main } from '../app'

const defaultArgv = ['node', 'index.js']

describe('main', () => {
  it('should be able to return routes from kamppi to steissi', async () => {
    const argv = [...defaultArgv, '@12:00', 'kamppi', moment().add(1, 'days').format('DD.MM.YYYY'), 'steissi']
    const routes = await main(argv)
    const fifteenMinutesAsSeconds = 60 * 15
    expect(routes.length).toEqual(5)
    routes.forEach(route => expect(route.duration).toBeLessThan(fifteenMinutesAsSeconds))
  })
  it('should print help page if there is no enough of arguments', async () => {
    const printHelpSpy = jest.spyOn(printer, 'printHelp')
    const argv = [...defaultArgv, '@12:00', 'kamppi',]
    const routes = await main(argv)
    expect(printHelpSpy).toHaveBeenCalled();
    expect(routes).toEqual(undefined)
    printHelpSpy.mockRestore();
  })
})
