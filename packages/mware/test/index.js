import {mdc, logger, util} from '../src'

describe('mware', () => {
  it('exposes middlewares collection', () => {
    expect(mdc).toEqual(expect.any(Function))
    expect(logger).toEqual(expect.any(Function))
    expect(util).not.toBeUndefined()
  })
})
