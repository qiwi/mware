import {util} from '../src/'

describe('mware-core/index', () => {
  describe('properly exposes its inners:', () => {
    it('util', () => {
      expect(util.asyncMiddleware).toEqual(expect.any(Function))
    })
  })
})
