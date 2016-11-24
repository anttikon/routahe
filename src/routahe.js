import program from 'commander'
import Route from './Route'
import {getLocation} from './Location'
import {parseArguments} from './argument-parser'

const action = async function(opts) {
  const [fromLocation, toLocation] = await Promise.all([getLocation(opts.addressFrom), getLocation(opts.addressTo)])
  await new Route(fromLocation, toLocation, opts.dateTime, opts.arriveBy).printRoutes()
}

program
  .arguments('<arg1> [arg2] [arg3] [arg4]')
  .action((arg1, arg2, arg3, arg4) => action(parseArguments([arg1, arg2, arg3, arg4])).catch(e => {
    console.log('Error with action', e)
  }))
  .parse(process.argv)

