import { argvToArray, populateDateTime, argsToObject, validateInput, populateFromTo } from './parser'
import { printHelp, printRoutes, printLocations } from './printer'
import hsl from './hsl'

export const main = async (argv) => {
  const args = argvToArray(argv)
    |> #.filter(obj => !!obj)
    |> argsToObject
    |> populateDateTime
    |> populateFromTo
    |> await #

  if (!validateInput(args, argv)) {
    return printHelp()
  }

  printLocations(args)

  const routes = hsl.getQueryFromArgs(args)
    |> hsl.getRoutesByQuery
    |> await #

  printRoutes(routes)

  return routes
}
