import program from 'commander'
import Location from './Location'
import Route from './Route'

const action = async function(from, to) {
  const [fromLocation, toLocation] = await Promise.all([new Location(from).getLocation(), new Location(to).getLocation()])
  await new Route(fromLocation, toLocation).printRoutes()
}

program
  .arguments('<from> <to>')
  .action((from, to) => action(from, to).catch(e => {
    console.log('Error with action', e)
  }))
  .parse(process.argv)