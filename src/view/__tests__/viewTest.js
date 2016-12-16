import {printSearchInfo} from '../view'
import sinon from 'sinon'

describe('view', function() {
  it('printSearchInfo', () => {
    sinon.spy(console, 'log')
    printSearchInfo({label: 'Jäkälä'}, {label: 'Öylätti'})
    expect(console.log.callCount).toBe(1)
    expect(console.log.getCall(0).args).toMatchSnapshot()
  })
})