import graphqlify from 'graphqlify'
import {values} from 'lodash'
import fetch from 'node-fetch'

class GraphQlQuery {
  constructor(opts = {}) {
    const {url, command, schema} = opts
    if (!url) {
      throw new Error('Cannot initialize Schema without url')
    } else if (!command) {
      throw new Error('Cannot initialize Schema without command')
    } else if (!schema) {
      throw new Error('Cannot initialize Schema without schema')
    }
    this.url = url
    this.schema = schema
    this.command = command
  }

  async fetch(opts) {
    const options = this.preProcess ? this.preProcess(opts) : opts
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(this._createQuery(options)),
      headers: {'Content-Type': 'application/json'}
    })

    return this.postProcess ? this.postProcess(await response.json()) : await response.json()
  }

  static transformJsonParameters(jsonParameters = {}) {
    const parameters = JSON.stringify(jsonParameters)
    const withoutQuotes = parameters
      .replace(new RegExp('{"', 'g'), '{')
      .replace(new RegExp('":', 'g'), ':')
      .replace(new RegExp(',"', 'g'), ',')
    return `(${withoutQuotes.slice(1, -1)})`
  }

  _createQuery(parameters) {
    const graphQlQuery = {
      command: this.command,
      parameters: GraphQlQuery.transformJsonParameters(parameters),
      projection: graphqlify(this.schema)
    }
    return {query: `{${values(graphQlQuery).join('')}}`}
  }
}

export default GraphQlQuery