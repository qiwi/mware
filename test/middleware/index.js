import {loggerMiddlewareFactory} from '../../src/middleware'

describe('middleware/index', () => {
  it('exposes factory', () => {
    [loggerMiddlewareFactory].forEach(factory => expect(factory).toEqual(expect.any(Function)))
  })
})
