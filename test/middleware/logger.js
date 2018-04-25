import {loggerMiddlewareFactory} from '../../src/middleware'

describe('middleware/logger', () => {
  describe('factory', () => {
    it('produces proper mware', () => {
      const logger = {
        info: () => {}
      }
      const mware = loggerMiddlewareFactory({logger})

      expect(mware).toBeDefined()
    })
  })
})
