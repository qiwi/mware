import {mdc, logger, util, cors, crumbs, validator} from '../src'

describe('mware', () => {
  it('exposes middlewares collection', () => {
    expect(mdc).toEqual(expect.any(Function))
    expect(logger).toEqual(expect.any(Function))
    expect(cors).toEqual(expect.any(Function))
    expect(crumbs).toEqual(expect.any(Function))
    expect(validator).toEqual(expect.any(Function))
    expect(util).not.toBeUndefined()
  })
})
