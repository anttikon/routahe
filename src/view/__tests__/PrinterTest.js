import Printer from '../Printer'
import moment from 'moment'
import {cyan} from 'chalk'
import sinon from 'sinon'

describe('Printer', function() {

  beforeEach(() => sinon.spy(console, 'log'))
  afterEach(() => console.log.restore())

  it('should be able to print line', () => {
    new Printer()
      .addDate(new Date(1481728405559))
      .addDuration(47285)
      .addMode('SUBWAY')
      .addString(' ')
      .addArrive(moment(1481728405559))
      .addDeparture(moment(1481728405559))
      .addString(' | ', cyan)
      .print()

    expect(console.log.getCall(0).args).toMatchSnapshot()
  })

  it('should return empty stuff if parameters empty ok', () => {
    new Printer()
      .addDate()
      .addDuration()
      .addMode()
      .addString()
      .addArrive()
      .addDeparture()
      .addString(null, cyan)
      .addString('a')
      .print()

    expect(console.log.getCall(0).args).toMatchSnapshot()
  })
})