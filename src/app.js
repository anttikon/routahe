import { argvToArray, populateDateTime, filterUndefined, argsToObject, validateInput, populateFromTo } from './parser'
import { printHelp, printRoutes, printLocations } from './printer'
import hsl from './hsl'

export const main = async () => {
  const args = argvToArray(process.argv)
    |> filterUndefined
    |> argsToObject
    |> populateDateTime
    |> populateFromTo
    |> await #

  if (!validateInput(args)) {
    return printHelp()
  }

  printLocations(args)

  const routes = hsl.getQueryFromArgs(args)
    |> hsl.getRoutesByQuery
    |> await #

  printRoutes(routes)

  return routes
}
