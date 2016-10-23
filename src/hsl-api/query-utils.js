import graphqlify from 'graphqlify'
import {values} from 'lodash'

function getUrl(api, params) {
  const urlParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
  return `${api}?${urlParams}`
}

function getGraphQlQuery(command, parameters, projection) {
  const graphQlQuery = {
    command: command,
    parameters: getGraphQlParameters(parameters),
    projection: graphqlify(projection)
  }
  return {query: `{${values(graphQlQuery).join('')}}`}
}

function getGraphQlParameters(jsonParameters = {}) {
  const parameters = JSON.stringify(jsonParameters)
  const withoutQuotes = parameters.replace(new RegExp('"', 'g'), '')
  return `(${withoutQuotes.slice(1, -1)})`;
}

export {getUrl, getGraphQlQuery, getGraphQlParameters}