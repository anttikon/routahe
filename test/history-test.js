import sinon from 'sinon'
import {assert} from 'chai'
import history from '../src/history'
import fs from 'fs'

describe('history', function() {
  let fsStub, resetFs, now, clock, conf

  beforeEach(() => {
    conf = {
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
      readFile: sinon.spy((file, encoding, cb) => cb(null, JSON.stringify(conf))),
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
        history: [...conf.history, {
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
          ...conf.history.slice(1)
        ]
      }
      await history.add('Address 1', 'Address 2')
      const newConf = fsStub.writeFile.getCall(0).args[1]
      assert.deepEqual(JSON.parse(newConf), expectedConf)
    })
  })

  it('should use case insensitive address matching', async () => {
      const expectedConf = {
        history: [{
            from: 'Address 1',
            to: 'Address 2',
            count: 2,
            timestamp: now
          },
          ...conf.history.slice(1)
        ]
      }
      await history.add('ADDRESS 1', 'aDdResS 2')
      const newConf = fsStub.writeFile.getCall(0).args[1]
      assert.deepEqual(JSON.parse(newConf), expectedConf)
    })

  describe('readHistory()', () => {
    it('should read history from configuration file', async () => {
      await history.get()
      const call = fsStub.readFile.getCall(0)
      assert.isOk(call.args[0].endsWith('.routahe'))
    })

    it('should return route history', async () => {
      const historyData = await history.get()
      assert.deepEqual(historyData, conf.history)
    })

    it('should return empty history if configuration file does not exist', async () => {
      fsStub.readFile = (file, encoding, cb) => cb({code: 'ENOENT'})
      const historyData = await history.get()
      assert.deepEqual(historyData, [])
    })
  })

  describe('topRoute()', () => {
    it('should return route with highest usage count', async () => {
      const top = conf.history[2]
      let route = await history.topRoute()
      assert.deepEqual(route, top)

      conf.history = [top, conf.history[1], conf.history[0]]
      route = await history.topRoute()
      assert.deepEqual(route, top)
    })

    it('should return null if history is empty', async () => {
      conf.history = []
      const route = await history.topRoute()
      assert.isNull(route)
    })
  })

  describe('latestRoute()', () => {
    it('should return route with latest timestamp', async () => {
      const latest = conf.history[2]
      let route = await history.latestRoute()
      assert.deepEqual(route, latest)

      conf.history = [latest, conf.history[1], conf.history[0]]
      route = await history.latestRoute()
      assert.deepEqual(route, latest)
    })

    it('should return null if history is empty', async () => {
      conf.history = []
      const route = await history.latestRoute()
      assert.isNull(route)
    })
  })
})
