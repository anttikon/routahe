import sinon from 'sinon'
import history from '../history'
import fs from 'fs'

describe('history', function() {
  let fsStub, now, clock, conf

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
      readFile: sinon.stub(fs, 'readFile', (file, encoding, cb) => cb(null, JSON.stringify(conf))),
      writeFile: sinon.stub(fs, 'writeFile', (file, data, cb) => cb(null))
    }
    now = Date.now()
    clock = sinon.useFakeTimers(now)
  })

  afterEach(() => {
    fsStub.readFile.restore()
    fsStub.writeFile.restore()
    clock.restore()
  })

  describe('addToHistory()', () => {
    it('should write history to configuration file', async () => {
      await history.add('Address 1', 'Address 2')
      const call = fsStub.writeFile.getCall(0)
      expect(call.args[0].endsWith('.routahe')).toBe(true)
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
      expect(JSON.parse(newConf)).toEqual(expectedConf)
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
      expect(JSON.parse(newConf)).toEqual(expectedConf)
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
      expect(JSON.parse(newConf)).toEqual(expectedConf)
    })

  describe('readHistory()', () => {
    it('should read history from configuration file', async () => {
      await history.get()
      const call = fsStub.readFile.getCall(0)
      expect(call.args[0].endsWith('.routahe')).toBe(true)
    })

    it('should return route history', async () => {
      const historyData = await history.get()
      expect(historyData).toEqual(conf.history)
    })

    it('should return empty history if configuration file does not exist', async () => {
      fsStub.readFile.restore()
      fsStub.readFile = sinon.stub(fs, 'readFile', (file, encoding, cb) => cb({code: 'ENOENT'}))
      const historyData = await history.get()
      expect(historyData).toEqual([])
    })
  })

  describe('topRoute()', () => {
    it('should return route with highest usage count', async () => {
      const top = conf.history[2]
      let route = await history.topRoute()
      expect(route).toEqual(top)

      conf.history = [top, conf.history[1], conf.history[0]]
      route = await history.topRoute()
      expect(route).toEqual(top)
    })

    it('should return null if history is empty', async () => {
      conf.history = []
      const route = await history.topRoute()
      expect(route).toBe(null)
    })
  })

  describe('latestRoute()', () => {
    it('should return route with latest timestamp', async () => {
      const latest = conf.history[2]
      let route = await history.latestRoute()
      expect(route).toEqual(latest)

      conf.history = [latest, conf.history[1], conf.history[0]]
      route = await history.latestRoute()
      expect(route).toEqual(latest)
    })

    it('should return null if history is empty', async () => {
      conf.history = []
      const route = await history.latestRoute()
      expect(route).toBe(null)
    })
  })
})
