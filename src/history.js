import fs from 'fs'
import _ from 'lodash'
import {homedir} from 'os'

const HISTORY_SIZE = 30
const HISTORY_FILE = `${homedir()}/.routahe_history`

async function addToHistory(...addresses) {
	let history = await readHistory()
	history = [...addresses, ...history]
	history = _.uniq(history)
	history = history.slice(0, HISTORY_SIZE)
	return writeFileAsync(HISTORY_FILE, JSON.stringify(history))	
}

async function readHistory() {
	try {
		const text = await readFileAsync(HISTORY_FILE)
		return JSON.parse(text)
	} catch (err) {
		if (err.code === 'ENOENT') {  // history does't exist yet
			return []
		} else {
			return err
		}
	}
}

function readFileAsync(file) {
	return new Promise((resolve, reject) => {
		fs.readFile(file, 'utf8', (err, text) => {
			if (err) return reject(err)
			resolve(text)
		})
	})
}

function writeFileAsync(file, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, (err) => {
		  if (err) return reject(err)
			resolve()
		})
	})
}

export default {
	add: addToHistory,
	get: readHistory
}