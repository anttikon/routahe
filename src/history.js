import fs from 'fs'
import {homedir} from 'os'

const HISTORY_FILE = `${homedir()}/.routahe_history`

async function addToHistory(from, to) {
  const history = await readHistory()
  const route = history.find((route) => route.from.toLowerCase() === from.toLowerCase()
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
    history.push(newRoute)
  }
  return writeFileAsync(HISTORY_FILE, JSON.stringify(history))  
}

async function readHistory() {
  try {
    const text = await readFileAsync(HISTORY_FILE, 'utf8')
    return JSON.parse(text)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return []
    } else {
      throw err
    }
  }
}

async function latestRoute() {
  return getRouteBy((r1, r2) => r2.timestamp - r1.timestamp)
}

async function topRoute() {
  return getRouteBy((r1, r2) => r2.count - r1.count)  
}

async function getRouteBy(sortFunction) {
  const history = await readHistory()
  history.sort(sortFunction)
  return history[0] || null
}

async function readFileAsync(file, encoding) {
  return new Promise((resolve, reject) => fs.readFile(file, encoding, (err, text) => err ? reject(err) : resolve(text)))
}

async function writeFileAsync(file, data) {
  return new Promise((resolve, reject) => fs.writeFile(file, data, (err) => err ? reject(err) : resolve()))
}

export default {
  add: addToHistory,
  get: readHistory,
  latestRoute,
  topRoute
}