import program from 'commander'
import Route from './Route'
import {getLocation} from './Location'
import history from './history'

const action = async function(address1, address2) {
  const [from, to] = address2 ? [address1, address2] : [null, address1]
  const [fromLocation, toLocation] = await Promise.all([getLocation(from), getLocation(to)])
  history.add(fromLocation.label, toLocation.label)
  new Route(fromLocation, toLocation).printRoutes()
}

program
  .arguments('<address1> [address2]')
  .action((address1, address2) => action(address1, address2).catch(e => {
    console.log('Error with action', e)
  }))
  .parse(process.argv)