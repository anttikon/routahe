import moment from 'moment'
import * as printer from '../printer'
import { main } from '../app'

const addArgsToArgv = (args) => process.argv = [...process.argv, ...args]
const removeArgsFromArgv = (args) => process.argv = process.argv.filter(arg => !args.includes(arg))

describe('main', () => {
  it('should be able to return routes from kamppi to steissi', async () => {
    const args = ['@12:00', 'kamppi', moment().add(1, 'days').format('DD.MM.YYYY'), 'steissi']
    addArgsToArgv(args)

    const routes = await main()
    const fifteenMinutesAsSeconds = 60 * 15
    expect(routes.length).toEqual(5)
    routes.forEach(route => expect(route.duration).toBeLessThan(fifteenMinutesAsSeconds))
    removeArgsFromArgv(args)
  })
  it('should print help page if there is no enough of arguments', async () => {
    const args = ['@12:00', 'kamppi']
    addArgsToArgv(args)

    const printHelpSpy = jest.spyOn(printer, 'printHelp')
    const routes = await main()
    expect(printHelpSpy).toHaveBeenCalled();
    expect(routes).toEqual(undefined)
    removeArgsFromArgv(args)
    printHelpSpy.mockRestore();
  })
})
