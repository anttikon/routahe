import sinon from 'sinon'
import {assert} from 'chai'
import history from '../src/history'
import fs from 'fs'

describe('history', function() {
  let fsStub, resetFs, now, clock, currentConf

  beforeEach(() => {
    currentConf = {
      history: [{
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
    }
    fsStub = {
      readFile: sinon.spy((file, encoding, cb) => cb(null, JSON.stringify(currentConf))),
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
    it('should write history to configuration file', async () => {
      await history.add('Address 1', 'Address 2')
      const call = fsStub.writeFile.getCall(0)
      assert.isOk(call.args[0].endsWith('.routahe'))
    })

    it('should add new route to history', async () => {
      const expectedConf = {
        history: [...currentConf.history, {
          from: 'New address 1',
          to: 'New address 2',
          count: 1,
          timestamp: now
        }]
      }
      await history.add('New address 1', 'New address 2')
      const newConf = fsStub.writeFile.getCall(0).args[1]
      assert.deepEqual(JSON.parse(newConf), expectedConf)
    })

    it('should increment counter and timestamp of existing route', async () => {
      const expectedConf = {
        history: [{
            from: 'Address 1',
            to: 'Address 2',
            count: 2,
            timestamp: now
          },
          ...currentConf.history.slice(1)
        ]
      }
      await history.add('Address 1', 'Address 2')
      const newConf = fsStub.writeFile.getCall(0).args[1]
      assert.deepEqual(JSON.parse(newConf), expectedConf)
    })
  })

  describe('readHistory()', () => {
    it('should read history from configuration file', async () => {
      await history.get()
      const call = fsStub.readFile.getCall(0)
      assert.isOk(call.args[0].endsWith('.routahe'))
    })

    it('should return route history', async () => {
      const historyData = await history.get()
      assert.deepEqual(historyData, currentConf.history)
    })

    it('should return empty history if configuration file does not exist', async () => {
      fsStub.readFile = (file, encoding, cb) => cb({code: 'ENOENT'})
      const historyData = await history.get()
      assert.deepEqual(historyData, [])
    })
  })

  describe('topRoute()', () => {
    it('should return route with highest usage count', async () => {
      const top = currentConf.history[2]
      let route = await history.topRoute()
      assert.deepEqual(route, top)

      currentConf.history = [top, currentConf.history[1], currentConf.history[0]]
      route = await history.topRoute()
      assert.deepEqual(route, top)
    })

    it('should return null if history is empty', async () => {
      currentConf.history = []
      const route = await history.topRoute()
      assert.isNull(route)
    })
  })

  describe('latestRoute()', () => {
    it('should return route with latest timestamp', async () => {
      const latest = currentConf.history[2]
      let route = await history.latestRoute()
      assert.deepEqual(route, latest)

      currentConf.history = [latest, currentConf.history[1], currentConf.history[0]]
      route = await history.latestRoute()
      assert.deepEqual(route, latest)
    })

    it('should return null if history is empty', async () => {
      currentConf.history = []
      const route = await history.latestRoute()
      assert.isNull(route)
    })
  })
})
