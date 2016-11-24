import fs from 'fs'
import {homedir} from 'os'

const ROUTAHE_CONF_FILE = `${homedir()}/.routahe`

async function addToHistory(from, to) {
  const conf = await readConf()
  const route = conf.history.find((route) => route.from.toLowerCase() === from.toLowerCase()
                                     && route.to.toLowerCase() === to.toLowerCase() )
  if (route) {
    route.count += 1
    route.timestamp = Date.now()
  } else {
    const newRoute = {
      from,
      to,
      timestamp: Date.now(),
      count: 1
    }
    conf.history.push(newRoute)
  }
  return writeFileAsync(ROUTAHE_CONF_FILE, JSON.stringify(conf))  
}

async function getHistory() {
  const conf = await readConf()
  return conf.history
}

async function latestRoute() {
  return getRouteBy((r1, r2) => r2.timestamp - r1.timestamp)
}

async function topRoute() {
  return getRouteBy((r1, r2) => r2.count - r1.count)  
}

async function getRouteBy(sortFunction) {
  const history = await getHistory()
  history.sort(sortFunction)
  return history[0] || null
}

async function readConf() {
  try {
    const text = await readFileAsync(ROUTAHE_CONF_FILE, 'utf8')
    return JSON.parse(text)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return {
        history: []
      }
    } else {
      throw err
    }
  }
}

async function readFileAsync(file, encoding) {
  return new Promise((resolve, reject) => fs.readFile(file, encoding, (err, text) => err ? reject(err) : resolve(text)))
}

async function writeFileAsync(file, data) {
  return new Promise((resolve, reject) => fs.writeFile(file, data, (err) => err ? reject(err) : resolve()))
}

export default {
  add: addToHistory,
  get: getHistory,
  latestRoute,
  topRoute
}