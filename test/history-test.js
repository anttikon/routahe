import sinon from 'sinon'
import {assert} from 'chai'
import history from '../src/history'
import fs from 'fs'

describe('history', function() {
  let fsStub, resetFs, now, clock, currentHistory

  beforeEach(() => {
    currentHistory = [{
      from: 'Address 1',
      to: 'Address 2',
      count: 1,
      timestamp: 100
    },
    {
      from: 'Address 2',
      to: 'Address 3',
      count: 2,
      timestamp: 200
    },
    {
      from: 'Address 3',
      to: 'Address 4',
      count: 3,
      timestamp: 300
    }]
    fsStub = {
      readFile: sinon.spy((file, encoding, cb) => cb(null, JSON.stringify(currentHistory))),
      writeFile: sinon.spy((file, data, cb) => cb(null))
    }
    resetFs = history.__Rewire__('fs', fsStub)
    now = Date.now()
    clock = sinon.useFakeTimers(now);
  })

  afterEach(() => {
    resetFs()
    clock.restore()
  })

  describe('addToHistory()', () => {
    it('should write existing routes to history file', async () => {
      await history.add('Address 1', 'Address 2')
      const call = fsStub.writeFile.getCall(0)
      assert.isOk(call.args[0].endsWith('.routahe_history'))
    })

    it('should add new route to history', async () => {
      const expected = [...currentHistory, {
        from: 'New address 1',
        to: 'New address 2',
        count: 1,
        timestamp: now
      }]
      await history.add('New address 1', 'New address 2')
      const newHistory = fsStub.writeFile.getCall(0).args[1]
      assert.deepEqual(JSON.parse(newHistory), expected)
    })

    it('should increment counter and timestamp of existing route', async () => {
      const expectedHistory = [{
        from: 'Address 1',
        to: 'Address 2',
        count: 2,
        timestamp: now
      }, ...currentHistory.slice(1)]
      await history.add('Address 1', 'Address 2')
      const newHistory = fsStub.writeFile.getCall(0).args[1]
      assert.deepEqual(JSON.parse(newHistory), expectedHistory)
    })
  })

  describe('readHistory()', () => {
    it('should read existing routes from history file', async () => {
      await history.get()
      const call = fsStub.readFile.getCall(0)
      assert.isOk(call.args[0].endsWith('.routahe_history'))
    })

    it('should read existing routes', async () => {
      const historyData = await history.get()
      assert.deepEqual(historyData, currentHistory)
    })

    it('should return empty history if history file does not exist', async () => {
      fsStub.readFile = (file, encoding, cb) => cb({code: 'ENOENT'})
      const historyData = await history.get()
      assert.deepEqual(historyData, [])
    })
  })

  describe('topRoute()', () => {
    it('should return route with highest usage count', async () => {
      const top = currentHistory[2]
      let route = await history.topRoute()
      assert.deepEqual(route, top)

      currentHistory = [top, currentHistory[1], currentHistory[0]]
      route = await history.topRoute()
      assert.deepEqual(route, top)
    })

    it('should return null if history is empty', async () => {
      currentHistory = []
      const route = await history.topRoute()
      assert.isNull(route)
    })
  })

  describe('latestRoute()', () => {
    it('should return route with latest timestamp', async () => {
      const latest = currentHistory[2]
      let route = await history.latestRoute()
      assert.deepEqual(route, latest)

      currentHistory = [latest, currentHistory[1], currentHistory[0]]
      route = await history.latestRoute()
      assert.deepEqual(route, latest)
    })

    it('should return null if history is empty', async () => {
      currentHistory = []
      const route = await history.latestRoute()
      assert.isNull(route)
    })
  })
})
