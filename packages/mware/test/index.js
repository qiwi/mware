import {mdc, logger, util, cors, crumbs} from '../src'

describe('mware', () => {
  it('exposes middlewares collection', () => {
    expect(mdc).toEqual(expect.any(Function))
    expect(logger).toEqual(expect.any(Function))
    expect(cors).toEqual(expect.any(Function))
    expect(crumbs).toEqual(expect.any(Function))
    expect(util).not.toBeUndefined()
  })
})
